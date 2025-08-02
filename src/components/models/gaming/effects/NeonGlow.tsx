'use client';

import React, { useState, useEffect } from 'react';

interface NeonGlowProps {
  text?: string;
  color?: string;
  intensity?: 'low' | 'medium' | 'high' | 'extreme';
  animation?: 'none' | 'pulse' | 'flicker' | 'wave' | 'rainbow';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  font?: 'mono' | 'sans' | 'serif' | 'gaming';
  className?: string;
  children?: React.ReactNode;
  as?: 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  border?: boolean;
  background?: boolean;
}

export const NeonGlow: React.FC<NeonGlowProps> = ({
  text,
  color = '#00ffff',
  intensity = 'medium',
  animation = 'none',
  size = 'md',
  font = 'gaming',
  className = '',
  children,
  as: Component = 'div',
  border = false,
  background = false
}) => {
  const [flickerState, setFlickerState] = useState(true);
  const [rainbowPhase, setRainbowPhase] = useState(0);

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl'
  };

  const fontClasses = {
    mono: 'font-mono',
    sans: 'font-sans',
    serif: 'font-serif',
    gaming: 'font-mono font-bold tracking-wider'
  };

  const intensityConfig = {
    low: {
      textShadow: `0 0 5px ${color}`,
      boxShadow: border ? `0 0 5px ${color}` : 'none',
      filter: 'brightness(1.1)'
    },
    medium: {
      textShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
      boxShadow: border ? `0 0 10px ${color}, 0 0 20px ${color}` : 'none',
      filter: 'brightness(1.2)'
    },
    high: {
      textShadow: `0 0 10px ${color}, 0 0 20px ${color}, 0 0 30px ${color}`,
      boxShadow: border ? `0 0 10px ${color}, 0 0 20px ${color}, 0 0 30px ${color}` : 'none',
      filter: 'brightness(1.3)'
    },
    extreme: {
      textShadow: `0 0 10px ${color}, 0 0 20px ${color}, 0 0 30px ${color}, 0 0 40px ${color}`,
      boxShadow: border ? `0 0 10px ${color}, 0 0 20px ${color}, 0 0 30px ${color}, 0 0 40px ${color}` : 'none',
      filter: 'brightness(1.4) saturate(1.2)'
    }
  };

  // Animation effects
  useEffect(() => {
    if (animation === 'flicker') {
      const interval = setInterval(() => {
        setFlickerState(prev => Math.random() > 0.15 ? true : !prev);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [animation]);

  useEffect(() => {
    if (animation === 'rainbow') {
      const interval = setInterval(() => {
        setRainbowPhase(prev => (prev + 1) % 360);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [animation]);

  const getRainbowColor = () => {
    return `hsl(${rainbowPhase}, 100%, 50%)`;
  };

  const getAnimationClasses = () => {
    switch (animation) {
      case 'pulse':
        return 'animate-pulse';
      case 'wave':
        return 'animate-bounce';
      default:
        return '';
    }
  };

  const getEffectiveColor = () => {
    if (animation === 'rainbow') {
      return getRainbowColor();
    }
    return color;
  };

  const getEffectiveIntensity = () => {
    if (animation === 'flicker' && !flickerState) {
      return intensityConfig.low;
    }
    return intensityConfig[intensity];
  };

  const currentColor = getEffectiveColor();
  const currentIntensity = getEffectiveIntensity();

  const styles = {
    color: currentColor,
    ...currentIntensity,
    backgroundColor: background ? `${currentColor}10` : 'transparent',
    border: border ? `1px solid ${currentColor}` : 'none'
  };

  const wrapperClasses = `
    ${sizeClasses[size]}
    ${fontClasses[font]}
    ${getAnimationClasses()}
    ${className}
    ${animation === 'flicker' && !flickerState ? 'opacity-30' : 'opacity-100'}
    transition-opacity duration-100
  `;

  return (
    <Component
      className={wrapperClasses}
      style={styles}
    >
      {text || children}
      
      {/* Additional neon effects */}
      {intensity === 'extreme' && (
        <>
          {/* Inner glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at center, ${currentColor}20 0%, transparent 70%)`,
              filter: 'blur(10px)'
            }}
          />
          
          {/* Outer glow */}
          <div
            className="absolute inset-0 pointer-events-none -m-4"
            style={{
              background: `radial-gradient(circle at center, ${currentColor}10 0%, transparent 50%)`,
              filter: 'blur(20px)'
            }}
          />
        </>
      )}
      
      {/* Wave animation overlay */}
      {animation === 'wave' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${currentColor}40 50%, transparent 100%)`,
              animation: 'neon-wave 2s ease-in-out infinite',
              transform: 'translateX(-100%)'
            }}
          />
        </div>
      )}
      
      {/* Flicker sparks */}
      {animation === 'flicker' && !flickerState && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 3 }, (_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full animate-ping"
              style={{
                backgroundColor: currentColor,
                left: `${20 + i * 30}%`,
                top: `${30 + i * 20}%`,
                animationDelay: `${i * 100}ms`,
                animationDuration: '0.3s'
              }}
            />
          ))}
        </div>
      )}
    </Component>
  );
};

// Add keyframes for wave animation
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes neon-wave {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
  `;
  document.head.appendChild(style);
}

export default NeonGlow;