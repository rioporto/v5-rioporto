'use client';

import { useMemo, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { WidgetProps, MarketDepthData } from '@/types/financial';

interface MarketDepthProps extends WidgetProps {
  data: {
    bids: MarketDepthData[];
    asks: MarketDepthData[];
    spread: number;
    midPrice: number;
  };
  maxLevels?: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;
  const isBid = data.type === 'bid';

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg">
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: isBid ? '#10b981' : '#ef4444' }}
          />
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {isBid ? 'Bid' : 'Ask'}
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-gray-600 dark:text-gray-400">Price:</span>
          <span className="font-mono font-medium">${data.price.toFixed(2)}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-gray-600 dark:text-gray-400">Quantity:</span>
          <span className="font-mono font-medium">{data.quantity.toLocaleString()}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-gray-600 dark:text-gray-400">Total:</span>
          <span className="font-mono font-medium">{data.total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

const OrderBookTable = ({ 
  bids, 
  asks, 
  maxLevels 
}: { 
  bids: MarketDepthData[]; 
  asks: MarketDepthData[]; 
  maxLevels: number 
}) => {
  const displayBids = bids.slice(0, maxLevels);
  const displayAsks = asks.slice(0, maxLevels);

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Bids */}
      <div>
        <div className="text-sm font-medium text-green-600 mb-2">Bids</div>
        <div className="space-y-1">
          <div className="grid grid-cols-3 gap-2 text-xs text-gray-500 pb-1 border-b border-gray-200 dark:border-gray-700">
            <span>Price</span>
            <span className="text-right">Quantity</span>
            <span className="text-right">Total</span>
          </div>
          {displayBids.map((bid, index) => (
            <div key={index} className="grid grid-cols-3 gap-2 text-sm hover:bg-green-50 dark:hover:bg-green-900/20 p-1 rounded">
              <span className="font-mono text-green-600">${bid.price.toFixed(2)}</span>
              <span className="font-mono text-right">{bid.quantity.toLocaleString()}</span>
              <span className="font-mono text-right">{bid.total.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Asks */}
      <div>
        <div className="text-sm font-medium text-red-600 mb-2">Asks</div>
        <div className="space-y-1">
          <div className="grid grid-cols-3 gap-2 text-xs text-gray-500 pb-1 border-b border-gray-200 dark:border-gray-700">
            <span>Price</span>
            <span className="text-right">Quantity</span>
            <span className="text-right">Total</span>
          </div>
          {displayAsks.map((ask, index) => (
            <div key={index} className="grid grid-cols-3 gap-2 text-sm hover:bg-red-50 dark:hover:bg-red-900/20 p-1 rounded">
              <span className="font-mono text-red-600">${ask.price.toFixed(2)}</span>
              <span className="font-mono text-right">{ask.quantity.toLocaleString()}</span>
              <span className="font-mono text-right">{ask.total.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function MarketDepth({ 
  data,
  maxLevels = 10,
  loading = false, 
  error,
  className = ""
}: MarketDepthProps) {
  const [view, setView] = useState<'chart' | 'table'>('chart');
  const [displayLevels, setDisplayLevels] = useState(maxLevels);

  const chartData = useMemo(() => {
    if (!data.bids.length || !data.asks.length) return [];

    // Combine and sort bids and asks for the depth chart
    const bidsData = data.bids
      .slice(0, displayLevels)
      .map(bid => ({
        ...bid,
        price: bid.price,
        bidQuantity: bid.total,
        askQuantity: 0,
        type: 'bid'
      }));

    const asksData = data.asks
      .slice(0, displayLevels)
      .map(ask => ({
        ...ask,
        price: ask.price,
        bidQuantity: 0,
        askQuantity: ask.total,
        type: 'ask'
      }));

    return [...bidsData, ...asksData].sort((a, b) => a.price - b.price);
  }, [data.bids, data.asks, displayLevels]);

  const stats = useMemo(() => {
    if (!data.bids.length || !data.asks.length) return null;

    const totalBidVolume = data.bids.reduce((sum, bid) => sum + bid.quantity, 0);
    const totalAskVolume = data.asks.reduce((sum, ask) => sum + ask.quantity, 0);
    const imbalance = (totalBidVolume - totalAskVolume) / (totalBidVolume + totalAskVolume);
    
    const bestBid = data.bids[0]?.price || 0;
    const bestAsk = data.asks[0]?.price || 0;
    const spread = bestAsk - bestBid;
    const spreadPercent = spread / data.midPrice * 100;

    return {
      totalBidVolume,
      totalAskVolume,
      imbalance,
      bestBid,
      bestAsk,
      spread,
      spreadPercent
    };
  }, [data.bids, data.asks, data.midPrice]);

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
          Error loading market depth: {error}
        </div>
      </Card>
    );
  }

  if (!data.bids.length || !data.asks.length) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="flex items-center justify-center h-64 text-gray-500">
          No market depth data available
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
            Market Depth
          </h3>
          {stats && (
            <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
              <span>Spread: ${stats.spread.toFixed(2)} ({stats.spreadPercent.toFixed(2)}%)</span>
              <span>Mid: ${data.midPrice.toFixed(2)}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
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
              variant={view === 'table' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setView('table')}
            >
              Table
            </Button>
          </div>
          
          {/* Levels Control */}
          <div className="flex gap-1">
            {[5, 10, 20].map(level => (
              <Button
                key={level}
                variant={displayLevels === level ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setDisplayLevels(level)}
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
            <AreaChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-600" />
              <XAxis
                dataKey="price"
                type="number"
                scale="linear"
                domain={['dataMin', 'dataMax']}
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
              
              {/* Mid price line */}
              <ReferenceLine 
                x={data.midPrice} 
                stroke="#6b7280" 
                strokeDasharray="5 5"
                label="Mid Price"
              />
              
              {/* Bid area */}
              <Area
                dataKey="bidQuantity"
                stackId="1"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.6}
                strokeWidth={2}
                name="Bids"
              />
              
              {/* Ask area */}
              <Area
                dataKey="askQuantity"
                stackId="2"
                stroke="#ef4444"
                fill="#ef4444"
                fillOpacity={0.6}
                strokeWidth={2}
                name="Asks"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <OrderBookTable bids={data.bids} asks={data.asks} maxLevels={displayLevels} />
      )}

      {/* Stats */}
      {stats && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400">Best Bid</div>
            <div className="font-mono font-medium text-green-600">
              ${stats.bestBid.toFixed(2)}
            </div>
            <div className="text-xs text-gray-500">
              Vol: {stats.totalBidVolume.toLocaleString()}
            </div>
          </div>
          <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400">Best Ask</div>
            <div className="font-mono font-medium text-red-600">
              ${stats.bestAsk.toFixed(2)}
            </div>
            <div className="text-xs text-gray-500">
              Vol: {stats.totalAskVolume.toLocaleString()}
            </div>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400">Spread</div>
            <div className="font-mono font-medium">
              ${stats.spread.toFixed(2)}
            </div>
            <div className="text-xs text-gray-500">
              {stats.spreadPercent.toFixed(2)}%
            </div>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400">Imbalance</div>
            <div className={`font-mono font-medium ${
              stats.imbalance > 0.1 ? 'text-green-600' : 
              stats.imbalance < -0.1 ? 'text-red-600' : 'text-gray-600'
            }`}>
              {(stats.imbalance * 100).toFixed(1)}%
            </div>
            <div className="text-xs text-gray-500">
              {stats.imbalance > 0 ? 'Bid Heavy' : 'Ask Heavy'}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}