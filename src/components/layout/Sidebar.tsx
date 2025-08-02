import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const sidebarVariants = cva(
  'flex flex-col bg-card border-r border-border transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'bg-card',
        dark: 'bg-background',
        transparent: 'bg-transparent border-transparent',
      },
      width: {
        sm: 'w-48',
        md: 'w-64',
        lg: 'w-80',
      },
      position: {
        fixed: 'fixed left-0 top-0 h-screen z-40',
        sticky: 'sticky top-0 h-screen',
        relative: 'relative',
      },
    },
    defaultVariants: {
      variant: 'default',
      width: 'md',
      position: 'sticky',
    },
  }
);

export interface SidebarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarVariants> {
  /**
   * Whether sidebar is collapsed
   */
  collapsed?: boolean;
  /**
   * Whether sidebar is open (mobile)
   */
  open?: boolean;
  /**
   * Callback when sidebar state changes
   */
  onOpenChange?: (open: boolean) => void;
}

/**
 * Sidebar component for navigation
 * 
 * @example
 * ```tsx
 * <Sidebar>
 *   <SidebarHeader>
 *     <Logo />
 *   </SidebarHeader>
 *   <SidebarContent>
 *     <Navigation />
 *   </SidebarContent>
 * </Sidebar>
 * ```
 */
const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ 
    className, 
    variant,
    width,
    position,
    collapsed = false,
    open = true,
    onOpenChange,
    children,
    ...props 
  }, ref) => {
    return (
      <>
        {/* Mobile overlay */}
        {position === 'fixed' && open && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => onOpenChange?.(false)}
          />
        )}
        
        <div
          ref={ref}
          className={cn(
            sidebarVariants({ variant, width, position }),
            collapsed && 'w-16',
            position === 'fixed' && !open && '-translate-x-full lg:translate-x-0',
            className
          )}
          {...props}
        >
          {children}
        </div>
      </>
    );
  }
);

/**
 * Sidebar header component
 */
const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center px-6 py-4 border-b border-border', className)}
    {...props}
  />
));

/**
 * Sidebar content component
 */
const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex-1 overflow-y-auto py-4', className)}
    {...props}
  />
));

/**
 * Sidebar footer component
 */
const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('px-6 py-4 border-t border-border', className)}
    {...props}
  />
));

Sidebar.displayName = 'Sidebar';
SidebarHeader.displayName = 'SidebarHeader';
SidebarContent.displayName = 'SidebarContent';
SidebarFooter.displayName = 'SidebarFooter';

export { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, sidebarVariants };