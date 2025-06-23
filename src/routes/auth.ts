import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controller";

const route = Router();

route.post("/register", registerUser as any);

route.post("/login", loginUser as any);

export default route;
