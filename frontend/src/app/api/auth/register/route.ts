import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { UserModel } from "@/lib/models/user";

export async function POST(request: Request) {
  await connectToDatabase();
  const { username, password, email } = await request.json();

  const existingUser = await UserModel.findOne({ username });
  if (existingUser) {
    return NextResponse.json({ message: "Username already exists" }, { status: 409 });
  }

  const existingEmail = await UserModel.findOne({ email });
  if (existingEmail) {
    return NextResponse.json({ message: "Email already exists" }, { status: 409 });
  }

  const user = await UserModel.create({ username, password, email });
  return NextResponse.json({ user }, { status: 201 });
}
