'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  speed: number;
  color: string;
  opacity: number;
}

interface StarFieldProps {
  className?: string;
  starCount?: number;
  speed?: number;
  colors?: string[];
  interactive?: boolean;
}

export const StarField: React.FC<StarFieldProps> = ({
  className = '',
  starCount = 200,
  speed = 0.5,
  colors = ['#ffffff', '#00ffff', '#ff00ff', '#ffff00'],
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const initStars = () => {
      const newStars: Star[] = [];
      for (let i = 0; i < starCount; i++) {
        newStars.push({
          x: (Math.random() - 0.5) * 2000,
          y: (Math.random() - 0.5) * 2000,
          z: Math.random() * 1000,
          size: Math.random() * 3 + 1,
          speed: Math.random() * speed + 0.1,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.8 + 0.2,
        });
      }
      setStars(newStars);
    };

    initStars();
  }, [starCount, speed, colors]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      stars.forEach((star, index) => {
        // Move star forward
        star.z -= star.speed;

        // Reset star if it's too close
        if (star.z <= 0) {
          star.x = (Math.random() - 0.5) * 2000;
          star.y = (Math.random() - 0.5) * 2000;
          star.z = 1000;
        }

        // Calculate 2D position
        const x = (star.x / star.z) * 100 + centerX;
        const y = (star.y / star.z) * 100 + centerY;

        // Interactive mouse effect
        if (interactive) {
          const dx = mouseRef.current.x - x;
          const dy = mouseRef.current.y - y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const force = (100 - distance) / 100;
            star.x += dx * force * 0.1;
            star.y += dy * force * 0.1;
          }
        }

        // Calculate star size based on distance
        const size = star.size * (1 - star.z / 1000);
        const opacity = star.opacity * (1 - star.z / 1000);

        // Draw star
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.fillStyle = star.color;
        ctx.shadowColor = star.color;
        ctx.shadowBlur = size * 2;
        
        // Draw star as a cross shape for better visibility
        ctx.fillRect(x - size / 2, y - size / 2, size, size);
        
        // Add twinkle effect
        if (Math.random() > 0.98) {
          ctx.shadowBlur = size * 4;
          ctx.fillRect(x - 1, y - size, 2, size * 2);
          ctx.fillRect(x - size, y - 1, size * 2, 2);
        }
        
        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [stars, interactive]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  return (
    <canvas
      ref={canvasRef}
      className={`star-field w-full h-full ${className}`}
      onMouseMove={handleMouseMove}
      style={{ background: 'radial-gradient(ellipse at center, #0a0a0a 0%, #000000 100%)' }}
    />
  );
};

interface NebulaStarFieldProps {
  className?: string;
  starCount?: number;
  nebulaColors?: string[];
}

export const NebulaStarField: React.FC<NebulaStarFieldProps> = ({
  className = '',
  starCount = 150,
  nebulaColors = ['#ff00ff', '#00ffff', '#ff0080', '#0080ff'],
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stars, setStars] = useState<Star[]>([]);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const initStars = () => {
      const newStars: Star[] = [];
      for (let i = 0; i < starCount; i++) {
        newStars.push({
          x: Math.random() * 1000,
          y: Math.random() * 1000,
          z: Math.random() * 10 + 1,
          size: Math.random() * 4 + 1,
          speed: Math.random() * 0.02 + 0.005,
          color: nebulaColors[Math.floor(Math.random() * nebulaColors.length)],
          opacity: Math.random() * 0.8 + 0.2,
        });
      }
      setStars(newStars);
    };

    initStars();
  }, [starCount, nebulaColors]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const animate = () => {
      // Clear canvas with nebula effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw nebula background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height)
      );
      
      gradient.addColorStop(0, 'rgba(255, 0, 255, 0.05)');
      gradient.addColorStop(0.5, 'rgba(0, 255, 255, 0.02)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        // Floating motion
        const floatX = Math.sin(time * star.speed + star.x * 0.01) * 20;
        const floatY = Math.cos(time * star.speed + star.y * 0.01) * 15;
        
        const x = (star.x + floatX) % canvas.width;
        const y = (star.y + floatY) % canvas.height;

        // Pulsing effect
        const pulse = Math.sin(time * star.speed * 2) * 0.3 + 0.7;
        const size = star.size * pulse;
        const opacity = star.opacity * pulse;

        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.fillStyle = star.color;
        ctx.shadowColor = star.color;
        ctx.shadowBlur = size * 3;
        
        // Draw glowing orb
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      });

      setTime(prevTime => prevTime + 0.02);
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [stars, time]);

  return (
    <canvas
      ref={canvasRef}
      className={`nebula-star-field w-full h-full ${className}`}
      style={{ background: 'radial-gradient(ellipse at center, #0a0015 0%, #000005 100%)' }}
    />
  );
};

interface ConstellationProps {
  className?: string;
  points?: Array<{ x: number; y: number; name?: string }>;
  connectionDistance?: number;
  interactive?: boolean;
}

export const Constellation: React.FC<ConstellationProps> = ({
  className = '',
  points = [],
  connectionDistance = 150,
  interactive = true,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [connections, setConnections] = useState<Array<[number, number]>>([]);

  // Generate random constellation if no points provided
  const [constellationPoints, setConstellationPoints] = useState(points);

  useEffect(() => {
    if (points.length === 0) {
      const randomPoints = Array.from({ length: 12 }, (_, i) => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        name: `Star ${i + 1}`,
      }));
      setConstellationPoints(randomPoints);
    }
  }, [points]);

  useEffect(() => {
    // Calculate connections between nearby points
    const newConnections: Array<[number, number]> = [];
    
    constellationPoints.forEach((point, i) => {
      constellationPoints.forEach((otherPoint, j) => {
        if (i < j) {
          const distance = Math.sqrt(
            Math.pow(point.x - otherPoint.x, 2) + Math.pow(point.y - otherPoint.y, 2)
          );
          
          if (distance < connectionDistance / 5) { // Adjust for percentage-based coordinates
            newConnections.push([i, j]);
          }
        }
      });
    });
    
    setConnections(newConnections);
  }, [constellationPoints, connectionDistance]);

  return (
    <svg
      ref={svgRef}
      className={`constellation w-full h-full ${className}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Connection lines */}
      {connections.map(([i, j], index) => {
        const point1 = constellationPoints[i];
        const point2 = constellationPoints[j];
        const isHighlighted = hoveredPoint === i || hoveredPoint === j;
        
        return (
          <line
            key={index}
            x1={point1.x}
            y1={point1.y}
            x2={point2.x}
            y2={point2.y}
            stroke="#00ffff"
            strokeWidth={isHighlighted ? "0.3" : "0.1"}
            opacity={isHighlighted ? 0.8 : 0.4}
            className="transition-all duration-300"
            style={{
              filter: isHighlighted ? 'drop-shadow(0 0 3px #00ffff)' : 'none',
            }}
          />
        );
      })}
      
      {/* Star points */}
      {constellationPoints.map((point, index) => {
        const isHovered = hoveredPoint === index;
        const connectedToHovered = connections.some(([i, j]) => 
          (hoveredPoint === i && j === index) || (hoveredPoint === j && i === index)
        );
        
        return (
          <g key={index}>
            {/* Glow effect */}
            <circle
              cx={point.x}
              cy={point.y}
              r={isHovered ? "2" : connectedToHovered ? "1.5" : "1"}
              fill="#00ffff"
              opacity={isHovered ? 0.3 : connectedToHovered ? 0.2 : 0.1}
              className="transition-all duration-300"
            />
            
            {/* Main star */}
            <circle
              cx={point.x}
              cy={point.y}
              r={isHovered ? "0.8" : "0.4"}
              fill="#ffffff"
              className={`transition-all duration-300 ${interactive ? 'cursor-pointer' : ''}`}
              style={{
                filter: isHovered ? 'drop-shadow(0 0 3px #00ffff)' : 'drop-shadow(0 0 1px #ffffff)',
              }}
              onMouseEnter={() => interactive && setHoveredPoint(index)}
              onMouseLeave={() => interactive && setHoveredPoint(null)}
            />
            
            {/* Star name */}
            {point.name && isHovered && (
              <text
                x={point.x}
                y={point.y - 3}
                textAnchor="middle"
                fontSize="2"
                fill="#00ffff"
                className="font-mono"
              >
                {point.name}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
};