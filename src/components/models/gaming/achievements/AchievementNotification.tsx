'use client';

import React, { useState, useEffect } from 'react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
  xpReward: number;
  coinReward?: number;
}

interface AchievementNotificationProps {
  achievement: Achievement | null;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
  position?: 'top-right' | 'top-center' | 'bottom-right' | 'bottom-center';
}

export const AchievementNotification: React.FC<AchievementNotificationProps> = ({
  achievement,
  isVisible,
  onClose,
  duration = 5000,
  position = 'top-right'
}) => {
  const [showNotification, setShowNotification] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string }>>([]);

  useEffect(() => {
    if (isVisible && achievement) {
      setShowNotification(true);
      
      // Generate particles
      const newParticles = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: getParticleColor(achievement.rarity)
      }));
      setParticles(newParticles);

      // Auto close after duration
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, achievement, duration]);

  const handleClose = () => {
    setShowNotification(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const getParticleColor = (rarity: string) => {
    const colors = {
      common: ['bg-gray-400', 'bg-gray-500'],
      rare: ['bg-blue-400', 'bg-blue-500'],
      epic: ['bg-purple-400', 'bg-purple-500'],
      legendary: ['bg-yellow-400', 'bg-orange-500'],
      mythic: ['bg-pink-400', 'bg-purple-500', 'bg-indigo-500']
    };
    const colorArray = colors[rarity as keyof typeof colors] || colors.common;
    return colorArray[Math.floor(Math.random() * colorArray.length)];
  };

  const getRarityColors = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return {
          gradient: 'from-gray-400 to-gray-600',
          glow: 'shadow-gray-400/50',
          border: 'border-gray-300'
        };
      case 'rare':
        return {
          gradient: 'from-blue-400 to-blue-600',
          glow: 'shadow-blue-400/50',
          border: 'border-blue-300'
        };
      case 'epic':
        return {
          gradient: 'from-purple-400 to-purple-600',
          glow: 'shadow-purple-400/50',
          border: 'border-purple-300'
        };
      case 'legendary':
        return {
          gradient: 'from-yellow-400 to-orange-500',
          glow: 'shadow-yellow-400/50',
          border: 'border-yellow-300'
        };
      case 'mythic':
        return {
          gradient: 'from-pink-400 via-purple-500 to-indigo-500',
          glow: 'shadow-pink-400/50',
          border: 'border-pink-300'
        };
      default:
        return {
          gradient: 'from-gray-400 to-gray-600',
          glow: 'shadow-gray-400/50',
          border: 'border-gray-300'
        };
    }
  };

  const getPositionClasses = (position: string) => {
    switch (position) {
      case 'top-center':
        return 'top-4 left-1/2 transform -translate-x-1/2';
      case 'bottom-right':
        return 'bottom-4 right-4';
      case 'bottom-center':
        return 'bottom-4 left-1/2 transform -translate-x-1/2';
      default: // top-right
        return 'top-4 right-4';
    }
  };

  if (!achievement || !isVisible) return null;

  const colors = getRarityColors(achievement.rarity);

  return (
    <div className={`fixed z-50 ${getPositionClasses(position)}`}>
      {/* Particles Background */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={`absolute w-2 h-2 ${particle.color} rounded-full animate-ping opacity-75`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: '3s'
            }}
          />
        ))}
      </div>

      {/* Notification Card */}
      <div
        className={`relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-2 ${colors.border} ${colors.glow} max-w-sm transform transition-all duration-300 ${
          showNotification ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-95'
        }`}
      >
        {/* Glow Effect */}
        <div className={`absolute -inset-1 bg-gradient-to-r ${colors.gradient} rounded-xl blur opacity-30 animate-pulse`}></div>

        <div className="relative p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span className="text-sm font-bold text-yellow-600">ACHIEVEMENT UNLOCKED!</span>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Achievement Content */}
          <div className="flex items-start space-x-3">
            {/* Icon */}
            <div className="text-4xl animate-bounce">
              {achievement.icon}
            </div>

            <div className="flex-1">
              {/* Title */}
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                {achievement.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                {achievement.description}
              </p>

              {/* Rarity Badge */}
              <div className={`inline-block px-2 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${colors.gradient} mb-2`}>
                {achievement.rarity.toUpperCase()}
              </div>

              {/* Rewards */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <span className="text-amber-500">⚡</span>
                  <span className="text-sm font-semibold text-amber-600">+{achievement.xpReward} XP</span>
                </div>
                {achievement.coinReward && (
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-500">🪙</span>
                    <span className="text-sm font-semibold text-yellow-600">+{achievement.coinReward}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar Animation */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 rounded-b-xl overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${colors.gradient} animate-progress-fill`}
            style={{ animationDuration: `${duration}ms` }}
          ></div>
        </div>

        {/* Sparkle Effects */}
        <div className="absolute top-2 right-8">
          <div className="w-1 h-1 bg-yellow-400 rounded-full animate-ping"></div>
        </div>
        <div className="absolute top-6 right-12">
          <div className="w-1 h-1 bg-orange-400 rounded-full animate-pulse"></div>
        </div>
        <div className="absolute bottom-8 right-6">
          <div className="w-1 h-1 bg-amber-400 rounded-full animate-bounce"></div>
        </div>
      </div>

      {/* Shooting Star Effect */}
      <div className="absolute -top-4 -right-4 pointer-events-none">
        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-shooting-star"></div>
      </div>
    </div>
  );
};

export default AchievementNotification;