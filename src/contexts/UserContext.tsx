
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
  login: (userData: UserData) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const login = (userData: UserData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isLoggedIn', 'true');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
  };

  // Check for existing user data on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (storedUser && isLoggedIn === 'true') {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('isLoggedIn');
      }
    }
    setIsInitialized(true);
  }, []);

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      isLoggedIn: !!user,
      isInitialized,
      login,
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
