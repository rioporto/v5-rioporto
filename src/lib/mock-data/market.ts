import { MarketData, OrderBook } from '@/types/rioporto';

/**
 * Dados mockados de mercado - cotações, order book e volume
 * Simulação de dados em tempo real para demonstração
 */

// Função para gerar preços realistas com volatilidade
const generateRealisticPrice = (basePrice: number, volatility: number = 0.05) => {
  const change = (Math.random() - 0.5) * 2 * volatility;
  return basePrice * (1 + change);
};

// Função para gerar dados históricos
const generatePriceHistory = (currentPrice: number, days: number = 30) => {
  const history = [];
  let price = currentPrice;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Simula tendência geral com ruído
    const trend = Math.sin(i * 0.1) * 0.02; // Tendência senoidal
    const noise = (Math.random() - 0.5) * 0.08; // Ruído aleatório
    
    price = price * (1 + trend + noise);
    
    history.push({
      date: date.toISOString().split('T')[0],
      price: Math.round(price * 100) / 100,
      volume: Math.random() * 1000000000 + 500000000 // Volume entre 500M e 1.5B
    });
  }
  
  return history;
};

// Dados de mercado atuais (mockados como tempo real)
export const MOCK_MARKET_DATA: MarketData[] = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 370000,         // R$ 370.000
    change24h: 2.45,       // +2.45%
    change7d: -1.23,       // -1.23%
    volume24h: 2.5e9,      // R$ 2.5 bilhões
    marketCap: 7.3e12,     // R$ 7.3 trilhões
    rank: 1,
    high24h: 378500,       // Máxima 24h
    low24h: 361200,        // Mínima 24h
    ath: 450000,           // All time high
    atl: 3500,             // All time low
    lastUpdated: new Date().toISOString()
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    price: 11500,          // R$ 11.500
    change24h: -0.87,      // -0.87%
    change7d: 3.21,        // +3.21%
    volume24h: 1.8e9,      // R$ 1.8 bilhões
    marketCap: 1.4e12,     // R$ 1.4 trilhões
    rank: 2,
    high24h: 11890,
    low24h: 11205,
    ath: 32000,
    atl: 85,
    lastUpdated: new Date().toISOString()
  },
  {
    symbol: 'USDT',
    name: 'Tether',
    price: 5.25,           // R$ 5,25
    change24h: 0.19,       // +0.19%
    change7d: -0.05,       // -0.05%
    volume24h: 1.2e9,      // R$ 1.2 bilhões
    marketCap: 0.5e12,     // R$ 500 bilhões
    rank: 3,
    high24h: 5.28,
    low24h: 5.22,
    ath: 6.85,
    atl: 4.12,
    lastUpdated: new Date().toISOString()
  },
  {
    symbol: 'BNB',
    name: 'BNB',
    price: 1380,           // R$ 1.380
    change24h: 1.67,       // +1.67%
    change7d: -2.14,       // -2.14%
    volume24h: 0.8e9,      // R$ 800 milhões
    marketCap: 0.2e12,     // R$ 200 bilhões
    rank: 4,
    high24h: 1421,
    low24h: 1356,
    ath: 3500,
    atl: 45,
    lastUpdated: new Date().toISOString()
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    price: 756,            // R$ 756
    change24h: 4.23,       // +4.23%
    change7d: 8.91,        // +8.91%
    volume24h: 0.6e9,      // R$ 600 milhões
    marketCap: 0.35e12,    // R$ 350 bilhões
    rank: 5,
    high24h: 789,
    low24h: 721,
    ath: 1250,
    atl: 8.5,
    lastUpdated: new Date().toISOString()
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    price: 5.24,           // R$ 5,24
    change24h: 0.15,       // +0.15%
    change7d: 0.02,        // +0.02%
    volume24h: 0.9e9,      // R$ 900 milhões
    marketCap: 0.15e12,    // R$ 150 bilhões
    rank: 6,
    high24h: 5.27,
    low24h: 5.21,
    ath: 6.82,
    atl: 4.15,
    lastUpdated: new Date().toISOString()
  },
  {
    symbol: 'ADA',
    name: 'Cardano',
    price: 2.45,           // R$ 2,45
    change24h: -1.56,      // -1.56%
    change7d: 2.78,        // +2.78%
    volume24h: 0.4e9,      // R$ 400 milhões
    marketCap: 0.08e12,    // R$ 80 bilhões
    rank: 7,
    high24h: 2.52,
    low24h: 2.38,
    ath: 8.95,
    atl: 0.12,
    lastUpdated: new Date().toISOString()
  },
  {
    symbol: 'AVAX',
    name: 'Avalanche',
    price: 158,            // R$ 158
    change24h: 3.45,       // +3.45%
    change7d: -0.89,       // -0.89%
    volume24h: 0.3e9,      // R$ 300 milhões
    marketCap: 0.06e12,    // R$ 60 bilhões
    rank: 8,
    high24h: 164,
    low24h: 151,
    ath: 760,
    atl: 15,
    lastUpdated: new Date().toISOString()
  },
  {
    symbol: 'DOT',
    name: 'Polkadot',
    price: 32.5,           // R$ 32,50
    change24h: -2.18,      // -2.18%
    change7d: 1.45,        // +1.45%
    volume24h: 0.25e9,     // R$ 250 milhões
    marketCap: 0.045e12,   // R$ 45 bilhões
    rank: 9,
    high24h: 33.8,
    low24h: 31.9,
    ath: 285,
    atl: 6.8,
    lastUpdated: new Date().toISOString()
  },
  {
    symbol: 'MATIC',
    name: 'Polygon',
    price: 2.89,           // R$ 2,89
    change24h: 5.67,       // +5.67%
    change7d: 12.34,       // +12.34%
    volume24h: 0.35e9,     // R$ 350 milhões
    marketCap: 0.03e12,    // R$ 30 bilhões
    rank: 10,
    high24h: 2.95,
    low24h: 2.71,
    ath: 15.2,
    atl: 0.18,
    lastUpdated: new Date().toISOString()
  }
];

// Order Book simulado para BTC/BRL
export const MOCK_BTC_ORDER_BOOK: OrderBook = {
  symbol: 'BTC/BRL',
  lastUpdated: new Date().toISOString(),
  // Asks (vendas) - ordenados do menor para maior preço
  asks: [
    [370100, 0.0245],      // R$ 370.100 - 0.0245 BTC
    [370150, 0.0892],      // R$ 370.150 - 0.0892 BTC
    [370200, 0.1567],      // R$ 370.200 - 0.1567 BTC
    [370250, 0.0334],      // R$ 370.250 - 0.0334 BTC
    [370300, 0.2145],      // R$ 370.300 - 0.2145 BTC
    [370350, 0.0876],      // R$ 370.350 - 0.0876 BTC
    [370400, 0.1234],      // R$ 370.400 - 0.1234 BTC
    [370450, 0.0567],      // R$ 370.450 - 0.0567 BTC
    [370500, 0.1890],      // R$ 370.500 - 0.1890 BTC
    [370600, 0.0445],      // R$ 370.600 - 0.0445 BTC
    [370700, 0.0889],      // R$ 370.700 - 0.0889 BTC
    [370800, 0.1556],      // R$ 370.800 - 0.1556 BTC
    [370900, 0.0778],      // R$ 370.900 - 0.0778 BTC
    [371000, 0.2334],      // R$ 371.000 - 0.2334 BTC
    [371200, 0.1123],      // R$ 371.200 - 0.1123 BTC
  ],
  // Bids (compras) - ordenados do maior para menor preço
  bids: [
    [369900, 0.0456],      // R$ 369.900 - 0.0456 BTC
    [369850, 0.1234],      // R$ 369.850 - 0.1234 BTC
    [369800, 0.0789],      // R$ 369.800 - 0.0789 BTC
    [369750, 0.1678],      // R$ 369.750 - 0.1678 BTC
    [369700, 0.0345],      // R$ 369.700 - 0.0345 BTC
    [369650, 0.2145],      // R$ 369.650 - 0.2145 BTC
    [369600, 0.0892],      // R$ 369.600 - 0.0892 BTC
    [369550, 0.1567],      // R$ 369.550 - 0.1567 BTC
    [369500, 0.0678],      // R$ 369.500 - 0.0678 BTC
    [369400, 0.1890],      // R$ 369.400 - 0.1890 BTC
    [369300, 0.0445],      // R$ 369.300 - 0.0445 BTC
    [369200, 0.1234],      // R$ 369.200 - 0.1234 BTC
    [369100, 0.0567],      // R$ 369.100 - 0.0567 BTC
    [369000, 0.2778],      // R$ 369.000 - 0.2778 BTC
    [368800, 0.0998],      // R$ 368.800 - 0.0998 BTC
  ]
};

// Order Book para ETH/BRL
export const MOCK_ETH_ORDER_BOOK: OrderBook = {
  symbol: 'ETH/BRL',
  lastUpdated: new Date().toISOString(),
  asks: [
    [11510, 1.245],        // R$ 11.510 - 1.245 ETH
    [11520, 2.567],        // R$ 11.520 - 2.567 ETH
    [11530, 0.892],        // R$ 11.530 - 0.892 ETH
    [11540, 3.123],        // R$ 11.540 - 3.123 ETH
    [11550, 1.678],        // R$ 11.550 - 1.678 ETH
    [11560, 0.445],        // R$ 11.560 - 0.445 ETH
    [11570, 2.234],        // R$ 11.570 - 2.234 ETH
    [11580, 1.567],        // R$ 11.580 - 1.567 ETH
    [11590, 0.789],        // R$ 11.590 - 0.789 ETH
    [11600, 1.890],        // R$ 11.600 - 1.890 ETH
  ],
  bids: [
    [11490, 1.456],        // R$ 11.490 - 1.456 ETH
    [11480, 2.234],        // R$ 11.480 - 2.234 ETH
    [11470, 0.789],        // R$ 11.470 - 0.789 ETH
    [11460, 1.678],        // R$ 11.460 - 1.678 ETH
    [11450, 3.123],        // R$ 11.450 - 3.123 ETH
    [11440, 0.567],        // R$ 11.440 - 0.567 ETH
    [11430, 1.890],        // R$ 11.430 - 1.890 ETH
    [11420, 2.445],        // R$ 11.420 - 2.445 ETH
    [11410, 0.892],        // R$ 11.410 - 0.892 ETH
    [11400, 1.567],        // R$ 11.400 - 1.567 ETH
  ]
};

// Spreads atuais (diferença entre melhor bid e ask)
export const MARKET_SPREADS = {
  'BTC/BRL': {
    bestBid: 369900,
    bestAsk: 370100,
    spread: 200,           // R$ 200
    spreadPercentage: 0.054 // 0.054%
  },
  'ETH/BRL': {
    bestBid: 11490,
    bestAsk: 11510,
    spread: 20,            // R$ 20
    spreadPercentage: 0.174 // 0.174%
  },
  'USDT/BRL': {
    bestBid: 5.24,
    bestAsk: 5.26,
    spread: 0.02,          // R$ 0,02
    spreadPercentage: 0.381 // 0.381%
  }
};

// Dados de volume por exchange (mockado)
export const VOLUME_BY_EXCHANGE = {
  'BTC/BRL': [
    { exchange: 'RioPorto', volume: 450000000, percentage: 18.0 },
    { exchange: 'Mercado Bitcoin', volume: 625000000, percentage: 25.0 },
    { exchange: 'Binance', volume: 500000000, percentage: 20.0 },
    { exchange: 'Coinbase', volume: 375000000, percentage: 15.0 },
    { exchange: 'Outros', volume: 550000000, percentage: 22.0 }
  ],
  'ETH/BRL': [
    { exchange: 'RioPorto', volume: 324000000, percentage: 18.0 },
    { exchange: 'Mercado Bitcoin', volume: 432000000, percentage: 24.0 },
    { exchange: 'Binance', volume: 360000000, percentage: 20.0 },
    { exchange: 'Coinbase', volume: 270000000, percentage: 15.0 },
    { exchange: 'Outros', volume: 414000000, percentage: 23.0 }
  ]
};

// Métricas de mercado agregadas
export const MARKET_METRICS = {
  totalMarketCap: MOCK_MARKET_DATA.reduce((sum, coin) => sum + coin.marketCap, 0),
  total24hVolume: MOCK_MARKET_DATA.reduce((sum, coin) => sum + coin.volume24h, 0),
  
  // Dominância
  dominance: {
    btc: (MOCK_MARKET_DATA[0].marketCap / MOCK_MARKET_DATA.reduce((sum, coin) => sum + coin.marketCap, 0)) * 100,
    eth: (MOCK_MARKET_DATA[1].marketCap / MOCK_MARKET_DATA.reduce((sum, coin) => sum + coin.marketCap, 0)) * 100,
    stablecoins: ((MOCK_MARKET_DATA[2].marketCap + MOCK_MARKET_DATA[5].marketCap) / MOCK_MARKET_DATA.reduce((sum, coin) => sum + coin.marketCap, 0)) * 100
  },
  
  // Performance
  winners24h: MOCK_MARKET_DATA
    .filter(coin => coin.change24h > 0)
    .sort((a, b) => b.change24h - a.change24h)
    .slice(0, 5),
  
  losers24h: MOCK_MARKET_DATA
    .filter(coin => coin.change24h < 0)
    .sort((a, b) => a.change24h - b.change24h)
    .slice(0, 5),
  
  // Volume leaders
  volumeLeaders: [...MOCK_MARKET_DATA]
    .sort((a, b) => b.volume24h - a.volume24h)
    .slice(0, 5),
  
  // Moedas mais voláteis (baseado na diferença high-low)
  mostVolatile: MOCK_MARKET_DATA
    .map(coin => ({
      ...coin,
      volatility: ((coin.high24h - coin.low24h) / coin.price) * 100
    }))
    .sort((a, b) => b.volatility - a.volatility)
    .slice(0, 5)
};

// Histórico de preços (últimos 30 dias)
export const PRICE_HISTORY = {
  BTC: generatePriceHistory(370000, 30),
  ETH: generatePriceHistory(11500, 30),
  USDT: generatePriceHistory(5.25, 30),
  BNB: generatePriceHistory(1380, 30),
  SOL: generatePriceHistory(756, 30)
};

// Dados para gráficos de candlestick (últimas 24 horas)
export const CANDLESTICK_DATA = {
  'BTC/BRL': (() => {
    const data = [];
    const basePrice = 370000;
    let currentPrice = basePrice;
    
    for (let i = 0; i < 24; i++) {
      const timestamp = new Date();
      timestamp.setHours(timestamp.getHours() - (23 - i));
      
      const open = currentPrice;
      const volatility = 0.02; // 2% volatilidade máxima por hora
      const change = (Math.random() - 0.5) * volatility;
      const close = open * (1 + change);
      
      const high = Math.max(open, close) * (1 + Math.random() * 0.005);
      const low = Math.min(open, close) * (1 - Math.random() * 0.005);
      const volume = Math.random() * 50 + 10; // Volume entre 10-60 BTC
      
      data.push({
        timestamp: timestamp.toISOString(),
        open: Math.round(open),
        high: Math.round(high),
        low: Math.round(low),
        close: Math.round(close),
        volume: Math.round(volume * 100) / 100
      });
      
      currentPrice = close;
    }
    
    return data;
  })()
};

// Análise técnica básica
export const TECHNICAL_ANALYSIS = {
  BTC: {
    trend: 'BULLISH',           // Tendência atual
    support: [365000, 360000],  // Níveis de suporte
    resistance: [375000, 380000], // Níveis de resistência
    rsi: 65.2,                  // RSI (14 períodos)
    macd: {
      macd: 1250,
      signal: 980,
      histogram: 270
    },
    sma: {
      sma20: 368500,
      sma50: 361200,
      sma200: 345800
    },
    recommendation: 'BUY'        // Recomendação geral
  },
  ETH: {
    trend: 'NEUTRAL',
    support: [11200, 11000],
    resistance: [11800, 12000],
    rsi: 48.7,
    macd: {
      macd: -45,
      signal: -12,
      histogram: -33
    },
    sma: {
      sma20: 11450,
      sma50: 11380,
      sma200: 11520
    },
    recommendation: 'HOLD'
  }
};

// Função para simular atualizações em tempo real
export const generateRealtimeUpdate = () => {
  return MOCK_MARKET_DATA.map(coin => ({
    ...coin,
    price: generateRealisticPrice(coin.price, 0.001), // 0.1% volatilidade por update
    lastUpdated: new Date().toISOString()
  }));
};

// Alertas de preço
export const PRICE_ALERTS = [
  {
    id: 'alert_001',
    symbol: 'BTC',
    type: 'PRICE_ABOVE',
    target: 375000,
    message: 'Bitcoin rompeu resistência de R$ 375.000!'
  },
  {
    id: 'alert_002',
    symbol: 'ETH',
    type: 'PRICE_BELOW',
    target: 11000,
    message: 'Ethereum testando suporte importante em R$ 11.000'
  },
  {
    id: 'alert_003',
    symbol: 'BTC',
    type: 'VOLUME_SPIKE',
    threshold: 150, // 150% do volume médio
    message: 'Volume anômalo detectado em BTC - possível movimento forte'
  }
];