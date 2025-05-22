
import { useState, useEffect } from 'react';
import { User, UserRole } from '@/types/auth';

// Add some sample users for demo purposes
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    profileImage: '/placeholder.svg',
  },
  {
    id: '2',
    name: 'Faculty User',
    email: 'faculty@example.com',
    role: 'faculty',
    profileImage: '/placeholder.svg',
  },
  {
    id: '3',
    name: 'Student User',
    email: 'student@example.com',
    role: 'student',
    profileImage: '/placeholder.svg',
  },
  {
    id: '4',
    name: 'Test User',
    email: 'test@example.com',
    role: 'student',
    profileImage: '/placeholder.svg',
  }
];

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
