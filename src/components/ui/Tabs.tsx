import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Tabs component variants using CVA
 */
const tabsListVariants = cva(
  'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
  {
    variants: {
      variant: {
        default: 'bg-muted',
        outline: 'bg-transparent border border-border',
        underline: 'bg-transparent border-b border-border rounded-none',
      },
      size: {
        sm: 'h-8 text-sm',
        md: 'h-10',
        lg: 'h-12 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const tabsTriggerVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
        outline: 'border border-transparent data-[state=active]:border-primary data-[state=active]:bg-background data-[state=active]:text-foreground',
        underline: 'border-b-2 border-transparent rounded-none data-[state=active]:border-primary data-[state=active]:text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface TabsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tabsListVariants> {
  /**
   * Default active tab value
   */
  defaultValue?: string;
  /**
   * Controlled active tab value
   */
  value?: string;
  /**
   * Callback when tab changes
   */
  onValueChange?: (value: string) => void;
  /**
   * Orientation of tabs
   */
  orientation?: 'horizontal' | 'vertical';
}

/**
 * Tabs context for managing state
 */
const TabsContext = React.createContext<{
  value: string;
  onValueChange: (value: string) => void;
  orientation: 'horizontal' | 'vertical';
}>({
  value: '',
  onValueChange: () => {},
  orientation: 'horizontal',
});

/**
 * Main Tabs component
 * 
 * @example
 * ```tsx
 * <Tabs defaultValue="tab1">
 *   <TabsList>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">Content 1</TabsContent>
 *   <TabsContent value="tab2">Content 2</TabsContent>
 * </Tabs>
 * ```
 */
const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ 
    className,
    defaultValue,
    value: controlledValue,
    onValueChange,
    orientation = 'horizontal',
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
      <TabsContext.Provider value={{ value, onValueChange: handleValueChange, orientation }}>
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
const TabsList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof tabsListVariants>
>(({ className, variant, size, ...props }, ref) => {
  const { orientation } = React.useContext(TabsContext);

  return (
    <div
      ref={ref}
      className={cn(
        tabsListVariants({ variant, size }),
        orientation === 'vertical' && 'flex-col h-auto w-48',
        className
      )}
      role="tablist"
      aria-orientation={orientation}
      {...props}
    />
  );
});

/**
 * Tabs trigger component
 */
const TabsTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & 
  VariantProps<typeof tabsTriggerVariants> & {
    value: string;
  }
>(({ className, variant, value: triggerValue, ...props }, ref) => {
  const { value, onValueChange } = React.useContext(TabsContext);
  const isActive = value === triggerValue;

  return (
    <button
      ref={ref}
      className={cn(tabsTriggerVariants({ variant }), className)}
      role="tab"
      aria-selected={isActive}
      data-state={isActive ? 'active' : 'inactive'}
      onClick={() => onValueChange(triggerValue)}
      {...props}
    />
  );
});

/**
 * Tabs content component
 */
const TabsContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value: string;
  }
>(({ className, value: contentValue, children, ...props }, ref) => {
  const { value } = React.useContext(TabsContext);
  const isActive = value === contentValue;

  if (!isActive) return null;

  return (
    <div
      ref={ref}
      className={cn(
        'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className
      )}
      role="tabpanel"
      data-state={isActive ? 'active' : 'inactive'}
      {...props}
    >
      {children}
    </div>
  );
});

Tabs.displayName = 'Tabs';
TabsList.displayName = 'TabsList';
TabsTrigger.displayName = 'TabsTrigger';
TabsContent.displayName = 'TabsContent';

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants, tabsTriggerVariants };