
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
  Settings,
  BookCopy,
  Calendar,
  FileText,
  FileMinus,
  Clock,
  MessageSquare,
  Star,
  Search
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const location = useLocation();
  const { state } = useSidebar();
  
  // Check if the sidebar is in collapsed state
  const isCollapsed = state === "collapsed";

  if (!user) return null;

  const isActive = (path: string) => location.pathname === path;

  const isAdmin = user.role === "admin";
  const isFaculty = user.role === "faculty" || isAdmin;
  const isStudent = user.role === "student" || isFaculty;

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "w-full flex items-center py-2 px-3 rounded-md",
      isActive
        ? "bg-library-purple/10 text-library-purple font-medium"
        : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700/50"
    );

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
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/dashboard" className={getNavLinkClass}>
                    <Home className="h-5 w-5 mr-3" />
                    {!isCollapsed && <span>Dashboard</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/books" className={getNavLinkClass}>
                    <BookOpen className="h-5 w-5 mr-3" />
                    {!isCollapsed && <span>Browse Books</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/my-books" className={getNavLinkClass}>
                    <BookCopy className="h-5 w-5 mr-3" />
                    {!isCollapsed && <span>My Books</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/profile" className={getNavLinkClass}>
                    <User className="h-5 w-5 mr-3" />
                    {!isCollapsed && <span>Profile</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/search" className={getNavLinkClass}>
                    <Search className="h-5 w-5 mr-3" />
                    {!isCollapsed && <span>Search</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {isStudent && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/ai-assistant" className={getNavLinkClass}>
                      <MessageSquare className="h-5 w-5 mr-3" />
                      {!isCollapsed && <span>AI Assistant</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {(isFaculty || isAdmin) && (
          <SidebarGroup>
            <SidebarGroupLabel>Library Management</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {isAdmin && (
                  <>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <NavLink to="/admin/dashboard" className={getNavLinkClass}>
                          <Settings className="h-5 w-5 mr-3" />
                          {!isCollapsed && <span>Admin Panel</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <NavLink to="/admin/users" className={getNavLinkClass}>
                          <User className="h-5 w-5 mr-3" />
                          {!isCollapsed && <span>Manage Users</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <NavLink to="/admin/fines" className={getNavLinkClass}>
                          <FileMinus className="h-5 w-5 mr-3" />
                          {!isCollapsed && <span>Manage Fines</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </>
                )}

                {isFaculty && (
                  <>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <NavLink to="/books/manage" className={getNavLinkClass}>
                          <BookOpen className="h-5 w-5 mr-3" />
                          {!isCollapsed && <span>Manage Books</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <NavLink to="/reports" className={getNavLinkClass}>
                          <FileText className="h-5 w-5 mr-3" />
                          {!isCollapsed && <span>Reports</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <NavLink to="/feedback" className={getNavLinkClass}>
                          <Star className="h-5 w-5 mr-3" />
                          {!isCollapsed && <span>User Feedback</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        <SidebarGroup>
          <SidebarGroupLabel>Personal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/activity" className={getNavLinkClass}>
                    <Clock className="h-5 w-5 mr-3" />
                    {!isCollapsed && <span>Time Spent</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/calendar" className={getNavLinkClass}>
                    <Calendar className="h-5 w-5 mr-3" />
                    {!isCollapsed && <span>Calendar</span>}
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
