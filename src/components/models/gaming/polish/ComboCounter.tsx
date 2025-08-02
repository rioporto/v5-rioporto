'use client';

import React, { useState, useEffect } from 'react';

interface ComboCounterProps {
  onComboRequest?: (callback: (increment?: boolean) => void) => void;
  maxCombo?: number;
  comboTimeout?: number;
  showMultiplier?: boolean;
  onComboChange?: (combo: number, multiplier: number) => void;
  className?: string;
}

export const ComboCounter: React.FC<ComboCounterProps> = ({
  onComboRequest,
  maxCombo = 999,
  comboTimeout = 3000,
  showMultiplier = true,
  onComboChange,
  className = ''
}) => {
  const [combo, setCombo] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [lastActionTime, setLastActionTime] = useState(0);
  const [animationPhase, setAnimationPhase] = useState<'idle' | 'hit' | 'critical'>('idle');
  const [shakeIntensity, setShakeIntensity] = useState(0);

  // Calculate multiplier based on combo
  const getMultiplier = () => {
    if (combo < 5) return 1;
    if (combo < 10) return 1.2;
    if (combo < 25) return 1.5;
    if (combo < 50) return 2;
    if (combo < 100) return 2.5;
    return 3;
  };

  const incrementCombo = (increment: boolean = true) => {
    if (increment) {
      setCombo(prev => {
        const newCombo = Math.min(prev + 1, maxCombo);
        setIsActive(true);
        setLastActionTime(Date.now());
        
        // Animation phases based on combo
        if (newCombo % 50 === 0 && newCombo > 0) {
          setAnimationPhase('critical');
          setShakeIntensity(10);
        } else if (newCombo % 10 === 0 && newCombo > 0) {
          setAnimationPhase('hit');
          setShakeIntensity(5);
        } else {
          setAnimationPhase('hit');
          setShakeIntensity(2);
        }
        
        return newCombo;
      });
    } else {
      // Reset combo
      setCombo(0);
      setIsActive(false);
      setAnimationPhase('idle');
      setShakeIntensity(0);
    }
  };

  // Expose combo control to parent
  useEffect(() => {
    if (onComboRequest) {
      onComboRequest(incrementCombo);
    }
  }, [onComboRequest]);

  // Notify parent of combo changes
  useEffect(() => {
    onComboChange?.(combo, getMultiplier());
  }, [combo, onComboChange]);

  // Combo timeout logic
  useEffect(() => {
    if (combo > 0 && isActive) {
      const timeout = setTimeout(() => {
        const timeSinceLastAction = Date.now() - lastActionTime;
        if (timeSinceLastAction >= comboTimeout) {
          incrementCombo(false);
        }
      }, comboTimeout);

      return () => clearTimeout(timeout);
    }
  }, [combo, lastActionTime, comboTimeout, isActive]);

  // Reset animation phase
  useEffect(() => {
    if (animationPhase !== 'idle') {
      const timeout = setTimeout(() => {
        setAnimationPhase('idle');
        setShakeIntensity(0);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [animationPhase]);

  // Demo mode
  useEffect(() => {
    if (!onComboRequest) {
      const interval = setInterval(() => {
        if (Math.random() > 0.3) {
          incrementCombo(true);
        }
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [onComboRequest]);

  const getComboRank = () => {
    if (combo < 5) return { name: 'COMBO', color: '#ffffff' };
    if (combo < 10) return { name: 'GOOD', color: '#00ff00' };
    if (combo < 25) return { name: 'GREAT', color: '#ffff00' };
    if (combo < 50) return { name: 'AWESOME', color: '#ff8000' };
    if (combo < 100) return { name: 'FANTASTIC', color: '#ff0080' };
    return { name: 'LEGENDARY', color: '#ff0040' };
  };

  const getTimeProgress = () => {
    if (!isActive || combo === 0) return 100;
    const timeSinceLastAction = Date.now() - lastActionTime;
    return Math.max(0, 100 - (timeSinceLastAction / comboTimeout) * 100);
  };

  const rank = getComboRank();
  const multiplier = getMultiplier();
  const timeProgress = getTimeProgress();

  if (combo === 0 && !isActive) return null;

  return (
    <div className={`fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 ${className}`}>
      <div 
        className="relative text-center pointer-events-none select-none"
        style={{
          transform: `translate(${(Math.random() - 0.5) * shakeIntensity}px, ${(Math.random() - 0.5) * shakeIntensity}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        {/* Main combo display */}
        <div className="relative mb-2">
          {/* Glow effect */}
          <div 
            className="absolute inset-0 blur-md opacity-60"
            style={{
              color: rank.color,
              fontSize: animationPhase === 'critical' ? '4rem' : animationPhase === 'hit' ? '3rem' : '2.5rem',
              fontWeight: 'bold',
              transition: 'all 0.2s ease-out'
            }}
          >
            {combo}
          </div>
          
          {/* Main number */}
          <div 
            className="relative font-bold font-mono"
            style={{
              color: rank.color,
              textShadow: `0 0 20px ${rank.color}, 0 0 40px ${rank.color}`,
              fontSize: animationPhase === 'critical' ? '4rem' : animationPhase === 'hit' ? '3rem' : '2.5rem',
              transform: `scale(${animationPhase === 'critical' ? 1.2 : animationPhase === 'hit' ? 1.1 : 1})`,
              transition: 'all 0.2s ease-out'
            }}
          >
            {combo}
          </div>
          
          {/* Critical hit effects */}
          {animationPhase === 'critical' && (
            <>
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-ping"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-60px)`,
                    animationDelay: `${i * 50}ms`
                  }}
                />
              ))}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-yellow-400 text-xl animate-bounce">
                💥
              </div>
            </>
          )}
        </div>
        
        {/* Combo rank */}
        <div 
          className="font-bold text-lg mb-2 tracking-wider"
          style={{
            color: rank.color,
            textShadow: `0 0 10px ${rank.color}`,
            transform: `scale(${animationPhase === 'critical' ? 1.3 : animationPhase === 'hit' ? 1.1 : 1})`,
            transition: 'all 0.2s ease-out'
          }}
        >
          {rank.name}
        </div>
        
        {/* Multiplier */}
        {showMultiplier && multiplier > 1 && (
          <div className="text-cyan-400 font-bold text-sm mb-2">
            <span className="text-white">×</span>
            {multiplier.toFixed(1)}
            <span className="text-xs ml-1">MULTIPLIER</span>
          </div>
        )}
        
        {/* Timeout progress bar */}
        <div className="w-32 h-1 bg-gray-800 rounded-full overflow-hidden mx-auto mb-2">
          <div 
            className="h-full transition-all duration-100 ease-linear"
            style={{
              width: `${timeProgress}%`,
              backgroundColor: timeProgress > 70 ? '#00ff00' : 
                           timeProgress > 30 ? '#ffff00' : '#ff0000',
              boxShadow: `0 0 10px ${timeProgress > 70 ? '#00ff00' : 
                                   timeProgress > 30 ? '#ffff00' : '#ff0000'}`
            }}
          />
        </div>
        
        {/* Special milestone effects */}
        {combo > 0 && combo % 25 === 0 && animationPhase === 'critical' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl animate-ping opacity-60">
              🎯
            </div>
          </div>
        )}
        
        {combo > 0 && combo % 50 === 0 && animationPhase === 'critical' && (
          <div className="absolute -inset-4">
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                className="absolute w-1 h-8 bg-gradient-to-t from-transparent to-yellow-400 animate-pulse"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-40px)`,
                  transformOrigin: 'center 40px',
                  animationDelay: `${i * 50}ms`
                }}
              />
            ))}
          </div>
        )}
        
        {/* Combo chain indicators */}
        {combo >= 10 && (
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {Array.from({ length: Math.min(Math.floor(combo / 10), 10) }, (_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 100}ms` }}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Demo controls */}
      {!onComboRequest && process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-20 right-4 bg-black/80 p-4 rounded-lg z-50 pointer-events-auto">
          <div className="text-white text-sm mb-2">Combo Counter Demo</div>
          <div className="flex flex-col gap-2 text-xs">
            <button 
              onClick={() => incrementCombo(true)}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Hit (+1)
            </button>
            <button 
              onClick={() => incrementCombo(false)}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Reset
            </button>
            <div className="text-gray-300">
              <div>Combo: {combo}</div>
              <div>Multiplier: ×{multiplier.toFixed(1)}</div>
              <div>Rank: {rank.name}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComboCounter;