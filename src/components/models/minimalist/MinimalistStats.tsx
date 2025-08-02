'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface StatItem {
  label: string;
  value: string | number;
  change?: {
    value: string;
    type: 'positive' | 'negative' | 'neutral';
  };
  description?: string;
}

export interface MinimalistStatsProps extends React.HTMLAttributes<HTMLDivElement> {
  stats: StatItem[];
  columns?: 2 | 3 | 4;
}

const MinimalistStats = forwardRef<HTMLDivElement, MinimalistStatsProps>(
  ({ className, stats, columns = 3, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'grid gap-6',
          {
            'grid-cols-1 sm:grid-cols-2': columns === 2,
            'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3': columns === 3,
            'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4': columns === 4,
          },
          className
        )}
        {...props}
      >
        {stats.map((stat, index) => (
          <MinimalistStatCard key={index} stat={stat} />
        ))}
      </div>
    );
  }
);

MinimalistStats.displayName = 'MinimalistStats';

// Individual stat card component
interface MinimalistStatCardProps {
  stat: StatItem;
}

const MinimalistStatCard = forwardRef<HTMLDivElement, MinimalistStatCardProps>(
  ({ stat }, ref) => {
    return (
      <div
        ref={ref}
        className="rounded-lg bg-card p-6 transition-all duration-200 hover:shadow-md"
      >
        <div className="space-y-2">
          {/* Label */}
          <p className="text-sm font-medium text-muted">
            {stat.label}
          </p>
          
          {/* Value */}
          <div className="flex items-baseline space-x-2">
            <p className="text-2xl font-semibold text-foreground">
              {stat.value}
            </p>
            
            {/* Change indicator */}
            {stat.change && (
              <span
                className={cn(
                  'text-xs font-medium px-2 py-1 rounded-full',
                  {
                    'bg-green-100 text-green-800': stat.change.type === 'positive',
                    'bg-red-100 text-red-800': stat.change.type === 'negative',
                    'bg-gray-100 text-gray-800': stat.change.type === 'neutral',
                  }
                )}
              >
                {stat.change.type === 'positive' && '+'}
                {stat.change.value}
              </span>
            )}
          </div>
          
          {/* Description */}
          {stat.description && (
            <p className="text-xs text-muted">
              {stat.description}
            </p>
          )}
        </div>
      </div>
    );
  }
);

MinimalistStatCard.displayName = 'MinimalistStatCard';

// Simple stat component for inline use
interface MinimalistStatProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  inline?: boolean;
}

const MinimalistStat = forwardRef<HTMLDivElement, MinimalistStatProps>(
  ({ className, label, value, inline = false, ...props }, ref) => {
    if (inline) {
      return (
        <div
          ref={ref}
          className={cn('flex items-center space-x-2', className)}
          {...props}
        >
          <span className="text-sm text-muted">{label}:</span>
          <span className="font-medium">{value}</span>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn('space-y-1', className)}
        {...props}
      >
        <p className="text-sm text-muted">{label}</p>
        <p className="text-lg font-semibold">{value}</p>
      </div>
    );
  }
);

MinimalistStat.displayName = 'MinimalistStat';

export {
  MinimalistStats,
  MinimalistStatCard,
  MinimalistStat,
};