'use client';

import React, { useEffect, useState, useRef } from 'react';

interface MatrixColumn {
  id: number;
  x: number;
  characters: { char: string; opacity: number; isLead: boolean; color: string }[];
  speed: number;
  length: number;
  delay: number;
}

interface MatrixRainGamingProps {
  density?: number;
  speed?: number;
  colors?: string[];
  characters?: string[];
  glitch?: boolean;
  gaming?: boolean;
  className?: string;
}

export const MatrixRainGaming: React.FC<MatrixRainGamingProps> = ({
  density = 50,
  speed = 50,
  colors = ['#00ff41', '#ff0080', '#00ffff', '#ff8000'],
  characters = [],
  glitch = true,
  gaming = true,
  className = ''
}) => {
  const [columns, setColumns] = useState<MatrixColumn[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Gaming-specific characters
  const gamingChars = [
    '⚡', '🎮', '🎯', '⚔️', '🛡️', '💎', '🔥', '⭐', '🚀', '💥',
    '🎪', '🎲', '🎨', '🎵', '🔮', '⚡', '🌟', '💫', '✨', '🔆',
    '▲', '▼', '◆', '●', '■', '♦', '♠', '♥', '♣',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'θ', 'ι', 'κ', 'λ', 'μ', 'ν', 'ξ', 'ο', 'π', 'ρ', 'σ', 'τ', 'υ', 'φ', 'χ', 'ψ', 'ω'
  ];

  const matrixChars = [
    'ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク', 'ケ', 'コ', 'サ', 'シ', 'ス', 'セ', 'ソ',
    'タ', 'チ', 'ツ', 'テ', 'ト', 'ナ', 'ニ', 'ヌ', 'ネ', 'ノ', 'ハ', 'ヒ', 'フ', 'ヘ', 'ホ',
    'マ', 'ミ', 'ム', 'メ', 'モ', 'ヤ', 'ユ', 'ヨ', 'ラ', 'リ', 'ル', 'レ', 'ロ', 'ワ', 'ヲ', 'ン',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
  ];

  const allChars = characters.length > 0 ? characters : 
    gaming ? [...gamingChars, ...matrixChars] : matrixChars;

  const createColumn = (index: number): MatrixColumn => {
    const columnHeight = 20 + Math.random() * 30;
    const chars = Array.from({ length: columnHeight }, (_, i) => ({
      char: allChars[Math.floor(Math.random() * allChars.length)],
      opacity: Math.max(0, 1 - (i / columnHeight)),
      isLead: i === 0,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));

    return {
      id: index,
      x: (index / density) * 100,
      characters: chars,
      speed: 0.5 + Math.random() * speed * 0.02,
      length: columnHeight,
      delay: Math.random() * 5000
    };
  };

  useEffect(() => {
    const newColumns = Array.from({ length: density }, (_, i) => createColumn(i));
    setColumns(newColumns);
  }, [density]);

  useEffect(() => {
    const interval = setInterval(() => {
      setColumns(prevColumns => 
        prevColumns.map(column => {
          // Update characters
          const newChars = column.characters.map((char, index) => {
            let newChar = char.char;
            
            // Random character change
            if (Math.random() < 0.05) {
              newChar = allChars[Math.floor(Math.random() * allChars.length)];
            }
            
            // Glitch effect
            if (glitch && Math.random() < 0.02) {
              newChar = gaming ? '⚡' : 'Ж';
            }

            return {
              ...char,
              char: newChar,
              opacity: Math.max(0, char.opacity - 0.02),
              color: char.isLead ? colors[Math.floor(Math.random() * colors.length)] : char.color
            };
          });

          // Add new character at the top occasionally
          if (Math.random() < column.speed) {
            newChars.unshift({
              char: allChars[Math.floor(Math.random() * allChars.length)],
              opacity: 1,
              isLead: true,
              color: colors[Math.floor(Math.random() * colors.length)]
            });
            
            // Mark previous lead as non-lead
            if (newChars[1]) {
              newChars[1].isLead = false;
            }
          }

          // Remove fully transparent characters
          const filteredChars = newChars.filter(char => char.opacity > 0.01);

          // Reset column if empty
          if (filteredChars.length === 0 && Math.random() < 0.1) {
            return createColumn(column.id);
          }

          return {
            ...column,
            characters: filteredChars.slice(0, 50) // Limit length
          };
        })
      );
    }, 100);

    return () => clearInterval(interval);
  }, [speed, glitch, gaming]);

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ 
        background: gaming ? 
          'radial-gradient(circle at center, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.95) 100%)' :
          'transparent'
      }}
    >
      {columns.map(column => (
        <div
          key={column.id}
          className="absolute top-0 text-sm font-mono select-none"
          style={{
            left: `${column.x}%`,
            fontFamily: gaming ? 'monospace' : 'courier',
            fontSize: gaming ? '14px' : '12px',
          }}
        >
          {column.characters.map((char, index) => (
            <div
              key={`${column.id}-${index}`}
              className="block leading-tight transition-opacity duration-100"
              style={{
                color: char.color,
                opacity: char.opacity,
                textShadow: char.isLead 
                  ? `0 0 10px ${char.color}, 0 0 20px ${char.color}, 0 0 30px ${char.color}`
                  : `0 0 5px ${char.color}`,
                fontSize: char.isLead ? '16px' : '14px',
                fontWeight: char.isLead ? 'bold' : 'normal',
                filter: gaming && char.isLead ? 'brightness(1.5)' : 'none',
                transform: glitch && Math.random() < 0.01 ? 
                  `translate(${Math.random() * 4 - 2}px, ${Math.random() * 2 - 1}px)` : 
                  'none'
              }}
            >
              {char.char}
            </div>
          ))}
        </div>
      ))}
      
      {/* Gaming-specific overlay effects */}
      {gaming && (
        <>
          {/* Scanlines */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.1) 2px, rgba(0,255,65,0.1) 4px)',
            }}
          />
          
          {/* Random glitch blocks */}
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={`glitch-${i}`}
              className="absolute bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-20 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: '2px',
                height: '20px',
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${1 + Math.random() * 2}s`,
              }}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default MatrixRainGaming;