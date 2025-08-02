'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface HoverEffectsProps {
  children: React.ReactNode;
  variant?: 'subtle' | 'lift' | 'scale' | 'fade' | 'border' | 'glow';
  intensity?: 'low' | 'medium' | 'high';
  duration?: 'fast' | 'normal' | 'slow';
  className?: string;
  disabled?: boolean;
}

const variantClasses = {
  subtle: 'hover:bg-gray-50 dark:hover:bg-gray-900/50',
  lift: 'hover:-translate-y-0.5 hover:shadow-sm',
  scale: 'hover:scale-[1.02] active:scale-[0.98]',
  fade: 'hover:opacity-80',
  border: 'hover:border-gray-300 dark:hover:border-gray-600',
  glow: 'hover:shadow-sm hover:shadow-blue-200/50 dark:hover:shadow-blue-900/50'
};

const intensityClasses = {
  low: {
    subtle: 'hover:bg-gray-25 dark:hover:bg-gray-950/30',
    lift: 'hover:-translate-y-px hover:shadow-xs',
    scale: 'hover:scale-[1.01] active:scale-[0.99]',
    fade: 'hover:opacity-90',
    border: 'hover:border-gray-200 dark:hover:border-gray-700',
    glow: 'hover:shadow-xs hover:shadow-blue-100/30 dark:hover:shadow-blue-950/30'
  },
  medium: variantClasses,
  high: {
    subtle: 'hover:bg-gray-100 dark:hover:bg-gray-800/70',
    lift: 'hover:-translate-y-1 hover:shadow-md',
    scale: 'hover:scale-105 active:scale-95',
    fade: 'hover:opacity-70',
    border: 'hover:border-gray-400 dark:hover:border-gray-500',
    glow: 'hover:shadow-md hover:shadow-blue-300/60 dark:hover:shadow-blue-800/60'
  }
};

const durationClasses = {
  fast: 'transition-all duration-150 ease-out',
  normal: 'transition-all duration-200 ease-out',
  slow: 'transition-all duration-300 ease-out'
};

export function HoverEffects({
  children,
  variant = 'subtle',
  intensity = 'medium',
  duration = 'normal',
  className,
  disabled = false
}: HoverEffectsProps) {
  const hoverClass = disabled ? '' : intensityClasses[intensity][variant];
  const transitionClass = durationClasses[duration];

  return (
    <div
      className={cn(
        transitionClass,
        hoverClass,
        disabled && 'cursor-not-allowed opacity-60',
        className
      )}
    >
      {children}
    </div>
  );
}

// Componentes pré-configurados para casos comuns
export function HoverCard({ children, className, ...props }: Omit<HoverEffectsProps, 'variant'>) {
  return (
    <HoverEffects variant="lift" className={cn('rounded-lg p-4', className)} {...props}>
      {children}
    </HoverEffects>
  );
}

export function HoverButton({ children, className, ...props }: Omit<HoverEffectsProps, 'variant'>) {
  return (
    <HoverEffects variant="scale" className={cn('cursor-pointer', className)} {...props}>
      {children}
    </HoverEffects>
  );
}

export function HoverGlow({ children, className, ...props }: Omit<HoverEffectsProps, 'variant'>) {
  return (
    <HoverEffects 
      variant="glow" 
      className={cn('rounded-lg border border-transparent', className)} 
      {...props}
    >
      {children}
    </HoverEffects>
  );
}

// Hook para uso em componentes customizados
export function useHoverEffects(
  variant: HoverEffectsProps['variant'] = 'subtle',
  intensity: HoverEffectsProps['intensity'] = 'medium',
  duration: HoverEffectsProps['duration'] = 'normal'
) {
  return {
    className: cn(
      durationClasses[duration],
      intensityClasses[intensity][variant!]
    )
  };
}