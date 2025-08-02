'use client';

import React, { useState } from 'react';

interface Stat {
  name: string;
  value: number;
  maxValue: number;
  icon: string;
  description: string;
  color: string;
  category: 'core' | 'trading' | 'social' | 'learning';
}

interface CharacterStatsProps {
  level: number;
  experience: number;
  nextLevelXP: number;
  availablePoints: number;
  stats: Stat[];
  onUpgradeStat: (statName: string) => void;
  onResetStats?: () => void;
  className?: string;
}

export const CharacterStats: React.FC<CharacterStatsProps> = ({
  level,
  experience,
  nextLevelXP,
  availablePoints,
  stats,
  onUpgradeStat,
  onResetStats,
  className = ''
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const filteredStats = selectedCategory === 'all' 
    ? stats 
    : stats.filter(stat => stat.category === selectedCategory);

  const getStatColor = (color: string) => {
    const colors: Record<string, string> = {
      red: 'from-red-400 to-red-600',
      blue: 'from-blue-400 to-blue-600',
      green: 'from-green-400 to-green-600',
      purple: 'from-purple-400 to-purple-600',
      yellow: 'from-yellow-400 to-orange-500',
      orange: 'from-orange-400 to-red-500',
      pink: 'from-pink-400 to-purple-500',
      teal: 'from-teal-400 to-cyan-500'
    };
    return colors[color] || 'from-gray-400 to-gray-600';
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'core': return '⚡';
      case 'trading': return '📈';
      case 'social': return '👥';
      case 'learning': return '📚';
      default: return '📊';
    }
  };

  const totalPointsSpent = stats.reduce((sum, stat) => sum + stat.value, 0);
  const progressToNextLevel = (experience / nextLevelXP) * 100;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Character Overview */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
              <span>⚔️</span>
              <span>Character Stats</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Level {level} • {experience.toLocaleString()} / {nextLevelXP.toLocaleString()} XP
            </p>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">
              {availablePoints}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Available Points
            </div>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Level Progress</span>
            <span>{Math.round(progressToNextLevel)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-1000 relative overflow-hidden"
              style={{ width: `${progressToNextLevel}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{totalPointsSpent}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Points Spent</div>
          </div>
          <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{level}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Character Level</div>
          </div>
          <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {Math.floor(totalPointsSpent / stats.length)}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Avg Stat Level</div>
          </div>
          <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">
              {Math.max(...stats.map(s => s.value))}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Highest Stat</div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by:</span>
        {['all', 'core', 'trading', 'social', 'learning'].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === category
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {category === 'all' ? '📊 All' : `${getCategoryIcon(category)} ${category.charAt(0).toUpperCase() + category.slice(1)}`}
          </button>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredStats.map((stat) => {
          const percentage = (stat.value / stat.maxValue) * 100;
          const canUpgrade = availablePoints > 0 && stat.value < stat.maxValue;
          
          return (
            <div
              key={stat.name}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200"
            >
              {/* Stat Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{stat.icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      {stat.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.description}
                    </p>
                  </div>
                </div>
                
                {/* Upgrade Button */}
                <button
                  onClick={() => canUpgrade && onUpgradeStat(stat.name)}
                  disabled={!canUpgrade}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold transition-all duration-200 ${
                    canUpgrade
                      ? 'border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'
                      : 'border-gray-300 dark:border-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  +
                </button>
              </div>

              {/* Stat Progress */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Level</span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {stat.value} / {stat.maxValue}
                  </span>
                </div>
                
                <div className="relative">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full bg-gradient-to-r ${getStatColor(stat.color)} transition-all duration-500 relative overflow-hidden`}
                      style={{ width: `${percentage}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                    </div>
                  </div>
                  
                  {/* Progress Percentage */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-white drop-shadow-lg">
                      {Math.round(percentage)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Stat Effects */}
              <div className="mt-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Current Bonus: <span className="font-semibold text-green-600">+{stat.value * 5}%</span>
                  {stat.value < stat.maxValue && (
                    <span className="text-blue-600"> • Next: +{(stat.value + 1) * 5}%</span>
                  )}
                </div>
              </div>

              {/* Max Level Indicator */}
              {stat.value === stat.maxValue && (
                <div className="mt-2 flex items-center justify-center">
                  <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full text-xs font-bold">
                    ⭐ MAX LEVEL
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          💡 Tip: Higher stats provide better bonuses for related activities
        </div>
        
        {onResetStats && (
          <button
            onClick={() => setShowConfirmReset(true)}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-semibold transition-colors"
          >
            Reset All Stats
          </button>
        )}
      </div>

      {/* Reset Confirmation Modal */}
      {showConfirmReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl">
            <div className="text-center">
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Reset All Stats?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                This will refund all {totalPointsSpent} spent points and reset all stats to 0. This action cannot be undone.
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowConfirmReset(false)}
                  className="flex-1 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onResetStats?.();
                    setShowConfirmReset(false);
                  }}
                  className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stat Builds Suggestions */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-4">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">💡 Recommended Builds</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-lg">📈</span>
              <span className="font-semibold text-gray-900 dark:text-white text-sm">Trading Focus</span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Maximize trading stats for better market performance
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-lg">👥</span>
              <span className="font-semibold text-gray-900 dark:text-white text-sm">Social Build</span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Boost social stats for better community rewards
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-lg">⚖️</span>
              <span className="font-semibold text-gray-900 dark:text-white text-sm">Balanced</span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Even distribution across all stat categories
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterStats;