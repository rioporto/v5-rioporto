import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { 
  Shield,
  Search,
  Filter,
  Download,
  Calendar,
  Clock,
  User,
  Activity,
  Globe,
  Key,
  Lock,
  Unlock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Mail,
  Smartphone,
  CreditCard,
  FileText,
  Settings,
  ChevronRight,
  Info,
  LogIn,
  LogOut,
  RefreshCw,
  X
} from 'lucide-react';

interface AuditEvent {
  id: string;
  timestamp: Date;
  category: 'auth' | 'account' | 'security' | 'transaction' | 'api' | 'admin';
  action: string;
  status: 'success' | 'failed' | 'warning';
  user: {
    id: string;
    email: string;
    name: string;
  };
  details: {
    ip: string;
    location?: string;
    device?: string;
    userAgent?: string;
    method?: string;
    resource?: string;
    changes?: Record<string, any>;
    error?: string;
  };
  risk: 'low' | 'medium' | 'high';
}

interface AuditLogProps {
  className?: string;
  events?: AuditEvent[];
  onEventClick?: (event: AuditEvent) => void;
  onExport?: () => void;
}

const generateMockEvents = (): AuditEvent[] => {
  const events: AuditEvent[] = [];
  const categories: AuditEvent['category'][] = ['auth', 'account', 'security', 'transaction', 'api', 'admin'];
  const actions = {
    auth: ['Login', 'Logout', 'Password Change', 'Password Reset', '2FA Enable', '2FA Disable'],
    account: ['Profile Update', 'Email Change', 'KYC Submit', 'KYC Approve', 'Account Delete'],
    security: ['API Key Create', 'API Key Delete', 'Session Terminate', 'IP Whitelist'],
    transaction: ['Buy Order', 'Sell Order', 'Withdrawal', 'Deposit', 'Transfer'],
    api: ['API Call', 'Rate Limit', 'API Error', 'Webhook'],
    admin: ['User Suspend', 'User Activate', 'Settings Change', 'System Update']
  };
  
  for (let i = 0; i < 50; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const categoryActions = actions[category];
    const action = categoryActions[Math.floor(Math.random() * categoryActions.length)];
    const status = Math.random() > 0.8 ? 'failed' : Math.random() > 0.95 ? 'warning' : 'success';
    
    events.push({
      id: `event-${i}`,
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      category,
      action,
      status,
      user: {
        id: `user-${Math.floor(Math.random() * 10)}`,
        email: `user${Math.floor(Math.random() * 10)}@example.com`,
        name: `User ${Math.floor(Math.random() * 10)}`
      },
      details: {
        ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        location: ['New York', 'London', 'Tokyo', 'Sydney'][Math.floor(Math.random() * 4)],
        device: ['Chrome on Windows', 'Safari on iOS', 'Chrome on Android'][Math.floor(Math.random() * 3)],
        userAgent: 'Mozilla/5.0...',
        method: category === 'api' ? ['GET', 'POST', 'PUT', 'DELETE'][Math.floor(Math.random() * 4)] : undefined,
        resource: category === 'api' ? `/api/v1/${['users', 'orders', 'portfolio'][Math.floor(Math.random() * 3)]}` : undefined,
        error: status === 'failed' ? 'Authentication failed' : undefined
      },
      risk: status === 'failed' ? 'high' : action.includes('Delete') || action.includes('Suspend') ? 'medium' : 'low'
    });
  }
  
  return events.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

export function AuditLog({ 
  className,
  events = generateMockEvents(),
  onEventClick,
  onExport
}: AuditLogProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterCategory, setFilterCategory] = React.useState<string>('all');
  const [filterStatus, setFilterStatus] = React.useState<string>('all');
  const [filterRisk, setFilterRisk] = React.useState<string>('all');
  const [filterDateRange, setFilterDateRange] = React.useState<string>('7d');
  const [selectedEvent, setSelectedEvent] = React.useState<AuditEvent | null>(null);

  const categories = [
    { value: 'all', label: 'All Categories', count: events.length },
    { value: 'auth', label: 'Authentication', icon: <Lock className="w-4 h-4" /> },
    { value: 'account', label: 'Account', icon: <User className="w-4 h-4" /> },
    { value: 'security', label: 'Security', icon: <Shield className="w-4 h-4" /> },
    { value: 'transaction', label: 'Transactions', icon: <CreditCard className="w-4 h-4" /> },
    { value: 'api', label: 'API', icon: <Key className="w-4 h-4" /> },
    { value: 'admin', label: 'Admin', icon: <Settings className="w-4 h-4" /> }
  ];

  const getCategoryIcon = (category: AuditEvent['category']) => {
    const icons = {
      auth: <Lock className="w-4 h-4" />,
      account: <User className="w-4 h-4" />,
      security: <Shield className="w-4 h-4" />,
      transaction: <CreditCard className="w-4 h-4" />,
      api: <Key className="w-4 h-4" />,
      admin: <Settings className="w-4 h-4" />
    };
    return icons[category];
  };

  const getActionIcon = (action: string) => {
    if (action.includes('Login')) return <LogIn className="w-4 h-4" />;
    if (action.includes('Logout')) return <LogOut className="w-4 h-4" />;
    if (action.includes('Create') || action.includes('Enable')) return <CheckCircle className="w-4 h-4" />;
    if (action.includes('Delete') || action.includes('Disable')) return <XCircle className="w-4 h-4" />;
    if (action.includes('Update') || action.includes('Change')) return <RefreshCw className="w-4 h-4" />;
    if (action.includes('Suspend')) return <AlertTriangle className="w-4 h-4" />;
    return <Activity className="w-4 h-4" />;
  };

  const getStatusBadge = (status: AuditEvent['status']) => {
    const variants = {
      success: 'bg-green-500/10 text-green-500 border-green-500/20',
      failed: 'bg-red-500/10 text-red-500 border-red-500/20',
      warning: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
    };
    
    return (
      <Badge variant="outline" className={cn('text-xs capitalize', variants[status])}>
        {status}
      </Badge>
    );
  };

  const getRiskBadge = (risk: AuditEvent['risk']) => {
    const variants = {
      low: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
      medium: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      high: 'bg-red-500/10 text-red-500 border-red-500/20'
    };
    
    return (
      <Badge variant="outline" className={cn('text-xs capitalize', variants[risk])}>
        {risk} risk
      </Badge>
    );
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInHours * 60);
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    }
  };

  const filteredEvents = events.filter(event => {
    if (searchQuery && !event.action.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !event.user.email.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !event.details.ip.includes(searchQuery)) {
      return false;
    }
    if (filterCategory !== 'all' && event.category !== filterCategory) return false;
    if (filterStatus !== 'all' && event.status !== filterStatus) return false;
    if (filterRisk !== 'all' && event.risk !== filterRisk) return false;
    
    // Date range filter
    const now = new Date();
    const eventAge = now.getTime() - event.timestamp.getTime();
    const dayInMs = 24 * 60 * 60 * 1000;
    
    switch (filterDateRange) {
      case '24h':
        if (eventAge > dayInMs) return false;
        break;
      case '7d':
        if (eventAge > 7 * dayInMs) return false;
        break;
      case '30d':
        if (eventAge > 30 * dayInMs) return false;
        break;
    }
    
    return true;
  });

  const stats = {
    total: filteredEvents.length,
    failed: filteredEvents.filter(e => e.status === 'failed').length,
    highRisk: filteredEvents.filter(e => e.risk === 'high').length,
    uniqueUsers: new Set(filteredEvents.map(e => e.user.id)).size
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Security Audit Log
        </h3>
        <Button variant="outline" onClick={onExport}>
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Events</p>
          <p className="text-2xl font-bold">{stats.total}</p>
          <p className="text-xs text-muted-foreground mt-1">In selected period</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Failed Actions</p>
          <p className="text-2xl font-bold text-red-500">{stats.failed}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {((stats.failed / stats.total) * 100).toFixed(1)}% of total
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">High Risk</p>
          <p className="text-2xl font-bold text-orange-500">{stats.highRisk}</p>
          <p className="text-xs text-muted-foreground mt-1">Requires attention</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Unique Users</p>
          <p className="text-2xl font-bold">{stats.uniqueUsers}</p>
          <p className="text-xs text-muted-foreground mt-1">Active in period</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by action, user, or IP..."
              className="pl-10"
            />
          </div>
          <select
            className="px-3 py-2 text-sm bg-background border border-border rounded-lg"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="auth">Authentication</option>
            <option value="account">Account</option>
            <option value="security">Security</option>
            <option value="transaction">Transactions</option>
            <option value="api">API</option>
            <option value="admin">Admin</option>
          </select>
          <select
            className="px-3 py-2 text-sm bg-background border border-border rounded-lg"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
            <option value="warning">Warning</option>
          </select>
          <select
            className="px-3 py-2 text-sm bg-background border border-border rounded-lg"
            value={filterRisk}
            onChange={(e) => setFilterRisk(e.target.value)}
          >
            <option value="all">All Risk</option>
            <option value="low">Low Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="high">High Risk</option>
          </select>
          <select
            className="px-3 py-2 text-sm bg-background border border-border rounded-lg"
            value={filterDateRange}
            onChange={(e) => setFilterDateRange(e.target.value)}
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="all">All time</option>
          </select>
        </div>
      </Card>

      {/* Events List */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-muted-foreground border-b border-border">
                <th className="text-left p-4">Time</th>
                <th className="text-left p-4">Category</th>
                <th className="text-left p-4">Action</th>
                <th className="text-left p-4">User</th>
                <th className="text-left p-4">IP/Location</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Risk</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredEvents.slice(0, 20).map((event) => (
                <tr
                  key={event.id}
                  className="border-b border-border/50 hover:bg-muted/50 cursor-pointer"
                  onClick={() => {
                    setSelectedEvent(event);
                    onEventClick?.(event);
                  }}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs">{formatDate(event.timestamp)}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(event.category)}
                      <span className="capitalize">{event.category}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {getActionIcon(event.action)}
                      <span className="font-medium">{event.action}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="font-medium">{event.user.name}</p>
                      <p className="text-xs text-muted-foreground">{event.user.email}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="font-mono text-xs">{event.details.ip}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        {event.details.location}
                      </p>
                    </div>
                  </td>
                  <td className="p-4">{getStatusBadge(event.status)}</td>
                  <td className="p-4">{getRiskBadge(event.risk)}</td>
                  <td className="p-4">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-border">
          <span className="text-sm text-muted-foreground">
            Showing 1-20 of {filteredEvents.length} events
          </span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </Card>

      {/* Event Details Modal */}
      {selectedEvent && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold">Event Details</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedEvent(null)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Event ID</p>
                <p className="font-mono">{selectedEvent.id}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Timestamp</p>
                <p>{selectedEvent.timestamp.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">User Agent</p>
                <p className="font-mono text-xs">{selectedEvent.details.userAgent}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Device</p>
                <p>{selectedEvent.details.device}</p>
              </div>
            </div>
            
            {selectedEvent.details.error && (
              <div className="p-3 bg-red-500/10 rounded-lg">
                <p className="text-sm font-medium text-red-500">Error Details</p>
                <p className="text-sm text-red-500/80 mt-1">{selectedEvent.details.error}</p>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}