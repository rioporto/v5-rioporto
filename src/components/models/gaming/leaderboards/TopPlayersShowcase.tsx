'use client';

import React, { useState, useEffect } from 'react';

interface TopPlayer {
  id: string;
  username: string;
  avatar: string;
  rank: number;
  totalXP: number;
  level: number;
  achievements: number;
  specialties: string[];
  country?: string;
  isOnline: boolean;
  streak: number;
  joinedDate: string;
  favoriteQuote?: string;
  stats: {
    tradingWins: number;
    socialConnections: number;
    questsCompleted: number;
    badgesEarned: number;
  };
}

interface TopPlayersShowcaseProps {
  topPlayers: TopPlayer[];
  refreshInterval?: number;
  onPlayerClick?: (player: TopPlayer) => void;
  className?: string;
}

export const TopPlayersShowcase: React.FC<TopPlayersShowcaseProps> = ({
  topPlayers,
  refreshInterval = 300000, // 5 minutes
  onPlayerClick,
  className = ''
}) => {
  const [currentShowcase, setCurrentShowcase] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  // Auto-rotate showcase
  useEffect(() => {
    if (!isAutoRotating || topPlayers.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentShowcase((prev) => (prev + 1) % Math.min(topPlayers.length, 5));
    }, 10000); // Change every 10 seconds

    return () => clearInterval(interval);
  }, [isAutoRotating, topPlayers.length]);

  const getCountryFlag = (country?: string) => {
    if (!country) return null;
    const flags: Record<string, string> = {
      'US': '🇺🇸', 'BR': '🇧🇷', 'GB': '🇬🇧', 'DE': '🇩🇪', 'FR': '🇫🇷',
      'JP': '🇯🇵', 'CN': '🇨🇳', 'KR': '🇰🇷', 'CA': '🇨🇦', 'AU': '🇦🇺'
    };
    return flags[country] || '🌍';
  };

  const getSpecialtyColor = (specialty: string) => {
    const colors: Record<string, string> = {
      'Trading Master': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'Social Butterfly': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
      'Achievement Hunter': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'Streak Legend': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      'XP Grinder': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    };
    return colors[specialty] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  };

  const getRankDisplay = (rank: number) => {
    switch (rank) {
      case 1: return { icon: '👑', color: 'text-yellow-500', label: 'Champion' };
      case 2: return { icon: '🥈', color: 'text-gray-500', label: 'Runner-up' };
      case 3: return { icon: '🥉', color: 'text-amber-600', label: 'Third Place' };
      default: return { icon: `#${rank}`, color: 'text-gray-400', label: `Rank ${rank}` };
    }
  };

  const showcasePlayer = topPlayers[currentShowcase];
  const topFive = topPlayers.slice(0, 5);

  if (!showcasePlayer) return null;

  const rankDisplay = getRankDisplay(showcasePlayer.rank);

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          🌟 Hall of Champions
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Celebrating our top performers and community leaders
        </p>
      </div>

      {/* Main Showcase */}
      <div className="relative">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl"></div>
        
        <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-200 dark:border-gray-700 shadow-2xl">
          {/* Auto-rotate Controls */}
          <div className="absolute top-4 right-4 flex items-center space-x-2">
            <button
              onClick={() => setIsAutoRotating(!isAutoRotating)}
              className={`p-2 rounded-lg transition-colors ${
                isAutoRotating 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}
              title={isAutoRotating ? 'Pause auto-rotation' : 'Resume auto-rotation'}
            >
              {isAutoRotating ? '⏸️' : '▶️'}
            </button>
          </div>

          {/* Player Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left: Player Profile */}
            <div className="text-center lg:text-left space-y-6">
              {/* Avatar and Basic Info */}
              <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-4 lg:space-y-0 lg:space-x-6">
                <div className="relative">
                  <img
                    src={showcasePlayer.avatar}
                    alt={showcasePlayer.username}
                    className="w-32 h-32 rounded-full border-8 border-white dark:border-gray-700 shadow-2xl"
                  />
                  
                  {/* Online Status */}
                  <div className={`absolute bottom-4 right-4 w-8 h-8 rounded-full border-4 border-white dark:border-gray-700 ${
                    showcasePlayer.isOnline ? 'bg-green-500' : 'bg-gray-400'
                  }`}></div>
                  
                  {/* Country Flag */}
                  {showcasePlayer.country && (
                    <div className="absolute -top-2 -right-2 text-3xl">
                      {getCountryFlag(showcasePlayer.country)}
                    </div>
                  )}

                  {/* Rank Crown */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <div className={`text-4xl ${rankDisplay.color}`}>
                      {rankDisplay.icon}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {showcasePlayer.username}
                    </h3>
                    <p className={`text-lg font-semibold ${rankDisplay.color}`}>
                      {rankDisplay.label}
                    </p>
                  </div>

                  {/* Quote */}
                  {showcasePlayer.favoriteQuote && (
                    <blockquote className="text-gray-600 dark:text-gray-400 italic border-l-4 border-blue-500 pl-4">
                      "{showcasePlayer.favoriteQuote}"
                    </blockquote>
                  )}

                  {/* Join Date */}
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Champion since {new Date(showcasePlayer.joinedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Specialties */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Specialties</h4>
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  {showcasePlayer.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getSpecialtyColor(specialty)}`}
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Stats */}
            <div className="space-y-6">
              {/* Main Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-4 rounded-xl text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {showcasePlayer.totalXP.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total XP</div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 p-4 rounded-xl text-center">
                  <div className="text-3xl font-bold text-purple-600">
                    {showcasePlayer.level}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Level</div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 p-4 rounded-xl text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {showcasePlayer.achievements}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Achievements</div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 p-4 rounded-xl text-center">
                  <div className="text-3xl font-bold text-orange-600">
                    🔥 {showcasePlayer.streak}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Day Streak</div>
                </div>
              </div>

              {/* Detailed Stats */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Performance Stats</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">📈 Trading Wins</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {showcasePlayer.stats.tradingWins}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">👥 Social Connections</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {showcasePlayer.stats.socialConnections}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">🎯 Quests Completed</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {showcasePlayer.stats.questsCompleted}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">🏅 Badges Earned</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {showcasePlayer.stats.badgesEarned}
                    </span>
                  </div>
                </div>
              </div>

              {/* View Profile Button */}
              <button
                onClick={() => onPlayerClick?.(showcasePlayer)}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                View Full Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Top 5 Navigation */}
      <div className="flex justify-center space-x-4">
        {topFive.map((player, index) => {
          const isActive = index === currentShowcase;
          const rankDisplay = getRankDisplay(player.rank);
          
          return (
            <button
              key={player.id}
              onClick={() => {
                setCurrentShowcase(index);
                setIsAutoRotating(false);
              }}
              className={`relative p-3 rounded-xl border-2 transition-all duration-300 transform ${
                isActive
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 scale-110'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              {/* Rank Badge */}
              <div className="absolute -top-2 -left-2">
                <div className={`w-6 h-6 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center text-xs font-bold ${rankDisplay.color}`}>
                  {player.rank}
                </div>
              </div>

              {/* Player Avatar */}
              <img
                src={player.avatar}
                alt={player.username}
                className="w-12 h-12 rounded-full border-2 border-gray-200 dark:border-gray-600"
              />

              {/* Player Name */}
              <div className="mt-2 text-xs font-medium text-gray-900 dark:text-white truncate max-w-16">
                {player.username}
              </div>

              {/* Online Status */}
              <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${
                player.isOnline ? 'bg-green-500' : 'bg-gray-400'
              }`}></div>

              {/* Active Indicator */}
              {isActive && (
                <div className="absolute inset-0 bg-blue-500 rounded-xl opacity-10 animate-pulse"></div>
              )}
            </button>
          );
        })}
      </div>

      {/* Rotation Indicator */}
      {isAutoRotating && (
        <div className="flex justify-center">
          <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-full flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Auto-rotating every 10 seconds
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopPlayersShowcase;