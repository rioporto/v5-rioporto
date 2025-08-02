'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';

interface SocialProofData {
  totalUsers: number;
  activeUsers: number;
  recentActions: Array<{
    user: string;
    action: string;
    timestamp: Date;
    avatar?: string;
  }>;
  testimonials: Array<{
    user: string;
    text: string;
    rating: number;
    avatar?: string;
    verified: boolean;
  }>;
  achievements: Array<{
    title: string;
    count: number;
    icon: string;
  }>;
}

interface SocialProofProps {
  variant?: 'live-activity' | 'testimonials' | 'achievements' | 'stats' | 'fomo';
  data?: Partial<SocialProofData>;
  animated?: boolean;
  showAvatars?: boolean;
  genZMode?: boolean;
  className?: string;
}

const defaultData: SocialProofData = {
  totalUsers: 69420,
  activeUsers: 1337,
  recentActions: [
    { user: 'CryptoChad42', action: 'just bought 2.5 ETH worth of NFTs', timestamp: new Date(Date.now() - 30000), avatar: '🦍' },
    { user: 'DiamondHands💎', action: 'staked 10K PORTO tokens', timestamp: new Date(Date.now() - 45000), avatar: '💎' },
    { user: 'MoonBoy🚀', action: 'joined the DAO governance', timestamp: new Date(Date.now() - 60000), avatar: '🚀' },
    { user: 'CryptoQueen👑', action: 'minted rare NFT #4269', timestamp: new Date(Date.now() - 90000), avatar: '👑' },
    { user: 'HODLer4Life', action: 'completed KYC verification', timestamp: new Date(Date.now() - 120000), avatar: '🔐' }
  ],
  testimonials: [
    {
      user: 'DegenTrader',
      text: 'This platform is absolutely bussin! Made 10x on my first trade, no cap! 🚀💎',
      rating: 5,
      avatar: '🎯',
      verified: true
    },
    {
      user: 'NFTCollector',
      text: 'The UI is clean AF and the gas fees are basically non-existent. Chef\'s kiss! 💯',
      rating: 5,
      avatar: '🎨',
      verified: true
    },
    {
      user: 'CryptoNewbie',
      text: 'Finally a platform that doesn\'t make me feel like a boomer. Easy to use and mad gains! 📈',
      rating: 4,
      avatar: '🆕',
      verified: false
    }
  ],
  achievements: [
    { title: 'Total Trades', count: 420690, icon: '📊' },
    { title: 'NFTs Minted', count: 69420, icon: '🎨' },
    { title: 'Community Members', count: 133700, icon: '👥' },
    { title: 'Total Volume', count: 42069, icon: '💰' }
  ]
};

const genZActions = [
  'is absolutely sending it 🚀',
  'just hit different 💯',
  'understood the assignment ✅',
  'is not missing this opportunity 📈',
  'said bet and went all in 💎',
  'is living their best crypto life ✨',
  'just proved they have diamond hands 💎🙌',
  'is showing main character energy 👑'
];

export function SocialProof({
  variant = 'live-activity',
  data = {},
  animated = true,
  showAvatars = true,
  genZMode = true,
  className = ''
}: SocialProofProps) {
  const [currentData, setCurrentData] = useState<SocialProofData>({ ...defaultData, ...data });
  const [visibleActions, setVisibleActions] = useState<typeof currentData.recentActions>([]);

  useEffect(() => {
    if (animated && variant === 'live-activity') {
      // Simulate real-time activity
      const interval = setInterval(() => {
        const randomUser = `Anon${Math.floor(Math.random() * 9999)}`;
        const randomAction = genZMode 
          ? genZActions[Math.floor(Math.random() * genZActions.length)]
          : 'made a trade';
        const randomAvatar = ['🦍', '💎', '🚀', '👑', '🔥', '⚡', '🌙', '💯'][Math.floor(Math.random() * 8)];

        const newAction = {
          user: randomUser,
          action: randomAction,
          timestamp: new Date(),
          avatar: randomAvatar
        };

        setCurrentData(prev => ({
          ...prev,
          recentActions: [newAction, ...prev.recentActions.slice(0, 9)],
          activeUsers: prev.activeUsers + (Math.random() > 0.5 ? 1 : -1)
        }));
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [animated, variant, genZMode]);

  useEffect(() => {
    if (variant === 'live-activity') {
      setVisibleActions(currentData.recentActions.slice(0, 5));
    }
  }, [currentData.recentActions, variant]);

  const formatTimeAgo = (timestamp: Date) => {
    const seconds = Math.floor((Date.now() - timestamp.getTime()) / 1000);
    
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  if (variant === 'live-activity') {
    return (
      <Card className={`p-4 border-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-md ${className}`}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <span className="animate-pulse text-green-400">🟢</span>
              Live Activity
            </h3>
            <Badge className="bg-green-500/20 text-green-400 border-green-400/50 animate-pulse">
              {currentData.activeUsers.toLocaleString()} online
            </Badge>
          </div>

          <div className="space-y-3">
            {visibleActions.map((action, index) => (
              <div
                key={`${action.user}-${action.timestamp.getTime()}`}
                className={`
                  flex items-start gap-3 p-2 rounded-lg bg-gray-800/30 
                  ${index === 0 && animated ? 'animate-slide-in-left' : ''}
                  transition-all duration-300
                `}
              >
                {showAvatars && (
                  <div className="text-lg">{action.avatar}</div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-cyan-400 truncate">
                      {action.user}
                    </span>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {formatTimeAgo(action.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-foreground">
                    {action.action}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-2 border-t border-gray-700/50">
            <div className="text-xs text-muted-foreground">
              Join {currentData.totalUsers.toLocaleString()} other degens! 🚀
            </div>
          </div>
        </div>
      </Card>
    );
  }

  if (variant === 'testimonials') {
    return (
      <div className={`space-y-4 ${className}`}>
        <h3 className="text-xl font-bold text-foreground">What the Community Says 💬</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentData.testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="p-4 border-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-md"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  {showAvatars && (
                    <div className="text-lg">{testimonial.avatar}</div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-foreground">
                        {testimonial.user}
                      </span>
                      {testimonial.verified && (
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-400/50 text-xs">
                          ✓ Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-1 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`text-xs ${
                            i < testimonial.rating ? 'text-yellow-400' : 'text-gray-600'
                          }`}
                        >
                          ⭐
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  "{testimonial.text}"
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'achievements') {
    return (
      <div className={`space-y-4 ${className}`}>
        <h3 className="text-xl font-bold text-foreground">Platform Achievements 🏆</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {currentData.achievements.map((achievement, index) => (
            <Card
              key={index}
              className="p-4 border-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-md text-center"
            >
              <div className="space-y-2">
                <div className="text-3xl">{achievement.icon}</div>
                <div className="text-2xl font-bold text-yellow-400">
                  {achievement.count.toLocaleString()}
                  {achievement.title === 'Total Volume' && ' ETH'}
                </div>
                <div className="text-sm text-muted-foreground">
                  {achievement.title}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'fomo') {
    return (
      <Card className={`p-4 border-0 bg-gradient-to-br from-red-500/10 to-orange-500/10 backdrop-blur-md ${className}`}>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <span className="animate-pulse text-red-400">🔥</span>
              FOMO Alert
            </h3>
            <Badge className="bg-red-500/20 text-red-400 border-red-400/50 animate-pulse">
              HOT
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="text-sm text-foreground">
              <span className="font-bold text-yellow-400">
                {Math.floor(Math.random() * 50) + 10}
              </span>{' '}
              people are viewing this page right now! 👀
            </div>
            
            <div className="text-sm text-foreground">
              Last purchase: <span className="font-bold text-green-400">
                {Math.floor(Math.random() * 30) + 1} minutes ago
              </span> 💰
            </div>
            
            <div className="text-sm text-foreground">
              Only <span className="font-bold text-red-400">
                {Math.floor(Math.random() * 100) + 50}
              </span> spots left in this round! ⏰
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-gray-700/50">
            <div className="flex -space-x-2">
              {['🦍', '💎', '🚀', '👑', '🔥'].map((avatar, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full bg-gray-700 border-2 border-gray-900 flex items-center justify-center text-xs"
                >
                  {avatar}
                </div>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              and {(Math.floor(Math.random() * 1000) + 100).toLocaleString()} others joined today
            </span>
          </div>
        </div>
      </Card>
    );
  }

  // Stats variant (default)
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
      <Card className="p-4 border-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-md text-center">
        <div className="text-2xl mb-2">👥</div>
        <div className="text-2xl font-bold text-cyan-400">
          {currentData.totalUsers.toLocaleString()}
        </div>
        <div className="text-sm text-muted-foreground">Total Users</div>
      </Card>

      <Card className="p-4 border-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-md text-center">
        <div className="text-2xl mb-2">🟢</div>
        <div className="text-2xl font-bold text-green-400">
          {currentData.activeUsers.toLocaleString()}
        </div>
        <div className="text-sm text-muted-foreground">Online Now</div>
      </Card>

      <Card className="p-4 border-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-md text-center">
        <div className="text-2xl mb-2">⭐</div>
        <div className="text-2xl font-bold text-purple-400">4.9</div>
        <div className="text-sm text-muted-foreground">Rating</div>
      </Card>

      <Card className="p-4 border-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-md text-center">
        <div className="text-2xl mb-2">🏆</div>
        <div className="text-2xl font-bold text-yellow-400">99.9%</div>
        <div className="text-sm text-muted-foreground">Uptime</div>
      </Card>
    </div>
  );
}

// Trust Indicators Component
interface TrustIndicatorsProps {
  className?: string;
}

export function TrustIndicators({ className = '' }: TrustIndicatorsProps) {
  const indicators = [
    { icon: '🔒', text: 'SSL Secured', color: 'text-green-400' },
    { icon: '✅', text: 'KYC Verified', color: 'text-blue-400' },
    { icon: '🛡️', text: 'Audited Smart Contracts', color: 'text-purple-400' },
    { icon: '🏆', text: 'Industry Leader', color: 'text-yellow-400' }
  ];

  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`}>
      {indicators.map((indicator, index) => (
        <div key={index} className="flex items-center gap-2">
          <span className="text-lg">{indicator.icon}</span>
          <span className={`text-sm font-medium ${indicator.color}`}>
            {indicator.text}
          </span>
        </div>
      ))}
    </div>
  );
}

// Recent Activity Ticker
interface ActivityTickerProps {
  className?: string;
}

export function ActivityTicker({ className = '' }: ActivityTickerProps) {
  const [activities] = useState([
    '💎 DiamondHands bought 5 ETH',
    '🚀 MoonBoy staked 10K tokens',
    '👑 CryptoQueen minted rare NFT',
    '🔥 DegenTrader made 10x profit',
    '⚡ QuickTrade completed in 0.1s',
    '🌙 MoonChild joined DAO',
    '💰 WealthBuilder earned rewards',
    '🎯 PreciseTrader hit target'
  ]);

  return (
    <div className={`overflow-hidden bg-gray-900/50 border-y border-purple-500/30 ${className}`}>
      <div className="flex animate-scroll-x whitespace-nowrap py-2">
        {Array.from({ length: 3 }).map((_, repeatIndex) => (
          <div key={repeatIndex} className="flex gap-8 mr-8">
            {activities.map((activity, index) => (
              <span
                key={`${repeatIndex}-${index}`}
                className="text-sm text-muted-foreground"
              >
                {activity}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}