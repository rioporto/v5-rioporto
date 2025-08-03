'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface FinancialButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'buy' | 'sell' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  actionType?: 'buy' | 'sell' | 'neutral';
  fullWidth?: boolean;
}

const FinancialButton = forwardRef<HTMLButtonElement, FinancialButtonProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'md', 
    loading = false,
    actionType,
    fullWidth = false,
    disabled,
    children, 
    ...props 
  }, ref) => {
    return (
      <button
        className={cn(
          // Base styles - Professional trading interface
          'relative inline-flex items-center justify-center',
          'font-mono text-sm font-medium leading-none',
          'border transition-all duration-150 ease-out',
          'focus:outline-none focus:ring-2 focus:ring-primary/50',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'active:scale-[0.98]',
          
          // Size variants
          {
            'h-7 px-2 text-xs': size === 'sm',
            'h-8 px-3 text-sm': size === 'md', 
            'h-10 px-4 text-base': size === 'lg',
          },
          
          // Variant styles
          {
            // Primary - Financial Blue
            'bg-primary text-white border-primary hover:bg-primary/90': variant === 'default',
            
            // Secondary - Dark surface
            'bg-secondary text-foreground border-border hover:bg-secondary/80': variant === 'secondary',
            
            // Buy - Profit Green
            'bg-success text-white border-success hover:bg-success/90': variant === 'buy' || actionType === 'buy',
            
            // Sell - Loss Red  
            'bg-error text-white border-error hover:bg-error/90': variant === 'sell' || actionType === 'sell',
            
            // Ghost - Transparent
            'bg-transparent text-foreground border-transparent hover:bg-muted': variant === 'ghost',
            
            // Outline - Border only
            'bg-transparent text-foreground border-border hover:bg-muted': variant === 'outline',
          },
          
          // Full width
          {
            'w-full': fullWidth,
          },
          
          className
        )}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-3 w-3 animate-spin rounded-full border border-current border-r-transparent" />
          </div>
        )}
        <span className={cn(loading && 'opacity-0')}>
          {children}
        </span>
      </button>
    );
  }
);

FinancialButton.displayName = 'FinancialButton';

export { FinancialButton };