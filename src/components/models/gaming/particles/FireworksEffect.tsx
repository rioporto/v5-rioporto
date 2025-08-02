'use client';

import React, { useEffect, useState, useCallback } from 'react';

interface Spark {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
  trail: { x: number; y: number; opacity: number }[];
}

interface Firework {
  id: number;
  x: number;
  y: number;
  targetY: number;
  vy: number;
  color: string;
  exploded: boolean;
  sparks: Spark[];
}

interface FireworksEffectProps {
  trigger?: boolean;
  autoFire?: boolean;
  colors?: string[];
  intensity?: number;
  onComplete?: () => void;
}

export const FireworksEffect: React.FC<FireworksEffectProps> = ({
  trigger = false,
  autoFire = false,
  colors = ['#ff1744', '#ff9800', '#ffeb3b', '#4caf50', '#2196f3', '#9c27b0'],
  intensity = 1,
  onComplete
}) => {
  const [fireworks, setFireworks] = useState<Firework[]>([]);
  const [isActive, setIsActive] = useState(false);

  const createSpark = (x: number, y: number, color: string, index: number): Spark => {
    const angle = (Math.PI * 2 * index) / 8 + Math.random() * 0.5;
    const velocity = Math.random() * 8 + 4;
    
    return {
      id: Math.random(),
      x,
      y,
      vx: Math.cos(angle) * velocity,
      vy: Math.sin(angle) * velocity,
      life: 60,
      maxLife: 60,
      color,
      size: Math.random() * 3 + 2,
      trail: []
    };
  };

  const createFirework = (): Firework => {
    const x = Math.random() * 80 + 10; // 10% to 90% of screen width
    const targetY = Math.random() * 30 + 20; // 20% to 50% of screen height
    
    return {
      id: Math.random(),
      x,
      y: 100,
      targetY,
      vy: -8 - Math.random() * 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      exploded: false,
      sparks: []
    };
  };

  const explodeFirework = (firework: Firework): Spark[] => {
    const sparkCount = Math.floor(8 + Math.random() * 8) * intensity;
    return Array.from({ length: sparkCount }, (_, i) => 
      createSpark(firework.x, firework.y, firework.color, i)
    );
  };

  const launchFirework = useCallback(() => {
    setFireworks(prev => [...prev, createFirework()]);
  }, [colors]);

  const updateFireworks = useCallback(() => {
    setFireworks(prevFireworks => {
      const updatedFireworks = prevFireworks.map(firework => {
        if (!firework.exploded) {
          const newY = firework.y + firework.vy;
          
          if (newY <= firework.targetY) {
            // Explode
            return {
              ...firework,
              y: firework.targetY,
              exploded: true,
              sparks: explodeFirework(firework)
            };
          }
          
          return {
            ...firework,
            y: newY,
            vy: firework.vy + 0.1 // gravity
          };
        }
        
        // Update sparks
        const updatedSparks = firework.sparks
          .map(spark => {
            const newTrail = [...spark.trail, { 
              x: spark.x, 
              y: spark.y, 
              opacity: spark.life / spark.maxLife 
            }].slice(-8);
            
            return {
              ...spark,
              x: spark.x + spark.vx,
              y: spark.y + spark.vy,
              vx: spark.vx * 0.98,
              vy: spark.vy * 0.98 + 0.1, // gravity
              life: spark.life - 1,
              trail: newTrail
            };
          })
          .filter(spark => spark.life > 0);
        
        return {
          ...firework,
          sparks: updatedSparks
        };
      });
      
      // Remove finished fireworks
      return updatedFireworks.filter(firework => 
        !firework.exploded || firework.sparks.length > 0
      );
    });
  }, []);

  const startShow = () => {
    setIsActive(true);
    
    // Launch multiple fireworks
    const launchCount = Math.floor(3 + Math.random() * 5) * intensity;
    for (let i = 0; i < launchCount; i++) {
      setTimeout(() => launchFirework(), i * 200 + Math.random() * 300);
    }
    
    // End show after duration
    setTimeout(() => {
      setIsActive(false);
      setFireworks([]);
      onComplete?.();
    }, 5000);
  };

  useEffect(() => {
    if (trigger) {
      startShow();
    }
  }, [trigger]);

  useEffect(() => {
    if (autoFire && !isActive) {
      const interval = setInterval(() => {
        if (Math.random() < 0.3) { // 30% chance per second
          launchFirework();
        }
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [autoFire, isActive, launchFirework]);

  useEffect(() => {
    if (!isActive && fireworks.length === 0) return;
    
    const animationFrame = setInterval(updateFireworks, 50);
    return () => clearInterval(animationFrame);
  }, [isActive, fireworks.length, updateFireworks]);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {fireworks.map(firework => (
        <div key={firework.id}>
          {!firework.exploded && (
            <div
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${firework.x}%`,
                top: `${firework.y}%`,
                backgroundColor: firework.color,
                boxShadow: `0 0 10px ${firework.color}`,
              }}
            />
          )}
          
          {firework.sparks.map(spark => (
            <div key={spark.id}>
              {/* Trail */}
              {spark.trail.map((point, index) => (
                <div
                  key={index}
                  className="absolute rounded-full"
                  style={{
                    left: `${point.x}%`,
                    top: `${point.y}%`,
                    width: `${spark.size * (point.opacity * 0.5)}px`,
                    height: `${spark.size * (point.opacity * 0.5)}px`,
                    backgroundColor: spark.color,
                    opacity: point.opacity * 0.6,
                  }}
                />
              ))}
              
              {/* Main spark */}
              <div
                className="absolute rounded-full"
                style={{
                  left: `${spark.x}%`,
                  top: `${spark.y}%`,
                  width: `${spark.size}px`,
                  height: `${spark.size}px`,
                  backgroundColor: spark.color,
                  boxShadow: `0 0 8px ${spark.color}`,
                  opacity: spark.life / spark.maxLife,
                }}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FireworksEffect;