import type { Request, Response } from "express";
import { CookieHelper } from "../../utils";
import { generateToken } from "../jwtToken/generateTokens";
import { extractPayloadFromCookies } from "../../middlewares/utils";
import DB from "../db";
import type { TokenPayload } from "@sprintly/shared/schemas";

const tokenRotationService = (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const payload = extractPayloadFromCookies(refreshToken) as TokenPayload;
  const { email } = payload;

  const existingUserDetails = DB.get(email);

  if (!existingUserDetails) {
    console.log("VULNERABILITY DETECTED, COOKIE got conpromised !!!!");
    return res.status(400).send({ data: "Not an Existing User, Register !" });
  }

  console.log("before token generation", payload);

  const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
    generateToken("BOTH", existingUserDetails);

  console.log("After token generation");

  const updatedPayload = {
    ...structuredClone(existingUserDetails),
    refreshToken: newRefreshToken,
  };

  DB.put(updatedPayload); // Update in DB as well.

  // set tokens in Cookies.
  const { success } = CookieHelper(res, newRefreshToken, newAccessToken);

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
