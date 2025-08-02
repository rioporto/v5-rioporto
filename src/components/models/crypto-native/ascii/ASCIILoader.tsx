'use client';

import React, { useState, useEffect } from 'react';

interface ASCIILoaderProps {
  className?: string;
  color?: string;
  variant?: 'spinner' | 'progress' | 'matrix' | 'pulse' | 'wave' | 'crypto';
  size?: 'small' | 'medium' | 'large';
  text?: string;
}

export const ASCIILoader: React.FC<ASCIILoaderProps> = ({
  className = '',
  color = '#00ffff',
  variant = 'spinner',
  size = 'medium',
  text = 'Loading...',
}) => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame(prev => prev + 1);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const getSpinnerFrames = () => {
    const frames = ['|', '/', '─', '\\'];
    return frames[frame % frames.length];
  };

  const getProgressBar = () => {
    const width = size === 'small' ? 20 : size === 'medium' ? 40 : 60;
    const progress = (frame % width) + 1;
    const filled = '█'.repeat(progress);
    const empty = '░'.repeat(width - progress);
    return `[${filled}${empty}] ${Math.floor((progress / width) * 100)}%`;
  };

  const getMatrixLoader = () => {
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const width = size === 'small' ? 10 : size === 'medium' ? 20 : 30;
    const height = size === 'small' ? 3 : size === 'medium' ? 5 : 7;
    
    let matrix = '';
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const charIndex = (x + y * width + frame) % chars.length;
        matrix += chars[charIndex];
      }
      matrix += '\n';
    }
    return matrix;
  };

  const getPulseLoader = () => {
    const pulseChars = ['●', '◉', '○', '◯'];
    const currentChar = pulseChars[frame % pulseChars.length];
    const intensity = Math.sin(frame * 0.3) * 0.5 + 0.5;
    
    return `    ${currentChar}    `;
  };

  const getWaveLoader = () => {
    const width = size === 'small' ? 15 : size === 'medium' ? 25 : 35;
    let wave = '';
    
    for (let i = 0; i < width; i++) {
      const waveHeight = Math.sin((i + frame) * 0.5) * 3 + 3;
      const char = waveHeight > 4 ? '█' : waveHeight > 2 ? '▓' : waveHeight > 1 ? '▒' : '░';
      wave += char;
    }
    
    return wave;
  };

  const getCryptoLoader = () => {
    const cryptoSymbols = ['₿', 'Ξ', '₳', 'Ð', '₮'];
    const currentSymbol = cryptoSymbols[frame % cryptoSymbols.length];
    const rotation = ['◢', '◣', '◤', '◥'];
    const currentRotation = rotation[frame % rotation.length];
    
    return `  ${currentRotation} ${currentSymbol} ${currentRotation}  `;
  };

  const getLoader = () => {
    switch (variant) {
      case 'spinner':
        return getSpinnerFrames();
      case 'progress':
        return getProgressBar();
      case 'matrix':
        return getMatrixLoader();
      case 'pulse':
        return getPulseLoader();
      case 'wave':
        return getWaveLoader();
      case 'crypto':
        return getCryptoLoader();
      default:
        return getSpinnerFrames();
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'text-xs';
      case 'medium':
        return 'text-sm';
      case 'large':
        return 'text-base';
      default:
        return 'text-sm';
    }
  };

  return (
    <div className={`ascii-loader flex flex-col items-center ${className}`}>
      <pre
        className={`font-mono leading-tight whitespace-pre ${getSizeClass()}`}
        style={{
          color,
          textShadow: `0 0 10px ${color}`,
        }}
      >
        {getLoader()}
      </pre>
      {text && (
        <div
          className={`mt-2 ${getSizeClass()}`}
          style={{ color }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

interface CyberProgressProps {
  progress: number;
  className?: string;
  color?: string;
  label?: string;
  showPercentage?: boolean;
}

export const CyberProgress: React.FC<CyberProgressProps> = ({
  progress,
  className = '',
  color = '#00ffff',
  label = 'Progress',
  showPercentage = true,
}) => {
  const width = 50;
  const filledWidth = Math.floor((progress / 100) * width);
  const emptyWidth = width - filledWidth;
  
  const filled = '█'.repeat(filledWidth);
  const empty = '░'.repeat(emptyWidth);

  return (
    <div className={`cyber-progress ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span style={{ color }} className="font-mono text-sm">
          {label}
        </span>
        {showPercentage && (
          <span style={{ color }} className="font-mono text-sm">
            {progress.toFixed(1)}%
          </span>
        )}
      </div>
      
      <pre
        className="font-mono text-sm leading-tight whitespace-pre"
        style={{
          color,
          textShadow: `0 0 8px ${color}`,
        }}
      >
        ╔{'═'.repeat(width + 2)}╗
        ║ {filled}{empty} ║
        ╚{'═'.repeat(width + 2)}╝
      </pre>
    </div>
  );
};

interface HackerLoadingProps {
  steps: string[];
  currentStep?: number;
  className?: string;
  color?: string;
  autoProgress?: boolean;
  stepDelay?: number;
}

export const HackerLoading: React.FC<HackerLoadingProps> = ({
  steps,
  currentStep: controlledStep,
  className = '',
  color = '#00ff00',
  autoProgress = true,
  stepDelay = 2000,
}) => {
  const [internalStep, setInternalStep] = useState(0);
  const [typingText, setTypingText] = useState('');
  const [charIndex, setCharIndex] = useState(0);

  const currentStep = controlledStep !== undefined ? controlledStep : internalStep;
  const currentText = steps[currentStep] || '';

  useEffect(() => {
    if (autoProgress && currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setInternalStep(prev => prev + 1);
        setCharIndex(0);
        setTypingText('');
      }, stepDelay);

      return () => clearTimeout(timer);
    }
  }, [currentStep, steps.length, autoProgress, stepDelay]);

  useEffect(() => {
    if (charIndex < currentText.length) {
      const timer = setTimeout(() => {
        setTypingText(prev => prev + currentText[charIndex]);
        setCharIndex(prev => prev + 1);
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [charIndex, currentText]);

  return (
    <div className={`hacker-loading bg-black border border-green-500/30 rounded-lg p-4 ${className}`}>
      <div className="flex items-center mb-4">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-red-500 rounded-full" />
          <div className="w-2 h-2 bg-yellow-500 rounded-full" />
          <div className="w-2 h-2 bg-green-500 rounded-full" />
        </div>
        <div className="ml-4 text-xs" style={{ color }}>
          terminal://crypto.hack
        </div>
      </div>

      <div className="space-y-2">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center font-mono text-sm">
            <span className="text-cyan-400 mr-2">$</span>
            <span style={{ color }}>
              {index < currentStep 
                ? `${step} ✓` 
                : index === currentStep 
                  ? typingText 
                  : step
              }
            </span>
            {index === currentStep && charIndex < currentText.length && (
              <span className="ml-1 animate-pulse">▋</span>
            )}
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs" style={{ color }}>
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-xs" style={{ color }}>
            {Math.floor(((currentStep + 1) / steps.length) * 100)}%
          </span>
        </div>
        
        <pre
          className="font-mono text-xs leading-tight whitespace-pre"
          style={{
            color,
            textShadow: `0 0 5px ${color}`,
          }}
        >
          {'█'.repeat(Math.floor(((currentStep + 1) / steps.length) * 30))}
          {'░'.repeat(30 - Math.floor(((currentStep + 1) / steps.length) * 30))}
        </pre>
      </div>

      {/* Scan lines effect */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.1) 2px, rgba(0,255,0,0.1) 4px)',
          animation: 'scan-lines 2s linear infinite',
        }}
      />

      <style jsx>{`
        @keyframes scan-lines {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
};

interface DataTransferProps {
  fromLabel?: string;
  toLabel?: string;
  progress?: number;
  speed?: string;
  className?: string;
  color?: string;
}

export const DataTransfer: React.FC<DataTransferProps> = ({
  fromLabel = 'Source',
  toLabel = 'Destination',
  progress = 0,
  speed = '1.2 MB/s',
  className = '',
  color = '#00ffff',
}) => {
  const [packets, setPackets] = useState<Array<{ id: number; position: number }>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPackets(prev => [
        ...prev.map(packet => ({
          ...packet,
          position: packet.position + 2,
        })).filter(packet => packet.position < 50),
        { id: Date.now(), position: 0 },
      ]);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`data-transfer ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <span style={{ color }} className="font-mono text-sm">
          {fromLabel}
        </span>
        <span style={{ color }} className="font-mono text-xs">
          {speed}
        </span>
        <span style={{ color }} className="font-mono text-sm">
          {toLabel}
        </span>
      </div>

      <div className="relative">
        <pre
          className="font-mono text-sm leading-tight whitespace-pre"
          style={{
            color,
            textShadow: `0 0 5px ${color}`,
          }}
        >
          ██{'═'.repeat(46)}██
        </pre>

        {/* Data packets */}
        {packets.map(packet => (
          <div
            key={packet.id}
            className="absolute top-0"
            style={{
              left: `${(packet.position / 46) * 100}%`,
              color,
              textShadow: `0 0 10px ${color}`,
            }}
          >
            <span className="font-mono">◆</span>
          </div>
        ))}
      </div>

      <div className="mt-2">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs" style={{ color }}>
            Transfer Progress
          </span>
          <span className="text-xs" style={{ color }}>
            {progress.toFixed(1)}%
          </span>
        </div>
        
        <pre
          className="font-mono text-xs leading-tight whitespace-pre"
          style={{
            color,
            textShadow: `0 0 5px ${color}`,
          }}
        >
          {'█'.repeat(Math.floor((progress / 100) * 50))}
          {'░'.repeat(50 - Math.floor((progress / 100) * 50))}
        </pre>
      </div>
    </div>
  );
};