import type { NextFunction, Request, Response } from "express";
import { extractPayloadFromTokens } from "./utils";
import { handleCatchBlockError } from "../utils";

function authorise(req: Request, res: Response, next: NextFunction) {
  try {
    const { success } = extractPayloadFromTokens(req, res);

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
