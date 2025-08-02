'use client';

import React, { useState, useEffect } from 'react';

interface XPProgressBarProps {
  currentXP: number;
  levelXP: number;
  nextLevelXP: number;
  level: number;
  showDetails?: boolean;
  animated?: boolean;
  showPreviousLevel?: boolean;
  className?: string;
}

export const XPProgressBar: React.FC<XPProgressBarProps> = ({
  currentXP,
  levelXP,
  nextLevelXP,
  level,
  showDetails = true,
  animated = true,
  showPreviousLevel = false,
  className = ''
}) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [isLevelUp, setIsLevelUp] = useState(false);

  // Calculate progress percentage
  const progressXP = currentXP - levelXP;
  const totalXPForLevel = nextLevelXP - levelXP;
  const progressPercentage = Math.min((progressXP / totalXPForLevel) * 100, 100);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setAnimatedProgress(progressPercentage);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setAnimatedProgress(progressPercentage);
    }
  }, [progressPercentage, animated]);

  // Check for level up animation
  useEffect(() => {
    if (progressPercentage >= 100) {
      setIsLevelUp(true);
      const timer = setTimeout(() => {
        setIsLevelUp(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [progressPercentage]);

  return (
    <div className={`w-full ${className}`}>
      {/* Level Info */}
      {showDetails && (
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Level {level}
            </span>
            {showPreviousLevel && level > 1 && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                (was {level - 1})
              </span>
            )}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {progressXP.toLocaleString()} / {totalXPForLevel.toLocaleString()} XP
          </div>
        </div>
      )}

      {/* Progress Bar Container */}
      <div className="relative">
        {/* Background Bar */}
        <div className="w-full h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
          {/* Progress Fill */}
          <div
            className={`h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out relative overflow-hidden ${
              isLevelUp ? 'animate-pulse' : ''
            }`}
            style={{ width: `${animatedProgress}%` }}
          >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer transform -skew-x-12"></div>
            
            {/* Glow Effect */}
            {animatedProgress > 0 && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/50 to-pink-500/50 blur-sm"></div>
            )}
          </div>
        </div>

        {/* Level Markers */}
        <div className="absolute inset-0 flex items-center">
          {/* Current Level Marker */}
          <div className="absolute left-0 w-3 h-3 bg-white border-2 border-blue-500 rounded-full shadow-lg transform -translate-x-1/2"></div>
          
          {/* Next Level Marker */}
          <div className="absolute right-0 w-3 h-3 bg-white border-2 border-purple-500 rounded-full shadow-lg transform translate-x-1/2"></div>
        </div>

        {/* Progress Percentage Display */}
        {showDetails && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-white drop-shadow-lg">
              {Math.round(animatedProgress)}%
            </span>
          </div>
        )}

        {/* Level Up Glow */}
        {isLevelUp && (
          <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-md animate-pulse opacity-75"></div>
        )}
      </div>

      {/* Next Level Preview */}
      {showDetails && (
        <div className="flex justify-between items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
          <span>Level {level}</span>
          <span className="flex items-center space-x-1">
            <span>{totalXPForLevel - progressXP} XP to next level</span>
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </span>
          <span>Level {level + 1}</span>
        </div>
      )}

      {/* Milestone Indicators */}
      <div className="relative mt-2">
        <div className="flex justify-between">
          {[25, 50, 75].map((milestone) => (
            <div
              key={milestone}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                animatedProgress >= milestone
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500'
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              {animatedProgress >= milestone && (
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping absolute"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default XPProgressBar;