
import React from "react";
import {
  Settings,
  User,
  FileMinus,
  BookOpen,
  FileText,
  Star,
} from "lucide-react";
import NavigationSection from "./NavigationSection";

interface AdminSectionProps {
  isAdmin: boolean;
  isFaculty: boolean;
}

const AdminSection: React.FC<AdminSectionProps> = ({ isAdmin, isFaculty }) => {
  if (!isFaculty && !isAdmin) return null;

  const adminItems = isAdmin ? [
    { path: "/admin/dashboard", icon: Settings, label: "Admin Panel" },
    { path: "/admin/users", icon: User, label: "Manage Users" },
    { path: "/admin/fines", icon: FileMinus, label: "Manage Fines" },
  ] : [];

  const facultyItems = isFaculty ? [
    { path: "/books/manage", icon: BookOpen, label: "Manage Books" },
    { path: "/reports", icon: FileText, label: "Reports" },
    { path: "/feedback", icon: Star, label: "User Feedback" },
  ] : [];

  const allItems = [...adminItems, ...facultyItems];

  return (
    <NavigationSection 
      title="Library Management" 
      items={allItems}
    />
  );
};

export default AdminSection;
