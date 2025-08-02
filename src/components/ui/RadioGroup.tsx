import { forwardRef, createContext, useContext } from 'react';
import { cn } from '@/lib/utils';

interface RadioGroupContextType {
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
}

const RadioGroupContext = createContext<RadioGroupContextType>({});

interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  onValueChange?: (value: string) => void;
  name?: string;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, value, onValueChange, name, children, ...props }, ref) => (
    <RadioGroupContext.Provider value={{ value, onChange: onValueChange, name }}>
      <div
        ref={ref}
        role="radiogroup"
        className={cn('grid gap-2', className)}
        {...props}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  )
);

RadioGroup.displayName = 'RadioGroup';

interface RadioGroupItemProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
}

export const RadioGroupItem = forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className, value, ...props }, ref) => {
    const context = useContext(RadioGroupContext);
    
    return (
      <input
        ref={ref}
        type="radio"
        value={value}
        checked={context.value === value}
        onChange={() => context.onChange?.(value)}
        name={context.name}
        className={cn(
          'aspect-square h-4 w-4 rounded-full border border-border text-primary',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    );
  }
);

RadioGroupItem.displayName = 'RadioGroupItem';