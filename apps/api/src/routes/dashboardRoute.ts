import express from "express";
import { middleware } from "../middleware";
import { dashboardController } from "../controllers/dashboardControllers";

const dashboardRouter = express.Router();

dashboardRouter.get("/", middleware, dashboardController.getDashboard);

export default dashboardRouter;
