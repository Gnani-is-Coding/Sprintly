import type { Response } from "express";
import { handleCatchBlockError, handleValidation } from "../utils";
import DB from "./db";
import { password } from "bun";

type ILoginType = {
  username: string;
  password: string;
};
export const loginservice = async (loginPayload: ILoginType, res: Response) => {
  try {
    const { success: payloadSuccess } = handleValidation(loginPayload, res, [
      "username",
      "password",
    ]);

    if (!payloadSuccess) return;

    const dbResponse = DB.get(loginPayload.username);

    const { success: dbResponseValidation } = handleValidation(
      dbResponse,
      res,
      undefined,
      "User Doesn't Exist",
    );

    if (!dbResponseValidation) return;

    // comparing password
    const isPwdMatch = await password.verify(
      loginPayload.password,
      dbResponse!.password, // null assertion cause we know that this cant be undefined, caus eof the guard above.
    );

    if (isPwdMatch) {
      // Token generation logic
    }
  } catch (err) {
    handleCatchBlockError(err, res);
  }
};
