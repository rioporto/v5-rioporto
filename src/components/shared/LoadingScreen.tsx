import React from 'react';
import { cn } from '@/lib/utils';
import { Logo } from './Logo';

export interface LoadingScreenProps {
  /**
   * Loading message
   */
  message?: string;
  /**
   * Whether to show logo
   */
  showLogo?: boolean;
  /**
   * Custom class name
   */
  className?: string;
}

/**
 * Loading screen component
 * 
 * @example
 * ```tsx
 * <LoadingScreen message="Loading your dashboard..." />
 * ```
 */
const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = 'Loading...',
  showLogo = true,
  className,
}) => {
  return (
    <div className={cn(
      'fixed inset-0 z-50 flex items-center justify-center bg-background',
      className
    )}>
      <div className="flex flex-col items-center space-y-6">
        {showLogo && (
          <div className="animate-pulse">
            <Logo size="xl" clickable={false} />
          </div>
        )}
        
        <div className="flex flex-col items-center space-y-4">
          {/* Spinner */}
          <div className="relative">
            <div className="w-12 h-12 border-4 border-muted rounded-full animate-spin border-t-primary" />
          </div>
          
          {/* Message */}
          <p className="text-muted-foreground text-center max-w-md">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

LoadingScreen.displayName = 'LoadingScreen';

export { LoadingScreen };