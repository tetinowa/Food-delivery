import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: false },
    description: { type: String, required: true },
    ingredients: { type: String, required: false },
    category: { type: String, required: true },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

export const FoodModel = mongoose.models.Food ?? mongoose.model("Food", foodSchema);
