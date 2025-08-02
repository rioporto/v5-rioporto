'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface PageTransitionProps {
  children: React.ReactNode;
  variant?: 'fade' | 'slide-up' | 'slide-right' | 'scale' | 'blur';
  duration?: number;
  delay?: number;
  className?: string;
}

export function PageTransition({
  children,
  variant = 'fade',
  duration = 300,
  delay = 0,
  className
}: PageTransitionProps) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [currentPath, setCurrentPath] = useState(pathname);

  useEffect(() => {
    if (pathname !== currentPath) {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentPath(pathname);
        setTimeout(() => {
          setIsVisible(true);
        }, 50);
      }, duration / 2);
    } else {
      setTimeout(() => {
        setIsVisible(true);
      }, delay);
    }
  }, [pathname, currentPath, duration, delay]);

  const getTransitionClasses = () => {
    const baseClasses = 'transition-all ease-out';
    
    switch (variant) {
      case 'fade':
        return cn(
          baseClasses,
          isVisible ? 'opacity-100' : 'opacity-0'
        );
      case 'slide-up':
        return cn(
          baseClasses,
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        );
      case 'slide-right':
        return cn(
          baseClasses,
          isVisible 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 -translate-x-8'
        );
      case 'scale':
        return cn(
          baseClasses,
          isVisible 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-95'
        );
      case 'blur':
        return cn(
          baseClasses,
          isVisible 
            ? 'opacity-100 blur-0' 
            : 'opacity-0 blur-sm'
        );
      default:
        return baseClasses;
    }
  };

  return (
    <div
      className={cn(getTransitionClasses(), className)}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
}

// Componente para animação staggered de elementos filhos
export function StaggeredFadeIn({
  children,
  delay = 100,
  duration = 300,
  className
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  
  const childrenArray = React.Children.toArray(children);

  useEffect(() => {
    childrenArray.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems(prev => new Set([...Array.from(prev), index]));
      }, index * delay);
    });
  }, [childrenArray.length, delay]);

  return (
    <div className={className}>
      {childrenArray.map((child, index) => (
        <div
          key={index}
          className={cn(
            'transition-all ease-out',
            visibleItems.has(index) 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
          )}
          style={{ transitionDuration: `${duration}ms` }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

// Componente para conteúdo que aparece ao scrollar
export function ScrollReveal({
  children,
  threshold = 0.1,
  variant = 'slide-up',
  duration = 500,
  once = true,
  className
}: {
  children: React.ReactNode;
  threshold?: number;
  variant?: 'slide-up' | 'slide-left' | 'slide-right' | 'fade' | 'scale';
  duration?: number;
  once?: boolean;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(ref);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(ref);

    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [ref, threshold, once]);

  const getVariantClasses = () => {
    switch (variant) {
      case 'slide-up':
        return isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8';
      case 'slide-left':
        return isVisible 
          ? 'opacity-100 translate-x-0' 
          : 'opacity-0 translate-x-8';
      case 'slide-right':
        return isVisible 
          ? 'opacity-100 translate-x-0' 
          : 'opacity-0 -translate-x-8';
      case 'fade':
        return isVisible ? 'opacity-100' : 'opacity-0';
      case 'scale':
        return isVisible 
          ? 'opacity-100 scale-100' 
          : 'opacity-0 scale-95';
      default:
        return '';
    }
  };

  return (
    <div
      ref={setRef}
      className={cn(
        'transition-all ease-out',
        getVariantClasses(),
        className
      )}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
}

// Hook para controlar transições de página
export function usePageTransition() {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [previousPath, setPreviousPath] = useState<string | null>(null);

  useEffect(() => {
    if (previousPath && previousPath !== pathname) {
      setIsTransitioning(true);
      
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 300);

      return () => clearTimeout(timer);
    }
    
    setPreviousPath(pathname);
  }, [pathname, previousPath]);

  return {
    isTransitioning,
    currentPath: pathname,
    previousPath
  };
}

// Componente de loading para transições
export function TransitionLoading({
  show,
  variant = 'fade',
  className
}: {
  show: boolean;
  variant?: 'fade' | 'blur' | 'skeleton';
  className?: string;
}) {
  if (!show) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center',
        variant === 'fade' && 'bg-white/80 dark:bg-gray-900/80',
        variant === 'blur' && 'bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm',
        variant === 'skeleton' && 'bg-transparent',
        'animate-fade-in',
        className
      )}
    >
      {variant === 'skeleton' ? (
        <div className="w-full max-w-md space-y-4 p-8">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2" />
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse [animation-delay:0.2s]" />
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse [animation-delay:0.4s]" />
        </div>
      )}
    </div>
  );
}