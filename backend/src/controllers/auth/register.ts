import type { RequestHandler } from "express";
import { UserModel } from "../../database/schema/user.schema.ts";
import jwt from "jsonwebtoken";

export const register: RequestHandler = async (req, res) => {
  const { username, password, email } = req.body;

  const existingUser = await UserModel.findOne({ username });
  if (existingUser)
    return res.status(409).json({ message: "Username already exists" });

  const existingEmail = await UserModel.findOne({ email });
  if (existingEmail)
    return res.status(409).json({ message: "Email already exists" });

  const user = await UserModel.create({ username, password, email });

  res.status(201).json({ user });
};
