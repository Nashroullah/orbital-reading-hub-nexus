
import React from "react";
import { Clock, Calendar } from "lucide-react";
import NavigationSection from "./NavigationSection";

const PersonalSection: React.FC = () => {
  const personalItems = [
    { path: "/activity", icon: Clock, label: "Time Spent" },
    { path: "/calendar", icon: Calendar, label: "Calendar" },
  ];

  return <NavigationSection title="Personal" items={personalItems} />;
};

export default PersonalSection;
