'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, AlertCircle, CheckCircle, Info } from 'lucide-react';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  success?: string;
  info?: string;
  required?: boolean;
  description?: string;
}

interface TextAreaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  success?: string;
  info?: string;
  required?: boolean;
  description?: string;
}

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  success?: string;
  info?: string;
  required?: boolean;
  description?: string;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
}

// Base field wrapper
const FieldWrapper: React.FC<{
  label: string;
  required?: boolean;
  error?: string;
  success?: string;
  info?: string;
  description?: string;
  children: React.ReactNode;
}> = ({ label, required, error, success, info, description, children }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-error ml-1">*</span>}
      </label>
      
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
      
      {children}
      
      {/* Status messages */}
      {error && (
        <div className="flex items-center space-x-2 text-error text-xs">
          <AlertCircle className="h-3 w-3" />
          <span>{error}</span>
        </div>
      )}
      
      {success && (
        <div className="flex items-center space-x-2 text-success text-xs">
          <CheckCircle className="h-3 w-3" />
          <span>{success}</span>
        </div>
      )}
      
      {info && !error && !success && (
        <div className="flex items-center space-x-2 text-muted-foreground text-xs">
          <Info className="h-3 w-3" />
          <span>{info}</span>
        </div>
      )}
    </div>
  );
};

// Input Field
export const InstitutionalInput = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ className, label, error, success, info, required, description, type = 'text', ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === 'password';

    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
      <FieldWrapper
        label={label}
        required={required}
        error={error}
        success={success}
        info={info}
        description={description}
      >
        <div className="relative">
          <input
            type={inputType}
            className={cn(
              'w-full px-4 py-3 border border-border rounded-md bg-input text-foreground',
              'placeholder-muted-foreground transition-colors duration-300',
              'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              error && 'border-error focus:ring-error',
              success && 'border-success focus:ring-success',
              isPassword && 'pr-12',
              className
            )}
            ref={ref}
            {...props}
          />
          
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          )}
        </div>
      </FieldWrapper>
    );
  }
);

InstitutionalInput.displayName = 'InstitutionalInput';

// TextArea Field
export const InstitutionalTextArea = React.forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  ({ className, label, error, success, info, required, description, rows = 4, ...props }, ref) => {
    return (
      <FieldWrapper
        label={label}
        required={required}
        error={error}
        success={success}
        info={info}
        description={description}
      >
        <textarea
          rows={rows}
          className={cn(
            'w-full px-4 py-3 border border-border rounded-md bg-input text-foreground',
            'placeholder-muted-foreground transition-colors duration-300 resize-vertical',
            'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-error focus:ring-error',
            success && 'border-success focus:ring-success',
            className
          )}
          ref={ref}
          {...props}
        />
      </FieldWrapper>
    );
  }
);

InstitutionalTextArea.displayName = 'InstitutionalTextArea';

// Select Field
export const InstitutionalSelect = React.forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ className, label, error, success, info, required, description, options, ...props }, ref) => {
    return (
      <FieldWrapper
        label={label}
        required={required}
        error={error}
        success={success}
        info={info}
        description={description}
      >
        <select
          className={cn(
            'w-full px-4 py-3 border border-border rounded-md bg-input text-foreground',
            'transition-colors duration-300 cursor-pointer',
            'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-error focus:ring-error',
            success && 'border-success focus:ring-success',
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
            >
              {option.label}
            </option>
          ))}
        </select>
      </FieldWrapper>
    );
  }
);

InstitutionalSelect.displayName = 'InstitutionalSelect';

// Checkbox Field
interface CheckboxFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
  error?: string;
}

export const InstitutionalCheckbox = React.forwardRef<HTMLInputElement, CheckboxFieldProps>(
  ({ className, label, description, error, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            className={cn(
              'mt-1 h-4 w-4 rounded border-border text-primary',
              'focus:ring-2 focus:ring-ring transition-colors',
              error && 'border-error',
              className
            )}
            ref={ref}
            {...props}
          />
          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground cursor-pointer">
              {label}
            </label>
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
        
        {error && (
          <div className="flex items-center space-x-2 text-error text-xs ml-7">
            <AlertCircle className="h-3 w-3" />
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  }
);

InstitutionalCheckbox.displayName = 'InstitutionalCheckbox';

// Radio Group
interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  name: string;
  label: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  required?: boolean;
  description?: string;
  className?: string;
}

export const InstitutionalRadioGroup: React.FC<RadioGroupProps> = ({
  name,
  label,
  options,
  value,
  onChange,
  error,
  required,
  description,
  className
}) => {
  return (
    <div className={cn('space-y-3', className)}>
      <div>
        <label className="block text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-start space-x-3">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange?.(e.target.value)}
              disabled={option.disabled}
              className={cn(
                'mt-1 h-4 w-4 border-border text-primary',
                'focus:ring-2 focus:ring-ring transition-colors',
                error && 'border-error'
              )}
            />
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground cursor-pointer">
                {option.label}
              </label>
              {option.description && (
                <p className="text-xs text-muted-foreground">{option.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {error && (
        <div className="flex items-center space-x-2 text-error text-xs">
          <AlertCircle className="h-3 w-3" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

// Form Group
interface FormGroupProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const InstitutionalFormGroup: React.FC<FormGroupProps> = ({
  title,
  description,
  children,
  className
}) => {
  return (
    <div className={cn('space-y-4 p-6 border border-border rounded-md bg-card', className)}>
      {title && (
        <div className="border-b border-border pb-3">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      )}
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

// Main Form Component
interface InstitutionalFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  title?: string;
  description?: string;
  loading?: boolean;
  children: React.ReactNode;
}

const InstitutionalForm = React.forwardRef<HTMLFormElement, InstitutionalFormProps>(
  ({ className, title, description, loading, children, ...props }, ref) => {
    return (
      <form
        className={cn('space-y-6', className)}
        ref={ref}
        {...props}
      >
        {title && (
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-foreground font-display">
              {title}
            </h2>
            {description && (
              <p className="text-muted-foreground">{description}</p>
            )}
          </div>
        )}
        
        <fieldset disabled={loading} className="space-y-6">
          {children}
        </fieldset>
      </form>
    );
  }
);

InstitutionalForm.displayName = 'InstitutionalForm';

export default InstitutionalForm;