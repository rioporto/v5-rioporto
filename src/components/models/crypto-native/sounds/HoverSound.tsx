'use client';

import React, { useState } from 'react';

interface HoverSoundProps {
  children: React.ReactNode;
  className?: string;
  soundType?: 'beep' | 'click' | 'whoosh' | 'digital' | 'cyber';
  visualFeedback?: boolean;
  disabled?: boolean;
}

export const HoverSound: React.FC<HoverSoundProps> = ({
  children,
  className = '',
  soundType = 'beep',
  visualFeedback = true,
  disabled = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Sound effect hints (visual only since we can't actually play audio)
  const getSoundVisualization = () => {
    if (!visualFeedback || !isHovered) return null;

    switch (soundType) {
      case 'beep':
        return (
          <div className="absolute top-0 right-0 text-xs text-cyan-400 animate-pulse">
            ♪ beep
          </div>
        );
      case 'click':
        return (
          <div className="absolute top-0 right-0 text-xs text-green-400 animate-pulse">
            ♫ click
          </div>
        );
      case 'whoosh':
        return (
          <div className="absolute top-0 right-0 text-xs text-purple-400 animate-pulse">
            ♬ whoosh
          </div>
        );
      case 'digital':
        return (
          <div className="absolute top-0 right-0 text-xs text-blue-400 animate-pulse">
            ♪ digital
          </div>
        );
      case 'cyber':
        return (
          <div className="absolute top-0 right-0 text-xs text-pink-400 animate-pulse">
            ♫ cyber
          </div>
        );
      default:
        return null;
    }
  };

  const handleMouseEnter = () => {
    if (disabled) return;
    setIsHovered(true);
    
    // Here would be the actual sound playing logic
    // For now, we'll just provide visual feedback
    console.log(`🔊 Playing hover sound: ${soundType}`);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`hover-sound relative ${className} ${
        isHovered && !disabled ? 'transform scale-105' : ''
      } transition-transform duration-200`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {getSoundVisualization()}
    </div>
  );
};

interface SoundWaveVisualizerProps {
  isActive?: boolean;
  className?: string;
  color?: string;
  bars?: number;
}

export const SoundWaveVisualizer: React.FC<SoundWaveVisualizerProps> = ({
  isActive = false,
  className = '',
  color = '#00ffff',
  bars = 5,
}) => {
  return (
    <div className={`sound-wave-visualizer flex items-end space-x-1 ${className}`}>
      {Array.from({ length: bars }, (_, i) => (
        <div
          key={i}
          className={`w-1 bg-current transition-all duration-200 ${
            isActive ? 'animate-pulse' : ''
          }`}
          style={{
            height: isActive 
              ? `${Math.random() * 20 + 10}px` 
              : '4px',
            color,
            boxShadow: isActive ? `0 0 10px ${color}` : 'none',
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
};

interface AudioLevelMeterProps {
  level?: number;
  className?: string;
  color?: string;
  orientation?: 'horizontal' | 'vertical';
}

export const AudioLevelMeter: React.FC<AudioLevelMeterProps> = ({
  level = 0,
  className = '',
  color = '#00ff00',
  orientation = 'horizontal',
}) => {
  const segments = 20;
  const activeSegments = Math.floor((level / 100) * segments);

  return (
    <div className={`audio-level-meter ${className}`}>
      <div className={`flex ${orientation === 'vertical' ? 'flex-col-reverse' : 'flex-row'} gap-1`}>
        {Array.from({ length: segments }, (_, i) => {
          const isActive = i < activeSegments;
          const intensity = i / segments;
          const segmentColor = intensity > 0.8 ? '#ff0000' : intensity > 0.6 ? '#ffff00' : color;
          
          return (
            <div
              key={i}
              className={`${orientation === 'vertical' ? 'w-4 h-1' : 'w-1 h-4'} transition-all duration-100`}
              style={{
                backgroundColor: isActive ? segmentColor : '#333333',
                boxShadow: isActive ? `0 0 5px ${segmentColor}` : 'none',
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

interface FrequencyVisualizerProps {
  isActive?: boolean;
  className?: string;
  color?: string;
  bands?: number;
}

export const FrequencyVisualizer: React.FC<FrequencyVisualizerProps> = ({
  isActive = false,
  className = '',
  color = '#ff00ff',
  bands = 16,
}) => {
  const [frequencies, setFrequencies] = React.useState<number[]>(
    Array.from({ length: bands }, () => 0)
  );

  React.useEffect(() => {
    if (!isActive) {
      setFrequencies(Array.from({ length: bands }, () => 0));
      return;
    }

    const interval = setInterval(() => {
      setFrequencies(prev => 
        prev.map(() => Math.random() * 100)
      );
    }, 100);

    return () => clearInterval(interval);
  }, [isActive, bands]);

  return (
    <div className={`frequency-visualizer flex items-end justify-center space-x-1 ${className}`}>
      {frequencies.map((freq, i) => (
        <div
          key={i}
          className="w-2 transition-all duration-100"
          style={{
            height: `${freq}px`,
            backgroundColor: color,
            boxShadow: `0 0 5px ${color}`,
            opacity: isActive ? 1 : 0.3,
          }}
        />
      ))}
    </div>
  );
};

interface SoundControlsProps {
  volume?: number;
  onVolumeChange?: (volume: number) => void;
  muted?: boolean;
  onMuteToggle?: () => void;
  className?: string;
  color?: string;
}

export const SoundControls: React.FC<SoundControlsProps> = ({
  volume = 50,
  onVolumeChange,
  muted = false,
  onMuteToggle,
  className = '',
  color = '#00ffff',
}) => {
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    onVolumeChange?.(newVolume);
  };

  const getVolumeIcon = () => {
    if (muted) return '🔇';
    if (volume === 0) return '🔈';
    if (volume < 50) return '🔉';
    return '🔊';
  };

  return (
    <div className={`sound-controls flex items-center space-x-4 ${className}`}>
      {/* Mute button */}
      <button
        onClick={onMuteToggle}
        className="p-2 rounded transition-all duration-200 hover:scale-110"
        style={{
          color,
          textShadow: `0 0 10px ${color}`,
        }}
      >
        {getVolumeIcon()}
      </button>

      {/* Volume slider */}
      <div className="flex items-center space-x-2">
        <span className="text-xs font-mono" style={{ color }}>
          0
        </span>
        <input
          type="range"
          min="0"
          max="100"
          value={muted ? 0 : volume}
          onChange={handleVolumeChange}
          disabled={muted}
          className="w-20 h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, ${color} 0%, ${color} ${volume}%, #374151 ${volume}%, #374151 100%)`,
          }}
        />
        <span className="text-xs font-mono" style={{ color }}>
          100
        </span>
      </div>

      {/* Volume level display */}
      <div className="font-mono text-sm" style={{ color }}>
        {muted ? 'MUTED' : `${volume}%`}
      </div>

      {/* Visual level indicator */}
      <AudioLevelMeter 
        level={muted ? 0 : volume} 
        color={color} 
        className="w-16"
      />
    </div>
  );
};

interface CyberSoundPanelProps {
  className?: string;
  color?: string;
  soundEnabled?: boolean;
  onSoundToggle?: (enabled: boolean) => void;
}

export const CyberSoundPanel: React.FC<CyberSoundPanelProps> = ({
  className = '',
  color = '#00ffff',
  soundEnabled = true,
  onSoundToggle,
}) => {
  const [activeChannel, setActiveChannel] = useState(0);
  const [levels, setLevels] = useState([30, 60, 45, 80]);

  React.useEffect(() => {
    if (!soundEnabled) return;

    const interval = setInterval(() => {
      setLevels(prev => prev.map(() => Math.random() * 100));
      setActiveChannel(prev => (prev + 1) % 4);
    }, 500);

    return () => clearInterval(interval);
  }, [soundEnabled]);

  return (
    <div className={`cyber-sound-panel bg-black border rounded-lg p-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div 
            className="w-3 h-3 rounded-full animate-pulse"
            style={{ 
              backgroundColor: soundEnabled ? '#00ff00' : '#ff0000',
              boxShadow: `0 0 10px ${soundEnabled ? '#00ff00' : '#ff0000'}`,
            }}
          />
          <span className="font-mono text-sm" style={{ color }}>
            AUDIO SYSTEM
          </span>
        </div>
        
        <button
          onClick={() => onSoundToggle?.(!soundEnabled)}
          className="px-3 py-1 border rounded font-mono text-xs transition-all duration-200"
          style={{
            borderColor: color,
            color,
            backgroundColor: soundEnabled ? `${color}20` : 'transparent',
          }}
        >
          {soundEnabled ? 'ENABLED' : 'DISABLED'}
        </button>
      </div>

      {/* Channel levels */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {levels.map((level, i) => (
          <div key={i} className="text-center">
            <div className="text-xs font-mono mb-1" style={{ color }}>
              CH{i + 1}
            </div>
            <AudioLevelMeter
              level={soundEnabled ? level : 0}
              color={i === activeChannel ? '#ffff00' : color}
              orientation="vertical"
              className="h-16 mx-auto"
            />
            <div className="text-xs font-mono mt-1" style={{ color }}>
              {soundEnabled ? Math.floor(level) : 0}
            </div>
          </div>
        ))}
      </div>

      {/* Frequency display */}
      <div className="mb-4">
        <div className="text-xs font-mono mb-2" style={{ color }}>
          FREQUENCY SPECTRUM
        </div>
        <FrequencyVisualizer
          isActive={soundEnabled}
          color={color}
          className="h-12"
        />
      </div>

      {/* Status display */}
      <div className="font-mono text-xs space-y-1">
        <div style={{ color }}>
          STATUS: {soundEnabled ? 'ACTIVE' : 'STANDBY'}
        </div>
        <div style={{ color }}>
          SAMPLE RATE: 48.0 kHz
        </div>
        <div style={{ color }}>
          BIT DEPTH: 24-bit
        </div>
        <div style={{ color }}>
          LATENCY: {soundEnabled ? '2.3ms' : 'N/A'}
        </div>
      </div>
    </div>
  );
};