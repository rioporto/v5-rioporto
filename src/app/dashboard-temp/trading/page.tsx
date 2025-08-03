'use client';

import React from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Container } from '@/components/layout/Container';
import { 
  OrderBook 
} from '@/components/trading-system/order-book';
import {
  OrderForm
} from '@/components/trading-system/execution';
import {
  TradingChart
} from '@/components/trading-system/charts';
import {
  TradeHistory
} from '@/components/trading-system/history';
import { Tabs } from '@/components/ui/Tabs';
import { CandlestickChart, History, Activity, BarChart3 } from 'lucide-react';

export default function TradingPage() {
  const [selectedPair, setSelectedPair] = React.useState('BTC/USDT');
  
  const tabs = [
    {
      value: 'spot',
      label: 'Spot Trading',
      icon: <CandlestickChart className="w-4 h-4" />,
      content: (
        <div className="grid grid-cols-12 gap-4">
          {/* Left Column - Order Book & Trade History */}
          <div className="col-span-12 lg:col-span-3 space-y-4">
            <OrderBook 
              pair={selectedPair}
              onOrderClick={(order, side) => {
                console.log('Order clicked:', order, side);
              }}
            />
            <TradeHistory 
              showFilters={false}
            />
          </div>

          {/* Middle Column - Chart */}
          <div className="col-span-12 lg:col-span-6">
            <TradingChart 
              pair={selectedPair}
              chartType="candlestick"
            />
          </div>

          {/* Right Column - Order Form */}
          <div className="col-span-12 lg:col-span-3">
            <OrderForm 
              pair={selectedPair}
            />
          </div>
        </div>
      )
    },
    {
      value: 'history',
      label: 'Trade History',
      icon: <History className="w-4 h-4" />,
      content: (
        <TradeHistory />
      )
    },
    {
      value: 'analysis',
      label: 'Market Analysis',
      icon: <Activity className="w-4 h-4" />,
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TradingChart 
            pair={selectedPair}
            chartType="line"
          />
          <TradingChart 
            pair="ETH/USDT"
            chartType="area"
          />
        </div>
      )
    }
  ];

  return (
    <ProtectedRoute>
      <Container className="py-8 max-w-[1600px]">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Trading Terminal
          </h1>
          <p className="text-muted-foreground">
            Professional crypto trading with advanced tools and real-time data
          </p>
        </div>

        <Tabs defaultValue="spot" tabs={tabs} className="space-y-6" />
      </Container>
    </ProtectedRoute>
  );
}