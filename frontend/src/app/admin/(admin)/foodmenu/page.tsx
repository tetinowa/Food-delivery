"use client";

import { Card } from "@/components/ui/card";
import { CreateFoodDialog } from "../../_components/CreateFoodDialog";
import { useEffect, useState } from "react";
import { FoodCard } from "../../_components/FoodCard";
import { api } from "@/lib/axios";
import { Food } from "../../_components/type";

interface Category {
  _id: string;
  name: string;
}

export default function FoodMenu() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  const getData = async () => {
    const { data } = await api.get<Food[]>("/foods");
    setFoods(data);
  };

  const getCategories = async () => {
    const { data } = await api.get<Category[]>("/categories");
    setCategories(data);
  };

  useEffect(() => {
    getData();
    getCategories();
  }, []);

  return (
    <main className="flex flex-col gap-6 mt-6 mb-10 mx-auto">
      <Card className="flex flex-col rounded-xl p-6 gap-4">
        <h1 className="text-[20px] font-semibold">Dishes category</h1>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategoryId(null)}
            className={`px-3 py-1 rounded-full text-sm cursor-pointer transition-colors ${
              selectedCategoryId === null
                ? "bg-black text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => setSelectedCategoryId(category._id)}
              className={`px-3 py-1 rounded-full text-sm cursor-pointer transition-colors ${
                selectedCategoryId === category._id
                  ? "bg-black text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </Card>
      <Card className="grid grid-cols-5 gap-4 p-6">
        <CreateFoodDialog onFoodCreated={getData} />

        {foods
          .filter((food) =>
            selectedCategoryId === null
              ? true
              : food.categoryId === selectedCategoryId
          )
          .map((food) => (
            <FoodCard
              key={food._id}
              id={food._id}
              name={food.name}
              price={food.price}
              ingredients={food.description || food.ingredients || ""}
              image={food.image}
              categoryId={food.categoryId}
              onFoodUpdated={getData}
            />
          ))}
      </Card>
    </main>
  );
}
