
import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import {
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar
} from "@/components/ui/sidebar";

interface SidebarNavItemProps {
  to: string;
  icon: LucideIcon;
  label: string;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ to, icon: Icon, label }) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "w-full flex items-center py-2 px-3 rounded-md transition-all duration-200",
      isActive
        ? "bg-elegant-lightpurple/20 text-elegant-darkpurple font-medium"
        : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700/50"
    );

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <NavLink to={to} className={getNavLinkClass} end>
          <Icon className="h-5 w-5 mr-3" />
          {!isCollapsed && <span>{label}</span>}
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default SidebarNavItem;
