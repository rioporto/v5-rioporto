'use client';

import { useMemo, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { Badge } from '@/components/ui/Badge';
import { WidgetProps, VolumeProfileData } from '@/types/financial';

interface VolumeProfileProps extends WidgetProps {
  data: VolumeProfileData[];
  currentPrice?: number;
  valueAreaPercent?: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg">
      <div className="space-y-2 text-sm">
        <div className="font-medium text-gray-900 dark:text-gray-100">
          Price Level: ${data.priceLevel.toFixed(2)}
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-gray-600 dark:text-gray-400">Volume:</span>
          <span className="font-mono font-medium">{data.volume.toLocaleString()}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-gray-600 dark:text-gray-400">Percentage:</span>
          <span className="font-mono">{data.percentage.toFixed(2)}%</span>
        </div>
        {data.pointOfControl && (
          <Badge variant="primary" size="sm">Point of Control</Badge>
        )}
        {data.valueAreaHigh && (
          <Badge variant="success" size="sm">Value Area High</Badge>
        )}
        {data.valueAreaLow && (
          <Badge variant="success" size="sm">Value Area Low</Badge>
        )}
      </div>
    </div>
  );
};

const VolumeProfileList = ({ data, currentPrice }: { data: VolumeProfileData[], currentPrice?: number }) => {
  return (
    <div className="space-y-1 max-h-64 overflow-y-auto">
      <div className="grid grid-cols-4 gap-2 text-xs text-gray-500 pb-2 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-900">
        <span>Price</span>
        <span className="text-right">Volume</span>
        <span className="text-right">%</span>
        <span>Type</span>
      </div>
      {data.map((item, index) => {
        const isCurrentPrice = currentPrice && Math.abs(item.priceLevel - currentPrice) < 0.01;
        
        return (
          <div
            key={index}
            className={`grid grid-cols-4 gap-2 text-sm p-2 rounded transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${
              isCurrentPrice ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700' : ''
            }`}
          >
            <span className={`font-mono ${isCurrentPrice ? 'font-bold text-blue-600' : ''}`}>
              ${item.priceLevel.toFixed(2)}
            </span>
            <span className="font-mono text-right">
              {item.volume.toLocaleString()}
            </span>
            <span className="font-mono text-right text-gray-600">
              {item.percentage.toFixed(1)}%
            </span>
            <div className="flex gap-1">
              {item.pointOfControl && <Badge variant="primary" size="xs">POC</Badge>}
              {item.valueAreaHigh && <Badge variant="success" size="xs">VAH</Badge>}
              {item.valueAreaLow && <Badge variant="success" size="xs">VAL</Badge>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default function VolumeProfile({ 
  data,
  currentPrice,
  valueAreaPercent = 70,
  loading = false, 
  error,
  className = ""
}: VolumeProfileProps) {
  const [view, setView] = useState<'horizontal' | 'vertical' | 'list'>('horizontal');
  const [showValueArea, setShowValueArea] = useState(true);

  const processedData = useMemo(() => {
    if (!data.length) return { profileData: [], stats: null };

    // Sort by price level
    const sortedData = [...data].sort((a, b) => b.priceLevel - a.priceLevel);
    
    // Calculate total volume
    const totalVolume = sortedData.reduce((sum, item) => sum + item.volume, 0);
    
    // Find Point of Control (highest volume)
    const poc = sortedData.reduce((max, item) => 
      item.volume > max.volume ? item : max
    );

    // Calculate Value Area (70% of volume by default)
    let valueAreaVolume = 0;
    const targetVolume = totalVolume * (valueAreaPercent / 100);
    let valueAreaHigh = poc.priceLevel;
    let valueAreaLow = poc.priceLevel;
    
    // Start from POC and expand up and down alternately
    const pocIndex = sortedData.findIndex(item => item.priceLevel === poc.priceLevel);
    let upIndex = pocIndex - 1;
    let downIndex = pocIndex + 1;
    
    valueAreaVolume += poc.volume;
    
    while (valueAreaVolume < targetVolume && (upIndex >= 0 || downIndex < sortedData.length)) {
      const upVolume = upIndex >= 0 ? sortedData[upIndex].volume : 0;
      const downVolume = downIndex < sortedData.length ? sortedData[downIndex].volume : 0;
      
      if (upVolume >= downVolume && upIndex >= 0) {
        valueAreaVolume += upVolume;
        valueAreaHigh = sortedData[upIndex].priceLevel;
        upIndex--;
      } else if (downIndex < sortedData.length) {
        valueAreaVolume += downVolume;
        valueAreaLow = sortedData[downIndex].priceLevel;
        downIndex++;
      } else {
        break;
      }
    }

    // Mark special levels
    const profileData = sortedData.map(item => ({
      ...item,
      pointOfControl: item.priceLevel === poc.priceLevel,
      valueAreaHigh: showValueArea && item.priceLevel === valueAreaHigh,
      valueAreaLow: showValueArea && item.priceLevel === valueAreaLow,
      isInValueArea: showValueArea && item.priceLevel <= valueAreaHigh && item.priceLevel >= valueAreaLow
    }));

    const stats = {
      totalVolume,
      poc: poc.priceLevel,
      pocVolume: poc.volume,
      valueAreaHigh,
      valueAreaLow,
      valueAreaVolume,
      valueAreaPercent: (valueAreaVolume / totalVolume) * 100,
      priceRange: sortedData[0].priceLevel - sortedData[sortedData.length - 1].priceLevel,
      levels: sortedData.length
    };

    return { profileData, stats };
  }, [data, valueAreaPercent, showValueArea]);

  const getBarColor = (item: any) => {
    if (item.pointOfControl) return '#3b82f6'; // Blue for POC
    if (item.valueAreaHigh || item.valueAreaLow) return '#10b981'; // Green for VA boundaries
    if (item.isInValueArea) return '#84cc16'; // Light green for VA
    return '#6b7280'; // Gray for outside VA
  };

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
          Error loading volume profile: {error}
        </div>
      </Card>
    );
  }

  if (!data.length) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="flex items-center justify-center h-64 text-gray-500">
          No volume profile data available
        </div>
      </Card>
    );
  }

  const { profileData, stats } = processedData;

  return (
    <Card className={`p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Volume Profile
          </h3>
          {stats && (
            <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
              <span>POC: ${stats.poc.toFixed(2)}</span>
              <span>VA: ${stats.valueAreaLow.toFixed(2)} - ${stats.valueAreaHigh.toFixed(2)}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          {/* View Toggle */}
          <div className="flex gap-2">
            <Button
              variant={view === 'horizontal' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setView('horizontal')}
            >
              Horizontal
            </Button>
            <Button
              variant={view === 'vertical' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setView('vertical')}
            >
              Vertical
            </Button>
            <Button
              variant={view === 'list' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setView('list')}
            >
              List
            </Button>
          </div>
          
          {/* Controls */}
          <div className="flex gap-2">
            <Button
              variant={showValueArea ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setShowValueArea(!showValueArea)}
            >
              Value Area
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      {view === 'list' ? (
        <VolumeProfileList data={profileData} currentPrice={currentPrice} />
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout={view === 'horizontal' ? 'horizontal' : 'vertical'}
              data={profileData}
              margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-600" />
              
              {view === 'horizontal' ? (
                <>
                  <XAxis
                    type="number"
                    tickFormatter={(value) => value.toLocaleString()}
                    stroke="#6b7280"
                    className="dark:stroke-gray-400"
                  />
                  <YAxis
                    dataKey="priceLevel"
                    type="category"
                    tickFormatter={(value) => `$${value.toFixed(2)}`}
                    stroke="#6b7280"
                    className="dark:stroke-gray-400"
                  />
                </>
              ) : (
                <>
                  <XAxis
                    dataKey="priceLevel"
                    tickFormatter={(value) => `$${value.toFixed(2)}`}
                    stroke="#6b7280"
                    className="dark:stroke-gray-400"
                  />
                  <YAxis
                    tickFormatter={(value) => value.toLocaleString()}
                    stroke="#6b7280"
                    className="dark:stroke-gray-400"
                  />
                </>
              )}
              
              <Tooltip content={<CustomTooltip />} />
              
              {/* Current price line */}
              {currentPrice && (
                <ReferenceLine 
                  {...(view === 'horizontal' ? { y: currentPrice } : { x: currentPrice })}
                  stroke="#3b82f6" 
                  strokeDasharray="5 5"
                  label="Current"
                />
              )}
              
              <Bar dataKey="volume">
                {profileData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: '#3b82f6' }} />
          <span>Point of Control</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: '#10b981' }} />
          <span>Value Area Boundaries</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: '#84cc16' }} />
          <span>Value Area</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: '#6b7280' }} />
          <span>Outside Value Area</span>
        </div>
      </div>

      {/* Stats */}
      {stats && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400">Point of Control</div>
            <div className="font-mono font-medium text-blue-600">
              ${stats.poc.toFixed(2)}
            </div>
            <div className="text-xs text-gray-500">
              {((stats.pocVolume / stats.totalVolume) * 100).toFixed(1)}%
            </div>
          </div>
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400">Value Area</div>
            <div className="font-mono font-medium text-green-600">
              ${(stats.valueAreaHigh - stats.valueAreaLow).toFixed(2)}
            </div>
            <div className="text-xs text-gray-500">
              {stats.valueAreaPercent.toFixed(1)}% volume
            </div>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Volume</div>
            <div className="font-mono font-medium">
              {stats.totalVolume.toLocaleString()}
            </div>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400">Price Range</div>
            <div className="font-mono font-medium">
              ${stats.priceRange.toFixed(2)}
            </div>
            <div className="text-xs text-gray-500">
              {stats.levels} levels
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}