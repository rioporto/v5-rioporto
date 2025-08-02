'use client';

import React, { useState, useEffect } from 'react';

interface MultiplierTier {
  threshold: number;
  multiplier: number;
  name: string;
  color: string;
  icon: string;
}

interface ScoreMultiplierProps {
  score?: number;
  onMultiplierChange?: (multiplier: number, tier: MultiplierTier) => void;
  customTiers?: MultiplierTier[];
  showProgress?: boolean;
  showEffects?: boolean;
  animateChanges?: boolean;
  className?: string;
}

export const ScoreMultiplier: React.FC<ScoreMultiplierProps> = ({
  score = 0,
  onMultiplierChange,
  customTiers,
  showProgress = true,
  showEffects = true,
  animateChanges = true,
  className = ''
}) => {
  const defaultTiers: MultiplierTier[] = [
    { threshold: 0, multiplier: 1.0, name: 'Rookie', color: '#ffffff', icon: '🆕' },
    { threshold: 100, multiplier: 1.2, name: 'Explorer', color: '#00ff00', icon: '🗺️' },
    { threshold: 500, multiplier: 1.5, name: 'Trader', color: '#ffff00', icon: '📈' },
    { threshold: 1000, multiplier: 2.0, name: 'Pro', color: '#ff8000', icon: '⭐' },
    { threshold: 2500, multiplier: 2.5, name: 'Expert', color: '#ff0080', icon: '💎' },
    { threshold: 5000, multiplier: 3.0, name: 'Master', color: '#8000ff', icon: '👑' },
    { threshold: 10000, multiplier: 4.0, name: 'Legend', color: '#ff0040', icon: '🏆' },
    { threshold: 25000, multiplier: 5.0, name: 'Mythic', color: '#00ffff', icon: '🚀' },
    { threshold: 50000, multiplier: 7.5, name: 'God Tier', color: '#ffd700', icon: '⚡' },
    { threshold: 100000, multiplier: 10.0, name: 'Transcendent', color: '#ff69b4', icon: '🌟' }
  ];

  const tiers = customTiers || defaultTiers;
  const [currentTier, setCurrentTier] = useState<MultiplierTier>(tiers[0]);
  const [previousTier, setPreviousTier] = useState<MultiplierTier>(tiers[0]);
  const [isLevelingUp, setIsLevelingUp] = useState(false);
  const [celebrationActive, setCelebrationActive] = useState(false);

  // Find current tier based on score
  useEffect(() => {
    const newTier = tiers
      .slice()
      .reverse()
      .find(tier => score >= tier.threshold) || tiers[0];

    if (newTier.threshold > currentTier.threshold) {
      // Level up!
      setPreviousTier(currentTier);
      setIsLevelingUp(true);
      setCelebrationActive(true);
      
      setTimeout(() => {
        setIsLevelingUp(false);
      }, 1000);
      
      setTimeout(() => {
        setCelebrationActive(false);
      }, 3000);
    }

    setCurrentTier(newTier);
    onMultiplierChange?.(newTier.multiplier, newTier);
  }, [score, currentTier.threshold, onMultiplierChange]);

  // Get next tier for progress display
  const getNextTier = () => {
    const currentIndex = tiers.findIndex(tier => tier.threshold === currentTier.threshold);
    return currentIndex < tiers.length - 1 ? tiers[currentIndex + 1] : null;
  };

  // Calculate progress to next tier
  const getProgressToNext = () => {
    const nextTier = getNextTier();
    if (!nextTier) return 100;
    
    const progress = ((score - currentTier.threshold) / (nextTier.threshold - currentTier.threshold)) * 100;
    return Math.min(100, Math.max(0, progress));
  };

  const nextTier = getNextTier();
  const progress = getProgressToNext();

  return (
    <div className={`relative ${className}`}>
      {/* Main multiplier display */}
      <div className="text-center">
        {/* Tier icon and name */}
        <div className="flex items-center justify-center space-x-2 mb-2">
          <span 
            className="text-2xl"
            style={{
              filter: showEffects ? `drop-shadow(0 0 10px ${currentTier.color})` : 'none',
              transform: isLevelingUp ? 'scale(1.3)' : 'scale(1)',
              transition: animateChanges ? 'all 0.3s ease-out' : 'none'
            }}
          >
            {currentTier.icon}
          </span>
          <span 
            className="font-bold text-lg"
            style={{
              color: currentTier.color,
              textShadow: showEffects ? `0 0 10px ${currentTier.color}` : 'none',
              transform: isLevelingUp ? 'scale(1.1)' : 'scale(1)',
              transition: animateChanges ? 'all 0.3s ease-out' : 'none'
            }}
          >
            {currentTier.name}
          </span>
        </div>

        {/* Multiplier value */}
        <div 
          className="font-bold text-3xl font-mono mb-2"
          style={{
            color: currentTier.color,
            textShadow: showEffects ? `0 0 20px ${currentTier.color}, 0 0 40px ${currentTier.color}` : 'none',
            transform: isLevelingUp ? 'scale(1.2)' : 'scale(1)',
            transition: animateChanges ? 'all 0.3s ease-out' : 'none'
          }}
        >
          ×{currentTier.multiplier.toFixed(1)}
        </div>

        {/* Score display */}
        <div className="text-gray-300 text-sm mb-3 font-mono">
          Score: {score.toLocaleString()}
        </div>

        {/* Progress to next tier */}
        {showProgress && nextTier && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>{currentTier.name}</span>
              <span>{nextTier.name}</span>
            </div>
            
            <div className="w-48 bg-gray-800 rounded-full h-2 mx-auto overflow-hidden">
              <div 
                className="h-full transition-all duration-500 ease-out"
                style={{
                  width: `${progress}%`,
                  background: `linear-gradient(90deg, ${currentTier.color}, ${nextTier.color})`,
                  boxShadow: showEffects ? `0 0 10px ${currentTier.color}` : 'none'
                }}
              />
            </div>
            
            <div className="text-xs text-gray-400 mt-1">
              {nextTier.threshold - score} more to next level
            </div>
          </div>
        )}

        {/* Level up celebration */}
        {celebrationActive && showEffects && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Screen flash */}
            <div 
              className="absolute inset-0 animate-pulse"
              style={{
                background: `radial-gradient(circle, ${currentTier.color}20 0%, transparent 70%)`
              }}
            />
            
            {/* Fireworks */}
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full animate-ping"
                style={{
                  backgroundColor: currentTier.color,
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-40px)`,
                  animationDelay: `${i * 100}ms`,
                  animationDuration: '1s'
                }}
              />
            ))}
            
            {/* Level up text */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-center">
              <div 
                className="font-bold text-xl animate-bounce"
                style={{ color: currentTier.color }}
              >
                LEVEL UP!
              </div>
              <div className="text-sm text-gray-300">
                {previousTier.name} → {currentTier.name}
              </div>
            </div>
            
            {/* Multiplier increase indicator */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
              <div className="text-green-400 font-bold text-lg animate-pulse">
                +{(currentTier.multiplier - previousTier.multiplier).toFixed(1)}× Multiplier!
              </div>
            </div>
          </div>
        )}

        {/* Tier list preview */}
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-4 text-left">
            <summary className="text-xs text-gray-400 cursor-pointer">
              Show All Tiers
            </summary>
            <div className="mt-2 text-xs space-y-1">
              {tiers.map((tier, index) => (
                <div 
                  key={tier.threshold}
                  className={`flex justify-between items-center p-1 rounded ${
                    tier.threshold === currentTier.threshold ? 'bg-gray-800' : ''
                  }`}
                  style={{ 
                    color: tier.threshold <= score ? tier.color : '#666',
                    opacity: tier.threshold <= score ? 1 : 0.5
                  }}
                >
                  <span>
                    {tier.icon} {tier.name}
                  </span>
                  <span>
                    ×{tier.multiplier} ({tier.threshold.toLocaleString()}+)
                  </span>
                </div>
              ))}
            </div>
          </details>
        )}
      </div>

      {/* Ambient effects */}
      {showEffects && currentTier.multiplier >= 3 && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Floating particles */}
          {Array.from({ length: Math.min(Math.floor(currentTier.multiplier), 8) }, (_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full animate-pulse"
              style={{
                backgroundColor: currentTier.color,
                left: `${20 + (i * 10)}%`,
                top: `${30 + Math.sin(i) * 20}%`,
                animationDelay: `${i * 200}ms`,
                animationDuration: `${2 + Math.random()}s`,
                boxShadow: `0 0 4px ${currentTier.color}`
              }}
            />
          ))}
          
          {/* Aura rings for high-tier multipliers */}
          {currentTier.multiplier >= 5 && (
            <>
              {[1, 2, 3].map(ring => (
                <div
                  key={ring}
                  className="absolute border rounded-full animate-ping"
                  style={{
                    width: `${ring * 80}px`,
                    height: `${ring * 80}px`,
                    borderColor: `${currentTier.color}40`,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    animationDelay: `${ring * 500}ms`,
                    animationDuration: '3s'
                  }}
                />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ScoreMultiplier;