import React from 'react';
import { cn } from '@/lib/utils';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type ContainerPadding = 'none' | 'sm' | 'md' | 'lg';

const getSizeClasses = (size: ContainerSize): string => {
  const sizes = {
    sm: 'max-w-3xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'w-full'
  };
  return sizes[size];
};

const getPaddingClasses = (padding: ContainerPadding): string => {
  const paddings = {
    none: '',
    sm: 'px-4',
    md: 'px-4 md:px-6',
    lg: 'px-4 md:px-8'
  };
  return paddings[padding];
};

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
  padding?: ContainerPadding;
}

/**
 * Container component for responsive content width
 * 
 * @example
 * ```tsx
 * <Container>
 *   <h1>Content</h1>
 * </Container>
 * ```
 */
const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'lg', padding = 'lg', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'container mx-auto',
          getSizeClasses(size),
          getPaddingClasses(padding),
          className
        )}
        {...props}
      />
    );
  }
);

Container.displayName = 'Container';

export { Container };