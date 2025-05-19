
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';

const ForgotPasswordPage: React.FC = () => {
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await requestPasswordReset(email);
      setIsSubmitted(true);
      toast.success('Password reset instructions sent');
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('An unexpected error occurred');
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
            <CardTitle className="font-playfair text-elegant-darkpurple">Reset Password</CardTitle>
            <CardDescription>
              {!isSubmitted 
                ? "Enter your email address and we'll send you instructions to reset your password" 
                : "Check your email for password reset instructions"}
            </CardDescription>
          </CardHeader>
          
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-montserrat">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="font-montserrat"
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="w-full bg-elegant-purple hover:bg-elegant-darkpurple font-montserrat"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send Reset Instructions'}
                </Button>
                <div className="text-sm text-center text-muted-foreground font-montserrat">
                  <span>Remember your password? </span>
                  <Link to="/login" className="text-elegant-purple font-medium hover:underline">
                    Log in
                  </Link>
                </div>
              </CardFooter>
            </form>
          ) : (
            <CardContent className="space-y-6 py-4">
              <div className="text-center">
                <p className="mb-4 font-montserrat">
                  If an account exists with the email <span className="font-medium">{email}</span>, you'll receive password reset instructions shortly.
                </p>
              </div>
              <Button 
                className="w-full bg-elegant-purple hover:bg-elegant-darkpurple font-montserrat"
                onClick={() => setIsSubmitted(false)}
              >
                Try another email
              </Button>
              <div className="text-sm text-center text-muted-foreground font-montserrat">
                <Link to="/login" className="text-elegant-purple font-medium hover:underline">
                  Return to login
                </Link>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
