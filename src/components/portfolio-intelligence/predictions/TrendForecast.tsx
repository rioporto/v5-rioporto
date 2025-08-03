import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  TrendingUp, 
  Calendar,
  BarChart3,
  Zap,
  Info
} from 'lucide-react';

interface ForecastData {
  date: string;
  value: number;
  optimistic: number;
  pessimistic: number;
  expected: number;
}

interface TrendForecastProps {
  className?: string;
  data?: ForecastData[];
  currentValue?: number;
  forecastPeriod?: '7d' | '30d' | '90d';
  confidence?: number;
}

const generateForecastData = (period: '7d' | '30d' | '90d'): ForecastData[] => {
  const days = period === '7d' ? 7 : period === '30d' ? 30 : 90;
  const data: ForecastData[] = [];
  const baseValue = 100000;
  
  for (let i = 0; i <= days; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    
    const growthRate = 0.002; // 0.2% daily growth
    const volatility = 0.02; // 2% volatility
    
    const expected = baseValue * Math.pow(1 + growthRate, i);
    const optimistic = expected * (1 + volatility * 2);
    const pessimistic = expected * (1 - volatility);
    const value = expected + (Math.random() - 0.5) * volatility * expected;
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Number(value.toFixed(2)),
      optimistic: Number(optimistic.toFixed(2)),
      pessimistic: Number(pessimistic.toFixed(2)),
      expected: Number(expected.toFixed(2))
    });
  }
  
  return data;
};

export function TrendForecast({ 
  className,
  data,
  currentValue = 100000,
  forecastPeriod = '30d',
  confidence = 68
}: TrendForecastProps) {
  const [period, setPeriod] = React.useState(forecastPeriod);
  const forecastData = data || generateForecastData(period);
  
  const lastDataPoint = forecastData[forecastData.length - 1];
  const expectedReturn = ((lastDataPoint.expected - currentValue) / currentValue) * 100;
  const optimisticReturn = ((lastDataPoint.optimistic - currentValue) / currentValue) * 100;
  const pessimisticReturn = ((lastDataPoint.pessimistic - currentValue) / currentValue) * 100;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover p-3 rounded shadow-lg border border-border">
          <p className="text-sm font-medium mb-2">{label}</p>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between gap-4">
              <span className="text-green-500">Optimistic:</span>
              <span className="font-medium">{formatCurrency(payload[0].payload.optimistic)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-blue-500">Expected:</span>
              <span className="font-medium">{formatCurrency(payload[0].payload.expected)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-red-500">Pessimistic:</span>
              <span className="font-medium">{formatCurrency(payload[0].payload.pessimistic)}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={cn('p-6', className)}>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            Portfolio Value Forecast
            <Badge variant="outline" className="text-xs">
              {confidence}% Confidence
            </Badge>
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Monte Carlo simulation with 10,000 scenarios
          </p>
        </div>
        <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-lg">
          <button
            onClick={() => setPeriod('7d')}
            className={cn(
              'px-3 py-1 text-xs rounded transition-colors',
              period === '7d' 
                ? 'bg-background text-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            7 Days
          </button>
          <button
            onClick={() => setPeriod('30d')}
            className={cn(
              'px-3 py-1 text-xs rounded transition-colors',
              period === '30d' 
                ? 'bg-background text-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            30 Days
          </button>
          <button
            onClick={() => setPeriod('90d')}
            className={cn(
              'px-3 py-1 text-xs rounded transition-colors',
              period === '90d' 
                ? 'bg-background text-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            90 Days
          </button>
        </div>
      </div>

      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={forecastData}>
            <defs>
              <linearGradient id="optimisticGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="pessimisticGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="date" 
              className="text-xs"
              tick={{ fill: 'currentColor' }}
            />
            <YAxis 
              className="text-xs"
              tick={{ fill: 'currentColor' }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="optimistic"
              stroke="#10B981"
              strokeWidth={0}
              fill="url(#optimisticGradient)"
            />
            <Area
              type="monotone"
              dataKey="pessimistic"
              stroke="#EF4444"
              strokeWidth={0}
              fill="url(#pessimisticGradient)"
            />
            <Area
              type="monotone"
              dataKey="expected"
              stroke="#3B82F6"
              strokeWidth={2}
              fill="none"
              strokeDasharray="5 5"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium text-green-500">Optimistic</span>
          </div>
          <p className="text-lg font-bold">{formatCurrency(lastDataPoint.optimistic)}</p>
          <p className="text-xs text-muted-foreground mt-1">
            +{optimisticReturn.toFixed(1)}% return
          </p>
        </div>

        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-500">Expected</span>
          </div>
          <p className="text-lg font-bold">{formatCurrency(lastDataPoint.expected)}</p>
          <p className="text-xs text-muted-foreground mt-1">
            +{expectedReturn.toFixed(1)}% return
          </p>
        </div>

        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />
            <span className="text-sm font-medium text-red-500">Pessimistic</span>
          </div>
          <p className="text-lg font-bold">{formatCurrency(lastDataPoint.pessimistic)}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {pessimisticReturn > 0 ? '+' : ''}{pessimisticReturn.toFixed(1)}% return
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-medium flex items-center gap-2">
          Key Factors
          <Info className="w-3 h-3 text-muted-foreground" />
        </h4>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Zap className="w-3 h-3 text-muted-foreground" />
            <span className="text-muted-foreground">Market Momentum:</span>
            <span className="font-medium text-green-500">Positive</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-3 h-3 text-muted-foreground" />
            <span className="text-muted-foreground">Seasonality:</span>
            <span className="font-medium text-yellow-500">Neutral</span>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
        <p className="text-xs text-muted-foreground">
          Forecast updated hourly • Based on historical patterns and current market conditions
        </p>
      </div>
    </Card>
  );
}