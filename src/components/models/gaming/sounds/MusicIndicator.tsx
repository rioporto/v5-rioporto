'use client';

import React, { useState, useEffect } from 'react';

interface MusicIndicatorProps {
  isPlaying?: boolean;
  track?: {
    title?: string;
    artist?: string;
    duration?: number;
    currentTime?: number;
  };
  variant?: 'minimal' | 'retro' | 'neon' | 'gaming';
  size?: 'sm' | 'md' | 'lg';
  showProgress?: boolean;
  showControls?: boolean;
  onPlayPause?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  className?: string;
}

export const MusicIndicator: React.FC<MusicIndicatorProps> = ({
  isPlaying = false,
  track = { title: 'Epic Gaming Track', artist: 'RioPorto Music', duration: 180, currentTime: 45 },
  variant = 'gaming',
  size = 'md',
  showProgress = true,
  showControls = false,
  onPlayPause,
  onNext,
  onPrevious,
  className = ''
}) => {
  const [animationFrame, setAnimationFrame] = useState(0);
  const [visualizerData, setVisualizerData] = useState<number[]>([]);

  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  // Generate fake visualizer data
  useEffect(() => {
    if (!isPlaying) {
      setVisualizerData(Array(8).fill(0));
      return;
    }

    const interval = setInterval(() => {
      setAnimationFrame(prev => prev + 1);
      setVisualizerData(prev => 
        prev.map(() => Math.random() * 100)
      );
    }, 150);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Initialize visualizer data
  useEffect(() => {
    setVisualizerData(Array(8).fill(0).map(() => Math.random() * 100));
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = track.duration ? (track.currentTime || 0) / track.duration * 100 : 0;

  const getVariantStyles = () => {
    switch (variant) {
      case 'neon':
        return {
          container: 'bg-black/80 border border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]',
          text: 'text-cyan-400',
          accent: 'text-cyan-300',
          progressBar: 'bg-gradient-to-r from-cyan-500 to-blue-500',
          progressTrack: 'bg-gray-800',
          glow: 'shadow-[0_0_10px_rgba(6,182,212,0.5)]'
        };
      case 'retro':
        return {
          container: 'bg-yellow-100 border-2 border-yellow-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]',
          text: 'text-yellow-800',
          accent: 'text-yellow-600',
          progressBar: 'bg-gradient-to-r from-yellow-400 to-orange-500',
          progressTrack: 'bg-yellow-200',
          glow: ''
        };
      case 'gaming':
        return {
          container: 'bg-gray-900/90 border border-green-400 shadow-[0_0_15px_rgba(34,197,94,0.2)]',
          text: 'text-green-400',
          accent: 'text-green-300',
          progressBar: 'bg-gradient-to-r from-green-500 to-lime-400',
          progressTrack: 'bg-gray-700',
          glow: 'shadow-[0_0_15px_rgba(34,197,94,0.4)]'
        };
      default:
        return {
          container: 'bg-white border border-gray-300 shadow-lg',
          text: 'text-gray-800',
          accent: 'text-gray-600',
          progressBar: 'bg-blue-500',
          progressTrack: 'bg-gray-200',
          glow: ''
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={`
      flex items-center space-x-3 p-3 rounded-lg backdrop-blur-sm
      ${styles.container}
      ${styles.glow}
      ${sizeClasses[size]}
      ${className}
    `}>
      {/* Music Icon/Visualizer */}
      <div className="flex items-center space-x-2">
        {isPlaying ? (
          // Animated visualizer bars
          <div className="flex items-end space-x-1 h-8">
            {visualizerData.map((height, index) => (
              <div
                key={index}
                className={`
                  w-1 bg-current transition-all duration-150 ease-out
                  ${styles.text}
                `}
                style={{
                  height: `${Math.max(20, (height * 0.8) + 20)}%`,
                  opacity: isPlaying ? 0.7 + (height / 100) * 0.3 : 0.3
                }}
              />
            ))}
          </div>
        ) : (
          // Static music note
          <div className={`text-2xl ${styles.text}`}>
            🎵
          </div>
        )}
      </div>

      {/* Track Info */}
      <div className="flex-1 min-w-0">
        <div className={`font-medium truncate ${styles.text}`}>
          {track.title}
        </div>
        <div className={`text-xs truncate ${styles.accent}`}>
          {track.artist}
        </div>
        
        {/* Progress Bar */}
        {showProgress && track.duration && (
          <div className="mt-1">
            <div className={`w-full h-1 rounded-full ${styles.progressTrack}`}>
              <div
                className={`
                  h-full rounded-full transition-all duration-500
                  ${styles.progressBar}
                  ${isPlaying ? styles.glow : ''}
                `}
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className={`flex justify-between text-xs mt-1 ${styles.accent}`}>
              <span>{formatTime(track.currentTime || 0)}</span>
              <span>{formatTime(track.duration)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      {showControls && (
        <div className="flex items-center space-x-2">
          <button
            onClick={onPrevious}
            className={`
              p-1 rounded transition-all duration-200
              ${styles.text} hover:scale-110
              ${variant === 'neon' ? 'hover:text-cyan-300 hover:shadow-[0_0_10px_rgba(6,182,212,0.5)]' : ''}
            `}
            disabled={!onPrevious}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
            </svg>
          </button>
          
          <button
            onClick={onPlayPause}
            className={`
              p-2 rounded-full transition-all duration-200
              ${styles.text} hover:scale-110
              ${variant === 'neon' ? 'hover:text-cyan-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]' : ''}
              ${isPlaying ? 'animate-pulse' : ''}
            `}
          >
            {isPlaying ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="m7 4 10 6L7 16V4z"/>
              </svg>
            )}
          </button>
          
          <button
            onClick={onNext}
            className={`
              p-1 rounded transition-all duration-200
              ${styles.text} hover:scale-110
              ${variant === 'neon' ? 'hover:text-cyan-300 hover:shadow-[0_0_10px_rgba(6,182,212,0.5)]' : ''}
            `}
            disabled={!onNext}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
            </svg>
          </button>
        </div>
      )}

      {/* Status indicator */}
      <div className="flex items-center">
        <div className={`
          w-2 h-2 rounded-full transition-all duration-300
          ${isPlaying ? styles.text + ' animate-pulse' : 'bg-gray-400'}
        `} />
      </div>

      {/* Gaming-specific effects */}
      {variant === 'gaming' && isPlaying && (
        <div className="absolute -top-1 -right-1 flex space-x-1">
          {Array.from({ length: 3 }, (_, i) => (
            <div
              key={i}
              className="w-1 h-1 bg-green-400 rounded-full animate-ping"
              style={{
                animationDelay: `${i * 200}ms`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      )}

      {/* Retro-style blinking indicator */}
      {variant === 'retro' && isPlaying && (
        <div className="absolute -top-2 -right-2">
          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" />
        </div>
      )}
    </div>
  );
};

export default MusicIndicator;