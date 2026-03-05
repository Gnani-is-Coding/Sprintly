import type { Response } from "express";
import {
  CookieHelper,
  handleCatchBlockError,
  handleValidation,
} from "../../utils";
import DB from "../db";
import { password } from "bun";
import { generateToken } from "../jwtToken/generateTokens";

type ILoginType = {
  userName: string;
  password: string;
};
export const loginservice = async (loginPayload: ILoginType, res: Response) => {
  try {
    const { success: payloadSuccess } = handleValidation(loginPayload, res, [
      "userName",
      "password",
    ]);

    if (!payloadSuccess) return;

    const dbResponse = DB.get(loginPayload.userName);

    const { success: dbResponseValidation } = handleValidation(
      dbResponse,
      res,
      undefined,
      "User Doesn't Exist",
    );

    if (!dbResponseValidation) return;

    console.log("Before check ");
    // comparing password
    const isPsswdMatch = await password.verify(
      loginPayload.password,
      dbResponse!.password, // null assertion cause we know that this cant be undefined, cause of the guard at line 21.
    );

    if (isPsswdMatch) {
      const { refreshToken, accessToken } = generateToken("BOTH", {
        userName: loginPayload.userName,
      });

      // Store in DB n set in cookies.
      DB.put({ ...dbResponse!, refreshToken: refreshToken });
      CookieHelper(res, refreshToken, accessToken);

      res.send({ data: "Successfully Logged in !" });
    } else {
      res.status(401).send({ data: "incorrect password" });
    }
  } catch (err) {
    handleCatchBlockError(err, res, "Login-service");
  }
};

// Takes care of Bussiness Logic in here.
// Pure business logic. Framework-agnostic — no req, no res, no Express anywhere.
