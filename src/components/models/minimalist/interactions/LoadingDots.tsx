'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingDotsProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'gray' | 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'white' | 'current';
  speed?: 'slow' | 'normal' | 'fast';
  count?: 3 | 4 | 5;
  className?: string;
  label?: string;
}

const sizeClasses = {
  xs: 'w-1 h-1',
  sm: 'w-1.5 h-1.5',
  md: 'w-2 h-2',
  lg: 'w-3 h-3',
  xl: 'w-4 h-4'
};

const colorClasses = {
  gray: 'bg-gray-400 dark:bg-gray-600',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  red: 'bg-red-500',
  yellow: 'bg-yellow-500',
  purple: 'bg-purple-500',
  white: 'bg-white',
  current: 'bg-currentColor'
};

const speedClasses = {
  slow: 'animate-pulse [animation-duration:2s]',
  normal: 'animate-pulse [animation-duration:1.5s]',
  fast: 'animate-pulse [animation-duration:1s]'
};

const gapClasses = {
  xs: 'gap-1',
  sm: 'gap-1.5',
  md: 'gap-2',
  lg: 'gap-2.5',
  xl: 'gap-3'
};

export function LoadingDots({
  size = 'md',
  color = 'gray',
  speed = 'normal',
  count = 3,
  className,
  label = 'Carregando...'
}: LoadingDotsProps) {
  const dots = Array.from({ length: count }, (_, i) => i);

  return (
    <div 
      className={cn('flex items-center justify-center', gapClasses[size], className)}
      role="status" 
      aria-label={label}
    >
      {dots.map((_, index) => (
        <div
          key={index}
          className={cn(
            'rounded-full',
            sizeClasses[size],
            colorClasses[color],
            speedClasses[speed]
          )}
          style={{
            animationDelay: `${index * 0.2}s`,
            animationFillMode: 'both'
          }}
        />
      ))}
      <span className="sr-only">{label}</span>
    </div>
  );
}

// Variação com animação de escala
export function LoadingDotsScale({
  size = 'md',
  color = 'gray',
  speed = 'normal',
  count = 3,
  className,
  label = 'Carregando...'
}: LoadingDotsProps) {
  const dots = Array.from({ length: count }, (_, i) => i);
  
  const animationDuration = {
    slow: '1.4s',
    normal: '1.0s',
    fast: '0.6s'
  }[speed];

  return (
    <div 
      className={cn('flex items-center justify-center', gapClasses[size], className)}
      role="status" 
      aria-label={label}
    >
      {dots.map((_, index) => (
        <div
          key={index}
          className={cn(
            'rounded-full animate-bounce',
            sizeClasses[size],
            colorClasses[color]
          )}
          style={{
            animationDelay: `${index * 0.1}s`,
            animationDuration,
            animationFillMode: 'both'
          }}
        />
      ))}
      <span className="sr-only">{label}</span>
    </div>
  );
}

// Variação com barra de progresso
export function LoadingBar({
  width = 'w-32',
  height = 'h-1',
  color = 'blue',
  speed = 'normal',
  className,
  label = 'Carregando...'
}: {
  width?: string;
  height?: string;
  color?: LoadingDotsProps['color'];
  speed?: LoadingDotsProps['speed'];
  className?: string;
  label?: string;
}) {
  const animationDuration = {
    slow: '2s',
    normal: '1.5s',
    fast: '1s'
  }[speed];

  return (
    <div 
      className={cn('relative overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700', width, height, className)}
      role="status"
      aria-label={label}
    >
      <div
        className={cn(
          'absolute inset-0 rounded-full',
          colorClasses[color],
          'animate-pulse'
        )}
        style={{
          animationDuration,
          transform: 'translateX(-100%)',
          animation: `loading-bar ${animationDuration} ease-in-out infinite`
        }}
      />
      <span className="sr-only">{label}</span>
      
      <style jsx>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}

// Variação com spinner circular
export function LoadingSpinner({
  size = 'md',
  color = 'blue',
  speed = 'normal',
  thickness = 'medium',
  className,
  label = 'Carregando...'
}: {
  size?: LoadingDotsProps['size'];
  color?: LoadingDotsProps['color'];
  speed?: LoadingDotsProps['speed'];
  thickness?: 'thin' | 'medium' | 'thick';
  className?: string;
  label?: string;
}) {
  const sizeMap = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const thicknessMap = {
    thin: 'border',
    medium: 'border-2',
    thick: 'border-4'
  };

  const animationDuration = {
    slow: 'animate-spin [animation-duration:2s]',
    normal: 'animate-spin [animation-duration:1s]',
    fast: 'animate-spin [animation-duration:0.5s]'
  }[speed];

  const borderColor = color === 'current' 
    ? 'border-current border-t-transparent' 
    : `border-gray-200 dark:border-gray-700 border-t-${color}-500`;

  return (
    <div
      className={cn(
        'rounded-full',
        sizeMap[size],
        thicknessMap[thickness],
        borderColor,
        animationDuration,
        className
      )}
      role="status"
      aria-label={label}
    >
      <span className="sr-only">{label}</span>
    </div>
  );
}

// Componente de loading com texto
export function LoadingWithText({
  text = 'Carregando...',
  dots = true,
  size = 'md',
  color = 'gray',
  className
}: {
  text?: string;
  dots?: boolean;
  size?: LoadingDotsProps['size'];
  color?: LoadingDotsProps['color'];
  className?: string;
}) {
  return (
    <div className={cn('flex items-center justify-center gap-3', className)}>
      {dots && <LoadingDots size={size} color={color} />}
      <span className="text-sm text-gray-600 dark:text-gray-400 animate-pulse">
        {text}
      </span>
    </div>
  );
}

// Hook para controlar estados de loading
export function useLoadingState(initialLoading = false) {
  const [isLoading, setIsLoading] = React.useState(initialLoading);
  const [loadingText, setLoadingText] = React.useState('Carregando...');

  const startLoading = (text?: string) => {
    if (text) setLoadingText(text);
    setIsLoading(true);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  return {
    isLoading,
    loadingText,
    startLoading,
    stopLoading,
    setLoadingText
  };
}