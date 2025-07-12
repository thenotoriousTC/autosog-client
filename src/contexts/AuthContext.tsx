import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { insertUserProfile } from '@/lib/setup-database';

type UserProfile = {
  firstName: string;
  lastName: string;
  phoneNumber?: string;
};

type AuthContextType = {
  session: Session | null;
  user: User | null;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<{success: boolean, error?: string}>;
  signUpWithEmail: (email: string, password: string, profile?: UserProfile) => Promise<{success: boolean, error?: string}>;
  signOut: () => Promise<void>;
  isLoading: boolean;
  authError: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const { toast } = useToast();
  const sessionChecked = useRef(false);

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);

        if (event === 'SIGNED_OUT') {
          toast({
            title: "Signed out",
            description: "You've been signed out successfully"
          });
        }
      }
    );

    // Then check for existing session, but only toast on actual sign-in events, not session resumption
    if (!sessionChecked.current) {
      sessionChecked.current = true;
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
      });
    }

    return () => subscription.unsubscribe();
  }, [toast]);

  const signInWithGoogle = async () => {
    try {
      setAuthError(null);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      
      if (error) {
        setAuthError(error.message);
        toast({
          title: "Sign in failed",
          description: error.message,
          variant: "destructive"
        });
      }
    } catch (error: any) {
      setAuthError(error.message || "An error occurred during sign in");
      toast({
        title: "Sign in failed",
        description: error.message || "An error occurred during sign in",
        variant: "destructive"
      });
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      setAuthError(null);
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        setAuthError(error.message);
        toast({
          title: "Sign in failed",
          description: error.message,
          variant: "destructive"
        });
        return { success: false, error: error.message };
      }
      
      return { success: true };
    } catch (error: any) {
      const errorMessage = error.message || "An error occurred during sign in";
      setAuthError(errorMessage);
      toast({
        title: "Sign in failed",
        description: errorMessage,
        variant: "destructive"
      });
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const signUpWithEmail = async (email: string, password: string, profile?: UserProfile) => {
    try {
      setAuthError(null);
      setIsLoading(true);
      
      // Check if user already exists
      const { count, error: countError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('email', email);
        
      if (countError) {
        console.error("Error checking existing user:", countError);
      }
      
      if (count && count > 0) {
        setAuthError("An account with this email already exists");
        toast({
          title: "Sign up failed",
          description: "An account with this email already exists. Please sign in instead.",
          variant: "destructive"
        });
        return { success: false, error: "An account with this email already exists" };
      }
      
      // Create the user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: profile?.firstName,
            last_name: profile?.lastName,
            phone: profile?.phoneNumber
          }
        }
      });
      
      if (error) {
        setAuthError(error.message);
        toast({
          title: "Sign up failed",
          description: error.message,
          variant: "destructive"
        });
        return { success: false, error: error.message };
      }
      
      if (data.user) {
        // Create a profile for the user
        await insertUserProfile(
          data.user.id, 
          email, 
          profile?.firstName, 
          profile?.lastName, 
          profile?.phoneNumber
        );
      }
      
      return { success: true };
    } catch (error: any) {
      const errorMessage = error.message || "An error occurred during sign up";
      setAuthError(errorMessage);
      toast({
        title: "Sign up failed",
        description: errorMessage,
        variant: "destructive"
      });
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setAuthError(null);
      await supabase.auth.signOut();
    } catch (error: any) {
      setAuthError(error.message || "An error occurred during sign out");
      toast({
        title: "Sign out failed",
        description: error.message || "An error occurred during sign out",
        variant: "destructive"
      });
    }
  };

  return (
    <AuthContext.Provider value={{ 
      session, 
      user, 
      signInWithGoogle, 
      signInWithEmail,
      signUpWithEmail,
      signOut, 
      isLoading,
      authError
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
