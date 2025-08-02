'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface GlowEffectProps {
  children?: React.ReactNode;
  color?: 'purple' | 'green' | 'blue' | 'pink' | 'yellow' | 'red' | 'white';
  intensity?: 'low' | 'medium' | 'high' | 'extreme';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  animated?: boolean;
  pulse?: boolean;
  className?: string;
}

export function GlowEffect({
  children,
  color = 'purple',
  intensity = 'medium',
  size = 'md',
  animated = true,
  pulse = false,
  className,
  ...props
}: GlowEffectProps) {
  const colorGlows = {
    purple: {
      low: 'shadow-[0_0_10px_rgba(153,69,255,0.3)]',
      medium: 'shadow-[0_0_20px_rgba(153,69,255,0.5)]',
      high: 'shadow-[0_0_40px_rgba(153,69,255,0.7)]',
      extreme: 'shadow-[0_0_80px_rgba(153,69,255,0.9)]'
    },
    green: {
      low: 'shadow-[0_0_10px_rgba(0,255,163,0.3)]',
      medium: 'shadow-[0_0_20px_rgba(0,255,163,0.5)]',
      high: 'shadow-[0_0_40px_rgba(0,255,163,0.7)]',
      extreme: 'shadow-[0_0_80px_rgba(0,255,163,0.9)]'
    },
    blue: {
      low: 'shadow-[0_0_10px_rgba(59,130,246,0.3)]',
      medium: 'shadow-[0_0_20px_rgba(59,130,246,0.5)]',
      high: 'shadow-[0_0_40px_rgba(59,130,246,0.7)]',
      extreme: 'shadow-[0_0_80px_rgba(59,130,246,0.9)]'
    },
    pink: {
      low: 'shadow-[0_0_10px_rgba(236,72,153,0.3)]',
      medium: 'shadow-[0_0_20px_rgba(236,72,153,0.5)]',
      high: 'shadow-[0_0_40px_rgba(236,72,153,0.7)]',
      extreme: 'shadow-[0_0_80px_rgba(236,72,153,0.9)]'
    },
    yellow: {
      low: 'shadow-[0_0_10px_rgba(234,179,8,0.3)]',
      medium: 'shadow-[0_0_20px_rgba(234,179,8,0.5)]',
      high: 'shadow-[0_0_40px_rgba(234,179,8,0.7)]',
      extreme: 'shadow-[0_0_80px_rgba(234,179,8,0.9)]'
    },
    red: {
      low: 'shadow-[0_0_10px_rgba(239,68,68,0.3)]',
      medium: 'shadow-[0_0_20px_rgba(239,68,68,0.5)]',
      high: 'shadow-[0_0_40px_rgba(239,68,68,0.7)]',
      extreme: 'shadow-[0_0_80px_rgba(239,68,68,0.9)]'
    },
    white: {
      low: 'shadow-[0_0_10px_rgba(255,255,255,0.3)]',
      medium: 'shadow-[0_0_20px_rgba(255,255,255,0.5)]',
      high: 'shadow-[0_0_40px_rgba(255,255,255,0.7)]',
      extreme: 'shadow-[0_0_80px_rgba(255,255,255,0.9)]'
    }
  };

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-40 h-40',
    '2xl': 'w-48 h-48'
  };

  const baseClasses = [
    'relative',
    animated && 'transition-all duration-300',
    pulse && 'animate-pulse'
  ];

  const glowClasses = [
    colorGlows[color][intensity],
    animated && 'hover:scale-110',
    pulse && 'animate-pulse'
  ];

  const classes = cn(
    baseClasses,
    children ? '' : sizeClasses[size],
    glowClasses,
    className
  );

  if (children) {
    return (
      <div className={classes} {...props}>
        {children}
      </div>
    );
  }

  // Standalone glow orb
  return (
    <div className={cn(classes, 'rounded-full bg-gradient-to-r')} {...props}>
      <div className={cn(
        'w-full h-full rounded-full opacity-80',
        color === 'purple' && 'bg-gradient-to-r from-purple-400 to-pink-400',
        color === 'green' && 'bg-gradient-to-r from-green-400 to-emerald-400',
        color === 'blue' && 'bg-gradient-to-r from-blue-400 to-cyan-400',
        color === 'pink' && 'bg-gradient-to-r from-pink-400 to-rose-400',
        color === 'yellow' && 'bg-gradient-to-r from-yellow-400 to-orange-400',
        color === 'red' && 'bg-gradient-to-r from-red-400 to-pink-400',
        color === 'white' && 'bg-gradient-to-r from-white to-gray-200'
      )} />
    </div>
  );
}

interface NeonTextProps {
  children: React.ReactNode;
  color?: 'purple' | 'green' | 'blue' | 'pink' | 'yellow' | 'red' | 'white';
  intensity?: 'low' | 'medium' | 'high' | 'extreme';
  animated?: boolean;
  className?: string;
}

export function NeonText({
  children,
  color = 'purple',
  intensity = 'medium',
  animated = true,
  className,
  ...props
}: NeonTextProps) {
  const textGlows = {
    purple: {
      low: 'text-purple-300 text-shadow-[0_0_5px_rgba(153,69,255,0.8)]',
      medium: 'text-purple-200 text-shadow-[0_0_10px_rgba(153,69,255,1)]',
      high: 'text-purple-100 text-shadow-[0_0_20px_rgba(153,69,255,1)]',
      extreme: 'text-white text-shadow-[0_0_40px_rgba(153,69,255,1)]'
    },
    green: {
      low: 'text-green-300 text-shadow-[0_0_5px_rgba(0,255,163,0.8)]',
      medium: 'text-green-200 text-shadow-[0_0_10px_rgba(0,255,163,1)]',
      high: 'text-green-100 text-shadow-[0_0_20px_rgba(0,255,163,1)]',
      extreme: 'text-white text-shadow-[0_0_40px_rgba(0,255,163,1)]'
    },
    blue: {
      low: 'text-blue-300 text-shadow-[0_0_5px_rgba(59,130,246,0.8)]',
      medium: 'text-blue-200 text-shadow-[0_0_10px_rgba(59,130,246,1)]',
      high: 'text-blue-100 text-shadow-[0_0_20px_rgba(59,130,246,1)]',
      extreme: 'text-white text-shadow-[0_0_40px_rgba(59,130,246,1)]'
    },
    pink: {
      low: 'text-pink-300 text-shadow-[0_0_5px_rgba(236,72,153,0.8)]',
      medium: 'text-pink-200 text-shadow-[0_0_10px_rgba(236,72,153,1)]',
      high: 'text-pink-100 text-shadow-[0_0_20px_rgba(236,72,153,1)]',
      extreme: 'text-white text-shadow-[0_0_40px_rgba(236,72,153,1)]'
    },
    yellow: {
      low: 'text-yellow-300 text-shadow-[0_0_5px_rgba(234,179,8,0.8)]',
      medium: 'text-yellow-200 text-shadow-[0_0_10px_rgba(234,179,8,1)]',
      high: 'text-yellow-100 text-shadow-[0_0_20px_rgba(234,179,8,1)]',
      extreme: 'text-white text-shadow-[0_0_40px_rgba(234,179,8,1)]'
    },
    red: {
      low: 'text-red-300 text-shadow-[0_0_5px_rgba(239,68,68,0.8)]',
      medium: 'text-red-200 text-shadow-[0_0_10px_rgba(239,68,68,1)]',
      high: 'text-red-100 text-shadow-[0_0_20px_rgba(239,68,68,1)]',
      extreme: 'text-white text-shadow-[0_0_40px_rgba(239,68,68,1)]'
    },
    white: {
      low: 'text-gray-200 text-shadow-[0_0_5px_rgba(255,255,255,0.8)]',
      medium: 'text-gray-100 text-shadow-[0_0_10px_rgba(255,255,255,1)]',
      high: 'text-white text-shadow-[0_0_20px_rgba(255,255,255,1)]',
      extreme: 'text-white text-shadow-[0_0_40px_rgba(255,255,255,1)]'
    }
  };

  const classes = cn(
    'font-display font-bold',
    textGlows[color][intensity],
    animated && 'transition-all duration-300 hover:scale-105',
    className
  );

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
}

interface GlowOrbProps {
  color?: 'purple' | 'green' | 'blue' | 'pink' | 'yellow' | 'red' | 'white';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  intensity?: 'low' | 'medium' | 'high' | 'extreme';
  animated?: boolean;
  pulse?: boolean;
  floating?: boolean;
  className?: string;
}

export function GlowOrb({
  color = 'purple',
  size = 'md',
  intensity = 'medium',
  animated = true,
  pulse = false,
  floating = false,
  className,
  ...props
}: GlowOrbProps) {
  const sizeClasses = {
    xs: 'w-4 h-4',
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
    '2xl': 'w-24 h-24'
  };

  const baseClasses = [
    'rounded-full absolute',
    animated && 'transition-all duration-300',
    pulse && 'animate-pulse',
    floating && 'animate-bounce'
  ];

  return (
    <GlowEffect
      color={color}
      intensity={intensity}
      animated={animated}
      pulse={pulse}
      className={cn(baseClasses, sizeClasses[size], className)}
      {...props}
    />
  );
}

interface GlowTrailProps {
  children: React.ReactNode;
  color?: 'purple' | 'green' | 'blue' | 'pink' | 'yellow' | 'red' | 'white';
  intensity?: 'low' | 'medium' | 'high';
  duration?: number;
  className?: string;
}

export function GlowTrail({
  children,
  color = 'purple',
  intensity = 'medium',
  duration = 1000,
  className,
  ...props
}: GlowTrailProps) {
  const trailColors = {
    purple: 'rgba(153, 69, 255, 0.6)',
    green: 'rgba(0, 255, 163, 0.6)',
    blue: 'rgba(59, 130, 246, 0.6)',
    pink: 'rgba(236, 72, 153, 0.6)',
    yellow: 'rgba(234, 179, 8, 0.6)',
    red: 'rgba(239, 68, 68, 0.6)',
    white: 'rgba(255, 255, 255, 0.6)'
  };

  const intensityOpacity = {
    low: 0.3,
    medium: 0.6,
    high: 0.9
  };

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={{
        '--trail-color': trailColors[color],
        '--trail-opacity': intensityOpacity[intensity],
        '--trail-duration': `${duration}ms`
      } as React.CSSProperties}
      {...props}
    >
      {children}
      
      {/* Trail effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), var(--trail-color) 0%, transparent 50%)`,
            animation: `trail var(--trail-duration) ease-out`
          }}
        />
      </div>
      
      <style jsx>{`
        @keyframes trail {
          0% { 
            opacity: var(--trail-opacity);
            transform: scale(0.8);
          }
          100% { 
            opacity: 0;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
}