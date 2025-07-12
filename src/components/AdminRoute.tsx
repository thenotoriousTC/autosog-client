import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { Loader2 } from 'lucide-react';

/**
 * Protected route component for admin-only pages
 * 
 * Checks if the user is authenticated as an admin using the AdminContext.
 * If not authenticated, redirects to the admin login page.
 * Shows a loading state while checking authentication status.
 * 
 * @param children The components to render if the user is authenticated as admin
 */
export function AdminRoute({ children }: { children: React.ReactNode }) {
  const { isAdmin } = useAdmin();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Give time for admin state to be checked from localStorage
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground">Checking admin access...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
