import express from "express";
import { authController } from "../controllers/authControllers";
import { middleware } from "../middleware";

const authRouter = express.Router();

authRouter.post("/signin", authController.signIn);
authRouter.post("/signup", authController.signUp);
authRouter.post("/logout", authController.logOut);

export default authRouter
