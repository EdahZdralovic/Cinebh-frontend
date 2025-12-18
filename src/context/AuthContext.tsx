import { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser } from '../services/authService';
import { ERRORS } from '../utils/Constants.ts';

type AuthContextType = {
  user: string | null;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);

  const refreshUser = async () => {
    try {
      const data = await getCurrentUser();
      setUser(data.email);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error(ERRORS.AUTH_CONTEXT_ERROR);
  return ctx;
}
