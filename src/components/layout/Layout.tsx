
import React, { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Loader2 } from "lucide-react";

const Layout: React.FC<{
  requireAuth?: boolean;
  allowedRoles?: string[];
}> = ({ requireAuth = true, allowedRoles = ["admin", "faculty", "student"] }) => {
  const { isAuthenticated, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Check authentication
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check role authorization
  if (
    requireAuth &&
    isAuthenticated &&
    user &&
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (requireAuth && isAuthenticated && !user) {
    // Loading state while user data is being fetched
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1 overflow-hidden">
        {requireAuth && (
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        )}
        <main
          className={`flex-1 overflow-y-auto p-6 transition-all ${
            requireAuth ? "duration-300" : ""
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
