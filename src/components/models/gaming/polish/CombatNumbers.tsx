'use client';

import React, { useState, useEffect } from 'react';

interface CombatNumber {
  id: string;
  value: number;
  type: 'damage' | 'heal' | 'exp' | 'crit' | 'miss' | 'bonus' | 'profit' | 'loss';
  x: number;
  y: number;
  life: number;
  maxLife: number;
  velocity: { x: number; y: number };
  scale: number;
  opacity: number;
}

interface CombatNumbersProps {
  onNumberRequest?: (callback: (type: string, value: number, x?: number, y?: number) => void) => void;
  maxNumbers?: number;
  duration?: number;
  className?: string;
}

export const CombatNumbers: React.FC<CombatNumbersProps> = ({
  onNumberRequest,
  maxNumbers = 20,
  duration = 2000,
  className = ''
}) => {
  const [numbers, setNumbers] = useState<CombatNumber[]>([]);

  const createNumber = (type: CombatNumber['type'], value: number, x?: number, y?: number): CombatNumber => {
    return {
      id: `${Date.now()}-${Math.random()}`,
      value,
      type,
      x: x ?? Math.random() * 80 + 10,
      y: y ?? Math.random() * 80 + 10,
      life: duration / 16, // 60fps
      maxLife: duration / 16,
      velocity: {
        x: (Math.random() - 0.5) * 2,
        y: type === 'heal' || type === 'exp' || type === 'bonus' || type === 'profit' ? -3 : -2
      },
      scale: type === 'crit' ? 1.5 : type === 'bonus' ? 1.3 : 1,
      opacity: 1
    };
  };

  const addNumber = (type: string, value: number, x?: number, y?: number) => {
    const newNumber = createNumber(type as CombatNumber['type'], value, x, y);
    setNumbers(prev => [...prev.slice(-(maxNumbers - 1)), newNumber]);
  };

  // Expose the add number function to parent
  useEffect(() => {
    if (onNumberRequest) {
      onNumberRequest(addNumber);
    }
  }, [onNumberRequest]);

  // Animation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setNumbers(prevNumbers => 
        prevNumbers.map(number => {
          const lifeRatio = number.life / number.maxLife;
          const newY = number.y + number.velocity.y * 0.5;
          const newX = number.x + number.velocity.x * 0.3;
          
          return {
            ...number,
            x: newX,
            y: newY,
            life: number.life - 1,
            opacity: Math.max(0, lifeRatio),
            scale: number.scale * (1 + (1 - lifeRatio) * 0.2),
            velocity: {
              ...number.velocity,
              y: number.velocity.y * 0.98, // gravity slowdown
              x: number.velocity.x * 0.99  // air resistance
            }
          };
        }).filter(number => number.life > 0)
      );
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, []);

  const getNumberStyle = (number: CombatNumber) => {
    const colors = {
      damage: '#ff4444',
      heal: '#44ff44',
      exp: '#ffff44',
      crit: '#ff8800',
      miss: '#888888',
      bonus: '#00ffff',
      profit: '#00ff88',
      loss: '#ff0088'
    };

    const shadows = {
      damage: '0 0 10px #ff4444, 0 0 20px #ff4444',
      heal: '0 0 10px #44ff44, 0 0 20px #44ff44',
      exp: '0 0 10px #ffff44, 0 0 20px #ffff44',
      crit: '0 0 15px #ff8800, 0 0 30px #ff8800',
      miss: '0 0 5px #888888',
      bonus: '0 0 10px #00ffff, 0 0 20px #00ffff',
      profit: '0 0 10px #00ff88, 0 0 20px #00ff88',
      loss: '0 0 10px #ff0088, 0 0 20px #ff0088'
    };

    return {
      color: colors[number.type],
      textShadow: shadows[number.type],
      fontSize: `${16 * number.scale}px`,
      fontWeight: number.type === 'crit' || number.type === 'bonus' ? 'bold' : 'normal',
      opacity: number.opacity,
      transform: `translate(-50%, -50%) scale(${number.scale})`,
      left: `${number.x}%`,
      top: `${number.y}%`,
    };
  };

  const getNumberPrefix = (number: CombatNumber) => {
    switch (number.type) {
      case 'damage':
        return '-';
      case 'heal':
        return '+';
      case 'exp':
        return '+';
      case 'crit':
        return 'CRIT ';
      case 'miss':
        return 'MISS';
      case 'bonus':
        return 'BONUS +';
      case 'profit':
        return '+$';
      case 'loss':
        return '-$';
      default:
        return '';
    }
  };

  const getNumberSuffix = (number: CombatNumber) => {
    switch (number.type) {
      case 'exp':
        return ' XP';
      case 'heal':
        return ' HP';
      default:
        return '';
    }
  };

  const formatNumber = (value: number, type: CombatNumber['type']) => {
    if (type === 'miss') return '';
    
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + 'M';
    }
    if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'K';
    }
    return value.toString();
  };

  // Demo mode - generate random numbers for testing
  useEffect(() => {
    if (!onNumberRequest) {
      const demoInterval = setInterval(() => {
        const types: CombatNumber['type'][] = ['damage', 'heal', 'exp', 'crit', 'bonus', 'profit', 'loss'];
        const randomType = types[Math.floor(Math.random() * types.length)];
        const randomValue = Math.floor(Math.random() * 1000) + 1;
        
        addNumber(randomType, randomValue);
      }, 2000);

      return () => clearInterval(demoInterval);
    }
  }, [onNumberRequest]);

  return (
    <div className={`fixed inset-0 pointer-events-none z-40 ${className}`}>
      {numbers.map(number => (
        <div
          key={number.id}
          className="absolute font-bold transition-none select-none"
          style={getNumberStyle(number)}
        >
          <div className="relative">
            {/* Main number */}
            <div className="relative z-10 font-mono">
              {getNumberPrefix(number)}
              {formatNumber(number.value, number.type)}
              {getNumberSuffix(number)}
            </div>
            
            {/* Glow effect for special types */}
            {(number.type === 'crit' || number.type === 'bonus') && (
              <div 
                className="absolute inset-0 font-mono opacity-50 blur-sm"
                style={{ 
                  color: number.type === 'crit' ? '#ff8800' : '#00ffff',
                  transform: 'scale(1.1)'
                }}
              >
                {getNumberPrefix(number)}
                {formatNumber(number.value, number.type)}
                {getNumberSuffix(number)}
              </div>
            )}
            
            {/* Critical hit effects */}
            {number.type === 'crit' && (
              <>
                <div className="absolute -top-2 -left-2 text-yellow-400 text-xs animate-pulse">
                  ⚡
                </div>
                <div className="absolute -top-2 -right-2 text-yellow-400 text-xs animate-pulse">
                  ⚡
                </div>
              </>
            )}
            
            {/* Bonus effects */}
            {number.type === 'bonus' && (
              <>
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-cyan-400 text-xs animate-bounce">
                  ⭐
                </div>
                {Array.from({ length: 4 }, (_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-ping"
                    style={{
                      top: '-8px',
                      left: `${20 + i * 15}%`,
                      animationDelay: `${i * 100}ms`
                    }}
                  />
                ))}
              </>
            )}
            
            {/* Profit/Loss indicators */}
            {(number.type === 'profit' || number.type === 'loss') && (
              <div 
                className={`absolute -top-2 -right-6 text-xs ${
                  number.type === 'profit' ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {number.type === 'profit' ? '📈' : '📉'}
              </div>
            )}
            
            {/* Miss effect */}
            {number.type === 'miss' && (
              <div className="text-gray-500 italic font-normal">
                MISS
              </div>
            )}
          </div>
        </div>
      ))}
      
      {/* Demo controls (only show if no external control) */}
      {!onNumberRequest && process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-black/80 p-4 rounded-lg z-50 pointer-events-auto">
          <div className="text-white text-sm mb-2">Combat Numbers Demo</div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button 
              onClick={() => addNumber('damage', Math.floor(Math.random() * 500) + 100)}
              className="bg-red-600 text-white px-2 py-1 rounded"
            >
              Damage
            </button>
            <button 
              onClick={() => addNumber('heal', Math.floor(Math.random() * 200) + 50)}
              className="bg-green-600 text-white px-2 py-1 rounded"
            >
              Heal
            </button>
            <button 
              onClick={() => addNumber('crit', Math.floor(Math.random() * 1000) + 500)}
              className="bg-orange-600 text-white px-2 py-1 rounded"
            >
              Critical
            </button>
            <button 
              onClick={() => addNumber('exp', Math.floor(Math.random() * 100) + 25)}
              className="bg-yellow-600 text-white px-2 py-1 rounded"
            >
              Experience
            </button>
            <button 
              onClick={() => addNumber('bonus', Math.floor(Math.random() * 300) + 100)}
              className="bg-cyan-600 text-white px-2 py-1 rounded"
            >
              Bonus
            </button>
            <button 
              onClick={() => addNumber('miss', 0)}
              className="bg-gray-600 text-white px-2 py-1 rounded"
            >
              Miss
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CombatNumbers;