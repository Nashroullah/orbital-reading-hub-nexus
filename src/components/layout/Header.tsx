
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, LogOut, User, Settings, BookOpen } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const isMobile = useIsMobile();

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          {isAuthenticated && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="lg:hidden"
              aria-label="Toggle Sidebar"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="font-serif font-bold text-xl tracking-tight hidden sm:inline-block">
              The Reading Orbital
            </span>
            <span className="font-serif font-bold text-xl tracking-tight sm:hidden">
              TRO
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <Link
            to="/"
            className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            Home
          </Link>
          <Link
            to="/books"
            className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            Books
          </Link>
        </nav>

        {/* User Menu or Auth Buttons */}
        <div className="flex items-center space-x-4">
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative rounded-full h-8 w-8 p-0"
                  aria-label="User menu"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user.profileImage || ""}
                      alt={user.name}
                    />
                    <AvatarFallback>
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className="flex flex-col">
                  <span>{user.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="cursor-pointer flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logout}
                  className="cursor-pointer text-red-600 dark:text-red-400"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Register</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
