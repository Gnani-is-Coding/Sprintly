import type { Request, Response } from "express";
import { handleCatchBlockError } from "../../utils";

export const logoutService = (req: Request, res: Response) => {
  try {
    console.log(req.cookies, "Cookies from REQ");
    const { refreshToken, accessToken } = req.cookies;

    if (refreshToken) {
      console.log("Clearing refreshToken");
      res.clearCookie("refreshToken", { path: "/auth/refresh" });
    }
    if (accessToken) {
      console.log("Clearing accessToken");
      res.clearCookie("accessToken");
    }

    res.send({ data: "Suceefully Done !!!" });
  } catch (err) {
    handleCatchBlockError(err, res, "// From logout-service");
  }
};
