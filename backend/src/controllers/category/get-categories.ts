import type { RequestHandler } from "express";
import { CategoryModel } from "../../database/schema/category.schema.ts";

export const getCategories: RequestHandler = async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};
