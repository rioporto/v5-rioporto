'use client';

import { useMemo, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Skeleton } from '@/components/ui/Skeleton';
import { Badge } from '@/components/ui/Badge';
import { WidgetProps, CorrelationData } from '@/types/financial';

interface CorrelationMatrixProps extends WidgetProps {
  data: CorrelationData[];
  period?: '1d' | '7d' | '30d' | '90d';
}

const CORRELATION_PERIODS = [
  { value: '1d', label: '1 Day' },
  { value: '7d', label: '7 Days' },
  { value: '30d', label: '30 Days' },
  { value: '90d', label: '90 Days' },
];

const getCorrelationColor = (correlation: number) => {
  const abs = Math.abs(correlation);
  if (abs >= 0.8) return correlation > 0 ? '#10b981' : '#ef4444'; // Strong
  if (abs >= 0.5) return correlation > 0 ? '#34d399' : '#f87171'; // Moderate
  if (abs >= 0.3) return correlation > 0 ? '#6ee7b7' : '#fca5a5'; // Weak
  return '#e5e7eb'; // Negligible
};

const getCorrelationIntensity = (correlation: number) => {
  return Math.abs(correlation);
};

const getCorrelationLabel = (correlation: number) => {
  const abs = Math.abs(correlation);
  if (abs >= 0.8) return 'Strong';
  if (abs >= 0.5) return 'Moderate';
  if (abs >= 0.3) return 'Weak';
  return 'Negligible';
};

const CorrelationCell = ({ 
  asset1, 
  asset2, 
  correlation, 
  significance,
  onHover, 
  onLeave,
  showValues
}: {
  asset1: string;
  asset2: string;
  correlation: number;
  significance: 'HIGH' | 'MEDIUM' | 'LOW';
  onHover: (data: { asset1: string; asset2: string; correlation: number; significance: string }) => void;
  onLeave: () => void;
  showValues: boolean;
}) => {
  const isDiagonal = asset1 === asset2;
  const color = isDiagonal ? '#f3f4f6' : getCorrelationColor(correlation);
  const intensity = isDiagonal ? 0 : getCorrelationIntensity(correlation);

  return (
    <div
      className="relative flex items-center justify-center border border-gray-200 dark:border-gray-700 cursor-pointer hover:border-gray-400 transition-all duration-200 h-12 w-12"
      style={{
        backgroundColor: color,
        opacity: isDiagonal ? 0.5 : 0.3 + (intensity * 0.7),
      }}
      onMouseEnter={() => !isDiagonal && onHover({ asset1, asset2, correlation, significance })}
      onMouseLeave={onLeave}
    >
      {showValues && !isDiagonal && (
        <span className="text-xs font-mono font-bold text-white drop-shadow-sm">
          {correlation.toFixed(2)}
        </span>
      )}
      {isDiagonal && (
        <span className="text-xs font-medium text-gray-500">1.00</span>
      )}
    </div>
  );
};

const CorrelationTooltip = ({ 
  data 
}: { 
  data: { asset1: string; asset2: string; correlation: number; significance: string } | null 
}) => {
  if (!data) return null;

  return (
    <div className="absolute top-2 left-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg z-10">
      <div className="space-y-2 text-sm">
        <div className="font-medium text-gray-900 dark:text-gray-100">
          {data.asset1} ↔ {data.asset2}
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-gray-600 dark:text-gray-400">Correlation:</span>
          <span className="font-mono font-medium">{data.correlation.toFixed(3)}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-gray-600 dark:text-gray-400">Strength:</span>
          <Badge variant="default" size="sm">
            {getCorrelationLabel(data.correlation)}
          </Badge>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-gray-600 dark:text-gray-400">Significance:</span>
          <Badge 
            variant={data.significance === 'HIGH' ? 'success' : 
                    data.significance === 'MEDIUM' ? 'warning' : 'primary'} 
            size="sm"
          >
            {data.significance}
          </Badge>
        </div>
      </div>
    </div>
  );
};

const CorrelationLegend = () => {
  const legendItems = [
    { range: '0.8 to 1.0', color: '#10b981', label: 'Strong Positive' },
    { range: '0.5 to 0.8', color: '#34d399', label: 'Moderate Positive' },
    { range: '0.3 to 0.5', color: '#6ee7b7', label: 'Weak Positive' },
    { range: '-0.3 to 0.3', color: '#e5e7eb', label: 'Negligible' },
    { range: '-0.5 to -0.3', color: '#fca5a5', label: 'Weak Negative' },
    { range: '-0.8 to -0.5', color: '#f87171', label: 'Moderate Negative' },
    { range: '-1.0 to -0.8', color: '#ef4444', label: 'Strong Negative' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 text-xs">
      {legendItems.map((item, index) => (
        <div key={index} className="flex items-center gap-1">
          <div 
            className="w-3 h-3 rounded" 
            style={{ backgroundColor: item.color }}
          />
          <span className="text-gray-600 dark:text-gray-400">
            {item.range}: {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function CorrelationMatrix({ 
  data,
  period = '30d',
  loading = false, 
  error,
  className = ""
}: CorrelationMatrixProps) {
  const [selectedPeriod, setSelectedPeriod] = useState(period);
  const [hoveredCell, setHoveredCell] = useState<{ 
    asset1: string; 
    asset2: string; 
    correlation: number; 
    significance: string 
  } | null>(null);
  const [showValues, setShowValues] = useState(false);
  const [sortBy, setSortBy] = useState<'alphabetical' | 'correlation'>('alphabetical');

  const { matrix, assets, stats } = useMemo(() => {
    if (!data.length) return { matrix: [], assets: [], stats: null };

    // Extract unique assets
    const assetSet = new Set<string>();
    data.forEach(item => {
      assetSet.add(item.asset1);
      assetSet.add(item.asset2);
    });
    
    let assets = Array.from(assetSet);
    
    // Sort assets
    if (sortBy === 'alphabetical') {
      assets.sort();
    } else {
      // Sort by average correlation (strongest correlations first)
      const avgCorrelations = assets.map(asset => {
        const correlations = data.filter(d => d.asset1 === asset || d.asset2 === asset)
          .map(d => Math.abs(d.correlation));
        const avg = correlations.reduce((sum, c) => sum + c, 0) / correlations.length;
        return { asset, avg };
      });
      avgCorrelations.sort((a, b) => b.avg - a.avg);
      assets = avgCorrelations.map(item => item.asset);
    }

    // Create matrix
    const matrix: Array<Array<CorrelationData | null>> = assets.map(() => 
      new Array(assets.length).fill(null)
    );

    // Fill matrix with data
    data.forEach(item => {
      const asset1Index = assets.indexOf(item.asset1);
      const asset2Index = assets.indexOf(item.asset2);
      
      if (asset1Index >= 0 && asset2Index >= 0) {
        matrix[asset1Index][asset2Index] = item;
        matrix[asset2Index][asset1Index] = item; // Mirror for symmetry
      }
    });

    // Calculate statistics
    const correlations = data.map(d => d.correlation);
    const absCorrelations = correlations.map(Math.abs);
    const strongPositive = correlations.filter(c => c >= 0.8).length;
    const strongNegative = correlations.filter(c => c <= -0.8).length;
    const moderate = correlations.filter(c => Math.abs(c) >= 0.5 && Math.abs(c) < 0.8).length;
    const weak = correlations.filter(c => Math.abs(c) >= 0.3 && Math.abs(c) < 0.5).length;
    
    const stats = {
      totalPairs: correlations.length,
      avgCorrelation: correlations.reduce((sum, c) => sum + c, 0) / correlations.length,
      avgAbsCorrelation: absCorrelations.reduce((sum, c) => sum + c, 0) / absCorrelations.length,
      maxCorrelation: Math.max(...correlations),
      minCorrelation: Math.min(...correlations),
      strongPositive,
      strongNegative,
      moderate,
      weak,
      negligible: correlations.length - strongPositive - strongNegative - moderate - weak
    };

    return { matrix, assets, stats };
  }, [data, sortBy]);

  const handleCellHover = (cellData: { 
    asset1: string; 
    asset2: string; 
    correlation: number; 
    significance: string 
  }) => {
    setHoveredCell(cellData);
  };

  const handleCellLeave = () => {
    setHoveredCell(null);
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
          Error loading correlation matrix: {error}
        </div>
      </Card>
    );
  }

  if (!data.length) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="flex items-center justify-center h-64 text-gray-500">
          No correlation data available
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
            Correlation Matrix
          </h3>
          {stats && (
            <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
              <span>Assets: {assets.length}</span>
              <span>Avg: {stats.avgCorrelation.toFixed(3)}</span>
              <span>Range: {stats.minCorrelation.toFixed(2)} to {stats.maxCorrelation.toFixed(2)}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          {/* Period Selector */}
          <Select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as "7d" | "30d" | "1d" | "90d")}
            options={CORRELATION_PERIODS}
          />
          
          {/* Sort By */}
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'alphabetical' | 'correlation')}
            options={[
              { value: 'alphabetical', label: 'A-Z' },
              { value: 'correlation', label: 'Correlation' }
            ]}
          />
          
          {/* Controls */}
          <div className="flex gap-2">
            <Button
              variant={showValues ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setShowValues(!showValues)}
            >
              Values
            </Button>
          </div>
        </div>
      </div>

      {/* Matrix */}
      <div className="relative overflow-auto">
        <div className="inline-block min-w-full">
          {/* Column headers */}
          <div className="flex ml-16">
            {assets.map((asset, index) => (
              <div
                key={index}
                className="w-12 h-12 flex items-end justify-center text-xs text-gray-600 dark:text-gray-400 font-medium transform -rotate-45 origin-bottom-left"
              >
                <span className="whitespace-nowrap">{asset}</span>
              </div>
            ))}
          </div>

          {/* Matrix rows */}
          {matrix.map((row, yIndex) => (
            <div key={yIndex} className="flex items-center">
              {/* Row header */}
              <div className="w-16 h-12 flex items-center justify-end pr-2 text-xs text-gray-600 dark:text-gray-400 font-medium">
                {assets[yIndex]}
              </div>
              
              {/* Row cells */}
              {row.map((cell, xIndex) => {
                const asset1 = assets[yIndex];
                const asset2 = assets[xIndex];
                const correlation = cell?.correlation || (asset1 === asset2 ? 1 : 0);
                const significance = cell?.significance || 'LOW';
                
                return (
                  <CorrelationCell
                    key={xIndex}
                    asset1={asset1}
                    asset2={asset2}
                    correlation={correlation}
                    significance={significance}
                    onHover={handleCellHover}
                    onLeave={handleCellLeave}
                    showValues={showValues}
                  />
                );
              })}
            </div>
          ))}
        </div>

        {/* Tooltip */}
        <CorrelationTooltip data={hoveredCell} />
      </div>

      {/* Legend */}
      <div className="mt-6">
        <CorrelationLegend />
      </div>

      {/* Stats */}
      {stats && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-gray-600 dark:text-gray-400">Strong Positive</div>
            <div className="font-medium text-green-600">{stats.strongPositive}</div>
            <div className="text-xs text-gray-500">≥ 0.8</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <div className="text-gray-600 dark:text-gray-400">Moderate</div>
            <div className="font-medium text-yellow-600">{stats.moderate}</div>
            <div className="text-xs text-gray-500">0.5-0.8</div>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-gray-600 dark:text-gray-400">Negligible</div>
            <div className="font-medium">{stats.negligible}</div>
            <div className="text-xs text-gray-500">{'< 0.3'}</div>
          </div>
          <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <div className="text-gray-600 dark:text-gray-400">Weak</div>
            <div className="font-medium text-orange-600">{stats.weak}</div>
            <div className="text-xs text-gray-500">0.3-0.5</div>
          </div>
          <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="text-gray-600 dark:text-gray-400">Strong Negative</div>
            <div className="font-medium text-red-600">{stats.strongNegative}</div>
            <div className="text-xs text-gray-500">≤ -0.8</div>
          </div>
        </div>
      )}
    </Card>
  );
}