import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

export async function GET(request: Request) {
  const authorization = request.headers.get("authorization");
  if (!authorization) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const token = authorization.split(" ")[1];
  try {
    const { user } = jwt.verify(token!, JWT_SECRET) as { user: unknown };
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
