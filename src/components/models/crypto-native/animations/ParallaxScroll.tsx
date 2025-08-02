'use client';

import React, { useEffect, useState } from 'react';

interface ParallaxScrollProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  reverse?: boolean;
}

export const ParallaxScroll: React.FC<ParallaxScrollProps> = ({
  children,
  speed = 0.5,
  className = '',
  reverse = false,
}) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const transform = reverse 
    ? `translateY(${scrollY * speed}px)` 
    : `translateY(${-scrollY * speed}px)`;

  return (
    <div
      className={`parallax-container ${className}`}
      style={{
        transform,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed: number;
  className?: string;
  zIndex?: number;
}

export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  children,
  speed,
  className = '',
  zIndex = 1,
}) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`parallax-layer ${className}`}
      style={{
        transform: `translateY(${scrollY * speed}px)`,
        zIndex,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};

interface CyberParallaxProps {
  children: React.ReactNode;
  className?: string;
}

export const CyberParallax: React.FC<CyberParallaxProps> = ({
  children,
  className = '',
}) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background cyber grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          transform: `translateY(${scrollY * 0.2}px)`,
          willChange: 'transform',
        }}
      />
      
      {/* Neon lines */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
          willChange: 'transform',
        }}
      >
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-60" />
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-60" />
      </div>
      
      {/* Content */}
      <div
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  );
};