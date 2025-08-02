'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { MinimalistCard } from '../MinimalistCard';

export interface Testimonial {
  content: string;
  author: {
    name: string;
    title?: string;
    company?: string;
    avatar?: string;
  };
  rating?: number;
}

export interface MinimalistTestimonialsProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  subtitle?: string;
  description?: string;
  testimonials: Testimonial[];
  variant?: 'cards' | 'list' | 'carousel';
  columns?: 1 | 2 | 3;
}

const MinimalistTestimonials = forwardRef<HTMLElement, MinimalistTestimonialsProps>(
  ({ 
    className, 
    title, 
    subtitle, 
    description, 
    testimonials, 
    variant = 'cards',
    columns = 3,
    ...props 
  }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          'py-20 bg-surface',
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

          {/* Testimonials */}
          {variant === 'cards' && (
            <div className={cn(
              'grid gap-8',
              {
                'grid-cols-1': columns === 1,
                'grid-cols-1 md:grid-cols-2': columns === 2,
                'grid-cols-1 md:grid-cols-2 lg:grid-cols-3': columns === 3,
              }
            )}>
              {testimonials.map((testimonial, index) => (
                <MinimalistTestimonialCard key={index} testimonial={testimonial} />
              ))}
            </div>
          )}

          {variant === 'list' && (
            <div className="max-w-4xl mx-auto space-y-8">
              {testimonials.map((testimonial, index) => (
                <MinimalistTestimonialItem key={index} testimonial={testimonial} />
              ))}
            </div>
          )}

          {variant === 'carousel' && (
            <div className="max-w-4xl mx-auto">
              <MinimalistTestimonialCarousel testimonials={testimonials} />
            </div>
          )}
        </div>
      </section>
    );
  }
);

MinimalistTestimonials.displayName = 'MinimalistTestimonials';

// Testimonial card component
const MinimalistTestimonialCard = forwardRef<HTMLDivElement, { testimonial: Testimonial }>(
  ({ testimonial }, ref) => {
    return (
      <MinimalistCard
        ref={ref}
        variant="elevated"
        padding="lg"
        className="h-full"
      >
        <div className="space-y-6">
          {/* Rating */}
          {testimonial.rating && (
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={cn(
                    'w-5 h-5',
                    i < testimonial.rating! ? 'text-primary fill-current' : 'text-border'
                  )}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          )}

          {/* Content */}
          <blockquote className="text-foreground leading-relaxed">
            "{testimonial.content}"
          </blockquote>

          {/* Author */}
          <div className="flex items-center space-x-3 pt-4 border-t border-border">
            {testimonial.author.avatar ? (
              <img
                src={testimonial.author.avatar}
                alt={testimonial.author.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-medium text-primary">
                  {testimonial.author.name.charAt(0)}
                </span>
              </div>
            )}
            
            <div>
              <p className="font-medium text-foreground">
                {testimonial.author.name}
              </p>
              {(testimonial.author.title || testimonial.author.company) && (
                <p className="text-sm text-muted">
                  {testimonial.author.title}
                  {testimonial.author.title && testimonial.author.company && ' at '}
                  {testimonial.author.company}
                </p>
              )}
            </div>
          </div>
        </div>
      </MinimalistCard>
    );
  }
);

MinimalistTestimonialCard.displayName = 'MinimalistTestimonialCard';

// Testimonial list item component
const MinimalistTestimonialItem = forwardRef<HTMLDivElement, { testimonial: Testimonial }>(
  ({ testimonial }, ref) => {
    return (
      <div
        ref={ref}
        className="flex items-start space-x-6 p-8 rounded-lg bg-card border border-border"
      >
        {/* Avatar */}
        <div className="flex-shrink-0">
          {testimonial.author.avatar ? (
            <img
              src={testimonial.author.avatar}
              alt={testimonial.author.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-lg font-medium text-primary">
                {testimonial.author.name.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-4">
          {/* Rating */}
          {testimonial.rating && (
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={cn(
                    'w-4 h-4',
                    i < testimonial.rating! ? 'text-primary fill-current' : 'text-border'
                  )}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          )}

          {/* Quote */}
          <blockquote className="text-lg text-foreground leading-relaxed">
            "{testimonial.content}"
          </blockquote>

          {/* Author info */}
          <div>
            <p className="font-semibold text-foreground">
              {testimonial.author.name}
            </p>
            {(testimonial.author.title || testimonial.author.company) && (
              <p className="text-muted">
                {testimonial.author.title}
                {testimonial.author.title && testimonial.author.company && ' at '}
                {testimonial.author.company}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
);

MinimalistTestimonialItem.displayName = 'MinimalistTestimonialItem';

// Simple carousel component (could be enhanced with proper carousel library)
const MinimalistTestimonialCarousel = forwardRef<HTMLDivElement, { testimonials: Testimonial[] }>(
  ({ testimonials }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const next = () => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const previous = () => {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const current = testimonials[currentIndex];

    return (
      <div ref={ref} className="text-center">
        {/* Current testimonial */}
        <div className="mb-8">
          {/* Rating */}
          {current.rating && (
            <div className="flex justify-center space-x-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={cn(
                    'w-5 h-5',
                    i < current.rating! ? 'text-primary fill-current' : 'text-border'
                  )}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          )}

          {/* Quote */}
          <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
            "{current.content}"
          </blockquote>

          {/* Author */}
          <div className="flex items-center justify-center space-x-3">
            {current.author.avatar ? (
              <img
                src={current.author.avatar}
                alt={current.author.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="font-medium text-primary">
                  {current.author.name.charAt(0)}
                </span>
              </div>
            )}
            
            <div className="text-left">
              <p className="font-semibold text-foreground">
                {current.author.name}
              </p>
              {(current.author.title || current.author.company) && (
                <p className="text-sm text-muted">
                  {current.author.title}
                  {current.author.title && current.author.company && ' at '}
                  {current.author.company}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={previous}
            className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  'w-2 h-2 rounded-full transition-all duration-200',
                  index === currentIndex ? 'bg-primary w-6' : 'bg-border hover:bg-muted'
                )}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    );
  }
);

MinimalistTestimonialCarousel.displayName = 'MinimalistTestimonialCarousel';

export {
  MinimalistTestimonials,
  MinimalistTestimonialCard,
  MinimalistTestimonialItem,
  MinimalistTestimonialCarousel,
};