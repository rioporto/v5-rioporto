'use client';

import { useMemo, useState } from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Brush, ReferenceLine } from 'recharts';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Skeleton } from '@/components/ui/Skeleton';
import { ChartProps, LineChartData } from '@/types/financial';

interface LineChartProps extends ChartProps {
  data: LineChartData[];
  lines?: Array<{
    dataKey: string;
    color: string;
    name: string;
    strokeWidth?: number;
    strokeDasharray?: string;
  }>;
  showBrush?: boolean;
  showReferenceLine?: boolean;
  referenceValue?: number;
}

const TIMEFRAMES = [
  { value: '1h', label: '1H' },
  { value: '4h', label: '4H' },
  { value: '1d', label: '1D' },
  { value: '1w', label: '1W' },
  { value: '1M', label: '1M' },
  { value: '3M', label: '3M' },
  { value: '6M', label: '6M' },
  { value: '1Y', label: '1Y' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg">
      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
        {new Date(label).toLocaleString()}
      </p>
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-gray-600 dark:text-gray-400">{entry.name}:</span>
          </div>
          <span className="font-mono font-medium">
            ${entry.value.toFixed(2)}
          </span>
        </div>
      ))}
    </div>
  );
};

const CustomDot = ({ cx, cy, stroke, payload, dataKey }: any) => {
  if (!payload || payload.value === undefined) return null;
  
  return (
    <circle
      cx={cx}
      cy={cy}
      r={3}
      fill={stroke}
      stroke="white"
      strokeWidth={2}
      className="opacity-0 hover:opacity-100 transition-opacity duration-200"
    />
  );
};

export default function LineChart({ 
  data, 
  config = {},
  lines = [{ dataKey: 'value', color: '#3b82f6', name: 'Price' }],
  showBrush = false,
  showReferenceLine = false,
  referenceValue,
  loading = false, 
  error,
  onTimeframeChange 
}: LineChartProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState(config.timeframe || '1d');
  const [zoomDomain, setZoomDomain] = useState<[number, number] | null>(null);
  const [showDataPoints, setShowDataPoints] = useState(false);

  const processedData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    return data.map(item => ({
      ...item,
      timestamp: item.timestamp * 1000, // Convert to milliseconds for display
    }));
  }, [data]);

  const stats = useMemo(() => {
    if (!processedData.length) return null;
    
    const values = processedData.map(d => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const first = values[0];
    const last = values[values.length - 1];
    const change = last - first;
    const changePercent = (change / first) * 100;
    
    return { min, max, first, last, change, changePercent };
  }, [processedData]);

  const handleTimeframeChange = (timeframe: string) => {
    setSelectedTimeframe(timeframe as any);
    onTimeframeChange?.(timeframe);
  };

  const handleBrushChange = (domain: any) => {
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
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Price Chart
          </h3>
          {stats && (
            <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
              <span>Current: ${stats.last.toFixed(2)}</span>
              <span className={stats.change >= 0 ? 'text-green-600' : 'text-red-600'}>
                {stats.change >= 0 ? '+' : ''}${stats.change.toFixed(2)} ({stats.changePercent.toFixed(2)}%)
              </span>
            </div>
          )}
        </div>
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
              variant={showDataPoints ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setShowDataPoints(!showDataPoints)}
            >
              Points
            </Button>
            <Button
              variant={showBrush ? 'primary' : 'outline'}
              size="sm"
              onClick={() => showBrush = !showBrush}
            >
              Brush
            </Button>
            {zoomDomain && (
              <Button
                variant="outline"
                size="sm"
                onClick={resetZoom}
              >
                Reset
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className={showBrush ? "h-80" : "h-96"}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart
            data={processedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
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
              domain={['dataMin - 5%', 'dataMax + 5%']}
              tickFormatter={(value) => `$${value.toFixed(2)}`}
              stroke="#6b7280"
              className="dark:stroke-gray-400"
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Reference Line */}
            {showReferenceLine && referenceValue && (
              <ReferenceLine 
                y={referenceValue} 
                stroke="#ef4444" 
                strokeDasharray="5 5"
                label="Reference"
              />
            )}
            
            {/* Lines */}
            {lines.map((line, index) => (
              <Line
                key={index}
                type="monotone"
                dataKey={line.dataKey}
                stroke={line.color}
                strokeWidth={line.strokeWidth || 2}
                strokeDasharray={line.strokeDasharray}
                dot={showDataPoints ? <CustomDot stroke={line.color} /> : false}
                activeDot={{ 
                  r: 4, 
                  fill: line.color,
                  stroke: 'white',
                  strokeWidth: 2 
                }}
                name={line.name}
                connectNulls={false}
              />
            ))}
            
            {/* Brush for zooming */}
            {showBrush && (
              <Brush
                dataKey="timestamp"
                height={30}
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.1}
                onChange={handleBrushChange}
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
            )}
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>

      {/* Stats */}
      {stats && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="text-gray-600 dark:text-gray-400">High</div>
            <div className="font-mono font-medium text-green-600">
              ${stats.max.toFixed(2)}
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-600 dark:text-gray-400">Low</div>
            <div className="font-mono font-medium text-red-600">
              ${stats.min.toFixed(2)}
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-600 dark:text-gray-400">Range</div>
            <div className="font-mono font-medium">
              ${(stats.max - stats.min).toFixed(2)}
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-600 dark:text-gray-400">Points</div>
            <div className="font-mono font-medium">
              {processedData.length}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}