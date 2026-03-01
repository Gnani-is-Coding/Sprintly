import type { Response } from "express";

export const handleCatchBlockError = (err: unknown, res: Response) => {
  const message = err instanceof Error ? err.message : "Unkown Error";
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
