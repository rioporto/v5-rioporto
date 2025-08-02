'use client';

import React, { useEffect, useState } from 'react';

interface PulseAnimationProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  intensity?: number;
  speed?: number;
}

export const PulseAnimation: React.FC<PulseAnimationProps> = ({
  children,
  className = '',
  color = '#00ffff',
  intensity = 1,
  speed = 2000,
}) => {
  return (
    <div
      className={`pulse-animation ${className}`}
      style={{
        animation: `pulse-glow ${speed}ms ease-in-out infinite`,
        '--pulse-color': color,
        '--pulse-intensity': intensity,
      } as React.CSSProperties}
    >
      {children}
      
      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 5px var(--pulse-color);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 20px var(--pulse-color), 0 0 30px var(--pulse-color);
            transform: scale(calc(1 + var(--pulse-intensity) * 0.05));
          }
        }
      `}</style>
    </div>
  );
};

interface HeartbeatProps {
  className?: string;
  size?: number;
  color?: string;
}

export const Heartbeat: React.FC<HeartbeatProps> = ({
  className = '',
  size = 20,
  color = '#ff0080',
}) => {
  return (
    <div className={`heartbeat ${className}`}>
      <div
        className="heartbeat-dot"
        style={{
          width: size,
          height: size,
          backgroundColor: color,
          borderRadius: '50%',
          animation: 'heartbeat 1.5s ease-in-out infinite',
        }}
      />
      
      <style jsx>{`
        @keyframes heartbeat {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          14% {
            transform: scale(1.3);
            opacity: 0.7;
          }
          28% {
            transform: scale(1);
            opacity: 1;
          }
          42% {
            transform: scale(1.3);
            opacity: 0.7;
          }
          70% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

interface RippleEffectProps {
  className?: string;
  color?: string;
  count?: number;
}

export const RippleEffect: React.FC<RippleEffectProps> = ({
  className = '',
  color = '#00ffff',
  count = 3,
}) => {
  return (
    <div className={`ripple-container relative ${className}`}>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="absolute inset-0 rounded-full border-2 opacity-0"
          style={{
            borderColor: color,
            animation: `ripple 2s ease-out infinite`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}
      
      <style jsx>{`
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

interface CyberPulseProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'neon' | 'matrix' | 'hologram';
}

export const CyberPulse: React.FC<CyberPulseProps> = ({
  children,
  className = '',
  variant = 'neon',
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'neon':
        return {
          '--primary-color': '#00ffff',
          '--secondary-color': '#ff00ff',
          animation: 'neon-pulse 2s ease-in-out infinite',
        };
      case 'matrix':
        return {
          '--primary-color': '#00ff00',
          '--secondary-color': '#008000',
          animation: 'matrix-pulse 1.5s ease-in-out infinite',
        };
      case 'hologram':
        return {
          '--primary-color': '#0080ff',
          '--secondary-color': '#8000ff',
          animation: 'hologram-pulse 3s ease-in-out infinite',
        };
      default:
        return {};
    }
  };

  return (
    <div
      className={`cyber-pulse ${className}`}
      style={getVariantStyles() as React.CSSProperties}
    >
      {children}
      
      <style jsx>{`
        .cyber-pulse {
          position: relative;
        }
        
        .cyber-pulse::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: inherit;
          padding: 2px;
          background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          z-index: -1;
        }
        
        @keyframes neon-pulse {
          0%, 100% {
            filter: drop-shadow(0 0 5px var(--primary-color));
          }
          50% {
            filter: drop-shadow(0 0 20px var(--primary-color)) drop-shadow(0 0 30px var(--secondary-color));
          }
        }
        
        @keyframes matrix-pulse {
          0%, 100% {
            filter: drop-shadow(0 0 3px var(--primary-color));
            opacity: 0.8;
          }
          50% {
            filter: drop-shadow(0 0 15px var(--primary-color));
            opacity: 1;
          }
        }
        
        @keyframes hologram-pulse {
          0%, 100% {
            filter: drop-shadow(0 0 5px var(--primary-color));
            transform: translateZ(0);
          }
          25% {
            filter: drop-shadow(0 0 15px var(--primary-color));
            transform: translateZ(10px);
          }
          50% {
            filter: drop-shadow(0 0 25px var(--secondary-color));
            transform: translateZ(0);
          }
          75% {
            filter: drop-shadow(0 0 15px var(--secondary-color));
            transform: translateZ(-10px);
          }
        }
      `}</style>
    </div>
  );
};

interface GlitchPulseProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export const GlitchPulse: React.FC<GlitchPulseProps> = ({
  children,
  className = '',
  intensity = 1,
}) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`glitch-pulse relative ${className} ${
        isGlitching ? 'glitch-active' : ''
      }`}
      style={{
        '--glitch-intensity': intensity,
      } as React.CSSProperties}
    >
      {children}
      
      {/* Glitch layers */}
      <div className="absolute inset-0 opacity-0 glitch-layer-1">
        {children}
      </div>
      <div className="absolute inset-0 opacity-0 glitch-layer-2">
        {children}
      </div>
      
      <style jsx>{`
        .glitch-pulse {
          animation: subtle-pulse 4s ease-in-out infinite;
        }
        
        .glitch-active {
          animation: glitch-shake 0.2s ease-in-out;
        }
        
        .glitch-active .glitch-layer-1 {
          opacity: 0.8;
          animation: glitch-1 0.2s ease-in-out;
          color: #ff0000;
          transform: translateX(calc(var(--glitch-intensity) * 2px));
        }
        
        .glitch-active .glitch-layer-2 {
          opacity: 0.8;
          animation: glitch-2 0.2s ease-in-out;
          color: #00ffff;
          transform: translateX(calc(var(--glitch-intensity) * -2px));
        }
        
        @keyframes subtle-pulse {
          0%, 100% {
            filter: drop-shadow(0 0 2px rgba(0, 255, 255, 0.5));
          }
          50% {
            filter: drop-shadow(0 0 8px rgba(0, 255, 255, 0.8));
          }
        }
        
        @keyframes glitch-shake {
          0%, 100% { transform: translateX(0); }
          10% { transform: translateX(calc(var(--glitch-intensity) * -2px)); }
          20% { transform: translateX(calc(var(--glitch-intensity) * 2px)); }
          30% { transform: translateX(calc(var(--glitch-intensity) * -1px)); }
          40% { transform: translateX(calc(var(--glitch-intensity) * 1px)); }
          50% { transform: translateX(calc(var(--glitch-intensity) * -1px)); }
          60% { transform: translateX(calc(var(--glitch-intensity) * 1px)); }
          70% { transform: translateX(0); }
        }
        
        @keyframes glitch-1 {
          0%, 100% {
            clip-path: polygon(0 0, 100% 0, 100% 5%, 0 5%);
          }
          20% {
            clip-path: polygon(0 15%, 100% 15%, 100% 35%, 0 35%);
          }
          40% {
            clip-path: polygon(0 45%, 100% 45%, 100% 65%, 0 65%);
          }
          60% {
            clip-path: polygon(0 75%, 100% 75%, 100% 95%, 0 95%);
          }
          80% {
            clip-path: polygon(0 25%, 100% 25%, 100% 45%, 0 45%);
          }
        }
        
        @keyframes glitch-2 {
          0%, 100% {
            clip-path: polygon(0 10%, 100% 10%, 100% 25%, 0 25%);
          }
          20% {
            clip-path: polygon(0 35%, 100% 35%, 100% 55%, 0 55%);
          }
          40% {
            clip-path: polygon(0 65%, 100% 65%, 100% 85%, 0 85%);
          }
          60% {
            clip-path: polygon(0 5%, 100% 5%, 100% 20%, 0 20%);
          }
          80% {
            clip-path: polygon(0 85%, 100% 85%, 100% 100%, 0 100%);
          }
        }
      `}</style>
    </div>
  );
};