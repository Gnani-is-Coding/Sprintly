import jwt from "jsonwebtoken";
import type { TokenPayload } from "@sprintly/shared/schemas";

export enum TOKENS {
  ACCESS = "ACCESS",
  REFRESH = "REFRESH",
  CSRF = "CSRF",
  ALL = "ALL",
}

export type tokenType = keyof typeof TOKENS;

const PRIVATEKEY = process.env.PRIVATE_KEY || "Testing";

const handleGenToken = (payload: TokenPayload, expiryTime: number) => {
  // #TODO: add more user details n type in here.
  return jwt.sign(payload, PRIVATEKEY, { expiresIn: expiryTime });
};

// type fncReturnType = {};

export const expiryTimeEnum = {
  [TOKENS.REFRESH]: 7 * 24 * 3600, // 7 days
  [TOKENS.CSRF]: 7 * 24 * 3600,
  [TOKENS.ACCESS]: 15 * 60, // 15 mins session.
};

const tokenKeys = {
  [TOKENS.REFRESH]: "refreshtoken",
  [TOKENS.CSRF]: "csrfToken",
  [TOKENS.ACCESS]: "accessToken",
};

export const generateToken = (type: tokenType, payload: TokenPayload) => {
  switch (type) {
    case TOKENS.ACCESS:
    case TOKENS.REFRESH:
    case TOKENS.CSRF:
      return {
        [tokenKeys[type]]: handleGenToken(payload, expiryTimeEnum[type]),
      };
    default:
      return {
        accessToken: handleGenToken(payload, expiryTimeEnum[TOKENS.ACCESS]),
        refreshToken: handleGenToken(payload, expiryTimeEnum[TOKENS.REFRESH]),
        csrfToken: handleGenToken(payload, expiryTimeEnum[TOKENS.CSRF]),
      };
  }
};

// export const genRefreshToken = (paylaod: UserProfile) => {
//     const

// }
