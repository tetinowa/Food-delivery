import type { RequestHandler } from "express";
import { FoodModel } from "../../database/schema/food.schema.ts";

export const updateFood: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const food = await FoodModel.findByIdAndUpdate(
    id,
    {
      name: body.name,
      price: body.price,
      image: body.image || "",
      description: body.description || body.ingredients || "",
      ingredients: body.ingredients || "",
      category: body.category || "General",
      categoryId: body.categoryId,
    },
    { new: true }
  );

  if (!food) {
    res.status(404).json({ error: "Food not found" });
    return;
  }

  res.status(200).json(food);
};
