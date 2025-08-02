'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Globe, 
  Building, 
  Award,
  Calendar,
  Target,
  Activity,
  BarChart3
} from 'lucide-react';

interface Stat {
  id: string;
  label: string;
  value: string | number;
  prefix?: string;
  suffix?: string;
  change?: {
    value: number;
    period: string;
    trend: 'up' | 'down' | 'neutral';
  };
  description?: string;
  icon?: React.ReactNode;
  category: 'financial' | 'operational' | 'growth' | 'achievement';
}

interface CompanyStatsProps {
  stats: Stat[];
  variant?: 'grid' | 'list' | 'compact' | 'highlight';
  showTrends?: boolean;
  showDescriptions?: boolean;
  animateCounters?: boolean;
  groupByCategory?: boolean;
  className?: string;
}

const CompanyStats: React.FC<CompanyStatsProps> = ({
  stats,
  variant = 'grid',
  showTrends = true,
  showDescriptions = false,
  animateCounters = true,
  groupByCategory = false,
  className
}) => {
  const [animatedValues, setAnimatedValues] = React.useState<Record<string, number>>({});

  // Animate counter values
  React.useEffect(() => {
    if (!animateCounters) return;

    const timers: NodeJS.Timeout[] = [];
    
    stats.forEach(stat => {
      if (typeof stat.value === 'number') {
        let currentValue = 0;
        const targetValue = stat.value;
        const increment = targetValue / 50; // 50 steps
        const duration = 2000; // 2 seconds
        const stepTime = duration / 50;

        const timer = setInterval(() => {
          currentValue += increment;
          if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
          }
          setAnimatedValues(prev => ({
            ...prev,
            [stat.id]: Math.floor(currentValue)
          }));
        }, stepTime);

        timers.push(timer);
      }
    });

    return () => {
      timers.forEach(timer => clearInterval(timer));
    };
  }, [stats, animateCounters]);

  const getDefaultIcon = (category: Stat['category']) => {
    switch (category) {
      case 'financial':
        return <DollarSign className="h-6 w-6" />;
      case 'operational':
        return <Activity className="h-6 w-6" />;
      case 'growth':
        return <TrendingUp className="h-6 w-6" />;
      case 'achievement':
        return <Award className="h-6 w-6" />;
      default:
        return <BarChart3 className="h-6 w-6" />;
    }
  };

  const getCategoryColor = (category: Stat['category']) => {
    switch (category) {
      case 'financial':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'operational':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'growth':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'achievement':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-success" />;
      case 'down':
        return <TrendingUp className="h-4 w-4 text-error rotate-180" />;
      case 'neutral':
        return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const formatValue = (stat: Stat) => {
    const value = animateCounters && typeof stat.value === 'number' 
      ? animatedValues[stat.id] ?? stat.value
      : stat.value;

    return `${stat.prefix || ''}${value.toLocaleString()}${stat.suffix || ''}`;
  };

  const renderStatCard = (stat: Stat, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8'
    };

    const iconSizes = {
      sm: 'h-8 w-8',
      md: 'h-10 w-10',
      lg: 'h-12 w-12'
    };

    const textSizes = {
      sm: {
        value: 'text-xl',
        label: 'text-sm',
        description: 'text-xs'
      },
      md: {
        value: 'text-2xl',
        label: 'text-base',
        description: 'text-sm'
      },
      lg: {
        value: 'text-3xl',
        label: 'text-lg',
        description: 'text-base'
      }
    };

    return (
      <div
        key={stat.id}
        className={cn(
          'bg-card border border-border rounded-lg transition-all duration-300',
          'hover:shadow-lg hover:border-primary/50',
          sizeClasses[size]
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className={cn(
            'rounded-lg flex items-center justify-center',
            iconSizes[size],
            getCategoryColor(stat.category)
          )}>
            {stat.icon || getDefaultIcon(stat.category)}
          </div>

          {showTrends && stat.change && (
            <div className="flex items-center space-x-1">
              {getTrendIcon(stat.change.trend)}
              <span className={cn(
                'text-sm font-medium',
                stat.change.trend === 'up' && 'text-success',
                stat.change.trend === 'down' && 'text-error',
                stat.change.trend === 'neutral' && 'text-muted-foreground'
              )}>
                {stat.change.value > 0 ? '+' : ''}{stat.change.value}%
              </span>
            </div>
          )}
        </div>

        {/* Value */}
        <div className="mb-2">
          <div className={cn(
            'font-bold text-foreground',
            textSizes[size].value
          )}>
            {formatValue(stat)}
          </div>
        </div>

        {/* Label */}
        <div className={cn(
          'font-medium text-muted-foreground mb-2',
          textSizes[size].label
        )}>
          {stat.label}
        </div>

        {/* Change period */}
        {showTrends && stat.change && (
          <div className={cn(
            'text-muted-foreground mb-2',
            textSizes[size].description
          )}>
            {stat.change.period}
          </div>
        )}

        {/* Description */}
        {showDescriptions && stat.description && (
          <div className={cn(
            'text-muted-foreground leading-relaxed',
            textSizes[size].description
          )}>
            {stat.description}
          </div>
        )}
      </div>
    );
  };

  const renderCompactStat = (stat: Stat) => (
    <div
      key={stat.id}
      className="flex items-center space-x-4 p-4 bg-card border border-border rounded-lg hover:shadow-md transition-all duration-300"
    >
      <div className={cn(
        'w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0',
        getCategoryColor(stat.category)
      )}>
        {stat.icon || getDefaultIcon(stat.category)}
      </div>

      <div className="flex-1">
        <div className="text-xl font-bold text-foreground">
          {formatValue(stat)}
        </div>
        <div className="text-sm font-medium text-muted-foreground">
          {stat.label}
        </div>
      </div>

      {showTrends && stat.change && (
        <div className="flex items-center space-x-2 text-sm">
          {getTrendIcon(stat.change.trend)}
          <span className={cn(
            'font-medium',
            stat.change.trend === 'up' && 'text-success',
            stat.change.trend === 'down' && 'text-error',
            stat.change.trend === 'neutral' && 'text-muted-foreground'
          )}>
            {stat.change.value > 0 ? '+' : ''}{stat.change.value}%
          </span>
        </div>
      )}
    </div>
  );

  const renderHighlightStats = () => {
    const highlightStats = stats.slice(0, 4);
    const otherStats = stats.slice(4);

    return (
      <div className="space-y-8">
        {/* Main highlights */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {highlightStats.map(stat => renderStatCard(stat, 'lg'))}
        </div>

        {/* Secondary stats */}
        {otherStats.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherStats.map(stat => renderStatCard(stat, 'md'))}
          </div>
        )}
      </div>
    );
  };

  const renderByCategory = () => {
    const groupedStats = stats.reduce((groups, stat) => {
      const category = stat.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(stat);
      return groups;
    }, {} as Record<string, Stat[]>);

    const categoryLabels = {
      financial: 'Financial Performance',
      operational: 'Operational Metrics',
      growth: 'Growth Indicators',
      achievement: 'Key Achievements'
    };

    return (
      <div className="space-y-8">
        {Object.entries(groupedStats).map(([category, categoryStats]) => (
          <div key={category}>
            <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center space-x-2">
              <div className={cn(
                'w-6 h-6 rounded flex items-center justify-center',
                getCategoryColor(category as Stat['category'])
              )}>
                {getDefaultIcon(category as Stat['category'])}
              </div>
              <span>{categoryLabels[category as keyof typeof categoryLabels] || category}</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryStats.map(stat => renderStatCard(stat, 'md'))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (stats.length === 0) {
    return (
      <div className={cn('text-center py-12', className)}>
        <div className="text-muted-foreground">No statistics available</div>
      </div>
    );
  }

  return (
    <div className={cn(className)}>
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Company Statistics
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Key metrics and performance indicators that showcase our growth, 
          achievements, and commitment to excellence.
        </p>
      </div>

      {/* Stats Display */}
      {groupByCategory ? renderByCategory() : (
        <>
          {variant === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {stats.map(stat => renderStatCard(stat, 'md'))}
            </div>
          )}
          
          {variant === 'list' && (
            <div className="space-y-4">
              {stats.map(renderCompactStat)}
            </div>
          )}
          
          {variant === 'compact' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stats.map(renderCompactStat)}
            </div>
          )}
          
          {variant === 'highlight' && renderHighlightStats()}
        </>
      )}

      {/* Footer note */}
      <div className="mt-12 text-center">
        <p className="text-xs text-muted-foreground">
          Statistics updated as of {new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>
    </div>
  );
};

export default CompanyStats;