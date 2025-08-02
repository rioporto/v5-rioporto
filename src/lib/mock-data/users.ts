/**
 * Mock users data for authentication system
 */

import { User } from '@/types/auth';

export const mockUsers: User[] = [
  {
    id: 'admin-001',
    email: 'admin@rioporto.com.br',
    name: 'Administrador RioPorto',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    role: 'ADMIN',
    kycLevel: 3,
    isVerified: true,
    createdAt: new Date('2023-01-01'),
    lastLoginAt: new Date(),
    portfolio: {
      totalBalance: 1250000.50,
      assets: [
        {
          asset: 'BTC',
          balance: 2.5,
          locked: 0.1,
          averagePrice: 245000,
          profitLoss: 45000
        },
        {
          asset: 'ETH',
          balance: 15.8,
          locked: 2.0,
          averagePrice: 12800,
          profitLoss: 12500
        },
        {
          asset: 'USDT',
          balance: 50000,
          locked: 5000,
          averagePrice: 5.2,
          profitLoss: 2000
        },
        {
          asset: 'BRL',
          balance: 75000,
          locked: 0,
          averagePrice: 1,
          profitLoss: 0
        }
      ],
      totalProfitLoss: 59500,
      totalTrades: 342
    },
    tradingStats: {
      completedTrades: 342,
      successRate: 98.5,
      averageRating: 4.9,
      totalVolume: 2580000,
      monthlyVolume: 180000,
      responseTime: '2min'
    },
    preferences: {
      theme: 'dark',
      language: 'pt-BR',
      currency: 'BRL',
      notifications: {
        email: true,
        push: true,
        trades: true,
        system: true
      }
    }
  },
  {
    id: 'user-001',
    email: 'joao@teste.com',
    name: 'João Silva',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    role: 'USER',
    kycLevel: 2,
    isVerified: true,
    createdAt: new Date('2023-06-15'),
    lastLoginAt: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
    portfolio: {
      totalBalance: 85000.25,
      assets: [
        {
          asset: 'BTC',
          balance: 0.15,
          locked: 0.02,
          averagePrice: 245000,
          profitLoss: 2500
        },
        {
          asset: 'ETH',
          balance: 3.2,
          locked: 0.5,
          averagePrice: 12800,
          profitLoss: 800
        },
        {
          asset: 'BRL',
          balance: 45000,
          locked: 2000,
          averagePrice: 1,
          profitLoss: 0
        }
      ],
      totalProfitLoss: 3300,
      totalTrades: 47
    },
    tradingStats: {
      completedTrades: 47,
      successRate: 95.7,
      averageRating: 4.7,
      totalVolume: 145000,
      monthlyVolume: 25000,
      responseTime: '5min'
    },
    preferences: {
      theme: 'light',
      language: 'pt-BR',
      currency: 'BRL',
      notifications: {
        email: true,
        push: true,
        trades: true,
        system: false
      }
    }
  },
  {
    id: 'user-002',
    email: 'maria@teste.com',
    name: 'Maria Santos',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face',
    role: 'USER',
    kycLevel: 1,
    isVerified: false,
    createdAt: new Date('2023-09-20'),
    lastLoginAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    portfolio: {
      totalBalance: 25000.00,
      assets: [
        {
          asset: 'BTC',
          balance: 0.05,
          locked: 0,
          averagePrice: 248000,
          profitLoss: -500
        },
        {
          asset: 'BRL',
          balance: 12500,
          locked: 0,
          averagePrice: 1,
          profitLoss: 0
        }
      ],
      totalProfitLoss: -500,
      totalTrades: 8
    },
    tradingStats: {
      completedTrades: 8,
      successRate: 100,
      averageRating: 4.2,
      totalVolume: 35000,
      monthlyVolume: 8000,
      responseTime: '15min'
    },
    preferences: {
      theme: 'light',
      language: 'pt-BR',
      currency: 'BRL',
      notifications: {
        email: true,
        push: false,
        trades: true,
        system: true
      }
    }
  },
  {
    id: 'user-003',
    email: 'novo@teste.com',
    name: 'Pedro Oliveira',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    role: 'USER',
    kycLevel: 0,
    isVerified: false,
    createdAt: new Date('2024-01-10'),
    lastLoginAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    portfolio: {
      totalBalance: 5000.00,
      assets: [
        {
          asset: 'BRL',
          balance: 5000,
          locked: 0,
          averagePrice: 1,
          profitLoss: 0
        }
      ],
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
  }
];

// Mock password storage (in real app, this would be hashed)
export const mockCredentials = {
  'admin@rioporto.com.br': 'admin123',
  'joao@teste.com': 'user123',
  'maria@teste.com': 'user123',
  'novo@teste.com': 'user123'
};

/**
 * Find user by email
 */
export function findUserByEmail(email: string): User | undefined {
  return mockUsers.find(user => user.email === email);
}

/**
 * Validate user credentials
 */
export function validateCredentials(email: string, password: string): boolean {
  return mockCredentials[email as keyof typeof mockCredentials] === password;
}

/**
 * Get user by ID
 */
export function getUserById(id: string): User | undefined {
  return mockUsers.find(user => user.id === id);
}