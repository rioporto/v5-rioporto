import React from 'react';
import { cn } from '@/lib/utils';

export type SectionPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';
export type SectionBackground = 'default' | 'muted' | 'accent' | 'primary';

const getPaddingClasses = (padding: SectionPadding): string => {
  const paddings = {
    none: '',
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
    xl: 'py-20'
  };
  return paddings[padding];
};

const getBackgroundClasses = (background: SectionBackground): string => {
  const backgrounds = {
    default: '',
    muted: 'bg-muted',
    accent: 'bg-accent',
    primary: 'bg-primary text-primary-foreground'
  };
  return backgrounds[background];
};

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  padding?: SectionPadding;
  background?: SectionBackground;
}

/**
 * Section component for page content areas
 * 
 * @example
 * ```tsx
 * <Section padding="lg" background="muted">
 *   <Container>
 *     <h2>Section Title</h2>
 *     <p>Section content...</p>
 *   </Container>
 * </Section>
 * ```
 */
const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, padding = 'md', background = 'default', ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          'w-full',
          getPaddingClasses(padding),
          getBackgroundClasses(background),
          className
        )}
        {...props}
      />
    );
  }
);

Section.displayName = 'Section';

export { Section };