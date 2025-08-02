'use client';

import React, { useEffect, useRef, useState } from 'react';

interface MatrixRainProps {
  className?: string;
  characters?: string;
  fontSize?: number;
  speed?: number;
  density?: number;
  color?: string;
  glowEffect?: boolean;
}

export const MatrixRain: React.FC<MatrixRainProps> = ({
  className = '',
  characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン',
  fontSize = 14,
  speed = 50,
  density = 0.8,
  color = '#00ff00',
  glowEffect = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const dropsRef = useRef<number[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      // Initialize drops array
      const columns = Math.floor(canvas.width / fontSize);
      dropsRef.current = Array(columns).fill(1);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const animate = () => {
      // Semi-transparent black background for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = color;
      ctx.font = `${fontSize}px monospace`;
      
      if (glowEffect) {
        ctx.shadowColor = color;
        ctx.shadowBlur = 5;
      }

      // Draw characters
      dropsRef.current.forEach((y, x) => {
        const char = characters[Math.floor(Math.random() * characters.length)];
        const posX = x * fontSize;
        const posY = y * fontSize;
        
        ctx.fillText(char, posX, posY);

        // Reset drop randomly or when it reaches bottom
        if (posY > canvas.height && Math.random() > 1 - density) {
          dropsRef.current[x] = 0;
        }
        
        dropsRef.current[x]++;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    const interval = setInterval(animate, speed);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      clearInterval(interval);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [characters, fontSize, speed, density, color, glowEffect]);

  return (
    <canvas
      ref={canvasRef}
      className={`matrix-rain w-full h-full ${className}`}
      style={{ backgroundColor: '#000000' }}
    />
  );
};

interface CyberRainProps {
  className?: string;
  variant?: 'binary' | 'hex' | 'crypto';
  speed?: number;
  color?: string;
}

export const CyberRain: React.FC<CyberRainProps> = ({
  className = '',
  variant = 'binary',
  speed = 100,
  color = '#00ffff',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drops = useRef<Array<{ x: number; y: number; char: string; opacity: number }>>([]);

  const getCharacterSet = () => {
    switch (variant) {
      case 'binary':
        return '01';
      case 'hex':
        return '0123456789ABCDEF';
      case 'crypto':
        return '₿ΞÐŦŁĦ₪₲₱₹₽₡₦₴₸₼₲₯';
      default:
        return '01';
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const characters = getCharacterSet();
    const fontSize = 16;

    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const animate = () => {
      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add new drops randomly
      if (Math.random() > 0.95) {
        drops.current.push({
          x: Math.random() * canvas.width,
          y: 0,
          char: characters[Math.floor(Math.random() * characters.length)],
          opacity: 1,
        });
      }

      // Update and draw drops
      drops.current.forEach((drop, index) => {
        ctx.save();
        ctx.globalAlpha = drop.opacity;
        ctx.fillStyle = color;
        ctx.font = `${fontSize}px monospace`;
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        
        ctx.fillText(drop.char, drop.x, drop.y);
        ctx.restore();

        // Update drop position
        drop.y += 2;
        drop.opacity -= 0.002;

        // Remove drops that are off screen or too faded
        if (drop.y > canvas.height || drop.opacity <= 0) {
          drops.current.splice(index, 1);
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [variant, color]);

  return (
    <canvas
      ref={canvasRef}
      className={`cyber-rain w-full h-full ${className}`}
      style={{ backgroundColor: '#000000' }}
    />
  );
};

interface HackerTerminalProps {
  className?: string;
  lines?: string[];
  typingSpeed?: number;
  glitchEffect?: boolean;
}

export const HackerTerminal: React.FC<HackerTerminalProps> = ({
  className = '',
  lines = [
    '> Initializing quantum encryption...',
    '> Connecting to blockchain network...',
    '> Decrypting wallet signatures...',
    '> Analyzing market patterns...',
    '> Trading algorithm activated...',
  ],
  typingSpeed = 50,
  glitchEffect = true,
}) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [displayText, setDisplayText] = useState<string[]>([]);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    if (currentLine >= lines.length) return;

    const line = lines[currentLine];
    if (currentChar < line.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => {
          const newText = [...prev];
          if (!newText[currentLine]) newText[currentLine] = '';
          newText[currentLine] += line[currentChar];
          return newText;
        });
        setCurrentChar(prev => prev + 1);
      }, typingSpeed);

      return () => clearTimeout(timer);
    } else {
      // Line completed, move to next line
      const timer = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
        setCurrentChar(0);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [currentLine, currentChar, lines, typingSpeed]);

  useEffect(() => {
    if (glitchEffect) {
      const glitchInterval = setInterval(() => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 100);
      }, 3000);

      return () => clearInterval(glitchInterval);
    }
  }, [glitchEffect]);

  return (
    <div
      className={`hacker-terminal bg-black border border-green-500/30 rounded-lg p-4 font-mono text-green-400 ${className} ${
        isGlitching ? 'animate-pulse' : ''
      }`}
      style={{
        filter: isGlitching ? 'hue-rotate(180deg) saturate(200%)' : 'none',
        textShadow: '0 0 10px rgba(0, 255, 0, 0.5)',
      }}
    >
      {/* Terminal header */}
      <div className="flex items-center mb-4 pb-2 border-b border-green-500/30">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <div className="w-3 h-3 bg-yellow-500 rounded-full" />
          <div className="w-3 h-3 bg-green-500 rounded-full" />
        </div>
        <div className="ml-4 text-sm">terminal://rioporto.crypto</div>
      </div>

      {/* Terminal content */}
      <div className="space-y-1">
        {displayText.map((line, index) => (
          <div key={index} className="flex items-center">
            <span className="text-cyan-400 mr-2">$</span>
            <span>{line}</span>
            {/* Cursor */}
            {index === currentLine && (
              <span className="ml-1 animate-pulse">▋</span>
            )}
          </div>
        ))}
      </div>

      {/* Scan lines effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
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

interface CodeStreamProps {
  className?: string;
  codeSnippets?: string[];
  language?: 'javascript' | 'python' | 'solidity';
  streamSpeed?: number;
}

export const CodeStream: React.FC<CodeStreamProps> = ({
  className = '',
  codeSnippets = [
    'function trade(amount) {',
    '  const price = getPrice();',
    '  if (price > threshold) {',
    '    execute(amount);',
    '  }',
    '}',
  ],
  language = 'javascript',
  streamSpeed = 2000,
}) => {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lineIndex = 0;

    const addLine = () => {
      if (lineIndex < codeSnippets.length) {
        setVisibleLines(prev => [...prev, codeSnippets[lineIndex]]);
        lineIndex++;
        
        // Auto-scroll to bottom
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      } else {
        // Reset and start over
        lineIndex = 0;
        setVisibleLines([]);
      }
    };

    const interval = setInterval(addLine, streamSpeed);
    return () => clearInterval(interval);
  }, [codeSnippets, streamSpeed]);

  const getLanguageColor = () => {
    switch (language) {
      case 'javascript':
        return 'text-yellow-400';
      case 'python':
        return 'text-blue-400';
      case 'solidity':
        return 'text-purple-400';
      default:
        return 'text-green-400';
    }
  };

  return (
    <div
      ref={containerRef}
      className={`code-stream bg-gray-900 border border-gray-700 rounded-lg p-4 font-mono text-sm overflow-y-auto max-h-64 ${className}`}
    >
      {visibleLines.map((line, index) => (
        <div
          key={index}
          className={`opacity-0 animate-fade-in ${getLanguageColor()}`}
          style={{
            animationDelay: `${index * 0.1}s`,
            animationFillMode: 'forwards',
          }}
        >
          <span className="text-gray-500 mr-4">{String(index + 1).padStart(2, '0')}</span>
          {line}
        </div>
      ))}
      
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};