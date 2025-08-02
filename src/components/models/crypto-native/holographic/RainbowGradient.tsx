'use client';

import { useState, useEffect } from 'react';

interface RainbowGradientProps {
  children?: React.ReactNode;
  variant?: 'classic' | 'neon' | 'pastel' | 'vivid' | 'cyberpunk' | 'aurora' | 'fire' | 'ocean';
  direction?: 'horizontal' | 'vertical' | 'diagonal' | 'radial' | 'conic';
  animated?: boolean;
  speed?: 'slow' | 'normal' | 'fast' | 'ultra';
  intensity?: 'subtle' | 'medium' | 'bold' | 'extreme';
  as?: 'div' | 'span' | 'section' | 'article' | 'header' | 'footer' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  className?: string;
  style?: React.CSSProperties;
}

export function RainbowGradient({
  children,
  variant = 'classic',
  direction = 'horizontal',
  animated = true,
  speed = 'normal',
  intensity = 'medium',
  as: Component = 'div',
  className = '',
  style = {}
}: RainbowGradientProps) {
  const [currentHue, setCurrentHue] = useState(0);

  const gradientVariants = {
    classic: {
      colors: ['#ff0000', '#ff8000', '#ffff00', '#80ff00', '#00ff00', '#00ff80', '#00ffff', '#0080ff', '#0000ff', '#8000ff', '#ff00ff', '#ff0080'],
      stops: 'from-red-500 via-orange-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500'
    },
    neon: {
      colors: ['#ff073a', '#ff6b35', '#f7931e', '#ffe135', '#39ff14', '#00ffff', '#ff00ff', '#bf00ff'],
      stops: 'from-pink-500 via-orange-400 via-yellow-400 via-lime-400 via-cyan-400 to-purple-500'
    },
    pastel: {
      colors: ['#ffb3ba', '#ffdfba', '#ffffba', '#baffc9', '#bae1ff', '#d4baff', '#ffbaff'],
      stops: 'from-pink-300 via-orange-300 via-yellow-300 via-green-300 via-blue-300 to-purple-300'
    },
    vivid: {
      colors: ['#ff0040', '#ff8000', '#ffff00', '#40ff00', '#00ffff', '#8000ff', '#ff0080'],
      stops: 'from-rose-600 via-orange-500 via-yellow-400 via-lime-500 via-cyan-400 to-purple-600'
    },
    cyberpunk: {
      colors: ['#00ffff', '#ff00ff', '#ffff00', '#ff0040', '#8000ff'],
      stops: 'from-cyan-400 via-purple-500 via-pink-500 via-yellow-400 to-red-500'
    },
    aurora: {
      colors: ['#00ff9f', '#00b4d8', '#0077b6', '#7209b7', '#f72585'],
      stops: 'from-emerald-400 via-sky-500 via-blue-600 via-purple-600 to-pink-500'
    },
    fire: {
      colors: ['#ff4500', '#ff6347', '#ff8c00', '#ffd700', '#ffff00'],
      stops: 'from-red-600 via-orange-500 via-amber-500 to-yellow-400'
    },
    ocean: {
      colors: ['#006994', '#0077be', '#0099e5', '#00c6fb', '#005bea'],
      stops: 'from-blue-800 via-blue-600 via-sky-400 to-blue-500'
    }
  };

  const directionClasses = {
    horizontal: 'bg-gradient-to-r',
    vertical: 'bg-gradient-to-b',
    diagonal: 'bg-gradient-to-br',
    radial: 'bg-radial-gradient',
    conic: 'bg-conic-gradient'
  };

  const speedClasses = {
    slow: 'animate-gradient-slow',
    normal: 'animate-gradient',
    fast: 'animate-gradient-fast',
    ultra: 'animate-gradient-ultra'
  };

  const intensityClasses = {
    subtle: 'opacity-60',
    medium: 'opacity-80',
    bold: 'opacity-95',
    extreme: 'opacity-100'
  };

  // Dynamic color animation for extreme intensity
  useEffect(() => {
    if (animated && intensity === 'extreme') {
      const interval = setInterval(() => {
        setCurrentHue(prev => (prev + 1) % 360);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [animated, intensity]);

  const currentVariant = gradientVariants[variant];
  
  // Dynamic gradient for extreme intensity
  const dynamicStyle = intensity === 'extreme' && animated ? {
    background: `linear-gradient(45deg, hsl(${currentHue}, 100%, 50%), hsl(${(currentHue + 60) % 360}, 100%, 50%), hsl(${(currentHue + 120) % 360}, 100%, 50%), hsl(${(currentHue + 180) % 360}, 100%, 50%), hsl(${(currentHue + 240) % 360}, 100%, 50%), hsl(${(currentHue + 300) % 360}, 100%, 50%))`,
    backgroundSize: '400% 400%',
    ...style
  } : style;

  return (
    <Component
      className={`
        ${intensity !== 'extreme' ? directionClasses[direction] : ''}
        ${intensity !== 'extreme' ? currentVariant.stops : ''}
        ${animated && intensity !== 'extreme' ? speedClasses[speed] : ''}
        ${intensityClasses[intensity]}
        ${className}
      `}
      style={dynamicStyle}
    >
      {children}
    </Component>
  );
}

// Background Gradient Component
interface RainbowBackgroundProps extends Omit<RainbowGradientProps, 'children'> {
  children: React.ReactNode;
  overlay?: boolean;
  overlayOpacity?: number;
}

export function RainbowBackground({
  children,
  overlay = true,
  overlayOpacity = 0.9,
  className = '',
  ...props
}: RainbowBackgroundProps) {
  return (
    <RainbowGradient
      className={`min-h-screen relative ${className}`}
      {...props}
    >
      {overlay && (
        <div 
          className="absolute inset-0 bg-gray-900"
          style={{ opacity: overlayOpacity }}
        />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </RainbowGradient>
  );
}

// Text Gradient Component
interface RainbowTextProps extends Omit<RainbowGradientProps, 'children' | 'as'> {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
}

export function RainbowText({
  children,
  as: Component = 'span',
  className = '',
  ...props
}: RainbowTextProps) {
  return (
    <RainbowGradient
      as={Component}
      className={`bg-clip-text text-transparent font-bold ${className}`}
      {...props}
    >
      {children}
    </RainbowGradient>
  );
}

// Border Gradient Component
interface RainbowBorderProps extends RainbowGradientProps {
  borderWidth?: 1 | 2 | 3 | 4 | 6 | 8;
  borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export function RainbowBorder({
  children,
  borderWidth = 2,
  borderRadius = 'lg',
  className = '',
  ...props
}: RainbowBorderProps) {
  const radiusClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full'
  };

  return (
    <RainbowGradient
      className={`p-[${borderWidth}px] ${radiusClasses[borderRadius]} ${className}`}
      {...props}
    >
      <div className={`bg-gray-900 ${radiusClasses[borderRadius]} w-full h-full`}>
        {children}
      </div>
    </RainbowGradient>
  );
}

// Animated Progress Bar
interface RainbowProgressProps extends Omit<RainbowGradientProps, 'children'> {
  value: number;
  max?: number;
  showValue?: boolean;
  height?: 'sm' | 'md' | 'lg';
}

export function RainbowProgress({
  value,
  max = 100,
  showValue = false,
  height = 'md',
  className = '',
  ...props
}: RainbowProgressProps) {
  const percentage = Math.min(100, (value / max) * 100);
  
  const heightClasses = {
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6'
  };

  return (
    <div className={`relative w-full bg-gray-700 rounded-full overflow-hidden ${heightClasses[height]} ${className}`}>
      <RainbowGradient
        className={`h-full transition-all duration-500 ease-out`}
        style={{ width: `${percentage}%` }}
        {...props}
      />
      {showValue && (
        <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  );
}

// Glowing Orb Component
interface RainbowOrbProps extends Omit<RainbowGradientProps, 'children' | 'direction'> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  glow?: boolean;
  pulse?: boolean;
}

export function RainbowOrb({
  size = 'md',
  glow = true,
  pulse = false,
  className = '',
  ...props
}: RainbowOrbProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32'
  };

  return (
    <div className="relative">
      <RainbowGradient
        direction="radial"
        className={`
          ${sizeClasses[size]} rounded-full
          ${pulse ? 'animate-pulse' : ''}
          ${className}
        `}
        {...props}
      />
      {glow && (
        <RainbowGradient
          direction="radial"
          className={`
            absolute inset-0 ${sizeClasses[size]} rounded-full
            blur-xl opacity-60 scale-150 animate-pulse
          `}
          {...props}
        />
      )}
    </div>
  );
}

// Animated Lines Component
interface RainbowLinesProps extends Omit<RainbowGradientProps, 'children'> {
  count?: number;
  spacing?: 'tight' | 'normal' | 'loose';
  thickness?: 'thin' | 'normal' | 'thick';
}

export function RainbowLines({
  count = 5,
  spacing = 'normal',
  thickness = 'normal',
  direction = 'horizontal',
  className = '',
  ...props
}: RainbowLinesProps) {
  const spacingClasses = {
    tight: 'gap-1',
    normal: 'gap-2',
    loose: 'gap-4'
  };

  const thicknessClasses = {
    thin: direction === 'horizontal' ? 'h-px' : 'w-px',
    normal: direction === 'horizontal' ? 'h-0.5' : 'w-0.5',
    thick: direction === 'horizontal' ? 'h-1' : 'w-1'
  };

  const containerClass = direction === 'horizontal' ? 'flex flex-col' : 'flex flex-row';

  return (
    <div className={`${containerClass} ${spacingClasses[spacing]} ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <RainbowGradient
          key={index}
          direction={direction}
          className={`
            ${thicknessClasses[thickness]}
            ${direction === 'horizontal' ? 'w-full' : 'h-full'}
          `}
          style={{ animationDelay: `${index * 0.1}s` }}
          {...props}
        />
      ))}
    </div>
  );
}