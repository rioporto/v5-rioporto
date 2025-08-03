import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { 
  Server,
  Database,
  Cloud,
  Activity,
  Cpu,
  HardDrive,
  MemoryStick,
  Network,
  Zap,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Terminal,
  Code,
  Globe,
  Shield,
  Clock,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  ChevronUp,
  Settings,
  Power,
  Pause,
  Play
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SystemService {
  id: string;
  name: string;
  type: 'api' | 'database' | 'cache' | 'queue' | 'storage' | 'cdn';
  status: 'running' | 'stopped' | 'error' | 'warning';
  uptime: number;
  cpu: number;
  memory: number;
  requests?: number;
  errors?: number;
  latency?: number;
  version: string;
  lastRestart?: Date;
}

interface SystemMetric {
  timestamp: Date;
  cpu: number;
  memory: number;
  disk: number;
  network: {
    in: number;
    out: number;
  };
  requests: number;
  errors: number;
}

interface SystemMonitorProps {
  className?: string;
  onServiceAction?: (serviceId: string, action: string) => void;
}

const generateMockMetrics = (points: number = 60): SystemMetric[] => {
  const metrics: SystemMetric[] = [];
  const now = new Date();
  
  for (let i = points - 1; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 1000);
    metrics.push({
      timestamp,
      cpu: 30 + Math.random() * 40 + Math.sin(i / 10) * 10,
      memory: 50 + Math.random() * 30 + Math.cos(i / 10) * 10,
      disk: 60 + Math.random() * 10,
      network: {
        in: Math.random() * 100,
        out: Math.random() * 80
      },
      requests: Math.floor(Math.random() * 1000) + 500,
      errors: Math.floor(Math.random() * 50)
    });
  }
  
  return metrics;
};

const mockServices: SystemService[] = [
  {
    id: 'api-gateway',
    name: 'API Gateway',
    type: 'api',
    status: 'running',
    uptime: 99.99,
    cpu: 35,
    memory: 42,
    requests: 15234,
    errors: 12,
    latency: 45,
    version: 'v2.4.1',
    lastRestart: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'postgres-primary',
    name: 'PostgreSQL Primary',
    type: 'database',
    status: 'running',
    uptime: 99.95,
    cpu: 62,
    memory: 78,
    requests: 8543,
    latency: 12,
    version: '14.5',
    lastRestart: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'redis-cache',
    name: 'Redis Cache',
    type: 'cache',
    status: 'running',
    uptime: 100,
    cpu: 15,
    memory: 34,
    requests: 45632,
    latency: 2,
    version: '7.0.5'
  },
  {
    id: 'rabbitmq',
    name: 'RabbitMQ',
    type: 'queue',
    status: 'warning',
    uptime: 98.5,
    cpu: 45,
    memory: 56,
    requests: 3421,
    errors: 156,
    version: '3.11.5'
  },
  {
    id: 's3-storage',
    name: 'S3 Storage',
    type: 'storage',
    status: 'running',
    uptime: 100,
    cpu: 8,
    memory: 12,
    requests: 2341,
    version: 'AWS'
  },
  {
    id: 'cloudflare-cdn',
    name: 'Cloudflare CDN',
    type: 'cdn',
    status: 'running',
    uptime: 100,
    cpu: 0,
    memory: 0,
    requests: 98234,
    version: 'Enterprise'
  }
];

export function SystemMonitor({ 
  className,
  onServiceAction
}: SystemMonitorProps) {
  const [metrics] = React.useState(generateMockMetrics());
  const [selectedService, setSelectedService] = React.useState<SystemService | null>(null);
  const [expandedServices, setExpandedServices] = React.useState<string[]>([]);
  const [autoRefresh, setAutoRefresh] = React.useState(true);
  const [refreshInterval, setRefreshInterval] = React.useState(60);

  const currentMetrics = metrics[metrics.length - 1];
  const previousMetrics = metrics[metrics.length - 2];

  const getServiceIcon = (type: SystemService['type']) => {
    const icons = {
      api: <Globe className="w-5 h-5" />,
      database: <Database className="w-5 h-5" />,
      cache: <Zap className="w-5 h-5" />,
      queue: <Activity className="w-5 h-5" />,
      storage: <HardDrive className="w-5 h-5" />,
      cdn: <Cloud className="w-5 h-5" />
    };
    return icons[type];
  };

  const getStatusIcon = (status: SystemService['status']) => {
    switch (status) {
      case 'running':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'stopped':
        return <XCircle className="w-4 h-4 text-gray-500" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: SystemService['status']) => {
    switch (status) {
      case 'running':
        return 'text-green-500';
      case 'stopped':
        return 'text-gray-500';
      case 'error':
        return 'text-red-500';
      case 'warning':
        return 'text-yellow-500';
    }
  };

  const toggleServiceExpanded = (serviceId: string) => {
    setExpandedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const formatUptime = (uptime: number) => {
    return `${uptime.toFixed(2)}%`;
  };

  const getMetricChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return {
      value: Math.abs(change).toFixed(1),
      isIncrease: change > 0
    };
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Server className="w-5 h-5" />
          System Monitor
        </h3>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Auto-refresh</span>
            <Button
              variant={autoRefresh ? 'default' : 'outline'}
              size="sm"
              onClick={() => setAutoRefresh(!autoRefresh)}
            >
              {autoRefresh ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
            </Button>
          </div>
          <select
            className="px-3 py-2 text-sm bg-background border border-border rounded-lg"
            value={refreshInterval}
            onChange={(e) => setRefreshInterval(Number(e.target.value))}
          >
            <option value={30}>30s</option>
            <option value={60}>1m</option>
            <option value={300}>5m</option>
          </select>
        </div>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-blue-500" />
              <span className="font-medium">CPU Usage</span>
            </div>
            {(() => {
              const change = getMetricChange(currentMetrics.cpu, previousMetrics.cpu);
              return (
                <div className={cn(
                  'flex items-center gap-1 text-xs',
                  change.isIncrease ? 'text-red-500' : 'text-green-500'
                )}>
                  {change.isIncrease ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {change.value}%
                </div>
              );
            })()}
          </div>
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">{currentMetrics.cpu.toFixed(1)}%</span>
              <Badge variant={currentMetrics.cpu > 80 ? 'destructive' : 'outline'} className="text-xs">
                {currentMetrics.cpu > 80 ? 'High' : 'Normal'}
              </Badge>
            </div>
            <Progress value={currentMetrics.cpu} className="h-2" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <MemoryStick className="w-5 h-5 text-green-500" />
              <span className="font-medium">Memory</span>
            </div>
            {(() => {
              const change = getMetricChange(currentMetrics.memory, previousMetrics.memory);
              return (
                <div className={cn(
                  'flex items-center gap-1 text-xs',
                  change.isIncrease ? 'text-red-500' : 'text-green-500'
                )}>
                  {change.isIncrease ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {change.value}%
                </div>
              );
            })()}
          </div>
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">{currentMetrics.memory.toFixed(1)}%</span>
              <span className="text-sm text-muted-foreground">16GB / 32GB</span>
            </div>
            <Progress value={currentMetrics.memory} className="h-2" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <HardDrive className="w-5 h-5 text-purple-500" />
              <span className="font-medium">Disk</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">{currentMetrics.disk.toFixed(1)}%</span>
              <span className="text-sm text-muted-foreground">240GB / 500GB</span>
            </div>
            <Progress value={currentMetrics.disk} className="h-2" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Network className="w-5 h-5 text-orange-500" />
              <span className="font-medium">Network</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">In:</span>
                <span className="font-medium">{currentMetrics.network.in.toFixed(1)} Mbps</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Out:</span>
                <span className="font-medium">{currentMetrics.network.out.toFixed(1)} Mbps</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h4 className="text-base font-semibold mb-4">Resource Usage</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metrics.slice(-30)}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="timestamp" 
                  className="text-xs"
                  tick={{ fill: 'currentColor' }}
                  tickFormatter={(value) => new Date(value).toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                />
                <YAxis 
                  className="text-xs"
                  tick={{ fill: 'currentColor' }}
                  domain={[0, 100]}
                />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleString()}
                  formatter={(value: number) => `${value.toFixed(1)}%`}
                />
                <Line
                  type="monotone"
                  dataKey="cpu"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={false}
                  name="CPU"
                />
                <Line
                  type="monotone"
                  dataKey="memory"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={false}
                  name="Memory"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h4 className="text-base font-semibold mb-4">Request Metrics</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metrics.slice(-30)}>
                <defs>
                  <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorErrors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="timestamp" 
                  className="text-xs"
                  tick={{ fill: 'currentColor' }}
                  tickFormatter={(value) => new Date(value).toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                />
                <YAxis 
                  className="text-xs"
                  tick={{ fill: 'currentColor' }}
                />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleString()}
                />
                <Area
                  type="monotone"
                  dataKey="requests"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  fill="url(#colorRequests)"
                  name="Requests"
                />
                <Area
                  type="monotone"
                  dataKey="errors"
                  stroke="#EF4444"
                  strokeWidth={2}
                  fill="url(#colorErrors)"
                  name="Errors"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Services Status */}
      <Card className="p-6">
        <h4 className="text-base font-semibold mb-4">Services Status</h4>
        <div className="space-y-3">
          {mockServices.map((service) => (
            <div key={service.id} className="border border-border rounded-lg overflow-hidden">
              <div
                className="p-4 bg-muted/50 cursor-pointer"
                onClick={() => toggleServiceExpanded(service.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={cn('p-2 rounded-lg bg-background', getStatusColor(service.status))}>
                      {getServiceIcon(service.type)}
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h5 className="font-medium">{service.name}</h5>
                        <Badge variant="outline" className="text-xs">
                          {service.version}
                        </Badge>
                        {getStatusIcon(service.status)}
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span>Uptime: {formatUptime(service.uptime)}</span>
                        <span>CPU: {service.cpu}%</span>
                        <span>Memory: {service.memory}%</span>
                        {service.latency && <span>Latency: {service.latency}ms</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onServiceAction?.(service.id, 'restart');
                      }}
                    >
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onServiceAction?.(service.id, service.status === 'running' ? 'stop' : 'start');
                      }}
                    >
                      {service.status === 'running' ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </Button>
                    {expandedServices.includes(service.id) ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </div>

              {expandedServices.includes(service.id) && (
                <div className="p-4 border-t border-border bg-background">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    {service.requests && (
                      <div>
                        <p className="text-muted-foreground">Requests/min</p>
                        <p className="font-medium">{service.requests.toLocaleString()}</p>
                      </div>
                    )}
                    {service.errors !== undefined && (
                      <div>
                        <p className="text-muted-foreground">Errors</p>
                        <p className="font-medium text-red-500">{service.errors}</p>
                      </div>
                    )}
                    {service.lastRestart && (
                      <div>
                        <p className="text-muted-foreground">Last Restart</p>
                        <p className="font-medium">
                          {new Intl.DateTimeFormat('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          }).format(service.lastRestart)}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      <Terminal className="w-4 h-4 mr-2" />
                      Logs
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Configure
                    </Button>
                    <Button variant="outline" size="sm">
                      <Code className="w-4 h-4 mr-2" />
                      Debug
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* System Actions */}
      <Card className="p-4 bg-yellow-500/5 border-yellow-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            <div>
              <p className="font-medium">System Maintenance</p>
              <p className="text-sm text-muted-foreground">
                Schedule maintenance windows and system updates
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              Schedule Maintenance
            </Button>
            <Button variant="outline" className="text-red-500">
              <Power className="w-4 h-4 mr-2" />
              Emergency Shutdown
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}