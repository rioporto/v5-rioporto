'use client';

import React, { useState } from 'react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
  category: 'trading' | 'social' | 'milestone' | 'special' | 'streak';
  progress: number;
  maxProgress: number;
  isUnlocked: boolean;
  unlockedAt?: string;
  xpReward: number;
  coinReward?: number;
  badgeReward?: string;
  secretAchievement?: boolean;
}

interface AchievementCardProps {
  achievement: Achievement;
  showProgress?: boolean;
  size?: 'small' | 'medium' | 'large';
  animated?: boolean;
  onClick?: (achievement: Achievement) => void;
  className?: string;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
  achievement,
  showProgress = true,
  size = 'medium',
  animated = true,
  onClick,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getRarityColors = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return {
          gradient: 'from-gray-400 to-gray-600',
          border: 'border-gray-400',
          glow: 'shadow-gray-400/50',
          text: 'text-gray-700'
        };
      case 'rare':
        return {
          gradient: 'from-blue-400 to-blue-600',
          border: 'border-blue-400',
          glow: 'shadow-blue-400/50',
          text: 'text-blue-700'
        };
      case 'epic':
        return {
          gradient: 'from-purple-400 to-purple-600',
          border: 'border-purple-400',
          glow: 'shadow-purple-400/50',
          text: 'text-purple-700'
        };
      case 'legendary':
        return {
          gradient: 'from-yellow-400 to-orange-500',
          border: 'border-yellow-400',
          glow: 'shadow-yellow-400/50',
          text: 'text-orange-700'
        };
      case 'mythic':
        return {
          gradient: 'from-pink-400 via-purple-500 to-indigo-500',
          border: 'border-pink-400',
          glow: 'shadow-pink-400/50',
          text: 'text-pink-700'
        };
      default:
        return {
          gradient: 'from-gray-400 to-gray-600',
          border: 'border-gray-400',
          glow: 'shadow-gray-400/50',
          text: 'text-gray-700'
        };
    }
  };

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'small':
        return {
          container: 'p-3',
          icon: 'text-2xl',
          title: 'text-sm font-semibold',
          description: 'text-xs',
          progress: 'h-1'
        };
      case 'large':
        return {
          container: 'p-6',
          icon: 'text-5xl',
          title: 'text-xl font-bold',
          description: 'text-base',
          progress: 'h-3'
        };
      default: // medium
        return {
          container: 'p-4',
          icon: 'text-3xl',
          title: 'text-lg font-bold',
          description: 'text-sm',
          progress: 'h-2'
        };
    }
  };

  const colors = getRarityColors(achievement.rarity);
  const sizeClasses = getSizeClasses(size);
  const progressPercentage = (achievement.progress / achievement.maxProgress) * 100;

  return (
    <div
      className={`relative rounded-xl border-2 transition-all duration-300 cursor-pointer transform ${
        animated && isHovered ? 'scale-105' : ''
      } ${
        achievement.isUnlocked
          ? `bg-white dark:bg-gray-800 ${colors.border} ${colors.glow} shadow-lg`
          : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600'
      } ${sizeClasses.container} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick?.(achievement)}
    >
      {/* Rarity Glow Effect */}
      {achievement.isUnlocked && animated && (
        <div className={`absolute -inset-1 bg-gradient-to-r ${colors.gradient} rounded-xl blur opacity-25 animate-pulse`}></div>
      )}

      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          {/* Icon */}
          <div className={`${sizeClasses.icon} ${achievement.isUnlocked ? '' : 'grayscale opacity-50'}`}>
            {achievement.secretAchievement && !achievement.isUnlocked ? '❓' : achievement.icon}
          </div>

          {/* Rarity Badge */}
          <div className={`px-2 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${colors.gradient}`}>
            {achievement.rarity.toUpperCase()}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          {/* Title */}
          <h3 className={`${sizeClasses.title} ${
            achievement.isUnlocked ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
          }`}>
            {achievement.secretAchievement && !achievement.isUnlocked 
              ? 'Secret Achievement' 
              : achievement.title
            }
          </h3>

          {/* Description */}
          <p className={`${sizeClasses.description} ${
            achievement.isUnlocked ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'
          }`}>
            {achievement.secretAchievement && !achievement.isUnlocked 
              ? 'Complete hidden requirements to unlock' 
              : achievement.description
            }
          </p>

          {/* Progress Bar */}
          {showProgress && !achievement.isUnlocked && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Progress</span>
                <span>{achievement.progress} / {achievement.maxProgress}</span>
              </div>
              <div className={`w-full bg-gray-200 dark:bg-gray-600 rounded-full ${sizeClasses.progress}`}>
                <div
                  className={`${sizeClasses.progress} bg-gradient-to-r ${colors.gradient} rounded-full transition-all duration-500`}
                  style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Rewards */}
          {achievement.isUnlocked && (
            <div className="flex items-center space-x-3 pt-2 border-t border-gray-200 dark:border-gray-600">
              <div className="flex items-center space-x-1">
                <span className="text-amber-500">⚡</span>
                <span className="text-xs font-semibold text-amber-600">{achievement.xpReward} XP</span>
              </div>
              {achievement.coinReward && (
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-500">🪙</span>
                  <span className="text-xs font-semibold text-yellow-600">{achievement.coinReward}</span>
                </div>
              )}
              {achievement.badgeReward && (
                <div className="flex items-center space-x-1">
                  <span className="text-blue-500">🏅</span>
                  <span className="text-xs font-semibold text-blue-600">Badge</span>
                </div>
              )}
            </div>
          )}

          {/* Unlock Date */}
          {achievement.isUnlocked && achievement.unlockedAt && (
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
            </div>
          )}
        </div>

        {/* Special Effects */}
        {achievement.isUnlocked && achievement.rarity === 'legendary' && (
          <div className="absolute top-1 right-1">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
          </div>
        )}

        {achievement.isUnlocked && achievement.rarity === 'mythic' && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-2 left-2 w-1 h-1 bg-pink-400 rounded-full animate-ping"></div>
            <div className="absolute top-4 right-3 w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
            <div className="absolute bottom-3 left-4 w-1 h-1 bg-indigo-400 rounded-full animate-bounce"></div>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-2 left-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-gray-400 to-gray-600 opacity-50"></div>
        </div>

        {/* Completion Checkmark */}
        {achievement.isUnlocked && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementCard;