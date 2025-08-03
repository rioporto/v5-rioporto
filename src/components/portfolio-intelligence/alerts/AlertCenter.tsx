import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  Bell,
  BellOff,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Newspaper,
  Shield,
  Clock,
  Check,
  X
} from 'lucide-react';

interface Alert {
  id: string;
  type: 'price' | 'risk' | 'news' | 'technical' | 'portfolio';
  severity: 'info' | 'warning' | 'critical';
  title: string;
  message: string;
  timestamp: Date;
  asset?: string;
  actionRequired?: boolean;
  read?: boolean;
}

interface AlertCenterProps {
  className?: string;
  alerts?: Alert[];
}

const defaultAlerts: Alert[] = [
  {
    id: '1',
    type: 'price',
    severity: 'critical',
    title: 'BTC Price Alert Triggered',
    message: 'BTC has reached your target price of $45,000. Consider taking profits or adjusting stop-loss.',
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    asset: 'BTC',
    actionRequired: true
  },
  {
    id: '2',
    type: 'risk',
    severity: 'warning',
    title: 'Portfolio Risk Increasing',
    message: 'Volatility has increased 35% in the last 24 hours. Review your risk management strategy.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    actionRequired: false
  },
  {
    id: '3',
    type: 'news',
    severity: 'info',
    title: 'Major ETH Upgrade Announced',
    message: 'Ethereum developers announce next major upgrade scheduled for Q2 2024.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    asset: 'ETH'
  },
  {
    id: '4',
    type: 'technical',
    severity: 'warning',
    title: 'SOL Breaking Support',
    message: 'SOL has broken below key support at $95. Next support level at $90.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    asset: 'SOL',
    actionRequired: true
  },
  {
    id: '5',
    type: 'portfolio',
    severity: 'info',
    title: 'Weekly Performance Update',
    message: 'Your portfolio is up 12.5% this week. Best performer: ETH (+18.4%).',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
  }
];

export function AlertCenter({ 
  className,
  alerts = defaultAlerts
}: AlertCenterProps) {
  const [readAlerts, setReadAlerts] = React.useState<string[]>([]);
  const [dismissedAlerts, setDismissedAlerts] = React.useState<string[]>([]);
  const [mutedTypes, setMutedTypes] = React.useState<string[]>([]);

  const activeAlerts = alerts.filter(
    alert => !dismissedAlerts.includes(alert.id) && !mutedTypes.includes(alert.type)
  );

  const unreadCount = activeAlerts.filter(
    alert => !readAlerts.includes(alert.id)
  ).length;

  const getTypeIcon = (type: Alert['type']) => {
    switch (type) {
      case 'price': return <TrendingUp className="w-4 h-4" />;
      case 'risk': return <AlertTriangle className="w-4 h-4" />;
      case 'news': return <Newspaper className="w-4 h-4" />;
      case 'technical': return <TrendingDown className="w-4 h-4" />;
      case 'portfolio': return <Shield className="w-4 h-4" />;
    }
  };

  const getSeverityColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical': return 'text-red-500';
      case 'warning': return 'text-yellow-500';
      case 'info': return 'text-blue-500';
    }
  };

  const getSeverityBgColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/10 border-red-500/20';
      case 'warning': return 'bg-yellow-500/10 border-yellow-500/20';
      case 'info': return 'bg-blue-500/10 border-blue-500/20';
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const handleMarkAsRead = (id: string) => {
    if (!readAlerts.includes(id)) {
      setReadAlerts([...readAlerts, id]);
    }
  };

  const handleDismiss = (id: string) => {
    setDismissedAlerts([...dismissedAlerts, id]);
  };

  const toggleMuteType = (type: string) => {
    if (mutedTypes.includes(type)) {
      setMutedTypes(mutedTypes.filter(t => t !== type));
    } else {
      setMutedTypes([...mutedTypes, type]);
    }
  };

  return (
    <Card className={cn('p-6', className)}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          Alert Center
          {unreadCount > 0 && (
            <Badge variant="default" className="text-xs">
              {unreadCount} New
            </Badge>
          )}
        </h3>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setReadAlerts(activeAlerts.map(a => a.id))}
          >
            Mark All Read
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDismissedAlerts([])}
          >
            Show All
          </Button>
        </div>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        {['price', 'risk', 'news', 'technical', 'portfolio'].map((type) => (
          <Button
            key={type}
            variant="outline"
            size="sm"
            className={cn(
              'text-xs capitalize',
              mutedTypes.includes(type) && 'opacity-50'
            )}
            onClick={() => toggleMuteType(type)}
          >
            {mutedTypes.includes(type) ? <BellOff className="w-3 h-3 mr-1" /> : <Bell className="w-3 h-3 mr-1" />}
            {type}
          </Button>
        ))}
      </div>

      <div className="space-y-3">
        {activeAlerts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Bell className="w-12 h-12 mx-auto mb-3" />
            <p className="text-sm">No active alerts. You're all caught up!</p>
          </div>
        ) : (
          activeAlerts.map((alert) => (
            <div
              key={alert.id}
              className={cn(
                'p-4 rounded-lg border cursor-pointer transition-all',
                getSeverityBgColor(alert.severity),
                !readAlerts.includes(alert.id) && 'ring-2 ring-primary/20'
              )}
              onClick={() => handleMarkAsRead(alert.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className={cn('mt-0.5', getSeverityColor(alert.severity))}>
                    {getTypeIcon(alert.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{alert.title}</h4>
                      {alert.asset && (
                        <Badge variant="outline" className="text-xs">
                          {alert.asset}
                        </Badge>
                      )}
                      {alert.actionRequired && (
                        <Badge variant="default" className="text-xs">
                          Action Required
                        </Badge>
                      )}
                      {!readAlerts.includes(alert.id) && (
                        <div className="w-2 h-2 bg-primary rounded-full" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {alert.message}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{formatTimestamp(alert.timestamp)}</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDismiss(alert.id);
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {alert.actionRequired && (
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/50">
                  <Button size="sm" className="text-xs">
                    Take Action
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    View Details
                  </Button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
        <p className="text-xs text-muted-foreground">
          <Check className="w-3 h-3 inline mr-1" />
          Alert preferences can be customized in Settings → Notifications
        </p>
      </div>
    </Card>
  );
}