import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { OrderModel } from "@/lib/models/order";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectToDatabase();
  const { id } = await params;
  const { status } = await request.json();

  if (!["Pending", "Delivered", "Cancelled"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const order = await OrderModel.findByIdAndUpdate(id, { status }, { new: true });
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });
  return NextResponse.json(order);
}
