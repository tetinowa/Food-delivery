import { Search, LayoutDashboard, Truck } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
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
  { title: "Orders", url: "/orders", icon: Truck },
];

export function AppSidebar() {
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
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
