'use client';

import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/Card';

interface HolographicCardProps {
  children: React.ReactNode;
  intensity?: 'low' | 'medium' | 'high' | 'extreme';
  variant?: 'rainbow' | 'cyberpunk' | 'neon' | 'aurora' | 'matrix';
  triggerOnHover?: boolean;
  autoRotate?: boolean;
  glowEffect?: boolean;
  className?: string;
}

export function HolographicCard({
  children,
  intensity = 'medium',
  variant = 'rainbow',
  triggerOnHover = true,
  autoRotate = false,
  glowEffect = true,
  className = ''
}: HolographicCardProps) {
  const [isActive, setIsActive] = useState(!triggerOnHover);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const intensityValues = {
    low: { opacity: 0.3, blur: '1px', scale: 1.02 },
    medium: { opacity: 0.5, blur: '2px', scale: 1.05 },
    high: { opacity: 0.7, blur: '3px', scale: 1.08 },
    extreme: { opacity: 0.9, blur: '4px', scale: 1.12 }
  };

  const variantGradients = {
    rainbow: 'from-red-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500',
    cyberpunk: 'from-cyan-500 via-purple-500 to-pink-500',
    neon: 'from-green-400 via-blue-500 to-purple-600',
    aurora: 'from-pink-400 via-purple-500 via-indigo-500 to-cyan-400',
    matrix: 'from-green-400 via-green-500 to-lime-400'
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !triggerOnHover) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePosition({ x, y });
  };

  const currentIntensity = intensityValues[intensity];

  return (
    <div
      ref={cardRef}
      className={`relative group ${className}`}
      onMouseEnter={() => triggerOnHover && setIsActive(true)}
      onMouseLeave={() => triggerOnHover && setIsActive(false)}
      onMouseMove={handleMouseMove}
    >
      <Card 
        className={`
          relative overflow-hidden border-0 
          bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-md
          transition-all duration-500 ease-out
          ${isActive ? `transform scale-${currentIntensity.scale} shadow-2xl` : ''}
          ${autoRotate ? 'animate-pulse' : ''}
        `}
      >
        {children}

        {/* Main Holographic Effect */}
        {isActive && (
          <div 
            className={`
              absolute inset-0 pointer-events-none
              bg-gradient-to-r ${variantGradients[variant]}
              opacity-${Math.floor(currentIntensity.opacity * 100)}
              blur-${currentIntensity.blur}
              animate-gradient-x
            `}
            style={{
              background: triggerOnHover 
                ? `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(168,85,247,0.3) 0%, transparent 50%)`
                : undefined
            }}
          />
        )}

        {/* Shimmer Effect */}
        {isActive && (
          <div className={`
            absolute inset-0 pointer-events-none
            bg-gradient-to-r from-transparent via-white/${Math.floor(currentIntensity.opacity * 30)} to-transparent
            transform -skew-x-12 animate-shimmer
          `} />
        )}

        {/* Border Glow */}
        {isActive && glowEffect && (
          <div className={`
            absolute inset-0 pointer-events-none
            rounded-lg
            shadow-lg shadow-purple-500/${Math.floor(currentIntensity.opacity * 50)}
            animate-pulse
          `} />
        )}

        {/* Particle Effect */}
        {isActive && intensity === 'extreme' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className={`
                  absolute w-1 h-1 bg-white rounded-full
                  animate-bounce opacity-70
                `}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        )}

        {/* Cyber Lines */}
        {isActive && variant === 'cyberpunk' && (
          <>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent animate-pulse" />
            <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent animate-pulse" />
            <div className="absolute right-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent animate-pulse" />
          </>
        )}

        {/* Matrix Rain Effect */}
        {isActive && variant === 'matrix' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="absolute text-green-400 text-xs font-mono animate-bounce"
                style={{
                  left: `${i * 10}%`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '3s'
                }}
              >
                01010101
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* External Glow */}
      {isActive && glowEffect && (
        <div className={`
          absolute inset-0 -z-10 pointer-events-none
          bg-gradient-to-r ${variantGradients[variant]}
          opacity-${Math.floor(currentIntensity.opacity * 20)}
          blur-xl scale-110 animate-pulse
        `} />
      )}
    </div>
  );
}

// Preset Holographic Card Variants
export function RainbowHolographicCard({ children, className = '', ...props }: Omit<HolographicCardProps, 'variant'>) {
  return (
    <HolographicCard variant="rainbow" className={className} {...props}>
      {children}
    </HolographicCard>
  );
}

export function CyberpunkHolographicCard({ children, className = '', ...props }: Omit<HolographicCardProps, 'variant'>) {
  return (
    <HolographicCard variant="cyberpunk" className={className} {...props}>
      {children}
    </HolographicCard>
  );
}

export function NeonHolographicCard({ children, className = '', ...props }: Omit<HolographicCardProps, 'variant'>) {
  return (
    <HolographicCard variant="neon" className={className} {...props}>
      {children}
    </HolographicCard>
  );
}

export function AuroraHolographicCard({ children, className = '', ...props }: Omit<HolographicCardProps, 'variant'>) {
  return (
    <HolographicCard variant="aurora" className={className} {...props}>
      {children}
    </HolographicCard>
  );
}

export function MatrixHolographicCard({ children, className = '', ...props }: Omit<HolographicCardProps, 'variant'>) {
  return (
    <HolographicCard variant="matrix" className={className} {...props}>
      {children}
    </HolographicCard>
  );
}