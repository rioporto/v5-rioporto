import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/Button';

export interface EmptyStateProps {
  /**
   * Title of empty state
   */
  title: string;
  /**
   * Description text
   */
  description?: string;
  /**
   * Custom icon
   */
  icon?: React.ReactNode;
  /**
   * Action button
   */
  action?: {
    label: string;
    onClick: () => void;
  };
  /**
   * Custom class name
   */
  className?: string;
}

/**
 * Default empty state icon
 */
const DefaultEmptyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    className={cn('w-16 h-16 text-muted-foreground', className)} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
  </svg>
);

/**
 * Empty state component for when there's no data
 * 
 * @example
 * ```tsx
 * <EmptyState 
 *   title="No transactions found"
 *   description="You haven't made any transactions yet"
 *   action={{
 *     label: "Create transaction",
 *     onClick: () => navigate('/create')
 *   }}
 * />
 * ```
 */
const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
  className,
}) => {
  return (
    <div className={cn(
      'flex flex-col items-center justify-center py-12 px-4 text-center',
      className
    )}>
      <div className="mb-6">
        {icon || <DefaultEmptyIcon />}
      </div>
      
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {title}
      </h3>
      
      {description && (
        <p className="text-muted-foreground max-w-md mb-6">
          {description}
        </p>
      )}
      
      {action && (
        <Button onClick={action.onClick} variant="primary">
          {action.label}
        </Button>
      )}
    </div>
  );
};

EmptyState.displayName = 'EmptyState';

export { EmptyState };