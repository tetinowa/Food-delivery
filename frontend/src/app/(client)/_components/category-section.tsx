import { FoodCard } from "./food-card";
import { FoodCardProps } from "./types";

interface CategorySectionProps {
  title: string;
  items: FoodCardProps[];
  onFoodClick?: (food: FoodCardProps) => void;
}

export function CategorySection({
  title,
  items,
  onFoodClick,
}: CategorySectionProps) {
  return (
    <div className="w-full max-w-[1264px] mx-auto flex flex-col gap-[54px] px-4">
      <h2 className="font-semibold text-[30px] leading-[36px] text-white">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <FoodCard
            key={item.id}
            {...item}
            onClick={() => onFoodClick?.(item)}
          />
        ))}
      </div>
    </div>
  );
}
