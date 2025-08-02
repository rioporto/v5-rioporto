'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ManaBarProps {
  current: number;
  max: number;
  label?: string;
  variant?: 'mana' | 'energy' | 'power' | 'fuel';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  showValue?: boolean;
  regenerating?: boolean;
  className?: string;
}

export const ManaBar: React.FC<ManaBarProps> = ({
  current,
  max,
  label = 'MANA',
  variant = 'mana',
  size = 'md',
  animated = true,
  showValue = true,
  regenerating = false,
  className,
}) => {
  const [displayValue, setDisplayValue] = useState(current);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const percentage = Math.max(0, Math.min(100, (current / max) * 100));
  const isEmpty = percentage === 0;
  const isFull = percentage === 100;

  useEffect(() => {
    if (animated && displayValue !== current) {
      const duration = 400;
      const steps = 15;
      const stepValue = (current - displayValue) / steps;
      
      let step = 0;
      const interval = setInterval(() => {
        step++;
        setDisplayValue(prev => {
          const newValue = prev + stepValue;
          if (step >= steps) {
            clearInterval(interval);
            return current;
          }
          return newValue;
        });
      }, duration / steps);
      
      return () => clearInterval(interval);
    }
  }, [current, displayValue, animated]);

  // Particle effect for regeneration
  useEffect(() => {
    if (regenerating && animated) {
      const interval = setInterval(() => {
        const newParticle = {
          id: Date.now() + Math.random(),
          x: Math.random() * 100,
          y: 100,
        };
        
        setParticles(prev => [...prev.slice(-5), newParticle]);
        
        setTimeout(() => {
          setParticles(prev => prev.filter(p => p.id !== newParticle.id));
        }, 1000);
      }, 200);
      
      return () => clearInterval(interval);
    }
  }, [regenerating, animated]);

  const variantStyles = {
    mana: {
      color: 'bg-gaming-neon-cyan',
      border: 'border-gaming-neon-cyan',
      glow: 'shadow-[0_0_15px_rgba(0,245,255,0.6)]',
      text: 'text-gaming-neon-cyan',
      gradient: 'from-gaming-neon-cyan to-blue-400',
    },
    energy: {
      color: 'bg-gaming-neon-yellow',
      border: 'border-gaming-neon-yellow',
      glow: 'shadow-[0_0_15px_rgba(255,255,0,0.6)]',
      text: 'text-gaming-neon-yellow',
      gradient: 'from-gaming-neon-yellow to-yellow-400',
    },
    power: {
      color: 'bg-gaming-neon-pink',
      border: 'border-gaming-neon-pink',
      glow: 'shadow-[0_0_15px_rgba(255,0,110,0.6)]',
      text: 'text-gaming-neon-pink',
      gradient: 'from-gaming-neon-pink to-purple-400',
    },
    fuel: {
      color: 'bg-gaming-neon-green',
      border: 'border-gaming-neon-green',
      glow: 'shadow-[0_0_15px_rgba(0,255,0,0.6)]',
      text: 'text-gaming-neon-green',
      gradient: 'from-gaming-neon-green to-green-400',
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
        <div className="flex items-center gap-2">
          <span className={cn(
            'font-gaming-cyber uppercase tracking-wider',
            sizeConfig.text,
            config.text
          )}>
            {label}
          </span>
          {regenerating && (
            <div className="flex items-center gap-1">
              <div className={cn(
                'w-1 h-1 rounded-full animate-pulse',
                config.color
              )} />
              <span className={cn(
                'text-xs font-gaming-mono uppercase',
                config.text
              )}>
                REGEN
              </span>
            </div>
          )}
        </div>
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
      
      {/* Mana bar container */}
      <div className={cn(
        'relative bg-gaming-surface/50 border rounded-sm overflow-hidden',
        sizeConfig.height,
        config.border,
        config.glow
      )}>
        {/* Background energy pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(0,245,255,0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 50%, rgba(0,245,255,0.3) 0%, transparent 50%),
              linear-gradient(90deg, transparent 0%, rgba(0,245,255,0.1) 50%, transparent 100%)
            `,
          }}
        />
        
        {/* Mana bar fill */}
        <div
          className={cn(
            'h-full transition-all duration-400 ease-out relative overflow-hidden',
            `bg-gradient-to-r ${config.gradient}`,
            isEmpty && 'opacity-20'
          )}
          style={{ width: `${percentage}%` }}
        >
          {/* Flowing energy effect */}
          {animated && !isEmpty && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" 
                 style={{ animationDuration: '2s' }} />
          )}
          
          {/* Energy crackles */}
          {percentage > 0 && (
            <div className="absolute inset-0">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'absolute w-px h-full opacity-60 animate-pulse',
                    config.color
                  )}
                  style={{
                    left: `${20 + i * 30}%`,
                    animationDelay: `${i * 0.3}s`,
                  }}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Regenerating particles */}
        {regenerating && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map(particle => (
              <div
                key={particle.id}
                className={cn(
                  'absolute w-1 h-1 rounded-full animate-bounce',
                  config.color
                )}
                style={{
                  left: `${particle.x}%`,
                  bottom: '0%',
                  animationDuration: '1s',
                  animationTimingFunction: 'ease-out',
                }}
              />
            ))}
          </div>
        )}
        
        {/* Power level indicators */}
        <div className="absolute inset-0 flex">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={cn(
                'flex-1 border-r border-gaming-surface/20 last:border-r-0',
                percentage > (i + 1) * 25 && 'border-white/20'
              )}
            />
          ))}
        </div>
        
        {/* Full power effect */}
        {isFull && animated && (
          <div className="absolute inset-0 bg-white/20 animate-pulse" 
               style={{ animationDuration: '0.5s' }} />
        )}
        
        {/* Empty state overlay */}
        {isEmpty && (
          <div className="absolute inset-0 bg-gaming-surface/50 flex items-center justify-center">
            <span className="text-white/30 font-gaming-mono text-xs uppercase">
              DEPLETED
            </span>
          </div>
        )}
      </div>
      
      {/* Status indicators */}
      <div className="flex items-center justify-between mt-1">
        {/* Empty warning */}
        {isEmpty && (
          <div className="flex items-center gap-1">
            <div className="w-1 h-1 bg-gaming-neon-red rounded-full animate-pulse" />
            <span className="text-gaming-neon-red font-gaming-mono text-xs uppercase animate-pulse">
              EMPTY
            </span>
          </div>
        )}
        
        {/* Full indicator */}
        {isFull && (
          <div className="flex items-center gap-1">
            <div className={cn(
              'w-1 h-1 rounded-full animate-pulse',
              config.color
            )} />
            <span className={cn(
              'font-gaming-mono text-xs uppercase',
              config.text
            )}>
              MAX
            </span>
          </div>
        )}
        
        {/* Percentage for large size */}
        {size === 'lg' && (
          <span className={cn(
            'font-gaming-mono text-xs tabular-nums',
            config.text
          )}>
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    </div>
  );
};