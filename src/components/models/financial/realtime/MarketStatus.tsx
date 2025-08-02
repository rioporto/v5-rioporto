'use client';

import { useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { WidgetProps, MarketStatus as MarketStatusType } from '@/types/financial';

interface MarketStatusProps extends WidgetProps {
  data: MarketStatusType;
}

export default function MarketStatus({ 
  data,
  loading = false,
  error,
  className = ""
}: MarketStatusProps) {
  const timeUntilChange = useMemo(() => {
    const now = Date.now();
    const target = data.isOpen ? data.nextClose : data.nextOpen;
    
    if (!target) return null;
    
    const diff = target - now;
    if (diff <= 0) return null;
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  }, [data.isOpen, data.nextClose, data.nextOpen]);

  if (loading) {
    return (
      <Card className={`p-4 ${className}`}>
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-6 bg-gray-200 rounded w-16"></div>
          <div className="h-3 bg-gray-200 rounded w-32"></div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={`p-4 ${className}`}>
        <div className="text-red-500 text-center">Error loading market status</div>
      </Card>
    );
  }

  return (
    <Card className={`p-4 ${className}`}>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-900 dark:text-gray-100">Market Status</h4>
          <Badge variant={data.isOpen ? 'success' : 'error'}>
            {data.isOpen ? 'OPEN' : 'CLOSED'}
          </Badge>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Hours:</span>
            <span className="font-mono">
              {data.marketHours.open} - {data.marketHours.close}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Timezone:</span>
            <span className="font-mono">{data.timezone}</span>
          </div>
          
          {timeUntilChange && (
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                {data.isOpen ? 'Closes in:' : 'Opens in:'}
              </span>
              <span className="font-mono font-medium">{timeUntilChange}</span>
            </div>
          )}
          
          {data.extendedHours && (
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="text-xs font-medium text-gray-500 mb-2">Extended Hours</div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>Pre-market:</span>
                  <span className="font-mono">
                    {data.extendedHours.premarket.open} - {data.extendedHours.premarket.close}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>After-market:</span>
                  <span className="font-mono">
                    {data.extendedHours.aftermarket.open} - {data.extendedHours.aftermarket.close}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}