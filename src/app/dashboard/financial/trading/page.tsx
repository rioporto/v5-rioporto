'use client';

import { useState } from 'react';
import { TradingInterface } from '@/components/models/financial/trading/TradingInterface';
import { OrderBook } from '@/components/models/financial/trading/OrderBook';
import { TradingChart } from '@/components/models/financial/trading/TradingChart';
import { TradeHistory } from '@/components/models/financial/trading/TradeHistory';
import { PositionsPanel } from '@/components/models/financial/positions/PositionsPanel';
import { QuickTrade } from '@/components/models/financial/execution/QuickTrade';
import { AdvancedOrder } from '@/components/models/financial/execution/AdvancedOrder';
import { Tabs } from '@/components/ui/Tabs';
import { Button } from '@/components/ui/Button';
import { 
  Layout, 
  Maximize2, 
  Grid3X3, 
  Monitor,
  Settings
} from 'lucide-react';

const layoutModes = [
  { id: 'professional', label: 'Professional', icon: Monitor },
  { id: 'minimal', label: 'Minimal', icon: Layout },
  { id: 'grid', label: 'Grid', icon: Grid3X3 },
];

const tradeTypeTabs = [
  { id: 'spot', label: 'Spot' },
  { id: 'margin', label: 'Margin' },
  { id: 'futures', label: 'Futures' },
];

export default function TradingPage() {
  const [layoutMode, setLayoutMode] = useState('professional');
  const [tradeType, setTradeType] = useState('spot');
  const [selectedPair, setSelectedPair] = useState('BTC/BRL');
  const [fullscreenChart, setFullscreenChart] = useState(false);

  if (fullscreenChart) {
    return (
      <div className="h-full flex flex-col bg-background">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-bold">{selectedPair}</h2>
            <div className="text-2xl font-mono text-primary">R$ 342.156,78</div>
            <div className="text-sm text-success">+2.34%</div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setFullscreenChart(false)}
          >
            Exit Fullscreen
          </Button>
        </div>
        <div className="flex-1">
          <TradingChart 
            pair={selectedPair}
            fullscreen={true}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Trading Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold">Trading Terminal</h1>
            <div className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
              LIVE
            </div>
          </div>
          
          <Tabs
            items={tradeTypeTabs}
            value={tradeType}
            onValueChange={setTradeType}
            size="sm"
          />
        </div>

        <div className="flex items-center space-x-2">
          {/* Layout Mode Selector */}
          <div className="flex rounded-lg border border-border overflow-hidden">
            {layoutModes.map((mode) => {
              const Icon = mode.icon;
              return (
                <Button
                  key={mode.id}
                  variant={layoutMode === mode.id ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setLayoutMode(mode.id)}
                  className="rounded-none border-0"
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {mode.label}
                </Button>
              );
            })}
          </div>

          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Trading Layout */}
      <div className="flex-1 overflow-hidden">
        {layoutMode === 'professional' && (
          <div className="h-full grid grid-cols-12 grid-rows-12 gap-1 p-1">
            {/* Chart Area */}
            <div className="col-span-8 row-span-8 bg-card rounded border border-border relative">
              <div className="absolute top-2 right-2 z-10">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFullscreenChart(true)}
                >
                  <Maximize2 className="w-4 h-4" />
                </Button>
              </div>
              <TradingChart pair={selectedPair} />
            </div>

            {/* Order Book */}
            <div className="col-span-4 row-span-8 bg-card rounded border border-border">
              <OrderBook pair={selectedPair} />
            </div>

            {/* Trading Interface */}
            <div className="col-span-4 row-span-4 bg-card rounded border border-border">
              <QuickTrade pair={selectedPair} />
            </div>

            {/* Advanced Orders */}
            <div className="col-span-4 row-span-4 bg-card rounded border border-border">
              <AdvancedOrder pair={selectedPair} />
            </div>

            {/* Positions */}
            <div className="col-span-4 row-span-4 bg-card rounded border border-border">
              <PositionsPanel />
            </div>
          </div>
        )}

        {layoutMode === 'minimal' && (
          <div className="h-full grid grid-cols-3 gap-4 p-4">
            <div className="col-span-2 bg-card rounded border border-border">
              <TradingChart pair={selectedPair} />
            </div>
            <div className="space-y-4">
              <div className="bg-card rounded border border-border">
                <QuickTrade pair={selectedPair} />
              </div>
              <div className="bg-card rounded border border-border">
                <OrderBook pair={selectedPair} compact />
              </div>
            </div>
          </div>
        )}

        {layoutMode === 'grid' && (
          <div className="h-full grid grid-cols-2 grid-rows-2 gap-4 p-4">
            <div className="bg-card rounded border border-border">
              <TradingChart pair={selectedPair} />
            </div>
            <div className="bg-card rounded border border-border">
              <OrderBook pair={selectedPair} />
            </div>
            <div className="bg-card rounded border border-border">
              <QuickTrade pair={selectedPair} />
            </div>
            <div className="bg-card rounded border border-border">
              <PositionsPanel />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}