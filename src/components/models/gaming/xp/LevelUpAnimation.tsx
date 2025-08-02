'use client';

import React, { useState, useEffect } from 'react';

interface LevelUpAnimationProps {
  isVisible: boolean;
  newLevel: number;
  onAnimationComplete?: () => void;
  duration?: number;
}

export const LevelUpAnimation: React.FC<LevelUpAnimationProps> = ({
  isVisible,
  newLevel,
  onAnimationComplete,
  duration = 3000
}) => {
  const [showParticles, setShowParticles] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Start particles immediately
      setShowParticles(true);
      
      // Show text after a brief delay
      const textTimer = setTimeout(() => {
        setShowText(true);
      }, 300);

      // Complete animation after duration
      const completeTimer = setTimeout(() => {
        setShowParticles(false);
        setShowText(false);
        onAnimationComplete?.();
      }, duration);

      return () => {
        clearTimeout(textTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [isVisible, duration, onAnimationComplete]);

  if (!isVisible) return null;

  // Generate particle positions
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: Math.random() * 1000,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 4,
    color: ['bg-yellow-400', 'bg-orange-400', 'bg-amber-400', 'bg-gold-400'][Math.floor(Math.random() * 4)]
  }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      
      {/* Particles */}
      {showParticles && (
        <div className="absolute inset-0">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className={`absolute ${particle.color} rounded-full opacity-0 animate-ping`}
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                animationDelay: `${particle.delay}ms`,
                animationDuration: '2s'
              }}
            />
          ))}
        </div>
      )}

      {/* Main Animation Container */}
      <div className="relative z-10 text-center">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/50 to-orange-400/50 rounded-full blur-3xl scale-150 animate-pulse"></div>
        
        {/* Level Up Badge */}
        <div className={`relative transform transition-all duration-1000 ${showText ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-8 rounded-2xl shadow-2xl border-4 border-yellow-300">
            {/* Crown Icon */}
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-b from-yellow-300 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 4a1 1 0 00-.894 1.447L5 7.337V15a2 2 0 002 2h6a2 2 0 002-2V7.337l.894-1.89A1 1 0 0015 4a1 1 0 00-.8.4L13 6l-1.5-3a1 1 0 00-1.8 0L8.5 6l-1.2-1.6A1 1 0 005 4z" />
                </svg>
              </div>
            </div>

            {/* Level Up Text */}
            <h2 className="text-3xl font-bold text-white mb-2 animate-bounce">
              LEVEL UP!
            </h2>
            
            {/* New Level */}
            <div className="flex items-center justify-center space-x-2 mb-4">
              <span className="text-6xl font-black text-white drop-shadow-lg">
                {newLevel}
              </span>
            </div>

            {/* Sparkle Effects */}
            <div className="absolute top-2 right-2">
              <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
            </div>
            <div className="absolute top-4 left-4">
              <div className="w-2 h-2 bg-yellow-200 rounded-full animate-pulse"></div>
            </div>
            <div className="absolute bottom-4 right-6">
              <div className="w-4 h-4 bg-orange-200 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>

        {/* Celebration Text */}
        {showText && (
          <div className="mt-6 animate-fade-in">
            <p className="text-white text-lg font-semibold drop-shadow-lg">
              Congratulations! You've reached level {newLevel}!
            </p>
            <p className="text-yellow-200 text-sm mt-2">
              New rewards and features unlocked!
            </p>
          </div>
        )}
      </div>

      {/* Shooting Stars */}
      {showParticles && (
        <>
          <div className="absolute top-1/4 left-1/4 w-1 h-20 bg-gradient-to-b from-yellow-400 to-transparent animate-ping transform rotate-45"></div>
          <div className="absolute top-1/3 right-1/4 w-1 h-16 bg-gradient-to-b from-orange-400 to-transparent animate-pulse transform -rotate-45"></div>
          <div className="absolute bottom-1/3 left-1/3 w-1 h-24 bg-gradient-to-b from-amber-400 to-transparent animate-bounce transform rotate-12"></div>
        </>
      )}
    </div>
  );
};

export default LevelUpAnimation;