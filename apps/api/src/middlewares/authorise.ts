import type { NextFunction, Request, Response } from "express";
import { verifyTokensAndExtractPayload } from "./utils";
import { handleCatchBlockError } from "../utils";

function authorise(req: Request, res: Response, next: NextFunction) {
  try {
    const { success } = verifyTokensAndExtractPayload(req, res);
    // Check if the token is expired or active .
    // Browsers wont attach the expired cookies by default.

    if (success) {
      next();
    } else {
      return;
    }
  } catch (err) {
    handleCatchBlockError(err, res, "Authorise-Middleware");
  }
}

export default authorise;
