import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export type LogoSize = 'sm' | 'md' | 'lg' | 'xl';
export type LogoVariant = 'default' | 'primary' | 'white' | 'muted';

const getSizeClasses = (size: LogoSize): string => {
  const sizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };
  return sizes[size];
};

const getVariantClasses = (variant: LogoVariant): string => {
  const variants = {
    default: 'text-foreground',
    primary: 'text-primary',
    white: 'text-white',
    muted: 'text-muted'
  };
  return variants[variant];
};

const getIconSize = (size: LogoSize): string => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12'
  };
  return iconSizes[size];
};

export interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: LogoSize;
  variant?: LogoVariant;
  clickable?: boolean;
  href?: string;
  showIcon?: boolean;
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
 */
const Logo = React.forwardRef<HTMLDivElement, LogoProps>(
  ({ 
    className, 
    size = 'md',
    variant = 'primary',
    clickable = true,
    href = '/',
    showIcon = true,
    icon,
    ...props 
  }, ref) => {
    const content = (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-2 font-bold transition-colors',
          getSizeClasses(size),
          getVariantClasses(variant),
          className
        )}
        {...props}
      >
        {showIcon && (
          <div className={cn('flex-shrink-0', getIconSize(size))}>
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

export { Logo };