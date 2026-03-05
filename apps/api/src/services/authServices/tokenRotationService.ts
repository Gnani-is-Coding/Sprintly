import type { Request, Response } from "express";
import { CookieHelper } from "../../utils";
import { generateToken } from "../jwtToken/generateTokens";

const tokenRotationService = (req: Request, res: Response) => {
  const { refreshToken, accessToken } = generateToken("BOTH", req.body); // Is it Req to generate bith the tokens in this Flow ?

  // set tokens in Cookies.
  const { success } = CookieHelper(res, refreshToken, accessToken);

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
