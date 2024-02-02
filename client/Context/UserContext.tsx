import React, { createContext, useContext, useState } from 'react';

interface User {
  isLoggedIn: boolean;
  id: string;
  username: string;
}

interface UserContextProps {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const userCookie = document.cookie.replace(/(?:(?:^|.*;\s*)user\s*=\s*([^;]*).*$)|^.*$/, "$1");
    return userCookie ? JSON.parse(userCookie) : null;
  });

  const login = (userData: User) => {
    console.log('Användaren har loggat in:', userData);

    // Spara användarinformation i session storage vid inloggning
    sessionStorage.setItem('loggedInUser', JSON.stringify({ ...userData, isLoggedIn: true }));

    // Sätt användarinformationen i state
    setUser({ ...userData, isLoggedIn: true });

    // Spara användarinformation i en cookie vid inloggning
    document.cookie = `user=${JSON.stringify({ ...userData, isLoggedIn: true })}; path=/`;
  };

  const logout = () => {
    console.log('Användaren har loggat ut');
    setUser(null);
    
    // Ta bort användarinformation från cookien vid utloggning
    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
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
