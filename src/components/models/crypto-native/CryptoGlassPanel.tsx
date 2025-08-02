'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface CryptoGlassPanelProps {
  children: React.ReactNode;
  variant?: 'ultra-light' | 'light' | 'medium' | 'heavy' | 'opaque';
  glow?: boolean;
  bordered?: boolean;
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  className?: string;
  animated?: boolean;
}

export function CryptoGlassPanel({
  children,
  variant = 'medium',
  glow = true,
  bordered = true,
  rounded = 'xl',
  className,
  animated = true,
  ...props
}: CryptoGlassPanelProps) {
  const baseClasses = [
    'relative backdrop-blur-xl',
    animated && 'transition-all duration-300 transform-gpu',
    'overflow-hidden'
  ];

  const variantClasses = {
    'ultra-light': [
      'bg-white/2',
      bordered && 'border border-white/5',
      glow && 'shadow-[0_8px_32px_rgba(0,0,0,0.1)]'
    ],
    light: [
      'bg-white/5',
      bordered && 'border border-white/10',
      glow && 'shadow-[0_8px_32px_rgba(0,0,0,0.2)]'
    ],
    medium: [
      'bg-white/8',
      bordered && 'border border-white/15',
      glow && 'shadow-[0_8px_32px_rgba(0,0,0,0.3)]'
    ],
    heavy: [
      'bg-white/12',
      bordered && 'border border-white/20',
      glow && 'shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
    ],
    opaque: [
      'bg-black/60',
      bordered && 'border border-white/25',
      glow && 'shadow-[0_8px_32px_rgba(0,0,0,0.6)]'
    ]
  };

  const roundedClasses = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    full: 'rounded-full'
  };

  const classes = cn(
    baseClasses,
    variantClasses[variant],
    roundedClasses[rounded],
    className
  );

  return (
    <div className={classes} {...props}>
      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Holographic reflection */}
      {animated && (
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 via-transparent via-pink-400/5 to-transparent animate-pulse" />
        </div>
      )}
    </div>
  );
}

interface CryptoGlassContainerProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
}

export function CryptoGlassContainer({ 
  children, 
  className, 
  padding = 'md' 
}: CryptoGlassContainerProps) {
  const paddingClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  };

  return (
    <CryptoGlassPanel className={cn(paddingClasses[padding], className)}>
      {children}
    </CryptoGlassPanel>
  );
}

interface CryptoGlassGridProps {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function CryptoGlassGrid({ 
  children, 
  cols = 3, 
  gap = 'md', 
  className 
}: CryptoGlassGridProps) {
  const colsClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
    12: 'grid-cols-4 md:grid-cols-6 lg:grid-cols-12'
  };

  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8'
  };

  return (
    <div className={cn(
      'grid',
      colsClasses[cols],
      gapClasses[gap],
      className
    )}>
      {children}
    </div>
  );
}

interface CryptoGlassStackProps {
  children: React.ReactNode;
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function CryptoGlassStack({ 
  children, 
  spacing = 'md', 
  className 
}: CryptoGlassStackProps) {
  const spacingClasses = {
    sm: 'space-y-2',
    md: 'space-y-4',
    lg: 'space-y-6',
    xl: 'space-y-8'
  };

  return (
    <div className={cn(
      'flex flex-col',
      spacingClasses[spacing],
      className
    )}>
      {children}
    </div>
  );
}

interface CryptoGlassFlexProps {
  children: React.ReactNode;
  direction?: 'row' | 'col';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function CryptoGlassFlex({ 
  children, 
  direction = 'row',
  align = 'start',
  justify = 'start',
  gap = 'md',
  className 
}: CryptoGlassFlexProps) {
  const directionClasses = {
    row: 'flex-row',
    col: 'flex-col'
  };

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch'
  };

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly'
  };

  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8'
  };

  return (
    <div className={cn(
      'flex',
      directionClasses[direction],
      alignClasses[align],
      justifyClasses[justify],
      gapClasses[gap],
      className
    )}>
      {children}
    </div>
  );
}