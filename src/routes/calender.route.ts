import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import {
  DeleteCalender,
  GetCalender,
  generateCalender,
} from "../controllers/calender.controller";

const route = Router();

route.post("/generate", authMiddleware as any, generateCalender as any);

route.get("/", authMiddleware as any, GetCalender as any);

route.delete("/:planId", authMiddleware as any, DeleteCalender as any);

export default route;
