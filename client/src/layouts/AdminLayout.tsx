import { useState } from "react";
import { Switch, Route } from "wouter";
import AdminSidebar from "@/components/AdminSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminCameras from "@/pages/admin/cameras";
import NotFound from "@/pages/not-found";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  } as React.CSSProperties;

  return (
    <SidebarProvider style={style}>
      <div className="flex h-screen w-full">
        <AdminSidebar
          isCollapsed={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          adminName="Администратор"
          notifications={3}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-auto bg-background">
            <Switch>
              <Route path="/admin" component={AdminDashboard} />
              <Route path="/admin/dashboard" component={AdminDashboard} />
              <Route path="/admin/cameras" component={AdminCameras} />
              <Route component={NotFound} />
            </Switch>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
