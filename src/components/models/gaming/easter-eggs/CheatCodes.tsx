'use client';

import React, { useState, useEffect } from 'react';

interface CheatCode {
  id: string;
  name: string;
  code: string[];
  description: string;
  effect: string;
  category: 'visual' | 'gameplay' | 'debug' | 'fun';
  active: boolean;
  onActivate: () => void;
  onDeactivate?: () => void;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface CheatCodesProps {
  onCheatActivated?: (cheat: CheatCode) => void;
  debug?: boolean;
  className?: string;
}

export const CheatCodes: React.FC<CheatCodesProps> = ({
  onCheatActivated,
  debug = false,
  className = ''
}) => {
  const [inputSequence, setInputSequence] = useState<string[]>([]);
  const [activeCheats, setActiveCheats] = useState<Set<string>>(new Set());
  const [showCheatMenu, setShowCheatMenu] = useState(false);
  const [lastInputTime, setLastInputTime] = useState(0);

  // Define cheat codes
  const cheatCodes: CheatCode[] = [
    {
      id: 'god-mode',
      name: 'God Mode',
      code: ['KeyG', 'KeyO', 'KeyD'],
      description: 'Invincibility activated',
      effect: 'Makes UI elements immune to errors',
      category: 'gameplay',
      icon: '⚡',
      rarity: 'legendary',
      active: false,
      onActivate: () => {
        document.body.style.filter = 'drop-shadow(0 0 20px gold)';
        document.body.style.transition = 'filter 0.5s';
      },
      onDeactivate: () => {
        document.body.style.filter = 'none';
      }
    },
    {
      id: 'noclip',
      name: 'No Clip',
      code: ['KeyN', 'KeyO', 'KeyC', 'KeyL', 'KeyI', 'KeyP'],
      description: 'Walk through walls',
      effect: 'Removes scroll boundaries',
      category: 'gameplay',
      icon: '👻',
      rarity: 'epic',
      active: false,
      onActivate: () => {
        document.body.style.overflow = 'visible';
        document.documentElement.style.overflow = 'visible';
      },
      onDeactivate: () => {
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
      }
    },
    {
      id: 'matrix-mode',
      name: 'Matrix Mode',
      code: ['KeyM', 'KeyA', 'KeyT', 'KeyR', 'KeyI', 'KeyX'],
      description: 'Enter the Matrix',
      effect: 'Green tint and digital rain',
      category: 'visual',
      icon: '🕶️',
      rarity: 'epic',
      active: false,
      onActivate: () => {
        document.body.style.filter = 'hue-rotate(90deg) contrast(1.2)';
        const matrixEvent = new CustomEvent('activate-matrix-rain');
        window.dispatchEvent(matrixEvent);
      },
      onDeactivate: () => {
        document.body.style.filter = 'none';
        const matrixEvent = new CustomEvent('deactivate-matrix-rain');
        window.dispatchEvent(matrixEvent);
      }
    },
    {
      id: 'rainbow-mode',
      name: 'Rainbow Mode',
      code: ['KeyR', 'KeyA', 'KeyI', 'KeyN', 'KeyB', 'KeyO', 'KeyW'],
      description: 'Rainbow everything!',
      effect: 'Psychedelic color effects',
      category: 'visual',
      icon: '🌈',
      rarity: 'rare',
      active: false,
      onActivate: () => {
        const style = document.createElement('style');
        style.id = 'rainbow-mode';
        style.textContent = `
          @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
          }
          body { animation: rainbow 3s linear infinite; }
        `;
        document.head.appendChild(style);
      },
      onDeactivate: () => {
        const style = document.getElementById('rainbow-mode');
        if (style) style.remove();
      }
    },
    {
      id: 'big-head-mode',
      name: 'Big Head Mode',
      code: ['KeyB', 'KeyI', 'KeyG', 'KeyH', 'KeyE', 'KeyA', 'KeyD'],
      description: 'Everything gets bigger!',
      effect: 'Increases all font sizes',
      category: 'fun',
      icon: '🤯',
      rarity: 'common',
      active: false,
      onActivate: () => {
        document.body.style.fontSize = '1.5em';
        document.body.style.transition = 'font-size 0.5s';
      },
      onDeactivate: () => {
        document.body.style.fontSize = '';
      }
    },
    {
      id: 'gravity-flip',
      name: 'Gravity Flip',
      code: ['KeyG', 'KeyR', 'KeyA', 'KeyV', 'KeyI', 'KeyT', 'KeyY'],
      description: 'Turn the world upside down',
      effect: 'Flips the entire interface',
      category: 'fun',
      icon: '🙃',
      rarity: 'rare',
      active: false,
      onActivate: () => {
        document.body.style.transform = 'rotate(180deg)';
        document.body.style.transition = 'transform 1s';
      },
      onDeactivate: () => {
        document.body.style.transform = 'none';
      }
    },
    {
      id: 'developer-mode',
      name: 'Developer Mode',
      code: ['KeyD', 'KeyE', 'KeyV', 'KeyM', 'KeyO', 'KeyD', 'KeyE'],
      description: 'Show debug information',
      effect: 'Reveals hidden debug panels',
      category: 'debug',
      icon: '🔧',
      rarity: 'legendary',
      active: false,
      onActivate: () => {
        const debugPanels = document.querySelectorAll('[data-debug]');
        debugPanels.forEach(panel => {
          (panel as HTMLElement).style.display = 'block';
        });
      },
      onDeactivate: () => {
        const debugPanels = document.querySelectorAll('[data-debug]');
        debugPanels.forEach(panel => {
          (panel as HTMLElement).style.display = 'none';
        });
      }
    },
    {
      id: 'disco-mode',
      name: 'Disco Mode',
      code: ['KeyD', 'KeyI', 'KeyS', 'KeyC', 'KeyO'],
      description: 'Party time!',
      effect: 'Flashing background colors',
      category: 'visual',
      icon: '🕺',
      rarity: 'epic',
      active: false,
      onActivate: () => {
        const style = document.createElement('style');
        style.id = 'disco-mode';
        style.textContent = `
          @keyframes disco {
            0% { background-color: #ff0000; }
            16% { background-color: #ff8000; }
            32% { background-color: #ffff00; }
            48% { background-color: #00ff00; }
            64% { background-color: #0080ff; }
            80% { background-color: #8000ff; }
            100% { background-color: #ff0080; }
          }
          body::before {
            content: '';
            position: fixed;
            inset: 0;
            background: inherit;
            animation: disco 0.5s linear infinite;
            opacity: 0.1;
            pointer-events: none;
            z-index: -1;
          }
        `;
        document.head.appendChild(style);
      },
      onDeactivate: () => {
        const style = document.getElementById('disco-mode');
        if (style) style.remove();
      }
    }
  ];

  const [cheats, setCheats] = useState<CheatCode[]>(cheatCodes);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const currentTime = Date.now();
      
      // Reset sequence if too much time passed
      if (currentTime - lastInputTime > 3000) {
        setInputSequence([]);
      }
      
      setLastInputTime(currentTime);
      
      const newSequence = [...inputSequence, event.code].slice(-20); // Keep last 20 keys
      setInputSequence(newSequence);
      
      // Check for cheat code matches
      cheats.forEach(cheat => {
        if (cheat.code.length <= newSequence.length) {
          const recentInput = newSequence.slice(-cheat.code.length);
          const matches = cheat.code.every((key, index) => key === recentInput[index]);
          
          if (matches && !activeCheats.has(cheat.id)) {
            activateCheat(cheat);
          }
        }
      });
      
      // Special key combination to show cheat menu
      if (event.ctrlKey && event.shiftKey && event.code === 'KeyC') {
        setShowCheatMenu(!showCheatMenu);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputSequence, lastInputTime, cheats, activeCheats, showCheatMenu]);

  const activateCheat = (cheat: CheatCode) => {
    try {
      cheat.onActivate();
      setActiveCheats(prev => new Set([...prev, cheat.id]));
      setCheats(prev => prev.map(c => 
        c.id === cheat.id ? { ...c, active: true } : c
      ));
      onCheatActivated?.(cheat);
      
      // Show activation message
      showCheatActivatedMessage(cheat);
      
    } catch (error) {
      console.error('Error activating cheat:', error);
    }
  };

  const deactivateCheat = (cheat: CheatCode) => {
    try {
      if (cheat.onDeactivate) {
        cheat.onDeactivate();
      }
      setActiveCheats(prev => {
        const newSet = new Set(prev);
        newSet.delete(cheat.id);
        return newSet;
      });
      setCheats(prev => prev.map(c => 
        c.id === cheat.id ? { ...c, active: false } : c
      ));
    } catch (error) {
      console.error('Error deactivating cheat:', error);
    }
  };

  const showCheatActivatedMessage = (cheat: CheatCode) => {
    const message = document.createElement('div');
    message.className = 'fixed top-4 right-4 z-50 bg-black/90 border border-green-400 rounded-lg p-4 text-green-400 animate-slide-in-right';
    message.innerHTML = `
      <div class="flex items-center space-x-2">
        <span class="text-2xl">${cheat.icon}</span>
        <div>
          <div class="font-bold">Cheat Activated!</div>
          <div class="text-sm">${cheat.name}</div>
          <div class="text-xs opacity-80">${cheat.description}</div>
        </div>
      </div>
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
      message.remove();
    }, 3000);
  };

  const getRarityColor = (rarity: CheatCode['rarity']) => {
    switch (rarity) {
      case 'common': return 'text-gray-400 border-gray-400';
      case 'rare': return 'text-blue-400 border-blue-400';
      case 'epic': return 'text-purple-400 border-purple-400';
      case 'legendary': return 'text-yellow-400 border-yellow-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const getCategoryIcon = (category: CheatCode['category']) => {
    switch (category) {
      case 'visual': return '🎨';
      case 'gameplay': return '🎮';
      case 'debug': return '🔧';
      case 'fun': return '🎪';
      default: return '⚡';
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Cheat Menu */}
      {showCheatMenu && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
          <div className="bg-black/90 border border-green-400 rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-green-400 text-2xl font-bold">🎮 Cheat Codes</h2>
              <button 
                onClick={() => setShowCheatMenu(false)}
                className="text-red-400 hover:text-red-300 text-xl"
              >
                ✖
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cheats.map(cheat => (
                <div
                  key={cheat.id}
                  className={`
                    p-4 rounded-lg border-2 transition-all duration-200
                    ${cheat.active 
                      ? 'bg-green-900/30 border-green-400' 
                      : 'bg-gray-900/30 border-gray-600'
                    }
                  `}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{cheat.icon}</span>
                      <div>
                        <div className={`font-bold ${getRarityColor(cheat.rarity).split(' ')[0]}`}>
                          {cheat.name}
                        </div>
                        <div className="text-xs text-gray-400 flex items-center space-x-1">
                          <span>{getCategoryIcon(cheat.category)}</span>
                          <span>{cheat.category}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => cheat.active ? deactivateCheat(cheat) : activateCheat(cheat)}
                      className={`
                        px-3 py-1 rounded text-sm font-bold transition-colors
                        ${cheat.active 
                          ? 'bg-red-900/50 text-red-400 hover:bg-red-800/50' 
                          : 'bg-green-900/50 text-green-400 hover:bg-green-800/50'
                        }
                      `}
                    >
                      {cheat.active ? 'Deactivate' : 'Activate'}
                    </button>
                  </div>
                  
                  <div className="text-sm text-gray-300 mb-2">
                    {cheat.description}
                  </div>
                  
                  <div className="text-xs text-gray-400 mb-2">
                    Effect: {cheat.effect}
                  </div>
                  
                  <div className="text-xs font-mono text-cyan-400">
                    Code: {cheat.code.map(key => key.replace('Key', '')).join(' ')}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-sm text-gray-400 text-center">
              <div>Press Ctrl+Shift+C to toggle this menu</div>
              <div>Active cheats: {activeCheats.size}</div>
            </div>
          </div>
        </div>
      )}

      {/* Debug Panel */}
      {debug && (
        <div className="fixed bottom-4 left-4 bg-black/80 text-green-400 p-3 rounded-lg font-mono text-xs z-50">
          <div className="font-bold mb-2">Cheat Codes Debug</div>
          <div>Active: {activeCheats.size}</div>
          <div>Recent: {inputSequence.slice(-5).map(k => k.replace('Key', '')).join('')}</div>
          <div>Menu: Ctrl+Shift+C</div>
        </div>
      )}

      {/* Active Cheats Indicator */}
      {activeCheats.size > 0 && (
        <div className="fixed top-4 left-4 bg-black/70 border border-green-400/30 rounded p-2 text-xs text-green-400 z-40">
          <div className="flex items-center space-x-2">
            <span>🎮</span>
            <span>Cheats Active: {activeCheats.size}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheatCodes;