'use client';

import { useState } from 'react';
import { TradingWorkspace } from '@/components/models/financial/trading/TradingWorkspace';
import { MarketOverview } from '@/components/models/financial/market/MarketOverview';
import { PositionsSummary } from '@/components/models/financial/positions/PositionsSummary';
import { QuickActions } from '@/components/models/financial/execution/QuickActions';
import { Card } from '@/components/ui/Card';
import { Tabs } from '@/components/ui/Tabs';
import { 
  TrendingUp, 
  BarChart3, 
  Wallet, 
  Clock 
} from 'lucide-react';

const tabItems = [
  {
    id: 'overview',
    label: 'Overview',
    icon: TrendingUp,
  },
  {
    id: 'charts',
    label: 'Charts',
    icon: BarChart3,
  },
  {
    id: 'portfolio',
    label: 'Portfolio',
    icon: Wallet,
  },
  {
    id: 'history',
    label: 'History',
    icon: Clock,
  },
];

export default function FinancialDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="h-full flex flex-col">
      {/* Main Tabs */}
      <div className="border-b border-border bg-card">
        <div className="px-6 py-4">
          <div className="flex space-x-6">
            {tabItems.map((tab) => {
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

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'overview' && (
          <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
            {/* Left Column - Market Overview */}
            <div className="lg:col-span-2 space-y-6">
              <MarketOverview />
              <PositionsSummary />
            </div>
            
            {/* Right Column - Quick Actions */}
            <div className="space-y-6">
              <QuickActions />
            </div>
          </div>
        )}
        
        {activeTab === 'charts' && (
          <div className="h-full">
            <TradingWorkspace />
          </div>
        )}
        
        {activeTab === 'portfolio' && (
          <div className="h-full p-6">
            <Card className="h-full">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Portfolio Management</h3>
                <p className="text-muted-foreground">
                  Portfolio management interface coming soon...
                </p>
              </div>
            </Card>
          </div>
        )}
        
        {activeTab === 'history' && (
          <div className="h-full p-6">
            <Card className="h-full">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Trading History</h3>
                <p className="text-muted-foreground">
                  Trading history interface coming soon...
                </p>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}