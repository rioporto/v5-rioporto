'use client';

import React, { useState, useEffect } from 'react';

interface KonamiCodeProps {
  onComplete?: () => void;
  onProgress?: (progress: number) => void;
  customSequence?: string[];
  timeout?: number;
  debug?: boolean;
  children?: React.ReactNode;
}

export const KonamiCode: React.FC<KonamiCodeProps> = ({
  onComplete,
  onProgress,
  customSequence,
  timeout = 5000,
  debug = false,
  children
}) => {
  const defaultSequence = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
  ];

  const sequence = customSequence || defaultSequence;
  const [inputSequence, setInputSequence] = useState<string[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [lastInputTime, setLastInputTime] = useState(0);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const currentTime = Date.now();
      
      // Reset if timeout exceeded
      if (currentTime - lastInputTime > timeout) {
        setInputSequence([]);
      }
      
      setLastInputTime(currentTime);
      
      const newSequence = [...inputSequence, event.code];
      
      // Check if input matches sequence so far
      const isValid = sequence.slice(0, newSequence.length).every((key, index) => 
        key === newSequence[index]
      );
      
      if (isValid) {
        setInputSequence(newSequence);
        onProgress?.(newSequence.length / sequence.length);
        
        if (debug) {
          console.log(`Konami Code Progress: ${newSequence.length}/${sequence.length}`, newSequence);
        }
        
        // Check if sequence is complete
        if (newSequence.length === sequence.length) {
          setIsActive(true);
          onComplete?.();
          
          // Reset after completion
          setTimeout(() => {
            setInputSequence([]);
            setIsActive(false);
          }, 3000);
        }
      } else {
        // Reset on wrong input
        setInputSequence([]);
        onProgress?.(0);
        
        if (debug) {
          console.log('Konami Code Reset - Wrong input:', event.code);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputSequence, lastInputTime, sequence, timeout, onComplete, onProgress, debug]);

  // Show hint after some time
  useEffect(() => {
    const hintTimer = setTimeout(() => {
      setShowHint(true);
    }, 10000);

    return () => clearTimeout(hintTimer);
  }, []);

  // Hide hint after user starts typing
  useEffect(() => {
    if (inputSequence.length > 0) {
      setShowHint(false);
    }
  }, [inputSequence]);

  const progress = inputSequence.length / sequence.length;

  return (
    <div className="relative">
      {children}
      
      {/* Debug Info */}
      {debug && (
        <div className="fixed top-4 right-4 bg-black/80 text-green-400 p-3 rounded-lg font-mono text-xs z-50">
          <div>Konami Code Debug</div>
          <div>Progress: {inputSequence.length}/{sequence.length}</div>
          <div>Expected: {sequence[inputSequence.length] || 'Complete!'}</div>
          <div>Sequence: {sequence.join(' → ')}</div>
          <div>Input: {inputSequence.join(' → ')}</div>
        </div>
      )}
      
      {/* Progress Indicator */}
      {inputSequence.length > 0 && !isActive && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-black/80 border border-green-400 rounded-lg p-3 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-green-400 text-sm font-mono">Konami Code</span>
              <span className="text-green-300 text-xs">
                {inputSequence.length}/{sequence.length}
              </span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-40 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-lime-400 transition-all duration-300 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            
            {/* Next Key Hint */}
            <div className="text-center mt-2">
              <span className="text-green-300 text-xs">Next: </span>
              <span className="text-green-400 text-sm font-bold">
                {sequence[inputSequence.length]?.replace('Arrow', '').replace('Key', '') || '✅'}
              </span>
            </div>
          </div>
        </div>
      )}
      
      {/* Completion Effect */}
      {isActive && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          {/* Screen Flash */}
          <div className="absolute inset-0 bg-green-400/20 animate-pulse" />
          
          {/* Success Message */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black/90 border-2 border-green-400 rounded-lg p-8 text-center shadow-[0_0_50px_rgba(34,197,94,0.5)]">
              <div className="text-6xl mb-4 animate-bounce">🎮</div>
              <div className="text-green-400 text-2xl font-bold mb-2">
                KONAMI CODE ACTIVATED!
              </div>
              <div className="text-green-300 text-lg">
                30 Lives Unlocked
              </div>
              <div className="text-green-200 text-sm mt-2 opacity-80">
                Up Up Down Down Left Right Left Right B A
              </div>
            </div>
          </div>
          
          {/* Particle Effects */}
          <div className="absolute inset-0">
            {Array.from({ length: 20 }, (_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-green-400 rounded-full animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 100}ms`,
                  animationDuration: `${1 + Math.random()}s`,
                }}
              />
            ))}
          </div>
          
          {/* Matrix Rain Effect */}
          <div className="absolute inset-0 opacity-30">
            {Array.from({ length: 10 }, (_, i) => (
              <div
                key={i}
                className="absolute top-0 font-mono text-green-400 text-sm animate-pulse"
                style={{
                  left: `${i * 10}%`,
                  animationDelay: `${i * 200}ms`,
                }}
              >
                {Array.from({ length: 20 }, (_, j) => (
                  <div key={j} className="opacity-70">
                    {Math.random() > 0.5 ? '1' : '0'}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Hint */}
      {showHint && inputSequence.length === 0 && (
        <div className="fixed bottom-4 right-4 z-40">
          <div className="bg-black/70 border border-gray-600 rounded-lg p-3 text-xs text-gray-400 animate-pulse">
            <div className="mb-1">💡 Easter Egg Hint:</div>
            <div>Try the classic cheat code...</div>
            <div className="text-xs opacity-60 mt-1">↑↑↓↓←→←→BA</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KonamiCode;