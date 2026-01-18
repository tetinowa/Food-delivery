import type { RequestHandler } from "express";
import { FoodModel } from "../../database/schema/food.schema.ts";

export const updateFood: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const updateData: Record<string, unknown> = {};
  if (body.name !== undefined) updateData.name = body.name;
  if (body.price !== undefined) updateData.price = body.price;
  if (body.image !== undefined) updateData.image = body.image;
  if (body.description !== undefined) updateData.description = body.description;
  if (body.ingredients !== undefined) updateData.ingredients = body.ingredients;
  if (body.category !== undefined) updateData.category = body.category;
  if (body.categoryId !== undefined) updateData.categoryId = body.categoryId;

  const food = await FoodModel.findByIdAndUpdate(id, updateData, { new: true });

  if (!food) {
    res.status(404).json({ error: "Food not found" });
    return;
  }

  res.status(200).json(food);
};
