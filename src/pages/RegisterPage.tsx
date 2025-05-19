import React, { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookOpen, Phone, Mail } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const RegisterPage: React.FC = () => {
  const { isAuthenticated, register, registerWithPhone } = useAuth();
  const navigate = useNavigate();
  
  // Email registration state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Phone registration state
  const [phoneName, setPhoneName] = useState('');
  const [phone, setPhone] = useState('');
  
  // Common state
  const [role, setRole] = useState<UserRole>('student');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [registerMethod, setRegisterMethod] = useState('email');

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      await register(name, email, password, role);
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

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!phone) {
      setError('Phone number is required');
      return;
    }

    if (!phoneName) {
      setError('Name is required');
      return;
    }

    setIsLoading(true);

    try {
      await registerWithPhone(phoneName, phone, role);
      navigate(`/verify?phone=${encodeURIComponent(phone)}&isRegistration=true&name=${encodeURIComponent(phoneName)}&role=${role}`);
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
      {/* Left side - Image */}
      <div className="hidden md:block flex-1 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGlicmFyeXxlbnwwfHwwfHx8MA%3D%3D')" }}>
        <div className="h-full w-full bg-black/30 flex items-center justify-center p-12">
          <div className="max-w-lg text-white">
            <h2 className="text-3xl font-serif font-bold mb-4">
              Join The Reading Orbital Community
            </h2>
            <p className="text-xl">
              Create your account to start borrowing books, tracking your reading progress, and discovering new literary worlds.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 flex flex-col items-center">
            <BookOpen className="h-12 w-12 text-primary mb-4" />
            <h1 className="text-3xl font-serif font-bold text-center">The Reading Orbital</h1>
            <p className="text-gray-600 dark:text-gray-400 text-center mt-2">
              Create an account to get started
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Register</CardTitle>
              <CardDescription>Create your account to access the library</CardDescription>
            </CardHeader>
            
            <Tabs defaultValue="email" onValueChange={setRegisterMethod}>
              <div className="px-6 mb-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </TabsTrigger>
                  <TabsTrigger value="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>Phone</span>
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="email">
                <form onSubmit={handleEmailSubmit}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
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
                      <Label htmlFor="role">Role</Label>
                      <Select
                        value={role}
                        onValueChange={(value) => setRole(value as UserRole)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="student">Student</SelectItem>
                            <SelectItem value="faculty">Faculty</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input 
                        id="password" 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input 
                        id="confirmPassword" 
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                      {isLoading ? 'Creating account...' : 'Create Account'}
                    </Button>
                    <div className="text-sm text-center text-muted-foreground">
                      <span>Already have an account? </span>
                      <Link to="/login" className="text-primary font-medium hover:underline">
                        Log in
                      </Link>
                    </div>
                  </CardFooter>
                </form>
              </TabsContent>
              
              <TabsContent value="phone">
                <form onSubmit={handlePhoneSubmit}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phoneName">Full Name</Label>
                      <Input 
                        id="phoneName" 
                        placeholder="John Doe"
                        value={phoneName}
                        onChange={(e) => setPhoneName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        placeholder="+1234567890"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Include country code (e.g., +1 for US)
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phoneRole">Role</Label>
                      <Select
                        value={role}
                        onValueChange={(value) => setRole(value as UserRole)}
                      >
                        <SelectTrigger id="phoneRole">
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="student">Student</SelectItem>
                            <SelectItem value="faculty">Faculty</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    {error && (
                      <div className="p-3 rounded-md bg-red-50 text-red-500 text-sm">
                        {error}
                      </div>
                    )}
                    <div className="p-3 rounded-md bg-blue-50 text-blue-700 text-sm">
                      <p>A 6-digit verification code will be sent to this phone number.</p>
                      <p className="mt-1 text-xs">For demo purposes, the code will be displayed on screen.</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4">
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? 'Sending code...' : 'Send Verification Code'}
                    </Button>
                    <div className="text-sm text-center text-muted-foreground">
                      <span>Already have an account? </span>
                      <Link to="/login" className="text-primary font-medium hover:underline">
                        Log in
                      </Link>
                    </div>
                  </CardFooter>
                </form>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
