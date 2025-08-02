'use client';

import { useState } from 'react';
import { PositionsTable } from '@/components/models/financial/positions/PositionsTable';
import { PositionDetails } from '@/components/models/financial/positions/PositionDetails';
import { RiskManager } from '@/components/models/financial/positions/RiskManager';
import { PerformanceChart } from '@/components/models/financial/analytics/PerformanceChart';
import { Card } from '@/components/ui/Card';
import { Tabs } from '@/components/ui/Tabs';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Shield, 
  BarChart3,
  Plus,
  Download,
  Settings
} from 'lucide-react';

const positionTabs = [
  { id: 'active', label: 'Active Positions' },
  { id: 'pending', label: 'Pending Orders' },
  { id: 'history', label: 'History' },
];

export default function PositionsPage() {
  const [activeTab, setActiveTab] = useState('active');
  const [selectedPosition, setSelectedPosition] = useState(null);

  // Mock data
  const portfolioStats = {
    totalValue: 125840.50,
    totalPnL: 12540.30,
    totalPnLPercent: 11.07,
    winRate: 68.5,
    positions: 8,
    exposure: 85.2,
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border bg-card">
        <div className="flex items-center space-x-6">
          <div>
            <h1 className="text-2xl font-bold">Positions</h1>
            <p className="text-sm text-muted-foreground">
              Manage your trading positions and risk
            </p>
          </div>
          
          {/* Portfolio Stats */}
          <div className="flex items-center space-x-6 pl-6 border-l border-border">
            <div>
              <div className="text-sm text-muted-foreground">Total Value</div>
              <div className="text-xl font-mono font-bold">
                R$ {portfolioStats.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">P&L</div>
              <div className={`text-xl font-mono font-bold flex items-center ${
                portfolioStats.totalPnL >= 0 ? 'text-success' : 'text-error'
              }`}>
                {portfolioStats.totalPnL >= 0 ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 mr-1" />
                )}
                R$ {Math.abs(portfolioStats.totalPnL).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Win Rate</div>
              <div className="text-xl font-mono font-bold">
                {portfolioStats.winRate}%
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            New Position
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border bg-card">
        <div className="px-6 py-4">
          <Tabs
            items={positionTabs}
            value={activeTab}
            onValueChange={setActiveTab}
            variant="underline"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex">
        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {activeTab === 'active' && (
            <div className="p-6 space-y-6">
              {/* Risk Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm text-muted-foreground">Portfolio Exposure</div>
                      <Shield className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="text-2xl font-bold">{portfolioStats.exposure}%</div>
                    <div className="w-full bg-muted rounded-full h-2 mt-2">
                      <div 
                        className="bg-primary rounded-full h-2 transition-all"
                        style={{ width: `${portfolioStats.exposure}%` }}
                      />
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm text-muted-foreground">Active Positions</div>
                      <BarChart3 className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="text-2xl font-bold">{portfolioStats.positions}</div>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="outline" size="sm">5 Long</Badge>
                      <Badge variant="outline" size="sm">3 Short</Badge>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm text-muted-foreground">Risk Score</div>
                      <div className="w-3 h-3 rounded-full bg-warning" />
                    </div>
                    <div className="text-2xl font-bold">Medium</div>
                    <div className="text-xs text-muted-foreground mt-2">
                      Based on position sizing and correlation
                    </div>
                  </div>
                </Card>
              </div>

              {/* Positions Table */}
              <Card>
                <PositionsTable 
                  onSelectPosition={setSelectedPosition}
                />
              </Card>
            </div>
          )}

          {activeTab === 'pending' && (
            <div className="p-6">
              <Card>
                <div className="p-6 text-center">
                  <div className="text-muted-foreground mb-4">No pending orders</div>
                  <Button>Create New Order</Button>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="p-6">
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Position History</h3>
                  <div className="space-y-4">
                    <PerformanceChart />
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>

        {/* Right Panel - Position Details */}
        {selectedPosition && (
          <div className="w-96 border-l border-border bg-card">
            <PositionDetails 
              position={selectedPosition}
              onClose={() => setSelectedPosition(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
}