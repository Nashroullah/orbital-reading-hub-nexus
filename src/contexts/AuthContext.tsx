
import React, { createContext, useContext } from 'react';
import { toast } from "@/components/ui/sonner";
import { User, UserRole, AuthContextType, PendingVerification } from '@/types/auth';
import { useAuthState } from '@/hooks/useAuthState';
import * as authService from '@/services/authService';

// Create the Auth Context
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  loginWithPhone: async () => {},
  verifyOTP: async () => {},
  register: async () => {},
  registerWithPhone: async () => {},
  requestVoiceOTP: async () => {},
  logout: () => {},
  requestPasswordReset: async () => {},
  resetPassword: async () => {},
  getAllUsers: () => [],
  updateUserRole: () => {},
});

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { 
    user, setUser,
    isAuthenticated, setIsAuthenticated,
    users, setUsers,
    pendingVerifications, setPendingVerifications,
    isLoading, setIsLoading
  } = useAuthState();

  // Login with email function
  const login = async (email: string, password: string) => {
    try {
      const foundUser = await authService.loginWithEmail(email, password, users);
      setUser(foundUser);
      setIsAuthenticated(true);
    } catch (err) {
      throw err;
    }
  };

  // Login with phone function
  const loginWithPhone = async (phone: string) => {
    try {
      setIsLoading(true);
      const response = await authService.sendPhoneVerification(phone, users, false);
      return response; // Return the response which might contain development_otp
    } catch (err) {
      console.error("Error sending OTP:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Request voice call OTP
  const requestVoiceOTP = async (phone: string) => {
    try {
      setIsLoading(true);
      
      // Check if this is a registration flow
      const isRegistration = !!pendingVerifications[phone];
      const response = await authService.requestVoiceOTP(phone, users, isRegistration);
      return response; // Return the response which might contain development_otp
    } catch (err) {
      console.error("Error requesting voice OTP:", err);
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
      const pendingData = pendingVerifications[phone];
      
      const result = await authService.verifyPhoneOTP(phone, otp, users, isRegistration ? pendingData : undefined);
      
      setUser(result.user);
      setUsers(result.updatedUsers);
      setIsAuthenticated(true);
      
      // Clear the pending verification if it was a registration
      if (isRegistration) {
        const newVerifications: Record<string, { name?: string, role?: UserRole }> = { ...pendingVerifications };
        delete newVerifications[phone];
        setPendingVerifications(newVerifications);
      }
    } catch (err) {
      console.error("Error verifying OTP:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Register with email function
  const register = async (name: string, email: string, password: string, role: UserRole) => {
    try {
      const { user: newUser, updatedUsers } = await authService.registerWithEmail(
        name, email, password, role, users
      );
      
      setUser(newUser);
      setUsers(updatedUsers);
      setIsAuthenticated(true);
    } catch (err) {
      throw err;
    }
  };

  // Register with phone function
  const registerWithPhone = async (name: string, phone: string, role: UserRole) => {
    try {
      setIsLoading(true);
      
      const response = await authService.sendPhoneVerification(phone, users, true, name, role);
      
      // Store the registration data for verification
      const newVerifications: Record<string, { name?: string, role?: UserRole }> = { 
        ...pendingVerifications,
        [phone]: { name: response.name, role: response.role }
      };
      setPendingVerifications(newVerifications);
      
      return response; // Return the response which might contain development_otp
    } catch (err) {
      console.error("Error sending OTP:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Request Password Reset function
  const requestPasswordReset = async (email: string) => {
    try {
      await authService.requestPasswordReset(email, users);
    } catch (err) {
      console.error("Error requesting password reset:", err);
      throw err;
    }
  };
  
  // Reset Password function
  const resetPassword = async (token: string, newPassword: string) => {
    try {
      await authService.resetPassword(token, newPassword);
    } catch (err) {
      console.error("Error resetting password:", err);
      throw err;
    }
  };

  // Logout function
  const logout = () => {
    authService.logoutUser();
    setUser(null);
    setIsAuthenticated(false);
  };

  // Admin functions
  const getAllUsers = () => {
    return authService.getUsersList(users, user);
  };

  const updateUserRole = (userId: string, newRole: UserRole) => {
    const { users: updatedUsers, updatedCurrentUser } = authService.updateRole(userId, newRole, users, user);
    setUsers(updatedUsers);
    
    if (updatedCurrentUser !== user) {
      setUser(updatedCurrentUser);
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
      requestVoiceOTP,
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

// Re-export UserRole from types file
export type { UserRole } from '@/types/auth';

// Custom hook for easy access to auth context
export const useAuth = () => useContext(AuthContext);
