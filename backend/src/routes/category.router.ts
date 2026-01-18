import { Router } from "express";
import { getCategories } from "../controllers/category/get-categories.ts";
import { createCategory } from "../controllers/category/create-category.ts";

const categoryRouter = Router();

categoryRouter.get("/", getCategories).post("/create", createCategory);

export { categoryRouter as CategoryRouter };
