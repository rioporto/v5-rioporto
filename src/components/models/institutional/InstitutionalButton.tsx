'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface InstitutionalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'error';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  children: React.ReactNode;
}

const InstitutionalButton = React.forwardRef<HTMLButtonElement, InstitutionalButtonProps>(
  ({ className, variant = 'default', size = 'md', loading = false, disabled, children, ...props }, ref) => {
    const baseStyles = `
      inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md 
      text-sm font-medium ring-offset-background transition-colors duration-300 
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
      focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
      font-semibold tracking-wide uppercase letter-spacing-wide
    `;

    const variants = {
      primary: 'bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg',
      secondary: 'bg-secondary text-white hover:bg-secondary/90 shadow-md hover:shadow-lg',
      outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
      ghost: 'text-primary hover:bg-primary/10',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md',
      error: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md'
    };

    const sizes = {
      sm: 'h-9 px-4 text-xs',
      md: 'h-11 px-6 text-sm',
      lg: 'h-13 px-8 text-base',
      xl: 'h-16 px-10 text-lg'
    };

    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {loading && (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </button>
    );
  }
);

InstitutionalButton.displayName = 'InstitutionalButton';

export default InstitutionalButton;