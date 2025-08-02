/**
 * Centralizador de todos os dados mockados da RioPorto P2P
 * Export unificado para facilitar importações
 */

// Importações para uso interno
import { 
  MOCK_PORTFOLIO_SUMMARY,
  MOCK_PORTFOLIO_ASSETS,
  MOCK_PORTFOLIO_HISTORY,
  MOCK_SMART_RECOMMENDATIONS 
} from './portfolio';
import { MOCK_TRANSACTIONS } from './transactions';
import { 
  MOCK_MARKET_INDICATORS,
  MOCK_FEAR_GREED_INDEX,
  MOCK_GOOGLE_TRENDS 
} from './indicators';
import { MOCK_MARKET_DATA } from './market';
import {
  MOCK_BLOG_POSTS
} from './blog-posts';
import { MOCK_COURSES } from './courses';
import { MOCK_INFLUENCERS } from './influencers';
import { MOCK_SUPPORTED_TOKENS } from './tokens';
import { KYC_LEVELS } from './kyc';
import { type MarketData } from '@/types/rioporto';

// Portfolio e investimentos
export {
  MOCK_PORTFOLIO_SUMMARY,
  MOCK_PORTFOLIO_ASSETS,
  MOCK_PORTFOLIO_HISTORY,
  MOCK_SMART_RECOMMENDATIONS,
  MOCK_PORTFOLIO_METRICS,
  MOCK_PNL_ANALYSIS
} from './portfolio';

// Transações
export {
  MOCK_TRANSACTIONS,
  MOCK_TRANSACTION_STATS
} from './transactions';

// Indicadores de mercado
export {
  MOCK_FEAR_GREED_INDEX,
  MOCK_MARKET_INDICATORS,
  MOCK_BRAZIL_INDICATORS,
  MOCK_GOOGLE_TRENDS,
  MOCK_SENTIMENT_INDICATORS,
  MOCK_CORRELATIONS,
  MOCK_BITCOIN_METRICS,
  MOCK_MARKET_CYCLES
} from './indicators';

// Blog e conteúdo
export {
  MOCK_BLOG_POSTS,
  MOCK_BLOG_AUTHORS,
  BLOG_CATEGORIES,
  POPULAR_TAGS,
  BLOG_METRICS
} from './blog-posts';

// Cursos educacionais
export {
  MOCK_COURSES,
  COURSE_INSTRUCTORS,
  COURSE_STATISTICS,
  ACTIVE_PROMOTIONS,
  COURSE_REVIEWS,
  CERTIFICATES_ISSUED
} from './courses';

// Influenciadores
export {
  MOCK_INFLUENCERS,
  INFLUENCER_CATEGORIES,
  SPECIALTIES,
  INFLUENCER_METRICS,
  INFLUENCER_RANKINGS
} from './influencers';

// Tokens suportados
export {
  MOCK_SUPPORTED_TOKENS,
  TOKENS_BY_NETWORK,
  TOKEN_CATEGORIES,
  NETWORK_CONFIGS,
  TOKEN_STATISTICS,
  TRADING_LIMITS_BY_KYC,
  getTokenBySymbol,
  getTokensByNetwork,
  getActiveTokens
} from './tokens';

// Dados de mercado
export {
  MOCK_MARKET_DATA,
  MOCK_BTC_ORDER_BOOK,
  MOCK_ETH_ORDER_BOOK,
  MARKET_SPREADS,
  VOLUME_BY_EXCHANGE,
  MARKET_METRICS,
  PRICE_HISTORY,
  CANDLESTICK_DATA,
  TECHNICAL_ANALYSIS,
  PRICE_ALERTS,
  generateRealtimeUpdate
} from './market';

// KYC e verificação
export {
  KYC_LEVELS,
  DOCUMENT_TYPES,
  MOCK_USER_DOCUMENTS,
  MOCK_USER_PIX_KEYS,
  KYC_VERIFICATION_PROCESS,
  KYC_STATISTICS,
  COMPLIANCE_SETTINGS,
  SPECIAL_DOCUMENTATION,
  KYC_MESSAGES
} from './kyc';

// Usuários (já existente)
export { mockUsers as MOCK_USERS } from './users';
export { mockUsers } from './users';

// Aliases para compatibilidade
export const blogPosts = MOCK_BLOG_POSTS;
export const courses = MOCK_COURSES;
export const supportedTokens = MOCK_SUPPORTED_TOKENS;
export const marketData = MOCK_MARKET_DATA;
export const indicatorsData = MOCK_MARKET_INDICATORS;
export const portfolioData = MOCK_PORTFOLIO_SUMMARY;
export const kycLevelsData = KYC_LEVELS;
export const influencers = MOCK_INFLUENCERS;

// Constantes úteis para toda a aplicação
export const MOCK_DATA_VERSION = '1.0.0';
export const LAST_UPDATED = new Date().toISOString();

// Configurações globais dos dados mockados
export const MOCK_CONFIG = {
  // Simular delay de rede (ms)
  networkDelay: {
    fast: 100,
    normal: 300,
    slow: 800
  },
  
  // Intervalo de atualização dos dados de mercado
  marketUpdateInterval: 5000, // 5 segundos
  
  // Configurações de volatilidade para simulação
  volatility: {
    low: 0.01,    // 1%
    medium: 0.03, // 3%
    high: 0.08    // 8%
  },
  
  // Moedas base para cotações
  baseCurrencies: ['BRL', 'USD'],
  
  // Precisão decimal por tipo de asset
  decimalPlaces: {
    BTC: 8,
    ETH: 6,
    ALTCOINS: 4,
    STABLECOINS: 2,
    FIAT: 2
  }
};

// Funções utilitárias para trabalhar com dados mockados
export const MockUtils = {
  // Simula delay de rede
  delay: (ms: number = MOCK_CONFIG.networkDelay.normal): Promise<void> => 
    new Promise(resolve => setTimeout(resolve, ms)),
  
  // Simula erro de rede ocasional
  simulateNetworkError: (errorRate: number = 0.05): boolean => 
    Math.random() < errorRate,
  
  // Formata valores em BRL
  formatBRL: (value: number): string => 
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value),
  
  // Formata valores de crypto
  formatCrypto: (value: number, symbol: string): string => {
    const decimals = MOCK_CONFIG.decimalPlaces[symbol as keyof typeof MOCK_CONFIG.decimalPlaces] || 4;
    return `${value.toFixed(decimals)} ${symbol}`;
  },
  
  // Gera variação percentual aleatória
  randomPercentageChange: (volatility: number = MOCK_CONFIG.volatility.medium): number => 
    (Math.random() - 0.5) * 2 * volatility,
  
  // Filtra dados por período
  filterByDateRange: <T extends { date?: string; createdAt?: string; publishedAt?: string }>(
    data: T[], 
    days: number
  ): T[] => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return data.filter(item => {
      const itemDate = new Date(item.date || item.createdAt || item.publishedAt || '');
      return itemDate >= cutoffDate;
    });
  },
  
  // Pagina resultados
  paginate: <T>(data: T[], page: number = 1, limit: number = 10) => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    return {
      data: data.slice(startIndex, endIndex),
      pagination: {
        page,
        limit,
        total: data.length,
        totalPages: Math.ceil(data.length / limit),
        hasNext: endIndex < data.length,
        hasPrev: page > 1
      }
    };
  }
};

// Simulação de APIs para desenvolvimento
export const MockAPI = {
  // Simula fetch com delay e erro ocasional
  fetch: async <T>(data: T, options?: {
    delay?: number;
    errorRate?: number;
    errorMessage?: string;
  }): Promise<T> => {
    const { 
      delay = MOCK_CONFIG.networkDelay.normal,
      errorRate = 0.02,
      errorMessage = 'Erro de rede simulado'
    } = options || {};
    
    // Simula delay
    await MockUtils.delay(delay);
    
    // Simula erro ocasional
    if (MockUtils.simulateNetworkError(errorRate)) {
      throw new Error(errorMessage);
    }
    
    return data;
  },
  
  // Endpoints mockados
  endpoints: {
    // Portfolio
    '/api/portfolio': () => MockAPI.fetch({
      summary: MOCK_PORTFOLIO_SUMMARY,
      assets: MOCK_PORTFOLIO_ASSETS,
      history: MOCK_PORTFOLIO_HISTORY,
      recommendations: MOCK_SMART_RECOMMENDATIONS
    }),
    
    // Transações
    '/api/transactions': (params?: { page?: number; limit?: number }) => {
      const { page = 1, limit = 20 } = params || {};
      const result = MockUtils.paginate(MOCK_TRANSACTIONS, page, limit);
      return MockAPI.fetch(result);
    },
    
    // Mercado
    '/api/market': () => MockAPI.fetch(MOCK_MARKET_DATA),
    
    // Indicadores
    '/api/indicators': () => MockAPI.fetch(MOCK_MARKET_INDICATORS),
    
    // Blog
    '/api/blog': (params?: { category?: string; page?: number }) => {
      let posts = MOCK_BLOG_POSTS;
      
      if (params?.category) {
        posts = posts.filter((post: any) => post.category === params.category);
      }
      
      const result = MockUtils.paginate(posts, params?.page);
      return MockAPI.fetch(result);
    },
    
    // Cursos
    '/api/courses': () => MockAPI.fetch(MOCK_COURSES),
    
    // Influenciadores
    '/api/influencers': (params?: { category?: string }) => {
      let influencers = MOCK_INFLUENCERS;
      
      if (params?.category) {
        influencers = influencers.filter((inf: any) => inf.category === params.category);
      }
      
      return MockAPI.fetch(influencers);
    }
  }
};

// Dados consolidados para dashboard
export const DASHBOARD_DATA = {
  portfolio: {
    summary: MOCK_PORTFOLIO_SUMMARY,
    topAssets: MOCK_PORTFOLIO_ASSETS.slice(0, 4),
    recentTransactions: MOCK_TRANSACTIONS.slice(0, 5)
  },
  
  market: {
    featured: MOCK_MARKET_DATA.slice(0, 6),
    gainers: MOCK_MARKET_DATA
      .filter((coin: any) => coin.change24h > 0)
      .sort((a: any, b: any) => b.change24h - a.change24h)
      .slice(0, 3),
    losers: MOCK_MARKET_DATA
      .filter((coin: any) => coin.change24h < 0)
      .sort((a: any, b: any) => a.change24h - b.change24h)
      .slice(0, 3)
  },
  
  indicators: {
    fearGreed: MOCK_FEAR_GREED_INDEX,
    marketCap: MOCK_MARKET_INDICATORS.marketCap,
    trends: MOCK_GOOGLE_TRENDS
  },
  
  content: {
    latestPosts: MOCK_BLOG_POSTS.slice(0, 3),
    featuredCourses: MOCK_COURSES.slice(0, 2),
    topInfluencers: MOCK_INFLUENCERS
      .sort((a: any, b: any) => b.trustScore - a.trustScore)
      .slice(0, 4)
  }
};

// Export default para facilitar importação
export default {
  portfolio: MOCK_PORTFOLIO_SUMMARY,
  transactions: MOCK_TRANSACTIONS,
  market: MOCK_MARKET_DATA,
  indicators: MOCK_MARKET_INDICATORS,
  blog: MOCK_BLOG_POSTS,
  courses: MOCK_COURSES,
  influencers: MOCK_INFLUENCERS,
  tokens: MOCK_SUPPORTED_TOKENS,
  kyc: KYC_LEVELS,
  utils: MockUtils,
  api: MockAPI,
  dashboard: DASHBOARD_DATA
};