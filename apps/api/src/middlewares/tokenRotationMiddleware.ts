import type { NextFunction, Request, Response } from "express";
import { verifyTokensAndExtractPayload } from "./utils";

const tokenRotationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { success } = verifyTokensAndExtractPayload(req, res, true);

  if (success) {
    next();
  } else {
    return;
  }
};

export default tokenRotationMiddleware;
