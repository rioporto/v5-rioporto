'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface CryptoButtonProps {
  children: React.ReactNode;
  variant?: 'neon' | 'glass' | 'holographic' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'purple' | 'green' | 'blue' | 'pink' | 'yellow';
  glow?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function CryptoButton({
  children,
  variant = 'neon',
  size = 'md',
  color = 'purple',
  glow = true,
  disabled = false,
  loading = false,
  onClick,
  className,
  type = 'button',
  ...props
}: CryptoButtonProps) {
  const baseClasses = [
    'relative overflow-hidden rounded-xl font-semibold transition-all duration-300',
    'border backdrop-blur-sm font-primary',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black',
    loading && 'cursor-wait'
  ];

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm min-h-[32px]',
    md: 'px-4 py-2 text-sm min-h-[40px]',
    lg: 'px-6 py-3 text-base min-h-[48px]',
    xl: 'px-8 py-4 text-lg min-h-[56px]'
  };

  const colorClasses = {
    purple: {
      neon: [
        'bg-gradient-to-r from-purple-600 to-pink-600',
        'border-purple-400/30 text-white',
        'shadow-[0_0_20px_rgba(147,51,234,0.5)]',
        glow && 'hover:shadow-[0_0_40px_rgba(147,51,234,0.8)]',
        'hover:from-purple-500 hover:to-pink-500'
      ],
      glass: [
        'bg-white/5 border-purple-400/30 text-purple-100',
        'backdrop-blur-md',
        glow && 'hover:shadow-[0_0_30px_rgba(147,51,234,0.4)]',
        'hover:bg-white/10 hover:border-purple-400/50'
      ],
      holographic: [
        'bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20',
        'border-transparent text-white relative',
        'before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-400 before:via-pink-400 before:to-purple-400',
        'before:opacity-50 before:blur-sm before:rounded-xl',
        glow && 'hover:before:opacity-80'
      ],
      outline: [
        'bg-transparent border-purple-400/50 text-purple-300',
        'hover:bg-purple-500/10 hover:border-purple-400/80',
        glow && 'hover:shadow-[0_0_20px_rgba(147,51,234,0.3)]'
      ],
      ghost: [
        'bg-transparent border-transparent text-purple-300',
        'hover:bg-purple-500/10',
        glow && 'hover:shadow-[0_0_15px_rgba(147,51,234,0.2)]'
      ]
    },
    green: {
      neon: [
        'bg-gradient-to-r from-green-500 to-emerald-500',
        'border-green-400/30 text-white',
        'shadow-[0_0_20px_rgba(34,197,94,0.5)]',
        glow && 'hover:shadow-[0_0_40px_rgba(34,197,94,0.8)]',
        'hover:from-green-400 hover:to-emerald-400'
      ],
      glass: [
        'bg-white/5 border-green-400/30 text-green-100',
        'backdrop-blur-md',
        glow && 'hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]',
        'hover:bg-white/10 hover:border-green-400/50'
      ],
      holographic: [
        'bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-green-500/20',
        'border-transparent text-white relative',
        'before:absolute before:inset-0 before:bg-gradient-to-r before:from-green-400 before:via-emerald-400 before:to-green-400',
        'before:opacity-50 before:blur-sm before:rounded-xl',
        glow && 'hover:before:opacity-80'
      ],
      outline: [
        'bg-transparent border-green-400/50 text-green-300',
        'hover:bg-green-500/10 hover:border-green-400/80',
        glow && 'hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]'
      ],
      ghost: [
        'bg-transparent border-transparent text-green-300',
        'hover:bg-green-500/10',
        glow && 'hover:shadow-[0_0_15px_rgba(34,197,94,0.2)]'
      ]
    },
    blue: {
      neon: [
        'bg-gradient-to-r from-blue-500 to-cyan-500',
        'border-blue-400/30 text-white',
        'shadow-[0_0_20px_rgba(59,130,246,0.5)]',
        glow && 'hover:shadow-[0_0_40px_rgba(59,130,246,0.8)]',
        'hover:from-blue-400 hover:to-cyan-400'
      ],
      glass: [
        'bg-white/5 border-blue-400/30 text-blue-100',
        'backdrop-blur-md',
        glow && 'hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]',
        'hover:bg-white/10 hover:border-blue-400/50'
      ],
      holographic: [
        'bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20',
        'border-transparent text-white relative',
        'before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-400 before:via-cyan-400 before:to-blue-400',
        'before:opacity-50 before:blur-sm before:rounded-xl',
        glow && 'hover:before:opacity-80'
      ],
      outline: [
        'bg-transparent border-blue-400/50 text-blue-300',
        'hover:bg-blue-500/10 hover:border-blue-400/80',
        glow && 'hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]'
      ],
      ghost: [
        'bg-transparent border-transparent text-blue-300',
        'hover:bg-blue-500/10',
        glow && 'hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]'
      ]
    },
    pink: {
      neon: [
        'bg-gradient-to-r from-pink-500 to-rose-500',
        'border-pink-400/30 text-white',
        'shadow-[0_0_20px_rgba(236,72,153,0.5)]',
        glow && 'hover:shadow-[0_0_40px_rgba(236,72,153,0.8)]',
        'hover:from-pink-400 hover:to-rose-400'
      ],
      glass: [
        'bg-white/5 border-pink-400/30 text-pink-100',
        'backdrop-blur-md',
        glow && 'hover:shadow-[0_0_30px_rgba(236,72,153,0.4)]',
        'hover:bg-white/10 hover:border-pink-400/50'
      ],
      holographic: [
        'bg-gradient-to-r from-pink-500/20 via-rose-500/20 to-pink-500/20',
        'border-transparent text-white relative',
        'before:absolute before:inset-0 before:bg-gradient-to-r before:from-pink-400 before:via-rose-400 before:to-pink-400',
        'before:opacity-50 before:blur-sm before:rounded-xl',
        glow && 'hover:before:opacity-80'
      ],
      outline: [
        'bg-transparent border-pink-400/50 text-pink-300',
        'hover:bg-pink-500/10 hover:border-pink-400/80',
        glow && 'hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]'
      ],
      ghost: [
        'bg-transparent border-transparent text-pink-300',
        'hover:bg-pink-500/10',
        glow && 'hover:shadow-[0_0_15px_rgba(236,72,153,0.2)]'
      ]
    },
    yellow: {
      neon: [
        'bg-gradient-to-r from-yellow-500 to-orange-500',
        'border-yellow-400/30 text-black',
        'shadow-[0_0_20px_rgba(234,179,8,0.5)]',
        glow && 'hover:shadow-[0_0_40px_rgba(234,179,8,0.8)]',
        'hover:from-yellow-400 hover:to-orange-400'
      ],
      glass: [
        'bg-white/5 border-yellow-400/30 text-yellow-100',
        'backdrop-blur-md',
        glow && 'hover:shadow-[0_0_30px_rgba(234,179,8,0.4)]',
        'hover:bg-white/10 hover:border-yellow-400/50'
      ],
      holographic: [
        'bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-yellow-500/20',
        'border-transparent text-white relative',
        'before:absolute before:inset-0 before:bg-gradient-to-r before:from-yellow-400 before:via-orange-400 before:to-yellow-400',
        'before:opacity-50 before:blur-sm before:rounded-xl',
        glow && 'hover:before:opacity-80'
      ],
      outline: [
        'bg-transparent border-yellow-400/50 text-yellow-300',
        'hover:bg-yellow-500/10 hover:border-yellow-400/80',
        glow && 'hover:shadow-[0_0_20px_rgba(234,179,8,0.3)]'
      ],
      ghost: [
        'bg-transparent border-transparent text-yellow-300',
        'hover:bg-yellow-500/10',
        glow && 'hover:shadow-[0_0_15px_rgba(234,179,8,0.2)]'
      ]
    }
  };

  const classes = cn(
    baseClasses,
    sizeClasses[size],
    colorClasses[color][variant],
    className
  );

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
      {...props}
    >
      <div className="relative z-10 flex items-center justify-center gap-2">
        {loading && (
          <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
        )}
        {children}
      </div>
      
      {/* Shimmer effect for holographic variant */}
      {variant === 'holographic' && (
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse" />
        </div>
      )}
      
      {/* Ripple effect container */}
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-active:translate-x-full transition-transform duration-300" />
      </div>
    </button>
  );
}