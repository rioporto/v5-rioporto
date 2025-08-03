import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Tooltip } from '@/components/ui/Tooltip';
import { Info } from 'lucide-react';

interface CorrelationData {
  assets: string[];
  matrix: number[][];
}

interface AssetCorrelationProps {
  className?: string;
  data?: CorrelationData;
}

export function AssetCorrelation({ 
  className,
  data = {
    assets: ['BTC', 'ETH', 'BNB', 'SOL', 'ADA'],
    matrix: [
      [1.00, 0.85, 0.72, 0.68, 0.65],
      [0.85, 1.00, 0.78, 0.74, 0.71],
      [0.72, 0.78, 1.00, 0.65, 0.62],
      [0.68, 0.74, 0.65, 1.00, 0.69],
      [0.65, 0.71, 0.62, 0.69, 1.00]
    ]
  }
}: AssetCorrelationProps) {
  const getCorrelationColor = (value: number) => {
    if (value === 1) return 'bg-purple-600';
    if (value >= 0.8) return 'bg-red-500';
    if (value >= 0.6) return 'bg-orange-500';
    if (value >= 0.4) return 'bg-yellow-500';
    if (value >= 0.2) return 'bg-green-500';
    if (value >= 0) return 'bg-blue-500';
    return 'bg-gray-500';
  };

  const getCorrelationOpacity = (value: number) => {
    return Math.abs(value);
  };

  return (
    <Card className={cn('p-6', className)}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          Asset Correlation Matrix
          <Tooltip content="Shows how your assets move together (1 = perfect correlation, 0 = no correlation)">
            <Info className="w-4 h-4 text-muted-foreground" />
          </Tooltip>
        </h3>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[400px]">
          <div className="grid grid-cols-[auto,repeat(5,1fr)] gap-1">
            <div className=""></div>
            {data.assets.map((asset) => (
              <div key={`header-${asset}`} className="text-center">
                <span className="text-xs font-medium text-muted-foreground">
                  {asset}
                </span>
              </div>
            ))}

            {data.assets.map((asset, rowIndex) => (
              <React.Fragment key={`row-${asset}`}>
                <div className="flex items-center justify-end pr-2">
                  <span className="text-xs font-medium text-muted-foreground">
                    {asset}
                  </span>
                </div>
                {data.matrix[rowIndex].map((value, colIndex) => (
                  <Tooltip
                    key={`cell-${rowIndex}-${colIndex}`}
                    content={`${data.assets[rowIndex]} - ${data.assets[colIndex]}: ${value.toFixed(2)}`}
                  >
                    <div
                      className={cn(
                        'aspect-square rounded flex items-center justify-center text-xs font-medium cursor-pointer transition-all hover:scale-110',
                        getCorrelationColor(value),
                        rowIndex === colIndex ? 'text-white' : 'text-white/90'
                      )}
                      style={{ opacity: getCorrelationOpacity(value) }}
                    >
                      {value.toFixed(2)}
                    </div>
                  </Tooltip>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <h4 className="text-sm font-medium">Correlation Scale</h4>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-blue-500 rounded" />
            <span className="text-xs text-muted-foreground">0.0-0.2 (Low)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-green-500 rounded" />
            <span className="text-xs text-muted-foreground">0.2-0.4</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-yellow-500 rounded" />
            <span className="text-xs text-muted-foreground">0.4-0.6</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-orange-500 rounded" />
            <span className="text-xs text-muted-foreground">0.6-0.8</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-red-500 rounded" />
            <span className="text-xs text-muted-foreground">0.8-1.0 (High)</span>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
        <p className="text-xs text-muted-foreground">
          Based on 90-day rolling correlation • Updated daily at 00:00 UTC
        </p>
      </div>
    </Card>
  );
}