'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface CryptoBadgeProps {
  children: React.ReactNode;
  variant?: 'holographic' | 'neon' | 'glass' | 'gradient' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: 'purple' | 'green' | 'blue' | 'pink' | 'yellow' | 'red' | 'gray';
  glow?: boolean;
  animated?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export function CryptoBadge({
  children,
  variant = 'holographic',
  size = 'md',
  color = 'purple',
  glow = true,
  animated = true,
  icon,
  className,
  ...props
}: CryptoBadgeProps) {
  const baseClasses = [
    'inline-flex items-center gap-1.5 font-medium rounded-full border',
    'font-primary whitespace-nowrap',
    animated && 'transition-all duration-300 transform-gpu',
    animated && 'hover:scale-105'
  ];

  const sizeClasses = {
    xs: 'px-2 py-0.5 text-xs',
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const colorVariants = {
    purple: {
      holographic: [
        'bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20',
        'border-purple-400/50 text-purple-100',
        'relative before:absolute before:inset-0 before:rounded-full before:p-[1px]',
        'before:bg-gradient-to-r before:from-purple-400 before:via-pink-400 before:to-purple-400',
        'before:opacity-60',
        glow && 'shadow-[0_0_20px_rgba(153,69,255,0.4)]',
        animated && glow && 'hover:shadow-[0_0_30px_rgba(153,69,255,0.6)]'
      ],
      neon: [
        'bg-purple-500/20 border-purple-400/60 text-purple-100',
        glow && 'shadow-[0_0_15px_rgba(153,69,255,0.5)]',
        animated && 'hover:bg-purple-500/30 hover:border-purple-400/80',
        animated && glow && 'hover:shadow-[0_0_25px_rgba(153,69,255,0.7)]'
      ],
      glass: [
        'bg-white/10 border-purple-400/30 text-purple-100 backdrop-blur-sm',
        glow && 'shadow-[0_4px_15px_rgba(153,69,255,0.2)]',
        animated && 'hover:bg-white/15 hover:border-purple-400/50'
      ],
      gradient: [
        'bg-gradient-to-r from-purple-500 to-pink-500 border-transparent text-white',
        glow && 'shadow-[0_4px_15px_rgba(153,69,255,0.4)]',
        animated && 'hover:from-purple-600 hover:to-pink-600'
      ],
      outline: [
        'bg-transparent border-purple-400/60 text-purple-300',
        animated && 'hover:bg-purple-500/10 hover:border-purple-400/80'
      ]
    },
    green: {
      holographic: [
        'bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-green-500/20',
        'border-green-400/50 text-green-100',
        'relative before:absolute before:inset-0 before:rounded-full before:p-[1px]',
        'before:bg-gradient-to-r before:from-green-400 before:via-emerald-400 before:to-green-400',
        'before:opacity-60',
        glow && 'shadow-[0_0_20px_rgba(34,197,94,0.4)]',
        animated && glow && 'hover:shadow-[0_0_30px_rgba(34,197,94,0.6)]'
      ],
      neon: [
        'bg-green-500/20 border-green-400/60 text-green-100',
        glow && 'shadow-[0_0_15px_rgba(34,197,94,0.5)]',
        animated && 'hover:bg-green-500/30 hover:border-green-400/80',
        animated && glow && 'hover:shadow-[0_0_25px_rgba(34,197,94,0.7)]'
      ],
      glass: [
        'bg-white/10 border-green-400/30 text-green-100 backdrop-blur-sm',
        glow && 'shadow-[0_4px_15px_rgba(34,197,94,0.2)]',
        animated && 'hover:bg-white/15 hover:border-green-400/50'
      ],
      gradient: [
        'bg-gradient-to-r from-green-500 to-emerald-500 border-transparent text-white',
        glow && 'shadow-[0_4px_15px_rgba(34,197,94,0.4)]',
        animated && 'hover:from-green-600 hover:to-emerald-600'
      ],
      outline: [
        'bg-transparent border-green-400/60 text-green-300',
        animated && 'hover:bg-green-500/10 hover:border-green-400/80'
      ]
    },
    blue: {
      holographic: [
        'bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20',
        'border-blue-400/50 text-blue-100',
        'relative before:absolute before:inset-0 before:rounded-full before:p-[1px]',
        'before:bg-gradient-to-r before:from-blue-400 before:via-cyan-400 before:to-blue-400',
        'before:opacity-60',
        glow && 'shadow-[0_0_20px_rgba(59,130,246,0.4)]',
        animated && glow && 'hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]'
      ],
      neon: [
        'bg-blue-500/20 border-blue-400/60 text-blue-100',
        glow && 'shadow-[0_0_15px_rgba(59,130,246,0.5)]',
        animated && 'hover:bg-blue-500/30 hover:border-blue-400/80',
        animated && glow && 'hover:shadow-[0_0_25px_rgba(59,130,246,0.7)]'
      ],
      glass: [
        'bg-white/10 border-blue-400/30 text-blue-100 backdrop-blur-sm',
        glow && 'shadow-[0_4px_15px_rgba(59,130,246,0.2)]',
        animated && 'hover:bg-white/15 hover:border-blue-400/50'
      ],
      gradient: [
        'bg-gradient-to-r from-blue-500 to-cyan-500 border-transparent text-white',
        glow && 'shadow-[0_4px_15px_rgba(59,130,246,0.4)]',
        animated && 'hover:from-blue-600 hover:to-cyan-600'
      ],
      outline: [
        'bg-transparent border-blue-400/60 text-blue-300',
        animated && 'hover:bg-blue-500/10 hover:border-blue-400/80'
      ]
    },
    pink: {
      holographic: [
        'bg-gradient-to-r from-pink-500/20 via-rose-500/20 to-pink-500/20',
        'border-pink-400/50 text-pink-100',
        'relative before:absolute before:inset-0 before:rounded-full before:p-[1px]',
        'before:bg-gradient-to-r before:from-pink-400 before:via-rose-400 before:to-pink-400',
        'before:opacity-60',
        glow && 'shadow-[0_0_20px_rgba(236,72,153,0.4)]',
        animated && glow && 'hover:shadow-[0_0_30px_rgba(236,72,153,0.6)]'
      ],
      neon: [
        'bg-pink-500/20 border-pink-400/60 text-pink-100',
        glow && 'shadow-[0_0_15px_rgba(236,72,153,0.5)]',
        animated && 'hover:bg-pink-500/30 hover:border-pink-400/80',
        animated && glow && 'hover:shadow-[0_0_25px_rgba(236,72,153,0.7)]'
      ],
      glass: [
        'bg-white/10 border-pink-400/30 text-pink-100 backdrop-blur-sm',
        glow && 'shadow-[0_4px_15px_rgba(236,72,153,0.2)]',
        animated && 'hover:bg-white/15 hover:border-pink-400/50'
      ],
      gradient: [
        'bg-gradient-to-r from-pink-500 to-rose-500 border-transparent text-white',
        glow && 'shadow-[0_4px_15px_rgba(236,72,153,0.4)]',
        animated && 'hover:from-pink-600 hover:to-rose-600'
      ],
      outline: [
        'bg-transparent border-pink-400/60 text-pink-300',
        animated && 'hover:bg-pink-500/10 hover:border-pink-400/80'
      ]
    },
    yellow: {
      holographic: [
        'bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-yellow-500/20',
        'border-yellow-400/50 text-yellow-100',
        'relative before:absolute before:inset-0 before:rounded-full before:p-[1px]',
        'before:bg-gradient-to-r before:from-yellow-400 before:via-orange-400 before:to-yellow-400',
        'before:opacity-60',
        glow && 'shadow-[0_0_20px_rgba(234,179,8,0.4)]',
        animated && glow && 'hover:shadow-[0_0_30px_rgba(234,179,8,0.6)]'
      ],
      neon: [
        'bg-yellow-500/20 border-yellow-400/60 text-yellow-100',
        glow && 'shadow-[0_0_15px_rgba(234,179,8,0.5)]',
        animated && 'hover:bg-yellow-500/30 hover:border-yellow-400/80',
        animated && glow && 'hover:shadow-[0_0_25px_rgba(234,179,8,0.7)]'
      ],
      glass: [
        'bg-white/10 border-yellow-400/30 text-yellow-100 backdrop-blur-sm',
        glow && 'shadow-[0_4px_15px_rgba(234,179,8,0.2)]',
        animated && 'hover:bg-white/15 hover:border-yellow-400/50'
      ],
      gradient: [
        'bg-gradient-to-r from-yellow-500 to-orange-500 border-transparent text-black',
        glow && 'shadow-[0_4px_15px_rgba(234,179,8,0.4)]',
        animated && 'hover:from-yellow-600 hover:to-orange-600'
      ],
      outline: [
        'bg-transparent border-yellow-400/60 text-yellow-300',
        animated && 'hover:bg-yellow-500/10 hover:border-yellow-400/80'
      ]
    },
    red: {
      holographic: [
        'bg-gradient-to-r from-red-500/20 via-pink-500/20 to-red-500/20',
        'border-red-400/50 text-red-100',
        'relative before:absolute before:inset-0 before:rounded-full before:p-[1px]',
        'before:bg-gradient-to-r before:from-red-400 before:via-pink-400 before:to-red-400',
        'before:opacity-60',
        glow && 'shadow-[0_0_20px_rgba(239,68,68,0.4)]',
        animated && glow && 'hover:shadow-[0_0_30px_rgba(239,68,68,0.6)]'
      ],
      neon: [
        'bg-red-500/20 border-red-400/60 text-red-100',
        glow && 'shadow-[0_0_15px_rgba(239,68,68,0.5)]',
        animated && 'hover:bg-red-500/30 hover:border-red-400/80',
        animated && glow && 'hover:shadow-[0_0_25px_rgba(239,68,68,0.7)]'
      ],
      glass: [
        'bg-white/10 border-red-400/30 text-red-100 backdrop-blur-sm',
        glow && 'shadow-[0_4px_15px_rgba(239,68,68,0.2)]',
        animated && 'hover:bg-white/15 hover:border-red-400/50'
      ],
      gradient: [
        'bg-gradient-to-r from-red-500 to-pink-500 border-transparent text-white',
        glow && 'shadow-[0_4px_15px_rgba(239,68,68,0.4)]',
        animated && 'hover:from-red-600 hover:to-pink-600'
      ],
      outline: [
        'bg-transparent border-red-400/60 text-red-300',
        animated && 'hover:bg-red-500/10 hover:border-red-400/80'
      ]
    },
    gray: {
      holographic: [
        'bg-gradient-to-r from-gray-500/20 via-slate-500/20 to-gray-500/20',
        'border-gray-400/50 text-gray-100',
        'relative before:absolute before:inset-0 before:rounded-full before:p-[1px]',
        'before:bg-gradient-to-r before:from-gray-400 before:via-slate-400 before:to-gray-400',
        'before:opacity-60',
        glow && 'shadow-[0_0_20px_rgba(107,114,128,0.4)]',
        animated && glow && 'hover:shadow-[0_0_30px_rgba(107,114,128,0.6)]'
      ],
      neon: [
        'bg-gray-500/20 border-gray-400/60 text-gray-100',
        glow && 'shadow-[0_0_15px_rgba(107,114,128,0.5)]',
        animated && 'hover:bg-gray-500/30 hover:border-gray-400/80',
        animated && glow && 'hover:shadow-[0_0_25px_rgba(107,114,128,0.7)]'
      ],
      glass: [
        'bg-white/10 border-gray-400/30 text-gray-100 backdrop-blur-sm',
        glow && 'shadow-[0_4px_15px_rgba(107,114,128,0.2)]',
        animated && 'hover:bg-white/15 hover:border-gray-400/50'
      ],
      gradient: [
        'bg-gradient-to-r from-gray-500 to-slate-500 border-transparent text-white',
        glow && 'shadow-[0_4px_15px_rgba(107,114,128,0.4)]',
        animated && 'hover:from-gray-600 hover:to-slate-600'
      ],
      outline: [
        'bg-transparent border-gray-400/60 text-gray-300',
        animated && 'hover:bg-gray-500/10 hover:border-gray-400/80'
      ]
    }
  };

  const classes = cn(
    baseClasses,
    sizeClasses[size],
    colorVariants[color][variant],
    className
  );

  return (
    <span className={classes} {...props}>
      {/* Holographic inner container */}
      {variant === 'holographic' && (
        <span className="absolute inset-[1px] rounded-full bg-black/40 backdrop-blur-sm" />
      )}
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-1.5">
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
      </span>
      
      {/* Shimmer effect for holographic badges */}
      {variant === 'holographic' && animated && (
        <span className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-full overflow-hidden">
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse" />
        </span>
      )}
    </span>
  );
}