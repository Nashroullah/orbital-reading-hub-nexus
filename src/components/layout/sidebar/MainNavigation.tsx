
import React from "react";
import { Home, BookOpen, BookCopy, User, Star } from "lucide-react";
import NavigationSection from "./NavigationSection";

interface MainNavigationProps {
  isStudent: boolean;
}

const MainNavigation: React.FC<MainNavigationProps> = ({ isStudent }) => {
  const navItems = [
    { path: "/dashboard", icon: Home, label: "Dashboard" },
    { path: "/books", icon: BookOpen, label: "Browse Books" },
    { path: "/my-books", icon: BookCopy, label: "My Books" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  // Add feedback option for students
  const allItems = isStudent 
    ? [...navItems, { path: "/feedback", icon: Star, label: "Rating & Feedback" }]
    : navItems;

  return <NavigationSection title="Navigation" items={allItems} />;
};

export default MainNavigation;
