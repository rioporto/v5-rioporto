'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface GamingCardProps {
  variant?: 'primary' | 'hud' | 'cyber' | 'nft';
  glowColor?: 'pink' | 'cyan' | 'green' | 'yellow';
  animated?: boolean;
  scanlines?: boolean;
  corners?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const GamingCard: React.FC<GamingCardProps> = ({
  variant = 'default',
  glowColor = 'cyan',
  animated = true,
  scanlines = true,
  corners = true,
  children,
  className,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePosition({ x, y });
  };

  const glowColorStyles = {
    pink: {
      border: 'border-gaming-neon-pink',
      glow: 'shadow-[0_0_30px_rgba(255,0,110,0.3)]',
      hoverGlow: 'hover:shadow-[0_0_50px_rgba(255,0,110,0.5)]',
      scanline: 'from-gaming-neon-pink/20 to-transparent',
    },
    cyan: {
      border: 'border-gaming-neon-cyan',
      glow: 'shadow-[0_0_30px_rgba(0,245,255,0.3)]',
      hoverGlow: 'hover:shadow-[0_0_50px_rgba(0,245,255,0.5)]',
      scanline: 'from-gaming-neon-cyan/20 to-transparent',
    },
    green: {
      border: 'border-gaming-neon-green',
      glow: 'shadow-[0_0_30px_rgba(0,255,0,0.3)]',
      hoverGlow: 'hover:shadow-[0_0_50px_rgba(0,255,0,0.5)]',
      scanline: 'from-gaming-neon-green/20 to-transparent',
    },
    yellow: {
      border: 'border-gaming-neon-yellow',
      glow: 'shadow-[0_0_30px_rgba(255,255,0,0.3)]',
      hoverGlow: 'hover:shadow-[0_0_50px_rgba(255,255,0,0.5)]',
      scanline: 'from-gaming-neon-yellow/20 to-transparent',
    },
  };

  const variantStyles = {
    default: 'bg-gaming-surface border-2 rounded-lg p-6',
    hud: 'bg-gaming-surface/80 backdrop-blur-sm border-2 rounded-lg p-4 relative',
    cyber: 'bg-gradient-to-br from-gaming-surface to-gaming-dark border-2 rounded-lg p-6 relative overflow-hidden',
    nft: 'bg-gaming-surface border-2 rounded-xl p-4 relative overflow-hidden',
  };

  const colorConfig = glowColorStyles[glowColor];

  return (
    <div
      ref={cardRef}
      className={cn(
        // Base styles
        'relative transition-all duration-300 ease-out cursor-pointer',
        'select-none group',
        
        // Variant styles
        variantStyles[variant],
        
        // Color and glow
        colorConfig.border,
        colorConfig.glow,
        colorConfig.hoverGlow,
        
        // Interactive effects
        animated && 'hover:-translate-y-2 hover:scale-[1.02]',
        
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={onClick}
    >
      {/* Scanlines overlay */}
      {scanlines && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gaming-neon-cyan/5 to-transparent bg-[length:100%_4px] bg-repeat" />
        </div>
      )}
      
      {/* Top scanline animation */}
      {variant === 'hud' && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-current to-transparent animate-pulse" />
      )}
      
      {/* Cyber grid overlay */}
      {variant === 'cyber' && (
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,245,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,245,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }}
        />
      )}
      
      {/* Mouse follow spotlight */}
      {animated && isHovered && (
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
          }}
        />
      )}
      
      {/* Corner brackets */}
      {corners && (
        <>
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-current opacity-60 transition-opacity group-hover:opacity-100" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-current opacity-60 transition-opacity group-hover:opacity-100" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-current opacity-60 transition-opacity group-hover:opacity-100" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-current opacity-60 transition-opacity group-hover:opacity-100" />
        </>
      )}
      
      {/* Holographic shimmer effect */}
      {variant === 'nft' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Glow pulse effect */}
      {animated && (
        <div className={cn(
          'absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300',
          `bg-gradient-to-r ${colorConfig.scanline}`
        )} />
      )}
    </div>
  );
};