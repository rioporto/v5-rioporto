'use client';

import React, { useEffect, useState } from 'react';

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  amplitude?: number;
  direction?: 'vertical' | 'horizontal' | 'circular';
}

export const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  className = '',
  speed = 3000,
  amplitude = 20,
  direction = 'vertical',
}) => {
  const getAnimation = () => {
    switch (direction) {
      case 'vertical':
        return `float-vertical ${speed}ms ease-in-out infinite`;
      case 'horizontal':
        return `float-horizontal ${speed}ms ease-in-out infinite`;
      case 'circular':
        return `float-circular ${speed}ms linear infinite`;
      default:
        return `float-vertical ${speed}ms ease-in-out infinite`;
    }
  };

  return (
    <div
      className={`floating-element ${className}`}
      style={{
        animation: getAnimation(),
        '--amplitude': `${amplitude}px`,
      } as React.CSSProperties}
    >
      {children}
      
      <style jsx>{`
        @keyframes float-vertical {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(calc(-1 * var(--amplitude)));
          }
        }
        
        @keyframes float-horizontal {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(var(--amplitude));
          }
        }
        
        @keyframes float-circular {
          0% {
            transform: rotate(0deg) translateX(var(--amplitude)) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(var(--amplitude)) rotate(-360deg);
          }
        }
      `}</style>
    </div>
  );
};

interface CyberOrbProps {
  size?: number;
  color?: string;
  className?: string;
  trail?: boolean;
}

export const CyberOrb: React.FC<CyberOrbProps> = ({
  size = 40,
  color = '#00ffff',
  className = '',
  trail = true,
}) => {
  return (
    <div className={`cyber-orb ${className}`}>
      <div
        className="orb-core relative"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          borderRadius: '50%',
          animation: 'float-glow 4s ease-in-out infinite',
          filter: `drop-shadow(0 0 ${size/4}px ${color})`,
        }}
      >
        {/* Inner glow */}
        <div
          className="absolute inset-2 rounded-full opacity-80"
          style={{
            background: `radial-gradient(circle, ${color} 0%, transparent 50%)`,
            animation: 'inner-pulse 2s ease-in-out infinite',
          }}
        />
        
        {/* Trail effect */}
        {trail && (
          <div
            className="absolute inset-0 rounded-full opacity-30"
            style={{
              background: `linear-gradient(45deg, ${color} 0%, transparent 80%)`,
              animation: 'trail-effect 3s linear infinite',
            }}
          />
        )}
      </div>
      
      <style jsx>{`
        @keyframes float-glow {
          0%, 100% {
            transform: translateY(0) scale(1);
            filter: drop-shadow(0 0 ${size/4}px ${color});
          }
          50% {
            transform: translateY(-20px) scale(1.1);
            filter: drop-shadow(0 0 ${size/2}px ${color});
          }
        }
        
        @keyframes inner-pulse {
          0%, 100% {
            opacity: 0.8;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        
        @keyframes trail-effect {
          0% {
            transform: rotate(0deg);
            opacity: 0.3;
          }
          100% {
            transform: rotate(360deg);
            opacity: 0.1;
          }
        }
      `}</style>
    </div>
  );
};

interface FloatingParticlesProps {
  count?: number;
  className?: string;
  colors?: string[];
}

export const FloatingParticles: React.FC<FloatingParticlesProps> = ({
  count = 20,
  className = '',
  colors = ['#00ffff', '#ff00ff', '#ffff00'],
}) => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    speed: number;
    direction: number;
  }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 2 + 1,
      direction: Math.random() * 360,
    }));
    
    setParticles(newParticles);
  }, [count, colors]);

  return (
    <div className={`floating-particles absolute inset-0 overflow-hidden ${className}`}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full opacity-60"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            animation: `float-particle-${particle.id} ${particle.speed * 10}s linear infinite`,
            filter: `drop-shadow(0 0 ${particle.size}px ${particle.color})`,
          }}
        />
      ))}
      
      <style jsx>{`
        ${particles.map(particle => `
          @keyframes float-particle-${particle.id} {
            0% {
              transform: translate(0, 0) rotate(0deg);
            }
            25% {
              transform: translate(${Math.cos(particle.direction) * 50}px, ${Math.sin(particle.direction) * 50}px) rotate(90deg);
            }
            50% {
              transform: translate(${Math.cos(particle.direction + 180) * 30}px, ${Math.sin(particle.direction + 180) * 30}px) rotate(180deg);
            }
            75% {
              transform: translate(${Math.cos(particle.direction + 270) * 40}px, ${Math.sin(particle.direction + 270) * 40}px) rotate(270deg);
            }
            100% {
              transform: translate(0, 0) rotate(360deg);
            }
          }
        `).join('')}
      `}</style>
    </div>
  );
};

interface QuantumFieldProps {
  className?: string;
  density?: number;
}

export const QuantumField: React.FC<QuantumFieldProps> = ({
  className = '',
  density = 30,
}) => {
  const [nodes, setNodes] = useState<Array<{
    id: number;
    x: number;
    y: number;
    connections: number[];
  }>>([]);

  useEffect(() => {
    const newNodes = Array.from({ length: density }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      connections: [],
    }));

    // Create connections between nearby nodes
    newNodes.forEach((node, i) => {
      newNodes.forEach((otherNode, j) => {
        if (i !== j) {
          const distance = Math.sqrt(
            Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
          );
          if (distance < 20 && node.connections.length < 3) {
            node.connections.push(j);
          }
        }
      });
    });

    setNodes(newNodes);
  }, [density]);

  return (
    <div className={`quantum-field absolute inset-0 ${className}`}>
      <svg className="w-full h-full">
        {/* Connections */}
        {nodes.map((node) =>
          node.connections.map((connectionId) => (
            <line
              key={`${node.id}-${connectionId}`}
              x1={`${node.x}%`}
              y1={`${node.y}%`}
              x2={`${nodes[connectionId].x}%`}
              y2={`${nodes[connectionId].y}%`}
              stroke="#00ffff"
              strokeWidth="1"
              opacity="0.3"
              className="animate-pulse"
            />
          ))
        )}
        
        {/* Nodes */}
        {nodes.map((node) => (
          <circle
            key={node.id}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r="2"
            fill="#00ffff"
            className="animate-pulse"
            style={{
              filter: 'drop-shadow(0 0 4px #00ffff)',
              animationDelay: `${node.id * 0.1}s`,
            }}
          />
        ))}
      </svg>
    </div>
  );
};

interface HoverFloatProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export const HoverFloat: React.FC<HoverFloatProps> = ({
  children,
  className = '',
  intensity = 10,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`hover-float transition-transform duration-300 ${className}`}
      style={{
        transform: isHovered ? `translateY(-${intensity}px)` : 'translateY(0)',
        filter: isHovered ? 'drop-shadow(0 10px 20px rgba(0,255,255,0.3))' : 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  );
};