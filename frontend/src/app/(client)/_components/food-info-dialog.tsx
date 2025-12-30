"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { FoodCardProps } from "./types";
import { useCart } from "@/contexts/cart-context";
import { toast } from "sonner";
import { useState } from "react";

interface FoodInfoDialogProps {
  food: FoodCardProps | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FoodInfoDialog({
  food,
  open,
  onOpenChange,
}: FoodInfoDialogProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!food) return null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: food.id,
        name: food.name,
        price: food.price,
        description: food.description,
        imageSrc: food.imageSrc,
      });
    }
    toast.success(`${quantity}x ${food.name} added to cart!`, {
      duration: 2000,
    });
    onOpenChange(false);
    setQuantity(1);
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[826px] sm:max-h-[412px] flex p-6 gap-6 items-center justify-center">
        <div className="flex p-6 gap-6">
          <div className="relative w-[377px] h-[364px] rounded-xl overflow-hidden">
            <img
              src={food.imageSrc}
              alt={food.imageAlt || food.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-[377px] flex flex-col justify-between">
            <div className="flex flex-col gap-3 w-[377px]">
              <DialogHeader>
                <DialogTitle className="text-[30px] font-semibold leading-9 text-[#EF4444]">
                  {food.name}
                </DialogTitle>
              </DialogHeader>
              <p className="text-[16px] font-normal leading-6 text-[#09090B]">
                {food.description}
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <p className="text-4 font-regular leading-6">Total price</p>
                  <span className="text-3xl font-bold text-[#18181B]">
                    ${(food.price * quantity).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-3 border rounded-full px-4 py-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={decrementQuantity}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="font-semibold text-lg w-8 text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={incrementQuantity}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button
                className="bg-black hover:bg-red-600 text-white px-8 py-6 rounded-full text-base font-semibold"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
