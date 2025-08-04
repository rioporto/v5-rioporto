'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export type TabsVariant = 'default' | 'outline' | 'underline';
export type TabsSize = 'sm' | 'md' | 'lg';

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  variant?: TabsVariant;
  size?: TabsSize;
}

/**
 * Tabs context for managing state
 */
const TabsContext = React.createContext<{
  value: string;
  onValueChange: (value: string) => void;
  orientation: 'horizontal' | 'vertical';
  variant: TabsVariant;
}>({
  value: '',
  onValueChange: () => {},
  orientation: 'horizontal',
  variant: 'default',
});

/**
 * Main Tabs component
 */
const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ 
    className,
    defaultValue,
    value: controlledValue,
    onValueChange,
    orientation = 'horizontal',
    variant = 'default',
    size,
    children,
    ...props 
  }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue || '');
    const value = controlledValue ?? internalValue;

    const handleValueChange = (newValue: string) => {
      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };

    return (
      <TabsContext.Provider value={{ value, onValueChange: handleValueChange, orientation, variant }}>
        <div
          ref={ref}
          className={cn(
            'w-full',
            orientation === 'vertical' && 'flex gap-4',
            className
          )}
          data-orientation={orientation}
          {...props}
        >
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);

/**
 * Tabs list component
 */
const TabsList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { variant?: TabsVariant }>(
  ({ className, variant: propVariant, ...props }, ref) => {
    const { orientation, variant: contextVariant } = React.useContext(TabsContext);
    const variant = propVariant || contextVariant;
    
    const getVariantClasses = () => {
      switch (variant) {
        case 'outline':
          return 'bg-transparent border';
        case 'underline':
          return 'bg-transparent border-b rounded-none';
        default:
          return 'bg-muted';
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md p-1',
          getVariantClasses(),
          orientation === 'vertical' && 'flex-col h-auto w-48',
          className
        )}
        role="tablist"
        aria-orientation={orientation}
        {...props}
      />
    );
  }
);

/**
 * Tabs trigger component
 */
const TabsTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }>(
  ({ className, value: triggerValue, ...props }, ref) => {
    const { value, onValueChange, variant } = React.useContext(TabsContext);
    const isActive = value === triggerValue;
    
    const getVariantClasses = () => {
      switch (variant) {
        case 'outline':
          return isActive ? 'border-primary bg-background' : 'border-transparent';
        case 'underline':
          return isActive ? 'border-b-2 border-primary rounded-none' : 'border-b-2 border-transparent rounded-none';
        default:
          return isActive ? 'bg-background text-foreground shadow-sm' : '';
      }
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-2 text-sm font-medium transition-all',
          'focus:outline-none disabled:pointer-events-none disabled:opacity-50',
          getVariantClasses(),
          className
        )}
        role="tab"
        aria-selected={isActive}
        data-state={isActive ? 'active' : 'inactive'}
        onClick={() => onValueChange(triggerValue)}
        {...props}
      />
    );
  }
);

/**
 * Tabs content component
 */
const TabsContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { value: string }>(
  ({ className, value: contentValue, children, ...props }, ref) => {
    const { value } = React.useContext(TabsContext);
    const isActive = value === contentValue;

    if (!isActive) return null;

    return (
      <div
        ref={ref}
        className={cn('mt-2 focus:outline-none', className)}
        role="tabpanel"
        data-state={isActive ? 'active' : 'inactive'}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Tabs.displayName = 'Tabs';
TabsList.displayName = 'TabsList';
TabsTrigger.displayName = 'TabsTrigger';
TabsContent.displayName = 'TabsContent';

export { Tabs, TabsList, TabsTrigger, TabsContent };