'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';

interface WAGMIProps {
  variant?: 'full' | 'banner' | 'compact' | 'motivational' | 'counter';
  animated?: boolean;
  showProgress?: boolean;
  customMessage?: string;
  onJoinCommunity?: () => void;
  className?: string;
}

interface CommunityStats {
  totalMembers: number;
  activeMembers: number;
  successStories: number;
  totalGains: string;
  diamondHands: number;
}

const wagmiMessages = [
  "We're all gonna make it! 🚀💎",
  "Diamond hands together strong! 💎🙌",
  "The future is bright, anon! ✨🌟",
  "Stack sats, stay humble! ₿💪",
  "HODL the line, fren! 📈🔥",
  "Building the future, one block at a time! 🏗️⚡",
  "Ngmi? Nah, WAGMI! 🚫➡️✅",
  "Community over competition! 🤝💜",
  "Stay based, stay bullish! 📊🎯",
  "Moon mission starts now! 🌙🚀"
];

const motivationalQuotes = [
  {
    text: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Anonymous Degen",
    emoji: "🌱"
  },
  {
    text: "Be fearful when others are greedy, be greedy when others are fearful.",
    author: "Warren Buffet (but make it crypto)",
    emoji: "😤"
  },
  {
    text: "Diamond hands are forged in the fire of FUD.",
    author: "Crypto Wisdom",
    emoji: "💎"
  },
  {
    text: "The market can remain irrational longer than you can remain solvent... unless you HODL.",
    author: "Keynes 2.0",
    emoji: "🤲"
  }
];

const milestones = [
  { target: 10000, label: "10K Strong", emoji: "💪", achieved: true },
  { target: 50000, label: "50K Army", emoji: "🚀", achieved: true },
  { target: 100000, label: "100K Diamond Hands", emoji: "💎", achieved: false, current: 73420 },
  { target: 500000, label: "500K Legends", emoji: "👑", achieved: false },
  { target: 1000000, label: "1M WAGMI", emoji: "🌙", achieved: false }
];

export function WAGMI({
  variant = 'full',
  animated = true,
  showProgress = true,
  customMessage,
  onJoinCommunity,
  className = ''
}: WAGMIProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [communityStats, setCommunityStats] = useState<CommunityStats>({
    totalMembers: 73420,
    activeMembers: 13370,
    successStories: 4269,
    totalGains: '$42.0M',
    diamondHands: 98.5
  });
  const [isAnimating, setIsAnimating] = useState(false);

  // Rotate messages
  useEffect(() => {
    if (animated && variant === 'banner') {
      const interval = setInterval(() => {
        setCurrentMessageIndex(prev => (prev + 1) % wagmiMessages.length);
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 500);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [animated, variant]);

  // Update stats periodically
  useEffect(() => {
    if (animated) {
      const interval = setInterval(() => {
        setCommunityStats(prev => ({
          ...prev,
          totalMembers: prev.totalMembers + Math.floor(Math.random() * 5),
          activeMembers: prev.activeMembers + Math.floor((Math.random() - 0.5) * 10)
        }));
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [animated]);

  if (variant === 'banner') {
    return (
      <div className={`
        bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 
        text-white py-3 px-6 text-center font-bold
        ${animated ? 'animate-gradient-x' : ''}
        ${className}
      `}>
        <div className={`text-lg ${isAnimating ? 'animate-pulse' : ''}`}>
          {customMessage || wagmiMessages[currentMessageIndex]}
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <Card className={`p-4 border-0 bg-crypto-gradient backdrop-blur-md ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`text-2xl ${animated ? 'animate-bounce' : ''}`}>
              🚀💎
            </div>
            <div>
              <div className="font-bold text-foreground">WAGMI</div>
              <div className="text-xs text-muted-foreground">
                {communityStats.totalMembers.toLocaleString()} believers
              </div>
            </div>
          </div>
          
          {onJoinCommunity && (
            <Button
              size="sm"
              onClick={onJoinCommunity}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0"
            >
              Join Us ✨
            </Button>
          )}
        </div>
      </Card>
    );
  }

  if (variant === 'motivational') {
    const [currentQuote, setCurrentQuote] = useState(0);

    useEffect(() => {
      if (animated) {
        const interval = setInterval(() => {
          setCurrentQuote(prev => (prev + 1) % motivationalQuotes.length);
        }, 8000);
        return () => clearInterval(interval);
      }
    }, [animated]);

    const quote = motivationalQuotes[currentQuote];

    return (
      <Card className={`p-6 border-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-md ${className}`}>
        <div className="text-center space-y-4">
          <div className={`text-4xl ${animated ? 'animate-pulse' : ''}`}>
            {quote.emoji}
          </div>
          
          <blockquote className="text-lg text-foreground font-medium italic">
            "{quote.text}"
          </blockquote>
          
          <div className="text-sm text-muted-foreground">
            — {quote.author}
          </div>
          
          <div className="pt-4">
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
              💎 WAGMI Energy 💎
            </Badge>
          </div>
        </div>
      </Card>
    );
  }

  if (variant === 'counter') {
    const nextMilestone = milestones.find(m => !m.achieved);
    const progress = nextMilestone?.current 
      ? (nextMilestone.current / nextMilestone.target) * 100 
      : 0;

    return (
      <Card className={`p-6 border-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-md ${className}`}>
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-xl font-bold text-foreground mb-2">
              Community Milestones 🎯
            </h3>
            <p className="text-sm text-muted-foreground">
              Achieving greatness together!
            </p>
          </div>

          {/* Achieved Milestones */}
          <div className="space-y-2">
            {milestones.filter(m => m.achieved).map((milestone, index) => (
              <div key={index} className="flex items-center gap-3 p-2 bg-green-500/10 rounded-lg">
                <div className="text-lg">{milestone.emoji}</div>
                <div className="flex-1">
                  <div className="font-semibold text-green-400">{milestone.label}</div>
                  <div className="text-xs text-muted-foreground">
                    {milestone.target.toLocaleString()} members
                  </div>
                </div>
                <div className="text-green-400">✅</div>
              </div>
            ))}
          </div>

          {/* Next Milestone */}
          {nextMilestone && (
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-purple-500/10 rounded-lg border border-purple-500/30">
                <div className="text-2xl">{nextMilestone.emoji}</div>
                <div className="flex-1">
                  <div className="font-bold text-foreground">{nextMilestone.label}</div>
                  <div className="text-sm text-muted-foreground">
                    {nextMilestone.current?.toLocaleString() || communityStats.totalMembers.toLocaleString()} / {nextMilestone.target.toLocaleString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-purple-400">
                    {Math.round(progress)}%
                  </div>
                </div>
              </div>
              
              {showProgress && (
                <Progress value={progress} className="h-3" />
              )}
            </div>
          )}
        </div>
      </Card>
    );
  }

  // Full variant (default)
  return (
    <Card className={`p-8 border-0 bg-gradient-to-br bg-crypto-gradient-multi backdrop-blur-md ${className}`}>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className={`text-6xl ${animated ? 'animate-bounce' : ''}`}>
            🚀💎🙌
          </div>
          
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            WAGMI
          </h2>
          
          <p className="text-xl text-muted-foreground">
            {customMessage || "We're All Gonna Make It!"}
          </p>
          
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-4 py-2 text-lg">
            ✨ Believe in the Mission ✨
          </Badge>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl font-bold text-purple-400">
              {communityStats.totalMembers.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Total Members</div>
          </div>
          
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl font-bold text-green-400">
              {communityStats.activeMembers.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Active Today</div>
          </div>
          
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl font-bold text-yellow-400">
              {communityStats.successStories.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Success Stories</div>
          </div>
          
          <div className="text-center p-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl font-bold text-cyan-400">
              {communityStats.totalGains}
            </div>
            <div className="text-sm text-muted-foreground">Community Gains</div>
          </div>
        </div>

        {/* Diamond Hands Meter */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">
              💎 Diamond Hands Strength
            </h3>
            <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-400/50">
              {communityStats.diamondHands}%
            </Badge>
          </div>
          
          <Progress value={communityStats.diamondHands} className="h-4" />
          
          <div className="text-center text-sm text-muted-foreground">
            Community holding strong through all market conditions! 💪
          </div>
        </div>

        {/* WAGMI Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Our Principles 📜</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span>💎</span>
                <span>Diamond hands over paper hands</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🤝</span>
                <span>Community over competition</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📚</span>
                <span>DYOR and stay informed</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🎯</span>
                <span>Long-term vision over quick gains</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Success Mindset 🧠</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span>🚀</span>
                <span>Think big, start small</span>
              </div>
              <div className="flex items-center gap-2">
                <span>⚡</span>
                <span>Adapt and overcome</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🌟</span>
                <span>Believe in yourself</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🎉</span>
                <span>Celebrate every win</span>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center space-y-4 pt-4 border-t border-gray-700/50">
          <p className="text-lg font-semibold text-foreground">
            Ready to join the movement? 🌊
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {onJoinCommunity && (
              <Button
                onClick={onJoinCommunity}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 px-8 py-3"
              >
                Join Community 🚀
              </Button>
            )}
            
            <Button
              variant="outline"
              className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 px-8 py-3"
            >
              Learn More 📚
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Together, we're unstoppable! 💪✨
          </p>
        </div>
      </div>
    </Card>
  );
}

// WAGMI Status Widget
interface WAGMIStatusProps {
  userLevel?: 'newbie' | 'hodler' | 'diamond' | 'legend';
  daysSinceJoin?: number;
  className?: string;
}

export function WAGMIStatus({
  userLevel = 'hodler',
  daysSinceJoin = 69,
  className = ''
}: WAGMIStatusProps) {
  const levels = {
    newbie: { emoji: '🆕', color: 'text-gray-400', label: 'New to WAGMI' },
    hodler: { emoji: '🤲', color: 'text-blue-400', label: 'HODL Believer' },
    diamond: { emoji: '💎', color: 'text-purple-400', label: 'Diamond Hands' },
    legend: { emoji: '👑', color: 'text-yellow-400', label: 'WAGMI Legend' }
  };

  const level = levels[userLevel];

  return (
    <Card className={`p-4 border-0 bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-md ${className}`}>
      <div className="flex items-center gap-3">
        <div className="text-2xl">{level.emoji}</div>
        <div className="flex-1">
          <div className={`font-bold ${level.color}`}>{level.label}</div>
          <div className="text-xs text-muted-foreground">
            {daysSinceJoin} days strong 💪
          </div>
        </div>
        <Badge className="bg-purple-500/20 text-purple-400 border-purple-400/50">
          WAGMI
        </Badge>
      </div>
    </Card>
  );
}

// Daily WAGMI Message
export function DailyWAGMI({ className = '' }: { className?: string }) {
  const [dailyMessage, setDailyMessage] = useState('');

  useEffect(() => {
    // Select message based on day of year to ensure consistency
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    setDailyMessage(wagmiMessages[dayOfYear % wagmiMessages.length]);
  }, []);

  return (
    <Card className={`p-4 border-0 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 backdrop-blur-md ${className}`}>
      <div className="text-center space-y-3">
        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-400/50">
          ☀️ Daily WAGMI
        </Badge>
        
        <div className="text-4xl">🌅</div>
        
        <p className="font-semibold text-foreground">
          {dailyMessage}
        </p>
        
        <div className="text-xs text-muted-foreground">
          Start your day with WAGMI energy! ⚡
        </div>
      </div>
    </Card>
  );
}