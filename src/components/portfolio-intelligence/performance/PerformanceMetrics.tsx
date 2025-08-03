import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
  TrendingUp,
  TrendingDown,
  Trophy,
  Target,
  Percent,
  DollarSign,
  Activity,
  Award
} from 'lucide-react';

interface Metric {
  label: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  description?: string;
}

interface PerformanceMetricsProps {
  className?: string;
  metrics?: Metric[];
  period?: string;
}

const defaultMetrics: Metric[] = [
  {
    label: 'Total Return',
    value: '+45.2%',
    change: 12.5,
    icon: <TrendingUp className="w-4 h-4" />,
    description: 'Since inception'
  },
  {
    label: 'Sharpe Ratio',
    value: 1.85,
    change: 0.15,
    icon: <Activity className="w-4 h-4" />,
    description: 'Risk-adjusted returns'
  },
  {
    label: 'Win Rate',
    value: '68%',
    change: 5,
    icon: <Trophy className="w-4 h-4" />,
    description: 'Profitable trades'
  },
  {
    label: 'Max Drawdown',
    value: '-18.3%',
    change: -2.1,
    icon: <TrendingDown className="w-4 h-4" />,
    description: 'Largest portfolio decline'
  },
  {
    label: 'Avg. Daily Return',
    value: '+0.42%',
    change: 0.08,
    icon: <Percent className="w-4 h-4" />,
    description: '90-day average'
  },
  {
    label: 'Profit Factor',
    value: 2.34,
    change: 0.22,
    icon: <DollarSign className="w-4 h-4" />,
    description: 'Gross profit / Gross loss'
  },
  {
    label: 'Calmar Ratio',
    value: 2.47,
    change: 0.31,
    icon: <Target className="w-4 h-4" />,
    description: 'Return / Max drawdown'
  },
  {
    label: 'Portfolio Score',
    value: 'A+',
    change: 1,
    icon: <Award className="w-4 h-4" />,
    description: 'Overall performance grade'
  }
];

export function PerformanceMetrics({ 
  className,
  metrics = defaultMetrics,
  period = 'All Time'
}: PerformanceMetricsProps) {
  const getChangeColor = (change?: number) => {
    if (!change) return 'text-muted-foreground';
    return change > 0 ? 'text-green-500' : 'text-red-500';
  };

  const getMetricColor = (label: string, value: string | number) => {
    if (label === 'Max Drawdown') {
      return 'text-red-500';
    }
    if (label === 'Portfolio Score') {
      return 'text-primary';
    }
    if (typeof value === 'string' && value.includes('+')) {
      return 'text-green-500';
    }
    if (typeof value === 'string' && value.includes('-')) {
      return 'text-red-500';
    }
    return 'text-foreground';
  };

  return (
    <Card className={cn('p-6', className)}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Performance Metrics
        </h3>
        <Badge variant="outline" className="text-xs">
          {period}
        </Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-muted-foreground">{metric.icon}</div>
              {metric.change !== undefined && (
                <div className={cn('flex items-center gap-1 text-xs', getChangeColor(metric.change))}>
                  {metric.change > 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span>{Math.abs(metric.change)}%</span>
                </div>
              )}
            </div>
            <h4 className="text-xs text-muted-foreground mb-1">{metric.label}</h4>
            <p className={cn('text-lg font-bold', getMetricColor(metric.label, metric.value))}>
              {metric.value}
            </p>
            {metric.description && (
              <p className="text-xs text-muted-foreground mt-1">
                {metric.description}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
          <div className="flex items-center gap-2 text-green-500 mb-1">
            <Trophy className="w-4 h-4" />
            <span className="text-sm font-medium">Top Performer</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Your portfolio outperformed 87% of similar portfolios this period
          </p>
        </div>

        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <div className="flex items-center gap-2 text-blue-500 mb-1">
            <Activity className="w-4 h-4" />
            <span className="text-sm font-medium">Risk-Adjusted</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Excellent risk-return profile with Sharpe Ratio above 1.5
          </p>
        </div>

        <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
          <div className="flex items-center gap-2 text-purple-500 mb-1">
            <Award className="w-4 h-4" />
            <span className="text-sm font-medium">Consistency</span>
          </div>
          <p className="text-xs text-muted-foreground">
            68% win rate with positive returns in 8 of last 12 months
          </p>
        </div>
      </div>
    </Card>
  );
}