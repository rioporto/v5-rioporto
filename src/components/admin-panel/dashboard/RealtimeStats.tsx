import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  Activity,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Globe,
  Zap,
  Clock,
  ArrowUp,
  ArrowDown,
  Bitcoin,
  Wallet,
  ArrowRightLeft,
  Eye,
  MousePointer,
  ShoppingCart,
  UserPlus,
  LogIn,
  BarChart
} from 'lucide-react';

interface StatItem {
  label: string;
  value: string | number;
  change?: number;
  changeType?: 'increase' | 'decrease';
  icon?: React.ReactNode;
  subValue?: string;
}

interface LiveEvent {
  id: string;
  type: 'trade' | 'login' | 'signup' | 'deposit' | 'withdraw';
  user: string;
  value?: number;
  currency?: string;
  timestamp: Date;
  location?: string;
}

interface RealtimeStatsProps {
  className?: string;
}

const generateLiveEvents = (): LiveEvent[] => {
  const events: LiveEvent[] = [];
  const types: LiveEvent['type'][] = ['trade', 'login', 'signup', 'deposit', 'withdraw'];
  const users = ['john.doe', 'alice.smith', 'bob.jones', 'emma.wilson', 'mike.brown'];
  const locations = ['New York', 'London', 'Tokyo', 'Sydney', 'Paris', 'Berlin'];
  
  for (let i = 0; i < 20; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    events.push({
      id: `event-${i}`,
      type,
      user: users[Math.floor(Math.random() * users.length)] + Math.floor(Math.random() * 1000),
      value: type === 'trade' || type === 'deposit' || type === 'withdraw' ? 
        Math.random() * 10000 : undefined,
      currency: type === 'trade' || type === 'deposit' || type === 'withdraw' ? 
        Math.random() > 0.5 ? 'BTC' : 'USD' : undefined,
      timestamp: new Date(Date.now() - Math.random() * 60000), // Last minute
      location: locations[Math.floor(Math.random() * locations.length)]
    });
  }
  
  return events.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

export function RealtimeStats({ className }: RealtimeStatsProps) {
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const [liveEvents, setLiveEvents] = React.useState(generateLiveEvents());
  const [activeUsers, setActiveUsers] = React.useState(1842);
  const [tradingVolume, setTradingVolume] = React.useState(2458932);

  // Update time every second
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      
      // Simulate real-time updates
      if (Math.random() > 0.7) {
        setActiveUsers(prev => prev + Math.floor(Math.random() * 10) - 5);
        setTradingVolume(prev => prev + Math.floor(Math.random() * 10000));
        
        // Add new event occasionally
        if (Math.random() > 0.5) {
          const newEvent = generateLiveEvents()[0];
          setLiveEvents(prev => [newEvent, ...prev].slice(0, 20));
        }
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const stats: StatItem[] = [
    {
      label: 'Active Users',
      value: activeUsers.toLocaleString(),
      change: 3.2,
      changeType: 'increase',
      icon: <Users className="w-4 h-4" />,
      subValue: 'Right now'
    },
    {
      label: 'Trading Volume (24h)',
      value: `$${(tradingVolume / 1000000).toFixed(2)}M`,
      change: 12.5,
      changeType: 'increase',
      icon: <DollarSign className="w-4 h-4" />,
      subValue: `${(tradingVolume / 24 / 60).toFixed(0)}/min`
    },
    {
      label: 'Active Trades',
      value: '342',
      change: 5.8,
      changeType: 'increase',
      icon: <ArrowRightLeft className="w-4 h-4" />,
      subValue: 'Open orders'
    },
    {
      label: 'API Requests',
      value: '125k/min',
      change: 2.1,
      changeType: 'decrease',
      icon: <Zap className="w-4 h-4" />,
      subValue: '45ms avg'
    },
    {
      label: 'Page Views',
      value: '48.2k',
      change: 8.7,
      changeType: 'increase',
      icon: <Eye className="w-4 h-4" />,
      subValue: 'Last hour'
    },
    {
      label: 'New Signups',
      value: '127',
      change: 15.3,
      changeType: 'increase',
      icon: <UserPlus className="w-4 h-4" />,
      subValue: 'Today'
    }
  ];

  const getEventIcon = (type: LiveEvent['type']) => {
    const icons = {
      trade: <ArrowRightLeft className="w-3 h-3" />,
      login: <LogIn className="w-3 h-3" />,
      signup: <UserPlus className="w-3 h-3" />,
      deposit: <ArrowDown className="w-3 h-3" />,
      withdraw: <ArrowUp className="w-3 h-3" />
    };
    return icons[type];
  };

  const getEventColor = (type: LiveEvent['type']) => {
    const colors = {
      trade: 'bg-blue-500/10 text-blue-500',
      login: 'bg-gray-500/10 text-gray-500',
      signup: 'bg-green-500/10 text-green-500',
      deposit: 'bg-purple-500/10 text-purple-500',
      withdraw: 'bg-orange-500/10 text-orange-500'
    };
    return colors[type];
  };

  const formatTimestamp = (date: Date) => {
    const seconds = Math.floor((currentTime.getTime() - date.getTime()) / 1000);
    if (seconds < 10) return 'just now';
    if (seconds < 60) return `${seconds}s ago`;
    return `${Math.floor(seconds / 60)}m ago`;
  };

  const formatValue = (value?: number, currency?: string) => {
    if (!value) return '';
    if (currency === 'BTC') return `${value.toFixed(4)} BTC`;
    return `$${value.toLocaleString()}`;
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Realtime Activity
        </h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-muted-foreground">Live</span>
          <Badge variant="outline" className="text-xs">
            <Clock className="w-3 h-3 mr-1" />
            {currentTime.toLocaleTimeString()}
          </Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="p-1.5 rounded bg-muted">
                {stat.icon}
              </div>
              {stat.change && (
                <div className={cn(
                  'flex items-center gap-0.5 text-xs',
                  stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'
                )}>
                  {stat.changeType === 'increase' ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span>{stat.change}%</span>
                </div>
              )}
            </div>
            <p className="text-xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            {stat.subValue && (
              <p className="text-xs text-muted-foreground mt-0.5">{stat.subValue}</p>
            )}
          </Card>
        ))}
      </div>

      {/* Live Events Feed */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-base font-semibold">Live Events</h4>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {liveEvents.length} events/min
            </Badge>
            <Button variant="ghost" size="sm" className="text-xs">
              Pause
            </Button>
          </div>
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {liveEvents.map((event) => (
            <div
              key={event.id}
              className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg animate-in slide-in-from-top-1 duration-300"
            >
              <div className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center',
                getEventColor(event.type)
              )}>
                {getEventIcon(event.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{event.user}</span>
                  <span className="text-xs text-muted-foreground capitalize">
                    {event.type === 'trade' ? 'traded' : event.type}
                  </span>
                  {event.value && (
                    <span className="text-sm font-medium">
                      {formatValue(event.value, event.currency)}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
                  <Globe className="w-3 h-3" />
                  <span>{event.location}</span>
                  <span>•</span>
                  <span>{formatTimestamp(event.timestamp)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Regional Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h4 className="text-base font-semibold mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Activity by Region
          </h4>
          <div className="space-y-3">
            {[
              { region: 'North America', users: 542, percentage: 35, color: 'bg-blue-500' },
              { region: 'Europe', users: 423, percentage: 28, color: 'bg-green-500' },
              { region: 'Asia Pacific', users: 389, percentage: 25, color: 'bg-purple-500' },
              { region: 'South America', users: 156, percentage: 10, color: 'bg-orange-500' },
              { region: 'Africa', users: 32, percentage: 2, color: 'bg-red-500' }
            ].map((region) => (
              <div key={region.region}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{region.region}</span>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">{region.users} users</span>
                    <span className="font-medium">{region.percentage}%</span>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={cn('h-2 rounded-full transition-all', region.color)}
                    style={{ width: `${region.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h4 className="text-base font-semibold mb-4 flex items-center gap-2">
            <BarChart className="w-4 h-4" />
            Popular Actions
          </h4>
          <div className="space-y-3">
            {[
              { action: 'View Market', count: 1234, icon: <Eye className="w-4 h-4" /> },
              { action: 'Place Order', count: 892, icon: <ShoppingCart className="w-4 h-4" /> },
              { action: 'Check Portfolio', count: 756, icon: <Wallet className="w-4 h-4" /> },
              { action: 'View Charts', count: 634, icon: <BarChart className="w-4 h-4" /> },
              { action: 'Deposit Funds', count: 234, icon: <ArrowDown className="w-4 h-4" /> }
            ].map((action, index) => (
              <div key={action.action} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">#{index + 1}</span>
                  <div className="p-1.5 rounded bg-muted">
                    {action.icon}
                  </div>
                  <span className="text-sm font-medium">{action.action}</span>
                </div>
                <span className="text-sm text-muted-foreground">{action.count}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}