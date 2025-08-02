'use client';

import React, { useState, useEffect } from 'react';

interface WeeklyPlayer {
  id: string;
  username: string;
  avatar: string;
  weeklyXP: number;
  weeklyRank: number;
  previousRank?: number;
  level: number;
  dailyProgress: number[];
  streak: number;
  achievements: number;
  isCurrentPlayer?: boolean;
}

interface WeeklyLeaderboardProps {
  players: WeeklyPlayer[];
  currentPlayer?: WeeklyPlayer;
  weekStartDate: Date;
  onPlayerClick?: (player: WeeklyPlayer) => void;
  className?: string;
}

export const WeeklyLeaderboard: React.FC<WeeklyLeaderboardProps> = ({
  players,
  currentPlayer,
  weekStartDate,
  onPlayerClick,
  className = ''
}) => {
  const [timeLeft, setTimeLeft] = useState('');

  // Calculate time remaining in week
  useEffect(() => {
    const updateTimeLeft = () => {
      const now = new Date();
      const weekEnd = new Date(weekStartDate);
      weekEnd.setDate(weekEnd.getDate() + 7);
      
      const diff = weekEnd.getTime() - now.getTime();
      
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      } else {
        setTimeLeft('Week ended');
      }
    };

    updateTimeLeft();
    const interval = setInterval(updateTimeLeft, 60000);
    return () => clearInterval(interval);
  }, [weekStartDate]);

  const getRankChange = (current: number, previous?: number) => {
    if (!previous) return null;
    const change = previous - current;
    if (change > 0) return { type: 'up', value: change };
    if (change < 0) return { type: 'down', value: Math.abs(change) };
    return { type: 'same', value: 0 };
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return '👑';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 2: return 'text-gray-500 bg-gray-50 dark:bg-gray-900/20';
      case 3: return 'text-amber-600 bg-amber-50 dark:bg-amber-900/20';
      default: return 'text-gray-400 bg-gray-50 dark:bg-gray-800';
    }
  };

  const getDayName = (dayIndex: number) => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days[dayIndex];
  };

  const sortedPlayers = [...players].sort((a, b) => b.weeklyXP - a.weeklyXP);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
            <span>📅</span>
            <span>Weekly Leaderboard</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Week of {weekStartDate.toLocaleDateString()} - {new Date(weekStartDate.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString()}
          </p>
        </div>

        <div className="text-right">
          <div className="text-lg font-semibold text-blue-600">
            ⏰ {timeLeft}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Time remaining
          </div>
        </div>
      </div>

      {/* Weekly Progress Overview */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          This Week's Activity
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {sortedPlayers.reduce((sum, p) => sum + p.weeklyXP, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total XP Earned</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {sortedPlayers.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Active Players</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {Math.max(...sortedPlayers.map(p => p.streak))}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Longest Streak</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {sortedPlayers.reduce((sum, p) => sum + p.achievements, 0)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">New Achievements</div>
          </div>
        </div>
      </div>

      {/* Top 3 Weekly Champions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sortedPlayers.slice(0, 3).map((player, index) => {
          const rank = index + 1;
          const rankChange = getRankChange(rank, player.previousRank);
          
          return (
            <div
              key={player.id}
              className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                player.isCurrentPlayer 
                  ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
              } ${rank === 1 ? 'ring-4 ring-yellow-400 ring-opacity-50' : ''}`}
              onClick={() => onPlayerClick?.(player)}
            >
              {/* Rank Badge */}
              <div className="text-center mb-4">
                <div className={`inline-block px-4 py-2 rounded-full text-xl font-bold ${getRankColor(rank)}`}>
                  {getRankIcon(rank)}
                </div>
                
                {/* Rank Change Indicator */}
                {rankChange && (
                  <div className={`mt-2 inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                    rankChange.type === 'up' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    rankChange.type === 'down' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                  }`}>
                    {rankChange.type === 'up' && <span>⬆️ +{rankChange.value}</span>}
                    {rankChange.type === 'down' && <span>⬇️ -{rankChange.value}</span>}
                    {rankChange.type === 'same' && <span>➡️ No change</span>}
                  </div>
                )}
              </div>

              {/* Player Avatar */}
              <div className="text-center mb-4">
                <img
                  src={player.avatar}
                  alt={player.username}
                  className="w-20 h-20 rounded-full mx-auto border-4 border-white dark:border-gray-700 shadow-lg"
                />
              </div>

              {/* Player Info */}
              <div className="text-center space-y-2">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                  {player.username}
                </h3>
                
                <div className="text-2xl font-bold text-blue-600">
                  {player.weeklyXP.toLocaleString()} XP
                </div>
                
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Level {player.level} • 🔥 {player.streak} days
                </div>
              </div>

              {/* Daily Progress Chart */}
              <div className="mt-4">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 text-center">
                  Daily Progress
                </div>
                <div className="flex justify-between items-end space-x-1 h-12">
                  {player.dailyProgress.map((xp, dayIndex) => {
                    const maxXP = Math.max(...player.dailyProgress);
                    const height = maxXP > 0 ? (xp / maxXP) * 100 : 0;
                    
                    return (
                      <div key={dayIndex} className="flex-1 flex flex-col items-center">
                        <div
                          className="bg-blue-500 rounded-t w-full transition-all duration-300"
                          style={{ height: `${height}%` }}
                        ></div>
                        <div className="text-xs text-gray-400 mt-1">
                          {getDayName(dayIndex)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Achievement Count */}
              {player.achievements > 0 && (
                <div className="absolute top-2 right-2">
                  <div className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    🏆 {player.achievements}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Full Weekly Rankings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Complete Weekly Rankings
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Player
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Weekly XP
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Streak
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Change
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {sortedPlayers.map((player, index) => {
                const rank = index + 1;
                const rankChange = getRankChange(rank, player.previousRank);
                
                return (
                  <tr
                    key={player.id}
                    className={`hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
                      player.isCurrentPlayer ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                    }`}
                    onClick={() => onPlayerClick?.(player)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${getRankColor(rank)}`}>
                        {getRankIcon(rank)}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <img
                          src={player.avatar}
                          alt={player.username}
                          className="w-10 h-10 rounded-full border-2 border-gray-200 dark:border-gray-600"
                        />
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {player.username}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Level {player.level}
                          </div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {player.weeklyXP.toLocaleString()}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1">
                        <span className="text-orange-500">🔥</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {player.streak}
                        </span>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1 w-16 h-8">
                        {player.dailyProgress.slice(0, 7).map((xp, dayIndex) => {
                          const maxDaily = Math.max(...player.dailyProgress);
                          const height = maxDaily > 0 ? (xp / maxDaily) * 100 : 0;
                          
                          return (
                            <div
                              key={dayIndex}
                              className="flex-1 bg-blue-500 rounded"
                              style={{ height: `${Math.max(height, 10)}%` }}
                              title={`${getDayName(dayIndex)}: ${xp} XP`}
                            ></div>
                          );
                        })}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      {rankChange && (
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          rankChange.type === 'up' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          rankChange.type === 'down' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                        }`}>
                          {rankChange.type === 'up' && <span>⬆️ +{rankChange.value}</span>}
                          {rankChange.type === 'down' && <span>⬇️ -{rankChange.value}</span>}
                          {rankChange.type === 'same' && <span>➡️</span>}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Weekly Rewards Preview */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          🏆 Weekly Rewards
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
            <div className="text-3xl mb-2">👑</div>
            <div className="font-bold text-yellow-800 dark:text-yellow-200">1st Place</div>
            <div className="text-sm text-yellow-600 dark:text-yellow-400">5000 XP + Legendary Badge</div>
          </div>
          
          <div className="text-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <div className="text-3xl mb-2">🥈</div>
            <div className="font-bold text-gray-800 dark:text-gray-200">2nd Place</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">3000 XP + Epic Badge</div>
          </div>
          
          <div className="text-center p-4 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
            <div className="text-3xl mb-2">🥉</div>
            <div className="font-bold text-amber-800 dark:text-amber-200">3rd Place</div>
            <div className="text-sm text-amber-600 dark:text-amber-400">2000 XP + Rare Badge</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyLeaderboard;