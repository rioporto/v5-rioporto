'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { GamingBadge } from '../GamingBadge';

interface InventoryItem {
  id: string;
  name: string;
  icon?: React.ReactNode;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
  quantity?: number;
  description?: string;
  category?: string;
  equipped?: boolean;
  locked?: boolean;
}

interface InventoryGridProps {
  items: InventoryItem[];
  gridSize: { rows: number; cols: number };
  selectedItem?: string;
  onItemSelect?: (item: InventoryItem) => void;
  onItemUse?: (item: InventoryItem) => void;
  onItemDrop?: (item: InventoryItem) => void;
  showTooltips?: boolean;
  allowDragDrop?: boolean;
  className?: string;
}

export const InventoryGrid: React.FC<InventoryGridProps> = ({
  items,
  gridSize,
  selectedItem,
  onItemSelect,
  onItemUse,
  onItemDrop,
  showTooltips = true,
  allowDragDrop = true,
  className,
}) => {
  const [hoveredSlot, setHoveredSlot] = useState<number | null>(null);
  const [draggedItem, setDraggedItem] = useState<InventoryItem | null>(null);
  const [dragOverSlot, setDragOverSlot] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const gridRef = useRef<HTMLDivElement>(null);

  const totalSlots = gridSize.rows * gridSize.cols;
  const filledSlots = new Set(items.map((_, index) => index));

  const rarityColors = {
    common: 'border-gray-400 bg-gray-500/10',
    rare: 'border-blue-400 bg-blue-500/10',
    epic: 'border-purple-400 bg-purple-500/10',
    legendary: 'border-orange-400 bg-orange-500/10',
    mythic: 'border-gaming-neon-pink bg-gradient-to-br from-gaming-neon-pink/10 to-gaming-neon-cyan/10',
  };

  const handleMouseMove = (e: MouseEvent) => {
    setTooltipPosition({ x: e.clientX + 10, y: e.clientY - 10 });
  };

  useEffect(() => {
    if (hoveredSlot !== null && showTooltips) {
      document.addEventListener('mousemove', handleMouseMove);
      return () => document.removeEventListener('mousemove', handleMouseMove);
    }
  }, [hoveredSlot, showTooltips]);

  const handleDragStart = (e: React.DragEvent, item: InventoryItem) => {
    if (!allowDragDrop || item.locked) return;
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, slotIndex: number) => {
    if (!allowDragDrop) return;
    e.preventDefault();
    setDragOverSlot(slotIndex);
  };

  const handleDrop = (e: React.DragEvent, targetSlot: number) => {
    if (!allowDragDrop || !draggedItem) return;
    e.preventDefault();
    
    // Handle item reordering logic here
    console.log(`Moving ${draggedItem.name} to slot ${targetSlot}`);
    
    setDraggedItem(null);
    setDragOverSlot(null);
  };

  const getItemAtSlot = (slotIndex: number): InventoryItem | null => {
    return items[slotIndex] || null;
  };

  const handleSlotClick = (slotIndex: number) => {
    const item = getItemAtSlot(slotIndex);
    if (item && onItemSelect) {
      onItemSelect(item);
    }
  };

  const handleSlotDoubleClick = (slotIndex: number) => {
    const item = getItemAtSlot(slotIndex);
    if (item && onItemUse && !item.locked) {
      onItemUse(item);
    }
  };

  return (
    <div className={cn('relative', className)}>
      {/* Grid container */}
      <div
        ref={gridRef}
        className="grid gap-1 p-4 bg-gaming-surface/20 border-2 border-gaming-neon-cyan rounded-lg"
        style={{
          gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize.rows}, 1fr)`,
        }}
      >
        {Array.from({ length: totalSlots }, (_, slotIndex) => {
          const item = getItemAtSlot(slotIndex);
          const isSelected = item?.id === selectedItem;
          const isHovered = hoveredSlot === slotIndex;
          const isDragOver = dragOverSlot === slotIndex;

          return (
            <div
              key={slotIndex}
              className={cn(
                'relative aspect-square border-2 rounded-lg transition-all duration-200',
                'flex items-center justify-center cursor-pointer group',
                'min-h-[60px] min-w-[60px]',
                
                // Empty slot styles
                !item && 'border-gaming-surface/30 bg-gaming-surface/5 hover:border-gaming-surface/50',
                
                // Item slot styles
                item && rarityColors[item.rarity || 'common'],
                item && 'hover:scale-105',
                
                // Selection state
                isSelected && 'ring-2 ring-gaming-neon-cyan shadow-[0_0_20px_rgba(0,245,255,0.4)]',
                
                // Hover state
                isHovered && !item && 'bg-gaming-surface/10',
                
                // Drag states
                isDragOver && 'border-gaming-neon-green bg-gaming-neon-green/10',
                draggedItem?.id === item?.id && 'opacity-50',
                
                // Locked items
                item?.locked && 'relative overflow-hidden'
              )}
              onClick={() => handleSlotClick(slotIndex)}
              onDoubleClick={() => handleSlotDoubleClick(slotIndex)}
              onMouseEnter={() => setHoveredSlot(slotIndex)}
              onMouseLeave={() => setHoveredSlot(null)}
              onDragOver={(e) => handleDragOver(e, slotIndex)}
              onDrop={(e) => handleDrop(e, slotIndex)}
            >
              {/* Slot number for empty slots */}
              {!item && (
                <span className="text-xs font-gaming-mono text-white/20">
                  {slotIndex + 1}
                </span>
              )}
              
              {/* Item content */}
              {item && (
                <div
                  className="w-full h-full flex flex-col items-center justify-center p-2 relative"
                  draggable={allowDragDrop && !item.locked}
                  onDragStart={(e) => handleDragStart(e, item)}
                >
                  {/* Item icon */}
                  {item.icon && (
                    <div className="w-8 h-8 flex items-center justify-center mb-1">
                      {item.icon}
                    </div>
                  )}
                  
                  {/* Item name */}
                  <span className="text-xs font-gaming-mono text-center text-white/90 truncate w-full">
                    {item.name}
                  </span>
                  
                  {/* Quantity badge */}
                  {item.quantity && item.quantity > 1 && (
                    <div className="absolute bottom-1 right-1 bg-gaming-dark/80 border border-gaming-neon-yellow rounded px-1">
                      <span className="text-xs font-gaming-mono text-gaming-neon-yellow">
                        {item.quantity}
                      </span>
                    </div>
                  )}
                  
                  {/* Equipped indicator */}
                  {item.equipped && (
                    <div className="absolute top-1 left-1 w-2 h-2 bg-gaming-neon-green rounded-full animate-pulse" />
                  )}
                  
                  {/* Locked overlay */}
                  {item.locked && (
                    <div className="absolute inset-0 bg-gaming-surface/50 flex items-center justify-center rounded-lg">
                      <svg className="w-4 h-4 text-gaming-neon-red" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  
                  {/* Rarity glow for mythic items */}
                  {item.rarity === 'mythic' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-gaming-neon-pink/20 to-gaming-neon-cyan/20 rounded-lg animate-pulse" />
                  )}
                </div>
              )}
              
              {/* Hover glow effect */}
              {isHovered && item && (
                <div className="absolute inset-0 bg-white/10 rounded-lg pointer-events-none" />
              )}
            </div>
          );
        })}
      </div>
      
      {/* Tooltip */}
      {showTooltips && hoveredSlot !== null && (
        (() => {
          const item = getItemAtSlot(hoveredSlot);
          if (!item) return null;
          
          return (
            <div
              className="fixed z-50 bg-gaming-dark/95 border-2 border-gaming-neon-cyan rounded-lg p-3 pointer-events-none"
              style={{
                left: tooltipPosition.x,
                top: tooltipPosition.y,
                maxWidth: '250px',
              }}
            >
              <div className="space-y-2">
                {/* Item name with rarity */}
                <div className="flex items-center gap-2">
                  <span className="font-gaming-cyber text-white">{item.name}</span>
                  <GamingBadge
                    variant="rarity"
                    rarity={item.rarity || 'common'}
                    size="sm"
                  >
                    {item.rarity || 'common'}
                  </GamingBadge>
                </div>
                
                {/* Category */}
                {item.category && (
                  <div className="text-xs font-gaming-mono text-gaming-neon-cyan">
                    {item.category}
                  </div>
                )}
                
                {/* Description */}
                {item.description && (
                  <div className="text-sm text-white/80 font-gaming-mono">
                    {item.description}
                  </div>
                )}
                
                {/* Quantity */}
                {item.quantity && item.quantity > 1 && (
                  <div className="text-xs font-gaming-mono text-gaming-neon-yellow">
                    Quantity: {item.quantity}
                  </div>
                )}
                
                {/* Status indicators */}
                <div className="flex gap-2 text-xs font-gaming-mono">
                  {item.equipped && (
                    <span className="text-gaming-neon-green">EQUIPPED</span>
                  )}
                  {item.locked && (
                    <span className="text-gaming-neon-red">LOCKED</span>
                  )}
                </div>
              </div>
            </div>
          );
        })()
      )}
      
      {/* Grid info */}
      <div className="mt-2 flex items-center justify-between text-xs font-gaming-mono text-white/60">
        <span>{items.length}/{totalSlots} SLOTS USED</span>
        {allowDragDrop && <span>DRAG TO REORDER</span>}
      </div>
    </div>
  );
};