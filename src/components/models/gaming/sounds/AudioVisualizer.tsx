'use client';

import React, { useState, useEffect, useRef } from 'react';

interface AudioVisualizerProps {
  isPlaying?: boolean;
  type?: 'bars' | 'circular' | 'waveform' | 'spectrum' | 'matrix';
  variant?: 'primary' | 'neon' | 'retro' | 'gaming';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  responsive?: boolean;
  barCount?: number;
  sensitivity?: number;
  className?: string;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  isPlaying = false,
  type = 'bars',
  variant = 'gaming',
  size = 'md',
  color,
  responsive = true,
  barCount = 32,
  sensitivity = 1,
  className = ''
}) => {
  const [audioData, setAudioData] = useState<number[]>([]);
  const [animationFrame, setAnimationFrame] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const sizeClasses = {
    sm: 'w-32 h-16',
    md: 'w-48 h-24',
    lg: 'w-64 h-32',
    xl: 'w-80 h-40'
  };

  const colors = {
    default: color || '#3b82f6',
    neon: color || '#00ffff',
    retro: color || '#ffff00',
    gaming: color || '#00ff41'
  };

  // Generate mock audio data
  useEffect(() => {
    if (!isPlaying) {
      setAudioData(Array(barCount).fill(0));
      return;
    }

    const interval = setInterval(() => {
      setAnimationFrame(prev => prev + 1);
      
      // Generate realistic audio data with some patterns
      const newData = Array(barCount).fill(0).map((_, index) => {
        const baseFreq = Math.sin((animationFrame + index) * 0.1) * 50;
        const randomNoise = Math.random() * 30;
        const beatPattern = Math.sin(animationFrame * 0.2) * 20;
        
        return Math.max(0, Math.min(100, 
          (baseFreq + randomNoise + beatPattern) * sensitivity
        ));
      });
      
      setAudioData(newData);
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying, barCount, sensitivity, animationFrame]);

  // Canvas-based visualizers
  useEffect(() => {
    if (!canvasRef.current || type === 'bars') return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    if (!isPlaying || audioData.length === 0) return;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const currentColor = colors[variant];

    switch (type) {
      case 'circular':
        audioData.forEach((value, index) => {
          const angle = (index / audioData.length) * Math.PI * 2;
          const radius = 20 + (value / 100) * 40;
          
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;
          
          ctx.beginPath();
          ctx.arc(x, y, 2 + (value / 100) * 3, 0, Math.PI * 2);
          ctx.fillStyle = `${currentColor}${Math.floor((value / 100) * 255).toString(16).padStart(2, '0')}`;
          ctx.fill();
          
          if (variant === 'neon') {
            ctx.shadowColor = currentColor;
            ctx.shadowBlur = 10;
          }
        });
        break;

      case 'waveform':
        ctx.beginPath();
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = variant === 'retro' ? 3 : 2;
        
        audioData.forEach((value, index) => {
          const x = (index / audioData.length) * rect.width;
          const y = centerY + (value - 50) * (rect.height / 100);
          
          if (index === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });
        
        ctx.stroke();
        
        if (variant === 'neon') {
          ctx.shadowColor = currentColor;
          ctx.shadowBlur = 15;
          ctx.stroke();
        }
        break;

      case 'spectrum':
        const barWidth = rect.width / audioData.length;
        audioData.forEach((value, index) => {
          const height = (value / 100) * rect.height;
          const x = index * barWidth;
          const y = rect.height - height;
          
          const gradient = ctx.createLinearGradient(0, rect.height, 0, 0);
          gradient.addColorStop(0, currentColor);
          gradient.addColorStop(1, `${currentColor}80`);
          
          ctx.fillStyle = gradient;
          ctx.fillRect(x, y, barWidth - 1, height);
          
          if (variant === 'gaming' && value > 70) {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(x, y, barWidth - 1, 3);
          }
        });
        break;

      case 'matrix':
        // Matrix-style falling bars
        const matrixBarWidth = rect.width / audioData.length;
        audioData.forEach((value, index) => {
          const barHeight = (value / 100) * rect.height;
          const x = index * matrixBarWidth;
          
          // Draw multiple segments for matrix effect
          for (let i = 0; i < barHeight; i += 4) {
            const segmentOpacity = Math.max(0.2, 1 - (i / barHeight));
            ctx.fillStyle = `${currentColor}${Math.floor(segmentOpacity * 255).toString(16).padStart(2, '0')}`;
            ctx.fillRect(x, rect.height - i - 4, matrixBarWidth - 2, 3);
          }
        });
        break;
    }
  }, [audioData, type, variant, isPlaying]);

  const renderBars = () => {
    return (
      <div className="flex items-end justify-center space-x-1 h-full">
        {audioData.map((value, index) => {
          const height = Math.max(4, (value / 100) * 100);
          const opacity = isPlaying ? 0.7 + (value / 100) * 0.3 : 0.3;
          
          let barStyle = {};
          
          switch (variant) {
            case 'neon':
              barStyle = {
                backgroundColor: colors.neon,
                boxShadow: `0 0 ${value / 10}px ${colors.neon}`,
                filter: 'brightness(1.2)'
              };
              break;
            case 'retro':
              barStyle = {
                backgroundColor: colors.retro,
                boxShadow: '2px 2px 0px rgba(0,0,0,0.3)',
                borderRadius: '0px'
              };
              break;
            case 'gaming':
              barStyle = {
                backgroundColor: colors.gaming,
                boxShadow: value > 70 ? `0 0 15px ${colors.gaming}` : 'none',
                borderTop: value > 80 ? '2px solid #ffffff' : 'none'
              };
              break;
            default:
              barStyle = {
                backgroundColor: colors.default
              };
          }
          
          return (
            <div
              key={index}
              className={`
                w-2 transition-all duration-75 ease-out rounded-t-sm
                ${variant === 'retro' ? 'rounded-none' : 'rounded-t-sm'}
              `}
              style={{
                height: `${height}%`,
                opacity,
                ...barStyle,
                animationDelay: `${index * 20}ms`
              }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className={`
      ${responsive ? 'w-full h-full' : sizeClasses[size]}
      ${className}
      relative overflow-hidden
      ${variant === 'neon' ? 'bg-black/20 border border-cyan-400/30 rounded-lg' : ''}
      ${variant === 'retro' ? 'bg-yellow-100/20 border-2 border-yellow-400 rounded-none' : ''}
      ${variant === 'gaming' ? 'bg-gray-900/20 border border-green-400/30 rounded-lg' : ''}
    `}>
      {type === 'bars' ? (
        renderBars()
      ) : (
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ imageRendering: type === 'matrix' ? 'pixelated' : 'auto' }}
        />
      )}
      
      {/* Additional effects */}
      {isPlaying && variant === 'gaming' && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Scanlines */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.1) 2px, rgba(0,255,65,0.1) 4px)',
            }}
          />
          
          {/* Corner indicators */}
          <div className="absolute top-1 left-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <div className="absolute top-1 right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
      )}
      
      {variant === 'neon' && isPlaying && (
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute inset-0 opacity-30 animate-pulse"
            style={{
              background: 'radial-gradient(circle at center, rgba(0,255,255,0.1) 0%, transparent 70%)',
            }}
          />
        </div>
      )}
      
      {variant === 'retro' && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-400 opacity-60" />
      )}
      
      {/* Status indicator */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`
            text-4xl opacity-50
            ${variant === 'neon' ? 'text-cyan-400' : ''}
            ${variant === 'retro' ? 'text-yellow-600' : ''}
            ${variant === 'gaming' ? 'text-green-400' : ''}
            ${variant === 'default' ? 'text-gray-400' : ''}
          `}>
            🎵
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioVisualizer;