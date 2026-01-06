import { Schema, model } from "mongoose";

const foodSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

export const FoodModel = model("Food", foodSchema);

const mockFoods = [
  {
    name: "Classic Cheeseburger",
    price: 8.99,
    image: "https://example.com/images/cheeseburger.jpg",
    description: "Juicy beef patty with melted cheese, lettuce, and tomato.",
    category: "Burgers",
    categoryId: "64f1a1a1a1a1a1a1a1a1a1a1",
  },
  {
    name: "Margherita Pizza",
    price: 10.5,
    image: "https://example.com/images/margherita.jpg",
    description:
      "Classic pizza with fresh mozzarella, basil, and tomato sauce.",
    category: "Pizza",
    categoryId: "64f1b2b2b2b2b2b2b2b2b2b2",
  },
  {
    name: "Pepperoni Pizza",
    price: 11.99,
    image: "https://example.com/images/pepperoni.jpg",
    description: "Crispy pepperoni layered over gooey mozzarella cheese.",
    category: "Pizza",
    categoryId: "64f1b2b2b2b2b2b2b2b2b2b2",
  },
  {
    name: "Chicken Alfredo Pasta",
    price: 12.75,
    image: "https://example.com/images/alfredo.jpg",
    description: "Creamy Alfredo sauce tossed with grilled chicken and pasta.",
    category: "Pasta",
    categoryId: "64f1c3c3c3c3c3c3c3c3c3c3",
  },
  {
    name: "Spaghetti Bolognese",
    price: 11.25,
    image: "https://example.com/images/bolognese.jpg",
    description: "Rich meat sauce simmered with tomatoes and herbs.",
    category: "Pasta",
    categoryId: "64f1c3c3c3c3c3c3c3c3c3c3",
  },
  {
    name: "Caesar Salad",
    price: 7.5,
    image: "https://example.com/images/caesar.jpg",
    description: "Crisp romaine lettuce with Caesar dressing and croutons.",
    category: "Salads",
    categoryId: "64f1d4d4d4d4d4d4d4d4d4d4",
  },
  {
    name: "Grilled Chicken Salad",
    price: 8.25,
    image: "https://example.com/images/chicken-salad.jpg",
    description: "Fresh greens topped with juicy grilled chicken breast.",
    category: "Salads",
    categoryId: "64f1d4d4d4d4d4d4d4d4d4d4",
  },
  {
    name: "French Fries",
    price: 3.99,
    image: "https://example.com/images/fries.jpg",
    description: "Golden crispy fries lightly salted.",
    category: "Sides",
    categoryId: "64f1e5e5e5e5e5e5e5e5e5e5",
  },
  {
    name: "Onion Rings",
    price: 4.5,
    image: "https://example.com/images/onion-rings.jpg",
    description: "Crunchy battered onion rings fried to perfection.",
    category: "Sides",
    categoryId: "64f1e5e5e5e5e5e5e5e5e5e5",
  },
  {
    name: "BBQ Chicken Wings",
    price: 9.75,
    image: "https://example.com/images/wings.jpg",
    description: "Smoky BBQ-glazed wings with a sticky finish.",
    category: "Appetizers",
    categoryId: "64f1f6f6f6f6f6f6f6f6f6f6",
  },
  {
    name: "Mozzarella Sticks",
    price: 6.25,
    image: "https://example.com/images/mozzarella.jpg",
    description: "Fried mozzarella sticks served with marinara sauce.",
    category: "Appetizers",
    categoryId: "64f1f6f6f6f6f6f6f6f6f6f6",
  },
  {
    name: "Chocolate Milkshake",
    price: 4.99,
    image: "https://example.com/images/chocolate-shake.jpg",
    description: "Thick chocolate milkshake topped with whipped cream.",
    category: "Drinks",
    categoryId: "64f1a7a7a7a7a7a7a7a7a7a7",
  },
  {
    name: "Vanilla Milkshake",
    price: 4.75,
    image: "https://example.com/images/vanilla-shake.jpg",
    description: "Classic vanilla milkshake made with real ice cream.",
    category: "Drinks",
    categoryId: "64f1a7a7a7a7a7a7a7a7a7a7",
  },
  {
    name: "Chocolate Brownie",
    price: 3.5,
    image: "https://example.com/images/brownie.jpg",
    description: "Rich and fudgy chocolate brownie.",
    category: "Desserts",
    categoryId: "64f1b8b8b8b8b8b8b8b8b8b8",
  },
  {
    name: "Cheesecake Slice",
    price: 4.25,
    image: "https://example.com/images/cheesecake.jpg",
    description: "Creamy cheesecake with a buttery biscuit base.",
    category: "Desserts",
    categoryId: "64f1b8b8b8b8b8b8b8b8b8b8",
  },
];

export default mockFoods;
