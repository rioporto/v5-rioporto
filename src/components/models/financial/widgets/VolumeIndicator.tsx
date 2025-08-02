'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';

export interface VolumeData {
  current: number;
  previous?: number;
  avg24h?: number;
  high24h?: number;
  low24h?: number;
}

export interface VolumeIndicatorProps {
  className?: string;
  data: VolumeData;
  symbol?: string;
  size?: 'sm' | 'md' | 'lg';
  showChart?: boolean;
  showComparison?: boolean;
  animated?: boolean;
}

export function VolumeIndicator({
  className,
  data,
  symbol = '',
  size = 'md',
  showChart = true,
  showComparison = true,
  animated = true,
}: VolumeIndicatorProps) {
  const metrics = useMemo(() => {
    const changePercent = data.previous 
      ? ((data.current - data.previous) / data.previous) * 100 
      : 0;
    
    const isIncreasing = changePercent > 0;
    
    // Calculate volume relative to 24h high (for chart visualization)
    const maxVolume = Math.max(
      data.current,
      data.previous || 0,
      data.high24h || 0,
      data.avg24h || 0
    );
    
    const volumePercentage = maxVolume > 0 ? (data.current / maxVolume) * 100 : 0;
    
    return {
      changePercent,
      isIncreasing,
      volumePercentage: Math.min(volumePercentage, 100),
      maxVolume,
    };
  }, [data]);

  const formatVolume = (volume: number) => {
    if (volume >= 1e9) return `${(volume / 1e9).toFixed(1)}B`;
    if (volume >= 1e6) return `${(volume / 1e6).toFixed(1)}M`;
    if (volume >= 1e3) return `${(volume / 1e3).toFixed(1)}K`;
    return volume.toFixed(0);
  };

  const formatCurrency = (volume: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      notation: 'compact',
      compactDisplay: 'short',
      maximumFractionDigits: 1,
    }).format(volume);
  };

  const sizeClasses = {
    sm: {
      text: 'text-xs',
      bar: 'h-1',
      container: 'space-y-1',
    },
    md: {
      text: 'text-sm',
      bar: 'h-2',
      container: 'space-y-2',
    },
    lg: {
      text: 'text-base',
      bar: 'h-3',
      container: 'space-y-3',
    },
  };

  return (
    <div className={cn('space-y-2', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className={cn(
            'font-mono font-medium text-muted-foreground uppercase tracking-wide',
            sizeClasses[size].text
          )}>
            Volume {symbol}
          </span>
          
          {/* Volume Trend Indicator */}
          {data.previous && (
            <div className="flex items-center space-x-1">
              <div
                className={cn(
                  'flex items-center justify-center w-3 h-3',
                  metrics.isIncreasing ? 'text-success' : 'text-error'
                )}
              >
                {metrics.isIncreasing ? (
                  <svg viewBox="0 0 8 8" className="w-full h-full fill-current">
                    <path d="M4 1L7 6H1L4 1Z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 8 8" className="w-full h-full fill-current">
                    <path d="M4 7L1 2H7L4 7Z" />
                  </svg>
                )}
              </div>
              
              <span
                className={cn(
                  'font-mono text-xs font-medium tabular-nums',
                  metrics.isIncreasing ? 'text-success' : 'text-error'
                )}
              >
                {metrics.changePercent > 0 ? '+' : ''}{metrics.changePercent.toFixed(1)}%
              </span>
            </div>
          )}
        </div>

        {/* Current Volume */}
        <div className="text-right">
          <div className={cn(
            'font-mono font-semibold text-foreground tabular-nums',
            sizeClasses[size].text
          )}>
            {formatCurrency(data.current)}
          </div>
          <div className="font-mono text-xs text-muted-foreground">
            {formatVolume(data.current)}
          </div>
        </div>
      </div>

      {/* Volume Chart/Bar */}
      {showChart && (
        <div className="space-y-1">
          <div className={cn(
            'relative bg-muted/20 rounded-sm overflow-hidden',
            sizeClasses[size].bar
          )}>
            {/* Volume Bar */}
            <div
              className={cn(
                'bg-primary transition-all duration-500 ease-out rounded-sm',
                sizeClasses[size].bar,
                animated && 'animate-pulse'
              )}
              style={{
                width: `${metrics.volumePercentage}%`,
                transition: animated ? 'width 0.5s ease-out' : 'none',
              }}
            />
            
            {/* Average Line */}
            {data.avg24h && (
              <div
                className="absolute top-0 w-0.5 bg-warning/60 h-full"
                style={{
                  left: `${Math.min((data.avg24h / metrics.maxVolume) * 100, 100)}%`,
                }}
              />
            )}
          </div>
          
          {/* Chart Labels */}
          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
            <span>0</span>
            {data.avg24h && (
              <span className="text-warning">AVG</span>
            )}
            <span>{formatVolume(metrics.maxVolume)}</span>
          </div>
        </div>
      )}

      {/* Comparison Stats */}
      {showComparison && (data.avg24h || data.high24h || data.low24h) && (
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border/50">
          {data.avg24h && (
            <div className="text-center">
              <div className="font-mono text-xs text-muted-foreground">AVG 24H</div>
              <div className="font-mono text-xs text-foreground tabular-nums">
                {formatVolume(data.avg24h)}
              </div>
            </div>
          )}
          
          {data.high24h && (
            <div className="text-center">
              <div className="font-mono text-xs text-muted-foreground">HIGH 24H</div>
              <div className="font-mono text-xs text-success tabular-nums">
                {formatVolume(data.high24h)}
              </div>
            </div>
          )}
          
          {data.low24h && (
            <div className="text-center">
              <div className="font-mono text-xs text-muted-foreground">LOW 24H</div>
              <div className="font-mono text-xs text-error tabular-nums">
                {formatVolume(data.low24h)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Specialized volume indicators
export function TradingVolumeIndicator(props: Omit<VolumeIndicatorProps, 'symbol'> & { symbol: string }) {
  return (
    <VolumeIndicator 
      {...props} 
      showChart={true} 
      showComparison={true} 
      animated={true}
    />
  );
}

export function CompactVolumeIndicator(props: VolumeIndicatorProps) {
  return (
    <VolumeIndicator 
      {...props} 
      size="sm" 
      showChart={false} 
      showComparison={false}
    />
  );
}