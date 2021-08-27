import { useEffect, useState } from 'react';
import { authContext, AuthState } from './authContext';
import { loadAuth } from './util';

export interface AuthProviderProps {
  children: React.ReactNode; 
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({});

  useEffect(() => {
    // Load Auth on mount
    const storedAuth = loadAuth();
    if (storedAuth) {
      setAuth(storedAuth);
    }
  }, [setAuth]);

  return (
    <authContext.Provider value={{ auth, setAuth }}>
      {children}
    </authContext.Provider>
  )
};
