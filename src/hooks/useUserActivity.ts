
import { useState, useEffect, useRef } from "react";
import { UserActivity } from "../types/library";
import { generateMockUserActivities } from "../data/mockLibraryData";
import { useAuth } from "@/contexts/AuthContext";
import { format } from 'date-fns';

export const useUserActivity = () => {
  const { user } = useAuth();
  const [userActivities, setUserActivities] = useState<UserActivity[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const lastUpdateRef = useRef<number>(Date.now());
  const isActiveRef = useRef<boolean>(true);

  // Load user activities from localStorage on component mount
  useEffect(() => {
    const storedUserActivities = localStorage.getItem('userActivities');
    setUserActivities(storedUserActivities ? JSON.parse(storedUserActivities) : generateMockUserActivities());
    
    // Set up visibility change listener to detect when user switches tabs
    const handleVisibilityChange = () => {
      isActiveRef.current = document.visibilityState === 'visible';
      
      if (isActiveRef.current) {
        // User returned to the page, start the timer
        lastUpdateRef.current = Date.now();
      } else if (user) {
        // User left the page, record the time spent
        const timeSpent = Math.floor((Date.now() - lastUpdateRef.current) / 1000 / 60);
        if (timeSpent >= 1) {
          recordUserActivity(timeSpent);
        }
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Set up interval to record activity every minute while the page is open
    if (user) {
      timerRef.current = setInterval(() => {
        if (isActiveRef.current) {
          recordUserActivity(1); // Record one minute of activity
          lastUpdateRef.current = Date.now();
        }
      }, 60000); // Update every minute
    }
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      // Record final activity when unmounting if the page was active
      if (isActiveRef.current && user) {
        const timeSpent = Math.floor((Date.now() - lastUpdateRef.current) / 1000 / 60);
        if (timeSpent >= 1) {
          recordUserActivity(timeSpent);
        }
      }
    };
  }, [user]);

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
    if (!user || minutes <= 0) return;
    
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
