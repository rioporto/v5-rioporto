'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { WidgetProps, RealtimePrice as RealtimePriceType } from '@/types/financial';

interface RealtimePriceProps extends WidgetProps {
  data: RealtimePriceType;
  showChart?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function RealtimePrice({ 
  data,
  showChart = false,
  size = 'md',
  loading = false,
  error,
  className = ""
}: RealtimePriceProps) {
  const [isFlashing, setIsFlashing] = useState(false);
  const [prevPrice, setPrevPrice] = useState(data.price);

  useEffect(() => {
    if (data.price !== prevPrice) {
      setIsFlashing(true);
      setPrevPrice(data.price);
      const timer = setTimeout(() => setIsFlashing(false), 500);
      return () => clearTimeout(timer);
    }
  }, [data.price, prevPrice]);

  if (loading) {
    return (
      <Card className={`p-4 ${className}`}>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-12" />
          </div>
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={`p-4 ${className}`}>
        <div className="text-red-500 text-center">Error loading price</div>
      </Card>
    );
  }

  const isPositive = data.change >= 0;
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <Card className={`p-4 transition-colors duration-500 ${
      isFlashing ? (isPositive ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20') : ''
    } ${className}`}>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className={`font-medium ${sizeClasses[size]}`}>{data.symbol}</span>
          <Badge variant={data.trend === 'UP' ? 'success' : data.trend === 'DOWN' ? 'error' : 'default'} size="sm">
            {data.trend}
          </Badge>
        </div>
        
        <div className={`font-bold ${
          size === 'lg' ? 'text-2xl' : size === 'md' ? 'text-xl' : 'text-lg'
        } ${isFlashing ? 'animate-pulse' : ''}`}>
          ${data.price.toFixed(2)}
        </div>
        
        <div className={`flex items-center gap-2 ${sizeClasses[size]} ${
          isPositive ? 'text-green-600' : 'text-red-600'
        }`}>
          <span>{isPositive ? '+' : ''}${data.change.toFixed(2)}</span>
          <span>({isPositive ? '+' : ''}{data.changePercent.toFixed(2)}%)</span>
        </div>
        
        <div className="text-xs text-gray-500 space-y-1">
          <div>Vol: {data.volume.toLocaleString()}</div>
          <div>H: ${data.high24h.toFixed(2)} L: ${data.low24h.toFixed(2)}</div>
          <div>Updated: {new Date(data.lastUpdate * 1000).toLocaleTimeString()}</div>
        </div>
      </div>
    </Card>
  );
}