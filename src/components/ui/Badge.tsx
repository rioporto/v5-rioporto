'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export type BadgeVariant = 'default' | 'secondary' | 'success' | 'error' | 'warning' | 'outline' | 'ghost';
export type BadgeSize = 'sm' | 'md' | 'lg';

const getVariantClasses = (variant: BadgeVariant): string => {
  const variants = {
    default: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    success: 'bg-success text-white',
    error: 'bg-error text-white',
    warning: 'bg-warning text-black',
    outline: 'border text-foreground hover:bg-accent',
    ghost: 'text-muted hover:bg-accent'
  };
  return variants[variant];
};

const getSizeClasses = (size: BadgeSize): string => {
  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };
  return sizes[size];
};

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  clickable?: boolean;
  dismissible?: boolean;
  onDismiss?: () => void;
}

/**
 * Badge component for status and labels
 */
const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'md',
    leftIcon,
    rightIcon,
    clickable = false,
    dismissible = false,
    onDismiss,
    children,
    onClick,
    ...props 
  }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (clickable && onClick) {
        onClick(e);
      }
    };

    const handleDismiss = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onDismiss?.();
    };

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded font-medium transition-all',
          getVariantClasses(variant),
          getSizeClasses(size),
          (clickable || dismissible) && 'cursor-pointer select-none',
          className
        )}
        onClick={handleClick}
        role={clickable ? 'button' : undefined}
        tabIndex={clickable ? 0 : undefined}
        onKeyDown={clickable ? (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick(e as any);
          }
        } : undefined}
        {...props}
      >
        {leftIcon && (
          <span className="flex items-center" style={{ marginRight: '0.25rem' }}>
            {leftIcon}
          </span>
        )}
        
        {children}
        
        {rightIcon && !dismissible && (
          <span className="flex items-center" style={{ marginLeft: '0.25rem' }}>
            {rightIcon}
          </span>
        )}
        
        {dismissible && (
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full hover:opacity-70 focus:outline-none"
            style={{ 
              marginLeft: '0.25rem',
              width: '1rem',
              height: '1rem'
            }}
            onClick={handleDismiss}
            aria-label="Dismiss"
          >
            <svg
              style={{ width: '0.75rem', height: '0.75rem' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };