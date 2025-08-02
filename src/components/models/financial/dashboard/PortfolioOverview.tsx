'use client';

import { useMemo, useState } from 'react';
import { LineChart, Line, AreaChart, Area, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { PortfolioAsset, PortfolioHistory } from '@/types/rioporto';
import { WidgetProps } from '@/types/financial';

interface PortfolioOverviewProps extends WidgetProps {
  data: {
    summary: {
      totalValue: number;
      totalInvested: number;
      profitLoss: number;
      profitLossPercentage: number;
      dayChange: number;
      dayChangePercentage: number;
    };
    assets: PortfolioAsset[];
    history: PortfolioHistory[];
    topGainers: PortfolioAsset[];
    topLosers: PortfolioAsset[];
  };
}

const MiniSparkline = ({ 
  data, 
  color, 
  height = 40 
}: { 
  data: Array<{ value: number }>; 
  color: string; 
  height?: number 
}) => (
  <ResponsiveContainer width="100%" height={height}>
    <LineChart data={data}>
      <Line 
        type="monotone" 
        dataKey="value" 
        stroke={color} 
        strokeWidth={2} 
        dot={false}
        activeDot={false}
      />
    </LineChart>
  </ResponsiveContainer>
);

const MiniAreaChart = ({ 
  data, 
  color, 
  height = 60 
}: { 
  data: Array<{ value: number }>; 
  color: string; 
  height?: number 
}) => (
  <ResponsiveContainer width="100%" height={height}>
    <AreaChart data={data}>
      <Area 
        type="monotone" 
        dataKey="value" 
        stroke={color} 
        fill={color}
        fillOpacity={0.3}
        strokeWidth={2}
      />
    </AreaChart>
  </ResponsiveContainer>
);

const AssetAllocationMini = ({ assets }: { assets: PortfolioAsset[] }) => {
  const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'];
  
  const topAssets = assets
    .sort((a, b) => b.allocation - a.allocation)
    .slice(0, 5);

  return (
    <div className="flex items-center justify-between">
      <div className="w-16 h-16">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={topAssets}
              dataKey="allocation"
              cx="50%"
              cy="50%"
              innerRadius={20}
              outerRadius={30}
              strokeWidth={0}
            >
              {topAssets.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex-1 ml-3 space-y-1">
        {topAssets.slice(0, 3).map((asset, index) => (
          <div key={asset.id} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: COLORS[index] }}
              />
              <span className="text-gray-600 dark:text-gray-400">{asset.symbol}</span>
            </div>
            <span className="font-mono">{asset.allocation.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const PerformanceCard = ({ 
  title, 
  value, 
  change, 
  changePercent, 
  color,
  sparklineData 
}: {
  title: string;
  value: number;
  change: number;
  changePercent: number;
  color: string;
  sparklineData?: Array<{ value: number }>;
}) => (
  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
    <div className="flex items-center justify-between mb-2">
      <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</h4>
      {sparklineData && (
        <div className="w-16 h-6">
          <MiniSparkline data={sparklineData} color={color} height={24} />
        </div>
      )}
    </div>
    <div className="space-y-1">
      <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
        ${value.toLocaleString()}
      </div>
      <div className={`text-sm flex items-center gap-1 ${
        change >= 0 ? 'text-green-600' : 'text-red-600'
      }`}>
        <span>{change >= 0 ? '+' : ''}${change.toLocaleString()}</span>
        <span>({changePercent >= 0 ? '+' : ''}{changePercent.toFixed(2)}%)</span>
      </div>
    </div>
  </div>
);

const TopMoversCard = ({ 
  title, 
  assets, 
  type 
}: { 
  title: string; 
  assets: PortfolioAsset[]; 
  type: 'gainers' | 'losers' 
}) => (
  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
    <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">{title}</h4>
    <div className="space-y-2">
      {assets.slice(0, 3).map((asset) => (
        <div key={asset.id} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-medium">
              {asset.symbol.slice(0, 2)}
            </div>
            <span className="text-sm font-medium">{asset.symbol}</span>
          </div>
          <div className="text-right">
            <div className="text-sm font-mono">${asset.currentPrice.toFixed(2)}</div>
            <div className={`text-xs ${
              asset.profitLossPercentage >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {asset.profitLossPercentage >= 0 ? '+' : ''}{asset.profitLossPercentage.toFixed(2)}%
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function PortfolioOverview({ 
  data,
  loading = false, 
  error,
  className = ""
}: PortfolioOverviewProps) {
  const [timeframe, setTimeframe] = useState<'1d' | '7d' | '30d'>('7d');

  const chartData = useMemo(() => {
    if (!data.history.length) return [];
    
    return data.history.map(item => ({
      date: item.date,
      value: item.value,
      invested: item.invested,
      profitLoss: item.profitLoss
    }));
  }, [data.history]);

  const sparklineData = useMemo(() => {
    return chartData.map(item => ({ value: item.value }));
  }, [chartData]);

  if (loading) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-48" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-12" />
              <Skeleton className="h-8 w-12" />
              <Skeleton className="h-8 w-12" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
          <Skeleton className="h-48 w-full" />
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="flex items-center justify-center h-64 text-red-500">
          Error loading portfolio overview: {error}
        </div>
      </Card>
    );
  }

  const { summary, assets, topGainers, topLosers } = data;

  return (
    <Card className={`p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Portfolio Overview
          </h3>
          <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
            <span>{assets.length} Assets</span>
            <Badge variant={summary.profitLoss >= 0 ? 'success' : 'error'}>
              {summary.profitLoss >= 0 ? '+' : ''}${summary.profitLoss.toLocaleString()} 
              ({summary.profitLossPercentage.toFixed(2)}%)
            </Badge>
          </div>
        </div>
        <div className="flex gap-2">
          {(['1d', '7d', '30d'] as const).map(period => (
            <Button
              key={period}
              variant={timeframe === period ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setTimeframe(period)}
            >
              {period}
            </Button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <PerformanceCard
          title="Total Value"
          value={summary.totalValue}
          change={summary.profitLoss}
          changePercent={summary.profitLossPercentage}
          color="#3b82f6"
          sparklineData={sparklineData}
        />
        <PerformanceCard
          title="Total Invested"
          value={summary.totalInvested}
          change={summary.dayChange}
          changePercent={summary.dayChangePercentage}
          color="#10b981"
        />
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
            Top Holdings
          </h4>
          <AssetAllocationMini assets={assets} />
        </div>
      </div>

      {/* Portfolio Performance Chart */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
          Portfolio Performance
        </h4>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#portfolioGradient)"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="invested"
                stroke="#6b7280"
                strokeDasharray="5 5"
                strokeWidth={1}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Movers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TopMoversCard 
          title="Top Gainers" 
          assets={topGainers} 
          type="gainers" 
        />
        <TopMoversCard 
          title="Top Losers" 
          assets={topLosers} 
          type="losers" 
        />
      </div>

      {/* Quick Stats */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="text-gray-600 dark:text-gray-400">Best Performer</div>
          <div className="font-medium text-blue-600">
            {topGainers[0]?.symbol || 'N/A'}
          </div>
          <div className="text-xs text-gray-500">
            {topGainers[0] ? `+${topGainers[0].profitLossPercentage.toFixed(2)}%` : ''}
          </div>
        </div>
        <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <div className="text-gray-600 dark:text-gray-400">Worst Performer</div>
          <div className="font-medium text-red-600">
            {topLosers[0]?.symbol || 'N/A'}
          </div>
          <div className="text-xs text-gray-500">
            {topLosers[0] ? `${topLosers[0].profitLossPercentage.toFixed(2)}%` : ''}
          </div>
        </div>
        <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="text-gray-600 dark:text-gray-400">Diversification</div>
          <div className="font-medium text-green-600">
            {assets.length} Assets
          </div>
          <div className="text-xs text-gray-500">
            Avg: {(100 / assets.length).toFixed(1)}%
          </div>
        </div>
        <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <div className="text-gray-600 dark:text-gray-400">Risk Level</div>
          <div className="font-medium text-yellow-600">
            {summary.profitLossPercentage > 10 ? 'High' : 
             summary.profitLossPercentage > 0 ? 'Medium' : 'Conservative'}
          </div>
          <div className="text-xs text-gray-500">
            Based on returns
          </div>
        </div>
      </div>
    </Card>
  );
}