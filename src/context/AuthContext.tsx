import { createContext, useContext, useEffect, useState } from 'react';
import {
  getCurrentUser,
  login as loginApi,
  logout as logoutApi,
  register as registerApi,
} from '../services/authService';
import { ERRORS } from '../utils/Constants';
import type { AuthContextType, AuthUser } from '../types/AuthTypes';

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = async (
    email: string,
    password: string,
    rememberMe: boolean
  ) => {
    await loginApi(email, password, rememberMe);
    const user = await getCurrentUser();
    setUser(user);
  };

  const loadUser = async () => {
    try {
      const user = await getCurrentUser();
      setUser(user);
    } catch {
      setUser(null);
    }
  };
  useEffect(() => {
    loadUser();
  }, []);

  const register = async (email: string, password: string) => {
    await registerApi(email, password);
  };

  const logout = async () => {
    await logoutApi();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error(ERRORS.AUTH_CONTEXT_ERROR);
  return ctx;
}
