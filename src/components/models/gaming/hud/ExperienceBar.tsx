'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ExperienceBarProps {
  currentXP: number;
  totalXP: number;
  level: number;
  nextLevelXP?: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  showLevel?: boolean;
  showPercentage?: boolean;
  gainedXP?: number;
  className?: string;
}

export const ExperienceBar: React.FC<ExperienceBarProps> = ({
  currentXP,
  totalXP,
  level,
  nextLevelXP,
  label = 'EXPERIENCE',
  size = 'md',
  animated = true,
  showLevel = true,
  showPercentage = true,
  gainedXP = 0,
  className,
}) => {
  const [displayXP, setDisplayXP] = useState(currentXP);
  const [showGainAnimation, setShowGainAnimation] = useState(false);
  const [levelUpEffect, setLevelUpEffect] = useState(false);

  const percentage = Math.max(0, Math.min(100, (currentXP / totalXP) * 100));
  const xpToNext = nextLevelXP ? nextLevelXP - currentXP : totalXP - currentXP;

  useEffect(() => {
    if (animated && displayXP !== currentXP) {
      const duration = 800;
      const steps = 30;
      const stepValue = (currentXP - displayXP) / steps;
      
      let step = 0;
      const interval = setInterval(() => {
        step++;
        setDisplayXP(prev => {
          const newValue = prev + stepValue;
          if (step >= steps) {
            clearInterval(interval);
            return currentXP;
          }
          return newValue;
        });
      }, duration / steps);
      
      return () => clearInterval(interval);
    }
  }, [currentXP, displayXP, animated]);

  useEffect(() => {
    if (gainedXP > 0) {
      setShowGainAnimation(true);
      setTimeout(() => setShowGainAnimation(false), 2000);
    }
  }, [gainedXP]);

  // Level up detection
  useEffect(() => {
    if (percentage >= 100) {
      setLevelUpEffect(true);
      setTimeout(() => setLevelUpEffect(false), 1500);
    }
  }, [percentage]);

  const sizeStyles = {
    sm: { height: 'h-2', text: 'text-xs', levelSize: 'text-sm' },
    md: { height: 'h-3', text: 'text-sm', levelSize: 'text-base' },
    lg: { height: 'h-4', text: 'text-base', levelSize: 'text-lg' },
  };

  const sizeConfig = sizeStyles[size];

  return (
    <div className={cn('relative', className)}>
      {/* Label and stats */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-3">
          <span className={cn(
            'font-gaming-cyber uppercase tracking-wider text-gaming-neon-yellow',
            sizeConfig.text
          )}>
            {label}
          </span>
          {showLevel && (
            <div className="flex items-center gap-1 px-2 py-1 bg-gaming-dark border border-gaming-neon-yellow rounded">
              <span className="text-gaming-neon-yellow font-gaming-cyber text-xs">LV</span>
              <span className={cn(
                'text-gaming-neon-yellow font-gaming-cyber font-bold tabular-nums',
                sizeConfig.levelSize
              )}>
                {level}
              </span>
            </div>
          )}
        </div>
        {showPercentage && (
          <span className={cn(
            'font-gaming-mono tabular-nums text-gaming-neon-yellow',
            sizeConfig.text
          )}>
            {Math.round(displayXP)}/{totalXP}
          </span>
        )}
      </div>
      
      {/* XP bar container */}
      <div className={cn(
        'relative bg-gaming-surface/50 border-2 border-gaming-neon-yellow rounded-sm overflow-hidden',
        'shadow-[0_0_15px_rgba(255,255,0,0.4)]',
        sizeConfig.height,
        levelUpEffect && 'animate-pulse border-gaming-neon-green shadow-[0_0_30px_rgba(0,255,0,0.8)]'
      )}>
        {/* Background starburst pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(255,255,0,0.3) 0%, transparent 50%),
              radial-gradient(circle at 75% 25%, rgba(255,255,0,0.3) 0%, transparent 50%),
              radial-gradient(circle at 25% 75%, rgba(255,255,0,0.3) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(255,255,0,0.3) 0%, transparent 50%)
            `,
          }}
        />
        
        {/* XP bar fill */}
        <div
          className={cn(
            'h-full transition-all duration-800 ease-out relative overflow-hidden',
            'bg-gradient-to-r from-gaming-neon-yellow via-yellow-300 to-gaming-neon-yellow',
            levelUpEffect && 'bg-gradient-to-r from-gaming-neon-green via-green-300 to-gaming-neon-green'
          )}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        >
          {/* Star particles effect */}
          {animated && percentage > 0 && (
            <div className="absolute inset-0">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full animate-ping opacity-60"
                  style={{
                    left: `${10 + i * 20}%`,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: '2s',
                  }}
                />
              ))}
            </div>
          )}
          
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 animate-pulse" 
               style={{ animationDuration: '3s' }} />
        </div>
        
        {/* Milestone markers */}
        <div className="absolute inset-0 flex">
          {[...Array(4)].map((_, i) => {
            const markerPercent = (i + 1) * 25;
            return (
              <div
                key={i}
                className={cn(
                  'flex-1 relative',
                  i < 3 && 'border-r border-gaming-surface/30'
                )}
              >
                {percentage >= markerPercent && (
                  <div className="absolute right-0 top-0 w-px h-full bg-white/60" />
                )}
              </div>
            );
          })}
        </div>
        
        {/* Level up effect */}
        {levelUpEffect && (
          <div className="absolute inset-0 bg-gradient-to-r from-gaming-neon-green/30 to-transparent animate-pulse" />
        )}
      </div>
      
      {/* XP gain animation */}
      {showGainAnimation && gainedXP > 0 && (
        <div className="absolute -top-8 right-0 animate-bounce">
          <span className="text-gaming-neon-green font-gaming-cyber text-sm bg-gaming-dark/80 px-2 py-1 rounded border border-gaming-neon-green">
            +{gainedXP} XP
          </span>
        </div>
      )}
      
      {/* Additional info */}
      <div className="flex items-center justify-between mt-1">
        {/* XP to next level */}
        {nextLevelXP && xpToNext > 0 && (
          <span className="text-gaming-neon-yellow/70 font-gaming-mono text-xs">
            {xpToNext} XP to next level
          </span>
        )}
        
        {/* Level up indicator */}
        {levelUpEffect && (
          <div className="flex items-center gap-1 animate-pulse">
            <div className="w-2 h-2 bg-gaming-neon-green rounded-full animate-ping" />
            <span className="text-gaming-neon-green font-gaming-cyber text-sm uppercase">
              LEVEL UP!
            </span>
          </div>
        )}
        
        {/* Percentage indicator */}
        {size === 'lg' && showPercentage && (
          <span className="text-gaming-neon-yellow font-gaming-mono text-xs tabular-nums">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    </div>
  );
};