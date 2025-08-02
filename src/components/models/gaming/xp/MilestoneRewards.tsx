'use client';

import React, { useState } from 'react';

interface Reward {
  id: string;
  type: 'xp' | 'coins' | 'item' | 'badge' | 'power_up';
  amount?: number;
  item?: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface Milestone {
  id: string;
  level: number;
  title: string;
  description: string;
  rewards: Reward[];
  isUnlocked: boolean;
  isClaimed: boolean;
  requiredXP: number;
}

interface MilestoneRewardsProps {
  milestones: Milestone[];
  currentLevel: number;
  currentXP: number;
  onClaimReward: (milestoneId: string) => void;
  className?: string;
}

export const MilestoneRewards: React.FC<MilestoneRewardsProps> = ({
  milestones,
  currentLevel,
  currentXP,
  onClaimReward,
  className = ''
}) => {
  const [selectedMilestone, setSelectedMilestone] = useState<string | null>(null);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-yellow-400 to-orange-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getRewardIcon = (type: string) => {
    switch (type) {
      case 'xp': return '⚡';
      case 'coins': return '🪙';
      case 'item': return '🎁';
      case 'badge': return '🏅';
      case 'power_up': return '💫';
      default: return '🎁';
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Milestone Rewards
        </h3>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Level {currentLevel} • {currentXP.toLocaleString()} XP
        </div>
      </div>

      <div className="space-y-3">
        {milestones.map((milestone) => (
          <div
            key={milestone.id}
            className={`relative p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
              milestone.isClaimed
                ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-600'
                : milestone.isUnlocked
                ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-600 hover:scale-105 shadow-lg'
                : 'bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600'
            }`}
            onClick={() => setSelectedMilestone(selectedMilestone === milestone.id ? null : milestone.id)}
          >
            {/* Glow Effect for Available Rewards */}
            {milestone.isUnlocked && !milestone.isClaimed && (
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl blur opacity-25 animate-pulse"></div>
            )}

            <div className="relative flex items-center justify-between">
              {/* Milestone Info */}
              <div className="flex items-center space-x-4">
                {/* Level Badge */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                  milestone.isClaimed
                    ? 'bg-green-500'
                    : milestone.isUnlocked
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500'
                    : 'bg-gray-400'
                }`}>
                  {milestone.isClaimed ? '✓' : milestone.level}
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    {milestone.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {milestone.description}
                  </p>
                  <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    Requires {milestone.requiredXP.toLocaleString()} XP
                  </div>
                </div>
              </div>

              {/* Status & Action */}
              <div className="flex items-center space-x-2">
                {milestone.isClaimed ? (
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                    Claimed
                  </span>
                ) : milestone.isUnlocked ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onClaimReward(milestone.id);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg font-semibold hover:scale-105 transform transition-all duration-200 shadow-lg"
                  >
                    Claim Reward
                  </button>
                ) : (
                  <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-sm">
                    Locked
                  </span>
                )}

                {/* Expand Icon */}
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                    selectedMilestone === milestone.id ? 'rotate-180' : ''
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            {/* Rewards Details */}
            {selectedMilestone === milestone.id && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h5 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Rewards:
                </h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {milestone.rewards.map((reward) => (
                    <div
                      key={reward.id}
                      className={`p-3 rounded-lg bg-gradient-to-br ${getRarityColor(reward.rarity)} text-white text-center shadow-md`}
                    >
                      <div className="text-2xl mb-1">
                        {reward.icon || getRewardIcon(reward.type)}
                      </div>
                      <div className="text-sm font-semibold">
                        {reward.item || `${reward.amount} ${reward.type.toUpperCase()}`}
                      </div>
                      <div className="text-xs capitalize opacity-75">
                        {reward.rarity}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Particles Effect for Available Rewards */}
            {milestone.isUnlocked && !milestone.isClaimed && (
              <div className="absolute top-2 right-2">
                <div className="flex space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 h-1 bg-yellow-400 rounded-full animate-ping"
                      style={{ animationDelay: `${i * 200}ms` }}
                    ></div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Progress Overview */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-gray-900 dark:text-white">
            Progress Overview
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {milestones.filter(m => m.isClaimed).length} / {milestones.length} claimed
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
            style={{
              width: `${(milestones.filter(m => m.isClaimed).length / milestones.length) * 100}%`
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default MilestoneRewards;