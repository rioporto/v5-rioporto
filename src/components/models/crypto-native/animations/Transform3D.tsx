'use client';

import React, { useState, useRef } from 'react';

interface Transform3DProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glowEffect?: boolean;
  perspective?: number;
}

export const Transform3D: React.FC<Transform3DProps> = ({
  children,
  className = '',
  intensity = 20,
  glowEffect = false,
  perspective = 1000,
}) => {
  const [transform, setTransform] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / centerY * intensity;
    const rotateY = (centerX - x) / centerX * intensity;
    
    setTransform(`perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  };

  const handleMouseLeave = () => {
    setTransform('');
  };

  return (
    <div
      ref={ref}
      className={`transform-3d-container transition-transform duration-300 ${className} ${
        glowEffect ? 'hover:drop-shadow-[0_0_20px_rgba(0,255,255,0.5)]' : ''
      }`}
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

interface CyberCubeProps {
  size?: number;
  className?: string;
  autoRotate?: boolean;
}

export const CyberCube: React.FC<CyberCubeProps> = ({
  size = 100,
  className = '',
  autoRotate = false,
}) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (autoRotate) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientY - rect.top - rect.height / 2) / 5;
    const y = (e.clientX - rect.left - rect.width / 2) / 5;
    setRotation({ x, y });
  };

  const handleMouseLeave = () => {
    if (!autoRotate) {
      setRotation({ x: 0, y: 0 });
    }
  };

  const cubeStyle = {
    width: size,
    height: size,
    transform: autoRotate 
      ? `rotateX(45deg) rotateY(45deg)` 
      : `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
    transformStyle: 'preserve-3d' as const,
    animation: autoRotate ? 'spin-3d 10s linear infinite' : 'none',
  };

  const faceStyle = {
    position: 'absolute' as const,
    width: size,
    height: size,
    border: '1px solid #00ffff',
    background: 'rgba(0, 255, 255, 0.1)',
    backdropFilter: 'blur(5px)',
  };

  return (
    <div
      className={`cyber-cube-container ${className}`}
      style={{ perspective: '1000px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div style={cubeStyle}>
        {/* Front */}
        <div style={{ ...faceStyle, transform: `translateZ(${size/2}px)` }} />
        {/* Back */}
        <div style={{ ...faceStyle, transform: `translateZ(-${size/2}px) rotateY(180deg)` }} />
        {/* Right */}
        <div style={{ ...faceStyle, transform: `rotateY(90deg) translateZ(${size/2}px)` }} />
        {/* Left */}
        <div style={{ ...faceStyle, transform: `rotateY(-90deg) translateZ(${size/2}px)` }} />
        {/* Top */}
        <div style={{ ...faceStyle, transform: `rotateX(90deg) translateZ(${size/2}px)` }} />
        {/* Bottom */}
        <div style={{ ...faceStyle, transform: `rotateX(-90deg) translateZ(${size/2}px)` }} />
      </div>
      
      <style jsx>{`
        @keyframes spin-3d {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          25% { transform: rotateX(90deg) rotateY(90deg); }
          50% { transform: rotateX(180deg) rotateY(180deg); }
          75% { transform: rotateX(270deg) rotateY(270deg); }
          100% { transform: rotateX(360deg) rotateY(360deg); }
        }
      `}</style>
    </div>
  );
};

interface HologramCardProps {
  children: React.ReactNode;
  className?: string;
}

export const HologramCard: React.FC<HologramCardProps> = ({
  children,
  className = '',
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className={`hologram-card relative overflow-hidden rounded-lg border border-cyan-500/30 bg-black/50 backdrop-blur-sm transition-all duration-300 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'perspective(1000px) rotateX(5deg) rotateY(5deg)' : 'none',
      }}
    >
      {/* Hologram effect overlay */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 255, 255, 0.2) 0%, transparent 50%)`,
        }}
      />
      
      {/* Scan lines */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.1) 2px, rgba(0,255,255,0.1) 4px)',
            animation: 'scan-lines 2s linear infinite',
          }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
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