'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface GlassmorphismBoxProps {
  children: React.ReactNode;
  variant?: 'ultra-light' | 'light' | 'medium' | 'heavy' | 'opaque';
  blur?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  border?: boolean;
  borderGlow?: boolean;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  noise?: boolean;
  animated?: boolean;
  className?: string;
}

export function GlassmorphismBox({
  children,
  variant = 'medium',
  blur = 'xl',
  border = true,
  borderGlow = false,
  rounded = 'xl',
  shadow = 'lg',
  noise = true,
  animated = true,
  className,
  ...props
}: GlassmorphismBoxProps) {
  const baseClasses = [
    'relative overflow-hidden',
    animated && 'transition-all duration-300 transform-gpu'
  ];

  const variantClasses = {
    'ultra-light': 'bg-white/[0.02]',
    light: 'bg-white/[0.05]',
    medium: 'bg-white/[0.08]',
    heavy: 'bg-white/[0.12]',
    opaque: 'bg-black/60'
  };

  const blurClasses = {
    none: '',
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl',
    '2xl': 'backdrop-blur-2xl',
    '3xl': 'backdrop-blur-3xl'
  };

  const borderClasses = border ? {
    'ultra-light': 'border border-white/5',
    light: 'border border-white/10',
    medium: 'border border-white/15',
    heavy: 'border border-white/20',
    opaque: 'border border-white/25'
  } : {};

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

  const shadowClasses = {
    none: '',
    sm: 'shadow-[0_4px_16px_rgba(0,0,0,0.1)]',
    md: 'shadow-[0_8px_24px_rgba(0,0,0,0.15)]',
    lg: 'shadow-[0_12px_32px_rgba(0,0,0,0.2)]',
    xl: 'shadow-[0_16px_40px_rgba(0,0,0,0.25)]',
    '2xl': 'shadow-[0_24px_48px_rgba(0,0,0,0.3)]'
  };

  const classes = cn(
    baseClasses,
    variantClasses[variant],
    blurClasses[blur],
    border && borderClasses[variant],
    roundedClasses[rounded],
    shadowClasses[shadow],
    borderGlow && 'shadow-[0_0_20px_rgba(153,69,255,0.2)]',
    animated && 'hover:shadow-[0_0_40px_rgba(153,69,255,0.3)]',
    className
  );

  return (
    <div className={classes} {...props}>
      {/* Border glow effect */}
      {borderGlow && (
        <div className="absolute inset-0 rounded-[inherit] p-[1px] bg-gradient-to-r from-purple-400/50 via-pink-400/50 to-purple-400/50">
          <div className="w-full h-full rounded-[inherit] bg-black/50" />
        </div>
      )}

      {/* Noise texture overlay */}
      {noise && (
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay rounded-[inherit]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Shimmer effect on hover */}
      {animated && (
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-[inherit] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-pulse" />
        </div>
      )}
    </div>
  );
}

interface GlassCardProps {
  children: React.ReactNode;
  variant?: 'ultra-light' | 'light' | 'medium' | 'heavy' | 'opaque';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  glow?: boolean;
  className?: string;
}

export function GlassCard({
  children,
  variant = 'medium', 
  padding = 'md',
  hover = true,
  glow = false,
  className,
  ...props
}: GlassCardProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  };

  return (
    <GlassmorphismBox
      variant={variant}
      borderGlow={glow}
      animated={hover}
      className={cn(paddingClasses[padding], className)}
      {...props}
    >
      {children}
    </GlassmorphismBox>
  );
}

interface GlassNavigationProps {
  children: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function GlassNavigation({
  children,
  orientation = 'horizontal',
  className,
  ...props
}: GlassNavigationProps) {
  return (
    <GlassmorphismBox
      variant="medium"
      blur="xl"
      border={true}
      borderGlow={true}
      rounded="2xl"
      shadow="xl"
      className={cn(
        'p-2',
        orientation === 'horizontal' ? 'flex items-center space-x-2' : 'flex flex-col space-y-2',
        className
      )}
      {...props}
    >
      {children}
    </GlassmorphismBox>
  );
}

interface GlassPanelProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function GlassPanel({
  children,
  title,
  description,
  actions,
  className,
  ...props
}: GlassPanelProps) {
  return (
    <GlassmorphismBox
      variant="medium"
      blur="xl"
      border={true}
      rounded="2xl"
      shadow="xl"
      className={cn('overflow-hidden', className)}
      {...props}
    >
      {(title || description || actions) && (
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex-1">
            {title && (
              <h3 className="text-lg font-semibold text-white font-display">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-sm text-gray-400 mt-1">
                {description}
              </p>
            )}
          </div>
          {actions && (
            <div className="ml-4">
              {actions}
            </div>
          )}
        </div>
      )}
      
      <div className="p-4">
        {children}
      </div>
    </GlassmorphismBox>
  );
}

interface GlassModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

export function GlassModal({
  children,
  isOpen,
  onClose,
  size = 'md',
  className,
  ...props
}: GlassModalProps) {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-4'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-xl animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <GlassmorphismBox
        variant="heavy"
        blur="xl"
        border={true}
        borderGlow={true}
        rounded="2xl"
        shadow="2xl"
        className={cn(
          'relative w-full animate-in zoom-in-95 fade-in duration-300',
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </GlassmorphismBox>
    </div>
  );
}

interface FrostedGlassProps {
  children: React.ReactNode;
  intensity?: 'light' | 'medium' | 'heavy';
  tint?: 'none' | 'purple' | 'blue' | 'green' | 'pink';
  className?: string;
}

export function FrostedGlass({
  children,
  intensity = 'medium',
  tint = 'none',
  className,
  ...props
}: FrostedGlassProps) {
  const intensityClasses = {
    light: 'backdrop-blur-sm bg-white/5',
    medium: 'backdrop-blur-md bg-white/8',
    heavy: 'backdrop-blur-lg bg-white/12'
  };

  const tintClasses = {
    none: '',
    purple: 'bg-purple-500/5',
    blue: 'bg-blue-500/5',
    green: 'bg-green-500/5',
    pink: 'bg-pink-500/5'
  };

  return (
    <div 
      className={cn(
        'relative overflow-hidden border border-white/20 rounded-xl',
        intensityClasses[intensity],
        tintClasses[tint],
        className
      )}
      {...props}
    >
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Frost pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='frost'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23frost)' fill='white'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
}