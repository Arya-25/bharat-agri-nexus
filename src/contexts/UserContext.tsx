
import React, { createContext, useContext, useState, ReactNode } from 'react';

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
  login: (userData: UserData) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);

  const login = (userData: UserData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Check for existing user data on mount
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      isLoggedIn: !!user,
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
