'use client';

import React, { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  size: number;
  opacity: number;
  shape: 'square' | 'circle' | 'triangle';
}

interface ConfettiExplosionProps {
  trigger?: boolean;
  onComplete?: () => void;
  colors?: string[];
  pieceCount?: number;
  duration?: number;
  origin?: { x: number; y: number };
  spread?: number;
  intensity?: number;
}

export const ConfettiExplosion: React.FC<ConfettiExplosionProps> = ({
  trigger = false,
  onComplete,
  colors = ['#ff0080', '#00ff80', '#8000ff', '#ff8000', '#0080ff', '#ff0040'],
  pieceCount = 150,
  duration = 3000,
  origin = { x: 50, y: 50 },
  spread = 45,
  intensity = 1.5
}) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  const [isActive, setIsActive] = useState(false);

  const createConfettiPiece = (index: number): ConfettiPiece => {
    const angle = (Math.random() - 0.5) * spread * (Math.PI / 180);
    const velocity = (Math.random() * 15 + 10) * intensity;
    
    return {
      id: index,
      x: origin.x,
      y: origin.y,
      vx: Math.cos(angle) * velocity,
      vy: Math.sin(angle) * velocity - Math.random() * 10,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
      opacity: 1,
      shape: ['square', 'circle', 'triangle'][Math.floor(Math.random() * 3)] as any
    };
  };

  const explode = () => {
    const newPieces = Array.from({ length: pieceCount }, (_, i) => createConfettiPiece(i));
    setPieces(newPieces);
    setIsActive(true);

    setTimeout(() => {
      setIsActive(false);
      setPieces([]);
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
      setPieces(prevPieces => 
        prevPieces.map(piece => ({
          ...piece,
          x: piece.x + piece.vx * 0.3,
          y: piece.y + piece.vy * 0.3,
          vy: piece.vy + 0.8, // gravity
          rotation: piece.rotation + piece.rotationSpeed,
          opacity: Math.max(0, piece.opacity - 0.02),
          vx: piece.vx * 0.98 // air resistance
        }))
      );
    }, 16);

    return () => clearInterval(animationFrame);
  }, [isActive]);

  if (!isActive || pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map(piece => (
        <div
          key={piece.id}
          className="absolute transition-none"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            transform: `rotate(${piece.rotation}deg)`,
            opacity: piece.opacity,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
          }}
        >
          {piece.shape === 'square' && (
            <div 
              className="w-full h-full"
              style={{ backgroundColor: piece.color }}
            />
          )}
          {piece.shape === 'circle' && (
            <div 
              className="w-full h-full rounded-full"
              style={{ backgroundColor: piece.color }}
            />
          )}
          {piece.shape === 'triangle' && (
            <div 
              className="w-0 h-0"
              style={{
                borderLeft: `${piece.size/2}px solid transparent`,
                borderRight: `${piece.size/2}px solid transparent`,
                borderBottom: `${piece.size}px solid ${piece.color}`,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ConfettiExplosion;