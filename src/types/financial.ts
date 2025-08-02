/**
 * Tipos específicos para componentes financeiros
 */

// Dados para gráficos de candlestick
export interface CandlestickData {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

// Dados para gráficos de linha
export interface LineChartData {
  timestamp: number;
  value: number;
  volume?: number;
}

// Dados para gráficos de área
export interface AreaChartData {
  timestamp: number;
  value: number;
  fill?: string;
}

// Dados para gráficos de barras
export interface BarChartData {
  timestamp: number;
  value: number;
  category?: string;
  color?: string;
}

// Dados para gráfico de pizza
export interface PieChartData {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

// Dados para heatmap
export interface HeatmapData {
  x: string;
  y: string;
  value: number;
  color: string;
}

// Indicadores técnicos
export interface TechnicalIndicator {
  name: string;
  value: number;
  signal: 'BUY' | 'SELL' | 'NEUTRAL';
  strength: number; // 0-100
  description: string;
}

export interface RSIData {
  timestamp: number;
  value: number;
  overbought: boolean;
  oversold: boolean;
}

export interface MACDData {
  timestamp: number;
  macd: number;
  signal: number;
  histogram: number;
}

export interface BollingerBandsData {
  timestamp: number;
  upper: number;
  middle: number;
  lower: number;
  price: number;
}

// Profundidade de mercado
export interface MarketDepthData {
  price: number;
  quantity: number;
  total: number;
  type: 'bid' | 'ask';
}

// Fluxo de ordens
export interface OrderFlowData {
  price: number;
  buyVolume: number;
  sellVolume: number;
  netVolume: number;
  timestamp: number;
}

// Perfil de volume
export interface VolumeProfileData {
  priceLevel: number;
  volume: number;
  percentage: number;
  valueAreaHigh?: boolean;
  valueAreaLow?: boolean;
  pointOfControl?: boolean;
}

// Matriz de correlação
export interface CorrelationData {
  asset1: string;
  asset2: string;
  correlation: number;
  significance: 'HIGH' | 'MEDIUM' | 'LOW';
}

// Métricas de performance
export interface PerformanceMetrics {
  totalReturn: number;
  annualizedReturn: number;
  sharpeRatio: number;
  volatility: number;
  maxDrawdown: number;
  calmarRatio: number;
  sortinoRatio: number;
  alpha: number;
  beta: number;
  informationRatio: number;
}

// Análise de risco
export interface RiskAnalysis {
  var95: number; // Value at Risk 95%
  var99: number; // Value at Risk 99%
  cvar95: number; // Conditional VaR 95%
  cvar99: number; // Conditional VaR 99%
  beta: number;
  correlation: number;
  volatility: number;
  riskScore: number; // 0-100
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME';
}

// Atividade recente
export interface RecentActivity {
  id: string;
  type: 'BUY' | 'SELL' | 'DEPOSIT' | 'WITHDRAW' | 'DIVIDEND' | 'SPLIT';
  asset: string;
  amount: number;
  price?: number;
  value: number;
  timestamp: number;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
}

// Preços em tempo real
export interface RealtimePrice {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  high24h: number;
  low24h: number;
  lastUpdate: number;
  trend: 'UP' | 'DOWN' | 'NEUTRAL';
}

// Status do mercado
export interface MarketStatus {
  isOpen: boolean;
  nextOpen?: number;
  nextClose?: number;
  timezone: string;
  marketHours: {
    open: string;
    close: string;
  };
  extendedHours?: {
    premarket: { open: string; close: string };
    aftermarket: { open: string; close: string };
  };
}

// Configurações de gráfico
export interface ChartConfig {
  height: number;
  theme: 'light' | 'dark';
  showGrid: boolean;
  showVolume: boolean;
  showIndicators: boolean;
  timeframe: '1m' | '5m' | '15m' | '1h' | '4h' | '1d' | '1w' | '1M';
  indicators: string[];
  colors: {
    up: string;
    down: string;
    volume: string;
    grid: string;
    text: string;
    background: string;
  };
}

// Props para componentes
export interface ChartProps {
  data: any[];
  config?: Partial<ChartConfig>;
  loading?: boolean;
  error?: string;
  onTimeframeChange?: (timeframe: string) => void;
  onIndicatorToggle?: (indicator: string) => void;
}

export interface WidgetProps {
  title?: string;
  loading?: boolean;
  error?: string;
  className?: string;
  data: any;
}