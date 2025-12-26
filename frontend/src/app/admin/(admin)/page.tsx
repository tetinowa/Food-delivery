import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { OrderTable } from "@/app/(client)/_components/ordertable";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AppSidebar />
      <div className="w-vw h-vh flex flex-col justify-center pt-10">
        <div className="w-[1171px] flex flex-col gap-6">
          <div className="w-[1171px] flex justify-end">
            <img
              src="/misc/admin.jpg"
              alt="admin icon"
              className="w-9 h-9 rounded-full"
            />
          </div>

          <OrderTable />
        </div>
      </div>
    </div>
  );
}
