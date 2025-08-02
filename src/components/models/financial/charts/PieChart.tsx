'use client';

import { useMemo, useState } from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { ChartProps, PieChartData } from '@/types/financial';

interface PieChartProps extends ChartProps {
  data: PieChartData[];
  showLabels?: boolean;
  showLegend?: boolean;
  innerRadius?: number;
  outerRadius?: number;
  showPercentages?: boolean;
  animate?: boolean;
}

const COLORS = [
  '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6',
  '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#84cc16',
  '#06b6d4', '#d946ef', '#eab308', '#22c55e', '#f43f5e'
];

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg">
      <div className="flex items-center gap-2 mb-2">
        <div 
          className="w-4 h-4 rounded-full" 
          style={{ backgroundColor: data.color }}
        />
        <span className="font-medium text-gray-900 dark:text-gray-100">
          {data.name}
        </span>
      </div>
      <div className="space-y-1 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-gray-600 dark:text-gray-400">Value:</span>
          <span className="font-mono">${data.value.toLocaleString()}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-gray-600 dark:text-gray-400">Percentage:</span>
          <span className="font-mono font-medium">{data.percentage.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
};

const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percentage, name, showPercentages }: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percentage < 5) return null; // Hide labels for small slices

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      fontSize={12}
      fontWeight={600}
    >
      {showPercentages ? `${percentage.toFixed(1)}%` : name}
    </text>
  );
};

const CustomLegend = ({ payload }: any) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2">
          <div 
            className="w-4 h-4 rounded-full" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {entry.value} ({entry.payload.percentage.toFixed(1)}%)
          </span>
        </div>
      ))}
    </div>
  );
};

export default function PieChart({ 
  data, 
  config = {},
  showLabels = true,
  showLegend = true,
  innerRadius = 0,
  outerRadius = 120,
  showPercentages = true,
  animate = true,
  loading = false, 
  error 
}: PieChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [chartType, setChartType] = useState<'pie' | 'donut'>(innerRadius > 0 ? 'donut' : 'pie');

  const processedData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    // Ensure we have colors for all data points
    return data.map((item, index) => ({
      ...item,
      color: item.color || COLORS[index % COLORS.length]
    }));
  }, [data]);

  const stats = useMemo(() => {
    if (!processedData.length) return null;
    
    const total = processedData.reduce((sum, item) => sum + item.value, 0);
    const largest = processedData.reduce((max, item) => 
      item.value > max.value ? item : max
    );
    const smallest = processedData.reduce((min, item) => 
      item.value < min.value ? item : min
    );
    
    return { total, largest, smallest, count: processedData.length };
  }, [processedData]);

  const handleMouseEnter = (data: any, index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  const toggleChartType = () => {
    setChartType(current => current === 'pie' ? 'donut' : 'pie');
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

  const currentInnerRadius = chartType === 'donut' ? 60 : 0;

  return (
    <Card className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Asset Allocation
          </h3>
          {stats && (
            <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
              <span>Total: ${stats.total.toLocaleString()}</span>
              <span>Assets: {stats.count}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          {/* Controls */}
          <div className="flex gap-2">
            <Button
              variant={showLabels ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setShowLabels(!showLabels)}
            >
              Labels
            </Button>
            <Button
              variant={showLegend ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setShowLegend(!showLegend)}
            >
              Legend
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleChartType}
            >
              {chartType === 'pie' ? 'Donut' : 'Pie'}
            </Button>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className={showLegend ? "h-80" : "h-96"}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={processedData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={showLabels ? (props) => 
                <CustomLabel {...props} showPercentages={showPercentages} />
              : false}
              outerRadius={outerRadius}
              innerRadius={currentInnerRadius}
              fill="#8884d8"
              dataKey="value"
              animationBegin={0}
              animationDuration={animate ? 800 : 0}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {processedData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  stroke={activeIndex === index ? '#ffffff' : 'none'}
                  strokeWidth={activeIndex === index ? 2 : 0}
                  style={{
                    filter: activeIndex === index ? 'brightness(1.1)' : 'none',
                    transform: activeIndex === index ? 'scale(1.05)' : 'scale(1)',
                    transformOrigin: 'center',
                    transition: 'all 0.2s ease-in-out'
                  }}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            {showLegend && <Legend content={<CustomLegend />} />}
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>

      {/* Center label for donut chart */}
      {chartType === 'donut' && stats && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              ${stats.total.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total Value
            </div>
          </div>
        </div>
      )}

      {/* Detailed stats */}
      {stats && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400">Largest Position</div>
            <div className="font-medium text-gray-900 dark:text-gray-100">
              {stats.largest.name}
            </div>
            <div className="text-sm font-mono">
              ${stats.largest.value.toLocaleString()} ({stats.largest.percentage.toFixed(1)}%)
            </div>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400">Smallest Position</div>
            <div className="font-medium text-gray-900 dark:text-gray-100">
              {stats.smallest.name}
            </div>
            <div className="text-sm font-mono">
              ${stats.smallest.value.toLocaleString()} ({stats.smallest.percentage.toFixed(1)}%)
            </div>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400">Diversification</div>
            <div className="font-medium text-gray-900 dark:text-gray-100">
              {stats.count} Assets
            </div>
            <div className="text-sm font-mono">
              Avg: {(stats.total / stats.count).toLocaleString()}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}