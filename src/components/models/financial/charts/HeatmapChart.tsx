'use client';

import { useMemo, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { Tooltip } from '@/components/ui/Tooltip';
import { ChartProps, HeatmapData } from '@/types/financial';

interface HeatmapChartProps extends ChartProps {
  data: HeatmapData[];
  width?: number;
  height?: number;
  cellSize?: number;
  showLabels?: boolean;
  colorScheme?: 'correlation' | 'performance' | 'risk';
}

const COLOR_SCHEMES = {
  correlation: {
    name: 'Correlation',
    colors: [
      '#dc2626', // Strong negative (-1.0 to -0.7)
      '#ef4444', // Negative (-0.7 to -0.3)
      '#fbbf24', // Weak negative (-0.3 to -0.1)
      '#f3f4f6', // Neutral (-0.1 to 0.1)
      '#a7f3d0', // Weak positive (0.1 to 0.3)
      '#34d399', // Positive (0.3 to 0.7)
      '#10b981', // Strong positive (0.7 to 1.0)
    ],
    ranges: [-1, -0.7, -0.3, -0.1, 0.1, 0.3, 0.7, 1],
  },
  performance: {
    name: 'Performance',
    colors: [
      '#dc2626', // Very negative
      '#ef4444', // Negative
      '#f59e0b', // Slightly negative
      '#f3f4f6', // Neutral
      '#84cc16', // Slightly positive
      '#22c55e', // Positive
      '#16a34a', // Very positive
    ],
    ranges: [-0.5, -0.2, -0.05, 0, 0.05, 0.2, 0.5, 1],
  },
  risk: {
    name: 'Risk',
    colors: [
      '#16a34a', // Very low risk
      '#22c55e', // Low risk
      '#84cc16', // Medium-low risk
      '#f59e0b', // Medium risk
      '#f97316', // Medium-high risk
      '#ef4444', // High risk
      '#dc2626', // Very high risk
    ],
    ranges: [0, 0.1, 0.2, 0.3, 0.5, 0.7, 0.9, 1],
  },
};

const getColorForValue = (value: number, scheme: keyof typeof COLOR_SCHEMES) => {
  const colorScheme = COLOR_SCHEMES[scheme];
  const { colors, ranges } = colorScheme;
  
  for (let i = 0; i < ranges.length - 1; i++) {
    if (value >= ranges[i] && value < ranges[i + 1]) {
      return colors[i];
    }
  }
  
  return colors[colors.length - 1];
};

const HeatmapCell = ({ 
  x, 
  y, 
  value, 
  color, 
  size, 
  showLabel, 
  onHover, 
  onLeave 
}: {
  x: string;
  y: string;
  value: number;
  color: string;
  size: number;
  showLabel: boolean;
  onHover: (data: { x: string; y: string; value: number }) => void;
  onLeave: () => void;
}) => {
  return (
    <div
      className="relative flex items-center justify-center border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:scale-105 hover:border-gray-400 cursor-pointer"
      style={{
        backgroundColor: color,
        width: size,
        height: size,
      }}
      onMouseEnter={() => onHover({ x, y, value })}
      onMouseLeave={onLeave}
    >
      {showLabel && (
        <span className="text-xs font-mono text-white font-bold drop-shadow-sm">
          {value.toFixed(2)}
        </span>
      )}
    </div>
  );
};

const CustomTooltip = ({ data }: { data: { x: string; y: string; value: number } | null }) => {
  if (!data) return null;

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg">
      <div className="space-y-2 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-gray-600 dark:text-gray-400">Asset X:</span>
          <span className="font-medium text-gray-900 dark:text-gray-100">{data.x}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-gray-600 dark:text-gray-400">Asset Y:</span>
          <span className="font-medium text-gray-900 dark:text-gray-100">{data.y}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-gray-600 dark:text-gray-400">Value:</span>
          <span className="font-mono font-medium">{data.value.toFixed(3)}</span>
        </div>
      </div>
    </div>
  );
};

const ColorLegend = ({ scheme }: { scheme: keyof typeof COLOR_SCHEMES }) => {
  const colorScheme = COLOR_SCHEMES[scheme];
  
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600 dark:text-gray-400">{colorScheme.name}:</span>
      <div className="flex items-center">
        <span className="text-xs text-gray-500 mr-1">
          {colorScheme.ranges[0]}
        </span>
        {colorScheme.colors.map((color, index) => (
          <div
            key={index}
            className="w-4 h-4"
            style={{ backgroundColor: color }}
          />
        ))}
        <span className="text-xs text-gray-500 ml-1">
          {colorScheme.ranges[colorScheme.ranges.length - 1]}
        </span>
      </div>
    </div>
  );
};

export default function HeatmapChart({ 
  data, 
  config = {},
  cellSize = 40,
  showLabels = false,
  colorScheme = 'correlation',
  loading = false, 
  error 
}: HeatmapChartProps) {
  const [hoveredCell, setHoveredCell] = useState<{ x: string; y: string; value: number } | null>(null);
  const [currentColorScheme, setCurrentColorScheme] = useState<keyof typeof COLOR_SCHEMES>(colorScheme);

  const { matrix, xLabels, yLabels, stats } = useMemo(() => {
    if (!data || data.length === 0) {
      return { matrix: [], xLabels: [], yLabels: [], stats: null };
    }

    // Extract unique labels
    const xLabels = Array.from(new Set(data.map(d => d.x))).sort();
    const yLabels = Array.from(new Set(data.map(d => d.y))).sort();

    // Create matrix
    const matrix: (HeatmapData | null)[][] = yLabels.map(() => 
      new Array(xLabels.length).fill(null)
    );

    // Fill matrix with data
    data.forEach(item => {
      const xIndex = xLabels.indexOf(item.x);
      const yIndex = yLabels.indexOf(item.y);
      if (xIndex >= 0 && yIndex >= 0) {
        matrix[yIndex][xIndex] = item;
      }
    });

    // Calculate stats
    const values = data.map(d => d.value);
    const stats = {
      min: Math.min(...values),
      max: Math.max(...values),
      avg: values.reduce((sum, val) => sum + val, 0) / values.length,
      count: values.length
    };

    return { matrix, xLabels, yLabels, stats };
  }, [data]);

  const handleCellHover = (cellData: { x: string; y: string; value: number }) => {
    setHoveredCell(cellData);
  };

  const handleCellLeave = () => {
    setHoveredCell(null);
  };

  const handleColorSchemeChange = (scheme: keyof typeof COLOR_SCHEMES) => {
    setCurrentColorScheme(scheme);
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
          Error loading heatmap: {error}
        </div>
      </Card>
    );
  }

  if (!data.length) {
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
            Correlation Heatmap
          </h3>
          {stats && (
            <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
              <span>Range: {stats.min.toFixed(2)} to {stats.max.toFixed(2)}</span>
              <span>Avg: {stats.avg.toFixed(2)}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          {/* Color Scheme Selector */}
          <div className="flex gap-2">
            {Object.keys(COLOR_SCHEMES).map((scheme) => (
              <Button
                key={scheme}
                variant={currentColorScheme === scheme ? 'primary' : 'outline'}
                size="sm"
                onClick={() => handleColorSchemeChange(scheme as keyof typeof COLOR_SCHEMES)}
              >
                {COLOR_SCHEMES[scheme as keyof typeof COLOR_SCHEMES].name}
              </Button>
            ))}
          </div>
          
          {/* Controls */}
          <div className="flex gap-2">
            <Button
              variant={showLabels ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setShowLabels(!showLabels)}
            >
              Labels
            </Button>
          </div>
        </div>
      </div>

      {/* Color Legend */}
      <div className="mb-6 flex justify-center">
        <ColorLegend scheme={currentColorScheme} />
      </div>

      {/* Heatmap */}
      <div className="relative overflow-auto">
        <div className="inline-block min-w-full">
          {/* X-axis labels */}
          <div className="flex ml-16">
            {xLabels.map((label, index) => (
              <div
                key={index}
                className="text-xs text-gray-600 dark:text-gray-400 text-center transform -rotate-45 origin-bottom-left"
                style={{ 
                  width: cellSize,
                  height: cellSize,
                  lineHeight: `${cellSize}px`
                }}
              >
                {label}
              </div>
            ))}
          </div>

          {/* Heatmap grid */}
          {matrix.map((row, yIndex) => (
            <div key={yIndex} className="flex items-center">
              {/* Y-axis label */}
              <div
                className="text-xs text-gray-600 dark:text-gray-400 text-right pr-2"
                style={{ width: 60, height: cellSize, lineHeight: `${cellSize}px` }}
              >
                {yLabels[yIndex]}
              </div>
              
              {/* Row cells */}
              {row.map((cell, xIndex) => (
                <HeatmapCell
                  key={xIndex}
                  x={xLabels[xIndex]}
                  y={yLabels[yIndex]}
                  value={cell?.value || 0}
                  color={cell ? getColorForValue(cell.value, currentColorScheme) : '#f3f4f6'}
                  size={cellSize}
                  showLabel={showLabels && cell !== null}
                  onHover={handleCellHover}
                  onLeave={handleCellLeave}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Tooltip */}
        {hoveredCell && (
          <div className="absolute top-0 left-0 pointer-events-none z-10">
            <CustomTooltip data={hoveredCell} />
          </div>
        )}
      </div>

      {/* Stats */}
      {stats && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-gray-600 dark:text-gray-400">Minimum</div>
            <div className="font-mono font-medium text-red-600">
              {stats.min.toFixed(3)}
            </div>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-gray-600 dark:text-gray-400">Maximum</div>
            <div className="font-mono font-medium text-green-600">
              {stats.max.toFixed(3)}
            </div>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-gray-600 dark:text-gray-400">Average</div>
            <div className="font-mono font-medium">
              {stats.avg.toFixed(3)}
            </div>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-gray-600 dark:text-gray-400">Data Points</div>
            <div className="font-mono font-medium">
              {stats.count}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}