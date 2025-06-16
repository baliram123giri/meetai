import { SidebarProvider } from "@/components/ui/sidebar";
import DasboardNavbar from "@/modules/dashboard/ui/components/dasboard-navbar";
import DashboardSidebar from "@/modules/dashboard/ui/components/dashboard-sidebar";
import React from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="w-screen h-screen bg-muted flex flex-col">
        <DasboardNavbar/>
        {children}
      </main>
    </SidebarProvider>
  );
}
