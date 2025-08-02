'use client';

import React, { useState, useRef, useEffect } from 'react';

interface WheelSegment {
  id: string;
  label: string;
  reward: {
    type: 'xp' | 'coins' | 'item' | 'multiplier' | 'chest';
    amount?: number;
    name?: string;
    icon: string;
  };
  probability: number; // 0-100
  color: string;
  textColor?: string;
}

interface SpinWheelProps {
  segments: WheelSegment[];
  isSpinning: boolean;
  canSpin: boolean;
  cooldownTime?: number;
  onSpin: () => void;
  onResult?: (segment: WheelSegment) => void;
  className?: string;
}

export const SpinWheel: React.FC<SpinWheelProps> = ({
  segments,
  isSpinning,
  canSpin,
  cooldownTime = 0,
  onSpin,
  onResult,
  className = ''
}) => {
  const [rotation, setRotation] = useState(0);
  const [selectedSegment, setSelectedSegment] = useState<WheelSegment | null>(null);
  const [showResult, setShowResult] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSpinning) {
      // Calculate winning segment based on probabilities
      const random = Math.random() * 100;
      let cumulative = 0;
      let winner = segments[0];

      for (const segment of segments) {
        cumulative += segment.probability;
        if (random <= cumulative) {
          winner = segment;
          break;
        }
      }

      // Calculate rotation to land on winner
      const segmentAngle = 360 / segments.length;
      const winnerIndex = segments.findIndex(s => s.id === winner.id);
      const targetAngle = winnerIndex * segmentAngle;
      
      // Add multiple full rotations for effect
      const spins = 5 + Math.random() * 3; // 5-8 full rotations
      const finalRotation = rotation + (spins * 360) + (360 - targetAngle);

      setRotation(finalRotation);

      // Show result after spin animation
      const timer = setTimeout(() => {
        setSelectedSegment(winner);
        setShowResult(true);
        onResult?.(winner);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isSpinning, segments, rotation, onResult]);

  const formatCooldown = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${secs}s`;
    return `${secs}s`;
  };

  const segmentAngle = 360 / segments.length;

  return (
    <div className={`relative ${className}`}>
      {/* Wheel Container */}
      <div className="relative mx-auto w-80 h-80">
        {/* Wheel */}
        <div
          ref={wheelRef}
          className="relative w-full h-full rounded-full border-8 border-gray-800 dark:border-gray-200 shadow-2xl overflow-hidden"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? 'transform 4s cubic-bezier(0.23, 1, 0.32, 1)' : 'none'
          }}
        >
          {/* Segments */}
          {segments.map((segment, index) => {
            const startAngle = index * segmentAngle;
            const endAngle = (index + 1) * segmentAngle;
            
            // Calculate path for segment
            const startAngleRad = (startAngle * Math.PI) / 180;
            const endAngleRad = (endAngle * Math.PI) / 180;
            
            const x1 = 160 + 150 * Math.cos(startAngleRad);
            const y1 = 160 + 150 * Math.sin(startAngleRad);
            const x2 = 160 + 150 * Math.cos(endAngleRad);
            const y2 = 160 + 150 * Math.sin(endAngleRad);
            
            const largeArcFlag = segmentAngle > 180 ? 1 : 0;
            
            const pathData = [
              `M 160 160`,
              `L ${x1} ${y1}`,
              `A 150 150 0 ${largeArcFlag} 1 ${x2} ${y2}`,
              'Z'
            ].join(' ');

            return (
              <div key={segment.id} className="absolute inset-0">
                <svg className="w-full h-full">
                  <path
                    d={pathData}
                    fill={segment.color}
                    stroke="white"
                    strokeWidth="2"
                  />
                </svg>
                
                {/* Segment Content */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    transform: `rotate(${startAngle + segmentAngle / 2}deg)`,
                    transformOrigin: '50% 50%'
                  }}
                >
                  <div
                    className="text-center"
                    style={{
                      transform: `translateY(-60px) rotate(${-(startAngle + segmentAngle / 2)}deg)`,
                      color: segment.textColor || 'white'
                    }}
                  >
                    <div className="text-2xl mb-1">{segment.reward.icon}</div>
                    <div className="text-xs font-bold whitespace-nowrap px-2">
                      {segment.label}
                    </div>
                    {segment.reward.amount && (
                      <div className="text-xs opacity-75">
                        {segment.reward.amount}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Center Hub */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
          <div className="text-2xl">🎯</div>
        </div>

        {/* Pointer */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-red-500 drop-shadow-lg"></div>
        </div>

        {/* Glow Effect */}
        {canSpin && !isSpinning && (
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-400/20 via-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse"></div>
        )}
      </div>

      {/* Controls */}
      <div className="text-center mt-8 space-y-4">
        {cooldownTime > 0 ? (
          <div className="space-y-2">
            <div className="text-orange-600 font-semibold">🕒 Next spin available in:</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatCooldown(cooldownTime)}
            </div>
          </div>
        ) : isSpinning ? (
          <div className="space-y-2">
            <div className="text-blue-600 font-semibold">🌟 Spinning...</div>
            <div className="text-gray-600 dark:text-gray-400">Good luck!</div>
          </div>
        ) : canSpin ? (
          <button
            onClick={onSpin}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xl font-bold rounded-xl shadow-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
          >
            🎲 SPIN THE WHEEL
          </button>
        ) : (
          <div className="text-gray-500 dark:text-gray-400 font-semibold">
            Wheel not available
          </div>
        )}

        {/* Probability Info */}
        <details className="text-left max-w-md mx-auto">
          <summary className="cursor-pointer text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
            View odds
          </summary>
          <div className="mt-2 space-y-1 text-xs text-gray-500 dark:text-gray-400">
            {segments.map((segment) => (
              <div key={segment.id} className="flex justify-between items-center">
                <span className="flex items-center space-x-2">
                  <span>{segment.reward.icon}</span>
                  <span>{segment.label}</span>
                </span>
                <span>{segment.probability}%</span>
              </div>
            ))}
          </div>
        </details>
      </div>

      {/* Result Modal */}
      {showResult && selectedSegment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl text-center">
            {/* Celebration Animation */}
            <div className="relative mb-6">
              <div className="text-8xl animate-bounce">{selectedSegment.reward.icon}</div>
              
              {/* Particles */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-75"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: '2s'
                    }}
                  />
                ))}
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              🎉 Congratulations!
            </h3>

            <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
              You won:
            </p>

            <div className="text-3xl font-bold text-blue-600 mb-6">
              {selectedSegment.label}
            </div>

            <button
              onClick={() => {
                setShowResult(false);
                setSelectedSegment(null);
              }}
              className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-200"
            >
              Claim Reward
            </button>
          </div>
        </div>
      )}

      {/* Sparkle Effects */}
      {canSpin && !isSpinning && (
        <>
          <div className="absolute top-4 left-4 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
          <div className="absolute top-8 right-8 w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-12 left-12 w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
          <div className="absolute bottom-4 right-4 w-2 h-2 bg-pink-400 rounded-full animate-ping"></div>
        </>
      )}
    </div>
  );
};

export default SpinWheel;