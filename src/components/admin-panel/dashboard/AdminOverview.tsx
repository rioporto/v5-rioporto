import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  Users,
  DollarSign,
  Activity,
  Shield,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MetricCard {
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: React.ReactNode;
  color: string;
}

interface AdminOverviewProps {
  className?: string;
}

const generateChartData = () => {
  const data = [];
  for (let i = 0; i < 24; i++) {
    data.push({
      time: `${i}:00`,
      users: Math.floor(Math.random() * 1000) + 500,
      transactions: Math.floor(Math.random() * 500) + 200,
      volume: Math.floor(Math.random() * 100000) + 50000
    });
  }
  return data;
};

export function AdminOverview({ className }: AdminOverviewProps) {
  const metrics: MetricCard[] = [
    {
      title: 'Total Users',
      value: '45,231',
      change: 12.5,
      changeType: 'increase',
      icon: <Users className="w-5 h-5" />,
      color: 'text-blue-500'
    },
    {
      title: 'Daily Volume',
      value: '$2.4M',
      change: 8.3,
      changeType: 'increase',
      icon: <DollarSign className="w-5 h-5" />,
      color: 'text-green-500'
    },
    {
      title: 'Active Sessions',
      value: '1,842',
      change: 3.2,
      changeType: 'decrease',
      icon: <Activity className="w-5 h-5" />,
      color: 'text-purple-500'
    },
    {
      title: 'Security Score',
      value: '98%',
      change: 0.5,
      changeType: 'increase',
      icon: <Shield className="w-5 h-5" />,
      color: 'text-orange-500'
    }
  ];

  const systemStatus = [
    { name: 'API Gateway', status: 'operational', uptime: 99.99 },
    { name: 'Trading Engine', status: 'operational', uptime: 99.95 },
    { name: 'Database Cluster', status: 'operational', uptime: 99.98 },
    { name: 'CDN', status: 'degraded', uptime: 98.50 },
    { name: 'Email Service', status: 'operational', uptime: 99.90 }
  ];

  const recentAlerts = [
    {
      id: '1',
      type: 'warning',
      message: 'High API usage detected from IP 192.168.1.100',
      time: '5 minutes ago'
    },
    {
      id: '2',
      type: 'info',
      message: 'Database backup completed successfully',
      time: '1 hour ago'
    },
    {
      id: '3',
      type: 'error',
      message: 'Failed login attempts exceeded threshold',
      time: '2 hours ago'
    }
  ];

  const chartData = generateChartData();

  return (
    <div className={cn('space-y-6', className)}>
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.title} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{metric.title}</p>
                <p className="text-2xl font-bold mt-1">{metric.value}</p>
              </div>
              <div className={cn('p-2 rounded-lg bg-background', metric.color)}>
                {metric.icon}
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              {metric.changeType === 'increase' ? (
                <ArrowUpRight className="w-4 h-4 text-green-500" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-red-500" />
              )}
              <span className={cn(
                'text-sm font-medium',
                metric.changeType === 'increase' ? 'text-green-500' : 'text-red-500'
              )}>
                {metric.change}%
              </span>
              <span className="text-sm text-muted-foreground">vs last week</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">User Activity</h3>
            <Badge variant="outline" className="text-xs">
              Last 24 hours
            </Badge>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="time" 
                  className="text-xs"
                  tick={{ fill: 'currentColor' }}
                  interval="preserveStartEnd"
                />
                <YAxis 
                  className="text-xs"
                  tick={{ fill: 'currentColor' }}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Transaction Volume</h3>
            <Badge variant="outline" className="text-xs">
              Last 24 hours
            </Badge>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="time" 
                  className="text-xs"
                  tick={{ fill: 'currentColor' }}
                  interval="preserveStartEnd"
                />
                <YAxis 
                  className="text-xs"
                  tick={{ fill: 'currentColor' }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip 
                  formatter={(value: number) => `$${value.toLocaleString()}`}
                />
                <Area
                  type="monotone"
                  dataKey="volume"
                  stroke="#10B981"
                  strokeWidth={2}
                  fill="url(#colorVolume)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* System Status & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5" />
            System Status
          </h3>
          <div className="space-y-3">
            {systemStatus.map((system) => (
              <div key={system.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'w-2 h-2 rounded-full',
                    system.status === 'operational' && 'bg-green-500',
                    system.status === 'degraded' && 'bg-yellow-500',
                    system.status === 'down' && 'bg-red-500'
                  )} />
                  <span className="font-medium">{system.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">
                    {system.uptime}% uptime
                  </span>
                  <Badge 
                    variant="outline" 
                    className={cn(
                      'text-xs capitalize',
                      system.status === 'operational' && 'border-green-500/20 text-green-500',
                      system.status === 'degraded' && 'border-yellow-500/20 text-yellow-500',
                      system.status === 'down' && 'border-red-500/20 text-red-500'
                    )}
                  >
                    {system.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Recent Alerts
            </h3>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <div className={cn(
                  'p-1.5 rounded',
                  alert.type === 'error' && 'bg-red-500/10 text-red-500',
                  alert.type === 'warning' && 'bg-yellow-500/10 text-yellow-500',
                  alert.type === 'info' && 'bg-blue-500/10 text-blue-500'
                )}>
                  {alert.type === 'error' && <AlertTriangle className="w-4 h-4" />}
                  {alert.type === 'warning' && <AlertTriangle className="w-4 h-4" />}
                  {alert.type === 'info' && <CheckCircle className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{alert.message}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3" />
                    {alert.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button variant="outline" className="justify-start">
            <Users className="w-4 h-4 mr-2" />
            Manage Users
          </Button>
          <Button variant="outline" className="justify-start">
            <Shield className="w-4 h-4 mr-2" />
            Security Settings
          </Button>
          <Button variant="outline" className="justify-start">
            <BarChart3 className="w-4 h-4 mr-2" />
            View Analytics
          </Button>
          <Button variant="outline" className="justify-start">
            <Activity className="w-4 h-4 mr-2" />
            System Logs
          </Button>
        </div>
      </Card>
    </div>
  );
}