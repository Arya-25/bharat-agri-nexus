
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

// Mock users for testing
const mockUsers = [
  {
    email: 'test@example.com',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe',
    phone: '1234567890',
    organization: 'Test Farm',
    userType: 'farmer',
    location: 'India',
    bio: 'Passionate farmer working in agriculture and committed to sustainable practices.'
  }
];

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const login = async (email: string, password: string) => {
    // Mock login - simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (mockUser) {
      const userData: UserData = {
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
        email: mockUser.email,
        phone: mockUser.phone,
        organization: mockUser.organization,
        userType: mockUser.userType,
        location: mockUser.location,
        joinDate: new Date().toISOString().split('T')[0],
        bio: mockUser.bio,
      };
      
      setUser(userData);
      localStorage.setItem('mockToken', 'mock-jwt-token');
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true, message: 'Login successful' };
    } else {
      return { success: false, message: 'Invalid email or password' };
    }
  };

  const register = async (userData: any) => {
    // Mock registration - simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      return { success: false, message: 'User already exists with this email' };
    }
    
    // Create new mock user
    const newUser = {
      email: userData.email,
      password: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      organization: userData.organization,
      userType: userData.userType,
      location: userData.location,
      bio: userData.bio
    };
    
    mockUsers.push(newUser);
    
    const userInfo: UserData = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      organization: userData.organization,
      userType: userData.userType,
      location: userData.location,
      joinDate: new Date().toISOString().split('T')[0],
      bio: userData.bio,
    };
    
    setUser(userInfo);
    localStorage.setItem('mockToken', 'mock-jwt-token');
    localStorage.setItem('user', JSON.stringify(userInfo));
    return { success: true, message: 'Registration successful' };
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('mockToken');
    localStorage.removeItem('user');
  };

  // Check for existing user data on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('mockToken');
      const storedUser = localStorage.getItem('user');
      
      if (token && storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
        } catch (error) {
          console.error('Error parsing stored user data:', error);
          localStorage.removeItem('mockToken');
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
