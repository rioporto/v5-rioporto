'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export interface PriceDisplayProps {
  className?: string;
  price: number;
  previousPrice?: number;
  currency?: 'BRL' | 'USD' | 'BTC' | 'ETH';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showChange?: boolean;
  changeValue?: number;
  changePercent?: number;
  animated?: boolean;
  precision?: number;
  prefix?: string;
  suffix?: string;
}

export function PriceDisplay({
  className,
  price,
  previousPrice,
  currency = 'BRL',
  size = 'md',
  showChange = false,
  changeValue,
  changePercent,
  animated = true,
  precision,
  prefix,
  suffix,
}: PriceDisplayProps) {
  const [flashState, setFlashState] = useState<'none' | 'up' | 'down'>('none');

  // Flash animation when price changes
  useEffect(() => {
    if (animated && previousPrice !== undefined && previousPrice !== price) {
      const direction = price > previousPrice ? 'up' : 'down';
      setFlashState(direction);
      
      const timer = setTimeout(() => {
        setFlashState('none');
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [price, previousPrice, animated]);

  // Determine change direction
  const isPositive = changeValue ? changeValue >= 0 : changePercent ? changePercent >= 0 : false;
  const isNegative = changeValue ? changeValue < 0 : changePercent ? changePercent < 0 : false;

  // Format price based on currency
  const formatPrice = (value: number) => {
    const decimals = precision ?? (currency === 'BRL' ? 2 : currency === 'USD' ? 2 : 8);
    
    if (currency === 'BRL') {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(value);
    }
    
    if (currency === 'USD') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(value);
    }
    
    // Crypto currencies
    return `${value.toFixed(decimals)} ${currency}`;
  };

  // Format change value
  const formatChange = () => {
    if (changeValue !== undefined) {
      const formatted = Math.abs(changeValue).toFixed(precision ?? 2);
      return `${isPositive ? '+' : '-'}${formatted}`;
    }
    
    if (changePercent !== undefined) {
      const formatted = Math.abs(changePercent).toFixed(2);
      return `${isPositive ? '+' : ''}${isPositive ? changePercent : changePercent}%`;
    }
    
    return null;
  };

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-2xl',
  };

  return (
    <div
      className={cn(
        'flex items-center space-x-2 font-mono transition-all duration-150',
        className
      )}
    >
      {/* Main Price */}
      <div
        className={cn(
          'font-semibold tabular-nums transition-all duration-500',
          sizeClasses[size],
          {
            'text-foreground': flashState === 'none',
            'text-success': flashState === 'up',
            'text-error': flashState === 'down',
          }
        )}
      >
        {prefix}
        {formatPrice(price)}
        {suffix}
      </div>

      {/* Change Indicator */}
      {showChange && (changeValue !== undefined || changePercent !== undefined) && (
        <div className="flex items-center space-x-1">
          {/* Change Arrow */}
          <div
            className={cn(
              'flex items-center justify-center w-3 h-3',
              {
                'text-success': isPositive,
                'text-error': isNegative,
                'text-muted-foreground': !isPositive && !isNegative,
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

          {/* Change Value */}
          <span
            className={cn(
              'text-xs font-medium tabular-nums',
              {
                'text-success': isPositive,
                'text-error': isNegative,
                'text-muted-foreground': !isPositive && !isNegative,
              }
            )}
          >
            {formatChange()}
          </span>
        </div>
      )}
    </div>
  );
}

// Specialized components for common use cases
export function BTCPriceDisplay(props: Omit<PriceDisplayProps, 'currency'>) {
  return <PriceDisplay {...props} currency="BRL" precision={2} />;
}

export function CryptoPriceDisplay(props: Omit<PriceDisplayProps, 'currency'> & { currency: 'BTC' | 'ETH' }) {
  return <PriceDisplay {...props} precision={8} />;
}

export function FiatPriceDisplay(props: Omit<PriceDisplayProps, 'currency'> & { currency?: 'BRL' | 'USD' }) {
  return <PriceDisplay {...props} currency={props.currency || 'BRL'} precision={2} />;
}