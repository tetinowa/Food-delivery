"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { FoodCardProps } from "./types";
import { useCart } from "@/contexts/cart-context";
import { toast } from "sonner";

interface FoodCardComponentProps extends FoodCardProps {
  onClick?: () => void;
}

export function FoodCard({
  id,
  name,
  price,
  description,
  imageSrc,
  imageAlt = name,
  onClick,
}: FoodCardComponentProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id,
      name,
      price,
      description,
      imageSrc,
    });
    toast.success(`${name} added to cart!`, {
      duration: 2000,
    });
  };

  return (
    <Card
      className="rounded-4xl overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-4 flex flex-col gap-5">
        <div className="relative w-full aspect-365/210 overflow-hidden rounded-lg">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute bottom-3 right-3 bg-white/90 hover:bg-white rounded-full w-10 h-10"
            onClick={handleAddToCart}
          >
            <Plus className="w-5 h-5 text-red" />
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg leading-6 text-[#18181B]">
              {name}
            </h3>
            <span className="font-semibold text-lg text-[#18181B]">
              ${price.toFixed(2)}
            </span>
          </div>
          <p className="text-sm text-[#71717A] leading-5">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
