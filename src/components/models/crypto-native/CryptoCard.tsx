'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { gradientStyles } from '@/styles/gradients';

interface CryptoCardProps {
  children: React.ReactNode;
  variant?: 'glass' | 'neon' | 'holographic' | 'solid';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  glow?: boolean;
  blur?: boolean;
  animated?: boolean;
  className?: string;
  onClick?: () => void;
  onHover?: () => void;
}

export function CryptoCard({
  children,
  variant = 'glass',
  size = 'md',
  glow = true,
  blur = true,
  animated = true,
  className,
  onClick,
  onHover,
  ...props
}: CryptoCardProps) {
  const baseClasses = [
    'relative overflow-hidden rounded-2xl border transition-all duration-300',
    'font-primary',
    animated && 'transform-gpu',
    onClick && 'cursor-pointer',
    animated && 'hover:scale-[1.02] active:scale-[0.98]'
  ];

  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  };

  const variantClasses = {
    glass: [
      'bg-white/5 border-white/10',
      blur && 'backdrop-blur-md',
      glow && 'shadow-[0_8px_32px_rgba(0,0,0,0.3)]',
      animated && 'hover:bg-white/8 hover:border-white/20',
      glow && animated && 'hover:shadow-[0_12px_40px_rgba(153,69,255,0.2)]'
    ],
    neon: [
      'border-purple-400/30',
      blur && 'backdrop-blur-sm',
      glow && 'shadow-[0_0_30px_rgba(153,69,255,0.3)]',
      animated && 'hover:border-purple-400/50',
      glow && animated && 'hover:shadow-[0_0_50px_rgba(153,69,255,0.5)]'
    ],
    holographic: [
      'bg-gradient-to-br from-purple-500/5 via-pink-500/5 via-blue-500/5 to-green-500/5',
      'border-transparent relative',
      blur && 'backdrop-blur-md',
      'before:absolute before:inset-0 before:rounded-2xl before:p-[1px]',
      'before:bg-gradient-to-r before:from-purple-400 before:via-pink-400 before:via-blue-400 before:to-green-400',
      'before:opacity-30',
      animated && 'before:hover:opacity-60',
      'before:mask-composite-exclude',
      glow && 'shadow-[0_0_40px_rgba(153,69,255,0.2)]',
      glow && animated && 'hover:shadow-[0_0_60px_rgba(153,69,255,0.4)]'
    ],
    solid: [
      'bg-gray-900/80 border-gray-800',
      blur && 'backdrop-blur-sm',
      glow && 'shadow-[0_4px_20px_rgba(0,0,0,0.5)]',
      animated && 'hover:bg-gray-900/90 hover:border-gray-700',
      glow && animated && 'hover:shadow-[0_8px_30px_rgba(0,0,0,0.7)]'
    ]
  };

  const classes = cn(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    className
  );

  return (
    <div
      className={classes}
      style={variant === 'neon' ? gradientStyles.cryptoGradient : undefined}
      onClick={onClick}
      onMouseEnter={onHover}
      {...props}
    >
      {/* Holographic border effect */}
      {variant === 'holographic' && (
        <div className="absolute inset-[1px] rounded-2xl bg-black/50 backdrop-blur-md" />
      )}
      
      {/* Content container */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Shimmer animation for holographic cards */}
      {variant === 'holographic' && animated && (
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-pulse" />
        </div>
      )}
      
      {/* Glow pulse animation */}
      {glow && animated && (
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
      )}
      
      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-5 mix-blend-overlay rounded-2xl"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
}

interface CryptoCardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CryptoCardHeader({ children, className }: CryptoCardHeaderProps) {
  return (
    <div className={cn('mb-4 pb-3 border-b border-white/10', className)}>
      {children}
    </div>
  );
}

interface CryptoCardTitleProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export function CryptoCardTitle({ children, className, glow = false }: CryptoCardTitleProps) {
  return (
    <h3 className={cn(
      'text-lg font-semibold text-white font-display tracking-wide',
      glow && 'text-shadow-[0_0_10px_rgba(255,255,255,0.5)]',
      className
    )}>
      {children}
    </h3>
  );
}

interface CryptoCardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CryptoCardContent({ children, className }: CryptoCardContentProps) {
  return (
    <div className={cn('text-gray-200', className)}>
      {children}
    </div>
  );
}

interface CryptoCardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function CryptoCardFooter({ children, className }: CryptoCardFooterProps) {
  return (
    <div className={cn('mt-4 pt-3 border-t border-white/10', className)}>
      {children}
    </div>
  );
}