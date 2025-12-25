import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
      <div className="w-[1171px] flex flex-col gap-6">
        <div className="w-9 h-9 rounded-full overflow-hidden">
          <img src="/misc/admin.jpg" alt="admin icon" />
        </div>
      </div>
    </SidebarProvider>
  );
}
