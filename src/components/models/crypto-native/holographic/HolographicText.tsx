'use client';

import { useState, useEffect } from 'react';

interface HolographicTextProps {
  children: React.ReactNode;
  variant?: 'rainbow' | 'cyberpunk' | 'neon' | 'aurora' | 'matrix' | 'fire' | 'ice';
  intensity?: 'low' | 'medium' | 'high' | 'extreme';
  speed?: 'slow' | 'normal' | 'fast' | 'ultra';
  glitch?: boolean;
  typewriter?: boolean;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

export function HolographicText({
  children,
  variant = 'rainbow',
  intensity = 'medium',
  speed = 'normal',
  glitch = false,
  typewriter = false,
  className = '',
  as: Component = 'span'
}: HolographicTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [glitchChars, setGlitchChars] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const text = typeof children === 'string' ? children : '';

  const speedValues = {
    slow: 'animate-duration-4000',
    normal: 'animate-duration-2000',
    fast: 'animate-duration-1000',
    ultra: 'animate-duration-500'
  };

  const variantClasses = {
    rainbow: 'bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500',
    cyberpunk: 'bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500',
    neon: 'bg-gradient-to-r from-green-400 via-blue-500 to-purple-600',
    aurora: 'bg-gradient-to-r from-pink-400 via-purple-500 via-indigo-500 to-cyan-400',
    matrix: 'bg-gradient-to-r from-green-400 via-green-500 to-lime-400',
    fire: 'bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400',
    ice: 'bg-gradient-to-r from-blue-600 via-cyan-400 to-white'
  };

  const shadowEffects = {
    low: 'drop-shadow-sm',
    medium: 'drop-shadow-md',
    high: 'drop-shadow-lg',
    extreme: 'drop-shadow-2xl'
  };

  // Typewriter effect
  useEffect(() => {
    if (typewriter && text) {
      if (currentIndex < text.length) {
        const timer = setTimeout(() => {
          setDisplayText(text.slice(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        }, 100);
        return () => clearTimeout(timer);
      }
    } else {
      setDisplayText(text);
    }
  }, [typewriter, text, currentIndex]);

  // Glitch effect
  useEffect(() => {
    if (glitch) {
      const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя';
      const interval = setInterval(() => {
        setGlitchChars(
          Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () =>
            chars[Math.floor(Math.random() * chars.length)]
          ).join('')
        );
      }, 150);

      return () => clearInterval(interval);
    }
  }, [glitch]);

  const textToDisplay = typewriter ? displayText : text;

  return (
    <Component
      className={`
        relative inline-block
        bg-clip-text text-transparent
        ${variantClasses[variant]}
        ${shadowEffects[intensity]}
        ${speedValues[speed]}
        animate-gradient-x
        ${className}
      `}
    >
      {textToDisplay}
      
      {/* Typewriter cursor */}
      {typewriter && currentIndex < text.length && (
        <span className="animate-blink text-current opacity-100 ml-1">|</span>
      )}

      {/* Glitch overlay */}
      {glitch && (
        <>
          <span 
            className="absolute inset-0 text-red-500 opacity-70 animate-pulse"
            style={{ transform: 'translate(-1px, 0)' }}
          >
            {textToDisplay}
          </span>
          <span 
            className="absolute inset-0 text-cyan-500 opacity-70 animate-pulse"
            style={{ transform: 'translate(1px, 0)' }}
          >
            {textToDisplay}
          </span>
          <span 
            className="absolute top-0 right-0 text-yellow-400 opacity-50 text-xs"
          >
            {glitchChars}
          </span>
        </>
      )}

      {/* Holographic shimmer */}
      <span 
        className={`
          absolute inset-0
          bg-gradient-to-r from-transparent via-white/30 to-transparent
          bg-clip-text text-transparent
          animate-shimmer
          opacity-${intensity === 'extreme' ? '100' : intensity === 'high' ? '70' : intensity === 'medium' ? '50' : '30'}
        `}
      >
        {textToDisplay}
      </span>

      {/* Additional effects for extreme intensity */}
      {intensity === 'extreme' && (
        <>
          <span 
            className="absolute inset-0 blur-sm opacity-50 animate-pulse"
            style={{ color: 'inherit' }}
          >
            {textToDisplay}
          </span>
          <span 
            className="absolute inset-0 blur-lg opacity-30 animate-ping"
            style={{ color: 'inherit' }}
          >
            {textToDisplay}
          </span>
        </>
      )}
    </Component>
  );
}

// Preset Text Components
export function RainbowText({ children, className = '', ...props }: Omit<HolographicTextProps, 'variant'>) {
  return (
    <HolographicText variant="rainbow" className={className} {...props}>
      {children}
    </HolographicText>
  );
}

export function CyberpunkText({ children, className = '', ...props }: Omit<HolographicTextProps, 'variant'>) {
  return (
    <HolographicText variant="cyberpunk" className={className} {...props}>
      {children}
    </HolographicText>
  );
}

export function NeonText({ children, className = '', ...props }: Omit<HolographicTextProps, 'variant'>) {
  return (
    <HolographicText variant="neon" className={className} {...props}>
      {children}
    </HolographicText>
  );
}

export function GlitchText({ children, className = '', ...props }: Omit<HolographicTextProps, 'glitch'>) {
  return (
    <HolographicText glitch={true} className={className} {...props}>
      {children}
    </HolographicText>
  );
}

export function TypewriterText({ children, className = '', ...props }: Omit<HolographicTextProps, 'typewriter'>) {
  return (
    <HolographicText typewriter={true} className={className} {...props}>
      {children}
    </HolographicText>
  );
}

// Animated Title Component
interface AnimatedTitleProps {
  title: string;
  subtitle?: string;
  emoji?: string;
  variant?: HolographicTextProps['variant'];
  className?: string;
}

export function AnimatedTitle({
  title,
  subtitle,
  emoji,
  variant = 'rainbow',
  className = ''
}: AnimatedTitleProps) {
  return (
    <div className={`text-center space-y-4 ${className}`}>
      {emoji && (
        <div className="text-6xl animate-bounce animate-duration-2000">
          {emoji}
        </div>
      )}
      
      <HolographicText
        variant={variant}
        intensity="high"
        as="h1"
        className="text-4xl md:text-5xl lg:text-6xl font-bold"
      >
        {title}
      </HolographicText>
      
      {subtitle && (
        <TypewriterText
          variant={variant}
          intensity="medium"
          as="p"
          className="text-lg md:text-xl text-muted-foreground"
        >
          {subtitle}
        </TypewriterText>
      )}
    </div>
  );
}

// Loading Text Component
interface LoadingTextProps {
  text?: string;
  variant?: HolographicTextProps['variant'];
  className?: string;
}

export function LoadingText({
  text = 'Loading',
  variant = 'cyberpunk',
  className = ''
}: LoadingTextProps) {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <HolographicText
      variant={variant}
      intensity="medium"
      className={`text-xl font-semibold ${className}`}
    >
      {text}{dots}
    </HolographicText>
  );
}

// Status Text Component
interface StatusTextProps {
  status: 'success' | 'error' | 'warning' | 'info' | 'loading';
  children: React.ReactNode;
  className?: string;
}

export function StatusText({ status, children, className = '' }: StatusTextProps) {
  const statusVariants = {
    success: { variant: 'neon' as const, emoji: '✅' },
    error: { variant: 'fire' as const, emoji: '❌' },
    warning: { variant: 'fire' as const, emoji: '⚠️' },
    info: { variant: 'aurora' as const, emoji: 'ℹ️' },
    loading: { variant: 'cyberpunk' as const, emoji: '⏳' }
  };

  const config = statusVariants[status];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span>{config.emoji}</span>
      <HolographicText
        variant={config.variant}
        intensity="medium"
        glitch={status === 'error'}
      >
        {children}
      </HolographicText>
    </div>
  );
}