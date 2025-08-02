'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { MinimalistButton } from '../MinimalistButton';

export interface MinimalistHeroProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  subtitle?: string;
  description?: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  backgroundImage?: string;
  centered?: boolean;
}

const MinimalistHero = forwardRef<HTMLElement, MinimalistHeroProps>(
  ({ 
    className, 
    title, 
    subtitle, 
    description, 
    primaryAction, 
    secondaryAction,
    backgroundImage,
    centered = true,
    children,
    ...props 
  }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          'relative min-h-screen flex items-center justify-center overflow-hidden',
          'bg-background text-foreground',
          className
        )}
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        {...props}
      >
        {/* Background overlay if image is provided */}
        {backgroundImage && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        )}

        {/* Content container */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn(
            'max-w-4xl mx-auto',
            centered && 'text-center'
          )}>
            {/* Subtitle */}
            {subtitle && (
              <p className="text-sm font-medium text-primary uppercase tracking-wider mb-6">
                {subtitle}
              </p>
            )}

            {/* Main title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 leading-tight">
              {title.split(' ').map((word, index) => (
                <span key={index} className="inline-block">
                  {word}{' '}
                </span>
              ))}
            </h1>

            {/* Description */}
            {description && (
              <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-12 leading-relaxed">
                {description}
              </p>
            )}

            {/* Action buttons */}
            {(primaryAction || secondaryAction) && (
              <div className={cn(
                'flex gap-4',
                centered ? 'justify-center' : 'justify-start',
                'flex-col sm:flex-row'
              )}>
                {primaryAction && (
                  <MinimalistButton
                    variant="primary"
                    size="lg"
                    onClick={primaryAction.onClick}
                    className="px-8 py-4 text-base font-semibold"
                  >
                    {primaryAction.label}
                  </MinimalistButton>
                )}
                
                {secondaryAction && (
                  <MinimalistButton
                    variant="ghost"
                    size="lg"
                    onClick={secondaryAction.onClick}
                    className="px-8 py-4 text-base font-semibold"
                  >
                    {secondaryAction.label}
                  </MinimalistButton>
                )}
              </div>
            )}

            {/* Custom content */}
            {children && (
              <div className="mt-12">
                {children}
              </div>
            )}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center space-y-2 opacity-60">
            <span className="text-xs text-muted uppercase tracking-wider">Scroll</span>
            <div className="w-px h-8 bg-muted animate-pulse" />
          </div>
        </div>
      </section>
    );
  }
);

MinimalistHero.displayName = 'MinimalistHero';

// Split hero variant with image on the side
interface MinimalistSplitHeroProps extends Omit<MinimalistHeroProps, 'backgroundImage'> {
  image?: string;
  imageAlt?: string;
  imagePosition?: 'left' | 'right';
}

const MinimalistSplitHero = forwardRef<HTMLElement, MinimalistSplitHeroProps>(
  ({ 
    className, 
    title, 
    subtitle, 
    description, 
    primaryAction, 
    secondaryAction,
    image,
    imageAlt = '',
    imagePosition = 'right',
    children,
    ...props 
  }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          'min-h-screen flex items-center justify-center py-20',
          'bg-background text-foreground',
          className
        )}
        {...props}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn(
            'grid lg:grid-cols-2 gap-12 lg:gap-16 items-center',
            imagePosition === 'left' && 'lg:grid-flow-col-dense'
          )}>
            {/* Content */}
            <div className={cn(
              'space-y-8',
              imagePosition === 'left' && 'lg:col-start-2'
            )}>
              {/* Subtitle */}
              {subtitle && (
                <p className="text-sm font-medium text-primary uppercase tracking-wider">
                  {subtitle}
                </p>
              )}

              {/* Main title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                {title}
              </h1>

              {/* Description */}
              {description && (
                <p className="text-lg text-muted leading-relaxed">
                  {description}
                </p>
              )}

              {/* Action buttons */}
              {(primaryAction || secondaryAction) && (
                <div className="flex gap-4 flex-col sm:flex-row">
                  {primaryAction && (
                    <MinimalistButton
                      variant="primary"
                      size="lg"
                      onClick={primaryAction.onClick}
                      className="px-8 py-4 text-base font-semibold"
                    >
                      {primaryAction.label}
                    </MinimalistButton>
                  )}
                  
                  {secondaryAction && (
                    <MinimalistButton
                      variant="ghost"
                      size="lg"
                      onClick={secondaryAction.onClick}
                      className="px-8 py-4 text-base font-semibold"
                    >
                      {secondaryAction.label}
                    </MinimalistButton>
                  )}
                </div>
              )}

              {/* Custom content */}
              {children}
            </div>

            {/* Image */}
            {image && (
              <div className={cn(
                'relative',
                imagePosition === 'left' && 'lg:col-start-1'
              )}>
                <div className="aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden bg-surface">
                  <img
                    src={image}
                    alt={imageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative element */}
                <div className="absolute -z-10 -top-4 -right-4 w-full h-full rounded-2xl bg-primary/10" />
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }
);

MinimalistSplitHero.displayName = 'MinimalistSplitHero';

export {
  MinimalistHero,
  MinimalistSplitHero,
};