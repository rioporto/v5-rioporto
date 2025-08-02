'use client';

/**
 * Authentication Context for RioPorto P2P
 * Provides global authentication state management
 */

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { AuthContextType, User, LoginCredentials, RegisterCredentials } from '@/types/auth';
import { login as authLogin, register as authRegister, logout as authLogout, checkAuth, extendSession, isSessionExpiringSoon } from '@/lib/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Initialize authentication state
   */
  const initializeAuth = useCallback(() => {
    try {
      const auth = checkAuth();
      setUser(auth.user || null);
      setIsAuthenticated(auth.isAuthenticated);
    } catch (error) {
      console.error('Error initializing auth:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Login function
   */
  const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await authLogin(credentials);
      
      if (result.success && result.user) {
        setUser(result.user);
        setIsAuthenticated(true);
        return true;
      } else {
        setError(result.error || 'Erro ao fazer login');
        return false;
      }
    } catch (error) {
      setError('Erro interno do servidor');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Register function
   */
  const register = useCallback(async (credentials: RegisterCredentials): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await authRegister(credentials);
      
      if (result.success) {
        // For mock implementation, we don't auto-login after registration
        // In a real app, you might want to auto-login or send verification email
        return true;
      } else {
        setError(result.error || 'Erro ao criar conta');
        return false;
      }
    } catch (error) {
      setError('Erro interno do servidor');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Logout function
   */
  const logout = useCallback(() => {
    authLogout();
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
  }, []);

  /**
   * Clear error
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Check authentication status
   */
  const checkAuthStatus = useCallback(() => {
    const auth = checkAuth();
    setUser(auth.user || null);
    setIsAuthenticated(auth.isAuthenticated);
    
    if (!auth.isAuthenticated && isAuthenticated) {
      // Session expired
      setError('Sessão expirou. Faça login novamente.');
    }
  }, [isAuthenticated]);

  /**
   * Handle session extension
   */
  const handleSessionExtension = useCallback(() => {
    if (isAuthenticated && isSessionExpiringSoon()) {
      const extended = extendSession();
      if (!extended) {
        // Failed to extend session, logout
        logout();
        setError('Sessão expirou. Faça login novamente.');
      }
    }
  }, [isAuthenticated, logout]);

  // Initialize auth on mount
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Check auth status periodically
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      checkAuthStatus();
      handleSessionExtension();
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [isAuthenticated, checkAuthStatus, handleSessionExtension]);

  // Handle visibility change to check auth when tab becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && isAuthenticated) {
        checkAuthStatus();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isAuthenticated, checkAuthStatus]);

  // Handle storage changes (for multi-tab support)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'rioporto_auth_session') {
        initializeAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [initializeAuth]);

  const contextValue: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
    checkAuth: checkAuthStatus
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to use authentication context
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}

/**
 * Hook to get current user (returns null if not authenticated)
 */
export function useUser(): User | null {
  const { user, isAuthenticated } = useAuth();
  return isAuthenticated ? user : null;
}

/**
 * Hook to check if user has specific role
 */
export function useRole(requiredRole?: 'ADMIN' | 'USER' | 'MODERATOR'): { hasRole: boolean; user: User | null } {
  const user = useUser();
  
  if (!requiredRole) {
    return { hasRole: !!user, user };
  }
  
  if (!user) {
    return { hasRole: false, user: null };
  }
  
  const hasRole = user.role === requiredRole || (requiredRole === 'USER' && user.role !== 'ADMIN');
  
  return { hasRole, user };
}

/**
 * Hook to check if user has minimum KYC level
 */
export function useKYC(minLevel?: number): { hasKYC: boolean; kycLevel: number; user: User | null } {
  const user = useUser();
  
  if (!user) {
    return { hasKYC: false, kycLevel: 0, user: null };
  }
  
  const hasKYC = minLevel ? user.kycLevel >= minLevel : true;
  
  return { hasKYC, kycLevel: user.kycLevel, user };
}