import React, { createContext, useContext, useState } from 'react';

interface UserContextProps {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

interface User {
  id: string;
  username: string;
  // Add other user-related fields as needed
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
 const [user, setUser] = useState<User | null>(null);

 const login = (userData: User) => {
   console.log('User logged in:', userData);
   setUser(userData);
 };

 const logout = () => {
   setUser(null);
 };

 return (
   <UserContext.Provider value={{ user, login, logout }}>
     {children}
   </UserContext.Provider>
 );
};


export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
