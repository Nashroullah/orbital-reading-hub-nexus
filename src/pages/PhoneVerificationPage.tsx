
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { Link } from 'react-router-dom';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

const PhoneVerificationPage: React.FC = () => {
  const { verifyOTP, loginWithPhone, registerWithPhone } = useAuth();
  const [otp, setOtp] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const phone = queryParams.get('phone') || '';
  const isRegistration = queryParams.get('isRegistration') === 'true';

  useEffect(() => {
    if (!phone) {
      toast.error('Phone number is missing');
      navigate('/login');
    }
  }, [phone, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    
    try {
      await verifyOTP(phone, otp);
      navigate('/dashboard');
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('An unexpected error occurred during verification');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (value: string) => {
    setOtp(value);
  };

  const handleResendOTP = async () => {
    try {
      setIsLoading(true);
      if (isRegistration) {
        // Mock name for demo purposes, in a real app you would store this in the URL or state
        const name = "New User";
        // Mock role for demo purposes, in a real app you would store this in the URL or state
        const role = "student";
        await registerWithPhone(name, phone, role);
      } else {
        await loginWithPhone(phone);
      }
      toast.success('A new verification code has been sent');
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('An unexpected error occurred while resending the code');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-elegant-cream">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <BookOpen className="h-12 w-12 text-elegant-purple mb-4" />
          <h1 className="text-3xl font-playfair font-bold text-center text-elegant-darkpurple">The Reading Orbital</h1>
        </div>
        
        <Card className="border-elegant-lightpurple/20 shadow-lg">
          <CardHeader>
            <CardTitle className="font-playfair text-elegant-darkpurple">Verify Phone Number</CardTitle>
            <CardDescription className="font-montserrat">
              Enter the 6-digit code sent to {phone}
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <InputOTP 
                  maxLength={6} 
                  value={otp} 
                  onChange={handleOtpChange}
                  render={({ slots }) => (
                    <InputOTPGroup>
                      {slots.map((slot, index) => (
                        <InputOTPSlot key={index} {...slot} index={index} />
                      ))}
                    </InputOTPGroup>
                  )}
                />
              </div>
              
              <div className="text-sm text-center text-muted-foreground font-montserrat">
                <p>
                  Didn't receive the code? 
                  <button 
                    type="button" 
                    onClick={handleResendOTP} 
                    className="text-elegant-purple font-medium cursor-pointer hover:underline ml-1"
                    disabled={isLoading}
                  >
                    Resend
                  </button>
                </p>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full bg-elegant-purple hover:bg-elegant-darkpurple font-montserrat"
                disabled={isLoading}
              >
                {isLoading ? 'Verifying...' : 'Verify'}
              </Button>
              
              <div className="text-sm text-center text-muted-foreground font-montserrat">
                <Link to={isRegistration ? "/register" : "/login"} className="text-elegant-purple font-medium hover:underline">
                  Go back to {isRegistration ? "registration" : "login"}
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default PhoneVerificationPage;
