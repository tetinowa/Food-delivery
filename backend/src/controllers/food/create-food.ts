import type { RequestHandler } from "express";
import { FoodModel } from "../../database/schema/food.schema.ts";

export const createFood: RequestHandler = async (req, res) => {
  const body = req.body;

  const food = await FoodModel.create({
    name: body.name,
    price: body.price,
    image: body.image || "",
    description: body.description || body.ingredients || "",
    category: body.category || "General",
    categoryId: body.categoryId,
  });

  res.status(201).json(food);
};
