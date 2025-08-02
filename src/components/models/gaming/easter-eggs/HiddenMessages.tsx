'use client';

import React, { useState, useEffect } from 'react';

interface HiddenMessage {
  id: string;
  message: string;
  trigger: 'click' | 'hover' | 'sequence' | 'time' | 'konami' | 'inspect';
  element?: string;
  sequence?: string[];
  delay?: number;
  found: boolean;
  style: 'console' | 'toast' | 'overlay' | 'subtle' | 'matrix';
  location: { x: number; y: number } | 'random' | 'center';
}

interface HiddenMessagesProps {
  onMessageFound?: (message: HiddenMessage) => void;
  debug?: boolean;
  className?: string;
}

export const HiddenMessages: React.FC<HiddenMessagesProps> = ({
  onMessageFound,
  debug = false,
  className = ''
}) => {
  const [foundMessages, setFoundMessages] = useState<HiddenMessage[]>([]);
  const [activeMessage, setActiveMessage] = useState<HiddenMessage | null>(null);
  const [sequenceInput, setSequenceInput] = useState<string[]>([]);

  const hiddenMessages: HiddenMessage[] = [
    {
      id: 'welcome',
      message: '🎮 Welcome to the RioPorto Gaming Universe! 🚀',
      trigger: 'click',
      element: 'logo',
      found: false,
      style: 'toast',
      location: 'center'
    },
    {
      id: 'developer-greeting',
      message: 'console.log("Hello, fellow developer! 👋");',
      trigger: 'inspect',
      found: false,
      style: 'console',
      location: 'random'
    },
    {
      id: 'konami-tribute',
      message: '↑↑↓↓←→←→BA - The most famous cheat code in gaming history!',
      trigger: 'konami',
      found: false,
      style: 'overlay',
      location: 'center'
    },
    {
      id: 'time-secret',
      message: '⏰ Time flies when you are having fun with crypto!',
      trigger: 'time',
      delay: 30000, // 30 seconds
      found: false,
      style: 'subtle',
      location: { x: 85, y: 15 }
    },
    {
      id: 'matrix-quote',
      message: 'There is no spoon... only blockchain! 🥄',
      trigger: 'sequence',
      sequence: ['KeyM', 'KeyA', 'KeyT', 'KeyR', 'KeyI', 'KeyX'],
      found: false,
      style: 'matrix',
      location: 'center'
    },
    {
      id: 'easter-egg-master',
      message: '🥚 You found the Easter Egg! You are officially a RioPorto explorer!',
      trigger: 'click',
      element: 'hidden-element',
      found: false,
      style: 'overlay',
      location: 'center'
    },
    {
      id: 'crypto-wisdom',
      message: '💎 HODL is not just a strategy, it is a way of life!',
      trigger: 'hover',
      element: 'trading-panel',
      found: false,
      style: 'toast',
      location: { x: 20, y: 80 }
    },
    {
      id: 'gaming-philosophy',
      message: '🎯 Life is like a game - level up every day!',
      trigger: 'sequence',
      sequence: ['KeyL', 'KeyI', 'KeyF', 'KeyE'],
      found: false,
      style: 'subtle',
      location: 'random'
    },
    {
      id: 'retro-vibes',
      message: '📼 Bringing back the 80s, one pixel at a time!',
      trigger: 'click',
      element: 'retro-button',
      found: false,
      style: 'matrix',
      location: { x: 50, y: 30 }
    },
    {
      id: 'neon-dreams',
      message: '✨ In neon we trust! Cyber future is now!',
      trigger: 'hover',
      element: 'neon-effect',
      found: false,
      style: 'overlay',
      location: 'center'
    }
  ];

  const [messages, setMessages] = useState<HiddenMessage[]>(hiddenMessages);

  // Console message for developers
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const devMessage = messages.find(m => m.id === 'developer-greeting');
      if (devMessage && !devMessage.found) {
        console.log('%c🎮 RioPorto Gaming Mode Activated!', 'color: #00ff41; font-size: 16px; font-weight: bold;');
        console.log('%c👋 Hello, developer! Found the secret console message!', 'color: #00ffff; font-size: 14px;');
        console.log('%c🔍 Keep exploring for more easter eggs...', 'color: #ff0080; font-size: 12px;');
        
        markMessageAsFound('developer-greeting');
      }
    }
  }, []);

  // Time-based messages
  useEffect(() => {
    const timeMessage = messages.find(m => m.trigger === 'time' && !m.found);
    if (timeMessage) {
      const timer = setTimeout(() => {
        showMessage(timeMessage);
      }, timeMessage.delay || 30000);

      return () => clearTimeout(timer);
    }
  }, [messages]);

  // Sequence detection
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const newSequence = [...sequenceInput, event.code].slice(-10); // Keep last 10 keys
      setSequenceInput(newSequence);

      // Check for sequence matches
      messages.forEach(message => {
        if (message.trigger === 'sequence' && message.sequence && !message.found) {
          const sequenceMatch = message.sequence.every((key, index) => {
            const inputIndex = newSequence.length - message.sequence!.length + index;
            return inputIndex >= 0 && newSequence[inputIndex] === key;
          });

          if (sequenceMatch) {
            showMessage(message);
          }
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sequenceInput, messages]);

  // Konami code detection
  useEffect(() => {
    const handleKonami = () => {
      const konamiMessage = messages.find(m => m.trigger === 'konami' && !m.found);
      if (konamiMessage) {
        showMessage(konamiMessage);
      }
    };

    window.addEventListener('konami-code-activated', handleKonami);
    return () => window.removeEventListener('konami-code-activated', handleKonami);
  }, [messages]);

  const markMessageAsFound = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, found: true } : msg
    ));
  };

  const showMessage = (message: HiddenMessage) => {
    if (message.found) return;

    markMessageAsFound(message.id);
    setFoundMessages(prev => [...prev, message]);
    onMessageFound?.(message);

    switch (message.style) {
      case 'console':
        console.log(`🎮 ${message.message}`);
        break;
      case 'toast':
      case 'overlay':
      case 'matrix':
      case 'subtle':
        setActiveMessage(message);
        setTimeout(() => setActiveMessage(null), 5000);
        break;
    }

    if (debug) {
      console.log('Hidden message found:', message);
    }
  };

  const getMessagePosition = (location: HiddenMessage['location']) => {
    if (location === 'center') {
      return { left: '50%', top: '50%', transform: 'translate(-50%, -50%)' };
    }
    if (location === 'random') {
      return {
        left: `${Math.random() * 80 + 10}%`,
        top: `${Math.random() * 80 + 10}%`,
      };
    }
    return {
      left: `${location.x}%`,
      top: `${location.y}%`,
    };
  };

  const renderMessage = (message: HiddenMessage) => {
    const position = getMessagePosition(message.location);

    switch (message.style) {
      case 'toast':
        return (
          <div
            className="fixed z-50 animate-slide-in-right"
            style={position}
          >
            <div className="bg-black/90 border border-green-400 rounded-lg p-4 max-w-sm shadow-[0_0_20px_rgba(34,197,94,0.5)]">
              <div className="text-green-400 font-bold">Hidden Message Found!</div>
              <div className="text-green-300 text-sm mt-1">{message.message}</div>
            </div>
          </div>
        );

      case 'overlay':
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in">
            <div className="bg-black/90 border-2 border-cyan-400 rounded-lg p-8 text-center max-w-md shadow-[0_0_50px_rgba(6,182,212,0.5)]">
              <div className="text-4xl mb-4">🎮</div>
              <div className="text-cyan-400 text-xl font-bold mb-2">Secret Unlocked!</div>
              <div className="text-cyan-300">{message.message}</div>
            </div>
          </div>
        );

      case 'matrix':
        return (
          <div
            className="fixed z-50 animate-pulse"
            style={position}
          >
            <div className="bg-black/95 border border-green-400 p-4 font-mono text-sm shadow-[0_0_30px_rgba(0,255,65,0.6)]">
              <div className="text-green-400 mb-2">
                {Array.from({ length: 20 }, () => Math.random() > 0.5 ? '1' : '0').join('')}
              </div>
              <div className="text-green-300">{message.message}</div>
              <div className="text-green-400 mt-2">
                {Array.from({ length: 20 }, () => Math.random() > 0.5 ? '1' : '0').join('')}
              </div>
            </div>
          </div>
        );

      case 'subtle':
        return (
          <div
            className="fixed z-40 animate-fade-in"
            style={position}
          >
            <div className="bg-gray-900/80 border border-gray-600 rounded p-2 text-xs text-gray-300 max-w-xs">
              {message.message}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Click handlers for specific elements
  const handleElementClick = (elementId: string) => {
    const message = messages.find(m => 
      m.trigger === 'click' && m.element === elementId && !m.found
    );
    if (message) {
      showMessage(message);
    }
  };

  const handleElementHover = (elementId: string) => {
    const message = messages.find(m => 
      m.trigger === 'hover' && m.element === elementId && !m.found
    );
    if (message) {
      showMessage(message);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Active message display */}
      {activeMessage && renderMessage(activeMessage)}

      {/* Hidden clickable elements */}
      <div 
        className="absolute top-0 left-0 w-4 h-4 opacity-0 cursor-pointer"
        onClick={() => handleElementClick('hidden-element')}
      />

      {/* Debug panel */}
      {debug && (
        <div className="fixed bottom-4 right-4 bg-black/80 text-green-400 p-3 rounded-lg font-mono text-xs z-50">
          <div className="font-bold mb-2">Hidden Messages Debug</div>
          <div>Found: {foundMessages.length}/{messages.length}</div>
          <div>Active: {activeMessage?.id || 'none'}</div>
          <div>Sequence: {sequenceInput.slice(-5).join('')}</div>
          
          <div className="mt-2 space-y-1 max-h-32 overflow-y-auto">
            {messages.map(msg => (
              <div 
                key={msg.id} 
                className={`text-xs ${msg.found ? 'text-green-400' : 'text-gray-500'}`}
              >
                {msg.id}: {msg.found ? '✓' : '○'}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Statistics display */}
      {foundMessages.length > 0 && (
        <div className="fixed top-4 left-4 bg-black/70 border border-green-400/30 rounded p-2 text-xs text-green-400 z-40">
          <div>🔍 Secrets Found: {foundMessages.length}</div>
        </div>
      )}

      {/* Global event listeners setup */}
      <div className="hidden">
        {/* These will be replaced with actual elements in the real app */}
        <div 
          onClick={() => handleElementClick('logo')}
          onMouseEnter={() => handleElementHover('trading-panel')}
        />
      </div>
    </div>
  );
};

export default HiddenMessages;