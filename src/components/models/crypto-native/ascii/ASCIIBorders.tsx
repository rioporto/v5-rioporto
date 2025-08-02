'use client';

import React from 'react';

interface ASCIIBorderProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  variant?: 'simple' | 'double' | 'rounded' | 'cyber' | 'matrix' | 'neon';
  title?: string;
}

export const ASCIIBorder: React.FC<ASCIIBorderProps> = ({
  children,
  className = '',
  color = '#00ffff',
  variant = 'simple',
  title,
}) => {
  const getBorderChars = (variant: string) => {
    switch (variant) {
      case 'simple':
        return {
          tl: '┌', tr: '┐', bl: '└', br: '┘',
          h: '─', v: '│',
        };
      case 'double':
        return {
          tl: '╔', tr: '╗', bl: '╚', br: '╝',
          h: '═', v: '║',
        };
      case 'rounded':
        return {
          tl: '╭', tr: '╮', bl: '╰', br: '╯',
          h: '─', v: '│',
        };
      case 'cyber':
        return {
          tl: '▛', tr: '▜', bl: '▙', br: '▟',
          h: '▀', v: '▐',
        };
      case 'matrix':
        return {
          tl: '█', tr: '█', bl: '█', br: '█',
          h: '▓', v: '▓',
        };
      case 'neon':
        return {
          tl: '◥', tr: '◤', bl: '◣', br: '◢',
          h: '▬', v: '▌',
        };
      default:
        return {
          tl: '┌', tr: '┐', bl: '└', br: '┘',
          h: '─', v: '│',
        };
    }
  };

  const chars = getBorderChars(variant);
  const contentLines = React.Children.toArray(children).join('').split('\n');
  const maxWidth = Math.max(
    ...(contentLines.map(line => line.length)),
    title ? title.length + 4 : 0
  );
  const width = Math.max(maxWidth + 4, 20);

  const topBorder = chars.tl + chars.h.repeat(width - 2) + chars.tr;
  const bottomBorder = chars.bl + chars.h.repeat(width - 2) + chars.br;
  
  const titleLine = title 
    ? chars.tl + chars.h.repeat(2) + title + chars.h.repeat(width - title.length - 4) + chars.tr
    : null;

  return (
    <div className={`ascii-border ${className}`}>
      <pre
        className="font-mono text-sm leading-tight whitespace-pre"
        style={{
          color,
          textShadow: `0 0 10px ${color}`,
        }}
      >
        {titleLine ? titleLine + '\n' : topBorder + '\n'}
        {contentLines.map((line, index) => {
          const paddedLine = line.padEnd(width - 4);
          return `${chars.v} ${paddedLine} ${chars.v}\n`;
        }).join('')}
        {bottomBorder}
      </pre>
    </div>
  );
};

interface CyberFrameProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  title?: string;
  status?: 'online' | 'offline' | 'error' | 'warning';
}

export const CyberFrame: React.FC<CyberFrameProps> = ({
  children,
  className = '',
  color = '#00ffff',
  title,
  status = 'online',
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return '#00ff00';
      case 'offline': return '#666666';
      case 'error': return '#ff0000';
      case 'warning': return '#ffff00';
      default: return color;
    }
  };

  const getStatusIndicator = (status: string) => {
    switch (status) {
      case 'online': return '●';
      case 'offline': return '○';
      case 'error': return '⚠';
      case 'warning': return '!';
      default: return '●';
    }
  };

  const statusColor = getStatusColor(status);
  const statusIndicator = getStatusIndicator(status);

  return (
    <div className={`cyber-frame ${className}`}>
      <pre
        className="font-mono text-sm leading-tight whitespace-pre"
        style={{
          color,
          textShadow: `0 0 10px ${color}`,
        }}
      >
        {`╔══════════════════════════════════════════════╗\n`}
        {title ? 
          `║ ${title.padEnd(42)} ║\n` + 
          `╠══════════════════════════════════════════════╣\n`
          : ''
        }
        <span style={{ color: statusColor }}>
          {`║ STATUS: ${status.toUpperCase()} ${statusIndicator}`.padEnd(45) + ` ║\n`}
        </span>
        {`╠══════════════════════════════════════════════╣\n`}
      </pre>
      
      <div className="px-4 py-2" style={{ color }}>
        {children}
      </div>
      
      <pre
        className="font-mono text-sm leading-tight whitespace-pre"
        style={{
          color,
          textShadow: `0 0 10px ${color}`,
        }}
      >
        {`╚══════════════════════════════════════════════╝`}
      </pre>
    </div>
  );
};

interface TerminalFrameProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  prompt?: string;
  blinking?: boolean;
}

export const TerminalFrame: React.FC<TerminalFrameProps> = ({
  children,
  className = '',
  color = '#00ff00',
  prompt = 'user@rioporto:~$',
  blinking = true,
}) => {
  return (
    <div className={`terminal-frame bg-black border rounded-lg overflow-hidden ${className}`}>
      {/* Terminal header */}
      <div className="flex items-center justify-between bg-gray-800 px-4 py-2">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="text-sm text-gray-400 font-mono">Terminal - RioPorto Crypto Native</div>
      </div>
      
      {/* Terminal content */}
      <div className="p-4">
        <pre
          className="font-mono text-sm leading-relaxed whitespace-pre"
          style={{
            color,
            textShadow: `0 0 5px ${color}`,
          }}
        >
          <span className="text-cyan-400">{prompt}</span> {children}
          {blinking && <span className="animate-pulse">▋</span>}
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

interface HologramBorderProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  intensity?: number;
}

export const HologramBorder: React.FC<HologramBorderProps> = ({
  children,
  className = '',
  color = '#00aaff',
  intensity = 1,
}) => {
  return (
    <div className={`hologram-border relative ${className}`}>
      {/* Corner markers */}
      <div className="absolute top-0 left-0 w-6 h-6">
        <div 
          className="absolute top-0 left-0 w-full h-0.5" 
          style={{ backgroundColor: color, boxShadow: `0 0 ${5 * intensity}px ${color}` }}
        />
        <div 
          className="absolute top-0 left-0 h-full w-0.5" 
          style={{ backgroundColor: color, boxShadow: `0 0 ${5 * intensity}px ${color}` }}
        />
      </div>
      
      <div className="absolute top-0 right-0 w-6 h-6">
        <div 
          className="absolute top-0 right-0 w-full h-0.5" 
          style={{ backgroundColor: color, boxShadow: `0 0 ${5 * intensity}px ${color}` }}
        />
        <div 
          className="absolute top-0 right-0 h-full w-0.5" 
          style={{ backgroundColor: color, boxShadow: `0 0 ${5 * intensity}px ${color}` }}
        />
      </div>
      
      <div className="absolute bottom-0 left-0 w-6 h-6">
        <div 
          className="absolute bottom-0 left-0 w-full h-0.5" 
          style={{ backgroundColor: color, boxShadow: `0 0 ${5 * intensity}px ${color}` }}
        />
        <div 
          className="absolute bottom-0 left-0 h-full w-0.5" 
          style={{ backgroundColor: color, boxShadow: `0 0 ${5 * intensity}px ${color}` }}
        />
      </div>
      
      <div className="absolute bottom-0 right-0 w-6 h-6">
        <div 
          className="absolute bottom-0 right-0 w-full h-0.5" 
          style={{ backgroundColor: color, boxShadow: `0 0 ${5 * intensity}px ${color}` }}
        />
        <div 
          className="absolute bottom-0 right-0 h-full w-0.5" 
          style={{ backgroundColor: color, boxShadow: `0 0 ${5 * intensity}px ${color}` }}
        />
      </div>
      
      {/* Content */}
      <div className="p-6">
        {children}
      </div>
      
      {/* Hologram scan lines */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${color}20 2px, ${color}20 4px)`,
          animation: 'hologram-scan 3s linear infinite',
        }}
      />
      
      <style jsx>{`
        @keyframes hologram-scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
};

interface DataStreamBorderProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  streamData?: string[];
}

export const DataStreamBorder: React.FC<DataStreamBorderProps> = ({
  children,
  className = '',
  color = '#00ffff',
  streamData = ['0101', '1010', '1100', '0011', '1001', '0110'],
}) => {
  const [currentData, setCurrentData] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentData(prev => (prev + 1) % streamData.length);
    }, 200);

    return () => clearInterval(interval);
  }, [streamData]);

  return (
    <div className={`data-stream-border relative bg-black border rounded-lg overflow-hidden ${className}`}>
      {/* Top data stream */}
      <div 
        className="absolute top-0 left-0 w-full h-0.5 opacity-80"
        style={{ 
          backgroundColor: color,
          boxShadow: `0 0 10px ${color}`,
        }}
      />
      
      <div 
        className="absolute top-1 left-2 text-xs font-mono opacity-60"
        style={{ color }}
      >
        {streamData[currentData]}
      </div>
      
      {/* Right data stream */}
      <div 
        className="absolute top-0 right-0 w-0.5 h-full opacity-80"
        style={{ 
          backgroundColor: color,
          boxShadow: `0 0 10px ${color}`,
        }}
      />
      
      <div 
        className="absolute top-4 right-2 text-xs font-mono opacity-60 transform rotate-90"
        style={{ color }}
      >
        {streamData[(currentData + 1) % streamData.length]}
      </div>
      
      {/* Bottom data stream */}
      <div 
        className="absolute bottom-0 left-0 w-full h-0.5 opacity-80"
        style={{ 
          backgroundColor: color,
          boxShadow: `0 0 10px ${color}`,
        }}
      />
      
      <div 
        className="absolute bottom-1 right-2 text-xs font-mono opacity-60"
        style={{ color }}
      >
        {streamData[(currentData + 2) % streamData.length]}
      </div>
      
      {/* Left data stream */}
      <div 
        className="absolute top-0 left-0 w-0.5 h-full opacity-80"
        style={{ 
          backgroundColor: color,
          boxShadow: `0 0 10px ${color}`,
        }}
      />
      
      <div 
        className="absolute bottom-4 left-2 text-xs font-mono opacity-60 transform -rotate-90"
        style={{ color }}
      >
        {streamData[(currentData + 3) % streamData.length]}
      </div>
      
      {/* Content */}
      <div className="p-6 relative z-10">
        {children}
      </div>
    </div>
  );
};