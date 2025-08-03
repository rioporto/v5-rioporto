'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Toast component variants using CVA
 */
const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
  {
    variants: {
      variant: {
        default: 'border bg-background text-foreground',
        success: 'success group border-success bg-success text-white',
        warning: 'warning group border-warning bg-warning text-black',
        error: 'destructive group border-destructive bg-destructive text-destructive-foreground',
        info: 'info group border-primary bg-primary text-primary-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const toastIconVariants = cva('flex-shrink-0', {
  variants: {
    variant: {
      default: 'text-foreground',
      success: 'text-white',
      warning: 'text-black',
      error: 'text-destructive-foreground',
      info: 'text-primary-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  /**
   * Title of the toast
   */
  title?: string;
  /**
   * Description/content of the toast
   */
  description?: string;
  /**
   * Custom icon to display
   */
  icon?: React.ReactNode;
  /**
   * Whether to show default icons based on variant
   */
  showIcon?: boolean;
  /**
   * Action button for the toast
   */
  action?: React.ReactNode;
  /**
   * Whether the toast can be dismissed
   */
  dismissible?: boolean;
  /**
   * Callback when toast is dismissed
   */
  onDismiss?: () => void;
  /**
   * Auto dismiss after duration (ms)
   */
  duration?: number;
}

/**
 * Default icons for each toast variant
 */
const defaultIcons = {
  default: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  success: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  warning: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
    </svg>
  ),
  error: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  info: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

/**
 * Toast component for notifications
 * 
 * @example
 * ```tsx
 * <Toast variant="success" title="Success!" description="Operation completed" />
 * <Toast variant="error" title="Error" dismissible onDismiss={() => {}} />
 * ```
 */
const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ 
    className,
    variant,
    title,
    description,
    icon,
    showIcon = true,
    action,
    dismissible = true,
    onDismiss,
    duration,
    ...props 
  }, ref) => {
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    React.useEffect(() => {
      if (duration && onDismiss) {
        timeoutRef.current = setTimeout(() => {
          onDismiss();
        }, duration);
      }

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, [duration, onDismiss]);

    const displayIcon = icon || (showIcon && variant ? defaultIcons[variant] || defaultIcons.default : null);

    return (
      <div
        ref={ref}
        className={cn(toastVariants({ variant }), className)}
        {...props}
      >
        <div className="flex items-start space-x-3 flex-1">
          {displayIcon && (
            <div className={cn(toastIconVariants({ variant }))}>
              {displayIcon}
            </div>
          )}
          
          <div className="flex-1 space-y-1">
            {title && (
              <div className="text-sm font-semibold">
                {title}
              </div>
            )}
            {description && (
              <div className="text-sm opacity-90">
                {description}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {action && <div>{action}</div>}
          
          {dismissible && (
            <button
              type="button"
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border-transparent transition-colors hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              onClick={onDismiss}
              aria-label="Dismiss"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  }
);

/**
 * Toast container for positioning toasts
 */
export interface ToastContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Position of the toast container
   */
  position?: 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center';
}

const ToastContainer = React.forwardRef<HTMLDivElement, ToastContainerProps>(
  ({ className, position = 'top-right', ...props }, ref) => {
    const positionClasses = {
      'top-right': 'top-4 right-4',
      'top-left': 'top-4 left-4',
      'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
      'bottom-right': 'bottom-4 right-4',
      'bottom-left': 'bottom-4 left-4',
      'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'fixed z-50 flex flex-col gap-2 w-full max-w-sm pointer-events-none',
          positionClasses[position],
          className
        )}
        {...props}
      />
    );
  }
);

Toast.displayName = 'Toast';
ToastContainer.displayName = 'ToastContainer';

export { Toast, ToastContainer, toastVariants };