'use client';

import React, { useState, useEffect } from 'react';

interface SoundEffectIconProps {
  type: 'success' | 'error' | 'warning' | 'info' | 'achievement' | 'powerup' | 'combo' | 'click' | 'hover' | 'notification';
  trigger?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'neon' | 'retro' | 'gaming';
  duration?: number;
  onComplete?: () => void;
  className?: string;
}

export const SoundEffectIcon: React.FC<SoundEffectIconProps> = ({
  type,
  trigger = false,
  size = 'md',
  variant = 'default',
  duration = 1000,
  onComplete,
  className = ''
}) => {
  const [isActive, setIsActive] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️',
    achievement: '🏆',
    powerup: '⚡',
    combo: '🎯',
    click: '👆',
    hover: '✨',
    notification: '🔔'
  };

  const colors = {
    success: '#00ff41',
    error: '#ff0040',
    warning: '#ff8000',
    info: '#0080ff',
    achievement: '#ffd700',
    powerup: '#ff00ff',
    combo: '#ff0080',
    click: '#ffffff',
    hover: '#00ffff',
    notification: '#8000ff'
  };

  useEffect(() => {
    if (trigger) {
      setIsActive(true);
      setAnimationPhase(0);
      
      // Animation phases
      const phaseInterval = setInterval(() => {
        setAnimationPhase(prev => prev + 1);
      }, duration / 4);
      
      const timeout = setTimeout(() => {
        setIsActive(false);
        setAnimationPhase(0);
        clearInterval(phaseInterval);
        onComplete?.();
      }, duration);
      
      return () => {
        clearTimeout(timeout);
        clearInterval(phaseInterval);
      };
    }
  }, [trigger, duration, onComplete]);

  const getVariantStyles = () => {
    switch (variant) {
      case 'neon':
        return {
          glow: `drop-shadow(0 0 10px ${colors[type]}) drop-shadow(0 0 20px ${colors[type]}) drop-shadow(0 0 30px ${colors[type]})`,
          animation: 'animate-pulse'
        };
      case 'retro':
        return {
          glow: `drop-shadow(2px 2px 0px rgba(0,0,0,0.8)) drop-shadow(4px 4px 0px rgba(0,0,0,0.4))`,
          animation: 'animate-bounce'
        };
      case 'gaming':
        return {
          glow: `drop-shadow(0 0 15px ${colors[type]}) drop-shadow(0 0 30px ${colors[type]})`,
          animation: 'animate-spin'
        };
      default:
        return {
          glow: `drop-shadow(0 2px 4px rgba(0,0,0,0.2))`,
          animation: 'animate-ping'
        };
    }
  };

  const getPhaseStyles = () => {
    const baseScale = variant === 'retro' ? 1.2 : 1;
    
    switch (animationPhase) {
      case 0:
        return {
          transform: `scale(${baseScale * 1.5})`,
          opacity: 1,
        };
      case 1:
        return {
          transform: `scale(${baseScale * 0.8})`,
          opacity: 0.9,
        };
      case 2:
        return {
          transform: `scale(${baseScale * 1.2})`,
          opacity: 0.8,
        };
      case 3:
        return {
          transform: `scale(${baseScale})`,
          opacity: 0.6,
        };
      default:
        return {
          transform: `scale(${baseScale})`,
          opacity: 0.4,
        };
    }
  };

  const variantStyles = getVariantStyles();

  if (!isActive) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center pointer-events-none z-50 ${className}`}>
      {/* Background overlay for emphasis */}
      {variant === 'gaming' && (
        <div 
          className="absolute inset-0 bg-black bg-opacity-20 animate-pulse"
          style={{ animationDuration: `${duration}ms` }}
        />
      )}
      
      {/* Main icon */}
      <div
        className={`
          ${sizeClasses[size]}
          flex items-center justify-center text-6xl
          transition-all duration-200 ease-out
          ${variantStyles.animation}
        `}
        style={{
          ...getPhaseStyles(),
          filter: variantStyles.glow,
          color: colors[type],
          fontSize: size === 'xl' ? '4rem' : size === 'lg' ? '3rem' : size === 'md' ? '2rem' : '1.5rem',
        }}
      >
        {icons[type]}
      </div>
      
      {/* Additional effects based on type */}
      {type === 'achievement' && (
        <div className="absolute inset-0 flex items-center justify-center">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="absolute text-yellow-400 text-2xl animate-ping"
              style={{
                transform: `rotate(${i * 45}deg) translateY(-60px)`,
                animationDelay: `${i * 100}ms`,
                animationDuration: '1s'
              }}
            >
              ⭐
            </div>
          ))}
        </div>
      )}
      
      {type === 'powerup' && variant === 'gaming' && (
        <div className="absolute inset-0 flex items-center justify-center">
          {Array.from({ length: 4 }, (_, i) => (
            <div
              key={i}
              className="absolute w-20 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-spin"
              style={{
                transform: `rotate(${i * 90}deg)`,
                animationDuration: '0.5s',
                animationDelay: `${i * 100}ms`
              }}
            />
          ))}
        </div>
      )}
      
      {type === 'combo' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute text-pink-400 font-bold text-4xl animate-bounce">
            COMBO!
          </div>
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-pink-400 rounded-full animate-ping"
              style={{
                transform: `rotate(${i * 60}deg) translateY(-40px)`,
                animationDelay: `${i * 150}ms`
              }}
            />
          ))}
        </div>
      )}
      
      {/* Sound wave effect for neon variant */}
      {variant === 'neon' && (
        <div className="absolute inset-0 flex items-center justify-center">
          {Array.from({ length: 3 }, (_, i) => (
            <div
              key={i}
              className={`absolute border-2 rounded-full animate-ping`}
              style={{
                width: `${(i + 1) * 60}px`,
                height: `${(i + 1) * 60}px`,
                borderColor: colors[type],
                animationDelay: `${i * 200}ms`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      )}
      
      {/* Retro-style text effect */}
      {variant === 'retro' && type === 'success' && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-16">
          <div 
            className="text-yellow-400 font-bold text-2xl animate-bounce"
            style={{
              textShadow: '2px 2px 0px black, 4px 4px 0px rgba(0,0,0,0.5)',
              fontFamily: 'monospace'
            }}
          >
            SUCCESS!
          </div>
        </div>
      )}
    </div>
  );
};

export default SoundEffectIcon;