"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/admin/_components/app-sidebar";
import { OrderTable } from "@/app/(client)/_components/ordertable";
import { Card } from "@/components/ui/card";
import { CreateFoodDialog } from "@/app/admin/_components/CreateFoodDialog";
import { useEffect, useState } from "react";
import { FoodCard } from "@/app/admin/_components/FoodCard";
import { api } from "@/lib/axios";
import { Food } from "../_components/type";

interface Category {
  _id: string;
  name: string;
}

export default function AdminPage() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const getData = async () => {
    const { data } = await api.get<Food[]>("/foods");
    console.log("Foods data from API:", data);
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
    <>
      <AppSidebar />
      <main className="flex flex-col gap-6 mt-6 mb-10 mx-auto">
        <Card className="flex flex-col rounded-xl p-6 gap-4">
          <h1 className="text-[20px] font-semibold">Dishes category</h1>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <span key={category._id} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                {category.name}
              </span>
            ))}
          </div>
        </Card>
        <Card className="grid grid-cols-5 gap-4 p-6">
          <CreateFoodDialog onFoodCreated={getData} />

          {foods.map((food) => (
            <FoodCard
              key={food._id}
              id={food._id}
              name={food.name}
              price={food.price}
              ingredients={food.description || food.ingredients || ""}
              image={food.image}
            />
          ))}
        </Card>
      </main>
    </>
  );
}
