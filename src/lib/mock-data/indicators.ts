import { MarketIndicators, FearGreedIndex } from '@/types/rioporto';

/**
 * Dados mockados de indicadores de mercado
 * Inclui Fear & Greed, métricas on-chain, derivativos e indicadores sociais
 */

// Histórico do Fear & Greed Index (30 dias)
const generateFearGreedHistory = () => {
  const history = [];
  const today = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Simula variação do índice entre 15-85
    const baseValue = 55;
    const trend = Math.sin(i * 0.2) * 15; // Oscilação senoidal
    const noise = (Math.random() - 0.5) * 20; // Ruído aleatório
    const value = Math.max(15, Math.min(85, baseValue + trend + noise));
    
    history.push({
      date: date.toISOString().split('T')[0],
      value: Math.round(value)
    });
  }
  
  return history;
};

// Fear & Greed Index atual
export const MOCK_FEAR_GREED_INDEX: FearGreedIndex = {
  value: 72,
  label: 'Greed',
  color: '#00D632',
  description: 'Mercado otimista, considere tomar lucros parciais e diversificar riscos',
  components: {
    volatility: { value: 25, weight: 0.25 },
    marketMomentum: { value: 80, weight: 0.25 },
    socialMedia: { value: 75, weight: 0.15 },
    dominance: { value: 70, weight: 0.10 },
    trends: { value: 85, weight: 0.25 }
  },
  history: generateFearGreedHistory()
};

// Indicadores completos de mercado
export const MOCK_MARKET_INDICATORS: MarketIndicators = {
  fearGreedIndex: MOCK_FEAR_GREED_INDEX,
  
  marketCap: {
    total: 2.18e12,              // $2.18 trilhões
    totalFormatted: '$2.18T',
    change24h: 3.5,              // +3.5% nas últimas 24h
    btcDominance: 52.3,          // Bitcoin domina 52.3%
    ethDominance: 17.8,          // Ethereum domina 17.8%
    altcoinMarketCap: 0.65e12    // $650 bilhões em altcoins
  },
  
  onchain: {
    hashRate: {
      value: 685,                // 685 EH/s
      unit: 'EH/s',
      change24h: 2.1             // +2.1% aumento
    },
    difficulty: {
      value: 88.79e12,           // 88.79T dificuldade
      change24h: 1.8             // +1.8%
    },
    mempool: {
      count: 245678,             // 245k transações pendentes
      size: '18.7 MB'            // 18.7 MB de mempool
    },
    activeAddresses: {
      value: 1.2e6,              // 1.2M endereços ativos
      change24h: -2.3            // -2.3% redução
    }
  },
  
  derivatives: {
    openInterest: {
      value: 35.8e9,             // $35.8 bilhões
      change24h: 5.2             // +5.2% aumento
    },
    longShortRatio: {
      value: 2.35                // 2.35:1 long/short ratio
    },
    fundingRates: {
      btc: 0.0125,               // 1.25% funding rate BTC
      eth: 0.0089                // 0.89% funding rate ETH
    }
  },
  
  social: {
    redditPosts: {
      value: 5847,               // 5847 posts sobre crypto
      change24h: 12.3            // +12.3% aumento
    },
    twitterMentions: {
      value: 89234,              // 89k menções no Twitter
      change24h: -5.7            // -5.7% redução
    },
    googleTrends: {
      value: 68,                 // Score 68/100
      keyword: 'bitcoin'         // Termo mais pesquisado
    }
  }
};

// Indicadores adicionais específicos para o Brasil
export const MOCK_BRAZIL_INDICATORS = {
  localExchanges: {
    volume24h: 185.6e6,          // R$ 185.6 milhões volume diário
    change24h: 8.7,              // +8.7% aumento
    dominantPair: 'BTC/BRL',
    averageSpread: 0.85          // 0.85% spread médio
  },
  
  regulatory: {
    status: 'REGULATED',         // Status regulatório
    lastUpdate: '2024-07-15',
    compliance: 95,              // 95% compliance score
    taxFramework: 'CLEAR'        // Framework tributário claro
  },
  
  adoption: {
    bankSupport: 78,             // 78% dos bancos suportam crypto
    merchantAcceptance: 23,      // 23% comerciantes aceitam
    publicAwareness: 67,         // 67% conhecimento público
    institutionalInterest: 82    // 82% interesse institucional
  },
  
  economicFactors: {
    inflation: 4.23,             // 4.23% inflação anual
    selic: 10.75,                // 10.75% taxa Selic
    usdBrl: 5.45,                // R$ 5.45 por USD
    economicSentiment: 'NEUTRAL' // Sentimento econômico
  }
};

// Google Trends data para termos crypto no Brasil
export const MOCK_GOOGLE_TRENDS = {
  bitcoin: {
    current: 68,
    change24h: -3.2,
    peak: 100,                   // Pico histórico
    peakDate: '2021-11-10'
  },
  ethereum: {
    current: 42,
    change24h: 1.8,
    peak: 87,
    peakDate: '2021-05-15'
  },
  'comprar bitcoin': {
    current: 55,
    change24h: 8.9,
    peak: 95,
    peakDate: '2024-03-12'
  },
  'investir em crypto': {
    current: 38,
    change24h: -1.4,
    peak: 72,
    peakDate: '2024-01-20'
  },
  'carteira digital': {
    current: 29,
    change24h: 2.1,
    peak: 58,
    peakDate: '2023-09-05'
  }
};

// Indicadores de sentimento específicos
export const MOCK_SENTIMENT_INDICATORS = {
  // Índice composto de sentimento
  overall: {
    score: 72,                   // 72/100 otimista
    label: 'Bullish',
    confidence: 'High',
    lastUpdate: new Date().toISOString()
  },
  
  // Sentimento por fonte
  sources: {
    twitter: {
      score: 68,
      volume: 89234,
      positiveRatio: 0.72,
      topHashtags: ['#Bitcoin', '#ToTheMoon', '#HODL', '#CryptoBrasil']
    },
    reddit: {
      score: 75,
      volume: 5847,
      positiveRatio: 0.78,
      topSubreddits: ['r/Bitcoin', 'r/BitcoinBrasil', 'r/investimentos']
    },
    news: {
      score: 70,
      volume: 234,
      positiveRatio: 0.69,
      topSources: ['InfoMoney', 'CoinTelegraph Brasil', 'Portal do Bitcoin']
    },
    youtube: {
      score: 74,
      volume: 1256,
      positiveRatio: 0.76,
      topChannels: ['Primo Rico', 'Hashdex', 'Bitcoin Brasil']
    }
  },
  
  // Análise de texto com IA
  aiAnalysis: {
    dominant_emotions: ['optimism', 'excitement', 'caution'],
    key_themes: ['institutional_adoption', 'regulation', 'price_target'],
    risk_sentiment: 'moderate',
    timeframe_bias: 'medium_term',
    geography_focus: 'brazil_latam'
  }
};

// Correlações com outros ativos
export const MOCK_CORRELATIONS = {
  traditional_assets: {
    sp500: -0.15,                // Correlação negativa com S&P 500
    gold: 0.32,                  // Correlação positiva com ouro
    dxy: -0.68,                  // Correlação negativa com dólar
    bonds: -0.25,                // Correlação negativa com bonds
    commodities: 0.18            // Correlação leve com commodities
  },
  
  macro_factors: {
    inflation: 0.45,             // Correlação com inflação
    interest_rates: -0.52,       // Correlação negativa com juros
    vix: -0.38,                  // Correlação negativa com VIX
    risk_on: 0.71,               // Correlação com risk-on sentiment
    liquidity: 0.83              // Correlação alta com liquidez
  },
  
  crypto_internal: {
    btc_eth: 0.85,               // BTC vs ETH
    btc_alts: 0.72,              // BTC vs Altcoins
    defi_nfts: 0.58,             // DeFi vs NFTs
    layer1_layer2: 0.79          // Layer 1 vs Layer 2
  }
};

// Métricas específicas do Bitcoin
export const MOCK_BITCOIN_METRICS = {
  network: {
    transactions24h: 298456,     // Transações 24h
    avgFee: 12.50,               // Taxa média (USD)
    avgConfirmTime: 10.2,        // Tempo médio confirmação (min)
    utxoCount: 125.7e6,          // UTXO count
    longTermHolders: 0.68        // 68% long-term holders
  },
  
  supply: {
    circulatingSupply: 19.75e6,  // 19.75M BTC circulando
    totalSupply: 21e6,           // 21M supply máximo
    inflationRate: 1.75,         // 1.75% inflação anual
    lostCoins: 3.7e6,            // 3.7M BTC perdidos
    dormantCoins: 5.2e6          // 5.2M BTC dormentes (>2 anos)
  },
  
  institutional: {
    etfHoldings: 1.05e6,         // 1.05M BTC em ETFs
    publicCompanies: 0.45e6,     // 450k BTC empresas públicas
    governmentHoldings: 0.21e6,  // 210k BTC governos
    exchanges: 2.3e6             // 2.3M BTC em exchanges
  },
  
  valuation: {
    nvt: 68.5,                   // Network Value to Transactions
    mvrv: 2.15,                  // Market Value to Realized Value
    nvm: 1.87,                   // Network Value to Metcalfe
    thermoCap: 42.8e9,           // Thermo Cap ($42.8B)
    realizedCap: 485.2e9         // Realized Cap ($485.2B)
  }
};

// Ciclos de mercado e sazonalidade
export const MOCK_MARKET_CYCLES = {
  halving: {
    last: '2024-04-20',          // Último halving
    next: '2028-05-15',          // Próximo halving estimado
    daysUntilNext: 1389,         // Dias até próximo
    cycleDays: 546,              // Dias desde último
    historicalPattern: 'ACCUMULATION' // Fase atual do ciclo
  },
  
  seasonality: {
    monthly: {
      january: 0.048,            // Retorno médio histórico
      february: -0.012,
      march: 0.089,
      april: 0.156,
      may: -0.023,
      june: -0.067,
      july: 0.134,
      august: -0.031,
      september: -0.089,
      october: 0.178,
      november: 0.245,
      december: 0.067
    },
    
    weekly: {
      monday: -0.002,            // Retorno médio por dia
      tuesday: 0.001,
      wednesday: 0.003,
      thursday: 0.002,
      friday: -0.001,
      saturday: 0.004,
      sunday: -0.001
    }
  },
  
  lengthening_cycles: {
    cycle1: { duration: 1068, peak: '2013-11-30', gain: 87.5 },
    cycle2: { duration: 1064, peak: '2017-12-17', gain: 19.7 },
    cycle3: { duration: 1064, peak: '2021-11-10', gain: 6.8 },
    cycle4: { duration: 'ongoing', peak: 'TBD', estimatedGain: 3.2 }
  }
};