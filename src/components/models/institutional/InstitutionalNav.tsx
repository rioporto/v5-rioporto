'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface NavigationItem {
  key: string;
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  children?: NavigationItem[];
  active?: boolean;
  disabled?: boolean;
  badge?: string | number;
}

interface InstitutionalNavProps {
  items: NavigationItem[];
  orientation?: 'horizontal' | 'vertical';
  variant?: 'primary' | 'secondary' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onItemClick?: (item: NavigationItem) => void;
}

const InstitutionalNav: React.FC<InstitutionalNavProps> = ({
  items,
  orientation = 'horizontal',
  variant = 'primary',
  size = 'md',
  className,
  onItemClick
}) => {
  const [openItems, setOpenItems] = React.useState<Set<string>>(new Set());

  const toggleItem = (key: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(key)) {
      newOpenItems.delete(key);
    } else {
      newOpenItems.add(key);
    }
    setOpenItems(newOpenItems);
  };

  const handleItemClick = (item: NavigationItem, event: React.MouseEvent) => {
    if (item.disabled) {
      event.preventDefault();
      return;
    }

    if (item.children?.length) {
      event.preventDefault();
      toggleItem(item.key);
    }

    if (item.onClick) {
      item.onClick();
    }

    onItemClick?.(item);
  };

  const baseStyles = {
    horizontal: 'flex items-center space-x-1',
    vertical: 'flex flex-col space-y-1'
  };

  const variants = {
    primary: 'bg-card border-b border-border shadow-sm',
    secondary: 'bg-muted/50',
    minimal: 'bg-transparent'
  };

  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const renderNavItem = (item: NavigationItem, level: number = 0) => {
    const isOpen = openItems.has(item.key);
    const hasChildren = item.children && item.children.length > 0;
    
    const itemBaseStyles = cn(
      'flex items-center justify-between rounded-md transition-all duration-200',
      'hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring',
      sizes[size],
      {
        'px-3 py-2': size === 'sm',
        'px-4 py-2.5': size === 'md',
        'px-5 py-3': size === 'lg'
      },
      level > 0 && 'ml-4 border-l-2 border-border pl-4',
      item.active && 'bg-primary/10 text-primary border-primary',
      item.disabled && 'opacity-50 cursor-not-allowed hover:bg-transparent'
    );

    return (
      <div key={item.key} className="relative">
        {item.href && !hasChildren ? (
          <a
            href={item.href}
            className={itemBaseStyles}
            onClick={(e) => handleItemClick(item, e)}
          >
            <div className="flex items-center space-x-3">
              {item.icon && (
                <span className="flex-shrink-0">{item.icon}</span>
              )}
              <span className="font-medium">{item.label}</span>
              {item.badge && (
                <span className="ml-auto px-2 py-1 text-xs bg-primary text-white rounded-full">
                  {item.badge}
                </span>
              )}
            </div>
          </a>
        ) : (
          <button
            className={cn(itemBaseStyles, 'w-full text-left')}
            onClick={(e) => handleItemClick(item, e)}
            disabled={item.disabled}
          >
            <div className="flex items-center space-x-3">
              {item.icon && (
                <span className="flex-shrink-0">{item.icon}</span>
              )}
              <span className="font-medium">{item.label}</span>
              {item.badge && (
                <span className="ml-auto px-2 py-1 text-xs bg-primary text-white rounded-full">
                  {item.badge}
                </span>
              )}
            </div>
            {hasChildren && (
              <span className="flex-shrink-0 ml-2">
                {orientation === 'horizontal' ? (
                  <ChevronDown className={cn(
                    'h-4 w-4 transition-transform duration-200',
                    isOpen && 'rotate-180'
                  )} />
                ) : (
                  <ChevronRight className={cn(
                    'h-4 w-4 transition-transform duration-200',
                    isOpen && 'rotate-90'
                  )} />
                )}
              </span>
            )}
          </button>
        )}

        {/* Submenu */}
        {hasChildren && (
          <div className={cn(
            'transition-all duration-300 overflow-hidden',
            orientation === 'horizontal' 
              ? cn(
                  'absolute top-full left-0 mt-1 min-w-48 bg-card border border-border rounded-md shadow-lg z-50',
                  isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                )
              : cn(
                  'ml-4 space-y-1',
                  isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                )
          )}>
            {orientation === 'horizontal' ? (
              <div className="py-2">
                {item.children?.map((child) => (
                  <div key={child.key} className="px-2">
                    {renderNavItem(child, level + 1)}
                  </div>
                ))}
              </div>
            ) : (
              item.children?.map((child) => renderNavItem(child, level + 1))
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className={cn(
      variants[variant],
      baseStyles[orientation],
      orientation === 'horizontal' ? 'px-6 py-3' : 'p-4',
      className
    )}>
      {orientation === 'horizontal' ? (
        <div className="flex items-center space-x-1 w-full">
          {items.map((item) => renderNavItem(item))}
        </div>
      ) : (
        <div className="space-y-1 w-full">
          {items.map((item) => renderNavItem(item))}
        </div>
      )}
    </nav>
  );
};

export default InstitutionalNav;

// Breadcrumb Navigation
interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface InstitutionalBreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}

export const InstitutionalBreadcrumb: React.FC<InstitutionalBreadcrumbProps> = ({
  items,
  separator = <ChevronRight className="h-4 w-4 text-muted-foreground" />,
  className
}) => {
  return (
    <nav className={cn('flex items-center space-x-2 text-sm', className)} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            {index > 0 && separator}
            {item.href ? (
              <a
                href={item.href}
                onClick={item.onClick}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <span className={cn(
                index === items.length - 1 
                  ? 'text-foreground font-medium' 
                  : 'text-muted-foreground hover:text-foreground transition-colors cursor-pointer'
              )}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

// Tab Navigation
interface TabItem {
  key: string;
  label: string;
  content?: React.ReactNode;
  disabled?: boolean;
  badge?: string | number;
  icon?: React.ReactNode;
}

interface InstitutionalTabsProps {
  items: TabItem[];
  activeKey?: string;
  onChange?: (key: string) => void;
  variant?: 'default' | 'pills' | 'underline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const InstitutionalTabs: React.FC<InstitutionalTabsProps> = ({
  items,
  activeKey,
  onChange,
  variant = 'default',
  size = 'md',
  className
}) => {
  const [currentActiveKey, setCurrentActiveKey] = React.useState(
    activeKey || items[0]?.key
  );

  const handleTabChange = (key: string) => {
    setCurrentActiveKey(key);
    onChange?.(key);
  };

  const activeItem = items.find(item => item.key === currentActiveKey);

  const tabVariants = {
    default: 'border-b border-border',
    pills: 'bg-muted rounded-lg p-1',
    underline: 'border-b-2 border-transparent'
  };

  const tabItemVariants = {
    default: {
      base: 'px-4 py-2 font-medium transition-colors relative',
      active: 'text-primary border-b-2 border-primary',
      inactive: 'text-muted-foreground hover:text-foreground'
    },
    pills: {
      base: 'px-4 py-2 font-medium rounded-md transition-colors',
      active: 'bg-card text-foreground shadow-sm',
      inactive: 'text-muted-foreground hover:text-foreground hover:bg-card/50'
    },
    underline: {
      base: 'px-4 py-2 font-medium transition-colors border-b-2',
      active: 'text-primary border-primary',
      inactive: 'text-muted-foreground hover:text-foreground border-transparent'
    }
  };

  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Tab Headers */}
      <div className={cn('flex items-center', tabVariants[variant])}>
        {items.map((item) => (
          <button
            key={item.key}
            onClick={() => !item.disabled && handleTabChange(item.key)}
            disabled={item.disabled}
            className={cn(
              tabItemVariants[variant].base,
              sizes[size],
              item.key === currentActiveKey
                ? tabItemVariants[variant].active
                : tabItemVariants[variant].inactive,
              item.disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            <div className="flex items-center space-x-2">
              {item.icon && <span>{item.icon}</span>}
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-2 px-2 py-1 text-xs bg-primary text-white rounded-full">
                  {item.badge}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeItem?.content && (
        <div className="mt-6">
          {activeItem.content}
        </div>
      )}
    </div>
  );
};