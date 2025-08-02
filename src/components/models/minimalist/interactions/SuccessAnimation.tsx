'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface SuccessAnimationProps {
  show?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'checkmark' | 'fade-in' | 'scale' | 'slide-up' | 'pulse' | 'bounce';
  color?: 'green' | 'blue' | 'purple' | 'gray';
  duration?: number;
  delay?: number;
  onComplete?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const sizeClasses = {
  xs: 'w-4 h-4',
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16'
};

const colorClasses = {
  green: 'text-green-500 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800',
  blue: 'text-blue-500 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800',
  purple: 'text-purple-500 bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800',
  gray: 'text-gray-500 bg-gray-50 border-gray-200 dark:bg-gray-900/20 dark:border-gray-800'
};

// Componente de checkmark animado
export function CheckmarkIcon({ className, size = 'md' }: { className?: string; size?: SuccessAnimationProps['size'] }) {
  return (
    <svg
      className={cn(sizeClasses[size!], 'animate-checkmark', className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path 
        d="m9 12 2 2 4-4" 
        className="animate-draw-check"
        style={{
          strokeDasharray: '10',
          strokeDashoffset: '10',
          animation: 'draw-check 0.5s ease-out 0.2s forwards'
        }}
      />
    </svg>
  );
}

export function SuccessAnimation({
  show = false,
  size = 'md',
  variant = 'checkmark',
  color = 'green',
  duration = 500,
  delay = 0,
  onComplete,
  className,
  children
}: SuccessAnimationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (show && !hasAnimated) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        setHasAnimated(true);
        
        if (onComplete) {
          setTimeout(onComplete, duration);
        }
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [show, delay, duration, onComplete, hasAnimated]);

  useEffect(() => {
    if (!show) {
      setIsVisible(false);
      setHasAnimated(false);
    }
  }, [show]);

  const getAnimationClasses = () => {
    switch (variant) {
      case 'checkmark':
        return isVisible 
          ? 'animate-scale-in opacity-100 scale-100' 
          : 'opacity-0 scale-50';
      case 'fade-in':
        return isVisible 
          ? 'animate-fade-in opacity-100' 
          : 'opacity-0';
      case 'scale':
        return isVisible 
          ? 'animate-scale-in opacity-100 scale-100' 
          : 'opacity-0 scale-75';
      case 'slide-up':
        return isVisible 
          ? 'animate-slide-up opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-4';
      case 'pulse':
        return isVisible 
          ? 'animate-pulse-success opacity-100' 
          : 'opacity-0';
      case 'bounce':
        return isVisible 
          ? 'animate-bounce-in opacity-100 scale-100' 
          : 'opacity-0 scale-50';
      default:
        return isVisible ? 'opacity-100' : 'opacity-0';
    }
  };

  if (!show && !isVisible) return null;

  return (
    <div
      className={cn(
        'transition-all duration-300 ease-out',
        getAnimationClasses(),
        className
      )}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {variant === 'checkmark' ? (
        <div className={cn(
          'flex items-center justify-center rounded-full border',
          sizeClasses[size],
          colorClasses[color]
        )}>
          <CheckmarkIcon size={size === 'xs' ? 'xs' : size === 'sm' ? 'xs' : 'sm'} />
        </div>
      ) : (
        children
      )}
    </div>
  );
}

// Componente de sucesso com texto
export function SuccessMessage({
  show = false,
  title = 'Sucesso!',
  message,
  variant = 'slide-up',
  color = 'green',
  duration = 3000,
  onDismiss,
  className
}: {
  show?: boolean;
  title?: string;
  message?: string;
  variant?: SuccessAnimationProps['variant'];
  color?: SuccessAnimationProps['color'];
  duration?: number;
  onDismiss?: () => void;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      
      if (duration > 0) {
        const timer = setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => onDismiss?.(), 300);
        }, duration);
        
        return () => clearTimeout(timer);
      }
    }
  }, [show, duration, onDismiss]);

  return (
    <SuccessAnimation
      show={isVisible}
      variant={variant}
      color={color}
      className={cn(
        'flex items-center gap-3 p-4 rounded-lg border shadow-sm',
        colorClasses[color],
        className
      )}
    >
      <CheckmarkIcon size="sm" />
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium">{title}</h4>
        {message && (
          <p className="text-xs opacity-75 mt-1">{message}</p>
        )}
      </div>
      {onDismiss && (
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onDismiss, 300);
          }}
          className="text-current opacity-50 hover:opacity-75 transition-opacity"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </SuccessAnimation>
  );
}

// Componente de badge de sucesso
export function SuccessBadge({
  show = false,
  text = 'Completo',
  size = 'sm',
  variant = 'scale',
  className
}: {
  show?: boolean;
  text?: string;
  size?: 'xs' | 'sm' | 'md';
  variant?: SuccessAnimationProps['variant'];
  className?: string;
}) {
  const badgeSize = {
    xs: 'text-xs px-2 py-1',
    sm: 'text-xs px-2.5 py-1.5',
    md: 'text-sm px-3 py-2'
  };

  return (
    <SuccessAnimation
      show={show}
      variant={variant}
      color="green"
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium',
        'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        badgeSize[size],
        className
      )}
    >
      <CheckmarkIcon size="xs" />
      {text}
    </SuccessAnimation>
  );
}

// Hook para controlar animações de sucesso
export function useSuccessAnimation(duration = 2000) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [message, setMessage] = useState('');

  const triggerSuccess = (msg?: string) => {
    if (msg) setMessage(msg);
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
    }, duration);
  };

  return {
    showSuccess,
    message,
    triggerSuccess,
    setShowSuccess
  };
}

// Estilos CSS customizados (adicionar ao globals.css)
export const successAnimationStyles = `
  @keyframes draw-check {
    to {
      stroke-dashoffset: 0;
    }
  }

  @keyframes scale-in {
    0% {
      opacity: 0;
      transform: scale(0.5);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slide-up {
    from {
      opacity: 0;
      transform: translateY(16px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes pulse-success {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.8;
      transform: scale(1.05);
    }
  }

  @keyframes bounce-in {
    0% {
      opacity: 0;
      transform: scale(0.3);
    }
    50% {
      transform: scale(1.05);
    }
    70% {
      transform: scale(0.9);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  .animate-checkmark {
    animation: scale-in 0.3s ease-out;
  }

  .animate-scale-in {
    animation: scale-in 0.3s ease-out;
  }

  .animate-fade-in {
    animation: fade-in 0.3s ease-out;
  }

  .animate-slide-up {
    animation: slide-up 0.3s ease-out;
  }

  .animate-pulse-success {
    animation: pulse-success 1s ease-in-out infinite;
  }

  .animate-bounce-in {
    animation: bounce-in 0.5s ease-out;
  }
`;