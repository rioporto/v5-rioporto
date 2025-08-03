import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  Activity,
  LogIn,
  LogOut,
  Key,
  Shield,
  AlertTriangle,
  UserCheck,
  Settings,
  Lock,
  Unlock,
  Filter,
  Download,
  Clock,
  MapPin
} from 'lucide-react';

interface ActivityEvent {
  id: string;
  type: 'login' | 'logout' | 'password_change' | 'settings_change' | '2fa_enabled' | '2fa_disabled' | 'suspicious_login' | 'api_key_created';
  title: string;
  description?: string;
  timestamp: Date;
  location?: {
    city: string;
    country: string;
    ip: string;
  };
  device?: string;
  severity: 'info' | 'warning' | 'critical';
  status: 'success' | 'failed';
}

interface SecurityActivityProps {
  className?: string;
  events?: ActivityEvent[];
  showFilters?: boolean;
}

const generateMockEvents = (): ActivityEvent[] => {
  const events: ActivityEvent[] = [
    {
      id: '1',
      type: 'login',
      title: 'Successful login',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      location: {
        city: 'São Paulo',
        country: 'Brazil',
        ip: '192.168.1.100'
      },
      device: 'Chrome on Windows',
      severity: 'info',
      status: 'success'
    },
    {
      id: '2',
      type: 'suspicious_login',
      title: 'Login from new location',
      description: 'First time login from this location',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      location: {
        city: 'Moscow',
        country: 'Russia',
        ip: '185.220.101.45'
      },
      device: 'Firefox on Linux',
      severity: 'warning',
      status: 'failed'
    },
    {
      id: '3',
      type: '2fa_enabled',
      title: 'Two-factor authentication enabled',
      description: 'Enhanced security activated',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      severity: 'info',
      status: 'success'
    },
    {
      id: '4',
      type: 'password_change',
      title: 'Password changed',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      severity: 'info',
      status: 'success'
    },
    {
      id: '5',
      type: 'api_key_created',
      title: 'API key created',
      description: 'New API key for trading bot',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      severity: 'info',
      status: 'success'
    },
    {
      id: '6',
      type: 'settings_change',
      title: 'Security settings updated',
      description: 'Session timeout changed to 30 minutes',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      severity: 'info',
      status: 'success'
    },
    {
      id: '7',
      type: 'logout',
      title: 'Manual logout',
      timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      location: {
        city: 'São Paulo',
        country: 'Brazil',
        ip: '192.168.1.100'
      },
      severity: 'info',
      status: 'success'
    }
  ];

  return events.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

export function SecurityActivity({ 
  className,
  events = generateMockEvents(),
  showFilters = true
}: SecurityActivityProps) {
  const [filterType, setFilterType] = React.useState<string>('all');
  const [filterSeverity, setFilterSeverity] = React.useState<string>('all');

  const getEventIcon = (type: ActivityEvent['type']) => {
    switch (type) {
      case 'login': return <LogIn className="w-4 h-4" />;
      case 'logout': return <LogOut className="w-4 h-4" />;
      case 'password_change': return <Key className="w-4 h-4" />;
      case 'settings_change': return <Settings className="w-4 h-4" />;
      case '2fa_enabled': return <Lock className="w-4 h-4" />;
      case '2fa_disabled': return <Unlock className="w-4 h-4" />;
      case 'suspicious_login': return <AlertTriangle className="w-4 h-4" />;
      case 'api_key_created': return <Shield className="w-4 h-4" />;
    }
  };

  const getSeverityColor = (severity: ActivityEvent['severity']) => {
    switch (severity) {
      case 'info': return 'text-blue-500';
      case 'warning': return 'text-yellow-500';
      case 'critical': return 'text-red-500';
    }
  };

  const getSeverityBgColor = (severity: ActivityEvent['severity']) => {
    switch (severity) {
      case 'info': return 'bg-blue-500/10';
      case 'warning': return 'bg-yellow-500/10';
      case 'critical': return 'bg-red-500/10';
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (60 * 60 * 1000));
    const days = Math.floor(hours / 24);

    if (days > 7) {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
      });
    }
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    
    const minutes = Math.floor(diff / (60 * 1000));
    return `${minutes}m ago`;
  };

  const filteredEvents = events.filter(event => {
    if (filterType !== 'all' && event.type !== filterType) return false;
    if (filterSeverity !== 'all' && event.severity !== filterSeverity) return false;
    return true;
  });

  const eventTypes = Array.from(new Set(events.map(e => e.type)));

  return (
    <Card className={cn('p-6', className)}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Security Activity Log
        </h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          {showFilters && (
            <Button variant="ghost" size="sm">
              <Filter className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {showFilters && (
        <div className="flex gap-2 mb-4">
          <select
            className="text-sm bg-background border border-border rounded px-3 py-1"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Activities</option>
            {eventTypes.map(type => (
              <option key={type} value={type}>
                {type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </option>
            ))}
          </select>
          <select
            className="text-sm bg-background border border-border rounded px-3 py-1"
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
          >
            <option value="all">All Severities</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="critical">Critical</option>
          </select>
        </div>
      )}

      <div className="space-y-4">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className={cn(
              'flex items-start gap-3 p-3 rounded-lg',
              getSeverityBgColor(event.severity)
            )}
          >
            <div className={cn(
              'p-2 rounded-lg bg-background',
              getSeverityColor(event.severity)
            )}>
              {getEventIcon(event.type)}
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{event.title}</h4>
                    {event.status === 'failed' && (
                      <Badge variant="error" className="text-xs">
                        Failed
                      </Badge>
                    )}
                  </div>
                  {event.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {event.description}
                    </p>
                  )}
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{formatTimestamp(event.timestamp)}</span>
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{event.location.city}, {event.location.country}</span>
                      </div>
                    )}
                    {event.device && (
                      <span>{event.device}</span>
                    )}
                  </div>
                </div>
                <Badge 
                  variant="outline" 
                  className={cn(
                    'text-xs capitalize',
                    event.severity === 'warning' && 'border-yellow-500/20 text-yellow-500',
                    event.severity === 'critical' && 'border-red-500/20 text-red-500'
                  )}
                >
                  {event.severity}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Activity className="w-12 h-12 mx-auto mb-3" />
          <p className="text-sm">No security events found</p>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span>Showing {filteredEvents.length} events</span>
        <Button variant="ghost" size="sm">
          Load More
        </Button>
      </div>
    </Card>
  );
}