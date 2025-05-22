
import { useState, useEffect } from "react";
import { UserActivity } from "../types/library";
import { generateMockUserActivities } from "../data/mockLibraryData";
import { useAuth } from "@/contexts/AuthContext";
import { format } from 'date-fns';

export const useUserActivity = () => {
  const { user } = useAuth();
  const [userActivities, setUserActivities] = useState<UserActivity[]>([]);

  useEffect(() => {
    // Load user activities from localStorage if available
    const storedUserActivities = localStorage.getItem('userActivities');
    setUserActivities(storedUserActivities ? JSON.parse(storedUserActivities) : generateMockUserActivities());
  }, []);

  // Save user activities to localStorage when they change
  useEffect(() => {
    localStorage.setItem('userActivities', JSON.stringify(userActivities));
  }, [userActivities]);

  // Get user activities
  const getUserActivities = () => {
    if (!user) {
      // For admin users, return all activities
      if (user && user.role === 'admin') {
        return userActivities;
      }
      return [];
    }
    return userActivities.filter(a => a.userId === user.id);
  };

  // Record user activity
  const recordUserActivity = (minutes: number) => {
    if (!user) return;
    
    const today = format(new Date(), 'yyyy-MM-dd');
    
    // Check if there's already an activity record for today
    const existingActivityIndex = userActivities.findIndex(
      a => a.userId === user.id && a.date === today
    );
    
    if (existingActivityIndex >= 0) {
      // Update existing record
      const updatedActivities = [...userActivities];
      updatedActivities[existingActivityIndex] = {
        ...updatedActivities[existingActivityIndex],
        timeSpent: updatedActivities[existingActivityIndex].timeSpent + minutes,
      };
      setUserActivities(updatedActivities);
    } else {
      // Create new record
      const newActivity: UserActivity = {
        date: today,
        timeSpent: minutes,
        userId: user.id,
      };
      setUserActivities([...userActivities, newActivity]);
    }
  };

  return {
    userActivities,
    getUserActivities,
    recordUserActivity
  };
};
