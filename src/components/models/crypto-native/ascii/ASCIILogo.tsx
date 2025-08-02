'use client';

import React, { useState, useEffect } from 'react';

interface ASCIILogoProps {
  className?: string;
  color?: string;
  animated?: boolean;
  variant?: 'rioporto' | 'bitcoin' | 'crypto' | 'cyber';
}

export const ASCIILogo: React.FC<ASCIILogoProps> = ({
  className = '',
  color = '#00ffff',
  animated = true,
  variant = 'rioporto',
}) => {
  const [currentFrame, setCurrentFrame] = useState(0);

  const logoVariants = {
    rioporto: [
      `
██████╗ ██╗ ██████╗ ██████╗  ██████╗ ██████╗ ████████╗ ██████╗ 
██╔══██╗██║██╔═══██╗██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔═══██╗
██████╔╝██║██║   ██║██████╔╝██║   ██║██████╔╝   ██║   ██║   ██║
██╔══██╗██║██║   ██║██╔═══╝ ██║   ██║██╔══██╗   ██║   ██║   ██║
██║  ██║██║╚██████╔╝██║     ╚██████╔╝██║  ██║   ██║   ╚██████╔╝
╚═╝  ╚═╝╚═╝ ╚═════╝ ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝    ╚═════╝ 
      `,
      `
██████╗ ██╗ ██████╗ ██████╗  ██████╗ ██████╗ ████████╗ ██████╗ 
██╔══██╗██║██╔═══██╗██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔═══██╗
██████╔╝██║██║   ██║██████╔╝██║   ██║██████╔╝   ██║   ██║   ██║
██╔══██╗██║██║   ██║██╔═══╝ ██║   ██║██╔══██╗   ██║   ██║   ██║
██║  ██║██║╚██████╔╝██║     ╚██████╔╝██║  ██║   ██║   ╚██████╔╝
╚═╝  ╚═╝╚═╝ ╚═════╝ ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝    ╚═════╝ 
                            P2P TRADING PLATFORM
      `,
    ],
    bitcoin: [
      `
      ╭───────────────────────────╮
      │         ₿ BITCOIN ₿       │
      │                           │
      │    ██████████████████     │
      │  ██                  ██   │
      │ ██   ████████████████  ██ │
      │██   ██                 ██│
      │██  ██   ████████████████ │
      │██  ██   ██               │
      │██  ██   ████████████████ │
      │██   ██                ██ │
      │ ██   ████████████████  ██ │
      │  ██                  ██   │
      │    ██████████████████     │
      │                           │
      ╰───────────────────────────╯
      `,
      `
      ╭───────────────────────────╮
      │         ₿ BITCOIN ₿       │
      │          ◆ DIGITAL ◆      │
      │    ██████████████████     │
      │  ██                  ██   │
      │ ██   ████████████████  ██ │
      │██   ██                 ██│
      │██  ██   █████████████  ██│
      │██  ██   ██             ██│
      │██  ██   █████████████  ██│
      │██   ██                ██ │
      │ ██   ████████████████  ██ │
      │  ██                  ██   │
      │    ██████████████████     │
      │         ◆ CURRENCY ◆      │
      ╰───────────────────────────╯
      `,
    ],
    crypto: [
      `
  ╔══════════════════════════════════════╗
  ║              ⟦ CRYPTO ⟧              ║
  ║                                      ║
  ║  ██████   ██████   ██  ██  ████████  ║
  ║ ██        ██   ██   ████   ██    ██  ║
  ║ ██        ██████     ██    ████████  ║
  ║ ██        ██   ██    ██    ██        ║
  ║  ██████   ██   ██    ██    ██        ║
  ║                                      ║
  ║            ⟦ REVOLUTION ⟧            ║
  ╚══════════════════════════════════════╝
      `,
      `
  ╔══════════════════════════════════════╗
  ║              ⟦ CRYPTO ⟧              ║
  ║                                      ║
  ║  ██████   ██████   ██  ██  ████████  ║
  ║ ██        ██   ██   ████   ██    ██  ║
  ║ ██  ████  ██████     ██    ████████  ║
  ║ ██    ██  ██   ██    ██    ██        ║
  ║  ██████   ██   ██    ██    ██        ║
  ║                                      ║
  ║         ⟦ DECENTRALIZED ⟧            ║
  ╚══════════════════════════════════════╝
      `,
    ],
    cyber: [
      `
   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
   ▓                                 ▓
   ▓    ██████  ██    ██ ██████      ▓
   ▓    ██       ██  ██  ██   ██     ▓
   ▓    ██        ████   ██████      ▓
   ▓    ██         ██    ██   ██     ▓
   ▓    ██████     ██    ██████      ▓
   ▓                                 ▓
   ▓     [ CYBER INTERFACE v2.1 ]    ▓
   ▓                                 ▓
   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
      `,
      `
   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
   ▓ >>> SYSTEM INITIALIZING...     ▓
   ▓    ██████  ██    ██ ██████      ▓
   ▓    ██       ██  ██  ██   ██     ▓
   ▓    ██  ████  ████   ██████      ▓
   ▓    ██    ██   ██    ██   ██     ▓
   ▓    ██████     ██    ██████      ▓
   ▓                                 ▓
   ▓     [ NEURAL NET ACTIVE ]       ▓
   ▓ >>> CONNECTION ESTABLISHED     ▓
   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
      `,
    ],
  };

  useEffect(() => {
    if (!animated) return;

    const interval = setInterval(() => {
      setCurrentFrame(prev => (prev + 1) % logoVariants[variant].length);
    }, 2000);

    return () => clearInterval(interval);
  }, [animated, variant]);

  return (
    <div className={`ascii-logo ${className}`}>
      <pre
        className="font-mono text-sm leading-tight whitespace-pre"
        style={{
          color,
          textShadow: `0 0 10px ${color}`,
          filter: `drop-shadow(0 0 5px ${color})`,
        }}
      >
        {logoVariants[variant][animated ? currentFrame : 0]}
      </pre>
    </div>
  );
};

interface TypewriterASCIIProps {
  text: string;
  className?: string;
  color?: string;
  speed?: number;
  onComplete?: () => void;
}

export const TypewriterASCII: React.FC<TypewriterASCIIProps> = ({
  text,
  className = '',
  color = '#00ff00',
  speed = 50,
  onComplete,
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  return (
    <div className={`typewriter-ascii ${className}`}>
      <pre
        className="font-mono text-sm leading-tight whitespace-pre"
        style={{
          color,
          textShadow: `0 0 10px ${color}`,
        }}
      >
        {displayText}
        {currentIndex < text.length && (
          <span className="animate-pulse">▋</span>
        )}
      </pre>
    </div>
  );
};

interface GlitchASCIIProps {
  text: string;
  className?: string;
  colors?: string[];
  intensity?: number;
}

export const GlitchASCII: React.FC<GlitchASCIIProps> = ({
  text,
  className = '',
  colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00'],
  intensity = 1,
}) => {
  const [glitchText, setGlitchText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      
      // Create glitched version
      const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      const lines = text.split('\n');
      const glitched = lines.map(line => {
        return line.split('').map(char => {
          if (Math.random() < 0.1 * intensity && char !== ' ') {
            return chars[Math.floor(Math.random() * chars.length)];
          }
          return char;
        }).join('');
      }).join('\n');
      
      setGlitchText(glitched);
      
      setTimeout(() => {
        setGlitchText(text);
        setIsGlitching(false);
      }, 100);
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, [text, intensity]);

  return (
    <div className={`glitch-ascii relative ${className}`}>
      <pre
        className="font-mono text-sm leading-tight whitespace-pre"
        style={{
          color: colors[0],
          textShadow: isGlitching ? `0 0 10px ${colors[0]}` : 'none',
        }}
      >
        {glitchText}
      </pre>
      
      {isGlitching && (
        <>
          <pre
            className="absolute inset-0 font-mono text-sm leading-tight whitespace-pre opacity-80"
            style={{
              color: colors[1],
              transform: 'translateX(2px)',
              clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
            }}
          >
            {glitchText}
          </pre>
          <pre
            className="absolute inset-0 font-mono text-sm leading-tight whitespace-pre opacity-80"
            style={{
              color: colors[2],
              transform: 'translateX(-2px)',
              clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
            }}
          >
            {glitchText}
          </pre>
        </>
      )}
    </div>
  );
};

interface MatrixASCIIProps {
  width?: number;
  height?: number;
  className?: string;
  characters?: string;
  color?: string;
}

export const MatrixASCII: React.FC<MatrixASCIIProps> = ({
  width = 80,
  height = 20,
  className = '',
  characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン',
  color = '#00ff00',
}) => {
  const [matrix, setMatrix] = useState<string[][]>([]);

  useEffect(() => {
    // Initialize matrix
    const initMatrix = () => {
      const newMatrix = Array(height).fill(null).map(() => 
        Array(width).fill(' ')
      );
      setMatrix(newMatrix);
    };

    initMatrix();
  }, [width, height]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMatrix(prevMatrix => {
        const newMatrix = prevMatrix.map(row => [...row]);
        
        // Shift all characters down
        for (let col = 0; col < width; col++) {
          for (let row = height - 1; row > 0; row--) {
            newMatrix[row][col] = newMatrix[row - 1][col];
          }
          
          // Add new character at top with probability
          if (Math.random() < 0.1) {
            newMatrix[0][col] = characters[Math.floor(Math.random() * characters.length)];
          } else {
            newMatrix[0][col] = ' ';
          }
        }
        
        return newMatrix;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [width, height, characters]);

  return (
    <div className={`matrix-ascii ${className}`}>
      <pre
        className="font-mono text-xs leading-tight whitespace-pre"
        style={{
          color,
          textShadow: `0 0 5px ${color}`,
          letterSpacing: '2px',
        }}
      >
        {matrix.map((row, i) => row.join('') + '\n').join('')}
      </pre>
    </div>
  );
};