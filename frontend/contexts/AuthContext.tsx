'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import { useAuth } from '@/lib/auth-client';

interface AuthContextType {
  isAuthenticated: boolean | null;
  loading: boolean;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasChecked, setHasChecked] = useState(false);

  // Get auth functions once, outside of state changes
  const { getSession } = useAuth();

  const checkAuth = useCallback(async () => {
    if (hasChecked) return; // Only run once

    setLoading(true);

    try {
      const user = await getSession();
      const authResult = !!user;

      setIsAuthenticated(authResult);
      setHasChecked(true);
    } catch (error) {
      console.error('Authentication check failed:', error);
      setIsAuthenticated(false);
      setHasChecked(true);
    } finally {
      setLoading(false);
    }
  }, [hasChecked, getSession]); // Include getSession in the dependency array

  useEffect(() => {
    if (!hasChecked) {
      checkAuth();
    }
  }, [hasChecked]); // Only hasChecked as dependency to avoid circular reference

  const contextValue = useMemo(() => ({
    isAuthenticated,
    loading,
    checkAuth
  }), [isAuthenticated, loading, checkAuth]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};