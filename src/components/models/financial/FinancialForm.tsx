'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface FinancialInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  prefix?: string;
  suffix?: string;
  variant?: 'primary' | 'price' | 'quantity';
}

const FinancialInput = forwardRef<HTMLInputElement, FinancialInputProps>(
  ({ 
    className, 
    type = 'text',
    label,
    error,
    prefix,
    suffix,
    variant = 'default',
    ...props 
  }, ref) => {
    return (
      <div className="space-y-1">
        {/* Label */}
        {label && (
          <label className="block text-xs font-mono font-medium text-foreground uppercase tracking-wide">
            {label}
          </label>
        )}
        
        {/* Input Container */}
        <div className="relative">
          {/* Prefix */}
          {prefix && (
            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-mono text-muted-foreground">
              {prefix}
            </div>
          )}
          
          {/* Input */}
          <input
            type={type}
            className={cn(
              // Base styles
              'w-full h-8 bg-input border border-border rounded-sm',
              'font-mono text-sm text-foreground placeholder:text-muted-foreground',
              'transition-all duration-150 ease-out',
              'focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              
              // Variant styles
              {
                'px-2': variant === 'default' && !prefix && !suffix,
                'text-right': variant === 'price' || variant === 'quantity',
                'font-bold': variant === 'price',
                'tabular-nums': variant === 'price' || variant === 'quantity',
              },
              
              // Padding adjustments for prefix/suffix
              {
                'pl-8': prefix,
                'pr-8': suffix,
                'px-2': !prefix && !suffix,
              },
              
              // Error state
              {
                'border-error focus:border-error focus:ring-error/50': error,
              },
              
              className
            )}
            ref={ref}
            {...props}
          />
          
          {/* Suffix */}
          {suffix && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-mono text-muted-foreground">
              {suffix}
            </div>
          )}
        </div>
        
        {/* Error Message */}
        {error && (
          <p className="text-xs font-mono text-error">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FinancialInput.displayName = 'FinancialInput';

// Select Component
export interface FinancialSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string | number; label: string; disabled?: boolean }[];
}

const FinancialSelect = forwardRef<HTMLSelectElement, FinancialSelectProps>(
  ({ className, label, error, options, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {/* Label */}
        {label && (
          <label className="block text-xs font-mono font-medium text-foreground uppercase tracking-wide">
            {label}
          </label>
        )}
        
        {/* Select */}
        <select
          className={cn(
            'w-full h-8 px-2 bg-input border border-border rounded-sm',
            'font-mono text-sm text-foreground',
            'transition-all duration-150 ease-out',
            'focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            
            // Error state
            {
              'border-error focus:border-error focus:ring-error/50': error,
            },
            
            className
          )}
          ref={ref}
          {...props}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              className="bg-input text-foreground"
            >
              {option.label}
            </option>
          ))}
        </select>
        
        {/* Error Message */}
        {error && (
          <p className="text-xs font-mono text-error">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FinancialSelect.displayName = 'FinancialSelect';

// Form Group Component
export interface FinancialFormGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  required?: boolean;
}

const FinancialFormGroup = forwardRef<HTMLDivElement, FinancialFormGroupProps>(
  ({ className, title, description, required, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('space-y-3', className)}
        {...props}
      >
        {/* Header */}
        {(title || description) && (
          <div className="space-y-1">
            {title && (
              <h3 className="font-mono text-sm font-semibold text-foreground">
                {title}
                {required && (
                  <span className="text-error ml-1">*</span>
                )}
              </h3>
            )}
            {description && (
              <p className="text-xs text-muted-foreground font-mono">
                {description}
              </p>
            )}
          </div>
        )}
        
        {/* Content */}
        <div className="space-y-2">
          {children}
        </div>
      </div>
    );
  }
);

FinancialFormGroup.displayName = 'FinancialFormGroup';

// Quick Trade Form Component
export interface QuickTradeFormProps {
  type: 'buy' | 'sell';
  symbol: string;
  onSubmit: (data: {
    type: 'buy' | 'sell';
    symbol: string;
    quantity: number;
    price?: number;
    orderType: 'market' | 'limit';
  }) => void;
  loading?: boolean;
}

export function QuickTradeForm({ 
  type, 
  symbol, 
  onSubmit, 
  loading = false 
}: QuickTradeFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    onSubmit({
      type,
      symbol,
      quantity: Number(formData.get('quantity')),
      price: formData.get('orderType') === 'limit' ? Number(formData.get('price')) : undefined,
      orderType: formData.get('orderType') as 'market' | 'limit',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FinancialFormGroup 
        title={`${type.toUpperCase()} ${symbol}`}
        description="Execute your trade order"
      >
        <FinancialSelect
          name="orderType"
          label="Order Type"
          options={[
            { value: 'market', label: 'Market Order' },
            { value: 'limit', label: 'Limit Order' },
          ]}
          defaultValue="market"
        />
        
        <FinancialInput
          name="quantity"
          label="Quantity"
          type="number"
          step="0.00000001"
          suffix={symbol}
          variant="quantity"
          placeholder="0.00000000"
          required
        />
        
        <FinancialInput
          name="price"
          label="Price (Limit Only)"
          type="number"
          step="0.01"
          prefix="R$"
          variant="price"
          placeholder="0.00"
        />
        
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className={cn(
              'w-full h-10 rounded-sm font-mono text-sm font-medium',
              'transition-all duration-150 ease-out',
              'focus:outline-none focus:ring-2 focus:ring-offset-1',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              {
                'bg-success text-white hover:bg-success/90 focus:ring-success/50': type === 'buy',
                'bg-error text-white hover:bg-error/90 focus:ring-error/50': type === 'sell',
              }
            )}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="h-4 w-4 animate-spin rounded-full border border-current border-r-transparent" />
                <span>Processing...</span>
              </div>
            ) : (
              `${type.toUpperCase()} ${symbol}`
            )}
          </button>
        </div>
      </FinancialFormGroup>
    </form>
  );
}

export { FinancialInput, FinancialSelect, FinancialFormGroup };