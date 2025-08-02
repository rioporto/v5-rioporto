'use client';

import React, { useState, useEffect } from 'react';
import { MatrixRainGaming } from '../particles/MatrixRainGaming';
import { EnergyOrbs } from '../particles/EnergyOrbs';
import { NeonGlow } from '../effects/NeonGlow';

interface BonusRoomProps {
  isActive?: boolean;
  onExit?: () => void;
  onRewardClaimed?: (reward: string) => void;
  className?: string;
}

interface Reward {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  claimed: boolean;
  value: number;
}

export const BonusRoom: React.FC<BonusRoomProps> = ({
  isActive = false,
  onExit,
  onRewardClaimed,
  className = ''
}) => {
  const [isEntering, setIsEntering] = useState(false);
  const [currentRewards, setCurrentRewards] = useState<Reward[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(60); // 60 seconds
  const [gamePhase, setGamePhase] = useState<'entering' | 'exploring' | 'reward' | 'exiting'>('entering');

  const availableRewards: Reward[] = [
    {
      id: 'crypto-badge',
      name: 'Crypto Explorer Badge',
      description: 'A special badge for discovering the bonus room',
      icon: '🏆',
      rarity: 'epic',
      claimed: false,
      value: 100
    },
    {
      id: 'bonus-xp',
      name: 'Bonus XP',
      description: '500 extra experience points',
      icon: '⭐',
      rarity: 'common',
      claimed: false,
      value: 500
    },
    {
      id: 'neon-theme',
      name: 'Neon Theme Unlock',
      description: 'Access to exclusive neon visual effects',
      icon: '🌈',
      rarity: 'rare',
      claimed: false,
      value: 200
    },
    {
      id: 'secret-achievement',
      name: 'Secret Master',
      description: 'Legendary achievement for finding all secrets',
      icon: '💎',
      rarity: 'legendary',
      claimed: false,
      value: 1000
    },
    {
      id: 'particle-effects',
      name: 'Premium Particle Effects',
      description: 'Unlock exclusive particle systems',
      icon: '✨',
      rarity: 'epic',
      claimed: false,
      value: 300
    }
  ];

  useEffect(() => {
    if (isActive) {
      setIsEntering(true);
      setGamePhase('entering');
      
      // Generate random rewards for this session
      const shuffled = [...availableRewards].sort(() => Math.random() - 0.5);
      setCurrentRewards(shuffled.slice(0, 3));
      
      setTimeout(() => {
        setIsEntering(false);
        setGamePhase('exploring');
      }, 2000);
    }
  }, [isActive]);

  // Timer countdown
  useEffect(() => {
    if (gamePhase === 'exploring' && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setGamePhase('exiting');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gamePhase, timeRemaining]);

  // Auto exit after time runs out
  useEffect(() => {
    if (gamePhase === 'exiting') {
      setTimeout(() => {
        onExit?.();
      }, 3000);
    }
  }, [gamePhase, onExit]);

  const handleRewardClaim = (reward: Reward) => {
    setCurrentRewards(prev => 
      prev.map(r => r.id === reward.id ? { ...r, claimed: true } : r)
    );
    onRewardClaimed?.(reward.id);

    // Check if all rewards claimed
    const allClaimed = currentRewards.every(r => r.claimed || r.id === reward.id);
    if (allClaimed) {
      setTimeout(() => {
        setGamePhase('reward');
      }, 1000);
    }
  };

  const getRarityColor = (rarity: Reward['rarity']) => {
    switch (rarity) {
      case 'common': return '#ffffff';
      case 'rare': return '#00ffff';
      case 'epic': return '#8000ff';
      case 'legendary': return '#ffd700';
      default: return '#ffffff';
    }
  };

  const getRarityGlow = (rarity: Reward['rarity']) => {
    const color = getRarityColor(rarity);
    return `0 0 20px ${color}, 0 0 40px ${color}`;
  };

  if (!isActive) return null;

  return (
    <div className={`fixed inset-0 z-50 bg-black ${className}`}>
      {/* Background Effects */}
      <MatrixRainGaming 
        density={30} 
        gaming={true} 
        colors={['#00ff41', '#ff0080', '#00ffff']}
        className="opacity-20"
      />
      
      <EnergyOrbs 
        count={8} 
        colors={['#00ffff', '#ff0080', '#ffff00']} 
        className="opacity-30"
      />

      {/* Entering Animation */}
      {isEntering && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <NeonGlow 
              text="BONUS ROOM DISCOVERED" 
              color="#00ffff" 
              intensity="extreme" 
              animation="pulse"
              size="2xl"
              className="mb-8"
            />
            <div className="text-green-400 text-lg animate-pulse">
              Initializing rewards...
            </div>
          </div>
        </div>
      )}

      {/* Main Bonus Room Interface */}
      {gamePhase === 'exploring' && (
        <div className="absolute inset-0 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <NeonGlow 
              text="🎮 BONUS ROOM 🎮" 
              color="#ff0080" 
              intensity="high" 
              size="xl"
              className="mb-4"
            />
            <div className="text-cyan-400 text-lg">
              Collect all rewards before time runs out!
            </div>
            <div className="text-yellow-400 text-2xl font-mono mt-2">
              {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
            </div>
          </div>

          {/* Rewards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {currentRewards.map(reward => (
              <div
                key={reward.id}
                className={`
                  relative p-6 rounded-lg border-2 transition-all duration-300 cursor-pointer
                  ${reward.claimed 
                    ? 'bg-gray-900/50 border-gray-600 opacity-50' 
                    : 'bg-black/70 hover:bg-black/90'
                  }
                `}
                style={{
                  borderColor: reward.claimed ? '#666' : getRarityColor(reward.rarity),
                  boxShadow: reward.claimed ? 'none' : getRarityGlow(reward.rarity),
                }}
                onClick={() => !reward.claimed && handleRewardClaim(reward)}
              >
                {/* Reward Icon */}
                <div className="text-6xl text-center mb-4 animate-bounce">
                  {reward.claimed ? '✅' : reward.icon}
                </div>

                {/* Reward Info */}
                <div className="text-center">
                  <div 
                    className="font-bold text-lg mb-2"
                    style={{ color: getRarityColor(reward.rarity) }}
                  >
                    {reward.name}
                  </div>
                  <div className="text-gray-300 text-sm mb-3">
                    {reward.description}
                  </div>
                  <div className="text-yellow-400 font-mono">
                    {reward.value} XP
                  </div>
                </div>

                {/* Rarity Badge */}
                <div 
                  className="absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold"
                  style={{ 
                    backgroundColor: `${getRarityColor(reward.rarity)}20`,
                    color: getRarityColor(reward.rarity),
                    border: `1px solid ${getRarityColor(reward.rarity)}`
                  }}
                >
                  {reward.rarity.toUpperCase()}
                </div>

                {/* Claim Animation */}
                {reward.claimed && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-green-400 text-xl font-bold animate-ping">
                      CLAIMED!
                    </div>
                  </div>
                )}

                {/* Hover Effects */}
                {!reward.claimed && (
                  <div className="absolute inset-0 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div 
                      className="absolute inset-0 rounded-lg animate-pulse"
                      style={{
                        background: `radial-gradient(circle, ${getRarityColor(reward.rarity)}10 0%, transparent 70%)`
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Instructions */}
          <div className="text-center mt-8">
            <div className="text-gray-400 text-sm">
              Click on rewards to claim them • Time bonus for collecting all rewards
            </div>
          </div>
        </div>
      )}

      {/* Reward Complete Phase */}
      {gamePhase === 'reward' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-8xl mb-8 animate-bounce">🎉</div>
            <NeonGlow 
              text="ALL REWARDS CLAIMED!" 
              color="#ffd700" 
              intensity="extreme" 
              animation="rainbow"
              size="2xl"
              className="mb-4"
            />
            <div className="text-green-400 text-xl mb-4">
              Bonus XP: +{currentRewards.reduce((sum, r) => sum + r.value, 0)}
            </div>
            <div className="text-cyan-400">
              You are a true RioPorto explorer! 🚀
            </div>
          </div>
        </div>
      )}

      {/* Exiting Phase */}
      {gamePhase === 'exiting' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <NeonGlow 
              text="TIME'S UP!" 
              color="#ff0040" 
              intensity="high" 
              animation="flicker"
              size="2xl"
              className="mb-4"
            />
            <div className="text-yellow-400 text-lg">
              Returning to main interface...
            </div>
          </div>
        </div>
      )}

      {/* Exit Button */}
      {gamePhase === 'exploring' && (
        <button
          onClick={onExit}
          className="absolute top-4 right-4 px-4 py-2 bg-red-900/50 border border-red-400 text-red-400 rounded hover:bg-red-800/50 transition-colors"
        >
          Exit Room
        </button>
      )}

      {/* Progress Bar */}
      {gamePhase === 'exploring' && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-80">
          <div className="bg-gray-800 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-red-500 transition-all duration-1000"
              style={{ width: `${(timeRemaining / 60) * 100}%` }}
            />
          </div>
          <div className="text-center text-sm text-gray-400 mt-1">
            Time Remaining
          </div>
        </div>
      )}

      {/* Particle Effects for Claimed Rewards */}
      {currentRewards.some(r => r.claimed) && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 15 }, (_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 100}ms`,
                animationDuration: `${1 + Math.random()}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BonusRoom;