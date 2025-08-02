'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface GamingBadgeProps {
  children: React.ReactNode;
  variant?: 'achievement' | 'rank' | 'status' | 'level' | 'rarity';
  rarity?: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  glowing?: boolean;
  newBadge?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export const GamingBadge: React.FC<GamingBadgeProps> = ({
  children,
  variant = 'achievement',
  rarity = 'common',
  size = 'md',
  animated = true,
  glowing = false,
  newBadge = false,
  icon,
  className,
}) => {
  const [showNewEffect, setShowNewEffect] = useState(newBadge);
  const [pulsePhase, setPulsePhase] = useState(0);

  useEffect(() => {
    if (newBadge) {
      setShowNewEffect(true);
      const timer = setTimeout(() => setShowNewEffect(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [newBadge]);

  useEffect(() => {
    if (animated && glowing) {
      const interval = setInterval(() => {
        setPulsePhase(prev => (prev + 1) % 3);
      }, 800);
      return () => clearInterval(interval);
    }
  }, [animated, glowing]);

  const variantStyles = {
    achievement: {
      bg: 'bg-gaming-neon-yellow/10',
      border: 'border-gaming-neon-yellow',
      text: 'text-gaming-neon-yellow',
      glow: 'shadow-[0_0_15px_rgba(255,255,0,0.4)]',
    },
    rank: {
      bg: 'bg-gaming-neon-cyan/10',
      border: 'border-gaming-neon-cyan',
      text: 'text-gaming-neon-cyan',
      glow: 'shadow-[0_0_15px_rgba(0,245,255,0.4)]',
    },
    status: {
      bg: 'bg-gaming-neon-green/10',
      border: 'border-gaming-neon-green',
      text: 'text-gaming-neon-green',
      glow: 'shadow-[0_0_15px_rgba(0,255,0,0.4)]',
    },
    level: {
      bg: 'bg-gaming-neon-pink/10',
      border: 'border-gaming-neon-pink',
      text: 'text-gaming-neon-pink',
      glow: 'shadow-[0_0_15px_rgba(255,0,110,0.4)]',
    },
    rarity: {
      bg: 'bg-gaming-surface/80',
      border: 'border-white/50',
      text: 'text-white',
      glow: 'shadow-[0_0_15px_rgba(255,255,255,0.2)]',
    },
  };

  const rarityStyles = {
    common: {
      bg: 'bg-gray-500/10',
      border: 'border-gray-400',
      text: 'text-gray-300',
      glow: 'shadow-[0_0_10px_rgba(156,163,175,0.3)]',
    },
    rare: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-400',
      text: 'text-blue-300',
      glow: 'shadow-[0_0_15px_rgba(59,130,246,0.4)]',
    },
    epic: {
      bg: 'bg-purple-500/10',
      border: 'border-purple-400',
      text: 'text-purple-300',
      glow: 'shadow-[0_0_20px_rgba(147,51,234,0.5)]',
    },
    legendary: {
      bg: 'bg-orange-500/10',
      border: 'border-orange-400',
      text: 'text-orange-300',
      glow: 'shadow-[0_0_25px_rgba(251,146,60,0.6)]',
    },
    mythic: {
      bg: 'bg-gradient-to-r from-gaming-neon-pink/10 to-gaming-neon-cyan/10',
      border: 'border-gaming-neon-pink',
      text: 'bg-gradient-to-r from-gaming-neon-pink to-gaming-neon-cyan bg-clip-text text-transparent',
      glow: 'shadow-[0_0_30px_rgba(255,0,110,0.4),0_0_30px_rgba(0,245,255,0.4)]',
    },
  };

  const sizeStyles = {
    sm: {
      padding: 'px-2 py-1',
      text: 'text-xs',
      icon: 'w-3 h-3',
    },
    md: {
      padding: 'px-3 py-1.5',
      text: 'text-sm',
      icon: 'w-4 h-4',
    },
    lg: {
      padding: 'px-4 py-2',
      text: 'text-base',
      icon: 'w-5 h-5',
    },
  };

  // Use rarity styles if variant is 'rarity', otherwise use variant styles
  const styleConfig = variant === 'rarity' ? rarityStyles[rarity] : variantStyles[variant];
  const sizeConfig = sizeStyles[size];

  return (
    <div className={cn('relative inline-block', className)}>
      <div className={cn(
        // Base styles
        'relative inline-flex items-center gap-1.5 rounded border',
        'font-gaming-cyber uppercase tracking-wider transition-all duration-300',
        
        // Size styles
        sizeConfig.padding,
        sizeConfig.text,
        
        // Theme styles
        styleConfig.bg,
        styleConfig.border,
        styleConfig.text,
        
        // Effects
        glowing && styleConfig.glow,
        animated && 'hover:scale-105',
        
        // Pulse animation for glowing badges
        glowing && pulsePhase === 0 && 'animate-pulse',
        
        className
      )}>
        {/* Icon */}
        {icon && (
          <div className={cn('flex-shrink-0', sizeConfig.icon)}>
            {icon}
          </div>
        )}
        
        {/* Content */}
        <span className="relative z-10">
          {children}
        </span>
        
        {/* Shine effect for mythic rarity */}
        {variant === 'rarity' && rarity === 'mythic' && animated && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse opacity-50" />
        )}
        
        {/* Corner decorations for higher rarities */}
        {variant === 'rarity' && (rarity === 'legendary' || rarity === 'mythic') && (
          <>
            <div className="absolute top-0 left-0 w-1 h-1 bg-current rounded-full" />
            <div className="absolute top-0 right-0 w-1 h-1 bg-current rounded-full" />
            <div className="absolute bottom-0 left-0 w-1 h-1 bg-current rounded-full" />
            <div className="absolute bottom-0 right-0 w-1 h-1 bg-current rounded-full" />
          </>
        )}
      </div>
      
      {/* New badge effect */}
      {showNewEffect && (
        <div className="absolute -top-1 -right-1">
          <div className="relative">
            <div className="w-3 h-3 bg-gaming-neon-green rounded-full animate-ping" />
            <div className="absolute inset-0 w-3 h-3 bg-gaming-neon-green rounded-full animate-pulse" />
          </div>
        </div>
      )}
      
      {/* Floating particles for mythic */}
      {variant === 'rarity' && rarity === 'mythic' && animated && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-bounce opacity-60"
              style={{
                left: `${20 + i * 30}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: '2s',
              }}
            />
          ))}
        </div>
      )}
      
      {/* Achievement unlock effect */}
      {variant === 'achievement' && showNewEffect && (
        <div className="absolute inset-0 -m-2">
          <div className="w-full h-full border-2 border-gaming-neon-yellow rounded animate-ping opacity-50" />
        </div>
      )}
    </div>
  );
};