'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Brain,
  DollarSign,
  Users,
  Globe,
  Zap,
  AlertTriangle,
  Info
} from 'lucide-react';
import { indicatorsData } from '@/lib/mock-data';

export default function IndicatorsPage() {
  const [timeframe, setTimeframe] = useState('24h');
  const indicators = indicatorsData;

  const timeframes = [
    { value: '1h', label: '1h' },
    { value: '24h', label: '24h' },
    { value: '7d', label: '7d' },
    { value: '30d', label: '30d' },
  ];

  const getFearGreedColor = (value: number) => {
    if (value <= 20) return 'text-red-500';
    if (value <= 40) return 'text-orange-500';
    if (value <= 60) return 'text-yellow-500';
    if (value <= 80) return 'text-lime-500';
    return 'text-green-500';
  };

  const getFearGreedBg = (value: number) => {
    if (value <= 20) return 'bg-red-500';
    if (value <= 40) return 'bg-orange-500';
    if (value <= 60) return 'bg-yellow-500';
    if (value <= 80) return 'bg-lime-500';
    return 'bg-green-500';
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-success' : 'text-destructive';
  };

  const formatNumber = (num: number, decimals = 2) => {
    if (num >= 1e12) return `${(num / 1e12).toFixed(decimals)}T`;
    if (num >= 1e9) return `${(num / 1e9).toFixed(decimals)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(decimals)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(decimals)}K`;
    return num.toFixed(decimals);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Indicadores de Mercado</h1>
          <p className="text-muted-foreground">
            Acompanhe métricas importantes do mercado cripto
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          {timeframes.map((tf) => (
            <Button
              key={tf.value}
              variant={timeframe === tf.value ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setTimeframe(tf.value)}
            >
              {tf.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Fear & Greed Index */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground flex items-center">
            <Brain className="w-5 h-5 mr-2" />
            Índice de Medo e Ganância
          </h2>
          <Badge variant="outline" className="flex items-center space-x-1">
            <Info className="w-3 h-3" />
            <span>Atualizado há 1h</span>
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Gauge */}
          <div className="text-center">
            <div className="relative w-48 h-48 mx-auto mb-4">
              <div className="absolute inset-0 rounded-full border-8 border-gray-200 dark:border-gray-700"></div>
              <div 
                className={`absolute inset-0 rounded-full border-8 border-transparent ${getFearGreedBg(indicators.fearGreedIndex.value)}`}
                style={{
                  background: `conic-gradient(${indicators.fearGreedIndex.color} ${indicators.fearGreedIndex.value * 3.6}deg, transparent 0deg)`
                }}
              ></div>
              <div className="absolute inset-8 bg-background rounded-full flex items-center justify-center">
                <div className="text-center">
                  <div className={`text-3xl font-bold ${getFearGreedColor(indicators.fearGreedIndex.value)}`}>
                    {indicators.fearGreedIndex.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {indicators.fearGreedIndex.label}
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              {indicators.fearGreedIndex.description}
            </p>
          </div>

          {/* Components */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Componentes do Índice</h3>
            
            {Object.entries(indicators.fearGreedIndex.components).map(([key, component]) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground capitalize">
                    {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </span>
                  <span className="font-medium text-foreground">
                    {component.value}% (peso: {component.weight}%)
                  </span>
                </div>
                <Progress value={component.value} className="h-2" />
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Tabs defaultValue="market" className="space-y-6">
        <TabsList>
          <TabsTrigger value="market">Mercado</TabsTrigger>
          <TabsTrigger value="onchain">On-Chain</TabsTrigger>
          <TabsTrigger value="derivatives">Derivativos</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
        </TabsList>

        {/* Market Tab */}
        <TabsContent value="market" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
                <Badge variant={indicators.marketCap.change24h >= 0 ? 'success' : 'error'}>
                  {indicators.marketCap.change24h >= 0 ? '+' : ''}
                  {indicators.marketCap.change24h.toFixed(2)}%
                </Badge>
              </div>
              <h3 className="font-semibold text-foreground">Market Cap Total</h3>
              <p className="text-2xl font-bold text-foreground">
                {indicators.marketCap.totalFormatted}
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-orange-500/10 rounded-full">
                  <Activity className="w-6 h-6 text-orange-500" />
                </div>
              </div>
              <h3 className="font-semibold text-foreground">Dominância BTC</h3>
              <p className="text-2xl font-bold text-foreground">
                {indicators.marketCap.btcDominance.toFixed(1)}%
              </p>
              <Progress value={indicators.marketCap.btcDominance} className="mt-2 h-2" />
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-500/10 rounded-full">
                  <TrendingUp className="w-6 h-6 text-blue-500" />
                </div>
              </div>
              <h3 className="font-semibold text-foreground">Dominância ETH</h3>
              <p className="text-2xl font-bold text-foreground">
                {indicators.marketCap.ethDominance.toFixed(1)}%
              </p>
              <Progress value={indicators.marketCap.ethDominance} className="mt-2 h-2" />
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-500/10 rounded-full">
                  <BarChart3 className="w-6 h-6 text-purple-500" />
                </div>
              </div>
              <h3 className="font-semibold text-foreground">Altcoins Cap</h3>
              <p className="text-2xl font-bold text-foreground">
                ${formatNumber(indicators.marketCap.altcoinMarketCap)}
              </p>
            </Card>
          </div>
        </TabsContent>

        {/* On-Chain Tab */}
        <TabsContent value="onchain" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Hash Rate
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Hash Rate atual:</span>
                    <span className="font-medium text-foreground">
                      {indicators.onchain.hashRate.value} {indicators.onchain.hashRate.unit}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Mudança 24h:</span>
                    <span className={`font-medium ${getChangeColor(indicators.onchain.hashRate.change24h)}`}>
                      {indicators.onchain.hashRate.change24h >= 0 ? '+' : ''}
                      {indicators.onchain.hashRate.change24h.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Dificuldade
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Dificuldade atual:</span>
                    <span className="font-medium text-foreground">
                      {formatNumber(indicators.onchain.difficulty.value)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Mudança 24h:</span>
                    <span className={`font-medium ${getChangeColor(indicators.onchain.difficulty.change24h)}`}>
                      {indicators.onchain.difficulty.change24h >= 0 ? '+' : ''}
                      {indicators.onchain.difficulty.change24h.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Mempool
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Transações pendentes:</span>
                    <span className="font-medium text-foreground">
                      {indicators.onchain.mempool.count.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tamanho do mempool:</span>
                    <span className="font-medium text-foreground">
                      {indicators.onchain.mempool.size}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Endereços Ativos
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Endereços ativos:</span>
                    <span className="font-medium text-foreground">
                      {indicators.onchain.activeAddresses.value.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Mudança 24h:</span>
                    <span className={`font-medium ${getChangeColor(indicators.onchain.activeAddresses.change24h)}`}>
                      {indicators.onchain.activeAddresses.change24h >= 0 ? '+' : ''}
                      {indicators.onchain.activeAddresses.change24h.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Derivatives Tab */}
        <TabsContent value="derivatives" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Open Interest</h3>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-foreground">
                  ${formatNumber(indicators.derivatives.openInterest.value)}
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">24h:</span>
                  <Badge variant={indicators.derivatives.openInterest.change24h >= 0 ? 'success' : 'error'}>
                    {indicators.derivatives.openInterest.change24h >= 0 ? '+' : ''}
                    {indicators.derivatives.openInterest.change24h.toFixed(2)}%
                  </Badge>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Long/Short Ratio</h3>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-foreground">
                  {indicators.derivatives.longShortRatio.value.toFixed(2)}
                </p>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Longs</span>
                    <span className="text-success">
                      {(indicators.derivatives.longShortRatio.value / (1 + indicators.derivatives.longShortRatio.value) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shorts</span>
                    <span className="text-destructive">
                      {(1 / (1 + indicators.derivatives.longShortRatio.value) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Funding Rates</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">BTC:</span>
                  <span className={`font-medium ${getChangeColor(indicators.derivatives.fundingRates.btc)}`}>
                    {indicators.derivatives.fundingRates.btc >= 0 ? '+' : ''}
                    {(indicators.derivatives.fundingRates.btc * 100).toFixed(4)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ETH:</span>
                  <span className={`font-medium ${getChangeColor(indicators.derivatives.fundingRates.eth)}`}>
                    {indicators.derivatives.fundingRates.eth >= 0 ? '+' : ''}
                    {(indicators.derivatives.fundingRates.eth * 100).toFixed(4)}%
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Social Tab */}
        <TabsContent value="social" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Reddit Posts
              </h3>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-foreground">
                  {indicators.social.redditPosts.value.toLocaleString()}
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">24h:</span>
                  <Badge variant={indicators.social.redditPosts.change24h >= 0 ? 'success' : 'error'}>
                    {indicators.social.redditPosts.change24h >= 0 ? '+' : ''}
                    {indicators.social.redditPosts.change24h.toFixed(1)}%
                  </Badge>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Twitter Mentions</h3>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-foreground">
                  {formatNumber(indicators.social.twitterMentions.value)}
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">24h:</span>
                  <Badge variant={indicators.social.twitterMentions.change24h >= 0 ? 'success' : 'error'}>
                    {indicators.social.twitterMentions.change24h >= 0 ? '+' : ''}
                    {indicators.social.twitterMentions.change24h.toFixed(1)}%
                  </Badge>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Google Trends</h3>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-foreground">
                  {indicators.social.googleTrends.value}
                </p>
                <p className="text-sm text-muted-foreground">
                  Termo: "{indicators.social.googleTrends.keyword}"
                </p>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Historical Chart would go here */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Histórico do Índice de Medo e Ganância
        </h3>
        <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
          <p className="text-muted-foreground">
            Gráfico de histórico será implementado aqui
          </p>
        </div>
      </Card>
    </div>
  );
}