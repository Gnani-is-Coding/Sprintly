import { password } from "bun";
import type { Response } from "express";
import {
  CookieHelper,
  handleCatchBlockError,
  requestValidator,
} from "../../utils";
import { generateToken } from "../jwtToken/generateTokens";
import { registerSchema } from "@sprintly/shared/schemas";
import { prisma } from "../../lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

const userRegisterService = async (useDetails: unknown, res: Response) => {
  try {
    const r = requestValidator(registerSchema, useDetails, res);

    if (!r.status) return;

    const { value: structuredUserDetails } = r;

    const hashedPassword = await password.hash(structuredUserDetails.password);
    let createUserResponse = null;

    try {
      const dbResponse = await prisma.user.create({
        data: { ...structuredUserDetails, password: hashedPassword },
        select: { id: true, name: true, email: true },
      });
      createUserResponse = dbResponse;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === "P2002")
        return res.status(409).send({ data: "User already exists" }); // relying on DB error, instead of making a lookup.
      throw e;
    }

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

    res.send({
      data: createUserResponse,
      status: "Successfully Done !!",
    });
  } catch (err: unknown) {
    handleCatchBlockError(err, res, "UserRegistration-Service");
  }
};

export default userRegisterService;
