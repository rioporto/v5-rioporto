'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { CryptoBadge } from '../CryptoBadge';
import { GlowEffect } from '../effects/GlowEffect';

interface TokenData {
  symbol: string;
  name: string;
  logo?: string;
  balance?: string;
  usdValue?: string;
  change24h?: number;
  price?: string;
  network?: string;
  verified?: boolean;
}

interface TokenBadgeProps {
  token: TokenData;
  variant?: 'simple' | 'detailed' | 'price' | 'balance';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showLogo?: boolean;
  showChange?: boolean;
  showPrice?: boolean;
  showBalance?: boolean;
  interactive?: boolean;
  onClick?: () => void;
  className?: string;
}

export function TokenBadge({
  token,
  variant = 'simple',
  size = 'md',
  showLogo = true,
  showChange = false,
  showPrice = false,
  showBalance = false,
  interactive = false,
  onClick,
  className,
  ...props
}: TokenBadgeProps) {
  const sizeClasses = {
    xs: 'text-xs px-2 py-1',
    sm: 'text-sm px-2.5 py-1.5',
    md: 'text-sm px-3 py-2',
    lg: 'text-base px-4 py-2.5'
  };

  const logoSizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const getChangeColor = (change?: number) => {
    if (!change) return 'gray';
    return change >= 0 ? 'green' : 'red';
  };

  const getNetworkColor = (network?: string) => {
    const colors: Record<string, 'purple' | 'blue' | 'yellow' | 'red' | 'green' | 'gray'> = {
      ethereum: 'blue',
      bitcoin: 'yellow',
      polygon: 'purple',
      binance: 'yellow',
      solana: 'green',
      avalanche: 'red'
    };
    return colors[network?.toLowerCase() || ''] || 'gray';
  };

  if (variant === 'simple') {
    const badge = (
      <CryptoBadge
        variant="glass"
        color="purple"
        size={size}
        glow={token.verified}
        animated={interactive}
        className={cn(
          'inline-flex items-center gap-1.5',
          interactive && 'cursor-pointer hover:scale-105',
          className
        )}
        {...props}
      >
        {showLogo && token.logo && (
          <img
            src={token.logo}
            alt={token.symbol}
            className={cn('rounded-full', logoSizeClasses[size])}
          />
        )}
        <span className="font-mono font-semibold">{token.symbol}</span>
        {token.verified && (
          <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        )}
      </CryptoBadge>
    );
    
    if (onClick) {
      return <span onClick={onClick}>{badge}</span>;
    }
    return badge;
  }

  if (variant === 'price') {
    return (
      <div 
        className={cn(
          'bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg',
          sizeClasses[size],
          'flex items-center gap-2 min-w-0',
          interactive && 'cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-200',
          className
        )}
        onClick={onClick}
        {...props}
      >
        {showLogo && token.logo && (
          <img
            src={token.logo}
            alt={token.symbol}
            className={cn('rounded-full flex-shrink-0', logoSizeClasses[size])}
          />
        )}
        
        <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <div className="font-mono font-semibold text-white flex items-center gap-1">
              {token.symbol}
              {token.verified && (
                <svg className="w-3 h-3 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            {size !== 'xs' && (
              <div className="text-xs text-gray-400 truncate">
                {token.name}
              </div>
            )}
          </div>
          
          <div className="text-right flex-shrink-0">
            {token.price && (
              <div className="font-mono font-semibold text-white">
                ${token.price}
              </div>
            )}
            {showChange && token.change24h !== undefined && (
              <div className={cn(
                'text-xs font-mono font-medium',
                token.change24h >= 0 ? 'text-green-400' : 'text-red-400'
              )}>
                {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'balance') {
    return (
      <div 
        className={cn(
          'bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg',
          sizeClasses[size],
          'flex items-center gap-3 min-w-0',
          interactive && 'cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-200',
          className
        )}
        onClick={onClick}
        {...props}
      >
        {showLogo && token.logo && (
          <div className="relative flex-shrink-0">
            <img
              src={token.logo}
              alt={token.symbol}
              className={cn('rounded-full', logoSizeClasses[size])}
            />
            {token.verified && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full flex items-center justify-center">
                <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
        )}
        
        <div className="flex-1 min-w-0 flex items-center justify-between">
          <div className="min-w-0">
            <div className="font-mono font-semibold text-white text-sm">
              {token.symbol}
            </div>
            {size !== 'xs' && (
              <div className="text-xs text-gray-400 truncate">
                {token.name}
              </div>
            )}
          </div>
          
          <div className="text-right flex-shrink-0">
            {token.balance && (
              <div className="font-mono font-semibold text-white">
                {token.balance}
              </div>
            )}
            {token.usdValue && (
              <div className="text-xs text-gray-400 font-mono">
                ${token.usdValue}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Detailed variant
  return (
    <div 
      className={cn(
        'bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4',
        'min-w-0 space-y-3',
        interactive && 'cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-200 hover:scale-[1.02]',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        {showLogo && token.logo && (
          <div className="relative">
            <img
              src={token.logo}
              alt={token.symbol}
              className="w-8 h-8 rounded-full"
            />
            {token.verified && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-mono font-bold text-white">
              {token.symbol}
            </h3>
            {token.network && (
              <CryptoBadge
                variant="outline"
                color={getNetworkColor(token.network)}
                size="xs"
              >
                {token.network}
              </CryptoBadge>
            )}
          </div>
          <p className="text-sm text-gray-400 truncate">
            {token.name}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        {token.price && (
          <div>
            <div className="text-xs text-gray-400 uppercase tracking-wider font-mono">
              Price
            </div>
            <div className="font-mono font-semibold text-white">
              ${token.price}
            </div>
          </div>
        )}
        
        {showChange && token.change24h !== undefined && (
          <div>
            <div className="text-xs text-gray-400 uppercase tracking-wider font-mono">
              24h Change
            </div>
            <div className={cn(
              'font-mono font-semibold flex items-center gap-1',
              token.change24h >= 0 ? 'text-green-400' : 'text-red-400'
            )}>
              {token.change24h >= 0 ? (
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 4.414 6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L10 15.586l3.293-3.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
              {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
            </div>
          </div>
        )}
        
        {showBalance && token.balance && (
          <div className="col-span-2">
            <div className="text-xs text-gray-400 uppercase tracking-wider font-mono">
              Balance
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-mono font-semibold text-white text-lg">
                {token.balance}
              </span>
              <span className="font-mono text-purple-300">
                {token.symbol}
              </span>
            </div>
            {token.usdValue && (
              <div className="text-sm text-gray-400 font-mono">
                ≈ ${token.usdValue} USD
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

interface TokenListProps {
  tokens: TokenData[];
  variant?: 'simple' | 'detailed' | 'price' | 'balance';
  showChange?: boolean;
  showPrice?: boolean;
  showBalance?: boolean;
  onTokenClick?: (token: TokenData) => void;
  className?: string;
}

export function TokenList({
  tokens,
  variant = 'balance',
  showChange = true,
  showPrice = true,
  showBalance = true,
  onTokenClick,
  className,
  ...props
}: TokenListProps) {
  return (
    <div className={cn('space-y-2', className)} {...props}>
      {tokens.map((token, index) => (
        <TokenBadge
          key={`${token.symbol}-${index}`}
          token={token}
          variant={variant}
          showChange={showChange}
          showPrice={showPrice}
          showBalance={showBalance}
          interactive={!!onTokenClick}
          onClick={() => onTokenClick?.(token)}
        />
      ))}
    </div>
  );
}