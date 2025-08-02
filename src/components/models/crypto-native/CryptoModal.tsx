'use client';

import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';

interface CryptoModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  variant?: 'glass' | 'neon' | 'holographic' | 'solid';
  closable?: boolean;
  backdrop?: 'blur' | 'dark' | 'transparent';
  animated?: boolean;
  className?: string;
}

export function CryptoModal({
  isOpen,
  onClose,
  children,
  size = 'md',
  variant = 'glass',
  closable = true,
  backdrop = 'blur',
  animated = true,
  className
}: CryptoModalProps) {
  // Handle ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closable) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closable, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-4'
  };

  const backdropClasses = {
    blur: 'bg-black/50 backdrop-blur-xl',
    dark: 'bg-black/80',
    transparent: 'bg-transparent'
  };

  const variantClasses = {
    glass: [
      'bg-white/5 border border-white/20 backdrop-blur-xl',
      'shadow-[0_20px_60px_rgba(0,0,0,0.4)]'
    ],
    neon: [
      'bg-black/80 border border-purple-400/50 backdrop-blur-sm',
      'shadow-[0_0_60px_rgba(153,69,255,0.4)]'
    ],
    holographic: [
      'bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10',
      'border border-transparent backdrop-blur-xl relative',
      'before:absolute before:inset-0 before:rounded-2xl before:p-[1px]',
      'before:bg-gradient-to-r before:from-purple-400 before:via-pink-400 before:to-blue-400',
      'before:opacity-50',
      'shadow-[0_0_80px_rgba(153,69,255,0.3)]'
    ],
    solid: [
      'bg-gray-900 border border-gray-700',
      'shadow-[0_20px_60px_rgba(0,0,0,0.6)]'
    ]
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className={cn(
          'absolute inset-0',
          backdropClasses[backdrop],
          animated && 'animate-in fade-in duration-300'
        )}
        onClick={closable ? onClose : undefined}
      />

      {/* Modal */}
      <div 
        className={cn(
          'relative w-full rounded-2xl font-primary',
          sizeClasses[size],
          variantClasses[variant],
          animated && 'animate-in zoom-in-95 fade-in duration-300',
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Holographic inner container */}
        {variant === 'holographic' && (
          <div className="absolute inset-[1px] rounded-2xl bg-black/60 backdrop-blur-xl" />
        )}

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>

        {/* Noise texture overlay */}
        <div 
          className="absolute inset-0 opacity-5 mix-blend-overlay rounded-2xl pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
      </div>
    </div>
  );
}

interface CryptoModalHeaderProps {
  children: React.ReactNode;
  onClose?: () => void;
  closable?: boolean;
  className?: string;
}

export function CryptoModalHeader({ 
  children, 
  onClose, 
  closable = true, 
  className 
}: CryptoModalHeaderProps) {
  return (
    <div className={cn(
      'flex items-center justify-between p-6 pb-4 border-b border-white/10',
      className
    )}>
      <div className="flex-1">
        {children}
      </div>
      
      {closable && onClose && (
        <button
          onClick={onClose}
          className="ml-4 p-2 text-gray-400 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/10"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
}

interface CryptoModalTitleProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export function CryptoModalTitle({ children, className, glow = true }: CryptoModalTitleProps) {
  return (
    <h2 className={cn(
      'text-xl font-semibold text-white font-display',
      glow && 'text-shadow-[0_0_20px_rgba(255,255,255,0.5)]',
      className
    )}>
      {children}
    </h2>
  );
}

interface CryptoModalBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function CryptoModalBody({ children, className }: CryptoModalBodyProps) {
  return (
    <div className={cn('p-6 text-gray-200', className)}>
      {children}
    </div>
  );
}

interface CryptoModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function CryptoModalFooter({ children, className }: CryptoModalFooterProps) {
  return (
    <div className={cn(
      'flex items-center justify-end gap-3 p-6 pt-4 border-t border-white/10',
      className
    )}>
      {children}
    </div>
  );
}

// Confirmation Modal Variant
interface CryptoConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  loading?: boolean;
}

export function CryptoConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'info',
  loading = false
}: CryptoConfirmModalProps) {
  const variantColors = {
    danger: { color: 'red', glow: 'shadow-[0_0_20px_rgba(239,68,68,0.5)]' },
    warning: { color: 'yellow', glow: 'shadow-[0_0_20px_rgba(234,179,8,0.5)]' },
    info: { color: 'blue', glow: 'shadow-[0_0_20px_rgba(59,130,246,0.5)]' }
  };

  return (
    <CryptoModal isOpen={isOpen} onClose={onClose} size="sm" variant="glass">
      <CryptoModalHeader onClose={onClose}>
        <CryptoModalTitle>{title}</CryptoModalTitle>
      </CryptoModalHeader>
      
      <CryptoModalBody>
        <p className="text-gray-300">{message}</p>
      </CryptoModalBody>
      
      <CryptoModalFooter>
        <button
          onClick={onClose}
          className="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/10"
          disabled={loading}
        >
          {cancelText}
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className={cn(
            'px-4 py-2 font-semibold rounded-lg transition-all duration-200',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            variant === 'danger' && 'bg-red-500 hover:bg-red-600 text-white hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]',
            variant === 'warning' && 'bg-yellow-500 hover:bg-yellow-600 text-black hover:shadow-[0_0_20px_rgba(234,179,8,0.5)]',
            variant === 'info' && 'bg-blue-500 hover:bg-blue-600 text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]'
          )}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Loading...
            </div>
          ) : (
            confirmText
          )}
        </button>
      </CryptoModalFooter>
    </CryptoModal>
  );
}