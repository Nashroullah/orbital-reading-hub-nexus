import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, MessageSquare, PhoneCall } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

const PhoneVerificationPage: React.FC = () => {
  const { verifyOTP, loginWithPhone, registerWithPhone, requestVoiceOTP } = useAuth();
  const [otp, setOtp] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [useManualInput, setUseManualInput] = useState(true); // Default to manual input
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const phone = queryParams.get('phone') || '';
  const isRegistration = queryParams.get('isRegistration') === 'true';
  const name = queryParams.get('name') || '';
  const role = queryParams.get('role') || 'student';
  const [developmentOtp, setDevelopmentOtp] = useState<string>('');

  useEffect(() => {
    if (!phone) {
      toast.error('Phone number is missing');
      navigate('/login');
    }
  }, [phone, navigate]);

  // Check URL for development OTP
  useEffect(() => {
    const devOtp = queryParams.get('dev_otp');
    if (devOtp) {
      setDevelopmentOtp(devOtp);
      setOtp(devOtp);
      toast.info("Development OTP pre-filled for testing");
    }
  }, [queryParams]);

  // Cooldown timer for resend button
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    
    try {
      await verifyOTP(phone, otp);
      toast.success('Verification successful!');
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

  const handleManualInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow digits and limit to 6 characters
    if (/^\d*$/.test(value) && value.length <= 6) {
      setOtp(value);
    }
  };

  const handleResendOTP = async (viaCall = false) => {
    try {
      setIsLoading(true);
      if (viaCall) {
        const response = await requestVoiceOTP(phone);
        // Check if we got a development OTP
        if (response?.development_otp) {
          setDevelopmentOtp(response.development_otp);
          toast.info(`Development OTP: ${response.development_otp}`, {
            duration: 10000,
          });
        } else {
          toast.success("You will receive a call shortly with your verification code");
        }
      } else {
        let response;
        if (isRegistration) {
          response = await registerWithPhone(name, phone, role as any);
        } else {
          response = await loginWithPhone(phone);
        }

        // Check if we got a development OTP
        if (response?.development_otp) {
          setDevelopmentOtp(response.development_otp);
          toast.info(`Development OTP: ${response.development_otp}`, {
            duration: 10000,
          });
        } else {
          toast.success("Verification code resent to your phone");
        }
      }
      setResendCooldown(60); // 60 seconds cooldown
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

  const toggleInputMethod = () => {
    setUseManualInput(!useManualInput);
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
              {useManualInput ? (
                <div className="flex justify-center">
                  <Input
                    type="text"
                    value={otp}
                    onChange={handleManualInputChange}
                    placeholder="Enter 6-digit code"
                    className="text-center text-lg font-medium tracking-widest max-w-[200px]"
                    autoComplete="one-time-code"
                  />
                </div>
              ) : (
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
              )}
              
              <div className="text-sm text-center">
                <button
                  type="button"
                  onClick={toggleInputMethod}
                  className="text-elegant-purple font-medium hover:underline"
                >
                  {useManualInput ? "Use digit-by-digit input" : "Enter code manually"}
                </button>
              </div>

              {developmentOtp && (
                <div className="p-3 rounded-md bg-blue-50 text-blue-700 text-sm text-center">
                  <p className="font-semibold">Development Mode</p>
                  <p>OTP for testing: <span className="font-mono font-bold">{developmentOtp}</span></p>
                </div>
              )}
              
              <div className="text-sm text-center text-muted-foreground font-montserrat space-y-2">
                <p>
                  Didn't receive the code? 
                </p>
                <div className="flex justify-center space-x-2">
                  <button 
                    type="button" 
                    onClick={() => handleResendOTP(false)} 
                    className="flex items-center text-elegant-purple font-medium cursor-pointer hover:underline px-3 py-1 rounded-md border border-elegant-purple/20"
                    disabled={isLoading || resendCooldown > 0}
                  >
                    <MessageSquare className="h-4 w-4 mr-1" />
                    {resendCooldown > 0 ? `Resend SMS (${resendCooldown}s)` : 'Resend SMS'}
                  </button>
                  
                  <button 
                    type="button" 
                    onClick={() => handleResendOTP(true)} 
                    className="flex items-center text-elegant-purple font-medium cursor-pointer hover:underline px-3 py-1 rounded-md border border-elegant-purple/20"
                    disabled={isLoading || resendCooldown > 0}
                  >
                    <PhoneCall className="h-4 w-4 mr-1" />
                    {resendCooldown > 0 ? `Call me (${resendCooldown}s)` : 'Call me'}
                  </button>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full bg-elegant-purple hover:bg-elegant-darkpurple font-montserrat"
                disabled={isLoading || otp.length !== 6}
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
