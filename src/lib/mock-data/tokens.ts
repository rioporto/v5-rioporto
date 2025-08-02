import { SupportedToken } from '@/types/rioporto';

/**
 * Dados mockados dos tokens suportados pela plataforma
 * Inclui informações de rede, contratos, ícones e configurações
 */

export const MOCK_SUPPORTED_TOKENS: SupportedToken[] = [
  // Bitcoin
  {
    id: 'bitcoin',
    symbol: 'BTC',
    name: 'Bitcoin',
    network: 'Bitcoin',
    decimals: 8,
    icon: '/tokens/btc.svg',
    color: '#F7931A',
    description: 'A primeira e maior criptomoeda descentralizada do mundo. Store of value digital e reserva de valor.',
    website: 'https://bitcoin.org',
    explorer: 'https://blockstream.info',
    minAmount: 0.0001,      // 0.0001 BTC mínimo
    maxAmount: 100,         // 100 BTC máximo por transação
    fee: 0.001,            // 0.1% de taxa
    active: true
  },

  // Ethereum
  {
    id: 'ethereum',
    symbol: 'ETH',
    name: 'Ethereum',
    network: 'Ethereum',
    contractAddress: null, // Nativo da rede
    decimals: 18,
    icon: '/tokens/eth.svg',
    color: '#627EEA',
    description: 'Plataforma de contratos inteligentes e segunda maior criptomoeda. Base para DeFi e NFTs.',
    website: 'https://ethereum.org',
    explorer: 'https://etherscan.io',
    minAmount: 0.001,       // 0.001 ETH mínimo
    maxAmount: 1000,        // 1000 ETH máximo
    fee: 0.001,            // 0.1% de taxa
    active: true
  },

  // Stablecoins
  {
    id: 'tether',
    symbol: 'USDT',
    name: 'Tether',
    network: 'Ethereum',
    contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    decimals: 6,
    icon: '/tokens/usdt.svg',
    color: '#26A17B',
    description: 'Stablecoin pareada ao dólar americano. Ideal para preservar valor e liquidez.',
    website: 'https://tether.to',
    explorer: 'https://etherscan.io/token/0xdAC17F958D2ee523a2206206994597C13D831ec7',
    minAmount: 10,          // $10 USDT mínimo
    maxAmount: 500000,      // $500k USDT máximo
    fee: 0.0005,           // 0.05% de taxa
    active: true
  },

  {
    id: 'usd-coin',
    symbol: 'USDC',
    name: 'USD Coin',
    network: 'Ethereum',
    contractAddress: '0xA0b86a33E6441C4C0A0b86a33E6441C4C0A0b86a33E6441C4C0A0b86a33E6441C4C0',
    decimals: 6,
    icon: '/tokens/usdc.svg',
    color: '#2775CA',
    description: 'Stablecoin regulamentada pareada ao dólar. Reservas auditadas e transparentes.',
    website: 'https://www.centre.io',
    explorer: 'https://etherscan.io/token/0xa0b86a33e6441c4c0a0b86a33e6441c4c0a0b86a33e6441c4c0a0b86a33e6441c4c0',
    minAmount: 10,          // $10 USDC mínimo
    maxAmount: 500000,      // $500k USDC máximo
    fee: 0.0005,           // 0.05% de taxa
    active: true
  },

  // Binance Ecosystem
  {
    id: 'binancecoin',
    symbol: 'BNB',
    name: 'BNB',
    network: 'BSC',
    contractAddress: null, // Nativo da BSC
    decimals: 18,
    icon: '/tokens/bnb.svg',
    color: '#F3BA2F',
    description: 'Token nativo da Binance Smart Chain. Usado para taxas e staking na rede BSC.',
    website: 'https://www.binance.com/en/bnb',
    explorer: 'https://bscscan.com',
    minAmount: 0.01,        // 0.01 BNB mínimo
    maxAmount: 10000,       // 10k BNB máximo
    fee: 0.001,            // 0.1% de taxa
    active: true
  },

  // DeFi Tokens
  {
    id: 'chainlink',
    symbol: 'LINK',
    name: 'Chainlink',
    network: 'Ethereum',
    contractAddress: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
    decimals: 18,
    icon: '/tokens/link.svg',
    color: '#2A5ADA',
    description: 'Rede de oráculos descentralizada. Conecta contratos inteligentes com dados do mundo real.',
    website: 'https://chain.link',
    explorer: 'https://etherscan.io/token/0x514910771AF9Ca656af840dff83E8264EcF986CA',
    minAmount: 1,           // 1 LINK mínimo
    maxAmount: 100000,      // 100k LINK máximo
    fee: 0.0015,           // 0.15% de taxa
    active: true
  },

  {
    id: 'uniswap',
    symbol: 'UNI',
    name: 'Uniswap',
    network: 'Ethereum',
    contractAddress: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    decimals: 18,
    icon: '/tokens/uni.svg',
    color: '#FF007A',
    description: 'Token de governança do maior DEX (exchange descentralizada) do Ethereum.',
    website: 'https://uniswap.org',
    explorer: 'https://etherscan.io/token/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    minAmount: 1,           // 1 UNI mínimo
    maxAmount: 50000,       // 50k UNI máximo
    fee: 0.0015,           // 0.15% de taxa
    active: true
  },

  // Layer 1 Alternatives
  {
    id: 'solana',
    symbol: 'SOL',
    name: 'Solana',
    network: 'Solana',
    contractAddress: null, // Nativo da rede
    decimals: 9,
    icon: '/tokens/sol.svg',
    color: '#9945FF',
    description: 'Blockchain de alta performance focada em DeFi, NFTs e Web3. Transações rápidas e baratas.',
    website: 'https://solana.com',
    explorer: 'https://explorer.solana.com',
    minAmount: 0.01,        // 0.01 SOL mínimo
    maxAmount: 50000,       // 50k SOL máximo
    fee: 0.002,            // 0.2% de taxa
    active: true
  },

  {
    id: 'cardano',
    symbol: 'ADA',
    name: 'Cardano',
    network: 'Cardano',
    contractAddress: null, // Nativo da rede
    decimals: 6,
    icon: '/tokens/ada.svg',
    color: '#0033AD',
    description: 'Blockchain proof-of-stake focada em sustentabilidade e pesquisa acadêmica.',
    website: 'https://cardano.org',
    explorer: 'https://cardanoscan.io',
    minAmount: 1,           // 1 ADA mínimo
    maxAmount: 1000000,     // 1M ADA máximo
    fee: 0.002,            // 0.2% de taxa
    active: true
  },

  {
    id: 'polygon',
    symbol: 'MATIC',
    name: 'Polygon',
    network: 'Polygon',
    contractAddress: null, // Nativo da rede
    decimals: 18,
    icon: '/tokens/matic.svg',
    color: '#8247E5',
    description: 'Solução de Layer 2 para Ethereum. Transações rápidas e taxas baixas.',
    website: 'https://polygon.technology',
    explorer: 'https://polygonscan.com',
    minAmount: 1,           // 1 MATIC mínimo
    maxAmount: 1000000,     // 1M MATIC máximo
    fee: 0.002,            // 0.2% de taxa
    active: true
  },

  // Outros tokens populares
  {
    id: 'polkadot',
    symbol: 'DOT',
    name: 'Polkadot',
    network: 'Polkadot',
    contractAddress: null,
    decimals: 10,
    icon: '/tokens/dot.svg',
    color: '#E6007A',
    description: 'Blockchain interoperável que permite comunicação entre diferentes redes.',
    website: 'https://polkadot.network',
    explorer: 'https://polkadot.subscan.io',
    minAmount: 0.1,         // 0.1 DOT mínimo
    maxAmount: 100000,      // 100k DOT máximo
    fee: 0.002,            // 0.2% de taxa
    active: true
  },

  {
    id: 'avalanche',
    symbol: 'AVAX',
    name: 'Avalanche',
    network: 'Avalanche',
    contractAddress: null,
    decimals: 18,
    icon: '/tokens/avax.svg',
    color: '#E84142',
    description: 'Plataforma para aplicações descentralizadas com consenso Avalanche.',
    website: 'https://avax.network',
    explorer: 'https://snowtrace.io',
    minAmount: 0.01,        // 0.01 AVAX mínimo
    maxAmount: 50000,       // 50k AVAX máximo
    fee: 0.002,            // 0.2% de taxa
    active: true
  },

  // Tokens em desenvolvimento/teste (inativos)
  {
    id: 'litecoin',
    symbol: 'LTC',
    name: 'Litecoin',
    network: 'Litecoin',
    contractAddress: null,
    decimals: 8,
    icon: '/tokens/ltc.svg',
    color: '#BFBBBB',
    description: 'Fork do Bitcoin com transações mais rápidas. "Prata digital".',
    website: 'https://litecoin.org',
    explorer: 'https://blockchair.com/litecoin',
    minAmount: 0.01,        // 0.01 LTC mínimo
    maxAmount: 10000,       // 10k LTC máximo
    fee: 0.002,            // 0.2% de taxa
    active: false          // Temporariamente inativo
  }
];

// Tokens por rede
export const TOKENS_BY_NETWORK = {
  Bitcoin: MOCK_SUPPORTED_TOKENS.filter(token => token.network === 'Bitcoin'),
  Ethereum: MOCK_SUPPORTED_TOKENS.filter(token => token.network === 'Ethereum'),
  BSC: MOCK_SUPPORTED_TOKENS.filter(token => token.network === 'BSC'),
  Polygon: MOCK_SUPPORTED_TOKENS.filter(token => token.network === 'Polygon'),
  Solana: MOCK_SUPPORTED_TOKENS.filter(token => token.network === 'Solana'),
  Cardano: MOCK_SUPPORTED_TOKENS.filter(token => token.network === 'Cardano'),
  Avalanche: MOCK_SUPPORTED_TOKENS.filter(token => token.network === 'Avalanche'),
  Polkadot: MOCK_SUPPORTED_TOKENS.filter(token => token.network === 'Polkadot'),
  Litecoin: MOCK_SUPPORTED_TOKENS.filter(token => token.network === 'Litecoin')
};

// Categorias de tokens
export const TOKEN_CATEGORIES = {
  'Store of Value': ['BTC'],
  'Smart Contract Platforms': ['ETH', 'SOL', 'ADA', 'AVAX', 'DOT'],
  'Stablecoins': ['USDT', 'USDC'],
  'Exchange Tokens': ['BNB'],
  'DeFi': ['UNI', 'LINK'],
  'Layer 2': ['MATIC'],
  'Payments': ['LTC']
};

// Configurações de rede
export const NETWORK_CONFIGS = {
  Bitcoin: {
    name: 'Bitcoin',
    chainId: null,
    rpcUrl: null,
    explorerUrl: 'https://blockstream.info',
    nativeCurrency: { name: 'Bitcoin', symbol: 'BTC', decimals: 8 },
    confirmations: 6,
    avgBlockTime: 600, // 10 minutos
    color: '#F7931A'
  },
  Ethereum: {
    name: 'Ethereum',
    chainId: 1,
    rpcUrl: 'https://mainnet.infura.io/v3/YOUR_PROJECT_ID',
    explorerUrl: 'https://etherscan.io',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    confirmations: 12,
    avgBlockTime: 12, // 12 segundos
    color: '#627EEA'
  },
  BSC: {
    name: 'Binance Smart Chain',
    chainId: 56,
    rpcUrl: 'https://bsc-dataseed1.binance.org',
    explorerUrl: 'https://bscscan.com',
    nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
    confirmations: 20,
    avgBlockTime: 3, // 3 segundos
    color: '#F3BA2F'
  },
  Polygon: {
    name: 'Polygon',
    chainId: 137,
    rpcUrl: 'https://polygon-rpc.com',
    explorerUrl: 'https://polygonscan.com',
    nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    confirmations: 50,
    avgBlockTime: 2, // 2 segundos
    color: '#8247E5'
  },
  Solana: {
    name: 'Solana',
    chainId: null,
    rpcUrl: 'https://api.mainnet-beta.solana.com',
    explorerUrl: 'https://explorer.solana.com',
    nativeCurrency: { name: 'SOL', symbol: 'SOL', decimals: 9 },
    confirmations: 32,
    avgBlockTime: 0.4, // 400ms
    color: '#9945FF'
  }
};

// Estatísticas dos tokens
export const TOKEN_STATISTICS = {
  totalTokens: MOCK_SUPPORTED_TOKENS.length,
  activeTokens: MOCK_SUPPORTED_TOKENS.filter(token => token.active).length,
  totalNetworks: Object.keys(TOKENS_BY_NETWORK).length,
  
  // Por categoria
  byCategory: Object.entries(TOKEN_CATEGORIES).map(([category, symbols]) => ({
    category,
    count: symbols.length,
    tokens: symbols.map(symbol => 
      MOCK_SUPPORTED_TOKENS.find(token => token.symbol === symbol)
    ).filter(Boolean)
  })),
  
  // Tokens mais negociados (mockado)
  mostTraded: [
    { symbol: 'BTC', volume24h: 2.5e9, trades24h: 45672 },
    { symbol: 'ETH', volume24h: 1.8e9, trades24h: 38945 },
    { symbol: 'USDT', volume24h: 1.2e9, trades24h: 56789 },
    { symbol: 'BNB', volume24h: 0.8e9, trades24h: 23456 },
    { symbol: 'SOL', volume24h: 0.6e9, trades24h: 19876 }
  ],
  
  // Distribuição de taxas
  feeDistribution: {
    '0.05%': MOCK_SUPPORTED_TOKENS.filter(t => t.fee === 0.0005).length,
    '0.1%': MOCK_SUPPORTED_TOKENS.filter(t => t.fee === 0.001).length,
    '0.15%': MOCK_SUPPORTED_TOKENS.filter(t => t.fee === 0.0015).length,
    '0.2%': MOCK_SUPPORTED_TOKENS.filter(t => t.fee === 0.002).length
  }
};

// Limites de trading por KYC level
export const TRADING_LIMITS_BY_KYC = {
  0: { // Sem KYC
    dailyLimit: 1000,      // R$ 1.000 por dia
    monthlyLimit: 5000,    // R$ 5.000 por mês
    allowedTokens: ['BTC', 'ETH', 'USDT'] // Apenas principais
  },
  1: { // KYC Básico
    dailyLimit: 10000,     // R$ 10.000 por dia
    monthlyLimit: 50000,   // R$ 50.000 por mês
    allowedTokens: ['BTC', 'ETH', 'USDT', 'USDC', 'BNB']
  },
  2: { // KYC Intermediário
    dailyLimit: 100000,    // R$ 100.000 por dia
    monthlyLimit: 500000,  // R$ 500.000 por mês
    allowedTokens: MOCK_SUPPORTED_TOKENS.filter(t => t.active).map(t => t.symbol)
  },
  3: { // KYC Completo
    dailyLimit: 1000000,   // R$ 1.000.000 por dia
    monthlyLimit: 'unlimited',
    allowedTokens: MOCK_SUPPORTED_TOKENS.map(t => t.symbol) // Todos tokens
  }
};

// Para facilitar busca
export const getTokenBySymbol = (symbol: string) => 
  MOCK_SUPPORTED_TOKENS.find(token => token.symbol === symbol);

export const getTokensByNetwork = (network: string) => 
  MOCK_SUPPORTED_TOKENS.filter(token => token.network === network);

export const getActiveTokens = () => 
  MOCK_SUPPORTED_TOKENS.filter(token => token.active);