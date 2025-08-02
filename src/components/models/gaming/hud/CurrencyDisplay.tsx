'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface Currency {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  icon?: React.ReactNode;
  color?: 'gold' | 'silver' | 'copper' | 'gems' | 'custom';
  customColor?: string;
  maxAmount?: number;
  showMax?: boolean;
}

interface CurrencyDisplayProps {
  currencies: Currency[];
  layout?: 'horizontal' | 'vertical' | 'compact';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  showLabels?: boolean;
  showIcons?: boolean;
  recentGains?: Record<string, number>;
  className?: string;
}

export const CurrencyDisplay: React.FC<CurrencyDisplayProps> = ({
  currencies,
  layout = 'horizontal',
  size = 'md',
  animated = true,
  showLabels = true,
  showIcons = true,
  recentGains = {},
  className,
}) => {
  const [displayAmounts, setDisplayAmounts] = useState<Record<string, number>>({});
  const [gainAnimations, setGainAnimations] = useState<Record<string, boolean>>({});

  // Initialize display amounts
  useEffect(() => {
    const initialAmounts: Record<string, number> = {};
    currencies.forEach(currency => {
      initialAmounts[currency.id] = currency.amount;
    });
    setDisplayAmounts(initialAmounts);
  }, []);

  // Animate currency changes
  useEffect(() => {
    currencies.forEach(currency => {
      const currentDisplay = displayAmounts[currency.id] || 0;
      if (currentDisplay !== currency.amount && animated) {
        const difference = currency.amount - currentDisplay;
        const steps = 20;
        const stepAmount = difference / steps;
        const duration = 500;
        
        let step = 0;
        const interval = setInterval(() => {
          step++;
          setDisplayAmounts(prev => ({
            ...prev,
            [currency.id]: prev[currency.id] + stepAmount
          }));
          
          if (step >= steps) {
            clearInterval(interval);
            setDisplayAmounts(prev => ({
              ...prev,
              [currency.id]: currency.amount
            }));
          }
        }, duration / steps);
      }
    });
  }, [currencies, displayAmounts, animated]);

  // Handle recent gains animation
  useEffect(() => {
    Object.keys(recentGains).forEach(currencyId => {
      if (recentGains[currencyId] > 0) {
        setGainAnimations(prev => ({ ...prev, [currencyId]: true }));
        setTimeout(() => {
          setGainAnimations(prev => ({ ...prev, [currencyId]: false }));
        }, 2000);
      }
    });
  }, [recentGains]);

  const colorStyles = {
    gold: {
      text: 'text-gaming-neon-yellow',
      bg: 'bg-gaming-neon-yellow/10',
      border: 'border-gaming-neon-yellow',
      glow: 'shadow-[0_0_10px_rgba(255,255,0,0.4)]',
    },
    silver: {
      text: 'text-gray-300',
      bg: 'bg-gray-500/10',
      border: 'border-gray-400',
      glow: 'shadow-[0_0_10px_rgba(156,163,175,0.4)]',
    },
    copper: {
      text: 'text-orange-400',
      bg: 'bg-orange-500/10',
      border: 'border-orange-400',
      glow: 'shadow-[0_0_10px_rgba(251,146,60,0.4)]',
    },
    gems: {
      text: 'text-gaming-neon-pink',
      bg: 'bg-gaming-neon-pink/10',
      border: 'border-gaming-neon-pink',
      glow: 'shadow-[0_0_10px_rgba(255,0,110,0.4)]',
    },
    custom: {
      text: 'text-gaming-neon-cyan',
      bg: 'bg-gaming-neon-cyan/10',
      border: 'border-gaming-neon-cyan',
      glow: 'shadow-[0_0_10px_rgba(0,245,255,0.4)]',
    },
  };

  const sizeStyles = {
    sm: {
      text: 'text-sm',
      icon: 'w-4 h-4',
      padding: 'px-2 py-1',
      gap: 'gap-1',
    },
    md: {
      text: 'text-base',
      icon: 'w-5 h-5',
      padding: 'px-3 py-2',
      gap: 'gap-2',
    },
    lg: {
      text: 'text-lg',
      icon: 'w-6 h-6',
      padding: 'px-4 py-3',
      gap: 'gap-3',
    },
  };

  const layoutStyles = {
    horizontal: 'flex flex-wrap items-center gap-2',
    vertical: 'flex flex-col gap-2',
    compact: 'grid grid-cols-2 gap-1',
  };

  const formatAmount = (amount: number): string => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(1)}K`;
    }
    return amount.toLocaleString();
  };

  const sizeConfig = sizeStyles[size];

  return (
    <div className={cn('relative', layoutStyles[layout], className)}>
      {currencies.map(currency => {
        const colorConfig = colorStyles[currency.color || 'custom'];
        const displayAmount = displayAmounts[currency.id] || 0;
        const recentGain = recentGains[currency.id] || 0;
        const isGaining = gainAnimations[currency.id];
        const isAtMax = currency.maxAmount && currency.amount >= currency.maxAmount;

        return (
          <div
            key={currency.id}
            className={cn(
              'relative flex items-center border rounded-lg transition-all duration-300',
              sizeConfig.padding,
              sizeConfig.gap,
              colorConfig.bg,
              colorConfig.border,
              animated && 'hover:scale-105',
              isGaining && colorConfig.glow,
              isAtMax && 'animate-pulse'
            )}
          >
            {/* Currency icon */}
            {showIcons && currency.icon && (
              <div className={cn(sizeConfig.icon, colorConfig.text)}>
                {currency.icon}
              </div>
            )}
            
            {/* Currency symbol fallback */}
            {showIcons && !currency.icon && (
              <span className={cn('font-gaming-cyber font-bold', sizeConfig.text, colorConfig.text)}>
                {currency.symbol}
              </span>
            )}
            
            {/* Currency amount */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className={cn(
                  'font-gaming-mono tabular-nums font-bold',
                  sizeConfig.text,
                  colorConfig.text
                )}>
                  {formatAmount(Math.floor(displayAmount))}
                </span>
                
                {/* Max amount indicator */}
                {currency.showMax && currency.maxAmount && (
                  <span className={cn(
                    'font-gaming-mono text-xs opacity-60',
                    colorConfig.text
                  )}>
                    /{formatAmount(currency.maxAmount)}
                  </span>
                )}
              </div>
              
              {/* Currency label */}
              {showLabels && layout !== 'compact' && (
                <span className={cn(
                  'font-gaming-cyber text-xs uppercase tracking-wider opacity-80',
                  colorConfig.text
                )}>
                  {currency.name}
                </span>
              )}
            </div>
            
            {/* Recent gain animation */}
            {recentGain > 0 && isGaining && (
              <div className="absolute -top-6 right-0 animate-bounce">
                <div className={cn(
                  'px-2 py-1 rounded border font-gaming-mono text-xs',
                  'bg-gaming-dark/90',
                  colorConfig.border,
                  colorConfig.text
                )}>
                  +{formatAmount(recentGain)}
                </div>
              </div>
            )}
            
            {/* Max capacity warning */}
            {isAtMax && (
              <div className="absolute -top-1 -right-1">
                <div className="w-2 h-2 bg-gaming-neon-red rounded-full animate-pulse" />
              </div>
            )}
            
            {/* Glow effect for special currencies */}
            {currency.color === 'gems' && animated && (
              <div className="absolute inset-0 bg-gradient-to-r from-gaming-neon-pink/10 to-gaming-neon-cyan/10 rounded-lg animate-pulse opacity-50" />
            )}
          </div>
        );
      })}
      
      {/* Total wealth indicator (if applicable) */}
      {currencies.length > 1 && layout !== 'compact' && (
        <div className="flex items-center gap-1 px-2 py-1 bg-gaming-surface/20 border border-gaming-surface/30 rounded-lg">
          <span className="text-xs font-gaming-cyber text-gaming-neon-cyan uppercase">
            WEALTH
          </span>
          <div className="flex gap-1">
            {[...Array(Math.min(5, Math.max(1, Math.floor(currencies.reduce((sum, c) => sum + c.amount, 0) / 10000))))].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-gaming-neon-cyan rounded-full animate-pulse" 
                   style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};