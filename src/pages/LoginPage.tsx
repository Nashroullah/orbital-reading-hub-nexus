
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const { isAuthenticated, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 flex flex-col items-center">
            <BookOpen className="h-12 w-12 text-primary mb-4" />
            <h1 className="text-3xl font-serif font-bold text-center">The Reading Orbital</h1>
            <p className="text-gray-600 dark:text-gray-400 text-center mt-2">
              Welcome back to your literary journey
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Log in</CardTitle>
              <CardDescription>Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link to="#" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input 
                    id="password" 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {error && (
                  <div className="p-3 rounded-md bg-red-50 text-red-500 text-sm">
                    {error}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Logging in...' : 'Log in'}
                </Button>
                <div className="text-sm text-center text-muted-foreground">
                  <span>Don't have an account? </span>
                  <Link to="/register" className="text-primary font-medium hover:underline">
                    Sign up
                  </Link>
                </div>
                <div className="text-xs text-center text-muted-foreground">
                  For demo purposes, use:
                  <br />
                  <code>admin@reading-orbital.com</code> / <code>password</code> (Admin)
                  <br />
                  <code>faculty@reading-orbital.com</code> / <code>password</code> (Faculty)
                  <br />
                  <code>student@reading-orbital.com</code> / <code>password</code> (Student)
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden md:block flex-1 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGlicmFyeXxlbnwwfHwwfHx8MA%3D%3D')" }}>
        <div className="h-full w-full bg-black/30 flex items-center justify-center p-12">
          <div className="max-w-lg text-white">
            <h2 className="text-3xl font-serif font-bold mb-4">
              Embark on a Literary Adventure
            </h2>
            <p className="text-xl">
              Access thousands of books, track your reading habits, and connect with a community of readers at The Reading Orbital.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
