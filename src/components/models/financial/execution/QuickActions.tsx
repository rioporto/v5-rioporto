'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Zap,
  Target,
  Shield,
  Calculator,
  Clock,
  DollarSign
} from 'lucide-react';

const quickBuyAmounts = [
  { label: 'R$ 100', value: 100 },
  { label: 'R$ 500', value: 500 },
  { label: 'R$ 1K', value: 1000 },
  { label: 'R$ 5K', value: 5000 },
];

const popularPairs = [
  { symbol: 'BTC/BRL', price: 342156.78, change: 2.34 },
  { symbol: 'ETH/BRL', price: 12650.45, change: -1.25 },
  { symbol: 'SOL/BRL', price: 245.67, change: 5.12 },
  { symbol: 'ADA/BRL', price: 2.15, change: -0.87 },
];

export function QuickActions() {
  const [selectedPair, setSelectedPair] = useState('BTC/BRL');
  const [selectedAmount, setSelectedAmount] = useState(500);

  return (
    <div className="space-y-6">
      {/* Quick Buy/Sell */}
      <Card>
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4" />
            <h3 className="font-semibold">Quick Actions</h3>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Pair Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Asset</label>
            <div className="grid grid-cols-1 gap-2">
              {popularPairs.map((pair) => (
                <button
                  key={pair.symbol}
                  onClick={() => setSelectedPair(pair.symbol)}
                  className={`p-3 rounded-lg border text-left transition-colors ${
                    selectedPair === pair.symbol
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:bg-accent'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">{pair.symbol}</div>
                      <div className="text-xs text-muted-foreground">
                        R$ {pair.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                    <div className={`text-xs font-medium ${
                      pair.change >= 0 ? 'text-success' : 'text-error'
                    }`}>
                      {pair.change >= 0 ? '+' : ''}{pair.change}%
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Amount Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Quick Amount</label>
            <div className="grid grid-cols-2 gap-2">
              {quickBuyAmounts.map((amount) => (
                <button
                  key={amount.value}
                  onClick={() => setSelectedAmount(amount.value)}
                  className={`p-2 rounded-lg border text-sm font-medium transition-colors ${
                    selectedAmount === amount.value
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:bg-accent'
                  }`}
                >
                  {amount.label}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <Button className="bg-success hover:bg-success/90">
              <TrendingUp className="w-4 h-4 mr-2" />
              Quick Buy
            </Button>
            <Button variant="outline" className="border-error text-error hover:bg-error/10">
              <TrendingDown className="w-4 h-4 mr-2" />
              Quick Sell
            </Button>
          </div>

          <div className="text-xs text-muted-foreground text-center pt-2">
            Market order • Executes immediately
          </div>
        </div>
      </Card>

      {/* Quick Tools */}
      <Card>
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-sm">Trading Tools</h3>
        </div>

        <div className="p-4 space-y-2">
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <Calculator className="w-4 h-4 mr-2" />
            Position Calculator
          </Button>
          
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <Target className="w-4 h-4 mr-2" />
            Take Profit Manager
          </Button>
          
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <Shield className="w-4 h-4 mr-2" />
            Stop Loss Manager
          </Button>
          
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <Clock className="w-4 h-4 mr-2" />
            Order Scheduler
          </Button>
        </div>
      </Card>

      {/* Portfolio Summary */}
      <Card>
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-sm">Portfolio Quick View</h3>
        </div>

        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total Value</span>
            <span className="font-mono font-semibold">R$ 125,840.50</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Today P&L</span>
            <span className="font-mono font-semibold text-success">+R$ 2,156.78</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Open Positions</span>
            <Badge variant="outline">8</Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Available</span>
            <span className="font-mono text-sm">R$ 15,420.50</span>
          </div>

          <Button variant="outline" size="sm" className="w-full mt-3">
            <DollarSign className="w-4 h-4 mr-2" />
            View Full Portfolio
          </Button>
        </div>
      </Card>
    </div>
  );
}