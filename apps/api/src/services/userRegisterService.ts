import { password } from "bun";
import type { UserProfile } from "../types";
import DB from "./db";
import type { Response } from "express";
import { handleCatchBlockError, handleValidation } from "../utils";

const userRegisterService = async (userDetails: UserProfile, res: Response) => {
  try {
    handleValidation(userDetails, res, ["userName", "fullName", "password"]);

    const { password: inputPasswrd, userName } = userDetails;
    const storedUser = DB.get(userName); // make sure our usernames are unique.

    if (storedUser) {
      return res
        .status(400)
        .send({ data: "User already Exists, please Login" });
    }

    const hashedPassword = await password.hash(inputPasswrd);

    const response = DB.set({ ...userDetails, password: hashedPassword });
    console.log("Saved in DB");

    if (response.status) {
      // deep copy
      // JSON.parse(JSON.stringify(userDetails))
      // structuredClone(userDetails);

      // #TODO: Token generation logic.
      const responseDetails = JSON.parse(JSON.stringify(userDetails));
      delete responseDetails.password;

      res
        .status(200)
        .send({ data: responseDetails, status: "Successfully Done !!" });
    }
  } catch (err: unknown) {
    handleCatchBlockError(err, res);
  }
};

export default userRegisterService;
