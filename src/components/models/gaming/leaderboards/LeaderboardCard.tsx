'use client';

import React from 'react';

interface LeaderboardPlayer {
  id: string;
  username: string;
  avatar: string;
  rank: number;
  score: number;
  level: number;
  change?: number; // Position change from previous period
  isCurrentPlayer?: boolean;
  badges?: string[];
  country?: string;
}

interface LeaderboardCardProps {
  player: LeaderboardPlayer;
  metric: 'xp' | 'level' | 'achievements' | 'trading' | 'social';
  size?: 'small' | 'medium' | 'large';
  showChange?: boolean;
  showBadges?: boolean;
  onClick?: (player: LeaderboardPlayer) => void;
  className?: string;
}

export const LeaderboardCard: React.FC<LeaderboardCardProps> = ({
  player,
  metric,
  size = 'medium',
  showChange = true,
  showBadges = true,
  onClick,
  className = ''
}) => {
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
      case 1: return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200';
      case 2: return 'text-gray-500 bg-gray-50 dark:bg-gray-900/20 border-gray-200';
      case 3: return 'text-amber-600 bg-amber-50 dark:bg-amber-900/20 border-amber-200';
      default: return 'text-gray-400 bg-gray-50 dark:bg-gray-800 border-gray-200';
    }
  };

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case 'xp': return '⚡';
      case 'level': return '📊';
      case 'achievements': return '🏆';
      case 'trading': return '📈';
      case 'social': return '👥';
      default: return '🎯';
    }
  };

  const getMetricLabel = (metric: string) => {
    switch (metric) {
      case 'xp': return 'XP';
      case 'level': return 'Level';
      case 'achievements': return 'Achievements';
      case 'trading': return 'Trading Score';
      case 'social': return 'Social Score';
      default: return 'Score';
    }
  };

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'small':
        return {
          container: 'p-3',
          avatar: 'w-8 h-8',
          username: 'text-sm font-medium',
          score: 'text-lg font-bold',
          level: 'text-xs'
        };
      case 'large':
        return {
          container: 'p-6',
          avatar: 'w-16 h-16',
          username: 'text-lg font-bold',
          score: 'text-3xl font-black',
          level: 'text-sm'
        };
      default: // medium
        return {
          container: 'p-4',
          avatar: 'w-12 h-12',
          username: 'text-base font-semibold',
          score: 'text-2xl font-bold',
          level: 'text-sm'
        };
    }
  };

  const getCountryFlag = (country?: string) => {
    if (!country) return null;
    const flags: Record<string, string> = {
      'US': '🇺🇸', 'BR': '🇧🇷', 'GB': '🇬🇧', 'DE': '🇩🇪', 'FR': '🇫🇷',
      'JP': '🇯🇵', 'CN': '🇨🇳', 'KR': '🇰🇷', 'CA': '🇨🇦', 'AU': '🇦🇺'
    };
    return flags[country] || '🌍';
  };

  const sizeClasses = getSizeClasses(size);

  return (
    <div
      className={`relative rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
        player.isCurrentPlayer
          ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20 shadow-lg'
          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md'
      } ${sizeClasses.container} ${className}`}
      onClick={() => onClick?.(player)}
    >
      {/* Rank Badge */}
      <div className="absolute -top-3 -left-3">
        <div className={`px-3 py-1 rounded-full border-2 font-bold ${getRankColor(player.rank)}`}>
          {getRankIcon(player.rank)}
        </div>
      </div>

      {/* Position Change Indicator */}
      {showChange && player.change !== undefined && player.change !== 0 && (
        <div className="absolute -top-2 -right-2">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
            player.change > 0 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          }`}>
            {player.change > 0 ? `+${player.change}` : player.change}
          </div>
        </div>
      )}

      {/* Current Player Indicator */}
      {player.isCurrentPlayer && (
        <div className="absolute top-2 right-2">
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">👤</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col items-center text-center space-y-3">
        {/* Avatar */}
        <div className="relative">
          <img
            src={player.avatar}
            alt={player.username}
            className={`${sizeClasses.avatar} rounded-full border-2 border-gray-200 dark:border-gray-600 shadow-md`}
          />
          {player.country && (
            <div className="absolute -bottom-1 -right-1 text-sm">
              {getCountryFlag(player.country)}
            </div>
          )}
        </div>

        {/* Username */}
        <div>
          <h3 className={`${sizeClasses.username} text-gray-900 dark:text-white truncate max-w-32`}>
            {player.username}
          </h3>
          <div className={`${sizeClasses.level} text-gray-500 dark:text-gray-400`}>
            Level {player.level}
          </div>
        </div>

        {/* Score */}
        <div className="space-y-1">
          <div className={`${sizeClasses.score} text-blue-600 flex items-center justify-center space-x-1`}>
            <span>{getMetricIcon(metric)}</span>
            <span>{player.score.toLocaleString()}</span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {getMetricLabel(metric)}
          </div>
        </div>

        {/* Badges */}
        {showBadges && player.badges && player.badges.length > 0 && (
          <div className="flex items-center space-x-1">
            {player.badges.slice(0, 3).map((badge, index) => (
              <span key={index} className="text-sm">
                {badge}
              </span>
            ))}
            {player.badges.length > 3 && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                +{player.badges.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Glow Effect for Top 3 */}
      {player.rank <= 3 && (
        <div className={`absolute -inset-1 rounded-xl blur opacity-25 ${
          player.rank === 1 ? 'bg-yellow-400' :
          player.rank === 2 ? 'bg-gray-400' :
          'bg-amber-400'
        }`}></div>
      )}

      {/* Special Effects */}
      {player.rank === 1 && (
        <>
          {/* Crown Animation */}
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
          </div>
          
          {/* Sparkles */}
          <div className="absolute top-4 left-4">
            <div className="w-1 h-1 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
          <div className="absolute bottom-4 right-4">  
            <div className="w-1 h-1 bg-yellow-400 rounded-full animate-bounce"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default LeaderboardCard;