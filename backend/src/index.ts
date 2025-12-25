import express from "express";
import { connectToDatabase } from "./database/index.ts";
import { FoodRouter } from "./routes/index.ts";

const app = express();

app.use(express.json());

app.use("/foods", FoodRouter);

// For Vercel serverless functions
export default async (req: any, res: any) => {
  await connectToDatabase();
  return app(req, res);
};

// For local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3001;
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
