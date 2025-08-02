'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'dotted' | 'gradient' | 'fade';
  thickness?: 'thin' | 'medium' | 'thick';
  color?: 'gray' | 'blue' | 'green' | 'red' | 'purple' | 'current';
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  decorative?: boolean;
}

const thicknessClasses = {
  horizontal: {
    thin: 'h-px',
    medium: 'h-0.5',
    thick: 'h-1'
  },
  vertical: {
    thin: 'w-px',
    medium: 'w-0.5',
    thick: 'w-1'
  }
};

const colorClasses = {
  gray: 'bg-gray-200 dark:bg-gray-700',
  blue: 'bg-blue-200 dark:bg-blue-800',
  green: 'bg-green-200 dark:bg-green-800',
  red: 'bg-red-200 dark:bg-red-800',
  purple: 'bg-purple-200 dark:bg-purple-800',
  current: 'bg-current'
};

const spacingClasses = {
  horizontal: {
    none: '',
    sm: 'my-2',
    md: 'my-4',
    lg: 'my-6',
    xl: 'my-8'
  },
  vertical: {
    none: '',
    sm: 'mx-2',
    md: 'mx-4',
    lg: 'mx-6',
    xl: 'mx-8'
  }
};

export function Separator({
  orientation = 'horizontal',
  variant = 'solid',
  thickness = 'thin',
  color = 'gray',
  spacing = 'md',
  className,
  decorative = true
}: SeparatorProps) {
  const baseClasses = orientation === 'horizontal' ? 'w-full' : 'h-full';
  
  const getVariantClasses = () => {
    switch (variant) {
      case 'dashed':
        return orientation === 'horizontal' 
          ? 'border-t border-dashed' 
          : 'border-l border-dashed';
      case 'dotted':
        return orientation === 'horizontal' 
          ? 'border-t border-dotted' 
          : 'border-l border-dotted';
      case 'gradient':
        return orientation === 'horizontal'
          ? 'bg-gradient-to-r from-transparent via-current to-transparent'
          : 'bg-gradient-to-b from-transparent via-current to-transparent';
      case 'fade':
        return cn(
          orientation === 'horizontal'
            ? 'bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-600'
            : 'bg-gradient-to-b from-transparent via-gray-300 to-transparent dark:via-gray-600'
        );
      default:
        return colorClasses[color];
    }
  };

  return (
    <div
      className={cn(
        baseClasses,
        thicknessClasses[orientation][thickness],
        spacingClasses[orientation][spacing],
        getVariantClasses(),
        className
      )}
      role={decorative ? 'presentation' : 'separator'}
      aria-orientation={orientation}
    />
  );
}

// Separador com texto
export function SeparatorWithText({
  text,
  position = 'center',
  textColor = 'gray',
  separatorProps,
  className
}: {
  text: string;
  position?: 'left' | 'center' | 'right';
  textColor?: 'gray' | 'blue' | 'green' | 'current';
  separatorProps?: Omit<SeparatorProps, 'spacing'>;
  className?: string;
}) {
  const textColorClasses = {
    gray: 'text-gray-500 dark:text-gray-400',
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-green-600 dark:text-green-400',
    current: 'text-current'
  };

  const positionClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end'
  };

  return (
    <div className={cn('relative flex items-center', className)}>
      <div className="flex-grow">
        <Separator {...separatorProps} spacing="none" />
      </div>
      
      <div className={cn('flex', positionClasses[position])}>
        <span className={cn(
          'px-3 text-sm font-medium bg-white dark:bg-gray-900',
          textColorClasses[textColor]
        )}>
          {text}
        </span>
      </div>
      
      <div className="flex-grow">
        <Separator {...separatorProps} spacing="none" />
      </div>
    </div>
  );
}

// Separador com ícone
export function SeparatorWithIcon({
  icon,
  iconColor = 'gray',
  separatorProps,
  className
}: {
  icon: React.ReactNode;
  iconColor?: 'gray' | 'blue' | 'green' | 'current';
  separatorProps?: Omit<SeparatorProps, 'spacing'>;
  className?: string;
}) {
  const iconColorClasses = {
    gray: 'text-gray-500 dark:text-gray-400',
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-green-600 dark:text-green-400',
    current: 'text-current'
  };

  return (
    <div className={cn('relative flex items-center', className)}>
      <div className="flex-grow">
        <Separator {...separatorProps} spacing="none" />
      </div>
      
      <div className="flex justify-center">
        <div className={cn(
          'p-2 bg-white dark:bg-gray-900 rounded-full',
          iconColorClasses[iconColor]
        )}>
          {icon}
        </div>
      </div>
      
      <div className="flex-grow">
        <Separator {...separatorProps} spacing="none" />
      </div>
    </div>
  );
}

// Separador de seção
export function SectionSeparator({
  title,
  subtitle,
  showLine = true,
  alignment = 'left',
  className
}: {
  title?: string;
  subtitle?: string;
  showLine?: boolean;
  alignment?: 'left' | 'center' | 'right';
  className?: string;
}) {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  return (
    <div className={cn('space-y-4', className)}>
      {(title || subtitle) && (
        <div className={alignmentClasses[alignment]}>
          {title && (
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {subtitle}
            </p>
          )}
        </div>
      )}
      
      {showLine && (
        <Separator 
          variant="fade" 
          spacing="none"
        />
      )}
    </div>
  );
}

// Separador breadcrumb
export function BreadcrumbSeparator({
  variant = 'chevron',
  color = 'gray',
  size = 'sm'
}: {
  variant?: 'chevron' | 'slash' | 'dot' | 'arrow';
  color?: 'gray' | 'blue' | 'current';
  size?: 'xs' | 'sm' | 'md';
}) {
  const colorClasses = {
    gray: 'text-gray-400 dark:text-gray-600',
    blue: 'text-blue-500 dark:text-blue-400',
    current: 'text-current opacity-50'
  };

  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5'
  };

  const icons = {
    chevron: (
      <svg className={sizeClasses[size]} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 18 6-6-6-6" />
      </svg>
    ),
    slash: (
      <span className="text-lg font-light">/</span>
    ),
    dot: (
      <span className="text-lg">•</span>
    ),
    arrow: (
      <svg className={sizeClasses[size]} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    )
  };

  return (
    <span className={cn('flex items-center', colorClasses[color])}>
      {icons[variant]}
    </span>
  );
}

// Separador de lista
export function ListSeparator({
  variant = 'line',
  spacing = 'sm',
  className
}: {
  variant?: 'line' | 'space' | 'dot';
  spacing?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const spacingClasses = {
    xs: 'my-1',
    sm: 'my-2',
    md: 'my-3',
    lg: 'my-4'
  };

  if (variant === 'space') {
    return <div className={cn(spacingClasses[spacing], className)} />;
  }

  if (variant === 'dot') {
    return (
      <div className={cn('flex justify-center', spacingClasses[spacing], className)}>
        <span className="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
      </div>
    );
  }

  return (
    <Separator 
      thickness="thin"
      color="gray"
      spacing={spacing}
      className={className}
    />
  );
}