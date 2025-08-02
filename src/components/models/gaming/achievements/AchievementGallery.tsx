'use client';

import React, { useState, useMemo } from 'react';
import AchievementCard from './AchievementCard';

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

interface AchievementGalleryProps {
  achievements: Achievement[];
  onAchievementClick?: (achievement: Achievement) => void;
  className?: string;
}

export const AchievementGallery: React.FC<AchievementGalleryProps> = ({
  achievements,
  onAchievementClick,
  className = ''
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRarity, setSelectedRarity] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'rarity' | 'progress' | 'category'>('newest');
  const [showUnlockedOnly, setShowUnlockedOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter and sort achievements
  const filteredAndSortedAchievements = useMemo(() => {
    let filtered = achievements.filter(achievement => {
      // Category filter
      if (selectedCategory !== 'all' && achievement.category !== selectedCategory) {
        return false;
      }

      // Rarity filter
      if (selectedRarity !== 'all' && achievement.rarity !== selectedRarity) {
        return false;
      }

      // Unlocked filter
      if (showUnlockedOnly && !achievement.isUnlocked) {
        return false;
      }

      // Search filter
      if (searchTerm && !achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !achievement.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      return true;
    });

    // Sort achievements
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          if (a.isUnlocked && b.isUnlocked) {
            return new Date(b.unlockedAt || '').getTime() - new Date(a.unlockedAt || '').getTime();
          }
          return b.isUnlocked ? 1 : -1;
        
        case 'rarity':
          const rarityOrder = { common: 1, rare: 2, epic: 3, legendary: 4, mythic: 5 };
          return rarityOrder[b.rarity] - rarityOrder[a.rarity];
        
        case 'progress':
          const progressA = a.progress / a.maxProgress;
          const progressB = b.progress / b.maxProgress;
          return progressB - progressA;
        
        case 'category':
          return a.category.localeCompare(b.category);
        
        default:
          return 0;
      }
    });

    return filtered;
  }, [achievements, selectedCategory, selectedRarity, sortBy, showUnlockedOnly, searchTerm]);

  // Statistics
  const stats = useMemo(() => {
    const total = achievements.length;
    const unlocked = achievements.filter(a => a.isUnlocked).length;
    const byRarity = achievements.reduce((acc, achievement) => {
      acc[achievement.rarity] = (acc[achievement.rarity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const byCategory = achievements.reduce((acc, achievement) => {
      acc[achievement.category] = (acc[achievement.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return { total, unlocked, byRarity, byCategory };
  }, [achievements]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'trading': return '📈';
      case 'social': return '👥';
      case 'milestone': return '🎯';
      case 'special': return '⭐';
      case 'streak': return '🔥';
      default: return '🏆';
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'common': return '⚪';
      case 'rare': return '🔵';
      case 'epic': return '🟣';
      case 'legendary': return '🟡';
      case 'mythic': return '🌈';
      default: return '⚪';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header with Stats */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Achievement Gallery
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {stats.unlocked} of {stats.total} achievements unlocked ({Math.round((stats.unlocked / stats.total) * 100)}%)
          </p>
        </div>

        {/* Progress Ring */}
        <div className="relative w-20 h-20">
          <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="stroke-gray-200 dark:stroke-gray-700"
              strokeWidth="3"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="stroke-blue-500"
              strokeWidth="3"
              strokeDasharray={`${(stats.unlocked / stats.total) * 100}, 100`}
              strokeLinecap="round"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {Math.round((stats.unlocked / stats.total) * 100)}%
            </span>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search achievements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-4 items-center">
          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
            >
              <option value="all">All Categories</option>
              {Object.keys(stats.byCategory).map(category => (
                <option key={category} value={category}>
                  {getCategoryIcon(category)} {category.charAt(0).toUpperCase() + category.slice(1)} ({stats.byCategory[category]})
                </option>
              ))}
            </select>
          </div>

          {/* Rarity Filter */}
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Rarity:</label>
            <select
              value={selectedRarity}
              onChange={(e) => setSelectedRarity(e.target.value)}
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
            >
              <option value="all">All Rarities</option>
              {Object.keys(stats.byRarity).map(rarity => (
                <option key={rarity} value={rarity}>
                  {getRarityIcon(rarity)} {rarity.charAt(0).toUpperCase() + rarity.slice(1)} ({stats.byRarity[rarity]})
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
            >
              <option value="newest">Newest</option>
              <option value="rarity">Rarity</option>
              <option value="progress">Progress</option>
              <option value="category">Category</option>
            </select>
          </div>

          {/* Unlocked Only Toggle */}
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showUnlockedOnly}
              onChange={(e) => setShowUnlockedOnly(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Unlocked only</span>
          </label>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Showing {filteredAndSortedAchievements.length} of {achievements.length} achievements
      </div>

      {/* Achievement Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAndSortedAchievements.map((achievement) => (
          <AchievementCard
            key={achievement.id}
            achievement={achievement}
            onClick={onAchievementClick}
            animated={true}
            showProgress={true}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredAndSortedAchievements.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏆</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No achievements found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your filters or search terms.
          </p>
        </div>
      )}

      {/* Rarity Legend */}
      <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Rarity Levels</h4>
        <div className="flex flex-wrap gap-4">
          {['common', 'rare', 'epic', 'legendary', 'mythic'].map(rarity => (
            <div key={rarity} className="flex items-center space-x-2">
              <span className="text-lg">{getRarityIcon(rarity)}</span>
              <span className="text-sm capitalize text-gray-700 dark:text-gray-300">{rarity}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                ({stats.byRarity[rarity] || 0})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AchievementGallery;