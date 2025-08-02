'use client';

import React, { useState } from 'react';

interface InventoryItem {
  id: string;
  name: string;
  type: 'consumable' | 'equipment' | 'material' | 'collectible' | 'currency';
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
  icon: string;
  description: string;
  quantity: number;
  maxStack: number;
  value: number;
  effects?: {
    type: 'xp_boost' | 'coin_multiplier' | 'trading_bonus' | 'social_bonus';
    amount: number;
    duration?: number; // in minutes
  }[];
  canUse: boolean;
  canSell: boolean;
  canTrade: boolean;
}

interface InventorySystemProps {
  items: InventoryItem[];
  maxSlots: number;
  coins: number;
  onUseItem: (itemId: string) => void;
  onSellItem: (itemId: string, quantity: number) => void;
  onDropItem?: (itemId: string, quantity: number) => void;
  className?: string;
}

export const InventorySystem: React.FC<InventorySystemProps> = ({
  items,
  maxSlots,
  coins,
  onUseItem,
  onSellItem,
  onDropItem,
  className = ''
}) => {
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterRarity, setFilterRarity] = useState<string>('all');
  const [showSellModal, setShowSellModal] = useState(false);
  const [sellQuantity, setSellQuantity] = useState(1);

  const getRarityColors = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return {
          bg: 'bg-gray-100 dark:bg-gray-700',
          border: 'border-gray-300 dark:border-gray-600',
          text: 'text-gray-700 dark:text-gray-300'
        };
      case 'rare':
        return {
          bg: 'bg-blue-100 dark:bg-blue-900/30',
          border: 'border-blue-300 dark:border-blue-600',
          text: 'text-blue-700 dark:text-blue-300'
        };
      case 'epic':
        return {
          bg: 'bg-purple-100 dark:bg-purple-900/30',
          border: 'border-purple-300 dark:border-purple-600',
          text: 'text-purple-700 dark:text-purple-300'
        };
      case 'legendary':
        return {
          bg: 'bg-yellow-100 dark:bg-yellow-900/30',
          border: 'border-yellow-300 dark:border-yellow-600',
          text: 'text-yellow-700 dark:text-yellow-300'
        };
      case 'mythic':
        return {
          bg: 'bg-pink-100 dark:bg-pink-900/30',
          border: 'border-pink-300 dark:border-pink-600',
          text: 'text-pink-700 dark:text-pink-300'
        };
      default:
        return {
          bg: 'bg-gray-100 dark:bg-gray-700',
          border: 'border-gray-300 dark:border-gray-600',
          text: 'text-gray-700 dark:text-gray-300'
        };
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'consumable': return '🧪';
      case 'equipment': return '⚔️';
      case 'material': return '🔨';
      case 'collectible': return '💎';
      case 'currency': return '🪙';
      default: return '📦';
    }
  };

  const filteredItems = items.filter(item => {
    if (filterType !== 'all' && item.type !== filterType) return false;
    if (filterRarity !== 'all' && item.rarity !== filterRarity) return false;
    return true;
  });

  const usedSlots = items.length;
  const totalValue = items.reduce((sum, item) => sum + (item.value * item.quantity), 0);

  const emptySlots = Array.from({ length: Math.max(0, maxSlots - usedSlots) }, (_, i) => i);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Inventory Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
            <span>🎒</span>
            <span>Inventory</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {usedSlots} / {maxSlots} slots used • Total value: 🪙 {totalValue.toLocaleString()}
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
            <span className="text-yellow-500 text-xl">🪙</span>
            <span className="font-bold text-yellow-700 dark:text-yellow-300">
              {coins.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Type:</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
          >
            <option value="all">All Types</option>
            <option value="consumable">🧪 Consumables</option>
            <option value="equipment">⚔️ Equipment</option>
            <option value="material">🔨 Materials</option>
            <option value="collectible">💎 Collectibles</option>
            <option value="currency">🪙 Currency</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Rarity:</label>
          <select
            value={filterRarity}
            onChange={(e) => setFilterRarity(e.target.value)}
            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
          >
            <option value="all">All Rarities</option>
            <option value="common">Common</option>
            <option value="rare">Rare</option>
            <option value="epic">Epic</option>
            <option value="legendary">Legendary</option>
            <option value="mythic">Mythic</option>
          </select>
        </div>
      </div>

      {/* Inventory Grid */}
      <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2">
        {/* Item Slots */}
        {filteredItems.map((item) => {
          const colors = getRarityColors(item.rarity);
          
          return (
            <div
              key={item.id}
              className={`relative aspect-square rounded-lg border-2 cursor-pointer transition-all duration-200 hover:scale-105 ${colors.bg} ${colors.border}`}
              onClick={() => setSelectedItem(item)}
            >
              {/* Item Icon */}
              <div className="absolute inset-0 flex items-center justify-center text-2xl">
                {item.icon}
              </div>

              {/* Quantity Badge */}
              {item.quantity > 1 && (
                <div className="absolute -bottom-1 -right-1 bg-gray-800 text-white text-xs rounded px-1 min-w-4 text-center">
                  {item.quantity > 999 ? '999+' : item.quantity}
                </div>
              )}

              {/* Rarity Indicator */}
              <div className={`absolute top-1 right-1 w-2 h-2 rounded-full ${
                item.rarity === 'mythic' ? 'bg-pink-400' :
                item.rarity === 'legendary' ? 'bg-yellow-400' :
                item.rarity === 'epic' ? 'bg-purple-400' :
                item.rarity === 'rare' ? 'bg-blue-400' :
                'bg-gray-400'
              }`}></div>

              {/* Stack Progress */}
              {item.maxStack > 1 && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-600 rounded-b">
                  <div
                    className="h-1 bg-green-500 rounded-b transition-all duration-300"
                    style={{ width: `${(item.quantity / item.maxStack) * 100}%` }}
                  ></div>
                </div>
              )}
            </div>
          );
        })}

        {/* Empty Slots */}
        {emptySlots.map((slot) => (
          <div
            key={`empty-${slot}`}
            className="aspect-square rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800"
          ></div>
        ))}
      </div>

      {/* Item Detail Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Item Header */}
            <div className="flex items-center space-x-4 mb-4">
              <div className={`p-3 rounded-xl ${getRarityColors(selectedItem.rarity).bg}`}>
                <span className="text-3xl">{selectedItem.icon}</span>
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {selectedItem.name}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${getRarityColors(selectedItem.rarity).text} ${getRarityColors(selectedItem.rarity).bg}`}>
                    {selectedItem.rarity.toUpperCase()}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {getTypeIcon(selectedItem.type)} {selectedItem.type}
                  </span>
                </div>
              </div>
            </div>

            {/* Item Description */}
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {selectedItem.description}
            </p>

            {/* Item Effects */}
            {selectedItem.effects && selectedItem.effects.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Effects:</h4>
                <div className="space-y-1">
                  {selectedItem.effects.map((effect, index) => (
                    <div key={index} className="text-sm text-green-600 dark:text-green-400">
                      • {effect.type.replace('_', ' ')}: +{effect.amount}
                      {effect.duration && ` (${effect.duration}min)`}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Item Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400">Quantity</div>
                <div className="font-bold text-gray-900 dark:text-white">
                  {selectedItem.quantity} / {selectedItem.maxStack}
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400">Value</div>
                <div className="font-bold text-gray-900 dark:text-white">
                  🪙 {selectedItem.value.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              {selectedItem.canUse && (
                <button
                  onClick={() => {
                    onUseItem(selectedItem.id);
                    setSelectedItem(null);
                  }}
                  className="flex-1 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
                >
                  Use
                </button>
              )}
              
              {selectedItem.canSell && (
                <button
                  onClick={() => {
                    setSellQuantity(1);
                    setShowSellModal(true);
                  }}
                  className="flex-1 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors"
                >
                  Sell
                </button>
              )}
              
              {onDropItem && (
                <button
                  onClick={() => {
                    onDropItem(selectedItem.id, 1);
                    setSelectedItem(null);
                  }}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
                >
                  Drop
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Sell Modal */}
      {showSellModal && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Sell {selectedItem.name}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Quantity (Max: {selectedItem.quantity})
                </label>
                <input
                  type="range"
                  min="1"
                  max={selectedItem.quantity}
                  value={sellQuantity}
                  onChange={(e) => setSellQuantity(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
                  <span>1</span>
                  <span className="font-bold">{sellQuantity}</span>
                  <span>{selectedItem.quantity}</span>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400">You will receive:</div>
                <div className="text-xl font-bold text-green-600">
                  🪙 {(selectedItem.value * sellQuantity).toLocaleString()}
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowSellModal(false);
                    setSellQuantity(1);
                  }}
                  className="flex-1 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onSellItem(selectedItem.id, sellQuantity);
                    setShowSellModal(false);
                    setSelectedItem(null);
                    setSellQuantity(1);
                  }}
                  className="flex-1 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors"
                >
                  Sell
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inventory Full Warning */}
      {usedSlots >= maxSlots && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-xl p-4">
          <div className="flex items-center space-x-2">
            <span className="text-red-500 text-xl">⚠️</span>
            <div>
              <div className="font-semibold text-red-700 dark:text-red-300">Inventory Full</div>
              <div className="text-sm text-red-600 dark:text-red-400">
                Your inventory is full. Sell or drop items to make space for new ones.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventorySystem;