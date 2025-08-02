'use client';

import { useMemo, useState } from 'react';
import { LineChart, Line, AreaChart, Area, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { WidgetProps, PerformanceMetrics as PerformanceMetricsType } from '@/types/financial';

interface PerformanceMetricsProps extends WidgetProps {
  data: {
    metrics: PerformanceMetricsType;
    benchmark: PerformanceMetricsType;
    history: Array<{
      date: string;
      portfolioValue: number;
      benchmarkValue: number;
      alpha: number;
      beta: number;
      sharpeRatio: number;
    }>;
  };
}

const MetricCard = ({ 
  title, 
  value, 
  benchmark, 
  format = 'percentage',
  trend,
  description 
}: {
  title: string;
  value: number;
  benchmark?: number;
  format?: 'percentage' | 'ratio' | 'currency';
  trend?: 'up' | 'down' | 'neutral';
  description: string;
}) => {
  const formatValue = (val: number) => {
    switch (format) {
      case 'percentage':
        return `${(val * 100).toFixed(2)}%`;
      case 'currency':
        return `$${val.toLocaleString()}`;
      case 'ratio':
        return val.toFixed(2);
      default:
        return val.toString();
    }
  };

  const isOutperforming = benchmark ? value > benchmark : null;

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</h4>
        {trend && (
          <Badge variant={trend === 'up' ? 'success' : trend === 'down' ? 'error' : 'default'} size="sm">
            {trend}
          </Badge>
        )}
      </div>
      <div className="space-y-1">
        <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
          {formatValue(value)}
        </div>
        {benchmark !== undefined && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">vs Benchmark:</span>
            <span className={isOutperforming ? 'text-green-600' : 'text-red-600'}>
              {formatValue(benchmark)}
            </span>
            {isOutperforming !== null && (
              <Badge variant={isOutperforming ? 'success' : 'error'} size="sm">
                {isOutperforming ? 'Outperforming' : 'Underperforming'}
              </Badge>
            )}
          </div>
        )}
        <div className="text-xs text-gray-500">{description}</div>
      </div>
    </div>
  );
};

const RiskReturnScatter = ({ metrics, benchmark }: { 
  metrics: PerformanceMetricsType; 
  benchmark: PerformanceMetricsType;
}) => {
  const data = [
    {
      name: 'Portfolio',
      return: metrics.annualizedReturn * 100,
      risk: metrics.volatility * 100,
      sharpe: metrics.sharpeRatio,
      color: '#3b82f6'
    },
    {
      name: 'Benchmark',
      return: benchmark.annualizedReturn * 100,
      risk: benchmark.volatility * 100,
      sharpe: benchmark.sharpeRatio,
      color: '#6b7280'
    }
  ];

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="riskReturnGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#ef4444" stopOpacity={0.3} />
            </linearGradient>
          </defs>
          <Area
            dataKey="return"
            stroke="none"
            fill="url(#riskReturnGradient)"
            fillOpacity={0.1}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const RadarMetrics = ({ metrics }: { metrics: PerformanceMetricsType }) => {
  const data = [
    { metric: 'Return', value: Math.min(Math.max(metrics.annualizedReturn * 100, 0), 100) },
    { metric: 'Sharpe', value: Math.min(Math.max((metrics.sharpeRatio + 2) * 25, 0), 100) },
    { metric: 'Sortino', value: Math.min(Math.max((metrics.sortinoRatio + 2) * 25, 0), 100) },
    { metric: 'Calmar', value: Math.min(Math.max((metrics.calmarRatio + 2) * 25, 0), 100) },
    { metric: 'Alpha', value: Math.min(Math.max((metrics.alpha + 0.1) * 500, 0), 100) },
    { metric: 'Info Ratio', value: Math.min(Math.max((metrics.informationRatio + 2) * 25, 0), 100) },
  ];

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="metric" />
          <PolarRadiusAxis angle={0} domain={[0, 100]} />
          <Radar
            name="Portfolio"
            dataKey="value"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.3}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default function PerformanceMetrics({ 
  data,
  loading = false, 
  error,
  className = ""
}: PerformanceMetricsProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeframe, setTimeframe] = useState<'1M' | '3M' | '6M' | '1Y' | 'ALL'>('1Y');

  const riskLevel = useMemo(() => {
    const vol = data.metrics.volatility;
    if (vol < 0.1) return { level: 'Low', color: 'success' };
    if (vol < 0.2) return { level: 'Medium', color: 'warning' };
    return { level: 'High', color: 'error' };
  }, [data.metrics.volatility]);

  if (loading) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-48" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-12" />
              <Skeleton className="h-8 w-12" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
          <Skeleton className="h-64 w-full" />
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="flex items-center justify-center h-64 text-red-500">
          Error loading performance metrics: {error}
        </div>
      </Card>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'risk', label: 'Risk Analysis' },
    { id: 'comparison', label: 'Benchmark' },
    { id: 'radar', label: 'Radar Chart' },
  ];

  return (
    <Card className={`p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Performance Metrics
          </h3>
          <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
            <span>Return: {(data.metrics.totalReturn * 100).toFixed(2)}%</span>
            <Badge variant={riskLevel.color as any}>{riskLevel.level} Risk</Badge>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* Timeframe */}
          <div className="flex gap-1">
            {(['1M', '3M', '6M', '1Y', 'ALL'] as const).map(period => (
              <Button
                key={period}
                variant={timeframe === period ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setTimeframe(period)}
              >
                {period}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="mt-6">
          <TabsContent value="overview">
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <MetricCard
                title="Total Return"
                value={data.metrics.totalReturn}
                benchmark={data.benchmark.totalReturn}
                format="percentage"
                description="Total portfolio return"
              />
              <MetricCard
                title="Annualized Return"
                value={data.metrics.annualizedReturn}
                benchmark={data.benchmark.annualizedReturn}
                format="percentage"
                description="Yearly return rate"
              />
              <MetricCard
                title="Sharpe Ratio"
                value={data.metrics.sharpeRatio}
                benchmark={data.benchmark.sharpeRatio}
                format="ratio"
                description="Risk-adjusted return"
              />
            </div>

            {/* Performance Chart */}
            <div>
              <h4 className="font-medium mb-3">Performance vs Benchmark</h4>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.history}>
                    <Line
                      type="monotone"
                      dataKey="portfolioValue"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={false}
                      name="Portfolio"
                    />
                    <Line
                      type="monotone"
                      dataKey="benchmarkValue"
                      stroke="#6b7280"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={false}
                      name="Benchmark"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          </TabsContent>

          <TabsContent value="risk">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <MetricCard
                title="Volatility"
                value={data.metrics.volatility}
                benchmark={data.benchmark.volatility}
                format="percentage"
                description="Price fluctuation measure"
              />
              <MetricCard
                title="Max Drawdown"
                value={data.metrics.maxDrawdown}
                benchmark={data.benchmark.maxDrawdown}
                format="percentage"
                description="Largest peak-to-trough decline"
              />
              <MetricCard
                title="Beta"
                value={data.metrics.beta}
                benchmark={1.0}
                format="ratio"
                description="Market correlation"
              />
            </div>
            <div>
              <h4 className="font-medium mb-3">Risk-Return Profile</h4>
              <RiskReturnScatter metrics={data.metrics} benchmark={data.benchmark} />
            </div>
          </div>
          </TabsContent>

          <TabsContent value="comparison">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MetricCard
              title="Alpha"
              value={data.metrics.alpha}
              benchmark={0}
              format="percentage"
              description="Excess return vs benchmark"
            />
            <MetricCard
              title="Information Ratio"
              value={data.metrics.informationRatio}
              format="ratio"
              description="Active return per unit of risk"
            />
            <MetricCard
              title="Sortino Ratio"
              value={data.metrics.sortinoRatio}
              benchmark={data.benchmark.sortinoRatio}
              format="ratio"
              description="Downside risk-adjusted return"
            />
            <MetricCard
              title="Calmar Ratio"
              value={data.metrics.calmarRatio}
              benchmark={data.benchmark.calmarRatio}
              format="ratio"
              description="Return vs max drawdown"
            />
          </div>
          </TabsContent>

          <TabsContent value="radar">
          <div>
            <h4 className="font-medium mb-3">Performance Radar</h4>
            <RadarMetrics metrics={data.metrics} />
          </div>
          </TabsContent>
        </div>
      </Tabs>
    </Card>
  );
}