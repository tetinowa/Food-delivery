import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/admin/_components/app-sidebar";
import { OrderTable } from "@/app/(client)/_components/ordertable";
import { FoodCard } from "../_components/FoodCard";

export function FoodMenu() {
  return (
    <div className="w-screen h-screen flex justify-start  ">
      <div className="flex flex-col justify-center items-center pt-10">
        <FoodCard
          id="1"
          name="Spaghetti Bolognese"
          price={12.99}
          ingredients="Spaghetti, ground beef, tomato sauce, onions, garlic, olive oil, salt, pepper"
          image="/images/spaghetti-bolognese.jpg"
        />
      </div>
    </div>
  );
}
