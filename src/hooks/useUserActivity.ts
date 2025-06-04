
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
  const sessionStartRef = useRef<number>(Date.now());

  // Load user activities from localStorage on component mount
  useEffect(() => {
    const storedUserActivities = localStorage.getItem('userActivities');
    if (storedUserActivities) {
      setUserActivities(JSON.parse(storedUserActivities));
    } else {
      // Generate some initial mock data for demonstration
      const mockData = generateMockUserActivities();
      setUserActivities(mockData);
      localStorage.setItem('userActivities', JSON.stringify(mockData));
    }
    
    // Reset session start time
    sessionStartRef.current = Date.now();
    lastUpdateRef.current = Date.now();
    
    console.log('User activity tracking initialized for user:', user?.name || 'Guest');
  }, [user]);

  // Set up activity tracking when user is logged in
  useEffect(() => {
    if (!user) return;

    // Set up visibility change listener to detect when user switches tabs
    const handleVisibilityChange = () => {
      const wasActive = isActiveRef.current;
      isActiveRef.current = document.visibilityState === 'visible';
      
      console.log('Visibility changed:', { 
        wasActive, 
        nowActive: isActiveRef.current, 
        visibilityState: document.visibilityState 
      });
      
      if (isActiveRef.current && !wasActive) {
        // User returned to the page, reset timer
        lastUpdateRef.current = Date.now();
        console.log('User returned to page, resetting timer');
      } else if (!isActiveRef.current && wasActive) {
        // User left the page, record the time spent
        const timeSpent = Math.floor((Date.now() - lastUpdateRef.current) / 1000 / 60);
        console.log('User left page, time spent:', timeSpent, 'minutes');
        if (timeSpent >= 1) {
          recordUserActivity(timeSpent);
        }
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Set up interval to record activity every 2 minutes while the page is active
    timerRef.current = setInterval(() => {
      if (isActiveRef.current) {
        const timeSpent = 2; // Record 2 minutes of activity
        console.log('Recording periodic activity:', timeSpent, 'minutes');
        recordUserActivity(timeSpent);
        lastUpdateRef.current = Date.now();
      }
    }, 120000); // Update every 2 minutes (120,000 ms)
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      // Record final activity when unmounting if the page was active
      if (isActiveRef.current) {
        const timeSpent = Math.floor((Date.now() - lastUpdateRef.current) / 1000 / 60);
        console.log('Component unmounting, final time spent:', timeSpent, 'minutes');
        if (timeSpent >= 1) {
          recordUserActivity(timeSpent);
        }
      }
    };
  }, [user]);

  // Save user activities to localStorage when they change
  useEffect(() => {
    if (userActivities.length > 0) {
      localStorage.setItem('userActivities', JSON.stringify(userActivities));
      console.log('Saved user activities to localStorage:', userActivities.length, 'records');
    }
  }, [userActivities]);

  // Get user activities
  const getUserActivities = () => {
    if (!user) {
      return [];
    }
    
    // For admin users, return all activities
    if (user.role === 'admin') {
      return userActivities;
    }
    
    // For regular users, return only their activities
    const userSpecificActivities = userActivities.filter(a => a.userId === user.id);
    console.log('Getting user activities for', user.name, ':', userSpecificActivities.length, 'records');
    return userSpecificActivities;
  };

  // Record user activity
  const recordUserActivity = (minutes: number) => {
    if (!user || minutes <= 0) {
      console.log('Skipping activity recording:', { user: !!user, minutes });
      return;
    }
    
    const today = format(new Date(), 'yyyy-MM-dd');
    console.log('Recording activity:', { userId: user.id, date: today, minutes });
    
    setUserActivities(prevActivities => {
      // Check if there's already an activity record for today
      const existingActivityIndex = prevActivities.findIndex(
        a => a.userId === user.id && a.date === today
      );
      
      let updatedActivities;
      
      if (existingActivityIndex >= 0) {
        // Update existing record
        updatedActivities = [...prevActivities];
        updatedActivities[existingActivityIndex] = {
          ...updatedActivities[existingActivityIndex],
          timeSpent: updatedActivities[existingActivityIndex].timeSpent + minutes,
        };
        console.log('Updated existing activity record:', updatedActivities[existingActivityIndex]);
      } else {
        // Create new record
        const newActivity: UserActivity = {
          date: today,
          timeSpent: minutes,
          userId: user.id,
        };
        updatedActivities = [...prevActivities, newActivity];
        console.log('Created new activity record:', newActivity);
      }
      
      return updatedActivities;
    });
  };

  return {
    userActivities,
    getUserActivities,
    recordUserActivity
  };
};
