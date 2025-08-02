'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface RadarPoint {
  id: string;
  x: number;
  y: number;
  type: 'enemy' | 'ally' | 'neutral' | 'objective' | 'player';
  size?: 'sm' | 'md' | 'lg';
  pulsing?: boolean;
}

interface RadarChartProps {
  size?: number;
  range?: number;
  points?: RadarPoint[];
  showGrid?: boolean;
  showRangeRings?: boolean;
  sweepEnabled?: boolean;
  className?: string;
}

export const RadarChart: React.FC<RadarChartProps> = ({
  size = 200,
  range = 100,
  points = [],
  showGrid = true,
  showRangeRings = true,
  sweepEnabled = true,
  className,
}) => {
  const [sweepAngle, setSweepAngle] = useState(0);
  const [visiblePoints, setVisiblePoints] = useState<RadarPoint[]>([]);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Radar sweep animation
  useEffect(() => {
    if (sweepEnabled) {
      const interval = setInterval(() => {
        setSweepAngle(prev => (prev + 2) % 360);
      }, 50);
      
      return () => clearInterval(interval);
    }
  }, [sweepEnabled]);

  // Update visible points based on sweep
  useEffect(() => {
    if (sweepEnabled) {
      const sweepRange = 30; // degrees
      const filteredPoints = points.filter(point => {
        const pointAngle = Math.atan2(point.y, point.x) * (180 / Math.PI);
        const normalizedAngle = ((pointAngle + 360) % 360);
        const normalizedSweep = ((sweepAngle + 360) % 360);
        
        // Check if point is within sweep range
        const angleDiff = Math.abs(normalizedAngle - normalizedSweep);
        return angleDiff <= sweepRange || angleDiff >= (360 - sweepRange);
      });
      
      setVisiblePoints(filteredPoints);
    } else {
      setVisiblePoints(points);
    }
  }, [sweepAngle, points, sweepEnabled]);

  const pointTypeStyles = {
    player: { 
      color: 'bg-gaming-neon-cyan', 
      glow: 'shadow-[0_0_8px_rgba(0,245,255,0.8)]',
      border: 'border-gaming-neon-cyan'
    },
    enemy: { 
      color: 'bg-gaming-neon-red', 
      glow: 'shadow-[0_0_8px_rgba(255,51,51,0.8)]',
      border: 'border-gaming-neon-red'
    },
    ally: { 
      color: 'bg-gaming-neon-green', 
      glow: 'shadow-[0_0_8px_rgba(0,255,0,0.8)]',
      border: 'border-gaming-neon-green'
    },
    neutral: { 
      color: 'bg-gaming-neon-yellow', 
      glow: 'shadow-[0_0_8px_rgba(255,255,0,0.8)]',
      border: 'border-gaming-neon-yellow'
    },
    objective: { 
      color: 'bg-gaming-neon-pink', 
      glow: 'shadow-[0_0_8px_rgba(255,0,110,0.8)]',
      border: 'border-gaming-neon-pink'
    },
  };

  const pointSizeStyles = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3',
  };

  return (
    <div className={cn('relative', className)}>
      {/* Radar container */}
      <div 
        ref={canvasRef}
        className="relative bg-gaming-surface/20 border-2 border-gaming-neon-cyan rounded-full overflow-hidden"
        style={{ width: size, height: size }}
      >
        {/* Background grid */}
        {showGrid && (
          <div className="absolute inset-0">
            {/* Cross lines */}
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gaming-neon-cyan/30 -translate-x-px" />
            <div className="absolute left-0 right-0 top-1/2 h-px bg-gaming-neon-cyan/30 -translate-y-px" />
            
            {/* Diagonal lines */}
            <div 
              className="absolute inset-0 border-gaming-neon-cyan/20"
              style={{
                backgroundImage: `
                  linear-gradient(45deg, transparent 49%, rgba(0,245,255,0.2) 50%, transparent 51%),
                  linear-gradient(-45deg, transparent 49%, rgba(0,245,255,0.2) 50%, transparent 51%)
                `,
              }}
            />
          </div>
        )}
        
        {/* Range rings */}
        {showRangeRings && (
          <div className="absolute inset-0">
            {[...Array(3)].map((_, i) => {
              const ringSize = ((i + 1) / 3) * 100;
              return (
                <div
                  key={i}
                  className="absolute border border-gaming-neon-cyan/20 rounded-full"
                  style={{
                    width: `${ringSize}%`,
                    height: `${ringSize}%`,
                    top: `${(100 - ringSize) / 2}%`,
                    left: `${(100 - ringSize) / 2}%`,
                  }}
                />
              );
            })}
          </div>
        )}
        
        {/* Radar sweep */}
        {sweepEnabled && (
          <div 
            className="absolute inset-0 origin-center"
            style={{ transform: `rotate(${sweepAngle}deg)` }}
          >
            <div 
              className="absolute top-0 left-1/2 w-px h-1/2 origin-bottom -translate-x-px"
              style={{
                background: `linear-gradient(to bottom, 
                  rgba(0,245,255,0.8) 0%, 
                  rgba(0,245,255,0.4) 50%, 
                  transparent 100%
                )`,
              }}
            />
            {/* Sweep cone */}
            <div 
              className="absolute top-0 left-1/2 origin-bottom -translate-x-1/2"
              style={{
                width: '60px',
                height: `${size / 2}px`,
                background: `conic-gradient(from 0deg at center bottom, 
                  transparent 0deg, 
                  rgba(0,245,255,0.1) 15deg, 
                  rgba(0,245,255,0.2) 30deg, 
                  rgba(0,245,255,0.1) 45deg, 
                  transparent 60deg
                )`,
              }}
            />
          </div>
        )}
        
        {/* Radar points */}
        {visiblePoints.map(point => {
          const x = (point.x / range) * (size / 2) + (size / 2);
          const y = (point.y / range) * (size / 2) + (size / 2);
          const styles = pointTypeStyles[point.type];
          const sizeClass = pointSizeStyles[point.size || 'md'];
          
          return (
            <div
              key={point.id}
              className={cn(
                'absolute rounded-full border transition-all duration-300',
                styles.color,
                styles.glow,
                styles.border,
                sizeClass,
                point.pulsing && 'animate-pulse'
              )}
              style={{
                left: x - (point.size === 'lg' ? 6 : point.size === 'sm' ? 2 : 4),
                top: y - (point.size === 'lg' ? 6 : point.size === 'sm' ? 2 : 4),
              }}
            />
          );
        })}
        
        {/* Center player marker */}
        <div className="absolute top-1/2 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2">
          <div className="w-full h-full bg-gaming-neon-cyan rounded-full border-2 border-white shadow-[0_0_10px_rgba(0,245,255,1)]" />
        </div>
        
        {/* Radar frame overlay */}
        <div className="absolute inset-0 rounded-full border-2 border-gaming-neon-cyan shadow-[0_0_20px_rgba(0,245,255,0.3)]" />
      </div>
      
      {/* Radar info */}
      <div className="mt-2 space-y-1">
        {/* Range indicator */}
        <div className="flex items-center justify-between text-xs font-gaming-mono">
          <span className="text-gaming-neon-cyan">RANGE</span>
          <span className="text-gaming-neon-cyan">{range}m</span>
        </div>
        
        {/* Contact count */}
        <div className="flex items-center justify-between text-xs font-gaming-mono">
          <span className="text-gaming-neon-cyan">CONTACTS</span>
          <span className="text-gaming-neon-cyan">{visiblePoints.length}</span>
        </div>
        
        {/* Sweep status */}
        {sweepEnabled && (
          <div className="flex items-center gap-1">
            <div className="w-1 h-1 bg-gaming-neon-green rounded-full animate-pulse" />
            <span className="text-gaming-neon-green font-gaming-mono text-xs uppercase">
              ACTIVE SCAN
            </span>
          </div>
        )}
      </div>
      
      {/* Legend */}
      <div className="mt-3 grid grid-cols-2 gap-1 text-xs font-gaming-mono">
        {Object.entries(pointTypeStyles).map(([type, styles]) => (
          <div key={type} className="flex items-center gap-1">
            <div className={cn('w-2 h-2 rounded-full', styles.color)} />
            <span className={styles.color.replace('bg-', 'text-').replace('gaming-neon-', 'gaming-neon-')}>
              {type.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};