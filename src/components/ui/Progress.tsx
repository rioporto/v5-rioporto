import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Progress component variants using CVA
 */
const progressVariants = cva(
  'relative h-2 w-full overflow-hidden rounded-full bg-secondary',
  {
    variants: {
      size: {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-3',
        xl: 'h-4',
      },
      variant: {
        default: '',
        success: '',
        warning: '',
        error: '',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
);

const progressBarVariants = cva(
  'h-full w-full flex-1 bg-primary transition-all duration-300 ease-in-out',
  {
    variants: {
      variant: {
        default: 'bg-primary',
        success: 'bg-success',
        warning: 'bg-warning',
        error: 'bg-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  /**
   * Progress value from 0 to 100
   */
  value?: number;
  /**
   * Maximum value (default: 100)
   */
  max?: number;
  /**
   * Whether to show the progress label
   */
  showLabel?: boolean;
  /**
   * Custom label to display
   */
  label?: string;
  /**
   * Whether to show percentage
   */
  showPercentage?: boolean;
  /**
   * Whether the progress is indeterminate
   */
  indeterminate?: boolean;
}

/**
 * Progress component for showing completion status
 * 
 * @example
 * ```tsx
 * <Progress value={75} showPercentage />
 * <Progress value={50} variant="success" showLabel label="Uploading..." />
 * <Progress indeterminate />
 * ```
 */
const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ 
    className, 
    size,
    variant,
    value = 0,
    max = 100,
    showLabel = false,
    label,
    showPercentage = false,
    indeterminate = false,
    ...props 
  }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    
    return (
      <div className="w-full space-y-2">
        {(showLabel || showPercentage) && (
          <div className="flex justify-between items-center text-sm">
            {showLabel && (
              <span className="text-foreground">
                {label || 'Progress'}
              </span>
            )}
            {showPercentage && (
              <span className="text-muted-foreground">
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        )}
        
        <div
          ref={ref}
          className={cn(progressVariants({ size, variant, className }))}
          role="progressbar"
          aria-valuenow={indeterminate ? undefined : value}
          aria-valuemax={max}
          aria-valuemin={0}
          aria-label={label}
          {...props}
        >
          <div
            className={cn(
              progressBarVariants({ variant }),
              indeterminate && 'animate-pulse',
            )}
            style={{
              transform: indeterminate 
                ? 'translateX(-100%)' 
                : `translateX(-${100 - percentage}%)`,
              animation: indeterminate 
                ? 'progress-indeterminate 2s ease-in-out infinite' 
                : undefined,
            }}
          />
        </div>
      </div>
    );
  }
);

/**
 * Circular progress variant
 */
export interface CircularProgressProps {
  /**
   * Progress value from 0 to 100
   */
  value?: number;
  /**
   * Size of the circular progress
   */
  size?: number;
  /**
   * Progress variant
   */
  variant?: 'default' | 'success' | 'warning' | 'error';
  /**
   * Stroke width
   */
  strokeWidth?: number;
  /**
   * Whether the progress is indeterminate
   */
  indeterminate?: boolean;
  /**
   * Custom class name
   */
  className?: string;
  /**
   * Show percentage in center
   */
  showPercentage?: boolean;
}

/**
 * Circular progress component
 */
const CircularProgress = React.forwardRef<SVGSVGElement, CircularProgressProps>(
  ({
    value = 0,
    size = 48,
    strokeWidth = 4,
    indeterminate = false,
    className,
    variant = 'default',
    showPercentage = false,
    ...props
  }, ref) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const percentage = Math.min(Math.max(value, 0), 100);
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    const strokeColor = {
      default: 'hsl(var(--primary))',
      success: 'hsl(var(--success))',
      warning: 'hsl(var(--warning))',
      error: 'hsl(var(--destructive))',
    }[variant];

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg
          ref={ref}
          className={cn('rotate-[-90deg] transition-all duration-300', className)}
          width={size}
          height={size}
          {...props}
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="hsl(var(--secondary))"
            strokeWidth={strokeWidth}
            fill="none"
          />
          
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={indeterminate ? 0 : strokeDashoffset}
            className={cn(
              'transition-all duration-300 ease-in-out',
              indeterminate && 'animate-spin',
            )}
            style={{
              strokeDasharray: indeterminate 
                ? `${circumference * 0.25} ${circumference}` 
                : circumference,
            }}
          />
        </svg>
        
        {showPercentage && !indeterminate && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-medium text-foreground">
              {Math.round(percentage)}%
            </span>
          </div>
        )}
      </div>
    );
  }
);

Progress.displayName = 'Progress';
CircularProgress.displayName = 'CircularProgress';

export { Progress, CircularProgress, progressVariants };