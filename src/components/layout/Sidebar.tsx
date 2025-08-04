'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: 'fixed' | 'relative';
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  collapsed?: boolean;
}

/**
 * Sidebar component for navigation
 */
const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ 
    className, 
    position = 'relative',
    open = true,
    onOpenChange,
    collapsed = false,
    children,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-card border-r transition-all duration-300',
          position === 'fixed' && 'fixed top-0 left-0 z-50 h-full',
          collapsed ? 'w-16' : 'w-64',
          !open && position === 'fixed' && '-translate-x-full',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Sidebar.displayName = 'Sidebar';

/**
 * Sidebar Header component
 */
const SidebarHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('p-4 border-b', className)}
        {...props}
      />
    );
  }
);

SidebarHeader.displayName = 'SidebarHeader';

/**
 * Sidebar Content component
 */
const SidebarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex-1 overflow-auto p-4', className)}
        {...props}
      />
    );
  }
);

SidebarContent.displayName = 'SidebarContent';

/**
 * Sidebar Footer component
 */
const SidebarFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('p-4 border-t', className)}
        {...props}
      />
    );
  }
);

SidebarFooter.displayName = 'SidebarFooter';

export { Sidebar, SidebarHeader, SidebarContent, SidebarFooter };