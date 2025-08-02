'use client';

import React, { useState, useEffect } from 'react';

interface PowerUp {
  id: string;
  name: string;
  type: 'temporary' | 'consumable' | 'passive' | 'activated';
  category: 'xp_boost' | 'coin_multiplier' | 'trading_bonus' | 'social_bonus' | 'speed_boost' | 'luck_boost';
  icon: string;
  description: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
  effects: {
    stat: string;
    modifier: number;
    type: 'percentage' | 'flat' | 'multiply';
  }[];
  duration?: number; // in minutes, undefined for permanent
  cooldown?: number; // in seconds
  maxStack: number;
  currentStack: number;
  isActive: boolean;
  remainingTime?: number; // in seconds
  lastUsed?: number; // timestamp
}

interface PowerUpsProps {
  powerUps: PowerUp[];
  onActivatePowerUp: (powerUpId: string) => void;
  onDeactivatePowerUp?: (powerUpId: string) => void;
  className?: string;
}

export const PowerUps: React.FC<PowerUpsProps> = ({
  powerUps,
  onActivatePowerUp,
  onDeactivatePowerUp,
  className = ''
}) => {
  const [selectedPowerUp, setSelectedPowerUp] = useState<PowerUp | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');

  // Update timers every second
  useEffect(() => {
    const interval = setInterval(() => {
      // This would normally be handled by the parent component
      // but we can trigger a re-render to update displayed times
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getRarityColors = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return {
          bg: 'bg-gray-100 dark:bg-gray-700',
          border: 'border-gray-300 dark:border-gray-600',
          glow: 'shadow-gray-400/50'
        };
      case 'rare':
        return {
          bg: 'bg-blue-100 dark:bg-blue-900/30',
          border: 'border-blue-300 dark:border-blue-600',
          glow: 'shadow-blue-400/50'
        };
      case 'epic':
        return {
          bg: 'bg-purple-100 dark:bg-purple-900/30',
          border: 'border-purple-300 dark:border-purple-600',
          glow: 'shadow-purple-400/50'
        };
      case 'legendary':
        return {
          bg: 'bg-yellow-100 dark:bg-yellow-900/30',
          border: 'border-yellow-300 dark:border-yellow-600',
          glow: 'shadow-yellow-400/50'
        };
      case 'mythic':
        return {
          bg: 'bg-pink-100 dark:bg-pink-900/30',
          border: 'border-pink-300 dark:border-pink-600',
          glow: 'shadow-pink-400/50'
        };
      default:
        return {
          bg: 'bg-gray-100 dark:bg-gray-700',
          border: 'border-gray-300 dark:border-gray-600',
          glow: 'shadow-gray-400/50'
        };
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'xp_boost': return '⚡';
      case 'coin_multiplier': return '🪙';
      case 'trading_bonus': return '📈';
      case 'social_bonus': return '👥';
      case 'speed_boost': return '💨';
      case 'luck_boost': return '🍀';
      default: return '✨';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'temporary': return '⏱️';
      case 'consumable': return '🧪';
      case 'passive': return '🔄';
      case 'activated': return '🎯';
      default: return '💫';
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${secs}s`;
    return `${secs}s`;
  };

  const canActivate = (powerUp: PowerUp) => {
    if (powerUp.currentStack <= 0) return false;
    if (powerUp.isActive && powerUp.type === 'temporary') return false;
    
    if (powerUp.cooldown && powerUp.lastUsed) {
      const timeSinceUsed = (Date.now() - powerUp.lastUsed) / 1000;
      return timeSinceUsed >= powerUp.cooldown;
    }
    
    return true;
  };

  const getCooldownRemaining = (powerUp: PowerUp) => {
    if (!powerUp.cooldown || !powerUp.lastUsed) return 0;
    const timeSinceUsed = (Date.now() - powerUp.lastUsed) / 1000;
    return Math.max(0, powerUp.cooldown - timeSinceUsed);
  };

  const filteredPowerUps = powerUps.filter(powerUp => {
    if (filterCategory !== 'all' && powerUp.category !== filterCategory) return false;
    if (filterType !== 'all' && powerUp.type !== filterType) return false;
    return true;
  });

  const activePowerUps = powerUps.filter(p => p.isActive);
  const totalEffects = activePowerUps.reduce((effects, powerUp) => {
    powerUp.effects.forEach(effect => {
      if (!effects[effect.stat]) effects[effect.stat] = { percentage: 0, flat: 0, multiply: 1 };
      
      if (effect.type === 'percentage') {
        effects[effect.stat].percentage += effect.modifier;
      } else if (effect.type === 'flat') {
        effects[effect.stat].flat += effect.modifier;
      } else if (effect.type === 'multiply') {
        effects[effect.stat].multiply *= effect.modifier;
      }
    });
    return effects;
  }, {} as Record<string, { percentage: number; flat: number; multiply: number }>);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
            <span>✨</span>
            <span>Power-Ups</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Boost your abilities with temporary and permanent enhancements
          </p>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold text-purple-600">
            {activePowerUps.length}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Active
          </div>
        </div>
      </div>

      {/* Active Power-Ups Bar */}
      {activePowerUps.length > 0 && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">🔥 Active Power-Ups</h3>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {activePowerUps.map(powerUp => {
              const colors = getRarityColors(powerUp.rarity);
              
              return (
                <div
                  key={powerUp.id}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${colors.bg} ${colors.border} border`}
                >
                  <span className="text-lg">{powerUp.icon}</span>
                  <div>
                    <div className="font-semibold text-sm text-gray-900 dark:text-white">
                      {powerUp.name}
                    </div>
                    {powerUp.remainingTime && (
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {formatTime(powerUp.remainingTime)} left
                      </div>
                    )}
                  </div>
                  
                  {onDeactivatePowerUp && powerUp.type === 'activated' && (
                    <button
                      onClick={() => onDeactivatePowerUp(powerUp.id)}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      ✕
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Total Effects Summary */}
          {Object.keys(totalEffects).length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(totalEffects).map(([stat, effects]) => (
                <div key={stat} className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center">
                  <div className="text-lg font-bold text-purple-600">
                    {effects.percentage > 0 && `+${effects.percentage}%`}
                    {effects.flat > 0 && ` +${effects.flat}`}
                    {effects.multiply > 1 && ` ×${effects.multiply.toFixed(1)}`}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                    {stat.replace('_', ' ')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Category:</label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
          >
            <option value="all">All Categories</option>
            <option value="xp_boost">⚡ XP Boost</option>
            <option value="coin_multiplier">🪙 Coin Multiplier</option>
            <option value="trading_bonus">📈 Trading Bonus</option>
            <option value="social_bonus">👥 Social Bonus</option>
            <option value="speed_boost">💨 Speed Boost</option>
            <option value="luck_boost">🍀 Luck Boost</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Type:</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
          >
            <option value="all">All Types</option>
            <option value="temporary">⏱️ Temporary</option>
            <option value="consumable">🧪 Consumable</option>
            <option value="passive">🔄 Passive</option>
            <option value="activated">🎯 Activated</option>
          </select>
        </div>
      </div>

      {/* Power-Ups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPowerUps.map(powerUp => {
          const colors = getRarityColors(powerUp.rarity);
          const canUse = canActivate(powerUp);
          const cooldownRemaining = getCooldownRemaining(powerUp);
          
          return (
            <div
              key={powerUp.id}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 transform hover:scale-105 ${
                powerUp.isActive
                  ? `${colors.bg} ${colors.border} ${colors.glow} shadow-lg ring-2 ring-purple-400`
                  : canUse
                  ? `${colors.bg} ${colors.border} hover:shadow-md`
                  : `${colors.bg} ${colors.border} opacity-60`
              }`}
              onClick={() => setSelectedPowerUp(powerUp)}
            >
              {/* Power-Up Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <span className="text-3xl">{powerUp.icon}</span>
                    {powerUp.isActive && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      {powerUp.name}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${colors.bg}`}>
                        {powerUp.rarity.toUpperCase()}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {getTypeIcon(powerUp.type)} {powerUp.type}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stack Count */}
                {powerUp.maxStack > 1 && (
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {powerUp.currentStack}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      / {powerUp.maxStack}
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {powerUp.description}
              </p>

              {/* Effects */}
              <div className="space-y-1 mb-3">
                {powerUp.effects.map((effect, index) => (
                  <div key={index} className="text-sm text-green-600 dark:text-green-400">
                    • {effect.stat.replace('_', ' ')}: 
                    {effect.type === 'percentage' && ` +${effect.modifier}%`}
                    {effect.type === 'flat' && ` +${effect.modifier}`}
                    {effect.type === 'multiply' && ` ×${effect.modifier}`}
                  </div>
                ))}
              </div>

              {/* Duration/Cooldown Info */}
              <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
                {powerUp.duration && (
                  <div>Duration: {formatTime(powerUp.duration * 60)}</div>
                )}
                {powerUp.cooldown && (
                  <div>
                    Cooldown: {formatTime(powerUp.cooldown)}
                    {cooldownRemaining > 0 && (
                      <span className="text-red-500"> ({formatTime(cooldownRemaining)} remaining)</span>
                    )}
                  </div>
                )}
              </div>

              {/* Active Time Remaining */}
              {powerUp.isActive && powerUp.remainingTime && (
                <div className="mt-3">
                  <div className="flex justify-between items-center text-sm mb-1">
                    <span className="text-green-600 dark:text-green-400">Active</span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {formatTime(powerUp.remainingTime)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                      style={{
                        width: powerUp.duration
                          ? `${(powerUp.remainingTime / (powerUp.duration * 60)) * 100}%`
                          : '100%'
                      }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Action Button */}
              <div className="mt-4">
                {powerUp.currentStack <= 0 ? (
                  <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
                    Out of stock
                  </div>
                ) : cooldownRemaining > 0 ? (
                  <div className="text-center text-orange-600 text-sm">
                    Cooldown: {formatTime(cooldownRemaining)}
                  </div>
                ) : powerUp.isActive && powerUp.type === 'temporary' ? (
                  <div className="text-center text-green-600 text-sm font-semibold">
                    ✓ Active
                  </div>
                ) : canUse ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onActivatePowerUp(powerUp.id);
                    }}
                    className="w-full py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition-colors"
                  >
                    {powerUp.type === 'consumable' ? 'Use' : 'Activate'}
                  </button>
                ) : (
                  <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
                    Cannot activate
                  </div>
                )}
              </div>

              {/* Glow effect for active power-ups */}
              {powerUp.isActive && (
                <div className={`absolute -inset-1 rounded-xl blur opacity-25 animate-pulse ${
                  powerUp.rarity === 'legendary' ? 'bg-yellow-400' :
                  powerUp.rarity === 'mythic' ? 'bg-pink-400' :
                  'bg-purple-400'
                }`}></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Power-Up Detail Modal */}
      {selectedPowerUp && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={() => setSelectedPowerUp(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="text-4xl">{selectedPowerUp.icon}</div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {selectedPowerUp.name}
                </h3>
                <div className="flex items-center space-x-2 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${getRarityColors(selectedPowerUp.rarity).bg}`}>
                    {selectedPowerUp.rarity.toUpperCase()}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {getCategoryIcon(selectedPowerUp.category)} {selectedPowerUp.category.replace('_', ' ')}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {selectedPowerUp.description}
            </p>

            {/* Detailed Effects */}
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Effects:</h4>
              <div className="space-y-2">
                {selectedPowerUp.effects.map((effect, index) => (
                  <div key={index} className="p-2 bg-green-50 dark:bg-green-900/30 rounded-lg">
                    <div className="font-semibold text-green-700 dark:text-green-300">
                      {effect.stat.replace('_', ' ').toUpperCase()}
                    </div>
                    <div className="text-sm text-green-600 dark:text-green-400">
                      {effect.type === 'percentage' && `+${effect.modifier}% increase`}
                      {effect.type === 'flat' && `+${effect.modifier} flat bonus`}
                      {effect.type === 'multiply' && `×${effect.modifier} multiplier`}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400">Stock</div>
                <div className="font-bold text-gray-900 dark:text-white">
                  {selectedPowerUp.currentStack} / {selectedPowerUp.maxStack}
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400">Type</div>
                <div className="font-bold text-gray-900 dark:text-white capitalize">
                  {selectedPowerUp.type}
                </div>
              </div>
              
              {selectedPowerUp.duration && (
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Duration</div>
                  <div className="font-bold text-gray-900 dark:text-white">
                    {formatTime(selectedPowerUp.duration * 60)}
                  </div>
                </div>
              )}
              
              {selectedPowerUp.cooldown && (
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Cooldown</div>
                  <div className="font-bold text-gray-900 dark:text-white">
                    {formatTime(selectedPowerUp.cooldown)}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex space-x-3">
              <button
                onClick={() => setSelectedPowerUp(null)}
                className="flex-1 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
              >
                Close
              </button>
              {canActivate(selectedPowerUp) && (
                <button
                  onClick={() => {
                    onActivatePowerUp(selectedPowerUp.id);
                    setSelectedPowerUp(null);
                  }}
                  className="flex-1 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition-colors"
                >
                  {selectedPowerUp.type === 'consumable' ? 'Use' : 'Activate'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredPowerUps.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">✨</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No power-ups found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your filters or collect more power-ups!
          </p>
        </div>
      )}
    </div>
  );
};

export default PowerUps;