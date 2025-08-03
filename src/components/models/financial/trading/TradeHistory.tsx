'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  Calendar, 
  Download, 
  Filter,
  TrendingUp,
  TrendingDown,
  Clock
} from 'lucide-react';

interface Trade {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  quantity: number;
  price: number;
  total: number;
  fee: number;
  timestamp: string;
  status: 'completed' | 'cancelled' | 'pending';
  pnl?: number;
}

export function TradeHistory() {
  const [trades] = useState<Trade[]>([
    {
      id: 'T001',
      symbol: 'BTC/USDT',
      type: 'buy',
      quantity: 0.5,
      price: 42500,
      total: 21250,
      fee: 21.25,
      timestamp: '2025-01-15T10:30:00',
      status: 'completed',
      pnl: 650
    },
    {
      id: 'T002',
      symbol: 'ETH/USDT',
      type: 'sell',
      quantity: 5,
      price: 2350,
      total: 11750,
      fee: 11.75,
      timestamp: '2025-01-14T15:45:00',
      status: 'completed',
      pnl: -125
    },
    {
      id: 'T003',
      symbol: 'SOL/USDT',
      type: 'buy',
      quantity: 10,
      price: 98,
      total: 980,
      fee: 0.98,
      timestamp: '2025-01-14T09:20:00',
      status: 'completed'
    },
    {
      id: 'T004',
      symbol: 'BTC/USDT',
      type: 'sell',
      quantity: 0.25,
      price: 43200,
      total: 10800,
      fee: 10.80,
      timestamp: '2025-01-13T14:00:00',
      status: 'cancelled'
    }
  ]);

  const [filterType, setFilterType] = useState<'all' | 'buy' | 'sell'>('all');
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d' | 'all'>('7d');

  const filteredTrades = trades.filter(trade => 
    filterType === 'all' ? true : trade.type === filterType
  );

  const totalVolume = filteredTrades
    .filter(t => t.status === 'completed')
    .reduce((sum, trade) => sum + trade.total, 0);

  const totalFees = filteredTrades
    .filter(t => t.status === 'completed')
    .reduce((sum, trade) => sum + trade.fee, 0);

  const totalPnL = filteredTrades
    .filter(t => t.status === 'completed' && t.pnl)
    .reduce((sum, trade) => sum + (trade.pnl || 0), 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Trade History</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-background-secondary rounded-lg p-3">
            <div className="text-sm text-text-secondary">Total Volume</div>
            <div className="text-xl font-bold">${totalVolume.toFixed(2)}</div>
          </div>
          <div className="bg-background-secondary rounded-lg p-3">
            <div className="text-sm text-text-secondary">Total Fees</div>
            <div className="text-xl font-bold">${totalFees.toFixed(2)}</div>
          </div>
          <div className="bg-background-secondary rounded-lg p-3">
            <div className="text-sm text-text-secondary">Realized P&L</div>
            <div className={`text-xl font-bold ${totalPnL >= 0 ? 'text-success' : 'text-error'}`}>
              ${totalPnL >= 0 ? '+' : ''}{totalPnL.toFixed(2)}
            </div>
          </div>
          <div className="bg-background-secondary rounded-lg p-3">
            <div className="text-sm text-text-secondary">Total Trades</div>
            <div className="text-xl font-bold">{filteredTrades.length}</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-4">
          <Button
            variant={filterType === 'all' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilterType('all')}
          >
            All
          </Button>
          <Button
            variant={filterType === 'buy' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilterType('buy')}
          >
            Buy
          </Button>
          <Button
            variant={filterType === 'sell' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilterType('sell')}
          >
            Sell
          </Button>
        </div>

        {/* Trade List */}
        <div className="space-y-2">
          {filteredTrades.map((trade) => (
            <div 
              key={trade.id}
              className="flex items-center justify-between p-3 bg-background-secondary rounded-lg hover:bg-background-tertiary transition-colors"
            >
              <div className="flex items-center gap-3">
                <Badge 
                  variant={trade.type === 'buy' ? 'success' : 'error'}
                  className="text-xs"
                >
                  {trade.type.toUpperCase()}
                </Badge>
                <div>
                  <div className="font-medium">{trade.symbol}</div>
                  <div className="text-sm text-text-secondary">
                    {trade.quantity} @ ${trade.price}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {trade.pnl !== undefined && (
                  <div className={`flex items-center gap-1 ${trade.pnl >= 0 ? 'text-success' : 'text-error'}`}>
                    {trade.pnl >= 0 ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    <span className="text-sm font-medium">
                      ${Math.abs(trade.pnl).toFixed(2)}
                    </span>
                  </div>
                )}
                
                <div className="text-right">
                  <div className="font-medium">${trade.total.toFixed(2)}</div>
                  <div className="text-xs text-text-secondary flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(trade.timestamp).toLocaleDateString()}
                  </div>
                </div>

                <Badge 
                  variant={
                    trade.status === 'completed' ? 'success' : 
                    trade.status === 'cancelled' ? 'secondary' : 
                    'outline'
                  }
                  className="text-xs"
                >
                  {trade.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* View More */}
        <div className="mt-4 pt-4 border-t border-border">
          <Button className="w-full" variant="outline">
            View All Trades
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}