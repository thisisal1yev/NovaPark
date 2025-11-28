import { useState } from "react";
import AdminSidebar from "../AdminSidebar";

export default function AdminSidebarExample() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="h-[500px] border rounded-lg overflow-hidden">
      <AdminSidebar
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
        adminName="Иван Петров"
        notifications={5}
      />
    </div>
  );
}
