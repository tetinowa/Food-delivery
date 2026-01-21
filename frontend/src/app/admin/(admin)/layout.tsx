"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/admin/_components/app-sidebar";
import { useAuth } from "@/contexts/AuthProvider";
import { User } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { admin } = useAuth();
  return (
    <SidebarProvider className="w-full min-h-screen">
      <AppSidebar />
      <main className="w-fit-content flex-1 p-6 bg-[#f4f4f5]">
        <div className="flex items-center justify-between mb-4">
          <SidebarTrigger />
          {admin ? (
            <div className="flex justify-center items-center w-10 h-10 rounded-full object-cover bg-red-500">
              <User />
            </div>
          ) : (
            <img
              src="/misc/admin.jpg"
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
