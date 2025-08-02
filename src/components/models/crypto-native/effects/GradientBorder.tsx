'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface GradientBorderProps {
  children: React.ReactNode;
  variant?: 'purple-pink' | 'blue-cyan' | 'green-emerald' | 'rainbow' | 'neon' | 'custom';
  thickness?: 1 | 2 | 3 | 4 | 5;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
  animated?: boolean;
  glow?: boolean;
  pulse?: boolean;
  customGradient?: string;
  className?: string;
}

export function GradientBorder({
  children,
  variant = 'purple-pink',
  thickness = 2,
  rounded = 'xl',
  animated = true,
  glow = true,
  pulse = false,
  customGradient,
  className,
  ...props
}: GradientBorderProps) {
  const gradientVariants = {
    'purple-pink': 'from-purple-500 via-pink-500 to-purple-500',
    'blue-cyan': 'from-blue-500 via-cyan-500 to-blue-500',
    'green-emerald': 'from-green-500 via-emerald-500 to-green-500',
    'rainbow': 'from-red-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500',
    'neon': 'from-purple-400 via-pink-400 via-cyan-400 to-green-400',
    'custom': customGradient || 'from-purple-500 to-pink-500'
  };

  const thicknessClasses = {
    1: 'p-[1px]',
    2: 'p-[2px]',
    3: 'p-[3px]',
    4: 'p-[4px]',
    5: 'p-[5px]'
  };

  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
    full: 'rounded-full'
  };

  const glowColors = {
    'purple-pink': 'shadow-[0_0_20px_rgba(147,51,234,0.5)]',
    'blue-cyan': 'shadow-[0_0_20px_rgba(59,130,246,0.5)]',
    'green-emerald': 'shadow-[0_0_20px_rgba(34,197,94,0.5)]',
    'rainbow': 'shadow-[0_0_20px_rgba(147,51,234,0.3)]',
    'neon': 'shadow-[0_0_20px_rgba(147,51,234,0.5)]',
    'custom': 'shadow-[0_0_20px_rgba(147,51,234,0.5)]'
  };

  const baseClasses = [
    'relative bg-gradient-to-r',
    gradientVariants[variant],
    thicknessClasses[thickness],
    roundedClasses[rounded],
    glow && glowColors[variant],
    animated && 'transition-all duration-300',
    pulse && 'animate-pulse',
    animated && (variant === 'rainbow' || variant === 'neon') && 'bg-[length:300%_100%] animate-[gradient-shift_3s_ease_infinite]'
  ];

  const classes = cn(baseClasses, className);

  return (
    <div className={classes} {...props}>
      {/* Inner container with background */}
      <div className={cn(
        'w-full h-full bg-black/90 backdrop-blur-sm',
        roundedClasses[rounded]
      )}>
        {children}
      </div>
      
      {/* Animation styles */}
      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
}

interface AnimatedGradientBoxProps {
  children: React.ReactNode;
  direction?: 'horizontal' | 'vertical' | 'diagonal' | 'radial';
  speed?: 'slow' | 'medium' | 'fast';
  colors?: string[];
  className?: string;
}

export function AnimatedGradientBox({
  children,
  direction = 'horizontal',
  speed = 'medium',
  colors = ['#9945FF', '#00FFA3', '#FF6B9D', '#4ECDC4'],
  className,
  ...props
}: AnimatedGradientBoxProps) {
  const directionClasses = {
    horizontal: 'bg-gradient-to-r',
    vertical: 'bg-gradient-to-b',
    diagonal: 'bg-gradient-to-br',
    radial: 'bg-radial-gradient'
  };

  const speedDurations = {
    slow: '4s',
    medium: '3s',
    fast: '2s'
  };

  const gradientStops = colors.map((color, index) => {
    const percentage = (index / (colors.length - 1)) * 100;
    return `${color} ${percentage}%`;
  }).join(', ');

  return (
    <div 
      className={cn('relative p-[2px] rounded-xl', className)}
      style={{
        background: `linear-gradient(${direction === 'diagonal' ? '45deg' : direction === 'vertical' ? 'to bottom' : 'to right'}, ${gradientStops})`,
        backgroundSize: '300% 300%',
        animation: `gradient-flow ${speedDurations[speed]} ease infinite`
      }}
      {...props}
    >
      <div className="w-full h-full bg-black/90 backdrop-blur-sm rounded-xl">
        {children}
      </div>
      
      <style jsx>{`
        @keyframes gradient-flow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
}

interface NeonBorderProps {
  children: React.ReactNode;
  color?: 'purple' | 'cyan' | 'green' | 'pink' | 'blue' | 'yellow';
  intensity?: 'low' | 'medium' | 'high' | 'extreme';
  thickness?: 1 | 2 | 3 | 4;
  animated?: boolean;
  className?: string;
}

export function NeonBorder({
  children,
  color = 'purple',
  intensity = 'medium',
  thickness = 2,
  animated = true,
  className,
  ...props
}: NeonBorderProps) {
  const colorClasses = {
    purple: {
      border: 'border-purple-400',
      glow: {
        low: 'shadow-[0_0_5px_rgba(147,51,234,0.5)]',
        medium: 'shadow-[0_0_10px_rgba(147,51,234,0.7)]',
        high: 'shadow-[0_0_20px_rgba(147,51,234,0.9)]',
        extreme: 'shadow-[0_0_40px_rgba(147,51,234,1)]'
      }
    },
    cyan: {
      border: 'border-cyan-400',
      glow: {
        low: 'shadow-[0_0_5px_rgba(34,211,238,0.5)]',
        medium: 'shadow-[0_0_10px_rgba(34,211,238,0.7)]',
        high: 'shadow-[0_0_20px_rgba(34,211,238,0.9)]',
        extreme: 'shadow-[0_0_40px_rgba(34,211,238,1)]'
      }
    },
    green: {
      border: 'border-green-400',
      glow: {
        low: 'shadow-[0_0_5px_rgba(34,197,94,0.5)]',
        medium: 'shadow-[0_0_10px_rgba(34,197,94,0.7)]',
        high: 'shadow-[0_0_20px_rgba(34,197,94,0.9)]',
        extreme: 'shadow-[0_0_40px_rgba(34,197,94,1)]'
      }
    },
    pink: {
      border: 'border-pink-400',
      glow: {
        low: 'shadow-[0_0_5px_rgba(244,114,182,0.5)]',
        medium: 'shadow-[0_0_10px_rgba(244,114,182,0.7)]',
        high: 'shadow-[0_0_20px_rgba(244,114,182,0.9)]',
        extreme: 'shadow-[0_0_40px_rgba(244,114,182,1)]'
      }
    },
    blue: {
      border: 'border-blue-400',
      glow: {
        low: 'shadow-[0_0_5px_rgba(59,130,246,0.5)]',
        medium: 'shadow-[0_0_10px_rgba(59,130,246,0.7)]',
        high: 'shadow-[0_0_20px_rgba(59,130,246,0.9)]',
        extreme: 'shadow-[0_0_40px_rgba(59,130,246,1)]'
      }
    },
    yellow: {
      border: 'border-yellow-400',
      glow: {
        low: 'shadow-[0_0_5px_rgba(234,179,8,0.5)]',
        medium: 'shadow-[0_0_10px_rgba(234,179,8,0.7)]',
        high: 'shadow-[0_0_20px_rgba(234,179,8,0.9)]',
        extreme: 'shadow-[0_0_40px_rgba(234,179,8,1)]'
      }
    }
  };

  const thicknessClasses = {
    1: 'border',
    2: 'border-2',
    3: 'border-4',
    4: 'border-8'
  };

  const classes = cn(
    'rounded-xl bg-black/20 backdrop-blur-sm',
    thicknessClasses[thickness],
    colorClasses[color].border,
    colorClasses[color].glow[intensity],
    animated && 'transition-all duration-300 hover:scale-[1.02]',
    animated && 'hover:' + colorClasses[color].glow.extreme,
    className
  );

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

interface PulsatingBorderProps {
  children: React.ReactNode;
  colors?: string[];
  speed?: 'slow' | 'medium' | 'fast';
  thickness?: 1 | 2 | 3 | 4;
  className?: string;
}

export function PulsatingBorder({
  children,
  colors = ['#9945FF', '#00FFA3', '#FF6B9D'],
  speed = 'medium',
  thickness = 2,
  className,
  ...props
}: PulsatingBorderProps) {
  const speedClasses = {
    slow: 'animate-[pulse-border_3s_ease-in-out_infinite]',
    medium: 'animate-[pulse-border_2s_ease-in-out_infinite]',
    fast: 'animate-[pulse-border_1s_ease-in-out_infinite]'
  };

  const thicknessClasses = {
    1: 'p-[1px]',
    2: 'p-[2px]',
    3: 'p-[3px]',
    4: 'p-[4px]'
  };

  return (
    <div 
      className={cn(
        'relative rounded-xl',
        thicknessClasses[thickness],
        speedClasses[speed],
        className
      )}
      style={{
        background: `linear-gradient(45deg, ${colors.join(', ')})`,
        backgroundSize: '400% 400%'
      }}
      {...props}
    >
      <div className="w-full h-full bg-black/90 rounded-xl">
        {children}
      </div>
      
      <style jsx>{`
        @keyframes pulse-border {
          0%, 100% { 
            background-position: 0% 50%;
            filter: brightness(1) saturate(1);
          }
          25% { 
            background-position: 100% 50%;
            filter: brightness(1.2) saturate(1.2);
          }
          50% { 
            background-position: 200% 50%;
            filter: brightness(1.4) saturate(1.4);
          }
          75% { 
            background-position: 300% 50%;
            filter: brightness(1.2) saturate(1.2);
          }
        }
      `}</style>
    </div>
  );
}

interface GlowingCardProps {
  children: React.ReactNode;
  glowColor?: string;
  glowIntensity?: 'low' | 'medium' | 'high';
  hoverEffect?: boolean;
  className?: string;
}

export function GlowingCard({
  children,
  glowColor = '#9945FF',
  glowIntensity = 'medium',
  hoverEffect = true,
  className,
  ...props
}: GlowingCardProps) {
  const intensityValues = {
    low: '10px',
    medium: '20px',
    high: '30px'
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 153, g: 69, b: 255 };
  };

  const rgb = hexToRgb(glowColor);

  return (
    <div 
      className={cn(
        'relative p-[2px] rounded-xl bg-black/20 backdrop-blur-sm transition-all duration-300',
        hoverEffect && 'hover:scale-[1.02]',
        className
      )}
      style={{
        boxShadow: `0 0 ${intensityValues[glowIntensity]} rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`,
        border: `1px solid rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)`
      }}
      {...props}
    >
      <div className="w-full h-full bg-black/80 rounded-xl">
        {children}
      </div>
      
      {hoverEffect && (
        <div 
          className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            boxShadow: `0 0 40px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8)`
          }}
        />
      )}
    </div>
  );
}