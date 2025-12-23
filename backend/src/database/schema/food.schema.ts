import { Schema, model } from "mongoose";

const foodSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

export const FoodModel = model("Food", foodSchema);

