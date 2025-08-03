'use client';

import { useMemo, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { Badge } from '@/components/ui/Badge';
import { WidgetProps, OrderFlowData } from '@/types/financial';

interface OrderFlowProps extends WidgetProps {
  data: OrderFlowData[];
  priceStep?: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;
  const netVolume = data.buyVolume - data.sellVolume;
  const totalVolume = data.buyVolume + data.sellVolume;
  const imbalance = totalVolume > 0 ? (netVolume / totalVolume) * 100 : 0;

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg">
      <div className="space-y-2 text-sm">
        <div className="font-medium text-gray-900 dark:text-gray-100">
          Price: ${data.price.toFixed(2)}
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-green-600">Buy Volume:</span>
          <span className="font-mono">{data.buyVolume.toLocaleString()}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-red-600">Sell Volume:</span>
          <span className="font-mono">{data.sellVolume.toLocaleString()}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-gray-600 dark:text-gray-400">Net Volume:</span>
          <span className={`font-mono ${netVolume >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {netVolume >= 0 ? '+' : ''}{netVolume.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-gray-600 dark:text-gray-400">Imbalance:</span>
          <span className={`font-mono ${imbalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {imbalance.toFixed(1)}%
          </span>
        </div>
        <div className="text-xs text-gray-500">
          {new Date(data.timestamp * 1000).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

const OrderFlowHeatmap = ({ data, maxLevels }: { data: OrderFlowData[], maxLevels: number }) => {
  const sortedData = useMemo(() => {
    return data
      .slice(0, maxLevels)
      .sort((a, b) => b.price - a.price); // Sort by price descending
  }, [data, maxLevels]);

  const maxVolume = useMemo(() => {
    return Math.max(...sortedData.map(d => Math.max(d.buyVolume, d.sellVolume)));
  }, [sortedData]);

  const getIntensity = (volume: number) => {
    return Math.min(volume / maxVolume, 1);
  };

  const getBackgroundColor = (buyVolume: number, sellVolume: number) => {
    const buyIntensity = getIntensity(buyVolume);
    const sellIntensity = getIntensity(sellVolume);
    
    if (buyVolume > sellVolume) {
      return `rgba(16, 185, 129, ${buyIntensity * 0.7})`;
    } else if (sellVolume > buyVolume) {
      return `rgba(239, 68, 68, ${sellIntensity * 0.7})`;
    } else {
      return 'rgba(107, 114, 128, 0.1)';
    }
  };

  return (
    <div className="space-y-1">
      <div className="grid grid-cols-4 gap-2 text-xs text-gray-500 pb-2 border-b border-gray-200 dark:border-gray-700">
        <span>Price</span>
        <span className="text-right">Buy Vol</span>
        <span className="text-right">Sell Vol</span>
        <span className="text-right">Net</span>
      </div>
      {sortedData.map((item, index) => {
        const netVolume = item.buyVolume - item.sellVolume;
        return (
          <div
            key={index}
            className="grid grid-cols-4 gap-2 text-sm p-2 rounded transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
            style={{ backgroundColor: getBackgroundColor(item.buyVolume, item.sellVolume) }}
          >
            <span className="font-mono">${item.price.toFixed(2)}</span>
            <span className="font-mono text-right text-green-600">
              {item.buyVolume.toLocaleString()}
            </span>
            <span className="font-mono text-right text-red-600">
              {item.sellVolume.toLocaleString()}
            </span>
            <span className={`font-mono text-right font-medium ${
              netVolume >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {netVolume >= 0 ? '+' : ''}{netVolume.toLocaleString()}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default function OrderFlow({ 
  data,
  priceStep = 0.01,
  loading = false, 
  error,
  className = ""
}: OrderFlowProps) {
  const [view, setView] = useState<'chart' | 'heatmap'>('chart');
  const [maxLevels, setMaxLevels] = useState(20);
  const [timeWindow, setTimeWindow] = useState<'1m' | '5m' | '15m'>('5m');

  const processedData = useMemo(() => {
    if (!data.length) return [];

    // Group data by price levels and time window
    const grouped = data.reduce((acc, item) => {
      const price = Math.round(item.price / priceStep) * priceStep;
      const timeKey = Math.floor(item.timestamp / (timeWindow === '1m' ? 60 : timeWindow === '5m' ? 300 : 900));
      const key = `${price}-${timeKey}`;

      if (!acc[key]) {
        acc[key] = {
          price,
          buyVolume: 0,
          sellVolume: 0,
          netVolume: 0,
          timestamp: timeKey * (timeWindow === '1m' ? 60 : timeWindow === '5m' ? 300 : 900)
        };
      }

      acc[key].buyVolume += item.buyVolume;
      acc[key].sellVolume += item.sellVolume;
      acc[key].netVolume = acc[key].buyVolume - acc[key].sellVolume;

      return acc;
    }, {} as Record<string, any>);

    return Object.values(grouped)
      .sort((a: any, b: any) => b.timestamp - a.timestamp)
      .slice(0, maxLevels);
  }, [data, priceStep, timeWindow, maxLevels]);

  const stats = useMemo(() => {
    if (!processedData.length) return null;

    const totalBuyVolume = processedData.reduce((sum: number, item: any) => sum + item.buyVolume, 0);
    const totalSellVolume = processedData.reduce((sum: number, item: any) => sum + item.sellVolume, 0);
    const netVolume = totalBuyVolume - totalSellVolume;
    const imbalance = (totalBuyVolume + totalSellVolume) > 0 ? 
      (netVolume / (totalBuyVolume + totalSellVolume)) * 100 : 0;

    const strongBuyLevels = processedData.filter((item: any) => 
      item.buyVolume > item.sellVolume * 2
    ).length;
    
    const strongSellLevels = processedData.filter((item: any) => 
      item.sellVolume > item.buyVolume * 2
    ).length;

    return {
      totalBuyVolume,
      totalSellVolume,
      netVolume,
      imbalance,
      strongBuyLevels,
      strongSellLevels
    };
  }, [processedData]);

  if (loading) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-32" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-16" />
            </div>
          </div>
          <Skeleton className="h-64 w-full" />
          <div className="grid grid-cols-4 gap-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="flex items-center justify-center h-64 text-red-500">
          Error loading order flow: {error}
        </div>
      </Card>
    );
  }

  if (!data.length) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="flex items-center justify-center h-64 text-gray-500">
          No order flow data available
        </div>
      </Card>
    );
  }

  return (
    <Card className={`p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Order Flow
          </h3>
          {stats && (
            <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
              <span>
                Imbalance: 
                <span className={stats.imbalance >= 0 ? 'text-green-600 ml-1' : 'text-red-600 ml-1'}>
                  {stats.imbalance.toFixed(1)}%
                </span>
              </span>
              <Badge variant='default'>
                {stats.imbalance > 20 ? 'Buy Heavy' : stats.imbalance < -20 ? 'Sell Heavy' : 'Balanced'}
              </Badge>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          {/* Time Window */}
          <div className="flex gap-1">
            {(['1m', '5m', '15m'] as const).map(window => (
              <Button
                key={window}
                variant={timeWindow === window ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setTimeWindow(window)}
              >
                {window}
              </Button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex gap-2">
            <Button
              variant={view === 'chart' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setView('chart')}
            >
              Chart
            </Button>
            <Button
              variant={view === 'heatmap' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setView('heatmap')}
            >
              Heatmap
            </Button>
          </div>
          
          {/* Levels Control */}
          <div className="flex gap-1">
            {[10, 20, 50].map(level => (
              <Button
                key={level}
                variant={maxLevels === level ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setMaxLevels(level)}
              >
                {level}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      {view === 'chart' ? (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={processedData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-600" />
              <XAxis
                dataKey="price"
                tickFormatter={(value) => `$${value.toFixed(2)}`}
                stroke="#6b7280"
                className="dark:stroke-gray-400"
              />
              <YAxis
                tickFormatter={(value) => value.toLocaleString()}
                stroke="#6b7280"
                className="dark:stroke-gray-400"
              />
              <Tooltip content={<CustomTooltip />} />
              
              <Bar dataKey="buyVolume" name="Buy Volume" stackId="volume">
                {processedData.map((entry: any, index: number) => (
                  <Cell key={`buy-${index}`} fill="#10b981" />
                ))}
              </Bar>
              <Bar dataKey="sellVolume" name="Sell Volume" stackId="volume">
                {processedData.map((entry: any, index: number) => (
                  <Cell key={`sell-${index}`} fill="#ef4444" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="max-h-64 overflow-y-auto">
          <OrderFlowHeatmap data={processedData} maxLevels={maxLevels} />
        </div>
      )}

      {/* Stats */}
      {stats && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400">Buy Volume</div>
            <div className="font-mono font-medium text-green-600">
              {stats.totalBuyVolume.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500">
              {stats.strongBuyLevels} strong levels
            </div>
          </div>
          <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400">Sell Volume</div>
            <div className="font-mono font-medium text-red-600">
              {stats.totalSellVolume.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500">
              {stats.strongSellLevels} strong levels
            </div>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400">Net Volume</div>
            <div className={`font-mono font-medium ${
              stats.netVolume >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {stats.netVolume >= 0 ? '+' : ''}{stats.netVolume.toLocaleString()}
            </div>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400">Price Levels</div>
            <div className="font-mono font-medium">
              {processedData.length}
            </div>
            <div className="text-xs text-gray-500">
              Step: ${priceStep.toFixed(2)}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}