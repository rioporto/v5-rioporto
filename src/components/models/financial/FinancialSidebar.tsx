'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { FinancialButton } from './FinancialButton';

export interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  badge?: string | number;
  children?: SidebarItem[];
  active?: boolean;
}

export interface FinancialSidebarProps {
  className?: string;
  items: SidebarItem[];
  collapsed?: boolean;
  onCollapseToggle?: () => void;
  width?: 'sm' | 'md' | 'lg';
}

export function FinancialSidebar({
  className,
  items,
  collapsed = false,
  onCollapseToggle,
  width = 'md',
}: FinancialSidebarProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const widthClasses = {
    sm: collapsed ? 'w-12' : 'w-48',
    md: collapsed ? 'w-12' : 'w-56',
    lg: collapsed ? 'w-12' : 'w-64',
  };

  const renderItem = (item: SidebarItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.id);
    const isActive = item.active;

    return (
      <div key={item.id}>
        <div
          className={cn(
            'group relative flex items-center justify-between',
            'h-8 px-2 mx-1 rounded-sm transition-all duration-150',
            'cursor-pointer font-mono text-sm',
            {
              // Active state
              'bg-primary/10 text-primary border-l-2 border-primary': isActive,
              // Hover state  
              'hover:bg-muted/50 text-foreground': !isActive,
              // Nested level indentation
              'ml-4': level > 0 && !collapsed,
            }
          )}
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.id);
            } else if (item.onClick) {
              item.onClick();
            }
          }}
        >
          <div className="flex items-center space-x-2 min-w-0 flex-1">
            {/* Icon */}
            {item.icon && (
              <div className="flex-shrink-0 w-4 h-4 flex items-center justify-center">
                {item.icon}
              </div>
            )}
            
            {/* Label */}
            {!collapsed && (
              <span className="truncate text-xs">
                {item.label}
              </span>
            )}
          </div>

          {/* Badge and Expand Icon */}
          {!collapsed && (
            <div className="flex items-center space-x-1">
              {/* Badge */}
              {item.badge && (
                <span className="flex h-4 w-4 items-center justify-center rounded-sm bg-primary text-[10px] font-mono text-white">
                  {item.badge}
                </span>
              )}
              
              {/* Expand arrow */}
              {hasChildren && (
                <div
                  className={cn(
                    'h-3 w-3 transition-transform duration-150',
                    isExpanded ? 'rotate-90' : 'rotate-0'
                  )}
                >
                  <svg viewBox="0 0 8 8" className="h-full w-full fill-current">
                    <path d="M2 1L6 4L2 7V1Z" />
                  </svg>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Children */}
        {hasChildren && isExpanded && !collapsed && (
          <div className="ml-2">
            {item.children!.map((child) => renderItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen',
        'bg-card border-r border-border',
        'transition-all duration-200 ease-out',
        widthClasses[width],
        className
      )}
    >
      {/* Header */}
      <div className="flex h-12 items-center justify-between border-b border-border px-2">
        {!collapsed && (
          <h2 className="font-mono text-sm font-semibold text-foreground">
            TERMINAL
          </h2>
        )}
        
        {onCollapseToggle && (
          <FinancialButton
            variant="ghost"
            size="sm"
            onClick={onCollapseToggle}
            className="h-6 w-6 p-0"
          >
            <div
              className={cn(
                'h-3 w-3 transition-transform duration-200',
                collapsed ? 'rotate-0' : 'rotate-180'
              )}
            >
              <svg viewBox="0 0 8 8" className="h-full w-full fill-current">
                <path d="M2 1L6 4L2 7V1Z" />
              </svg>
            </div>
          </FinancialButton>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2">
        <div className="space-y-1">
          {items.map((item) => renderItem(item))}
        </div>
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="border-t border-border p-2">
          <div className="text-[10px] text-muted-foreground font-mono text-center">
            RIOPORTO v2.0
          </div>
        </div>
      )}
    </aside>
  );
}