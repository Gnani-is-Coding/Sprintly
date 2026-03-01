import jwt from "jsonwebtoken";

enum TOKENS {
  ACCESS = "ACCESS",
  REFRESH = "REFRESH",
  BOTH = "BOTH",
}

type tokenType = keyof typeof TOKENS;

const PRIVATEKEY = process.env.PRIVATE_KEY;

const handleGenToken = (
  type: tokenType,
  payload: Record<string, unknown>,
  expiryTime: number,
) => {
  // generates token in here.
  return jwt.sign(payload, PRIVATEKEY, { expiresIn: expiryTime });
};

// type fncReturnType = {};

const expiryTimeEnum = {
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
