'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'rectangle' | 'circle' | 'text' | 'rounded';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'shimmer';
}

export function Skeleton({
  className,
  variant = 'rectangle',
  width,
  height,
  animation = 'pulse'
}: SkeletonProps) {
  const baseClasses = 'bg-gray-200 dark:bg-gray-700';
  
  const variantClasses = {
    rectangle: 'rounded',
    circle: 'rounded-full',
    text: 'rounded h-4',
    rounded: 'rounded-lg'
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-wave',
    shimmer: 'animate-shimmer'
  };

  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height
  };

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        animationClasses[animation],
        className
      )}
      style={style}
    />
  );
}

// Skeletons pré-configurados
export function TextSkeleton({
  lines = 3,
  className,
  lastLineWidth = '75%'
}: {
  lines?: number;
  className?: string;
  lastLineWidth?: string;
}) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          variant="text"
          className={cn(
            'w-full',
            i === lines - 1 && `w-[${lastLineWidth}]`
          )}
        />
      ))}
    </div>
  );
}

export function CardSkeleton({
  showAvatar = false,
  showTitle = true,
  showDescription = true,
  showActions = false,
  className
}: {
  showAvatar?: boolean;
  showTitle?: boolean;
  showDescription?: boolean;
  showActions?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('p-6 space-y-4', className)}>
      {showAvatar && (
        <div className="flex items-center space-x-3">
          <Skeleton variant="circle" className="w-10 h-10" />
          <div className="space-y-2 flex-1">
            <Skeleton variant="text" className="w-1/4" />
            <Skeleton variant="text" className="w-1/3" />
          </div>
        </div>
      )}
      
      {showTitle && (
        <Skeleton variant="text" className="w-3/4 h-6" />
      )}
      
      {showDescription && (
        <TextSkeleton lines={2} />
      )}
      
      {showActions && (
        <div className="flex space-x-2 pt-2">
          <Skeleton variant="rounded" className="w-20 h-8" />
          <Skeleton variant="rounded" className="w-16 h-8" />
        </div>
      )}
    </div>
  );
}

export function TableSkeleton({
  rows = 5,
  columns = 4,
  showHeader = true,
  className
}: {
  rows?: number;
  columns?: number;
  showHeader?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('space-y-3', className)}>
      {showHeader && (
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array.from({ length: columns }, (_, i) => (
            <Skeleton key={i} variant="text" className="h-4" />
          ))}
        </div>
      )}
      
      <div className="space-y-2">
        {Array.from({ length: rows }, (_, rowIndex) => (
          <div
            key={rowIndex}
            className="grid gap-4"
            style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
          >
            {Array.from({ length: columns }, (_, colIndex) => (
              <Skeleton
                key={colIndex}
                variant="text"
                className={cn(
                  'h-4',
                  colIndex === 0 && 'w-3/4',
                  colIndex === columns - 1 && 'w-1/2'
                )}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ListSkeleton({
  items = 5,
  showAvatar = true,
  showSecondaryText = true,
  showAction = false,
  className
}: {
  items?: number;
  showAvatar?: boolean;
  showSecondaryText?: boolean;
  showAction?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: items }, (_, i) => (
        <div key={i} className="flex items-center space-x-3">
          {showAvatar && (
            <Skeleton variant="circle" className="w-8 h-8" />
          )}
          
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" className="w-1/3" />
            {showSecondaryText && (
              <Skeleton variant="text" className="w-1/2 h-3" />
            )}
          </div>
          
          {showAction && (
            <Skeleton variant="rounded" className="w-16 h-6" />
          )}
        </div>
      ))}
    </div>
  );
}

export function DashboardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="space-y-2">
        <Skeleton variant="text" className="w-1/4 h-8" />
        <Skeleton variant="text" className="w-1/2 h-4" />
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="p-4 space-y-3 border rounded-lg">
            <div className="flex items-center justify-between">
              <Skeleton variant="circle" className="w-8 h-8" />
              <Skeleton variant="text" className="w-12 h-4" />
            </div>
            <Skeleton variant="text" className="w-3/4 h-6" />
            <Skeleton variant="text" className="w-1/2 h-3" />
          </div>
        ))}
      </div>
      
      {/* Chart Area */}
      <div className="p-6 border rounded-lg space-y-4">
        <Skeleton variant="text" className="w-1/3 h-6" />
        <Skeleton variant="rectangle" className="w-full h-64" />
      </div>
      
      {/* Data Table */}
      <div className="border rounded-lg p-4">
        <Skeleton variant="text" className="w-1/4 h-6 mb-4" />
        <TableSkeleton rows={6} columns={5} />
      </div>
    </div>
  );
}

export function FormSkeleton({
  fields = 4,
  showTitle = true,
  showActions = true,
  className
}: {
  fields?: number;
  showTitle?: boolean;
  showActions?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('space-y-6', className)}>
      {showTitle && (
        <div className="space-y-2">
          <Skeleton variant="text" className="w-1/3 h-6" />
          <Skeleton variant="text" className="w-2/3 h-4" />
        </div>
      )}
      
      <div className="space-y-4">
        {Array.from({ length: fields }, (_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton variant="text" className="w-1/4 h-4" />
            <Skeleton variant="rounded" className="w-full h-10" />
          </div>
        ))}
      </div>
      
      {showActions && (
        <div className="flex space-x-3 pt-4">
          <Skeleton variant="rounded" className="w-24 h-10" />
          <Skeleton variant="rounded" className="w-20 h-10" />
        </div>
      )}
    </div>
  );
}

// Hook para loading states
export function useSkeletonLoading(initialLoading = true) {
  const [isLoading, setIsLoading] = React.useState(initialLoading);
  const [loadingText, setLoadingText] = React.useState('Carregando...');

  const startLoading = (text?: string) => {
    if (text) setLoadingText(text);
    setIsLoading(true);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  return {
    isLoading,
    loadingText,
    startLoading,
    stopLoading,
    setLoadingText
  };
}

// Componente wrapper que alterna entre skeleton e conteúdo
export function SkeletonWrapper({
  isLoading,
  skeleton,
  children,
  fallback
}: {
  isLoading: boolean;
  skeleton: React.ReactNode;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  if (isLoading) {
    return <>{skeleton}</>;
  }

  return <>{children || fallback}</>;
}