'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, loading, checkAuth } = useAuthContext();
  const router = useRouter();
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    // Run the initial auth check only once
    checkAuth();
  }, []); // Empty dependency array to run only once

  useEffect(() => {
    // If authentication check is complete and user is not authenticated, redirect
    if (isAuthenticated === false && !hasRedirected) {
      setHasRedirected(true);
      router.replace('/signin');
    }
  }, [isAuthenticated, router, hasRedirected]);

  if (loading || isAuthenticated === null) {
    // Loading state while checking authentication
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-primary-text dark:text-primary-text-dark">Checking authentication...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Don't render children if not authenticated
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;