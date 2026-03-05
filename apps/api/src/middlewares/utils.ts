import jwt from "jsonwebtoken";
import type { Request, Response } from "express";

// Extracts-out user Payload and sets in REQ-body.
export const verifyTokensAndExtractPayload = (
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
      // is there a need to check refresh Token as well in here ???
      return forbiddenResponse();
    }

    const PRIVATEKEY = process.env.PRIVATE_KEY || "testing";

    const payload = jwt.verify(
      isRotationFlow ? refreshToken : accessToken,
      PRIVATEKEY,
    );

    console.log(payload, "payload");
    const userDetails = { userName: payload.userName }; // #TODO: enhance this, with more User details in here.
    req.body = { ...req.body, ...userDetails };
    console.log("Added Payload to Req");

    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unkown error";
    console.log(message, "err :::"); //
    res.status(401).send({ data: `${message}, Login Again !` });
    return { success: false };
  }
};
