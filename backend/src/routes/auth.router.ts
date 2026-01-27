import { Router } from "express";
import { login } from "../controllers/auth/login.ts";
import { register } from "../controllers/auth/register.ts";
import { get } from "node:http";
import { getMe } from "../controllers/auth/get-me.ts";

const AuthRouter = Router();

AuthRouter.post("/login", login).post("/register", register).get("/me", getMe);

export { AuthRouter };
