'use client';

import { useMemo, useState } from 'react';
import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Skeleton } from '@/components/ui/Skeleton';
import { ChartProps, CandlestickData } from '@/types/financial';

interface CandlestickChartProps extends ChartProps {
  data: CandlestickData[];
}

const TIMEFRAMES = [
  { value: '1m', label: '1m' },
  { value: '5m', label: '5m' },
  { value: '15m', label: '15m' },
  { value: '1h', label: '1h' },
  { value: '4h', label: '4h' },
  { value: '1d', label: '1d' },
  { value: '1w', label: '1w' },
  { value: '1M', label: '1M' },
];

const CustomCandlestick = ({ payload, x, y, width, height }: any) => {
  if (!payload) return null;
  
  const { open, high, low, close } = payload;
  const isGreen = close > open;
  const color = isGreen ? '#10b981' : '#ef4444';
  const bodyHeight = Math.abs(close - open);
  const bodyY = Math.min(close, open);
  
  // Wick (high-low line)
  const wickX = x + width / 2;
  
  return (
    <g>
      {/* High-Low Wick */}
      <line
        x1={wickX}
        y1={high}
        x2={wickX}
        y2={low}
        stroke={color}
        strokeWidth={1}
      />
      {/* Body */}
      <rect
        x={x + 1}
        y={bodyY}
        width={width - 2}
        height={Math.max(bodyHeight, 1)}
        fill={isGreen ? color : 'transparent'}
        stroke={color}
        strokeWidth={1}
      />
    </g>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;
  const change = data.close - data.open;
  const changePercent = (change / data.open) * 100;
  const isPositive = change >= 0;

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg">
      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
        {new Date(data.timestamp * 1000).toLocaleString()}
      </p>
      <div className="mt-2 space-y-1 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-gray-600 dark:text-gray-400">Open:</span>
          <span className="font-mono">${data.open.toFixed(2)}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-gray-600 dark:text-gray-400">High:</span>
          <span className="font-mono">${data.high.toFixed(2)}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-gray-600 dark:text-gray-400">Low:</span>
          <span className="font-mono">${data.low.toFixed(2)}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-gray-600 dark:text-gray-400">Close:</span>
          <span className="font-mono">${data.close.toFixed(2)}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-gray-600 dark:text-gray-400">Change:</span>
          <span className={`font-mono ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? '+' : ''}${change.toFixed(2)} ({changePercent.toFixed(2)}%)
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-gray-600 dark:text-gray-400">Volume:</span>
          <span className="font-mono">{data.volume.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default function CandlestickChart({ 
  data, 
  config = {}, 
  loading = false, 
  error,
  onTimeframeChange,
  onIndicatorToggle 
}: CandlestickChartProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState(config.timeframe || '1d');
  const [showVolume, setShowVolume] = useState(config.showVolume ?? true);
  const [zoomDomain, setZoomDomain] = useState<[number, number] | null>(null);

  const processedData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    return data.map(item => ({
      ...item,
      timestamp: item.timestamp * 1000, // Convert to milliseconds for display
    }));
  }, [data]);

  const handleTimeframeChange = (timeframe: string) => {
    setSelectedTimeframe(timeframe as any);
    onTimeframeChange?.(timeframe);
  };

  const handleZoom = (domain: any) => {
    if (domain) {
      setZoomDomain([domain.startIndex, domain.endIndex]);
    }
  };

  const resetZoom = () => {
    setZoomDomain(null);
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-6 w-32" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
        <Skeleton className="h-96 w-full" />
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center h-96 text-red-500">
          Error loading chart: {error}
        </div>
      </Card>
    );
  }

  if (!processedData.length) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center h-96 text-gray-500">
          No data available
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Price Chart
        </h3>
        <div className="flex items-center gap-4">
          {/* Timeframe Selector */}
          <Select
            value={selectedTimeframe}
            onChange={(value) => handleTimeframeChange(value)}
            options={TIMEFRAMES}
          />
          
          {/* Controls */}
          <div className="flex gap-2">
            <Button
              variant={showVolume ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setShowVolume(!showVolume)}
            >
              Volume
            </Button>
            {zoomDomain && (
              <Button
                variant="outline"
                size="sm"
                onClick={resetZoom}
              >
                Reset Zoom
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={processedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            onMouseDown={handleZoom}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#e5e7eb" 
              className="dark:stroke-gray-600"
            />
            <XAxis
              dataKey="timestamp"
              type="number"
              scale="time"
              domain={zoomDomain ? [zoomDomain[0], zoomDomain[1]] : ['dataMin', 'dataMax']}
              tickFormatter={(value) => new Date(value).toLocaleDateString()}
              stroke="#6b7280"
              className="dark:stroke-gray-400"
            />
            <YAxis
              domain={['dataMin', 'dataMax']}
              tickFormatter={(value) => `$${value.toFixed(2)}`}
              stroke="#6b7280"
              className="dark:stroke-gray-400"
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Candlesticks */}
            <Bar
              dataKey="high"
              shape={<CustomCandlestick />}
              isAnimationActive={false}
            />
            
            {/* Volume bars (if enabled) */}
            {showVolume && (
              <Bar
                dataKey="volume"
                yAxisId="volume"
                fill="#8b5cf6"
                fillOpacity={0.3}
                stroke="#8b5cf6"
                strokeWidth={0}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Stats */}
      <div className="mt-4 flex justify-between text-sm text-gray-600 dark:text-gray-400">
        <span>Data points: {processedData.length}</span>
        {processedData.length > 0 && (
          <span>
            Range: ${Math.min(...processedData.map(d => d.low)).toFixed(2)} - 
            ${Math.max(...processedData.map(d => d.high)).toFixed(2)}
          </span>
        )}
      </div>
    </Card>
  );
}