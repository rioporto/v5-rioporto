'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface MinimalistCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'elevated' | 'outlined';
  padding?: 'sm' | 'md' | 'lg';
}

const MinimalistCard = forwardRef<HTMLDivElement, MinimalistCardProps>(
  ({ className, variant = 'default', padding = 'md', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          'rounded-lg bg-card text-card-foreground transition-all duration-200',
          
          // Padding variants
          {
            'p-4': padding === 'sm',
            'p-6': padding === 'md',
            'p-8': padding === 'lg',
          },
          
          // Variant styles
          {
            // Default - Subtle background
            'bg-card': variant === 'default',
            
            // Elevated - Soft shadow
            'bg-card shadow-md hover:shadow-lg': variant === 'elevated',
            
            // Outlined - Border with no background
            'bg-transparent border border-border': variant === 'outlined',
          },
          
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

MinimalistCard.displayName = 'MinimalistCard';

// Sub-components
const MinimalistCardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 pb-4', className)}
      {...props}
    />
  )
);
MinimalistCardHeader.displayName = 'MinimalistCardHeader';

const MinimalistCardTitle = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-lg font-semibold leading-tight tracking-tight', className)}
      {...props}
    />
  )
);
MinimalistCardTitle.displayName = 'MinimalistCardTitle';

const MinimalistCardDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-muted', className)}
      {...props}
    />
  )
);
MinimalistCardDescription.displayName = 'MinimalistCardDescription';

const MinimalistCardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('', className)} {...props} />
  )
);
MinimalistCardContent.displayName = 'MinimalistCardContent';

const MinimalistCardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center pt-4', className)}
      {...props}
    />
  )
);
MinimalistCardFooter.displayName = 'MinimalistCardFooter';

export {
  MinimalistCard,
  MinimalistCardHeader,
  MinimalistCardTitle,
  MinimalistCardDescription,
  MinimalistCardContent,
  MinimalistCardFooter,
};