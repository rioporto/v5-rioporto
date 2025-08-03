'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { 
  OrderBook,
  TradeExecution,
  TradingChart,
  AdvancedChart,
  TradeHistory
} from '@/components/trading-system';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  LineChart, 
  History, 
  Activity, 
  BarChart3,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Settings
} from 'lucide-react';

export default function TradingPage() {
  const [selectedPair, setSelectedPair] = React.useState('BTC/BRL');
  const [activeTab, setActiveTab] = React.useState<'spot' | 'advanced' | 'history' | 'analysis'>('spot');

  const marketData = {
    price: 245890.50,
    change24h: 2.34,
    high24h: 248500.00,
    low24h: 241200.00,
    volume24h: 1234567890
  };

  const tabs = [
    { id: 'spot', label: 'Spot Trading', icon: <LineChart className="w-4 h-4" /> },
    { id: 'advanced', label: 'Advanced Charts', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'history', label: 'Trade History', icon: <History className="w-4 h-4" /> },
    { id: 'analysis', label: 'Market Analysis', icon: <Activity className="w-4 h-4" /> }
  ];

  return (
    <div className="max-w-[1920px] mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <LineChart className="w-8 h-8 text-blue-500" />
            Trading Terminal
          </h1>
          <p className="text-muted-foreground mt-2">
            Professional crypto trading with advanced tools and real-time data
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-sm text-muted-foreground">{selectedPair}</p>
                <p className="text-2xl font-bold">
                  R$ {marketData.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className={cn(
                'flex items-center gap-1',
                marketData.change24h >= 0 ? 'text-green-500' : 'text-red-500'
              )}>
                {marketData.change24h >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                <span className="font-bold">{Math.abs(marketData.change24h)}%</span>
              </div>
            </div>
          </Card>
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Market Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">24h High</p>
          <p className="text-xl font-bold text-green-500">
            R$ {marketData.high24h.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">24h Low</p>
          <p className="text-xl font-bold text-red-500">
            R$ {marketData.low24h.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">24h Volume</p>
          <p className="text-xl font-bold">
            R$ {(marketData.volume24h / 1000000).toFixed(2)}M
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Market Cap</p>
          <p className="text-xl font-bold">
            R$ 4.8T
          </p>
        </Card>
      </div>

      {/* Navigation Tabs */}
      <Card className="p-2">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'primary' : 'ghost'}
              onClick={() => setActiveTab(tab.id as any)}
              className="flex items-center gap-2"
            >
              {tab.icon}
              {tab.label}
            </Button>
          ))}
        </div>
      </Card>

      {/* Content */}
      {activeTab === 'spot' && (
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Order Book */}
          <div className="col-span-12 lg:col-span-3">
            <OrderBook 
              pair={selectedPair}
              onOrderClick={(order, side) => {
                console.log('Order clicked:', order, side);
              }}
            />
          </div>

          {/* Middle Column - Chart & Trade Form */}
          <div className="col-span-12 lg:col-span-6 space-y-6">
            <TradingChart 
              pair={selectedPair}
              chartType="candlestick"
            />
            <TradeExecution 
              pair={selectedPair}
            />
          </div>

          {/* Right Column - Recent Trades */}
          <div className="col-span-12 lg:col-span-3">
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4">Recent Trades</h3>
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {Array.from({ length: 20 }, (_, i) => ({
                  price: marketData.price * (1 + (Math.random() - 0.5) * 0.001),
                  amount: Math.random() * 0.5,
                  type: Math.random() > 0.5 ? 'buy' : 'sell',
                  time: new Date(Date.now() - i * 60000)
                })).map((trade, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className={trade.type === 'buy' ? 'text-green-500' : 'text-red-500'}>
                      {trade.price.toFixed(2)}
                    </span>
                    <span className="text-muted-foreground">
                      {trade.amount.toFixed(4)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {trade.time.toLocaleTimeString()}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'advanced' && (
        <AdvancedChart 
          pair={selectedPair}
        />
      )}

      {activeTab === 'history' && (
        <TradeHistory 
          onTradeClick={(trade) => console.log('Trade clicked:', trade)}
          onExport={() => console.log('Export trades')}
        />
      )}

      {activeTab === 'analysis' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Market Overview</h3>
            <TradingChart 
              pair={selectedPair}
              chartType="line"
            />
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Volume Analysis</h3>
            <TradingChart 
              pair={selectedPair}
              chartType="area"
            />
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Technical Indicators</h3>
            <div className="space-y-4">
              {[
                { name: 'RSI', value: 65.4, signal: 'Overbought', color: 'text-yellow-500' },
                { name: 'MACD', value: 'Bullish', signal: 'Buy', color: 'text-green-500' },
                { name: 'Bollinger Bands', value: 'Upper Band', signal: 'Caution', color: 'text-orange-500' },
                { name: 'Moving Average', value: 'Above MA50', signal: 'Bullish', color: 'text-green-500' }
              ].map((indicator) => (
                <div key={indicator.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">{indicator.name}</p>
                    <p className="text-sm text-muted-foreground">{indicator.value}</p>
                  </div>
                  <Badge variant="outline" className={indicator.color}>
                    {indicator.signal}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Market Sentiment</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Fear & Greed Index</span>
                <Badge variant="outline" className="text-green-500 border-green-500/20">
                  72 - Greed
                </Badge>
              </div>
              <div className="w-full h-4 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full relative">
                <div className="absolute top-1/2 -translate-y-1/2 left-[72%] w-3 h-3 bg-white rounded-full shadow-lg" />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-500">65%</p>
                  <p className="text-sm text-muted-foreground">Bullish</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-500">35%</p>
                  <p className="text-sm text-muted-foreground">Bearish</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}