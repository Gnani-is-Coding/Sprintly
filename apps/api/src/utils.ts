import type { CookieOptions, Response } from "express";
import {
  expiryTimeEnum,
  TOKENS,
  type tokenType,
} from "./services/jwtToken/generateTokens";
import z from "zod";
import { ZodError } from "zod";

export const handleCatchBlockError = (
  err: unknown,
  res: Response,
  path: string,
) => {
  const message =
    err instanceof Error
      ? `${path} ::: ${err.message}`
      : `${path} ::: Unkown Error`;
  console.error("Error occured", message);
  res.status(500).send({ message });
};

// why <G> sits outside/before the parentheses ? — it's the declaration site.
// 1. Declare the type variable → <T extends Record<string, unknown>>

export const requestValidator = <G extends z.ZodTypeAny>( // Means whatever zod-schema we pass
  sourceSchema: G,
  payload: unknown, // input is untrusted, no need of a type in here.
  res: Response,
): { status: true; value: z.infer<G> } | { status: false } => {
  try {
    const value = sourceSchema.parse(payload);
    return { status: true, value: value };
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).send({ data: `${z.treeifyError(err)}` });
    } else {
      res.status(500).send({ data: "Error occured" });
    }
    return { status: false };
  }
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
    path: isRefreshtoken ? "/v1/auth/refresh" : "/", // path controls which routes the browser attaches the cookie to.
  };
};

// Sets Cookies in Response Object.
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
