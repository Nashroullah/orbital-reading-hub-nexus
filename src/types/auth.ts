
import { User as SupabaseUser } from '@supabase/supabase-js';

// Define User types and roles
export type UserRole = 'admin' | 'faculty' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
  phone?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithPhone: (phone: string) => Promise<void>;
  verifyOTP: (phone: string, otp: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  registerWithPhone: (name: string, phone: string, role: UserRole) => Promise<void>;
  requestVoiceOTP: (phone: string) => Promise<void>;
  logout: () => void;
  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  // Admin functions
  getAllUsers: () => User[];
  updateUserRole: (userId: string, newRole: UserRole) => void;
}

// Define pending verification type
export interface PendingVerification {
  name?: string;
  role?: UserRole;
}
