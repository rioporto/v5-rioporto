'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface HealthBarProps {
  current: number;
  max: number;
  label?: string;
  variant?: 'health' | 'shield' | 'armor';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  showValue?: boolean;
  critical?: boolean;
  className?: string;
}

export const HealthBar: React.FC<HealthBarProps> = ({
  current,
  max,
  label = 'HEALTH',
  variant = 'health',
  size = 'md',
  animated = true,
  showValue = true,
  critical = false,
  className,
}) => {
  const [displayValue, setDisplayValue] = useState(current);
  const [isAnimating, setIsAnimating] = useState(false);

  const percentage = Math.max(0, Math.min(100, (current / max) * 100));
  const isCritical = critical || percentage <= 25;
  const isLow = percentage <= 50;

  useEffect(() => {
    if (animated && displayValue !== current) {
      setIsAnimating(true);
      const duration = 500;
      const steps = 20;
      const stepValue = (current - displayValue) / steps;
      
      let step = 0;
      const interval = setInterval(() => {
        step++;
        setDisplayValue(prev => {
          const newValue = prev + stepValue;
          if (step >= steps) {
            clearInterval(interval);
            setIsAnimating(false);
            return current;
          }
          return newValue;
        });
      }, duration / steps);
      
      return () => clearInterval(interval);
    }
  }, [current, displayValue, animated]);

  const variantStyles = {
    health: {
      color: isCritical ? 'bg-gaming-neon-red' : isLow ? 'bg-gaming-neon-yellow' : 'bg-gaming-neon-green',
      border: isCritical ? 'border-gaming-neon-red' : isLow ? 'border-gaming-neon-yellow' : 'border-gaming-neon-green',
      glow: isCritical ? 'shadow-[0_0_15px_rgba(255,51,51,0.6)]' : isLow ? 'shadow-[0_0_15px_rgba(255,255,0,0.6)]' : 'shadow-[0_0_15px_rgba(0,255,0,0.6)]',
      text: isCritical ? 'text-gaming-neon-red' : isLow ? 'text-gaming-neon-yellow' : 'text-gaming-neon-green',
    },
    shield: {
      color: 'bg-gaming-neon-cyan',
      border: 'border-gaming-neon-cyan',
      glow: 'shadow-[0_0_15px_rgba(0,245,255,0.6)]',
      text: 'text-gaming-neon-cyan',
    },
    armor: {
      color: 'bg-gaming-neon-yellow',
      border: 'border-gaming-neon-yellow',
      glow: 'shadow-[0_0_15px_rgba(255,255,0,0.6)]',
      text: 'text-gaming-neon-yellow',
    },
  };

  const sizeStyles = {
    sm: { height: 'h-2', text: 'text-xs', padding: 'px-2 py-1' },
    md: { height: 'h-3', text: 'text-sm', padding: 'px-3 py-1.5' },
    lg: { height: 'h-4', text: 'text-base', padding: 'px-4 py-2' },
  };

  const config = variantStyles[variant];
  const sizeConfig = sizeStyles[size];

  return (
    <div className={cn('relative', className)}>
      {/* Label and value */}
      <div className="flex items-center justify-between mb-1">
        <span className={cn(
          'font-gaming-cyber uppercase tracking-wider',
          sizeConfig.text,
          config.text
        )}>
          {label}
        </span>
        {showValue && (
          <span className={cn(
            'font-gaming-mono tabular-nums',
            sizeConfig.text,
            config.text
          )}>
            {Math.round(displayValue)}/{max}
          </span>
        )}
      </div>
      
      {/* Health bar container */}
      <div className={cn(
        'relative bg-gaming-surface/50 border rounded-sm overflow-hidden',
        sizeConfig.height,
        config.border,
        config.glow
      )}>
        {/* Background grid pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 4px,
                rgba(255,255,255,0.1) 4px,
                rgba(255,255,255,0.1) 5px
              )
            `,
          }}
        />
        
        {/* Health bar fill */}
        <div
          className={cn(
            'h-full transition-all duration-500 ease-out relative overflow-hidden',
            config.color,
            isAnimating && 'transition-all duration-300'
          )}
          style={{ width: `${percentage}%` }}
        >
          {/* Animated shine effect */}
          {animated && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-pulse" />
          )}
          
          {/* Pulse effect for critical health */}
          {isCritical && (
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
          )}
        </div>
        
        {/* Damage/heal flash effect */}
        {isAnimating && (
          <div className="absolute inset-0 bg-white/30 animate-ping" />
        )}
        
        {/* Segment dividers */}
        <div className="absolute inset-0 flex">
          {[...Array(Math.floor(max / 25))].map((_, i) => (
            <div
              key={i}
              className="flex-1 border-r border-gaming-surface/30 last:border-r-0"
            />
          ))}
        </div>
        
        {/* Critical warning overlay */}
        {isCritical && (
          <div className="absolute inset-0 bg-gradient-to-r from-gaming-neon-red/20 to-transparent animate-pulse" />
        )}
      </div>
      
      {/* Critical warning text */}
      {isCritical && (
        <div className="flex items-center gap-1 mt-1">
          <div className="w-1 h-1 bg-gaming-neon-red rounded-full animate-pulse" />
          <span className="text-gaming-neon-red font-gaming-mono text-xs uppercase animate-pulse">
            CRITICAL
          </span>
        </div>
      )}
      
      {/* Percentage indicator */}
      {size === 'lg' && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <span className={cn(
            'font-gaming-mono text-xs tabular-nums',
            config.text
          )}>
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  );
};