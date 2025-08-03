import React from 'react';
import { cn } from '@/lib/utils';

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Whether header is sticky
   */
  sticky?: boolean;
  /**
   * Header variant
   */
  variant?: 'primary' | 'transparent' | 'blur';
  /**
   * Height of header
   */
  height?: 'sm' | 'md' | 'lg';
}

/**
 * Header component for page navigation
 * 
 * @example
 * ```tsx
 * <Header sticky>
 *   <Logo />
 *   <Navigation />
 *   <UserMenu />
 * </Header>
 * ```
 */
const Header = React.forwardRef<HTMLElement, HeaderProps>(
  ({ 
    className, 
    sticky = false,
    variant = 'default',
    height = 'md',
    children,
    ...props 
  }, ref) => {
    const variants: Record<string, string> = {
      default: 'bg-background border-b border-border',
      transparent: 'bg-transparent',
      blur: 'bg-background/80 backdrop-blur-md border-b border-border/50',
    };

    const heights: Record<string, string> = {
      sm: 'h-12',
      md: 'h-16',
      lg: 'h-20',
    };

    return (
      <header
        ref={ref}
        className={cn(
          'w-full z-40 flex items-center justify-between px-4 md:px-6 lg:px-8',
          heights[height || 'md'],
          variants[variant || 'default'],
          sticky && 'sticky top-0',
          className
        )}
        {...props}
      >
        {children}
      </header>
    );
  }
);

Header.displayName = 'Header';

export { Header };