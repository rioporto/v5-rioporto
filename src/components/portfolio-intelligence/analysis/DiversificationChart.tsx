import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Info } from 'lucide-react';

interface DiversificationData {
  byAsset: Array<{ name: string; value: number; color: string }>;
  bySector: Array<{ name: string; value: number; color: string }>;
  byMarketCap: Array<{ name: string; value: number; color: string }>;
  score: number;
}

interface DiversificationChartProps {
  className?: string;
  data?: DiversificationData;
  viewMode?: 'asset' | 'sector' | 'marketCap';
}

const defaultData: DiversificationData = {
  byAsset: [
    { name: 'BTC', value: 35, color: '#F7931A' },
    { name: 'ETH', value: 25, color: '#627EEA' },
    { name: 'BNB', value: 15, color: '#F3BA2F' },
    { name: 'SOL', value: 10, color: '#9945FF' },
    { name: 'ADA', value: 8, color: '#0033AD' },
    { name: 'Others', value: 7, color: '#6B7280' }
  ],
  bySector: [
    { name: 'Store of Value', value: 35, color: '#F59E0B' },
    { name: 'Smart Contracts', value: 30, color: '#3B82F6' },
    { name: 'DeFi', value: 20, color: '#10B981' },
    { name: 'Infrastructure', value: 10, color: '#8B5CF6' },
    { name: 'Others', value: 5, color: '#6B7280' }
  ],
  byMarketCap: [
    { name: 'Large Cap (>$10B)', value: 60, color: '#2563EB' },
    { name: 'Mid Cap ($1B-$10B)', value: 25, color: '#7C3AED' },
    { name: 'Small Cap (<$1B)', value: 15, color: '#DC2626' }
  ],
  score: 78
};

export function DiversificationChart({ 
  className,
  data = defaultData,
  viewMode = 'asset'
}: DiversificationChartProps) {
  const [activeView, setActiveView] = React.useState(viewMode);
  
  const getChartData = () => {
    switch (activeView) {
      case 'sector': return data.bySector;
      case 'marketCap': return data.byMarketCap;
      default: return data.byAsset;
    }
  };

  const getDiversificationStatus = (score: number) => {
    if (score >= 80) return { label: 'Excellent', color: 'text-green-500' };
    if (score >= 60) return { label: 'Good', color: 'text-yellow-500' };
    if (score >= 40) return { label: 'Moderate', color: 'text-orange-500' };
    return { label: 'Poor', color: 'text-red-500' };
  };

  const status = getDiversificationStatus(data.score);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover p-2 rounded shadow-lg border border-border">
          <p className="text-sm font-medium">{payload[0].name}</p>
          <p className="text-sm text-muted-foreground">
            {payload[0].value}% of portfolio
          </p>
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
            Portfolio Diversification
            <span className="text-sm font-normal text-muted-foreground">
              Score: <span className={cn('font-semibold', status.color)}>{data.score}/100</span>
            </span>
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {status.label} diversification across your holdings
          </p>
        </div>
        <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-lg">
          <button
            onClick={() => setActiveView('asset')}
            className={cn(
              'px-3 py-1 text-xs rounded transition-colors',
              activeView === 'asset' 
                ? 'bg-background text-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            By Asset
          </button>
          <button
            onClick={() => setActiveView('sector')}
            className={cn(
              'px-3 py-1 text-xs rounded transition-colors',
              activeView === 'sector' 
                ? 'bg-background text-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            By Sector
          </button>
          <button
            onClick={() => setActiveView('marketCap')}
            className={cn(
              'px-3 py-1 text-xs rounded transition-colors',
              activeView === 'marketCap' 
                ? 'bg-background text-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            By Market Cap
          </button>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={getChartData()}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {getChartData().map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 space-y-3">
        <h4 className="text-sm font-medium flex items-center gap-2">
          Recommendations
          <Info className="w-3 h-3 text-muted-foreground" />
        </h4>
        <div className="space-y-2">
          {data.score < 80 && (
            <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <p className="text-xs">
                Consider reducing your largest position to improve diversification
              </p>
            </div>
          )}
          {activeView === 'sector' && (
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-xs">
                Your portfolio is well-balanced across different crypto sectors
              </p>
            </div>
          )}
          {activeView === 'marketCap' && (
            <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
              <p className="text-xs">
                Good mix of market cap sizes for balanced risk/reward
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}