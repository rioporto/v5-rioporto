import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Skeleton component variants using CVA
 */
const skeletonVariants = cva(
  'animate-pulse rounded-md bg-muted',
  {
    variants: {
      variant: {
        default: 'bg-muted',
        shimmer: 'bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-[shimmer_2s_infinite]',
        wave: 'relative overflow-hidden bg-muted before:absolute before:inset-0 before:-translate-x-full before:animate-[wave_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  /**
   * Width of the skeleton
   */
  width?: string | number;
  /**
   * Height of the skeleton
   */
  height?: string | number;
  /**
   * Whether the skeleton is circular
   */
  circle?: boolean;
}

/**
 * Skeleton component for loading states
 * 
 * @example
 * ```tsx
 * <Skeleton className="h-4 w-[250px]" />
 * <Skeleton circle className="h-12 w-12" />
 * <Skeleton variant="shimmer" className="h-32 w-full" />
 * ```
 */
const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ 
    className, 
    variant,
    width,
    height,
    circle = false,
    style,
    ...props 
  }, ref) => {
    const inlineStyles = {
      width,
      height,
      ...style,
    };

    return (
      <div
        ref={ref}
        className={cn(
          skeletonVariants({ variant, className }),
          circle && 'rounded-full',
        )}
        style={inlineStyles}
        aria-label="Loading..."
        role="status"
        {...props}
      />
    );
  }
);

/**
 * Skeleton text component for text placeholders
 */
export interface SkeletonTextProps extends VariantProps<typeof skeletonVariants> {
  /**
   * Number of lines
   */
  lines?: number;
  /**
   * Custom class name
   */
  className?: string;
  /**
   * Width of the last line (for natural text appearance)
   */
  lastLineWidth?: string;
}

const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonTextProps>(
  ({ 
    lines = 3,
    variant,
    className,
    lastLineWidth = '75%',
    ...props 
  }, ref) => {
    return (
      <div ref={ref} className={cn('space-y-2', className)} {...props}>
        {Array.from({ length: lines }).map((_, index) => (
          <Skeleton
            key={index}
            variant={variant}
            className={cn(
              'h-4',
              index === lines - 1 ? '' : 'w-full',
            )}
            style={index === lines - 1 ? { width: lastLineWidth } : undefined}
          />
        ))}
      </div>
    );
  }
);

/**
 * Skeleton avatar component
 */
export interface SkeletonAvatarProps extends VariantProps<typeof skeletonVariants> {
  /**
   * Size of the avatar
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Custom class name
   */
  className?: string;
}

const SkeletonAvatar = React.forwardRef<HTMLDivElement, SkeletonAvatarProps>(
  ({ 
    size = 'md',
    variant,
    className,
    ...props 
  }, ref) => {
    const sizeClasses = {
      sm: 'h-8 w-8',
      md: 'h-10 w-10',
      lg: 'h-12 w-12',
      xl: 'h-16 w-16',
    };

    return (
      <Skeleton
        ref={ref}
        variant={variant}
        circle
        className={cn(sizeClasses[size], className)}
        {...props}
      />
    );
  }
);

/**
 * Skeleton card component for card layouts
 */
export interface SkeletonCardProps extends VariantProps<typeof skeletonVariants> {
  /**
   * Whether to show avatar
   */
  showAvatar?: boolean;
  /**
   * Number of text lines
   */
  lines?: number;
  /**
   * Custom class name
   */
  className?: string;
}

const SkeletonCard = React.forwardRef<HTMLDivElement, SkeletonCardProps>(
  ({ 
    showAvatar = true,
    lines = 3,
    variant,
    className,
    ...props 
  }, ref) => {
    return (
      <div ref={ref} className={cn('space-y-4 p-4', className)} {...props}>
        {/* Header */}
        <div className="flex items-center space-x-4">
          {showAvatar && <SkeletonAvatar variant={variant} />}
          <div className="space-y-2 flex-1">
            <Skeleton variant={variant} className="h-4 w-1/4" />
            <Skeleton variant={variant} className="h-3 w-1/2" />
          </div>
        </div>
        
        {/* Content */}
        <SkeletonText lines={lines} variant={variant} />
        
        {/* Footer */}
        <div className="flex justify-between">
          <Skeleton variant={variant} className="h-8 w-20" />
          <Skeleton variant={variant} className="h-8 w-16" />
        </div>
      </div>
    );
  }
);

Skeleton.displayName = 'Skeleton';
SkeletonText.displayName = 'SkeletonText';
SkeletonAvatar.displayName = 'SkeletonAvatar';
SkeletonCard.displayName = 'SkeletonCard';

export { 
  Skeleton, 
  SkeletonText, 
  SkeletonAvatar, 
  SkeletonCard,
  skeletonVariants 
};