'use client';

import React, { useState, useEffect } from 'react';

interface SoundToggleProps {
  onToggle?: (enabled: boolean) => void;
  defaultEnabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'neon' | 'retro' | 'minimal';
  className?: string;
  showLabel?: boolean;
  persistState?: boolean;
}

export const SoundToggle: React.FC<SoundToggleProps> = ({
  onToggle,
  defaultEnabled = true,
  size = 'md',
  variant = 'default',
  className = '',
  showLabel = true,
  persistState = true
}) => {
  const [isEnabled, setIsEnabled] = useState(defaultEnabled);
  const [isAnimating, setIsAnimating] = useState(false);

  // Load persisted state
  useEffect(() => {
    if (persistState && typeof window !== 'undefined') {
      const saved = localStorage.getItem('rioporto-sound-enabled');
      if (saved !== null) {
        setIsEnabled(JSON.parse(saved));
      }
    }
  }, [persistState]);

  // Save state changes
  useEffect(() => {
    if (persistState && typeof window !== 'undefined') {
      localStorage.setItem('rioporto-sound-enabled', JSON.stringify(isEnabled));
    }
    onToggle?.(isEnabled);
  }, [isEnabled, onToggle, persistState]);

  const handleToggle = () => {
    setIsAnimating(true);
    setIsEnabled(!isEnabled);
    
    // Reset animation state
    setTimeout(() => setIsAnimating(false), 300);
  };

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base'
  };

  const variantStyles = {
    default: {
      enabled: 'bg-green-500 hover:bg-green-600 text-white border-green-400',
      disabled: 'bg-red-500 hover:bg-red-600 text-white border-red-400',
      transition: 'transition-all duration-200'
    },
    neon: {
      enabled: 'bg-transparent border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-black shadow-[0_0_20px_rgba(34,197,94,0.5)]',
      disabled: 'bg-transparent border-2 border-red-400 text-red-400 hover:bg-red-400 hover:text-black shadow-[0_0_20px_rgba(239,68,68,0.5)]',
      transition: 'transition-all duration-300'
    },
    retro: {
      enabled: 'bg-yellow-400 border-2 border-yellow-600 text-black hover:bg-yellow-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]',
      disabled: 'bg-gray-500 border-2 border-gray-700 text-white hover:bg-gray-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]',
      transition: 'transition-all duration-100'
    },
    minimal: {
      enabled: 'bg-transparent text-green-600 hover:bg-green-50 border border-green-200',
      disabled: 'bg-transparent text-red-600 hover:bg-red-50 border border-red-200',
      transition: 'transition-all duration-200'
    }
  };

  const currentStyle = variantStyles[variant];
  const currentClasses = isEnabled ? currentStyle.enabled : currentStyle.disabled;

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <button
        onClick={handleToggle}
        className={`
          ${sizeClasses[size]}
          ${currentClasses}
          ${currentStyle.transition}
          flex items-center justify-center rounded-lg font-medium
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
          ${isAnimating ? 'scale-110' : 'scale-100'}
          transform-gpu
        `}
        aria-label={`Sound ${isEnabled ? 'enabled' : 'disabled'}`}
        type="button"
      >
        {/* Sound Icon */}
        <div className="relative">
          {isEnabled ? (
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          )}
          
          {/* Sound waves animation */}
          {isEnabled && variant === 'neon' && (
            <>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-75" />
              <div className="absolute -top-2 -right-2 w-4 h-4 border border-green-400 rounded-full animate-pulse opacity-50" />
            </>
          )}
          
          {/* Retro-style indicator */}
          {variant === 'retro' && (
            <div className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${
              isEnabled ? 'bg-green-400' : 'bg-red-400'
            } ${isAnimating ? 'animate-bounce' : ''}`} />
          )}
        </div>
      </button>

      {showLabel && (
        <span className={`
          text-sm font-medium select-none
          ${variant === 'neon' ? 'text-gray-300' : 'text-gray-700'}
          ${isAnimating ? 'scale-105' : 'scale-100'}
          transition-transform duration-200
        `}>
          {isEnabled ? 'Sound On' : 'Sound Off'}
        </span>
      )}

      {/* Gaming-style status indicator */}
      {variant === 'default' && (
        <div className="flex space-x-1">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className={`
                w-1 h-3 rounded-full transition-all duration-200
                ${isEnabled 
                  ? `bg-green-400 ${i === 0 ? 'animate-pulse' : i === 1 ? 'animate-pulse delay-100' : 'animate-pulse delay-200'}` 
                  : 'bg-gray-400'
                }
              `}
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SoundToggle;