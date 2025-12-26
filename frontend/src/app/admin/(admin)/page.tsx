import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { DataTableDemo } from "@/app/(client)/_components/ordertable";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AppSidebar />
      <div className="w-[1171px] flex flex-col items-center gap-6">
        <div className="w-9 h-9 rounded-full overflow-hidden">
          <img src="/misc/admin.jpg" alt="admin icon" />
        </div>
        <DataTableDemo />
      </div>
    </div>
  );
}
