'use client';

import React, { useState, useEffect } from 'react';

interface LaserBeamProps {
  from?: { x: number; y: number };
  to?: { x: number; y: number };
  color?: string;
  thickness?: number;
  intensity?: number;
  type?: 'straight' | 'curved' | 'zigzag' | 'wave' | 'pulse';
  animation?: 'none' | 'travel' | 'flicker' | 'charge' | 'sweep';
  duration?: number;
  trigger?: boolean;
  onComplete?: () => void;
  glow?: boolean;
  particles?: boolean;
  className?: string;
}

export const LaserBeam: React.FC<LaserBeamProps> = ({
  from = { x: 0, y: 50 },
  to = { x: 100, y: 50 },
  color = '#ff0040',
  thickness = 3,
  intensity = 1,
  type = 'straight',
  animation = 'none',
  duration = 1000,
  trigger = false,
  onComplete,
  glow = true,
  particles = true,
  className = ''
}) => {
  const [isActive, setIsActive] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [flickerState, setFlickerState] = useState(true);

  useEffect(() => {
    if (trigger) {
      setIsActive(true);
      setAnimationProgress(0);
      
      if (animation === 'travel' || animation === 'charge' || animation === 'sweep') {
        const startTime = Date.now();
        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          setAnimationProgress(progress);
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setTimeout(() => {
              setIsActive(false);
              onComplete?.();
            }, 500);
          }
        };
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setIsActive(false);
          onComplete?.();
        }, duration);
      }
    }
  }, [trigger, animation, duration, onComplete]);

  useEffect(() => {
    if (animation === 'flicker' && isActive) {
      const interval = setInterval(() => {
        setFlickerState(prev => Math.random() > 0.2 ? true : !prev);
      }, 80);
      return () => clearInterval(interval);
    }
  }, [animation, isActive]);

  const getBeamPath = () => {
    const distance = Math.sqrt(Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2));
    
    switch (type) {
      case 'curved':
        const midX = (from.x + to.x) / 2;
        const midY = (from.y + to.y) / 2 - distance * 0.1;
        return `M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`;
      
      case 'zigzag':
        const segments = 5;
        let path = `M ${from.x} ${from.y}`;
        for (let i = 1; i <= segments; i++) {
          const x = from.x + (to.x - from.x) * (i / segments);
          const y = from.y + (to.y - from.y) * (i / segments) + (i % 2 === 0 ? 5 : -5);
          path += ` L ${x} ${y}`;
        }
        return path;
      
      case 'wave':
        const waveSegments = 20;
        let wavePath = `M ${from.x} ${from.y}`;
        for (let i = 1; i <= waveSegments; i++) {
          const progress = i / waveSegments;
          const x = from.x + (to.x - from.x) * progress;
          const y = from.y + (to.y - from.y) * progress + Math.sin(progress * Math.PI * 4) * 3;
          wavePath += ` L ${x} ${y}`;
        }
        return wavePath;
      
      case 'pulse':
        const pulseAmplitude = Math.sin(animationProgress * Math.PI * 6) * 2;
        return `M ${from.x} ${from.y + pulseAmplitude} L ${to.x} ${to.y + pulseAmplitude}`;
      
      default: // straight
        return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
    }
  };

  const getAnimationClipPath = () => {
    switch (animation) {
      case 'travel':
        const travelProgress = animationProgress * 100;
        return `inset(0 ${100 - travelProgress}% 0 0)`;
      
      case 'charge':
        const chargeProgress = Math.min(animationProgress * 2, 1);
        return `inset(0 ${100 - chargeProgress * 100}% 0 0)`;
      
      case 'sweep':
        const sweepSize = 20;
        const sweepPos = animationProgress * 100;
        return `inset(0 ${Math.max(0, 100 - sweepPos - sweepSize)}% 0 ${Math.max(0, sweepPos - sweepSize)}%)`;
      
      default:
        return 'none';
    }
  };

  const getOpacity = () => {
    if (animation === 'flicker' && !flickerState) return 0.2;
    if (animation === 'charge') return Math.min(animationProgress * 2, 1) * intensity;
    return intensity;
  };

  if (!isActive) return null;

  return (
    <div className={`fixed inset-0 pointer-events-none z-40 ${className}`}>
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          {/* Glow filter */}
          {glow && (
            <filter id={`laser-glow-${color.replace('#', '')}`}>
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          )}
          
          {/* Gradient for pulse effect */}
          <linearGradient id={`laser-gradient-${color.replace('#', '')}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="50%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="0.2" />
          </linearGradient>
        </defs>
        
        {/* Main beam */}
        <path
          d={getBeamPath()}
          stroke={animation === 'pulse' ? `url(#laser-gradient-${color.replace('#', '')})` : color}
          strokeWidth={thickness}
          fill="none"
          strokeLinecap="round"
          opacity={getOpacity()}
          filter={glow ? `url(#laser-glow-${color.replace('#', '')})` : undefined}
          style={{
            clipPath: getAnimationClipPath(),
          }}
        />
        
        {/* Core beam (brighter) */}
        <path
          d={getBeamPath()}
          stroke={color}
          strokeWidth={Math.max(1, thickness * 0.3)}
          fill="none"
          strokeLinecap="round"
          opacity={getOpacity() * 1.5}
          style={{
            clipPath: getAnimationClipPath(),
            filter: 'brightness(1.5)',
          }}
        />
        
        {/* Outer glow */}
        {glow && (
          <path
            d={getBeamPath()}
            stroke={color}
            strokeWidth={thickness * 2}
            fill="none"
            strokeLinecap="round"
            opacity={getOpacity() * 0.3}
            style={{
              clipPath: getAnimationClipPath(),
              filter: 'blur(3px)',
            }}
          />
        )}
      </svg>
      
      {/* Particles along the beam */}
      {particles && (
        <div className="absolute inset-0">
          {Array.from({ length: 8 }, (_, i) => {
            const progress = (i / 7) * animationProgress;
            const x = from.x + (to.x - from.x) * progress;
            const y = from.y + (to.y - from.y) * progress;
            
            return (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full animate-pulse"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  backgroundColor: color,
                  boxShadow: `0 0 6px ${color}`,
                  opacity: progress > 0 ? getOpacity() : 0,
                  transform: 'translate(-50%, -50%)',
                  animationDelay: `${i * 100}ms`,
                }}
              />
            );
          })}
        </div>
      )}
      
      {/* Impact effect at target */}
      {animationProgress > 0.7 && (
        <div
          className="absolute"
          style={{
            left: `${to.x}%`,
            top: `${to.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Impact flash */}
          <div
            className="w-6 h-6 rounded-full animate-ping"
            style={{
              backgroundColor: color,
              boxShadow: `0 0 20px ${color}`,
            }}
          />
          
          {/* Impact sparks */}
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="absolute w-1 h-4 animate-pulse"
              style={{
                backgroundColor: color,
                transform: `rotate(${i * 60}deg) translate(-50%, -100%)`,
                transformOrigin: 'bottom center',
                opacity: 0.8,
                animationDelay: `${i * 50}ms`,
              }}
            />
          ))}
        </div>
      )}
      
      {/* Charging effect at origin */}
      {animation === 'charge' && animationProgress < 0.5 && (
        <div
          className="absolute"
          style={{
            left: `${from.x}%`,
            top: `${from.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div
            className="w-8 h-8 rounded-full border-2 animate-spin"
            style={{
              borderColor: `${color} transparent ${color} transparent`,
              animationDuration: '0.5s',
            }}
          />
          
          <div
            className="absolute inset-0 rounded-full animate-pulse"
            style={{
              background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
            }}
          />
        </div>
      )}
      
      {/* Screen shake effect for powerful beams */}
      {thickness > 5 && isActive && (
        <div 
          className="fixed inset-0 pointer-events-none animate-pulse"
          style={{
            background: `radial-gradient(circle at ${to.x}% ${to.y}%, ${color}10 0%, transparent 30%)`,
            animationDuration: '0.2s',
          }}
        />
      )}
    </div>
  );
};

export default LaserBeam;