import express from "express";
import userRegisterService from "../../services/authServices/userRegisterService";
import { loginservice } from "../../services/authServices/loginService";
import { handleCatchBlockError } from "../../utils";
import tokenRotationMiddleware from "../../middlewares/tokenRotationMiddleware";
import tokenRotationService from "../../services/authServices/tokenRotationService";
import { logoutService } from "../../services/authServices/logoutService";

// Route definitions only. Maps HTTP methods + paths to controller functions.

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  await userRegisterService(req.body, res);
});

authRouter.post("/login", async (req, res) => {
  await loginservice(req.body, res);
});

authRouter.post("/refresh", tokenRotationMiddleware, (req, res) => {
  try {
    // token rotation
    tokenRotationService(req, res);
  } catch (err) {
    handleCatchBlockError(err, res, "Refresh-API-Router");
  }
});

authRouter.post("/logout", (req, res) => {
  logoutService(req, res);
});

export default authRouter;
// Just takes care of Route wiring.
