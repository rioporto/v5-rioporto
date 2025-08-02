'use client';

import React, { useState, useEffect } from 'react';

interface LootItem {
  id: string;
  name: string;
  type: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
  category: 'xp' | 'coins' | 'power_up' | 'cosmetic' | 'badge' | 'multiplier';
  icon: string;
  amount?: number;
  description: string;
  value: number;
}

interface LootBoxType {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
  cost: number;
  guaranteedItems: number;
  possibleItems: LootItem[];
}

interface LootBoxProps {
  lootBox: LootBoxType;
  isAvailable: boolean;
  isOpening: boolean;
  userCoins: number;
  onPurchase: (boxId: string) => void;
  onOpen: (boxId: string) => void;
  onItemsReceived?: (items: LootItem[]) => void;
  className?: string;
}

export const LootBox: React.FC<LootBoxProps> = ({
  lootBox,
  isAvailable,
  isOpening,
  userCoins,
  onPurchase,
  onOpen,
  onItemsReceived,
  className = ''
}) => {
  const [isPurchased, setIsPurchased] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [receivedItems, setReceivedItems] = useState<LootItem[]>([]);
  const [showItems, setShowItems] = useState(false);
  const [animationPhase, setAnimationPhase] = useState<'idle' | 'shaking' | 'opening' | 'revealing'>('idle');

  useEffect(() => {
    if (isOpening) {
      setIsAnimating(true);
      setAnimationPhase('shaking');

      // Shaking phase
      setTimeout(() => {
        setAnimationPhase('opening');
      }, 2000);

      // Opening phase
      setTimeout(() => {
        setAnimationPhase('revealing');
        const items = generateLootItems();
        setReceivedItems(items);
        setShowItems(true);
        onItemsReceived?.(items);
      }, 4000);

      // Complete animation
      setTimeout(() => {
        setIsAnimating(false);
        setAnimationPhase('idle');
      }, 6000);
    }
  }, [isOpening]);

  const generateLootItems = (): LootItem[] => {
    const items: LootItem[] = [];
    const itemPool = [...lootBox.possibleItems];
    
    // Generate guaranteed items
    for (let i = 0; i < lootBox.guaranteedItems; i++) {
      if (itemPool.length === 0) break;
      
      // Weighted random selection based on rarity
      const weights = itemPool.map(item => getRarityWeight(item.type));
      const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
      let random = Math.random() * totalWeight;
      
      let selectedIndex = 0;
      for (let j = 0; j < weights.length; j++) {
        random -= weights[j];
        if (random <= 0) {
          selectedIndex = j;
          break;
        }
      }
      
      const selectedItem = itemPool[selectedIndex];
      items.push({
        ...selectedItem,
        id: `${selectedItem.id}-${Date.now()}-${i}` // Ensure unique IDs
      });
      
      // Remove from pool if it's a unique item
      if (selectedItem.category === 'badge' || selectedItem.category === 'cosmetic') {
        itemPool.splice(selectedIndex, 1);
      }
    }
    
    return items;
  };

  const getRarityWeight = (rarity: string): number => {
    switch (rarity) {
      case 'mythic': return 1;
      case 'legendary': return 3;
      case 'epic': return 10;
      case 'rare': return 25;
      case 'common': return 60;
      default: return 30;
    }
  };

  const getRarityColors = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return {
          gradient: 'from-gray-400 to-gray-600',
          glow: 'shadow-gray-400/50',
          border: 'border-gray-400',
          bg: 'bg-gray-100 dark:bg-gray-700'
        };
      case 'rare':
        return {
          gradient: 'from-blue-400 to-blue-600',
          glow: 'shadow-blue-400/50',
          border: 'border-blue-400',
          bg: 'bg-blue-100 dark:bg-blue-900'
        };
      case 'epic':
        return {
          gradient: 'from-purple-400 to-purple-600',
          glow: 'shadow-purple-400/50',
          border: 'border-purple-400',
          bg: 'bg-purple-100 dark:bg-purple-900'
        };
      case 'legendary':
        return {
          gradient: 'from-yellow-400 to-orange-500',
          glow: 'shadow-yellow-400/50',
          border: 'border-yellow-400',
          bg: 'bg-yellow-100 dark:bg-yellow-900'
        };
      case 'mythic':
        return {
          gradient: 'from-pink-400 via-purple-500 to-indigo-500',
          glow: 'shadow-pink-400/50',
          border: 'border-pink-400',
          bg: 'bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900 dark:to-purple-900'
        };
      default:
        return {
          gradient: 'from-gray-400 to-gray-600',
          glow: 'shadow-gray-400/50',
          border: 'border-gray-400',
          bg: 'bg-gray-100 dark:bg-gray-700'
        };
    }
  };

  const canAfford = userCoins >= lootBox.cost;
  const colors = getRarityColors(lootBox.rarity);

  const getAnimationClasses = () => {
    switch (animationPhase) {
      case 'shaking':
        return 'animate-pulse scale-105';
      case 'opening':
        return 'animate-bounce scale-110';
      case 'revealing':
        return 'animate-ping scale-125';
      default:
        return '';
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Loot Box Container */}
      <div
        className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
          isAvailable && canAfford && !isPurchased
            ? `${colors.border} ${colors.glow} cursor-pointer hover:scale-105 transform shadow-lg`
            : 'border-gray-300 dark:border-gray-600 opacity-60'
        } ${getAnimationClasses()} bg-white dark:bg-gray-800`}
        onClick={() => {
          if (isAvailable && canAfford && !isPurchased && !isOpening) {
            onPurchase(lootBox.id);
            setIsPurchased(true);
          } else if (isPurchased && !isOpening) {
            onOpen(lootBox.id);
          }
        }}
      >
        {/* Glow Effect */}
        {isAvailable && canAfford && (
          <div className={`absolute -inset-1 bg-gradient-to-r ${colors.gradient} rounded-2xl blur opacity-25 animate-pulse`}></div>
        )}

        <div className="relative text-center space-y-4">
          {/* Loot Box Icon */}
          <div className={`text-6xl transition-transform duration-300 ${
            animationPhase === 'shaking' ? 'animate-wiggle' : 
            animationPhase === 'opening' ? 'animate-spin' : ''
          }`}>
            {lootBox.icon}
          </div>

          {/* Loot Box Info */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {lootBox.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {lootBox.description}
            </p>

            {/* Rarity Badge */}
            <div className={`inline-block px-3 py-1 rounded-full text-sm font-bold text-white bg-gradient-to-r ${colors.gradient} mb-4`}>
              {lootBox.rarity.toUpperCase()}
            </div>
          </div>

          {/* Cost */}
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-yellow-500 text-2xl">🪙</span>
            <span className={`text-xl font-bold ${canAfford ? 'text-gray-900 dark:text-white' : 'text-red-500'}`}>
              {lootBox.cost}
            </span>
          </div>

          {/* Guaranteed Items */}
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {lootBox.guaranteedItems} guaranteed items
          </div>

          {/* Status/Action */}
          <div>
            {!canAfford ? (
              <div className="text-red-500 font-semibold">
                💰 Insufficient Coins
              </div>
            ) : isOpening ? (
              <div className="space-y-2">
                <div className="text-blue-600 font-semibold">
                  {animationPhase === 'shaking' && '🔄 Preparing...'}
                  {animationPhase === 'opening' && '✨ Opening...'}
                  {animationPhase === 'revealing' && '🎁 Revealing...'}
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full animate-pulse w-full"></div>
                </div>
              </div>
            ) : isPurchased ? (
              <button className={`w-full py-3 px-6 bg-gradient-to-r ${colors.gradient} text-white rounded-lg font-semibold hover:scale-105 transform transition-all duration-200 shadow-lg`}>
                Open Box
              </button>
            ) : isAvailable ? (
              <button className={`w-full py-3 px-6 bg-gradient-to-r ${colors.gradient} text-white rounded-lg font-semibold hover:scale-105 transform transition-all duration-200 shadow-lg`}>
                Purchase & Open
              </button>
            ) : (
              <div className="text-gray-500 dark:text-gray-400 font-semibold">
                Not Available
              </div>
            )}
          </div>
        </div>

        {/* Particles Effect */}
        {animationPhase === 'revealing' && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-2 h-2 bg-gradient-to-r ${colors.gradient} rounded-full animate-ping opacity-75`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Contents Preview */}
      <div className="mt-4 space-y-2">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Possible Items:</h4>
        <div className="grid grid-cols-3 gap-2">
          {lootBox.possibleItems.slice(0, 6).map((item, index) => (
            <div
              key={item.id}
              className={`p-2 rounded-lg text-center text-xs ${getRarityColors(item.type).bg}`}
            >
              <div className="text-lg mb-1">{item.icon}</div>
              <div className="font-medium truncate">{item.name}</div>
            </div>
          ))}
          {lootBox.possibleItems.length > 6 && (
            <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-center text-xs flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400">
                +{lootBox.possibleItems.length - 6} more
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Items Received Modal */}
      {showItems && receivedItems.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="text-6xl mb-4 animate-bounce">🎁</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Loot Box Opened!
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Here's what you got:
              </p>
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {receivedItems.map((item, index) => {
                const itemColors = getRarityColors(item.type);
                
                return (
                  <div
                    key={item.id}
                    className={`p-4 rounded-xl text-white text-center shadow-lg animate-fade-in bg-gradient-to-br ${itemColors.gradient}`}
                    style={{ animationDelay: `${index * 300}ms` }}
                  >
                    <div className="text-4xl mb-2">{item.icon}</div>
                    <div className="font-semibold text-sm mb-1">{item.name}</div>
                    {item.amount && (
                      <div className="text-xs opacity-75">x{item.amount}</div>
                    )}
                    <div className="text-xs opacity-75 capitalize mt-1">
                      {item.type}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Total Value */}
            <div className="text-center mb-6">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Value</div>
              <div className="text-2xl font-bold text-green-600">
                🪙 {receivedItems.reduce((sum, item) => sum + item.value, 0)}
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => {
                setShowItems(false);
                setReceivedItems([]);
                setIsPurchased(false);
              }}
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
            >
              Claim All Items
            </button>
          </div>
        </div>
      )}

      {/* Shine Effect */}
      {isAvailable && canAfford && !isPurchased && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shine transform -skew-x-12 rounded-2xl"></div>
      )}
    </div>
  );
};

export default LootBox;