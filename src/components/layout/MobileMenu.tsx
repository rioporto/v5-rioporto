import React from 'react';
import { cn } from '@/lib/utils';
import { Navigation, NavigationItem } from './Navigation';

export interface MobileMenuProps {
  /**
   * Whether menu is open
   */
  open: boolean;
  /**
   * Callback when menu state changes
   */
  onOpenChange: (open: boolean) => void;
  /**
   * Navigation items
   */
  items: NavigationItem[];
  /**
   * Additional content
   */
  children?: React.ReactNode;
}

/**
 * Mobile menu component
 */
const MobileMenu: React.FC<MobileMenuProps> = ({
  open,
  onOpenChange,
  items,
  children,
}) => {
  // Close on escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onOpenChange(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onOpenChange]);

  // Prevent scroll when menu is open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  return (
    <>
      {/* Overlay */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => onOpenChange(false)}
        />
      )}
      
      {/* Menu */}
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-[280px] bg-background border-l border-border z-50 transform transition-transform duration-300 md:hidden',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="p-2 hover:bg-accent rounded-md"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <Navigation 
            items={items} 
            orientation="vertical" 
            variant="primary"
          />
          {children}
        </div>
      </div>
    </>
  );
};

/**
 * Mobile menu trigger button
 */
export interface MobileMenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Whether menu is open
   */
  open?: boolean;
}

const MobileMenuTrigger = React.forwardRef<HTMLButtonElement, MobileMenuTriggerProps>(
  ({ className, open = false, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring md:hidden',
          className
        )}
        aria-label="Toggle menu"
        {...props}
      >
        <svg 
          className={cn('w-6 h-6 transition-transform', open && 'rotate-90')} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
    );
  }
);

MobileMenu.displayName = 'MobileMenu';
MobileMenuTrigger.displayName = 'MobileMenuTrigger';

export { MobileMenu, MobileMenuTrigger };