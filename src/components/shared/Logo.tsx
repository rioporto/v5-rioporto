import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const logoVariants = cva(
  'flex items-center gap-2 font-bold transition-colors',
  {
    variants: {
      size: {
        sm: 'text-lg',
        md: 'text-xl',
        lg: 'text-2xl',
        xl: 'text-3xl',
      },
      variant: {
        default: 'text-foreground',
        primary: 'text-primary',
        white: 'text-white',
        muted: 'text-muted-foreground',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'primary',
    },
  }
);

export interface LogoProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof logoVariants> {
  /**
   * Whether logo is clickable (links to home)
   */
  clickable?: boolean;
  /**
   * Custom href for clickable logo
   */
  href?: string;
  /**
   * Whether to show icon
   */
  showIcon?: boolean;
  /**
   * Custom icon
   */
  icon?: React.ReactNode;
}

/**
 * Default logo icon
 */
const DefaultLogoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

/**
 * Logo component adaptable to theme
 * 
 * @example
 * ```tsx
 * <Logo clickable />
 * <Logo size="lg" variant="primary" showIcon={false} />
 * ```
 */
const Logo = React.forwardRef<HTMLDivElement, LogoProps>(
  ({ 
    className, 
    size,
    variant,
    clickable = true,
    href = '/',
    showIcon = true,
    icon,
    ...props 
  }, ref) => {
    const content = (
      <div
        ref={ref}
        className={cn(logoVariants({ size, variant, className }))}
        {...props}
      >
        {showIcon && (
          <div className={cn(
            'flex-shrink-0',
            {
              'w-6 h-6': size === 'sm',
              'w-8 h-8': size === 'md',
              'w-10 h-10': size === 'lg',
              'w-12 h-12': size === 'xl',
            }
          )}>
            {icon || <DefaultLogoIcon className="w-full h-full" />}
          </div>
        )}
        <span className="font-display">RioPorto</span>
      </div>
    );

    if (clickable) {
      return (
        <Link href={href} className="hover:opacity-80 transition-opacity">
          {content}
        </Link>
      );
    }

    return content;
  }
);

Logo.displayName = 'Logo';

export { Logo, logoVariants };