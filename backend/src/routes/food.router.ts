import { Router } from "express";
import { createFood } from "../controllers/food/create-food.ts";
import { getFoods } from "../controllers/food/get-foods.ts";
import { updateFood } from "../controllers/food/update-food.ts";

const FoodRouter = Router();

FoodRouter.get("/", getFoods).post("/", createFood).put("/:id", updateFood);

export { FoodRouter };
