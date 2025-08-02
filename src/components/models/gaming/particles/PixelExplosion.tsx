'use client';

import React, { useEffect, useState } from 'react';

interface Pixel {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;
  maxLife: number;
  gravity: boolean;
  bounce: boolean;
}

interface PixelExplosionProps {
  trigger?: boolean;
  onComplete?: () => void;
  colors?: string[];
  pixelCount?: number;
  pixelSize?: number;
  duration?: number;
  origin?: { x: number; y: number };
  gravity?: boolean;
  bounce?: boolean;
  style?: 'retro' | 'neon' | 'fire' | 'ice' | 'electric';
}

export const PixelExplosion: React.FC<PixelExplosionProps> = ({
  trigger = false,
  onComplete,
  colors = ['#ff0080', '#00ff80', '#8000ff', '#ff8000', '#0080ff'],
  pixelCount = 100,
  pixelSize = 4,
  duration = 3000,
  origin = { x: 50, y: 50 },
  gravity = true,
  bounce = true,
  style = 'retro'
}) => {
  const [pixels, setPixels] = useState<Pixel[]>([]);
  const [isActive, setIsActive] = useState(false);

  const styleColors = {
    retro: ['#ff0080', '#00ff80', '#8000ff', '#ff8000', '#0080ff', '#ff0040'],
    neon: ['#ff006f', '#fb00ff', '#00fff9', '#00ff41', '#ffff00', '#ff4000'],
    fire: ['#ff0000', '#ff4000', '#ff8000', '#ffff00', '#ff6000', '#ff2000'],
    ice: ['#00ffff', '#4080ff', '#8040ff', '#ffffff', '#c0c0ff', '#80c0ff'],
    electric: ['#ffff00', '#00ffff', '#ff00ff', '#ffffff', '#80ff80', '#ff8080']
  };

  const currentColors = colors.length > 0 ? colors : styleColors[style];

  const createPixel = (index: number): Pixel => {
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 15 + 5;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity - Math.random() * 5;
    
    return {
      id: index,
      x: origin.x + (Math.random() - 0.5) * 2,
      y: origin.y + (Math.random() - 0.5) * 2,
      vx,
      vy,
      color: currentColors[Math.floor(Math.random() * currentColors.length)],
      size: pixelSize + Math.random() * pixelSize * 0.5,
      life: duration / 50,
      maxLife: duration / 50,
      gravity: gravity && Math.random() > 0.1,
      bounce: bounce && Math.random() > 0.3
    };
  };

  const explode = () => {
    const newPixels = Array.from({ length: pixelCount }, (_, i) => createPixel(i));
    setPixels(newPixels);
    setIsActive(true);

    setTimeout(() => {
      setIsActive(false);
      setPixels([]);
      onComplete?.();
    }, duration);
  };

  useEffect(() => {
    if (trigger) {
      explode();
    }
  }, [trigger]);

  useEffect(() => {
    if (!isActive) return;

    const animationFrame = setInterval(() => {
      setPixels(prevPixels => 
        prevPixels.map(pixel => {
          let newX = pixel.x + pixel.vx * 0.3;
          let newY = pixel.y + pixel.vy * 0.3;
          let newVx = pixel.vx;
          let newVy = pixel.vy;

          // Apply gravity
          if (pixel.gravity) {
            newVy += 0.5;
          }

          // Bounce off edges
          if (pixel.bounce) {
            if (newX <= 0 || newX >= 100) {
              newVx = -newVx * 0.7;
              newX = Math.max(0, Math.min(100, newX));
            }
            if (newY >= 100) {
              newVy = -newVy * 0.6;
              newY = 100;
            }
          } else {
            // Wrap around or fade
            if (newX < 0) newX = 100;
            if (newX > 100) newX = 0;
            if (newY > 100) return { ...pixel, life: 0 };
          }

          // Air resistance
          newVx *= 0.99;
          newVy *= 0.99;

          return {
            ...pixel,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy,
            life: pixel.life - 1
          };
        }).filter(pixel => pixel.life > 0)
      );
    }, 20);

    return () => clearInterval(animationFrame);
  }, [isActive]);

  const getPixelStyle = (pixel: Pixel) => {
    const lifeRatio = pixel.life / pixel.maxLife;
    const opacity = Math.max(0, lifeRatio);
    
    let boxShadow = '';
    let filter = '';
    
    switch (style) {
      case 'neon':
        boxShadow = `0 0 ${pixel.size}px ${pixel.color}, 0 0 ${pixel.size * 2}px ${pixel.color}`;
        filter = 'brightness(1.2)';
        break;
      case 'fire':
        boxShadow = `0 0 ${pixel.size * 0.5}px ${pixel.color}`;
        filter = `brightness(${1 + (1 - lifeRatio) * 0.5}) saturate(1.5)`;
        break;
      case 'ice':
        boxShadow = `0 0 ${pixel.size * 0.5}px rgba(255,255,255,0.5)`;
        filter = 'brightness(1.3) blur(0.5px)';
        break;
      case 'electric':
        boxShadow = `0 0 ${pixel.size}px ${pixel.color}, inset 0 0 ${pixel.size * 0.5}px rgba(255,255,255,0.3)`;
        filter = `brightness(${1.5 - lifeRatio * 0.5}) contrast(1.2)`;
        break;
      default: // retro
        filter = 'pixelated';
        break;
    }

    return {
      left: `${pixel.x}%`,
      top: `${pixel.y}%`,
      width: `${pixel.size}px`,
      height: `${pixel.size}px`,
      backgroundColor: pixel.color,
      opacity,
      boxShadow,
      filter,
      imageRendering: style === 'retro' ? 'pixelated' as any : 'auto',
    };
  };

  if (!isActive || pixels.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pixels.map(pixel => (
        <div
          key={pixel.id}
          className="absolute transition-none"
          style={getPixelStyle(pixel)}
        />
      ))}
      
      {/* Additional style-specific effects */}
      {style === 'electric' && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={`lightning-${i}`}
              className="absolute bg-gradient-to-r from-transparent via-yellow-300 to-transparent opacity-50"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: '2px',
                height: `${20 + Math.random() * 30}px`,
                transform: `rotate(${Math.random() * 360}deg)`,
                animation: `pulse ${0.1 + Math.random() * 0.2}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>
      )}
      
      {style === 'fire' && (
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              background: `radial-gradient(circle at ${origin.x}% ${origin.y}%, rgba(255,100,0,0.3) 0%, transparent 50%)`,
              animation: 'pulse 0.5s ease-out'
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PixelExplosion;