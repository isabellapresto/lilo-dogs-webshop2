// client/usercontext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserContextProps {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

interface User {
  id: string;
  username: string;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/users/current', {
          method: 'GET',
          credentials: 'include', // Include credentials (cookies)
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const login = (userData: User) => {
    console.log('Användaren har loggat in:', userData);
    setUser(userData);
    // Spara användarinformation i en cookie vid inloggning
    document.cookie = `user=${JSON.stringify(userData)}; path=/`;
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
