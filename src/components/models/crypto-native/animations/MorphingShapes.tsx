'use client';

import React, { useState, useEffect } from 'react';

interface MorphingShapeProps {
  className?: string;
  colors?: string[];
  speed?: number;
}

export const MorphingBlob: React.FC<MorphingShapeProps> = ({
  className = '',
  colors = ['#00ffff', '#ff00ff', '#ffff00'],
  speed = 3000,
}) => {
  const [currentShape, setCurrentShape] = useState(0);

  const shapes = [
    'M50,10 C70,10 90,30 90,50 C90,70 70,90 50,90 C30,90 10,70 10,50 C10,30 30,10 50,10 Z',
    'M50,5 C75,5 95,25 95,50 C95,75 75,95 50,95 C25,95 5,75 5,50 C5,25 25,5 50,5 Z',
    'M50,15 C65,15 85,25 85,50 C85,75 65,85 50,85 C35,85 15,75 15,50 C15,25 35,15 50,15 Z',
    'M50,8 C78,8 92,22 92,50 C92,78 78,92 50,92 C22,92 8,78 8,50 C8,22 22,8 50,8 Z',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentShape((prev) => (prev + 1) % shapes.length);
    }, speed);

    return () => clearInterval(interval);
  }, [shapes.length, speed]);

  return (
    <div className={`morphing-blob ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="morphing-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors[0]} />
            <stop offset="50%" stopColor={colors[1]} />
            <stop offset="100%" stopColor={colors[2]} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <path
          d={shapes[currentShape]}
          fill="url(#morphing-gradient)"
          filter="url(#glow)"
          className="transition-all duration-1000 ease-in-out"
        />
      </svg>
    </div>
  );
};

interface CyberPolygonProps {
  sides?: number;
  className?: string;
  autoMorph?: boolean;
}

export const CyberPolygon: React.FC<CyberPolygonProps> = ({
  sides = 6,
  className = '',
  autoMorph = true,
}) => {
  const [currentSides, setCurrentSides] = useState(sides);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (autoMorph) {
      const interval = setInterval(() => {
        setCurrentSides(prev => {
          const next = prev >= 8 ? 3 : prev + 1;
          return next;
        });
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [autoMorph]);

  const generatePolygon = (sides: number) => {
    const points = [];
    const centerX = 50;
    const centerY = 50;
    const radius = 40;

    for (let i = 0; i < sides; i++) {
      const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      points.push(`${x},${y}`);
    }

    return points.join(' ');
  };

  return (
    <div
      className={`cyber-polygon ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="cyber-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00ffff" />
            <stop offset="100%" stopColor="#ff00ff" />
          </linearGradient>
        </defs>
        
        <polygon
          points={generatePolygon(currentSides)}
          fill="none"
          stroke="url(#cyber-gradient)"
          strokeWidth="2"
          className={`transition-all duration-1000 ease-in-out ${
            isHovered ? 'drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]' : ''
          }`}
          style={{
            filter: isHovered ? 'drop-shadow(0 0 10px rgba(0,255,255,0.8))' : 'none',
          }}
        />
        
        {/* Inner glow effect */}
        <polygon
          points={generatePolygon(currentSides)}
          fill="rgba(0,255,255,0.1)"
          className="transition-all duration-1000 ease-in-out"
        />
      </svg>
    </div>
  );
};

interface FluidShapeProps {
  className?: string;
  complexity?: number;
}

export const FluidShape: React.FC<FluidShapeProps> = ({
  className = '',
  complexity = 5,
}) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => prev + 0.1);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const generateFluidPath = () => {
    const points = [];
    const centerX = 50;
    const centerY = 50;
    const baseRadius = 30;

    for (let i = 0; i <= 360; i += 10) {
      const angle = (i * Math.PI) / 180;
      const noise = Math.sin(angle * complexity + time) * 10;
      const radius = baseRadius + noise;
      
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      if (i === 0) {
        points.push(`M ${x} ${y}`);
      } else {
        points.push(`L ${x} ${y}`);
      }
    }
    
    points.push('Z');
    return points.join(' ');
  };

  return (
    <div className={`fluid-shape ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
      >
        <defs>
          <radialGradient id="fluid-gradient">
            <stop offset="0%" stopColor="rgba(0,255,255,0.8)" />
            <stop offset="50%" stopColor="rgba(255,0,255,0.6)" />
            <stop offset="100%" stopColor="rgba(255,255,0,0.4)" />
          </radialGradient>
        </defs>
        
        <path
          d={generateFluidPath()}
          fill="url(#fluid-gradient)"
          className="transition-all duration-100 ease-out"
        />
      </svg>
    </div>
  );
};

interface GeometricMorphProps {
  shapes?: string[];
  className?: string;
  duration?: number;
}

export const GeometricMorph: React.FC<GeometricMorphProps> = ({
  shapes = ['circle', 'square', 'triangle', 'hexagon'],
  className = '',
  duration = 2000,
}) => {
  const [currentShape, setCurrentShape] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentShape(prev => (prev + 1) % shapes.length);
    }, duration);

    return () => clearInterval(interval);
  }, [shapes.length, duration]);

  const getShapePath = (shape: string) => {
    switch (shape) {
      case 'circle':
        return 'M50,10 A40,40 0 1,1 49.99,10 Z';
      case 'square':
        return 'M15,15 L85,15 L85,85 L15,85 Z';
      case 'triangle':
        return 'M50,10 L85,85 L15,85 Z';
      case 'hexagon':
        return 'M50,10 L80,30 L80,70 L50,90 L20,70 L20,30 Z';
      default:
        return 'M50,10 A40,40 0 1,1 49.99,10 Z';
    }
  };

  return (
    <div className={`geometric-morph ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="geometric-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00ffff" />
            <stop offset="50%" stopColor="#ff00ff" />
            <stop offset="100%" stopColor="#ffff00" />
          </linearGradient>
        </defs>
        
        <path
          d={getShapePath(shapes[currentShape])}
          fill="url(#geometric-gradient)"
          opacity="0.8"
          className="transition-all duration-1000 ease-in-out"
        />
        
        {/* Outline */}
        <path
          d={getShapePath(shapes[currentShape])}
          fill="none"
          stroke="#00ffff"
          strokeWidth="2"
          className="transition-all duration-1000 ease-in-out"
        />
      </svg>
    </div>
  );
};