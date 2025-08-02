/**
 * Application constants for RioPorto P2P
 */

export const APP_CONFIG = {
  name: 'RioPorto P2P',
  version: '1.0.0',
  description: 'Plataforma P2P multi-modelo para negociação de ativos',
  author: 'RioPorto Team',
  repository: 'https://github.com/rioporto/v5-rioporto',
  website: 'https://rioporto.com',
} as const;

export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  retryAttempts: 3,
  retryDelay: 1000,
} as const;

export const THEME_MODELS = {
  MINIMALIST: 'minimalist',
  FINANCIAL: 'financial',
  CRYPTO_NATIVE: 'crypto-native',
  INSTITUTIONAL: 'institutional',
  GAMING: 'gaming',
} as const;

export const SUBDOMAIN_MAPPING = {
  v1: 'minimalist',
  v2: 'financial',
  v3: 'crypto-native',
  v4: 'institutional',
  v5: 'gaming',
} as const;

export const CURRENCY_CONFIG = {
  default: 'BRL',
  supported: ['BRL', 'USD', 'EUR', 'BTC', 'ETH', 'USDT'],
  symbols: {
    BRL: 'R$',
    USD: '$',
    EUR: '€',
    BTC: '₿',
    ETH: 'Ξ',
    USDT: '₮',
  },
} as const;

export const ORDER_TYPES = {
  BUY: 'buy',
  SELL: 'sell',
} as const;

export const ORDER_STATUS = {
  PENDING: 'pending',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  EXPIRED: 'expired',
} as const;

export const PAYMENT_METHODS = {
  PIX: 'pix',
  BANK_TRANSFER: 'bank_transfer',
  CRYPTO_WALLET: 'crypto_wallet',
  PAYPAL: 'paypal',
  CASH: 'cash',
} as const;

export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  MODERATOR: 'moderator',
  VERIFIED: 'verified',
} as const;

export const TRANSACTION_STATUS = {
  INITIATED: 'initiated',
  PAYMENT_PENDING: 'payment_pending',
  PAYMENT_CONFIRMED: 'payment_confirmed',
  ESCROW_LOCKED: 'escrow_locked',
  COMPLETED: 'completed',
  DISPUTED: 'disputed',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
} as const;

export const NOTIFICATION_TYPES = {
  ORDER_MATCHED: 'order_matched',
  PAYMENT_RECEIVED: 'payment_received',
  PAYMENT_CONFIRMED: 'payment_confirmed',
  DISPUTE_RAISED: 'dispute_raised',
  TRANSACTION_COMPLETED: 'transaction_completed',
  SYSTEM_MESSAGE: 'system_message',
} as const;

export const VALIDATION_RULES = {
  minTradeAmount: 10,
  maxTradeAmount: 100000,
  minPasswordLength: 8,
  maxUsernameLength: 30,
  minUsernameLength: 3,
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phoneRegex: /^\+?[\d\s-()]{10,}$/,
} as const;

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
  slower: 700,
} as const;

export const LOCAL_STORAGE_KEYS = {
  theme: 'rioporto-theme',
  user: 'rioporto-user',
  preferences: 'rioporto-preferences',
  recentSearches: 'rioporto-recent-searches',
  tradingPairs: 'rioporto-trading-pairs',
} as const;

export const SESSION_STORAGE_KEYS = {
  currentOrder: 'rioporto-current-order',
  chatMessages: 'rioporto-chat-messages',
  notifications: 'rioporto-notifications',
} as const;

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erro de rede. Verifique sua conexão.',
  UNAUTHORIZED: 'Acesso não autorizado. Faça login novamente.',
  FORBIDDEN: 'Você não tem permissão para realizar esta ação.',
  NOT_FOUND: 'Recurso não encontrado.',
  SERVER_ERROR: 'Erro interno do servidor. Tente novamente mais tarde.',
  VALIDATION_ERROR: 'Dados inválidos. Verifique os campos.',
} as const;

export const SUCCESS_MESSAGES = {
  ORDER_CREATED: 'Ordem criada com sucesso!',
  PAYMENT_CONFIRMED: 'Pagamento confirmado!',
  PROFILE_UPDATED: 'Perfil atualizado com sucesso!',
  TRANSACTION_COMPLETED: 'Transação concluída!',
} as const;

export const FEATURE_FLAGS = {
  enableChat: true,
  enableNotifications: true,
  enableP2P: true,
  enableAdvancedTrading: false,
  enableMobileApp: false,
} as const;

export const LIMITS = {
  maxFileSize: 5 * 1024 * 1024, // 5MB
  maxImageSize: 2 * 1024 * 1024, // 2MB
  maxChatMessageLength: 500,
  maxOrdersPerUser: 10,
  maxActiveTransactions: 5,
} as const;