'use client';

import React, { useState, useEffect } from 'react';
import { MatrixRainGaming } from '../particles/MatrixRainGaming';
import { EnergyOrbs } from '../particles/EnergyOrbs';

interface LoadingScreensProps {
  isLoading?: boolean;
  type?: 'crypto' | 'matrix' | 'neon' | 'retro' | 'minimal' | 'gaming';
  progress?: number;
  message?: string;
  tips?: string[];
  onComplete?: () => void;
  className?: string;
}

export const LoadingScreens: React.FC<LoadingScreensProps> = ({
  isLoading = false,
  type = 'gaming',
  progress = 0,
  message = 'Loading RioPorto...',
  tips = [
    '💡 Did you know? You can use Ctrl+Shift+C to access cheat codes!',
    '🎮 Try the Konami Code for a special surprise!',
    '⚡ Click rapidly on elements to discover hidden features!',
    '🌟 Explore different themes in the settings menu!',
    '🎯 Complete achievements to unlock exclusive rewards!',
    '🔍 Look for easter eggs hidden throughout the interface!',
    '🎪 Some features only activate at certain times of day!',
    '💎 Collect all achievements for legendary status!'
  ],
  onComplete,
  className = ''
}) => {
  const [currentTip, setCurrentTip] = useState(0);
  const [dots, setDots] = useState('');
  const [glitchText, setGlitchText] = useState(message);

  // Cycle through tips
  useEffect(() => {
    if (tips.length > 0) {
      const interval = setInterval(() => {
        setCurrentTip(prev => (prev + 1) % tips.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [tips]);

  // Animated dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) return '';
        return prev + '.';
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Glitch effect for certain types
  useEffect(() => {
    if (type === 'matrix' || type === 'gaming') {
      const interval = setInterval(() => {
        if (Math.random() < 0.1) {
          const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
          const glitched = message.split('').map(char => 
            Math.random() < 0.1 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char
          ).join('');
          setGlitchText(glitched);
          
          setTimeout(() => setGlitchText(message), 100);
        }
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [message, type]);

  // Auto complete when progress reaches 100
  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        onComplete?.();
      }, 1000);
    }
  }, [progress, onComplete]);

  if (!isLoading) return null;

  const renderLoadingScreen = () => {
    switch (type) {
      case 'crypto':
        return (
          <div className="bg-gradient-to-br from-black via-gray-900 to-black">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
            
            {/* Central Logo Area */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
              <div className="text-6xl mb-8 animate-pulse">₿</div>
              
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 mb-4">
                  RioPorto
                </h1>
                <p className="text-xl text-gray-300">{message}{dots}</p>
              </div>

              {/* Progress Bar */}
              <div className="w-80 bg-gray-800 rounded-full h-2 mb-4 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 transition-all duration-500 shadow-[0_0_20px_rgba(249,115,22,0.5)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              
              <div className="text-orange-400 font-mono text-sm mb-8">
                {progress}% Complete
              </div>

              {/* Crypto Icons */}
              <div className="flex space-x-4 text-3xl opacity-60">
                {['₿', 'Ξ', '◊', '₳', '●'].map((symbol, i) => (
                  <div 
                    key={i}
                    className="animate-bounce"
                    style={{ animationDelay: `${i * 200}ms` }}
                  >
                    {symbol}
                  </div>
                ))}
              </div>

              {/* Tip */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                <p className="text-gray-400 text-sm max-w-md animate-fade-in">
                  {tips[currentTip]}
                </p>
              </div>
            </div>
          </div>
        );

      case 'matrix':
        return (
          <div className="bg-black relative overflow-hidden">
            <MatrixRainGaming 
              density={40} 
              gaming={true} 
              colors={['#00ff41']}
              className="opacity-40"
            />
            
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4 text-green-400 animate-pulse font-mono">
                  [ RioPorto ]
                </div>
                <div className="text-green-300 font-mono text-xl mb-4">
                  {glitchText}{dots}
                </div>
                <div className="text-green-500 font-mono text-sm">
                  Initializing Neural Network...
                </div>
              </div>

              {/* Matrix-style progress */}
              <div className="font-mono text-green-400 mb-4">
                <div className="flex space-x-1">
                  {Array.from({ length: 20 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-4 h-4 border border-green-400 ${
                        i < (progress / 5) ? 'bg-green-400' : ''
                      } transition-all duration-200`}
                    />
                  ))}
                </div>
              </div>

              <div className="text-green-400 font-mono text-sm mb-8">
                Loading: {progress.toFixed(1)}%
              </div>

              {/* Binary animation */}
              <div className="font-mono text-green-400 text-xs opacity-60 text-center">
                {Array.from({ length: 5 }, (_, i) => (
                  <div key={i} className="animate-pulse" style={{ animationDelay: `${i * 100}ms` }}>
                    {Array.from({ length: 40 }, () => Math.random() > 0.5 ? '1' : '0').join('')}
                  </div>
                ))}
              </div>

              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                <p className="text-green-400 font-mono text-sm max-w-md">
                  {tips[currentTip]}
                </p>
              </div>
            </div>
          </div>
        );

      case 'neon':
        return (
          <div className="bg-black relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-cyan-900/20" />
            
            <EnergyOrbs 
              count={6} 
              colors={['#ff00ff', '#00ffff', '#ff0080']} 
              className="opacity-30"
            />

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
              <div className="text-center mb-8">
                <h1 
                  className="text-6xl font-bold mb-4"
                  style={{
                    color: '#ff00ff',
                    textShadow: '0 0 20px #ff00ff, 0 0 40px #ff00ff, 0 0 60px #ff00ff',
                    animation: 'pulse 2s ease-in-out infinite'
                  }}
                >
                  RioPorto
                </h1>
                <p 
                  className="text-xl"
                  style={{
                    color: '#00ffff',
                    textShadow: '0 0 10px #00ffff'
                  }}
                >
                  {message}{dots}
                </p>
              </div>

              {/* Neon progress bar */}
              <div className="relative w-80 h-3 mb-4">
                <div className="absolute inset-0 bg-gray-900 rounded-full border border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.3)]" />
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${progress}%`,
                    boxShadow: '0 0 20px rgba(236,72,153,0.6)'
                  }}
                />
              </div>

              <div 
                className="font-mono text-lg mb-8"
                style={{
                  color: '#ffff00',
                  textShadow: '0 0 10px #ffff00'
                }}
              >
                {progress}%
              </div>

              {/* Neon rings */}
              <div className="relative">
                {[1, 2, 3].map(i => (
                  <div
                    key={i}
                    className="absolute inset-0 border-2 rounded-full animate-ping"
                    style={{
                      width: `${i * 60}px`,
                      height: `${i * 60}px`,
                      borderColor: i === 1 ? '#ff00ff' : i === 2 ? '#00ffff' : '#ffff00',
                      animationDelay: `${i * 500}ms`,
                      animationDuration: '2s',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)'
                    }}
                  />
                ))}
              </div>

              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                <p 
                  className="text-sm max-w-md"
                  style={{
                    color: '#ff0080',
                    textShadow: '0 0 5px #ff0080'
                  }}
                >
                  {tips[currentTip]}
                </p>
              </div>
            </div>
          </div>
        );

      case 'retro':
        return (
          <div className="bg-gradient-to-b from-purple-900 to-pink-900 relative overflow-hidden">
            {/* Retro grid */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,0,0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,0,0.3) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
              }}
            />

            {/* Sun */}
            <div className="absolute top-20 left-1/2 transform -translate-x-1/2">
              <div className="w-32 h-32 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full shadow-[0_0_50px_rgba(255,255,0,0.6)]" />
              {/* Sun rays */}
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-20 bg-yellow-400 opacity-60"
                  style={{
                    top: '50%',
                    left: '50%',
                    transformOrigin: 'center',
                    transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-60px)`
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
              <div className="text-center mb-8">
                <h1 
                  className="text-6xl font-bold mb-4 text-yellow-400"
                  style={{
                    textShadow: '4px 4px 0px #000, 8px 8px 0px rgba(0,0,0,0.3)',
                    fontFamily: 'monospace'
                  }}
                >
                  RioPorto
                </h1>
                <p className="text-xl text-pink-300 font-mono">
                  {message}{dots}
                </p>
              </div>

              {/* Retro progress bar */}
              <div className="w-80 bg-black border-4 border-yellow-400 h-8 mb-4 relative shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)]">
                <div 
                  className="h-full bg-gradient-to-r from-pink-500 to-yellow-400 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-black font-bold font-mono">
                  {progress}%
                </div>
              </div>

              {/* Retro elements */}
              <div className="flex space-x-8 text-4xl mb-8">
                {['🌴', '🚗', '📼', '🕶️', '📻'].map((emoji, i) => (
                  <div 
                    key={i}
                    className="animate-bounce"
                    style={{ 
                      animationDelay: `${i * 300}ms`,
                      filter: 'drop-shadow(4px 4px 0px rgba(0,0,0,0.5))'
                    }}
                  >
                    {emoji}
                  </div>
                ))}
              </div>

              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                <p className="text-pink-300 font-mono text-sm max-w-md">
                  {tips[currentTip]}
                </p>
              </div>
            </div>
          </div>
        );

      case 'minimal':
        return (
          <div className="bg-white relative">
            <div className="flex flex-col items-center justify-center min-h-screen p-8">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-light text-gray-800 mb-4">
                  RioPorto
                </h1>
                <p className="text-lg text-gray-600">
                  {message}{dots}
                </p>
              </div>

              <div className="w-64 bg-gray-200 rounded-full h-1 mb-4">
                <div 
                  className="h-full bg-gray-800 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="text-gray-500 text-sm mb-8">
                {progress}%
              </div>

              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                <p className="text-gray-400 text-xs max-w-md">
                  {tips[currentTip]}
                </p>
              </div>
            </div>
          </div>
        );

      default: // gaming
        return (
          <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
            <MatrixRainGaming 
              density={20} 
              gaming={true} 
              colors={['#00ff41', '#ff0080', '#00ffff']}
              className="opacity-30"
            />
            
            <EnergyOrbs 
              count={4} 
              colors={['#00ff41', '#ff0080']} 
              className="opacity-40"
            />

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
              {/* Gaming logo */}
              <div className="text-center mb-8">
                <div className="text-6xl mb-4 animate-pulse">🎮</div>
                <h1 
                  className="text-5xl font-bold mb-4"
                  style={{
                    background: 'linear-gradient(45deg, #00ff41, #ff0080, #00ffff)',
                    backgroundSize: '200% 200%',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    animation: 'gradient-shift 3s ease infinite'
                  }}
                >
                  RioPorto Gaming
                </h1>
                <p className="text-xl text-green-400 font-mono">
                  {glitchText}{dots}
                </p>
              </div>

              {/* Gaming-style progress */}
              <div className="w-96 mb-4">
                <div className="flex justify-between text-sm text-green-400 font-mono mb-2">
                  <span>Loading...</span>
                  <span>{progress}%</span>
                </div>
                <div className="bg-gray-800 border border-green-400 h-4 rounded overflow-hidden shadow-[0_0_10px_rgba(34,197,94,0.3)]">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-lime-400 transition-all duration-500 shadow-[0_0_20px_rgba(34,197,94,0.6)]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Gaming stats */}
              <div className="grid grid-cols-3 gap-8 text-center mb-8 font-mono text-sm">
                <div>
                  <div className="text-cyan-400">Level</div>
                  <div className="text-white text-xl">∞</div>
                </div>
                <div>
                  <div className="text-pink-400">XP</div>
                  <div className="text-white text-xl">MAX</div>
                </div>
                <div>
                  <div className="text-yellow-400">Status</div>
                  <div className="text-white text-xl">ELITE</div>
                </div>
              </div>

              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                <p className="text-green-400 font-mono text-sm max-w-md animate-pulse">
                  {tips[currentTip]}
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`fixed inset-0 z-50 ${className}`}>
      {renderLoadingScreen()}
      
      {/* Add gradient animation keyframes */}
      <style jsx>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreens;