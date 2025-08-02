'use client';

import React, { useState, useRef, useCallback } from 'react';

interface ElasticSliderProps {
  min?: number;
  max?: number;
  value?: number;
  onChange?: (value: number) => void;
  className?: string;
  color?: string;
  elasticity?: number;
  variant?: 'cyber' | 'neon' | 'hologram';
}

export const ElasticSlider: React.FC<ElasticSliderProps> = ({
  min = 0,
  max = 100,
  value: controlledValue,
  onChange,
  className = '',
  color = '#00ffff',
  elasticity = 0.8,
  variant = 'cyber',
}) => {
  const [internalValue, setInternalValue] = useState(controlledValue || min);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const getVariantStyles = () => {
    switch (variant) {
      case 'cyber':
        return {
          track: 'bg-gray-800 border-cyan-500/30',
          fill: 'bg-gradient-to-r from-cyan-500 to-blue-500',
          thumb: 'bg-cyan-400 border-cyan-300',
          glow: 'rgba(0, 255, 255, 0.5)',
        };
      case 'neon':
        return {
          track: 'bg-gray-800 border-pink-500/30',
          fill: 'bg-gradient-to-r from-pink-500 to-purple-500',
          thumb: 'bg-pink-400 border-pink-300',
          glow: 'rgba(255, 0, 255, 0.5)',
        };
      case 'hologram':
        return {
          track: 'bg-gray-800 border-blue-500/30',
          fill: 'bg-gradient-to-r from-blue-500 to-indigo-500',
          thumb: 'bg-blue-400 border-blue-300',
          glow: 'rgba(0, 128, 255, 0.5)',
        };
      default:
        return {
          track: 'bg-gray-800 border-cyan-500/30',
          fill: 'bg-gradient-to-r from-cyan-500 to-blue-500',
          thumb: 'bg-cyan-400 border-cyan-300',
          glow: 'rgba(0, 255, 255, 0.5)',
        };
    }
  };

  const styles = getVariantStyles();

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!sliderRef.current || !thumbRef.current) return;
    
    setIsDragging(true);
    const rect = sliderRef.current.getBoundingClientRect();
    const thumbRect = thumbRef.current.getBoundingClientRect();
    const offset = e.clientX - thumbRect.left - thumbRect.width / 2;
    setDragOffset(offset);

    const handleMouseMove = (e: MouseEvent) => {
      if (!sliderRef.current) return;
      
      const rect = sliderRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - offset;
      const percentage = Math.max(0, Math.min(1, x / rect.width));
      const newValue = min + percentage * (max - min);
      
      // Apply elasticity
      const elasticValue = newValue + (newValue - value) * elasticity;
      const clampedValue = Math.max(min, Math.min(max, elasticValue));
      
      if (controlledValue === undefined) {
        setInternalValue(clampedValue);
      }
      onChange?.(clampedValue);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setDragOffset(0);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [min, max, value, onChange, controlledValue, elasticity]);

  const handleTrackClick = useCallback((e: React.MouseEvent) => {
    if (!sliderRef.current || isDragging) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newValue = min + percentage * (max - min);
    
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  }, [min, max, onChange, controlledValue, isDragging]);

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={`elastic-slider ${className}`}>
      {/* Track */}
      <div
        ref={sliderRef}
        className={`relative h-2 rounded-full border cursor-pointer ${styles.track}`}
        onClick={handleTrackClick}
        style={{
          boxShadow: isDragging ? `0 0 20px ${styles.glow}` : 'none',
        }}
      >
        {/* Fill */}
        <div
          className={`absolute top-0 left-0 h-full rounded-full transition-all duration-200 ${styles.fill}`}
          style={{
            width: `${percentage}%`,
            filter: isDragging ? `drop-shadow(0 0 10px ${styles.glow})` : 'none',
          }}
        />
        
        {/* Elastic wave effect */}
        {isDragging && (
          <div
            className="absolute top-0 h-full rounded-full opacity-30"
            style={{
              left: `${Math.max(0, percentage - 10)}%`,
              width: '20%',
              background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
              animation: 'elastic-wave 0.3s ease-out',
            }}
          />
        )}
        
        {/* Thumb */}
        <div
          ref={thumbRef}
          className={`absolute top-1/2 w-6 h-6 rounded-full border-2 cursor-grab transition-all duration-200 ${styles.thumb} ${
            isDragging ? 'cursor-grabbing scale-125' : ''
          }`}
          style={{
            left: `${percentage}%`,
            transform: `translate(-50%, -50%) scale(${isDragging ? 1.25 : 1})`,
            boxShadow: isDragging ? `0 0 20px ${styles.glow}` : `0 0 10px ${styles.glow}40`,
          }}
          onMouseDown={handleMouseDown}
        >
          {/* Inner glow */}
          <div
            className="absolute inset-1 rounded-full opacity-80"
            style={{
              background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
            }}
          />
        </div>
      </div>
      
      {/* Value display */}
      <div className="mt-2 text-center text-sm font-mono" style={{ color }}>
        {Math.round(value)}
      </div>
      
      <style jsx>{`
        @keyframes elastic-wave {
          0% {
            transform: scaleX(1);
            opacity: 0.3;
          }
          50% {
            transform: scaleX(1.5);
            opacity: 0.6;
          }
          100% {
            transform: scaleX(1);
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
};

interface CyberRangeProps {
  min?: number;
  max?: number;
  value?: [number, number];
  onChange?: (value: [number, number]) => void;
  className?: string;
}

export const CyberRange: React.FC<CyberRangeProps> = ({
  min = 0,
  max = 100,
  value: controlledValue,
  onChange,
  className = '',
}) => {
  const [internalValue, setInternalValue] = useState<[number, number]>(controlledValue || [min, max]);
  const [activeThumb, setActiveThumb] = useState<'min' | 'max' | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const [minValue, maxValue] = value;

  const handleMouseDown = useCallback((e: React.MouseEvent, thumb: 'min' | 'max') => {
    if (!sliderRef.current) return;
    
    setActiveThumb(thumb);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!sliderRef.current) return;
      
      const rect = sliderRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, x / rect.width));
      const newValue = min + percentage * (max - min);
      
      let newRange: [number, number];
      if (thumb === 'min') {
        newRange = [Math.min(newValue, maxValue), maxValue];
      } else {
        newRange = [minValue, Math.max(newValue, minValue)];
      }
      
      if (controlledValue === undefined) {
        setInternalValue(newRange);
      }
      onChange?.(newRange);
    };

    const handleMouseUp = () => {
      setActiveThumb(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [min, max, minValue, maxValue, onChange, controlledValue]);

  const minPercentage = ((minValue - min) / (max - min)) * 100;
  const maxPercentage = ((maxValue - min) / (max - min)) * 100;

  return (
    <div className={`cyber-range ${className}`}>
      {/* Track */}
      <div
        ref={sliderRef}
        className="relative h-3 bg-gray-800 rounded-full border border-cyan-500/30"
      >
        {/* Fill */}
        <div
          className="absolute top-0 h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
          style={{
            left: `${minPercentage}%`,
            width: `${maxPercentage - minPercentage}%`,
            filter: activeThumb ? 'drop-shadow(0 0 15px rgba(0, 255, 255, 0.6))' : 'none',
          }}
        />
        
        {/* Min thumb */}
        <div
          className={`absolute top-1/2 w-6 h-6 bg-cyan-400 border-2 border-cyan-300 rounded-full cursor-grab transition-all duration-200 ${
            activeThumb === 'min' ? 'scale-125 cursor-grabbing' : ''
          }`}
          style={{
            left: `${minPercentage}%`,
            transform: `translate(-50%, -50%) scale(${activeThumb === 'min' ? 1.25 : 1})`,
            boxShadow: activeThumb === 'min' 
              ? '0 0 20px rgba(0, 255, 255, 0.8)' 
              : '0 0 10px rgba(0, 255, 255, 0.4)',
          }}
          onMouseDown={(e) => handleMouseDown(e, 'min')}
        />
        
        {/* Max thumb */}
        <div
          className={`absolute top-1/2 w-6 h-6 bg-cyan-400 border-2 border-cyan-300 rounded-full cursor-grab transition-all duration-200 ${
            activeThumb === 'max' ? 'scale-125 cursor-grabbing' : ''
          }`}
          style={{
            left: `${maxPercentage}%`,
            transform: `translate(-50%, -50%) scale(${activeThumb === 'max' ? 1.25 : 1})`,
            boxShadow: activeThumb === 'max' 
              ? '0 0 20px rgba(0, 255, 255, 0.8)' 
              : '0 0 10px rgba(0, 255, 255, 0.4)',
          }}
          onMouseDown={(e) => handleMouseDown(e, 'max')}
        />
      </div>
      
      {/* Value display */}
      <div className="mt-2 flex justify-between text-sm font-mono text-cyan-400">
        <span>{Math.round(minValue)}</span>
        <span>{Math.round(maxValue)}</span>
      </div>
    </div>
  );
};

interface WaveSliderProps {
  min?: number;
  max?: number;
  value?: number;
  onChange?: (value: number) => void;
  className?: string;
  waveAmplitude?: number;
  waveFrequency?: number;
}

export const WaveSlider: React.FC<WaveSliderProps> = ({
  min = 0,
  max = 100,
  value: controlledValue,
  onChange,
  className = '',
  waveAmplitude = 10,
  waveFrequency = 2,
}) => {
  const [internalValue, setInternalValue] = useState(controlledValue || min);
  const [isDragging, setIsDragging] = useState(false);
  const [time, setTime] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  // Animate wave
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => prev + 0.1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    
    setIsDragging(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!sliderRef.current) return;
      
      const rect = sliderRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, x / rect.width));
      const newValue = min + percentage * (max - min);
      
      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [min, max, onChange, controlledValue]);

  const percentage = ((value - min) / (max - min)) * 100;
  
  // Generate wave path
  const generateWavePath = () => {
    const points = [];
    const width = 300; // SVG width
    const height = 40; // SVG height
    
    for (let x = 0; x <= width; x += 2) {
      const progress = x / width;
      const wave = Math.sin(progress * Math.PI * waveFrequency + time) * waveAmplitude;
      const y = height / 2 + wave;
      
      if (x === 0) {
        points.push(`M ${x} ${y}`);
      } else {
        points.push(`L ${x} ${y}`);
      }
    }
    
    return points.join(' ');
  };

  return (
    <div className={`wave-slider ${className}`}>
      <div className="relative">
        {/* Wave visualization */}
        <svg width="300" height="40" className="absolute inset-0">
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00ffff" />
              <stop offset={`${percentage}%`} stopColor="#ff00ff" />
              <stop offset="100%" stopColor="#00ffff" />
            </linearGradient>
          </defs>
          
          <path
            d={generateWavePath()}
            fill="none"
            stroke="url(#wave-gradient)"
            strokeWidth="3"
            className="drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]"
          />
          
          {/* Progress indicator */}
          <circle
            cx={percentage * 3}
            cy="20"
            r={isDragging ? "8" : "6"}
            fill="#ff00ff"
            className="transition-all duration-200"
            style={{
              filter: 'drop-shadow(0 0 15px rgba(255, 0, 255, 0.8))',
            }}
          />
        </svg>
        
        {/* Invisible slider for interaction */}
        <div
          ref={sliderRef}
          className="absolute inset-0 cursor-pointer"
          onMouseDown={handleMouseDown}
        />
      </div>
      
      {/* Value display */}
      <div className="mt-2 text-center text-sm font-mono text-cyan-400">
        {Math.round(value)}
      </div>
    </div>
  );
};