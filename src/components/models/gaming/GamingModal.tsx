'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface GamingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  variant?: 'primary' | 'alert' | 'confirm' | 'terminal';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const GamingModal: React.FC<GamingModalProps> = ({
  isOpen,
  onClose,
  title,
  variant = 'default',
  size = 'md',
  showCloseButton = true,
  children,
  className,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [scanlinePosition, setScanlinePosition] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
      
      // Scanline animation
      const interval = setInterval(() => {
        setScanlinePosition(prev => (prev >= 100 ? 0 : prev + 3));
      }, 50);
      
      return () => {
        clearInterval(interval);
        document.body.style.overflow = 'unset';
      };
    } else {
      setIsAnimating(false);
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  const sizeStyles = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  const variantStyles = {
    default: {
      border: 'border-gaming-neon-cyan',
      glow: 'shadow-[0_0_50px_rgba(0,245,255,0.4)]',
      bg: 'bg-gaming-dark',
    },
    alert: {
      border: 'border-gaming-neon-red',
      glow: 'shadow-[0_0_50px_rgba(255,51,51,0.4)]',
      bg: 'bg-gaming-dark',
    },
    confirm: {
      border: 'border-gaming-neon-yellow',
      glow: 'shadow-[0_0_50px_rgba(255,255,0,0.4)]',
      bg: 'bg-gaming-dark',
    },
    terminal: {
      border: 'border-gaming-neon-green',
      glow: 'shadow-[0_0_50px_rgba(0,255,0,0.4)]',
      bg: 'bg-gaming-dark',
    },
  };

  const config = variantStyles[variant];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className={cn(
          'absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300',
          isAnimating ? 'opacity-100' : 'opacity-0'
        )}
        onClick={handleBackdropClick}
      />
      
      {/* Modal */}
      <div className={cn(
        'relative w-full border-2 rounded-lg overflow-hidden transition-all duration-300',
        'transform-gpu',
        sizeStyles[size],
        config.border,
        config.glow,
        config.bg,
        isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
        className
      )}>
        {/* Background grid pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,245,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,245,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }}
        />
        
        {/* Scanlines overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-gaming-neon-cyan to-transparent"
            style={{ top: `${scanlinePosition}%` }}
          />
        </div>
        
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="relative z-10 flex items-center justify-between p-4 border-b border-current/30">
            {title && (
              <h2 className={cn(
                'font-gaming-cyber text-lg uppercase tracking-wider',
                variant === 'alert' ? 'text-gaming-neon-red' :
                variant === 'confirm' ? 'text-gaming-neon-yellow' :
                variant === 'terminal' ? 'text-gaming-neon-green' :
                'text-gaming-neon-cyan'
              )}>
                {title}
              </h2>
            )}
            
            {showCloseButton && (
              <button
                onClick={onClose}
                className={cn(
                  'p-2 rounded border transition-all duration-200',
                  'hover:bg-current/10 focus:outline-none focus:ring-2 focus:ring-current',
                  variant === 'alert' ? 'border-gaming-neon-red text-gaming-neon-red' :
                  variant === 'confirm' ? 'border-gaming-neon-yellow text-gaming-neon-yellow' :
                  variant === 'terminal' ? 'border-gaming-neon-green text-gaming-neon-green' :
                  'border-gaming-neon-cyan text-gaming-neon-cyan'
                )}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}
        
        {/* Content */}
        <div className="relative z-10 p-6">
          {children}
        </div>
        
        {/* Corner brackets */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-current opacity-60" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-current opacity-60" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-current opacity-60" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-current opacity-60" />
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-current/5 to-transparent pointer-events-none" />
      </div>
    </div>
  );
};