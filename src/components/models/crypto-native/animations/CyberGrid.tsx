'use client';

import React, { useEffect, useState, useRef } from 'react';

interface CyberGridProps {
  className?: string;
  cellSize?: number;
  color?: string;
  animated?: boolean;
  opacity?: number;
}

export const CyberGrid: React.FC<CyberGridProps> = ({
  className = '',
  cellSize = 20,
  color = '#00ffff',
  animated = true,
  opacity = 0.3,
}) => {
  return (
    <div className={`cyber-grid absolute inset-0 ${className}`}>
      <div
        className={`w-full h-full ${animated ? 'animate-grid-pulse' : ''}`}
        style={{
          backgroundImage: `
            linear-gradient(${color} 1px, transparent 1px),
            linear-gradient(90deg, ${color} 1px, transparent 1px)
          `,
          backgroundSize: `${cellSize}px ${cellSize}px`,
          opacity,
        }}
      />
      
      {animated && (
        <style jsx>{`
          @keyframes grid-pulse {
            0%, 100% {
              opacity: ${opacity * 0.5};
            }
            50% {
              opacity: ${opacity};
            }
          }
          
          .animate-grid-pulse {
            animation: grid-pulse 3s ease-in-out infinite;
          }
        `}</style>
      )}
    </div>
  );
};

interface NeonGridProps {
  className?: string;
  rows?: number;
  cols?: number;
  glowIntensity?: number;
}

export const NeonGrid: React.FC<NeonGridProps> = ({
  className = '',
  rows = 10,
  cols = 10,
  glowIntensity = 1,
}) => {
  const [activeCell, setActiveCell] = useState<{ row: number; col: number } | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCell({
        row: Math.floor(Math.random() * rows),
        col: Math.floor(Math.random() * cols),
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [rows, cols]);

  return (
    <div className={`neon-grid ${className}`}>
      <div 
        className="grid gap-1"
        style={{
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
        }}
      >
        {Array.from({ length: rows * cols }, (_, i) => {
          const row = Math.floor(i / cols);
          const col = i % cols;
          const isActive = activeCell?.row === row && activeCell?.col === col;
          
          return (
            <div
              key={i}
              className={`border border-cyan-500/30 transition-all duration-500 ${
                isActive ? 'border-cyan-400 bg-cyan-400/10' : ''
              }`}
              style={{
                minHeight: '20px',
                filter: isActive 
                  ? `drop-shadow(0 0 ${10 * glowIntensity}px rgba(0,255,255,0.8))` 
                  : 'none',
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

interface HexagonalGridProps {
  className?: string;
  size?: number;
  spacing?: number;
}

export const HexagonalGrid: React.FC<HexagonalGridProps> = ({
  className = '',
  size = 30,
  spacing = 5,
}) => {
  const [hoveredHex, setHoveredHex] = useState<number | null>(null);

  const hexagons = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: (i % 8) * (size + spacing) + ((Math.floor(i / 8) % 2) * (size / 2)),
    y: Math.floor(i / 8) * (size * 0.75),
  }));

  const createHexagonPath = (size: number) => {
    const points = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      const x = size * Math.cos(angle);
      const y = size * Math.sin(angle);
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  };

  return (
    <div className={`hexagonal-grid absolute inset-0 ${className}`}>
      <svg className="w-full h-full">
        {hexagons.map((hex) => (
          <polygon
            key={hex.id}
            points={createHexagonPath(size / 2)}
            transform={`translate(${hex.x + size/2}, ${hex.y + size/2})`}
            fill="none"
            stroke="#00ffff"
            strokeWidth="1"
            opacity={hoveredHex === hex.id ? 0.8 : 0.3}
            className={`transition-all duration-300 ${
              hoveredHex === hex.id ? 'animate-pulse' : ''
            }`}
            style={{
              filter: hoveredHex === hex.id 
                ? 'drop-shadow(0 0 10px rgba(0,255,255,0.8))' 
                : 'none',
            }}
            onMouseEnter={() => setHoveredHex(hex.id)}
            onMouseLeave={() => setHoveredHex(null)}
          />
        ))}
      </svg>
    </div>
  );
};

interface MatrixGridProps {
  className?: string;
  cellSize?: number;
  speed?: number;
}

export const MatrixGrid: React.FC<MatrixGridProps> = ({
  className = '',
  cellSize = 25,
  speed = 100,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current) {
        const parent = canvasRef.current.parentElement;
        if (parent) {
          setDimensions({
            width: parent.clientWidth,
            height: parent.clientHeight,
          });
        }
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !dimensions.width || !dimensions.height) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const columns = Math.floor(dimensions.width / cellSize);
    const drops: number[] = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      ctx.fillStyle = '#00ff00';
      ctx.font = `${cellSize - 5}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * cellSize, drops[i] * cellSize);

        if (drops[i] * cellSize > dimensions.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, speed);
    return () => clearInterval(interval);
  }, [dimensions, cellSize, speed]);

  return (
    <div className={`matrix-grid absolute inset-0 ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: 'rgba(0, 0, 0, 0.9)' }}
      />
    </div>
  );
};

interface InteractiveGridProps {
  className?: string;
  gridSize?: number;
  maxConnections?: number;
}

export const InteractiveGrid: React.FC<InteractiveGridProps> = ({
  className = '',
  gridSize = 15,
  maxConnections = 3,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [nodes] = useState(() => 
    Array.from({ length: gridSize * gridSize }, (_, i) => ({
      id: i,
      x: (i % gridSize) * (100 / gridSize),
      y: Math.floor(i / gridSize) * (100 / gridSize),
      active: false,
    }))
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const getDistance = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  };

  return (
    <div 
      className={`interactive-grid absolute inset-0 ${className}`}
      onMouseMove={handleMouseMove}
    >
      <svg className="w-full h-full">
        {/* Draw connections to mouse */}
        {nodes
          .filter(node => getDistance(node.x, node.y, mousePos.x, mousePos.y) < 20)
          .slice(0, maxConnections)
          .map(node => (
            <line
              key={`mouse-${node.id}`}
              x1={`${mousePos.x}%`}
              y1={`${mousePos.y}%`}
              x2={`${node.x}%`}
              y2={`${node.y}%`}
              stroke="#00ffff"
              strokeWidth="1"
              opacity="0.6"
              className="animate-pulse"
            />
          ))}
        
        {/* Draw node connections */}
        {nodes.map(node => 
          nodes
            .filter(otherNode => 
              otherNode.id > node.id && 
              getDistance(node.x, node.y, otherNode.x, otherNode.y) < 15
            )
            .map(connectedNode => (
              <line
                key={`${node.id}-${connectedNode.id}`}
                x1={`${node.x}%`}
                y1={`${node.y}%`}
                x2={`${connectedNode.x}%`}
                y2={`${connectedNode.y}%`}
                stroke="#00ffff"
                strokeWidth="0.5"
                opacity="0.2"
              />
            ))
        )}
        
        {/* Draw nodes */}
        {nodes.map(node => {
          const distanceToMouse = getDistance(node.x, node.y, mousePos.x, mousePos.y);
          const isNearMouse = distanceToMouse < 20;
          
          return (
            <circle
              key={node.id}
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r={isNearMouse ? "3" : "1.5"}
              fill="#00ffff"
              opacity={isNearMouse ? 1 : 0.4}
              className={isNearMouse ? 'animate-pulse' : ''}
              style={{
                filter: isNearMouse ? 'drop-shadow(0 0 6px #00ffff)' : 'none',
                transition: 'all 0.3s ease',
              }}
            />
          );
        })}
      </svg>
    </div>
  );
};