import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { FoodModel } from "@/lib/models/food";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectToDatabase();
  const { id } = await params;
  const body = await request.json();

  const updateData: Record<string, unknown> = {};
  if (body.name !== undefined) updateData.name = body.name;
  if (body.price !== undefined) updateData.price = body.price;
  if (body.image !== undefined) updateData.image = body.image;
  if (body.description !== undefined) updateData.description = body.description;
  if (body.ingredients !== undefined) updateData.ingredients = body.ingredients;
  if (body.category !== undefined) updateData.category = body.category;
  if (body.categoryId !== undefined) updateData.categoryId = body.categoryId;

  const food = await FoodModel.findByIdAndUpdate(id, updateData, { new: true });
  if (!food) return NextResponse.json({ error: "Food not found" }, { status: 404 });
  return NextResponse.json(food);
}
