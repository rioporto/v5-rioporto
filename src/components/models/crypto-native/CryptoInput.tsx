'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface CryptoInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'glass' | 'neon' | 'holographic' | 'minimal';
  glow?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  error?: boolean;
  success?: boolean;
  label?: string;
  hint?: string;
  animated?: boolean;
}

export const CryptoInput = forwardRef<HTMLInputElement, CryptoInputProps>(({
  variant = 'glass',
  glow = true,
  icon,
  iconPosition = 'left',
  error = false,
  success = false,
  label,
  hint,
  animated = true,
  className,
  ...props
}, ref) => {
  const baseClasses = [
    'w-full px-4 py-3 bg-transparent border rounded-xl',
    'text-white placeholder-gray-400',
    'font-primary transition-all duration-300',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black',
    animated && 'transform-gpu',
    props.disabled && 'opacity-50 cursor-not-allowed'
  ];

  const variantClasses = {
    glass: [
      'bg-white/5 border-white/20 backdrop-blur-sm',
      'focus:bg-white/8 focus:border-white/30',
      glow && 'focus:shadow-[0_0_20px_rgba(153,69,255,0.3)]',
      error && 'border-red-400/50 focus:border-red-400/70',
      success && 'border-green-400/50 focus:border-green-400/70'
    ],
    neon: [
      'bg-black/30 border-purple-400/30',
      'focus:border-purple-400/70 focus:bg-black/50',
      glow && 'focus:shadow-[0_0_30px_rgba(153,69,255,0.5)]',
      error && 'border-red-400/50 focus:border-red-400/70 focus:shadow-[0_0_30px_rgba(239,68,68,0.5)]',
      success && 'border-green-400/50 focus:border-green-400/70 focus:shadow-[0_0_30px_rgba(34,197,94,0.5)]'
    ],
    holographic: [
      'bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-blue-500/5',
      'border-transparent relative',
      'focus:from-purple-500/10 focus:via-pink-500/10 focus:to-blue-500/10',
      'before:absolute before:inset-0 before:rounded-xl before:p-[1px]',
      'before:bg-gradient-to-r before:from-purple-400 before:via-pink-400 before:to-blue-400',
      'before:opacity-30 focus:before:opacity-60',
      glow && 'focus:shadow-[0_0_40px_rgba(153,69,255,0.3)]'
    ],
    minimal: [
      'bg-transparent border-gray-600',
      'focus:border-gray-400',
      glow && 'focus:shadow-[0_0_15px_rgba(255,255,255,0.1)]',
      error && 'border-red-400 focus:border-red-300',
      success && 'border-green-400 focus:border-green-300'
    ]
  };

  const hasIcon = !!icon;
  const paddingClasses = hasIcon 
    ? iconPosition === 'left' 
      ? 'pl-12 pr-4' 
      : 'pl-4 pr-12'
    : 'px-4';

  const inputClasses = cn(
    baseClasses,
    variantClasses[variant],
    paddingClasses,
    className
  );

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2 font-primary">
          {label}
        </label>
      )}
      
      <div className="relative">
        {/* Input field */}
        <input
          ref={ref}
          className={inputClasses}
          {...props}
        />
        
        {/* Icon */}
        {hasIcon && (
          <div className={cn(
            'absolute top-1/2 transform -translate-y-1/2 text-gray-400',
            'pointer-events-none',
            iconPosition === 'left' ? 'left-4' : 'right-4'
          )}>
            {icon}
          </div>
        )}
        
        {/* Holographic border for holographic variant */}
        {variant === 'holographic' && (
          <div className="absolute inset-[1px] rounded-xl bg-black/50 backdrop-blur-sm pointer-events-none" />
        )}
        
        {/* Focus glow effect */}
        {glow && animated && (
          <div className="absolute inset-0 rounded-xl opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 rounded-xl animate-pulse" />
          </div>
        )}
      </div>
      
      {/* Hint text */}
      {hint && (
        <p className={cn(
          'mt-2 text-xs font-primary',
          error ? 'text-red-400' : success ? 'text-green-400' : 'text-gray-500'
        )}>
          {hint}
        </p>
      )}
    </div>
  );
});

CryptoInput.displayName = 'CryptoInput';

interface CryptoTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'glass' | 'neon' | 'holographic' | 'minimal';
  glow?: boolean;
  error?: boolean;
  success?: boolean;
  label?: string;
  hint?: string;
  animated?: boolean;
  resizable?: boolean;
}

export const CryptoTextarea = forwardRef<HTMLTextAreaElement, CryptoTextareaProps>(({
  variant = 'glass',
  glow = true,
  error = false,
  success = false,
  label,
  hint,
  animated = true,
  resizable = true,
  className,
  ...props
}, ref) => {
  const baseClasses = [
    'w-full px-4 py-3 bg-transparent border rounded-xl',
    'text-white placeholder-gray-400',
    'font-primary transition-all duration-300',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black',
    'min-h-[100px]',
    !resizable && 'resize-none',
    animated && 'transform-gpu',
    props.disabled && 'opacity-50 cursor-not-allowed'
  ];

  const variantClasses = {
    glass: [
      'bg-white/5 border-white/20 backdrop-blur-sm',
      'focus:bg-white/8 focus:border-white/30',
      glow && 'focus:shadow-[0_0_20px_rgba(153,69,255,0.3)]',
      error && 'border-red-400/50 focus:border-red-400/70',
      success && 'border-green-400/50 focus:border-green-400/70'
    ],
    neon: [
      'bg-black/30 border-purple-400/30',
      'focus:border-purple-400/70 focus:bg-black/50',
      glow && 'focus:shadow-[0_0_30px_rgba(153,69,255,0.5)]',
      error && 'border-red-400/50 focus:border-red-400/70 focus:shadow-[0_0_30px_rgba(239,68,68,0.5)]',
      success && 'border-green-400/50 focus:border-green-400/70 focus:shadow-[0_0_30px_rgba(34,197,94,0.5)]'
    ],
    holographic: [
      'bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-blue-500/5',
      'border-transparent relative',
      'focus:from-purple-500/10 focus:via-pink-500/10 focus:to-blue-500/10',
      'before:absolute before:inset-0 before:rounded-xl before:p-[1px]',
      'before:bg-gradient-to-r before:from-purple-400 before:via-pink-400 before:to-blue-400',
      'before:opacity-30 focus:before:opacity-60',
      glow && 'focus:shadow-[0_0_40px_rgba(153,69,255,0.3)]'
    ],
    minimal: [
      'bg-transparent border-gray-600',
      'focus:border-gray-400',
      glow && 'focus:shadow-[0_0_15px_rgba(255,255,255,0.1)]',
      error && 'border-red-400 focus:border-red-300',
      success && 'border-green-400 focus:border-green-300'
    ]
  };

  const textareaClasses = cn(
    baseClasses,
    variantClasses[variant],
    className
  );

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2 font-primary">
          {label}
        </label>
      )}
      
      <div className="relative">
        <textarea
          ref={ref}
          className={textareaClasses}
          {...props}
        />
        
        {/* Holographic border for holographic variant */}
        {variant === 'holographic' && (
          <div className="absolute inset-[1px] rounded-xl bg-black/50 backdrop-blur-sm pointer-events-none" />
        )}
        
        {/* Focus glow effect */}
        {glow && animated && (
          <div className="absolute inset-0 rounded-xl opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 rounded-xl animate-pulse" />
          </div>
        )}
      </div>
      
      {/* Hint text */}
      {hint && (
        <p className={cn(
          'mt-2 text-xs font-primary',
          error ? 'text-red-400' : success ? 'text-green-400' : 'text-gray-500'
        )}>
          {hint}
        </p>
      )}
    </div>
  );
});

CryptoTextarea.displayName = 'CryptoTextarea';