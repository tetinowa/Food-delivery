import type { RequestHandler } from "express";
import { OrderModel } from "../../database/schema/order.schema.ts";
import { UserModel } from "../../database/schema/user.schema.ts";

export const createOrder: RequestHandler = async (req, res) => {
  const body = req.body;

  const order = await OrderModel.create({
    userId: body.userId,
    items: body.items,
    totalPrice: body.totalPrice,
    deliveryAddress: body.deliveryAddress,
    status: body.status || "Pending",
  });

  if (body.userId && body.deliveryAddress) {
    await UserModel.findByIdAndUpdate(body.userId, {
      address: body.deliveryAddress,
    });
  }

  res.status(201).json(order);
};
