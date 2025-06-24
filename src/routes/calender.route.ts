import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import { generateCalender } from "../controllers/calender.controller";

const route = Router();

route.post("/generate", authMiddleware as any, generateCalender as any);

route.get("/");

export default route;
