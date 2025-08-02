'use client';

import React, { useState, useEffect } from 'react';

interface Reward {
  id: string;
  type: 'xp' | 'coins' | 'item' | 'badge' | 'power_up' | 'multiplier';
  name: string;
  amount?: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
  icon: string;
  description: string;
}

interface ChestType {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
  cost?: number;
  requiredLevel?: number;
  cooldown?: number; // in seconds
  guaranteedRewards: number;
  possibleRewards: Reward[];
}

interface RewardChestProps {
  chest: ChestType;
  isAvailable: boolean;
  isOpening: boolean;
  cooldownRemaining?: number;
  onOpenChest: (chestId: string) => void;
  onRewardsReceived?: (rewards: Reward[]) => void;
  className?: string;
}

export const RewardChest: React.FC<RewardChestProps> = ({
  chest,
  isAvailable,
  isOpening,
  cooldownRemaining = 0,
  onOpenChest,
  onRewardsReceived,
  className = ''
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showRewards, setShowRewards] = useState(false);
  const [receivedRewards, setReceivedRewards] = useState<Reward[]>([]);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string }>>([]);

  useEffect(() => {
    if (isOpening) {
      setIsAnimating(true);
      
      // Generate particles
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: getParticleColor(chest.rarity)
      }));
      setParticles(newParticles);

      // Simulate chest opening delay
      const timer = setTimeout(() => {
        const rewards = generateRewards();
        setReceivedRewards(rewards);
        setShowRewards(true);
        setIsAnimating(false);
        onRewardsReceived?.(rewards);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isOpening]);

  const generateRewards = (): Reward[] => {
    // Simple reward generation logic
    const rewards: Reward[] = [];
    const numRewards = chest.guaranteedRewards + Math.floor(Math.random() * 2);
    
    for (let i = 0; i < numRewards; i++) {
      const randomReward = chest.possibleRewards[Math.floor(Math.random() * chest.possibleRewards.length)];
      rewards.push(randomReward);
    }
    
    return rewards;
  };

  const getParticleColor = (rarity: string) => {
    const colors = {
      common: 'bg-gray-400',
      rare: 'bg-blue-400',
      epic: 'bg-purple-400',
      legendary: 'bg-yellow-400',
      mythic: 'bg-pink-400'
    };
    return colors[rarity as keyof typeof colors] || colors.common;
  };

  const getRarityColors = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return {
          gradient: 'from-gray-400 to-gray-600',
          glow: 'shadow-gray-400/50',
          border: 'border-gray-400'
        };
      case 'rare':
        return {
          gradient: 'from-blue-400 to-blue-600',
          glow: 'shadow-blue-400/50',
          border: 'border-blue-400'
        };
      case 'epic':
        return {
          gradient: 'from-purple-400 to-purple-600',
          glow: 'shadow-purple-400/50',
          border: 'border-purple-400'
        };
      case 'legendary':
        return {
          gradient: 'from-yellow-400 to-orange-500',
          glow: 'shadow-yellow-400/50',
          border: 'border-yellow-400'
        };
      case 'mythic':
        return {
          gradient: 'from-pink-400 via-purple-500 to-indigo-500',
          glow: 'shadow-pink-400/50',
          border: 'border-pink-400'
        };
      default:
        return {
          gradient: 'from-gray-400 to-gray-600',
          glow: 'shadow-gray-400/50',
          border: 'border-gray-400'
        };
    }
  };

  const formatCooldown = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${secs}s`;
    return `${secs}s`;
  };

  const colors = getRarityColors(chest.rarity);

  return (
    <div className={`relative ${className}`}>
      {/* Particles Effect */}
      {(isAnimating || showRewards) && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className={`absolute w-2 h-2 ${particle.color} rounded-full animate-ping opacity-75`}
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: '3s'
              }}
            />
          ))}
        </div>
      )}

      {/* Chest Container */}
      <div
        className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
          isAvailable && !cooldownRemaining
            ? `${colors.border} ${colors.glow} cursor-pointer hover:scale-105 transform shadow-lg`
            : 'border-gray-300 dark:border-gray-600 opacity-60'
        } ${
          isAnimating ? 'animate-bounce' : ''
        } bg-white dark:bg-gray-800`}
        onClick={() => {
          if (isAvailable && !cooldownRemaining && !isOpening) {
            onOpenChest(chest.id);
          }
        }}
      >
        {/* Glow Effect */}
        {isAvailable && !cooldownRemaining && (
          <div className={`absolute -inset-1 bg-gradient-to-r ${colors.gradient} rounded-2xl blur opacity-25 animate-pulse`}></div>
        )}

        <div className="relative text-center space-y-4">
          {/* Chest Icon */}
          <div className={`text-6xl transition-transform duration-300 ${
            isAnimating ? 'scale-125 rotate-12' : ''
          }`}>
            {chest.icon}
          </div>

          {/* Chest Info */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {chest.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {chest.description}
            </p>

            {/* Rarity Badge */}
            <div className={`inline-block px-3 py-1 rounded-full text-sm font-bold text-white bg-gradient-to-r ${colors.gradient} mb-4`}>
              {chest.rarity.toUpperCase()}
            </div>
          </div>

          {/* Cost/Requirements */}
          <div className="space-y-2">
            {chest.cost && (
              <div className="flex items-center justify-center space-x-2 text-sm">
                <span className="text-yellow-500">🪙</span>
                <span className="text-gray-600 dark:text-gray-400">{chest.cost} coins</span>
              </div>
            )}
            
            {chest.requiredLevel && (
              <div className="flex items-center justify-center space-x-2 text-sm">
                <span className="text-blue-500">📊</span>
                <span className="text-gray-600 dark:text-gray-400">Level {chest.requiredLevel}+ required</span>
              </div>
            )}

            <div className="text-sm text-gray-500 dark:text-gray-400">
              {chest.guaranteedRewards} guaranteed rewards
            </div>
          </div>

          {/* Status/Action */}
          <div>
            {cooldownRemaining > 0 ? (
              <div className="text-center">
                <div className="text-orange-600 font-semibold mb-2">🕒 Cooldown</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Available in {formatCooldown(cooldownRemaining)}
                </div>
              </div>
            ) : isOpening ? (
              <div className="text-center">
                <div className="text-blue-600 font-semibold mb-2">✨ Opening...</div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full animate-pulse w-full"></div>
                </div>
              </div>
            ) : isAvailable ? (
              <button className={`w-full py-3 px-6 bg-gradient-to-r ${colors.gradient} text-white rounded-lg font-semibold hover:scale-105 transform transition-all duration-200 shadow-lg`}>
                Open Chest
              </button>
            ) : (
              <div className="text-gray-500 dark:text-gray-400 font-semibold">
                Not Available
              </div>
            )}
          </div>
        </div>

        {/* Level Lock Overlay */}
        {chest.requiredLevel && !isAvailable && (
          <div className="absolute inset-0 bg-gray-900 bg-opacity-75 rounded-2xl flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-4xl mb-2">🔒</div>
              <div className="font-semibold">Level {chest.requiredLevel} Required</div>
            </div>
          </div>
        )}
      </div>

      {/* Rewards Modal */}
      {showRewards && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Chest Opened!
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Here are your rewards:
              </p>
            </div>

            {/* Rewards Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {receivedRewards.map((reward, index) => (
                <div
                  key={`${reward.id}-${index}`}
                  className={`p-4 rounded-xl bg-gradient-to-br ${getRarityColors(reward.rarity).gradient} text-white text-center shadow-lg`}
                >
                  <div className="text-3xl mb-2">{reward.icon}</div>
                  <div className="font-semibold text-sm mb-1">{reward.name}</div>
                  {reward.amount && (
                    <div className="text-xs opacity-75">x{reward.amount}</div>
                  )}
                </div>
              ))}
            </div>

            {/* Close Button */}
            <button
              onClick={() => {
                setShowRewards(false);
                setReceivedRewards([]);
                setParticles([]);
              }}
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
            >
              Claim Rewards
            </button>
          </div>
        </div>
      )}

      {/* Shine Effect */}
      {isAvailable && !cooldownRemaining && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shine transform -skew-x-12 rounded-2xl"></div>
      )}
    </div>
  );
};

export default RewardChest;