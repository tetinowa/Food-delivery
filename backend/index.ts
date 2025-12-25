import express from "express";
import { connectToDatabase } from "./src/database/index.ts";
import { foodRouter } from "./src/food.router.ts";

await connectToDatabase();

const app = express();
app.use(express.json());
