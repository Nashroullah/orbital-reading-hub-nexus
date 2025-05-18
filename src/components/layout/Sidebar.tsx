
import React from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
import { X } from "lucide-react";

// Import our new component files
import MainNavigation from "./sidebar/MainNavigation";
import AdminSection from "./sidebar/AdminSection";
import PersonalSection from "./sidebar/PersonalSection";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const { state } = useSidebar();
  
  // Check if the sidebar is in collapsed state
  const isCollapsed = state === "collapsed";

  if (!user) return null;

  // Determine user roles
  const isAdmin = user.role === "admin";
  const isFaculty = user.role === "faculty" || isAdmin;
  const isStudent = user.role === "student" || isFaculty;

  return (
    <SidebarComponent
      className={cn(
        "bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all",
        isCollapsed ? "w-16" : "w-64"
      )}
      collapsible="icon"
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
        <MainNavigation isStudent={isStudent} />
        <AdminSection isAdmin={isAdmin} isFaculty={isFaculty} />
        <PersonalSection />
      </SidebarContent>
    </SidebarComponent>
  );
};

export default Sidebar;
