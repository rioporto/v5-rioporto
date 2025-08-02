'use client';

import React, { useState, useEffect, useRef } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  timestamp: number;
  intensity: number;
}

interface CyberTrailsProps {
  followMouse?: boolean;
  color?: string;
  trailLength?: number;
  thickness?: number;
  intensity?: number;
  type?: 'line' | 'dots' | 'sparks' | 'lightning' | 'digital';
  speed?: number;
  glow?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const CyberTrails: React.FC<CyberTrailsProps> = ({
  followMouse = true,
  color = '#00ffff',
  trailLength = 20,
  thickness = 2,
  intensity = 1,
  type = 'line',
  speed = 0.95,
  glow = true,
  className = '',
  children
}) => {
  const [trails, setTrails] = useState<TrailPoint[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  // Track mouse movement
  useEffect(() => {
    if (!followMouse) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      setMousePos({ x, y });
      setIsMouseMoving(true);
      
      // Add new trail point
      setTrails(prev => [
        ...prev,
        {
          x,
          y,
          timestamp: Date.now(),
          intensity: Math.random() * 0.5 + 0.5
        }
      ].slice(-trailLength));
    };

    const handleMouseLeave = () => {
      setIsMouseMoving(false);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [followMouse, trailLength]);

  // Animate trails
  useEffect(() => {
    const animate = () => {
      setTrails(prev => {
        const now = Date.now();
        return prev
          .map(trail => ({
            ...trail,
            intensity: trail.intensity * speed
          }))
          .filter(trail => now - trail.timestamp < 2000 && trail.intensity > 0.01);
      });
      
      if (isMouseMoving || trails.length > 0) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    if (isMouseMoving || trails.length > 0) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMouseMoving, trails.length, speed]);

  const renderLineTrail = () => {
    if (trails.length < 2) return null;

    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="trailGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0" />
            <stop offset="100%" stopColor={color} stopOpacity="1" />
          </linearGradient>
          {glow && (
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          )}
        </defs>
        
        <path
          d={trails.reduce((path, point, index) => {
            if (index === 0) return `M ${point.x} ${point.y}`;
            return `${path} L ${point.x} ${point.y}`;
          }, '')}
          stroke="url(#trailGradient)"
          strokeWidth={thickness}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={glow ? "url(#glow)" : undefined}
          opacity={intensity}
        />
      </svg>
    );
  };

  const renderDotTrail = () => {
    return (
      <>
        {trails.map((point, index) => (
          <div
            key={`${point.timestamp}-${index}`}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
              width: `${thickness * 2}px`,
              height: `${thickness * 2}px`,
              backgroundColor: color,
              opacity: point.intensity * intensity,
              transform: 'translate(-50%, -50%)',
              boxShadow: glow ? `0 0 ${thickness * 3}px ${color}` : 'none',
            }}
          />
        ))}
      </>
    );
  };

  const renderSparkTrail = () => {
    return (
      <>
        {trails.map((point, index) => (
          <div
            key={`${point.timestamp}-${index}`}
            className="absolute pointer-events-none"
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
              transform: 'translate(-50%, -50%)',
              opacity: point.intensity * intensity,
            }}
          >
            {/* Main spark */}
            <div
              className="w-1 h-1 rounded-full animate-pulse"
              style={{
                backgroundColor: color,
                boxShadow: glow ? `0 0 ${thickness * 4}px ${color}` : 'none',
              }}
            />
            
            {/* Spark rays */}
            {Array.from({ length: 4 }, (_, i) => (
              <div
                key={i}
                className="absolute w-px bg-current"
                style={{
                  height: `${thickness * 3}px`,
                  backgroundColor: color,
                  transform: `rotate(${i * 45}deg) translate(-50%, -50%)`,
                  transformOrigin: 'center',
                  opacity: point.intensity * 0.8,
                }}
              />
            ))}
          </div>
        ))}
      </>
    );
  };

  const renderLightningTrail = () => {
    if (trails.length < 2) return null;

    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          {glow && (
            <filter id="lightning-glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          )}
        </defs>
        
        {trails.slice(1).map((point, index) => {
          const prevPoint = trails[index];
          const jitter = Math.random() * 2 - 1;
          
          return (
            <path
              key={`${point.timestamp}-${index}`}
              d={`M ${prevPoint.x} ${prevPoint.y} Q ${(prevPoint.x + point.x) / 2 + jitter} ${(prevPoint.y + point.y) / 2 + jitter} ${point.x} ${point.y}`}
              stroke={color}
              strokeWidth={thickness}
              fill="none"
              strokeLinecap="round"
              filter={glow ? "url(#lightning-glow)" : undefined}
              opacity={point.intensity * intensity}
            />
          );
        })}
      </svg>
    );
  };

  const renderDigitalTrail = () => {
    return (
      <>
        {trails.map((point, index) => (
          <div
            key={`${point.timestamp}-${index}`}
            className="absolute pointer-events-none font-mono text-xs select-none"
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
              color: color,
              opacity: point.intensity * intensity,
              transform: 'translate(-50%, -50%)',
              textShadow: glow ? `0 0 ${thickness * 2}px ${color}` : 'none',
              filter: 'blur(0.5px)',
            }}
          >
            {Math.random() > 0.5 ? '1' : '0'}
          </div>
        ))}
        
        {/* Additional digital effects */}
        {trails.length > 0 && (
          <div
            className="absolute pointer-events-none"
            style={{
              left: `${mousePos.x}%`,
              top: `${mousePos.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="grid grid-cols-3 gap-1 font-mono text-xs opacity-60">
              {Array.from({ length: 9 }, (_, i) => (
                <span
                  key={i}
                  style={{
                    color: color,
                    textShadow: glow ? `0 0 5px ${color}` : 'none',
                  }}
                >
                  {Math.random() > 0.5 ? '1' : '0'}
                </span>
              ))}
            </div>
          </div>
        )}
      </>
    );
  };

  const renderTrail = () => {
    switch (type) {
      case 'line':
        return renderLineTrail();
      case 'dots':
        return renderDotTrail();
      case 'sparks':
        return renderSparkTrail();
      case 'lightning':
        return renderLightningTrail();
      case 'digital':
        return renderDigitalTrail();
      default:
        return renderLineTrail();
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
    >
      {children}
      
      {/* Trail container */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {renderTrail()}
        
        {/* Cursor glow effect */}
        {isMouseMoving && glow && (
          <div
            className="absolute w-6 h-6 rounded-full pointer-events-none"
            style={{
              left: `${mousePos.x}%`,
              top: `${mousePos.y}%`,
              transform: 'translate(-50%, -50%)',
              background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
              filter: 'blur(4px)',
            }}
          />
        )}
        
        {/* Additional cyber effects */}
        {type === 'digital' && isMouseMoving && (
          <div className="absolute inset-0 opacity-20">
            <div 
              className="absolute inset-0"
              style={{
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.1) 2px, rgba(0,255,255,0.1) 4px)',
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CyberTrails;