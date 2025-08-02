'use client';

import React, { useState, useEffect } from 'react';

interface ASCIIPatternProps {
  className?: string;
  color?: string;
  pattern?: 'circuit' | 'binary' | 'wave' | 'maze' | 'neural' | 'crypto';
  width?: number;
  height?: number;
  animated?: boolean;
}

export const ASCIIPattern: React.FC<ASCIIPatternProps> = ({
  className = '',
  color = '#00ffff',
  pattern = 'circuit',
  width = 60,
  height = 20,
  animated = true,
}) => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (!animated) return;

    const interval = setInterval(() => {
      setFrame(prev => prev + 1);
    }, 200);

    return () => clearInterval(interval);
  }, [animated]);

  const generateCircuitPattern = (width: number, height: number, frame: number) => {
    const pattern = [];
    const chars = ['─', '│', '┌', '┐', '└', '┘', '├', '┤', '┬', '┴', '┼'];
    
    for (let y = 0; y < height; y++) {
      let line = '';
      for (let x = 0; x < width; x++) {
        const seed = (x + y * width + frame * 0.1) % chars.length;
        const charIndex = Math.floor(seed);
        const char = chars[charIndex];
        
        // Add some randomness for animation
        if (animated && Math.random() < 0.1) {
          line += chars[Math.floor(Math.random() * chars.length)];
        } else {
          line += char;
        }
      }
      pattern.push(line);
    }
    
    return pattern.join('\n');
  };

  const generateBinaryPattern = (width: number, height: number, frame: number) => {
    const pattern = [];
    
    for (let y = 0; y < height; y++) {
      let line = '';
      for (let x = 0; x < width; x++) {
        const seed = (x * 7 + y * 13 + frame * 0.5) % 2;
        line += seed > 0.5 ? '1' : '0';
        if (x % 8 === 7) line += ' '; // Group by bytes
      }
      pattern.push(line);
    }
    
    return pattern.join('\n');
  };

  const generateWavePattern = (width: number, height: number, frame: number) => {
    const pattern = [];
    const chars = ['~', '∼', '≈', '◊', '◈', '◇'];
    
    for (let y = 0; y < height; y++) {
      let line = '';
      for (let x = 0; x < width; x++) {
        const waveValue = Math.sin((x * 0.3) + (frame * 0.1)) + Math.cos((y * 0.2) + (frame * 0.05));
        const charIndex = Math.floor((waveValue + 2) / 4 * chars.length) % chars.length;
        line += chars[charIndex];
      }
      pattern.push(line);
    }
    
    return pattern.join('\n');
  };

  const generateMazePattern = (width: number, height: number, frame: number) => {
    const pattern = [];
    const chars = ['█', '▓', '▒', '░', ' '];
    
    for (let y = 0; y < height; y++) {
      let line = '';
      for (let x = 0; x < width; x++) {
        const noise = Math.sin(x * 0.5) * Math.cos(y * 0.5) + Math.sin(frame * 0.02);
        const charIndex = Math.floor((noise + 2) / 4 * chars.length) % chars.length;
        line += chars[charIndex];
      }
      pattern.push(line);
    }
    
    return pattern.join('\n');
  };

  const generateNeuralPattern = (width: number, height: number, frame: number) => {
    const pattern = [];
    const chars = ['●', '○', '◉', '◯', '⬡', '⬢', '⬟', '⬠'];
    
    for (let y = 0; y < height; y++) {
      let line = '';
      for (let x = 0; x < width; x++) {
        const distance = Math.sqrt((x - width/2) ** 2 + (y - height/2) ** 2);
        const pulse = Math.sin(distance * 0.5 - frame * 0.1);
        const charIndex = Math.floor((pulse + 1) / 2 * chars.length) % chars.length;
        
        if (Math.random() < 0.8) {
          line += chars[charIndex];
        } else {
          line += ' ';
        }
      }
      pattern.push(line);
    }
    
    return pattern.join('\n');
  };

  const generateCryptoPattern = (width: number, height: number, frame: number) => {
    const pattern = [];
    const cryptoChars = ['₿', 'Ξ', '₳', 'Ð', '₮', 'Ł', 'Ħ', '₪', '₲', '₱'];
    const bgChars = ['▓', '▒', '░', ' '];
    
    for (let y = 0; y < height; y++) {
      let line = '';
      for (let x = 0; x < width; x++) {
        const isCrypto = (x + y + frame) % 15 === 0;
        
        if (isCrypto) {
          const cryptoIndex = Math.floor(Math.random() * cryptoChars.length);
          line += cryptoChars[cryptoIndex];
        } else {
          const bgIndex = Math.floor(((x * y + frame) % 40) / 10);
          line += bgChars[Math.min(bgIndex, bgChars.length - 1)];
        }
      }
      pattern.push(line);
    }
    
    return pattern.join('\n');
  };

  const getPattern = () => {
    switch (pattern) {
      case 'circuit':
        return generateCircuitPattern(width, height, frame);
      case 'binary':
        return generateBinaryPattern(width, height, frame);
      case 'wave':
        return generateWavePattern(width, height, frame);
      case 'maze':
        return generateMazePattern(width, height, frame);
      case 'neural':
        return generateNeuralPattern(width, height, frame);
      case 'crypto':
        return generateCryptoPattern(width, height, frame);
      default:
        return generateCircuitPattern(width, height, frame);
    }
  };

  return (
    <div className={`ascii-pattern ${className}`}>
      <pre
        className="font-mono text-xs leading-tight whitespace-pre overflow-hidden"
        style={{
          color,
          textShadow: `0 0 5px ${color}`,
          opacity: 0.6,
        }}
      >
        {getPattern()}
      </pre>
    </div>
  );
};

interface ScrollingPatternProps {
  className?: string;
  color?: string;
  text?: string;
  direction?: 'left' | 'right' | 'up' | 'down';
  speed?: number;
}

export const ScrollingPattern: React.FC<ScrollingPatternProps> = ({
  className = '',
  color = '#00ff00',
  text = '>>> RIOPORTO P2P TRADING PLATFORM <<< CRYPTO NATIVE INTERFACE <<< BLOCKCHAIN REVOLUTION <<<',
  direction = 'left',
  speed = 100,
}) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset(prev => {
        const increment = direction === 'left' || direction === 'up' ? 1 : -1;
        return (prev + increment) % text.length;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [text.length, direction, speed]);

  const getScrolledText = () => {
    if (direction === 'left' || direction === 'right') {
      return text.slice(offset) + ' ' + text.slice(0, offset);
    }
    return text;
  };

  return (
    <div className={`scrolling-pattern ${className}`}>
      <pre
        className="font-mono text-sm leading-tight whitespace-pre overflow-hidden"
        style={{
          color,
          textShadow: `0 0 10px ${color}`,
        }}
      >
        {getScrolledText()}
      </pre>
    </div>
  );
};

interface PulsingPatternProps {
  className?: string;
  colors?: string[];
  pattern?: string;
  pulseSpeed?: number;
}

export const PulsingPattern: React.FC<PulsingPatternProps> = ({
  className = '',
  colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'],
  pattern = `
    ◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆
    ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
    ◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆
    ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
    ◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆
  `,
  pulseSpeed = 500,
}) => {
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex(prev => (prev + 1) % colors.length);
    }, pulseSpeed);

    return () => clearInterval(interval);
  }, [colors.length, pulseSpeed]);

  return (
    <div className={`pulsing-pattern ${className}`}>
      <pre
        className="font-mono text-sm leading-tight whitespace-pre transition-all duration-500"
        style={{
          color: colors[colorIndex],
          textShadow: `0 0 15px ${colors[colorIndex]}`,
        }}
      >
        {pattern}
      </pre>
    </div>
  );
};

interface GeometricPatternProps {
  className?: string;
  color?: string;
  size?: number;
  complexity?: number;
}

export const GeometricPattern: React.FC<GeometricPatternProps> = ({
  className = '',
  color = '#00ffff',
  size = 20,
  complexity = 3,
}) => {
  const generateGeometricPattern = () => {
    const pattern = [];
    const chars = ['◢', '◣', '◤', '◥', '◆', '◇', '◉', '○'];
    
    for (let y = 0; y < size; y++) {
      let line = '';
      for (let x = 0; x < size; x++) {
        const distance = Math.sqrt((x - size/2) ** 2 + (y - size/2) ** 2);
        const angle = Math.atan2(y - size/2, x - size/2);
        
        const patternValue = Math.sin(distance * complexity) * Math.cos(angle * complexity);
        const charIndex = Math.floor((patternValue + 1) / 2 * chars.length) % chars.length;
        
        line += chars[charIndex];
      }
      pattern.push(line);
    }
    
    return pattern.join('\n');
  };

  return (
    <div className={`geometric-pattern ${className}`}>
      <pre
        className="font-mono text-sm leading-tight whitespace-pre"
        style={{
          color,
          textShadow: `0 0 10px ${color}`,
        }}
      >
        {generateGeometricPattern()}
      </pre>
    </div>
  );
};

interface DataFlowPatternProps {
  className?: string;
  color?: string;
  width?: number;
  height?: number;
  flowSpeed?: number;
}

export const DataFlowPattern: React.FC<DataFlowPatternProps> = ({
  className = '',
  color = '#00ff00',
  width = 40,
  height = 10,
  flowSpeed = 150,
}) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset(prev => (prev + 1) % width);
    }, flowSpeed);

    return () => clearInterval(interval);
  }, [width, flowSpeed]);

  const generateDataFlow = () => {
    const pattern = [];
    const data = ['01', '10', '11', '00', 'FF', 'A0', 'B1', 'C2', 'D3', 'E4'];
    
    for (let y = 0; y < height; y++) {
      let line = '';
      for (let x = 0; x < width; x++) {
        const flowPosition = (x + offset + y * 2) % data.length;
        const char = data[flowPosition];
        
        // Create flow effect
        const intensity = Math.sin((x + offset) * 0.5) * 0.5 + 0.5;
        if (intensity > 0.5) {
          line += char;
        } else {
          line += '··';
        }
        
        line += ' ';
      }
      pattern.push(line);
    }
    
    return pattern.join('\n');
  };

  return (
    <div className={`data-flow-pattern ${className}`}>
      <pre
        className="font-mono text-xs leading-tight whitespace-pre"
        style={{
          color,
          textShadow: `0 0 8px ${color}`,
        }}
      >
        {generateDataFlow()}
      </pre>
    </div>
  );
};