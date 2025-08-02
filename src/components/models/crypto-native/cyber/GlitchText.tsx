'use client';

import { useState, useEffect, useRef } from 'react';

interface GlitchTextProps {
  children: React.ReactNode;
  intensity?: 'low' | 'medium' | 'high' | 'extreme';
  speed?: 'slow' | 'normal' | 'fast' | 'ultra';
  variant?: 'classic' | 'cyberpunk' | 'matrix' | 'neon' | 'corrupt';
  triggerOnHover?: boolean;
  continuous?: boolean;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

export function GlitchText({
  children,
  intensity = 'medium',
  speed = 'normal',
  variant = 'classic',
  triggerOnHover = false,
  continuous = true,
  className = '',
  as: Component = 'span'
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(continuous && !triggerOnHover);
  const [glitchedText, setGlitchedText] = useState('');
  const [shadowOffset, setShadowOffset] = useState({ x: 0, y: 0 });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const text = typeof children === 'string' ? children : children?.toString() || '';

  const glitchChars = {
    classic: '!@#$%^&*()_+-=[]{}|;:,.<>?',
    cyberpunk: '█▓▒░▄▀▐▌║╫╪╬═╦╣╠╩╤╥╘╙╚╛╕╖╗╜╝╞╟╡╢╪╬',
    matrix: '01ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ',
    neon: '▲▼◆◇○●◈◉⬡⬢⬣⬤⬥⬦⭐⭑⭒★☾☽',
    corrupt: 'ÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ'
  };

  const intensitySettings = {
    low: { glitchChance: 0.1, replacementCount: 1, distortionMax: 2 },
    medium: { glitchChance: 0.2, replacementCount: 2, distortionMax: 4 },
    high: { glitchChance: 0.3, replacementCount: 3, distortionMax: 6 },
    extreme: { glitchChance: 0.5, replacementCount: 5, distortionMax: 10 }
  };

  const speedSettings = {
    slow: 300,
    normal: 150,
    fast: 75,
    ultra: 30
  };

  const variantColors = {
    classic: { primary: 'text-red-400', secondary: 'text-cyan-400', tertiary: 'text-yellow-400' },
    cyberpunk: { primary: 'text-pink-400', secondary: 'text-cyan-400', tertiary: 'text-purple-400' },
    matrix: { primary: 'text-green-400', secondary: 'text-lime-400', tertiary: 'text-emerald-400' },
    neon: { primary: 'text-blue-400', secondary: 'text-pink-400', tertiary: 'text-purple-400' },
    corrupt: { primary: 'text-red-500', secondary: 'text-orange-500', tertiary: 'text-yellow-500' }
  };

  useEffect(() => {
    if (!isGlitching) {
      setGlitchedText(text);
      return;
    }

    const settings = intensitySettings[intensity];
    const chars = glitchChars[variant];

    intervalRef.current = setInterval(() => {
      let result = text;
      
      // Random character replacement
      for (let i = 0; i < settings.replacementCount; i++) {
        if (Math.random() < settings.glitchChance && result.length > 0) {
          const randomIndex = Math.floor(Math.random() * result.length);
          const randomChar = chars[Math.floor(Math.random() * chars.length)];
          result = result.substring(0, randomIndex) + randomChar + result.substring(randomIndex + 1);
        }
      }

      setGlitchedText(result);

      // Random shadow offset for distortion
      setShadowOffset({
        x: (Math.random() - 0.5) * settings.distortionMax,
        y: (Math.random() - 0.5) * settings.distortionMax
      });

      // Randomly reset to original text
      if (Math.random() < 0.3) {
        setTimeout(() => setGlitchedText(text), 50);
      }
    }, speedSettings[speed]);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isGlitching, text, intensity, speed, variant]);

  const colors = variantColors[variant];

  return (
    <Component
      className={`relative inline-block font-mono ${className}`}
      onMouseEnter={() => triggerOnHover && setIsGlitching(true)}
      onMouseLeave={() => triggerOnHover && setIsGlitching(false)}
    >
      {/* Main text */}
      <span className="relative z-10">
        {glitchedText}
      </span>

      {/* Glitch layers */}
      {isGlitching && (
        <>
          {/* Red layer */}
          <span
            className={`absolute inset-0 ${colors.primary} opacity-80 animate-pulse`}
            style={{
              transform: `translate(${shadowOffset.x - 1}px, ${shadowOffset.y}px)`,
              clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)'
            }}
          >
            {glitchedText}
          </span>

          {/* Cyan layer */}
          <span
            className={`absolute inset-0 ${colors.secondary} opacity-80 animate-pulse`}
            style={{
              transform: `translate(${shadowOffset.x + 1}px, ${shadowOffset.y}px)`,
              clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)'
            }}
          >
            {glitchedText}
          </span>

          {/* Third color layer for high/extreme intensity */}
          {(intensity === 'high' || intensity === 'extreme') && (
            <span
              className={`absolute inset-0 ${colors.tertiary} opacity-60 animate-pulse`}
              style={{
                transform: `translate(${shadowOffset.x}px, ${shadowOffset.y - 1}px)`,
                clipPath: 'polygon(0 45%, 100% 45%, 100% 55%, 0 55%)'
              }}
            >
              {glitchedText}
            </span>
          )}

          {/* Scanlines for extreme intensity */}
          {intensity === 'extreme' && (
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute inset-0 bg-gradient-to-b"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)'
                }}
              />
            </div>
          )}

          {/* Noise overlay */}
          {(intensity === 'high' || intensity === 'extreme') && (
            <div
              className="absolute inset-0 opacity-20 animate-pulse"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
                filter: 'invert(1)'
              }}
            />
          )}

          {/* Matrix variant specific effects */}
          {variant === 'matrix' && (
            <div className="absolute -top-2 -left-2 text-green-400/30 text-xs animate-pulse">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} style={{ animationDelay: `${i * 100}ms` }}>
                  {Math.random() > 0.5 ? '1' : '0'}
                </span>
              ))}
            </div>
          )}

          {/* Cyberpunk variant specific effects */}
          {variant === 'cyberpunk' && (
            <>
              <div className="absolute top-0 left-0 w-full h-px bg-cyan-400/50 animate-pulse" />
              <div className="absolute bottom-0 left-0 w-full h-px bg-pink-400/50 animate-pulse" />
            </>
          )}
        </>
      )}
    </Component>
  );
}

// Preset Glitch Text Variants
export function ClassicGlitchText({ children, className = '', ...props }: Omit<GlitchTextProps, 'variant'>) {
  return (
    <GlitchText variant="classic" className={className} {...props}>
      {children}
    </GlitchText>
  );
}

export function CyberpunkGlitchText({ children, className = '', ...props }: Omit<GlitchTextProps, 'variant'>) {
  return (
    <GlitchText variant="cyberpunk" className={className} {...props}>
      {children}
    </GlitchText>
  );
}

export function MatrixGlitchText({ children, className = '', ...props }: Omit<GlitchTextProps, 'variant'>) {
  return (
    <GlitchText variant="matrix" className={className} {...props}>
      {children}
    </GlitchText>
  );
}

export function NeonGlitchText({ children, className = '', ...props }: Omit<GlitchTextProps, 'variant'>) {
  return (
    <GlitchText variant="neon" className={className} {...props}>
      {children}
    </GlitchText>
  );
}

export function CorruptGlitchText({ children, className = '', ...props }: Omit<GlitchTextProps, 'variant'>) {
  return (
    <GlitchText variant="corrupt" className={className} {...props}>
      {children}
    </GlitchText>
  );
}

// Glitch Title Component
interface GlitchTitleProps extends Omit<GlitchTextProps, 'children' | 'as'> {
  title: string;
  subtitle?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export function GlitchTitle({
  title,
  subtitle,
  size = 'lg',
  className = '',
  ...props
}: GlitchTitleProps) {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-4xl',
    xl: 'text-5xl',
    '2xl': 'text-6xl'
  };

  return (
    <div className={`text-center space-y-2 ${className}`}>
      <GlitchText
        as="h1"
        className={`${sizeClasses[size]} font-bold`}
        {...props}
      >
        {title}
      </GlitchText>
      {subtitle && (
        <GlitchText
          as="p"
          className="text-lg text-muted-foreground"
          intensity="low"
          triggerOnHover={true}
          continuous={false}
          {...props}
        >
          {subtitle}
        </GlitchText>
      )}
    </div>
  );
}

// Glitch Loading Component
interface GlitchLoadingProps extends Omit<GlitchTextProps, 'children'> {
  text?: string;
}

export function GlitchLoading({
  text = 'LOADING',
  className = '',
  ...props
}: GlitchLoadingProps) {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <GlitchText
      className={`text-xl font-bold ${className}`}
      intensity="high"
      speed="fast"
      {...props}
    >
      {text}{dots}
    </GlitchText>
  );
}

// Glitch Status Component
interface GlitchStatusProps extends Omit<GlitchTextProps, 'children' | 'variant'> {
  status: 'error' | 'warning' | 'success' | 'info';
  children: React.ReactNode;
}

export function GlitchStatus({
  status,
  children,
  className = '',
  ...props
}: GlitchStatusProps) {
  const statusVariants = {
    error: 'corrupt',
    warning: 'neon',
    success: 'matrix',
    info: 'cyberpunk'
  } as const;

  const statusEmojis = {
    error: '❌',
    warning: '⚠️',
    success: '✅',
    info: 'ℹ️'
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span>{statusEmojis[status]}</span>
      <GlitchText
        variant={statusVariants[status]}
        intensity={status === 'error' ? 'extreme' : 'medium'}
        {...props}
      >
        {children}
      </GlitchText>
    </div>
  );
}