'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface FocusRingsProps {
  children: React.ReactNode;
  variant?: 'primary' | 'subtle' | 'prominent' | 'inset' | 'glow';
  color?: 'blue' | 'gray' | 'green' | 'red' | 'yellow' | 'purple';
  thickness?: 'thin' | 'medium' | 'thick';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  className?: string;
  disabled?: boolean;
  visible?: boolean;
}

const variantClasses = {
  primary: 'focus-visible:ring-2 focus-visible:ring-offset-2',
  subtle: 'focus-visible:ring-1 focus-visible:ring-offset-1',
  prominent: 'focus-visible:ring-4 focus-visible:ring-offset-2',
  inset: 'focus-visible:ring-2 focus-visible:ring-inset',
  glow: 'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:shadow-lg'
};

const colorClasses = {
  blue: {
    ring: 'focus-visible:ring-blue-500',
    glow: 'focus-visible:shadow-blue-200/50 dark:focus-visible:shadow-blue-800/50'
  },
  gray: {
    ring: 'focus-visible:ring-gray-500',
    glow: 'focus-visible:shadow-gray-200/50 dark:focus-visible:shadow-gray-800/50'
  },
  green: {
    ring: 'focus-visible:ring-green-500',
    glow: 'focus-visible:shadow-green-200/50 dark:focus-visible:shadow-green-800/50'
  },
  red: {
    ring: 'focus-visible:ring-red-500',
    glow: 'focus-visible:shadow-red-200/50 dark:focus-visible:shadow-red-800/50'
  },
  yellow: {
    ring: 'focus-visible:ring-yellow-500',
    glow: 'focus-visible:shadow-yellow-200/50 dark:focus-visible:shadow-yellow-800/50'
  },
  purple: {
    ring: 'focus-visible:ring-purple-500',
    glow: 'focus-visible:shadow-purple-200/50 dark:focus-visible:shadow-purple-800/50'
  }
};

const thicknessClasses = {
  thin: 'focus-visible:ring-1',
  medium: 'focus-visible:ring-2',
  thick: 'focus-visible:ring-4'
};

const radiusClasses = {
  none: 'focus-visible:rounded-none',
  sm: 'focus-visible:rounded-sm',
  md: 'focus-visible:rounded-md',
  lg: 'focus-visible:rounded-lg',
  full: 'focus-visible:rounded-full'
};

export function FocusRings({
  children,
  variant = 'primary',
  color = 'blue',
  thickness = 'medium',
  radius = 'md',
  className,
  disabled = false,
  visible = true
}: FocusRingsProps) {
  const focusClasses = cn(
    visible && !disabled && [
      'focus-visible:outline-none',
      'transition-shadow duration-200 ease-out',
      variantClasses[variant],
      colorClasses[color].ring,
      variant === 'glow' && colorClasses[color].glow,
      thicknessClasses[thickness],
      radiusClasses[radius],
      'focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900'
    ],
    disabled && 'focus:outline-none focus-visible:ring-0'
  );

  return (
    <div className={cn(focusClasses, className)}>
      {children}
    </div>
  );
}

// Componentes especializados
export function FocusButton({ children, className, ...props }: Omit<FocusRingsProps, 'variant'>) {
  return (
    <FocusRings variant="primary" radius="md" className={cn('cursor-pointer', className)} {...props}>
      {children}
    </FocusRings>
  );
}

export function FocusInput({ children, className, ...props }: Omit<FocusRingsProps, 'variant' | 'color'>) {
  return (
    <FocusRings 
      variant="primary" 
      color="blue" 
      radius="md" 
      className={cn('w-full', className)} 
      {...props}
    >
      {children}
    </FocusRings>
  );
}

export function FocusCard({ children, className, ...props }: Omit<FocusRingsProps, 'variant'>) {
  return (
    <FocusRings variant="subtle" radius="lg" className={cn('p-4', className)} {...props}>
      {children}
    </FocusRings>
  );
}

export function FocusLink({ children, className, ...props }: Omit<FocusRingsProps, 'variant' | 'radius'>) {
  return (
    <FocusRings variant="subtle" radius="sm" className={cn('underline-offset-4', className)} {...props}>
      {children}
    </FocusRings>
  );
}

// Hook para aplicar foco personalizado
export function useFocusRing(
  variant: FocusRingsProps['variant'] = 'primary',
  color: FocusRingsProps['color'] = 'blue',
  options?: {
    thickness?: FocusRingsProps['thickness'];
    radius?: FocusRingsProps['radius'];
    disabled?: boolean;
  }
) {
  const { thickness = 'medium', radius = 'md', disabled = false } = options || {};

  return {
    className: cn(
      !disabled && [
        'focus-visible:outline-none',
        'transition-shadow duration-200 ease-out',
        variantClasses[variant],
        colorClasses[color].ring,
        variant === 'glow' && colorClasses[color].glow,
        thicknessClasses[thickness],
        radiusClasses[radius],
        'focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900'
      ],
      disabled && 'focus:outline-none focus-visible:ring-0'
    )
  };
}

// Utilitário para elementos interativos
// Commented out due to complex TypeScript type issues
// export function withFocusRing<T extends React.ElementType = 'div'>(
//   Component: T,
//   defaultProps?: Partial<FocusRingsProps>
// ) {
//   return React.forwardRef<any, any>(({ children, ...props }, ref) => (
//     <FocusRings {...defaultProps} {...props}>
//       <Component ref={ref} {...props}>
//         {children}
//       </Component>
//     </FocusRings>
//   ));
// }