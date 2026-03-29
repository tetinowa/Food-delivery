import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { CategoryModel } from "@/lib/models/category";

export async function GET() {
  await connectToDatabase();
  const categories = await CategoryModel.find();
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  await connectToDatabase();
  const body = await request.json();
  const category = await CategoryModel.create({ name: body.name });
  return NextResponse.json(category, { status: 201 });
}
