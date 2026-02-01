import type { RequestHandler } from "express";
import { OrderModel } from "../../database/schema/order.schema.ts";

export const getOrders: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.query;
    const filter = userId ? { userId } : {};
    const orders = await OrderModel.find(filter)
      .populate("userId", "email")
      .populate("items.foodId", "name image")
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};
