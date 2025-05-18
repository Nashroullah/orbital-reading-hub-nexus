
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from "@/components/ui/sonner";

// Define User types and roles
export type UserRole = 'admin' | 'faculty' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  // Add admin functions
  getAllUsers: () => User[];
  updateUserRole: (userId: string, newRole: UserRole) => void;
}

// Create the Auth Context
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  // Add admin functions
  getAllUsers: () => [],
  updateUserRole: () => {},
});

// Mock users for demo purposes
const mockUsers: User[] = [
  { 
    id: '1', 
    name: 'Admin User', 
    email: 'admin@reading-orbital.com', 
    role: 'admin',
    profileImage: '/placeholder.svg' 
  },
  { 
    id: '2', 
    name: 'Faculty Member', 
    email: 'faculty@reading-orbital.com', 
    role: 'faculty',
    profileImage: '/placeholder.svg' 
  },
  { 
    id: '3', 
    name: 'Student User', 
    email: 'student@reading-orbital.com', 
    role: 'student',
    profileImage: '/placeholder.svg' 
  },
];

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState<User[]>(mockUsers);

  // Check for existing session on load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    // For demo purposes - normally would call an API
    const foundUser = users.find(u => u.email === email);
    
    if (foundUser && password === 'password') {
      setUser(foundUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(foundUser));
      toast.success(`Welcome back, ${foundUser.name}!`);
    } else {
      toast.error("Invalid email or password");
      throw new Error('Invalid email or password');
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string, role: UserRole) => {
    // Check if email already exists
    if (users.some(u => u.email === email)) {
      toast.error("Email already registered");
      throw new Error('Email already registered');
    }

    // Create new user (in a real app, this would include password hashing & DB storage)
    const newUser: User = {
      id: (users.length + 1).toString(),
      name,
      email,
      role,
      profileImage: '/placeholder.svg',
    };

    // Add to mock users and log in
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(newUser));
    toast.success("Registration successful!");
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    toast.info("You've been logged out");
  };

  // Admin functions
  const getAllUsers = () => {
    // In a real app, this would be an API call that checks user permissions
    if (user?.role !== 'admin') {
      toast.error("You don't have permission to view all users");
      return [];
    }
    return users;
  };

  const updateUserRole = (userId: string, newRole: UserRole) => {
    // In a real app, this would be an API call that checks user permissions
    if (user?.role !== 'admin') {
      toast.error("You don't have permission to update user roles");
      return;
    }

    const updatedUsers = users.map(u => {
      if (u.id === userId) {
        return { ...u, role: newRole };
      }
      return u;
    });
    
    setUsers(updatedUsers);
    
    // If the current user's role is being changed, update it
    if (user?.id === userId) {
      const updatedUser = { ...user, role: newRole };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      login, 
      register, 
      logout,
      getAllUsers,
      updateUserRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access to auth context
export const useAuth = () => useContext(AuthContext);
