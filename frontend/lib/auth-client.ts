import { User } from './types';
import { useCallback } from 'react';

// Export the useAuth hook that maintains the same interface
// For this implementation, we'll create a simplified auth client
// that communicates with our backend which handles Better Auth integration
export const useAuth = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const response = await fetch(`${baseUrl}/api/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Store the session token if provided by backend
        if (data.token) {
          localStorage.setItem('auth_token', data.token);
        }
      }

      return data;
    } catch (error: any) {
      console.error('Error signing in:', error);
      return { success: false, message: error.message || 'An error occurred during sign in' };
    }
  }, [baseUrl]);

  const signUp = useCallback(async (name: string, email: string, password: string) => {
    try {
      const response = await fetch(`${baseUrl}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Store the session token if provided by backend
        if (data.token) {
          localStorage.setItem('auth_token', data.token);
        }
      }

      return data;
    } catch (error: any) {
      console.error('Error signing up:', error);
      return { success: false, message: error.message || 'An error occurred during sign up' };
    }
  }, [baseUrl]);

  const signOut = useCallback(async () => {
    try {
      await fetch(`${baseUrl}/api/auth/signout`, {
        method: 'POST',
      });
      // Clear local storage
      localStorage.removeItem('auth_token');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }, [baseUrl]);

  const getSession = useCallback(async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        return null;
      }

      const response = await fetch(`${baseUrl}/api/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success && data.user) {
        return {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          createdAt: new Date(data.user.created_at),
          updatedAt: new Date()
        };
      }
      return null;
    } catch (error) {
      console.error('Error getting session:', error);
      return null;
    }
  }, [baseUrl]);

  return {
    signIn,
    signUp,
    signOut,
    getSession,
  };
};