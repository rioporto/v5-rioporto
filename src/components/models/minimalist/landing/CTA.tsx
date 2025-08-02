'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { MinimalistButton } from '../MinimalistButton';
import { MinimalistCard } from '../MinimalistCard';

export interface MinimalistCTAProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  subtitle?: string;
  description?: string;
  primaryAction: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  variant?: 'default' | 'card' | 'split' | 'minimal';
  backgroundImage?: string;
}

const MinimalistCTA = forwardRef<HTMLElement, MinimalistCTAProps>(
  ({ 
    className, 
    title, 
    subtitle, 
    description, 
    primaryAction, 
    secondaryAction,
    variant = 'default',
    backgroundImage,
    ...props 
  }, ref) => {
    const content = (
      <>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          {subtitle && (
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-4">
              {subtitle}
            </p>
          )}
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {title}
          </h2>
          
          {description && (
            <p className="text-lg text-muted leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center flex-col sm:flex-row">
          <MinimalistButton
            variant="primary"
            size="lg"
            onClick={primaryAction.onClick}
            className="px-8 py-4 text-base font-semibold"
          >
            {primaryAction.label}
          </MinimalistButton>
          
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
      </>
    );

    if (variant === 'card') {
      return (
        <section
          ref={ref}
          className={cn('py-20 bg-surface', className)}
          {...props}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <MinimalistCard
              variant="elevated"
              padding="lg"
              className="max-w-4xl mx-auto text-center"
            >
              {content}
            </MinimalistCard>
          </div>
        </section>
      );
    }

    if (variant === 'split') {
      return (
        <section
          ref={ref}
          className={cn('py-20 bg-background', className)}
          {...props}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
              {/* Content */}
              <div className="space-y-8">
                {subtitle && (
                  <p className="text-sm font-medium text-primary uppercase tracking-wider">
                    {subtitle}
                  </p>
                )}
                
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  {title}
                </h2>
                
                {description && (
                  <p className="text-lg text-muted leading-relaxed">
                    {description}
                  </p>
                )}

                <div className="flex gap-4 flex-col sm:flex-row">
                  <MinimalistButton
                    variant="primary"
                    size="lg"
                    onClick={primaryAction.onClick}
                    className="px-8 py-4 text-base font-semibold"
                  >
                    {primaryAction.label}
                  </MinimalistButton>
                  
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
              </div>

              {/* Visual element */}
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }

    if (variant === 'minimal') {
      return (
        <section
          ref={ref}
          className={cn('py-16 bg-background border-t border-border', className)}
          {...props}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl mx-auto">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {title}
                </h3>
                {description && (
                  <p className="text-muted">
                    {description}
                  </p>
                )}
              </div>
              
              <div className="flex gap-3 flex-shrink-0">
                <MinimalistButton
                  variant="primary"
                  onClick={primaryAction.onClick}
                  className="px-6 py-2"
                >
                  {primaryAction.label}
                </MinimalistButton>
                
                {secondaryAction && (
                  <MinimalistButton
                    variant="ghost"
                    onClick={secondaryAction.onClick}
                    className="px-6 py-2"
                  >
                    {secondaryAction.label}
                  </MinimalistButton>
                )}
              </div>
            </div>
          </div>
        </section>
      );
    }

    // Default variant
    return (
      <section
        ref={ref}
        className={cn(
          'py-20 relative overflow-hidden',
          'bg-background',
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
          <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />
        )}

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          {content}
        </div>
      </section>
    );
  }
);

MinimalistCTA.displayName = 'MinimalistCTA';

// Newsletter CTA component
interface MinimalistNewsletterCTAProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  onEmailSubmit: (email: string) => void;
}

const MinimalistNewsletterCTA = forwardRef<HTMLElement, MinimalistNewsletterCTAProps>(
  ({ 
    className, 
    title, 
    description, 
    placeholder = 'Enter your email',
    buttonText = 'Subscribe',
    onEmailSubmit,
    ...props 
  }, ref) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const email = formData.get('email') as string;
      if (email) {
        onEmailSubmit(email);
      }
    };

    return (
      <section
        ref={ref}
        className={cn('py-16 bg-surface', className)}
        {...props}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {title}
            </h3>
            
            {description && (
              <p className="text-muted mb-8 leading-relaxed">
                {description}
              </p>
            )}

            <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                name="email"
                placeholder={placeholder}
                required
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
              />
              <MinimalistButton
                type="submit"
                variant="primary"
                className="px-6 py-3 font-semibold"
              >
                {buttonText}
              </MinimalistButton>
            </form>
          </div>
        </div>
      </section>
    );
  }
);

MinimalistNewsletterCTA.displayName = 'MinimalistNewsletterCTA';

export {
  MinimalistCTA,
  MinimalistNewsletterCTA,
};