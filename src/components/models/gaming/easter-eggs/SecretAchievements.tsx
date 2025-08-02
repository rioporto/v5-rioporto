'use client';

import React, { useState, useEffect } from 'react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
  points: number;
  unlockCondition: () => boolean;
  isUnlocked: boolean;
  unlockedAt?: Date;
  category: 'trading' | 'exploration' | 'time' | 'easter-egg' | 'interaction' | 'milestone';
}

interface SecretAchievementsProps {
  onAchievementUnlocked?: (achievement: Achievement) => void;
  showToast?: boolean;
  persistAchievements?: boolean;
  className?: string;
}

export const SecretAchievements: React.FC<SecretAchievementsProps> = ({
  onAchievementUnlocked,
  showToast = true,
  persistAchievements = true,
  className = ''
}) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [unlockedToday, setUnlockedToday] = useState<Achievement[]>([]);
  const [stats, setStats] = useState({
    clickCount: 0,
    pageViews: 0,
    timeSpent: 0,
    konamiActivated: false,
    nightOwl: false,
    speedDemon: false,
  });

  const initialAchievements: Achievement[] = [
    {
      id: 'first-click',
      title: 'First Steps',
      description: 'Make your first click in the app',
      icon: '👆',
      rarity: 'common',
      points: 10,
      category: 'interaction',
      isUnlocked: false,
      unlockCondition: () => stats.clickCount >= 1
    },
    {
      id: 'click-master',
      title: 'Click Master',
      description: 'Click 100 times',
      icon: '🖱️',
      rarity: 'rare',
      points: 50,
      category: 'interaction',
      isUnlocked: false,
      unlockCondition: () => stats.clickCount >= 100
    },
    {
      id: 'click-god',
      title: 'Click God',
      description: 'Achieve 1000 clicks',
      icon: '⚡',
      rarity: 'epic',
      points: 200,
      category: 'interaction',
      isUnlocked: false,
      unlockCondition: () => stats.clickCount >= 1000
    },
    {
      id: 'explorer',
      title: 'Explorer',
      description: 'Visit 10 different pages',
      icon: '🗺️',
      rarity: 'common',
      points: 25,
      category: 'exploration',
      isUnlocked: false,
      unlockCondition: () => stats.pageViews >= 10
    },
    {
      id: 'digital-nomad',
      title: 'Digital Nomad',
      description: 'Visit 50 different pages',
      icon: '🌐',
      rarity: 'rare',
      points: 100,
      category: 'exploration',
      isUnlocked: false,
      unlockCondition: () => stats.pageViews >= 50
    },
    {
      id: 'time-traveler',
      title: 'Time Traveler',
      description: 'Spend 30 minutes in the app',
      icon: '⌛',
      rarity: 'rare',
      points: 75,
      category: 'time',
      isUnlocked: false,
      unlockCondition: () => stats.timeSpent >= 30 * 60 * 1000
    },
    {
      id: 'night-owl',
      title: 'Night Owl',
      description: 'Use the app between 12 AM and 6 AM',
      icon: '🦉',
      rarity: 'epic',
      points: 150,
      category: 'time',
      isUnlocked: false,
      unlockCondition: () => {
        const hour = new Date().getHours();
        return hour >= 0 && hour < 6;
      }
    },
    {
      id: 'early-bird',
      title: 'Early Bird',
      description: 'Use the app between 5 AM and 7 AM',
      icon: '🐦',
      rarity: 'rare',
      points: 100,
      category: 'time',
      isUnlocked: false,
      unlockCondition: () => {
        const hour = new Date().getHours();
        return hour >= 5 && hour < 7;
      }
    },
    {
      id: 'konami-master',
      title: 'Konami Master',
      description: 'Successfully enter the Konami Code',
      icon: '🎮',
      rarity: 'legendary',
      points: 500,
      category: 'easter-egg',
      isUnlocked: false,
      unlockCondition: () => stats.konamiActivated
    },
    {
      id: 'speed-demon',
      title: 'Speed Demon',
      description: 'Navigate between pages in under 1 second',
      icon: '🏃‍♂️',
      rarity: 'epic',
      points: 200,
      category: 'interaction',
      isUnlocked: false,
      unlockCondition: () => stats.speedDemon
    },
    {
      id: 'secret-finder',
      title: 'Secret Finder',
      description: 'Find a hidden easter egg',
      icon: '🔍',
      rarity: 'legendary',
      points: 300,
      category: 'easter-egg',
      isUnlocked: false,
      unlockCondition: () => false // Will be triggered manually
    },
    {
      id: 'matrix-runner',
      title: 'Matrix Runner',
      description: 'Activate the matrix rain effect',
      icon: '🕶️',
      rarity: 'mythic',
      points: 1000,
      category: 'easter-egg',
      isUnlocked: false,
      unlockCondition: () => false // Special condition
    }
  ];

  // Load achievements from localStorage
  useEffect(() => {
    if (persistAchievements && typeof window !== 'undefined') {
      const saved = localStorage.getItem('rioporto-achievements');
      if (saved) {
        try {
          const savedAchievements = JSON.parse(saved);
          setAchievements(savedAchievements.map((saved: any) => ({
            ...initialAchievements.find(a => a.id === saved.id),
            ...saved,
            unlockedAt: saved.unlockedAt ? new Date(saved.unlockedAt) : undefined
          })));
          return;
        } catch (e) {
          console.warn('Failed to load achievements');
        }
      }
    }
    
    setAchievements(initialAchievements);
  }, []);

  // Save achievements to localStorage
  useEffect(() => {
    if (persistAchievements && typeof window !== 'undefined' && achievements.length > 0) {
      localStorage.setItem('rioporto-achievements', JSON.stringify(achievements));
    }
  }, [achievements, persistAchievements]);

  // Track user interactions
  useEffect(() => {
    const handleClick = () => {
      setStats(prev => ({ ...prev, clickCount: prev.clickCount + 1 }));
    };

    const handleKeydown = (e: KeyboardEvent) => {
      // Speed navigation detection
      if (e.key === 'Enter' || e.key === ' ') {
        setStats(prev => ({ ...prev, speedDemon: true }));
      }
    };

    // Track time spent
    const startTime = Date.now();
    const timeInterval = setInterval(() => {
      setStats(prev => ({ 
        ...prev, 
        timeSpent: prev.timeSpent + (Date.now() - startTime)
      }));
    }, 1000);

    // Track page views
    setStats(prev => ({ ...prev, pageViews: prev.pageViews + 1 }));

    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKeydown);
      clearInterval(timeInterval);
    };
  }, []);

  // Check achievements
  useEffect(() => {
    setAchievements(prevAchievements => 
      prevAchievements.map(achievement => {
        if (!achievement.isUnlocked && achievement.unlockCondition()) {
          const unlockedAchievement = {
            ...achievement,
            isUnlocked: true,
            unlockedAt: new Date()
          };
          
          onAchievementUnlocked?.(unlockedAchievement);
          
          if (showToast) {
            setUnlockedToday(prev => [...prev, unlockedAchievement]);
          }
          
          return unlockedAchievement;
        }
        return achievement;
      })
    );
  }, [stats, onAchievementUnlocked, showToast]);

  // Expose methods for external triggers
  useEffect(() => {
    const handleKonamiCode = () => {
      setStats(prev => ({ ...prev, konamiActivated: true }));
    };

    const handleSecretFound = () => {
      setAchievements(prev => prev.map(a => 
        a.id === 'secret-finder' && !a.isUnlocked 
          ? { ...a, isUnlocked: true, unlockedAt: new Date() }
          : a
      ));
    };

    window.addEventListener('konami-code-activated', handleKonamiCode);
    window.addEventListener('secret-found', handleSecretFound);

    return () => {
      window.removeEventListener('konami-code-activated', handleKonamiCode);
      window.removeEventListener('secret-found', handleSecretFound);
    };
  }, []);

  const getRarityColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return 'text-gray-400 border-gray-400';
      case 'rare': return 'text-blue-400 border-blue-400';
      case 'epic': return 'text-purple-400 border-purple-400';
      case 'legendary': return 'text-yellow-400 border-yellow-400';
      case 'mythic': return 'text-red-400 border-red-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const getTotalPoints = () => {
    return achievements.filter(a => a.isUnlocked).reduce((sum, a) => sum + a.points, 0);
  };

  const getCompletionPercentage = () => {
    const unlocked = achievements.filter(a => a.isUnlocked).length;
    return Math.round((unlocked / achievements.length) * 100);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Achievement Toasts */}
      {unlockedToday.map((achievement, index) => (
        <div
          key={achievement.id}
          className="fixed top-4 right-4 z-50 animate-slide-in-right"
          style={{ top: `${16 + index * 100}px` }}
        >
          <div className={`
            bg-black/90 border-2 rounded-lg p-4 max-w-sm
            shadow-[0_0_20px_rgba(34,197,94,0.5)]
            ${getRarityColor(achievement.rarity)}
          `}>
            <div className="flex items-center space-x-3">
              <div className="text-3xl">{achievement.icon}</div>
              <div className="flex-1">
                <div className="font-bold text-white">Achievement Unlocked!</div>
                <div className="text-sm font-medium">{achievement.title}</div>
                <div className="text-xs opacity-80">{achievement.description}</div>
                <div className="text-xs mt-1">
                  <span className="font-mono">+{achievement.points} XP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Achievement Summary (Hidden by default, can be toggled) */}
      <div className="hidden" id="achievement-summary">
        <div className="bg-black/80 border border-green-400 rounded-lg p-4">
          <div className="text-green-400 font-bold mb-2">Achievements</div>
          <div className="text-sm space-y-1">
            <div>Total Points: {getTotalPoints()}</div>
            <div>Completion: {getCompletionPercentage()}%</div>
            <div>Unlocked: {achievements.filter(a => a.isUnlocked).length}/{achievements.length}</div>
          </div>
          
          <div className="mt-4 space-y-2 max-h-60 overflow-y-auto">
            {achievements.map(achievement => (
              <div
                key={achievement.id}
                className={`
                  flex items-center space-x-2 p-2 rounded text-xs
                  ${achievement.isUnlocked 
                    ? 'bg-green-900/30 border border-green-400/30' 
                    : 'bg-gray-900/30 border border-gray-600/30 opacity-50'
                  }
                `}
              >
                <span className="text-lg">{achievement.icon}</span>
                <div className="flex-1">
                  <div className="font-medium">{achievement.title}</div>
                  <div className="opacity-80">{achievement.description}</div>
                </div>
                <div className={`text-xs ${getRarityColor(achievement.rarity).split(' ')[0]}`}>
                  {achievement.points}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Debug Stats (development only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 bg-black/80 text-green-400 p-2 rounded text-xs font-mono">
          <div>Clicks: {stats.clickCount}</div>
          <div>Pages: {stats.pageViews}</div>
          <div>Time: {Math.floor(stats.timeSpent / 1000)}s</div>
          <div>Unlocked: {achievements.filter(a => a.isUnlocked).length}</div>
        </div>
      )}
    </div>
  );
};

export default SecretAchievements;