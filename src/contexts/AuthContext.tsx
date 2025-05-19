import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";

// Define User types and roles
export type UserRole = 'admin' | 'faculty' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
  phone?: string; // Added phone field
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithPhone: (phone: string) => Promise<void>; // Modified to return void
  verifyOTP: (phone: string, otp: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  registerWithPhone: (name: string, phone: string, role: UserRole) => Promise<void>; // Modified to return void
  logout: () => void;
  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  // Add admin functions
  getAllUsers: () => User[];
  updateUserRole: (userId: string, newRole: UserRole) => void;
}

// Create the Auth Context
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  loginWithPhone: async () => {},
  verifyOTP: async () => {},
  register: async () => {},
  registerWithPhone: async () => {},
  logout: () => {},
  requestPasswordReset: async () => {},
  resetPassword: async () => {},
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
    profileImage: '/placeholder.svg',
    phone: '+1234567890'
  },
  { 
    id: '2', 
    name: 'Faculty Member', 
    email: 'faculty@reading-orbital.com', 
    role: 'faculty',
    profileImage: '/placeholder.svg',
    phone: '+1987654321'
  },
  { 
    id: '3', 
    name: 'Student User', 
    email: 'student@reading-orbital.com', 
    role: 'student',
    profileImage: '/placeholder.svg',
    phone: '+1555123456'
  },
];

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [pendingVerifications, setPendingVerifications] = useState<Record<string, {name?: string, role?: UserRole}>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Check for existing session on load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Login with phone function
  const loginWithPhone = async (phone: string): Promise<void> => {
    // Check if phone exists
    const foundUser = users.find(u => u.phone === phone);
    
    if (!foundUser) {
      toast.error("Phone number not registered");
      throw new Error('Phone number not registered');
    }
    
    try {
      setIsLoading(true);
      
      // Call the send-otp function to send SMS
      const { error } = await supabase.functions.invoke('send-otp', {
        body: { phone },
      });
      
      if (error) {
        toast.error("Failed to send verification code");
        throw new Error('Failed to send verification code');
      }
      
      toast.success("Verification code sent to your phone");
      
    } catch (err) {
      console.error("Error sending OTP:", err);
      toast.error(err instanceof Error ? err.message : "Failed to send verification code");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Verify OTP function
  const verifyOTP = async (phone: string, otp: string): Promise<void> => {
    try {
      setIsLoading(true);
      
      // Check if this is a registration flow
      const isRegistration = !!pendingVerifications[phone];
      
      // Call the verify-otp function to verify the code
      const { data, error } = await supabase.functions.invoke('verify-otp', {
        body: { phone, otp },
      });
      
      if (error || !data?.valid) {
        toast.error("Invalid or expired verification code");
        throw new Error('Invalid or expired verification code');
      }
      
      // If we have pending verification data, this is a registration flow
      if (isRegistration) {
        const { name, role } = pendingVerifications[phone];
        
        if (!name || !role) {
          throw new Error('Registration data is missing');
        }
        
        // Create new user
        const newUser: User = {
          id: (users.length + 1).toString(),
          name,
          email: `${phone.replace(/[^0-9]/g, '')}@phone.reading-orbital.com`, // Generate an email from phone
          role,
          profileImage: '/placeholder.svg',
          phone
        };
        
        // Add to mock users
        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        
        setUser(newUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(newUser));
        toast.success("Registration successful!");
        
        // Clear the pending verification
        setPendingVerifications(prev => {
          const newVerifications = { ...prev };
          delete newVerifications[phone];
          return newVerifications;
        });
      } else {
        // This is a login flow
        const foundUser = users.find(u => u.phone === phone);
        if (foundUser) {
          setUser(foundUser);
          setIsAuthenticated(true);
          localStorage.setItem('user', JSON.stringify(foundUser));
          toast.success(`Welcome back, ${foundUser.name}!`);
        }
      }
    } catch (err) {
      console.error("Error verifying OTP:", err);
      toast.error(err instanceof Error ? err.message : "Failed to verify code");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Register with phone function
  const registerWithPhone = async (name: string, phone: string, role: UserRole): Promise<void> => {
    // Check if phone already exists
    if (users.some(u => u.phone === phone)) {
      toast.error("Phone number already registered");
      throw new Error('Phone number already registered');
    }
    
    try {
      setIsLoading(true);
      
      // Call the send-otp function to send SMS
      const { error } = await supabase.functions.invoke('send-otp', {
        body: { phone },
      });
      
      if (error) {
        toast.error("Failed to send verification code");
        throw new Error('Failed to send verification code');
      }
      
      // Store the registration data for verification
      setPendingVerifications(prev => ({
        ...prev,
        [phone]: { name, role }
      }));
      
      toast.success("Verification code sent to your phone");
      
    } catch (err) {
      console.error("Error sending OTP:", err);
      toast.error(err instanceof Error ? err.message : "Failed to send verification code");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

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
  
  // Request Password Reset function
  const requestPasswordReset = async (email: string) => {
    // In a real app, this would send a reset link via email
    // For demo purposes, we'll just check if the user exists
    const foundUser = users.find(u => u.email === email);
    
    if (!foundUser) {
      // We don't want to reveal if a user exists or not for security reasons
      // So we'll return success regardless, but log a message for demo purposes
      console.log(`Password reset requested for non-existent user: ${email}`);
      return;
    }
    
    console.log(`Password reset requested for user: ${foundUser.email}`);
    // In a real app, we would generate a token and send an email with a reset link
  };
  
  // Reset Password function
  const resetPassword = async (token: string, newPassword: string) => {
    // In a real app, this would validate the token and update the user's password
    // For demo purposes, we'll just log the attempt
    console.log(`Password reset attempted with token: ${token}`);
    toast.success("Password has been reset successfully!");
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
      loginWithPhone,
      verifyOTP,
      register, 
      registerWithPhone,
      logout,
      requestPasswordReset,
      resetPassword,
      getAllUsers,
      updateUserRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access to auth context
export const useAuth = () => useContext(AuthContext);
