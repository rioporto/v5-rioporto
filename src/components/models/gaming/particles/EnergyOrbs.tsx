'use client';

import React, { useEffect, useState } from 'react';

interface EnergyOrb {
  id: number;
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  color: string;
  intensity: number;
  pulsePhase: number;
  trailPoints: { x: number; y: number; opacity: number }[];
  energy: number;
  maxEnergy: number;
  type: 'plasma' | 'electric' | 'cosmic' | 'nuclear';
}

interface EnergyOrbsProps {
  count?: number;
  colors?: string[];
  speed?: number;
  size?: { min: number; max: number };
  intensity?: number;
  trails?: boolean;
  collision?: boolean;
  attraction?: boolean;
  className?: string;
}

export const EnergyOrbs: React.FC<EnergyOrbsProps> = ({
  count = 12,
  colors = ['#00ffff', '#ff0080', '#80ff00', '#ff8000', '#8000ff', '#ff0040'],
  speed = 1,
  size = { min: 20, max: 40 },
  intensity = 1,
  trails = true,
  collision = true,
  attraction = false,
  className = ''
}) => {
  const [orbs, setOrbs] = useState<EnergyOrb[]>([]);

  const createOrb = (index: number): EnergyOrb => {
    const orbSize = Math.random() * (size.max - size.min) + size.min;
    const orbType = ['plasma', 'electric', 'cosmic', 'nuclear'][Math.floor(Math.random() * 4)] as any;
    
    return {
      id: index,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: orbSize,
      vx: (Math.random() - 0.5) * speed * 2,
      vy: (Math.random() - 0.5) * speed * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      intensity: 0.7 + Math.random() * 0.3,
      pulsePhase: Math.random() * Math.PI * 2,
      trailPoints: [],
      energy: 100,
      maxEnergy: 100,
      type: orbType
    };
  };

  useEffect(() => {
    const newOrbs = Array.from({ length: count }, (_, i) => createOrb(i));
    setOrbs(newOrbs);
  }, [count]);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrbs(prevOrbs => {
        return prevOrbs.map(orb => {
          let newX = orb.x + orb.vx;
          let newY = orb.y + orb.vy;
          let newVx = orb.vx;
          let newVy = orb.vy;

          // Bounce off edges
          if (newX <= 0 || newX >= 100) {
            newVx = -newVx;
            newX = Math.max(0, Math.min(100, newX));
          }
          if (newY <= 0 || newY >= 100) {
            newVy = -newVy;
            newY = Math.max(0, Math.min(100, newY));
          }

          // Collision detection
          if (collision) {
            prevOrbs.forEach(otherOrb => {
              if (otherOrb.id !== orb.id) {
                const dx = newX - otherOrb.x;
                const dy = newY - otherOrb.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const minDistance = (orb.size + otherOrb.size) / 20; // Convert to percentage

                if (distance < minDistance) {
                  // Simple elastic collision
                  const angle = Math.atan2(dy, dx);
                  newVx = Math.cos(angle) * speed;
                  newVy = Math.sin(angle) * speed;
                }
              }
            });
          }

          // Attraction force
          if (attraction) {
            prevOrbs.forEach(otherOrb => {
              if (otherOrb.id !== orb.id) {
                const dx = otherOrb.x - newX;
                const dy = otherOrb.y - newY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const force = 0.01 / (distance + 1);
                
                newVx += (dx / distance) * force;
                newVy += (dy / distance) * force;
              }
            });
          }

          // Update trail
          const newTrailPoints = trails ? [
            ...orb.trailPoints,
            { x: orb.x, y: orb.y, opacity: 1 }
          ].slice(-15).map((point, index, array) => ({
            ...point,
            opacity: (index / array.length) * 0.8
          })) : [];

          return {
            ...orb,
            x: newX,
            y: newY,
            vx: newVx * 0.99, // friction
            vy: newVy * 0.99,
            pulsePhase: orb.pulsePhase + 0.1,
            trailPoints: newTrailPoints,
            energy: Math.min(orb.maxEnergy, orb.energy + 0.5)
          };
        });
      });
    }, 50);

    return () => clearInterval(interval);
  }, [speed, collision, attraction, trails]);

  const getOrbEffects = (orb: EnergyOrb) => {
    const pulse = 0.8 + 0.2 * Math.sin(orb.pulsePhase);
    const energyRatio = orb.energy / orb.maxEnergy;
    
    switch (orb.type) {
      case 'plasma':
        return {
          background: `radial-gradient(circle, ${orb.color}40 0%, ${orb.color}20 50%, transparent 100%)`,
          boxShadow: `0 0 ${orb.size * pulse}px ${orb.color}, inset 0 0 ${orb.size * 0.3}px ${orb.color}80`,
          filter: `brightness(${energyRatio * 1.5}) saturate(1.5)`
        };
      case 'electric':
        return {
          background: `radial-gradient(circle, ${orb.color}60 0%, ${orb.color}30 40%, transparent 100%)`,
          boxShadow: `0 0 ${orb.size * pulse}px ${orb.color}, 0 0 ${orb.size * 2}px ${orb.color}40`,
          filter: `contrast(1.5) brightness(${energyRatio * 1.3})`
        };
      case 'cosmic':
        return {
          background: `radial-gradient(circle, ${orb.color}50 0%, transparent 60%), radial-gradient(circle at 30% 30%, #ffffff40 0%, transparent 30%)`,
          boxShadow: `0 0 ${orb.size * pulse * 1.5}px ${orb.color}80, inset 0 0 ${orb.size * 0.5}px #ffffff20`,
          filter: `brightness(${energyRatio * 1.2})`
        };
      case 'nuclear':
        return {
          background: `radial-gradient(circle, ${orb.color}70 0%, ${orb.color}40 30%, ${orb.color}10 60%, transparent 100%)`,
          boxShadow: `0 0 ${orb.size * pulse * 0.8}px ${orb.color}, 0 0 ${orb.size * 1.5}px ${orb.color}60`,
          filter: `saturate(2) brightness(${energyRatio * 1.4})`
        };
      default:
        return {};
    }
  };

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {orbs.map(orb => (
        <div key={orb.id}>
          {/* Trail */}
          {trails && orb.trailPoints.map((point, index) => (
            <div
              key={`${orb.id}-trail-${index}`}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: `${point.x}%`,
                top: `${point.y}%`,
                width: `${orb.size * 0.3}px`,
                height: `${orb.size * 0.3}px`,
                background: `radial-gradient(circle, ${orb.color}${Math.floor(point.opacity * 60)} 0%, transparent 100%)`,
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}
          
          {/* Main orb */}
          <div
            className="absolute rounded-full pointer-events-none transition-all duration-75"
            style={{
              left: `${orb.x}%`,
              top: `${orb.y}%`,
              width: `${orb.size}px`,
              height: `${orb.size}px`,
              transform: 'translate(-50%, -50%)',
              ...getOrbEffects(orb)
            }}
          >
            {/* Inner core */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle, ${orb.color}80 0%, ${orb.color}40 40%, transparent 70%)`,
                transform: `scale(${0.5 + 0.3 * Math.sin(orb.pulsePhase * 1.5)})`,
              }}
            />
            
            {/* Energy rings */}
            <div
              className="absolute inset-0 rounded-full animate-spin"
              style={{
                background: `conic-gradient(from 0deg, transparent 0%, ${orb.color}20 50%, transparent 100%)`,
                animationDuration: `${3 / orb.intensity}s`,
              }}
            />
          </div>
          
          {/* Electric arcs for electric type */}
          {orb.type === 'electric' && (
            <div className="absolute pointer-events-none">
              {Array.from({ length: 3 }, (_, i) => (
                <div
                  key={`arc-${i}`}
                  className="absolute"
                  style={{
                    left: `${orb.x}%`,
                    top: `${orb.y}%`,
                    width: '2px',
                    height: `${orb.size * 1.5}px`,
                    background: `linear-gradient(to bottom, ${orb.color}, transparent)`,
                    transform: `translate(-50%, -50%) rotate(${i * 120 + orb.pulsePhase * 57.3}deg)`,
                    opacity: 0.6,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default EnergyOrbs;