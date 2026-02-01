import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectToDatabase } from "./database/index.ts";
import { FoodRouter, CategoryRouter, AuthRouter, OrderRouter } from "./routes/index.ts";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/foods", FoodRouter);
app.use("/categories", CategoryRouter);
app.use("/auth", AuthRouter);
app.use("/orders", OrderRouter);

const startServer = async () => {
  await connectToDatabase();

  app.listen(3001, () => {
    console.log(`Example app listening on port 3001`);
  });
};

startServer();
