'use client';

import React, { useState, useEffect, useRef } from 'react';

interface VolumeControlProps {
  initialVolume?: number;
  onVolumeChange?: (volume: number) => void;
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'neon' | 'retro' | 'gaming';
  showValue?: boolean;
  showIcon?: boolean;
  mutable?: boolean;
  className?: string;
}

export const VolumeControl: React.FC<VolumeControlProps> = ({
  initialVolume = 70,
  onVolumeChange,
  orientation = 'horizontal',
  size = 'md',
  variant = 'default',
  showValue = true,
  showIcon = true,
  mutable = true,
  className = ''
}) => {
  const [volume, setVolume] = useState(initialVolume);
  const [isMuted, setIsMuted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(initialVolume);
  const sliderRef = useRef<HTMLDivElement>(null);

  const sizeClasses = {
    sm: orientation === 'horizontal' ? 'w-16 h-1' : 'w-1 h-16',
    md: orientation === 'horizontal' ? 'w-24 h-2' : 'w-2 h-24',
    lg: orientation === 'horizontal' ? 'w-32 h-3' : 'w-3 h-32'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  useEffect(() => {
    onVolumeChange?.(isMuted ? 0 : volume);
  }, [volume, isMuted, onVolumeChange]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateVolume(e);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      updateVolume(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  const updateVolume = (e: React.MouseEvent | MouseEvent) => {
    if (!sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    let newVolume: number;
    
    if (orientation === 'horizontal') {
      const x = e.clientX - rect.left;
      newVolume = Math.max(0, Math.min(100, (x / rect.width) * 100));
    } else {
      const y = e.clientY - rect.top;
      newVolume = Math.max(0, Math.min(100, 100 - (y / rect.height) * 100));
    }
    
    setVolume(Math.round(newVolume));
    if (isMuted && newVolume > 0) {
      setIsMuted(false);
    }
  };

  const handleMuteToggle = () => {
    if (mutable) {
      if (isMuted) {
        setIsMuted(false);
        setVolume(previousVolume);
      } else {
        setPreviousVolume(volume);
        setIsMuted(true);
      }
    }
  };

  const getVolumeIcon = () => {
    const currentVolume = isMuted ? 0 : volume;
    
    if (currentVolume === 0) {
      return (
        <svg className={iconSizes[size]} fill="currentColor" viewBox="0 0 24 24">
          <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
        </svg>
      );
    } else if (currentVolume < 50) {
      return (
        <svg className={iconSizes[size]} fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
        </svg>
      );
    } else {
      return (
        <svg className={iconSizes[size]} fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
        </svg>
      );
    }
  };

  const getSliderStyles = () => {
    const currentVolume = isMuted ? 0 : volume;
    
    switch (variant) {
      case 'neon':
        return {
          track: 'bg-gray-800 border border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.3)]',
          fill: 'bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]',
          thumb: 'bg-cyan-400 border-2 border-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.8)]'
        };
      case 'retro':
        return {
          track: 'bg-yellow-200 border-2 border-yellow-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]',
          fill: 'bg-gradient-to-r from-yellow-400 to-orange-500',
          thumb: 'bg-yellow-400 border-2 border-yellow-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]'
        };
      case 'gaming':
        return {
          track: 'bg-gray-900 border border-green-500 shadow-inner',
          fill: `bg-gradient-to-r from-green-500 to-lime-400 ${isDragging ? 'shadow-[0_0_20px_rgba(34,197,94,0.6)]' : ''}`,
          thumb: `bg-green-400 border-2 border-green-300 ${isDragging ? 'shadow-[0_0_25px_rgba(34,197,94,0.8)]' : ''}`
        };
      default:
        return {
          track: 'bg-gray-300',
          fill: 'bg-blue-500',
          thumb: 'bg-white border-2 border-blue-500'
        };
    }
  };

  const styles = getSliderStyles();
  const currentVolume = isMuted ? 0 : volume;
  const fillPercentage = orientation === 'horizontal' ? currentVolume : 100 - currentVolume;

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {showIcon && (
        <button
          onClick={handleMuteToggle}
          className={`
            p-1 rounded transition-all duration-200
            ${variant === 'neon' ? 'text-cyan-400 hover:text-cyan-300 hover:shadow-[0_0_10px_rgba(6,182,212,0.5)]' : ''}
            ${variant === 'retro' ? 'text-yellow-600 hover:text-yellow-500' : ''}
            ${variant === 'gaming' ? 'text-green-400 hover:text-green-300' : ''}
            ${variant === 'default' ? 'text-gray-600 hover:text-gray-800' : ''}
            ${isDragging ? 'scale-110' : 'scale-100'}
          `}
          disabled={!mutable}
        >
          {getVolumeIcon()}
        </button>
      )}

      <div className="relative flex items-center">
        {/* Slider Track */}
        <div
          ref={sliderRef}
          className={`
            relative rounded-full cursor-pointer transition-all duration-200
            ${sizeClasses[size]}
            ${styles.track}
            ${isDragging ? 'scale-105' : 'scale-100'}
          `}
          onMouseDown={handleMouseDown}
        >
          {/* Slider Fill */}
          <div
            className={`
              absolute top-0 left-0 rounded-full transition-all duration-150
              ${orientation === 'horizontal' ? 'h-full' : 'w-full'}
              ${styles.fill}
            `}
            style={{
              [orientation === 'horizontal' ? 'width' : 'height']: `${fillPercentage}%`,
              [orientation === 'vertical' ? 'bottom' : 'left']: orientation === 'vertical' ? '0' : 'auto',
              [orientation === 'vertical' ? 'top' : 'bottom']: orientation === 'vertical' ? 'auto' : '0'
            }}
          />
          
          {/* Slider Thumb */}
          <div
            className={`
              absolute w-4 h-4 rounded-full transition-all duration-150 cursor-grab
              ${isDragging ? 'cursor-grabbing scale-125' : ''}
              ${styles.thumb}
            `}
            style={{
              [orientation === 'horizontal' ? 'left' : 'bottom']: `calc(${fillPercentage}% - 8px)`,
              [orientation === 'horizontal' ? 'top' : 'left']: '50%',
              transform: orientation === 'horizontal' ? 'translateY(-50%)' : 'translateX(-50%)'
            }}
          />
        </div>

        {/* Volume bars animation for gaming variant */}
        {variant === 'gaming' && (
          <div className="ml-2 flex space-x-1">
            {[20, 40, 60, 80].map((threshold, index) => (
              <div
                key={threshold}
                className={`
                  w-1 transition-all duration-200
                  ${currentVolume >= threshold ? 'bg-green-400 h-3' : 'bg-gray-600 h-2'}
                  ${currentVolume >= threshold && isDragging ? 'shadow-[0_0_10px_rgba(34,197,94,0.6)]' : ''}
                `}
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              />
            ))}
          </div>
        )}
      </div>

      {showValue && (
        <span className={`
          text-sm font-mono font-medium min-w-[3ch] text-center select-none
          ${variant === 'neon' ? 'text-cyan-400' : ''}
          ${variant === 'retro' ? 'text-yellow-600' : ''}
          ${variant === 'gaming' ? 'text-green-400' : ''}
          ${variant === 'default' ? 'text-gray-700' : ''}
          ${isDragging ? 'scale-110' : 'scale-100'}
          transition-transform duration-200
        `}>
          {isMuted ? '🔇' : `${Math.round(currentVolume)}`}
        </span>
      )}
    </div>
  );
};

export default VolumeControl;