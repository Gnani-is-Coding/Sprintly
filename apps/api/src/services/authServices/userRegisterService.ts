import { password } from "bun";
import DB from "../db";
import type { Response } from "express";
import {
  CookieHelper,
  handleCatchBlockError,
  requestValidator,
} from "../../utils";
import { generateToken } from "../jwtToken/generateTokens";
import { registerSchema } from "@sprintly/shared/schemas";

const userRegisterService = async (useDetails: unknown, res: Response) => {
  try {
    const r = requestValidator(registerSchema, useDetails, res);

    if (!r.status) return;

    const { value: structuredUserDetails } = r;

    const { password: inputPasswrd, email } = structuredUserDetails;
    const storedUser = DB.get(email); // make sure our "emails" are unique.

    if (storedUser) {
      return res
        .status(400)
        .send({ data: "User already Exists, please Login" });
    }

    const hashedPassword = await password.hash(inputPasswrd);

    const response = DB.set({
      ...structuredUserDetails,
      password: hashedPassword,
    });
    console.log("Saved in DB");
    console.log(hashedPassword, "hashedPassword");

    if (response.status) {
      // deep copy
      // JSON.parse(JSON.stringify(structuredUserDetails))
      // inbuilt-method structuredClone(structuredUserDetails);

      const { accessToken, refreshToken, csrfToken } = generateToken("ALL", {
        email: structuredUserDetails!.email,
      });

      //But this is lossy:
      // Because JSON (the format) only supports strings, numbers, booleans, arrays, objects, and null. Anything else gets mangled or
      // dropped during the stringify step:

      // - undefined → silently dropped
      // - Date objects → become strings ("2026-03-01T...") and stay strings after parse
      // - Map, Set → become {}
      // - Functions → dropped entirely
      // - NaN, Infinity → become null

      // structuredClone does the same deep-clone job but uses a proper cloning algorithm internally (no string middleman), so it handles
      // Date, Map, Set, ArrayBuffer, etc. correctly.

      CookieHelper(res, refreshToken, accessToken, csrfToken);
      const responseDetails = JSON.parse(JSON.stringify(structuredUserDetails)); // serialization and deserialization
      delete responseDetails.password;

      res.send({
        data: responseDetails,
        status: "Successfully Done !!",
      });
    }
  } catch (err: unknown) {
    handleCatchBlockError(err, res, "UserRegistration-Service");
  }
};

export default userRegisterService;
