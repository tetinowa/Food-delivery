import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { UserModel } from "@/lib/models/user";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

export async function PUT(request: Request) {
  const authorization = request.headers.get("authorization");
  if (!authorization) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const token = authorization.split(" ")[1];
  const { address } = await request.json();

  if (!address) {
    return NextResponse.json({ message: "Address is required" }, { status: 400 });
  }

  try {
    const { user } = jwt.verify(token!, JWT_SECRET) as { user: { _id: string } };
    await connectToDatabase();
    const updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      { address },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user: updatedUser });
  } catch {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
