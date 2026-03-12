import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User, AuthState } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateToken: (token: string) => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'auth_state';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(() => {
    // Intentar cargar el estado desde localStorage
    try {
      const savedState = localStorage.getItem(AUTH_STORAGE_KEY);
      if (savedState) {
        return JSON.parse(savedState);
      }
    } catch (error) {
      console.error('Error al cargar estado de autenticación:', error);
    }
    return { user: null, token: null };
  });

  // Guardar el estado en localStorage cuando cambie
  useEffect(() => {
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState));
    } catch (error) {
      console.error('Error al guardar estado de autenticación:', error);
    }
  }, [authState]);

  const login = (user: User, token: string) => {
    setAuthState({ user, token });
  };

  const logout = () => {
    setAuthState({ user: null, token: null });
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const updateToken = (token: string) => {
    setAuthState((prev) => ({ ...prev, token }));
  };

  const updateUser = (user: User) => {
    setAuthState((prev) => ({ ...prev, user }));
  };

  const value: AuthContextType = {
    user: authState.user,
    token: authState.token,
    isAuthenticated: !!authState.token && !!authState.user,
    login,
    logout,
    updateToken,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};
