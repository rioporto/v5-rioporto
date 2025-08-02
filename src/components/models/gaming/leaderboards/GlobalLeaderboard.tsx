'use client';

import React, { useState, useEffect } from 'react';

interface Player {
  id: string;
  username: string;
  avatar: string;
  level: number;
  xp: number;
  rank: number;
  badges: number;
  achievements: number;
  country?: string;
  isOnline: boolean;
  streak?: number;
  lastActive?: string;
}

interface GlobalLeaderboardProps {
  players: Player[];
  currentPlayer?: Player;
  onPlayerClick?: (player: Player) => void;
  refreshInterval?: number;
  className?: string;
}

export const GlobalLeaderboard: React.FC<GlobalLeaderboardProps> = ({
  players,
  currentPlayer,
  onPlayerClick,
  refreshInterval = 60000, // 1 minute
  className = ''
}) => {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [sortBy, setSortBy] = useState<'xp' | 'level' | 'achievements' | 'badges'>('xp');
  const [timeRange, setTimeRange] = useState<'all-time' | 'monthly' | 'weekly'>('all-time');

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

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

  const getCountryFlag = (country?: string) => {
    if (!country) return null;
    // This would normally use a proper flag library or API
    const flags: Record<string, string> = {
      'US': '🇺🇸', 'BR': '🇧🇷', 'GB': '🇬🇧', 'DE': '🇩🇪', 'FR': '🇫🇷',
      'JP': '🇯🇵', 'CN': '🇨🇳', 'KR': '🇰🇷', 'CA': '🇨🇦', 'AU': '🇦🇺'
    };
    return flags[country] || '🌍';
  };

  const sortedPlayers = [...players].sort((a, b) => {
    switch (sortBy) {
      case 'level': return b.level - a.level;
      case 'achievements': return b.achievements - a.achievements;
      case 'badges': return b.badges - a.badges;
      default: return b.xp - a.xp;
    }
  });

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
            <span>🌍</span>
            <span>Global Leaderboard</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Compete with players from around the world
          </p>
        </div>

        <div className="text-right">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-500">
            {players.length} players online
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
          >
            <option value="xp">⚡ Total XP</option>
            <option value="level">📊 Level</option>
            <option value="achievements">🏆 Achievements</option>
            <option value="badges">🏅 Badges</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Time Range:</label>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
          >
            <option value="all-time">🏆 All Time</option>
            <option value="monthly">📅 This Month</option>
            <option value="weekly">📊 This Week</option>
          </select>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {sortedPlayers.slice(0, 3).map((player, index) => {
          const actualRank = index + 1;
          const isCurrentPlayer = currentPlayer?.id === player.id;
          
          return (
            <div
              key={player.id}
              className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                isCurrentPlayer 
                  ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
              } ${actualRank === 1 ? 'order-2 scale-110' : actualRank === 2 ? 'order-1' : 'order-3'}`}
              onClick={() => onPlayerClick?.(player)}
            >
              {/* Rank Crown/Medal */}
              <div className="text-center mb-3">
                <div className={`inline-block px-3 py-1 rounded-full text-lg font-bold ${getRankColor(actualRank)}`}>
                  {getRankIcon(actualRank)}
                </div>
              </div>

              {/* Avatar */}
              <div className="relative mx-auto w-16 h-16 mb-3">
                <img
                  src={player.avatar}
                  alt={player.username}
                  className="w-16 h-16 rounded-full border-4 border-white dark:border-gray-700 shadow-lg"
                />
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-gray-700 ${
                  player.isOnline ? 'bg-green-500' : 'bg-gray-400'
                }`}></div>
                {player.country && (
                  <div className="absolute -top-1 -right-1 text-lg">
                    {getCountryFlag(player.country)}
                  </div>
                )}
              </div>

              {/* Player Info */}
              <div className="text-center space-y-1">
                <h3 className="font-bold text-gray-900 dark:text-white truncate">
                  {player.username}
                </h3>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Level {player.level}
                </div>
                <div className="text-sm font-semibold text-blue-600">
                  {player.xp.toLocaleString()} XP
                </div>
                <div className="flex justify-center space-x-2 text-xs text-gray-500">
                  <span>🏆 {player.achievements}</span>
                  <span>🏅 {player.badges}</span>
                </div>
              </div>

              {/* Streak Badge */}
              {player.streak && player.streak > 0 && (
                <div className="absolute top-2 right-2">
                  <div className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    🔥 {player.streak}
                  </div>
                </div>
              )}

              {/* Current Player Indicator */}
              {isCurrentPlayer && (
                <div className="absolute -top-2 -left-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2L3 7v11a2 2 0 002 2h10a2 2 0 002-2V7l-7-5z" />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Full Leaderboard Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Full Rankings
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
                  Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  XP
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Achievements
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {sortedPlayers.map((player, index) => {
                const rank = index + 1;
                const isCurrentPlayer = currentPlayer?.id === player.id;
                
                return (
                  <tr
                    key={player.id}
                    className={`hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
                      isCurrentPlayer ? 'bg-blue-50 dark:bg-blue-900/20' : ''
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
                        <div className="relative">
                          <img
                            src={player.avatar}
                            alt={player.username}
                            className="w-10 h-10 rounded-full border-2 border-gray-200 dark:border-gray-600"
                          />
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white dark:border-gray-700 ${
                            player.isOnline ? 'bg-green-500' : 'bg-gray-400'
                          }`}></div>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900 dark:text-white">
                              {player.username}
                            </span>
                            {player.country && (
                              <span className="text-sm">{getCountryFlag(player.country)}</span>
                            )}
                            {isCurrentPlayer && (
                              <span className="text-blue-500 text-sm">👤</span>
                            )}
                          </div>
                          {player.lastActive && !player.isOnline && (
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Last seen {new Date(player.lastActive).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {player.level}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {player.xp.toLocaleString()}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <span>🏆 {player.achievements}</span>
                        <span>🏅 {player.badges}</span>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                          player.isOnline ? 'bg-green-500' : 'bg-gray-400'
                        }`}></div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {player.isOnline ? 'Online' : 'Offline'}
                        </span>
                        {player.streak && player.streak > 0 && (
                          <span className="text-xs bg-orange-100 dark:bg-orange-900 text-orange-600 px-2 py-1 rounded-full">
                            🔥 {player.streak}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Current Player Position (if not in top visible) */}
      {currentPlayer && !sortedPlayers.slice(0, 20).find(p => p.id === currentPlayer.id) && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-blue-600 font-semibold">Your Position:</span>
              <div className="flex items-center space-x-2">
                <img
                  src={currentPlayer.avatar}
                  alt={currentPlayer.username}
                  className="w-8 h-8 rounded-full border-2 border-blue-300"
                />
                <span className="font-medium text-gray-900 dark:text-white">
                  {currentPlayer.username}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <span className="font-semibold text-blue-600">#{currentPlayer.rank}</span>
              <span className="text-gray-600 dark:text-gray-400">Level {currentPlayer.level}</span>
              <span className="text-gray-600 dark:text-gray-400">{currentPlayer.xp.toLocaleString()} XP</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalLeaderboard;