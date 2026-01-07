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
import App from "next/app";

export default function AdminPage() {
  const [foods, setFoods] = useState<Food[]>([]);

  const getData = async () => {
    const { data } = await api.get<Food[]>("/foods");
    setFoods(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <AppSidebar />
      <main className="flex-1 p-8">
        <Card className="grid grid-cols-5 gap-4 p-6">
          <CreateFoodDialog onFoodCreated={getData} />

          {foods.map((food) => (
            <FoodCard
              key={food._id}
              id={food._id}
              name={food.name}
              price={food.price}
              ingredients={food.ingredients}
              image={food.image}
            />
          ))}
        </Card>
      </main>
    </>
  );
}
