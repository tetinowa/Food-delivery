import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/admin/_components/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="w-full min-h-screen">
      <AppSidebar />
      <main className="w-fit-content flex-1 p-6 bg-[#f4f4f5]">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
