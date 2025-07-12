import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

/**
 * Simple admin authentication system using hardcoded credentials.
 * 
 * NOTE: In a production environment, you should:
 * 1. Use a proper authentication system (like Supabase Auth)
 * 2. Store admin accounts in a database with proper role-based access control
 * 3. Never hardcode credentials in the source code
 * 
 * This implementation is for demonstration purposes only.
 */

// Admin credentials (in a real app, these would be stored securely)
const ADMIN_USERNAME = "admin@autosog.com";
const ADMIN_PASSWORD = "Car@dmin2025";

type AdminContextType = {
  isAdmin: boolean;
  adminLogin: (username: string, password: string) => boolean;
  adminLogout: () => void;
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

/**
 * Provides admin authentication context to the application.
 * Uses localStorage to persist admin login state between page refreshes.
 */
export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const { toast } = useToast();

  // Check if admin is already logged in from localStorage
  useEffect(() => {
    const adminStatus = localStorage.getItem('carplace_admin');
    if (adminStatus === 'true') {
      console.log("Admin logged in from localStorage");
      setIsAdmin(true);
    }
  }, []);

  /**
   * Authenticate admin user with hardcoded credentials
   * @param username Admin username
   * @param password Admin password
   * @returns boolean indicating success or failure
   */
  const adminLogin = (username: string, password: string): boolean => {
    console.log("Attempting admin login");
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      localStorage.setItem('carplace_admin', 'true');
      console.log("Admin login successful");
      toast({
        title: "Admin Login Successful",
        description: "Welcome to the admin dashboard",
      });
      return true;
    } else {
      console.log("Admin login failed");
      toast({
        title: "Admin Login Failed",
        description: "Invalid username or password",
        variant: "destructive"
      });
      return false;
    }
  };

  /**
   * Log out the admin user
   */
  const adminLogout = () => {
    console.log("Admin logging out");
    setIsAdmin(false);
    localStorage.removeItem('carplace_admin');
    toast({
      title: "Admin Logout Successful",
      description: "You have been logged out from the admin dashboard",
    });
  };

  return (
    <AdminContext.Provider value={{ isAdmin, adminLogin, adminLogout }}>
      {children}
    </AdminContext.Provider>
  );
}

/**
 * Hook to access admin context
 * Must be used within an AdminProvider
 */
export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
