'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export interface MarketStatus {
  isOpen: boolean;
  nextOpen?: string;
  nextClose?: string;
}

export interface FinancialHeaderProps {
  className?: string;
  title: string;
  marketData?: {
    btcPrice?: number;
    btcChange?: number;
    volume24h?: number;
    marketCap?: number;
  };
  userBalance?: {
    brl?: number;
    btc?: number;
  };
  showMarketStatus?: boolean;
}

export function FinancialHeader({
  className,
  title,
  marketData,
  userBalance,
  showMarketStatus = true,
}: FinancialHeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [marketStatus, setMarketStatus] = useState<MarketStatus>({ isOpen: true });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Simulate market status (crypto markets are always open)
  useEffect(() => {
    setMarketStatus({ isOpen: true });
  }, []);

  const formatCurrency = (value: number, currency: 'BRL' | 'BTC' = 'BRL') => {
    if (currency === 'BRL') {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(value);
    }
    return `${value.toFixed(8)} BTC`;
  };

  const formatPercentage = (value: number) => {
    const isPositive = value >= 0;
    return (
      <span
        className={cn(
          'font-mono text-xs',
          isPositive ? 'text-success' : 'text-error'
        )}
      >
        {isPositive ? '+' : ''}{value.toFixed(2)}%
      </span>
    );
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full',
        'bg-background/95 backdrop-blur-sm',
        'border-b border-border',
        className
      )}
    >
      <div className="flex h-12 items-center justify-between px-4">
        {/* Left Section - Title and Market Status */}
        <div className="flex items-center space-x-4">
          <h1 className="font-mono text-lg font-semibold text-foreground">
            {title}
          </h1>
          
          {showMarketStatus && (
            <div className="flex items-center space-x-2">
              <div
                className={cn(
                  'h-2 w-2 rounded-full',
                  marketStatus.isOpen ? 'bg-success animate-pulse' : 'bg-error'
                )}
              />
              <span className="text-xs text-muted-foreground font-mono">
                {marketStatus.isOpen ? 'LIVE' : 'CLOSED'}
              </span>
            </div>
          )}
        </div>

        {/* Center Section - Market Data */}
        {marketData && (
          <div className="hidden md:flex items-center space-x-6">
            {marketData.btcPrice && (
              <div className="flex items-center space-x-2">
                <span className="text-xs text-muted-foreground font-mono">BTC</span>
                <span className="font-mono text-sm font-medium">
                  {formatCurrency(marketData.btcPrice)}
                </span>
                {marketData.btcChange !== undefined && (
                  formatPercentage(marketData.btcChange)
                )}
              </div>
            )}
            
            {marketData.volume24h && (
              <div className="flex items-center space-x-2">
                <span className="text-xs text-muted-foreground font-mono">VOL 24H</span>
                <span className="font-mono text-sm">
                  {formatCurrency(marketData.volume24h)}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Right Section - User Balance and Time */}
        <div className="flex items-center space-x-4">
          {userBalance && (
            <div className="hidden sm:flex items-center space-x-4">
              {userBalance.brl && (
                <div className="text-right">
                  <div className="text-xs text-muted-foreground font-mono">BRL</div>
                  <div className="font-mono text-sm font-medium">
                    {formatCurrency(userBalance.brl)}
                  </div>
                </div>
              )}
              
              {userBalance.btc && (
                <div className="text-right">
                  <div className="text-xs text-muted-foreground font-mono">BTC</div>
                  <div className="font-mono text-sm font-medium">
                    {formatCurrency(userBalance.btc, 'BTC')}
                  </div>
                </div>
              )}
            </div>
          )}
          
          <div className="text-right">
            <div className="text-xs text-muted-foreground font-mono">UTC</div>
            <div className="font-mono text-sm font-medium">
              {currentTime.toLocaleTimeString('en-US', { 
                timeZone: 'UTC',
                hour12: false 
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Market Data */}
      {marketData && (
        <div className="md:hidden border-t border-border px-4 py-2">
          <div className="flex items-center justify-between text-xs">
            {marketData.btcPrice && (
              <div className="flex items-center space-x-2">
                <span className="text-muted-foreground font-mono">BTC</span>
                <span className="font-mono font-medium">
                  {formatCurrency(marketData.btcPrice)}
                </span>
                {marketData.btcChange !== undefined && (
                  formatPercentage(marketData.btcChange)
                )}
              </div>
            )}
            
            {marketData.volume24h && (
              <div className="flex items-center space-x-2">
                <span className="text-muted-foreground font-mono">VOL 24H</span>
                <span className="font-mono">
                  {formatCurrency(marketData.volume24h)}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}