import type { Response } from "express";
import {
  CookieHelper,
  handleCatchBlockError,
  requestValidator,
} from "../../utils";
import DB from "../db";
import { password } from "bun";
import { generateToken } from "../jwtToken/generateTokens";
import { loginSchema, registerSchema } from "@sprintly/shared/schemas";

type ILoginType = {
  email: string;
  password: string;
};

export const loginservice = async (loginPayload: ILoginType, res: Response) => {
  try {
    const r = requestValidator(loginSchema, loginPayload, res);

    if (!r.status) return;

    const { value: structuredPayload } = r;
    const dbResponse = DB.get(structuredPayload!.email);

    const dbResponseValidationObj = requestValidator(
      registerSchema,
      dbResponse,
      res,
    );

    if (!dbResponseValidationObj.status) return;

    const { value: dbResponsestructured } = dbResponseValidationObj;

    console.log("Before check ");
    // comparing password
    const isPsswdMatch = await password.verify(
      loginPayload.password,
      dbResponsestructured!.password, // null assertion cause we know that this cant be undefined, cause of the guard at line 21.
    );

    if (isPsswdMatch) {
      const { refreshToken, accessToken, csrfToken } = generateToken("ALL", {
        email: dbResponsestructured!.email,
      });

      console.log(
        { refreshToken, accessToken, csrfToken },
        "{ refreshToken, accessToken, csrfToken }",
      );

      // Store in DB n set in cookies.
      DB.put({ ...dbResponsestructured!, refreshToken: refreshToken });
      CookieHelper(res, refreshToken, accessToken, csrfToken);

      res.send({ data: "Successfully Logged in !" });
    } else {
      res.status(401).send({ data: "incorrect password" });
    }
  } catch (err) {
    handleCatchBlockError(err, res, "Login-service");
  }
};

// Takes care of Bussiness Logic in here.
// Pure business logic. - no req, no res, no Express anywhere.
