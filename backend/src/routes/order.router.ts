import { Router } from "express";
import { getOrders } from "../controllers/order/get-order.ts";
import { createOrder } from "../controllers/order/create-orders.ts";
import { updateOrderStatus } from "../controllers/order/update-order-status.ts";

const orderRouter = Router();

orderRouter
  .get("/", getOrders)
  .post("/create", createOrder)
  .patch("/:id/status", updateOrderStatus);

export { orderRouter as OrderRouter };
