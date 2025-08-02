import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const sectionVariants = cva(
  'w-full',
  {
    variants: {
      padding: {
        none: '',
        sm: 'py-8',
        md: 'py-12',
        lg: 'py-16',
        xl: 'py-20',
      },
      background: {
        default: '',
        muted: 'bg-muted/50',
        accent: 'bg-accent/5',
        primary: 'bg-primary text-primary-foreground',
      },
    },
    defaultVariants: {
      padding: 'md',
      background: 'default',
    },
  }
);

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {}

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
  ({ className, padding, background, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(sectionVariants({ padding, background, className }))}
        {...props}
      />
    );
  }
);

Section.displayName = 'Section';

export { Section, sectionVariants };