'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface FinancialCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated' | 'dense';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  header?: React.ReactNode;
  footer?: React.ReactNode;
  loading?: boolean;
}

const FinancialCard = forwardRef<HTMLDivElement, FinancialCardProps>(
  ({ 
    className, 
    variant = 'default',
    padding = 'md',
    header,
    footer,
    loading = false,
    children, 
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base styles - Professional dark card
          'bg-card border-border rounded-sm',
          'transition-all duration-150 ease-out',
          
          // Variant styles
          {
            // Default - Standard card
            'border': variant === 'default' || variant === 'dense',
            
            // Bordered - Emphasized border
            'border-2 border-primary/20': variant === 'bordered',
            
            // Elevated - With shadow
            'border shadow-md': variant === 'elevated',
          },
          
          className
        )}
        {...props}
      >
        {/* Header */}
        {header && (
          <div className={cn(
            'border-b border-border bg-muted/20',
            {
              'px-2 py-1': padding === 'sm' || variant === 'dense',
              'px-3 py-2': padding === 'md',
              'px-4 py-3': padding === 'lg',
            }
          )}>
            {header}
          </div>
        )}
        
        {/* Content */}
        <div className={cn(
          'relative',
          {
            'p-0': padding === 'none',
            'p-2': padding === 'sm' || variant === 'dense',
            'p-3': padding === 'md',
            'p-4': padding === 'lg',
          }
        )}>
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-card/80 backdrop-blur-sm">
              <div className="flex space-x-1">
                <div className="h-1 w-1 bg-primary rounded-full animate-pulse"></div>
                <div className="h-1 w-1 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                <div className="h-1 w-1 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          )}
          {children}
        </div>
        
        {/* Footer */}
        {footer && (
          <div className={cn(
            'border-t border-border bg-muted/10',
            {
              'px-2 py-1': padding === 'sm' || variant === 'dense',
              'px-3 py-2': padding === 'md',
              'px-4 py-3': padding === 'lg',
            }
          )}>
            {footer}
          </div>
        )}
      </div>
    );
  }
);

FinancialCard.displayName = 'FinancialCard';

// Card components for composition
const FinancialCardHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center justify-between', className)}
    {...props}
  />
));
FinancialCardHeader.displayName = 'FinancialCardHeader';

const FinancialCardTitle = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('font-mono text-sm font-semibold text-foreground', className)}
    {...props}
  />
));
FinancialCardTitle.displayName = 'FinancialCardTitle';

const FinancialCardContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('space-y-2', className)}
    {...props}
  />
));
FinancialCardContent.displayName = 'FinancialCardContent';

export { 
  FinancialCard, 
  FinancialCardHeader, 
  FinancialCardTitle, 
  FinancialCardContent 
};