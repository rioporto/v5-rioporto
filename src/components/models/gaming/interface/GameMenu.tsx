'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { GamingButton } from '../GamingButton';

interface MenuItemProps {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  hotkey?: string;
  description?: string;
  onClick: () => void;
}

interface GameMenuProps {
  title?: string;
  items: MenuItemProps[];
  variant?: 'main' | 'pause' | 'settings' | 'inventory';
  showBackground?: boolean;
  showHotkeys?: boolean;
  className?: string;
}

export const GameMenu: React.FC<GameMenuProps> = ({
  title = 'GAME MENU',
  items,
  variant = 'main',
  showBackground = true,
  showHotkeys = true,
  className,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const enabledItems = items.filter(item => !item.disabled);
      const currentEnabledIndex = enabledItems.findIndex(item => item.id === items[selectedIndex]?.id);
      
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          const prevIndex = currentEnabledIndex > 0 ? currentEnabledIndex - 1 : enabledItems.length - 1;
          const prevItem = enabledItems[prevIndex];
          const prevItemIndex = items.findIndex(item => item.id === prevItem.id);
          setSelectedIndex(prevItemIndex);
          break;
          
        case 'ArrowDown':
          e.preventDefault();
          const nextIndex = currentEnabledIndex < enabledItems.length - 1 ? currentEnabledIndex + 1 : 0;
          const nextItem = enabledItems[nextIndex];
          const nextItemIndex = items.findIndex(item => item.id === nextItem.id);
          setSelectedIndex(nextItemIndex);
          break;
          
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (!items[selectedIndex]?.disabled) {
            items[selectedIndex]?.onClick();
          }
          break;
      }
      
      // Handle hotkeys
      items.forEach((item, index) => {
        if (item.hotkey && e.key.toLowerCase() === item.hotkey.toLowerCase() && !item.disabled) {
          e.preventDefault();
          setSelectedIndex(index);
          item.onClick();
        }
      });
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [items, selectedIndex]);

  const variantStyles = {
    main: {
      border: 'border-gaming-neon-cyan',
      glow: 'shadow-[0_0_40px_rgba(0,245,255,0.3)]',
      title: 'text-gaming-neon-cyan',
    },
    pause: {
      border: 'border-gaming-neon-yellow',
      glow: 'shadow-[0_0_40px_rgba(255,255,0,0.3)]',
      title: 'text-gaming-neon-yellow',
    },
    settings: {
      border: 'border-gaming-neon-green',
      glow: 'shadow-[0_0_40px_rgba(0,255,0,0.3)]',
      title: 'text-gaming-neon-green',
    },
    inventory: {
      border: 'border-gaming-neon-pink',
      glow: 'shadow-[0_0_40px_rgba(255,0,110,0.3)]',
      title: 'text-gaming-neon-pink',
    },
  };

  const config = variantStyles[variant];

  return (
    <div className={cn(
      'relative max-w-md mx-auto',
      showBackground && 'bg-gaming-dark/95 backdrop-blur-lg',
      showBackground && `border-2 rounded-lg ${config.border} ${config.glow}`,
      className
    )}>
      {/* Background grid pattern */}
      {showBackground && (
        <div 
          className="absolute inset-0 opacity-5 rounded-lg"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,245,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,245,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px',
          }}
        />
      )}
      
      {/* Header */}
      <div className="relative z-10 p-6 pb-4">
        <h1 className={cn(
          'text-2xl font-gaming-cyber text-center uppercase tracking-wider',
          config.title
        )}>
          {title}
        </h1>
        
        {/* Animated underline */}
        <div className="mt-2 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-current to-transparent" />
      </div>
      
      {/* Menu items */}
      <div className="relative z-10 px-6 pb-6 space-y-2">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={cn(
              'group relative p-4 rounded border-2 transition-all duration-300 cursor-pointer',
              'flex items-center justify-between',
              selectedIndex === index || hoveredIndex === index
                ? `border-current bg-current/10 ${config.glow}`
                : 'border-gaming-surface/30 hover:border-current/50',
              item.disabled && 'opacity-50 cursor-not-allowed'
            )}
            onMouseEnter={() => !item.disabled && setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(-1)}
            onClick={() => {
              if (!item.disabled) {
                setSelectedIndex(index);
                item.onClick();
              }
            }}
          >
            {/* Left content */}
            <div className="flex items-center gap-3">
              {/* Icon */}
              {item.icon && (
                <div className={cn(
                  'w-6 h-6 flex items-center justify-center transition-colors duration-300',
                  selectedIndex === index || hoveredIndex === index
                    ? config.title
                    : 'text-white/70'
                )}>
                  {item.icon}
                </div>
              )}
              
              {/* Label and description */}
              <div>
                <div className={cn(
                  'font-gaming-cyber uppercase tracking-wider transition-colors duration-300',
                  selectedIndex === index || hoveredIndex === index
                    ? config.title
                    : 'text-white'
                )}>
                  {item.label}
                </div>
                {item.description && (
                  <div className="text-xs text-white/60 font-gaming-mono mt-1">
                    {item.description}
                  </div>
                )}
              </div>
            </div>
            
            {/* Right content - Hotkey */}
            {showHotkeys && item.hotkey && (
              <div className={cn(
                'px-2 py-1 bg-gaming-surface/50 border border-current/30 rounded text-xs',
                'font-gaming-mono uppercase transition-colors duration-300',
                selectedIndex === index || hoveredIndex === index
                  ? config.title
                  : 'text-white/70'
              )}>
                {item.hotkey}
              </div>
            )}
            
            {/* Selection indicator */}
            {selectedIndex === index && (
              <div className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-6 bg-current rounded-full" />
            )}
            
            {/* Hover glow */}
            {(selectedIndex === index || hoveredIndex === index) && (
              <div className="absolute inset-0 bg-gradient-to-r from-current/5 to-transparent rounded pointer-events-none" />
            )}
          </div>
        ))}
      </div>
      
      {/* Footer instructions */}
      {showHotkeys && (
        <div className="relative z-10 px-6 pb-4 border-t border-gaming-surface/30">
          <div className="flex justify-center gap-6 mt-4 text-xs font-gaming-mono text-white/60">
            <span>↑↓ NAVIGATE</span>
            <span>ENTER SELECT</span>
            <span>ESC BACK</span>
          </div>
        </div>
      )}
      
      {/* Corner brackets */}
      {showBackground && (
        <>
          <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-current opacity-60" />
          <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-current opacity-60" />
          <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-current opacity-60" />
          <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-current opacity-60" />
        </>
      )}
    </div>
  );
};