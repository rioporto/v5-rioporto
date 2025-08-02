'use client';

import React, { useState, useEffect } from 'react';

interface Quest {
  id: string;
  title: string;
  description: string;
  progress: number;
  maxProgress: number;
  xpReward: number;
  coinReward?: number;
  type: 'daily' | 'weekly' | 'special';
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'trading' | 'social' | 'learning' | 'achievement';
  isCompleted: boolean;
  isClaimed: boolean;
  timeLeft?: number; // in minutes
  icon: string;
}

interface DailyQuestsProps {
  quests: Quest[];
  onClaimQuest: (questId: string) => void;
  className?: string;
}

export const DailyQuests: React.FC<DailyQuestsProps> = ({
  quests,
  onClaimQuest,
  className = ''
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: string }>({});

  // Update countdown timers
  useEffect(() => {
    const updateTimers = () => {
      const newTimeLeft: { [key: string]: string } = {};
      
      quests.forEach(quest => {
        if (quest.timeLeft && quest.timeLeft > 0) {
          const hours = Math.floor(quest.timeLeft / 60);
          const minutes = quest.timeLeft % 60;
          newTimeLeft[quest.id] = `${hours}h ${minutes}m`;
        }
      });
      
      setTimeLeft(newTimeLeft);
    };

    updateTimers();
    const interval = setInterval(updateTimers, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [quests]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'hard': return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'trading': return '📈';
      case 'social': return '👥';
      case 'learning': return '📚';
      case 'achievement': return '🏆';
      default: return '🎯';
    }
  };

  const filteredQuests = selectedCategory === 'all' 
    ? quests 
    : quests.filter(quest => quest.category === selectedCategory);

  const completedQuests = quests.filter(q => q.isCompleted && !q.isClaimed).length;
  const totalXP = quests.filter(q => q.isCompleted && !q.isClaimed).reduce((sum, q) => sum + q.xpReward, 0);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            Daily Quests
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Complete quests to earn XP and rewards
          </p>
        </div>
        
        {/* Summary Stats */}
        <div className="text-right">
          <div className="text-sm text-gray-600 dark:text-gray-400">Available Rewards</div>
          <div className="flex items-center space-x-2">
            <span className="font-bold text-lg text-amber-600">{totalXP} XP</span>
            {completedQuests > 0 && (
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs font-medium">
                {completedQuests} ready
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {['all', 'trading', 'social', 'learning', 'achievement'].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === category
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {category === 'all' ? '🎯 All' : `${getCategoryIcon(category)} ${category.charAt(0).toUpperCase() + category.slice(1)}`}
            <span className="ml-1 text-xs">
              ({category === 'all' ? quests.length : quests.filter(q => q.category === category).length})
            </span>
          </button>
        ))}
      </div>

      {/* Quest List */}
      <div className="space-y-3">
        {filteredQuests.map((quest) => (
          <div
            key={quest.id}
            className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
              quest.isClaimed
                ? 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 opacity-60'
                : quest.isCompleted
                ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-600 shadow-lg'
                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-md'
            }`}
          >
            {/* Completion Glow */}
            {quest.isCompleted && !quest.isClaimed && (
              <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl blur opacity-25 animate-pulse"></div>
            )}

            <div className="relative flex items-center justify-between">
              {/* Quest Info */}
              <div className="flex items-start space-x-4 flex-1">
                {/* Icon */}
                <div className="text-3xl">{quest.icon}</div>

                <div className="flex-1">
                  {/* Title and Type */}
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-bold text-gray-900 dark:text-white">
                      {quest.title}
                    </h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(quest.difficulty)}`}>
                      {quest.difficulty}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium">
                      {quest.type}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {quest.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-2">
                    <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mb-1">
                      <span>Progress</span>
                      <span>{quest.progress} / {quest.maxProgress}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          quest.isCompleted 
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                            : 'bg-gradient-to-r from-blue-500 to-purple-500'
                        }`}
                        style={{ width: `${Math.min((quest.progress / quest.maxProgress) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Rewards */}
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <span className="text-amber-500">⚡</span>
                      <span className="font-semibold text-amber-600">{quest.xpReward} XP</span>
                    </div>
                    {quest.coinReward && (
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-500">🪙</span>
                        <span className="font-semibold text-yellow-600">{quest.coinReward}</span>
                      </div>
                    )}
                    {timeLeft[quest.id] && (
                      <div className="flex items-center space-x-1">
                        <span className="text-red-500">⏰</span>
                        <span className="font-semibold text-red-600">{timeLeft[quest.id]}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="ml-4">
                {quest.isClaimed ? (
                  <div className="flex items-center space-x-2 text-gray-500">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium">Claimed</span>
                  </div>
                ) : quest.isCompleted ? (
                  <button
                    onClick={() => onClaimQuest(quest.id)}
                    className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-semibold hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Claim Reward
                  </button>
                ) : (
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-400">
                      {Math.round((quest.progress / quest.maxProgress) * 100)}%
                    </div>
                    <div className="text-xs text-gray-500">Complete</div>
                  </div>
                )}
              </div>
            </div>

            {/* Completion Animation */}
            {quest.isCompleted && !quest.isClaimed && (
              <div className="absolute top-2 right-2">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 h-1 bg-green-400 rounded-full animate-ping"
                      style={{ animationDelay: `${i * 100}ms` }}
                    ></div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredQuests.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎯</div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No Quests Available
          </h4>
          <p className="text-gray-600 dark:text-gray-400">
            Check back later for new challenges!
          </p>
        </div>
      )}
    </div>
  );
};

export default DailyQuests;