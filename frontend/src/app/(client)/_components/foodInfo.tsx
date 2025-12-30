import { appetizers } from "./data";
import { salads } from "./data";
import { lunchFavorites } from "./data";
import { FoodCard } from "./food-card";
import { FoodCardProps } from "./types";

export function FoodInfo() {
  return (
    <div className="w-[826px] h-[412px] rounded-5 ">
      <h2>Appetizers</h2>
      {appetizers.map((item) => (
        <FoodCard key={item.id} {...item} />
      ))}
    </div>
  );
}
