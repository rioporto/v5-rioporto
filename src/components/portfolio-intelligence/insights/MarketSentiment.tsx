import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { 
  Activity, 
  TrendingUp, 
  TrendingDown,
  Users,
  BarChart3,
  Newspaper,
  MessageSquare
} from 'lucide-react';

interface SentimentData {
  overall: number;
  social: number;
  news: number;
  onChain: number;
  technical: number;
  trend: 'bullish' | 'bearish' | 'neutral';
}

interface MarketSentimentProps {
  className?: string;
  data?: SentimentData;
}

export function MarketSentiment({ 
  className,
  data = {
    overall: 68,
    social: 72,
    news: 65,
    onChain: 70,
    technical: 64,
    trend: 'bullish'
  }
}: MarketSentimentProps) {
  const getSentimentColor = (value: number) => {
    if (value >= 70) return 'text-green-500';
    if (value >= 50) return 'text-yellow-500';
    if (value >= 30) return 'text-orange-500';
    return 'text-red-500';
  };

  const getSentimentLabel = (value: number) => {
    if (value >= 80) return 'Extreme Greed';
    if (value >= 70) return 'Greed';
    if (value >= 60) return 'Slightly Bullish';
    if (value >= 50) return 'Neutral';
    if (value >= 40) return 'Slightly Bearish';
    if (value >= 30) return 'Fear';
    if (value >= 20) return 'Extreme Fear';
    return 'Panic';
  };

  const getTrendIcon = () => {
    switch (data.trend) {
      case 'bullish': return <TrendingUp className="w-4 h-4" />;
      case 'bearish': return <TrendingDown className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const sentimentMetrics = [
    { 
      label: 'Social Media', 
      value: data.social, 
      icon: <MessageSquare className="w-4 h-4" />,
      description: 'Twitter, Reddit, Discord sentiment'
    },
    { 
      label: 'News Sentiment', 
      value: data.news, 
      icon: <Newspaper className="w-4 h-4" />,
      description: 'Major crypto news outlets'
    },
    { 
      label: 'On-Chain', 
      value: data.onChain, 
      icon: <BarChart3 className="w-4 h-4" />,
      description: 'Network activity & whale movements'
    },
    { 
      label: 'Technical', 
      value: data.technical, 
      icon: <Activity className="w-4 h-4" />,
      description: 'TA indicators consensus'
    }
  ];

  return (
    <Card className={cn('p-6', className)}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Market Sentiment Analysis
        </h3>
        <Badge 
          variant="outline" 
          className={cn(
            'capitalize',
            data.trend === 'bullish' && 'border-green-500/20 text-green-500',
            data.trend === 'bearish' && 'border-red-500/20 text-red-500',
            data.trend === 'neutral' && 'border-yellow-500/20 text-yellow-500'
          )}
        >
          {getTrendIcon()}
          <span className="ml-1">{data.trend}</span>
        </Badge>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline justify-between mb-2">
          <div>
            <span className="text-sm text-muted-foreground">Overall Sentiment</span>
            <h4 className={cn('text-3xl font-bold mt-1', getSentimentColor(data.overall))}>
              {data.overall}
            </h4>
          </div>
          <span className={cn('text-sm font-medium', getSentimentColor(data.overall))}>
            {getSentimentLabel(data.overall)}
          </span>
        </div>
        <Progress value={data.overall} className="h-3" />
      </div>

      <div className="space-y-4">
        {sentimentMetrics.map((metric) => (
          <div key={metric.label} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="text-muted-foreground">{metric.icon}</div>
                <span className="text-sm font-medium">{metric.label}</span>
              </div>
              <span className={cn('text-sm font-bold', getSentimentColor(metric.value))}>
                {metric.value}
              </span>
            </div>
            <Progress value={metric.value} className="h-2" />
            <p className="text-xs text-muted-foreground">{metric.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 p-3 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Users className="w-3 h-3" />
          <span>Based on analysis of 10M+ data points from 50+ sources</span>
        </div>
      </div>
    </Card>
  );
}