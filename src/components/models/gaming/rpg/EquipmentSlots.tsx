'use client';

import React, { useState } from 'react';

interface Equipment {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'accessory' | 'tool';
  slot: 'head' | 'chest' | 'legs' | 'feet' | 'weapon' | 'shield' | 'ring' | 'necklace' | 'tool';
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
  icon: string;
  description: string;
  level: number;
  stats: {
    [key: string]: number; // e.g., 'xp_boost': 15, 'trading_power': 25
  };
  setBonus?: {
    name: string;
    description: string;
    requiredPieces: number;
    currentPieces: number;
    bonus: { [key: string]: number };
  };
}

interface EquipmentSlot {
  slot: string;
  name: string;
  icon: string;
  equipment?: Equipment;
}

interface EquipmentSlotsProps {
  equippedItems: Equipment[];
  availableEquipment: Equipment[];
  onEquip: (equipment: Equipment) => void;
  onUnequip: (slot: string) => void;
  playerLevel: number;
  className?: string;
}

export const EquipmentSlots: React.FC<EquipmentSlotsProps> = ({
  equippedItems,
  availableEquipment,
  onEquip,
  onUnequip,
  playerLevel,
  className = ''
}) => {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [showEquipmentModal, setShowEquipmentModal] = useState(false);

  const slots: EquipmentSlot[] = [
    { slot: 'head', name: 'Head', icon: '🎩' },
    { slot: 'chest', name: 'Chest', icon: '👕' },
    { slot: 'legs', name: 'Legs', icon: '👖' },
    { slot: 'feet', name: 'Feet', icon: '👟' },
    { slot: 'weapon', name: 'Weapon', icon: '⚔️' },
    { slot: 'shield', name: 'Shield', icon: '🛡️' },
    { slot: 'ring', name: 'Ring', icon: '💍' },
    { slot: 'necklace', name: 'Necklace', icon: '📿' },
    { slot: 'tool', name: 'Tool', icon: '🔧' }
  ];

  // Map equipped items to slots
  const slotsWithEquipment = slots.map(slot => ({
    ...slot,
    equipment: equippedItems.find(item => item.slot === slot.slot)
  }));

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

  // Calculate total stats from all equipped items
  const totalStats = equippedItems.reduce((totals, item) => {
    Object.entries(item.stats).forEach(([stat, value]) => {
      totals[stat] = (totals[stat] || 0) + value;
    });
    return totals;
  }, {} as { [key: string]: number });

  // Check for set bonuses
  const setBonuses = equippedItems
    .filter(item => item.setBonus)
    .reduce((bonuses, item) => {
      if (item.setBonus) {
        const existing = bonuses.find(b => b.name === item.setBonus?.name);
        if (existing) {
          existing.currentPieces++;
        } else {
          bonuses.push({
            ...item.setBonus,
            currentPieces: 1
          });
        }
      }
      return bonuses;
    }, [] as any[]);

  const activeSetBonuses = setBonuses.filter(bonus => bonus.currentPieces >= bonus.requiredPieces);

  const getEquipmentForSlot = (slotType: string) => {
    return availableEquipment.filter(item => 
      item.slot === slotType && 
      item.level <= playerLevel
    );
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
            <span>⚔️</span>
            <span>Equipment</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Equip items to boost your character's abilities
          </p>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">
            {equippedItems.length} / {slots.length}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Equipped
          </div>
        </div>
      </div>

      {/* Equipment Grid */}
      <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
        {/* Row 1: Head */}
        <div className="col-span-3 flex justify-center">
          {renderSlot(slotsWithEquipment.find(s => s.slot === 'head')!)}
        </div>

        {/* Row 2: Weapon, Chest, Shield */}
        <div className="flex justify-center">
          {renderSlot(slotsWithEquipment.find(s => s.slot === 'weapon')!)}
        </div>
        <div className="flex justify-center">
          {renderSlot(slotsWithEquipment.find(s => s.slot === 'chest')!)}
        </div>
        <div className="flex justify-center">
          {renderSlot(slotsWithEquipment.find(s => s.slot === 'shield')!)}
        </div>

        {/* Row 3: Ring, Legs, Necklace */}
        <div className="flex justify-center">
          {renderSlot(slotsWithEquipment.find(s => s.slot === 'ring')!)}
        </div>
        <div className="flex justify-center">
          {renderSlot(slotsWithEquipment.find(s => s.slot === 'legs')!)}
        </div>
        <div className="flex justify-center">
          {renderSlot(slotsWithEquipment.find(s => s.slot === 'necklace')!)}
        </div>

        {/* Row 4: Tool, Feet */}
        <div className="flex justify-center">
          {renderSlot(slotsWithEquipment.find(s => s.slot === 'tool')!)}
        </div>
        <div className="flex justify-center">
          {renderSlot(slotsWithEquipment.find(s => s.slot === 'feet')!)}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">📊 Total Stats</h3>
        
        {Object.keys(totalStats).length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {Object.entries(totalStats).map(([stat, value]) => (
              <div key={stat} className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center">
                <div className="text-lg font-bold text-blue-600">+{value}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                  {stat.replace('_', ' ')}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            No equipment equipped. Equip items to see stat bonuses.
          </p>
        )}
      </div>

      {/* Set Bonuses */}
      {setBonuses.length > 0 && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">✨ Set Bonuses</h3>
          
          <div className="space-y-3">
            {setBonuses.map((setBonus, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border-2 ${
                  setBonus.currentPieces >= setBonus.requiredPieces
                    ? 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-600'
                    : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {setBonus.name}
                  </h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    setBonus.currentPieces >= setBonus.requiredPieces
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-500 text-white'
                  }`}>
                    {setBonus.currentPieces}/{setBonus.requiredPieces}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {setBonus.description}
                </p>
                
                {setBonus.currentPieces >= setBonus.requiredPieces && (
                  <div className="text-sm text-green-600 dark:text-green-400">
                    Active: {Object.entries(setBonus.bonus).map(([stat, value]) => 
                      `+${value} ${stat.replace('_', ' ')}`
                    ).join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Equipment Selection Modal */}
      {showEquipmentModal && selectedSlot && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={() => {
            setShowEquipmentModal(false);
            setSelectedSlot(null);
          }}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-2xl w-full mx-4 shadow-2xl max-h-96 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Select {selectedSlot} Equipment
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getEquipmentForSlot(selectedSlot).map((equipment) => {
                const colors = getRarityColors(equipment.rarity);
                const canEquip = equipment.level <= playerLevel;
                
                return (
                  <div
                    key={equipment.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      canEquip
                        ? `${colors.bg} ${colors.border} hover:scale-105`
                        : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 opacity-50 cursor-not-allowed'
                    }`}
                    onClick={() => {
                      if (canEquip) {
                        onEquip(equipment);
                        setShowEquipmentModal(false);
                        setSelectedSlot(null);
                      }
                    }}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-2xl">{equipment.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {equipment.name}
                        </h4>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Level {equipment.level} • {equipment.rarity}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {equipment.description}
                    </p>
                    
                    <div className="text-sm text-green-600 dark:text-green-400">
                      {Object.entries(equipment.stats).map(([stat, value]) => (
                        <div key={stat}>+{value} {stat.replace('_', ' ')}</div>
                      ))}
                    </div>
                    
                    {!canEquip && (
                      <div className="text-red-500 text-sm mt-2">
                        Requires level {equipment.level}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {getEquipmentForSlot(selectedSlot).length === 0 && (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">📦</div>
                <p className="text-gray-500 dark:text-gray-400">
                  No equipment available for this slot
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  function renderSlot(slot: EquipmentSlot) {
    const colors = slot.equipment ? getRarityColors(slot.equipment.rarity) : null;
    
    return (
      <div
        className={`w-16 h-16 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:scale-105 flex items-center justify-center relative ${
          slot.equipment
            ? `${colors!.bg} ${colors!.border} ${colors!.glow} shadow-lg`
            : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 border-dashed'
        }`}
        onClick={() => {
          if (slot.equipment) {
            // Show equipment details or unequip
            onUnequip(slot.slot);
          } else {
            // Show available equipment for this slot
            setSelectedSlot(slot.slot);
            setShowEquipmentModal(true);
          }
        }}
        title={slot.equipment ? slot.equipment.name : `Empty ${slot.name} slot`}
      >
        {slot.equipment ? (
          <>
            <span className="text-2xl">{slot.equipment.icon}</span>
            {slot.equipment.level > 1 && (
              <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white text-xs rounded px-1 min-w-4 text-center">
                {slot.equipment.level}
              </div>
            )}
          </>
        ) : (
          <span className="text-2xl opacity-50">{slot.icon}</span>
        )}
        
        {/* Glow effect for legendary+ items */}
        {slot.equipment && (slot.equipment.rarity === 'legendary' || slot.equipment.rarity === 'mythic') && (
          <div className={`absolute -inset-1 rounded-lg blur opacity-25 animate-pulse ${
            slot.equipment.rarity === 'legendary' ? 'bg-yellow-400' : 'bg-pink-400'
          }`}></div>
        )}
      </div>
    );
  }
};

export default EquipmentSlots;