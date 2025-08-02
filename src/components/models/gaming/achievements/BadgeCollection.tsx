'use client';

import React, { useState } from 'react';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
  isUnlocked: boolean;
  unlockedAt?: string;
  category: 'achievement' | 'milestone' | 'event' | 'special';
  requirements: string;
  progress?: number;
  maxProgress?: number;
}

interface BadgeCollectionProps {
  badges: Badge[];
  onBadgeClick?: (badge: Badge) => void;
  showProgress?: boolean;
  className?: string;
}

export const BadgeCollection: React.FC<BadgeCollectionProps> = ({
  badges,
  onBadgeClick,
  showProgress = true,
  className = ''
}) => {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterRarity, setFilterRarity] = useState<string>('all');

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-yellow-400 to-orange-500';
      case 'mythic': return 'from-pink-400 via-purple-500 to-indigo-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'achievement': return '🏆';
      case 'milestone': return '🎯';
      case 'event': return '🎉';
      case 'special': return '⭐';
      default: return '🏅';
    }
  };

  const filteredBadges = badges.filter(badge => {
    if (filterCategory !== 'all' && badge.category !== filterCategory) return false;
    if (filterRarity !== 'all' && badge.rarity !== filterRarity) return false;
    return true;
  });

  const unlockedCount = badges.filter(b => b.isUnlocked).length;
  const completionRate = Math.round((unlockedCount / badges.length) * 100);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            Badge Collection
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {unlockedCount} of {badges.length} badges collected ({completionRate}%)
          </p>
        </div>

        {/* Completion Ring */}
        <div className="relative w-16 h-16">
          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="stroke-gray-200 dark:stroke-gray-700"
              strokeWidth="4"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="stroke-blue-500"
              strokeWidth="4"
              strokeDasharray={`${completionRate}, 100`}
              strokeLinecap="round"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              {completionRate}%
            </span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Category:</label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
          >
            <option value="all">All</option>
            <option value="achievement">🏆 Achievement</option>
            <option value="milestone">🎯 Milestone</option>
            <option value="event">🎉 Event</option>
            <option value="special">⭐ Special</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Rarity:</label>
          <select
            value={filterRarity}
            onChange={(e) => setFilterRarity(e.target.value)}
            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
          >
            <option value="all">All</option>
            <option value="common">Common</option>
            <option value="rare">Rare</option>
            <option value="epic">Epic</option>
            <option value="legendary">Legendary</option>
            <option value="mythic">Mythic</option>
          </select>
        </div>
      </div>

      {/* Badge Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {filteredBadges.map((badge) => (
          <div
            key={badge.id}
            className={`relative aspect-square rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
              badge.isUnlocked
                ? `bg-white dark:bg-gray-800 border-${badge.color}-400 shadow-lg`
                : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 grayscale'
            }`}
            onClick={() => {
              setSelectedBadge(badge);
              onBadgeClick?.(badge);
            }}
          >
            {/* Rarity Glow */}
            {badge.isUnlocked && (
              <div className={`absolute -inset-1 bg-gradient-to-r ${getRarityColor(badge.rarity)} rounded-xl blur opacity-25 animate-pulse`}></div>
            )}

            <div className="relative p-3 h-full flex flex-col items-center justify-center">
              {/* Badge Icon */}
              <div className={`text-3xl mb-2 ${badge.isUnlocked ? '' : 'opacity-30'}`}>
                {badge.icon}
              </div>

              {/* Badge Name */}
              <div className="text-center">
                <h4 className={`text-xs font-semibold ${
                  badge.isUnlocked ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'
                }`}>
                  {badge.name}
                </h4>
              </div>

              {/* Progress Bar for Locked Badges */}
              {!badge.isUnlocked && showProgress && badge.progress !== undefined && badge.maxProgress !== undefined && (
                <div className="absolute bottom-1 left-1 right-1">
                  <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-1">
                    <div
                      className="h-1 bg-blue-500 rounded-full transition-all duration-300"
                      style={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Rarity Indicator */}
              <div className={`absolute top-1 right-1 w-2 h-2 rounded-full bg-gradient-to-r ${getRarityColor(badge.rarity)}`}></div>

              {/* Category Indicator */}
              <div className="absolute top-1 left-1 text-xs opacity-50">
                {getCategoryIcon(badge.category)}
              </div>

              {/* Unlock Date */}
              {badge.isUnlocked && badge.unlockedAt && (
                <div className="absolute bottom-1 left-1 right-1 text-center">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(badge.unlockedAt).toLocaleDateString()}
                  </span>
                </div>
              )}

              {/* Lock Icon for Locked Badges */}
              {!badge.isUnlocked && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={() => setSelectedBadge(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Badge Details
              </h3>
              <button
                onClick={() => setSelectedBadge(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* Badge Display */}
            <div className="text-center mb-6">
              <div className={`inline-block p-6 rounded-2xl border-4 ${
                selectedBadge.isUnlocked
                  ? `border-${selectedBadge.color}-400 bg-gradient-to-br ${getRarityColor(selectedBadge.rarity)}`
                  : 'border-gray-300 bg-gray-100 dark:bg-gray-700 grayscale'
              }`}>
                <div className={`text-6xl ${selectedBadge.isUnlocked ? '' : 'opacity-30'}`}>
                  {selectedBadge.icon}
                </div>
              </div>
            </div>

            {/* Badge Info */}
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {selectedBadge.name}
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {selectedBadge.description}
                </p>
              </div>

              {/* Badges */}
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getRarityColor(selectedBadge.rarity)}`}>
                  {selectedBadge.rarity.toUpperCase()}
                </span>
                <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-xs font-medium">
                  {getCategoryIcon(selectedBadge.category)} {selectedBadge.category.toUpperCase()}
                </span>
              </div>

              {/* Requirements */}
              <div>
                <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Requirements:</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedBadge.requirements}
                </p>
              </div>

              {/* Progress */}
              {!selectedBadge.isUnlocked && selectedBadge.progress !== undefined && selectedBadge.maxProgress !== undefined && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedBadge.progress} / {selectedBadge.maxProgress}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="h-2 bg-blue-500 rounded-full transition-all duration-300"
                      style={{ width: `${(selectedBadge.progress / selectedBadge.maxProgress) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Unlock Date */}
              {selectedBadge.isUnlocked && selectedBadge.unlockedAt && (
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Unlocked on {new Date(selectedBadge.unlockedAt).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredBadges.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏅</div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No badges found
          </h4>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default BadgeCollection;