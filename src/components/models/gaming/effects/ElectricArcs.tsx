'use client';

import React, { useState, useEffect } from 'react';

interface Arc {
  id: number;
  points: { x: number; y: number }[];
  intensity: number;
  life: number;
  maxLife: number;
  branches: { x: number; y: number }[][];
}

interface ElectricArcsProps {
  trigger?: boolean;
  count?: number;
  color?: string;
  intensity?: number;
  duration?: number;
  origin?: { x: number; y: number };
  target?: { x: number; y: number };
  type?: 'random' | 'targeted' | 'chain' | 'sphere' | 'web';
  thickness?: number;
  onComplete?: () => void;
  className?: string;
}

export const ElectricArcs: React.FC<ElectricArcsProps> = ({
  trigger = false,
  count = 5,
  color = '#00ffff',
  intensity = 1,
  duration = 2000,
  origin = { x: 50, y: 50 },
  target,
  type = 'random',
  thickness = 2,
  onComplete,
  className = ''
}) => {
  const [arcs, setArcs] = useState<Arc[]>([]);
  const [isActive, setIsActive] = useState(false);

  const generateLightningPath = (from: { x: number; y: number }, to: { x: number; y: number }) => {
    const points = [from];
    const segments = 8 + Math.random() * 8;
    
    for (let i = 1; i < segments; i++) {
      const progress = i / segments;
      const baseX = from.x + (to.x - from.x) * progress;
      const baseY = from.y + (to.y - from.y) * progress;
      
      // Add randomness to create lightning effect
      const jitterX = (Math.random() - 0.5) * 15 * (1 - Math.abs(progress - 0.5) * 2);
      const jitterY = (Math.random() - 0.5) * 15 * (1 - Math.abs(progress - 0.5) * 2);
      
      points.push({
        x: baseX + jitterX,
        y: baseY + jitterY
      });
    }
    
    points.push(to);
    return points;
  };

  const generateBranches = (mainPath: { x: number; y: number }[]) => {
    const branches: { x: number; y: number }[][] = [];
    
    // Create 2-4 random branches
    const branchCount = 2 + Math.random() * 3;
    
    for (let i = 0; i < branchCount; i++) {
      const branchStart = Math.floor(Math.random() * (mainPath.length - 2)) + 1;
      const startPoint = mainPath[branchStart];
      
      const branchLength = 3 + Math.random() * 5;
      const branchPoints = [startPoint];
      
      for (let j = 1; j < branchLength; j++) {
        const lastPoint = branchPoints[j - 1];
        const angle = Math.random() * Math.PI * 2;
        const distance = 5 + Math.random() * 10;
        
        branchPoints.push({
          x: lastPoint.x + Math.cos(angle) * distance,
          y: lastPoint.y + Math.sin(angle) * distance
        });
      }
      
      branches.push(branchPoints);
    }
    
    return branches;
  };

  const createArc = (index: number): Arc => {
    let targetPoint: { x: number; y: number };
    
    switch (type) {
      case 'targeted':
        targetPoint = target || { x: 50 + Math.random() * 40 - 20, y: 50 + Math.random() * 40 - 20 };
        break;
      case 'chain':
        const chainAngle = (index / count) * Math.PI * 2;
        const chainDistance = 30 + Math.random() * 20;
        targetPoint = {
          x: origin.x + Math.cos(chainAngle) * chainDistance,
          y: origin.y + Math.sin(chainAngle) * chainDistance
        };
        break;
      case 'sphere':
        const sphereAngle = Math.random() * Math.PI * 2;
        const sphereDistance = 20 + Math.random() * 30;
        targetPoint = {
          x: origin.x + Math.cos(sphereAngle) * sphereDistance,
          y: origin.y + Math.sin(sphereAngle) * sphereDistance
        };
        break;
      case 'web':
        const webAngle = ((index / count) * Math.PI * 2) + (Math.random() - 0.5) * 0.5;
        const webDistance = 25 + Math.random() * 25;
        targetPoint = {
          x: origin.x + Math.cos(webAngle) * webDistance,
          y: origin.y + Math.sin(webAngle) * webDistance
        };
        break;
      default: // random
        targetPoint = {
          x: Math.random() * 100,
          y: Math.random() * 100
        };
    }
    
    const points = generateLightningPath(origin, targetPoint);
    const branches = generateBranches(points);
    
    return {
      id: index,
      points,
      intensity: 0.7 + Math.random() * 0.3,
      life: duration / 50,
      maxLife: duration / 50,
      branches
    };
  };

  const startArcs = () => {
    const newArcs = Array.from({ length: count }, (_, i) => createArc(i));
    setArcs(newArcs);
    setIsActive(true);
    
    setTimeout(() => {
      setIsActive(false);
      setArcs([]);
      onComplete?.();
    }, duration);
  };

  useEffect(() => {
    if (trigger) {
      startArcs();
    }
  }, [trigger]);

  useEffect(() => {
    if (!isActive) return;
    
    const interval = setInterval(() => {
      setArcs(prevArcs => 
        prevArcs.map(arc => ({
          ...arc,
          life: arc.life - 1,
          intensity: Math.max(0, arc.intensity - 0.02)
        })).filter(arc => arc.life > 0)
      );
    }, 50);
    
    return () => clearInterval(interval);
  }, [isActive]);

  const pathToSvgPath = (points: { x: number; y: number }[]) => {
    if (points.length === 0) return '';
    
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      path += ` L ${points[i].x} ${points[i].y}`;
    }
    return path;
  };

  if (!isActive || arcs.length === 0) return null;

  return (
    <div className={`fixed inset-0 pointer-events-none z-50 ${className}`}>
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          {/* Electric glow filter */}
          <filter id={`electric-glow-${color.replace('#', '')}`}>
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          {/* Strong glow for main arcs */}
          <filter id={`electric-strong-glow-${color.replace('#', '')}`}>
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {arcs.map(arc => (
          <g key={arc.id}>
            {/* Main arc - outer glow */}
            <path
              d={pathToSvgPath(arc.points)}
              stroke={color}
              strokeWidth={thickness * 3}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={arc.intensity * intensity * 0.3}
              filter="blur(3px)"
            />
            
            {/* Main arc - middle glow */}
            <path
              d={pathToSvgPath(arc.points)}
              stroke={color}
              strokeWidth={thickness * 1.5}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={arc.intensity * intensity * 0.6}
              filter={`url(#electric-strong-glow-${color.replace('#', '')})`}
            />
            
            {/* Main arc - core */}
            <path
              d={pathToSvgPath(arc.points)}
              stroke="#ffffff"
              strokeWidth={Math.max(1, thickness * 0.5)}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={arc.intensity * intensity}
            />
            
            {/* Branches */}
            {arc.branches.map((branch, branchIndex) => (
              <g key={branchIndex}>
                {/* Branch glow */}
                <path
                  d={pathToSvgPath(branch)}
                  stroke={color}
                  strokeWidth={thickness}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={arc.intensity * intensity * 0.4}
                  filter={`url(#electric-glow-${color.replace('#', '')})`}
                />
                
                {/* Branch core */}
                <path
                  d={pathToSvgPath(branch)}
                  stroke="#ffffff"
                  strokeWidth={Math.max(0.5, thickness * 0.3)}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={arc.intensity * intensity * 0.8}
                />
              </g>
            ))}
          </g>
        ))}
      </svg>
      
      {/* Electric particles at arc endpoints */}
      {arcs.map(arc => (
        <div key={`particle-${arc.id}`}>
          {/* Origin particle */}
          <div
            className="absolute w-2 h-2 rounded-full animate-pulse"
            style={{
              left: `${origin.x}%`,
              top: `${origin.y}%`,
              backgroundColor: color,
              boxShadow: `0 0 10px ${color}`,
              transform: 'translate(-50%, -50%)',
              opacity: arc.intensity * intensity,
            }}
          />
          
          {/* Target particle */}
          {arc.points.length > 0 && (
            <div
              className="absolute w-2 h-2 rounded-full animate-pulse"
              style={{
                left: `${arc.points[arc.points.length - 1].x}%`,
                top: `${arc.points[arc.points.length - 1].y}%`,
                backgroundColor: color,
                boxShadow: `0 0 10px ${color}`,
                transform: 'translate(-50%, -50%)',
                opacity: arc.intensity * intensity,
                animationDelay: '0.1s',
              }}
            />
          )}
          
          {/* Branch endpoint particles */}
          {arc.branches.map((branch, branchIndex) => 
            branch.length > 0 && (
              <div
                key={branchIndex}
                className="absolute w-1 h-1 rounded-full animate-pulse"
                style={{
                  left: `${branch[branch.length - 1].x}%`,
                  top: `${branch[branch.length - 1].y}%`,
                  backgroundColor: color,
                  boxShadow: `0 0 5px ${color}`,
                  transform: 'translate(-50%, -50%)',
                  opacity: arc.intensity * intensity * 0.7,
                  animationDelay: `${branchIndex * 0.05}s`,
                }}
              />
            )
          )}
        </div>
      ))}
      
      {/* Screen flash effect for intense arcs */}
      {intensity > 0.8 && isActive && (
        <div 
          className="fixed inset-0 pointer-events-none animate-pulse"
          style={{
            background: `radial-gradient(circle at ${origin.x}% ${origin.y}%, ${color}05 0%, transparent 50%)`,
            animationDuration: '0.1s',
          }}
        />
      )}
    </div>
  );
};

export default ElectricArcs;