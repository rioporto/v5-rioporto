'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Badge component variants using CVA
 */
const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        success: 'border-transparent bg-success text-white hover:bg-success/80',
        error: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        warning: 'border-transparent bg-warning text-black hover:bg-warning/80',
        outline: 'text-foreground border-border hover:bg-accent hover:text-accent-foreground',
        ghost: 'border-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  /**
   * Icon to display before text
   */
  leftIcon?: React.ReactNode;
  /**
   * Icon to display after text
   */
  rightIcon?: React.ReactNode;
  /**
   * Whether the badge is clickable
   */
  clickable?: boolean;
  /**
   * Whether the badge can be dismissed
   */
  dismissible?: boolean;
  /**
   * Callback when badge is dismissed
   */
  onDismiss?: () => void;
}

/**
 * Badge component for status and labels
 * 
 * @example
 * ```tsx
 * <Badge variant="success">Active</Badge>
 * <Badge variant="error" dismissible onDismiss={() => {}}>Error</Badge>
 * <Badge leftIcon={<Icon />}>With icon</Badge>
 * ```
 */
const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ 
    className, 
    variant, 
    size,
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
          badgeVariants({ variant, size, className }),
          (clickable || dismissible) && 'cursor-pointer select-none',
          clickable && 'hover:scale-105 active:scale-95',
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
          <span className="mr-1 flex items-center">{leftIcon}</span>
        )}
        
        {children}
        
        {rightIcon && !dismissible && (
          <span className="ml-1 flex items-center">{rightIcon}</span>
        )}
        
        {dismissible && (
          <button
            type="button"
            className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-black/10 dark:hover:bg-white/10 focus:outline-none focus:ring-1 focus:ring-current"
            onClick={handleDismiss}
            aria-label="Dismiss"
          >
            <svg
              className="w-3 h-3"
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

export { Badge, badgeVariants };