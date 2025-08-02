'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  message?: string;
}

export function LoadingSpinner({ size = 'md', className, message }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  if (message) {
    return (
      <div className={cn('flex items-center justify-center space-x-2', className)}>
        <Loader2 className={cn('animate-spin text-primary', sizeClasses[size])} />
        <span className="text-sm text-muted-foreground">{message}</span>
      </div>
    );
  }

  return (
    <Loader2 className={cn('animate-spin text-primary', sizeClasses[size], className)} />
  );
}

// Inline loading state for buttons
interface LoadingButtonProps {
  children: React.ReactNode;
  loading?: boolean;
  className?: string;
}

export function LoadingButton({ children, loading, className }: LoadingButtonProps) {
  return (
    <div className={cn('flex items-center space-x-2', className)}>
      {loading && <LoadingSpinner size="sm" />}
      <span className={loading ? 'opacity-70' : ''}>{children}</span>
    </div>
  );
}

// Loading overlay for content areas
interface LoadingOverlayProps {
  loading: boolean;
  children: React.ReactNode;
  message?: string;
  className?: string;
}

export function LoadingOverlay({ loading, children, message, className }: LoadingOverlayProps) {
  return (
    <div className={cn('relative', className)}>
      {children}
      {loading && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-10">
          <LoadingSpinner size="lg" message={message} />
        </div>
      )}
    </div>
  );
}

// Loading placeholder for content
interface LoadingPlaceholderProps {
  lines?: number;
  className?: string;
}

export function LoadingPlaceholder({ lines = 3, className }: LoadingPlaceholderProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: lines }, (_, i) => (
        <div
          key={i}
          className={cn(
            'h-4 bg-muted rounded animate-pulse',
            i === lines - 1 ? 'w-3/4' : 'w-full'
          )}
        />
      ))}
    </div>
  );
}

// Loading skeleton for cards
export function LoadingSkeleton() {
  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-muted rounded-full animate-pulse" />
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-muted rounded animate-pulse w-1/4" />
          <div className="h-3 bg-muted rounded animate-pulse w-1/2" />
        </div>
      </div>
      <LoadingPlaceholder lines={2} />
    </div>
  );
}