import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const dropdownVariants = cva(
  'absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
  {
    variants: {
      size: {
        sm: 'min-w-[6rem] text-xs',
        md: 'min-w-[8rem] text-sm',
        lg: 'min-w-[12rem] text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface DropdownProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dropdownVariants> {
  /**
   * Trigger element
   */
  trigger: React.ReactNode;
  /**
   * Whether dropdown is open
   */
  open?: boolean;
  /**
   * Callback when open state changes
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Close on item click
   */
  closeOnItemClick?: boolean;
}

const DropdownContext = React.createContext<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  closeOnItemClick: boolean;
}>({
  open: false,
  onOpenChange: () => {},
  closeOnItemClick: true,
});

/**
 * Dropdown component
 */
const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  open: controlledOpen,
  onOpenChange,
  closeOnItemClick = true,
  children,
}) => {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const open = controlledOpen ?? internalOpen;
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const handleOpenChange = (newOpen: boolean) => {
    if (controlledOpen === undefined) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  // Close on outside click
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        handleOpenChange(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <DropdownContext.Provider value={{ open, onOpenChange: handleOpenChange, closeOnItemClick }}>
      <div ref={dropdownRef} className="relative inline-block">
        <div onClick={() => handleOpenChange(!open)}>
          {trigger}
        </div>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

/**
 * Dropdown content
 */
const DropdownContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof dropdownVariants>
>(({ className, size, ...props }, ref) => {
  const { open } = React.useContext(DropdownContext);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className={cn(dropdownVariants({ size }), className)}
      {...props}
    />
  );
});

/**
 * Dropdown item
 */
const DropdownItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    disabled?: boolean;
  }
>(({ className, disabled, onClick, ...props }, ref) => {
  const { onOpenChange, closeOnItemClick } = React.useContext(DropdownContext);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    
    onClick?.(e);
    
    if (closeOnItemClick) {
      onOpenChange(false);
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        !disabled && 'hover:bg-accent hover:text-accent-foreground cursor-pointer',
        className
      )}
      data-disabled={disabled}
      onClick={handleClick}
      {...props}
    />
  );
});

/**
 * Dropdown separator
 */
const DropdownSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
));

Dropdown.displayName = 'Dropdown';
DropdownContent.displayName = 'DropdownContent';
DropdownItem.displayName = 'DropdownItem';
DropdownSeparator.displayName = 'DropdownSeparator';

export {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  dropdownVariants,
};