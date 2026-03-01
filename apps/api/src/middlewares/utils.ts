import jwt from "jsonwebtoken";
import type { Request, Response } from "express";

export const extractPayloadFromTokens = (
  req: Request,
  res: Response,
  isRotationFlow = false,
): { success: boolean } => {
  try {
    const forbiddenResponse = () => {
      res.status(401).send({ data: "Invalid Cookies, Login again !!" });
      return { success: false };
    };

    const { refreshToken, accessToken } = req.cookies;

    if (isRotationFlow && !refreshToken) {
      return forbiddenResponse();
    }

    if (!isRotationFlow && !accessToken) {
      return forbiddenResponse();
    }

    const privateKey = process.env.PRIVATE_KEY || "testing";
    const payload = jwt.verify(
      isRotationFlow ? refreshToken : accessToken,
      privateKey,
    );

    console.log(payload, "payload");
    const userDetails = { userName: payload.userName }; // #TODO: enhance this, with more User details in here.
    req.body = userDetails;
    console.log("Added Payload to Req");

    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unkown error";
    console.log(message, "err"); //
    res.status(401).send({ data: `${message}, Login Again !` });
    return { success: false };
  }
};
