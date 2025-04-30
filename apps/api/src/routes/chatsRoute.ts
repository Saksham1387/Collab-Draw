import express from "express";
import { middleware } from "../middleware";
import { chatsController } from "../controllers/chatsControllers";

const chatsRouter = express.Router();

chatsRouter.get("/:roomId", middleware, chatsController.getChatByRoomId);

export default chatsRouter
