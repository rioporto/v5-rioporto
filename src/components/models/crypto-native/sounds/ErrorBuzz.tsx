'use client';

import React, { useState, useEffect } from 'react';

interface ErrorBuzzProps {
  isActive?: boolean;
  onComplete?: () => void;
  className?: string;
  variant?: 'buzz' | 'alert' | 'warning' | 'critical' | 'cyber';
  color?: string;
  duration?: number;
  intensity?: number;
}

export const ErrorBuzz: React.FC<ErrorBuzzProps> = ({
  isActive = false,
  onComplete,
  className = '',
  variant = 'buzz',
  color = '#ff0000',
  duration = 1500,
  intensity = 1,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [shakeCount, setShakeCount] = useState(0);

  useEffect(() => {
    if (isActive && !isPlaying) {
      setIsPlaying(true);
      setShakeCount(0);
      
      // Sound hint
      console.log(`🔊 Error sound: ${variant}`);
      
      const shakeInterval = setInterval(() => {
        setShakeCount(prev => prev + 1);
      }, 100);
      
      const timeout = setTimeout(() => {
        clearInterval(shakeInterval);
        setIsPlaying(false);
        setShakeCount(0);
        onComplete?.();
      }, duration);
      
      return () => {
        clearInterval(shakeInterval);
        clearTimeout(timeout);
      };
    }
  }, [isActive, isPlaying, variant, duration, onComplete]);

  const getErrorAnimation = () => {
    if (!isPlaying) return null;

    const shakeTransform = `translateX(${Math.sin(shakeCount * 0.5) * 5 * intensity}px)`;

    switch (variant) {
      case 'buzz':
        return (
          <div 
            className="error-buzz flex items-center justify-center"
            style={{ transform: shakeTransform }}
          >
            {/* X mark with glow */}
            <div className="relative">
              <div
                className="text-6xl font-bold animate-pulse"
                style={{
                  color,
                  textShadow: `0 0 20px ${color}`,
                  filter: `drop-shadow(0 0 15px ${color})`,
                }}
              >
                ✕
              </div>
              
              {/* Error rings */}
              {Array.from({ length: 3 }, (_, i) => (
                <div
                  key={i}
                  className="absolute inset-0 rounded-full border-2 animate-ping"
                  style={{
                    borderColor: color,
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: '0.8s',
                  }}
                />
              ))}
            </div>
          </div>
        );
      
      case 'alert':
        return (
          <div 
            className="error-alert flex flex-col items-center justify-center"
            style={{ transform: shakeTransform }}
          >
            {/* Warning triangle */}
            <div className="relative mb-4">
              <div
                className="text-8xl animate-bounce"
                style={{
                  color: '#ffaa00',
                  textShadow: '0 0 25px #ffaa00',
                  filter: 'drop-shadow(0 0 20px #ffaa00)',
                }}
              >
                ⚠️
              </div>
              
              {/* Pulsing background */}
              <div
                className="absolute inset-0 rounded-full animate-pulse"
                style={{
                  backgroundColor: `${color}20`,
                  transform: 'scale(1.5)',
                }}
              />
            </div>
            
            {/* Error text */}
            <div
              className="px-4 py-2 border-2 rounded font-mono text-lg font-bold animate-pulse"
              style={{
                borderColor: color,
                color,
                backgroundColor: `${color}10`,
                textShadow: `0 0 10px ${color}`,
              }}
            >
              ERROR DETECTED
            </div>
          </div>
        );
      
      case 'warning':
        return (
          <div 
            className="error-warning flex items-center justify-center"
            style={{ transform: shakeTransform }}
          >
            {/* Exclamation mark */}
            <div className="relative">
              <div
                className="text-8xl font-bold animate-bounce"
                style={{
                  color: '#ff6600',
                  textShadow: '0 0 25px #ff6600',
                  filter: 'drop-shadow(0 0 20px #ff6600)',
                }}
              >
                !
              </div>
              
              {/* Warning stripes */}
              <div
                className="absolute inset-0 opacity-60"
                style={{
                  background: `repeating-linear-gradient(
                    45deg,
                    ${color}00,
                    ${color}00 5px,
                    ${color}40 5px,
                    ${color}40 10px
                  )`,
                  animation: 'warning-stripes 0.5s linear infinite',
                }}
              />
            </div>
            
            {/* Flashing border */}
            <div
              className="absolute inset-0 border-4 animate-pulse"
              style={{
                borderColor: '#ff6600',
                animationDuration: '0.3s',
              }}
            />
          </div>
        );
      
      case 'critical':
        return (
          <div 
            className="error-critical flex flex-col items-center justify-center"
            style={{ transform: shakeTransform }}
          >
            {/* Skull emoji */}
            <div
              className="text-8xl animate-spin mb-4"
              style={{
                animationDuration: '0.2s',
                filter: `drop-shadow(0 0 30px ${color})`,
              }}
            >
              💀
            </div>
            
            {/* Critical alert */}
            <div
              className="px-6 py-3 border-4 rounded-lg font-mono text-xl font-bold animate-pulse"
              style={{
                borderColor: color,
                color: '#ffffff',
                backgroundColor: color,
                textShadow: '0 0 10px #000000',
                boxShadow: `0 0 30px ${color}`,
              }}
            >
              CRITICAL ERROR
            </div>
            
            {/* Danger symbols */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={i}
                  className="absolute text-3xl animate-ping"
                  style={{
                    color,
                    left: `${15 + (i % 4) * 20}%`,
                    top: `${15 + Math.floor(i / 4) * 70}%`,
                    animationDelay: `${i * 0.1}s`,
                    textShadow: `0 0 15px ${color}`,
                  }}
                >
                  ⚡
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'cyber':
        return (
          <div 
            className="error-cyber flex flex-col items-center justify-center"
            style={{ transform: shakeTransform }}
          >
            {/* Cyber error symbol */}
            <div className="relative mb-4">
              <div
                className="text-8xl font-mono animate-pulse"
                style={{
                  color,
                  textShadow: `0 0 30px ${color}`,
                  filter: `drop-shadow(0 0 25px ${color})`,
                }}
              >
                ⟨✗⟩
              </div>
              
              {/* Glitch effect */}
              {shakeCount % 10 < 3 && (
                <div
                  className="absolute inset-0 font-mono text-8xl opacity-70"
                  style={{
                    color: '#ff00ff',
                    transform: 'translateX(3px)',
                    clipPath: 'polygon(0 0, 100% 0, 100% 40%, 0 40%)',
                  }}
                >
                  ⟨✗⟩
                </div>
              )}
              
              {shakeCount % 10 < 3 && (
                <div
                  className="absolute inset-0 font-mono text-8xl opacity-70"
                  style={{
                    color: '#00ffff',
                    transform: 'translateX(-3px)',
                    clipPath: 'polygon(0 60%, 100% 60%, 100% 100%, 0 100%)',
                  }}
                >
                  ⟨✗⟩
                </div>
              )}
            </div>
            
            {/* Error code */}
            <div
              className="px-4 py-2 border rounded font-mono text-sm animate-pulse mb-2"
              style={{
                borderColor: color,
                color,
                backgroundColor: `${color}10`,
                textShadow: `0 0 8px ${color}`,
              }}
            >
              [ SYSTEM ERROR 0x{Math.random().toString(16).substr(2, 6).toUpperCase()} ]
            </div>
            
            {/* Binary error stream */}
            <div className="font-mono text-xs opacity-60" style={{ color }}>
              {Array.from({ length: 20 }, () => Math.random() > 0.5 ? '1' : '0').join('')}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`error-buzz-container relative w-full h-full ${className}`}>
      {getErrorAnimation()}
      
      <style jsx>{`
        @keyframes warning-stripes {
          0% { background-position: 0 0; }
          100% { background-position: 20px 0; }
        }
      `}</style>
    </div>
  );
};

interface ErrorNotificationProps {
  message: string;
  isVisible?: boolean;
  onClose?: () => void;
  onRetry?: () => void;
  className?: string;
  severity?: 'error' | 'warning' | 'critical';
  autoClose?: boolean;
  duration?: number;
}

export const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  message,
  isVisible = false,
  onClose,
  onRetry,
  className = '',
  severity = 'error',
  autoClose = false,
  duration = 5000,
}) => {
  const [isShowing, setIsShowing] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsShowing(true);
      setIsShaking(true);
      
      // Stop shaking after 1 second
      const shakeTimeout = setTimeout(() => {
        setIsShaking(false);
      }, 1000);
      
      // Auto close if enabled
      if (autoClose && duration > 0) {
        const closeTimeout = setTimeout(() => {
          setIsShowing(false);
          onClose?.();
        }, duration);
        
        return () => {
          clearTimeout(shakeTimeout);
          clearTimeout(closeTimeout);
        };
      }
      
      return () => clearTimeout(shakeTimeout);
    } else {
      setIsShowing(false);
    }
  }, [isVisible, autoClose, duration, onClose]);

  const getSeverityStyles = () => {
    switch (severity) {
      case 'warning':
        return {
          borderColor: 'border-yellow-500/50',
          bgColor: 'bg-yellow-900/20',
          textColor: 'text-yellow-400',
          iconColor: 'text-yellow-400',
          icon: '⚠️',
        };
      case 'critical':
        return {
          borderColor: 'border-red-600/70',
          bgColor: 'bg-red-900/30',
          textColor: 'text-red-300',
          iconColor: 'text-red-400',
          icon: '🚨',
        };
      default:
        return {
          borderColor: 'border-red-500/50',
          bgColor: 'bg-red-900/20',
          textColor: 'text-red-400',
          iconColor: 'text-red-400',
          icon: '❌',
        };
    }
  };

  if (!isShowing) return null;

  const styles = getSeverityStyles();

  return (
    <div
      className={`fixed top-4 right-4 z-50 max-w-md transition-all duration-300 ${
        isShowing ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      } ${isShaking ? 'animate-pulse' : ''} ${className}`}
      style={{
        transform: isShaking 
          ? `translateX(${Math.sin(Date.now() * 0.05) * 3}px)` 
          : undefined,
      }}
    >
      <div className={`border rounded-lg p-4 shadow-lg backdrop-blur-sm ${styles.borderColor} ${styles.bgColor}`}>
        <div className="flex items-start space-x-3">
          {/* Error icon */}
          <div className={`text-xl ${styles.iconColor} flex-shrink-0`}>
            {styles.icon}
          </div>
          
          {/* Content */}
          <div className="flex-1">
            <div className={`font-semibold text-sm mb-1 ${styles.textColor}`}>
              {severity.charAt(0).toUpperCase() + severity.slice(1)}
            </div>
            <div className="text-white text-sm">
              {message}
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex space-x-2">
            {onRetry && (
              <button
                onClick={onRetry}
                className={`px-2 py-1 text-xs rounded border ${styles.borderColor} ${styles.textColor} hover:bg-opacity-20 transition-colors`}
              >
                Retry
              </button>
            )}
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
        </div>
        
        {/* Progress bar for auto-close */}
        {autoClose && duration > 0 && (
          <div className="mt-3 h-1 bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all ease-linear ${
                severity === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
              }`}
              style={{
                width: '100%',
                animation: `error-progress ${duration}ms linear`,
              }}
            />
          </div>
        )}
      </div>
      
      <style jsx>{`
        @keyframes error-progress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

interface ValidationErrorProps {
  errors: string[];
  className?: string;
  showIcons?: boolean;
  animated?: boolean;
}

export const ValidationError: React.FC<ValidationErrorProps> = ({
  errors,
  className = '',
  showIcons = true,
  animated = true,
}) => {
  const [visibleErrors, setVisibleErrors] = useState<string[]>([]);

  useEffect(() => {
    if (animated) {
      // Show errors one by one
      errors.forEach((error, index) => {
        setTimeout(() => {
          setVisibleErrors(prev => [...prev, error]);
        }, index * 200);
      });
      
      // Reset when errors change
      return () => setVisibleErrors([]);
    } else {
      setVisibleErrors(errors);
    }
  }, [errors, animated]);

  if (errors.length === 0) return null;

  return (
    <div className={`validation-error space-y-2 ${className}`}>
      {visibleErrors.map((error, index) => (
        <div
          key={index}
          className={`flex items-center space-x-2 text-red-400 text-sm ${
            animated ? 'animate-slide-in' : ''
          }`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {showIcons && (
            <div className="text-red-500 animate-pulse">⚠</div>
          )}
          <div>{error}</div>
        </div>
      ))}
      
      <style jsx>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

interface SystemErrorProps {
  errorCode?: string;
  errorMessage?: string;
  isVisible?: boolean;
  onDismiss?: () => void;
  onReboot?: () => void;
  className?: string;
}

export const SystemError: React.FC<SystemErrorProps> = ({
  errorCode = '0xDEADBEEF',
  errorMessage = 'A critical system error has occurred',
  isVisible = false,
  onDismiss,
  onReboot,
  className = '',
}) => {
  const [glitchEffect, setGlitchEffect] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const glitchInterval = setInterval(() => {
        setGlitchEffect(true);
        setTimeout(() => setGlitchEffect(false), 100);
      }, 2000);
      
      return () => clearInterval(glitchInterval);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 ${className}`}>
      <div className={`max-w-md w-full mx-4 ${glitchEffect ? 'animate-pulse' : ''}`}>
        {/* System error terminal */}
        <div className="bg-black border-2 border-red-500 rounded-lg overflow-hidden">
          {/* Terminal header */}
          <div className="bg-red-600 text-white px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-800 rounded-full animate-pulse" />
              <span className="font-mono text-sm">SYSTEM ERROR</span>
            </div>
            <span className="font-mono text-xs">{errorCode}</span>
          </div>
          
          {/* Error content */}
          <div className="p-6 space-y-4">
            {/* Skull icon */}
            <div className="text-center">
              <div 
                className="text-6xl mb-4"
                style={{
                  filter: glitchEffect 
                    ? 'hue-rotate(180deg) saturate(200%)' 
                    : 'drop-shadow(0 0 20px #ff0000)',
                }}
              >
                💀
              </div>
            </div>
            
            {/* Error message */}
            <div className="text-center space-y-2">
              <div className="text-red-400 font-mono text-lg font-bold">
                FATAL ERROR
              </div>
              <div className="text-red-300 font-mono text-sm">
                {errorMessage}
              </div>
            </div>
            
            {/* System info */}
            <div className="bg-red-900/30 border border-red-500/50 rounded p-3 font-mono text-xs text-red-300 space-y-1">
              <div>ERROR CODE: {errorCode}</div>
              <div>TIMESTAMP: {new Date().toISOString()}</div>
              <div>STATUS: SYSTEM COMPROMISED</div>
              <div>RECOMMENDED ACTION: IMMEDIATE REBOOT</div>
            </div>
            
            {/* Binary dump */}
            <div className="font-mono text-xs text-red-500 opacity-60 text-center">
              {Array.from({ length: 40 }, () => Math.random() > 0.5 ? '1' : '0').join('')}
            </div>
            
            {/* Action buttons */}
            <div className="flex space-x-3">
              {onReboot && (
                <button
                  onClick={onReboot}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded font-mono text-sm transition-colors"
                >
                  REBOOT SYSTEM
                </button>
              )}
              {onDismiss && (
                <button
                  onClick={onDismiss}
                  className="flex-1 border border-red-500 text-red-400 hover:bg-red-500/20 py-2 px-4 rounded font-mono text-sm transition-colors"
                >
                  DISMISS
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Scan lines effect */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,0,0,0.1) 2px, rgba(255,0,0,0.1) 4px)',
            animation: 'scan-lines 2s linear infinite',
          }}
        />
      </div>
      
      <style jsx>{`
        @keyframes scan-lines {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
};