import jwt from "jsonwebtoken";

export enum TOKENS {
  ACCESS = "ACCESS",
  REFRESH = "REFRESH",
  BOTH = "BOTH",
}

export type tokenType = keyof typeof TOKENS;

const PRIVATEKEY = process.env.PRIVATE_KEY || "Testing";

const handleGenToken = (
  payload: Record<string, unknown>,
  expiryTime: number,
) => {
  // #TODO: add more user details n type in here.
  return jwt.sign(payload, PRIVATEKEY, { expiresIn: expiryTime });
};

// type fncReturnType = {};

export const expiryTimeEnum = {
  [TOKENS.REFRESH]: 7 * 24 * 3600, // 7 days
  [TOKENS.ACCESS]: 15 * 60, // 15 mins session.
};

export const generateToken = (
  type: tokenType,
  payload: Record<string, unknown>,
) => {
  switch (type) {
    case TOKENS.ACCESS:
      return {
        accessToken: handleGenToken(payload, expiryTimeEnum[type]),
      };
    case TOKENS.REFRESH:
      return {
        refreshToken: handleGenToken(payload, expiryTimeEnum[type]),
      };
    default:
      return {
        accessToken: handleGenToken(payload, expiryTimeEnum[TOKENS.ACCESS]),
        refreshToken: handleGenToken(payload, expiryTimeEnum[TOKENS.REFRESH]),
      };
  }
};

// export const genRefreshToken = (paylaod: UserProfile) => {
//     const

// }
