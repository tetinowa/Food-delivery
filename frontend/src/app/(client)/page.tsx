"use client";

import { useState, useEffect } from "react";
import { Header } from "./_components/header";
import { CategorySection } from "./_components/category-section";
import { Footer } from "./_components/footer";
import { FoodInfoDialog } from "./_components/food-info-dialog";
import { FoodCardProps, FoodFromAPI } from "./_components/types";

export default function Home() {
  const [selectedFood, setSelectedFood] = useState<FoodCardProps | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [foodsByCategory, setFoodsByCategory] = useState<
    Record<string, FoodCardProps[]>
  >({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch("http://localhost:3001/foods");
        const foods: FoodFromAPI[] = await response.json();

        const grouped = foods.reduce(
          (acc, food) => {
            const category = food.category;
            if (!acc[category]) {
              acc[category] = [];
            }
            acc[category].push({
              id: food._id,
              name: food.name,
              price: food.price,
              description: food.description,
              imageSrc: food.image || "/placeholder-food.jpg",
              category: food.category,
              ingredients: food.ingredients,
            });
            return acc;
          },
          {} as Record<string, FoodCardProps[]>
        );

        setFoodsByCategory(grouped);
      } catch (error) {
        console.error("Failed to fetch foods:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  const handleFoodClick = (food: FoodCardProps) => {
    setSelectedFood(food);
    setIsDialogOpen(true);
  };

  const categories = Object.keys(foodsByCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <img src="/misc/Container.png" />
      <div className="bg-[#404040] w-full flex flex-col gap-22 items-center py-22">
        {loading ? (
          <div className="text-white text-xl">Loading...</div>
        ) : categories.length > 0 ? (
          categories.map((category) => (
            <CategorySection
              key={category}
              title={category}
              items={foodsByCategory[category]}
              onFoodClick={handleFoodClick}
            />
          ))
        ) : (
          <div className="text-white text-xl">No foods available</div>
        )}
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
