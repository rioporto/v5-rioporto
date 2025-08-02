'use client';

import { useState, useEffect, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  phase: number;
  entangled?: number; // ID of entangled particle
}

interface QuantumEffectProps {
  variant?: 'particles' | 'wave' | 'entanglement' | 'superposition' | 'tunnel';
  intensity?: 'low' | 'medium' | 'high' | 'extreme';
  animated?: boolean;
  interactive?: boolean;
  color?: 'quantum' | 'neon' | 'cosmic' | 'matrix';
  className?: string;
  width?: number;
  height?: number;
}

export function QuantumEffect({
  variant = 'particles',
  intensity = 'medium',
  animated = true,
  interactive = false,
  color = 'quantum',
  className = '',
  width = 400,
  height = 300
}: QuantumEffectProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [wavePhase, setWavePhase] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const colors = {
    quantum: { primary: '#8b5cf6', secondary: '#06b6d4', tertiary: '#10b981', glow: '#f59e0b' },
    neon: { primary: '#ff0080', secondary: '#00ff80', tertiary: '#8000ff', glow: '#ffff00' },
    cosmic: { primary: '#4c1d95', secondary: '#1e3a8a', tertiary: '#7c3aed', glow: '#fbbf24' },
    matrix: { primary: '#22c55e', secondary: '#16a34a', tertiary: '#15803d', glow: '#84cc16' }
  };

  const intensitySettings = {
    low: { particleCount: 20, speed: 0.5, interactionRadius: 50 },
    medium: { particleCount: 50, speed: 1, interactionRadius: 75 },
    high: { particleCount: 100, speed: 1.5, interactionRadius: 100 },
    extreme: { particleCount: 200, speed: 2, interactionRadius: 150 }
  };

  // Initialize particles
  useEffect(() => {
    const settings = intensitySettings[intensity];
    const newParticles: Particle[] = [];

    for (let i = 0; i < settings.particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * settings.speed,
        vy: (Math.random() - 0.5) * settings.speed,
        size: Math.random() * 4 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        phase: Math.random() * Math.PI * 2,
        entangled: variant === 'entanglement' && Math.random() < 0.3 
          ? Math.floor(Math.random() * settings.particleCount) 
          : undefined
      });
    }

    setParticles(newParticles);
  }, [intensity, variant, width, height]);

  // Animation loop
  useEffect(() => {
    if (!animated) return;

    const animate = () => {
      setWavePhase(prev => prev + 0.05);
      
      setParticles(prev => prev.map((particle, index) => {
        let newX = particle.x + particle.vx;
        let newY = particle.y + particle.vy;
        let newVx = particle.vx;
        let newVy = particle.vy;

        // Boundary collision
        if (newX <= 0 || newX >= width) {
          newVx = -newVx;
          newX = Math.max(0, Math.min(width, newX));
        }
        if (newY <= 0 || newY >= height) {
          newVy = -newVy;
          newY = Math.max(0, Math.min(height, newY));
        }

        // Quantum effects
        switch (variant) {
          case 'superposition':
            // Particle exists in multiple states
            newX += Math.sin(particle.phase + wavePhase) * 2;
            newY += Math.cos(particle.phase + wavePhase) * 2;
            break;

          case 'tunnel':
            // Quantum tunneling effect
            if (Math.random() < 0.001) {
              newX = Math.random() * width;
              newY = Math.random() * height;
            }
            break;

          case 'wave':
            // Wave-particle duality
            const waveInfluence = Math.sin(wavePhase + index * 0.1) * 10;
            newY += waveInfluence * 0.1;
            break;
        }

        // Interactive mouse influence
        if (interactive) {
          const dx = mousePos.x - newX;
          const dy = mousePos.y - newY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < intensitySettings[intensity].interactionRadius) {
            const force = (intensitySettings[intensity].interactionRadius - distance) / intensitySettings[intensity].interactionRadius;
            newVx += (dx / distance) * force * 0.1;
            newVy += (dy / distance) * force * 0.1;
          }
        }

        return {
          ...particle,
          x: newX,
          y: newY,
          vx: newVx * 0.99, // Friction
          vy: newVy * 0.99,
          phase: particle.phase + 0.02,
          opacity: 0.3 + Math.sin(particle.phase + wavePhase) * 0.3
        };
      }));

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animated, variant, mousePos, wavePhase, intensity, interactive, width, height]);

  // Canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colorPalette = colors[color];

    // Clear canvas with fade effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, width, height);

    // Draw quantum field background
    if (variant === 'wave') {
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, `${colorPalette.primary}20`);
      gradient.addColorStop(0.5, `${colorPalette.secondary}10`);
      gradient.addColorStop(1, `${colorPalette.tertiary}20`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw wave patterns
      ctx.strokeStyle = `${colorPalette.primary}40`;
      ctx.lineWidth = 2;
      
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        for (let x = 0; x <= width; x += 5) {
          const y = height/2 + Math.sin((x * 0.01) + wavePhase + (i * 0.5)) * (30 + i * 10);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    }

    // Draw entanglement connections
    if (variant === 'entanglement') {
      particles.forEach(particle => {
        if (particle.entangled !== undefined) {
          const entangledParticle = particles[particle.entangled];
          if (entangledParticle) {
            ctx.strokeStyle = `${colorPalette.glow}60`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(entangledParticle.x, entangledParticle.y);
            ctx.stroke();
          }
        }
      });
    }

    // Draw particles
    particles.forEach((particle, index) => {
      ctx.save();

      // Quantum glow effect
      const glowSize = particle.size * 3;
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, glowSize
      );
      
      gradient.addColorStop(0, `${colorPalette.primary}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`);
      gradient.addColorStop(0.3, `${colorPalette.secondary}${Math.floor(particle.opacity * 128).toString(16).padStart(2, '0')}`);
      gradient.addColorStop(1, 'transparent');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2);
      ctx.fill();

      // Core particle
      ctx.fillStyle = colorPalette.primary;
      ctx.globalAlpha = particle.opacity;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();

      // Superposition effect
      if (variant === 'superposition') {
        ctx.globalAlpha = particle.opacity * 0.5;
        ctx.fillStyle = colorPalette.secondary;
        ctx.beginPath();
        ctx.arc(
          particle.x + Math.sin(particle.phase) * 5,
          particle.y + Math.cos(particle.phase) * 5,
          particle.size * 0.7,
          0, Math.PI * 2
        );
        ctx.fill();
      }

      // Quantum uncertainty
      if (intensity === 'extreme') {
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = colorPalette.tertiary;
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.arc(
            particle.x + (Math.random() - 0.5) * 10,
            particle.y + (Math.random() - 0.5) * 10,
            particle.size * 0.5,
            0, Math.PI * 2
          );
          ctx.fill();
        }
      }

      ctx.restore();
    });

    // Interactive mouse effect
    if (interactive && mousePos.x > 0 && mousePos.y > 0) {
      const gradient = ctx.createRadialGradient(
        mousePos.x, mousePos.y, 0,
        mousePos.x, mousePos.y, intensitySettings[intensity].interactionRadius
      );
      
      gradient.addColorStop(0, `${colorPalette.glow}40`);
      gradient.addColorStop(1, 'transparent');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(mousePos.x, mousePos.y, intensitySettings[intensity].interactionRadius, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [particles, variant, color, wavePhase, mousePos, interactive, intensity, width, height]);

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!interactive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    setMousePos({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    });
  };

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
        className={`border border-purple-500/30 rounded ${interactive ? 'cursor-crosshair' : ''}`}
        style={{ background: 'radial-gradient(circle at 50% 50%, #0a0a2e 0%, #000000 100%)' }}
      />

      {/* Quantum info overlay */}
      <div className="absolute top-2 right-2 text-xs font-mono text-purple-400 bg-black/70 p-2 rounded">
        <div>State: {variant}</div>
        <div>Particles: {particles.length}</div>
        <div>Phase: {wavePhase.toFixed(2)}</div>
      </div>
    </div>
  );
}

// Quantum Loading Indicator
interface QuantumLoadingProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: QuantumEffectProps['variant'];
  className?: string;
}

export function QuantumLoading({
  size = 'md',
  variant = 'particles',
  className = ''
}: QuantumLoadingProps) {
  const sizeSettings = {
    sm: { width: 60, height: 60 },
    md: { width: 100, height: 100 },
    lg: { width: 150, height: 150 }
  };

  const dimensions = sizeSettings[size];

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <QuantumEffect
        variant={variant}
        intensity="medium"
        animated={true}
        color="quantum"
        width={dimensions.width}
        height={dimensions.height}
        className="rounded-full overflow-hidden"
      />
    </div>
  );
}

// Quantum Status Indicator
interface QuantumStatusProps {
  status: 'stable' | 'fluctuating' | 'entangled' | 'collapsed';
  label?: string;
  className?: string;
}

export function QuantumStatus({
  status,
  label,
  className = ''
}: QuantumStatusProps) {
  const statusConfig = {
    stable: { variant: 'particles' as const, color: 'matrix' as const, intensity: 'low' as const },
    fluctuating: { variant: 'superposition' as const, color: 'neon' as const, intensity: 'medium' as const },
    entangled: { variant: 'entanglement' as const, color: 'quantum' as const, intensity: 'high' as const },
    collapsed: { variant: 'wave' as const, color: 'cosmic' as const, intensity: 'extreme' as const }
  };

  const config = statusConfig[status];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <QuantumEffect
        variant={config.variant}
        intensity={config.intensity}
        color={config.color}
        width={40}
        height={40}
        className="rounded border border-purple-500/30"
      />
      
      <div className="space-y-1">
        <div className="text-sm font-semibold text-purple-400 capitalize">
          {status}
        </div>
        {label && (
          <div className="text-xs text-muted-foreground">
            {label}
          </div>
        )}
      </div>
    </div>
  );
}

// Quantum Field Background
interface QuantumFieldProps {
  children: React.ReactNode;
  variant?: QuantumEffectProps['variant'];
  intensity?: QuantumEffectProps['intensity'];
  className?: string;
}

export function QuantumField({
  children,
  variant = 'particles',
  intensity = 'low',
  className = ''
}: QuantumFieldProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 overflow-hidden">
        <QuantumEffect
          variant={variant}
          intensity={intensity}
          animated={true}
          color="quantum"
          width={window.innerWidth}
          height={window.innerHeight}
          className="opacity-30"
        />
      </div>
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}