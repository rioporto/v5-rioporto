'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Avatar component variants using CVA
 */
const avatarVariants = cva(
  'relative flex shrink-0 overflow-hidden rounded-full border-2 border-background',
  {
    variants: {
      size: {
        xs: 'h-6 w-6',
        sm: 'h-8 w-8',
        md: 'h-10 w-10',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16',
        '2xl': 'h-20 w-20',
      },
      status: {
        none: '',
        online: 'ring-2 ring-success',
        offline: 'ring-2 ring-muted',
        away: 'ring-2 ring-warning',
        busy: 'ring-2 ring-error',
      },
    },
    defaultVariants: {
      size: 'md',
      status: 'none',
    },
  }
);

const avatarImageVariants = cva('aspect-square h-full w-full object-cover');

const avatarFallbackVariants = cva(
  'flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground font-medium',
  {
    variants: {
      size: {
        xs: 'text-xs',
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
        xl: 'text-lg',
        '2xl': 'text-xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  /**
   * Image source URL
   */
  src?: string;
  /**
   * Alt text for the image
   */
  alt?: string;
  /**
   * Fallback content when image fails to load
   */
  fallback?: React.ReactNode;
  /**
   * Whether to show status indicator
   */
  showStatus?: boolean;
  /**
   * Whether the avatar is clickable
   */
  clickable?: boolean;
}

/**
 * Avatar component for profile pictures
 * 
 * @example
 * ```tsx
 * <Avatar src="/profile.jpg" alt="User" />
 * <Avatar fallback="JD" status="online" />
 * <Avatar size="lg" clickable />
 * ```
 */
const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ 
    className, 
    size,
    status,
    src,
    alt,
    fallback,
    showStatus = status !== 'none',
    clickable = false,
    onClick,
    ...props 
  }, ref) => {
    const [imageError, setImageError] = React.useState(false);
    const [imageLoaded, setImageLoaded] = React.useState(false);

    React.useEffect(() => {
      setImageError(false);
      setImageLoaded(false);
    }, [src]);

    const handleImageError = () => {
      setImageError(true);
    };

    const handleImageLoad = () => {
      setImageLoaded(true);
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (clickable && onClick) {
        onClick(e);
      }
    };

    const shouldShowImage = src && !imageError;
    const shouldShowFallback = !shouldShowImage || !imageLoaded;

    // Generate initials from alt text if no fallback provided
    const generatedFallback = React.useMemo(() => {
      if (fallback) return fallback;
      if (alt) {
        return alt
          .split(' ')
          .map(word => word.charAt(0))
          .slice(0, 2)
          .join('')
          .toUpperCase();
      }
      return '?';
    }, [fallback, alt]);

    return (
      <div className="relative inline-block">
        <div
          ref={ref}
          className={cn(
            avatarVariants({ size, status, className }),
            clickable && 'cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200',
          )}
          onClick={handleClick}
          role={clickable ? 'button' : undefined}
          tabIndex={clickable ? 0 : undefined}
          onKeyDown={clickable ? (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleClick(e as any);
            }
          } : undefined}
          {...props}
        >
          {shouldShowImage && (
            <img
              src={src}
              alt={alt}
              className={cn(
                avatarImageVariants(),
                !imageLoaded && 'opacity-0'
              )}
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
          )}
          
          {shouldShowFallback && (
            <div className={cn(avatarFallbackVariants({ size }))}>
              {generatedFallback}
            </div>
          )}
        </div>

        {showStatus && status !== 'none' && (
          <div
            className={cn(
              'absolute bottom-0 right-0 block rounded-full ring-2 ring-background',
              {
                'h-2 w-2': size === 'xs' || size === 'sm',
                'h-3 w-3': size === 'md',
                'h-4 w-4': size === 'lg',
                'h-5 w-5': size === 'xl',
                'h-6 w-6': size === '2xl',
              },
              {
                'bg-success': status === 'online',
                'bg-muted': status === 'offline',
                'bg-warning': status === 'away',
                'bg-error': status === 'busy',
              }
            )}
            aria-label={`Status: ${status}`}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export { Avatar, avatarVariants };