import type { CookieOptions, Response } from "express";
import {
  expiryTimeEnum,
  TOKENS,
  type tokenType,
} from "./services/jwtToken/generateTokens";

export const handleCatchBlockError = (
  err: unknown,
  res: Response,
  path: string,
) => {
  const message =
    err instanceof Error
      ? `${path} ::: ${err.message}`
      : `${path} ::: Unkown Error`;
  console.log("Error occured", message);
  res.status(500).send({ message });
};

// why <T> sits outside/before the parentheses ? — it's the declaration site.
// 1. Declare the type variable → <T extends Record<string, unknown>>
// 2. Use it in the parameters → (payload: T | undefined | null, res: Response)

export const handleValidation = <T extends Record<string, unknown>>(
  payload: T | undefined | null,
  res: Response,
  reqFields?: (keyof T)[],
  customErrMsg?: string,
): { success: boolean } => {
  if (!payload || Object.keys(payload).length === 0) {
    res.status(400).send({ data: customErrMsg ?? "Invalid Payload" });
    return { success: false };
  }

  if (reqFields && reqFields.length > 0) {
    for (const field of reqFields) {
      if (!payload[field]) {
        res
          .status(400)
          .send({ data: `${String(field)} is missing in payload` });

        return { success: false };
      }
    }
  }

  return { success: true };
};

// Access token cookie with path: "/" — the browser sends it on every request to your backend (/users, /auth/anything, /projects, etc.).
// This makes sense because every protected endpoint needs the access token.
// Refresh token cookie with path: "/auth/refresh" — the browser only sends it when hitting /auth/refresh. A request to /users or
// /projects won't carry the refresh token.

const cookieOptions = (type: Exclude<tokenType, "BOTH">): CookieOptions => {
  const isRefreshtoken = type === TOKENS.REFRESH;

  return {
    httpOnly: !!process.env.HTTP_ONLY,
    secure: !!process.env.SECURE,
    sameSite: (process.env.SAME_SITE as CookieOptions["sameSite"]) || "none",
    maxAge: expiryTimeEnum[type] * 1000, // in millis
    path: isRefreshtoken ? "/auth/refresh" : "/", // path controls which routes the browser attaches the cookie to.
  };
};

export const CookieHelper = (
  res: Response,
  refreshToken?: string,
  accessToken?: string,
): { success: boolean } => {
  try {
    console.log("Setting Cookies in res");
    if (refreshToken) {
      res.cookie("refreshToken", refreshToken, cookieOptions("REFRESH"));
    }

    if (accessToken) {
      res.cookie("accessToken", accessToken, cookieOptions("ACCESS"));
    }
    return { success: true };
  } catch (err) {
    handleCatchBlockError(err, res, " At Cookie Helper");
    return { success: false };
  }
};
