import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { LineChart, Line, Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, AlertTriangle, TrendingUp, Info } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface VolatilityData {
  date: string;
  volatility: number;
  portfolioValue: number;
  events?: string[];
}

interface VolatilityTrackerProps {
  className?: string;
  data?: VolatilityData[];
  currentVolatility?: number;
  averageVolatility?: number;
  volatilityTrend?: 'increasing' | 'decreasing' | 'stable';
}

const generateMockData = (): VolatilityData[] => {
  const data: VolatilityData[] = [];
  const now = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    const volatility = 20 + Math.random() * 30 + (i < 10 ? 15 : 0);
    const portfolioValue = 50000 + Math.random() * 10000 - (volatility * 100);
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      volatility: Number(volatility.toFixed(2)),
      portfolioValue: Number(portfolioValue.toFixed(2)),
      events: i === 15 ? ['Fed Rate Decision'] : i === 5 ? ['ETH Merge Update'] : undefined
    });
  }
  
  return data;
};

export function VolatilityTracker({ 
  className,
  data = generateMockData(),
  currentVolatility = 32.5,
  averageVolatility = 28.3,
  volatilityTrend = 'increasing'
}: VolatilityTrackerProps) {
  const getVolatilityStatus = (value: number) => {
    if (value < 20) return { label: 'Low', color: 'text-green-500', bg: 'bg-green-500/10 border-green-500/20' };
    if (value < 40) return { label: 'Moderate', color: 'text-yellow-500', bg: 'bg-yellow-500/10 border-yellow-500/20' };
    if (value < 60) return { label: 'High', color: 'text-orange-500', bg: 'bg-orange-500/10 border-orange-500/20' };
    return { label: 'Extreme', color: 'text-red-500', bg: 'bg-red-500/10 border-red-500/20' };
  };

  const status = getVolatilityStatus(currentVolatility);
  const difference = currentVolatility - averageVolatility;
  const percentChange = ((difference / averageVolatility) * 100).toFixed(1);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-popover p-3 rounded shadow-lg border border-border">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-sm text-muted-foreground">
            Volatility: <span className="font-medium text-foreground">{payload[0].value}%</span>
          </p>
          {data.events && data.events.length > 0 && (
            <div className="mt-2 pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground">Events:</p>
              {data.events.map((event: string, idx: number) => (
                <p key={idx} className="text-xs font-medium">{event}</p>
              ))}
            </div>
          )}
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
            Volatility Tracker
            <Badge variant="outline" className={cn('text-xs', status.bg)}>
              {status.label}
            </Badge>
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            30-day portfolio volatility analysis
          </p>
        </div>
        <div className="text-right">
          <div className={cn('text-2xl font-bold', status.color)}>
            {currentVolatility}%
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>vs avg:</span>
            <span className={cn(
              'font-medium',
              difference > 0 ? 'text-red-500' : 'text-green-500'
            )}>
              {difference > 0 ? '+' : ''}{percentChange}%
            </span>
          </div>
        </div>
      </div>

      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="volatilityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
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
              label={{ value: 'Volatility %', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="volatility"
              stroke="#8B5CF6"
              strokeWidth={2}
              fill="url(#volatilityGradient)"
            />
            <Line
              type="monotone"
              dataKey="volatility"
              stroke="#8B5CF6"
              strokeWidth={2}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <Activity className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">Current</p>
          <p className="text-lg font-bold">{currentVolatility}%</p>
        </div>
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <TrendingUp className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">30d Average</p>
          <p className="text-lg font-bold">{averageVolatility}%</p>
        </div>
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <AlertTriangle className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">Max (30d)</p>
          <p className="text-lg font-bold">48.2%</p>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-medium flex items-center gap-2">
          Volatility Insights
          <Info className="w-3 h-3 text-muted-foreground" />
        </h4>
        
        {volatilityTrend === 'increasing' && (
          <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <p className="text-xs">
              <span className="font-medium">Trend Alert:</span> Volatility has been increasing over the past week. 
              Consider adjusting position sizes or adding hedges.
            </p>
          </div>
        )}
        
        {currentVolatility > 40 && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-xs">
              <span className="font-medium">High Volatility:</span> Current market conditions are highly volatile. 
              Review your risk management strategy.
            </p>
          </div>
        )}
        
        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-xs">
            <span className="font-medium">Recommendation:</span> Your portfolio volatility is {difference > 0 ? 'above' : 'below'} the 
            30-day average. {difference > 0 ? 'Consider rebalancing to more stable assets.' : 'Current allocation is within normal range.'}
          </p>
        </div>
      </div>
    </Card>
  );
}