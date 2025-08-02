'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface CryptoHeaderProps {
  children: React.ReactNode;
  variant?: 'glass' | 'solid' | 'gradient';
  blur?: boolean;
  sticky?: boolean;
  glow?: boolean;
  className?: string;
}

export function CryptoHeader({
  children,
  variant = 'glass',
  blur = true,
  sticky = true,
  glow = true,
  className,
  ...props
}: CryptoHeaderProps) {
  const baseClasses = [
    'w-full border-b transition-all duration-300 z-50',
    sticky && 'sticky top-0',
    'font-primary'
  ];

  const variantClasses = {
    glass: [
      'bg-black/20 border-white/10',
      blur && 'backdrop-blur-xl',
      glow && 'shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
    ],
    solid: [
      'bg-gray-900/95 border-gray-800',
      glow && 'shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
    ],
    gradient: [
      'bg-gradient-to-r from-purple-900/20 via-black/30 to-pink-900/20',
      'border-purple-500/20',
      blur && 'backdrop-blur-xl',
      glow && 'shadow-[0_4px_30px_rgba(153,69,255,0.2)]'
    ]
  };

  const classes = cn(
    baseClasses,
    variantClasses[variant],
    className
  );

  return (
    <header className={classes} {...props}>
      {/* Holographic line effect */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />
      
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Bottom glow line */}
      {glow && (
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" />
      )}
    </header>
  );
}

interface CryptoHeaderContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CryptoHeaderContent({ children, className }: CryptoHeaderContentProps) {
  return (
    <div className={cn('container mx-auto px-4 py-4', className)}>
      {children}
    </div>
  );
}

interface CryptoHeaderBrandProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export function CryptoHeaderBrand({ children, className, glow = true }: CryptoHeaderBrandProps) {
  return (
    <div className={cn(
      'flex items-center space-x-2 font-display font-bold text-xl text-white',
      glow && 'text-shadow-[0_0_20px_rgba(153,69,255,0.8)]',
      className
    )}>
      {children}
    </div>
  );
}

interface CryptoHeaderNavProps {
  children: React.ReactNode;
  className?: string;
}

export function CryptoHeaderNav({ children, className }: CryptoHeaderNavProps) {
  return (
    <nav className={cn('flex items-center space-x-6', className)}>
      {children}
    </nav>
  );
}

interface CryptoHeaderLinkProps {
  children: React.ReactNode;
  href?: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
  glow?: boolean;
}

export function CryptoHeaderLink({ 
  children, 
  href, 
  active = false, 
  onClick, 
  className, 
  glow = true 
}: CryptoHeaderLinkProps) {
  const linkClasses = cn(
    'relative px-3 py-2 text-sm font-medium transition-all duration-300',
    'text-gray-300 hover:text-white',
    'before:absolute before:bottom-0 before:left-0 before:right-0 before:h-[2px]',
    'before:bg-gradient-to-r before:from-purple-400 before:to-pink-400',
    'before:transform before:scale-x-0 before:transition-transform before:duration-300',
    'hover:before:scale-x-100',
    active && [
      'text-white',
      'before:scale-x-100',
      glow && 'text-shadow-[0_0_10px_rgba(153,69,255,0.8)]'
    ],
    glow && 'hover:text-shadow-[0_0_10px_rgba(255,255,255,0.5)]',
    className
  );

  if (href) {
    return (
      <a href={href} className={linkClasses}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={linkClasses}>
      {children}
    </button>
  );
}

interface CryptoHeaderActionsProps {
  children: React.ReactNode;
  className?: string;
}

export function CryptoHeaderActions({ children, className }: CryptoHeaderActionsProps) {
  return (
    <div className={cn('flex items-center space-x-3', className)}>
      {children}
    </div>
  );
}