
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

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
  setUser: (user: UserData | null) => void;
  isLoggedIn: boolean;
  isInitialized: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (userData: any) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const API_BASE_URL = 'http://localhost:5000/api';

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const userData: UserData = {
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
          phone: data.user.phone,
          organization: data.user.organization,
          userType: data.user.userType,
          location: data.user.location,
          joinDate: data.user.createdAt?.split('T')[0] || new Date().toISOString().split('T')[0],
          bio: data.user.bio || '',
        };
        
        setUser(userData);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(userData));
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  const register = async (userData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        const userInfo: UserData = {
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
          phone: data.user.phone,
          organization: data.user.organization,
          userType: data.user.userType,
          location: data.user.location,
          joinDate: data.user.createdAt?.split('T')[0] || new Date().toISOString().split('T')[0],
          bio: data.user.bio || '',
        };
        
        setUser(userInfo);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(userInfo));
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message || 'Registration failed' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  };

  // Check for existing user data on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (token && storedUser) {
        try {
          // Verify token with backend
          const response = await fetch(`${API_BASE_URL}/auth/me`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            const userData: UserData = {
              firstName: data.user.firstName,
              lastName: data.user.lastName,
              email: data.user.email,
              phone: data.user.phone,
              organization: data.user.organization,
              userType: data.user.userType,
              location: data.user.location,
              joinDate: data.user.createdAt?.split('T')[0] || new Date().toISOString().split('T')[0],
              bio: data.user.bio || '',
            };
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
          } else {
            // Token is invalid, clear storage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
        } catch (error) {
          console.error('Auth check error:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      setIsInitialized(true);
    };

    checkAuthStatus();
  }, []);

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      isLoggedIn: !!user,
      isInitialized,
      login,
      register,
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
