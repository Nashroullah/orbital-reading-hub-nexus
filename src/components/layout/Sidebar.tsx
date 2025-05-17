
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
import { X } from "lucide-react";
import {
  BookOpen,
  User,
  Home,
  BookCopy,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const location = useLocation();
  const { collapsed } = useSidebar();

  if (!user) return null;

  const isActive = (path: string) => location.pathname === path;

  const isAdmin = user.role === "admin";
  const isFaculty = user.role === "faculty" || isAdmin;
  const isStudent = user.role === "student" || isFaculty;

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "w-full flex items-center py-2 px-3 rounded-md",
      isActive
        ? "bg-primary/10 text-primary font-medium"
        : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700/50"
    );

  return (
    <SidebarComponent
      className={cn(
        "bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all",
        collapsed ? "w-16" : "w-64"
      )}
      collapsible
    >
      <div className="flex items-center justify-between p-2 h-14">
        <SidebarTrigger className="mx-2" />
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="lg:hidden"
          aria-label="Close Sidebar"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <SidebarContent>
        <SidebarGroup defaultOpen>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/dashboard" className={getNavLinkClass}>
                    <Home className="h-5 w-5 mr-3" />
                    {!collapsed && <span>Dashboard</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/books" className={getNavLinkClass}>
                    <BookOpen className="h-5 w-5 mr-3" />
                    {!collapsed && <span>Browse Books</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/my-books" className={getNavLinkClass}>
                    <BookCopy className="h-5 w-5 mr-3" />
                    {!collapsed && <span>My Books</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/profile" className={getNavLinkClass}>
                    <User className="h-5 w-5 mr-3" />
                    {!collapsed && <span>Profile</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarComponent>
  );
};

export default Sidebar;
