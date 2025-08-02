'use client';

import { useMemo, useState } from 'react';
import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Skeleton } from '@/components/ui/Skeleton';
import { ChartProps, AreaChartData } from '@/types/financial';

interface AreaChartProps extends ChartProps {
  data: AreaChartData[];
  areas?: Array<{
    dataKey: string;
    fill: string;
    stroke: string;
    name: string;
    fillOpacity?: number;
    stackId?: string;
  }>;
  showGradient?: boolean;
  stacked?: boolean;
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

  const total = payload.reduce((sum: number, entry: any) => sum + entry.value, 0);

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
              style={{ backgroundColor: entry.fill }}
            />
            <span className="text-gray-600 dark:text-gray-400">{entry.name}:</span>
          </div>
          <span className="font-mono font-medium">
            ${entry.value.toFixed(2)}
          </span>
        </div>
      ))}
      {payload.length > 1 && (
        <div className="border-t border-gray-200 dark:border-gray-600 mt-2 pt-2">
          <div className="flex items-center justify-between gap-4 text-sm font-medium">
            <span className="text-gray-900 dark:text-gray-100">Total:</span>
            <span className="font-mono">${total.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default function AreaChart({ 
  data, 
  config = {},
  areas = [{ dataKey: 'value', fill: '#3b82f6', stroke: '#2563eb', name: 'Value' }],
  showGradient = true,
  stacked = false,
  loading = false, 
  error,
  onTimeframeChange 
}: AreaChartProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState(config.timeframe || '1d');
  const [showGrid, setShowGrid] = useState(config.showGrid ?? true);

  const processedData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    return data.map(item => ({
      ...item,
      timestamp: item.timestamp * 1000, // Convert to milliseconds for display
    }));
  }, [data]);

  const stats = useMemo(() => {
    if (!processedData.length || !areas.length) return null;
    
    const primaryDataKey = areas[0].dataKey;
    const values = processedData.map(d => (d as any)[primaryDataKey] || 0);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const first = values[0];
    const last = values[values.length - 1];
    const change = last - first;
    const changePercent = first !== 0 ? (change / first) * 100 : 0;
    
    return { min, max, first, last, change, changePercent };
  }, [processedData, areas]);

  const handleTimeframeChange = (timeframe: string) => {
    setSelectedTimeframe(timeframe as any);
    onTimeframeChange?.(timeframe);
  };

  const createGradient = (color: string, id: string) => (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
        <stop offset="95%" stopColor={color} stopOpacity={0.1}/>
      </linearGradient>
    </defs>
  );

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
            Area Chart
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
            onChange={(e) => handleTimeframeChange(e.target.value)}
            options={TIMEFRAMES}
          />
          
          {/* Controls */}
          <div className="flex gap-2">
            <Button
              variant={showGrid ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setShowGrid(!showGrid)}
            >
              Grid
            </Button>
            <Button
              variant={showGradient ? 'primary' : 'outline'}
              size="sm"
              onClick={() => showGradient = !showGradient}
            >
              Gradient
            </Button>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsAreaChart
            data={processedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            {/* Gradients */}
            {showGradient && areas.map((area, index) => 
              createGradient(area.fill, `gradient-${index}`)
            )}
            
            {showGrid && (
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#e5e7eb" 
                className="dark:stroke-gray-600"
              />
            )}
            <XAxis
              dataKey="timestamp"
              type="number"
              scale="time"
              domain={['dataMin', 'dataMax']}
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
            
            {/* Areas */}
            {areas.map((area, index) => (
              <Area
                key={index}
                type="monotone"
                dataKey={area.dataKey}
                stackId={stacked ? area.stackId || 'default' : undefined}
                stroke={area.stroke}
                fill={showGradient ? `url(#gradient-${index})` : area.fill}
                fillOpacity={area.fillOpacity || (showGradient ? 1 : 0.6)}
                strokeWidth={2}
                name={area.name}
                connectNulls={false}
              />
            ))}
          </RechartsAreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      {areas.length > 1 && (
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          {areas.map((area, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded" 
                style={{ backgroundColor: area.fill }}
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {area.name}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      {stats && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="text-gray-600 dark:text-gray-400">Peak</div>
            <div className="font-mono font-medium text-green-600">
              ${stats.max.toFixed(2)}
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-600 dark:text-gray-400">Trough</div>
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
            <div className="text-gray-600 dark:text-gray-400">Change</div>
            <div className={`font-mono font-medium ${stats.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stats.changePercent.toFixed(2)}%
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}