'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/shared/Logo';
import { MinimalistButton } from './MinimalistButton';

export interface MinimalistHeaderProps extends React.HTMLAttributes<HTMLElement> {
  showBorder?: boolean;
  sticky?: boolean;
}

const MinimalistHeader = forwardRef<HTMLElement, MinimalistHeaderProps>(
  ({ className, showBorder = true, sticky = true, children, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={cn(
          // Base styles
          'w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
          
          // Border
          showBorder && 'border-b border-border',
          
          // Sticky positioning
          sticky && 'sticky top-0 z-50',
          
          className
        )}
        {...props}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo section */}
            <div className="flex items-center">
              <Logo className="h-8 w-auto" />
            </div>

            {/* Navigation or custom content */}
            <div className="flex items-center space-x-6">
              {children}
            </div>
          </div>
        </div>
      </header>
    );
  }
);

MinimalistHeader.displayName = 'MinimalistHeader';

// Navigation component for header
const MinimalistNavigation = forwardRef<HTMLNavElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, ref) => (
    <nav
      ref={ref}
      className={cn('hidden md:flex items-center space-x-8', className)}
      {...props}
    >
      {children}
    </nav>
  )
);
MinimalistNavigation.displayName = 'MinimalistNavigation';

// Navigation link component
interface MinimalistNavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
}

const MinimalistNavLink = forwardRef<HTMLAnchorElement, MinimalistNavLinkProps>(
  ({ className, active = false, children, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(
        'text-sm font-medium transition-colors duration-200 hover:text-primary',
        active ? 'text-primary' : 'text-foreground/70',
        className
      )}
      {...props}
    >
      {children}
    </a>
  )
);
MinimalistNavLink.displayName = 'MinimalistNavLink';

// Action buttons section
const MinimalistHeaderActions = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center space-x-3', className)}
      {...props}
    >
      {children}
    </div>
  )
);
MinimalistHeaderActions.displayName = 'MinimalistHeaderActions';

export {
  MinimalistHeader,
  MinimalistNavigation,
  MinimalistNavLink,
  MinimalistHeaderActions,
};