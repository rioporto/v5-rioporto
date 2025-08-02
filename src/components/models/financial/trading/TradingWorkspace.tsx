'use client';

import { useState } from 'react';
import { TradingChart } from './TradingChart';
import { OrderBook } from './OrderBook';
import { QuickTrade } from '../execution/QuickTrade';
import { AdvancedOrder } from '../execution/AdvancedOrder';
import { PositionsPanel } from '../positions/PositionsPanel';
import { TradeHistory } from './TradeHistory';

export function TradingWorkspace() {
  const [selectedPair] = useState('BTC/BRL');

  return (
    <div className="h-full bg-background">
      <div className="grid grid-cols-12 grid-rows-12 gap-1 h-full p-1">
        {/* Main Chart Area */}
        <div className="col-span-8 row-span-8 bg-card rounded border border-border">
          <TradingChart pair={selectedPair} />
        </div>

        {/* Order Book */}
        <div className="col-span-4 row-span-8 bg-card rounded border border-border">
          <OrderBook pair={selectedPair} />
        </div>

        {/* Quick Trade */}
        <div className="col-span-3 row-span-4 bg-card rounded border border-border">
          <QuickTrade pair={selectedPair} />
        </div>

        {/* Advanced Orders */}
        <div className="col-span-3 row-span-4 bg-card rounded border border-border">
          <AdvancedOrder pair={selectedPair} />
        </div>

        {/* Positions */}
        <div className="col-span-3 row-span-4 bg-card rounded border border-border">
          <PositionsPanel />
        </div>

        {/* Trade History */}
        <div className="col-span-3 row-span-4 bg-card rounded border border-border">
          <TradeHistory />
        </div>
      </div>
    </div>
  );
}