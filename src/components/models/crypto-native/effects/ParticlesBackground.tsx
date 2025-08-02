'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import { cn } from '@/lib/utils';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

interface ParticlesBackgroundProps {
  particleCount?: number;
  colors?: string[];
  speed?: 'slow' | 'medium' | 'fast';
  size?: 'small' | 'medium' | 'large';
  interactive?: boolean;
  connections?: boolean;
  className?: string;
}

export function ParticlesBackground({
  particleCount = 100,
  colors = ['#9945FF', '#00FFA3', '#FF6B9D', '#4ECDC4'],
  speed = 'medium',
  size = 'medium',
  interactive = true,
  connections = true,
  className,
  ...props
}: ParticlesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  const speedMultiplier = useMemo(() => {
    switch (speed) {
      case 'slow': return 0.5;
      case 'medium': return 1;
      case 'fast': return 2;
      default: return 1;
    }
  }, [speed]);

  const sizeRange = useMemo(() => {
    switch (size) {
      case 'small': return [1, 3];
      case 'medium': return [2, 5];
      case 'large': return [3, 8];
      default: return [2, 5];
    }
  }, [size]);

  const initializeParticles = (width: number, height: number) => {
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * speedMultiplier,
      vy: (Math.random() - 0.5) * speedMultiplier,
      size: Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0],
      opacity: Math.random() * 0.8 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: Math.random() * 1000,
      maxLife: 1000 + Math.random() * 2000
    }));
  };

  const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle) => {
    ctx.save();
    ctx.globalAlpha = particle.opacity * (particle.life / particle.maxLife);
    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
    
    // Add glow effect
    ctx.shadowBlur = particle.size * 2;
    ctx.shadowColor = particle.color;
    ctx.fill();
    
    ctx.restore();
  };

  const drawConnections = (ctx: CanvasRenderingContext2D, particles: Particle[]) => {
    if (!connections) return;

    const maxDistance = 120;
    
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          const opacity = (1 - distance / maxDistance) * 0.3;
          ctx.save();
          ctx.globalAlpha = opacity;
          ctx.strokeStyle = particles[i].color;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  };

  const updateParticle = (particle: Particle, width: number, height: number, mouseX?: number, mouseY?: number) => {
    // Update position
    particle.x += particle.vx;
    particle.y += particle.vy;
    
    // Interactive mouse effect
    if (interactive && mouseX !== undefined && mouseY !== undefined) {
      const dx = mouseX - particle.x;
      const dy = mouseY - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 150;
      
      if (distance < maxDistance) {
        const force = (maxDistance - distance) / maxDistance;
        particle.vx += (dx / distance) * force * 0.01;
        particle.vy += (dy / distance) * force * 0.01;
      }
    }
    
    // Boundary collision
    if (particle.x < 0 || particle.x > width) {
      particle.vx *= -1;
      particle.x = Math.max(0, Math.min(width, particle.x));
    }
    if (particle.y < 0 || particle.y > height) {
      particle.vy *= -1;
      particle.y = Math.max(0, Math.min(height, particle.y));
    }
    
    // Update life
    particle.life += 1;
    if (particle.life > particle.maxLife) {
      particle.life = 0;
      particle.x = Math.random() * width;
      particle.y = Math.random() * height;
      particle.vx = (Math.random() - 0.5) * speedMultiplier;
      particle.vy = (Math.random() - 0.5) * speedMultiplier;
      particle.color = colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Velocity damping
    particle.vx *= 0.99;
    particle.vy *= 0.99;
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const { width, height } = canvas;
    
    // Clear canvas with fade effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, width, height);
    
    // Update and draw particles
    particlesRef.current.forEach(particle => {
      updateParticle(
        particle, 
        width, 
        height,
        interactive ? mouseRef.current.x : undefined,
        interactive ? mouseRef.current.y : undefined
      );
      drawParticle(ctx, particle);
    });
    
    // Draw connections
    drawConnections(ctx, particlesRef.current);
    
    animationRef.current = requestAnimationFrame(animate);
  };

  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    
    initializeParticles(rect.width, rect.height);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!interactive) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  };

  useEffect(() => {
    handleResize();
    animate();
    
    window.addEventListener('resize', handleResize);
    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [particleCount, colors, speed, size, interactive, connections]);

  return (
    <canvas
      ref={canvasRef}
      className={cn('absolute inset-0 pointer-events-none', className)}
      style={{ width: '100%', height: '100%' }}
      {...props}
    />
  );
}

interface FloatingElementsProps {
  children?: React.ReactNode;
  elements?: Array<{
    content: React.ReactNode;
    size?: 'sm' | 'md' | 'lg';
    color?: string;
    speed?: number;
    delay?: number;
  }>;
  density?: 'low' | 'medium' | 'high';
  className?: string;
}

export function FloatingElements({
  children,
  elements,
  density = 'medium',
  className,
  ...props
}: FloatingElementsProps) {
  const defaultElements = useMemo(() => {
    const symbols = ['₿', 'Ξ', '◊', '▲', '●', '◆', '✦', '⬢'];
    const colors = ['#9945FF', '#00FFA3', '#FF6B9D', '#4ECDC4'];
    const densityCount = { low: 15, medium: 25, high: 40 };
    
    return Array.from({ length: densityCount[density] }, (_, i) => ({
      content: symbols[Math.floor(Math.random() * symbols.length)],
      size: ['sm', 'md', 'lg'][Math.floor(Math.random() * 3)] as 'sm' | 'md' | 'lg',
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: 0.5 + Math.random() * 2,
      delay: Math.random() * 10
    }));
  }, [density]);

  const elementsToRender = elements || defaultElements;

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl'
  };

  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)} {...props}>
      {elementsToRender.map((element, index) => (
        <div
          key={index}
          className={cn(
            'absolute opacity-20 font-mono font-bold',
            sizeClasses[element.size || 'md']
          )}
          style={{
            left: `${Math.random() * 100}%`,
            color: element.color,
            animation: `float-${index} ${element.speed * 10}s linear infinite`,
            animationDelay: `${element.delay}s`
          }}
        >
          {element.content}
        </div>
      ))}
      
      {children}
      
      <style jsx>{`
        ${elementsToRender.map((_, index) => `
          @keyframes float-${index} {
            0% {
              transform: translateY(100vh) rotate(0deg);
              opacity: 0;
            }
            10% {
              opacity: 0.2;
            }
            90% {
              opacity: 0.2;
            }
            100% {
              transform: translateY(-100px) rotate(360deg);
              opacity: 0;
            }
          }
        `).join('')}
      `}</style>
    </div>
  );
}

interface MatrixRainProps {
  characters?: string[];
  columns?: number;
  speed?: 'slow' | 'medium' | 'fast';
  color?: string;
  className?: string;
}

export function MatrixRain({
  characters = ['0', '1', 'A', 'B', 'C', 'D', 'E', 'F', '₿', 'Ξ'],
  columns = 30,
  speed = 'medium',
  color = '#00FFA3',
  className,
  ...props
}: MatrixRainProps) {
  const speedValues = {
    slow: 100,
    medium: 50,
    fast: 25
  };

  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none font-mono', className)} {...props}>
      {Array.from({ length: columns }, (_, i) => (
        <div
          key={i}
          className="absolute top-0 opacity-30"
          style={{
            left: `${(i / columns) * 100}%`,
            width: `${100 / columns}%`,
            animation: `matrix-fall-${i} ${Math.random() * 3 + 2}s linear infinite`,
            animationDelay: `${Math.random() * 2}s`
          }}
        >
          {Array.from({ length: 20 }, (_, j) => (
            <div
              key={j}
              className="text-center"
              style={{
                color: j === 0 ? '#FFFFFF' : color,
                opacity: j === 0 ? 1 : Math.max(0.1, 1 - j * 0.1),
                fontSize: `${Math.random() * 0.5 + 0.8}rem`
              }}
            >
              {characters[Math.floor(Math.random() * characters.length)]}
            </div>
          ))}
        </div>
      ))}
      
      <style jsx>{`
        ${Array.from({ length: columns }, (_, i) => `
          @keyframes matrix-fall-${i} {
            0% {
              transform: translateY(-100%);
            }
            100% {
              transform: translateY(100vh);
            }
          }
        `).join('')}
      `}</style>
    </div>
  );
}

interface StarFieldProps {
  stars?: number;
  speed?: 'slow' | 'medium' | 'fast';
  colors?: string[];
  className?: string;
}

export function StarField({
  stars = 200,
  speed = 'medium',
  colors = ['#FFFFFF', '#9945FF', '#00FFA3', '#FF6B9D'],
  className,
  ...props
}: StarFieldProps) {
  const speedValues = {
    slow: 50,
    medium: 30,
    fast: 15
  };

  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)} {...props}>
      {Array.from({ length: stars }, (_, i) => {
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * speedValues[speed] + speedValues[speed];
        const delay = Math.random() * 10;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        return (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: color,
              boxShadow: `0 0 ${size * 2}px ${color}`,
              animation: `twinkle ${duration}s linear infinite`,
              animationDelay: `${delay}s`
            }}
          />
        );
      })}
      
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}