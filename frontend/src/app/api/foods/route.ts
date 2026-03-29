import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { FoodModel } from "@/lib/models/food";

export async function GET() {
  await connectToDatabase();
  const foods = await FoodModel.find();
  return NextResponse.json(foods);
}

export async function POST(request: Request) {
  await connectToDatabase();
  const body = await request.json();
  const food = await FoodModel.create({
    name: body.name,
    price: body.price,
    image: body.image || "",
    description: body.description || body.ingredients || "",
    ingredients: body.ingredients || "",
    category: body.category || "General",
    categoryId: body.categoryId,
  });
  return NextResponse.json(food, { status: 201 });
}
