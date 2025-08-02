'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { PriceDisplay } from '../PriceDisplay';

export interface TickerItem {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  changePercent24h: number;
  volume24h: number;
  high24h?: number;
  low24h?: number;
}

export interface MarketTickerProps {
  className?: string;
  items: TickerItem[];
  speed?: 'slow' | 'normal' | 'fast';
  pauseOnHover?: boolean;
  showVolume?: boolean;
  onItemClick?: (item: TickerItem) => void;
  loading?: boolean;
}

export function MarketTicker({
  className,
  items,
  speed = 'normal',
  pauseOnHover = true,
  showVolume = true,
  onItemClick,
  loading = false,
}: MarketTickerProps) {
  const [isPaused, setIsPaused] = useState(false);
  const tickerRef = useRef<HTMLDivElement>(null);

  const speedClasses = {
    slow: 'animate-scroll-slow',
    normal: 'animate-scroll',
    fast: 'animate-scroll-fast',
  };

  // Auto-scroll implementation would need CSS animations
  useEffect(() => {
    if (!tickerRef.current) return;

    const style = document.createElement('style');
    style.textContent = `
      @keyframes scroll {
        0% { transform: translateX(100%); }
        100% { transform: translateX(-100%); }
      }
      
      .animate-scroll {
        animation: scroll 60s linear infinite;
      }
      
      .animate-scroll-slow {
        animation: scroll 90s linear infinite;
      }
      
      .animate-scroll-fast {
        animation: scroll 30s linear infinite;
      }
      
      .animate-scroll.paused,
      .animate-scroll-slow.paused,
      .animate-scroll-fast.paused {
        animation-play-state: paused;
      }
    `;
    
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const formatVolume = (volume: number) => {
    return new Intl.NumberFormat('pt-BR', {
      notation: 'compact',
      compactDisplay: 'short',
      maximumFractionDigits: 1,
    }).format(volume);
  };

  const renderTickerItem = (item: TickerItem, index: number) => {
    const isPositive = item.changePercent24h >= 0;
    
    return (
      <div
        key={`${item.symbol}-${index}`}
        className={cn(
          'flex items-center space-x-3 px-4 py-2 border-r border-border/50',
          'hover:bg-muted/20 transition-colors duration-150',
          onItemClick && 'cursor-pointer'
        )}
        onClick={() => onItemClick?.(item)}
      >
        {/* Symbol */}
        <div className="flex flex-col">
          <span className="font-mono text-xs font-semibold text-foreground">
            {item.symbol}
          </span>
          <span className="font-mono text-[10px] text-muted-foreground uppercase">
            {item.name}
          </span>
        </div>

        {/* Price */}
        <div className="flex flex-col items-end">
          <PriceDisplay
            price={item.price}
            size="sm"
            currency="BRL"
            precision={2}
          />
          
          {/* Change */}
          <div className="flex items-center space-x-1">
            <div
              className={cn(
                'flex items-center justify-center w-2 h-2',
                isPositive ? 'text-success' : 'text-error'
              )}
            >
              {isPositive ? (
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
                'font-mono text-[10px] font-medium tabular-nums',
                isPositive ? 'text-success' : 'text-error'
              )}
            >
              {isPositive ? '+' : ''}{item.changePercent24h.toFixed(2)}%
            </span>
          </div>
        </div>

        {/* Volume */}
        {showVolume && (
          <div className="flex flex-col items-end">
            <span className="font-mono text-[10px] text-muted-foreground">
              VOL
            </span>
            <span className="font-mono text-xs text-foreground">
              {formatVolume(item.volume24h)}
            </span>
          </div>
        )}

        {/* 24h High/Low */}
        {(item.high24h !== undefined || item.low24h !== undefined) && (
          <div className="flex flex-col items-end space-y-0.5">
            {item.high24h !== undefined && (
              <div className="flex items-center space-x-1">
                <span className="font-mono text-[10px] text-muted-foreground">H</span>
                <span className="font-mono text-[10px] text-success tabular-nums">
                  {item.high24h.toFixed(2)}
                </span>
              </div>
            )}
            {item.low24h !== undefined && (
              <div className="flex items-center space-x-1">
                <span className="font-mono text-[10px] text-muted-foreground">L</span>
                <span className="font-mono text-[10px] text-error tabular-nums">
                  {item.low24h.toFixed(2)}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className={cn('h-12 bg-muted/10 border-y border-border', className)}>
        <div className="flex items-center justify-center h-full">
          <div className="flex space-x-1">
            <div className="h-1 w-1 bg-primary rounded-full animate-pulse"></div>
            <div className="h-1 w-1 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
            <div className="h-1 w-1 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-card border-y border-border h-12',
        className
      )}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <div
        ref={tickerRef}
        className={cn(
          'flex items-center whitespace-nowrap',
          speedClasses[speed],
          isPaused && 'paused'
        )}
      >
        {/* Duplicate items for seamless loop */}
        {[...items, ...items].map((item, index) => renderTickerItem(item, index))}
      </div>
      
      {/* Gradient overlays for smooth edges */}
      <div className="absolute left-0 top-0 w-8 h-full bg-gradient-to-r from-card to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 w-8 h-full bg-gradient-to-l from-card to-transparent pointer-events-none" />
    </div>
  );
}