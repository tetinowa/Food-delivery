import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FoodCardProps } from "./types";

export function FoodCard({
  name,
  price,
  description,
  imageSrc,
  imageAlt = name,
}: FoodCardProps) {
  return (
    <Card className="rounded-[20px] overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
      <CardContent className="p-4 flex flex-col gap-5">
        <div className="relative w-full aspect-[365/210] overflow-hidden rounded-lg">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/90 hover:bg-white rounded-full w-10 h-10"
          >
            <Heart className="w-5 h-5 text-gray-700" />
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
