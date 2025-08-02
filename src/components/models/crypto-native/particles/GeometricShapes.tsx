'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Shape {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  size: number;
  type: 'triangle' | 'square' | 'hexagon' | 'diamond' | 'star';
  color: string;
  opacity: number;
}

interface GeometricShapesProps {
  className?: string;
  shapeCount?: number;
  colors?: string[];
  speed?: number;
  interactive?: boolean;
}

export const GeometricShapes: React.FC<GeometricShapesProps> = ({
  className = '',
  shapeCount = 30,
  colors = ['#00ffff', '#ff00ff', '#ffff00', '#ff0080', '#8000ff'],
  speed = 1,
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shapesRef = useRef<Shape[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

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

    const shapeTypes: Shape['type'][] = ['triangle', 'square', 'hexagon', 'diamond', 'star'];

    // Initialize shapes
    const initShapes = () => {
      shapesRef.current = Array.from({ length: shapeCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * speed * 2,
        vy: (Math.random() - 0.5) * speed * 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        size: Math.random() * 30 + 10,
        type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.8 + 0.2,
      }));
    };

    const drawShape = (ctx: CanvasRenderingContext2D, shape: Shape) => {
      ctx.save();
      
      ctx.translate(shape.x, shape.y);
      ctx.rotate(shape.rotation);
      ctx.globalAlpha = shape.opacity;
      ctx.strokeStyle = shape.color;
      ctx.lineWidth = 2;
      ctx.shadowColor = shape.color;
      ctx.shadowBlur = 10;

      const size = shape.size;

      switch (shape.type) {
        case 'triangle':
          ctx.beginPath();
          ctx.moveTo(0, -size / 2);
          ctx.lineTo(-size / 2, size / 2);
          ctx.lineTo(size / 2, size / 2);
          ctx.closePath();
          break;

        case 'square':
          ctx.strokeRect(-size / 2, -size / 2, size, size);
          break;

        case 'hexagon':
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3;
            const x = Math.cos(angle) * size / 2;
            const y = Math.sin(angle) * size / 2;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          break;

        case 'diamond':
          ctx.beginPath();
          ctx.moveTo(0, -size / 2);
          ctx.lineTo(size / 2, 0);
          ctx.lineTo(0, size / 2);
          ctx.lineTo(-size / 2, 0);
          ctx.closePath();
          break;

        case 'star':
          ctx.beginPath();
          for (let i = 0; i < 5; i++) {
            const angle1 = (i * Math.PI * 2) / 5 - Math.PI / 2;
            const angle2 = ((i + 0.5) * Math.PI * 2) / 5 - Math.PI / 2;
            const x1 = Math.cos(angle1) * size / 2;
            const y1 = Math.sin(angle1) * size / 2;
            const x2 = Math.cos(angle2) * size / 4;
            const y2 = Math.sin(angle2) * size / 4;
            
            if (i === 0) ctx.moveTo(x1, y1);
            else ctx.lineTo(x1, y1);
            ctx.lineTo(x2, y2);
          }
          ctx.closePath();
          break;
      }

      ctx.stroke();
      ctx.restore();
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      shapesRef.current.forEach((shape) => {
        // Update position
        shape.x += shape.vx;
        shape.y += shape.vy;
        shape.rotation += shape.rotationSpeed;

        // Interactive mouse effect
        if (interactive) {
          const dx = mouseRef.current.x - shape.x;
          const dy = mouseRef.current.y - shape.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const force = (100 - distance) / 100;
            shape.vx += dx * force * 0.001;
            shape.vy += dy * force * 0.001;
            shape.rotationSpeed += force * 0.01;
            shape.opacity = Math.min(1, shape.opacity + force * 0.01);
          } else {
            shape.opacity = Math.max(0.2, shape.opacity - 0.005);
            shape.rotationSpeed *= 0.99;
          }
        }

        // Boundary bouncing
        if (shape.x < 0 || shape.x > canvas.width) {
          shape.vx *= -0.8;
          shape.x = Math.max(0, Math.min(canvas.width, shape.x));
        }
        if (shape.y < 0 || shape.y > canvas.height) {
          shape.vy *= -0.8;
          shape.y = Math.max(0, Math.min(canvas.height, shape.y));
        }

        // Damping
        shape.vx *= 0.995;
        shape.vy *= 0.995;

        drawShape(ctx, shape);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    initShapes();
    animate();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [shapeCount, colors, speed, interactive]);

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
      className={`geometric-shapes w-full h-full ${className}`}
      onMouseMove={handleMouseMove}
      style={{ backgroundColor: '#000000' }}
    />
  );
};

interface FractalTreeProps {
  className?: string;
  depth?: number;
  angle?: number;
  color?: string;
  animated?: boolean;
}

export const FractalTree: React.FC<FractalTreeProps> = ({
  className = '',
  depth = 10,
  angle = Math.PI / 6,
  color = '#00ffff',
  animated = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [time, setTime] = useState(0);

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

    const drawBranch = (
      x: number,
      y: number,
      length: number,
      angle: number,
      depth: number,
      time: number
    ) => {
      if (depth === 0) return;

      const endX = x + Math.cos(angle) * length;
      const endY = y + Math.sin(angle) * length;

      // Animate branch growth
      const growthFactor = animated ? Math.min(1, (time + depth * 0.5) / 10) : 1;
      const actualEndX = x + (endX - x) * growthFactor;
      const actualEndY = y + (endY - y) * growthFactor;

      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = depth;
      ctx.globalAlpha = depth / 10;
      ctx.shadowColor = color;
      ctx.shadowBlur = depth * 2;

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(actualEndX, actualEndY);
      ctx.stroke();

      ctx.restore();

      if (growthFactor >= 1) {
        // Animate angle variation
        const angleVariation = animated ? Math.sin(time * 0.02 + depth) * 0.2 : 0;
        
        drawBranch(
          actualEndX,
          actualEndY,
          length * 0.8,
          angle - (Math.PI / 6) + angleVariation,
          depth - 1,
          time
        );
        
        drawBranch(
          actualEndX,
          actualEndY,
          length * 0.8,
          angle + (Math.PI / 6) - angleVariation,
          depth - 1,
          time
        );
      }
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const startX = canvas.width / 2;
      const startY = canvas.height - 50;
      const initialLength = Math.min(canvas.width, canvas.height) / 8;

      drawBranch(startX, startY, initialLength, -Math.PI / 2, depth, time);

      if (animated) {
        setTime(prevTime => prevTime + 0.1);
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [depth, angle, color, animated, time]);

  return (
    <canvas
      ref={canvasRef}
      className={`fractal-tree w-full h-full ${className}`}
      style={{ backgroundColor: '#000000' }}
    />
  );
};

interface SacredGeometryProps {
  className?: string;
  pattern?: 'flower-of-life' | 'metatron' | 'sri-yantra';
  size?: number;
  color?: string;
  animated?: boolean;
}

export const SacredGeometry: React.FC<SacredGeometryProps> = ({
  className = '',
  pattern = 'flower-of-life',
  size = 200,
  color = '#00ffff',
  animated = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState(0);

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

    const drawFlowerOfLife = (centerX: number, centerY: number, radius: number, phase: number) => {
      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.shadowColor = color;
      ctx.shadowBlur = 10;
      ctx.globalAlpha = 0.8;

      // Central circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Six surrounding circles
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const x = centerX + Math.cos(angle + phase) * radius;
        const y = centerY + Math.sin(angle + phase) * radius;
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Outer ring
      for (let i = 0; i < 12; i++) {
        const angle = (i * Math.PI) / 6;
        const distance = radius * Math.sqrt(3);
        const x = centerX + Math.cos(angle - phase * 0.5) * distance;
        const y = centerY + Math.sin(angle - phase * 0.5) * distance;
        
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawMetatron = (centerX: number, centerY: number, radius: number, phase: number) => {
      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.shadowColor = color;
      ctx.shadowBlur = 8;
      ctx.globalAlpha = 0.8;

      // Draw the 13 circles of Metatron's Cube
      const positions = [
        { x: 0, y: 0 }, // Center
        // Inner ring
        { x: radius, y: 0 },
        { x: radius / 2, y: radius * Math.sqrt(3) / 2 },
        { x: -radius / 2, y: radius * Math.sqrt(3) / 2 },
        { x: -radius, y: 0 },
        { x: -radius / 2, y: -radius * Math.sqrt(3) / 2 },
        { x: radius / 2, y: -radius * Math.sqrt(3) / 2 },
        // Outer ring
        { x: radius * 2, y: 0 },
        { x: radius, y: radius * Math.sqrt(3) },
        { x: -radius, y: radius * Math.sqrt(3) },
        { x: -radius * 2, y: 0 },
        { x: -radius, y: -radius * Math.sqrt(3) },
        { x: radius, y: -radius * Math.sqrt(3) },
      ];

      // Draw circles
      positions.forEach(pos => {
        ctx.beginPath();
        ctx.arc(centerX + pos.x, centerY + pos.y, radius / 3, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Draw connecting lines
      ctx.globalAlpha = 0.4;
      positions.forEach((pos1, i) => {
        positions.forEach((pos2, j) => {
          if (i < j) {
            const distance = Math.sqrt(
              Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2)
            );
            
            if (distance <= radius * 2.1) {
              ctx.beginPath();
              ctx.moveTo(centerX + pos1.x, centerY + pos1.y);
              ctx.lineTo(centerX + pos2.x, centerY + pos2.y);
              ctx.stroke();
            }
          }
        });
      });

      ctx.restore();
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const actualSize = Math.min(size, Math.min(canvas.width, canvas.height) / 4);

      switch (pattern) {
        case 'flower-of-life':
          drawFlowerOfLife(centerX, centerY, actualSize / 4, phase);
          break;
        case 'metatron':
          drawMetatron(centerX, centerY, actualSize / 6, phase);
          break;
        case 'sri-yantra':
          // Simplified Sri Yantra - triangular patterns
          ctx.save();
          ctx.strokeStyle = color;
          ctx.lineWidth = 2;
          ctx.shadowColor = color;
          ctx.shadowBlur = 10;
          
          for (let i = 0; i < 9; i++) {
            const triangleSize = actualSize * (0.2 + i * 0.1);
            const rotation = phase + i * Math.PI / 9;
            
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(rotation);
            
            // Upward triangle
            ctx.beginPath();
            ctx.moveTo(0, -triangleSize);
            ctx.lineTo(-triangleSize * Math.sqrt(3) / 2, triangleSize / 2);
            ctx.lineTo(triangleSize * Math.sqrt(3) / 2, triangleSize / 2);
            ctx.closePath();
            ctx.stroke();
            
            // Downward triangle
            ctx.rotate(Math.PI);
            ctx.beginPath();
            ctx.moveTo(0, -triangleSize);
            ctx.lineTo(-triangleSize * Math.sqrt(3) / 2, triangleSize / 2);
            ctx.lineTo(triangleSize * Math.sqrt(3) / 2, triangleSize / 2);
            ctx.closePath();
            ctx.stroke();
            
            ctx.restore();
          }
          
          ctx.restore();
          break;
      }

      if (animated) {
        setPhase(prevPhase => prevPhase + 0.01);
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [pattern, size, color, animated, phase]);

  return (
    <canvas
      ref={canvasRef}
      className={`sacred-geometry w-full h-full ${className}`}
      style={{ backgroundColor: '#000000' }}
    />
  );
};