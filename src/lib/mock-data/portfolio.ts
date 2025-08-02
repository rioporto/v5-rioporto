import { PortfolioSummary, PortfolioAsset, PortfolioHistory, SmartRecommendation } from '@/types/rioporto';

/**
 * Dados mockados do portfolio do usuário
 * Inclui resumo, ativos, histórico e recomendações inteligentes
 */

// Resumo do portfolio
export const MOCK_PORTFOLIO_SUMMARY: PortfolioSummary = {
  totalInvested: 150000, // R$ 150.000,00
  currentValue: 185000,  // R$ 185.000,00
  profitLoss: 35000,     // R$ 35.000,00 de lucro
  profitLossPercentage: 23.33,
  bestAsset: 'BTC',
  worstAsset: 'ETH'
};

// Ativos no portfolio
export const MOCK_PORTFOLIO_ASSETS: PortfolioAsset[] = [
  {
    id: '1',
    symbol: 'BTC',
    name: 'Bitcoin',
    amount: 0.5,
    avgPrice: 300000,     // R$ 300.000,00 preço médio
    currentPrice: 370000, // R$ 370.000,00 preço atual
    value: 185000,        // R$ 185.000,00 valor atual
    profitLoss: 35000,    // R$ 35.000,00 lucro
    profitLossPercentage: 23.33,
    allocation: 65.5,     // 65.5% do portfolio
    network: 'Bitcoin',
    icon: '/icons/btc.svg',
    description: 'A primeira e maior criptomoeda do mundo'
  },
  {
    id: '2',
    symbol: 'ETH',
    name: 'Ethereum',
    amount: 3.2,
    avgPrice: 12000,      // R$ 12.000,00 preço médio
    currentPrice: 11500,  // R$ 11.500,00 preço atual
    value: 36800,         // R$ 36.800,00 valor atual  
    profitLoss: -1600,    // R$ -1.600,00 prejuízo
    profitLossPercentage: -4.17,
    allocation: 13.0,     // 13% do portfolio
    network: 'Ethereum',
    icon: '/icons/eth.svg',
    description: 'Plataforma de contratos inteligentes e DeFi'
  },
  {
    id: '3',
    symbol: 'USDT',
    name: 'Tether',
    amount: 12500,
    avgPrice: 5.20,       // R$ 5,20 preço médio
    currentPrice: 5.25,   // R$ 5,25 preço atual
    value: 65625,         // R$ 65.625,00 valor atual
    profitLoss: 625,      // R$ 625,00 lucro
    profitLossPercentage: 0.96,
    allocation: 23.2,     // 23.2% do portfolio
    network: 'Ethereum',
    icon: '/icons/usdt.svg',
    description: 'Stablecoin pareada ao dólar americano'
  },
  {
    id: '4',
    symbol: 'BNB',
    name: 'BNB',
    amount: 25,
    avgPrice: 1400,       // R$ 1.400,00 preço médio
    currentPrice: 1380,   // R$ 1.380,00 preço atual
    value: 34500,         // R$ 34.500,00 valor atual
    profitLoss: -500,     // R$ -500,00 prejuízo
    profitLossPercentage: -1.43,
    allocation: 12.2,     // 12.2% do portfolio
    network: 'BSC',
    icon: '/icons/bnb.svg',
    description: 'Token nativo da Binance Smart Chain'
  }
];

// Histórico de evolução do portfolio (90 dias)
export const MOCK_PORTFOLIO_HISTORY: PortfolioHistory[] = (() => {
  const history: PortfolioHistory[] = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 90);
  
  let invested = 100000; // Começou com R$ 100k
  let value = 95000;     // Valor inicial
  
  for (let i = 0; i < 90; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    // Simula volatilidade do mercado crypto
    const volatility = (Math.random() - 0.5) * 0.08; // -4% a +4% diário
    const trend = i < 30 ? -0.001 : i < 60 ? 0.002 : 0.001; // Tendências por período
    
    value = value * (1 + volatility + trend);
    
    // Aportes mensais simulados
    if (i % 30 === 0 && i > 0) {
      invested += 25000; // Aporte de R$ 25k por mês
    }
    
    history.push({
      date: date.toISOString().split('T')[0],
      value: Math.round(value),
      invested: invested,
      profitLoss: Math.round(value - invested)
    });
  }
  
  return history;
})();

// Recomendações inteligentes baseadas no portfolio
export const MOCK_SMART_RECOMMENDATIONS: SmartRecommendation[] = [
  {
    id: 'rec_001',
    type: 'REBALANCE',
    title: 'Rebalanceamento Recomendado',
    description: 'Seu portfolio está concentrado em Bitcoin (65.5%). Considere diversificar.',
    priority: 'MEDIUM',
    confidence: 78,
    reasoning: [
      'Bitcoin representa mais de 60% do seu portfolio',
      'Diversificação pode reduzir riscos',
      'Ethereum e altcoins têm potencial de crescimento'
    ],
    suggestedAction: 'Considere reduzir posição em BTC para 50% e aumentar ETH para 20%',
    risk: 'LOW',
    timeFrame: 'Próximas 2 semanas',
    createdAt: new Date().toISOString()
  },
  {
    id: 'rec_002',
    type: 'DCA',
    title: 'Estratégia DCA em ETH',
    description: 'Ethereum está em baixa (-4.17%). Oportunidade para média de preço.',
    asset: 'ETH',
    priority: 'HIGH',
    confidence: 85,
    reasoning: [
      'ETH está 4.17% abaixo do seu preço médio',
      'Próxima atualização do Ethereum pode valorizar',
      'Estratégia DCA reduz impacto da volatilidade'
    ],
    suggestedAction: 'Invista R$ 5.000 em ETH pelos próximos 4 semanas (R$ 1.250/semana)',
    expectedReturn: 15,
    risk: 'MEDIUM',
    timeFrame: '1 mês',
    createdAt: new Date().toISOString()
  },
  {
    id: 'rec_003',
    type: 'HOLD',
    title: 'Manter Posição em USDT',
    description: 'Stablecoin oferece estabilidade em momento de volatilidade.',
    asset: 'USDT',
    priority: 'LOW',
    confidence: 90,
    reasoning: [
      'USDT oferece proteção contra volatilidade',
      'Reserva de liquidez para oportunidades',
      'Taxa de juros DeFi disponível'
    ],
    suggestedAction: 'Mantenha 20-25% do portfolio em stablecoins',
    risk: 'LOW',
    timeFrame: 'Longo prazo',
    createdAt: new Date().toISOString()
  },
  {
    id: 'rec_004',
    type: 'SELL',
    title: 'Considere Realizar Lucros em BTC',
    description: 'Bitcoin teve boa performance (+23.33%). Considere realizar parte dos lucros.',
    asset: 'BTC',
    priority: 'MEDIUM',
    confidence: 65,
    reasoning: [
      'BTC subiu 23.33% desde sua entrada',
      'Resistência técnica próxima de R$ 380.000',
      'Pode ser momento de tomar lucros parciais'
    ],
    suggestedAction: 'Venda 20% da posição em BTC (0.1 BTC) para realizar lucros',
    expectedReturn: 7,
    risk: 'LOW',
    timeFrame: 'Próxima semana',
    createdAt: new Date().toISOString()
  }
];

// Métricas de performance do portfolio
export const MOCK_PORTFOLIO_METRICS = {
  // Performance geral
  performance: {
    today: 2.1,           // +2.1% hoje
    week: -1.5,           // -1.5% semana
    month: 8.7,           // +8.7% mês
    quarter: 15.2,        // +15.2% trimestre
    year: 45.8,           // +45.8% ano
    allTime: 23.33        // +23.33% desde início
  },
  
  // Métricas de risco
  risk: {
    volatility: 42.5,     // Volatilidade anualizada
    sharpeRatio: 1.8,     // Índice Sharpe
    maxDrawdown: -18.5,   // Maior perda desde pico
    correlation: 0.85     // Correlação com BTC
  },
  
  // Estatísticas
  stats: {
    totalTrades: 47,      // Total de transações
    winRate: 68.1,        // Taxa de acerto
    avgGain: 12.3,        // Ganho médio %
    avgLoss: -8.7,        // Perda média %
    bestTrade: 28.5,      // Melhor trade %
    worstTrade: -22.1     // Pior trade %
  },
  
  // Comparação com benchmarks
  benchmarks: {
    btc: -2.8,           // Performance vs BTC
    eth: 5.2,            // Performance vs ETH
    sp500: 18.7,         // Performance vs S&P 500
    cdi: 35.1            // Performance vs CDI
  }
};

// Análise de P&L detalhada
export const MOCK_PNL_ANALYSIS = {
  realized: {
    profit: 28500,        // R$ 28.500 lucro realizado
    loss: -8200,          // R$ 8.200 prejuízo realizado
    net: 20300,           // R$ 20.300 lucro líquido realizado
    trades: 35            // 35 trades realizados
  },
  
  unrealized: {
    profit: 42800,        // R$ 42.800 lucro não realizado
    loss: -14700,         // R$ 14.700 prejuízo não realizado
    net: 28100,           // R$ 28.100 lucro líquido não realizado
    percentage: 18.7      // 18.7% do valor investido
  },
  
  byAsset: [
    {
      asset: 'BTC',
      realized: 15200,
      unrealized: 35000,
      total: 50200,
      percentage: 33.47
    },
    {
      asset: 'USDT',
      realized: 8100,
      unrealized: 625,
      total: 8725,
      percentage: 13.4
    },
    {
      asset: 'ETH',
      realized: -2500,
      unrealized: -1600,
      total: -4100,
      percentage: -10.75
    },
    {
      asset: 'BNB',
      realized: -500,
      unrealized: -500,
      total: -1000,
      percentage: -2.86
    }
  ],
  
  byMonth: (() => {
    const months = [];
    const today = new Date();
    
    for (let i = 11; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const month = date.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });
      
      // Simula P&L mensal variável
      const basePnL = 2000 + (Math.random() - 0.5) * 8000;
      
      months.push({
        month,
        realized: Math.round(basePnL * 0.6),
        unrealized: Math.round(basePnL * 0.4),
        total: Math.round(basePnL)
      });
    }
    
    return months;
  })()
};