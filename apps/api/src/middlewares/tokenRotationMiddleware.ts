import type { NextFunction, Request, Response } from "express";
import { extractPayloadFromTokens } from "./utils";

const tokenRotationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { success } = extractPayloadFromTokens(req, res, true);

  if (success) {
    next();
  } else {
    return;
  }
};

export default tokenRotationMiddleware;
