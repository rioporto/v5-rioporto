'use client';

import { useMemo, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Treemap, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { Progress } from '@/components/ui/Progress';
import { WidgetProps, PortfolioAsset } from '@/types/rioporto';

interface AssetAllocationProps extends WidgetProps {
  data: {
    assets: PortfolioAsset[];
    totalValue: number;
    allocation: {
      byAsset: Array<{ symbol: string; value: number; percentage: number; color: string }>;
      byNetwork: Array<{ network: string; value: number; percentage: number; color: string }>;
      byCategory: Array<{ category: string; value: number; percentage: number; color: string }>;
    };
  };
}

const COLORS = [
  '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6',
  '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#84cc16',
  '#06b6d4', '#d946ef', '#eab308', '#22c55e', '#f43f5e'
];

const NETWORK_COLORS: Record<string, string> = {
  'Bitcoin': '#f7931a',
  'Ethereum': '#627eea',
  'Binance Smart Chain': '#f3ba2f',
  'Polygon': '#8247e5',
  'Solana': '#00d4aa',
  'Cardano': '#0033ad',
  'Avalanche': '#e84142',
  'Fantom': '#1969ff',
  'Other': '#6b7280'
};

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg">
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <div 
            className="w-4 h-4 rounded-full" 
            style={{ backgroundColor: data.color || data.fill }}
          />
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {data.name || data.symbol || data.category || data.network}
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-gray-600 dark:text-gray-400">Value:</span>
          <span className="font-mono font-medium">${data.value.toLocaleString()}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-gray-600 dark:text-gray-400">Allocation:</span>
          <span className="font-mono font-medium">{data.percentage.toFixed(2)}%</span>
        </div>
      </div>
    </div>
  );
};

const TreemapCell = ({ payload, x, y, width, height }: any) => {
  if (!payload) return null;

  const fontSize = Math.min(width / 8, height / 4, 14);
  const showLabel = width > 60 && height > 30;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={payload.color}
        stroke="#ffffff"
        strokeWidth={2}
        rx={4}
      />
      {showLabel && (
        <>
          <text
            x={x + width / 2}
            y={y + height / 2 - 5}
            textAnchor="middle"
            fill="white"
            fontSize={fontSize}
            fontWeight="bold"
          >
            {payload.symbol || payload.name}
          </text>
          <text
            x={x + width / 2}
            y={y + height / 2 + 10}
            textAnchor="middle"
            fill="white"
            fontSize={fontSize - 2}
          >
            {payload.percentage.toFixed(1)}%
          </text>
        </>
      )}
    </g>
  );
};

const AllocationList = ({ 
  data, 
  title, 
  showRebalance = false 
}: { 
  data: Array<{ symbol?: string; name?: string; value: number; percentage: number; color: string }>;
  title: string;
  showRebalance?: boolean;
}) => {
  const targetAllocation = showRebalance ? 100 / data.length : null;

  return (
    <div className="space-y-3">
      <h4 className="font-medium text-gray-900 dark:text-gray-100">{title}</h4>
      <div className="space-y-2">
        {data.map((item, index) => {
          const name = item.symbol || item.name || `Item ${index + 1}`;
          const isOverallocated = targetAllocation && item.percentage > targetAllocation * 1.2;
          const isUnderallocated = targetAllocation && item.percentage < targetAllocation * 0.8;
          
          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm font-medium">{name}</span>
                  {showRebalance && isOverallocated && (
                    <Badge variant="warning" size="xs">Over</Badge>
                  )}
                  {showRebalance && isUnderallocated && (
                    <Badge variant="error" size="xs">Under</Badge>
                  )}
                </div>
                <div className="text-right text-sm">
                  <div className="font-mono">${item.value.toLocaleString()}</div>
                  <div className="text-gray-500">{item.percentage.toFixed(2)}%</div>
                </div>
              </div>
              <Progress 
                value={item.percentage} 
                max={Math.max(...data.map(d => d.percentage))} 
                className="h-2"
                color={item.color}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const RebalanceRecommendations = ({ assets }: { assets: PortfolioAsset[] }) => {
  const recommendations = useMemo(() => {
    const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);
    const targetAllocation = 100 / assets.length;
    
    return assets
      .map(asset => ({
        symbol: asset.symbol,
        currentAllocation: asset.allocation,
        targetAllocation,
        difference: asset.allocation - targetAllocation,
        value: asset.value,
        targetValue: (totalValue * targetAllocation) / 100,
        actionValue: asset.value - ((totalValue * targetAllocation) / 100)
      }))
      .filter(item => Math.abs(item.difference) > 5) // Only show significant differences
      .sort((a, b) => Math.abs(b.difference) - Math.abs(a.difference));
  }, [assets]);

  if (recommendations.length === 0) {
    return (
      <div className="text-center p-4 text-gray-500">
        Portfolio is well balanced
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h4 className="font-medium text-gray-900 dark:text-gray-100">Rebalance Suggestions</h4>
      <div className="space-y-2">
        {recommendations.slice(0, 5).map((rec, index) => (
          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
            <div>
              <div className="font-medium text-sm">{rec.symbol}</div>
              <div className="text-xs text-gray-500">
                {rec.currentAllocation.toFixed(1)}% → {rec.targetAllocation.toFixed(1)}%
              </div>
            </div>
            <div className="text-right">
              <Badge 
                variant={rec.difference > 0 ? 'error' : 'success'} 
                size="sm"
              >
                {rec.difference > 0 ? 'Sell' : 'Buy'} ${Math.abs(rec.actionValue).toLocaleString()}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function AssetAllocation({ 
  data,
  loading = false, 
  error,
  className = ""
}: AssetAllocationProps) {
  const [view, setView] = useState<'pie' | 'treemap' | 'list'>('pie');
  const [groupBy, setGroupBy] = useState<'asset' | 'network' | 'category'>('asset');
  const [showRebalance, setShowRebalance] = useState(false);

  const currentData = useMemo(() => {
    switch (groupBy) {
      case 'network':
        return data.allocation.byNetwork.map((item, index) => ({
          ...item,
          color: NETWORK_COLORS[item.network] || COLORS[index % COLORS.length]
        }));
      case 'category':
        return data.allocation.byCategory.map((item, index) => ({
          ...item,
          color: COLORS[index % COLORS.length]
        }));
      default:
        return data.allocation.byAsset.map((item, index) => ({
          ...item,
          color: COLORS[index % COLORS.length]
        }));
    }
  }, [data, groupBy]);

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
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="flex items-center justify-center h-64 text-red-500">
          Error loading asset allocation: {error}
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
            Asset Allocation
          </h3>
          <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
            <span>Total: ${data.totalValue.toLocaleString()}</span>
            <span>{data.assets.length} Assets</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* Group By */}
          <div className="flex gap-1">
            {(['asset', 'network', 'category'] as const).map(group => (
              <Button
                key={group}
                variant={groupBy === group ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setGroupBy(group)}
              >
                {group.charAt(0).toUpperCase() + group.slice(1)}
              </Button>
            ))}
          </div>
          
          {/* View Toggle */}
          <div className="flex gap-1">
            {(['pie', 'treemap', 'list'] as const).map(viewType => (
              <Button
                key={viewType}
                variant={view === viewType ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setView(viewType)}
              >
                {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
              </Button>
            ))}
          </div>
          
          {/* Rebalance Toggle */}
          <Button
            variant={showRebalance ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setShowRebalance(!showRebalance)}
          >
            Rebalance
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2">
          {view === 'pie' && (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={currentData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={40}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ percentage }) => `${percentage.toFixed(1)}%`}
                    labelLine={false}
                  >
                    {currentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
          
          {view === 'treemap' && (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <Treemap
                  data={currentData}
                  dataKey="value"
                  aspectRatio={4/3}
                  stroke="#fff"
                  content={<TreemapCell />}
                />
              </ResponsiveContainer>
            </div>
          )}
          
          {view === 'list' && (
            <div className="h-64 overflow-y-auto">
              <AllocationList 
                data={currentData} 
                title={`Allocation by ${groupBy.charAt(0).toUpperCase() + groupBy.slice(1)}`}
                showRebalance={showRebalance}
              />
            </div>
          )}
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {showRebalance ? (
            <RebalanceRecommendations assets={data.assets} />
          ) : (
            <>
              {/* Top Holdings */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900 dark:text-gray-100">Top Holdings</h4>
                <div className="space-y-2">
                  {currentData.slice(0, 5).map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm font-medium">
                          {item.symbol || item.network || item.category}
                        </span>
                      </div>
                      <div className="text-right text-sm">
                        <div className="font-mono">{item.percentage.toFixed(1)}%</div>
                        <div className="text-gray-500">${item.value.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Diversification Score */}
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Diversification
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Score:</span>
                    <span className="font-medium">
                      {Math.min(100, (data.assets.length / 10) * 100).toFixed(0)}/100
                    </span>
                  </div>
                  <Progress 
                    value={Math.min(100, (data.assets.length / 10) * 100)} 
                    max={100} 
                    className="h-2"
                  />
                  <div className="text-xs text-gray-500">
                    {data.assets.length < 5 ? 'Consider diversifying more' :
                     data.assets.length < 10 ? 'Good diversification' :
                     'Excellent diversification'}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="text-gray-600 dark:text-gray-400">Largest Position</div>
          <div className="font-medium text-blue-600">
            {currentData[0]?.symbol || currentData[0]?.network || currentData[0]?.category || 'N/A'}
          </div>
          <div className="text-xs text-gray-500">
            {currentData[0]?.percentage.toFixed(1)}%
          </div>
        </div>
        <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="text-gray-600 dark:text-gray-400">Balance Score</div>
          <div className="font-medium text-green-600">
            {(100 - (currentData[0]?.percentage || 0)).toFixed(0)}%
          </div>
          <div className="text-xs text-gray-500">
            {currentData[0]?.percentage > 50 ? 'Concentrated' : 'Balanced'}
          </div>
        </div>
        <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <div className="text-gray-600 dark:text-gray-400">Position Count</div>
          <div className="font-medium text-yellow-600">
            {currentData.length}
          </div>
          <div className="text-xs text-gray-500">
            Active positions
          </div>
        </div>
        <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <div className="text-gray-600 dark:text-gray-400">Min Position</div>
          <div className="font-medium text-purple-600">
            {Math.min(...currentData.map(d => d.percentage)).toFixed(1)}%
          </div>
          <div className="text-xs text-gray-500">
            Smallest allocation
          </div>
        </div>
      </div>
    </Card>
  );
}