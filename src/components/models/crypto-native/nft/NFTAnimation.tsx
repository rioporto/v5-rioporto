'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';

interface NFTAnimationProps {
  type: 'float' | 'glow' | 'rotate' | 'pulse' | 'holographic' | 'glitch' | 'matrix';
  intensity?: 'low' | 'medium' | 'high';
  children: React.ReactNode;
  className?: string;
  triggerOnHover?: boolean;
  autoPlay?: boolean;
}

export function NFTAnimation({
  type,
  intensity = 'medium',
  children,
  className = '',
  triggerOnHover = false,
  autoPlay = true
}: NFTAnimationProps) {
  const [isActive, setIsActive] = useState(autoPlay && !triggerOnHover);
  const [glitchText, setGlitchText] = useState('');

  // Glitch effect text generation
  useEffect(() => {
    if (type === 'glitch' && isActive) {
      const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      const interval = setInterval(() => {
        const randomChars = Array.from({ length: 5 }, () => 
          chars[Math.floor(Math.random() * chars.length)]
        ).join('');
        setGlitchText(randomChars);
      }, 100);

      return () => clearInterval(interval);
    }
  }, [type, isActive]);

  const getAnimationClasses = () => {
    const baseClasses = 'transition-all duration-300';
    
    if (!isActive) return baseClasses;

    switch (type) {
      case 'float':
        return `${baseClasses} animate-bounce ${
          intensity === 'low' ? 'animate-duration-3000' :
          intensity === 'medium' ? 'animate-duration-2000' :
          'animate-duration-1000'
        }`;

      case 'glow':
        return `${baseClasses} ${
          intensity === 'low' ? 'drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]' :
          intensity === 'medium' ? 'drop-shadow-[0_0_20px_rgba(168,85,247,0.7)]' :
          'drop-shadow-[0_0_35px_rgba(168,85,247,0.9)]'
        } animate-pulse`;

      case 'rotate':
        return `${baseClasses} ${
          intensity === 'low' ? 'animate-spin animate-duration-8000' :
          intensity === 'medium' ? 'animate-spin animate-duration-4000' :
          'animate-spin animate-duration-2000'
        }`;

      case 'pulse':
        return `${baseClasses} animate-pulse ${
          intensity === 'low' ? 'animate-duration-3000' :
          intensity === 'medium' ? 'animate-duration-2000' :
          'animate-duration-1000'
        }`;

      case 'holographic':
        return `${baseClasses} relative overflow-hidden`;

      case 'glitch':
        return `${baseClasses} relative`;

      case 'matrix':
        return `${baseClasses} relative overflow-hidden`;

      default:
        return baseClasses;
    }
  };

  const renderEffect = () => {
    switch (type) {
      case 'holographic':
        return isActive && (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
            <div className="absolute inset-0 bg-gradient-to-45deg from-purple-500/20 via-pink-500/20 to-cyan-500/20 animate-spin animate-duration-3000" />
          </>
        );

      case 'glitch':
        return isActive && (
          <>
            <div className="absolute inset-0 bg-red-500/10 animate-pulse animate-duration-100" />
            <div className="absolute top-2 right-2 text-red-400 text-xs font-mono opacity-70">
              {glitchText}
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent animate-ping animate-duration-500" />
          </>
        );

      case 'matrix':
        return isActive && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 via-green-500/10 to-transparent animate-pulse" />
            <div className="absolute top-0 left-0 text-green-400/30 text-xs font-mono leading-none overflow-hidden h-full w-full">
              {'0101010101010101010101010101010101010101010101010101010101010101'.split('').map((char, i) => (
                <span 
                  key={i} 
                  className="inline-block animate-pulse" 
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`relative ${getAnimationClasses()} ${className}`}
      onMouseEnter={() => triggerOnHover && setIsActive(true)}
      onMouseLeave={() => triggerOnHover && setIsActive(false)}
    >
      {children}
      {renderEffect()}
    </div>
  );
}

// Preset NFT Animation Components
export function FloatingNFT({ children, className = '', ...props }: Omit<NFTAnimationProps, 'type'>) {
  return (
    <NFTAnimation type="float" className={className} {...props}>
      {children}
    </NFTAnimation>
  );
}

export function GlowingNFT({ children, className = '', ...props }: Omit<NFTAnimationProps, 'type'>) {
  return (
    <NFTAnimation type="glow" className={className} {...props}>
      {children}
    </NFTAnimation>
  );
}

export function HolographicNFT({ children, className = '', ...props }: Omit<NFTAnimationProps, 'type'>) {
  return (
    <NFTAnimation type="holographic" className={className} {...props}>
      {children}
    </NFTAnimation>
  );
}

export function GlitchNFT({ children, className = '', ...props }: Omit<NFTAnimationProps, 'type'>) {
  return (
    <NFTAnimation type="glitch" className={className} {...props}>
      {children}
    </NFTAnimation>
  );
}

export function MatrixNFT({ children, className = '', ...props }: Omit<NFTAnimationProps, 'type'>) {
  return (
    <NFTAnimation type="matrix" className={className} {...props}>
      {children}
    </NFTAnimation>
  );
}

// Interactive NFT Showcase Component
interface NFTShowcaseProps {
  nft: {
    id: string;
    name: string;
    image: string;
    rarity: string;
  };
  animationType?: NFTAnimationProps['type'];
  className?: string;
}

export function NFTShowcase({ 
  nft, 
  animationType = 'holographic',
  className = '' 
}: NFTShowcaseProps) {
  const [currentAnimation, setCurrentAnimation] = useState(animationType);

  const animations: NFTAnimationProps['type'][] = [
    'float', 'glow', 'rotate', 'pulse', 'holographic', 'glitch', 'matrix'
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      <NFTAnimation 
        type={currentAnimation} 
        triggerOnHover={true}
        intensity="medium"
      >
        <Card className="border-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-md p-6">
          <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center text-6xl mb-4">
            {nft.image}
          </div>
          <div className="text-center space-y-2">
            <h3 className="font-bold text-lg">{nft.name}</h3>
            <div className="text-sm text-muted-foreground">{nft.id}</div>
            <div className="text-sm text-purple-400">{nft.rarity}</div>
          </div>
        </Card>
      </NFTAnimation>

      {/* Animation Controls */}
      <div className="flex flex-wrap gap-2 justify-center">
        {animations.map((animation) => (
          <button
            key={animation}
            onClick={() => setCurrentAnimation(animation)}
            className={`
              px-3 py-1 rounded-md text-xs font-medium transition-all duration-200
              ${currentAnimation === animation
                ? 'bg-purple-500 text-white'
                : 'bg-gray-700/50 text-gray-300 hover:bg-purple-500/20'
              }
            `}
          >
            {animation}
          </button>
        ))}
      </div>
    </div>
  );
}