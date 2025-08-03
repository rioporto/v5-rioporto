'use client';

import React from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Container } from '@/components/layout/Container';
import { 
  TwoFactorSetup 
} from '@/components/security-center/two-factor';
import {
  ActiveSessions
} from '@/components/security-center/sessions';
import {
  SecurityActivity
} from '@/components/security-center/activity';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';
import { 
  Shield, 
  Lock, 
  Key, 
  Activity,
  AlertTriangle,
  CheckCircle,
  Settings,
  Download,
  FileText
} from 'lucide-react';

export default function SecurityCenterPage() {
  const [is2FAEnabled, setIs2FAEnabled] = React.useState(false);

  const securityScore = 75;
  const securityItems = [
    { label: 'Two-Factor Authentication', status: is2FAEnabled, weight: 30 },
    { label: 'Strong Password', status: true, weight: 20 },
    { label: 'Email Verified', status: true, weight: 15 },
    { label: 'Phone Verified', status: false, weight: 15 },
    { label: 'Identity Verified (KYC)', status: true, weight: 20 }
  ];

  const completedItems = securityItems.filter(item => item.status);
  const pendingItems = securityItems.filter(item => !item.status);

  const tabs = [
    {
      value: 'overview',
      label: 'Overview',
      icon: <Shield className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          {/* Security Score */}
          <Card className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Security Score
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Your account security level
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary">
                  {securityScore}%
                </div>
                <Badge 
                  variant="outline" 
                  className={cn(
                    'mt-1',
                    securityScore >= 80 && 'border-green-500/20 text-green-500',
                    securityScore >= 60 && securityScore < 80 && 'border-yellow-500/20 text-yellow-500',
                    securityScore < 60 && 'border-red-500/20 text-red-500'
                  )}
                >
                  {securityScore >= 80 ? 'Excellent' : securityScore >= 60 ? 'Good' : 'Needs Improvement'}
                </Badge>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Security Progress</span>
                  <span className="text-sm font-medium">
                    {completedItems.length} of {securityItems.length} completed
                  </span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${securityScore}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="font-medium text-green-500">Completed</span>
                  </div>
                  <ul className="space-y-1">
                    {completedItems.map((item) => (
                      <li key={item.label} className="text-sm text-muted-foreground">
                        • {item.label}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                    <span className="font-medium text-yellow-500">Pending</span>
                  </div>
                  <ul className="space-y-1">
                    {pendingItems.map((item) => (
                      <li key={item.label} className="text-sm text-muted-foreground">
                        • {item.label} (+{item.weight}%)
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4">
              <Lock className="w-8 h-8 text-primary mb-3" />
              <h4 className="font-medium mb-1">Change Password</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Update your password regularly for better security
              </p>
              <Button variant="outline" className="w-full">
                <Key className="w-4 h-4 mr-2" />
                Change Password
              </Button>
            </Card>

            <Card className="p-4">
              <Shield className="w-8 h-8 text-primary mb-3" />
              <h4 className="font-medium mb-1">Privacy Settings</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Control your data and privacy preferences
              </p>
              <Button variant="outline" className="w-full">
                <Settings className="w-4 h-4 mr-2" />
                Manage Privacy
              </Button>
            </Card>

            <Card className="p-4">
              <FileText className="w-8 h-8 text-primary mb-3" />
              <h4 className="font-medium mb-1">Download Data</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Export your account data and transaction history
              </p>
              <Button variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
            </Card>
          </div>
        </div>
      )
    },
    {
      value: '2fa',
      label: 'Two-Factor Auth',
      icon: <Lock className="w-4 h-4" />,
      content: (
        <TwoFactorSetup 
          isEnabled={is2FAEnabled}
          onEnable={() => setIs2FAEnabled(true)}
          onDisable={() => setIs2FAEnabled(false)}
        />
      )
    },
    {
      value: 'sessions',
      label: 'Active Sessions',
      icon: <Activity className="w-4 h-4" />,
      content: (
        <ActiveSessions 
          onTerminate={(id) => console.log('Terminate session:', id)}
          onTerminateAll={() => console.log('Terminate all sessions')}
        />
      )
    },
    {
      value: 'activity',
      label: 'Activity Log',
      icon: <Activity className="w-4 h-4" />,
      content: (
        <SecurityActivity />
      )
    }
  ];

  return (
    <ProtectedRoute>
      <Container className="py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Security Center
          </h1>
          <p className="text-muted-foreground">
            Manage your account security and privacy settings
          </p>
        </div>

        <Tabs defaultValue="overview" tabs={tabs} className="space-y-6" />
      </Container>
    </ProtectedRoute>
  );
}