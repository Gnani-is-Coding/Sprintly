import type { NextFunction, Request, Response } from "express";

function errorHandlerMiddleware(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error("Global Error Handler", { error, req, res, next });
}

export default errorHandlerMiddleware;
