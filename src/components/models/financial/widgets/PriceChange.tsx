'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export interface PriceChangeData {
  current: number;
  previous: number;
  change: number;
  changePercent: number;
  high24h?: number;
  low24h?: number;
  open24h?: number;
}

export interface PriceChangeProps {
  className?: string;
  data: PriceChangeData;
  symbol?: string;
  currency?: 'BRL' | 'USD';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'compact' | 'detailed' | 'minimal';
  showArrow?: boolean;
  showPercentage?: boolean;
  showAbsolute?: boolean;
  animated?: boolean;
  timeframe?: '1h' | '24h' | '7d' | '30d';
}

export function PriceChange({
  className,
  data,
  symbol = '',
  currency = 'BRL',
  size = 'md',
  variant = 'default',
  showArrow = true,
  showPercentage = true,
  showAbsolute = true,
  animated = true,
  timeframe = '24h',
}: PriceChangeProps) {
  const [flashState, setFlashState] = useState<'none' | 'up' | 'down'>('none');

  // Flash animation when price changes
  useEffect(() => {
    if (animated && data.change !== 0) {
      const direction = data.change > 0 ? 'up' : 'down';
      setFlashState(direction);
      
      const timer = setTimeout(() => {
        setFlashState('none');
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [data.change, animated]);

  const isPositive = data.change >= 0;
  const isNegative = data.change < 0;

  const formatPrice = (price: number) => {
    if (currency === 'BRL') {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(price);
    }
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const formatChange = (value: number) => {
    const absValue = Math.abs(value);
    if (currency === 'BRL') {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(absValue);
    }
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(absValue);
  };

  const sizeClasses = {
    sm: {
      text: 'text-xs',
      price: 'text-sm',
      change: 'text-xs',
      arrow: 'w-2 h-2',
    },
    md: {
      text: 'text-sm',
      price: 'text-base',
      change: 'text-sm',
      arrow: 'w-3 h-3',
    },
    lg: {
      text: 'text-base',
      price: 'text-lg',
      change: 'text-base',
      arrow: 'w-4 h-4',
    },
  };

  const renderMinimal = () => (
    <div className="flex items-center space-x-1">
      {showArrow && (
        <div
          className={cn(
            'flex items-center justify-center transition-all duration-300',
            sizeClasses[size].arrow,
            {
              'text-success': isPositive,
              'text-error': isNegative,
              'text-muted-foreground': data.change === 0,
            }
          )}
        >
          {isPositive ? (
            <svg viewBox="0 0 8 8" className="w-full h-full fill-current">
              <path d="M4 1L7 6H1L4 1Z" />
            </svg>
          ) : isNegative ? (
            <svg viewBox="0 0 8 8" className="w-full h-full fill-current">
              <path d="M4 7L1 2H7L4 7Z" />
            </svg>
          ) : (
            <div className="w-full h-0.5 bg-current rounded" />
          )}
        </div>
      )}
      
      {showPercentage && (
        <span
          className={cn(
            'font-mono font-medium tabular-nums transition-all duration-300',
            sizeClasses[size].change,
            {
              'text-success': isPositive && flashState !== 'up',
              'text-error': isNegative && flashState !== 'down',
              'text-muted-foreground': data.change === 0,
              'text-white bg-success px-1 rounded-sm': flashState === 'up',
              'text-white bg-error px-1 rounded-sm': flashState === 'down',
            }
          )}
        >
          {isPositive ? '+' : ''}{data.changePercent.toFixed(2)}%
        </span>
      )}
    </div>
  );

  const renderCompact = () => (
    <div className="flex items-center space-x-2">
      <div className="flex items-center space-x-1">
        {showArrow && (
          <div
            className={cn(
              'flex items-center justify-center',
              sizeClasses[size].arrow,
              {
                'text-success': isPositive,
                'text-error': isNegative,
                'text-muted-foreground': data.change === 0,
              }
            )}
          >
            {isPositive ? (
              <svg viewBox="0 0 8 8" className="w-full h-full fill-current">
                <path d="M4 1L7 6H1L4 1Z" />
              </svg>
            ) : isNegative ? (
              <svg viewBox="0 0 8 8" className="w-full h-full fill-current">
                <path d="M4 7L1 2H7L4 7Z" />
              </svg>
            ) : (
              <div className="w-full h-0.5 bg-current rounded" />
            )}
          </div>
        )}
        
        {showAbsolute && (
          <span
            className={cn(
              'font-mono font-medium tabular-nums',
              sizeClasses[size].change,
              {
                'text-success': isPositive,
                'text-error': isNegative,
                'text-muted-foreground': data.change === 0,
              }
            )}
          >
            {isPositive ? '+' : isNegative ? '-' : ''}{formatChange(data.change)}
          </span>
        )}
      </div>
      
      {showPercentage && (
        <span
          className={cn(
            'font-mono font-medium tabular-nums',
            sizeClasses[size].change,
            {
              'text-success': isPositive,
              'text-error': isNegative,
              'text-muted-foreground': data.change === 0,
            }
          )}
        >
          ({isPositive ? '+' : ''}{data.changePercent.toFixed(2)}%)
        </span>
      )}
    </div>
  );

  const renderDefault = () => (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <div className="flex items-center space-x-2">
          <span className={cn(
            'font-mono text-muted-foreground uppercase tracking-wide',
            sizeClasses[size].text
          )}>
            {symbol} {timeframe}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          {showArrow && (
            <div
              className={cn(
                'flex items-center justify-center',
                sizeClasses[size].arrow,
                {
                  'text-success': isPositive,
                  'text-error': isNegative,
                  'text-muted-foreground': data.change === 0,
                }
              )}
            >
              {isPositive ? (
                <svg viewBox="0 0 8 8" className="w-full h-full fill-current">
                  <path d="M4 1L7 6H1L4 1Z" />
                </svg>
              ) : isNegative ? (
                <svg viewBox="0 0 8 8" className="w-full h-full fill-current">
                  <path d="M4 7L1 2H7L4 7Z" />
                </svg>
              ) : (
                <div className="w-full h-0.5 bg-current rounded" />
              )}
            </div>
          )}
          
          {showAbsolute && (
            <span
              className={cn(
                'font-mono font-semibold tabular-nums transition-all duration-300',
                sizeClasses[size].change,
                {
                  'text-success': isPositive && flashState !== 'up',
                  'text-error': isNegative && flashState !== 'down',
                  'text-muted-foreground': data.change === 0,
                  'text-white bg-success px-1 rounded-sm': flashState === 'up',
                  'text-white bg-error px-1 rounded-sm': flashState === 'down',
                }
              )}
            >
              {isPositive ? '+' : isNegative ? '-' : ''}{formatChange(data.change)}
            </span>
          )}
          
          {showPercentage && (
            <span
              className={cn(
                'font-mono font-medium tabular-nums',
                sizeClasses[size].change,
                {
                  'text-success': isPositive,
                  'text-error': isNegative,
                  'text-muted-foreground': data.change === 0,
                }
              )}
            >
              ({isPositive ? '+' : ''}{data.changePercent.toFixed(2)}%)
            </span>
          )}
        </div>
      </div>
    </div>
  );

  const renderDetailed = () => (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className={cn(
          'font-mono text-muted-foreground uppercase tracking-wide',
          sizeClasses[size].text
        )}>
          {symbol} Variação {timeframe}
        </span>
        
        <div className={cn(
          'px-2 py-1 rounded-sm font-mono text-xs font-medium',
          {
            'bg-success/10 text-success': isPositive,
            'bg-error/10 text-error': isNegative,
            'bg-muted/10 text-muted-foreground': data.change === 0,
          }
        )}>
          {isPositive ? 'ALTA' : isNegative ? 'BAIXA' : 'ESTÁVEL'}
        </div>
      </div>

      {/* Main Change */}
      <div className="flex items-center space-x-3">
        {showArrow && (
          <div
            className={cn(
              'flex items-center justify-center p-1 rounded-sm',
              {
                'bg-success/10 text-success': isPositive,
                'bg-error/10 text-error': isNegative,
                'bg-muted/10 text-muted-foreground': data.change === 0,
              }
            )}
          >
            {isPositive ? (
              <svg viewBox="0 0 12 12" className="w-4 h-4 fill-current">
                <path d="M6 2L10 8H2L6 2Z" />
              </svg>
            ) : isNegative ? (
              <svg viewBox="0 0 12 12" className="w-4 h-4 fill-current">
                <path d="M6 10L2 4H10L6 10Z" />
              </svg>
            ) : (
              <div className="w-4 h-1 bg-current rounded" />
            )}
          </div>
        )}
        
        <div className="flex-1 space-y-1">
          {showAbsolute && (
            <div
              className={cn(
                'font-mono font-bold tabular-nums',
                sizeClasses[size].price,
                {
                  'text-success': isPositive,
                  'text-error': isNegative,
                  'text-muted-foreground': data.change === 0,
                }
              )}
            >
              {isPositive ? '+' : isNegative ? '-' : ''}{formatChange(data.change)}
            </div>
          )}
          
          {showPercentage && (
            <div
              className={cn(
                'font-mono font-semibold tabular-nums',
                sizeClasses[size].change,
                {
                  'text-success': isPositive,
                  'text-error': isNegative,
                  'text-muted-foreground': data.change === 0,
                }
              )}
            >
              {isPositive ? '+' : ''}{data.changePercent.toFixed(2)}%
            </div>
          )}
        </div>
      </div>

      {/* 24h Range */}
      {(data.high24h || data.low24h) && (
        <div className="border-t border-border pt-2">
          <div className="flex items-center justify-between text-xs">
            {data.low24h && (
              <div className="space-y-1">
                <span className="font-mono text-muted-foreground uppercase">24h MIN</span>
                <div className="font-mono text-error font-medium">
                  {formatPrice(data.low24h)}
                </div>
              </div>
            )}
            
            {data.high24h && (
              <div className="space-y-1 text-right">
                <span className="font-mono text-muted-foreground uppercase">24h MAX</span>
                <div className="font-mono text-success font-medium">
                  {formatPrice(data.high24h)}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (variant) {
      case 'minimal':
        return renderMinimal();
      case 'compact':
        return renderCompact();
      case 'detailed':
        return renderDetailed();
      default:
        return renderDefault();
    }
  };

  return (
    <div className={cn('transition-all duration-150', className)}>
      {renderContent()}
    </div>
  );
}