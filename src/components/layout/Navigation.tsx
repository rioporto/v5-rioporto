import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export interface NavigationItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  children?: NavigationItem[];
}

export interface NavigationProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Navigation items
   */
  items: NavigationItem[];
  /**
   * Navigation orientation
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Navigation variant
   */
  variant?: 'primary' | 'pills' | 'underline';
}

/**
 * Navigation component
 */
const Navigation = React.forwardRef<HTMLElement, NavigationProps>(
  ({ 
    className, 
    items,
    orientation = 'horizontal',
    variant = 'default',
    ...props 
  }, ref) => {
    const orientationClasses = {
      horizontal: 'flex space-x-1',
      vertical: 'flex flex-col space-y-1',
    };

    return (
      <nav
        ref={ref}
        className={cn(orientationClasses[orientation], className)}
        {...props}
      >
        {items.map((item, index) => (
          <NavigationLink key={index} item={item} variant={variant} />
        ))}
      </nav>
    );
  }
);

interface NavigationLinkProps {
  item: NavigationItem;
  variant: 'primary' | 'pills' | 'underline';
}

const NavigationLink: React.FC<NavigationLinkProps> = ({ item, variant }) => {
  const baseClasses = 'flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors rounded-md';
  
  const variantClasses = {
    default: item.active 
      ? 'bg-accent text-accent-foreground' 
      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50',
    pills: item.active 
      ? 'bg-primary text-primary-foreground' 
      : 'text-muted-foreground hover:text-foreground hover:bg-accent',
    underline: item.active 
      ? 'text-foreground border-b-2 border-primary rounded-none' 
      : 'text-muted-foreground hover:text-foreground border-b-2 border-transparent rounded-none',
  };

  if (item.disabled) {
    return (
      <span className={cn(baseClasses, 'opacity-50 cursor-not-allowed')}>
        {item.icon}
        {item.label}
      </span>
    );
  }

  return (
    <Link
      href={item.href}
      className={cn(baseClasses, variantClasses[variant])}
    >
      {item.icon}
      {item.label}
    </Link>
  );
};

Navigation.displayName = 'Navigation';

export { Navigation };