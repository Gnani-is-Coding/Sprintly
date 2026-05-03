import type { Request, Response } from "express";
import { CookieHelper } from "../../utils";
import { generateToken } from "../jwtToken/generateTokens";
import { extractPayloadFromCookies } from "../../middlewares/utils";
import type { TokenPayload } from "@sprintly/shared/schemas";
import { prisma } from "../../lib/prisma";

const tokenRotationService = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const payload = extractPayloadFromCookies(refreshToken) as TokenPayload;
  const { email } = payload;

  const existingUserDetails = await prisma.user.findUnique({
    where: { email },
  });

  if (!existingUserDetails) {
    console.log("VULNERABILITY DETECTED, COOKIE got conpromised !!!!");
    return res
      .status(401)
      .send({ data: "Not an Existing User, Register or Login Again !" }); // can be 403 as well.
  }

  const isRefreshTokenMatching =
    existingUserDetails.refreshToken === refreshToken;

  if (!isRefreshTokenMatching) {
    await prisma.user.update({
      where: { email },
      data: { refreshToken: null }, // null-out the refresh token, it comprimised.
    });
    return res
      .status(401)
      .send({ data: "User Unauthorised, Login In Again !" });
  }

  const {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    csrfToken,
  } = generateToken("ALL", existingUserDetails);

  await prisma.user.update({
    where: { email },
    data: { refreshToken: newRefreshToken },
  });

  // set tokens in Cookies.
  const { success } = CookieHelper(
    res,
    newRefreshToken,
    newAccessToken,
    csrfToken,
  );

  console.log(res.getHeaders()["set-cookie"], "cookie :::");
  if (success) {
    res.send({ data: "SuccesssFully Done !!" });
  } else {
    res
      .status(500)
      .send({ data: "Something Went Wrong !!, try again later Bitch" });
  }
};

export default tokenRotationService;
