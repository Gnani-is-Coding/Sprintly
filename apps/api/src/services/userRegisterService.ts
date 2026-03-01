import { password } from "bun";
import DB from "./db";
import type { Response } from "express";
import {
  CookieHelper,
  handleCatchBlockError,
  handleValidation,
} from "../utils";
import type { UserProfile } from "@sprintly/shared";
import { generateToken } from "./jwtToken/generateTokens";

const userRegisterService = async (userDetails: UserProfile, res: Response) => {
  try {
    const { success: isUserDetailsValid } = handleValidation(userDetails, res, [
      "userName",
      "fullName",
      "password",
    ]);

    if (!isUserDetailsValid) return;

    const { password: inputPasswrd, userName } = userDetails;
    const storedUser = DB.get(userName); // make sure our "usernames" are unique.

    if (storedUser) {
      return res
        .status(400)
        .send({ data: "User already Exists, please Login" });
    }

    const hashedPassword = await password.hash(inputPasswrd);

    const response = DB.set({ ...userDetails, password: hashedPassword });
    console.log("Saved in DB");
    console.log(hashedPassword, "hashedPassword");

    if (response.status) {
      // deep copy
      // JSON.parse(JSON.stringify(userDetails))
      // inbuilt-method structuredClone(userDetails);

      const { accessToken, refreshToken } = generateToken("BOTH", {
        userName: userDetails.userName,
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

      CookieHelper(res, refreshToken, accessToken);
      const responseDetails = JSON.parse(JSON.stringify(userDetails)); // serialization and deserialization
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
