'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholderClassName?: string;
  blur?: boolean;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  fill?: boolean;
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: () => void;
  fallback?: React.ReactNode;
  skeleton?: boolean;
}

export function LazyImage({
  src,
  alt,
  width,
  height,
  className,
  placeholderClassName,
  blur = true,
  priority = false,
  sizes,
  quality = 75,
  fill = false,
  style,
  onLoad,
  onError,
  fallback,
  skeleton = true
}: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '100px' // Carregar 100px antes de aparecer
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  const renderPlaceholder = () => {
    if (skeleton) {
      return (
        <div
          className={cn(
            'bg-gray-200 dark:bg-gray-700 animate-pulse',
            fill ? 'absolute inset-0' : 'w-full h-full',
            placeholderClassName
          )}
          style={!fill ? { width, height } : undefined}
        />
      );
    }
    return null;
  };

  const renderFallback = () => {
    if (fallback) return fallback;
    
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600',
          fill ? 'absolute inset-0' : 'w-full h-full',
          className
        )}
        style={!fill ? { width, height } : undefined}
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
      </div>
    );
  };

  return (
    <div
      ref={imgRef}
      className={cn('relative overflow-hidden', fill && 'w-full h-full', className)}
      style={!fill ? { width, height, ...style } : style}
    >
      {hasError ? renderFallback() : (
        <>
          {isLoading && renderPlaceholder()}
          
          {isInView && (
            <Image
              src={src}
              alt={alt}
              width={fill ? undefined : width}
              height={fill ? undefined : height}
              fill={fill}
              sizes={sizes}
              quality={quality}
              priority={priority}
              className={cn(
                'transition-opacity duration-300',
                isLoading ? 'opacity-0' : 'opacity-100',
                fill ? 'object-cover' : ''
              )}
              placeholder={blur ? 'blur' : 'empty'}
              blurDataURL={blur ? 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLli/hJ5Q/9k=' : undefined}
              onLoad={handleLoad}
              onError={handleError}
            />
          )}
        </>
      )}
    </div>
  );
}

// Galeria de imagens com lazy loading
export function LazyImageGallery({
  images,
  columns = 3,
  gap = 4,
  aspectRatio = 'square',
  className
}: {
  images: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
  columns?: number;
  gap?: number;
  aspectRatio?: 'square' | '4/3' | '16/9' | '3/2';
  className?: string;
}) {
  const aspectRatioClasses = {
    square: 'aspect-square',
    '4/3': 'aspect-[4/3]',
    '16/9': 'aspect-video',
    '3/2': 'aspect-[3/2]'
  };

  return (
    <div
      className={cn(
        'grid gap-' + gap,
        `grid-cols-1 sm:grid-cols-2 lg:grid-cols-${columns}`,
        className
      )}
    >
      {images.map((image, index) => (
        <div key={index} className="group">
          <div className={cn('relative overflow-hidden rounded-lg', aspectRatioClasses[aspectRatio])}>
            <LazyImage
              src={image.src}
              alt={image.alt}
              fill
              className="group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          {image.caption && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {image.caption}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

// Avatar com lazy loading
export function LazyAvatar({
  src,
  alt,
  size = 'md',
  fallback,
  className
}: {
  src?: string;
  alt: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  fallback?: string;
  className?: string;
}) {
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    '2xl': 'w-20 h-20'
  };

  const getFallbackInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const renderFallback = () => (
    <div className={cn(
      'flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium',
      sizeClasses[size],
      'rounded-full'
    )}>
      {fallback ? getFallbackInitials(fallback) : '?'}
    </div>
  );

  if (!src) {
    return renderFallback();
  }

  return (
    <LazyImage
      src={src}
      alt={alt}
      width={parseInt(sizeClasses[size].match(/w-(\d+)/)?.[1] || '10') * 4}
      height={parseInt(sizeClasses[size].match(/h-(\d+)/)?.[1] || '10') * 4}
      className={cn('rounded-full', sizeClasses[size], className)}
      fallback={renderFallback()}
      skeleton={false}
    />
  );
}