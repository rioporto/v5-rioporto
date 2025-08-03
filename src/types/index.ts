/**
 * Global type definitions for RioPorto P2P
 */

export type ThemeModel = 'minimalist' | 'financial' | 'crypto-native' | 'institutional' | 'gaming';

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  verified: boolean;
  role: 'user' | 'admin' | 'moderator' | 'verified';
  createdAt: Date;
  lastSeen: Date;
  preferences: UserPreferences;
  stats: UserStats;
}

export interface UserPreferences {
  theme: ThemeModel;
  language: string;
  currency: string;
  notifications: NotificationSettings;
  privacy: PrivacySettings;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  orderMatched: boolean;
  paymentReceived: boolean;
  transactionCompleted: boolean;
  systemMessages: boolean;
}

export interface PrivacySettings {
  showOnlineStatus: boolean;
  showTradingStats: boolean;
  showLastSeen: boolean;
}

export interface UserStats {
  totalTrades: number;
  successfulTrades: number;
  totalVolume: number;
  averageRating: number;
  reviewCount: number;
  joinDate: Date;
}

export interface Order {
  id: string;
  userId: string;
  type: 'buy' | 'sell';
  asset: string;
  amount: number;
  price: number;
  totalValue: number;
  paymentMethods: PaymentMethod[];
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  expiresAt?: Date;
  description?: string;
  terms?: string;
}

export type OrderStatus = 
  | 'pending' 
  | 'active' 
  | 'completed' 
  | 'cancelled' 
  | 'expired';

export interface PaymentMethod {
  id: string;
  type: 'pix' | 'bank_transfer' | 'crypto_wallet' | 'paypal' | 'cash';
  name: string;
  details: Record<string, any>;
  verified: boolean;
}

export interface Transaction {
  id: string;
  orderId: string;
  buyerId: string;
  sellerId: string;
  asset: string;
  amount: number;
  price: number;
  totalValue: number;
  paymentMethod: PaymentMethod;
  status: TransactionStatus;
  chatId: string;
  escrowId?: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  timeline: TransactionTimeline[];
}

export type TransactionStatus = 
  | 'initiated'
  | 'payment_pending'
  | 'payment_confirmed'
  | 'escrow_locked'
  | 'completed'
  | 'disputed'
  | 'cancelled'
  | 'refunded';

export interface TransactionTimeline {
  id: string;
  status: TransactionStatus;
  timestamp: Date;
  note?: string;
  actor: string;
}

export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  type: 'text' | 'image' | 'file' | 'system';
  timestamp: Date;
  read: boolean;
  metadata?: Record<string, any>;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'order_matched' | 'payment_received' | 'payment_confirmed' | 'dispute_raised' | 'transaction_completed' | 'system_message';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  data?: Record<string, any>;
}

export interface MarketData {
  asset: string;
  price: number;
  change24h: number;
  volume24h: number;
  high24h: number;
  low24h: number;
  lastUpdated: Date;
}

export interface TradingPair {
  base: string;
  quote: string;
  symbol: string;
  active: boolean;
  minAmount: number;
  maxAmount: number;
  precision: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  code?: number;
}

export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface FilterOptions {
  asset?: string;
  type?: 'buy' | 'sell';
  paymentMethod?: string;
  minAmount?: number;
  maxAmount?: number;
  minPrice?: number;
  maxPrice?: number;
  verified?: boolean;
  location?: string;
}

export interface SortOptions {
  field: string;
  direction: 'asc' | 'desc';
}

// Component Props Types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'error';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export interface InputProps extends BaseComponentProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: string;
  label?: string;
  required?: boolean;
}

export interface ModalProps extends BaseComponentProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

// Utility Types
export type Nullable<T> = T | null;
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Environment Types
export interface EnvironmentConfig {
  NODE_ENV: 'development' | 'production' | 'test';
  NEXT_PUBLIC_API_URL: string;
  NEXT_PUBLIC_WS_URL: string;
  NEXT_PUBLIC_APP_URL: string;
}