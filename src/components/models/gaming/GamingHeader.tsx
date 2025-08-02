'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface GamingHeaderProps {
  title: string;
  subtitle?: string;
  level?: number;
  showStats?: boolean;
  showTime?: boolean;
  className?: string;
}

export const GamingHeader: React.FC<GamingHeaderProps> = ({
  title,
  subtitle,
  level,
  showStats = false,
  showTime = false,
  className,
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    if (showTime) {
      const timer = setInterval(() => setCurrentTime(new Date()), 1000);
      return () => clearInterval(timer);
    }
  }, [showTime]);

  useEffect(() => {
    // Random glitch effect
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.1) { // 10% chance every 3 seconds
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 200);
      }
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <header className={cn(
      'relative bg-gaming-surface border-b-2 border-gaming-neon-cyan',
      'px-6 py-4 shadow-[0_0_30px_rgba(0,245,255,0.2)]',
      className
    )}>
      {/* Background grid pattern */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,245,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
        }}
      />
      
      {/* Animated top border */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gaming-neon-pink via-gaming-neon-cyan to-gaming-neon-green">
        <div className="h-full bg-gradient-to-r from-transparent via-white to-transparent animate-pulse" />
      </div>
      
      <div className="relative z-10 flex items-center justify-between">
        {/* Left section - Title and level */}
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <h1 className={cn(
              'text-2xl md:text-3xl font-gaming-cyber text-gaming-neon-cyan',
              'uppercase tracking-wider relative',
              glitchActive && 'animate-pulse'
            )}>
              {/* Glitch effect */}
              {glitchActive && (
                <>
                  <span className="absolute inset-0 text-gaming-neon-pink animate-bounce" style={{ transform: 'translate(-2px, -1px)' }}>
                    {title}
                  </span>
                  <span className="absolute inset-0 text-gaming-neon-green animate-pulse" style={{ transform: 'translate(2px, 1px)' }}>
                    {title}
                  </span>
                </>
              )}
              <span className="relative z-10 drop-shadow-[0_0_10px_rgba(0,245,255,0.8)]">
                {title}
              </span>
            </h1>
            
            {subtitle && (
              <p className="text-sm text-gaming-neon-green font-gaming-mono uppercase tracking-widest mt-1">
                {subtitle}
              </p>
            )}
          </div>
          
          {/* Level indicator */}
          {level && (
            <div className="flex items-center gap-2 px-4 py-2 bg-gaming-dark border border-gaming-neon-yellow rounded-md">
              <span className="text-gaming-neon-yellow font-gaming-cyber text-sm">LVL</span>
              <span className="text-gaming-neon-yellow font-gaming-cyber text-lg font-bold">
                {level.toString().padStart(2, '0')}
              </span>
            </div>
          )}
        </div>
        
        {/* Right section - Stats and time */}
        <div className="flex items-center gap-4">
          {showStats && (
            <div className="flex gap-4">
              {/* Health indicator */}
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gaming-neon-green rounded-full animate-pulse shadow-[0_0_10px_rgba(0,255,0,0.8)]" />
                <span className="text-gaming-neon-green font-gaming-mono text-sm">ONLINE</span>
              </div>
              
              {/* Connection status */}
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        'w-1 bg-gaming-neon-cyan rounded-full animate-pulse',
                        i === 0 && 'h-2',
                        i === 1 && 'h-3',
                        i === 2 && 'h-4'
                      )}
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
                <span className="text-gaming-neon-cyan font-gaming-mono text-sm">SYNC</span>
              </div>
            </div>
          )}
          
          {/* Time display */}
          {showTime && (
            <div className="px-4 py-2 bg-gaming-dark border border-gaming-neon-pink rounded-md">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gaming-neon-pink rounded-full animate-pulse" />
                <span className="text-gaming-neon-pink font-gaming-mono text-sm">
                  {formatTime(currentTime)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Bottom scanline */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gaming-neon-cyan to-transparent animate-pulse" />
      
      {/* Corner decorations */}
      <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-gaming-neon-cyan opacity-60" />
      <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-gaming-neon-cyan opacity-60" />
      <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-gaming-neon-cyan opacity-60" />
      <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-gaming-neon-cyan opacity-60" />
    </header>
  );
};