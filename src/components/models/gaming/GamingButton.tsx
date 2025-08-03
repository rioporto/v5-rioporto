'use client';

import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface GamingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
  soundEnabled?: boolean;
  children: React.ReactNode;
}

export const GamingButton: React.FC<GamingButtonProps> = ({
  variant = 'default',
  size = 'md',
  glow = true,
  soundEnabled = true,
  className,
  children,
  onMouseEnter,
  onMouseLeave,
  onClick,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Sound synthesis for arcade-style feedback
  const playSound = (frequency: number, duration: number) => {
    if (!soundEnabled) return;
    
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const context = audioContextRef.current;
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(context.destination);
      
      oscillator.frequency.setValueAtTime(frequency, context.currentTime);
      oscillator.type = 'square';
      
      gainNode.gain.setValueAtTime(0.1, context.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + duration);
      
      oscillator.start(context.currentTime);
      oscillator.stop(context.currentTime + duration);
    } catch (error) {
      // Silent fail if audio context is not available
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(true);
    playSound(800, 0.1);
    onMouseEnter?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(false);
    setIsPressed(false);
    onMouseLeave?.(e);
  };

  const handleMouseDown = () => {
    setIsPressed(true);
    playSound(400, 0.1);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playSound(1200, 0.2);
    onClick?.(e);
  };

  const variantStyles: Record<string, string> = {
    primary: 'border-gaming-neon-pink text-gaming-neon-pink hover:bg-gaming-neon-pink/10 hover:shadow-[0_0_30px_rgba(255,0,110,0.5)]',
    secondary: 'border-gaming-neon-cyan text-gaming-neon-cyan hover:bg-gaming-neon-cyan/10 hover:shadow-[0_0_30px_rgba(0,245,255,0.5)]',
    success: 'border-gaming-neon-green text-gaming-neon-green hover:bg-gaming-neon-green/10 hover:shadow-[0_0_30px_rgba(0,255,0,0.5)]',
    warning: 'border-gaming-neon-yellow text-gaming-neon-yellow hover:bg-gaming-neon-yellow/10 hover:shadow-[0_0_30px_rgba(255,255,0,0.5)]',
    error: 'border-gaming-neon-red text-gaming-neon-red hover:bg-gaming-neon-red/10 hover:shadow-[0_0_30px_rgba(255,51,51,0.5)]',
  };

  const sizeStyles: Record<string, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={cn(
        // Base styles
        'relative overflow-hidden transition-all duration-300 ease-out',
        'bg-gaming-surface border-2 rounded-lg font-gaming-cyber',
        'uppercase tracking-wider font-normal cursor-pointer',
        'active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed',
        
        // Variant styles
        variantStyles[variant],
        
        // Size styles
        sizeStyles[size],
        
        // Interactive states
        isHovered && 'transform -translate-y-1',
        isPressed && 'transform translate-y-0 scale-95',
        
        // Glow effect
        glow && 'shadow-[0_0_20px_rgba(255,0,110,0.3)]',
        
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={handleClick}
      {...props}
    >
      {/* Shine effect */}
      <div 
        className={cn(
          'absolute inset-0 -translate-x-full transition-transform duration-500',
          'bg-gradient-to-r from-transparent via-white/20 to-transparent',
          isHovered && 'translate-x-full'
        )}
      />
      
      {/* Scanline effect */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-60" />
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      
      {/* Corner brackets */}
      <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-current opacity-50" />
      <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-current opacity-50" />
      <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-current opacity-50" />
      <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-current opacity-50" />
    </button>
  );
};