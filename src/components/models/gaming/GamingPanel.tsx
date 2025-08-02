'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface GamingPanelProps {
  title?: string;
  variant?: 'hud' | 'terminal' | 'status' | 'info';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  showBorder?: boolean;
  glowColor?: 'pink' | 'cyan' | 'green' | 'yellow';
  children: React.ReactNode;
  className?: string;
}

export const GamingPanel: React.FC<GamingPanelProps> = ({
  title,
  variant = 'hud',
  size = 'md',
  animated = true,
  showBorder = true,
  glowColor = 'cyan',
  children,
  className,
}) => {
  const [scanlinePosition, setScanlinePosition] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (animated) {
      const interval = setInterval(() => {
        setScanlinePosition(prev => (prev >= 100 ? 0 : prev + 2));
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [animated]);

  useEffect(() => {
    // Random activation state for status panels
    if (variant === 'status') {
      const interval = setInterval(() => {
        setIsActive(prev => !prev);
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [variant]);

  const glowColorStyles = {
    pink: {
      border: 'border-gaming-neon-pink',
      glow: 'shadow-[0_0_20px_rgba(255,0,110,0.3)]',
      text: 'text-gaming-neon-pink',
      bg: 'bg-gaming-neon-pink/5',
    },
    cyan: {
      border: 'border-gaming-neon-cyan',
      glow: 'shadow-[0_0_20px_rgba(0,245,255,0.3)]',
      text: 'text-gaming-neon-cyan',
      bg: 'bg-gaming-neon-cyan/5',
    },
    green: {
      border: 'border-gaming-neon-green',
      glow: 'shadow-[0_0_20px_rgba(0,255,0,0.3)]',
      text: 'text-gaming-neon-green',
      bg: 'bg-gaming-neon-green/5',
    },
    yellow: {
      border: 'border-gaming-neon-yellow',
      glow: 'shadow-[0_0_20px_rgba(255,255,0,0.3)]',
      text: 'text-gaming-neon-yellow',
      bg: 'bg-gaming-neon-yellow/5',
    },
  };

  const sizeStyles = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const variantStyles = {
    hud: 'bg-gaming-surface/90 backdrop-blur-sm',
    terminal: 'bg-gaming-dark/95 font-gaming-mono',
    status: `${isActive ? glowColorStyles[glowColor].bg : 'bg-gaming-surface/50'}`,
    info: 'bg-gaming-surface/80',
  };

  const colorConfig = glowColorStyles[glowColor];

  return (
    <div className={cn(
      'relative rounded-lg overflow-hidden transition-all duration-300',
      variantStyles[variant],
      sizeStyles[size],
      showBorder && `border-2 ${colorConfig.border}`,
      showBorder && colorConfig.glow,
      className
    )}>
      {/* Background grid pattern */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,245,255,0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,255,0.2) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      />
      
      {/* Animated scanline */}
      {animated && variant === 'hud' && (
        <div 
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-gaming-neon-cyan to-transparent transition-all duration-100"
          style={{ top: `${scanlinePosition}%` }}
        />
      )}
      
      {/* Title bar */}
      {title && (
        <div className={cn(
          'flex items-center justify-between mb-4 pb-2',
          'border-b border-current/30'
        )}>
          <h3 className={cn(
            'font-gaming-cyber text-sm uppercase tracking-wider',
            colorConfig.text
          )}>
            {title}
          </h3>
          
          {/* Status indicator */}
          {variant === 'status' && (
            <div className="flex items-center gap-2">
              <div className={cn(
                'w-2 h-2 rounded-full transition-all duration-300',
                isActive ? 'bg-gaming-neon-green shadow-[0_0_10px_rgba(0,255,0,0.8)]'
                         : 'bg-gaming-neon-red shadow-[0_0_10px_rgba(255,51,51,0.8)]'
              )} />
              <span className={cn(
                'text-xs font-gaming-mono uppercase',
                isActive ? 'text-gaming-neon-green' : 'text-gaming-neon-red'
              )}>
                {isActive ? 'ACTIVE' : 'STANDBY'}
              </span>
            </div>
          )}
          
          {/* Terminal cursor */}
          {variant === 'terminal' && (
            <div className="flex items-center gap-1">
              <div className="w-1 h-3 bg-gaming-neon-green animate-pulse" />
              <span className="text-gaming-neon-green text-xs font-gaming-mono">
                READY
              </span>
            </div>
          )}
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Corner brackets */}
      {showBorder && (
        <>
          <div className="absolute top-1 left-1 w-3 h-3 border-t border-l border-current opacity-60" />
          <div className="absolute top-1 right-1 w-3 h-3 border-t border-r border-current opacity-60" />
          <div className="absolute bottom-1 left-1 w-3 h-3 border-b border-l border-current opacity-60" />
          <div className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-current opacity-60" />
        </>
      )}
      
      {/* Data flow animation for HUD panels */}
      {animated && variant === 'hud' && (
        <div className="absolute top-0 right-0 w-8 h-full overflow-hidden opacity-20">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-4 bg-gradient-to-b from-gaming-neon-cyan to-transparent animate-pulse"
              style={{
                left: `${i * 20}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: '2s',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};