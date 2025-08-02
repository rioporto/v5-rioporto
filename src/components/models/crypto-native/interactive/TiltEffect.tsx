'use client';

import React, { useState, useRef, useCallback } from 'react';

interface TiltEffectProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  speed?: number;
  glare?: boolean;
  glareColor?: string;
}

export const TiltEffect: React.FC<TiltEffectProps> = ({
  children,
  className = '',
  maxTilt = 20,
  perspective = 1000,
  scale = 1.05,
  speed = 300,
  glare = true,
  glareColor = 'rgba(255, 255, 255, 0.1)',
}) => {
  const [transform, setTransform] = useState('');
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const rect = element.getBoundingClientRect();
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / centerY * maxTilt;
    const rotateY = (centerX - x) / centerX * maxTilt;
    
    const transformString = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
    setTransform(transformString);
    
    // Calculate glare position
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlarePosition({ x: glareX, y: glareY });
  }, [maxTilt, perspective, scale]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform('');
    setIsHovered(false);
  }, []);

  return (
    <div
      ref={elementRef}
      className={`tilt-effect relative ${className}`}
      style={{
        transform,
        transition: isHovered ? 'none' : `transform ${speed}ms ease-out`,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      
      {/* Glare effect */}
      {glare && isHovered && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, ${glareColor} 0%, transparent 50%)`,
            borderRadius: 'inherit',
          }}
        />
      )}
    </div>
  );
};

interface CyberTiltProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  variant?: 'neon' | 'hologram' | 'matrix';
}

export const CyberTilt: React.FC<CyberTiltProps> = ({
  children,
  className = '',
  intensity = 1,
  variant = 'neon',
}) => {
  const [transform, setTransform] = useState('');
  const [glowIntensity, setGlowIntensity] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  const getVariantColors = () => {
    switch (variant) {
      case 'neon':
        return { primary: '#00ffff', secondary: '#ff00ff' };
      case 'hologram':
        return { primary: '#0080ff', secondary: '#8000ff' };
      case 'matrix':
        return { primary: '#00ff00', secondary: '#008000' };
      default:
        return { primary: '#00ffff', secondary: '#ff00ff' };
    }
  };

  const colors = getVariantColors();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const rect = element.getBoundingClientRect();
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / centerY * (15 * intensity);
    const rotateY = (centerX - x) / centerX * (15 * intensity);
    
    const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
    const maxDistance = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));
    const glowLevel = 1 - (distance / maxDistance);
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`);
    setGlowIntensity(glowLevel);
  };

  const handleMouseLeave = () => {
    setTransform('');
    setGlowIntensity(0);
  };

  return (
    <div
      ref={elementRef}
      className={`cyber-tilt relative overflow-hidden rounded-lg border border-opacity-50 ${className}`}
      style={{
        transform,
        transition: transform ? 'none' : 'transform 0.3s ease-out',
        borderColor: colors.primary,
        boxShadow: `0 0 ${20 * glowIntensity}px ${colors.primary}${Math.floor(glowIntensity * 255).toString(16).padStart(2, '0')}`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Cyber grid background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(${colors.primary} 1px, transparent 1px),
            linear-gradient(90deg, ${colors.primary} 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          transform: `scale(${1 + glowIntensity * 0.1})`,
          transition: 'transform 0.1s ease-out',
        }}
      />
      
      {/* Corner markers */}
      <div className="absolute top-0 left-0 w-4 h-4">
        <div className="absolute top-0 left-0 w-full h-0.5" style={{ backgroundColor: colors.primary }} />
        <div className="absolute top-0 left-0 h-full w-0.5" style={{ backgroundColor: colors.primary }} />
      </div>
      <div className="absolute top-0 right-0 w-4 h-4">
        <div className="absolute top-0 right-0 w-full h-0.5" style={{ backgroundColor: colors.primary }} />
        <div className="absolute top-0 right-0 h-full w-0.5" style={{ backgroundColor: colors.primary }} />
      </div>
      <div className="absolute bottom-0 left-0 w-4 h-4">
        <div className="absolute bottom-0 left-0 w-full h-0.5" style={{ backgroundColor: colors.primary }} />
        <div className="absolute bottom-0 left-0 h-full w-0.5" style={{ backgroundColor: colors.primary }} />
      </div>
      <div className="absolute bottom-0 right-0 w-4 h-4">
        <div className="absolute bottom-0 right-0 w-full h-0.5" style={{ backgroundColor: colors.primary }} />
        <div className="absolute bottom-0 right-0 h-full w-0.5" style={{ backgroundColor: colors.primary }} />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

interface ParallaxTiltProps {
  children: React.ReactNode;
  className?: string;
  layers?: Array<{
    content: React.ReactNode;
    depth: number;
  }>;
}

export const ParallaxTilt: React.FC<ParallaxTiltProps> = ({
  children,
  className = '',
  layers = [],
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      className={`parallax-tilt relative ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background layers */}
      {layers.map((layer, index) => (
        <div
          key={index}
          className="absolute inset-0"
          style={{
            transform: `translateX(${mousePosition.x * layer.depth * 20}px) translateY(${mousePosition.y * layer.depth * 20}px)`,
            transition: 'transform 0.1s ease-out',
            zIndex: index,
          }}
        >
          {layer.content}
        </div>
      ))}
      
      {/* Main content */}
      <div
        className="relative z-10"
        style={{
          transform: `perspective(1000px) rotateX(${mousePosition.y * 10}deg) rotateY(${mousePosition.x * -10}deg)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {children}
      </div>
    </div>
  );
};

interface GlitchTiltProps {
  children: React.ReactNode;
  className?: string;
  glitchIntensity?: number;
}

export const GlitchTilt: React.FC<GlitchTiltProps> = ({
  children,
  className = '',
  glitchIntensity = 1,
}) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [transform, setTransform] = useState('');
  const elementRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const rect = element.getBoundingClientRect();
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / centerY * 10;
    const rotateY = (centerX - x) / centerX * 10;
    
    const glitchX = isGlitching ? (Math.random() - 0.5) * glitchIntensity * 5 : 0;
    const glitchY = isGlitching ? (Math.random() - 0.5) * glitchIntensity * 5 : 0;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateX(${glitchX}px) translateY(${glitchY}px)`);
  };

  const handleMouseEnter = () => {
    // Random glitch trigger
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 100);
    }, 2000);

    return () => clearInterval(glitchInterval);
  };

  const handleMouseLeave = () => {
    setTransform('');
    setIsGlitching(false);
  };

  return (
    <div
      ref={elementRef}
      className={`glitch-tilt relative ${className} ${isGlitching ? 'animate-pulse' : ''}`}
      style={{
        transform,
        transition: isGlitching ? 'none' : 'transform 0.1s ease-out',
        filter: isGlitching ? 'hue-rotate(90deg) saturate(150%)' : 'none',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glitch overlay layers */}
      {isGlitching && (
        <>
          <div
            className="absolute inset-0 opacity-70"
            style={{
              transform: `translateX(${(Math.random() - 0.5) * glitchIntensity * 4}px)`,
              filter: 'hue-rotate(90deg)',
              mixBlendMode: 'multiply',
            }}
          >
            {children}
          </div>
          <div
            className="absolute inset-0 opacity-70"
            style={{
              transform: `translateX(${(Math.random() - 0.5) * glitchIntensity * -4}px)`,
              filter: 'hue-rotate(270deg)',
              mixBlendMode: 'screen',
            }}
          >
            {children}
          </div>
        </>
      )}
      
      {/* Main content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};