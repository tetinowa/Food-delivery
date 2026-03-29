import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { UserModel } from "@/lib/models/user";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

export async function POST(request: Request) {
  await connectToDatabase();
  const { email, password } = await request.json();

  const user = await UserModel.findOne({ email });
  if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

  const { password: userPassword, ...restUserInfo } = user.toObject();
  if (userPassword !== password) {
    return NextResponse.json({ message: "Username or password wrong" }, { status: 401 });
  }

  const accessToken = jwt.sign({ user: restUserInfo }, JWT_SECRET, { expiresIn: "1d" });
  return NextResponse.json({ user: restUserInfo, accessToken });
}
