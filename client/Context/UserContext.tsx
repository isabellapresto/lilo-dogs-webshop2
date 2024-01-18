import React, { createContext, useContext, useState } from 'react';

interface UserContextProps {
  user: User | null;          // Användarobjekt eller null om ingen användare är inloggad
  login: (userData: User) => void;   
  logout: () => void;         
}


interface User {
  id: string;
  username: string;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State för att hålla den inloggade användaren.
  const [user, setUser] = useState<User | null>(null);

  // Funktion för att logga in 
  const login = (userData: User) => {
    console.log('Användaren har loggat in:', userData);
    setUser(userData);
  };

  // Funktion för att logga ut 
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
    throw new Error('useUser måste användas inom en UserProvider');
  }
  return context;
};
