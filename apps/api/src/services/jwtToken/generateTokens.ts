import jwt from "jsonwebtoken";

export enum TOKENS {
  ACCESS = "ACCESS",
  REFRESH = "REFRESH",
  BOTH = "BOTH",
}

export type tokenType = keyof typeof TOKENS;

const PRIVATEKEY = process.env.PRIVATE_KEY || "Testing";

const handleGenToken = (
  type: tokenType,
  payload: Record<string, unknown>,
  expiryTime: number,
) => {
  // generates token in here.
  // #TODO: add more user details n type in here.
  return jwt.sign(payload, PRIVATEKEY, { expiresIn: expiryTime });
};

// type fncReturnType = {};

export const expiryTimeEnum = {
  [TOKENS.REFRESH]: 7 * 24 * 3600, // 7 days
  [TOKENS.ACCESS]: 15 * 60, // 15 mins only.
};

export const generateToken = (
  type: tokenType,
  payload: Record<string, unknown>,
) => {
  switch (type) {
    case "ACCESS":
      return {
        accessToken: handleGenToken("ACCESS", payload, expiryTimeEnum[type]),
      };
    case "REFRESH":
      return {
        refreshToken: handleGenToken("REFRESH", payload, expiryTimeEnum[type]),
      };
    default:
      return {
        accessToken: handleGenToken(
          "BOTH",
          payload,
          expiryTimeEnum[TOKENS.ACCESS],
        ),
        refreshToken: handleGenToken(
          "BOTH",
          payload,
          expiryTimeEnum[TOKENS.REFRESH],
        ),
      };
  }
};

// export const genRefreshToken = (paylaod: UserProfile) => {
//     const

// }
