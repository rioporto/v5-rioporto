import React from 'react';
import { cn } from '@/lib/utils';

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Footer variant
   */
  variant?: 'primary' | 'minimal' | 'dark';
}

/**
 * Footer component
 */
const Footer = React.forwardRef<HTMLElement, FooterProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-background border-t border-border',
      minimal: 'bg-transparent',
      dark: 'bg-muted',
    };

    return (
      <footer
        ref={ref}
        className={cn(
          'w-full py-6 px-4 md:px-6 lg:px-8',
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Footer.displayName = 'Footer';

export { Footer };