import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  MapPin,
  Clock,
  MoreVertical,
  LogOut,
  Shield,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { Dropdown, DropdownContent, DropdownItem } from '@/components/ui/Dropdown';

interface Session {
  id: string;
  device: {
    type: 'desktop' | 'mobile' | 'tablet';
    name: string;
    os: string;
    browser: string;
  };
  location: {
    country: string;
    city: string;
    ip: string;
  };
  status: 'active' | 'idle' | 'suspicious';
  isCurrent: boolean;
  lastActive: Date;
  createdAt: Date;
}

interface ActiveSessionsProps {
  className?: string;
  sessions?: Session[];
  onTerminate?: (sessionId: string) => void;
  onTerminateAll?: () => void;
}

const defaultSessions: Session[] = [
  {
    id: '1',
    device: {
      type: 'desktop',
      name: 'Windows PC',
      os: 'Windows 11',
      browser: 'Chrome 120.0'
    },
    location: {
      country: 'Brazil',
      city: 'São Paulo',
      ip: '192.168.1.100'
    },
    status: 'active',
    isCurrent: true,
    lastActive: new Date(),
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
  },
  {
    id: '2',
    device: {
      type: 'mobile',
      name: 'iPhone 15 Pro',
      os: 'iOS 17.2',
      browser: 'Safari'
    },
    location: {
      country: 'Brazil',
      city: 'Rio de Janeiro',
      ip: '192.168.1.101'
    },
    status: 'idle',
    isCurrent: false,
    lastActive: new Date(Date.now() - 30 * 60 * 1000),
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
  },
  {
    id: '3',
    device: {
      type: 'tablet',
      name: 'iPad Pro',
      os: 'iPadOS 17.2',
      browser: 'Safari'
    },
    location: {
      country: 'Brazil',
      city: 'São Paulo',
      ip: '192.168.1.102'
    },
    status: 'active',
    isCurrent: false,
    lastActive: new Date(Date.now() - 5 * 60 * 1000),
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  },
  {
    id: '4',
    device: {
      type: 'desktop',
      name: 'Unknown Device',
      os: 'Linux',
      browser: 'Firefox 121.0'
    },
    location: {
      country: 'Russia',
      city: 'Moscow',
      ip: '185.220.101.45'
    },
    status: 'suspicious',
    isCurrent: false,
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000)
  }
];

export function ActiveSessions({ 
  className,
  sessions = defaultSessions,
  onTerminate,
  onTerminateAll
}: ActiveSessionsProps) {
  const getDeviceIcon = (type: Session['device']['type']) => {
    switch (type) {
      case 'desktop': return <Monitor className="w-5 h-5" />;
      case 'mobile': return <Smartphone className="w-5 h-5" />;
      case 'tablet': return <Tablet className="w-5 h-5" />;
    }
  };

  const getStatusBadge = (status: Session['status'], isCurrent: boolean) => {
    if (isCurrent) {
      return (
        <Badge variant="default" className="text-xs">
          <CheckCircle className="w-3 h-3 mr-1" />
          Current Session
        </Badge>
      );
    }

    const variants = {
      active: 'bg-green-500/10 text-green-500 border-green-500/20',
      idle: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      suspicious: 'bg-red-500/10 text-red-500 border-red-500/20'
    };

    const labels = {
      active: 'Active',
      idle: 'Idle',
      suspicious: 'Suspicious'
    };

    return (
      <Badge variant="outline" className={cn('text-xs capitalize', variants[status])}>
        {status === 'suspicious' && <AlertTriangle className="w-3 h-3 mr-1" />}
        {labels[status]}
      </Badge>
    );
  };

  const formatTimeAgo = (date: Date) => {
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

  const suspiciousSessions = sessions.filter(s => s.status === 'suspicious');
  const activeSessions = sessions.filter(s => !s.isCurrent);

  return (
    <Card className={cn('p-6', className)}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Active Sessions
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={onTerminateAll}
          disabled={activeSessions.length === 0}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out All
        </Button>
      </div>

      {suspiciousSessions.length > 0 && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-red-500">Suspicious Activity Detected</p>
              <p className="text-sm text-muted-foreground mt-1">
                {suspiciousSessions.length} session{suspiciousSessions.length > 1 ? 's' : ''} from unusual locations. 
                Review and terminate if not recognized.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {sessions.map((session) => (
          <div
            key={session.id}
            className={cn(
              'p-4 border rounded-lg',
              session.status === 'suspicious' 
                ? 'border-red-500/20 bg-red-500/5' 
                : 'border-border'
            )}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className={cn(
                  'p-2 rounded-lg',
                  session.status === 'suspicious' 
                    ? 'bg-red-500/10 text-red-500' 
                    : 'bg-muted text-muted-foreground'
                )}>
                  {getDeviceIcon(session.device.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{session.device.name}</h4>
                    {getStatusBadge(session.status, session.isCurrent)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {session.device.os} • {session.device.browser}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{session.location.city}, {session.location.country}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Globe className="w-3 h-3" />
                      <span>{session.location.ip}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>Active {formatTimeAgo(session.lastActive)}</span>
                    </div>
                  </div>
                </div>
              </div>
              {!session.isCurrent && (
                <Dropdown
                  trigger={
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  }
                >
                  <DropdownContent>
                    <DropdownItem onClick={() => onTerminate?.(session.id)}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Terminate Session
                    </DropdownItem>
                    <DropdownItem>
                      <Shield className="w-4 h-4 mr-2" />
                      View Details
                    </DropdownItem>
                  </DropdownContent>
                </Dropdown>
              )}
            </div>

            {session.status === 'suspicious' && (
              <div className="mt-3 pt-3 border-t border-red-500/20">
                <Button
                  variant="error"
                  size="sm"
                  className="w-full"
                  onClick={() => onTerminate?.(session.id)}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Terminate This Session
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-3 bg-muted/50 rounded-lg">
        <p className="text-xs text-muted-foreground">
          Sessions are automatically terminated after 30 days of inactivity
        </p>
      </div>
    </Card>
  );
}