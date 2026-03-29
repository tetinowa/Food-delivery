import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { OrderModel } from "@/lib/models/order";

export async function GET(request: Request) {
  await connectToDatabase();
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const filter = userId ? { userId } : {};
  const orders = await OrderModel.find(filter)
    .populate("userId", "email")
    .populate("items.foodId", "name image")
    .sort({ createdAt: -1 });
  return NextResponse.json(orders);
}
