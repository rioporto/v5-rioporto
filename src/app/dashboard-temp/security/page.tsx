'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { 
  TwoFactorSetup,
  ActiveSessions,
  SecurityActivity,
  PrivacySettings,
  BackupSettings,
  AuditLog
} from '@/components/security-center';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle,
  Lock,
  Key,
  Activity,
  Settings,
  ChevronRight
} from 'lucide-react';

export default function SecurityCenterPage() {
  const [activeTab, setActiveTab] = React.useState<'overview' | '2fa' | 'sessions' | 'activity' | 'privacy' | 'backup' | 'audit'>('overview');

  const securityScore = 85;
  const securityLevel = securityScore >= 80 ? 'high' : securityScore >= 60 ? 'medium' : 'low';

  const securityMetrics = [
    { label: '2FA Enabled', value: 'Yes', status: 'success' },
    { label: 'Last Password Change', value: '45 days ago', status: 'warning' },
    { label: 'Active Sessions', value: '3 devices', status: 'success' },
    { label: 'Failed Login Attempts', value: '0', status: 'success' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Shield className="w-4 h-4" /> },
    { id: '2fa', label: 'Two-Factor Auth', icon: <Key className="w-4 h-4" /> },
    { id: 'sessions', label: 'Active Sessions', icon: <Activity className="w-4 h-4" /> },
    { id: 'activity', label: 'Security Activity', icon: <Activity className="w-4 h-4" /> },
    { id: 'privacy', label: 'Privacy Settings', icon: <Lock className="w-4 h-4" /> },
    { id: 'backup', label: 'Backup & Recovery', icon: <Settings className="w-4 h-4" /> },
    { id: 'audit', label: 'Audit Log', icon: <Activity className="w-4 h-4" /> }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Shield className="w-8 h-8 text-blue-500" />
            Security Center
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your account security and privacy settings
          </p>
        </div>
        <Badge 
          variant="outline" 
          className={cn(
            'text-lg px-4 py-2',
            securityLevel === 'high' ? 'border-green-500 text-green-500' :
            securityLevel === 'medium' ? 'border-yellow-500 text-yellow-500' :
            'border-red-500 text-red-500'
          )}
        >
          Security Score: {securityScore}/100
        </Badge>
      </div>

      {/* Navigation Tabs */}
      <Card className="p-2">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'ghost'}
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
          {/* Security Status */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {securityMetrics.map((metric, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                    <p className="text-2xl font-bold mt-1">{metric.value}</p>
                  </div>
                  {metric.status === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  )}
                </div>
              </Card>
            ))}
          </div>

          {/* Security Recommendations */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Security Recommendations</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-yellow-500/10 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  <div>
                    <p className="font-medium">Update your password</p>
                    <p className="text-sm text-muted-foreground">
                      It's been 45 days since your last password change
                    </p>
                  </div>
                </div>
                <Button size="sm">
                  Update Now
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="font-medium">Enable email notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Get alerts for suspicious login attempts
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Enable
                </Button>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6 hover:bg-muted/50 cursor-pointer" onClick={() => setActiveTab('2fa')}>
              <Key className="w-8 h-8 text-blue-500 mb-3" />
              <h3 className="font-semibold">Two-Factor Authentication</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Add an extra layer of security to your account
              </p>
            </Card>
            <Card className="p-6 hover:bg-muted/50 cursor-pointer" onClick={() => setActiveTab('sessions')}>
              <Activity className="w-8 h-8 text-green-500 mb-3" />
              <h3 className="font-semibold">Active Sessions</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Review and manage your active login sessions
              </p>
            </Card>
            <Card className="p-6 hover:bg-muted/50 cursor-pointer" onClick={() => setActiveTab('backup')}>
              <Settings className="w-8 h-8 text-purple-500 mb-3" />
              <h3 className="font-semibold">Backup & Recovery</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Set up backup codes and recovery options
              </p>
            </Card>
          </div>
        </div>
      )}

      {activeTab === '2fa' && <TwoFactorSetup />}
      {activeTab === 'sessions' && <ActiveSessions />}
      {activeTab === 'activity' && <SecurityActivity />}
      {activeTab === 'privacy' && <PrivacySettings />}
      {activeTab === 'backup' && <BackupSettings />}
      {activeTab === 'audit' && <AuditLog />}
    </div>
  );
}