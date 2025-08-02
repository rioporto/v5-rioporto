'use client';

import { useState, useEffect, useRef } from 'react';

interface DataStreamProps {
  variant?: 'binary' | 'hex' | 'matrix' | 'code' | 'crypto' | 'network';
  direction?: 'horizontal' | 'vertical' | 'diagonal';
  speed?: 'slow' | 'normal' | 'fast' | 'ultra';
  density?: 'low' | 'medium' | 'high' | 'extreme';
  color?: 'green' | 'cyan' | 'purple' | 'red' | 'blue' | 'rainbow';
  animated?: boolean;
  reverse?: boolean;
  className?: string;
  height?: string;
  width?: string;
}

export function DataStream({
  variant = 'binary',
  direction = 'vertical',
  speed = 'normal',
  density = 'medium',
  color = 'green',
  animated = true,
  reverse = false,
  className = '',
  height = '100%',
  width = '100%'
}: DataStreamProps) {
  const [streamData, setStreamData] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const characters = {
    binary: ['0', '1'],
    hex: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'],
    matrix: ['ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク', 'ケ', 'コ', 'サ', 'シ', 'ス', 'セ', 'ソ', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    code: ['{', '}', '(', ')', '[', ']', ';', ':', '=', '+', '-', '*', '/', '<', '>', '?', '!', '@', '#', '$', '%', '^', '&'],
    crypto: ['₿', 'Ξ', '◊', '⟠', '⧫', '●', '○', '◈', '◇', '⬡', '⬢', '⬣', 'Ð', 'Ł', '₽', '¥', '$', '€'],
    network: ['█', '▓', '▒', '░', '▄', '▀', '▐', '▌', '║', '╫', '╪', '╬', '═', '╦', '╣', '╠', '╩']
  };

  const colorClasses = {
    green: 'text-green-400',
    cyan: 'text-cyan-400',
    purple: 'text-purple-400',
    red: 'text-red-400',
    blue: 'text-blue-400',
    rainbow: 'text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400'
  };

  const speedSettings = {
    slow: 200,
    normal: 100,
    fast: 50,
    ultra: 25
  };

  const densitySettings = {
    low: 5,
    medium: 10,
    high: 20,
    extreme: 40
  };

  useEffect(() => {
    if (!animated) return;

    const chars = characters[variant];
    const interval = setInterval(() => {
      const newData = Array.from({ length: densitySettings[density] }, () => 
        chars[Math.floor(Math.random() * chars.length)]
      );
      
      setStreamData(prev => {
        const updated = [...prev, ...newData];
        return updated.slice(-100); // Keep only last 100 characters
      });
    }, speedSettings[speed]);

    return () => clearInterval(interval);
  }, [variant, speed, density, animated]);

  const getDirectionClass = () => {
    switch (direction) {
      case 'horizontal':
        return reverse ? 'flex-row-reverse' : 'flex-row';
      case 'vertical':
        return reverse ? 'flex-col-reverse' : 'flex-col';
      case 'diagonal':
        return 'transform rotate-45';
      default:
        return 'flex-col';
    }
  };

  const getAnimationClass = () => {
    if (!animated) return '';
    
    const baseAnimation = direction === 'horizontal' ? 'animate-scroll-x' : 'animate-scroll-y';
    
    switch (speed) {
      case 'slow': return `${baseAnimation} animate-duration-4000`;
      case 'normal': return `${baseAnimation} animate-duration-2000`;
      case 'fast': return `${baseAnimation} animate-duration-1000`;
      case 'ultra': return `${baseAnimation} animate-duration-500`;
      default: return baseAnimation;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`
        relative overflow-hidden font-mono text-sm leading-tight
        ${className}
      `}
      style={{ height, width }}
    >
      <div className={`
        flex ${getDirectionClass()} ${getAnimationClass()}
        ${colorClasses[color]}
        opacity-70
      `}>
        {streamData.map((char, index) => (
          <span
            key={index}
            className={`
              inline-block
              ${animated ? 'animate-pulse' : ''}
              ${color === 'rainbow' ? 'animate-gradient-x' : ''}
            `}
            style={{
              animationDelay: `${index * 50}ms`,
              opacity: Math.random() * 0.8 + 0.2
            }}
          >
            {char}
          </span>
        ))}
      </div>

      {/* Fade effects */}
      {direction === 'vertical' && (
        <>
          <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-gray-900 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none" />
        </>
      )}

      {direction === 'horizontal' && (
        <>
          <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-gray-900 to-transparent pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none" />
        </>
      )}
    </div>
  );
}

// Matrix Rain Effect
interface MatrixRainProps {
  columns?: number;
  speed?: DataStreamProps['speed'];
  color?: 'green' | 'cyan' | 'purple';
  className?: string;
}

export function MatrixRain({
  columns = 20,
  speed = 'normal',
  color = 'green',
  className = ''
}: MatrixRainProps) {
  return (
    <div className={`grid gap-2 ${className}`} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {Array.from({ length: columns }).map((_, index) => (
        <DataStream
          key={index}
          variant="matrix"
          direction="vertical"
          speed={speed}
          color={color}
          height="100vh"
          width="20px"
          className="opacity-60"
          style={{ animationDelay: `${index * 200}ms` }}
        />
      ))}
    </div>
  );
}

// Binary Stream Background
interface BinaryStreamBackgroundProps {
  density?: DataStreamProps['density'];
  speed?: DataStreamProps['speed'];
  className?: string;
}

export function BinaryStreamBackground({
  density = 'low',
  speed = 'slow',
  className = ''
}: BinaryStreamBackgroundProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <div className="grid grid-cols-12 h-full">
        {Array.from({ length: 12 }).map((_, index) => (
          <DataStream
            key={index}
            variant="binary"
            direction="vertical"
            speed={speed}
            density={density}
            color="cyan"
            className="opacity-20"
            style={{ animationDelay: `${index * 300}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

// Code Stream Sidebar
interface CodeStreamSidebarProps {
  side?: 'left' | 'right';
  width?: string;
  speed?: DataStreamProps['speed'];
  className?: string;
}

export function CodeStreamSidebar({
  side = 'left',
  width = '60px',
  speed = 'normal',
  className = ''
}: CodeStreamSidebarProps) {
  return (
    <div
      className={`
        fixed top-0 ${side === 'left' ? 'left-0' : 'right-0'} h-full
        bg-gray-900/50 border-${side === 'left' ? 'r' : 'l'} border-cyan-400/30
        ${className}
      `}
      style={{ width }}
    >
      <DataStream
        variant="code"
        direction="vertical"
        speed={speed}
        density="high"
        color="cyan"
        className="p-2"
      />
    </div>
  );
}

// Crypto Data Ticker
interface CryptoDataTickerProps {
  data?: Array<{ symbol: string; price: string; change: string }>;
  speed?: DataStreamProps['speed'];
  className?: string;
}

export function CryptoDataTicker({
  data = [
    { symbol: 'BTC', price: '$43,250', change: '+2.5%' },
    { symbol: 'ETH', price: '$2,680', change: '+1.8%' },
    { symbol: 'ADA', price: '$0.52', change: '-0.3%' },
    { symbol: 'SOL', price: '$98.40', change: '+4.2%' }
  ],
  speed = 'normal',
  className = ''
}: CryptoDataTickerProps) {
  return (
    <div className={`overflow-hidden bg-gray-900/80 border-y border-cyan-400/30 ${className}`}>
      <div className={`
        flex items-center gap-8 whitespace-nowrap
        ${speed === 'slow' ? 'animate-scroll-x animate-duration-30000' :
          speed === 'normal' ? 'animate-scroll-x animate-duration-20000' :
          speed === 'fast' ? 'animate-scroll-x animate-duration-10000' :
          'animate-scroll-x animate-duration-5000'
        }
      `}>
        {Array.from({ length: 3 }).map((_, repeatIndex) => (
          <div key={repeatIndex} className="flex gap-8">
            {data.map((item, index) => (
              <div key={`${repeatIndex}-${index}`} className="flex items-center gap-2 text-sm font-mono">
                <span className="text-cyan-400">{item.symbol}</span>
                <span className="text-white">{item.price}</span>
                <span className={item.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}>
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// Network Activity Visualizer
interface NetworkActivityProps {
  nodes?: number;
  connections?: number;
  speed?: DataStreamProps['speed'];
  className?: string;
}

export function NetworkActivity({
  nodes = 8,
  connections = 12,
  speed = 'normal',
  className = ''
}: NetworkActivityProps) {
  const [activeConnections, setActiveConnections] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newActive = Array.from({ length: Math.floor(Math.random() * connections) + 1 }, 
        () => Math.floor(Math.random() * connections)
      );
      setActiveConnections(newActive);
    }, speedSettings[speed] * 2);

    return () => clearInterval(interval);
  }, [connections, speed]);

  return (
    <div className={`relative p-4 ${className}`}>
      {/* Nodes */}
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: nodes }).map((_, index) => (
          <div
            key={index}
            className={`
              w-4 h-4 rounded-full border-2 border-cyan-400
              ${activeConnections.includes(index) ? 'bg-cyan-400 animate-pulse' : 'bg-transparent'}
            `}
          />
        ))}
      </div>

      {/* Data streams between nodes */}
      <DataStream
        variant="network"
        direction="diagonal"
        speed={speed}
        density="low"
        color="cyan"
        className="absolute inset-0 opacity-30"
      />
    </div>
  );
}