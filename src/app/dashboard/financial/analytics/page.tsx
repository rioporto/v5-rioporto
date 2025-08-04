'use client';

import { useState, useMemo } from 'react';
import { PerformanceChart } from '@/components/models/financial/analytics/PerformanceChart';
import { RiskMetrics } from '@/components/models/financial/analytics/RiskMetrics';
import { TradingStats } from '@/components/models/financial/analytics/TradingStats';
import { ProfitLossAnalysis } from '@/components/models/financial/analytics/ProfitLossAnalysis';
import { DrawdownChart } from '@/components/models/financial/analytics/DrawdownChart';
import { HeatmapChart } from '@/components/models/financial/analytics/HeatmapChart';
import { Card } from '@/components/ui/Card';
import { Tabs } from '@/components/ui/Tabs';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Activity,
  Calendar,
  Download,
  Settings,
  RefreshCw
} from 'lucide-react';

const analyticsTabs = [
  { id: 'overview', label: 'Overview', icon: TrendingUp },
  { id: 'performance', label: 'Performance', icon: BarChart3 },
  { id: 'risk', label: 'Risk Analysis', icon: Activity },
  { id: 'correlation', label: 'Correlation', icon: PieChart },
];

const timeFrames = [
  { value: '7d', label: '7 Days' },
  { value: '30d', label: '30 Days' },
  { value: '90d', label: '3 Months' },
  { value: '1y', label: '1 Year' },
  { value: 'all', label: 'All Time' },
];

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeFrame, setTimeFrame] = useState('30d');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  // Mock portfolio metrics
  const portfolioMetrics = useMemo(() => ({
    totalValue: 125840.50,
    totalReturn: 15.67,
    sharpeRatio: 1.24,
    maxDrawdown: -8.45,
    winRate: 68.5,
    avgWin: 2.34,
    avgLoss: -1.89,
    profitFactor: 1.87,
    volatility: 12.5,
    beta: 0.85,
  }), [timeFrame]);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border bg-card">
        <div className="flex items-center space-x-6">
          <div>
            <h1 className="text-2xl font-bold">Analytics</h1>
            <p className="text-sm text-muted-foreground">
              Advanced trading performance analysis
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Select
            value={timeFrame}
            onChange={(value) => setTimeFrame(value)}
            options={timeFrames}
            placeholder="Select time frame"
          />
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border bg-card">
        <div className="px-6 py-4">
          <div className="flex space-x-6">
            {analyticsTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center space-x-2 pb-3 px-1 border-b-2 transition-all
                    ${activeTab === tab.id 
                      ? 'border-primary text-primary' 
                      : 'border-transparent text-muted-foreground hover:text-foreground'}
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {activeTab === 'overview' && (
          <div className="p-6 space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <div className="p-4">
                  <div className="text-sm text-muted-foreground mb-1">Portfolio Value</div>
                  <div className="text-2xl font-bold">
                    R$ {portfolioMetrics.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-sm text-success">
                    +{portfolioMetrics.totalReturn}% total return
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-4">
                  <div className="text-sm text-muted-foreground mb-1">Sharpe Ratio</div>
                  <div className="text-2xl font-bold">
                    {portfolioMetrics.sharpeRatio}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Risk-adjusted return
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-4">
                  <div className="text-sm text-muted-foreground mb-1">Max Drawdown</div>
                  <div className="text-2xl font-bold text-error">
                    {portfolioMetrics.maxDrawdown}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Maximum decline
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-4">
                  <div className="text-sm text-muted-foreground mb-1">Win Rate</div>
                  <div className="text-2xl font-bold">
                    {portfolioMetrics.winRate}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Profitable trades
                  </div>
                </div>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Portfolio Performance</h3>
                  <PerformanceChart />
                </div>
              </Card>

              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Profit & Loss Distribution</h3>
                  <ProfitLossAnalysis />
                </div>
              </Card>
            </div>

            {/* Trading Stats */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Trading Statistics</h3>
                <TradingStats />
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Cumulative Returns</h3>
                  <PerformanceChart />
                </div>
              </Card>

              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Drawdown Analysis</h3>
                  <DrawdownChart />
                </div>
              </Card>
            </div>

            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Monthly Returns Heatmap</h3>
                <HeatmapChart />
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'risk' && (
          <div className="p-6 space-y-6">
            <RiskMetrics />
          </div>
        )}

        {activeTab === 'correlation' && (
          <div className="p-6">
            <Card>
              <div className="p-6 text-center">
                <div className="text-muted-foreground mb-4">
                  Correlation analysis coming soon
                </div>
                <Button variant="outline">
                  Configure Assets
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}