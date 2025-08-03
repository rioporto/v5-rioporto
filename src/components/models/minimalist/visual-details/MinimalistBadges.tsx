'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost' | 'dot' | 'pill' | 'minimal';
  color?: 'gray' | 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'orange' | 'pink';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
  interactive?: boolean;
  removable?: boolean;
  onRemove?: () => void;
}

const sizeClasses = {
  xs: 'text-xs px-1.5 py-0.5 gap-1',
  sm: 'text-xs px-2 py-1 gap-1.5',
  md: 'text-sm px-2.5 py-1.5 gap-2',
  lg: 'text-sm px-3 py-2 gap-2'
};

const colorVariants = {
  default: {
    gray: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700',
    blue: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
    green: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800',
    red: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800',
    yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800',
    purple: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800',
    orange: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800',
    pink: 'bg-pink-100 text-pink-800 border-pink-200 dark:bg-pink-900/30 dark:text-pink-300 dark:border-pink-800'
  },
  outline: {
    gray: 'border border-gray-300 text-gray-700 bg-transparent dark:border-gray-600 dark:text-gray-300',
    blue: 'border border-blue-300 text-blue-700 bg-transparent dark:border-blue-600 dark:text-blue-300',
    green: 'border border-green-300 text-green-700 bg-transparent dark:border-green-600 dark:text-green-300',
    red: 'border border-red-300 text-red-700 bg-transparent dark:border-red-600 dark:text-red-300',
    yellow: 'border border-yellow-300 text-yellow-700 bg-transparent dark:border-yellow-600 dark:text-yellow-300',
    purple: 'border border-purple-300 text-purple-700 bg-transparent dark:border-purple-600 dark:text-purple-300',
    orange: 'border border-orange-300 text-orange-700 bg-transparent dark:border-orange-600 dark:text-orange-300',
    pink: 'border border-pink-300 text-pink-700 bg-transparent dark:border-pink-600 dark:text-pink-300'
  },
  ghost: {
    gray: 'text-gray-700 bg-transparent hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
    blue: 'text-blue-700 bg-transparent hover:bg-blue-50 dark:text-blue-300 dark:hover:bg-blue-900/20',
    green: 'text-green-700 bg-transparent hover:bg-green-50 dark:text-green-300 dark:hover:bg-green-900/20',
    red: 'text-red-700 bg-transparent hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-900/20',
    yellow: 'text-yellow-700 bg-transparent hover:bg-yellow-50 dark:text-yellow-300 dark:hover:bg-yellow-900/20',
    purple: 'text-purple-700 bg-transparent hover:bg-purple-50 dark:text-purple-300 dark:hover:bg-purple-900/20',
    orange: 'text-orange-700 bg-transparent hover:bg-orange-50 dark:text-orange-300 dark:hover:bg-orange-900/20',
    pink: 'text-pink-700 bg-transparent hover:bg-pink-50 dark:text-pink-300 dark:hover:bg-pink-900/20'
  },
  dot: {
    gray: 'text-gray-800 dark:text-gray-200',
    blue: 'text-blue-800 dark:text-blue-200',
    green: 'text-green-800 dark:text-green-200',
    red: 'text-red-800 dark:text-red-200',
    yellow: 'text-yellow-800 dark:text-yellow-200',
    purple: 'text-purple-800 dark:text-purple-200',
    orange: 'text-orange-800 dark:text-orange-200',
    pink: 'text-pink-800 dark:text-pink-200'
  },
  minimal: {
    gray: 'text-gray-600 dark:text-gray-400',
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-green-600 dark:text-green-400',
    red: 'text-red-600 dark:text-red-400',
    yellow: 'text-yellow-600 dark:text-yellow-400',
    purple: 'text-purple-600 dark:text-purple-400',
    orange: 'text-orange-600 dark:text-orange-400',
    pink: 'text-pink-600 dark:text-pink-400'
  }
};

const dotColors = {
  gray: 'bg-gray-400',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  red: 'bg-red-500',
  yellow: 'bg-yellow-500',
  purple: 'bg-purple-500',
  orange: 'bg-orange-500',
  pink: 'bg-pink-500'
};

export function MinimalistBadge({
  children,
  variant = 'default',
  color = 'gray',
  size = 'sm',
  className,
  interactive = false,
  removable = false,
  onRemove
}: BadgeProps) {
  const baseClasses = cn(
    'inline-flex items-center font-medium rounded-full transition-colors',
    sizeClasses[size],
    variant !== 'minimal' && variant !== 'ghost' && 'border',
    interactive && 'cursor-pointer hover:opacity-80',
    variant === 'pill' && 'rounded-full'
  );

  const variantClasses = variant === 'pill' 
    ? colorVariants.default[color]
    : colorVariants[variant][color];

  const dotSize = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3'
  };

  return (
    <span className={cn(baseClasses, variantClasses, className)}>
      {variant === 'dot' && (
        <span className={cn('rounded-full', dotSize[size], dotColors[color])} />
      )}
      
      <span className="truncate">{children}</span>
      
      {removable && onRemove && (
        <button
          onClick={onRemove}
          className="ml-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-full p-0.5 transition-colors"
          aria-label="Remover"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </span>
  );
}

// Badge de status
export function StatusBadge({
  status,
  size = 'sm',
  variant = 'default',
  className
}: {
  status: 'success' | 'warning' | 'error' | 'info' | 'pending' | 'active' | 'inactive';
  size?: BadgeProps['size'];
  variant?: BadgeProps['variant'];
  className?: string;
}) {
  const statusConfig = {
    success: { color: 'green' as const, text: 'Sucesso' },
    warning: { color: 'yellow' as const, text: 'Aviso' },
    error: { color: 'red' as const, text: 'Erro' },
    info: { color: 'blue' as const, text: 'Info' },
    pending: { color: 'orange' as const, text: 'Pendente' },
    active: { color: 'green' as const, text: 'Ativo' },
    inactive: { color: 'gray' as const, text: 'Inativo' }
  };

  const config = statusConfig[status];

  return (
    <MinimalistBadge
      variant={variant}
      color={config.color}
      size={size}
      className={className}
    >
      {config.text}
    </MinimalistBadge>
  );
}

// Badge numérico
export function NumberBadge({
  count,
  max = 99,
  variant = 'default',
  color = 'red',
  size = 'sm',
  showZero = false,
  className
}: {
  count: number;
  max?: number;
  variant?: BadgeProps['variant'];
  color?: BadgeProps['color'];
  size?: BadgeProps['size'];
  showZero?: boolean;
  className?: string;
}) {
  if (count === 0 && !showZero) return null;

  const displayCount = count > max ? `${max}+` : count.toString();

  return (
    <MinimalistBadge
      variant={variant}
      color={color}
      size={size}
      className={cn('min-w-[1.5rem] justify-center', className)}
    >
      {displayCount}
    </MinimalistBadge>
  );
}

// Badge com ícone
export function IconBadge({
  icon,
  children,
  variant = 'default',
  color = 'gray',
  size = 'sm',
  iconPosition = 'left',
  className
}: {
  icon: React.ReactNode;
  children?: React.ReactNode;
  variant?: BadgeProps['variant'];
  color?: BadgeProps['color'];
  size?: BadgeProps['size'];
  iconPosition?: 'left' | 'right';
  className?: string;
}) {
  return (
    <MinimalistBadge
      variant={variant}
      color={color}
      size={size}
      className={className}
    >
      {iconPosition === 'left' && icon}
      {children && <span>{children}</span>}
      {iconPosition === 'right' && icon}
    </MinimalistBadge>
  );
}

// Badge de categoria/tag
export function CategoryBadge({
  category,
  variant = 'outline',
  size = 'sm',
  colorMap,
  className
}: {
  category: string;
  variant?: BadgeProps['variant'];
  size?: BadgeProps['size'];
  colorMap?: Record<string, BadgeProps['color']>;
  className?: string;
}) {
  // Hash simples para gerar cor consistente
  const getColorFromString = (str: string): BadgeProps['color'] => {
    if (colorMap && colorMap[str]) return colorMap[str];
    
    const colors: BadgeProps['color'][] = ['blue', 'green', 'purple', 'orange', 'pink'];
    const hash = str.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  return (
    <MinimalistBadge
      variant={variant}
      color={getColorFromString(category)}
      size={size}
      className={className}
    >
      {category}
    </MinimalistBadge>
  );
}

// Grupo de badges
export function BadgeGroup({
  badges,
  maxVisible = 3,
  variant = 'default',
  size = 'sm',
  className,
  onShowAll
}: {
  badges: string[];
  maxVisible?: number;
  variant?: BadgeProps['variant'];
  size?: BadgeProps['size'];
  className?: string;
  onShowAll?: () => void;
}) {
  const visibleBadges = badges.slice(0, maxVisible);
  const remainingCount = badges.length - maxVisible;

  return (
    <div className={cn('flex items-center gap-1.5 flex-wrap', className)}>
      {visibleBadges.map((badge, index) => (
        <CategoryBadge
          key={badge}
          category={badge}
          variant={variant}
          size={size}
        />
      ))}
      
      {remainingCount > 0 && (
        <div onClick={onShowAll} className={onShowAll ? 'inline-block' : undefined}>
          <MinimalistBadge
            variant="ghost"
            color="gray"
            size={size}
            interactive={!!onShowAll}
            className={onShowAll ? 'cursor-pointer' : undefined}
          >
            +{remainingCount}
          </MinimalistBadge>
        </div>
      )}
    </div>
  );
}