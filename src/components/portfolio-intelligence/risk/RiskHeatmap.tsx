import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Tooltip } from '@/components/ui/Tooltip';
import { Info, AlertTriangle } from 'lucide-react';

interface RiskFactor {
  name: string;
  categories: string[];
  values: number[][];
}

interface RiskHeatmapProps {
  className?: string;
  data?: RiskFactor;
}

const defaultData: RiskFactor = {
  name: 'Portfolio Risk Matrix',
  categories: ['Market Risk', 'Liquidity Risk', 'Volatility Risk', 'Correlation Risk', 'Regulatory Risk'],
  values: [
    [85, 72, 68, 45, 55], // BTC
    [78, 85, 72, 65, 48], // ETH
    [65, 58, 82, 72, 62], // BNB
    [72, 45, 88, 78, 68], // SOL
    [68, 52, 75, 82, 72]  // ADA
  ]
};

const assets = ['BTC', 'ETH', 'BNB', 'SOL', 'ADA'];

export function RiskHeatmap({ 
  className,
  data = defaultData
}: RiskHeatmapProps) {
  const getRiskColor = (value: number) => {
    if (value >= 80) return 'bg-red-600';
    if (value >= 70) return 'bg-red-500';
    if (value >= 60) return 'bg-orange-500';
    if (value >= 50) return 'bg-yellow-500';
    if (value >= 40) return 'bg-yellow-400';
    if (value >= 30) return 'bg-green-400';
    if (value >= 20) return 'bg-green-500';
    return 'bg-green-600';
  };

  const getRiskLevel = (value: number) => {
    if (value >= 80) return 'Critical';
    if (value >= 60) return 'High';
    if (value >= 40) return 'Medium';
    if (value >= 20) return 'Low';
    return 'Very Low';
  };

  const getOverallRisk = () => {
    const totalRisk = data.values.flat().reduce((sum, val) => sum + val, 0);
    const avgRisk = totalRisk / (data.values.length * data.categories.length);
    return {
      value: avgRisk.toFixed(1),
      level: getRiskLevel(avgRisk)
    };
  };

  const overallRisk = getOverallRisk();

  return (
    <Card className={cn('p-6', className)}>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            Risk Assessment Heatmap
            <Tooltip content="Visual representation of risk factors across your portfolio">
              <Info className="w-4 h-4 text-muted-foreground" />
            </Tooltip>
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Multi-dimensional risk analysis by asset
          </p>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted-foreground">Overall Risk</div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">{overallRisk.value}</span>
            <span className={cn(
              'text-sm font-medium',
              overallRisk.level === 'Critical' && 'text-red-500',
              overallRisk.level === 'High' && 'text-orange-500',
              overallRisk.level === 'Medium' && 'text-yellow-500',
              overallRisk.level === 'Low' && 'text-green-500'
            )}>
              {overallRisk.level}
            </span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          <div className="grid grid-cols-[100px,repeat(5,1fr)] gap-1 mb-2">
            <div></div>
            {data.categories.map((category) => (
              <div key={category} className="text-center">
                <span className="text-xs font-medium text-muted-foreground line-clamp-2">
                  {category}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-1">
            {assets.map((asset, rowIndex) => (
              <div key={asset} className="grid grid-cols-[100px,repeat(5,1fr)] gap-1">
                <div className="flex items-center justify-end pr-2">
                  <span className="text-sm font-medium">{asset}</span>
                </div>
                {data.values[rowIndex].map((value, colIndex) => (
                  <Tooltip
                    key={`${rowIndex}-${colIndex}`}
                    content={
                      <div className="text-xs">
                        <p className="font-medium">{asset} - {data.categories[colIndex]}</p>
                        <p>Risk Score: {value}</p>
                        <p>Level: {getRiskLevel(value)}</p>
                      </div>
                    }
                  >
                    <div
                      className={cn(
                        'aspect-square rounded flex items-center justify-center text-xs font-bold text-white cursor-pointer transition-all hover:scale-105',
                        getRiskColor(value)
                      )}
                    >
                      {value}
                    </div>
                  </Tooltip>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <h4 className="text-sm font-medium">Risk Scale</h4>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-green-500 rounded" />
            <span className="text-xs text-muted-foreground">0-40 (Low)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-yellow-500 rounded" />
            <span className="text-xs text-muted-foreground">40-60 (Medium)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-orange-500 rounded" />
            <span className="text-xs text-muted-foreground">60-80 (High)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-red-500 rounded" />
            <span className="text-xs text-muted-foreground">80-100 (Critical)</span>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
        <div className="flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
          <div className="text-xs">
            <p className="font-medium text-yellow-500 mb-1">High Risk Areas Detected</p>
            <p className="text-muted-foreground">
              SOL shows high volatility risk (88). Consider adjusting position size or implementing stop-losses.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}