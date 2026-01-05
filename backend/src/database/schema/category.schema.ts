import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

export const CategoryModel = model("Category", categorySchema);
