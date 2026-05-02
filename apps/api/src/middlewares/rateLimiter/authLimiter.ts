import rateLimit from "express-rate-limit";

const authlimiterOptions = {
  windowMs: 15 * 60 * 1000,
  limit: 5,
};

export const authLimiter = rateLimit(authlimiterOptions);
