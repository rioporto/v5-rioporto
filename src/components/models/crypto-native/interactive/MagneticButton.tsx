'use client';

import React, { useState, useRef, useCallback } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  magneticStrength?: number;
  resetSpeed?: number;
  glowEffect?: boolean;
  variant?: 'cyber' | 'neon' | 'hologram' | 'matrix';
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  className = '',
  magneticStrength = 0.3,
  resetSpeed = 300,
  glowEffect = true,
  variant = 'cyber',
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const getVariantStyles = () => {
    switch (variant) {
      case 'cyber':
        return {
          bg: 'bg-gradient-to-r from-cyan-600 to-blue-600',
          border: 'border-cyan-400',
          glow: 'rgba(0, 255, 255, 0.5)',
          text: 'text-white',
        };
      case 'neon':
        return {
          bg: 'bg-gradient-to-r from-pink-600 to-purple-600',
          border: 'border-pink-400',
          glow: 'rgba(255, 0, 255, 0.5)',
          text: 'text-white',
        };
      case 'hologram':
        return {
          bg: 'bg-gradient-to-r from-blue-600 to-indigo-600',
          border: 'border-blue-400',
          glow: 'rgba(0, 128, 255, 0.5)',
          text: 'text-white',
        };
      case 'matrix':
        return {
          bg: 'bg-gradient-to-r from-green-600 to-emerald-600',
          border: 'border-green-400',
          glow: 'rgba(0, 255, 0, 0.5)',
          text: 'text-white',
        };
      default:
        return {
          bg: 'bg-gradient-to-r from-cyan-600 to-blue-600',
          border: 'border-cyan-400',
          glow: 'rgba(0, 255, 255, 0.5)',
          text: 'text-white',
        };
    }
  };

  const styles = getVariantStyles();

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setPosition({
      x: x * magneticStrength,
      y: y * magneticStrength,
    });
  }, [magneticStrength]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  }, []);

  const handleMouseDown = useCallback(() => {
    setIsPressed(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsPressed(false);
  }, []);

  return (
    <button
      ref={buttonRef}
      className={`magnetic-button relative overflow-hidden rounded-lg border-2 px-6 py-3 font-semibold transition-all duration-200 ${styles.bg} ${styles.border} ${styles.text} ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) scale(${isPressed ? 0.95 : isHovered ? 1.05 : 1})`,
        transition: isHovered ? 'none' : `transform ${resetSpeed}ms ease-out`,
        boxShadow: glowEffect && isHovered ? `0 0 30px ${styles.glow}` : 'none',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={onClick}
    >
      {/* Magnetic field indicator */}
      {isHovered && (
        <div
          className="absolute inset-0 rounded-lg border-2 border-white/20 animate-pulse"
          style={{
            transform: 'scale(1.2)',
          }}
        />
      )}
      
      {/* Button content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Shine effect */}
      <div
        className={`absolute inset-0 opacity-0 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : ''
        }`}
        style={{
          background: 'linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
          transform: 'translateX(-100%)',
          animation: isHovered ? 'shine 1s ease-out' : 'none',
        }}
      />
      
      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%) skewX(-15deg);
          }
          100% {
            transform: translateX(200%) skewX(-15deg);
          }
        }
      `}</style>
    </button>
  );
};

interface CyberMagneticProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  pulseEffect?: boolean;
}

export const CyberMagnetic: React.FC<CyberMagneticProps> = ({
  children,
  onClick,
  className = '',
  pulseEffect = true,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setPosition({
      x: x * 0.2,
      y: y * 0.2,
    });
  };

  const handleMouseEnter = () => {
    setIsActive(true);
  };

  const handleMouseLeave = () => {
    setIsActive(false);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <button
      ref={buttonRef}
      className={`cyber-magnetic relative overflow-hidden bg-black/50 backdrop-blur-sm border border-cyan-500/50 rounded-lg px-6 py-3 text-cyan-400 font-mono ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: isActive ? 'none' : 'transform 0.3s ease-out',
        boxShadow: isActive ? '0 0 30px rgba(0, 255, 255, 0.5)' : '0 0 10px rgba(0, 255, 255, 0.2)',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Corner markers */}
      <div className="absolute top-0 left-0 w-3 h-3">
        <div className="absolute top-0 left-0 w-full h-px bg-cyan-400" />
        <div className="absolute top-0 left-0 h-full w-px bg-cyan-400" />
      </div>
      <div className="absolute top-0 right-0 w-3 h-3">
        <div className="absolute top-0 right-0 w-full h-px bg-cyan-400" />
        <div className="absolute top-0 right-0 h-full w-px bg-cyan-400" />
      </div>
      <div className="absolute bottom-0 left-0 w-3 h-3">
        <div className="absolute bottom-0 left-0 w-full h-px bg-cyan-400" />
        <div className="absolute bottom-0 left-0 h-full w-px bg-cyan-400" />
      </div>
      <div className="absolute bottom-0 right-0 w-3 h-3">
        <div className="absolute bottom-0 right-0 w-full h-px bg-cyan-400" />
        <div className="absolute bottom-0 right-0 h-full w-px bg-cyan-400" />
      </div>
      
      {/* Pulse rings */}
      {pulseEffect && isActive && (
        <>
          <div className="absolute inset-0 rounded-lg border border-cyan-400/50 animate-ping" />
          <div className="absolute inset-0 rounded-lg border border-cyan-400/30 animate-ping" style={{ animationDelay: '0.1s' }} />
          <div className="absolute inset-0 rounded-lg border border-cyan-400/20 animate-ping" style={{ animationDelay: '0.2s' }} />
        </>
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </button>
  );
};

interface MagneticOrbProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  size?: number;
  color?: string;
}

export const MagneticOrb: React.FC<MagneticOrbProps> = ({
  children,
  onClick,
  className = '',
  size = 80,
  color = '#00ffff',
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const orbRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!orbRef.current) return;

    const rect = orbRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const distance = Math.sqrt(x * x + y * y);
    const maxDistance = size;
    
    if (distance < maxDistance) {
      const strength = (maxDistance - distance) / maxDistance;
      setPosition({
        x: x * 0.1 * strength,
        y: y * 0.1 * strength,
      });
    }
  };

  const handleMouseEnter = () => {
    setIsActive(true);
  };

  const handleMouseLeave = () => {
    setIsActive(false);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <button
      ref={orbRef}
      className={`magnetic-orb relative flex items-center justify-center rounded-full transition-all duration-300 ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        transform: `translate(${position.x}px, ${position.y}px) scale(${isActive ? 1.1 : 1})`,
        transition: isActive ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out',
        filter: `drop-shadow(0 0 ${isActive ? 30 : 15}px ${color})`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Inner core */}
      <div
        className="absolute inset-4 rounded-full border-2 opacity-60"
        style={{
          borderColor: color,
          animation: isActive ? 'spin 2s linear infinite' : 'none',
        }}
      />
      
      {/* Outer ring */}
      <div
        className="absolute inset-0 rounded-full border opacity-30"
        style={{
          borderColor: color,
          animation: isActive ? 'pulse 1s ease-in-out infinite' : 'none',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-white">
        {children}
      </div>
      
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.6; }
        }
      `}</style>
    </button>
  );
};

interface GravityButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  gravityRadius?: number;
  strength?: number;
}

export const GravityButton: React.FC<GravityButtonProps> = ({
  children,
  onClick,
  className = '',
  gravityRadius = 100,
  strength = 0.5,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 });
  const [isInGravityField, setIsInGravityField] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;
    
    const distance = Math.sqrt(
      Math.pow(e.clientX - buttonCenterX, 2) + Math.pow(e.clientY - buttonCenterY, 2)
    );
    
    if (distance < gravityRadius) {
      setIsInGravityField(true);
      const force = (gravityRadius - distance) / gravityRadius;
      const pullX = (e.clientX - buttonCenterX) * force * strength;
      const pullY = (e.clientY - buttonCenterY) * force * strength;
      
      setButtonPos({ x: pullX, y: pullY });
    } else {
      setIsInGravityField(false);
      setButtonPos({ x: 0, y: 0 });
    }
    
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="gravity-field relative"
      onMouseMove={handleMouseMove}
      style={{ width: gravityRadius * 2, height: gravityRadius * 2 }}
    >
      {/* Gravity field indicator */}
      {isInGravityField && (
        <div
          className="absolute rounded-full border border-purple-500/30 animate-pulse"
          style={{
            width: gravityRadius * 2,
            height: gravityRadius * 2,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}
      
      <button
        ref={buttonRef}
        className={`absolute bg-gradient-to-r from-purple-600 to-pink-600 border border-purple-400 rounded-lg px-6 py-3 text-white font-semibold transition-all duration-200 ${className}`}
        style={{
          left: '50%',
          top: '50%',
          transform: `translate(calc(-50% + ${buttonPos.x}px), calc(-50% + ${buttonPos.y}px)) scale(${isInGravityField ? 1.1 : 1})`,
          boxShadow: isInGravityField ? '0 0 30px rgba(147, 51, 234, 0.5)' : 'none',
        }}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};