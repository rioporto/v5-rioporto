'use client';

import React, { useState, useRef, useCallback } from 'react';

interface DragSwapProps {
  items: Array<{
    id: string;
    content: React.ReactNode;
    data?: any;
  }>;
  onSwap?: (fromIndex: number, toIndex: number) => void;
  className?: string;
  itemClassName?: string;
  glowEffect?: boolean;
}

export const DragSwap: React.FC<DragSwapProps> = ({
  items: initialItems,
  onSwap,
  className = '',
  itemClassName = '',
  glowEffect = true,
}) => {
  const [items, setItems] = useState(initialItems);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [draggedOver, setDraggedOver] = useState<string | null>(null);
  const dragCounterRef = useRef(0);

  const handleDragStart = useCallback((e: React.DragEvent, itemId: string) => {
    setDraggedItem(itemId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', itemId);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent, itemId: string) => {
    e.preventDefault();
    dragCounterRef.current++;
    setDraggedOver(itemId);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    dragCounterRef.current--;
    if (dragCounterRef.current === 0) {
      setDraggedOver(null);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, targetItemId: string) => {
    e.preventDefault();
    dragCounterRef.current = 0;
    
    if (draggedItem && draggedItem !== targetItemId) {
      const fromIndex = items.findIndex(item => item.id === draggedItem);
      const toIndex = items.findIndex(item => item.id === targetItemId);
      
      const newItems = [...items];
      const [movedItem] = newItems.splice(fromIndex, 1);
      newItems.splice(toIndex, 0, movedItem);
      
      setItems(newItems);
      onSwap?.(fromIndex, toIndex);
    }
    
    setDraggedItem(null);
    setDraggedOver(null);
  }, [draggedItem, items, onSwap]);

  const handleDragEnd = useCallback(() => {
    setDraggedItem(null);
    setDraggedOver(null);
    dragCounterRef.current = 0;
  }, []);

  return (
    <div className={`drag-swap-container ${className}`}>
      {items.map((item, index) => {
        const isDragged = draggedItem === item.id;
        const isDraggedOver = draggedOver === item.id;
        
        return (
          <div
            key={item.id}
            draggable
            className={`drag-swap-item relative cursor-move transition-all duration-200 ${itemClassName} ${
              isDragged ? 'opacity-50 scale-95' : ''
            } ${
              isDraggedOver ? 'scale-105' : ''
            }`}
            style={{
              transform: isDraggedOver ? 'translateY(-5px)' : 'translateY(0)',
              filter: glowEffect && isDraggedOver 
                ? 'drop-shadow(0 0 20px rgba(0, 255, 255, 0.6))' 
                : 'none',
            }}
            onDragStart={(e) => handleDragStart(e, item.id)}
            onDragOver={handleDragOver}
            onDragEnter={(e) => handleDragEnter(e, item.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, item.id)}
            onDragEnd={handleDragEnd}
          >
            {/* Cyber border */}
            <div
              className={`absolute inset-0 border-2 rounded-lg transition-all duration-200 ${
                isDraggedOver 
                  ? 'border-cyan-400 shadow-[0_0_20px_rgba(0,255,255,0.5)]' 
                  : 'border-cyan-500/30'
              }`}
            />
            
            {/* Content */}
            <div className="relative z-10 p-4">
              {item.content}
            </div>
            
            {/* Drag indicator */}
            <div className="absolute top-2 right-2 opacity-50">
              <div className="flex flex-col space-y-1">
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-cyan-400 rounded-full" />
                  <div className="w-1 h-1 bg-cyan-400 rounded-full" />
                </div>
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-cyan-400 rounded-full" />
                  <div className="w-1 h-1 bg-cyan-400 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

interface CyberDragGridProps {
  items: Array<{
    id: string;
    content: React.ReactNode;
    position: { x: number; y: number };
  }>;
  onPositionChange?: (itemId: string, newPosition: { x: number; y: number }) => void;
  className?: string;
  gridSize?: number;
}

export const CyberDragGrid: React.FC<CyberDragGridProps> = ({
  items: initialItems,
  onPositionChange,
  className = '',
  gridSize = 50,
}) => {
  const [items, setItems] = useState(initialItems);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const snapToGrid = (value: number) => {
    return Math.round(value / gridSize) * gridSize;
  };

  const handleMouseDown = (e: React.MouseEvent, itemId: string) => {
    setDraggedItem(itemId);
    
    const startX = e.clientX;
    const startY = e.clientY;
    const item = items.find(i => i.id === itemId);
    if (!item) return;
    
    const startPosX = item.position.x;
    const startPosY = item.position.y;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      
      const newX = snapToGrid(startPosX + deltaX);
      const newY = snapToGrid(startPosY + deltaY);
      
      setItems(prevItems =>
        prevItems.map(i =>
          i.id === itemId
            ? { ...i, position: { x: newX, y: newY } }
            : i
        )
      );
    };

    const handleMouseUp = () => {
      const item = items.find(i => i.id === itemId);
      if (item) {
        onPositionChange?.(itemId, item.position);
      }
      setDraggedItem(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      ref={containerRef}
      className={`cyber-drag-grid relative overflow-hidden ${className}`}
      style={{
        backgroundImage: `
          radial-gradient(circle at 1px 1px, rgba(0,255,255,0.3) 1px, transparent 0)
        `,
        backgroundSize: `${gridSize}px ${gridSize}px`,
      }}
    >
      {items.map((item) => {
        const isDragged = draggedItem === item.id;
        
        return (
          <div
            key={item.id}
            className={`absolute cursor-move transition-all duration-200 ${
              isDragged ? 'z-50 scale-110' : 'z-10'
            }`}
            style={{
              left: item.position.x,
              top: item.position.y,
              filter: isDragged 
                ? 'drop-shadow(0 0 30px rgba(0, 255, 255, 0.8))' 
                : 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.3))',
            }}
            onMouseDown={(e) => handleMouseDown(e, item.id)}
          >
            {/* Cyber frame */}
            <div className="relative">
              <div className={`border-2 rounded-lg bg-black/50 backdrop-blur-sm ${
                isDragged 
                  ? 'border-cyan-400 shadow-[0_0_30px_rgba(0,255,255,0.6)]' 
                  : 'border-cyan-500/50'
              }`}>
                <div className="p-4">
                  {item.content}
                </div>
              </div>
              
              {/* Corner indicators */}
              <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-cyan-400" />
              <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-cyan-400" />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-cyan-400" />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-cyan-400" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

interface MagneticDragProps {
  children: React.ReactNode;
  className?: string;
  magneticStrength?: number;
  snapDistance?: number;
}

export const MagneticDrag: React.FC<MagneticDragProps> = ({
  children,
  className = '',
  magneticStrength = 0.1,
  snapDistance = 100,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [magneticTarget, setMagneticTarget] = useState<{ x: number; y: number } | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const startX = e.clientX - position.x;
    const startY = e.clientY - position.y;

    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX - startX;
      const newY = e.clientY - startY;
      
      // Check for magnetic targets (example: center of container)
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const distanceToCenter = Math.sqrt(
        Math.pow(newX - centerX, 2) + Math.pow(newY - centerY, 2)
      );
      
      if (distanceToCenter < snapDistance) {
        setMagneticTarget({ x: centerX, y: centerY });
        const magneticX = newX + (centerX - newX) * magneticStrength;
        const magneticY = newY + (centerY - newY) * magneticStrength;
        setPosition({ x: magneticX, y: magneticY });
      } else {
        setMagneticTarget(null);
        setPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setMagneticTarget(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      ref={elementRef}
      className={`magnetic-drag absolute cursor-move transition-all duration-200 ${className} ${
        isDragging ? 'z-50' : 'z-10'
      }`}
      style={{
        left: position.x,
        top: position.y,
        filter: isDragging 
          ? 'drop-shadow(0 0 30px rgba(255, 0, 255, 0.8))' 
          : 'drop-shadow(0 0 10px rgba(255, 0, 255, 0.3))',
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Magnetic field indicator */}
      {magneticTarget && (
        <div
          className="absolute inset-0 rounded-full border-2 border-purple-500 animate-pulse"
          style={{
            transform: 'scale(1.5)',
            opacity: 0.5,
          }}
        />
      )}
      
      {children}
    </div>
  );
};