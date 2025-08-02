'use client';

import React, { useState, useEffect } from 'react';

interface Wave {
  id: number;
  radius: number;
  opacity: number;
  thickness: number;
  speed: number;
  maxRadius: number;
}

interface PulseWaveProps {
  trigger?: boolean;
  origin?: { x: number; y: number };
  color?: string;
  waveCount?: number;
  maxRadius?: number;
  speed?: number;
  intensity?: number;
  type?: 'circular' | 'square' | 'diamond' | 'star' | 'hexagon';
  style?: 'solid' | 'dashed' | 'dotted' | 'gradient' | 'electric';
  duration?: number;
  onComplete?: () => void;
  className?: string;
}

export const PulseWave: React.FC<PulseWaveProps> = ({
  trigger = false,
  origin = { x: 50, y: 50 },
  color = '#00ff41',
  waveCount = 3,
  maxRadius = 50,
  speed = 2,
  intensity = 1,
  type = 'circular',
  style = 'solid',
  duration = 2000,
  onComplete,
  className = ''
}) => {
  const [waves, setWaves] = useState<Wave[]>([]);
  const [isActive, setIsActive] = useState(false);

  const createWave = (index: number): Wave => {
    return {
      id: Date.now() + index,
      radius: 0,
      opacity: intensity,
      thickness: 3 - (index * 0.5),
      speed: speed * (1 + index * 0.2),
      maxRadius: maxRadius + (index * 5)
    };
  };

  const startPulse = () => {
    setIsActive(true);
    
    // Create waves with staggered timing
    Array.from({ length: waveCount }, (_, i) => {
      setTimeout(() => {
        setWaves(prev => [...prev, createWave(i)]);
      }, i * 200);
    });
    
    // Clean up after duration
    setTimeout(() => {
      setIsActive(false);
      setWaves([]);
      onComplete?.();
    }, duration);
  };

  useEffect(() => {
    if (trigger) {
      startPulse();
    }
  }, [trigger]);

  useEffect(() => {
    if (!isActive) return;
    
    const interval = setInterval(() => {
      setWaves(prevWaves => 
        prevWaves.map(wave => {
          const newRadius = wave.radius + wave.speed;
          const radiusProgress = newRadius / wave.maxRadius;
          
          return {
            ...wave,
            radius: newRadius,
            opacity: wave.opacity * (1 - radiusProgress * 0.8)
          };
        }).filter(wave => wave.radius < wave.maxRadius && wave.opacity > 0.01)
      );
    }, 50);
    
    return () => clearInterval(interval);
  }, [isActive]);

  const getWaveElement = (wave: Wave) => {
    const size = wave.radius * 2;
    const waveStyle = {
      width: `${size}%`,
      height: `${size}%`,
      left: `${origin.x}%`,
      top: `${origin.y}%`,
      transform: 'translate(-50%, -50%)',
      opacity: wave.opacity,
    };

    const borderStyle = (() => {
      switch (style) {
        case 'dashed':
          return `${wave.thickness}px dashed ${color}`;
        case 'dotted':
          return `${wave.thickness}px dotted ${color}`;
        case 'gradient':
          return `${wave.thickness}px solid transparent`;
        case 'electric':
          return `${wave.thickness}px solid ${color}`;
        default:
          return `${wave.thickness}px solid ${color}`;
      }
    })();

    const boxShadow = (() => {
      if (style === 'electric') {
        return `0 0 ${wave.thickness * 3}px ${color}, inset 0 0 ${wave.thickness * 2}px ${color}`;
      }
      if (intensity > 0.7) {
        return `0 0 ${wave.thickness * 2}px ${color}`;
      }
      return 'none';
    })();

    const background = style === 'gradient' 
      ? `linear-gradient(45deg, transparent 0%, ${color}20 50%, transparent 100%)`
      : 'transparent';

    switch (type) {
      case 'square':
        return (
          <div
            key={wave.id}
            className="absolute border transition-opacity duration-100"
            style={{
              ...waveStyle,
              border: borderStyle,
              boxShadow,
              background,
            }}
          />
        );
      
      case 'diamond':
        return (
          <div
            key={wave.id}
            className="absolute border transition-opacity duration-100"
            style={{
              ...waveStyle,
              border: borderStyle,
              boxShadow,
              background,
              transform: 'translate(-50%, -50%) rotate(45deg)',
            }}
          />
        );
      
      case 'star':
        return (
          <div
            key={wave.id}
            className="absolute transition-opacity duration-100"
            style={waveStyle}
          >
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <path
                d="M50,10 L60,35 L85,35 L67,52 L73,77 L50,62 L27,77 L33,52 L15,35 L40,35 Z"
                fill="none"
                stroke={color}
                strokeWidth={wave.thickness}
                style={{ filter: `drop-shadow(0 0 ${wave.thickness * 2}px ${color})` }}
              />
            </svg>
          </div>
        );
      
      case 'hexagon':
        return (
          <div
            key={wave.id}
            className="absolute transition-opacity duration-100"
            style={waveStyle}
          >
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <path
                d="M25,50 L37.5,25 L62.5,25 L75,50 L62.5,75 L37.5,75 Z"
                fill="none"
                stroke={color}
                strokeWidth={wave.thickness}
                style={{ filter: `drop-shadow(0 0 ${wave.thickness * 2}px ${color})` }}
              />
            </svg>
          </div>
        );
      
      default: // circular
        return (
          <div
            key={wave.id}
            className="absolute rounded-full border transition-opacity duration-100"
            style={{
              ...waveStyle,
              border: borderStyle,
              boxShadow,
              background,
            }}
          />
        );
    }
  };

  const getRippleEffect = () => {
    if (style !== 'electric') return null;
    
    return waves.map(wave => (
      <div
        key={`ripple-${wave.id}`}
        className="absolute rounded-full"
        style={{
          width: `${wave.radius * 2 + 10}%`,
          height: `${wave.radius * 2 + 10}%`,
          left: `${origin.x}%`,
          top: `${origin.y}%`,
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, ${color}10 0%, ${color}05 50%, transparent 70%)`,
          opacity: wave.opacity * 0.5,
        }}
      />
    ));
  };

  if (!isActive || waves.length === 0) return null;

  return (
    <div className={`fixed inset-0 pointer-events-none z-40 overflow-hidden ${className}`}>
      {/* Ripple effects */}
      {getRippleEffect()}
      
      {/* Main waves */}
      {waves.map(getWaveElement)}
      
      {/* Central pulse point */}
      <div
        className="absolute w-3 h-3 rounded-full animate-pulse"
        style={{
          left: `${origin.x}%`,
          top: `${origin.y}%`,
          backgroundColor: color,
          boxShadow: `0 0 15px ${color}`,
          transform: 'translate(-50%, -50%)',
          opacity: intensity,
        }}
      />
      
      {/* Electric style additional effects */}
      {style === 'electric' && (
        <>
          {/* Electric sparks */}
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={`spark-${i}`}
              className="absolute w-1 h-6 animate-pulse"
              style={{
                left: `${origin.x}%`,
                top: `${origin.y}%`,
                backgroundColor: color,
                boxShadow: `0 0 8px ${color}`,
                transform: `translate(-50%, -50%) rotate(${i * 60}deg)`,
                transformOrigin: 'center',
                opacity: intensity * 0.8,
                animationDelay: `${i * 100}ms`,
              }}
            />
          ))}
          
          {/* Electric field lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            {Array.from({ length: 8 }, (_, i) => {
              const angle = (i / 8) * Math.PI * 2;
              const x1 = origin.x + Math.cos(angle) * 5;
              const y1 = origin.y + Math.sin(angle) * 5;
              const x2 = origin.x + Math.cos(angle) * 15;
              const y2 = origin.y + Math.sin(angle) * 15;
              
              return (
                <line
                  key={`field-${i}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={color}
                  strokeWidth="0.5"
                  opacity={intensity * 0.6}
                  style={{
                    filter: `drop-shadow(0 0 3px ${color})`,
                    animation: 'pulse 0.5s ease-in-out infinite',
                    animationDelay: `${i * 50}ms`
                  }}
                />
              );
            })}
          </svg>
        </>
      )}
      
      {/* Screen flash for high intensity */}
      {intensity > 0.8 && waves.some(w => w.radius < 10) && (
        <div 
          className="fixed inset-0 pointer-events-none animate-pulse"
          style={{
            background: `radial-gradient(circle at ${origin.x}% ${origin.y}%, ${color}08 0%, transparent 40%)`,
            animationDuration: '0.2s',
          }}
        />
      )}
    </div>
  );
};

export default PulseWave;