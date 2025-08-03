'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface InstitutionalCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'elevated' | 'outlined' | 'minimal';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

const InstitutionalCard = React.forwardRef<HTMLDivElement, InstitutionalCardProps>(
  ({ className, variant = 'default', padding = 'md', header, footer, children, ...props }, ref) => {
    const baseStyles = `
      rounded-md bg-card text-card-foreground border border-border
      transition-all duration-300
    `;

    const variants: Record<string, string> = {
      default: 'shadow-sm hover:shadow-md',
      elevated: 'shadow-md hover:shadow-lg border-0',
      outlined: 'border-2 shadow-none hover:shadow-sm',
      minimal: 'border-0 shadow-none bg-transparent'
    };

    const paddings = {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-10'
    };

    return (
      <div
        className={cn(
          baseStyles,
          variants[variant],
          className
        )}
        ref={ref}
        {...props}
      >
        {header && (
          <div className="border-b border-border pb-4 mb-4">
            {header}
          </div>
        )}
        
        <div className={cn(paddings[padding])}>
          {children}
        </div>
        
        {footer && (
          <div className="border-t border-border pt-4 mt-4">
            {footer}
          </div>
        )}
      </div>
    );
  }
);

InstitutionalCard.displayName = 'InstitutionalCard';

// Header component
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export const InstitutionalCardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, title, subtitle, actions, children, ...props }, ref) => {
    return (
      <div
        className={cn('flex items-start justify-between', className)}
        ref={ref}
        {...props}
      >
        <div className="space-y-1">
          {title && (
            <h3 className="text-lg font-semibold text-foreground leading-tight">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-sm text-muted-foreground">
              {subtitle}
            </p>
          )}
          {children}
        </div>
        {actions && (
          <div className="flex items-center gap-2 ml-4">
            {actions}
          </div>
        )}
      </div>
    );
  }
);

InstitutionalCardHeader.displayName = 'InstitutionalCardHeader';

// Footer component
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  justify?: 'start' | 'end' | 'between' | 'center';
}

export const InstitutionalCardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, justify = 'end', children, ...props }, ref) => {
    const justifyClasses = {
      start: 'justify-start',
      end: 'justify-end',
      between: 'justify-between',
      center: 'justify-center'
    };

    return (
      <div
        className={cn(
          'flex items-center gap-3',
          justifyClasses[justify],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

InstitutionalCardFooter.displayName = 'InstitutionalCardFooter';

export default InstitutionalCard;