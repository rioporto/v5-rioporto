/**
 * Authentication system for RioPorto P2P
 * Mock implementation using localStorage
 */

import { User, LoginCredentials, RegisterCredentials, AuthSession } from '@/types/auth';
import { findUserByEmail, validateCredentials, mockUsers } from '@/lib/mock-data/users';

const AUTH_STORAGE_KEY = 'rioporto_auth_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Login user with email and password
 */
export async function login(credentials: LoginCredentials): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const { email, password } = credentials;

    // Find user by email
    const user = findUserByEmail(email);
    if (!user) {
      return {
        success: false,
        error: 'Email não encontrado'
      };
    }

    // Validate password
    if (!validateCredentials(email, password)) {
      return {
        success: false,
        error: 'Senha incorreta'
      };
    }

    // Update last login
    user.lastLoginAt = new Date();

    // Create session
    const session: AuthSession = {
      user,
      token: generateMockToken(),
      expiresAt: new Date(Date.now() + SESSION_DURATION),
      createdAt: new Date()
    };

    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
    }

    return {
      success: true,
      user
    };
  } catch (error) {
    return {
      success: false,
      error: 'Erro interno do servidor'
    };
  }
}

/**
 * Register new user (mock implementation)
 */
export async function register(credentials: RegisterCredentials): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const { email, password, name, confirmPassword } = credentials;

    // Basic validation
    if (password !== confirmPassword) {
      return {
        success: false,
        error: 'Senhas não coincidem'
      };
    }

    if (password.length < 6) {
      return {
        success: false,
        error: 'Senha deve ter pelo menos 6 caracteres'
      };
    }

    // Check if user already exists
    if (findUserByEmail(email)) {
      return {
        success: false,
        error: 'Email já está em uso'
      };
    }

    // Create new user (mock)
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      role: 'USER',
      kycLevel: 0,
      isVerified: false,
      createdAt: new Date(),
      lastLoginAt: new Date(),
      portfolio: {
        totalBalance: 0,
        assets: [],
        totalProfitLoss: 0,
        totalTrades: 0
      },
      tradingStats: {
        completedTrades: 0,
        successRate: 0,
        averageRating: 0,
        totalVolume: 0,
        monthlyVolume: 0,
        responseTime: 'N/A'
      },
      preferences: {
        theme: 'light',
        language: 'pt-BR',
        currency: 'BRL',
        notifications: {
          email: true,
          push: true,
          trades: true,
          system: true
        }
      }
    };

    // In a real app, we would save to database
    // For now, we'll just return success but not persist
    
    return {
      success: true,
      user: newUser
    };
  } catch (error) {
    return {
      success: false,
      error: 'Erro interno do servidor'
    };
  }
}

/**
 * Logout user
 */
export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
}

/**
 * Check if user is authenticated
 */
export function checkAuth(): { isAuthenticated: boolean; user?: User } {
  if (typeof window === 'undefined') {
    return { isAuthenticated: false };
  }

  try {
    const sessionData = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!sessionData) {
      return { isAuthenticated: false };
    }

    const session: AuthSession = JSON.parse(sessionData);
    
    // Check if session is expired
    if (new Date() > new Date(session.expiresAt)) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return { isAuthenticated: false };
    }

    return {
      isAuthenticated: true,
      user: session.user
    };
  } catch (error) {
    // Clear invalid session data
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return { isAuthenticated: false };
  }
}

/**
 * Get current user
 */
export function getCurrentUser(): User | null {
  const auth = checkAuth();
  return auth.isAuthenticated ? auth.user! : null;
}

/**
 * Check if session is about to expire (within 1 hour)
 */
export function isSessionExpiringSoon(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const sessionData = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!sessionData) {
      return false;
    }

    const session: AuthSession = JSON.parse(sessionData);
    const oneHour = 60 * 60 * 1000;
    const expiryTime = new Date(session.expiresAt).getTime();
    const currentTime = Date.now();

    return (expiryTime - currentTime) < oneHour;
  } catch (error) {
    return false;
  }
}

/**
 * Extend current session
 */
export function extendSession(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const sessionData = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!sessionData) {
      return false;
    }

    const session: AuthSession = JSON.parse(sessionData);
    
    // Extend expiry time
    session.expiresAt = new Date(Date.now() + SESSION_DURATION);
    
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Generate mock JWT token
 */
function generateMockToken(): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({ 
    iss: 'rioporto-p2p',
    sub: 'user',
    iat: Date.now(),
    exp: Date.now() + SESSION_DURATION
  }));
  const signature = btoa('mock-signature');
  
  return `${header}.${payload}.${signature}`;
}

/**
 * Verify user has required role
 */
export function hasRole(user: User | null, requiredRole: 'ADMIN' | 'USER'): boolean {
  if (!user) return false;
  
  if (requiredRole === 'ADMIN') {
    return user.role === 'ADMIN';
  }
  
  return user.role === 'ADMIN' || user.role === 'USER';
}

/**
 * Verify user has minimum KYC level
 */
export function hasKYCLevel(user: User | null, minLevel: number): boolean {
  if (!user) return false;
  return user.kycLevel >= minLevel;
}