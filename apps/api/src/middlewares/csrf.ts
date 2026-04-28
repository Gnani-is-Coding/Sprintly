import type { NextFunction, Request, Response } from "express";

export const csrfMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const csrftoken = req.cookies["csrfToken"];
  const csrfHeaders = req.headers["x-csrf-token"] as
    | string
    | string[]
    | undefined;
  const headerValue = Array.isArray(csrfHeaders) ? csrfHeaders[0] : csrfHeaders;

  console.log(csrftoken, "token and headers", headerValue);

  if (csrftoken && csrfHeaders && csrftoken === headerValue) {
    console.log("CSRF Cookies are present");
    next();
  } else {
    return res.status(403).send({ data: "Forbidden Request" });
  }
};
