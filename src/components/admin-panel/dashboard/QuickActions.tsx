import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Zap,
  Users,
  Shield,
  DollarSign,
  Bell,
  Settings,
  Download,
  Upload,
  RefreshCw,
  Ban,
  UserPlus,
  Mail,
  Database,
  Server,
  FileText,
  AlertTriangle,
  Key,
  Globe,
  BarChart3,
  Megaphone,
  CreditCard,
  Package,
  Wrench,
  HelpCircle
} from 'lucide-react';

interface QuickAction {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  category: 'user' | 'system' | 'finance' | 'security' | 'communication';
  importance: 'high' | 'medium' | 'low';
  badge?: string;
  onClick?: () => void;
}

interface QuickActionsProps {
  className?: string;
  onActionClick?: (action: QuickAction) => void;
}

export function QuickActions({ 
  className,
  onActionClick
}: QuickActionsProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [recentActions, setRecentActions] = React.useState<string[]>([]);

  const actions: QuickAction[] = [
    // User Management
    {
      id: 'add-user',
      label: 'Add New User',
      description: 'Create a new user account',
      icon: <UserPlus className="w-5 h-5" />,
      category: 'user',
      importance: 'medium'
    },
    {
      id: 'suspend-users',
      label: 'Suspend Users',
      description: 'Temporarily suspend user accounts',
      icon: <Ban className="w-5 h-5" />,
      category: 'user',
      importance: 'high',
      badge: '3 pending'
    },
    {
      id: 'kyc-review',
      label: 'Review KYC',
      description: 'Process pending KYC submissions',
      icon: <Shield className="w-5 h-5" />,
      category: 'user',
      importance: 'high',
      badge: '12 waiting'
    },
    {
      id: 'user-export',
      label: 'Export Users',
      description: 'Download user data as CSV',
      icon: <Download className="w-5 h-5" />,
      category: 'user',
      importance: 'low'
    },

    // System Management
    {
      id: 'system-backup',
      label: 'System Backup',
      description: 'Create full system backup',
      icon: <Database className="w-5 h-5" />,
      category: 'system',
      importance: 'high'
    },
    {
      id: 'restart-services',
      label: 'Restart Services',
      description: 'Restart API and trading services',
      icon: <RefreshCw className="w-5 h-5" />,
      category: 'system',
      importance: 'high'
    },
    {
      id: 'clear-cache',
      label: 'Clear Cache',
      description: 'Clear system and CDN cache',
      icon: <Server className="w-5 h-5" />,
      category: 'system',
      importance: 'medium'
    },
    {
      id: 'system-logs',
      label: 'View Logs',
      description: 'Access system and error logs',
      icon: <FileText className="w-5 h-5" />,
      category: 'system',
      importance: 'medium'
    },

    // Finance
    {
      id: 'process-withdrawals',
      label: 'Process Withdrawals',
      description: 'Review and approve withdrawals',
      icon: <DollarSign className="w-5 h-5" />,
      category: 'finance',
      importance: 'high',
      badge: '8 pending'
    },
    {
      id: 'reconcile-accounts',
      label: 'Reconcile Accounts',
      description: 'Run daily reconciliation',
      icon: <CreditCard className="w-5 h-5" />,
      category: 'finance',
      importance: 'high'
    },
    {
      id: 'fee-adjustment',
      label: 'Adjust Fees',
      description: 'Modify trading fee structure',
      icon: <Package className="w-5 h-5" />,
      category: 'finance',
      importance: 'medium'
    },
    {
      id: 'finance-report',
      label: 'Generate Report',
      description: 'Create financial reports',
      icon: <BarChart3 className="w-5 h-5" />,
      category: 'finance',
      importance: 'medium'
    },

    // Security
    {
      id: 'security-scan',
      label: 'Security Scan',
      description: 'Run vulnerability assessment',
      icon: <Shield className="w-5 h-5" />,
      category: 'security',
      importance: 'high'
    },
    {
      id: 'rotate-keys',
      label: 'Rotate API Keys',
      description: 'Generate new API keys',
      icon: <Key className="w-5 h-5" />,
      category: 'security',
      importance: 'high'
    },
    {
      id: 'block-ips',
      label: 'Block IPs',
      description: 'Add IPs to blocklist',
      icon: <Globe className="w-5 h-5" />,
      category: 'security',
      importance: 'medium'
    },
    {
      id: 'security-alerts',
      label: 'Review Alerts',
      description: 'Check security warnings',
      icon: <AlertTriangle className="w-5 h-5" />,
      category: 'security',
      importance: 'high',
      badge: '2 critical'
    },

    // Communication
    {
      id: 'send-announcement',
      label: 'Send Announcement',
      description: 'Broadcast to all users',
      icon: <Megaphone className="w-5 h-5" />,
      category: 'communication',
      importance: 'medium'
    },
    {
      id: 'email-campaign',
      label: 'Email Campaign',
      description: 'Launch marketing campaign',
      icon: <Mail className="w-5 h-5" />,
      category: 'communication',
      importance: 'low'
    },
    {
      id: 'system-maintenance',
      label: 'Schedule Maintenance',
      description: 'Plan system downtime',
      icon: <Wrench className="w-5 h-5" />,
      category: 'communication',
      importance: 'high'
    },
    {
      id: 'support-tickets',
      label: 'Support Tickets',
      description: 'Review open tickets',
      icon: <HelpCircle className="w-5 h-5" />,
      category: 'communication',
      importance: 'medium',
      badge: '23 open'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Actions', count: actions.length },
    { id: 'user', label: 'User Management', count: actions.filter(a => a.category === 'user').length },
    { id: 'system', label: 'System', count: actions.filter(a => a.category === 'system').length },
    { id: 'finance', label: 'Finance', count: actions.filter(a => a.category === 'finance').length },
    { id: 'security', label: 'Security', count: actions.filter(a => a.category === 'security').length },
    { id: 'communication', label: 'Communication', count: actions.filter(a => a.category === 'communication').length }
  ];

  const filteredActions = selectedCategory === 'all' 
    ? actions 
    : actions.filter(action => action.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    const colors = {
      user: 'bg-blue-500/10 text-blue-500',
      system: 'bg-purple-500/10 text-purple-500',
      finance: 'bg-green-500/10 text-green-500',
      security: 'bg-red-500/10 text-red-500',
      communication: 'bg-orange-500/10 text-orange-500'
    };
    return colors[category] || 'bg-gray-500/10 text-gray-500';
  };

  const getImportanceBadge = (importance: string) => {
    const variants = {
      high: 'bg-red-500/10 text-red-500 border-red-500/20',
      medium: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      low: 'bg-gray-500/10 text-gray-500 border-gray-500/20'
    };
    
    return variants[importance] || variants.low;
  };

  const handleActionClick = (action: QuickAction) => {
    setRecentActions(prev => [action.id, ...prev.filter(id => id !== action.id)].slice(0, 5));
    onActionClick?.(action);
  };

  const frequentActions = actions
    .filter(action => recentActions.includes(action.id))
    .slice(0, 4);

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Quick Actions
        </h3>
        <Badge variant="outline" className="text-xs">
          {actions.filter(a => a.badge).length} actions need attention
        </Badge>
      </div>

      {/* Recent/Frequent Actions */}
      {frequentActions.length > 0 && (
        <Card className="p-4">
          <h4 className="text-sm font-medium mb-3 text-muted-foreground">Recent Actions</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {frequentActions.map((action) => (
              <Button
                key={action.id}
                variant="outline"
                size="sm"
                className="justify-start"
                onClick={() => handleActionClick(action)}
              >
                {action.icon}
                <span className="ml-2 truncate">{action.label}</span>
              </Button>
            ))}
          </div>
        </Card>
      )}

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="gap-2"
          >
            {category.label}
            <Badge variant="secondary" className="text-xs">
              {category.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredActions.map((action) => (
          <Card
            key={action.id}
            className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => handleActionClick(action)}
          >
            <div className="flex items-start gap-3">
              <div className={cn(
                'p-2 rounded-lg',
                getCategoryColor(action.category)
              )}>
                {action.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <h4 className="font-medium">{action.label}</h4>
                  {action.badge && (
                    <Badge variant="destructive" className="text-xs">
                      {action.badge}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {action.description}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge 
                    variant="outline" 
                    className={cn('text-xs capitalize', getImportanceBadge(action.importance))}
                  >
                    {action.importance} priority
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Emergency Actions */}
      <Card className="p-4 bg-red-500/5 border-red-500/20">
        <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-500" />
          Emergency Actions
        </h4>
        <div className="flex flex-wrap gap-2">
          <Button variant="destructive" size="sm">
            <Ban className="w-4 h-4 mr-2" />
            Emergency Stop Trading
          </Button>
          <Button variant="destructive" size="sm">
            <Shield className="w-4 h-4 mr-2" />
            Enable Maintenance Mode
          </Button>
          <Button variant="destructive" size="sm">
            <Database className="w-4 h-4 mr-2" />
            Emergency Backup
          </Button>
          <Button variant="destructive" size="sm">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Alert All Users
          </Button>
        </div>
      </Card>
    </div>
  );
}