"use client";

import { Card } from "@/components/ui/card";
import { Pencil } from "lucide-react";
import { CreateFoodDialog } from "./CreateFoodDialog";
import { useState } from "react";

type FoodCardProps = {
  id: string;
  name: string;
  price: number;
  ingredients: string;
  image: string;
  categoryId: string;
  onFoodUpdated?: () => void;
};

export function FoodCard({
  id,
  name,
  price,
  ingredients,
  image,
  categoryId,
  onFoodUpdated,
}: FoodCardProps) {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col rounded-4xl p-4 gap-5 border">
        <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-linear-to-br from-orange-200 to-red-200">
          {image && (
            <img src={image} alt={name} className="w-full h-full object-cover" />
          )}
          <button
            onClick={() => setEditOpen(true)}
            className="absolute bottom-4 right-4 w-11 h-11 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 shadow-md"
          >
            <Pencil className="w-4 h-4 text-[#ef4444]" />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-medium text-[14px] leading-5 text-[#ef4444]">
              {name}
            </h4>
            <span className="text-[12px] font-regular leading-4">${price}</span>
          </div>
          <p className="text-xs text-[#09090b] font-regular leading-4">
            {ingredients}
          </p>
        </div>
      </Card>

      <CreateFoodDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        editFood={{
          _id: id,
          name,
          price,
          image,
          ingredients,
          categoryId,
        }}
        onFoodCreated={onFoodUpdated}
      />
    </>
  );
}
