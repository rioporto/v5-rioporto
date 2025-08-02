/**
 * Authentication types for RioPorto P2P
 */

export type Role = 'ADMIN' | 'USER';
export type KYCLevel = 0 | 1 | 2 | 3;

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: Role;
  kycLevel: KYCLevel;
  isVerified: boolean;
  createdAt: Date;
  lastLoginAt?: Date;
  portfolio: Portfolio;
  tradingStats: TradingStats;
  preferences: UserPreferences;
}

export interface Portfolio {
  totalBalance: number;
  assets: AssetBalance[];
  totalProfitLoss: number;
  totalTrades: number;
}

export interface AssetBalance {
  asset: string;
  balance: number;
  locked: number;
  averagePrice: number;
  profitLoss: number;
}

export interface TradingStats {
  completedTrades: number;
  successRate: number;
  averageRating: number;
  totalVolume: number;
  monthlyVolume: number;
  responseTime: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  language: string;
  currency: string;
  notifications: {
    email: boolean;
    push: boolean;
    trades: boolean;
    system: boolean;
  };
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  sessionExpiry: Date | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  register: (credentials: RegisterCredentials) => Promise<boolean>;
  clearError: () => void;
  checkAuth: () => void;
}

export interface AuthSession {
  user: User;
  token: string;
  expiresAt: Date;
  createdAt: Date;
}