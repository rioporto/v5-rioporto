'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface Reaction {
  emoji: string;
  count: number;
  label: string;
  users?: string[];
}

interface FloatingEmoji {
  id: string;
  emoji: string;
  x: number;
  y: number;
  scale: number;
  opacity: number;
  duration: number;
}

interface EmojiReactionsProps {
  reactions?: Reaction[];
  onReact?: (emoji: string) => void;
  showCounts?: boolean;
  allowCustom?: boolean;
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'minimal' | 'bubbly' | 'neon' | 'holographic';
  className?: string;
}

const defaultReactions: Reaction[] = [
  { emoji: '🔥', count: 0, label: 'Fire' },
  { emoji: '💎', count: 0, label: 'Diamond Hands' },
  { emoji: '🚀', count: 0, label: 'To the Moon' },
  { emoji: '💯', count: 0, label: '100' },
  { emoji: '⚡', count: 0, label: 'Lightning' },
  { emoji: '🌙', count: 0, label: 'Moon' },
  { emoji: '💰', count: 0, label: 'Money' },
  { emoji: '👑', count: 0, label: 'King' }
];

const genZEmojis = [
  '💀', '😭', '🤡', '💅', '✨', '🧿', '🫡', '🤌',
  '👀', '💯', '🔥', '💎', '🚀', '⚡', '🌙', '💰',
  '🎯', '🎨', '🌈', '⭐', '💫', '🔮', '🎭', '🎪'
];

export function EmojiReactions({
  reactions = defaultReactions,
  onReact,
  showCounts = true,
  allowCustom = true,
  animated = true,
  size = 'md',
  variant = 'bubbly',
  className = ''
}: EmojiReactionsProps) {
  const [localReactions, setLocalReactions] = useState(reactions);
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmoji[]>([]);
  const [showCustomPicker, setShowCustomPicker] = useState(false);

  const sizeClasses = {
    sm: 'text-sm gap-1',
    md: 'text-base gap-2',
    lg: 'text-lg gap-3'
  };

  const variantClasses = {
    minimal: 'hover:bg-gray-700/50',
    bubbly: 'hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 hover:scale-110',
    neon: 'hover:shadow-lg hover:shadow-neon-400/50 hover:bg-neon-500/20',
    holographic: 'hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-purple-500/20 hover:shadow-lg'
  };

  const handleReaction = (emoji: string) => {
    // Create floating emoji animation
    if (animated) {
      const newFloatingEmoji: FloatingEmoji = {
        id: `${Date.now()}-${Math.random()}`,
        emoji,
        x: Math.random() * 100,
        y: 100,
        scale: 1,
        opacity: 1,
        duration: 2000
      };

      setFloatingEmojis(prev => [...prev, newFloatingEmoji]);

      // Remove floating emoji after animation
      setTimeout(() => {
        setFloatingEmojis(prev => prev.filter(fe => fe.id !== newFloatingEmoji.id));
      }, 2000);
    }

    // Update reaction count
    setLocalReactions(prev =>
      prev.map(reaction =>
        reaction.emoji === emoji
          ? { ...reaction, count: reaction.count + 1 }
          : reaction
      )
    );

    onReact?.(emoji);
  };

  const handleCustomEmoji = (emoji: string) => {
    const existingReaction = localReactions.find(r => r.emoji === emoji);
    
    if (existingReaction) {
      handleReaction(emoji);
    } else {
      // Add new custom reaction
      const newReaction: Reaction = {
        emoji,
        count: 1,
        label: 'Custom'
      };
      
      setLocalReactions(prev => [...prev, newReaction]);
      onReact?.(emoji);
    }
    
    setShowCustomPicker(false);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Main Reaction Bar */}
      <div className={`flex flex-wrap items-center ${sizeClasses[size]}`}>
        {localReactions.map((reaction, index) => (
          <Button
            key={`${reaction.emoji}-${index}`}
            variant="ghost"
            size="sm"
            onClick={() => handleReaction(reaction.emoji)}
            className={`
              px-3 py-2 rounded-full transition-all duration-300
              ${variantClasses[variant]}
              ${reaction.count > 0 ? 'bg-purple-500/20 border border-purple-500/30' : ''}
              hover:scale-105 active:scale-95
            `}
          >
            <span className="text-xl mr-1">{reaction.emoji}</span>
            {showCounts && reaction.count > 0 && (
              <Badge variant="secondary" className="ml-1 text-xs">
                {reaction.count > 999 ? `${Math.floor(reaction.count / 1000)}k` : reaction.count}
              </Badge>
            )}
          </Button>
        ))}

        {/* Custom Emoji Button */}
        {allowCustom && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowCustomPicker(!showCustomPicker)}
            className={`
              px-3 py-2 rounded-full transition-all duration-300
              ${variantClasses[variant]}
              hover:scale-105 active:scale-95
            `}
          >
            <span className="text-xl">➕</span>
          </Button>
        )}
      </div>

      {/* Custom Emoji Picker */}
      {showCustomPicker && (
        <div className="absolute top-full left-0 mt-2 p-3 bg-gray-900/95 backdrop-blur-md border border-purple-500/30 rounded-lg shadow-xl z-50">
          <div className="grid grid-cols-6 gap-2 max-w-xs">
            {genZEmojis.map((emoji, index) => (
              <button
                key={index}
                onClick={() => handleCustomEmoji(emoji)}
                className={`
                  text-xl p-2 rounded-lg transition-all duration-200
                  hover:bg-purple-500/20 hover:scale-110 active:scale-95
                  ${variantClasses[variant]}
                `}
              >
                {emoji}
              </button>
            ))}
          </div>
          
          <div className="mt-3 pt-2 border-t border-gray-700/50">
            <button
              onClick={() => setShowCustomPicker(false)}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Floating Emojis Animation */}
      {animated && floatingEmojis.length > 0 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {floatingEmojis.map((floatingEmoji) => (
            <div
              key={floatingEmoji.id}
              className="absolute text-2xl animate-bounce"
              style={{
                left: `${floatingEmoji.x}%`,
                bottom: `${floatingEmoji.y}%`,
                transform: `scale(${floatingEmoji.scale})`,
                opacity: floatingEmoji.opacity,
                animation: `float-up ${floatingEmoji.duration}ms ease-out forwards`
              }}
            >
              {floatingEmoji.emoji}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Reaction Stats Component
interface ReactionStatsProps {
  reactions: Reaction[];
  totalReactions?: number;
  className?: string;
}

export function ReactionStats({ reactions, totalReactions, className = '' }: ReactionStatsProps) {
  const total = totalReactions || reactions.reduce((sum, r) => sum + r.count, 0);
  const topReaction = reactions.reduce((top, current) => 
    current.count > top.count ? current : top
  );

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Total Reactions</span>
        <Badge variant="secondary">{total}</Badge>
      </div>
      
      {total > 0 && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Top Reaction</span>
          <div className="flex items-center gap-1">
            <span>{topReaction.emoji}</span>
            <Badge variant="secondary">{topReaction.count}</Badge>
          </div>
        </div>
      )}
    </div>
  );
}

// Reaction Leaderboard
interface ReactionLeaderboardProps {
  reactions: Reaction[];
  limit?: number;
  className?: string;
}

export function ReactionLeaderboard({ 
  reactions, 
  limit = 5, 
  className = '' 
}: ReactionLeaderboardProps) {
  const sortedReactions = [...reactions]
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
    .filter(r => r.count > 0);

  if (sortedReactions.length === 0) {
    return (
      <div className={`text-center text-muted-foreground ${className}`}>
        No reactions yet! Be the first to react 🚀
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <h3 className="text-sm font-semibold text-foreground mb-3">
        Top Reactions 🏆
      </h3>
      
      {sortedReactions.map((reaction, index) => (
        <div key={reaction.emoji} className="flex items-center justify-between p-2 rounded-lg bg-gray-800/30">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">#{index + 1}</span>
            <span className="text-lg">{reaction.emoji}</span>
            <span className="text-sm text-foreground">{reaction.label}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge 
              variant="secondary" 
              className={index === 0 ? 'bg-yellow-500/20 text-yellow-400' : ''}
            >
              {reaction.count}
            </Badge>
            {index === 0 && <span className="text-yellow-400">👑</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

// Quick React Bar (Compact Version)
interface QuickReactBarProps extends Omit<EmojiReactionsProps, 'reactions'> {
  quickReactions?: string[];
}

export function QuickReactBar({
  quickReactions = ['🔥', '💎', '🚀', '💯'],
  onReact,
  animated = true,
  className = ''
}: QuickReactBarProps) {
  const reactions = quickReactions.map(emoji => ({
    emoji,
    count: 0,
    label: ''
  }));

  return (
    <EmojiReactions
      reactions={reactions}
      onReact={onReact}
      showCounts={false}
      allowCustom={false}
      animated={animated}
      size="sm"
      variant="minimal"
      className={`flex items-center gap-1 ${className}`}
    />
  );
}

// Reaction Burst Effect (for special moments)
interface ReactionBurstProps {
  trigger?: boolean;
  emojis?: string[];
  duration?: number;
  className?: string;
}

export function ReactionBurst({
  trigger = false,
  emojis = ['🎉', '✨', '🚀', '💎', '🔥'],
  duration = 3000,
  className = ''
}: ReactionBurstProps) {
  const [burstEmojis, setBurstEmojis] = useState<FloatingEmoji[]>([]);

  useEffect(() => {
    if (trigger) {
      const newBurstEmojis: FloatingEmoji[] = [];
      
      for (let i = 0; i < 15; i++) {
        newBurstEmojis.push({
          id: `burst-${i}`,
          emoji: emojis[Math.floor(Math.random() * emojis.length)],
          x: 50 + (Math.random() - 0.5) * 100,
          y: 50 + (Math.random() - 0.5) * 100,
          scale: 0.5 + Math.random() * 1.5,
          opacity: 1,
          duration: duration + Math.random() * 1000
        });
      }
      
      setBurstEmojis(newBurstEmojis);
      
      setTimeout(() => setBurstEmojis([]), duration);
    }
  }, [trigger, emojis, duration]);

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {burstEmojis.map((emoji) => (
        <div
          key={emoji.id}
          className="absolute text-2xl animate-bounce"
          style={{
            left: `${emoji.x}%`,
            top: `${emoji.y}%`,
            transform: `scale(${emoji.scale})`,
            animationDuration: `${emoji.duration}ms`,
            animationDelay: `${Math.random() * 500}ms`
          }}
        >
          {emoji.emoji}
        </div>
      ))}
    </div>
  );
}