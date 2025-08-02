'use client';

import React, { useState } from 'react';

interface Trophy {
  id: string;
  name: string;
  description: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  category: 'trading' | 'social' | 'milestone' | 'achievement' | 'special';
  isUnlocked: boolean;
  unlockedAt?: string;
  progress: number;
  maxProgress: number;
  icon: string;
  requirements: string[];
  rewards: {
    xp: number;
    coins?: number;
    badge?: string;
  };
}

interface TrophyCaseProps {
  trophies: Trophy[];
  onTrophyClick?: (trophy: Trophy) => void;
  className?: string;
}

export const TrophyCase: React.FC<TrophyCaseProps> = ({
  trophies,
  onTrophyClick,
  className = ''
}) => {
  const [selectedTrophy, setSelectedTrophy] = useState<Trophy | null>(null);
  const [filterTier, setFilterTier] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const getTierColors = (tier: string) => {
    switch (tier) {
      case 'bronze':
        return {
          gradient: 'from-amber-600 to-amber-800',
          glow: 'shadow-amber-500/50',
          text: 'text-amber-700',
          bg: 'bg-amber-50 dark:bg-amber-900/20'
        };
      case 'silver':
        return {
          gradient: 'from-gray-400 to-gray-600',
          glow: 'shadow-gray-400/50',
          text: 'text-gray-700',
          bg: 'bg-gray-50 dark:bg-gray-900/20'
        };
      case 'gold':
        return {
          gradient: 'from-yellow-400 to-yellow-600',
          glow: 'shadow-yellow-400/50',
          text: 'text-yellow-700',
          bg: 'bg-yellow-50 dark:bg-yellow-900/20'
        };
      case 'platinum':
        return {
          gradient: 'from-blue-400 to-blue-600',
          glow: 'shadow-blue-400/50',
          text: 'text-blue-700',
          bg: 'bg-blue-50 dark:bg-blue-900/20'
        };
      case 'diamond':
        return {
          gradient: 'from-cyan-400 to-purple-500',
          glow: 'shadow-cyan-400/50',
          text: 'text-cyan-700',
          bg: 'bg-gradient-to-br from-cyan-50 to-purple-50 dark:from-cyan-900/20 dark:to-purple-900/20'
        };
      default:
        return {
          gradient: 'from-gray-400 to-gray-600',
          glow: 'shadow-gray-400/50',
          text: 'text-gray-700',
          bg: 'bg-gray-50 dark:bg-gray-900/20'
        };
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'bronze': return '🥉';
      case 'silver': return '🥈';
      case 'gold': return '🥇';
      case 'platinum': return '💎';
      case 'diamond': return '💍';
      default: return '🏆';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'trading': return '📈';
      case 'social': return '👥';
      case 'milestone': return '🎯';
      case 'achievement': return '🏆';
      case 'special': return '⭐';
      default: return '🏅';
    }
  };

  const filteredTrophies = trophies.filter(trophy => {
    if (filterTier !== 'all' && trophy.tier !== filterTier) return false;
    if (filterCategory !== 'all' && trophy.category !== filterCategory) return false;
    return true;
  });

  const unlockedCount = trophies.filter(t => t.isUnlocked).length;
  const totalTrophies = trophies.length;
  const completionRate = Math.round((unlockedCount / totalTrophies) * 100);

  // Group trophies by tier
  const groupedTrophies = filteredTrophies.reduce((acc, trophy) => {
    if (!acc[trophy.tier]) acc[trophy.tier] = [];
    acc[trophy.tier].push(trophy);
    return acc;
  }, {} as Record<string, Trophy[]>);

  const tierOrder = ['diamond', 'platinum', 'gold', 'silver', 'bronze'];

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          🏆 Trophy Case
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {unlockedCount} of {totalTrophies} trophies earned ({completionRate}%)
        </p>
        
        {/* Trophy Counter Display */}
        <div className="flex justify-center items-center space-x-6 mb-6">
          {tierOrder.map(tier => {
            const tierTrophies = trophies.filter(t => t.tier === tier);
            const unlockedTierTrophies = tierTrophies.filter(t => t.isUnlocked).length;
            const colors = getTierColors(tier);
            
            return (
              <div key={tier} className="text-center">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${colors.gradient} flex items-center justify-center shadow-lg mb-2`}>
                  <span className="text-white text-lg">{getTierIcon(tier)}</span>
                </div>
                <div className="text-sm font-semibold text-gray-900 dark:text-white">
                  {unlockedTierTrophies}/{tierTrophies.length}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  {tier}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center justify-center">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Tier:</label>
          <select
            value={filterTier}
            onChange={(e) => setFilterTier(e.target.value)}
            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
          >
            <option value="all">All Tiers</option>
            {tierOrder.map(tier => (
              <option key={tier} value={tier}>
                {getTierIcon(tier)} {tier.charAt(0).toUpperCase() + tier.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Category:</label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
          >
            <option value="all">All Categories</option>
            <option value="trading">{getCategoryIcon('trading')} Trading</option>
            <option value="social">{getCategoryIcon('social')} Social</option>
            <option value="milestone">{getCategoryIcon('milestone')} Milestone</option>
            <option value="achievement">{getCategoryIcon('achievement')} Achievement</option>
            <option value="special">{getCategoryIcon('special')} Special</option>
          </select>
        </div>
      </div>

      {/* Trophy Display */}
      <div className="space-y-8">
        {tierOrder.map(tier => {
          const tierTrophies = groupedTrophies[tier];
          if (!tierTrophies || tierTrophies.length === 0) return null;

          const colors = getTierColors(tier);

          return (
            <div key={tier} className={`p-6 rounded-2xl ${colors.bg} border border-gray-200 dark:border-gray-700`}>
              {/* Tier Header */}
              <div className="flex items-center justify-center mb-6">
                <div className={`flex items-center space-x-3 px-4 py-2 rounded-full bg-gradient-to-r ${colors.gradient} text-white shadow-lg`}>
                  <span className="text-2xl">{getTierIcon(tier)}</span>
                  <span className="font-bold text-lg capitalize">{tier} Trophies</span>
                  <span className="text-sm opacity-75">
                    ({tierTrophies.filter(t => t.isUnlocked).length}/{tierTrophies.length})
                  </span>
                </div>
              </div>

              {/* Trophy Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tierTrophies.map((trophy) => (
                  <div
                    key={trophy.id}
                    className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                      trophy.isUnlocked
                        ? `bg-white dark:bg-gray-800 border-transparent ${colors.glow} shadow-lg`
                        : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 opacity-60'
                    }`}
                    onClick={() => {
                      setSelectedTrophy(trophy);
                      onTrophyClick?.(trophy);
                    }}
                  >
                    {/* Glow Effect */}
                    {trophy.isUnlocked && (
                      <div className={`absolute -inset-1 bg-gradient-to-r ${colors.gradient} rounded-xl blur opacity-25 animate-pulse`}></div>
                    )}

                    <div className="relative">
                      {/* Trophy Icon */}
                      <div className="text-center mb-3">
                        <div className={`inline-block text-4xl ${trophy.isUnlocked ? '' : 'grayscale opacity-50'}`}>
                          {trophy.icon}
                        </div>
                      </div>

                      {/* Trophy Info */}
                      <div className="text-center space-y-2">
                        <h3 className={`font-bold text-lg ${
                          trophy.isUnlocked ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {trophy.name}
                        </h3>
                        
                        <p className={`text-sm ${
                          trophy.isUnlocked ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'
                        }`}>
                          {trophy.description}
                        </p>

                        {/* Progress Bar */}
                        {!trophy.isUnlocked && (
                          <div className="mt-3">
                            <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mb-1">
                              <span>Progress</span>
                              <span>{trophy.progress} / {trophy.maxProgress}</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                              <div
                                className={`h-2 bg-gradient-to-r ${colors.gradient} rounded-full transition-all duration-500`}
                                style={{ width: `${(trophy.progress / trophy.maxProgress) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        )}

                        {/* Unlock Date */}
                        {trophy.isUnlocked && trophy.unlockedAt && (
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Earned {new Date(trophy.unlockedAt).toLocaleDateString()}
                          </div>
                        )}
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-2 right-2">
                        <span className="text-lg opacity-75">
                          {getCategoryIcon(trophy.category)}
                        </span>
                      </div>

                      {/* Completion Checkmark */}
                      {trophy.isUnlocked && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Trophy Detail Modal */}
      {selectedTrophy && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={() => setSelectedTrophy(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              {/* Trophy Display */}
              <div className={`inline-block p-6 rounded-2xl bg-gradient-to-br ${getTierColors(selectedTrophy.tier).gradient} mb-6`}>
                <div className="text-6xl text-white drop-shadow-lg">
                  {selectedTrophy.icon}
                </div>
              </div>

              {/* Trophy Info */}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {selectedTrophy.name}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {selectedTrophy.description}
              </p>

              {/* Badges */}
              <div className="flex justify-center space-x-2 mb-6">
                <span className={`px-3 py-1 rounded-full text-sm font-bold text-white bg-gradient-to-r ${getTierColors(selectedTrophy.tier).gradient}`}>
                  {getTierIcon(selectedTrophy.tier)} {selectedTrophy.tier.toUpperCase()}
                </span>
                <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm font-medium">
                  {getCategoryIcon(selectedTrophy.category)} {selectedTrophy.category.toUpperCase()}
                </span>
              </div>

              {/* Requirements */}
              <div className="text-left mb-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Requirements:</h4>
                <ul className="space-y-2">
                  {selectedTrophy.requirements.map((req, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Rewards */}
              <div className="text-left mb-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Rewards:</h4>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center space-x-1">
                    <span className="text-amber-500">⚡</span>
                    <span className="text-sm font-semibold text-amber-600">{selectedTrophy.rewards.xp} XP</span>
                  </div>
                  {selectedTrophy.rewards.coins && (
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-500">🪙</span>
                      <span className="text-sm font-semibold text-yellow-600">{selectedTrophy.rewards.coins}</span>
                    </div>
                  )}
                  {selectedTrophy.rewards.badge && (
                    <div className="flex items-center space-x-1">
                      <span className="text-blue-500">🏅</span>
                      <span className="text-sm font-semibold text-blue-600">{selectedTrophy.rewards.badge}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedTrophy(null)}
                className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredTrophies.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏆</div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No trophies found
          </h4>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your filters or start earning trophies!
          </p>
        </div>
      )}
    </div>
  );
};

export default TrophyCase;