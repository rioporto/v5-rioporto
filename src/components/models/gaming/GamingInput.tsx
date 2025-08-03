'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface GamingInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  variant?: 'primary' | 'terminal' | 'hud' | 'cyber';
  size?: 'sm' | 'md' | 'lg';
  glowColor?: 'pink' | 'cyan' | 'green' | 'yellow';
  showScanline?: boolean;
  errorMessage?: string;
  successMessage?: string;
}

export const GamingInput: React.FC<GamingInputProps> = ({
  label,
  variant = 'default',
  size = 'md',
  glowColor = 'cyan',
  showScanline = true,
  errorMessage,
  successMessage,
  className,
  onFocus,
  onBlur,
  onChange,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const [scanlinePosition, setScanlinePosition] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFocused && showScanline) {
      const interval = setInterval(() => {
        setScanlinePosition(prev => (prev >= 100 ? 0 : prev + 5));
      }, 50);
      
      return () => clearInterval(interval);
    }
  }, [isFocused, showScanline]);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(e.target.value.length > 0);
    onChange?.(e);
  };

  const glowColorStyles = {
    pink: {
      border: 'border-gaming-neon-pink',
      focusBorder: 'focus:border-gaming-neon-pink',
      glow: 'focus:shadow-[0_0_20px_rgba(255,0,110,0.3)]',
      text: 'text-gaming-neon-pink',
      bg: 'focus:bg-gaming-neon-pink/5',
    },
    cyan: {
      border: 'border-gaming-neon-cyan',
      focusBorder: 'focus:border-gaming-neon-cyan',
      glow: 'focus:shadow-[0_0_20px_rgba(0,245,255,0.3)]',
      text: 'text-gaming-neon-cyan',
      bg: 'focus:bg-gaming-neon-cyan/5',
    },
    green: {
      border: 'border-gaming-neon-green',
      focusBorder: 'focus:border-gaming-neon-green',
      glow: 'focus:shadow-[0_0_20px_rgba(0,255,0,0.3)]',
      text: 'text-gaming-neon-green',
      bg: 'focus:bg-gaming-neon-green/5',
    },
    yellow: {
      border: 'border-gaming-neon-yellow',
      focusBorder: 'focus:border-gaming-neon-yellow',
      glow: 'focus:shadow-[0_0_20px_rgba(255,255,0,0.3)]',
      text: 'text-gaming-neon-yellow',
      bg: 'focus:bg-gaming-neon-yellow/5',
    },
  };

  const sizeStyles: Record<string, string> = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg',
  };

  const variantStyles: Record<string, string> = {
    default: 'bg-gaming-surface border-2 rounded-lg',
    terminal: 'bg-gaming-dark border-2 rounded-none font-gaming-mono',
    hud: 'bg-gaming-surface/80 backdrop-blur-sm border-2 rounded-lg',
    cyber: 'bg-gradient-to-r from-gaming-surface to-gaming-dark border-2 rounded-lg',
  };

  const colorConfig = glowColorStyles[glowColor];
  const hasError = !!errorMessage;
  const hasSuccess = !!successMessage;

  return (
    <div className="relative">
      {/* Label */}
      {label && (
        <label className={cn(
          'block text-sm font-gaming-cyber uppercase tracking-wider mb-2',
          hasError ? 'text-gaming-neon-red' : hasSuccess ? 'text-gaming-neon-green' : colorConfig.text
        )}>
          {label}
          {props.required && <span className="text-gaming-neon-red ml-1">*</span>}
        </label>
      )}
      
      {/* Input container */}
      <div className="relative">
        <input
          ref={inputRef}
          className={cn(
            // Base styles
            'w-full text-white placeholder-white/50 transition-all duration-300',
            'outline-none focus:outline-none',
            
            // Variant styles
            variantStyles[variant],
            
            // Size styles
            sizeStyles[size],
            
            // Color and state styles
            hasError ? 'border-gaming-neon-red focus:shadow-[0_0_20px_rgba(255,51,51,0.3)]'
                    : hasSuccess ? 'border-gaming-neon-green focus:shadow-[0_0_20px_rgba(0,255,0,0.3)]'
                    : colorConfig.border,
            
            !hasError && !hasSuccess && colorConfig.focusBorder,
            !hasError && !hasSuccess && colorConfig.glow,
            !hasError && !hasSuccess && colorConfig.bg,
            
            // Terminal specific styles
            variant === 'terminal' && 'font-gaming-mono tracking-wider',
            
            className
          )}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          {...props}
        />
        
        {/* Scanline effect */}
        {showScanline && isFocused && (
          <div 
            className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent transition-all duration-75"
            style={{ top: `${scanlinePosition}%` }}
          />
        )}
        
        {/* Corner brackets */}
        {variant !== 'terminal' && (
          <>
            <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-current opacity-30 transition-opacity duration-300 group-focus-within:opacity-60" />
            <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-current opacity-30 transition-opacity duration-300 group-focus-within:opacity-60" />
            <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-current opacity-30 transition-opacity duration-300 group-focus-within:opacity-60" />
            <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-current opacity-30 transition-opacity duration-300 group-focus-within:opacity-60" />
          </>
        )}
        
        {/* Terminal cursor */}
        {variant === 'terminal' && isFocused && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-5 bg-gaming-neon-green animate-pulse" />
        )}
        
        {/* HUD glow effect */}
        {variant === 'hud' && isFocused && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-lg pointer-events-none" />
        )}
        
        {/* Cyber grid overlay */}
        {variant === 'cyber' && isFocused && (
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none rounded-lg"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,245,255,0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,245,255,0.3) 1px, transparent 1px)
              `,
              backgroundSize: '10px 10px',
            }}
          />
        )}
      </div>
      
      {/* Error/Success messages */}
      {(errorMessage || successMessage) && (
        <div className={cn(
          'mt-2 text-sm font-gaming-mono flex items-center gap-2',
          hasError ? 'text-gaming-neon-red' : 'text-gaming-neon-green'
        )}>
          <div className={cn(
            'w-1 h-1 rounded-full animate-pulse',
            hasError ? 'bg-gaming-neon-red' : 'bg-gaming-neon-green'
          )} />
          {errorMessage || successMessage}
        </div>
      )}
    </div>
  );
};