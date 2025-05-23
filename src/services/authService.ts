
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import { User, UserRole } from '@/types/auth';

// Authentication service methods
export const loginWithEmail = async (email: string, password: string, users: User[]) => {
  // Check for existing user
  const foundUser = users.find(u => u.email === email);
  
  if (foundUser && password === 'password') {
    localStorage.setItem('user', JSON.stringify(foundUser));
    toast.success(`Welcome back, ${foundUser.name}!`);
    return foundUser;
  } else {
    toast.error("Invalid email or password");
    throw new Error('Invalid email or password');
  }
};

export const registerWithEmail = async (
  name: string, 
  email: string, 
  password: string, 
  role: UserRole,
  users: User[]
) => {
  // Check if email already exists
  if (users.some(u => u.email === email)) {
    toast.error("Email already registered");
    throw new Error('Email already registered');
  }

  // Since we've removed all users, the first admin account will always be valid
  // Create new user
  const newUser: User = {
    id: (users.length + 1).toString(),
    name,
    email,
    role,
    profileImage: '/placeholder.svg',
  };

  localStorage.setItem('user', JSON.stringify(newUser));
  toast.success("Registration successful!");
  
  return {
    user: newUser,
    updatedUsers: [...users, newUser]
  };
};

export const sendPhoneVerification = async (phone: string, users: User[], isRegistration: boolean, name?: string, role?: UserRole) => {
  // Validate Indian phone number
  const indianPhoneRegex = /^\+91[6-9]\d{9}$/;
  if (!indianPhoneRegex.test(phone)) {
    toast.error("Please enter a valid Indian phone number");
    throw new Error("Please enter a valid Indian phone number starting with +91 followed by 10 digits");
  }

  if (isRegistration) {
    // Check if phone already exists
    if (users.some(u => u.phone === phone)) {
      toast.error("Phone number already registered");
      throw new Error('Phone number already registered');
    }
  } else {
    // Check if phone exists for login
    const foundUser = users.find(u => u.phone === phone);
    
    if (!foundUser) {
      toast.error("Phone number not registered");
      throw new Error('Phone number not registered');
    }
  }
  
  // Call the send-otp function to send SMS
  const { data, error } = await supabase.functions.invoke('send-otp', {
    body: { phone, channel: 'sms' },
  });
  
  if (error || data?.error) {
    console.error("Error sending OTP:", error || data?.error);
    toast.error("Failed to send verification code");
    throw new Error('Failed to send verification code');
  }
  
  // If we're in development, show the OTP
  if (data?.development_otp) {
    console.log(`Development OTP: ${data.development_otp}`);
    toast.info(`Development OTP: ${data.development_otp}`, {
      duration: 10000,
    });
  } else {
    toast.success("Verification code sent to your phone");
  }

  return { 
    name, 
    role,
    development_otp: data?.development_otp 
  }; 
};

export const requestVoiceOTP = async (phone: string, users: User[], isRegistration: boolean) => {
  // Validate Indian phone number
  const indianPhoneRegex = /^\+91[6-9]\d{9}$/;
  if (!indianPhoneRegex.test(phone)) {
    toast.error("Please enter a valid Indian phone number");
    throw new Error("Please enter a valid Indian phone number starting with +91 followed by 10 digits");
  }

  if (isRegistration) {
    // Check if phone already exists
    if (users.some(u => u.phone === phone)) {
      toast.error("Phone number already registered");
      throw new Error('Phone number already registered');
    }
  } else {
    // Check if phone exists for login
    const foundUser = users.find(u => u.phone === phone);
    
    if (!foundUser) {
      toast.error("Phone number not registered");
      throw new Error('Phone number not registered');
    }
  }
  
  // Call the send-otp function to request a voice call
  const { data, error } = await supabase.functions.invoke('send-otp', {
    body: { phone, channel: 'call' },
  });
  
  if (error || data?.error) {
    console.error("Error requesting voice OTP:", error || data?.error);
    toast.error("Failed to initiate verification call");
    throw new Error('Failed to initiate verification call');
  }
  
  // If we're in development, show the OTP
  if (data?.development_otp) {
    console.log(`Development Voice OTP: ${data.development_otp}`);
    toast.info(`Development Voice OTP: ${data.development_otp}`, {
      duration: 10000,
    });
    return { development_otp: data.development_otp };
  } else {
    toast.success("You will receive a call shortly with your verification code");
    return { success: true };
  }
};

export const verifyPhoneOTP = async (phone: string, otp: string, users: User[], pendingVerification?: {name?: string, role?: UserRole}) => {
  // Validate Indian phone number
  const indianPhoneRegex = /^\+91[6-9]\d{9}$/;
  if (!indianPhoneRegex.test(phone)) {
    toast.error("Invalid phone number format");
    throw new Error("Invalid phone number format");
  }

  // Call the verify-otp function to verify the code
  const { data, error } = await supabase.functions.invoke('verify-otp', {
    body: { phone, otp },
  });
  
  if (error || !data?.valid) {
    console.error("Error verifying OTP:", error || "Invalid code");
    toast.error("Invalid or expired verification code");
    throw new Error('Invalid or expired verification code');
  }
  
  // If we have pending verification data, this is a registration flow
  if (pendingVerification?.name && pendingVerification?.role) {
    // Create new user
    const newUser: User = {
      id: (users.length + 1).toString(),
      name: pendingVerification.name,
      email: `${phone.replace(/[^0-9]/g, '')}@phone.reading-orbital.com`, // Generate an email from phone
      role: pendingVerification.role,
      profileImage: '/placeholder.svg',
      phone
    };
    
    localStorage.setItem('user', JSON.stringify(newUser));
    toast.success("Registration successful!");
    
    return {
      user: newUser,
      updatedUsers: [...users, newUser]
    };
  } else {
    // This is a login flow
    const foundUser = users.find(u => u.phone === phone);
    if (foundUser) {
      localStorage.setItem('user', JSON.stringify(foundUser));
      toast.success(`Welcome back, ${foundUser.name}!`);
      return {
        user: foundUser,
        updatedUsers: users
      };
    }
    throw new Error('User not found');
  }
};

export const requestPasswordReset = async (email: string, users: User[]) => {
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

export const resetPassword = async (token: string, newPassword: string) => {
  // In a real app, this would validate the token and update the user's password
  console.log(`Password reset attempted with token: ${token}`);
  toast.success("Password has been reset successfully!");
};

export const logoutUser = () => {
  localStorage.removeItem('user');
  toast.info("You've been logged out");
};

// Admin functions
export const getUsersList = (users: User[], currentUser: User | null) => {
  if (currentUser?.role !== 'admin') {
    toast.error("You don't have permission to view all users");
    return [];
  }
  return users;
};

export const updateRole = (userId: string, newRole: UserRole, users: User[], currentUser: User | null) => {
  if (currentUser?.role !== 'admin') {
    toast.error("You don't have permission to update user roles");
    return { users, updatedCurrentUser: currentUser };
  }

  // Prevent changing the only admin's role
  const adminUsers = users.filter(u => u.role === 'admin');
  const targetUser = users.find(u => u.id === userId);
  
  if (targetUser?.role === 'admin' && adminUsers.length === 1 && newRole !== 'admin') {
    toast.error("Cannot change the only admin account to a non-admin role");
    return { users, updatedCurrentUser: currentUser };
  }

  // Check if trying to create a second admin
  if (newRole === 'admin' && adminUsers.length >= 1 && targetUser?.role !== 'admin') {
    toast.error("Only one admin account is allowed");
    return { users, updatedCurrentUser: currentUser };
  }

  const updatedUsers = users.map(u => {
    if (u.id === userId) {
      return { ...u, role: newRole };
    }
    return u;
  });
  
  let updatedCurrentUser = currentUser;
  
  // If the current user's role is being changed, update it
  if (currentUser?.id === userId) {
    updatedCurrentUser = { ...currentUser, role: newRole };
    localStorage.setItem('user', JSON.stringify(updatedCurrentUser));
  }

  return { users: updatedUsers, updatedCurrentUser };
};
