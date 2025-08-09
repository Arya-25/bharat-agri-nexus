import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  userType: string;
  location: string;
  joinDate: string;
  bio: string;
}

interface UserContextType {
  user: UserData | null;
  session: Session | null;
  supabaseUser: User | null;
  loading: boolean;
  isLoggedIn: boolean;
  isEmailVerified: boolean;
  isInitialized: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (userData: any) => Promise<{ success: boolean; message: string }>;
  resendVerification: (email: string) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [supabaseUser, setSupabaseUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // Fetch user profile data from the profiles table
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }

      if (profile) {
        const userData: UserData = {
          firstName: profile.full_name?.split(' ')[0] || '',
          lastName: profile.full_name?.split(' ').slice(1).join(' ') || '',
          email: profile.email || '',
          phone: profile.phone || '',
          organization: (profile as any).organization || '',
          userType: (profile as any).user_type || '',
          location: profile.location || '',
          joinDate: new Date(profile.created_at).toISOString().split('T')[0],
          bio: (profile as any).bio || '',
        };
        setUser(userData);
        return userData;
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
    }
    return null;
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, message: error.message };
      }

      if (data.user && !data.user.email_confirmed_at) {
        return { success: false, message: 'Please verify your email before logging in. Check your email for the verification link.' };
      }

      if (data.user) {
        await fetchUserProfile(data.user.id);
        return { success: true, message: 'Login successful' };
      }

      return { success: false, message: 'Login failed' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'An unexpected error occurred' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: any) => {
    try {
      setLoading(true);
      
      // Sign up the user with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/verify-email`,
          data: {
            full_name: `${userData.firstName} ${userData.lastName}`,
            phone: userData.phone,
            location: userData.location,
            organization: userData.organization,
            user_type: userData.userType,
            bio: userData.bio,
          }
        }
      });

      if (error) {
        return { success: false, message: error.message };
      }

      if (data.user) {
        // The user profile will be created automatically by the trigger
        // We'll fetch it to update our local state
        setTimeout(async () => {
          await fetchUserProfile(data.user!.id);
        }, 1000); // Small delay to ensure the trigger has executed

        return { success: true, message: 'Registration successful! Please check your email and click the verification link before logging in.' };
      }

      return { success: false, message: 'Registration failed' };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'An unexpected error occurred during registration' };
    } finally {
      setLoading(false);
    }
  };

  const resendVerification = async (email: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}/verify-email`
        }
      });

      if (error) {
        return { success: false, message: error.message };
      }

      return { success: true, message: 'Verification email sent! Please check your inbox.' };
    } catch (error) {
      console.error('Resend verification error:', error);
      return { success: false, message: 'Failed to resend verification email' };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error);
      }
      setUser(null);
      setSession(null);
      setSupabaseUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Set up auth state listener and check for existing session
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setSupabaseUser(session?.user ?? null);
        
        if (session?.user) {
          // Defer the profile fetch to avoid any potential recursive issues
          setTimeout(() => {
            fetchUserProfile(session.user.id);
          }, 0);
        } else {
          setUser(null);
        }
        
        setLoading(false);
        setIsInitialized(true);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setSupabaseUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
      
      setLoading(false);
      setIsInitialized(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{
      user,
      session,
      supabaseUser,
      loading,
      isLoggedIn: !!session,
      isEmailVerified: !!session?.user?.email_confirmed_at,
      isInitialized,
      login,
      register,
      resendVerification,
      logout
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};