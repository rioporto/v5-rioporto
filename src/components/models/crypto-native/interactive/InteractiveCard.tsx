'use client';

import React, { useState, useRef } from 'react';

interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  tiltIntensity?: number;
  perspective?: number;
}

export const InteractiveCard: React.FC<InteractiveCardProps> = ({
  children,
  className = '',
  glowColor = '#00ffff',
  tiltIntensity = 15,
  perspective = 1000,
}) => {
  const [transform, setTransform] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / centerY * tiltIntensity;
    const rotateY = (centerX - x) / centerX * tiltIntensity;
    
    setTransform(`perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`);
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setTransform('');
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      className={`interactive-card relative overflow-hidden rounded-lg border border-cyan-500/30 bg-black/50 backdrop-blur-sm transition-all duration-300 ${className}`}
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow effect */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor}20 0%, transparent 50%)`,
          opacity: isHovered ? 1 : 0,
        }}
      />
      
      {/* Border glow */}
      <div
        className={`absolute inset-0 rounded-lg transition-all duration-300 ${
          isHovered ? 'shadow-[0_0_20px_rgba(0,255,255,0.5)]' : ''
        }`}
        style={{
          background: `linear-gradient(135deg, ${glowColor}30, transparent, ${glowColor}30)`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          padding: '1px',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 p-6">
        {children}
      </div>
      
      {/* Shine effect */}
      <div
        className={`absolute inset-0 opacity-0 transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : ''
        }`}
        style={{
          background: `linear-gradient(135deg, transparent 30%, ${glowColor}10 50%, transparent 70%)`,
          transform: 'translateX(-100%)',
          animation: isHovered ? 'shine 1.5s ease-out' : 'none',
        }}
      />
      
      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%) skewX(-15deg);
          }
          100% {
            transform: translateX(200%) skewX(-15deg);
          }
        }
      `}</style>
    </div>
  );
};

interface CyberCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'neon' | 'hologram' | 'matrix';
}

export const CyberCard: React.FC<CyberCardProps> = ({
  children,
  className = '',
  variant = 'neon',
}) => {
  const [isActive, setIsActive] = useState(false);

  const getVariantStyles = () => {
    switch (variant) {
      case 'neon':
        return {
          borderColor: '#00ffff',
          glowColor: '#00ffff',
          bgPattern: 'linear-gradient(135deg, rgba(0,255,255,0.1) 0%, rgba(0,0,0,0.8) 100%)',
        };
      case 'hologram':
        return {
          borderColor: '#0080ff',
          glowColor: '#0080ff',
          bgPattern: 'linear-gradient(135deg, rgba(0,128,255,0.1) 0%, rgba(0,0,0,0.8) 100%)',
        };
      case 'matrix':
        return {
          borderColor: '#00ff00',
          glowColor: '#00ff00',
          bgPattern: 'linear-gradient(135deg, rgba(0,255,0,0.1) 0%, rgba(0,0,0,0.8) 100%)',
        };
      default:
        return {
          borderColor: '#00ffff',
          glowColor: '#00ffff',
          bgPattern: 'linear-gradient(135deg, rgba(0,255,255,0.1) 0%, rgba(0,0,0,0.8) 100%)',
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div
      className={`cyber-card relative overflow-hidden rounded-lg border-2 backdrop-blur-sm transition-all duration-300 ${className}`}
      style={{
        borderColor: styles.borderColor,
        background: styles.bgPattern,
        boxShadow: isActive ? `0 0 30px ${styles.glowColor}50` : `0 0 10px ${styles.glowColor}20`,
      }}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-4 h-4">
        <div
          className="absolute top-0 left-0 w-full h-0.5"
          style={{ backgroundColor: styles.borderColor }}
        />
        <div
          className="absolute top-0 left-0 h-full w-0.5"
          style={{ backgroundColor: styles.borderColor }}
        />
      </div>
      
      <div className="absolute top-0 right-0 w-4 h-4">
        <div
          className="absolute top-0 right-0 w-full h-0.5"
          style={{ backgroundColor: styles.borderColor }}
        />
        <div
          className="absolute top-0 right-0 h-full w-0.5"
          style={{ backgroundColor: styles.borderColor }}
        />
      </div>
      
      <div className="absolute bottom-0 left-0 w-4 h-4">
        <div
          className="absolute bottom-0 left-0 w-full h-0.5"
          style={{ backgroundColor: styles.borderColor }}
        />
        <div
          className="absolute bottom-0 left-0 h-full w-0.5"
          style={{ backgroundColor: styles.borderColor }}
        />
      </div>
      
      <div className="absolute bottom-0 right-0 w-4 h-4">
        <div
          className="absolute bottom-0 right-0 w-full h-0.5"
          style={{ backgroundColor: styles.borderColor }}
        />
        <div
          className="absolute bottom-0 right-0 h-full w-0.5"
          style={{ backgroundColor: styles.borderColor }}
        />
      </div>
      
      {/* Scan lines */}
      {variant === 'hologram' && (
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,128,255,0.1) 2px, rgba(0,128,255,0.1) 4px)',
              animation: 'scan-lines 3s linear infinite',
            }}
          />
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10 p-6">
        {children}
      </div>
      
      <style jsx>{`
        @keyframes scan-lines {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
};

interface GlitchCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export const GlitchCard: React.FC<GlitchCardProps> = ({
  children,
  className = '',
  intensity = 1,
}) => {
  const [isGlitching, setIsGlitching] = useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`glitch-card relative overflow-hidden rounded-lg border border-red-500/50 bg-black/80 backdrop-blur-sm ${className} ${
        isGlitching ? 'animate-glitch' : ''
      }`}
      style={{
        '--glitch-intensity': intensity,
      } as React.CSSProperties}
    >
      {/* Glitch layers */}
      {isGlitching && (
        <>
          <div
            className="absolute inset-0 bg-red-500/20 animate-glitch-1"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 25%, 0 25%)' }}
          />
          <div
            className="absolute inset-0 bg-cyan-500/20 animate-glitch-2"
            style={{ clipPath: 'polygon(0 25%, 100% 25%, 100% 50%, 0 50%)' }}
          />
          <div
            className="absolute inset-0 bg-yellow-500/20 animate-glitch-3"
            style={{ clipPath: 'polygon(0 75%, 100% 75%, 100% 100%, 0 100%)' }}
          />
        </>
      )}
      
      {/* Content */}
      <div className="relative z-10 p-6">
        {children}
      </div>
      
      <style jsx>{`
        @keyframes glitch {
          0%, 100% { transform: translateX(0); }
          10% { transform: translateX(calc(var(--glitch-intensity) * -2px)); }
          20% { transform: translateX(calc(var(--glitch-intensity) * 2px)); }
          30% { transform: translateX(calc(var(--glitch-intensity) * -1px)); }
          40% { transform: translateX(calc(var(--glitch-intensity) * 1px)); }
          50% { transform: translateX(calc(var(--glitch-intensity) * -2px)); }
          60% { transform: translateX(calc(var(--glitch-intensity) * 1px)); }
          70% { transform: translateX(0); }
        }
        
        @keyframes glitch-1 {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(calc(var(--glitch-intensity) * 3px)); }
        }
        
        @keyframes glitch-2 {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(calc(var(--glitch-intensity) * -3px)); }
        }
        
        @keyframes glitch-3 {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(calc(var(--glitch-intensity) * 2px)); }
        }
        
        .animate-glitch {
          animation: glitch 0.2s ease-in-out;
        }
        
        .animate-glitch-1 {
          animation: glitch-1 0.2s ease-in-out;
        }
        
        .animate-glitch-2 {
          animation: glitch-2 0.2s ease-in-out;
        }
        
        .animate-glitch-3 {
          animation: glitch-3 0.2s ease-in-out;
        }
      `}</style>
    </div>
  );
};