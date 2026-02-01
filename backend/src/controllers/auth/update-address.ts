import type { RequestHandler } from "express";
import { UserModel } from "../../database/schema/user.schema.ts";
import jwt from "jsonwebtoken";

export const updateAddress: RequestHandler = async (req, res) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authorization.split(" ")[1] as string;
  const { address } = req.body;

  if (!address) {
    return res.status(400).json({ message: "Address is required" });
  }

  try {
    const { user } = jwt.verify(token, "secretkey") as {
      user: { _id: string };
    };

    const updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      { address },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user: updatedUser });
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};