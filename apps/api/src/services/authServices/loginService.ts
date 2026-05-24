import type { Response } from "express";
import {
  CookieHelper,
  handleCatchBlockError,
  requestValidator,
} from "../../utils";
import { password } from "bun";
import { generateToken } from "../jwtToken/generateTokens";
import { loginSchema } from "@sprintly/shared/schemas";
import { prisma } from "../../lib/prisma";

type ILoginType = {
  email: string;
  password: string;
};

export const loginservice = async (loginPayload: ILoginType, res: Response) => {
  try {
    const structuredPayload = requestValidator(loginSchema, loginPayload, res);

    if (!structuredPayload.status) return;

    const DBUserDetails = await prisma.user.findUnique({
      where: { email: structuredPayload.value.email },
    });
    console.log(DBUserDetails, "dbUserdetails");

    if (!DBUserDetails) {
      return res.status(401).send({ data: "User Doesnt exist !" });
    }

    // comparing password
    const isPsswdMatch = await password.verify(
      structuredPayload.value.password,
      DBUserDetails.password,
    );

    if (isPsswdMatch) {
      const { refreshToken, accessToken, csrfToken } = generateToken("ALL", {
        email: structuredPayload.value.email,
      });

      console.log(
        { refreshToken, accessToken, csrfToken },
        "{ refreshToken, accessToken, csrfToken }",
      );

      // Store in DB n set in cookies.
      await prisma.user.update({
        where: { email: structuredPayload.value.email },
        data: { refreshToken },
      });
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

// claude --resume 52a85a8b-f3d1-41a6-a69d-62f55de3411c
