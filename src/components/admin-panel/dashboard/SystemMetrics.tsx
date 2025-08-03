import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { 
  Cpu,
  HardDrive,
  MemoryStick,
  Network,
  Server,
  Database,
  Zap,
  Activity,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Gauge,
  BarChart3,
  LineChart,
  PieChart,
  RefreshCw
} from 'lucide-react';
import { LineChart as RechartsLineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MetricItem {
  name: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  trend: number;
  max?: number;
}

interface SystemMetricsProps {
  className?: string;
}

const generateMetricsData = () => {
  const data = [];
  for (let i = 0; i < 60; i++) {
    data.push({
      time: i,
      cpu: Math.random() * 30 + 40,
      memory: Math.random() * 20 + 60,
      network: Math.random() * 100,
      requests: Math.floor(Math.random() * 1000) + 500
    });
  }
  return data;
};

export function SystemMetrics({ className }: SystemMetricsProps) {
  const [refreshInterval, setRefreshInterval] = React.useState(5);
  const [lastRefresh, setLastRefresh] = React.useState(new Date());
  
  const metrics: MetricItem[] = [
    {
      name: 'CPU Usage',
      value: 67.5,
      unit: '%',
      status: 'normal',
      trend: -2.3,
      max: 100
    },
    {
      name: 'Memory Usage',
      value: 78.2,
      unit: '%',
      status: 'warning',
      trend: 5.1,
      max: 100
    },
    {
      name: 'Disk Usage',
      value: 52.3,
      unit: '%',
      status: 'normal',
      trend: 0.8,
      max: 100
    },
    {
      name: 'Network I/O',
      value: 124.5,
      unit: 'MB/s',
      status: 'normal',
      trend: 12.4
    },
    {
      name: 'Database Connections',
      value: 234,
      unit: 'active',
      status: 'normal',
      trend: -5,
      max: 500
    },
    {
      name: 'API Latency',
      value: 45,
      unit: 'ms',
      status: 'normal',
      trend: -8.2
    }
  ];

  const serverGroups = [
    {
      name: 'Web Servers',
      servers: [
        { id: 'web-1', name: 'web-prod-01', cpu: 45, memory: 62, status: 'healthy' },
        { id: 'web-2', name: 'web-prod-02', cpu: 52, memory: 71, status: 'healthy' },
        { id: 'web-3', name: 'web-prod-03', cpu: 88, memory: 85, status: 'warning' }
      ]
    },
    {
      name: 'API Servers',
      servers: [
        { id: 'api-1', name: 'api-prod-01', cpu: 38, memory: 55, status: 'healthy' },
        { id: 'api-2', name: 'api-prod-02', cpu: 41, memory: 58, status: 'healthy' }
      ]
    },
    {
      name: 'Database Cluster',
      servers: [
        { id: 'db-1', name: 'db-primary', cpu: 72, memory: 84, status: 'healthy' },
        { id: 'db-2', name: 'db-replica-01', cpu: 45, memory: 67, status: 'healthy' },
        { id: 'db-3', name: 'db-replica-02', cpu: 43, memory: 65, status: 'healthy' }
      ]
    }
  ];

  const metricsData = generateMetricsData();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
      case 'healthy':
        return 'text-green-500';
      case 'warning':
        return 'text-yellow-500';
      case 'critical':
      case 'unhealthy':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      healthy: 'bg-green-500/10 text-green-500 border-green-500/20',
      warning: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      critical: 'bg-red-500/10 text-red-500 border-red-500/20',
      unhealthy: 'bg-red-500/10 text-red-500 border-red-500/20'
    };
    
    return (
      <Badge variant="outline" className={cn('text-xs capitalize', variants[status] || '')}>
        {status}
      </Badge>
    );
  };

  const getMetricIcon = (name: string) => {
    const icons: Record<string, React.ReactNode> = {
      'CPU Usage': <Cpu className="w-5 h-5" />,
      'Memory Usage': <MemoryStick className="w-5 h-5" />,
      'Disk Usage': <HardDrive className="w-5 h-5" />,
      'Network I/O': <Network className="w-5 h-5" />,
      'Database Connections': <Database className="w-5 h-5" />,
      'API Latency': <Zap className="w-5 h-5" />
    };
    return icons[name] || <Activity className="w-5 h-5" />;
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Gauge className="w-5 h-5" />
          System Performance Metrics
        </h3>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-xs">
            Last refresh: {lastRefresh.toLocaleTimeString()}
          </Badge>
          <div className="flex items-center gap-2">
            <select
              className="px-2 py-1 text-xs bg-background border border-border rounded"
              value={refreshInterval}
              onChange={(e) => setRefreshInterval(Number(e.target.value))}
            >
              <option value={5}>5 sec</option>
              <option value={10}>10 sec</option>
              <option value={30}>30 sec</option>
              <option value={60}>1 min</option>
            </select>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setLastRefresh(new Date())}
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.name} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={cn('p-2 rounded-lg bg-muted', getStatusColor(metric.status))}>
                  {getMetricIcon(metric.name)}
                </div>
                <div>
                  <p className="text-sm font-medium">{metric.name}</p>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-bold">{metric.value}</span>
                    <span className="text-sm text-muted-foreground">{metric.unit}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                {metric.trend > 0 ? (
                  <div className="flex items-center gap-1 text-red-500">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">+{metric.trend}%</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-green-500">
                    <TrendingDown className="w-4 h-4" />
                    <span className="text-sm">{metric.trend}%</span>
                  </div>
                )}
              </div>
            </div>
            {metric.max && (
              <Progress value={(metric.value / metric.max) * 100} className="h-2" />
            )}
          </Card>
        ))}
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h4 className="text-base font-semibold mb-4 flex items-center gap-2">
            <LineChart className="w-4 h-4" />
            CPU & Memory Usage
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={metricsData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="time" 
                  className="text-xs"
                  tick={{ fill: 'currentColor' }}
                />
                <YAxis 
                  className="text-xs"
                  tick={{ fill: 'currentColor' }}
                  domain={[0, 100]}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="cpu"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={false}
                  name="CPU %"
                />
                <Line
                  type="monotone"
                  dataKey="memory"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  dot={false}
                  name="Memory %"
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h4 className="text-base font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Network & Requests
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metricsData}>
                <defs>
                  <linearGradient id="colorNetwork" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="time" 
                  className="text-xs"
                  tick={{ fill: 'currentColor' }}
                />
                <YAxis 
                  className="text-xs"
                  tick={{ fill: 'currentColor' }}
                />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="network"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  fill="url(#colorNetwork)"
                  name="Network MB/s"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Server Status */}
      <Card className="p-6">
        <h4 className="text-base font-semibold mb-4 flex items-center gap-2">
          <Server className="w-4 h-4" />
          Server Infrastructure
        </h4>
        <div className="space-y-6">
          {serverGroups.map((group) => (
            <div key={group.name}>
              <h5 className="text-sm font-medium text-muted-foreground mb-3">{group.name}</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {group.servers.map((server) => (
                  <div 
                    key={server.id} 
                    className="p-3 bg-muted/50 rounded-lg flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'w-2 h-2 rounded-full',
                        server.status === 'healthy' && 'bg-green-500',
                        server.status === 'warning' && 'bg-yellow-500',
                        server.status === 'unhealthy' && 'bg-red-500'
                      )} />
                      <div>
                        <p className="text-sm font-medium">{server.name}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          <span>CPU: {server.cpu}%</span>
                          <span>MEM: {server.memory}%</span>
                        </div>
                      </div>
                    </div>
                    {getStatusBadge(server.status)}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Alerts */}
      <Card className="p-4 bg-yellow-500/5 border-yellow-500/20">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-500" />
          <div className="flex-1">
            <p className="font-medium">Performance Alert</p>
            <p className="text-sm text-muted-foreground">
              Memory usage on web-prod-03 is above 85%. Consider scaling or optimization.
            </p>
          </div>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </div>
      </Card>
    </div>
  );
}