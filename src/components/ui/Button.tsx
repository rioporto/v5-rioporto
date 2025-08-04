'use client';

import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Button variant type
 */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning' | 'link';

/**
 * Button size type
 */
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl' | 'icon';

/**
 * Get button variant classes
 */
const getVariantClasses = (variant: ButtonVariant): string => {
  const variants = {
    primary: 'btn btn-primary',
    secondary: 'btn btn-secondary',
    outline: 'btn border bg-background hover:bg-accent',
    ghost: 'btn hover:bg-accent',
    danger: 'btn bg-error text-white hover:opacity-90',
    success: 'btn bg-success text-white hover:opacity-90',
    warning: 'btn bg-warning text-black hover:opacity-90',
    link: 'text-primary hover:opacity-80 underline'
  };
  return variants[variant];
};

/**
 * Get button size classes
 */
const getSizeClasses = (size: ButtonSize): string => {
  const sizes = {
    sm: 'text-sm px-3 py-1',
    md: 'px-4 py-2',
    lg: 'text-lg px-8 py-3',
    xl: 'text-xl px-10 py-4',
    icon: 'p-2 w-10 h-10'
  };
  return sizes[size];
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button visual variant
   */
  variant?: ButtonVariant;
  /**
   * Button size
   */
  size?: ButtonSize;
  /**
   * Loading state to show spinner
   */
  loading?: boolean;
  /**
   * Icon to display before text
   */
  leftIcon?: React.ReactNode;
  /**
   * Icon to display after text
   */
  rightIcon?: React.ReactNode;
  /**
   * Whether the button should take full width
   */
  fullWidth?: boolean;
}

/**
 * Button component with multiple variants and states
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="md">Click me</Button>
 * <Button variant="outline" leftIcon={<Icon />}>With icon</Button>
 * <Button loading>Loading...</Button>
 * ```
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    loading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    children, 
    disabled,
    ...props 
  }, ref) => {
    return (
      <button
        className={cn(
          getVariantClasses(variant),
          getSizeClasses(size),
          'transition-all',
          fullWidth && 'w-full',
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin"
            style={{
              width: '1rem',
              height: '1rem',
              marginRight: '0.5rem'
            }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              style={{ opacity: 0.25 }}
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              style={{ opacity: 0.75 }}
              fill="currentColor"
              d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        
        {!loading && leftIcon && (
          <span className="flex items-center" style={{ marginRight: '0.5rem' }}>
            {leftIcon}
          </span>
        )}
        
        {children}
        
        {!loading && rightIcon && (
          <span className="flex items-center" style={{ marginLeft: '0.5rem' }}>
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };