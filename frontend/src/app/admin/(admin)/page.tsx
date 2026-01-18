import { AppSidebar } from "@/app/admin/_components/app-sidebar";
import FoodMenu from "./foodmenu/page";
import Orders from "./orders/page";

export default function AdminPage() {
  return (
    <>
      <AppSidebar />
      <FoodMenu />
      <Orders />
    </>
  );
}
