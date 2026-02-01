import { Router } from "express";
import { login } from "../controllers/auth/login.ts";
import { register } from "../controllers/auth/register.ts";
import { getMe } from "../controllers/auth/get-me.ts";
import { updateAddress } from "../controllers/auth/update-address.ts";

const AuthRouter = Router();

AuthRouter.post("/login", login)
  .post("/register", register)
  .get("/me", getMe)
  .put("/address", updateAddress);

export { AuthRouter };
