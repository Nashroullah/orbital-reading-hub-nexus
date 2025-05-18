
import React from "react";
import { LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu
} from "@/components/ui/sidebar";
import SidebarNavItem from "./SidebarNavItem";

interface NavItem {
  path: string;
  icon: LucideIcon;
  label: string;
}

interface NavigationSectionProps {
  title: string;
  items: NavItem[];
}

const NavigationSection: React.FC<NavigationSectionProps> = ({ title, items }) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarNavItem 
              key={item.path}
              to={item.path}
              icon={item.icon}
              label={item.label}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default NavigationSection;
