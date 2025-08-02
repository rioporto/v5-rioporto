'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

// Input component
export interface MinimalistInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  fullWidth?: boolean;
}

const MinimalistInput = forwardRef<HTMLInputElement, MinimalistInputProps>(
  ({ className, label, error, helper, fullWidth = true, type, ...props }, ref) => {
    return (
      <div className={cn('space-y-2', fullWidth && 'w-full')}>
        {/* Label */}
        {label && (
          <label className="block text-sm font-medium text-foreground">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        {/* Input */}
        <input
          ref={ref}
          type={type}
          className={cn(
            'w-full px-3 py-2 rounded-lg border border-border bg-input text-foreground placeholder:text-muted',
            'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
            'transition-all duration-200',
            error && 'border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />
        
        {/* Helper text or error */}
        {(helper || error) && (
          <p className={cn(
            'text-xs',
            error ? 'text-red-500' : 'text-muted'
          )}>
            {error || helper}
          </p>
        )}
      </div>
    );
  }
);

MinimalistInput.displayName = 'MinimalistInput';

// Textarea component
export interface MinimalistTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helper?: string;
  fullWidth?: boolean;
}

const MinimalistTextarea = forwardRef<HTMLTextAreaElement, MinimalistTextareaProps>(
  ({ className, label, error, helper, fullWidth = true, ...props }, ref) => {
    return (
      <div className={cn('space-y-2', fullWidth && 'w-full')}>
        {/* Label */}
        {label && (
          <label className="block text-sm font-medium text-foreground">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        {/* Textarea */}
        <textarea
          ref={ref}
          className={cn(
            'w-full px-3 py-2 rounded-lg border border-border bg-input text-foreground placeholder:text-muted',
            'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
            'transition-all duration-200 resize-none',
            error && 'border-red-500 focus:ring-red-500',
            className
          )}
          rows={4}
          {...props}
        />
        
        {/* Helper text or error */}
        {(helper || error) && (
          <p className={cn(
            'text-xs',
            error ? 'text-red-500' : 'text-muted'
          )}>
            {error || helper}
          </p>
        )}
      </div>
    );
  }
);

MinimalistTextarea.displayName = 'MinimalistTextarea';

// Select component
export interface MinimalistSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helper?: string;
  fullWidth?: boolean;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  placeholder?: string;
}

const MinimalistSelect = forwardRef<HTMLSelectElement, MinimalistSelectProps>(
  ({ className, label, error, helper, fullWidth = true, options, placeholder, ...props }, ref) => {
    return (
      <div className={cn('space-y-2', fullWidth && 'w-full')}>
        {/* Label */}
        {label && (
          <label className="block text-sm font-medium text-foreground">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        {/* Select */}
        <select
          ref={ref}
          className={cn(
            'w-full px-3 py-2 rounded-lg border border-border bg-input text-foreground',
            'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
            'transition-all duration-200 appearance-none cursor-pointer',
            error && 'border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        
        {/* Helper text or error */}
        {(helper || error) && (
          <p className={cn(
            'text-xs',
            error ? 'text-red-500' : 'text-muted'
          )}>
            {error || helper}
          </p>
        )}
      </div>
    );
  }
);

MinimalistSelect.displayName = 'MinimalistSelect';

// Checkbox component
export interface MinimalistCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
}

const MinimalistCheckbox = forwardRef<HTMLInputElement, MinimalistCheckboxProps>(
  ({ className, label, description, ...props }, ref) => {
    return (
      <div className="flex items-start space-x-3">
        <input
          ref={ref}
          type="checkbox"
          className={cn(
            'mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-ring focus:ring-2',
            'transition-all duration-200',
            className
          )}
          {...props}
        />
        {(label || description) && (
          <div className="space-y-1">
            {label && (
              <label className="text-sm font-medium text-foreground cursor-pointer">
                {label}
              </label>
            )}
            {description && (
              <p className="text-xs text-muted">{description}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

MinimalistCheckbox.displayName = 'MinimalistCheckbox';

// Form group component
interface MinimalistFormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
}

const MinimalistFormGroup = forwardRef<HTMLDivElement, MinimalistFormGroupProps>(
  ({ className, title, description, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('space-y-4', className)}
        {...props}
      >
        {(title || description) && (
          <div className="space-y-1">
            {title && (
              <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            )}
            {description && (
              <p className="text-sm text-muted">{description}</p>
            )}
          </div>
        )}
        <div className="space-y-4">
          {children}
        </div>
      </div>
    );
  }
);

MinimalistFormGroup.displayName = 'MinimalistFormGroup';

// Form actions component
const MinimalistFormActions = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center justify-end space-x-3 pt-6', className)}
      {...props}
    >
      {children}
    </div>
  )
);

MinimalistFormActions.displayName = 'MinimalistFormActions';

export {
  MinimalistInput,
  MinimalistTextarea,
  MinimalistSelect,
  MinimalistCheckbox,
  MinimalistFormGroup,
  MinimalistFormActions,
};