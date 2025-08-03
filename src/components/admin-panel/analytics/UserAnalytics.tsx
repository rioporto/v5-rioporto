import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  Users,
  TrendingUp,
  TrendingDown,
  Calendar,
  Globe,
  Clock,
  UserPlus,
  UserMinus,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  Download,
  Filter
} from 'lucide-react';
import { 
  LineChart as RechartsLineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

interface UserAnalyticsProps {
  className?: string;
}

const generateUserGrowthData = () => {
  const data = [];
  const baseUsers = 30000;
  
  for (let i = 0; i < 90; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (90 - i));
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      totalUsers: baseUsers + Math.floor(Math.random() * 200 * i),
      newUsers: Math.floor(Math.random() * 200) + 50,
      activeUsers: Math.floor((baseUsers + Math.random() * 200 * i) * 0.3),
      churnedUsers: Math.floor(Math.random() * 50)
    });
  }
  
  return data;
};

const generateUserSegmentData = () => {
  return [
    { name: 'Active Traders', value: 12543, percentage: 35, color: '#3B82F6' },
    { name: 'Occasional Users', value: 8932, percentage: 25, color: '#10B981' },
    { name: 'New Users', value: 5021, percentage: 14, color: '#F59E0B' },
    { name: 'Dormant', value: 6234, percentage: 17, color: '#8B5CF6' },
    { name: 'High Volume', value: 3201, percentage: 9, color: '#EF4444' }
  ];
};

const generateActivityHeatmap = () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const data: Array<{ day: string; hour: number; value: number; dayIndex: number }> = [];
  
  days.forEach((day, dayIndex) => {
    hours.forEach(hour => {
      data.push({
        day,
        hour,
        value: Math.floor(Math.random() * 100),
        dayIndex
      });
    });
  });
  
  return data;
};

export function UserAnalytics({ className }: UserAnalyticsProps) {
  const [timeRange, setTimeRange] = React.useState('90d');
  const [selectedSegment, setSelectedSegment] = React.useState<string | null>(null);

  const userGrowthData = generateUserGrowthData();
  const userSegmentData = generateUserSegmentData();
  const activityData = generateActivityHeatmap();

  const kpis = {
    totalUsers: 45231,
    totalUsersChange: 12.5,
    activeUsers: 15842,
    activeUsersChange: 8.3,
    newUsers: 1234,
    newUsersChange: 15.7,
    churnRate: 2.3,
    churnRateChange: -0.5,
    avgSessionTime: '12m 34s',
    avgSessionChange: 5.2,
    userRetention: 89.5,
    retentionChange: 2.1
  };

  const getHeatmapColor = (value: number) => {
    if (value < 20) return '#1F2937'; // gray-800
    if (value < 40) return '#374151'; // gray-700
    if (value < 60) return '#4B5563'; // gray-600
    if (value < 80) return '#6B7280'; // gray-500
    return '#9CA3AF'; // gray-400
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Users className="w-5 h-5" />
          User Analytics
        </h3>
        <div className="flex items-center gap-2">
          <select
            className="px-3 py-2 text-sm bg-background border border-border rounded-lg"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <Badge variant={kpis.totalUsersChange > 0 ? 'default' : 'secondary'} className="text-xs">
              {kpis.totalUsersChange > 0 ? '+' : ''}{kpis.totalUsersChange}%
            </Badge>
          </div>
          <p className="text-2xl font-bold">{kpis.totalUsers.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Total Users</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Activity className="w-4 h-4 text-muted-foreground" />
            <Badge variant={kpis.activeUsersChange > 0 ? 'default' : 'secondary'} className="text-xs">
              {kpis.activeUsersChange > 0 ? '+' : ''}{kpis.activeUsersChange}%
            </Badge>
          </div>
          <p className="text-2xl font-bold">{kpis.activeUsers.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Active Users</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <UserPlus className="w-4 h-4 text-muted-foreground" />
            <Badge variant={kpis.newUsersChange > 0 ? 'default' : 'secondary'} className="text-xs">
              {kpis.newUsersChange > 0 ? '+' : ''}{kpis.newUsersChange}%
            </Badge>
          </div>
          <p className="text-2xl font-bold">{kpis.newUsers.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">New Users</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <UserMinus className="w-4 h-4 text-muted-foreground" />
            <Badge variant={kpis.churnRateChange < 0 ? 'default' : 'error'} className="text-xs">
              {kpis.churnRateChange > 0 ? '+' : ''}{kpis.churnRateChange}%
            </Badge>
          </div>
          <p className="text-2xl font-bold">{kpis.churnRate}%</p>
          <p className="text-xs text-muted-foreground">Churn Rate</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <Badge variant={kpis.avgSessionChange > 0 ? 'default' : 'secondary'} className="text-xs">
              {kpis.avgSessionChange > 0 ? '+' : ''}{kpis.avgSessionChange}%
            </Badge>
          </div>
          <p className="text-2xl font-bold">{kpis.avgSessionTime}</p>
          <p className="text-xs text-muted-foreground">Avg Session</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
            <Badge variant={kpis.retentionChange > 0 ? 'default' : 'secondary'} className="text-xs">
              {kpis.retentionChange > 0 ? '+' : ''}{kpis.retentionChange}%
            </Badge>
          </div>
          <p className="text-2xl font-bold">{kpis.userRetention}%</p>
          <p className="text-xs text-muted-foreground">Retention</p>
        </Card>
      </div>

      {/* User Growth Chart */}
      <Card className="p-6">
        <h4 className="text-base font-semibold mb-4 flex items-center gap-2">
          <LineChart className="w-4 h-4" />
          User Growth Over Time
        </h4>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={userGrowthData}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="date" 
                className="text-xs"
                tick={{ fill: 'currentColor' }}
                interval="preserveStartEnd"
              />
              <YAxis 
                className="text-xs"
                tick={{ fill: 'currentColor' }}
              />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="totalUsers"
                stroke="#3B82F6"
                strokeWidth={2}
                fill="url(#colorTotal)"
                name="Total Users"
              />
              <Area
                type="monotone"
                dataKey="activeUsers"
                stroke="#10B981"
                strokeWidth={2}
                fill="url(#colorActive)"
                name="Active Users"
              />
              <Line
                type="monotone"
                dataKey="newUsers"
                stroke="#F59E0B"
                strokeWidth={2}
                dot={false}
                name="New Users"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Segments */}
        <Card className="p-6">
          <h4 className="text-base font-semibold mb-4 flex items-center gap-2">
            <PieChart className="w-4 h-4" />
            User Segments
          </h4>
          <div className="flex items-center gap-6">
            <div className="h-64 w-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={userSegmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {userSegmentData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color}
                        className={cn(
                          'cursor-pointer transition-opacity',
                          selectedSegment && selectedSegment !== entry.name && 'opacity-30'
                        )}
                        onClick={() => setSelectedSegment(selectedSegment === entry.name ? null : entry.name)}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-2">
              {userSegmentData.map((segment) => (
                <div 
                  key={segment.name}
                  className={cn(
                    'flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors',
                    selectedSegment === segment.name ? 'bg-muted' : 'hover:bg-muted/50'
                  )}
                  onClick={() => setSelectedSegment(selectedSegment === segment.name ? null : segment.name)}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: segment.color }}
                    />
                    <span className="text-sm font-medium">{segment.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{segment.value.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">{segment.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* User Activity Heatmap */}
        <Card className="p-6">
          <h4 className="text-base font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Activity Heatmap
          </h4>
          <div className="space-y-2">
            <div className="grid grid-cols-25 gap-1 text-xs">
              <div className="col-span-1"></div>
              {Array.from({ length: 24 }, (_, i) => (
                <div key={i} className="text-center text-muted-foreground">
                  {i}
                </div>
              ))}
            </div>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, dayIndex) => (
              <div key={day} className="grid grid-cols-25 gap-1">
                <div className="col-span-1 text-xs text-muted-foreground">{day}</div>
                {Array.from({ length: 24 }, (_, hour) => {
                  const dataPoint = activityData.find(
                    d => d.dayIndex === dayIndex && d.hour === hour
                  );
                  return (
                    <div
                      key={hour}
                      className="aspect-square rounded"
                      style={{
                        backgroundColor: getHeatmapColor(dataPoint?.value || 0)
                      }}
                      title={`${day} ${hour}:00 - ${dataPoint?.value || 0} active users`}
                    />
                  );
                })}
              </div>
            ))}
            <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
              <span>Less</span>
              <div className="flex gap-1">
                {[20, 40, 60, 80, 100].map((value) => (
                  <div
                    key={value}
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: getHeatmapColor(value - 1) }}
                  />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}