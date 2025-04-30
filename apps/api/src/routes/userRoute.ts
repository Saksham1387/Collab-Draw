import express from "express";
import { userController } from "../controllers/userControllers";
import { middleware } from "../middleware";

const userRouter = express.Router();

userRouter.get("/", middleware, userController.getUserInfo);

export default userRouter;
