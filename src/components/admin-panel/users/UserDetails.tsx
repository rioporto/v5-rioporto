import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Shield,
  Activity,
  DollarSign,
  Bitcoin,
  CreditCard,
  FileText,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Download,
  Eye,
  Send,
  Ban,
  Unlock
} from 'lucide-react';

interface UserDetailsProps {
  className?: string;
  userId?: string;
}

interface Transaction {
  id: string;
  type: 'buy' | 'sell' | 'deposit' | 'withdraw';
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'failed';
  date: Date;
  fee: number;
}

interface SecurityEvent {
  id: string;
  type: 'login' | 'logout' | 'password_change' | 'kyc_update' | 'api_key';
  description: string;
  ip: string;
  device: string;
  date: Date;
}

const generateMockTransactions = (): Transaction[] => {
  const transactions: Transaction[] = [];
  const types: Transaction['type'][] = ['buy', 'sell', 'deposit', 'withdraw'];
  const statuses: Transaction['status'][] = ['completed', 'pending', 'failed'];
  
  for (let i = 0; i < 20; i++) {
    transactions.push({
      id: `tx-${i}`,
      type: types[Math.floor(Math.random() * types.length)],
      amount: Math.random() * 10000,
      currency: Math.random() > 0.5 ? 'BTC' : 'USD',
      status: statuses[Math.floor(Math.random() * statuses.length)],
      date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      fee: Math.random() * 100
    });
  }
  
  return transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
};

const generateMockSecurityEvents = (): SecurityEvent[] => {
  const events: SecurityEvent[] = [];
  const types: SecurityEvent['type'][] = ['login', 'logout', 'password_change', 'kyc_update', 'api_key'];
  const descriptions = {
    login: 'User logged in',
    logout: 'User logged out',
    password_change: 'Password changed',
    kyc_update: 'KYC level updated',
    api_key: 'API key generated'
  };
  
  for (let i = 0; i < 15; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    events.push({
      id: `event-${i}`,
      type,
      description: descriptions[type],
      ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      device: Math.random() > 0.5 ? 'Chrome on Windows' : 'Safari on iOS',
      date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000)
    });
  }
  
  return events.sort((a, b) => b.date.getTime() - a.date.getTime());
};

export function UserDetails({ 
  className,
  userId = 'user-123'
}: UserDetailsProps) {
  const [activeTab, setActiveTab] = React.useState('overview');
  const transactions = generateMockTransactions();
  const securityEvents = generateMockSecurityEvents();

  const userData = {
    id: userId,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, USA',
    joined: new Date('2023-01-15'),
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: 'active' as const,
    role: 'user' as const,
    kycLevel: 2,
    totalVolume: 125000,
    balance: {
      usd: 15000,
      btc: 0.35,
      eth: 2.8
    },
    limits: {
      daily: 10000,
      monthly: 100000
    },
    documents: [
      { id: '1', type: 'ID Card', status: 'verified', date: new Date('2023-01-20') },
      { id: '2', type: 'Proof of Address', status: 'verified', date: new Date('2023-01-22') },
      { id: '3', type: 'Bank Statement', status: 'pending', date: new Date('2023-06-10') }
    ]
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'bg-green-500/10 text-green-500 border-green-500/20',
      suspended: 'bg-red-500/10 text-red-500 border-red-500/20',
      pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      verified: 'bg-green-500/10 text-green-500 border-green-500/20',
      completed: 'bg-green-500/10 text-green-500 border-green-500/20',
      failed: 'bg-red-500/10 text-red-500 border-red-500/20'
    };
    
    return (
      <Badge variant="outline" className={cn('text-xs capitalize', variants[status] || '')}>
        {status}
      </Badge>
    );
  };

  const formatCurrency = (value: number, currency = 'USD') => {
    if (currency === 'BTC') {
      return `${value.toFixed(8)} BTC`;
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* User Header */}
      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{userData.name}</h2>
              <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {userData.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  {userData.phone}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {userData.location}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                {getStatusBadge(userData.status)}
                <Badge variant="outline" className="text-xs">
                  <Shield className="w-3 h-3 mr-1" />
                  KYC Level {userData.kycLevel}
                </Badge>
                <Badge variant="outline" className="text-xs capitalize">
                  {userData.role}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              View Activity
            </Button>
            {userData.status === 'active' ? (
              <Button variant="outline" size="sm" className="text-red-500">
                <Ban className="w-4 h-4 mr-2" />
                Suspend
              </Button>
            ) : (
              <Button variant="outline" size="sm" className="text-green-500">
                <Unlock className="w-4 h-4 mr-2" />
                Activate
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Volume</p>
          <p className="text-2xl font-bold mt-1">{formatCurrency(userData.totalVolume)}</p>
          <p className="text-xs text-muted-foreground mt-1">All time</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">USD Balance</p>
          <p className="text-2xl font-bold mt-1">{formatCurrency(userData.balance.usd)}</p>
          <p className="text-xs text-green-500 mt-1">+12.5% this month</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">BTC Balance</p>
          <p className="text-2xl font-bold mt-1">{userData.balance.btc} BTC</p>
          <p className="text-xs text-muted-foreground mt-1">≈ {formatCurrency(userData.balance.btc * 45000)}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Daily Limit</p>
          <p className="text-2xl font-bold mt-1">{formatCurrency(userData.limits.daily)}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {formatCurrency(3500)} used today
          </p>
        </Card>
      </div>

      {/* Tabs */}
      <Card className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Account Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">User ID</p>
                    <p className="font-mono text-sm">{userData.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Joined</p>
                    <p className="text-sm flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(userData.joined)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Last Active</p>
                    <p className="text-sm flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {formatDate(userData.lastActive)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Limit</p>
                    <p className="text-sm">{formatCurrency(userData.limits.monthly)}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-2">
                  {transactions.slice(0, 5).map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          'w-8 h-8 rounded-full flex items-center justify-center',
                          tx.type === 'buy' && 'bg-green-500/10 text-green-500',
                          tx.type === 'sell' && 'bg-red-500/10 text-red-500',
                          tx.type === 'deposit' && 'bg-blue-500/10 text-blue-500',
                          tx.type === 'withdraw' && 'bg-orange-500/10 text-orange-500'
                        )}>
                          {tx.type === 'buy' || tx.type === 'sell' ? (
                            <Bitcoin className="w-4 h-4" />
                          ) : (
                            <DollarSign className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium capitalize">{tx.type}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(tx.date)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatCurrency(tx.amount, tx.currency)}</p>
                        {getStatusBadge(tx.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Transaction History</h3>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
            <div className="space-y-2">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted/70">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center',
                      tx.type === 'buy' && 'bg-green-500/10 text-green-500',
                      tx.type === 'sell' && 'bg-red-500/10 text-red-500',
                      tx.type === 'deposit' && 'bg-blue-500/10 text-blue-500',
                      tx.type === 'withdraw' && 'bg-orange-500/10 text-orange-500'
                    )}>
                      {tx.type === 'buy' || tx.type === 'sell' ? (
                        <Bitcoin className="w-4 h-4" />
                      ) : (
                        <DollarSign className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium capitalize">{tx.type}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(tx.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(tx.amount, tx.currency)}</p>
                      <p className="text-xs text-muted-foreground">Fee: {formatCurrency(tx.fee)}</p>
                    </div>
                    {getStatusBadge(tx.status)}
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="security" className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Security Events</h3>
              <Badge variant="outline" className="text-xs">
                <Activity className="w-3 h-3 mr-1" />
                Last 7 days
              </Badge>
            </div>
            <div className="space-y-2">
              {securityEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center',
                      event.type === 'login' && 'bg-blue-500/10 text-blue-500',
                      event.type === 'logout' && 'bg-gray-500/10 text-gray-500',
                      event.type === 'password_change' && 'bg-orange-500/10 text-orange-500',
                      event.type === 'kyc_update' && 'bg-green-500/10 text-green-500',
                      event.type === 'api_key' && 'bg-purple-500/10 text-purple-500'
                    )}>
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium">{event.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {event.ip} • {event.device}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">{formatDate(event.date)}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="documents" className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">KYC Documents</h3>
              <Button size="sm">
                Request Document
              </Button>
            </div>
            <div className="space-y-3">
              {userData.documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">{doc.type}</p>
                      <p className="text-xs text-muted-foreground">
                        Submitted {formatDate(doc.date)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(doc.status)}
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}