import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Target,
  Brain,
  BarChart3,
  AlertCircle
} from 'lucide-react';
import { Progress } from '@/components/ui/Progress';

interface PredictionData {
  asset: string;
  currentPrice: number;
  predictions: {
    '24h': { price: number; confidence: number };
    '7d': { price: number; confidence: number };
    '30d': { price: number; confidence: number };
  };
  signals: {
    technical: 'bullish' | 'bearish' | 'neutral';
    sentiment: 'bullish' | 'bearish' | 'neutral';
    onChain: 'bullish' | 'bearish' | 'neutral';
  };
  resistance: number[];
  support: number[];
}

interface PricePredictionsProps {
  className?: string;
  predictions?: PredictionData[];
}

const defaultPredictions: PredictionData[] = [
  {
    asset: 'BTC',
    currentPrice: 45250,
    predictions: {
      '24h': { price: 46100, confidence: 78 },
      '7d': { price: 48500, confidence: 65 },
      '30d': { price: 52000, confidence: 52 }
    },
    signals: {
      technical: 'bullish',
      sentiment: 'bullish',
      onChain: 'neutral'
    },
    resistance: [46500, 48000, 50000],
    support: [44000, 42500, 40000]
  },
  {
    asset: 'ETH',
    currentPrice: 2380,
    predictions: {
      '24h': { price: 2420, confidence: 82 },
      '7d': { price: 2550, confidence: 70 },
      '30d': { price: 2800, confidence: 58 }
    },
    signals: {
      technical: 'bullish',
      sentiment: 'neutral',
      onChain: 'bullish'
    },
    resistance: [2450, 2600, 2750],
    support: [2300, 2200, 2100]
  },
  {
    asset: 'SOL',
    currentPrice: 98.50,
    predictions: {
      '24h': { price: 95.20, confidence: 68 },
      '7d': { price: 92.00, confidence: 60 },
      '30d': { price: 105.00, confidence: 45 }
    },
    signals: {
      technical: 'bearish',
      sentiment: 'neutral',
      onChain: 'bearish'
    },
    resistance: [102, 108, 115],
    support: [95, 90, 85]
  }
];

export function PricePredictions({ 
  className,
  predictions = defaultPredictions
}: PricePredictionsProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: price < 100 ? 2 : 0,
      maximumFractionDigits: price < 100 ? 2 : 0
    }).format(price);
  };

  const getChangePercent = (current: number, predicted: number) => {
    const change = ((predicted - current) / current) * 100;
    return change;
  };

  const getSignalColor = (signal: 'bullish' | 'bearish' | 'neutral') => {
    switch (signal) {
      case 'bullish': return 'text-green-500';
      case 'bearish': return 'text-red-500';
      case 'neutral': return 'text-yellow-500';
    }
  };

  const getSignalBadgeColor = (signal: 'bullish' | 'bearish' | 'neutral') => {
    switch (signal) {
      case 'bullish': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'bearish': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'neutral': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 70) return 'text-green-500';
    if (confidence >= 50) return 'text-yellow-500';
    return 'text-orange-500';
  };

  return (
    <Card className={cn('p-6', className)}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          AI Price Predictions
          <Brain className="w-5 h-5 text-muted-foreground" />
        </h3>
        <Badge variant="outline" className="text-xs">
          ML Model v2.3
        </Badge>
      </div>

      <div className="space-y-6">
        {predictions.map((prediction) => {
          const change24h = getChangePercent(prediction.currentPrice, prediction.predictions['24h'].price);
          const change7d = getChangePercent(prediction.currentPrice, prediction.predictions['7d'].price);
          const change30d = getChangePercent(prediction.currentPrice, prediction.predictions['30d'].price);

          return (
            <div key={prediction.asset} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-lg font-bold">{prediction.asset}</h4>
                  <p className="text-sm text-muted-foreground">
                    Current: {formatPrice(prediction.currentPrice)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Badge 
                    variant="outline" 
                    className={cn('text-xs', getSignalBadgeColor(prediction.signals.technical))}
                  >
                    TA: {prediction.signals.technical}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>24 Hours</span>
                    <span className={getConfidenceColor(prediction.predictions['24h'].confidence)}>
                      {prediction.predictions['24h'].confidence}% conf
                    </span>
                  </div>
                  <p className="text-sm font-medium">
                    {formatPrice(prediction.predictions['24h'].price)}
                  </p>
                  <div className={cn(
                    'flex items-center gap-1 text-xs',
                    change24h >= 0 ? 'text-green-500' : 'text-red-500'
                  )}>
                    {change24h >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    <span>{change24h >= 0 ? '+' : ''}{change24h.toFixed(2)}%</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>7 Days</span>
                    <span className={getConfidenceColor(prediction.predictions['7d'].confidence)}>
                      {prediction.predictions['7d'].confidence}% conf
                    </span>
                  </div>
                  <p className="text-sm font-medium">
                    {formatPrice(prediction.predictions['7d'].price)}
                  </p>
                  <div className={cn(
                    'flex items-center gap-1 text-xs',
                    change7d >= 0 ? 'text-green-500' : 'text-red-500'
                  )}>
                    {change7d >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    <span>{change7d >= 0 ? '+' : ''}{change7d.toFixed(2)}%</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>30 Days</span>
                    <span className={getConfidenceColor(prediction.predictions['30d'].confidence)}>
                      {prediction.predictions['30d'].confidence}% conf
                    </span>
                  </div>
                  <p className="text-sm font-medium">
                    {formatPrice(prediction.predictions['30d'].price)}
                  </p>
                  <div className={cn(
                    'flex items-center gap-1 text-xs',
                    change30d >= 0 ? 'text-green-500' : 'text-red-500'
                  )}>
                    {change30d >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    <span>{change30d >= 0 ? '+' : ''}{change30d.toFixed(2)}%</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Target className="w-3 h-3" /> Resistance Levels
                  </span>
                  <div className="flex gap-2">
                    {prediction.resistance.map((level, idx) => (
                      <span key={idx} className="text-red-500 font-medium">
                        {formatPrice(level)}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Target className="w-3 h-3" /> Support Levels
                  </span>
                  <div className="flex gap-2">
                    {prediction.support.map((level, idx) => (
                      <span key={idx} className="text-green-500 font-medium">
                        {formatPrice(level)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-border flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <BarChart3 className="w-3 h-3 text-muted-foreground" />
                  <span className="text-muted-foreground">Sentiment:</span>
                  <span className={cn('font-medium', getSignalColor(prediction.signals.sentiment))}>
                    {prediction.signals.sentiment}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 text-muted-foreground" />
                  <span className="text-muted-foreground">On-chain:</span>
                  <span className={cn('font-medium', getSignalColor(prediction.signals.onChain))}>
                    {prediction.signals.onChain}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-3 bg-muted/50 rounded-lg">
        <p className="text-xs text-muted-foreground">
          Predictions based on ML analysis of 50+ indicators • Updated every 4 hours
        </p>
      </div>
    </Card>
  );
}