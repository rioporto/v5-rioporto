# Financial Model Components

Gráficos e widgets avançados para o modelo financial do projeto RioPorto P2P, estilo TradingView com alta densidade de informação e performance otimizada.

## 📊 Gráficos Financeiros (Charts)

### CandlestickChart
- Gráfico de velas japonesas profissional
- Zoom e pan interativo
- Tooltips detalhados com OHLCV
- Controles de timeframe
- Suporte a temas light/dark

### LineChart  
- Gráfico de linhas com zoom avançado
- Múltiplas linhas com cores customizáveis
- Brush para navegação temporal
- Pontos de dados opcionais
- Linhas de referência

### AreaChart
- Gráfico de área com gradientes
- Suporte a stacking
- Múltiplas áreas sobrepostas
- Transparência configurável
- Grid toggle

### BarChart
- Gráfico de barras horizontal/vertical
- Coloração por valor
- Labels opcionais nos valores
- Múltiplas séries com stacking
- Volume bars

### PieChart
- Gráfico de pizza/donut
- Labels com percentuais
- Legenda interativa
- Hover effects
- Animações suaves

### HeatmapChart
- Mapa de calor de correlações
- Múltiplos esquemas de cores
- Tooltips informativos
- Zoom e navegação
- Estatísticas integradas

## 🔬 Widgets de Análise (Analysis)

### TechnicalIndicators
- RSI (Relative Strength Index)
- MACD (Moving Average Convergence Divergence)  
- Bollinger Bands
- Resumo de sinais técnicos
- Força dos indicadores

### MarketDepth
- Profundidade de mercado (order book)
- Visualização chart + tabela  
- Imbalance calculation
- Controles de níveis
- Estatísticas de spread

### OrderFlow
- Fluxo de ordens buy/sell
- Heatmap de volumes
- Agregação por níveis de preço
- Janelas temporais configuráveis
- Análise de imbalance

### VolumeProfile
- Perfil de volume (POC, VA)
- Visualização horizontal/vertical
- Value Area highlighting
- Sugestões de rebalanceamento
- Estatísticas detalhadas

### CorrelationMatrix
- Matriz de correlação entre ativos
- Esquemas de cores por força
- Sorting por correlação
- Tooltips com significância
- Estatísticas de distribuição

## 📈 Dashboard Widgets

### PortfolioOverview
- Visão geral com mini gráficos
- Performance vs benchmark
- Top gainers/losers
- Sparklines integrados
- Métricas de risco

### AssetAllocation
- Alocação em tempo real
- Pie chart + treemap + lista
- Sugestões de rebalanceamento
- Agrupamento por rede/categoria
- Score de diversificação

### PerformanceMetrics
- Sharpe, Sortino, Calmar ratios
- Alpha, Beta, Information Ratio
- Radar chart de métricas
- Comparação com benchmark
- Análise de risco/retorno

## ⚡ Componentes Tempo Real

### RealtimePrice
- Preços em tempo real
- Flash effects em mudanças
- Múltiplos tamanhos
- Trend indicators
- Volume e extremos 24h

### SparklineChart
- Mini gráficos inline
- Line e area charts
- Animações configuráveis
- Cores customizáveis
- Performance otimizada

### TickerTape
- Fita de cotações rolante
- Velocidade configurável
- Pause on hover
- Scroll infinito
- Cores por variação

### MarketStatus
- Status do mercado
- Horários de funcionamento
- Countdown para abertura/fechamento
- Extended hours
- Timezone support

## 🎨 Características Técnicas

### Design System
- Tema financial customizado
- Cores profissionais (verde/vermelho)
- Typography otimizada para números
- Consistent spacing e borders
- Dark mode nativo

### Performance
- Recharts otimizado
- Virtualization para listas grandes
- Memoization de cálculos
- Lazy loading de componentes
- Debounced interactions

### Responsividade
- Mobile-first approach
- Breakpoints consistentes
- Touch-friendly controls
- Overflow handling
- Adaptive layouts

### Acessibilidade
- ARIA labels completos
- Keyboard navigation
- High contrast support
- Screen reader friendly
- Focus management

## 📝 Uso

```tsx
import {
  CandlestickChart,
  TechnicalIndicators,
  PortfolioOverview,
  RealtimePrice
} from '@/components/models/financial';

// Gráfico de candlestick
<CandlestickChart 
  data={ohlcvData}
  config={{ showVolume: true, timeframe: '1d' }}
  onTimeframeChange={handleTimeframeChange}
/>

// Indicadores técnicos
<TechnicalIndicators
  data={{
    rsi: rsiData,
    macd: macdData,
    bollinger: bollingerData,
    indicators: indicatorsList
  }}
/>

// Visão geral do portfólio  
<PortfolioOverview
  data={{
    summary: portfolioSummary,
    assets: assetsList,
    history: performanceHistory,
    topGainers: gainers,
    topLosers: losers
  }}
/>

// Preço em tempo real
<RealtimePrice
  data={priceData}
  size="lg"
  showChart={true}
/>
```

## 🔧 Configuração

### Temas
```tsx
const financialTheme = {
  colors: {
    primary: '#1f2937',
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    neutral: '#6b7280'
  }
};
```

### Tipos
Todos os tipos TypeScript estão em `/types/financial.ts` com interfaces completas para cada componente.

### Integração
Os componentes seguem o padrão de props do projeto com `loading`, `error` e `className` opcionais.

---

**Status**: ✅ Implementação completa  
**Agente**: M2 Charts & Widgets  
**Data**: Agosto 2025