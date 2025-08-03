'use client';

import React, { useState } from 'react';

interface ClickFeedbackProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  feedbackType?: 'ripple' | 'pulse' | 'glow' | 'digital' | 'cyber';
  color?: string;
  disabled?: boolean;
  soundHint?: boolean;
}

export const ClickFeedback: React.FC<ClickFeedbackProps> = ({
  children,
  onClick,
  className = '',
  feedbackType = 'ripple',
  color = '#00ffff',
  disabled = false,
  soundHint = true,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) return;

    setIsClicked(true);
    
    // Create ripple effect
    if (feedbackType === 'ripple') {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const newRipple = { id: Date.now(), x, y };
      setRipples(prev => [...prev, newRipple]);
      
      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 600);
    }

    // Reset click state
    setTimeout(() => setIsClicked(false), 200);

    // Sound hint
    if (soundHint) {
      console.log(`🔊 Playing click sound: ${feedbackType}`);
    }

    onClick?.();
  };

  const getFeedbackEffect = () => {
    switch (feedbackType) {
      case 'ripple':
        return (
          <>
            {ripples.map(ripple => (
              <div
                key={ripple.id}
                className="absolute rounded-full border-2 animate-ping pointer-events-none"
                style={{
                  left: ripple.x - 10,
                  top: ripple.y - 10,
                  width: 20,
                  height: 20,
                  borderColor: color,
                  animationDuration: '0.6s',
                }}
              />
            ))}
          </>
        );
      
      case 'pulse':
        return isClicked ? (
          <div
            className="absolute inset-0 rounded animate-pulse"
            style={{
              backgroundColor: `${color}20`,
              boxShadow: `0 0 20px ${color}`,
            }}
          />
        ) : null;
      
      case 'glow':
        return (
          <div
            className={`absolute inset-0 rounded transition-all duration-200 ${
              isClicked ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              boxShadow: `0 0 ${isClicked ? '30px' : '0px'} ${color}`,
            }}
          />
        );
      
      case 'digital':
        return isClicked ? (
          <div className="absolute inset-0 pointer-events-none">
            {/* Digital static effect */}
            <div
              className="absolute inset-0 opacity-50"
              style={{
                background: `repeating-linear-gradient(
                  45deg,
                  ${color}20 0px,
                  transparent 2px,
                  transparent 4px,
                  ${color}20 6px
                )`,
                animation: 'digital-static 0.2s linear',
              }}
            />
          </div>
        ) : null;
      
      case 'cyber':
        return isClicked ? (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded">
            {/* Cyber scan lines */}
            <div
              className="absolute inset-0"
              style={{
                background: `repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 2px,
                  ${color}40 2px,
                  ${color}40 4px
                )`,
                animation: 'cyber-scan 0.3s ease-out',
              }}
            />
            {/* Corner highlights */}
            <div className="absolute top-0 left-0 w-4 h-4">
              <div className="absolute top-0 left-0 w-full h-0.5" style={{ backgroundColor: color }} />
              <div className="absolute top-0 left-0 h-full w-0.5" style={{ backgroundColor: color }} />
            </div>
            <div className="absolute top-0 right-0 w-4 h-4">
              <div className="absolute top-0 right-0 w-full h-0.5" style={{ backgroundColor: color }} />
              <div className="absolute top-0 right-0 h-full w-0.5" style={{ backgroundColor: color }} />
            </div>
            <div className="absolute bottom-0 left-0 w-4 h-4">
              <div className="absolute bottom-0 left-0 w-full h-0.5" style={{ backgroundColor: color }} />
              <div className="absolute bottom-0 left-0 h-full w-0.5" style={{ backgroundColor: color }} />
            </div>
            <div className="absolute bottom-0 right-0 w-4 h-4">
              <div className="absolute bottom-0 right-0 w-full h-0.5" style={{ backgroundColor: color }} />
              <div className="absolute bottom-0 right-0 h-full w-0.5" style={{ backgroundColor: color }} />
            </div>
          </div>
        ) : null;
      
      default:
        return null;
    }
  };

  return (
    <div
      className={`click-feedback relative overflow-hidden cursor-pointer select-none ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${
        isClicked ? 'transform scale-95' : ''
      } transition-transform duration-100`}
      onClick={handleClick}
    >
      {children}
      {getFeedbackEffect()}
      
      {/* Sound hint visualization */}
      {soundHint && isClicked && (
        <div className="absolute top-2 right-2 text-xs opacity-80 animate-pulse pointer-events-none">
          <span style={{ color }}>♪</span>
        </div>
      )}
      
      <style jsx>{`
        @keyframes digital-static {
          0% { transform: translateX(0); }
          25% { transform: translateX(2px); }
          50% { transform: translateX(-2px); }
          75% { transform: translateX(1px); }
          100% { transform: translateX(0); }
        }
        
        @keyframes cyber-scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
};

interface PressableButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  className?: string;
  variant?: 'primary' | 'cyber' | 'neon' | 'matrix';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
}

export const PressableButton: React.FC<PressableButtonProps> = ({
  children,
  onPress,
  className = '',
  variant = 'default',
  size = 'medium',
  disabled = false,
  loading = false,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [soundEffect, setSoundEffect] = useState<string | null>(null);

  const getVariantStyles = () => {
    switch (variant) {
      case 'cyber':
        return {
          bg: 'bg-gradient-to-r from-cyan-600 to-blue-600',
          border: 'border-cyan-400',
          text: 'text-white',
          glow: 'rgba(0, 255, 255, 0.5)',
          sound: 'cyber-beep',
        };
      case 'neon':
        return {
          bg: 'bg-gradient-to-r from-pink-600 to-purple-600',
          border: 'border-pink-400',
          text: 'text-white',
          glow: 'rgba(255, 0, 255, 0.5)',
          sound: 'neon-click',
        };
      case 'matrix':
        return {
          bg: 'bg-gradient-to-r from-green-600 to-emerald-600',
          border: 'border-green-400',
          text: 'text-white',
          glow: 'rgba(0, 255, 0, 0.5)',
          sound: 'matrix-tap',
        };
      default:
        return {
          bg: 'bg-gray-600',
          border: 'border-gray-400',
          text: 'text-white',
          glow: 'rgba(156, 163, 175, 0.5)',
          sound: 'default-click',
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return 'px-3 py-1 text-sm';
      case 'large':
        return 'px-8 py-4 text-lg';
      default:
        return 'px-6 py-2 text-base';
    }
  };

  const styles = getVariantStyles();

  const handleMouseDown = () => {
    if (disabled || loading) return;
    setIsPressed(true);
    setSoundEffect(styles.sound);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    setSoundEffect(null);
  };

  const handleClick = () => {
    if (disabled || loading) return;
    onPress?.();
  };

  return (
    <button
      className={`pressable-button relative overflow-hidden rounded-lg border-2 font-semibold transition-all duration-150 ${
        styles.bg
      } ${styles.border} ${styles.text} ${getSizeStyles()} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
      } ${
        isPressed && !disabled ? 'scale-95 brightness-90' : ''
      }`}
      style={{
        boxShadow: isPressed && !disabled 
          ? `inset 0 4px 8px rgba(0, 0, 0, 0.3), 0 0 15px ${styles.glow}` 
          : `0 0 10px ${styles.glow}40`,
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={handleClick}
      disabled={disabled || loading}
    >
      {/* Loading spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      {/* Button content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Press effect overlay */}
      {isPressed && !disabled && (
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle, ${styles.glow} 0%, transparent 70%)`,
          }}
        />
      )}
      
      {/* Sound effect indicator */}
      {soundEffect && (
        <div className="absolute top-1 right-1 text-xs opacity-70 animate-bounce">
          <span className={styles.text}>♪</span>
        </div>
      )}
    </button>
  );
};

interface TouchFeedbackProps {
  children: React.ReactNode;
  onTouch?: () => void;
  className?: string;
  intensity?: number;
  duration?: number;
  color?: string;
}

export const TouchFeedback: React.FC<TouchFeedbackProps> = ({
  children,
  onTouch,
  className = '',
  intensity = 1,
  duration = 300,
  color = '#00ffff',
}) => {
  const [touches, setTouches] = useState<Array<{ 
    id: number; 
    x: number; 
    y: number; 
    timestamp: number; 
  }>>([]);

  const handleTouch = (e: React.TouchEvent) => {
    if (e.touches.length === 0) return;

    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    const newTouch = {
      id: Date.now(),
      x,
      y,
      timestamp: Date.now(),
    };

    setTouches(prev => [...prev, newTouch]);

    // Remove touch after duration
    setTimeout(() => {
      setTouches(prev => prev.filter(t => t.id !== newTouch.id));
    }, duration);

    onTouch?.();
  };

  return (
    <div
      className={`touch-feedback relative ${className}`}
      onTouchStart={handleTouch}
    >
      {children}
      
      {/* Touch ripples */}
      {touches.map(touch => (
        <div
          key={touch.id}
          className="absolute rounded-full border-2 pointer-events-none"
          style={{
            left: touch.x - 15,
            top: touch.y - 15,
            width: 30,
            height: 30,
            borderColor: color,
            boxShadow: `0 0 ${10 * intensity}px ${color}`,
            animation: `touch-ripple ${duration}ms ease-out`,
          }}
        />
      ))}
      
      <style jsx>{`
        @keyframes touch-ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(3);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

interface ClickVisualizerProps {
  isActive?: boolean;
  className?: string;
  color?: string;
  pattern?: 'rings' | 'sparks' | 'pixels' | 'waves';
}

export const ClickVisualizer: React.FC<ClickVisualizerProps> = ({
  isActive = false,
  className = '',
  color = '#ffff00',
  pattern = 'rings',
}) => {
  const [effects, setEffects] = useState<Array<{ id: number; type: string }>>([]);

  React.useEffect(() => {
    if (isActive) {
      const newEffect = { id: Date.now(), type: pattern };
      setEffects(prev => [...prev, newEffect]);

      setTimeout(() => {
        setEffects(prev => prev.filter(e => e.id !== newEffect.id));
      }, 1000);
    }
  }, [isActive, pattern]);

  const renderEffect = (effect: { id: number; type: string }) => {
    switch (effect.type) {
      case 'rings':
        return (
          <div key={effect.id} className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="rounded-full border-2 animate-ping"
              style={{
                borderColor: color,
                width: '20px',
                height: '20px',
                animationDuration: '1s',
              }}
            />
            <div
              className="absolute rounded-full border-2 animate-ping"
              style={{
                borderColor: color,
                width: '40px',
                height: '40px',
                animationDuration: '1s',
                animationDelay: '0.2s',
              }}
            />
          </div>
        );
      
      case 'sparks':
        return (
          <div key={effect.id} className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={i}
                className="absolute w-1 h-4 animate-ping"
                style={{
                  backgroundColor: color,
                  left: '50%',
                  top: '50%',
                  transform: `rotate(${i * 45}deg) translateY(-20px)`,
                  transformOrigin: '50% 20px',
                  animationDelay: `${i * 0.05}s`,
                  animationDuration: '0.5s',
                }}
              />
            ))}
          </div>
        );
      
      case 'pixels':
        return (
          <div key={effect.id} className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 16 }, (_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 animate-bounce"
                style={{
                  backgroundColor: color,
                  left: `${20 + (i % 4) * 15}%`,
                  top: `${20 + Math.floor(i / 4) * 15}%`,
                  animationDelay: `${i * 0.03}s`,
                  animationDuration: '0.6s',
                }}
              />
            ))}
          </div>
        );
      
      case 'waves':
        return (
          <div key={effect.id} className="absolute inset-0 pointer-events-none overflow-hidden rounded">
            <div
              className="absolute inset-0 animate-pulse"
              style={{
                background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
                animationDuration: '0.8s',
              }}
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`click-visualizer relative ${className}`}>
      {effects.map(renderEffect)}
    </div>
  );
};

interface HapticFeedbackProps {
  children: React.ReactNode;
  onActivate?: () => void;
  className?: string;
  pattern?: 'short' | 'medium' | 'long' | 'double' | 'triple';
  visualHint?: boolean;
  color?: string;
}

export const HapticFeedback: React.FC<HapticFeedbackProps> = ({
  children,
  onActivate,
  className = '',
  pattern = 'short',
  visualHint = true,
  color = '#ff6600',
}) => {
  const [isActive, setIsActive] = useState(false);

  const triggerHaptic = () => {
    setIsActive(true);
    
    // Simulate haptic feedback (in a real app, you'd use the Vibration API)
    console.log(`📳 Haptic feedback: ${pattern}`);
    
    setTimeout(() => setIsActive(false), 200);
    onActivate?.();
  };

  const getPatternVisualization = () => {
    if (!visualHint || !isActive) return null;

    switch (pattern) {
      case 'short':
        return (
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute inset-0 animate-pulse"
              style={{
                backgroundColor: `${color}30`,
                animationDuration: '0.1s',
                animationIterationCount: '1',
              }}
            />
          </div>
        );
      
      case 'medium':
        return (
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute inset-0 animate-pulse"
              style={{
                backgroundColor: `${color}40`,
                animationDuration: '0.2s',
                animationIterationCount: '1',
              }}
            />
          </div>
        );
      
      case 'long':
        return (
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute inset-0 animate-pulse"
              style={{
                backgroundColor: `${color}50`,
                animationDuration: '0.4s',
                animationIterationCount: '1',
              }}
            />
          </div>
        );
      
      case 'double':
        return (
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: `${color}40`,
                animation: 'double-pulse 0.4s ease-in-out',
              }}
            />
          </div>
        );
      
      case 'triple':
        return (
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: `${color}40`,
                animation: 'triple-pulse 0.6s ease-in-out',
              }}
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div
      className={`haptic-feedback relative cursor-pointer ${className}`}
      onClick={triggerHaptic}
    >
      {children}
      {getPatternVisualization()}
      
      <style jsx>{`
        @keyframes double-pulse {
          0%, 100% { opacity: 0; }
          20%, 40% { opacity: 1; }
          30%, 50% { opacity: 0; }
        }
        
        @keyframes triple-pulse {
          0%, 100% { opacity: 0; }
          15%, 35%, 55% { opacity: 1; }
          25%, 45%, 65% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};