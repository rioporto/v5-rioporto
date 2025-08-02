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
  
  // Mock order book data
  const orderBookData = {
    symbol: selectedPair,
    bids: [
      { price: 342100, quantity: 0.5, total: 171050 },
      { price: 342050, quantity: 1.2, total: 410460 },
      { price: 342000, quantity: 0.8, total: 273600 },
      { price: 341950, quantity: 2.1, total: 718095 },
      { price: 341900, quantity: 0.3, total: 102570 }
    ],
    asks: [
      { price: 342200, quantity: 0.7, total: 239540 },
      { price: 342250, quantity: 1.5, total: 513375 },
      { price: 342300, quantity: 0.9, total: 308070 },
      { price: 342350, quantity: 1.8, total: 616230 },
      { price: 342400, quantity: 0.4, total: 136960 }
    ],
    lastPrice: 342156.78,
    spread: 100,
    spreadPercent: 0.029
  };

  return (
    <div className="h-full bg-background">
      <div className="grid grid-cols-12 grid-rows-12 gap-1 h-full p-1">
        {/* Main Chart Area */}
        <div className="col-span-8 row-span-8 bg-card rounded border border-border">
          <TradingChart pair={selectedPair} />
        </div>

        {/* Order Book */}
        <div className="col-span-4 row-span-8 bg-card rounded border border-border">
          <OrderBook data={orderBookData} />
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