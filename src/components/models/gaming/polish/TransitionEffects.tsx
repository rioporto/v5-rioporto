'use client';

import React, { useState, useEffect } from 'react';

interface TransitionEffectsProps {
  isActive?: boolean;
  type?: 'slide' | 'fade' | 'zoom' | 'glitch' | 'wipe' | 'matrix' | 'particle' | 'cyber';
  direction?: 'up' | 'down' | 'left' | 'right' | 'center';
  duration?: number;
  onComplete?: () => void;
  className?: string;
}

export const TransitionEffects: React.FC<TransitionEffectsProps> = ({
  isActive = false,
  type = 'slide',
  direction = 'right',
  duration = 800,
  onComplete,
  className = ''
}) => {
  const [phase, setPhase] = useState<'entering' | 'active' | 'exiting'>('entering');
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    if (isActive) {
      setPhase('entering');
      
      // Generate particles for particle transition
      if (type === 'particle') {
        const newParticles = Array.from({ length: 50 }, (_, i) => ({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 500
        }));
        setParticles(newParticles);
      }
      
      setTimeout(() => {
        setPhase('active');
      }, duration / 2);
      
      setTimeout(() => {
        setPhase('exiting');
        setTimeout(() => {
          onComplete?.();
        }, duration / 2);
      }, duration);
    }
  }, [isActive, duration, onComplete, type]);

  if (!isActive) return null;

  const getTransitionStyles = () => {
    const baseStyle = {
      position: 'fixed' as const,
      inset: 0,
      zIndex: 9999,
      pointerEvents: 'none' as const,
    };

    switch (type) {
      case 'slide':
        return {
          ...baseStyle,
          backgroundColor: '#000',
          transform: phase === 'entering' 
            ? direction === 'right' ? 'translateX(-100%)' : 
              direction === 'left' ? 'translateX(100%)' :
              direction === 'down' ? 'translateY(-100%)' : 'translateY(100%)'
            : phase === 'active' 
            ? 'translate(0)' 
            : direction === 'right' ? 'translateX(100%)' : 
              direction === 'left' ? 'translateX(-100%)' :
              direction === 'down' ? 'translateY(100%)' : 'translateY(-100%)',
          transition: `transform ${duration / 2}ms cubic-bezier(0.77, 0, 0.175, 1)`
        };

      case 'fade':
        return {
          ...baseStyle,
          backgroundColor: '#000',
          opacity: phase === 'entering' ? 0 : phase === 'active' ? 1 : 0,
          transition: `opacity ${duration / 2}ms ease-in-out`
        };

      case 'zoom':
        return {
          ...baseStyle,
          backgroundColor: '#000',
          transform: phase === 'entering' ? 'scale(0)' : phase === 'active' ? 'scale(1)' : 'scale(3)',
          transformOrigin: direction === 'center' ? 'center' : 
                          direction === 'up' ? 'top' :
                          direction === 'down' ? 'bottom' :
                          direction === 'left' ? 'left' : 'right',
          transition: `transform ${duration / 2}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`,
          borderRadius: phase === 'entering' ? '50%' : '0%'
        };

      case 'wipe':
        return {
          ...baseStyle,
          background: 'linear-gradient(45deg, #000 0%, #333 50%, #000 100%)',
          clipPath: phase === 'entering' 
            ? direction === 'right' ? 'polygon(0 0, 0 0, 0 100%, 0 100%)' :
              direction === 'left' ? 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' :
              direction === 'down' ? 'polygon(0 0, 100% 0, 100% 0, 0 0)' :
              'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)'
            : phase === 'active' 
            ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
            : direction === 'right' ? 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' :
              direction === 'left' ? 'polygon(0 0, 0 0, 0 100%, 0 100%)' :
              direction === 'down' ? 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' :
              'polygon(0 0, 100% 0, 100% 0, 0 0)',
          transition: `clip-path ${duration / 2}ms cubic-bezier(0.77, 0, 0.175, 1)`
        };

      default:
        return baseStyle;
    }
  };

  const renderGlitchTransition = () => {
    return (
      <div className="fixed inset-0 z-[9999] pointer-events-none">
        <div className="absolute inset-0 bg-black" />
        
        {/* Glitch bars */}
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="absolute w-full bg-white"
            style={{
              height: '2px',
              top: `${i * 5}%`,
              left: phase === 'entering' ? '-100%' : phase === 'active' ? '0%' : '100%',
              transition: `left ${Math.random() * 200 + 100}ms ease-out`,
              transitionDelay: `${i * 10}ms`,
              opacity: Math.random() > 0.5 ? 1 : 0
            }}
          />
        ))}
        
        {/* Glitch blocks */}
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={`block-${i}`}
            className="absolute bg-red-500"
            style={{
              width: `${Math.random() * 20 + 5}%`,
              height: `${Math.random() * 10 + 5}%`,
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
              opacity: phase === 'active' ? Math.random() * 0.8 + 0.2 : 0,
              transition: `opacity ${duration / 4}ms ease-in-out`,
              transitionDelay: `${Math.random() * 300}ms`
            }}
          />
        ))}
        
        {/* Digital noise */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(255,255,255,0.1) 2px,
                rgba(255,255,255,0.1) 4px
              )
            `,
            animation: `glitch-noise ${duration}ms linear`
          }}
        />
      </div>
    );
  };

  const renderMatrixTransition = () => {
    return (
      <div className="fixed inset-0 z-[9999] bg-black pointer-events-none">
        {/* Matrix columns */}
        {Array.from({ length: 30 }, (_, i) => (
          <div
            key={i}
            className="absolute top-0 font-mono text-green-400 text-xs leading-none"
            style={{
              left: `${(i / 30) * 100}%`,
              width: '20px'
            }}
          >
            {Array.from({ length: 50 }, (_, j) => (
              <div
                key={j}
                style={{
                  opacity: phase === 'active' ? Math.random() : 0,
                  transition: `opacity ${Math.random() * 500 + 200}ms ease-in-out`,
                  transitionDelay: `${j * 50}ms`
                }}
              >
                {Math.random() > 0.5 ? '1' : '0'}
              </div>
            ))}
          </div>
        ))}
        
        {/* Matrix sweep */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-green-400/20 to-transparent"
          style={{
            height: '200px',
            top: phase === 'entering' ? '-200px' : phase === 'active' ? '50%' : '100%',
            transition: `top ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
            transform: 'translateY(-50%)'
          }}
        />
      </div>
    );
  };

  const renderParticleTransition = () => {
    return (
      <div className="fixed inset-0 z-[9999] bg-black pointer-events-none">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: phase === 'active' ? 1 : 0,
              transform: phase === 'entering' ? 'scale(0)' : 'scale(1)',
              transition: `all ${duration / 2}ms ease-out`,
              transitionDelay: `${particle.delay}ms`,
              boxShadow: '0 0 4px rgba(255,255,255,0.8)'
            }}
          />
        ))}
        
        {/* Particle lines */}
        <svg className="absolute inset-0 w-full h-full">
          {particles.slice(0, 10).map(particle => (
            <line
              key={`line-${particle.id}`}
              x1="50%"
              y1="50%"
              x2={`${particle.x}%`}
              y2={`${particle.y}%`}
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1"
              style={{
                opacity: phase === 'active' ? 1 : 0,
                transition: `opacity ${duration / 2}ms ease-out`,
                transitionDelay: `${particle.delay + 200}ms`
              }}
            />
          ))}
        </svg>
      </div>
    );
  };

  const renderCyberTransition = () => {
    return (
      <div className="fixed inset-0 z-[9999] bg-black pointer-events-none">
        {/* Cyber grid */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            opacity: phase === 'active' ? 1 : 0,
            transition: `opacity ${duration / 2}ms ease-in-out`
          }}
        />
        
        {/* Cyber scan lines */}
        {Array.from({ length: 3 }, (_, i) => (
          <div
            key={i}
            className="absolute w-full h-1 bg-cyan-400 shadow-[0_0_20px_#00ffff]"
            style={{
              top: `${25 + i * 25}%`,
              left: phase === 'entering' ? '-100%' : phase === 'active' ? '0%' : '100%',
              transition: `left ${duration / 2}ms cubic-bezier(0.77, 0, 0.175, 1)`,
              transitionDelay: `${i * 100}ms`
            }}
          />
        ))}
        
        {/* Cyber hexagons */}
        <div className="absolute inset-0 flex items-center justify-center">
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              className="absolute border-2 border-cyan-400"
              style={{
                width: `${(i + 1) * 60}px`,
                height: `${(i + 1) * 60}px`,
                clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
                opacity: phase === 'active' ? 0.6 - i * 0.1 : 0,
                transform: `rotate(${i * 60}deg) scale(${phase === 'active' ? 1 : 0})`,
                transition: `all ${duration / 2}ms ease-out`,
                transitionDelay: `${i * 50}ms`,
                boxShadow: '0 0 20px rgba(0,255,255,0.3)'
              }}
            />
          ))}
        </div>
      </div>
    );
  };

  // Render specific transition types
  if (type === 'glitch') {
    return renderGlitchTransition();
  }
  
  if (type === 'matrix') {
    return renderMatrixTransition();
  }
  
  if (type === 'particle') {
    return renderParticleTransition();
  }
  
  if (type === 'cyber') {
    return renderCyberTransition();
  }

  // Default transitions
  return (
    <div className={className} style={getTransitionStyles()}>
      {/* Add transition-specific overlays */}
      {type === 'zoom' && (
        <div className="absolute inset-0 bg-gradient-radial from-transparent to-black opacity-30" />
      )}
      
      {type === 'wipe' && (
        <div className="absolute inset-0">
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={i}
              className="absolute w-full h-px bg-white opacity-30"
              style={{
                top: `${i * 10}%`,
                left: phase === 'active' ? '0%' : '100%',
                transition: `left ${duration / 2}ms ease-out`,
                transitionDelay: `${i * 30}ms`
              }}
            />
          ))}
        </div>
      )}
      
      <style jsx>{`
        @keyframes glitch-noise {
          0%, 100% { transform: translate(0); }
          10% { transform: translate(-2px, 2px); }
          20% { transform: translate(-2px, -2px); }
          30% { transform: translate(2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          50% { transform: translate(2px, -2px); }
          60% { transform: translate(-2px, 2px); }
          70% { transform: translate(2px, 2px); }
          80% { transform: translate(-2px, -2px); }
          90% { transform: translate(2px, 2px); }
        }
      `}</style>
    </div>
  );
};

export default TransitionEffects;