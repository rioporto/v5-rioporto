'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/Button';

interface HolographicButtonProps {
  children: React.ReactNode;
  variant?: 'rainbow' | 'cyberpunk' | 'neon' | 'aurora' | 'matrix' | 'fire' | 'ice';
  intensity?: 'low' | 'medium' | 'high' | 'extreme';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  pulse?: boolean;
  glitch?: boolean;
  onClick?: () => void | Promise<void>;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function HolographicButton({
  children,
  variant = 'rainbow',
  intensity = 'medium',
  size = 'md',
  disabled = false,
  loading = false,
  pulse = false,
  glitch = false,
  onClick,
  className = '',
  type = 'button'
}: HolographicButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [glitchText, setGlitchText] = useState('');
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleIdRef = useRef(0);

  const variantClasses = {
    rainbow: {
      bg: 'from-red-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500',
      shadow: 'shadow-purple-500/50',
      glow: 'drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]'
    },
    cyberpunk: {
      bg: 'from-cyan-400 via-purple-500 to-pink-500',
      shadow: 'shadow-cyan-500/50',
      glow: 'drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]'
    },
    neon: {
      bg: 'from-green-400 via-blue-500 to-purple-600',
      shadow: 'shadow-green-500/50',
      glow: 'drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]'
    },
    aurora: {
      bg: 'from-pink-400 via-purple-500 via-indigo-500 to-cyan-400',
      shadow: 'shadow-pink-500/50',
      glow: 'drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]'
    },
    matrix: {
      bg: 'from-green-400 via-green-500 to-lime-400',
      shadow: 'shadow-green-500/50',
      glow: 'drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]'
    },
    fire: {
      bg: 'from-red-600 via-orange-500 to-yellow-400',
      shadow: 'shadow-red-500/50',
      glow: 'drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]'
    },
    ice: {
      bg: 'from-blue-600 via-cyan-400 to-white',
      shadow: 'shadow-blue-500/50',
      glow: 'drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]'
    }
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
  };

  const intensityEffects = {
    low: { opacity: 0.7, scale: 1.02, blur: 'blur-sm' },
    medium: { opacity: 0.85, scale: 1.05, blur: 'blur-none' },
    high: { opacity: 1, scale: 1.08, blur: 'blur-none' },
    extreme: { opacity: 1, scale: 1.12, blur: 'blur-none' }
  };

  // Glitch effect
  useEffect(() => {
    if (glitch && !disabled) {
      const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      const interval = setInterval(() => {
        setGlitchText(
          Array.from({ length: 3 }, () =>
            chars[Math.floor(Math.random() * chars.length)]
          ).join('')
        );
      }, 200);

      return () => clearInterval(interval);
    }
  }, [glitch, disabled]);

  const createRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || disabled) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = {
      id: rippleIdRef.current++,
      x,
      y
    };

    setRipples(prev => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 1000);
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;

    createRipple(e);
    setIsPressed(true);
    
    try {
      await onClick?.();
    } finally {
      setTimeout(() => setIsPressed(false), 150);
    }
  };

  const currentVariant = variantClasses[variant];
  const currentIntensity = intensityEffects[intensity];

  return (
    <Button
      ref={buttonRef}
      type={type}
      onClick={handleClick}
      disabled={disabled || loading}
      className={`
        relative overflow-hidden border-0 text-white font-bold
        bg-gradient-to-r ${currentVariant.bg}
        ${sizeClasses[size]}
        ${!disabled && !loading ? `hover:scale-${currentIntensity.scale} ${currentVariant.shadow} hover:shadow-lg` : ''}
        ${!disabled && !loading && intensity === 'extreme' ? currentVariant.glow : ''}
        ${pulse && !disabled ? 'animate-pulse' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed grayscale' : ''}
        ${isPressed ? 'scale-95' : ''}
        ${loading ? 'cursor-wait' : ''}
        transition-all duration-300 ease-out
        ${className}
      `}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer opacity-0 hover:opacity-100 transition-opacity duration-500" />
      
      {/* Glitch Overlay */}
      {glitch && !disabled && (
        <>
          <div className="absolute inset-0 bg-red-500/20 animate-pulse animate-duration-100" />
          <div className="absolute top-1 right-1 text-xs text-red-300 opacity-70">
            {glitchText}
          </div>
        </>
      )}

      {/* Matrix Effect */}
      {variant === 'matrix' && !disabled && (
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <div className="absolute inset-0 text-green-300 text-xs font-mono animate-pulse">
            01010101
          </div>
        </div>
      )}

      {/* Ripple Effects */}
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="absolute rounded-full bg-white/30 animate-ping"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
            animationDuration: '1s'
          }}
        />
      ))}

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading && (
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        )}
        {children}
      </span>

      {/* Extreme Intensity Particles */}
      {intensity === 'extreme' && !disabled && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-bounce opacity-60"
              style={{
                left: `${10 + i * 10}%`,
                top: `${20 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: '2s'
              }}
            />
          ))}
        </div>
      )}

      {/* Cyber Lines for Cyberpunk Variant */}
      {variant === 'cyberpunk' && !disabled && (
        <>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
        </>
      )}
    </Button>
  );
}

// Preset Button Variants
export function RainbowButton({ children, className = '', ...props }: Omit<HolographicButtonProps, 'variant'>) {
  return (
    <HolographicButton variant="rainbow" className={className} {...props}>
      {children}
    </HolographicButton>
  );
}

export function CyberpunkButton({ children, className = '', ...props }: Omit<HolographicButtonProps, 'variant'>) {
  return (
    <HolographicButton variant="cyberpunk" className={className} {...props}>
      {children}
    </HolographicButton>
  );
}

export function NeonButton({ children, className = '', ...props }: Omit<HolographicButtonProps, 'variant'>) {
  return (
    <HolographicButton variant="neon" className={className} {...props}>
      {children}
    </HolographicButton>
  );
}

export function GlitchButton({ children, className = '', ...props }: Omit<HolographicButtonProps, 'glitch'>) {
  return (
    <HolographicButton glitch={true} className={className} {...props}>
      {children}
    </HolographicButton>
  );
}

// Action Buttons with Icons
interface ActionButtonProps extends Omit<HolographicButtonProps, 'children'> {
  icon?: string;
  text: string;
}

export function BuyButton({ icon = '🛒', text = 'Buy Now', ...props }: Partial<ActionButtonProps>) {
  return (
    <HolographicButton variant="neon" {...props}>
      <span className="text-lg">{icon}</span>
      {text}
    </HolographicButton>
  );
}

export function SellButton({ icon = '💰', text = 'Sell', ...props }: Partial<ActionButtonProps>) {
  return (
    <HolographicButton variant="fire" {...props}>
      <span className="text-lg">{icon}</span>
      {text}
    </HolographicButton>
  );
}

export function StakeButton({ icon = '🚀', text = 'Stake', ...props }: Partial<ActionButtonProps>) {
  return (
    <HolographicButton variant="aurora" {...props}>
      <span className="text-lg">{icon}</span>
      {text}
    </HolographicButton>
  );
}

export function MintButton({ icon = '✨', text = 'Mint NFT', ...props }: Partial<ActionButtonProps>) {
  return (
    <HolographicButton variant="rainbow" intensity="high" {...props}>
      <span className="text-lg">{icon}</span>
      {text}
    </HolographicButton>
  );
}