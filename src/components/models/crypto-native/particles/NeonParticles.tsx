'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  color: string;
  type: 'spark' | 'glow' | 'trail';
}

interface NeonParticlesProps {
  className?: string;
  particleCount?: number;
  colors?: string[];
  interactive?: boolean;
  emissionRate?: number;
}

export const NeonParticles: React.FC<NeonParticlesProps> = ({
  className = '',
  particleCount = 100,
  colors = ['#00ffff', '#ff00ff', '#ffff00', '#ff0080'],
  interactive = true,
  emissionRate = 5,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
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

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        createParticle();
      }
    };

    const createParticle = (x?: number, y?: number) => {
      const particle: Particle = {
        x: x ?? Math.random() * canvas.width,
        y: y ?? Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        size: Math.random() * 3 + 1,
        life: 0,
        maxLife: Math.random() * 60 + 30,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: Math.random() > 0.7 ? 'glow' : Math.random() > 0.5 ? 'spark' : 'trail',
      };
      
      particlesRef.current.push(particle);
    };

    const animate = () => {
      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add new particles from mouse
      if (interactive && mouseRef.current.active) {
        for (let i = 0; i < emissionRate; i++) {
          createParticle(
            mouseRef.current.x + (Math.random() - 0.5) * 20,
            mouseRef.current.y + (Math.random() - 0.5) * 20
          );
        }
      }

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life++;

        // Apply physics
        particle.vx *= 0.99; // Friction
        particle.vy *= 0.99;

        // Boundary bouncing
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -0.8;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -0.8;

        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        // Calculate opacity based on life
        const opacity = 1 - (particle.life / particle.maxLife);
        
        // Draw particle based on type
        ctx.save();
        ctx.globalAlpha = opacity;
        
        switch (particle.type) {
          case 'spark':
            drawSpark(ctx, particle);
            break;
          case 'glow':
            drawGlow(ctx, particle);
            break;
          case 'trail':
            drawTrail(ctx, particle);
            break;
        }
        
        ctx.restore();

        // Remove dead particles
        if (particle.life >= particle.maxLife) {
          particlesRef.current.splice(index, 1);
        }
      });

      // Maintain particle count
      while (particlesRef.current.length < particleCount) {
        createParticle();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    const drawSpark = (ctx: CanvasRenderingContext2D, particle: Particle) => {
      ctx.fillStyle = particle.color;
      ctx.shadowColor = particle.color;
      ctx.shadowBlur = particle.size * 2;
      
      // Draw cross shape
      ctx.fillRect(particle.x - particle.size / 2, particle.y - 1, particle.size, 2);
      ctx.fillRect(particle.x - 1, particle.y - particle.size / 2, 2, particle.size);
    };

    const drawGlow = (ctx: CanvasRenderingContext2D, particle: Particle) => {
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size * 3
      );
      
      gradient.addColorStop(0, particle.color);
      gradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawTrail = (ctx: CanvasRenderingContext2D, particle: Particle) => {
      ctx.strokeStyle = particle.color;
      ctx.lineWidth = particle.size;
      ctx.lineCap = 'round';
      ctx.shadowColor = particle.color;
      ctx.shadowBlur = particle.size;
      
      ctx.beginPath();
      ctx.moveTo(particle.x, particle.y);
      ctx.lineTo(particle.x - particle.vx * 2, particle.y - particle.vy * 2);
      ctx.stroke();
    };

    initParticles();
    animate();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particleCount, colors, interactive, emissionRate]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
  };

  return (
    <canvas
      ref={canvasRef}
      className={`neon-particles w-full h-full ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ background: 'radial-gradient(ellipse at center, #0a0a0a 0%, #000000 100%)' }}
    />
  );
};

interface ElectricFieldProps {
  className?: string;
  nodeCount?: number;
  connectionDistance?: number;
  voltage?: number;
}

export const ElectricField: React.FC<ElectricFieldProps> = ({
  className = '',
  nodeCount = 20,
  connectionDistance = 150,
  voltage = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    charge: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      // Initialize nodes
      nodesRef.current = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        charge: Math.random() > 0.5 ? 1 : -1,
      }));
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update node positions
      nodesRef.current.forEach((node, i) => {
        // Apply forces from other nodes
        nodesRef.current.forEach((otherNode, j) => {
          if (i !== j) {
            const dx = otherNode.x - node.x;
            const dy = otherNode.y - node.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < connectionDistance && distance > 0) {
              const force = (node.charge * otherNode.charge * voltage) / (distance * distance);
              node.vx -= (dx / distance) * force * 0.01;
              node.vy -= (dy / distance) * force * 0.01;
            }
          }
        });

        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Boundary conditions
        if (node.x < 0 || node.x > canvas.width) node.vx *= -0.8;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -0.8;
        
        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));

        // Damping
        node.vx *= 0.99;
        node.vy *= 0.99;
      });

      // Draw connections
      nodesRef.current.forEach((node, i) => {
        nodesRef.current.forEach((otherNode, j) => {
          if (i < j) {
            const dx = otherNode.x - node.x;
            const dy = otherNode.y - node.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < connectionDistance) {
              const opacity = 1 - (distance / connectionDistance);
              const color = node.charge === otherNode.charge ? '#ff0080' : '#00ffff';
              
              ctx.strokeStyle = color;
              ctx.globalAlpha = opacity * 0.6;
              ctx.lineWidth = 2;
              ctx.shadowColor = color;
              ctx.shadowBlur = 10;
              
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(otherNode.x, otherNode.y);
              ctx.stroke();
            }
          }
        });
      });

      // Draw nodes
      ctx.globalAlpha = 1;
      nodesRef.current.forEach((node) => {
        const color = node.charge > 0 ? '#ff0080' : '#00ffff';
        
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 15;
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, 8, 0, Math.PI * 2);
        ctx.fill();
        
        // Inner core
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 5;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [nodeCount, connectionDistance, voltage]);

  return (
    <canvas
      ref={canvasRef}
      className={`electric-field w-full h-full ${className}`}
      style={{ backgroundColor: '#000000' }}
    />
  );
};

interface PlasmaFieldProps {
  className?: string;
  complexity?: number;
  speed?: number;
  colors?: string[];
}

export const PlasmaField: React.FC<PlasmaFieldProps> = ({
  className = '',
  complexity = 3,
  speed = 0.02,
  colors = ['#ff0080', '#00ffff', '#ffff00', '#8000ff'],
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

    const animate = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let x = 0; x < canvas.width; x += 2) {
        for (let y = 0; y < canvas.height; y += 2) {
          // Generate plasma value
          const value1 = Math.sin(x * 0.01 + time * speed);
          const value2 = Math.sin(y * 0.01 + time * speed * 1.5);
          const value3 = Math.sin((x + y) * 0.01 + time * speed * 2);
          const value4 = Math.sin(Math.sqrt(x * x + y * y) * 0.02 + time * speed * 0.5);
          
          const plasma = (value1 + value2 + value3 + value4) / 4;
          
          // Map plasma value to color
          const colorIndex = ((plasma + 1) / 2) * (colors.length - 1);
          const index1 = Math.floor(colorIndex);
          const index2 = Math.ceil(colorIndex);
          const factor = colorIndex - index1;
          
          const color1 = hexToRgb(colors[index1]);
          const color2 = hexToRgb(colors[index2]);
          
          if (color1 && color2) {
            const r = Math.floor(color1.r + (color2.r - color1.r) * factor);
            const g = Math.floor(color1.g + (color2.g - color1.g) * factor);
            const b = Math.floor(color1.b + (color2.b - color1.b) * factor);
            const a = Math.floor(255 * Math.abs(plasma));
            
            // Set pixel
            const pixelIndex = (y * canvas.width + x) * 4;
            data[pixelIndex] = r;
            data[pixelIndex + 1] = g;
            data[pixelIndex + 2] = b;
            data[pixelIndex + 3] = a;
            
            // Set adjacent pixels for performance
            if (x + 1 < canvas.width) {
              const nextPixelIndex = (y * canvas.width + (x + 1)) * 4;
              data[nextPixelIndex] = r;
              data[nextPixelIndex + 1] = g;
              data[nextPixelIndex + 2] = b;
              data[nextPixelIndex + 3] = a;
            }
            
            if (y + 1 < canvas.height) {
              const belowPixelIndex = ((y + 1) * canvas.width + x) * 4;
              data[belowPixelIndex] = r;
              data[belowPixelIndex + 1] = g;
              data[belowPixelIndex + 2] = b;
              data[belowPixelIndex + 3] = a;
            }
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
      setTime(prevTime => prevTime + 1);
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [complexity, speed, colors, time]);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  return (
    <canvas
      ref={canvasRef}
      className={`plasma-field w-full h-full ${className}`}
      style={{ backgroundColor: '#000000' }}
    />
  );
};