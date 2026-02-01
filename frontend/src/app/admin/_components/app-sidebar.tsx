"use client";

import { LayoutDashboard, Truck } from "lucide-react";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Food menu",
    url: "/admin",
    icon: LayoutDashboard,
  },
  { title: "Orders", url: "/admin/orders", icon: Truck },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="flex gap-10 w-51.25 h-256 pt-9 pb-9 px-5">
          <SidebarGroupLabel>
            <div className="flex gap-2 justify-center items-center">
              <img src="/misc/logo.svg" alt="logo" className="w-10 h-10" />
              <div>
                <div className="flex text-black text-[18px] font-semibold leading-7">
                  NomNom
                </div>
                <h1 className="text-gray text-[12px] font-normal leading-4">
                  Swift delivery
                </h1>
              </div>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-6">
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="flex flex-col gap-6">
                      <a
                        href={item.url}
                        className={`flex items-center gap-2 px-6 py-1 rounded-full! transition-colors ${
                          isActive ? "bg-black text-white" : "hover:bg-gray-100"
                        }`}
                      >
                        <div className="flex justify-center items-center gap-2">
                          <item.icon className="w-5.5 h-5.5" />
                          <span>{item.title}</span>
                        </div>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
