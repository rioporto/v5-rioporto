'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface StatusEffect {
  id: string;
  name: string;
  type: 'buff' | 'debuff' | 'neutral';
  icon?: React.ReactNode;
  duration?: number; // in seconds, undefined for permanent
  stacks?: number;
  description?: string;
}

interface StatusIndicatorsProps {
  effects: StatusEffect[];
  layout?: 'horizontal' | 'vertical' | 'grid';
  size?: 'sm' | 'md' | 'lg';
  showTooltips?: boolean;
  showTimer?: boolean;
  maxVisible?: number;
  className?: string;
}

export const StatusIndicators: React.FC<StatusIndicatorsProps> = ({
  effects,
  layout = 'horizontal',
  size = 'md',
  showTooltips = true,
  showTimer = true,
  maxVisible = 8,
  className,
}) => {
  const [hoveredEffect, setHoveredEffect] = useState<string | null>(null);
  const [effectTimers, setEffectTimers] = useState<Record<string, number>>({});

  // Initialize timers for effects with duration
  useEffect(() => {
    const initialTimers: Record<string, number> = {};
    effects.forEach(effect => {
      if (effect.duration) {
        initialTimers[effect.id] = effect.duration;
      }
    });
    setEffectTimers(initialTimers);
  }, [effects]);

  // Update timers
  useEffect(() => {
    const interval = setInterval(() => {
      setEffectTimers(prev => {
        const updated = { ...prev };
        let hasChanges = false;
        
        Object.keys(updated).forEach(id => {
          if (updated[id] > 0) {
            updated[id] -= 1;
            hasChanges = true;
          }
        });
        
        return hasChanges ? updated : prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const typeStyles = {
    buff: {
      border: 'border-gaming-neon-green',
      bg: 'bg-gaming-neon-green/10',
      glow: 'shadow-[0_0_10px_rgba(0,255,0,0.4)]',
      text: 'text-gaming-neon-green',
    },
    debuff: {
      border: 'border-gaming-neon-red',
      bg: 'bg-gaming-neon-red/10',
      glow: 'shadow-[0_0_10px_rgba(255,51,51,0.4)]',
      text: 'text-gaming-neon-red',
    },
    neutral: {
      border: 'border-gaming-neon-cyan',
      bg: 'bg-gaming-neon-cyan/10',
      glow: 'shadow-[0_0_10px_rgba(0,245,255,0.4)]',
      text: 'text-gaming-neon-cyan',
    },
  };

  const sizeStyles = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  const layoutStyles = {
    horizontal: 'flex flex-wrap gap-1',
    vertical: 'flex flex-col gap-1',
    grid: 'grid grid-cols-4 gap-1',
  };

  const visibleEffects = effects.slice(0, maxVisible);
  const hiddenCount = effects.length - maxVisible;

  const formatTime = (seconds: number): string => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={cn('relative', className)}>
      <div className={layoutStyles[layout]}>
        {visibleEffects.map(effect => {
          const config = typeStyles[effect.type];
          const timeRemaining = effectTimers[effect.id];
          const isExpiring = timeRemaining && timeRemaining <= 5;
          const isHovered = hoveredEffect === effect.id;

          return (
            <div
              key={effect.id}
              className={cn(
                'relative border-2 rounded-lg flex items-center justify-center',
                'cursor-pointer transition-all duration-200 group',
                sizeStyles[size],
                config.border,
                config.bg,
                config.glow,
                isExpiring && 'animate-pulse',
                isHovered && 'scale-110 z-10'
              )}
              onMouseEnter={() => setHoveredEffect(effect.id)}
              onMouseLeave={() => setHoveredEffect(null)}
            >
              {/* Effect icon */}
              {effect.icon ? (
                <div className={cn('w-1/2 h-1/2', config.text)}>
                  {effect.icon}
                </div>
              ) : (
                <span className={cn('font-gaming-cyber uppercase', config.text)}>
                  {effect.name.charAt(0)}
                </span>
              )}
              
              {/* Stack count */}
              {effect.stacks && effect.stacks > 1 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gaming-dark border border-current rounded-full flex items-center justify-center">
                  <span className="text-xs font-gaming-mono text-white">
                    {effect.stacks}
                  </span>
                </div>
              )}
              
              {/* Timer */}
              {showTimer && timeRemaining !== undefined && timeRemaining > 0 && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                  <div className={cn(
                    'px-1 bg-gaming-dark/80 border border-current rounded text-xs font-gaming-mono',
                    config.text,
                    isExpiring && 'animate-pulse'
                  )}>
                    {formatTime(timeRemaining)}
                  </div>
                </div>
              )}
              
              {/* Expiring warning */}
              {isExpiring && (
                <div className="absolute inset-0 border-2 border-gaming-neon-yellow rounded-lg animate-ping opacity-50" />
              )}
              
              {/* Permanent indicator */}
              {!effect.duration && (
                <div className="absolute top-0 right-0 w-2 h-2 bg-gaming-neon-cyan rounded-full" />
              )}
            </div>
          );
        })}
        
        {/* Overflow indicator */}
        {hiddenCount > 0 && (
          <div className={cn(
            'border-2 border-dashed border-gaming-surface/50 rounded-lg',
            'flex items-center justify-center bg-gaming-surface/10',
            sizeStyles[size]
          )}>
            <span className="text-xs font-gaming-mono text-white/60">
              +{hiddenCount}
            </span>
          </div>
        )}
      </div>
      
      {/* Tooltip */}
      {showTooltips && hoveredEffect && (
        (() => {
          const effect = effects.find(e => e.id === hoveredEffect);
          if (!effect) return null;
          
          const config = typeStyles[effect.type];
          const timeRemaining = effectTimers[effect.id];
          
          return (
            <div className="absolute bottom-full left-0 mb-2 z-20 pointer-events-none">
              <div className={cn(
                'bg-gaming-dark/95 border-2 rounded-lg p-3 min-w-48',
                config.border,
                config.glow
              )}>
                <div className="space-y-2">
                  {/* Effect name and type */}
                  <div className="flex items-center justify-between">
                    <span className={cn('font-gaming-cyber uppercase', config.text)}>
                      {effect.name}
                    </span>
                    <span className={cn('text-xs font-gaming-mono capitalize', config.text)}>
                      {effect.type}
                    </span>
                  </div>
                  
                  {/* Description */}
                  {effect.description && (
                    <div className="text-sm text-white/80 font-gaming-mono">
                      {effect.description}
                    </div>
                  )}
                  
                  {/* Duration info */}
                  <div className="flex items-center justify-between text-xs font-gaming-mono text-white/60">
                    {effect.duration ? (
                      timeRemaining !== undefined ? (
                        <span>Remaining: {formatTime(timeRemaining)}</span>
                      ) : (
                        <span>Duration: {formatTime(effect.duration)}</span>
                      )
                    ) : (
                      <span>Permanent</span>
                    )}
                    
                    {effect.stacks && (
                      <span>Stacks: {effect.stacks}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })()
      )}
    </div>
  );
};