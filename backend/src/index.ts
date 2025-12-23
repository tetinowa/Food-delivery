import express from "express";
import { connectToDatabase } from "./database/index.ts";
import { FoodRouter } from "./routes/index.ts ";

await connectToDatabase();

const app = express();

app.use(express.json());

app.use("/foods", FoodRouter);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
