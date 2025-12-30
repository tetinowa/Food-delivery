"use client";

import { useState } from "react";
import { Header } from "./_components/header";
import { CategorySection } from "./_components/category-section";
import { Footer } from "./_components/footer";
import {
  appetizers,
  salads,
  lunchFavorites,
  moreSalads,
} from "./_components/data";
import { FoodInfoDialog } from "./_components/food-info-dialog";
import { FoodCardProps } from "./_components/types";

export default function Home() {
  const [selectedFood, setSelectedFood] = useState<FoodCardProps | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleFoodClick = (food: FoodCardProps) => {
    setSelectedFood(food);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <img src="/misc/Container.png" />
      <div className="bg-[#404040] w-full flex flex-col gap-22 items-center py-22">
        <CategorySection
          title="Appetizers"
          items={appetizers}
          onFoodClick={handleFoodClick}
        />
        <CategorySection
          title="Salads"
          items={salads}
          onFoodClick={handleFoodClick}
        />
        <CategorySection
          title="Lunch favorites"
          items={lunchFavorites}
          onFoodClick={handleFoodClick}
        />
        <CategorySection
          title="Salads"
          items={moreSalads}
          onFoodClick={handleFoodClick}
        />
      </div>
      <Footer />
      <FoodInfoDialog
        food={selectedFood}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
}
