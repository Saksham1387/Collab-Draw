import express from "express";
import { roomController } from "../controllers/roomControllers";
import { middleware } from "../middleware";

const roomRouter = express.Router();

roomRouter.post("/", middleware, roomController.createRoom);
roomRouter.get("/:slug", middleware, roomController.getRoomBySlug);

export default roomRouter;
