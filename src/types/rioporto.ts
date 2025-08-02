/**
 * Tipos específicos para RioPorto P2P
 */

// Tipos básicos do usuário
export interface RioPortoUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'USER' | 'ADMIN' | 'MODERATOR';
  cpf: string;
  phone: string;
  kycLevel: 0 | 1 | 2 | 3;
  createdAt: string;
  avatar?: string;
  portfolio?: PortfolioSummary;
  pixKeys?: PixKey[];
  twoFactor?: {
    enabled: boolean;
    secret?: string;
  };
}

// Portfolio e ativos
export interface PortfolioSummary {
  totalInvested: number;
  currentValue: number;
  profitLoss: number;
  profitLossPercentage: number;
  bestAsset?: string;
  worstAsset?: string;
}

export interface PortfolioAsset {
  id: string;
  symbol: string;
  name: string;
  amount: number;
  avgPrice: number;
  currentPrice: number;
  value: number;
  profitLoss: number;
  profitLossPercentage: number;
  allocation: number;
  network: string;
  icon: string;
  description?: string;
}

export interface PortfolioHistory {
  date: string;
  value: number;
  invested: number;
  profitLoss: number;
}

// Transações
export interface RioPortoTransaction {
  id: string;
  userId: string;
  type: 'BUY' | 'SELL';
  asset: string;
  amount: number;
  price: number;
  total: number;
  fee: number;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  date: Date;
  paymentMethod: 'PIX' | 'TED' | 'DOC';
  txHash?: string;
  network: string;
  confirmations?: number;
  pixKey?: string;
  description?: string;
}

// Indicadores de mercado
export interface FearGreedIndex {
  value: number;
  label: 'Extreme Fear' | 'Fear' | 'Neutral' | 'Greed' | 'Extreme Greed';
  color: string;
  description: string;
  components: {
    volatility: { value: number; weight: number };
    marketMomentum: { value: number; weight: number };
    socialMedia: { value: number; weight: number };
    dominance: { value: number; weight: number };
    trends: { value: number; weight: number };
  };
  history: Array<{ date: string; value: number }>;
}

export interface MarketIndicators {
  fearGreedIndex: FearGreedIndex;
  marketCap: {
    total: number;
    totalFormatted: string;
    change24h: number;
    btcDominance: number;
    ethDominance: number;
    altcoinMarketCap: number;
  };
  onchain: {
    hashRate: { value: number; unit: string; change24h: number };
    difficulty: { value: number; change24h: number };
    mempool: { count: number; size: string };
    activeAddresses: { value: number; change24h: number };
  };
  derivatives: {
    openInterest: { value: number; change24h: number };
    longShortRatio: { value: number };
    fundingRates: { btc: number; eth: number };
  };
  social: {
    redditPosts: { value: number; change24h: number };
    twitterMentions: { value: number; change24h: number };
    googleTrends: { value: number; keyword: string };
  };
}

// Blog e conteúdo
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: {
    id: string;
    name: string;
    avatar: string;
    bio: string;
    role: string;
  };
  publishedAt: string;
  updatedAt: string;
  featuredImage: string;
  readTime: number;
  metrics: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

// Cursos
export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  category: string;
  instructor: {
    id: string;
    name: string;
    avatar: string;
    bio: string;
    specialties: string[];
    experience: string;
  };
  price: {
    original: number;
    current: number;
    discount?: number;
  };
  duration: string;
  modules: CourseModule[];
  rating: number;
  studentsCount: number;
  completionRate: number;
  thumbnail: string;
  trailer?: string;
  requirements: string[];
  whatYouWillLearn: string[];
  features: string[];
  certificate: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  lessons: CourseLesson[];
  order: number;
}

export interface CourseLesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'video' | 'text' | 'quiz' | 'exercise';
  content?: string;
  videoUrl?: string;
  resources?: string[];
  order: number;
  free?: boolean;
}

// Influenciadores
export interface Influencer {
  id: string;
  name: string;
  username: string;
  avatar: string;
  category: 'Trader' | 'Analista' | 'Educator' | 'Content Creator' | 'Developer';
  specialties: string[];
  bio: string;
  followers: {
    youtube?: number;
    twitter?: number;
    instagram?: number;
    telegram?: number;
    tiktok?: number;
  };
  socialLinks: {
    youtube?: string;
    twitter?: string;
    instagram?: string;
    telegram?: string;
    tiktok?: string;
    website?: string;
  };
  trustScore: number;
  verified: boolean;
  location: string;
  languages: string[];
  contentTypes: string[];
  metrics: {
    engagement: number;
    consistency: number;
    accuracy: number;
  };
}

// Tokens suportados
export interface SupportedToken {
  id: string;
  symbol: string;
  name: string;
  network: string;
  contractAddress?: string | null;
  decimals: number;
  icon: string;
  color: string;
  description: string;
  website?: string;
  explorer?: string;
  minAmount: number;
  maxAmount: number;
  fee: number;
  active: boolean;
}

// Dados de mercado
export interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  change7d: number;
  volume24h: number;
  marketCap: number;
  rank: number;
  high24h: number;
  low24h: number;
  ath: number;
  atl: number;
  lastUpdated: string;
}

export interface OrderBook {
  symbol: string;
  bids: Array<[number, number]>; // [price, quantity]
  asks: Array<[number, number]>; // [price, quantity]
  lastUpdated: string;
}

// KYC
export interface KYCLevel {
  level: 0 | 1 | 2 | 3;
  name: string;
  description: string;
  limits: {
    buyDaily: number;
    buyMonthly: number;
    sellDaily: number;
    sellMonthly: number;
  };
  requirements: string[];
  benefits: string[];
}

export interface KYCDocument {
  type: 'CPF' | 'RG' | 'CNH' | 'PASSPORT' | 'SELFIE' | 'PROOF_OF_ADDRESS';
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  uploadedAt: string;
  reviewedAt?: string;
  notes?: string;
}

// Chaves PIX
export interface PixKey {
  id: string;
  type: 'CPF' | 'EMAIL' | 'PHONE' | 'RANDOM';
  key: string;
  verified: boolean;
  createdAt: string;
  name?: string;
}

// Recomendações inteligentes
export interface SmartRecommendation {
  id: string;
  type: 'BUY' | 'SELL' | 'HOLD' | 'REBALANCE' | 'DCA';
  title: string;
  description: string;
  asset?: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  confidence: number;
  reasoning: string[];
  suggestedAction: string;
  expectedReturn?: number;
  risk: 'LOW' | 'MEDIUM' | 'HIGH';
  timeFrame: string;
  createdAt: string;
}