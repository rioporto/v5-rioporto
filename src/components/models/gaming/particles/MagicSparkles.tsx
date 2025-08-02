'use client';

import React, { useEffect, useState } from 'react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
  delay: number;
  duration: number;
  rotation: number;
  scale: number;
  twinklePhase: number;
  vx: number;
  vy: number;
  type: 'star' | 'diamond' | 'circle' | 'plus';
}

interface MagicSparklesProps {
  density?: number;
  colors?: string[];
  minSize?: number;
  maxSize?: number;
  speed?: number;
  twinkle?: boolean;
  follow?: boolean;
  area?: 'full' | 'cursor' | 'element';
  className?: string;
  children?: React.ReactNode;
}

export const MagicSparkles: React.FC<MagicSparklesProps> = ({
  density = 50,
  colors = ['#ffd700', '#ff69b4', '#00ffff', '#ff4500', '#9370db', '#00ff7f'],
  minSize = 4,
  maxSize = 12,
  speed = 0.5,
  twinkle = true,
  follow = false,
  area = 'full',
  className = '',
  children
}) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const createSparkle = (index?: number): Sparkle => {
    const baseX = area === 'cursor' ? mousePos.x : Math.random() * 100;
    const baseY = area === 'cursor' ? mousePos.y : Math.random() * 100;
    
    return {
      id: Math.random(),
      x: baseX + (Math.random() - 0.5) * 20,
      y: baseY + (Math.random() - 0.5) * 20,
      size: Math.random() * (maxSize - minSize) + minSize,
      opacity: Math.random() * 0.8 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 2000,
      duration: Math.random() * 3000 + 2000,
      rotation: Math.random() * 360,
      scale: 0.5 + Math.random() * 0.5,
      twinklePhase: Math.random() * Math.PI * 2,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      type: ['star', 'diamond', 'circle', 'plus'][Math.floor(Math.random() * 4)] as any
    };
  };

  const generateSparkles = () => {
    const newSparkles = Array.from({ length: density }, (_, i) => createSparkle(i));
    setSparkles(newSparkles);
  };

  useEffect(() => {
    generateSparkles();
    
    if (follow) {
      const handleMouseMove = (e: MouseEvent) => {
        setMousePos({
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100
        });
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [density, follow]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSparkles(prevSparkles => 
        prevSparkles.map(sparkle => ({
          ...sparkle,
          x: sparkle.x + sparkle.vx,
          y: sparkle.y + sparkle.vy,
          rotation: sparkle.rotation + 1,
          twinklePhase: sparkle.twinklePhase + 0.1,
          // Wrap around screen edges
          x: sparkle.x + sparkle.vx > 100 ? 0 : 
             sparkle.x + sparkle.vx < 0 ? 100 : sparkle.x + sparkle.vx,
          y: sparkle.y + sparkle.vy > 100 ? 0 : 
             sparkle.y + sparkle.vy < 0 ? 100 : sparkle.y + sparkle.vy,
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, [speed]);

  // Regenerate sparkles periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.1) { // 10% chance each cycle
        setSparkles(prev => {
          const newSparkles = [...prev];
          const replaceIndex = Math.floor(Math.random() * newSparkles.length);
          newSparkles[replaceIndex] = createSparkle();
          return newSparkles;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const renderSparkle = (sparkle: Sparkle) => {
    const twinkleOpacity = twinkle 
      ? sparkle.opacity * (0.3 + 0.7 * Math.abs(Math.sin(sparkle.twinklePhase)))
      : sparkle.opacity;

    const sparkleStyle = {
      left: `${sparkle.x}%`,
      top: `${sparkle.y}%`,
      transform: `rotate(${sparkle.rotation}deg) scale(${sparkle.scale})`,
      opacity: twinkleOpacity,
      color: sparkle.color,
      filter: `drop-shadow(0 0 6px ${sparkle.color})`,
      fontSize: `${sparkle.size}px`,
    };

    const sparkleContent = {
      star: '✦',
      diamond: '◆',
      circle: '●',
      plus: '✚'
    };

    return (
      <div
        key={sparkle.id}
        className="absolute pointer-events-none transition-opacity duration-300"
        style={sparkleStyle}
      >
        {sparkleContent[sparkle.type]}
      </div>
    );
  };

  return (
    <div className={`relative ${className}`}>
      {children}
      
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {sparkles.map(renderSparkle)}
      </div>
      
      {/* Additional magic particles for extra effect */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: density * 0.3 }, (_, i) => (
          <div
            key={`magic-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              filter: 'blur(0.5px)',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MagicSparkles;