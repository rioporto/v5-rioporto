'use client';

import React, { useState, useRef } from 'react';

interface HoverRevealProps {
  children: React.ReactNode;
  revealContent: React.ReactNode;
  className?: string;
  direction?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  duration?: number;
}

export const HoverReveal: React.FC<HoverRevealProps> = ({
  children,
  revealContent,
  className = '',
  direction = 'center',
  duration = 300,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getTransformOrigin = () => {
    switch (direction) {
      case 'top': return 'top';
      case 'bottom': return 'bottom';
      case 'left': return 'left';
      case 'right': return 'right';
      case 'center': return 'center';
      default: return 'center';
    }
  };

  const getInitialTransform = () => {
    switch (direction) {
      case 'top': return 'translateY(-100%)';
      case 'bottom': return 'translateY(100%)';
      case 'left': return 'translateX(-100%)';
      case 'right': return 'translateX(100%)';
      case 'center': return 'scale(0)';
      default: return 'scale(0)';
    }
  };

  return (
    <div
      className={`hover-reveal relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Original content */}
      <div
        className="transition-all"
        style={{
          transform: isHovered ? 'scale(0.95)' : 'scale(1)',
          opacity: isHovered ? 0.3 : 1,
          transitionDuration: `${duration}ms`,
        }}
      >
        {children}
      </div>
      
      {/* Reveal content */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transform: isHovered ? 'translateX(0) translateY(0) scale(1)' : getInitialTransform(),
          transformOrigin: getTransformOrigin(),
          opacity: isHovered ? 1 : 0,
          transitionDuration: `${duration}ms`,
          transitionProperty: 'transform, opacity',
        }}
      >
        {revealContent}
      </div>
    </div>
  );
};

interface CyberRevealProps {
  children: React.ReactNode;
  revealContent: React.ReactNode;
  className?: string;
  effect?: 'dissolve' | 'glitch' | 'matrix';
}

export const CyberReveal: React.FC<CyberRevealProps> = ({
  children,
  revealContent,
  className = '',
  effect = 'dissolve',
}) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const getEffectStyles = () => {
    switch (effect) {
      case 'dissolve':
        return {
          mask: isRevealed 
            ? 'radial-gradient(circle, black 60%, transparent 100%)' 
            : 'radial-gradient(circle, transparent 60%, black 100%)',
          transition: 'mask 0.5s ease-in-out',
        };
      case 'glitch':
        return {
          clipPath: isRevealed 
            ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' 
            : 'polygon(50% 0, 50% 0, 50% 100%, 50% 100%)',
          transition: 'clip-path 0.3s ease-in-out',
        };
      case 'matrix':
        return {
          transform: isRevealed ? 'translateY(0)' : 'translateY(100%)',
          opacity: isRevealed ? 1 : 0,
          transition: 'transform 0.4s ease-out, opacity 0.4s ease-out',
        };
      default:
        return {};
    }
  };

  return (
    <div
      className={`cyber-reveal relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsRevealed(true)}
      onMouseLeave={() => setIsRevealed(false)}
    >
      {/* Original content */}
      <div className={isRevealed ? 'opacity-0' : 'opacity-100'} style={{ transition: 'opacity 0.3s' }}>
        {children}
      </div>
      
      {/* Reveal content */}
      <div
        className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        style={getEffectStyles()}
      >
        {revealContent}
      </div>
    </div>
  );
};

interface SlideRevealProps {
  children: React.ReactNode;
  revealContent: React.ReactNode;
  className?: string;
  slideDirection?: 'horizontal' | 'vertical';
}

export const SlideReveal: React.FC<SlideRevealProps> = ({
  children,
  revealContent,
  className = '',
  slideDirection = 'horizontal',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`slide-reveal relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Original content */}
      <div
        className="transition-transform duration-300 ease-out"
        style={{
          transform: isHovered 
            ? slideDirection === 'horizontal' 
              ? 'translateX(-100%)' 
              : 'translateY(-100%)'
            : 'translate(0)',
        }}
      >
        {children}
      </div>
      
      {/* Reveal content */}
      <div
        className="absolute inset-0"
        style={{
          transform: isHovered 
            ? 'translate(0)' 
            : slideDirection === 'horizontal' 
              ? 'translateX(100%)' 
              : 'translateY(100%)',
          transition: 'transform 0.3s ease-out',
        }}
      >
        {revealContent}
      </div>
    </div>
  );
};

interface PixelRevealProps {
  children: React.ReactNode;
  revealContent: React.ReactNode;
  className?: string;
  pixelSize?: number;
}

export const PixelReveal: React.FC<PixelRevealProps> = ({
  children,
  revealContent,
  className = '',
  pixelSize = 20,
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [revealProgress, setRevealProgress] = useState(0);

  React.useEffect(() => {
    if (isRevealed) {
      const interval = setInterval(() => {
        setRevealProgress(prev => {
          if (prev >= 1) {
            clearInterval(interval);
            return 1;
          }
          return prev + 0.05;
        });
      }, 20);
      return () => clearInterval(interval);
    } else {
      setRevealProgress(0);
    }
  }, [isRevealed]);

  const generatePixelMask = () => {
    const pixels = [];
    const cols = Math.ceil(100 / (pixelSize / 4));
    const rows = Math.ceil(100 / (pixelSize / 4));
    
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const distance = Math.sqrt(Math.pow(x - cols/2, 2) + Math.pow(y - rows/2, 2));
        const maxDistance = Math.sqrt(Math.pow(cols/2, 2) + Math.pow(rows/2, 2));
        const normalizedDistance = distance / maxDistance;
        
        if (normalizedDistance <= revealProgress) {
          pixels.push(`${x * (pixelSize/4)}% ${y * (pixelSize/4)}% ${pixelSize/4}% ${pixelSize/4}%`);
        }
      }
    }
    
    return pixels.length > 0 ? `polygon(${pixels.map(p => `evenodd, ${p}`).join(', ')})` : 'polygon(0 0, 0 0, 0 0)';
  };

  return (
    <div
      className={`pixel-reveal relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsRevealed(true)}
      onMouseLeave={() => setIsRevealed(false)}
    >
      {/* Original content */}
      <div className={isRevealed ? 'opacity-30' : 'opacity-100'} style={{ transition: 'opacity 0.5s' }}>
        {children}
      </div>
      
      {/* Reveal content */}
      <div
        className="absolute inset-0"
        style={{
          opacity: revealProgress,
          background: 'rgba(0, 255, 255, 0.1)',
          backdropFilter: 'blur(2px)',
        }}
      >
        <div className="flex items-center justify-center h-full">
          {revealContent}
        </div>
      </div>
    </div>
  );
};

interface HologramRevealProps {
  children: React.ReactNode;
  revealContent: React.ReactNode;
  className?: string;
}

export const HologramReveal: React.FC<HologramRevealProps> = ({
  children,
  revealContent,
  className = '',
}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className={`hologram-reveal relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      {/* Original content */}
      <div
        className="transition-all duration-500"
        style={{
          opacity: isActive ? 0 : 1,
          transform: isActive ? 'scale(0.95) rotateX(10deg)' : 'scale(1) rotateX(0deg)',
          filter: isActive ? 'blur(2px)' : 'blur(0px)',
        }}
      >
        {children}
      </div>
      
      {/* Hologram reveal */}
      <div
        className="absolute inset-0"
        style={{
          opacity: isActive ? 1 : 0,
          transform: isActive ? 'scale(1) rotateX(0deg)' : 'scale(1.05) rotateX(-10deg)',
          transition: 'all 0.5s ease-out',
          background: 'linear-gradient(135deg, rgba(0,255,255,0.1) 0%, rgba(0,128,255,0.1) 100%)',
          backdropFilter: 'blur(5px)',
        }}
      >
        {/* Scan lines */}
        <div className="absolute inset-0 opacity-50">
          <div
            className="absolute inset-0"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.2) 2px, rgba(0,255,255,0.2) 4px)',
              animation: isActive ? 'scan-lines 2s linear infinite' : 'none',
            }}
          />
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          {revealContent}
        </div>
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