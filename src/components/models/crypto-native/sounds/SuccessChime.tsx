'use client';

import React, { useState, useEffect } from 'react';

interface SuccessChimeProps {
  isActive?: boolean;
  onComplete?: () => void;
  className?: string;
  variant?: 'chime' | 'celebration' | 'achievement' | 'notification' | 'cyber';
  color?: string;
  duration?: number;
  autoReset?: boolean;
}

export const SuccessChime: React.FC<SuccessChimeProps> = ({
  isActive = false,
  onComplete,
  className = '',
  variant = 'chime',
  color = '#00ff00',
  duration = 2000,
  autoReset = true,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    if (isActive && !isPlaying) {
      setIsPlaying(true);
      setAnimationPhase(0);
      
      // Sound hint
      console.log(`🎵 Success sound: ${variant}`);
      
      const interval = setInterval(() => {
        setAnimationPhase(prev => prev + 1);
      }, 200);
      
      const timeout = setTimeout(() => {
        clearInterval(interval);
        setIsPlaying(false);
        if (autoReset) {
          setAnimationPhase(0);
        }
        onComplete?.();
      }, duration);
      
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [isActive, isPlaying, variant, duration, autoReset, onComplete]);

  const getSuccessAnimation = () => {
    if (!isPlaying) return null;

    switch (variant) {
      case 'chime':
        return (
          <div className="success-chime flex items-center justify-center">
            {/* Bell icon with glow */}
            <div className="relative">
              <div
                className="text-6xl animate-bounce"
                style={{
                  color,
                  textShadow: `0 0 20px ${color}`,
                  filter: `drop-shadow(0 0 15px ${color})`,
                }}
              >
                🔔
              </div>
              
              {/* Sound waves */}
              {Array.from({ length: 3 }, (_, i) => (
                <div
                  key={i}
                  className="absolute inset-0 rounded-full border-2 animate-ping"
                  style={{
                    borderColor: color,
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: '1s',
                  }}
                />
              ))}
            </div>
            
            {/* Musical notes */}
            <div className="absolute inset-0 pointer-events-none">
              {['♪', '♫', '♪', '♫'].map((note, i) => (
                <div
                  key={i}
                  className="absolute text-2xl animate-bounce"
                  style={{
                    color,
                    left: `${30 + i * 15}%`,
                    top: `${20 + (i % 2) * 20}%`,
                    animationDelay: `${i * 0.3}s`,
                    textShadow: `0 0 10px ${color}`,
                  }}
                >
                  {note}
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'celebration':
        return (
          <div className="success-celebration flex items-center justify-center">
            {/* Party emojis */}
            <div className="text-8xl animate-pulse" style={{ filter: `drop-shadow(0 0 20px ${color})` }}>
              🎉
            </div>
            
            {/* Confetti effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {Array.from({ length: 20 }, (_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 animate-bounce"
                  style={{
                    backgroundColor: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'][i % 5],
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '2s',
                    boxShadow: `0 0 5px ${color}`,
                  }}
                />
              ))}
            </div>
            
            {/* Sparkles */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={i}
                  className="absolute text-3xl animate-spin"
                  style={{
                    color: '#ffff00',
                    left: `${20 + i * 10}%`,
                    top: `${10 + (i % 3) * 30}%`,
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: '3s',
                    textShadow: '0 0 15px #ffff00',
                  }}
                >
                  ✨
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'achievement':
        return (
          <div className="success-achievement flex flex-col items-center justify-center">
            {/* Trophy */}
            <div
              className="text-8xl animate-bounce mb-4"
              style={{
                filter: `drop-shadow(0 0 25px ${color})`,
                animation: 'trophy-glow 2s ease-in-out infinite',
              }}
            >
              🏆
            </div>
            
            {/* Achievement banner */}
            <div
              className="px-6 py-2 border-2 rounded-lg font-mono text-lg font-bold animate-pulse"
              style={{
                borderColor: color,
                color,
                backgroundColor: `${color}20`,
                textShadow: `0 0 10px ${color}`,
                boxShadow: `0 0 20px ${color}50`,
              }}
            >
              ACHIEVEMENT UNLOCKED!
            </div>
            
            {/* Stars */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 5 }, (_, i) => (
                <div
                  key={i}
                  className="absolute text-4xl animate-ping"
                  style={{
                    color: '#ffff00',
                    left: `${15 + i * 15}%`,
                    top: `${15 + (i % 2) * 70}%`,
                    animationDelay: `${i * 0.4}s`,
                    textShadow: '0 0 15px #ffff00',
                  }}
                >
                  ⭐
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'notification':
        return (
          <div className="success-notification flex items-center justify-center">
            {/* Check mark */}
            <div className="relative">
              <div
                className="text-8xl animate-pulse"
                style={{
                  color,
                  textShadow: `0 0 25px ${color}`,
                  filter: `drop-shadow(0 0 20px ${color})`,
                }}
              >
                ✅
              </div>
              
              {/* Ripple effect */}
              <div
                className="absolute inset-0 rounded-full border-4 animate-ping"
                style={{
                  borderColor: color,
                  animationDuration: '1.5s',
                }}
              />
            </div>
            
            {/* Success text */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
              <div
                className="font-mono text-xl font-bold animate-bounce"
                style={{
                  color,
                  textShadow: `0 0 10px ${color}`,
                }}
              >
                SUCCESS
              </div>
            </div>
          </div>
        );
      
      case 'cyber':
        return (
          <div className="success-cyber flex flex-col items-center justify-center">
            {/* Cyber success symbol */}
            <div className="relative mb-4">
              <div
                className="text-8xl font-mono animate-pulse"
                style={{
                  color,
                  textShadow: `0 0 30px ${color}`,
                  filter: `drop-shadow(0 0 25px ${color})`,
                }}
              >
                ⟨✓⟩
              </div>
              
              {/* Scan lines */}
              <div
                className="absolute inset-0"
                style={{
                  background: `repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 2px,
                    ${color}30 2px,
                    ${color}30 4px
                  )`,
                  animation: 'cyber-scan 1s linear infinite',
                }}
              />
            </div>
            
            {/* Status text */}
            <div
              className="px-4 py-2 border rounded font-mono text-sm animate-pulse"
              style={{
                borderColor: color,
                color,
                backgroundColor: `${color}10`,
                textShadow: `0 0 8px ${color}`,
              }}
            >
              [ OPERATION COMPLETED ]
            </div>
            
            {/* Data stream */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {Array.from({ length: 6 }, (_, i) => (
                <div
                  key={i}
                  className="absolute font-mono text-xs animate-pulse opacity-60"
                  style={{
                    color,
                    left: `${10 + i * 15}%`,
                    top: `${80 + (i % 2) * 10}%`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                >
                  {['1010', '1100', '0011', '1001', '0110', '1111'][i]}
                </div>
              ))}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`success-chime-container relative w-full h-full ${className}`}>
      {getSuccessAnimation()}
      
      <style jsx>{`
        @keyframes trophy-glow {
          0%, 100% {
            filter: drop-shadow(0 0 25px ${color}) brightness(1);
          }
          50% {
            filter: drop-shadow(0 0 40px ${color}) brightness(1.2);
          }
        }
        
        @keyframes cyber-scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
};

interface SuccessNotificationProps {
  message: string;
  isVisible?: boolean;
  onClose?: () => void;
  className?: string;
  duration?: number;
  variant?: 'minimal' | 'detailed' | 'cyber' | 'celebration';
}

export const SuccessNotification: React.FC<SuccessNotificationProps> = ({
  message,
  isVisible = false,
  onClose,
  className = '',
  duration = 3000,
  variant = 'minimal',
}) => {
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsShowing(true);
      
      if (duration > 0) {
        const timer = setTimeout(() => {
          setIsShowing(false);
          onClose?.();
        }, duration);
        
        return () => clearTimeout(timer);
      }
    } else {
      setIsShowing(false);
    }
  }, [isVisible, duration, onClose]);

  if (!isShowing) return null;

  const getNotificationContent = () => {
    switch (variant) {
      case 'minimal':
        return (
          <div className="flex items-center space-x-3">
            <div className="text-green-400 text-xl">✓</div>
            <div className="text-white">{message}</div>
          </div>
        );
      
      case 'detailed':
        return (
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="text-green-400 text-2xl animate-pulse">✅</div>
            </div>
            <div className="flex-1">
              <div className="text-green-400 font-semibold text-sm">Success</div>
              <div className="text-white text-sm">{message}</div>
            </div>
            <button
              onClick={() => {
                setIsShowing(false);
                onClose?.();
              }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
        );
      
      case 'cyber':
        return (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="text-cyan-400 text-lg font-mono animate-pulse">⟨✓⟩</div>
              <div className="text-cyan-400 font-mono text-xs">SYSTEM STATUS</div>
            </div>
            <div className="text-white font-mono text-sm">
              &gt; {message}
            </div>
            <div className="text-cyan-400 font-mono text-xs opacity-60">
              [ {new Date().toLocaleTimeString()} ]
            </div>
          </div>
        );
      
      case 'celebration':
        return (
          <div className="text-center space-y-2">
            <div className="text-4xl animate-bounce">🎉</div>
            <div className="text-yellow-400 font-bold text-lg">Success!</div>
            <div className="text-white">{message}</div>
            <div className="flex justify-center space-x-2">
              {['⭐', '✨', '🌟'].map((emoji, i) => (
                <span
                  key={i}
                  className="text-xl animate-ping"
                  style={{ animationDelay: `${i * 0.3}s` }}
                >
                  {emoji}
                </span>
              ))}
            </div>
          </div>
        );
      
      default:
        return (
          <div className="flex items-center space-x-3">
            <div className="text-green-400 text-xl">✓</div>
            <div className="text-white">{message}</div>
          </div>
        );
    }
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 max-w-md transition-all duration-300 ${
        isShowing ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      } ${className}`}
    >
      <div className="bg-gray-900 border border-green-500/30 rounded-lg p-4 shadow-lg backdrop-blur-sm">
        {getNotificationContent()}
        
        {/* Progress bar */}
        {duration > 0 && (
          <div className="mt-2 h-1 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-400 transition-all ease-linear"
              style={{
                width: '100%',
                animation: `progress-bar ${duration}ms linear`,
              }}
            />
          </div>
        )}
      </div>
      
      <style jsx>{`
        @keyframes progress-bar {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

interface CompletionAnimationProps {
  isComplete?: boolean;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  showText?: boolean;
  customText?: string;
}

export const CompletionAnimation: React.FC<CompletionAnimationProps> = ({
  isComplete = false,
  className = '',
  size = 'medium',
  color = '#00ff00',
  showText = true,
  customText = 'Complete!',
}) => {
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    if (isComplete) {
      let phase = 0;
      const interval = setInterval(() => {
        setAnimationPhase(phase);
        phase++;
        if (phase > 3) {
          clearInterval(interval);
        }
      }, 300);
      
      return () => clearInterval(interval);
    } else {
      setAnimationPhase(0);
    }
  }, [isComplete]);

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-16 h-16 text-2xl';
      case 'large':
        return 'w-32 h-32 text-6xl';
      default:
        return 'w-24 h-24 text-4xl';
    }
  };

  const getCheckmarkPath = () => {
    const progress = Math.min(animationPhase / 3, 1);
    const pathLength = 100;
    const dashOffset = pathLength * (1 - progress);
    
    return {
      strokeDasharray: pathLength,
      strokeDashoffset: dashOffset,
    };
  };

  return (
    <div className={`completion-animation flex flex-col items-center justify-center ${className}`}>
      {/* Animated checkmark */}
      <div className={`relative ${getSizeClasses()}`}>
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          style={{
            transform: isComplete ? 'scale(1)' : 'scale(0)',
            transition: 'transform 0.5s ease-out',
          }}
        >
          {/* Circle background */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={color}
            strokeWidth="3"
            opacity="0.3"
          />
          
          {/* Animated checkmark */}
          <path
            d="M25 50 L40 65 L75 30"
            fill="none"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={getCheckmarkPath()}
          />
        </svg>
        
        {/* Glow effect */}
        {isComplete && (
          <div
            className="absolute inset-0 rounded-full animate-pulse"
            style={{
              boxShadow: `0 0 30px ${color}50`,
            }}
          />
        )}
      </div>
      
      {/* Success text */}
      {showText && isComplete && animationPhase >= 2 && (
        <div
          className="mt-4 font-semibold animate-fade-in"
          style={{
            color,
            textShadow: `0 0 10px ${color}`,
          }}
        >
          {customText}
        </div>
      )}
      
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};