'use client';

import React, { useState, useEffect } from 'react';

interface DailyRewardDay {
  day: number;
  reward: {
    type: 'xp' | 'coins' | 'chest' | 'multiplier' | 'item';
    amount?: number;
    name: string;
    icon: string;
    rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  };
  isClaimed: boolean;
  isToday: boolean;
  isAvailable: boolean;
}

interface DailyRewardProps {
  rewardDays: DailyRewardDay[];
  currentStreak: number;
  maxStreak: number;
  timeUntilNextReward?: number; // seconds until next day
  onClaimReward: (day: number) => void;
  onResetStreak?: () => void;
  className?: string;
}

export const DailyReward: React.FC<DailyRewardProps> = ({
  rewardDays,
  currentStreak,
  maxStreak,
  timeUntilNextReward = 0,
  onClaimReward,
  onResetStreak,
  className = ''
}) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [showClaimedAnimation, setShowClaimedAnimation] = useState<number | null>(null);

  useEffect(() => {
    if (timeUntilNextReward > 0) {
      const updateTimer = () => {
        const hours = Math.floor(timeUntilNextReward / 3600);
        const minutes = Math.floor((timeUntilNextReward % 3600) / 60);
        const seconds = timeUntilNextReward % 60;
        
        if (hours > 0) {
          setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        } else if (minutes > 0) {
          setTimeLeft(`${minutes}m ${seconds}s`);
        } else {
          setTimeLeft(`${seconds}s`);
        }
      };

      updateTimer();
      const interval = setInterval(updateTimer, 1000);
      return () => clearInterval(interval);
    }
  }, [timeUntilNextReward]);

  const getRarityColor = (rarity?: string) => {
    switch (rarity) {
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-yellow-400 to-orange-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getStreakBonus = (streak: number) => {
    if (streak >= 30) return { multiplier: 3, label: 'Legendary Bonus!', color: 'text-yellow-500' };
    if (streak >= 21) return { multiplier: 2.5, label: 'Epic Bonus!', color: 'text-purple-500' };
    if (streak >= 14) return { multiplier: 2, label: 'Rare Bonus!', color: 'text-blue-500' };
    if (streak >= 7) return { multiplier: 1.5, label: 'Common Bonus!', color: 'text-green-500' };
    return { multiplier: 1, label: '', color: '' };
  };

  const handleClaimReward = (day: number) => {
    setShowClaimedAnimation(day);
    onClaimReward(day);
    
    setTimeout(() => {
      setShowClaimedAnimation(null);
    }, 2000);
  };

  const streakBonus = getStreakBonus(currentStreak);
  const todayReward = rewardDays.find(day => day.isToday);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          📅 Daily Rewards
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Log in daily to claim amazing rewards and build your streak!
        </p>
      </div>

      {/* Streak Display */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-3xl">🔥</span>
              <span className="text-2xl font-bold text-orange-600">
                {currentStreak} Day Streak
              </span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Best: {maxStreak} days • Next milestone: {Math.ceil(currentStreak / 7) * 7} days
            </div>
          </div>

          {streakBonus.label && (
            <div className={`px-4 py-2 bg-white dark:bg-gray-800 rounded-xl border-2 border-dashed ${streakBonus.color.replace('text-', 'border-')}`}>
              <div className={`font-bold ${streakBonus.color}`}>
                {streakBonus.label}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {streakBonus.multiplier}x rewards
              </div>
            </div>
          )}
        </div>

        {/* Streak Progress */}
        <div className="relative">
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
            <span>0</span>
            <span>7</span>
            <span>14</span>
            <span>21</span>
            <span>30+</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-orange-400 to-red-500 h-3 rounded-full transition-all duration-500 relative overflow-hidden"
              style={{ width: `${Math.min((currentStreak / 30) * 100, 100)}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Reward Timer */}
      {timeUntilNextReward > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center">
          <div className="text-blue-600 font-semibold mb-2">⏰ Next reward available in:</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {timeLeft}
          </div>
        </div>
      )}

      {/* Daily Rewards Grid */}
      <div className="grid grid-cols-7 gap-3">
        {rewardDays.map((dayReward) => (
          <div
            key={dayReward.day}
            className={`relative aspect-square rounded-xl border-2 transition-all duration-300 ${
              dayReward.isClaimed
                ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-600'
                : dayReward.isToday && dayReward.isAvailable
                ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-400 dark:border-yellow-500 shadow-lg cursor-pointer hover:scale-105'
                : dayReward.isAvailable
                ? 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 cursor-pointer hover:scale-105'
                : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 opacity-60'
            }`}
            onClick={() => {
              if (dayReward.isAvailable && !dayReward.isClaimed) {
                handleClaimReward(dayReward.day);
              }
            }}
          >
            {/* Day Number */}
            <div className={`absolute -top-2 -left-2 w-6 h-6 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center font-bold text-xs ${
              dayReward.isToday 
                ? 'bg-yellow-500 text-white' 
                : dayReward.isClaimed
                ? 'bg-green-500 text-white'
                : 'bg-gray-400 text-white'
            }`}>
              {dayReward.day}
            </div>

            {/* Reward Content */}
            <div className="h-full flex flex-col items-center justify-center p-2 text-center">
              {/* Reward Icon */}
              <div className={`text-2xl mb-1 ${dayReward.isClaimed ? '' : dayReward.isAvailable ? '' : 'grayscale opacity-50'}`}>
                {dayReward.reward.icon}
              </div>

              {/* Reward Info */}
              <div className="space-y-1">
                <div className={`text-xs font-semibold ${
                  dayReward.isClaimed ? 'text-green-700 dark:text-green-300' :
                  dayReward.isToday ? 'text-yellow-700 dark:text-yellow-300' :
                  'text-gray-600 dark:text-gray-400'
                }`}>
                  {dayReward.reward.name}
                </div>
                
                {dayReward.reward.amount && (
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {Math.floor(dayReward.reward.amount * streakBonus.multiplier)}
                  </div>
                )}
              </div>
            </div>

            {/* Today Indicator */}
            {dayReward.isToday && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
            )}

            {/* Claimed Checkmark */}
            {dayReward.isClaimed && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}

            {/* Rarity Glow */}
            {dayReward.reward.rarity && dayReward.reward.rarity !== 'common' && dayReward.isAvailable && (
              <div className={`absolute -inset-1 bg-gradient-to-r ${getRarityColor(dayReward.reward.rarity)} rounded-xl blur opacity-25 animate-pulse`}></div>
            )}

            {/* Claimed Animation */}
            {showClaimedAnimation === dayReward.day && (
              <div className="absolute inset-0 flex items-center justify-center bg-green-500 bg-opacity-90 rounded-xl">
                <div className="text-white text-2xl animate-bounce">✓</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Today's Special Reward */}
      {todayReward && todayReward.isAvailable && !todayReward.isClaimed && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-yellow-200 dark:border-yellow-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-6xl">{todayReward.reward.icon}</div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  Today's Reward: {todayReward.reward.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  Day {todayReward.day} of your streak
                </p>
                {streakBonus.multiplier > 1 && (
                  <div className={`text-sm font-semibold ${streakBonus.color}`}>
                    Bonus: {streakBonus.multiplier}x multiplier applied!
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => handleClaimReward(todayReward.day)}
              className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl font-bold hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Claim Now!
            </button>
          </div>
        </div>
      )}

      {/* Missed Day Warning */}
      {currentStreak === 0 && maxStreak > 0 && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-xl p-4 text-center">
          <div className="text-red-600 font-semibold mb-2">💔 Streak Broken!</div>
          <p className="text-red-500 dark:text-red-400 text-sm mb-3">
            You missed a day and lost your {maxStreak}-day streak. Start fresh today!
          </p>
          {onResetStreak && (
            <button
              onClick={onResetStreak}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-semibold transition-colors"
            >
              Start New Streak
            </button>
          )}
        </div>
      )}

      {/* Milestone Rewards Preview */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">🎯 Streak Milestones</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
          <div className={`p-3 rounded-lg ${currentStreak >= 7 ? 'bg-green-100 dark:bg-green-900' : 'bg-gray-100 dark:bg-gray-700'}`}>
            <div className="text-lg mb-1">🎁</div>
            <div className="text-xs font-semibold">7 Days</div>
            <div className="text-xs text-gray-500">1.5x Bonus</div>
          </div>
          <div className={`p-3 rounded-lg ${currentStreak >= 14 ? 'bg-blue-100 dark:bg-blue-900' : 'bg-gray-100 dark:bg-gray-700'}`}>
            <div className="text-lg mb-1">💎</div>
            <div className="text-xs font-semibold">14 Days</div>
            <div className="text-xs text-gray-500">2x Bonus</div>
          </div>
          <div className={`p-3 rounded-lg ${currentStreak >= 21 ? 'bg-purple-100 dark:bg-purple-900' : 'bg-gray-100 dark:bg-gray-700'}`}>
            <div className="text-lg mb-1">👑</div>
            <div className="text-xs font-semibold">21 Days</div>
            <div className="text-xs text-gray-500">2.5x Bonus</div>
          </div>
          <div className={`p-3 rounded-lg ${currentStreak >= 30 ? 'bg-yellow-100 dark:bg-yellow-900' : 'bg-gray-100 dark:bg-gray-700'}`}>
            <div className="text-lg mb-1">🏆</div>
            <div className="text-xs font-semibold">30 Days</div>
            <div className="text-xs text-gray-500">3x Bonus</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyReward;