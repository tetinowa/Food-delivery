import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { OrderModel } from "@/lib/models/order";
import { UserModel } from "@/lib/models/user";

export async function POST(request: Request) {
  await connectToDatabase();
  const body = await request.json();

  const order = await OrderModel.create({
    userId: body.userId,
    items: body.items,
    totalPrice: body.totalPrice,
    deliveryAddress: body.deliveryAddress,
    status: body.status || "Pending",
  });

  if (body.userId && body.deliveryAddress) {
    await UserModel.findByIdAndUpdate(body.userId, { address: body.deliveryAddress });
  }

  return NextResponse.json(order, { status: 201 });
}
