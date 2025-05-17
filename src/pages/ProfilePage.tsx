
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

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
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={user.profileImage} alt={user.name} />
              <AvatarFallback className="text-2xl">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
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
            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  defaultValue={user.name}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={user.email}
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
