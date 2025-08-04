'use client';

import { useMemo, useState } from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Skeleton } from '@/components/ui/Skeleton';
import { ChartProps, BarChartData } from '@/types/financial';

interface BarChartProps extends ChartProps {
  data: BarChartData[];
  bars?: Array<{
    dataKey: string;
    fill: string;
    name: string;
    stackId?: string;
  }>;
  orientation?: 'horizontal' | 'vertical';
  showValues?: boolean;
  colorByValue?: boolean;
}

const TIMEFRAMES = [
  { value: '1h', label: '1H' },
  { value: '4h', label: '4H' },
  { value: '1d', label: '1D' },
  { value: '1w', label: '1W' },
  { value: '1M', label: '1M' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;

  const total = payload.reduce((sum: number, entry: any) => sum + entry.value, 0);

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg">
      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
        {typeof label === 'number' ? new Date(label).toLocaleString() : label}
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
            {entry.value.toLocaleString()}
          </span>
        </div>
      ))}
      {payload.length > 1 && (
        <div className="border-t border-gray-200 dark:border-gray-600 mt-2 pt-2">
          <div className="flex items-center justify-between gap-4 text-sm font-medium">
            <span className="text-gray-900 dark:text-gray-100">Total:</span>
            <span className="font-mono">{total.toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

const CustomLabel = ({ x, y, width, height, value }: any) => {
  if (!value || value === 0) return null;
  
  return (
    <text
      x={x + width / 2}
      y={y - 5}
      fill="#6b7280"
      textAnchor="middle"
      fontSize={12}
      className="font-mono"
    >
      {value.toLocaleString()}
    </text>
  );
};

export default function BarChart({ 
  data, 
  config = {},
  bars = [{ dataKey: 'value', fill: '#3b82f6', name: 'Volume' }],
  orientation = 'vertical',
  showValues = false,
  colorByValue = false,
  loading = false, 
  error,
  onTimeframeChange 
}: BarChartProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState(config.timeframe || '1d');
  const [showGrid, setShowGrid] = useState(config.showGrid ?? true);
  const [showValuesState, setShowValuesState] = useState(showValues);

  const processedData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    return data.map(item => ({
      ...item,
      timestamp: item.timestamp * 1000, // Convert to milliseconds for display
    }));
  }, [data]);

  const stats = useMemo(() => {
    if (!processedData.length || !bars.length) return null;
    
    const primaryDataKey = bars[0].dataKey;
    const values = processedData.map(d => (d as any)[primaryDataKey] || 0);
    const total = values.reduce((sum, val) => sum + val, 0);
    const avg = total / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);
    
    return { total, avg, min, max, count: values.length };
  }, [processedData, bars]);

  const getBarColor = (value: number, index: number) => {
    if (!colorByValue || !stats) return bars[0]?.fill || '#3b82f6';
    
    const ratio = value / stats.max;
    if (ratio > 0.8) return '#10b981'; // Green for high values
    if (ratio > 0.5) return '#f59e0b'; // Yellow for medium values
    if (ratio > 0.2) return '#ef4444'; // Red for low values
    return '#6b7280'; // Gray for very low values
  };

  const handleTimeframeChange = (timeframe: string) => {
    setSelectedTimeframe(timeframe as any);
    onTimeframeChange?.(timeframe);
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
            Volume Chart
          </h3>
          {stats && (
            <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
              <span>Total: {stats.total.toLocaleString()}</span>
              <span>Avg: {stats.avg.toLocaleString()}</span>
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
              variant={showGrid ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setShowGrid(!showGrid)}
            >
              Grid
            </Button>
            <Button
              variant={showValuesState ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setShowValuesState(!showValuesState)}
            >
              Values
            </Button>
            <Button
              variant={colorByValue ? 'primary' : 'outline'}
              size="sm"
              onClick={() => colorByValue = !colorByValue}
            >
              Color
            </Button>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            layout={orientation === 'horizontal' ? 'horizontal' : 'vertical'}
            data={processedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            {showGrid && (
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#e5e7eb" 
                className="dark:stroke-gray-600"
              />
            )}
            
            {orientation === 'vertical' ? (
              <>
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
                  tickFormatter={(value) => value.toLocaleString()}
                  stroke="#6b7280"
                  className="dark:stroke-gray-400"
                />
              </>
            ) : (
              <>
                <XAxis
                  type="number"
                  tickFormatter={(value) => value.toLocaleString()}
                  stroke="#6b7280"
                  className="dark:stroke-gray-400"
                />
                <YAxis
                  dataKey="timestamp"
                  type="category"
                  tickFormatter={(value) => new Date(value).toLocaleDateString()}
                  stroke="#6b7280"
                  className="dark:stroke-gray-400"
                />
              </>
            )}
            
            <Tooltip content={<CustomTooltip />} />
            
            {/* Bars */}
            {bars.map((bar, barIndex) => (
              <Bar
                key={barIndex}
                dataKey={bar.dataKey}
                stackId={bar.stackId}
                name={bar.name}
                label={showValuesState ? <CustomLabel /> : undefined}
              >
                {colorByValue ? 
                  processedData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={getBarColor((entry as any)[bar.dataKey] || 0, index)}
                    />
                  )) :
                  <Cell fill={bar.fill} />
                }
              </Bar>
            ))}
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      {bars.length > 1 && (
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          {bars.map((bar, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded" 
                style={{ backgroundColor: bar.fill }}
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {bar.name}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      {stats && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="text-gray-600 dark:text-gray-400">Max</div>
            <div className="font-mono font-medium text-green-600">
              {stats.max.toLocaleString()}
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-600 dark:text-gray-400">Min</div>
            <div className="font-mono font-medium text-red-600">
              {stats.min.toLocaleString()}
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-600 dark:text-gray-400">Average</div>
            <div className="font-mono font-medium">
              {Math.round(stats.avg).toLocaleString()}
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-600 dark:text-gray-400">Count</div>
            <div className="font-mono font-medium">
              {stats.count}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}