'use client';

import React, { Suspense, memo, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';

// Componente de loading otimizado
export const OptimizedSkeleton = memo(function OptimizedSkeleton({
  className,
  lines = 1,
  height = 'h-4'
}: {
  className?: string;
  lines?: number;
  height?: string;
}) {
  return (
    <div className={cn('animate-pulse space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn('bg-gray-200 dark:bg-gray-700 rounded', height)}
        />
      ))}
    </div>
  );
});

// Wrapper para carregamento lazy de componentes
export function LazyComponent<T = any>({
  loader,
  fallback,
  className,
  ...props
}: {
  loader: () => Promise<{ default: React.ComponentType<T> }>;
  fallback?: React.ReactNode;
  className?: string;
} & T) {
  const DynamicComponent = useMemo(
    () => dynamic(loader, {
      loading: () => (
        <div className={className}>
          {fallback || <OptimizedSkeleton lines={3} />}
        </div>
      ),
      ssr: false
    }),
    [loader, fallback, className]
  );

  return <DynamicComponent {...props as any} />;
}

// Hook para debounce otimizado
export function useOptimizedDebounce<T>(
  value: T,
  delay: number,
  equalityFn?: (a: T, b: T) => boolean
): T {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(prevValue => {
        if (equalityFn) {
          return equalityFn(prevValue, value) ? prevValue : value;
        }
        return value;
      });
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay, equalityFn]);

  return debouncedValue;
}

// Hook para throttle otimizado
export function useOptimizedThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const lastRun = React.useRef<number>(Date.now());
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    ((...args: Parameters<T>) => {
      if (Date.now() - lastRun.current >= delay) {
        callback(...args);
        lastRun.current = Date.now();
      } else {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          callback(...args);
          lastRun.current = Date.now();
        }, delay - (Date.now() - lastRun.current));
      }
    }) as T,
    [callback, delay]
  );
}

// Componente de lista virtualizada simples
export function VirtualizedList<T>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  overscan = 3,
  className
}: {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  overscan?: number;
  className?: string;
}) {
  const [scrollTop, setScrollTop] = React.useState(0);

  const visibleItems = useMemo(() => {
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const endIndex = Math.min(
      items.length - 1,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
    );

    return items.slice(startIndex, endIndex + 1).map((item, index) => ({
      item,
      index: startIndex + index
    }));
  }, [items, itemHeight, containerHeight, scrollTop, overscan]);

  const totalHeight = items.length * itemHeight;
  const offsetY = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan) * itemHeight;

  const handleScroll = useOptimizedThrottle((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, 16); // ~60fps

  return (
    <div
      className={cn('overflow-auto', className)}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map(({ item, index }) => (
            <div key={index} style={{ height: itemHeight }}>
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Hook para intersection observer otimizado
export function useOptimizedIntersectionObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
) {
  const callbackRef = React.useRef(callback);
  const observerRef = React.useRef<IntersectionObserver | null>(null);

  React.useEffect(() => {
    callbackRef.current = callback;
  });

  const observe = useCallback((element: Element) => {
    if (observerRef.current) {
      observerRef.current.observe(element);
    } else {
      observerRef.current = new IntersectionObserver(
        (entries) => callbackRef.current(entries),
        options
      );
      observerRef.current.observe(element);
    }
  }, [options]);

  const unobserve = useCallback((element: Element) => {
    observerRef.current?.unobserve(element);
  }, []);

  const disconnect = useCallback(() => {
    observerRef.current?.disconnect();
    observerRef.current = null;
  }, []);

  React.useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return { observe, unobserve, disconnect };
}

// Componente para preload de recursos
export function ResourcePreloader({
  fonts = [],
  images = [],
  scripts = []
}: {
  fonts?: string[];
  images?: string[];
  scripts?: string[];
}) {
  React.useEffect(() => {
    // Preload fonts
    fonts.forEach(font => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      link.href = font;
      document.head.appendChild(link);
    });

    // Preload images
    images.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });

    // Preload scripts
    scripts.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'script';
      link.href = src;
      document.head.appendChild(link);
    });
  }, [fonts, images, scripts]);

  return null;
}

// Hook para memoização profunda
export function useDeepMemo<T>(value: T, deps?: React.DependencyList): T {
  const ref = React.useRef<T>(value);
  const prevDeps = React.useRef(deps);

  const hasChanged = useMemo(() => {
    if (!deps || !prevDeps.current) return true;
    if (deps.length !== prevDeps.current.length) return true;
    
    return deps.some((dep, index) => {
      const prevDep = prevDeps.current![index];
      if (typeof dep === 'object' && typeof prevDep === 'object') {
        return JSON.stringify(dep) !== JSON.stringify(prevDep);
      }
      return dep !== prevDep;
    });
  }, deps || []);

  if (hasChanged) {
    ref.current = value;
    prevDeps.current = deps;
  }

  return ref.current;
}

// Componente de bundle analyzer (desenvolvimento)
export function BundleAnalyzer({ enabled = false }: { enabled?: boolean }) {
  React.useEffect(() => {
    if (enabled && process.env.NODE_ENV === 'development') {
      // @ts-ignore - Optional dependency
      import('@next/bundle-analyzer').then(({ default: analyzer }) => {
        console.log('Bundle analysis available');
      }).catch(() => {
        console.log('Bundle analyzer not available');
      });
    }
  }, [enabled]);

  return null;
}

// Componente para medição de performance
export function PerformanceMonitor({
  onMetric,
  enabled = process.env.NODE_ENV === 'development'
}: {
  onMetric?: (metric: string, value: number) => void;
  enabled?: boolean;
}) {
  React.useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    // Web Vitals
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        const metric = entry.name;
        const value = entry.startTime;
        
        onMetric?.(metric, value);
        
        if (process.env.NODE_ENV === 'development') {
          console.log(`[Performance] ${metric}:`, value);
        }
      });
    });

    observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] });

    return () => observer.disconnect();
  }, [onMetric, enabled]);

  return null;
}

// Utilities para otimização de CSS
export const optimizedStyles = {
  // Forçar compositing em GPU para animações suaves
  willChange: 'transform, opacity',
  transform: 'translateZ(0)', // Hack para GPU
  
  // Reduzir repaints
  contain: 'layout style paint',
  
  // Otimizar scroll
  scrollBehavior: 'smooth',
  overscrollBehavior: 'contain'
} as const;

// Hook para otimização de re-renders
export function useStableCallback<T extends (...args: any[]) => any>(
  callback: T
): T {
  const callbackRef = React.useRef(callback);
  
  React.useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  return React.useCallback(
    ((...args: Parameters<T>) => callbackRef.current(...args)) as T,
    []
  );
}