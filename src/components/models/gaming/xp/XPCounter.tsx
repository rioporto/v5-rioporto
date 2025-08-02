'use client';

import React, { useState, useEffect } from 'react';

interface XPCounterProps {
  currentXP: number;
  targetXP?: number;
  animationDuration?: number;
  showGainAnimation?: boolean;
  recentGain?: number;
  className?: string;
}

export const XPCounter: React.FC<XPCounterProps> = ({
  currentXP,
  targetXP,
  animationDuration = 1000,
  showGainAnimation = false,
  recentGain = 0,
  className = ''
}) => {
  const [displayXP, setDisplayXP] = useState(currentXP);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (currentXP !== displayXP) {
      setIsAnimating(true);
      const startValue = displayXP;
      const endValue = currentXP;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / animationDuration, 1);
        
        // Easing function for smooth animation
        const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
        const easedProgress = easeOutCubic(progress);
        
        const currentValue = Math.floor(startValue + (endValue - startValue) * easedProgress);
        setDisplayXP(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setIsAnimating(false);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [currentXP, displayXP, animationDuration]);

  return (
    <div className={`relative flex items-center space-x-2 ${className}`}>
      {/* XP Icon */}
      <div className="relative">
        <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-sm">XP</span>
        </div>
        {isAnimating && (
          <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full animate-ping opacity-75"></div>
        )}
      </div>

      {/* XP Display */}
      <div className="flex flex-col">
        <div className="flex items-baseline space-x-1">
          <span className={`font-bold text-2xl ${isAnimating ? 'text-amber-400 scale-110' : 'text-gray-900 dark:text-white'} transition-all duration-300`}>
            {displayXP.toLocaleString()}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">XP</span>
          {targetXP && (
            <>
              <span className="text-gray-400 dark:text-gray-500">/</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {targetXP.toLocaleString()}
              </span>
            </>
          )}
        </div>
        
        {/* Recent Gain Animation */}
        {showGainAnimation && recentGain > 0 && (
          <div className="absolute -top-2 left-full ml-2 animate-bounce">
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
              +{recentGain} XP
            </span>
          </div>
        )}
      </div>

      {/* Glow Effect */}
      {isAnimating && (
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-500/20 rounded-lg blur-sm scale-110 animate-pulse"></div>
      )}
    </div>
  );
};

export default XPCounter;