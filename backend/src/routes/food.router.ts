import { Router } from "express";
import { createFood } from "../controllers/food/create-food.ts";
import { getFoods } from "../controllers/food/get-foods.ts";

const foodRouter = Router();

foodRouter.get("/", getFoods).post("/", createFood);

export { foodRouter };
