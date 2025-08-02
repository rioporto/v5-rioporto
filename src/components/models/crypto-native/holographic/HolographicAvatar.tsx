'use client';

import { useState, useEffect } from 'react';
import { Avatar } from '@/components/ui/Avatar';

interface HolographicAvatarProps {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'rainbow' | 'cyberpunk' | 'neon' | 'aurora' | 'matrix';
  intensity?: 'low' | 'medium' | 'high' | 'extreme';
  animated?: boolean;
  glitch?: boolean;
  pulse?: boolean;
  fallback?: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
  className?: string;
  onClick?: () => void;
}

export function HolographicAvatar({
  src,
  alt = 'Avatar',
  size = 'md',
  variant = 'rainbow',
  intensity = 'medium',
  animated = true,
  glitch = false,
  pulse = false,
  fallback,
  status,
  className = '',
  onClick
}: HolographicAvatarProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);

  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
    '2xl': 'w-24 h-24'
  };

  const variantGradients = {
    rainbow: 'from-red-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500',
    cyberpunk: 'from-cyan-400 via-purple-500 to-pink-500',
    neon: 'from-green-400 via-blue-500 to-purple-600',
    aurora: 'from-pink-400 via-purple-500 via-indigo-500 to-cyan-400',
    matrix: 'from-green-400 via-green-500 to-lime-400'
  };

  const statusColors = {
    online: 'bg-green-400',
    offline: 'bg-gray-400',
    away: 'bg-yellow-400',
    busy: 'bg-red-400'
  };

  const intensityEffects = {
    low: { borderWidth: '2px', glowSize: '5px', opacity: 0.6 },
    medium: { borderWidth: '3px', glowSize: '10px', opacity: 0.8 },
    high: { borderWidth: '4px', glowSize: '15px', opacity: 1 },
    extreme: { borderWidth: '5px', glowSize: '20px', opacity: 1 }
  };

  // Animation frame cycling for extreme intensity
  useEffect(() => {
    if (intensity === 'extreme' && animated) {
      const interval = setInterval(() => {
        setCurrentFrame(prev => (prev + 1) % 4);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [intensity, animated]);

  const currentIntensity = intensityEffects[intensity];

  return (
    <div 
      className={`relative inline-block ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Main Avatar Container */}
      <div
        className={`
          relative ${sizeClasses[size]} rounded-full overflow-hidden
          ${animated ? 'transition-all duration-500 ease-out' : ''}
          ${isHovered && animated ? 'scale-110' : ''}
          ${pulse ? 'animate-pulse' : ''}
        `}
      >
        {/* Holographic Border */}
        <div
          className={`
            absolute inset-0 rounded-full p-[${currentIntensity.borderWidth}]
            bg-gradient-to-r ${variantGradients[variant]}
            ${animated ? 'animate-gradient-x' : ''}
            ${isHovered && intensity !== 'low' ? 'animate-spin animate-duration-3000' : ''}
          `}
        >
          <div className="w-full h-full rounded-full bg-gray-900" />
        </div>

        {/* Avatar Image */}
        <div className="absolute inset-[3px] rounded-full overflow-hidden">
          <Avatar
            src={src}
            alt={alt}
            fallback={fallback}
            className="w-full h-full"
          />
        </div>

        {/* Glitch Effect */}
        {glitch && isHovered && (
          <>
            <div className="absolute inset-0 bg-red-500/20 animate-pulse animate-duration-100 rounded-full" />
            <div className="absolute inset-0 bg-cyan-500/20 animate-pulse animate-duration-150 rounded-full transform translate-x-1" />
            <div className="absolute inset-0 bg-yellow-500/20 animate-pulse animate-duration-200 rounded-full transform -translate-x-1" />
          </>
        )}

        {/* Matrix Rain Effect */}
        {variant === 'matrix' && isHovered && (
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className="text-green-400 text-[6px] font-mono leading-none opacity-50 animate-pulse">
              01010101010101010101010101010101
            </div>
          </div>
        )}

        {/* Extreme Intensity Effects */}
        {intensity === 'extreme' && (
          <>
            {/* Rotating particles */}
            <div className="absolute inset-0 animate-spin animate-duration-2000">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className={`
                    absolute w-1 h-1 bg-white rounded-full
                    animate-pulse opacity-80
                  `}
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${i * 60}deg) translateY(-${size === '2xl' ? '16' : size === 'xl' ? '14' : size === 'lg' ? '12' : '10'}px)`,
                    animationDelay: `${i * 0.2}s`
                  }}
                />
              ))}
            </div>

            {/* Pulsing rings */}
            <div className={`absolute inset-[-10px] border border-purple-500/30 rounded-full animate-ping animate-duration-2000`} />
            <div className={`absolute inset-[-20px] border border-cyan-500/20 rounded-full animate-ping animate-duration-3000 animate-delay-500`} />
          </>
        )}
      </div>

      {/* External Glow */}
      {(isHovered || intensity === 'extreme') && (
        <div
          className={`
            absolute inset-0 rounded-full
            bg-gradient-to-r ${variantGradients[variant]}
            blur-${currentIntensity.glowSize} opacity-${Math.floor(currentIntensity.opacity * 60)}
            scale-110 animate-pulse
            pointer-events-none
          `}
        />
      )}

      {/* Status Indicator */}
      {status && (
        <div
          className={`
            absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-900
            ${statusColors[status]}
            ${status === 'online' ? 'animate-pulse' : ''}
          `}
        />
      )}

      {/* Cyberpunk Lines */}
      {variant === 'cyberpunk' && isHovered && (
        <>
          <div className="absolute top-0 left-1/2 w-px h-2 bg-cyan-400 transform -translate-x-1/2 -translate-y-2 animate-pulse" />
          <div className="absolute bottom-0 left-1/2 w-px h-2 bg-pink-400 transform -translate-x-1/2 translate-y-2 animate-pulse" />
          <div className="absolute left-0 top-1/2 w-2 h-px bg-purple-400 transform -translate-x-2 -translate-y-1/2 animate-pulse" />
          <div className="absolute right-0 top-1/2 w-2 h-px bg-purple-400 transform translate-x-2 -translate-y-1/2 animate-pulse" />
        </>
      )}

      {/* Hover Info */}
      {isHovered && onClick && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-white bg-black/80 px-2 py-1 rounded whitespace-nowrap">
          {alt}
        </div>
      )}
    </div>
  );
}

// Preset Avatar Variants
export function RainbowAvatar({ className = '', ...props }: Omit<HolographicAvatarProps, 'variant'>) {
  return (
    <HolographicAvatar variant="rainbow" className={className} {...props} />
  );
}

export function CyberpunkAvatar({ className = '', ...props }: Omit<HolographicAvatarProps, 'variant'>) {
  return (
    <HolographicAvatar variant="cyberpunk" className={className} {...props} />
  );
}

export function NeonAvatar({ className = '', ...props }: Omit<HolographicAvatarProps, 'variant'>) {
  return (
    <HolographicAvatar variant="neon" className={className} {...props} />
  );
}

export function GlitchAvatar({ className = '', ...props }: Omit<HolographicAvatarProps, 'glitch'>) {
  return (
    <HolographicAvatar glitch={true} className={className} {...props} />
  );
}

// Avatar Group Component
interface HolographicAvatarGroupProps {
  avatars: Array<{
    src?: string;
    alt?: string;
    status?: HolographicAvatarProps['status'];
  }>;
  max?: number;
  size?: HolographicAvatarProps['size'];
  variant?: HolographicAvatarProps['variant'];
  className?: string;
}

export function HolographicAvatarGroup({
  avatars,
  max = 5,
  size = 'md',
  variant = 'rainbow',
  className = ''
}: HolographicAvatarGroupProps) {
  const displayAvatars = avatars.slice(0, max);
  const remaining = Math.max(0, avatars.length - max);

  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
    '2xl': 'w-24 h-24'
  };

  const variantGradients = {
    rainbow: 'from-red-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500',
    cyberpunk: 'from-cyan-400 via-purple-500 to-pink-500',
    neon: 'from-green-400 via-blue-500 to-purple-600',
    aurora: 'from-pink-400 via-purple-500 via-indigo-500 to-cyan-400',
    matrix: 'from-green-400 via-green-500 to-lime-400'
  };

  return (
    <div className={`flex -space-x-2 ${className}`}>
      {displayAvatars.map((avatar, index) => (
        <HolographicAvatar
          key={index}
          src={avatar.src}
          alt={avatar.alt}
          status={avatar.status}
          size={size}
          variant={variant}
          className="ring-2 ring-gray-900"
        />
      ))}
      
      {remaining > 0 && (
        <div
          className={`
            ${sizeClasses[size]} rounded-full
            bg-gradient-to-r ${variantGradients[variant]}
            flex items-center justify-center text-white text-xs font-bold
            ring-2 ring-gray-900
          `}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
}