import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  ParkingCircle,
  Camera,
  Users,
  Settings,
  BarChart3,
  Bell,
  LogOut,
  ChevronLeft,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";

interface AdminSidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
  adminName?: string;
  notifications?: number;
}

const menuItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/parkings", label: "Парковки", icon: ParkingCircle },
  { href: "/admin/cameras", label: "Камеры", icon: Camera },
  { href: "/admin/users", label: "Пользователи", icon: Users },
  { href: "/admin/analytics", label: "Аналитика", icon: BarChart3 },
  { href: "/admin/settings", label: "Настройки", icon: Settings },
];

export default function AdminSidebar({
  isCollapsed = false,
  onToggle,
  adminName = "Администратор",
  notifications = 3,
}: AdminSidebarProps) {
  const [location] = useLocation();

  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-sidebar border-r transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
      data-testid="admin-sidebar"
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
              <ParkingCircle className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-sidebar-foreground">Admin</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="text-sidebar-foreground"
          data-testid="button-toggle-sidebar"
        >
          {isCollapsed ? <Menu className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <nav className="flex-1 p-2 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href || 
            (item.href !== "/admin" && location.startsWith(item.href));
          
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3",
                  isCollapsed && "justify-center px-2"
                )}
                data-testid={`nav-admin-${item.label.toLowerCase()}`}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                {!isCollapsed && <span>{item.label}</span>}
              </Button>
            </Link>
          );
        })}
      </nav>

      <div className="p-2 space-y-2 border-t border-sidebar-border">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-3 relative",
            isCollapsed && "justify-center px-2"
          )}
          data-testid="button-notifications"
        >
          <Bell className="h-4 w-4" />
          {!isCollapsed && <span>Уведомления</span>}
          {notifications > 0 && (
            <Badge
              className={cn(
                "bg-parking-occupied text-white border-0",
                isCollapsed ? "absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center" : "ml-auto"
              )}
            >
              {notifications}
            </Badge>
          )}
        </Button>

        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </div>

      <div className="p-4 border-t border-sidebar-border">
        <div className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm">
              АД
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {adminName}
              </p>
              <p className="text-xs text-muted-foreground">Администратор</p>
            </div>
          )}
          {!isCollapsed && (
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground"
              data-testid="button-admin-logout"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </aside>
  );
}
