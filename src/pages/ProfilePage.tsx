
import React, { useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { toast } from "@/components/ui/sonner";
import { User, Camera } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [profileImage, setProfileImage] = useState<string | null>(user?.profileImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!user) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setProfileImage(event.target.result as string);
        toast.success('Profile picture updated');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the user profile
    toast.success('Profile updated successfully');
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold mb-2">Your Profile</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your account and preferences
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>User Info</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="relative mb-4">
              <Avatar className="h-24 w-24">
                {profileImage ? (
                  <AvatarImage src={profileImage} alt={user.name} />
                ) : (
                  <AvatarFallback className="text-2xl bg-primary text-white">
                    <User className="h-12 w-12" />
                  </AvatarFallback>
                )}
              </Avatar>
              <Button 
                variant="secondary" 
                size="icon" 
                className="absolute bottom-0 right-0 rounded-full"
                onClick={triggerFileInput}
              >
                <Camera className="h-4 w-4" />
              </Button>
              <input 
                type="file" 
                ref={fileInputRef}
                accept="image/*" 
                className="hidden" 
                onChange={handleFileChange}
              />
            </div>
            <h3 className="text-xl font-medium mb-1">{user.name}</h3>
            <p className="text-gray-500 mb-2">{user.email}</p>
            <p className="text-sm bg-primary/10 px-3 py-1 rounded-full text-primary font-medium">
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </p>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <Button type="submit">Update Profile</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
