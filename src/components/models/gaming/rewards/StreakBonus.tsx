'use client';

import React, { useState, useEffect } from 'react';

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  streakType: 'login' | 'trading' | 'learning' | 'social' | 'quests';
  multiplier: number;
  nextMilestone: number;
  milestoneReward?: {
    type: 'xp' | 'coins' | 'badge' | 'title';
    amount?: number;
    name: string;
    icon: string;
  };
  streakHistory: number[]; // Last 30 days
}

interface StreakBonusProps {
  streakData: StreakData;
  isActive: boolean;
  onClaimMilestone?: () => void;
  className?: string;
}

export const StreakBonus: React.FC<StreakBonusProps> = ({
  streakData,
  isActive,
  onClaimMilestone,
  className = ''
}) => {
  const [showMilestoneReward, setShowMilestoneReward] = useState(false);
  const [animationPhase, setAnimationPhase] = useState<'idle' | 'building' | 'milestone'>('idle');

  useEffect(() => {
    if (streakData.currentStreak > 0 && isActive) {
      setAnimationPhase('building');
    } else {
      setAnimationPhase('idle');
    }

    // Check for milestone achievement
    if (streakData.currentStreak === streakData.nextMilestone && streakData.milestoneReward) {
      setAnimationPhase('milestone');
      setShowMilestoneReward(true);
    }
  }, [streakData.currentStreak, isActive, streakData.nextMilestone, streakData.milestoneReward]);

  const getStreakIcon = (type: string) => {
    switch (type) {
      case 'login': return '📅';
      case 'trading': return '📈';
      case 'learning': return '📚';
      case 'social': return '👥';
      case 'quests': return '🎯';
      default: return '🔥';
    }
  };

  const getStreakTitle = (type: string) => {
    switch (type) {
      case 'login': return 'Daily Login';
      case 'trading': return 'Trading';
      case 'learning': return 'Learning';
      case 'social': return 'Social';
      case 'quests': return 'Quest';
      default: return 'Activity';
    }
  };

  const getStreakColor = (streak: number) => {
    if (streak >= 100) return 'from-pink-500 to-purple-600';
    if (streak >= 50) return 'from-purple-500 to-indigo-600';
    if (streak >= 30) return 'from-yellow-400 to-orange-500';
    if (streak >= 14) return 'from-blue-400 to-blue-600';
    if (streak >= 7) return 'from-green-400 to-green-600';
    return 'from-gray-400 to-gray-600';
  };

  const getMilestones = () => {
    return [3, 7, 14, 21, 30, 50, 75, 100, 150, 200, 365];
  };

  const getNextMilestone = (current: number) => {
    const milestones = getMilestones();
    return milestones.find(m => m > current) || milestones[milestones.length - 1];
  };

  const getStreakLevel = (streak: number) => {
    if (streak >= 365) return { level: 'Legendary', icon: '👑', color: 'text-purple-600' };
    if (streak >= 200) return { level: 'Mythic', icon: '💎', color: 'text-pink-600' };
    if (streak >= 100) return { level: 'Epic', icon: '🏆', color: 'text-yellow-600' };
    if (streak >= 50) return { level: 'Rare', icon: '⭐', color: 'text-blue-600' };
    if (streak >= 30) return { level: 'Uncommon', icon: '🎖️', color: 'text-green-600' };
    if (streak >= 7) return { level: 'Common', icon: '🏅', color: 'text-gray-600' };
    return { level: 'Starter', icon: '🔰', color: 'text-gray-400' };
  };

  const streakLevel = getStreakLevel(streakData.currentStreak);
  const progressToNext = ((streakData.currentStreak % streakData.nextMilestone) / streakData.nextMilestone) * 100;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Main Streak Display */}
      <div className={`relative p-6 rounded-2xl border-2 transition-all duration-500 ${
        isActive 
          ? 'bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-300 dark:border-orange-700 shadow-lg'
          : 'bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600'
      } ${animationPhase === 'milestone' ? 'animate-pulse' : ''}`}>
        
        {/* Glow Effect */}
        {isActive && (
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl blur opacity-25 animate-pulse"></div>
        )}

        <div className="relative">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`text-4xl ${animationPhase === 'building' ? 'animate-bounce' : ''}`}>
                {getStreakIcon(streakData.streakType)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {getStreakTitle(streakData.streakType)} Streak
                </h3>
                <div className={`text-sm font-medium ${streakLevel.color}`}>
                  {streakLevel.icon} {streakLevel.level} Level
                </div>
              </div>
            </div>

            {/* Multiplier Badge */}
            <div className={`px-4 py-2 rounded-xl bg-gradient-to-r ${getStreakColor(streakData.currentStreak)} text-white font-bold text-lg shadow-lg`}>
              {streakData.multiplier}x
            </div>
          </div>

          {/* Streak Counter */}
          <div className="text-center mb-6">
            <div className={`text-6xl font-black bg-gradient-to-r ${getStreakColor(streakData.currentStreak)} bg-clip-text text-transparent mb-2`}>
              {streakData.currentStreak}
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              {streakData.currentStreak === 1 ? 'Day' : 'Days'} • Best: {streakData.longestStreak}
            </div>
          </div>

          {/* Progress to Next Milestone */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
              <span>Progress to {streakData.nextMilestone} days</span>
              <span>{streakData.currentStreak} / {streakData.nextMilestone}</span>
            </div>
            
            <div className="relative">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className={`h-3 rounded-full bg-gradient-to-r ${getStreakColor(streakData.currentStreak)} transition-all duration-1000 relative overflow-hidden`}
                  style={{ width: `${Math.min(progressToNext, 100)}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                </div>
              </div>
              
              {/* Milestone markers */}
              <div className="absolute -top-2 w-full">
                {getMilestones().filter(m => m <= streakData.nextMilestone * 2).map((milestone) => {
                  const position = (milestone / (streakData.nextMilestone * 2)) * 100;
                  const isReached = streakData.currentStreak >= milestone;
                  
                  return (
                    <div
                      key={milestone}
                      className={`absolute w-2 h-2 rounded-full -translate-x-1 ${
                        isReached ? 'bg-yellow-400' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                      style={{ left: `${Math.min(position, 100)}%` }}
                      title={`${milestone} days`}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Next Milestone Reward */}
          {streakData.milestoneReward && (
            <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{streakData.milestoneReward.icon}</span>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white text-sm">
                      Milestone Reward
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {streakData.milestoneReward.name}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-blue-600">
                    {streakData.nextMilestone - streakData.currentStreak} more days
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Streak History Visual */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">📊 30-Day History</h4>
        
        <div className="grid grid-cols-30 gap-1">
          {streakData.streakHistory.map((day, index) => {
            const isToday = index === streakData.streakHistory.length - 1;
            const isActive = day > 0;
            
            return (
              <div
                key={index}
                className={`aspect-square rounded-sm transition-all duration-200 ${
                  isActive 
                    ? isToday 
                      ? 'bg-orange-500 ring-2 ring-orange-300' 
                      : 'bg-green-500'
                    : 'bg-gray-200 dark:bg-gray-700'
                } hover:scale-125`}
                title={`Day ${index + 1}: ${isActive ? '✓ Active' : '✗ Missed'}`}
              />
            );
          })}
        </div>
        
        <div className="flex justify-between items-center mt-3 text-xs text-gray-500 dark:text-gray-400">
          <span>30 days ago</span>
          <span>Today</span>
        </div>
      </div>

      {/* Streak Benefits */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">🎁 Current Benefits</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-1">⚡</div>
            <div className="text-sm font-semibold text-gray-900 dark:text-white">
              {streakData.multiplier}x XP
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Experience Multiplier</div>
          </div>
          
          <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-1">🪙</div>
            <div className="text-sm font-semibold text-gray-900 dark:text-white">
              {Math.floor(streakData.multiplier * 50)}%
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Bonus Coins</div>
          </div>
          
          <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-1">🎯</div>
            <div className="text-sm font-semibold text-gray-900 dark:text-white">
              +{Math.floor(streakData.currentStreak / 7)}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Daily Quests</div>
          </div>
        </div>
      </div>

      {/* Milestone Achievement Modal */}
      {showMilestoneReward && streakData.milestoneReward && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl text-center">
            {/* Celebration */}
            <div className="relative mb-6">
              <div className="text-8xl animate-bounce">{streakData.milestoneReward.icon}</div>
              
              {/* Particles */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(15)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-75"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`
                    }}
                  />
                ))}
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              🎉 Milestone Reached!
            </h3>

            <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
              {streakData.currentStreak} Day {getStreakTitle(streakData.streakType)} Streak!
            </p>

            <div className="text-3xl font-bold text-orange-600 mb-6">
              {streakData.milestoneReward.name}
            </div>

            <button
              onClick={() => {
                setShowMilestoneReward(false);
                onClaimMilestone?.();
              }}
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200"
            >
              Claim Milestone Reward
            </button>
          </div>
        </div>
      )}

      {/* Fire Trail Animation */}
      {animationPhase === 'building' && (
        <div className="absolute top-0 left-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-orange-400 rounded-full animate-ping opacity-75"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 200}ms`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StreakBonus;