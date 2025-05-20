
import { useState, useEffect } from 'react';
import { User, UserRole } from '@/types/auth';

// Empty users array - removing all mock accounts
const mockUsers: User[] = [];

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  users: User[];
  pendingVerifications: Record<string, {name?: string, role?: UserRole}>;
  isLoading: boolean;
}

export const useAuthState = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    users: mockUsers,
    pendingVerifications: {},
    isLoading: false
  });

  // Check for existing session on load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setState(prev => ({
        ...prev,
        user: JSON.parse(storedUser),
        isAuthenticated: true
      }));
    }
  }, []);

  // Exposed updater functions for cleaner component code
  const setUser = (user: User | null) => {
    setState(prev => ({...prev, user}));
  };

  const setIsAuthenticated = (isAuthenticated: boolean) => {
    setState(prev => ({...prev, isAuthenticated}));
  };

  const setUsers = (users: User[]) => {
    setState(prev => ({...prev, users}));
  };

  const setPendingVerifications = (pendingVerifications: Record<string, {name?: string, role?: UserRole}>) => {
    setState(prev => ({...prev, pendingVerifications}));
  };

  const setIsLoading = (isLoading: boolean) => {
    setState(prev => ({...prev, isLoading}));
  };

  return {
    ...state,
    setUser,
    setIsAuthenticated,
    setUsers,
    setPendingVerifications,
    setIsLoading
  };
};
