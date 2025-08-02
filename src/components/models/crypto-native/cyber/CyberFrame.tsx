'use client';

import { useState, useEffect } from 'react';

interface CyberFrameProps {
  children: React.ReactNode;
  variant?: 'classic' | 'neon' | 'matrix' | 'glitch' | 'hologram';
  intensity?: 'low' | 'medium' | 'high' | 'extreme';
  animated?: boolean;
  corners?: boolean;
  scanlines?: boolean;
  dataStreams?: boolean;
  className?: string;
}

export function CyberFrame({
  children,
  variant = 'classic',
  intensity = 'medium',
  animated = true,
  corners = true,
  scanlines = false,
  dataStreams = false,
  className = ''
}: CyberFrameProps) {
  const [scanlinePosition, setScanlinePosition] = useState(0);
  const [dataFlow, setDataFlow] = useState('');

  const variants = {
    classic: {
      borderColor: 'border-cyan-400',
      glowColor: 'shadow-cyan-500/50',
      accentColor: 'text-cyan-400'
    },
    neon: {
      borderColor: 'border-pink-400',
      glowColor: 'shadow-pink-500/50',
      accentColor: 'text-pink-400'
    },
    matrix: {
      borderColor: 'border-green-400',
      glowColor: 'shadow-green-500/50',
      accentColor: 'text-green-400'
    },
    glitch: {
      borderColor: 'border-red-400',
      glowColor: 'shadow-red-500/50',
      accentColor: 'text-red-400'
    },
    hologram: {
      borderColor: 'border-purple-400',
      glowColor: 'shadow-purple-500/50',
      accentColor: 'text-purple-400'
    }
  };

  const intensitySettings = {
    low: { glowIntensity: '10px', animationSpeed: '4s', borderWidth: '1px' },
    medium: { glowIntensity: '15px', animationSpeed: '3s', borderWidth: '2px' },
    high: { glowIntensity: '20px', animationSpeed: '2s', borderWidth: '3px' },
    extreme: { glowIntensity: '25px', animationSpeed: '1s', borderWidth: '4px' }
  };

  // Scanline animation
  useEffect(() => {
    if (scanlines && animated) {
      const interval = setInterval(() => {
        setScanlinePosition(prev => (prev >= 100 ? 0 : prev + 2));
      }, 50);
      return () => clearInterval(interval);
    }
  }, [scanlines, animated]);

  // Data stream generation
  useEffect(() => {
    if (dataStreams && animated) {
      const interval = setInterval(() => {
        const chars = '01010101ABCDEF0123456789';
        setDataFlow(
          Array.from({ length: 20 }, () =>
            chars[Math.floor(Math.random() * chars.length)]
          ).join('')
        );
      }, 200);
      return () => clearInterval(interval);
    }
  }, [dataStreams, animated]);

  const currentVariant = variants[variant];
  const currentIntensity = intensitySettings[intensity];

  return (
    <div className={`relative ${className}`}>
      {/* Main Frame */}
      <div
        className={`
          relative border ${currentVariant.borderColor}
          bg-gray-900/50 backdrop-blur-sm
          ${animated ? `${currentVariant.glowColor} hover:shadow-lg` : ''}
          transition-all duration-300
          overflow-hidden
        `}
        style={{
          borderWidth: currentIntensity.borderWidth,
          filter: animated ? `drop-shadow(0 0 ${currentIntensity.glowIntensity} currentColor)` : undefined
        }}
      >
        {/* Corner Decorations */}
        {corners && (
          <>
            {/* Top Left */}
            <div className={`absolute top-0 left-0 w-4 h-4 ${currentVariant.accentColor}`}>
              <div className="absolute top-0 left-0 w-full h-px bg-current" />
              <div className="absolute top-0 left-0 w-px h-full bg-current" />
              <div className="absolute top-1 left-1 w-2 h-px bg-current" />
              <div className="absolute top-1 left-1 w-px h-2 bg-current" />
            </div>

            {/* Top Right */}
            <div className={`absolute top-0 right-0 w-4 h-4 ${currentVariant.accentColor}`}>
              <div className="absolute top-0 right-0 w-full h-px bg-current" />
              <div className="absolute top-0 right-0 w-px h-full bg-current" />
              <div className="absolute top-1 right-1 w-2 h-px bg-current" />
              <div className="absolute top-1 right-1 w-px h-2 bg-current" />
            </div>

            {/* Bottom Left */}
            <div className={`absolute bottom-0 left-0 w-4 h-4 ${currentVariant.accentColor}`}>
              <div className="absolute bottom-0 left-0 w-full h-px bg-current" />
              <div className="absolute bottom-0 left-0 w-px h-full bg-current" />
              <div className="absolute bottom-1 left-1 w-2 h-px bg-current" />
              <div className="absolute bottom-1 left-1 w-px h-2 bg-current" />
            </div>

            {/* Bottom Right */}
            <div className={`absolute bottom-0 right-0 w-4 h-4 ${currentVariant.accentColor}`}>
              <div className="absolute bottom-0 right-0 w-full h-px bg-current" />
              <div className="absolute bottom-0 right-0 w-px h-full bg-current" />
              <div className="absolute bottom-1 right-1 w-2 h-px bg-current" />
              <div className="absolute bottom-1 right-1 w-px h-2 bg-current" />
            </div>
          </>
        )}

        {/* Scanlines */}
        {scanlines && (
          <div
            className={`absolute inset-0 pointer-events-none`}
            style={{
              background: `linear-gradient(to bottom, transparent ${scanlinePosition}%, ${currentVariant.borderColor.replace('border-', 'rgba(').replace('-400', ', 0.3)')} ${scanlinePosition + 1}%, transparent ${scanlinePosition + 2}%)`
            }}
          />
        )}

        {/* Data Streams */}
        {dataStreams && (
          <>
            <div className={`absolute top-2 left-2 text-xs font-mono ${currentVariant.accentColor} opacity-60`}>
              {dataFlow.slice(0, 8)}
            </div>
            <div className={`absolute top-2 right-2 text-xs font-mono ${currentVariant.accentColor} opacity-60`}>
              {dataFlow.slice(8, 16)}
            </div>
            <div className={`absolute bottom-2 left-2 text-xs font-mono ${currentVariant.accentColor} opacity-60`}>
              {dataFlow.slice(16, 20)}
            </div>
          </>
        )}

        {/* Glitch Effect for Glitch Variant */}
        {variant === 'glitch' && animated && (
          <>
            <div className="absolute inset-0 bg-red-500/5 animate-pulse animate-duration-100" />
            <div className="absolute inset-0 bg-cyan-500/5 animate-pulse animate-duration-150 transform translate-x-px" />
          </>
        )}

        {/* Matrix Rain for Matrix Variant */}
        {variant === 'matrix' && animated && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 text-green-400/20 text-xs font-mono leading-none animate-pulse">
              {Array.from({ length: 50 }, (_, i) => (
                <span key={i} className="inline-block" style={{ animationDelay: `${i * 50}ms` }}>
                  {Math.random() > 0.5 ? '1' : '0'}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Hologram Effect */}
        {variant === 'hologram' && animated && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent animate-shimmer" />
        )}

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>

      {/* External Glow for Extreme Intensity */}
      {intensity === 'extreme' && animated && (
        <div
          className={`
            absolute inset-0 border ${currentVariant.borderColor}
            blur-lg opacity-50 scale-105 animate-pulse
            pointer-events-none
          `}
          style={{ borderWidth: currentIntensity.borderWidth }}
        />
      )}
    </div>
  );
}

// Preset Cyber Frame Variants
export function ClassicCyberFrame({ children, className = '', ...props }: Omit<CyberFrameProps, 'variant'>) {
  return (
    <CyberFrame variant="classic" className={className} {...props}>
      {children}
    </CyberFrame>
  );
}

export function NeonCyberFrame({ children, className = '', ...props }: Omit<CyberFrameProps, 'variant'>) {
  return (
    <CyberFrame variant="neon" className={className} {...props}>
      {children}
    </CyberFrame>
  );
}

export function MatrixCyberFrame({ children, className = '', ...props }: Omit<CyberFrameProps, 'variant'>) {
  return (
    <CyberFrame variant="matrix" className={className} {...props}>
      {children}
    </CyberFrame>
  );
}

export function GlitchCyberFrame({ children, className = '', ...props }: Omit<CyberFrameProps, 'variant'>) {
  return (
    <CyberFrame variant="glitch" className={className} {...props}>
      {children}
    </CyberFrame>
  );
}

export function HologramCyberFrame({ children, className = '', ...props }: Omit<CyberFrameProps, 'variant'>) {
  return (
    <CyberFrame variant="hologram" className={className} {...props}>
      {children}
    </CyberFrame>
  );
}

// Cyber Panel Component
interface CyberPanelProps extends CyberFrameProps {
  title?: string;
  status?: 'online' | 'offline' | 'warning' | 'error';
  statusLabel?: string;
}

export function CyberPanel({
  children,
  title,
  status,
  statusLabel,
  className = '',
  ...props
}: CyberPanelProps) {
  const statusColors = {
    online: 'text-green-400',
    offline: 'text-gray-400',
    warning: 'text-yellow-400',
    error: 'text-red-400'
  };

  const statusIndicators = {
    online: '●',
    offline: '○',
    warning: '▲',
    error: '✕'
  };

  return (
    <CyberFrame className={`p-6 ${className}`} {...props}>
      {(title || status) && (
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-700/50">
          {title && (
            <h3 className="text-lg font-bold text-foreground font-mono">
              {title}
            </h3>
          )}
          {status && (
            <div className={`flex items-center gap-2 text-sm font-mono ${statusColors[status]}`}>
              <span className="animate-pulse">{statusIndicators[status]}</span>
              {statusLabel || status.toUpperCase()}
            </div>
          )}
        </div>
      )}
      {children}
    </CyberFrame>
  );
}

// Cyber Card Component
interface CyberCardProps extends CyberFrameProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export function CyberCard({
  children,
  header,
  footer,
  className = '',
  ...props
}: CyberCardProps) {
  return (
    <CyberFrame className={`overflow-hidden ${className}`} {...props}>
      {header && (
        <div className="p-4 border-b border-gray-700/50 bg-gray-800/30">
          {header}
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
      {footer && (
        <div className="p-4 border-t border-gray-700/50 bg-gray-800/30">
          {footer}
        </div>
      )}
    </CyberFrame>
  );
}