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
  Settings,
  Database,
  Key,
  Lock,
  Unlock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  FileText,
  CreditCard,
  UserCog,
  ChevronRight,
  Info,
  RefreshCw,
  Trash2,
  Edit,
  Plus,
  Minus,
  X
} from 'lucide-react';

interface AdminAction {
  id: string;
  timestamp: Date;
  admin: {
    id: string;
    name: string;
    email: string;
    role: 'super_admin' | 'admin' | 'moderator';
  };
  category: 'user_management' | 'system_config' | 'security' | 'financial' | 'content' | 'access_control';
  action: string;
  target?: {
    type: string;
    id: string;
    name: string;
  };
  details: {
    changes?: Record<string, { old: any; new: any }>;
    reason?: string;
    ip: string;
    userAgent: string;
    duration?: number;
  };
  impact: 'low' | 'medium' | 'high' | 'critical';
  status: 'success' | 'failed' | 'pending';
}

interface AdminAuditLogProps {
  className?: string;
  actions?: AdminAction[];
  onActionClick?: (action: AdminAction) => void;
  onExport?: () => void;
}

const generateMockActions = (): AdminAction[] => {
  const actions: AdminAction[] = [];
  const categories: AdminAction['category'][] = ['user_management', 'system_config', 'security', 'financial', 'content', 'access_control'];
  
  const actionsByCategory = {
    user_management: [
      'Suspended User Account',
      'Activated User Account',
      'Updated KYC Level',
      'Reset User Password',
      'Deleted User Account',
      'Merged Duplicate Accounts'
    ],
    system_config: [
      'Updated Trading Fees',
      'Modified System Settings',
      'Changed Maintenance Mode',
      'Updated API Rate Limits',
      'Modified Email Templates',
      'Changed Deployment Config'
    ],
    security: [
      'Updated Security Rules',
      'Added IP to Whitelist',
      'Removed API Key',
      'Changed 2FA Requirements',
      'Updated Password Policy',
      'Rotated Encryption Keys'
    ],
    financial: [
      'Approved Withdrawal',
      'Rejected Withdrawal',
      'Adjusted User Balance',
      'Refunded Transaction',
      'Updated Fee Structure',
      'Froze Account Funds'
    ],
    content: [
      'Deleted Blog Post',
      'Updated Course Content',
      'Removed User Comment',
      'Published Announcement',
      'Updated Terms of Service',
      'Modified FAQ Content'
    ],
    access_control: [
      'Granted Admin Access',
      'Revoked Admin Access',
      'Updated Role Permissions',
      'Created New Role',
      'Modified Access Rules',
      'Reset Admin Password'
    ]
  };
  
  const admins = [
    { id: 'admin-1', name: 'John Admin', email: 'john@rioporto.com', role: 'super_admin' as const },
    { id: 'admin-2', name: 'Sarah Moderator', email: 'sarah@rioporto.com', role: 'admin' as const },
    { id: 'admin-3', name: 'Mike Support', email: 'mike@rioporto.com', role: 'moderator' as const }
  ];
  
  for (let i = 0; i < 100; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const categoryActions = actionsByCategory[category];
    const action = categoryActions[Math.floor(Math.random() * categoryActions.length)];
    const admin = admins[Math.floor(Math.random() * admins.length)];
    const status = Math.random() > 0.9 ? 'failed' : Math.random() > 0.95 ? 'pending' : 'success';
    
    actions.push({
      id: `action-${i}`,
      timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      admin,
      category,
      action,
      target: Math.random() > 0.3 ? {
        type: ['User', 'System', 'Config', 'Content'][Math.floor(Math.random() * 4)],
        id: `target-${Math.floor(Math.random() * 1000)}`,
        name: `Target ${Math.floor(Math.random() * 1000)}`
      } : undefined,
      details: {
        changes: Math.random() > 0.5 ? {
          status: { old: 'active', new: 'suspended' },
          kycLevel: { old: 1, new: 2 }
        } : undefined,
        reason: Math.random() > 0.5 ? 'User request' : undefined,
        ip: `10.0.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        userAgent: 'Mozilla/5.0...',
        duration: Math.floor(Math.random() * 1000)
      },
      impact: action.includes('Delete') || action.includes('Revoke') || action.includes('Suspend') 
        ? 'high' 
        : action.includes('Update') || action.includes('Modify') 
        ? 'medium' 
        : 'low',
      status
    });
  }
  
  return actions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

export function AdminAuditLog({ 
  className,
  actions = generateMockActions(),
  onActionClick,
  onExport
}: AdminAuditLogProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterCategory, setFilterCategory] = React.useState<string>('all');
  const [filterAdmin, setFilterAdmin] = React.useState<string>('all');
  const [filterImpact, setFilterImpact] = React.useState<string>('all');
  const [filterDateRange, setFilterDateRange] = React.useState<string>('7d');
  const [selectedAction, setSelectedAction] = React.useState<AdminAction | null>(null);

  const categories = [
    { value: 'all', label: 'All Categories', count: actions.length },
    { value: 'user_management', label: 'User Management', icon: <User className="w-4 h-4" /> },
    { value: 'system_config', label: 'System Config', icon: <Settings className="w-4 h-4" /> },
    { value: 'security', label: 'Security', icon: <Shield className="w-4 h-4" /> },
    { value: 'financial', label: 'Financial', icon: <CreditCard className="w-4 h-4" /> },
    { value: 'content', label: 'Content', icon: <FileText className="w-4 h-4" /> },
    { value: 'access_control', label: 'Access Control', icon: <Key className="w-4 h-4" /> }
  ];

  const getCategoryIcon = (category: AdminAction['category']) => {
    const icons = {
      user_management: <User className="w-4 h-4" />,
      system_config: <Settings className="w-4 h-4" />,
      security: <Shield className="w-4 h-4" />,
      financial: <CreditCard className="w-4 h-4" />,
      content: <FileText className="w-4 h-4" />,
      access_control: <Key className="w-4 h-4" />
    };
    return icons[category];
  };

  const getActionIcon = (action: string) => {
    if (action.includes('Delete') || action.includes('Remove')) return <Trash2 className="w-4 h-4" />;
    if (action.includes('Update') || action.includes('Modify') || action.includes('Change')) return <Edit className="w-4 h-4" />;
    if (action.includes('Add') || action.includes('Create') || action.includes('Grant')) return <Plus className="w-4 h-4" />;
    if (action.includes('Revoke') || action.includes('Suspend') || action.includes('Freeze')) return <Minus className="w-4 h-4" />;
    if (action.includes('Reset')) return <RefreshCw className="w-4 h-4" />;
    if (action.includes('Approve')) return <CheckCircle className="w-4 h-4" />;
    if (action.includes('Reject')) return <XCircle className="w-4 h-4" />;
    return <Activity className="w-4 h-4" />;
  };

  const getImpactBadge = (impact: AdminAction['impact']) => {
    const variants = {
      low: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
      medium: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      high: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
      critical: 'bg-red-500/10 text-red-500 border-red-500/20'
    };
    
    return (
      <Badge variant="outline" className={cn('text-xs capitalize', variants[impact])}>
        {impact} impact
      </Badge>
    );
  };

  const getRoleBadge = (role: string) => {
    const variants: Record<string, string> = {
      super_admin: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
      admin: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      moderator: 'bg-green-500/10 text-green-500 border-green-500/20'
    };
    
    return (
      <Badge variant="outline" className={cn('text-xs', variants[role] || '')}>
        {role.replace('_', ' ')}
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

  const filteredActions = actions.filter(action => {
    if (searchQuery && !action.action.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !action.admin.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !action.admin.email.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (filterCategory !== 'all' && action.category !== filterCategory) return false;
    if (filterAdmin !== 'all' && action.admin.id !== filterAdmin) return false;
    if (filterImpact !== 'all' && action.impact !== filterImpact) return false;
    
    // Date range filter
    const now = new Date();
    const actionAge = now.getTime() - action.timestamp.getTime();
    const dayInMs = 24 * 60 * 60 * 1000;
    
    switch (filterDateRange) {
      case '24h':
        if (actionAge > dayInMs) return false;
        break;
      case '7d':
        if (actionAge > 7 * dayInMs) return false;
        break;
      case '30d':
        if (actionAge > 30 * dayInMs) return false;
        break;
    }
    
    return true;
  });

  const stats = {
    total: filteredActions.length,
    highImpact: filteredActions.filter(a => a.impact === 'high' || a.impact === 'critical').length,
    failed: filteredActions.filter(a => a.status === 'failed').length,
    uniqueAdmins: new Set(filteredActions.map(a => a.admin.id)).size
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <UserCog className="w-5 h-5" />
          Admin Audit Log
        </h3>
        <Button variant="outline" onClick={onExport}>
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Actions</p>
          <p className="text-2xl font-bold">{stats.total}</p>
          <p className="text-xs text-muted-foreground mt-1">In selected period</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">High Impact</p>
          <p className="text-2xl font-bold text-orange-500">{stats.highImpact}</p>
          <p className="text-xs text-muted-foreground mt-1">Requires review</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Failed Actions</p>
          <p className="text-2xl font-bold text-red-500">{stats.failed}</p>
          <p className="text-xs text-muted-foreground mt-1">Need attention</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Active Admins</p>
          <p className="text-2xl font-bold">{stats.uniqueAdmins}</p>
          <p className="text-xs text-muted-foreground mt-1">Performed actions</p>
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
              placeholder="Search by action or admin..."
              className="pl-10"
            />
          </div>
          <select
            className="px-3 py-2 text-sm bg-background border border-border rounded-lg"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="user_management">User Management</option>
            <option value="system_config">System Config</option>
            <option value="security">Security</option>
            <option value="financial">Financial</option>
            <option value="content">Content</option>
            <option value="access_control">Access Control</option>
          </select>
          <select
            className="px-3 py-2 text-sm bg-background border border-border rounded-lg"
            value={filterImpact}
            onChange={(e) => setFilterImpact(e.target.value)}
          >
            <option value="all">All Impact</option>
            <option value="low">Low Impact</option>
            <option value="medium">Medium Impact</option>
            <option value="high">High Impact</option>
            <option value="critical">Critical Impact</option>
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
          <Button variant="outline">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      {/* Actions List */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-muted-foreground border-b border-border">
                <th className="text-left p-4">Time</th>
                <th className="text-left p-4">Admin</th>
                <th className="text-left p-4">Category</th>
                <th className="text-left p-4">Action</th>
                <th className="text-left p-4">Target</th>
                <th className="text-left p-4">Impact</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredActions.slice(0, 20).map((action) => (
                <tr
                  key={action.id}
                  className="border-b border-border/50 hover:bg-muted/50 cursor-pointer"
                  onClick={() => {
                    setSelectedAction(action);
                    onActionClick?.(action);
                  }}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs">{formatDate(action.timestamp)}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="font-medium">{action.admin.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">{action.admin.email}</span>
                        {getRoleBadge(action.admin.role)}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(action.category)}
                      <span className="capitalize text-xs">
                        {action.category.replace('_', ' ')}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {getActionIcon(action.action)}
                      <span className="font-medium">{action.action}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    {action.target && (
                      <div>
                        <p className="font-medium">{action.target.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {action.target.type} #{action.target.id}
                        </p>
                      </div>
                    )}
                  </td>
                  <td className="p-4">{getImpactBadge(action.impact)}</td>
                  <td className="p-4">
                    <Badge 
                      variant={action.status === 'success' ? 'success' : 'error'}
                      className="text-xs"
                    >
                      {action.status}
                    </Badge>
                  </td>
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
            Showing 1-20 of {filteredActions.length} actions
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

      {/* Action Details Modal */}
      {selectedAction && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold">Action Details</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedAction(null)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Action ID</p>
                <p className="font-mono">{selectedAction.id}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Timestamp</p>
                <p>{selectedAction.timestamp.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">IP Address</p>
                <p className="font-mono">{selectedAction.details.ip}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Duration</p>
                <p>{selectedAction.details.duration}ms</p>
              </div>
            </div>

            {selectedAction.details.reason && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">Reason</p>
                <p className="text-sm p-3 bg-muted/50 rounded-lg">{selectedAction.details.reason}</p>
              </div>
            )}

            {selectedAction.details.changes && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Changes Made</p>
                <div className="space-y-2">
                  {Object.entries(selectedAction.details.changes).map(([key, value]) => (
                    <div key={key} className="p-3 bg-muted/50 rounded-lg text-sm">
                      <p className="font-medium capitalize">{key.replace('_', ' ')}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-red-500">{JSON.stringify(value.old)}</span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        <span className="text-green-500">{JSON.stringify(value.new)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}