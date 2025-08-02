'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface MinimalistChartProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  data: ChartDataPoint[];
  type?: 'bar' | 'line' | 'area';
  height?: number;
  showGrid?: boolean;
  showLabels?: boolean;
}

const MinimalistChart = forwardRef<HTMLDivElement, MinimalistChartProps>(
  ({ 
    className, 
    title, 
    description, 
    data, 
    type = 'bar',
    height = 200,
    showGrid = true,
    showLabels = true,
    ...props 
  }, ref) => {
    const maxValue = Math.max(...data.map(d => d.value));
    
    return (
      <div
        ref={ref}
        className={cn('space-y-4', className)}
        {...props}
      >
        {/* Header */}
        {(title || description) && (
          <div className="space-y-1">
            {title && (
              <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            )}
            {description && (
              <p className="text-sm text-muted">{description}</p>
            )}
          </div>
        )}

        {/* Chart container */}
        <div 
          className="relative rounded-lg bg-card p-4"
          style={{ height: height + 'px' }}
        >
          {/* Grid lines */}
          {showGrid && (
            <div className="absolute inset-4 grid grid-rows-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="border-t border-border/30 first:border-t-0"
                />
              ))}
            </div>
          )}

          {/* Chart bars */}
          <div className="relative h-full flex items-end justify-between px-4 pb-8">
            {data.map((point, index) => {
              const heightPercentage = maxValue > 0 ? (point.value / maxValue) * 100 : 0;
              
              return (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-2 flex-1 max-w-[80px]"
                >
                  {/* Bar */}
                  <div
                    className={cn(
                      'w-8 rounded-t-sm transition-all duration-300 hover:opacity-80',
                      point.color ? '' : 'bg-primary'
                    )}
                    style={{
                      height: `${heightPercentage}%`,
                      backgroundColor: point.color || undefined,
                      minHeight: heightPercentage > 0 ? '4px' : '0',
                    }}
                  />
                  
                  {/* Label */}
                  {showLabels && (
                    <div className="text-center">
                      <p className="text-xs font-medium text-foreground">
                        {point.value}
                      </p>
                      <p className="text-xs text-muted truncate max-w-full">
                        {point.label}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
);

MinimalistChart.displayName = 'MinimalistChart';

// Simple progress chart component
interface MinimalistProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: number;
  max?: number;
  showValue?: boolean;
  color?: string;
}

const MinimalistProgress = forwardRef<HTMLDivElement, MinimalistProgressProps>(
  ({ className, label, value, max = 100, showValue = true, color, ...props }, ref) => {
    const percentage = Math.min((value / max) * 100, 100);
    
    return (
      <div
        ref={ref}
        className={cn('space-y-2', className)}
        {...props}
      >
        {/* Label and value */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">{label}</span>
          {showValue && (
            <span className="text-sm text-muted">
              {value}{max === 100 ? '%' : `/${max}`}
            </span>
          )}
        </div>
        
        {/* Progress bar */}
        <div className="h-2 rounded-full bg-secondary overflow-hidden">
          <div
            className={cn(
              'h-full rounded-full transition-all duration-300',
              color ? '' : 'bg-primary'
            )}
            style={{
              width: `${percentage}%`,
              backgroundColor: color || undefined,
            }}
          />
        </div>
      </div>
    );
  }
);

MinimalistProgress.displayName = 'MinimalistProgress';

// Metric display component
interface MinimalistMetricProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: string;
    direction: 'up' | 'down' | 'neutral';
  };
}

const MinimalistMetric = forwardRef<HTMLDivElement, MinimalistMetricProps>(
  ({ className, title, value, subtitle, trend, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('text-center space-y-2', className)}
        {...props}
      >
        <h4 className="text-sm font-medium text-muted">{title}</h4>
        <div className="space-y-1">
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {subtitle && (
            <p className="text-sm text-muted">{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center justify-center space-x-1">
              <span
                className={cn(
                  'text-xs',
                  {
                    'text-green-600': trend.direction === 'up',
                    'text-red-600': trend.direction === 'down',
                    'text-muted': trend.direction === 'neutral',
                  }
                )}
              >
                {trend.direction === 'up' && '↗'}
                {trend.direction === 'down' && '↘'}
                {trend.direction === 'neutral' && '→'}
                {trend.value}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
);

MinimalistMetric.displayName = 'MinimalistMetric';

export {
  MinimalistChart,
  MinimalistProgress,
  MinimalistMetric,
};