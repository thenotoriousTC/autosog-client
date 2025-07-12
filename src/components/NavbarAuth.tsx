import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, User, Car, PlusCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface NavbarAuthProps {
  mobileView?: boolean;
}

export function NavbarAuth({ mobileView = false }: NavbarAuthProps) {
  const { t } = useTranslation();
  const { user, signOut } = useAuth();

  const getUserInitials = () => {
    if (!user?.user_metadata?.name) return 'U';
    
    const nameParts = user.user_metadata.name.split(' ');
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`;
    }
    return nameParts[0][0];
  };

  if (!user) {
    return (
      <div className={cn("flex items-center", mobileView ? "mt-2" : "gap-4")}>
        <Button 
          asChild 
          className={mobileView ? "w-full" : ""}
        >
          <Link to="/auth">{t('auth.getStarted')}</Link>
        </Button>
      </div>
    );
  }

  // If in mobile view and logged in, show direct links instead of dropdown
  if (mobileView) {
    return (
      <div className="flex flex-col space-y-2">
        {/* User info section styled like Google drawer */}
        <div className="flex items-start space-x-3 mb-3 bg-gray-50 rounded-lg p-3">
          <Avatar className="h-10 w-10 mt-0.5">
            <AvatarImage 
              src={user.user_metadata?.avatar_url} 
              alt={user.user_metadata?.name || "User avatar"} 
            />
            <AvatarFallback>{getUserInitials()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">{user.user_metadata?.name || 'User'}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {user.email?.substring(0, 25)}{user.email?.length > 25 ? '...' : ''}
            </p>
          </div>
        </div>
        
        <Link 
          to="/profile" 
          className="flex items-center text-base px-4 py-2 rounded-md hover:bg-gray-100"
        >
          <User className="mr-3 h-5 w-5 text-gray-500" />
          Profile
        </Link>
        
        <Link 
          to="/my-listings" 
          className="flex items-center text-base px-4 py-2 rounded-md hover:bg-gray-100"
        >
          <Car className="mr-3 h-5 w-5 text-gray-500" />
          My Listings
        </Link>
        
        <Link 
          to="/create-listing" 
          className="flex items-center text-base px-4 py-2 rounded-md hover:bg-gray-100"
        >
          <PlusCircle className="mr-3 h-5 w-5 text-gray-500" />
          Sell Your Car
        </Link>
        
        <button
          onClick={signOut}
          className="flex items-center text-base px-4 py-2 rounded-md hover:bg-gray-100 w-full text-left mt-2"
        >
          <LogOut className="mr-3 h-5 w-5 text-gray-500" />
          Sign out
        </button>
      </div>
    );
  }

  // Desktop view with dropdown
  return (
    <div className="flex items-center gap-3">
      <Button asChild variant="outline" size="sm" className="hidden sm:flex">
        <Link to="/create-listing" className="flex items-center">
          <PlusCircle className="mr-2 h-4 w-4" />
          Sell Your Car
        </Link>
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar>
              <AvatarImage 
                src={user.user_metadata?.avatar_url} 
                alt={user.user_metadata?.name || "User avatar"} 
              />
              <AvatarFallback>{getUserInitials()}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-1 leading-none">
              <p className="font-medium">{user.user_metadata?.name || 'User'}</p>
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to="/profile" className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/my-listings" className="flex items-center">
              <Car className="mr-2 h-4 w-4" />
              My Listings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/create-listing" className="flex items-center sm:hidden">
              <PlusCircle className="mr-2 h-4 w-4" />
              Sell Your Car
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            className="flex items-center cursor-pointer" 
            onClick={signOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
