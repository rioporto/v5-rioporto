'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';

interface VibeMetrics {
  overall: number;
  bullish: number;
  bearish: number;
  neutral: number;
  fomo: number;
  diamond: number;
  paper: number;
}

interface VibeData {
  currentVibe: string;
  vibeScore: number;
  metrics: VibeMetrics;
  sentiment: 'ultra-bullish' | 'bullish' | 'neutral' | 'bearish' | 'ultra-bearish';
  lastUpdate: Date;
  participants: number;
}

interface VibeCheckProps {
  variant?: 'full' | 'compact' | 'meter' | 'emoji-only';
  interactive?: boolean;
  realtime?: boolean;
  showParticipants?: boolean;
  onVibeSubmit?: (vibe: string) => void;
  className?: string;
}

const vibeEmojis = {
  'ultra-bullish': { emoji: '🚀💎', color: 'text-green-400', label: 'Ultra Bullish', description: 'Diamond hands to the moon!' },
  'bullish': { emoji: '📈✨', color: 'text-green-300', label: 'Bullish', description: 'Feeling optimistic fren' },
  'neutral': { emoji: '😐🤷‍♂️', color: 'text-gray-400', label: 'Neutral', description: 'Just chillin\'' },
  'bearish': { emoji: '📉😬', color: 'text-red-300', label: 'Bearish', description: 'Kinda sus ngl' },
  'ultra-bearish': { emoji: '💀📉', color: 'text-red-400', label: 'Ultra Bearish', description: 'Pain and suffering' }
};

const quickVibes = [
  { emoji: '🚀', label: 'To the Moon', value: 95 },
  { emoji: '💎', label: 'Diamond Hands', value: 90 },
  { emoji: '🔥', label: 'This is Fire', value: 85 },
  { emoji: '💯', label: 'Absolutely Sending', value: 80 },
  { emoji: '📈', label: 'Number Go Up', value: 75 },
  { emoji: '⚡', label: 'Based Energy', value: 70 },
  { emoji: '👀', label: 'Sus but Watching', value: 40 },
  { emoji: '😬', label: 'Kinda Cringe', value: 30 },
  { emoji: '🤡', label: 'Clown Market', value: 20 },
  { emoji: '💀', label: 'Dead Inside', value: 10 }
];

export function VibeCheck({
  variant = 'full',
  interactive = true,
  realtime = true,
  showParticipants = true,
  onVibeSubmit,
  className = ''
}: VibeCheckProps) {
  const [vibeData, setVibeData] = useState<VibeData>({
    currentVibe: 'Community is feeling bullish! 🚀',
    vibeScore: 78,
    metrics: {
      overall: 78,
      bullish: 65,
      bearish: 20,
      neutral: 15,
      fomo: 42,
      diamond: 88,
      paper: 12
    },
    sentiment: 'bullish',
    lastUpdate: new Date(),
    participants: 1337
  });

  const [userVibe, setUserVibe] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Simulate real-time updates
  useEffect(() => {
    if (!realtime) return;

    const interval = setInterval(() => {
      setVibeData(prev => {
        const fluctuation = (Math.random() - 0.5) * 10;
        const newScore = Math.max(0, Math.min(100, prev.vibeScore + fluctuation));
        
        let newSentiment: VibeData['sentiment'];
        if (newScore >= 80) newSentiment = 'ultra-bullish';
        else if (newScore >= 60) newSentiment = 'bullish';
        else if (newScore >= 40) newSentiment = 'neutral';
        else if (newScore >= 20) newSentiment = 'bearish';
        else newSentiment = 'ultra-bearish';

        return {
          ...prev,
          vibeScore: newScore,
          sentiment: newSentiment,
          lastUpdate: new Date(),
          participants: prev.participants + Math.floor((Math.random() - 0.5) * 5),
          metrics: {
            ...prev.metrics,
            overall: newScore,
            bullish: Math.max(0, Math.min(100, prev.metrics.bullish + (Math.random() - 0.5) * 8)),
            bearish: Math.max(0, Math.min(100, prev.metrics.bearish + (Math.random() - 0.5) * 8)),
            fomo: Math.max(0, Math.min(100, prev.metrics.fomo + (Math.random() - 0.5) * 12))
          }
        };
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [realtime]);

  const handleVibeSubmit = (vibe: string, value: number) => {
    setUserVibe(vibe);
    setIsAnimating(true);
    
    // Update vibe score based on user input
    setVibeData(prev => ({
      ...prev,
      vibeScore: Math.round((prev.vibeScore + value) / 2),
      participants: prev.participants + 1
    }));

    onVibeSubmit?.(vibe);

    setTimeout(() => setIsAnimating(false), 1000);
  };

  const currentVibeConfig = vibeEmojis[vibeData.sentiment];

  if (variant === 'emoji-only') {
    return (
      <div className={`text-center ${className}`}>
        <div className={`text-4xl mb-2 ${isAnimating ? 'animate-bounce' : ''}`}>
          {currentVibeConfig.emoji}
        </div>
        <div className={`text-sm font-semibold ${currentVibeConfig.color}`}>
          {currentVibeConfig.label}
        </div>
      </div>
    );
  }

  if (variant === 'meter') {
    return (
      <Card className={`p-4 border-0 bg-crypto-gradient backdrop-blur-md ${className}`}>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">Vibe Check</span>
            <div className={`text-xl ${isAnimating ? 'animate-pulse' : ''}`}>
              {currentVibeConfig.emoji}
            </div>
          </div>
          
          <div className="space-y-2">
            <Progress 
              value={vibeData.vibeScore} 
              className="h-3"
            />
            <div className="flex justify-between text-xs">
              <span className="text-red-400">💀 Bear</span>
              <span className={`font-bold ${currentVibeConfig.color}`}>
                {vibeData.vibeScore}%
              </span>
              <span className="text-green-400">Bull 🚀</span>
            </div>
          </div>

          {showParticipants && (
            <div className="text-xs text-muted-foreground text-center">
              {vibeData.participants.toLocaleString()} degens checked in
            </div>
          )}
        </div>
      </Card>
    );
  }

  if (variant === 'compact') {
    return (
      <Card className={`p-4 border-0 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-md ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`text-2xl ${isAnimating ? 'animate-bounce' : ''}`}>
              {currentVibeConfig.emoji}
            </div>
            <div>
              <div className={`font-bold ${currentVibeConfig.color}`}>
                {currentVibeConfig.label}
              </div>
              <div className="text-xs text-muted-foreground">
                {vibeData.vibeScore}% bullish
              </div>
            </div>
          </div>
          
          {interactive && (
            <Button
              size="sm"
              variant="outline"
              className="hover:bg-purple-500/20"
            >
              Update Vibe ✨
            </Button>
          )}
        </div>
      </Card>
    );
  }

  // Full variant (default)
  return (
    <Card className={`p-6 border-0 bg-crypto-gradient backdrop-blur-md ${className}`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Community Vibe Check ✨
          </h3>
          <p className="text-sm text-muted-foreground">
            How's everyone feeling about the market? 📊
          </p>
        </div>

        {/* Current Vibe Display */}
        <div className="text-center space-y-4">
          <div className={`text-6xl ${isAnimating ? 'animate-bounce' : ''}`}>
            {currentVibeConfig.emoji}
          </div>
          
          <div className="space-y-2">
            <div className={`text-2xl font-bold ${currentVibeConfig.color}`}>
              {currentVibeConfig.label}
            </div>
            <div className="text-muted-foreground">
              {currentVibeConfig.description}
            </div>
            <Badge className={`${currentVibeConfig.color} bg-current/20 border-current/50`}>
              {vibeData.vibeScore}% Vibe Score
            </Badge>
          </div>
        </div>

        {/* Vibe Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Bullish</span>
              <span className="text-green-400">{vibeData.metrics.bullish}%</span>
            </div>
            <Progress value={vibeData.metrics.bullish} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Bearish</span>
              <span className="text-red-400">{vibeData.metrics.bearish}%</span>
            </div>
            <Progress value={vibeData.metrics.bearish} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">FOMO Level</span>
              <span className="text-yellow-400">{vibeData.metrics.fomo}%</span>
            </div>
            <Progress value={vibeData.metrics.fomo} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">💎 vs 🧻</span>
              <span className="text-cyan-400">{vibeData.metrics.diamond}% 💎</span>
            </div>
            <Progress value={vibeData.metrics.diamond} className="h-2" />
          </div>
        </div>

        {/* Interactive Vibe Selection */}
        {interactive && (
          <div className="space-y-4">
            <div className="text-center">
              <h4 className="text-lg font-semibold text-foreground mb-3">
                What's your vibe? 🎯
              </h4>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {quickVibes.map((vibe, index) => (
                <Button
                  key={index}
                  variant={userVibe === vibe.label ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => handleVibeSubmit(vibe.label, vibe.value)}
                  className={`
                    p-3 h-auto flex flex-col gap-1
                    ${userVibe === vibe.label 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0' 
                      : 'hover:bg-purple-500/20'
                    }
                  `}
                >
                  <span className="text-lg">{vibe.emoji}</span>
                  <span className="text-xs">{vibe.label}</span>
                </Button>
              ))}
            </div>

            {userVibe && (
              <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="text-green-400 font-semibold">
                  Thanks for the vibe check! ✅
                </div>
                <div className="text-xs text-muted-foreground">
                  Your energy: {userVibe}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Stats Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
          {showParticipants && (
            <div className="text-sm text-muted-foreground">
              👥 {vibeData.participants.toLocaleString()} participants
            </div>
          )}
          
          <div className="text-xs text-muted-foreground">
            Last updated: {vibeData.lastUpdate.toLocaleTimeString()}
          </div>
        </div>
      </div>
    </Card>
  );
}

// Vibe History Chart Component
interface VibeHistoryProps {
  data?: Array<{ time: string; vibe: number }>;
  className?: string;
}

export function VibeHistory({ data = [], className = '' }: VibeHistoryProps) {
  // Generate mock data if none provided
  const mockData = data.length > 0 ? data : Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    vibe: 50 + Math.random() * 40 + Math.sin(i / 4) * 20
  }));

  return (
    <Card className={`p-4 border-0 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-md ${className}`}>
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-foreground">24h Vibe Chart 📈</h4>
        
        <div className="h-32 flex items-end gap-1">
          {mockData.map((point, index) => (
            <div
              key={index}
              className="flex-1 bg-gradient-to-t from-purple-500/50 to-pink-500/50 rounded-t min-h-1"
              style={{ height: `${point.vibe}%` }}
              title={`${point.time}: ${Math.round(point.vibe)}%`}
            />
          ))}
        </div>
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>24h ago</span>
          <span>Now</span>
        </div>
      </div>
    </Card>
  );
}

// Vibe Notifications
interface VibeNotificationProps {
  type: 'vibe-shift' | 'new-high' | 'new-low' | 'milestone';
  message: string;
  onDismiss?: () => void;
  className?: string;
}

export function VibeNotification({
  type,
  message,
  onDismiss,
  className = ''
}: VibeNotificationProps) {
  const typeConfig = {
    'vibe-shift': { emoji: '🔄', color: 'border-blue-500/50 bg-blue-500/10' },
    'new-high': { emoji: '🚀', color: 'border-green-500/50 bg-green-500/10' },
    'new-low': { emoji: '💀', color: 'border-red-500/50 bg-red-500/10' },
    'milestone': { emoji: '🎉', color: 'border-yellow-500/50 bg-yellow-500/10' }
  };

  const config = typeConfig[type];

  return (
    <div className={`
      flex items-center gap-3 p-3 rounded-lg border backdrop-blur-md
      ${config.color} ${className}
    `}>
      <div className="text-xl">{config.emoji}</div>
      <div className="flex-1 text-sm text-foreground">{message}</div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-muted-foreground hover:text-foreground"
        >
          ✕
        </button>
      )}
    </div>
  );
}