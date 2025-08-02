'use client';

import React, { useState } from 'react';

interface Friend {
  id: string;
  username: string;
  avatar: string;
  level: number;
  xp: number;
  rank: number;
  isOnline: boolean;
  lastSeen?: string;
  mutualFriends: number;
  recentActivity?: string;
  achievements: number;
  favoriteCategory: string;
}

interface FriendsLeaderboardProps {
  friends: Friend[];
  currentPlayer: Friend;
  onInviteFriend?: () => void;
  onChallengePlayer?: (friend: Friend) => void;
  onViewProfile?: (friend: Friend) => void;
  className?: string;
}

export const FriendsLeaderboard: React.FC<FriendsLeaderboardProps> = ({
  friends,
  currentPlayer,
  onInviteFriend,
  onChallengePlayer,
  onViewProfile,
  className = ''
}) => {
  const [sortBy, setSortBy] = useState<'xp' | 'level' | 'recent'>('xp');
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      trading: '📈',
      social: '👥',
      achievements: '🏆',
      gaming: '🎮',
      learning: '📚'
    };
    return icons[category] || '🎯';
  };

  const getActivityColor = (activity?: string) => {
    switch (activity) {
      case 'trading': return 'text-green-600 bg-green-100 dark:bg-green-900';
      case 'learning': return 'text-blue-600 bg-blue-100 dark:bg-blue-900';
      case 'gaming': return 'text-purple-600 bg-purple-100 dark:bg-purple-900';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
    }
  };

  const sortedFriends = [...friends].sort((a, b) => {
    switch (sortBy) {
      case 'level':
        return b.level - a.level;
      case 'recent':
        if (a.isOnline && !b.isOnline) return -1;
        if (!a.isOnline && b.isOnline) return 1;
        return new Date(b.lastSeen || '').getTime() - new Date(a.lastSeen || '').getTime();
      default:
        return b.xp - a.xp;
    }
  });

  const filteredFriends = showOnlineOnly 
    ? sortedFriends.filter(friend => friend.isOnline)
    : sortedFriends;

  const onlineFriendsCount = friends.filter(f => f.isOnline).length;
  const currentPlayerPosition = sortedFriends.findIndex(f => f.id === currentPlayer.id) + 1;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
            <span>👥</span>
            <span>Friends Leaderboard</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Compete with your friends • {onlineFriendsCount} online now
          </p>
        </div>

        <button
          onClick={onInviteFriend}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors flex items-center space-x-2"
        >
          <span>➕</span>
          <span>Invite Friends</span>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
          <div className="text-2xl font-bold text-blue-600">{friends.length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Friends</div>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
          <div className="text-2xl font-bold text-green-600">{onlineFriendsCount}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Online Now</div>
        </div>
        
        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl">
          <div className="text-2xl font-bold text-purple-600">#{currentPlayerPosition}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Your Rank</div>
        </div>
        
        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl">
          <div className="text-2xl font-bold text-orange-600">
            {Math.max(...friends.map(f => f.achievements))}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Top Achievements</div>
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
            <option value="xp">⚡ XP</option>
            <option value="level">📊 Level</option>
            <option value="recent">🕒 Recently Active</option>
          </select>
        </div>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Online only</span>
        </label>
      </div>

      {/* Current Player Card */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={currentPlayer.avatar}
                alt={currentPlayer.username}
                className="w-12 h-12 rounded-full border-4 border-blue-300"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-white text-xs">👤</span>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">
                {currentPlayer.username} (You)
              </h3>
              <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                <span>Level {currentPlayer.level}</span>
                <span>{currentPlayer.xp.toLocaleString()} XP</span>
                <span>🏆 {currentPlayer.achievements}</span>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">#{currentPlayerPosition}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Among Friends</div>
          </div>
        </div>
      </div>

      {/* Friends List */}
      <div className="space-y-3">
        {filteredFriends.map((friend, index) => {
          const displayRank = sortedFriends.findIndex(f => f.id === friend.id) + 1;
          
          return (
            <div
              key={friend.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                {/* Left: Rank + Player Info */}
                <div className="flex items-center space-x-4">
                  {/* Rank */}
                  <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center font-bold text-gray-600 dark:text-gray-400">
                    #{displayRank}
                  </div>

                  {/* Avatar */}
                  <div className="relative">
                    <img
                      src={friend.avatar}
                      alt={friend.username}
                      className="w-12 h-12 rounded-full border-2 border-gray-200 dark:border-gray-600"
                    />
                    
                    {/* Online Status */}
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800 ${
                      friend.isOnline ? 'bg-green-500' : 'bg-gray-400'
                    }`}></div>
                  </div>

                  {/* Player Details */}
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {friend.username}
                      </h3>
                      <span className="text-lg">{getCategoryIcon(friend.favoriteCategory)}</span>
                    </div>
                    
                    <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                      <span>Level {friend.level}</span>
                      <span>{friend.xp.toLocaleString()} XP</span>
                      <span>🏆 {friend.achievements}</span>
                    </div>

                    {/* Status/Activity */}
                    <div className="flex items-center space-x-2 mt-1">
                      {friend.isOnline ? (
                        <span className="text-green-600 text-sm font-medium">🟢 Online</span>
                      ) : (
                        <span className="text-gray-500 text-sm">
                          Last seen {friend.lastSeen ? new Date(friend.lastSeen).toLocaleDateString() : 'recently'}
                        </span>
                      )}
                      
                      {friend.recentActivity && (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActivityColor(friend.recentActivity)}`}>
                          {friend.recentActivity}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center space-x-2">
                  {friend.mutualFriends > 0 && (
                    <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                      {friend.mutualFriends} mutual
                    </span>
                  )}

                  <button
                    onClick={() => onViewProfile?.(friend)}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Profile
                  </button>

                  <button
                    onClick={() => onChallengePlayer?.(friend)}
                    className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm transition-colors"
                  >
                    Challenge
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredFriends.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">👥</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {showOnlineOnly ? 'No friends online' : 'No friends yet'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {showOnlineOnly 
              ? 'Check back later when your friends are active!'
              : 'Start building your network by inviting friends to join!'}
          </p>
          {!showOnlineOnly && (
            <button
              onClick={onInviteFriend}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
            >
              Invite Your First Friend
            </button>
          )}
        </div>
      )}

      {/* Friend Challenges Section */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          🎯 Weekly Friend Challenges
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-2xl">⚡</span>
              <h4 className="font-semibold text-gray-900 dark:text-white">XP Race</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Compete to earn the most XP this week
            </p>
            <div className="mt-2 text-xs text-blue-600">
              Winner gets 1000 bonus XP
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-2xl">🏆</span>
              <h4 className="font-semibold text-gray-900 dark:text-white">Achievement Hunt</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Who can unlock the most achievements
            </p>
            <div className="mt-2 text-xs text-purple-600">
              Winner gets exclusive badge
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsLeaderboard;