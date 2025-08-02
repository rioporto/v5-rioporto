'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface MinimalistButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const MinimalistButton = forwardRef<HTMLButtonElement, MinimalistButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading = false, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          
          // Size variants
          {
            'h-8 px-3 text-sm': size === 'sm',
            'h-10 px-4 text-sm': size === 'md',
            'h-12 px-6 text-base': size === 'lg',
          },
          
          // Variant styles
          {
            // Primary - Gold accent
            'bg-primary text-black hover:bg-primary/90 focus-visible:ring-primary shadow-sm': variant === 'primary',
            
            // Secondary - Light background
            'bg-secondary text-foreground hover:bg-secondary/80 focus-visible:ring-primary shadow-sm': variant === 'secondary',
            
            // Ghost - Transparent with hover
            'text-foreground hover:bg-secondary/50 focus-visible:ring-primary': variant === 'ghost',
            
            // Outline - Border with hover fill
            'border border-border text-foreground hover:bg-secondary focus-visible:ring-primary': variant === 'outline',
          },
          
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </button>
    );
  }
);

MinimalistButton.displayName = 'MinimalistButton';

export { MinimalistButton };