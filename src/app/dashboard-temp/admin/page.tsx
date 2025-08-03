'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { 
  AdminOverview,
  UserManagement,
  UserDetails,
  KYCQueue,
  SystemMetrics,
  RealtimeStats,
  SystemMonitor,
  AdminAuditLog
} from '@/components/admin-panel';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  Shield, 
  Users,
  Activity,
  Settings,
  BarChart3,
  ShieldCheck,
  UserCog,
  AlertTriangle,
  TrendingUp
} from 'lucide-react';

export default function AdminPanelPage() {
  const [activeTab, setActiveTab] = React.useState<'overview' | 'users' | 'kyc' | 'system' | 'audit'>('overview');
  const [selectedUserId, setSelectedUserId] = React.useState<string | null>(null);

  const stats = {
    totalUsers: 15420,
    activeUsers: 8350,
    pendingKYC: 127,
    systemHealth: 98.5,
    dailyTransactions: 12847,
    revenue: 245000
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'users', label: 'User Management', icon: <Users className="w-4 h-4" /> },
    { id: 'kyc', label: 'KYC Queue', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'system', label: 'System Monitor', icon: <Activity className="w-4 h-4" /> },
    { id: 'audit', label: 'Audit Log', icon: <UserCog className="w-4 h-4" /> }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Shield className="w-8 h-8 text-red-500" />
            Admin Panel
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage users, monitor system health, and review platform activity
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge 
            variant="outline" 
            className={cn(
              'text-lg px-4 py-2',
              stats.systemHealth >= 95 ? 'border-green-500 text-green-500' :
              stats.systemHealth >= 80 ? 'border-yellow-500 text-yellow-500' :
              'border-red-500 text-red-500'
            )}
          >
            System Health: {stats.systemHealth}%
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Users</p>
              <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Users</p>
              <p className="text-2xl font-bold">{stats.activeUsers.toLocaleString()}</p>
            </div>
            <Activity className="w-8 h-8 text-green-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending KYC</p>
              <p className="text-2xl font-bold">{stats.pendingKYC}</p>
            </div>
            <ShieldCheck className="w-8 h-8 text-yellow-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">System Health</p>
              <p className="text-2xl font-bold">{stats.systemHealth}%</p>
            </div>
            <Activity className="w-8 h-8 text-purple-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Daily Transactions</p>
              <p className="text-2xl font-bold">{stats.dailyTransactions.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-cyan-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Revenue (USD)</p>
              <p className="text-2xl font-bold">${stats.revenue.toLocaleString()}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-emerald-500" />
          </div>
        </Card>
      </div>

      {/* Navigation Tabs */}
      <Card className="p-2">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'primary' : 'ghost'}
              onClick={() => setActiveTab(tab.id as any)}
              className="flex items-center gap-2"
            >
              {tab.icon}
              {tab.label}
            </Button>
          ))}
        </div>
      </Card>

      {/* Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <AdminOverview />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SystemMetrics />
            <RealtimeStats />
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="space-y-6">
          {selectedUserId ? (
            <>
              <Button 
                variant="ghost" 
                onClick={() => setSelectedUserId(null)}
                className="mb-4"
              >
                 Back to User List
              </Button>
              <UserDetails 
                userId={selectedUserId}
              />
            </>
          ) : (
            <UserManagement />
          )}
        </div>
      )}

      {activeTab === 'kyc' && (
        <KYCQueue 
          onUserSelect={(userId) => {
            setSelectedUserId(userId);
            setActiveTab('users');
          }}
        />
      )}

      {activeTab === 'system' && (
        <SystemMonitor />
      )}

      {activeTab === 'audit' && (
        <AdminAuditLog 
          onActionClick={(action) => console.log('Action clicked:', action)}
          onExport={() => console.log('Export audit log')}
        />
      )}
    </div>
  );
}