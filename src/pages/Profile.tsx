
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, Mail, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';

export default function Profile() {
  const { user, isLoading } = useAuth();
  const [joinDate, setJoinDate] = useState<Date | null>(null);

  useEffect(() => {
    if (user?.created_at) {
      setJoinDate(new Date(user.created_at));
    }
  }, [user]);

  const getUserInitials = () => {
    if (!user?.user_metadata?.name) return 'U';
    
    const nameParts = user.user_metadata.name.split(' ');
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`;
    }
    return nameParts[0][0];
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container max-w-4xl mx-auto py-20 flex justify-center items-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container max-w-4xl mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
        
        <Card className="shadow-md">
          <CardHeader className="flex flex-col sm:flex-row items-center gap-4 pb-2">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.user_metadata?.avatar_url} />
              <AvatarFallback className="text-2xl">{getUserInitials()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-center sm:items-start">
              <CardTitle className="text-2xl">{user?.user_metadata?.name || 'User'}</CardTitle>
              <CardDescription className="flex items-center mt-1">
                <Mail className="h-4 w-4 mr-1" /> {user?.email}
              </CardDescription>
              {joinDate && (
                <CardDescription className="flex items-center mt-1">
                  <Calendar className="h-4 w-4 mr-1" /> Joined {format(joinDate, 'MMMM yyyy')}
                </CardDescription>
              )}
            </div>
          </CardHeader>
          
          <Separator />
          
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Account Details</h3>
                <p className="text-sm text-muted-foreground mt-1">Manage your account information and preferences.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Email</h4>
                  <p className="text-sm mt-1">{user?.email}</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Authentication Provider</h4>
                  <p className="text-sm mt-1 capitalize">{user?.app_metadata?.provider || 'Google'}</p>
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-end gap-2 pt-2">
            <Button variant="outline">Edit Profile</Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}
