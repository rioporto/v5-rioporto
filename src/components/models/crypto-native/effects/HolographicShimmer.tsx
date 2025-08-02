'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface HolographicShimmerProps {
  children: React.ReactNode;
  variant?: 'subtle' | 'medium' | 'intense' | 'rainbow';
  speed?: 'slow' | 'medium' | 'fast';
  direction?: 'left' | 'right' | 'up' | 'down' | 'diagonal';
  trigger?: 'hover' | 'always' | 'focus';
  className?: string;
}

export function HolographicShimmer({
  children,
  variant = 'medium',
  speed = 'medium',
  direction = 'right',
  trigger = 'hover',
  className,
  ...props
}: HolographicShimmerProps) {
  const baseClasses = [
    'relative overflow-hidden',
    'transition-all duration-300'
  ];

  const variantGradients = {
    subtle: 'from-transparent via-white/10 to-transparent',
    medium: 'from-transparent via-white/20 to-transparent',
    intense: 'from-transparent via-white/30 to-transparent',
    rainbow: 'from-transparent via-purple-400/20 via-pink-400/20 via-blue-400/20 to-transparent'
  };

  const speedClasses = {
    slow: 'duration-[3000ms]',
    medium: 'duration-[2000ms]',
    fast: 'duration-[1000ms]'
  };

  const directionTransforms = {
    left: '-translate-x-full group-hover:translate-x-full',
    right: 'translate-x-[-100%] group-hover:translate-x-full',
    up: '-translate-y-full group-hover:translate-y-full',
    down: 'translate-y-[-100%] group-hover:translate-y-full',
    diagonal: '-translate-x-full -translate-y-full group-hover:translate-x-full group-hover:translate-y-full'
  };

  const directionSkew = {
    left: '-skew-x-12',
    right: '-skew-x-12',
    up: '-skew-y-12',
    down: '-skew-y-12',
    diagonal: '-skew-x-12 -skew-y-12'
  };

  const triggerClasses = {
    hover: 'group',
    always: '',
    focus: 'focus-within'
  };

  const classes = cn(
    baseClasses,
    triggerClasses[trigger],
    className
  );

  return (
    <div className={classes} {...props}>
      {children}
      
      {/* Shimmer effect */}
      <div className={cn(
        'absolute inset-0 bg-gradient-to-r',
        variantGradients[variant],
        directionSkew[direction],
        trigger === 'hover' && directionTransforms[direction],
        trigger === 'focus' && directionTransforms[direction].replace('group-hover:', 'focus-within:'),
        trigger === 'always' && 'animate-pulse',
        speedClasses[speed],
        'transition-transform ease-out'
      )} />
    </div>
  );
}

interface RainbowShimmerProps {
  children: React.ReactNode;
  intensity?: 'low' | 'medium' | 'high';
  speed?: 'slow' | 'medium' | 'fast';
  className?: string;
}

export function RainbowShimmer({
  children,
  intensity = 'medium',
  speed = 'medium',
  className,
  ...props
}: RainbowShimmerProps) {
  const intensityOpacity = {
    low: 'opacity-20',
    medium: 'opacity-40',
    high: 'opacity-60'
  };

  const speedDuration = {
    slow: 'animate-[rainbow_4s_ease-in-out_infinite]',
    medium: 'animate-[rainbow_3s_ease-in-out_infinite]',
    fast: 'animate-[rainbow_2s_ease-in-out_infinite]'
  };

  return (
    <div className={cn('relative overflow-hidden group', className)} {...props}>
      {children}
      
      {/* Rainbow shimmer overlay */}
      <div className={cn(
        'absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 via-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400',
        'bg-[length:300%_100%]',
        intensityOpacity[intensity],
        speedDuration[speed],
        'group-hover:opacity-100 transition-opacity duration-300'
      )} />
      
      <style jsx>{`
        @keyframes rainbow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
}

interface HolographicBorderProps {
  children: React.ReactNode;
  thickness?: 1 | 2 | 3 | 4;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  animated?: boolean;
  glow?: boolean;
  className?: string;
}

export function HolographicBorder({
  children,
  thickness = 1,
  rounded = 'xl',
  animated = true,
  glow = true,
  className,
  ...props
}: HolographicBorderProps) {
  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    full: 'rounded-full'
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
        'relative bg-gradient-to-r from-purple-400 via-pink-400 via-blue-400 to-green-400',
        thicknessClasses[thickness],
        roundedClasses[rounded],
        animated && 'bg-[length:300%_100%] animate-[holographic-border_3s_ease-in-out_infinite]',
        glow && 'shadow-[0_0_20px_rgba(153,69,255,0.5)]',
        className
      )}
      {...props}
    >
      {/* Inner content container */}
      <div className={cn(
        'w-full h-full bg-black',
        roundedClasses[rounded]
      )}>
        {children}
      </div>
      
      <style jsx>{`
        @keyframes holographic-border {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
}

interface IridescentTextProps {
  children: React.ReactNode;
  animated?: boolean;
  speed?: 'slow' | 'medium' | 'fast';
  className?: string;
}

export function IridescentText({
  children,
  animated = true,
  speed = 'medium',
  className,
  ...props
}: IridescentTextProps) {
  const speedClasses = {
    slow: 'animate-[iridescent_4s_ease-in-out_infinite]',
    medium: 'animate-[iridescent_3s_ease-in-out_infinite]',
    fast: 'animate-[iridescent_2s_ease-in-out_infinite]'
  };

  return (
    <span 
      className={cn(
        'bg-gradient-to-r from-purple-400 via-pink-400 via-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400',
        'bg-clip-text text-transparent bg-[length:300%_100%]',
        'font-display font-bold',
        animated && speedClasses[speed],
        className
      )}
      {...props}
    >
      {children}
      
      <style jsx>{`
        @keyframes iridescent {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </span>
  );
}

interface ChromaticAberrationProps {
  children: React.ReactNode;
  intensity?: 'low' | 'medium' | 'high';
  color?: 'rgb' | 'purple' | 'cyan';
  animated?: boolean;
  className?: string;
}

export function ChromaticAberration({
  children,
  intensity = 'medium',
  color = 'rgb',
  animated = true,
  className,
  ...props
}: ChromaticAberrationProps) {
  const intensityOffset = {
    low: '1px',
    medium: '2px',
    high: '3px'
  };

  const colorFilters = {
    rgb: {
      red: 'hue-rotate-0',
      green: 'hue-rotate-120',
      blue: 'hue-rotate-240'
    },
    purple: {
      red: 'hue-rotate-270',
      green: 'hue-rotate-300',
      blue: 'hue-rotate-330'
    },
    cyan: {
      red: 'hue-rotate-180',
      green: 'hue-rotate-200',
      blue: 'hue-rotate-220'
    }
  };

  return (
    <div className={cn('relative', className)} {...props}>
      {/* Original content */}
      <div className="relative z-30">
        {children}
      </div>
      
      {/* Red channel */}
      <div 
        className={cn(
          'absolute inset-0 z-10 mix-blend-screen opacity-70',
          colorFilters[color].red,
          animated && 'animate-pulse'
        )}
        style={{
          transform: `translate(-${intensityOffset[intensity]}, 0)`,
          filter: 'sepia(1) saturate(2) hue-rotate(0deg)'
        }}
      >
        <div className="text-red-500">
          {children}
        </div>
      </div>
      
      {/* Green channel */}
      <div 
        className={cn(
          'absolute inset-0 z-20 mix-blend-screen opacity-70',
          colorFilters[color].green,
          animated && 'animate-pulse delay-75'
        )}
        style={{
          transform: `translate(0, -${intensityOffset[intensity]})`,
          filter: 'sepia(1) saturate(2) hue-rotate(120deg)'
        }}
      >
        <div className="text-green-500">
          {children}
        </div>
      </div>
      
      {/* Blue channel */}
      <div 
        className={cn(
          'absolute inset-0 z-10 mix-blend-screen opacity-70',
          colorFilters[color].blue,
          animated && 'animate-pulse delay-150'
        )}
        style={{
          transform: `translate(${intensityOffset[intensity]}, ${intensityOffset[intensity]})`,
          filter: 'sepia(1) saturate(2) hue-rotate(240deg)'
        }}
      >
        <div className="text-blue-500">
          {children}
        </div>
      </div>
    </div>
  );
}

interface HologramProjectionProps {
  children: React.ReactNode;
  intensity?: 'low' | 'medium' | 'high';
  flicker?: boolean;
  scanlines?: boolean;
  className?: string;
}

export function HologramProjection({
  children,
  intensity = 'medium',
  flicker = true,
  scanlines = true,
  className,
  ...props
}: HologramProjectionProps) {
  const intensityClasses = {
    low: 'opacity-70',
    medium: 'opacity-80',
    high: 'opacity-90'
  };

  return (
    <div className={cn('relative', intensityClasses[intensity], className)} {...props}>
      {/* Main content with hologram effect */}
      <div className={cn(
        'relative z-10 text-cyan-300',
        flicker && 'animate-[flicker_0.15s_infinite_linear_alternate]'
      )}>
        {children}
      </div>
      
      {/* Scanlines overlay */}
      {scanlines && (
        <div 
          className="absolute inset-0 z-20 pointer-events-none opacity-20"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0, 255, 255, 0.3) 2px,
              rgba(0, 255, 255, 0.3) 4px
            )`
          }}
        />
      )}
      
      {/* Glow effect */}
      <div className="absolute inset-0 z-0 bg-cyan-400/20 blur-sm" />
      
      <style jsx>{`
        @keyframes flicker {
          0% { opacity: 1; }
          100% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}