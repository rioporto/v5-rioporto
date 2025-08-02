'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { MinimalistCard } from '../MinimalistCard';

export interface Feature {
  title: string;
  description: string;
  icon?: React.ReactNode;
  image?: string;
  badge?: string;
}

export interface MinimalistFeaturesProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  subtitle?: string;
  description?: string;
  features: Feature[];
  columns?: 2 | 3 | 4;
  variant?: 'cards' | 'list' | 'grid';
}

const MinimalistFeatures = forwardRef<HTMLElement, MinimalistFeaturesProps>(
  ({ 
    className, 
    title, 
    subtitle, 
    description, 
    features, 
    columns = 3,
    variant = 'cards',
    ...props 
  }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          'py-20 bg-background',
          className
        )}
        {...props}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          {(title || subtitle || description) && (
            <div className="text-center max-w-3xl mx-auto mb-16">
              {subtitle && (
                <p className="text-sm font-medium text-primary uppercase tracking-wider mb-4">
                  {subtitle}
                </p>
              )}
              
              {title && (
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  {title}
                </h2>
              )}
              
              {description && (
                <p className="text-lg text-muted leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          )}

          {/* Features */}
          {variant === 'cards' && (
            <div className={cn(
              'grid gap-8',
              {
                'grid-cols-1 md:grid-cols-2': columns === 2,
                'grid-cols-1 md:grid-cols-2 lg:grid-cols-3': columns === 3,
                'grid-cols-1 md:grid-cols-2 lg:grid-cols-4': columns === 4,
              }
            )}>
              {features.map((feature, index) => (
                <MinimalistFeatureCard key={index} feature={feature} />
              ))}
            </div>
          )}

          {variant === 'list' && (
            <div className="max-w-3xl mx-auto space-y-8">
              {features.map((feature, index) => (
                <MinimalistFeatureItem key={index} feature={feature} />
              ))}
            </div>
          )}

          {variant === 'grid' && (
            <div className={cn(
              'grid gap-6',
              {
                'grid-cols-1 md:grid-cols-2': columns === 2,
                'grid-cols-1 md:grid-cols-2 lg:grid-cols-3': columns === 3,
                'grid-cols-1 md:grid-cols-2 lg:grid-cols-4': columns === 4,
              }
            )}>
              {features.map((feature, index) => (
                <MinimalistFeatureGrid key={index} feature={feature} />
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }
);

MinimalistFeatures.displayName = 'MinimalistFeatures';

// Feature card component
const MinimalistFeatureCard = forwardRef<HTMLDivElement, { feature: Feature }>(
  ({ feature }, ref) => {
    return (
      <MinimalistCard
        ref={ref}
        variant="elevated"
        padding="lg"
        className="h-full group hover:shadow-xl transition-all duration-300"
      >
        <div className="space-y-4">
          {/* Icon or Image */}
          {feature.icon && (
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors duration-300">
              {feature.icon}
            </div>
          )}
          
          {feature.image && (
            <div className="w-full h-48 rounded-lg overflow-hidden bg-surface">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Badge */}
          {feature.badge && (
            <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
              {feature.badge}
            </span>
          )}

          {/* Content */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
              {feature.title}
            </h3>
            <p className="text-muted leading-relaxed">
              {feature.description}
            </p>
          </div>
        </div>
      </MinimalistCard>
    );
  }
);

MinimalistFeatureCard.displayName = 'MinimalistFeatureCard';

// Feature list item component
const MinimalistFeatureItem = forwardRef<HTMLDivElement, { feature: Feature }>(
  ({ feature }, ref) => {
    return (
      <div
        ref={ref}
        className="flex items-start space-x-6 group"
      >
        {/* Icon */}
        {feature.icon && (
          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors duration-300">
            {feature.icon}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center space-x-3">
            <h3 className="text-xl font-semibold text-foreground">
              {feature.title}
            </h3>
            {feature.badge && (
              <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                {feature.badge}
              </span>
            )}
          </div>
          <p className="text-muted leading-relaxed">
            {feature.description}
          </p>
        </div>
      </div>
    );
  }
);

MinimalistFeatureItem.displayName = 'MinimalistFeatureItem';

// Feature grid component
const MinimalistFeatureGrid = forwardRef<HTMLDivElement, { feature: Feature }>(
  ({ feature }, ref) => {
    return (
      <div
        ref={ref}
        className="text-center space-y-4 group"
      >
        {/* Icon */}
        {feature.icon && (
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto group-hover:bg-primary/20 transition-colors duration-300">
            {feature.icon}
          </div>
        )}

        {/* Badge */}
        {feature.badge && (
          <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
            {feature.badge}
          </span>
        )}

        {/* Content */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">
            {feature.title}
          </h3>
          <p className="text-sm text-muted leading-relaxed">
            {feature.description}
          </p>
        </div>
      </div>
    );
  }
);

MinimalistFeatureGrid.displayName = 'MinimalistFeatureGrid';

// Icon components for common features
export const FeatureIcons = {
  Security: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  Speed: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  Analytics: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  Support: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 11-9.75 9.75 9.75-9.75 0 019.75-9.75z" />
    </svg>
  ),
  Money: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
    </svg>
  ),
  Globe: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  ),
};

export {
  MinimalistFeatures,
  MinimalistFeatureCard,
  MinimalistFeatureItem,
  MinimalistFeatureGrid,
};