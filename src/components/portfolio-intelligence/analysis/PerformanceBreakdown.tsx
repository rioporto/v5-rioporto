import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Tabs } from '@/components/ui/Tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  Calendar,
  Award,
  Target
} from 'lucide-react';

interface PerformanceData {
  period: string;
  return: number;
  benchmark: number;
  alpha: number;
  bestAsset: { symbol: string; return: number };
  worstAsset: { symbol: string; return: number };
}

interface PerformanceBreakdownProps {
  className?: string;
  data?: PerformanceData[];
}

const defaultData: PerformanceData[] = [
  {
    period: '24h',
    return: 2.4,
    benchmark: 1.8,
    alpha: 0.6,
    bestAsset: { symbol: 'SOL', return: 8.2 },
    worstAsset: { symbol: 'ADA', return: -1.3 }
  },
  {
    period: '7d',
    return: 12.5,
    benchmark: 10.2,
    alpha: 2.3,
    bestAsset: { symbol: 'ETH', return: 18.4 },
    worstAsset: { symbol: 'BNB', return: 3.2 }
  },
  {
    period: '30d',
    return: 28.7,
    benchmark: 22.4,
    alpha: 6.3,
    bestAsset: { symbol: 'BTC', return: 35.2 },
    worstAsset: { symbol: 'USDT', return: 0.1 }
  },
  {
    period: '90d',
    return: 45.3,
    benchmark: 38.7,
    alpha: 6.6,
    bestAsset: { symbol: 'SOL', return: 89.4 },
    worstAsset: { symbol: 'USDC', return: 0.2 }
  }
];

export function PerformanceBreakdown({ 
  className,
  data = defaultData
}: PerformanceBreakdownProps) {
  const formatReturn = (value: number) => {
    const sign = value > 0 ? '+' : '';
    return `${sign}${value.toFixed(2)}%`;
  };

  const getReturnColor = (value: number) => {
    return value >= 0 ? 'text-green-500' : 'text-red-500';
  };

  const getReturnIcon = (value: number) => {
    return value >= 0 ? 
      <TrendingUp className="w-4 h-4" /> : 
      <TrendingDown className="w-4 h-4" />;
  };

  const tabContent = data.map((period) => ({
    value: period.period,
    label: period.period,
    content: (
      <div className="space-y-4 pt-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <DollarSign className="w-4 h-4" />
              <span className="text-xs">Portfolio Return</span>
            </div>
            <p className={cn('text-2xl font-bold', getReturnColor(period.return))}>
              {formatReturn(period.return)}
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Target className="w-4 h-4" />
              <span className="text-xs">Benchmark</span>
            </div>
            <p className="text-2xl font-bold text-muted-foreground">
              {formatReturn(period.benchmark)}
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Award className="w-4 h-4" />
              <span className="text-xs">Alpha Generated</span>
            </div>
            <p className={cn('text-2xl font-bold', getReturnColor(period.alpha))}>
              {formatReturn(period.alpha)}
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span className="text-xs">Time Period</span>
            </div>
            <p className="text-2xl font-bold">
              {period.period}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-green-500">Best Performer</span>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-lg font-bold">{period.bestAsset.symbol}</span>
              <span className="text-lg font-bold text-green-500">
                {formatReturn(period.bestAsset.return)}
              </span>
            </div>
          </div>

          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-red-500">Worst Performer</span>
              <TrendingDown className="w-4 h-4 text-red-500" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-lg font-bold">{period.worstAsset.symbol}</span>
              <span className="text-lg font-bold text-red-500">
                {formatReturn(period.worstAsset.return)}
              </span>
            </div>
          </div>
        </div>

        <div className="pt-4 space-y-2">
          <h4 className="text-sm font-medium">Performance Summary</h4>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="p-2 bg-muted/50 rounded">
              <span className="text-muted-foreground">Win Rate</span>
              <p className="font-medium mt-1">
                {period.return > 0 ? '73%' : '45%'}
              </p>
            </div>
            <div className="p-2 bg-muted/50 rounded">
              <span className="text-muted-foreground">Sharpe Ratio</span>
              <p className="font-medium mt-1">
                {(period.return / 10).toFixed(2)}
              </p>
            </div>
            <div className="p-2 bg-muted/50 rounded">
              <span className="text-muted-foreground">Max Drawdown</span>
              <p className="font-medium mt-1 text-red-500">
                -{(period.return * 0.3).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }));

  return (
    <Card className={cn('p-6', className)}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Performance Breakdown
        </h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {getReturnIcon(data[0].return)}
          <span>vs Market Benchmark</span>
        </div>
      </div>

      <Tabs defaultValue="7d" tabs={tabContent} />
    </Card>
  );
}