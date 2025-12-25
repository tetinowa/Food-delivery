import express from "express";
import { connectToDatabase } from "./database/index.ts";
import { foodRouter } from "./routes/index.ts";

await connectToDatabase();

const app = express();
app.use(express.json());
