'use client';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity,
  Globe,
  Clock,
  RefreshCw
} from 'lucide-react';

const marketStats = [
  {
    label: 'Market Cap',
    value: '$2.1T',
    change: '+2.45%',
    isPositive: true,
  },
  {
    label: 'BTC Dominance',
    value: '52.3%',
    change: '+0.8%',
    isPositive: true,
  },
  {
    label: '24h Volume',
    value: '$89.5B',
    change: '-5.2%',
    isPositive: false,
  },
  {
    label: 'Fear & Greed',
    value: '68',
    change: 'Greed',
    isPositive: true,
    badge: 'Greed',
  },
];

const topMovers = [
  { symbol: 'SOL', price: 245.67, change: 12.45, volume: '2.1B' },
  { symbol: 'AVAX', price: 89.23, change: 8.92, volume: '890M' },
  { symbol: 'DOT', price: 15.67, change: -6.78, volume: '456M' },
  { symbol: 'LINK', price: 28.94, change: 5.32, volume: '678M' },
];

export function MarketOverview() {
  return (
    <div className="space-y-6">
      {/* Market Stats */}
      <Card>
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <h3 className="font-semibold">Market Overview</h3>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>Updated 30s ago</span>
              </div>
              <Button variant="ghost" size="sm">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {marketStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
                <div className="text-lg font-bold mb-1">{stat.value}</div>
                <div className="flex items-center justify-center space-x-1">
                  {stat.isPositive ? (
                    <TrendingUp className="w-3 h-3 text-success" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-error" />
                  )}
                  <span className={`text-xs ${
                    stat.isPositive ? 'text-success' : 'text-error'
                  }`}>
                    {stat.change}
                  </span>
                  {stat.badge && (
                    <Badge 
                      variant="outline" 
                      size="sm"
                      className={`text-xs ${
                        stat.isPositive ? 'border-success/20 text-success' : 'border-error/20 text-error'
                      }`}
                    >
                      {stat.badge}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Top Movers */}
      <Card>
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4" />
            <h3 className="font-semibold">Top Movers (24h)</h3>
          </div>
        </div>

        <div className="p-4">
          <div className="space-y-3">
            {topMovers.map((mover) => (
              <div key={mover.symbol} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium">{mover.symbol}</span>
                  </div>
                  <div>
                    <div className="font-medium text-sm">{mover.symbol}</div>
                    <div className="text-xs text-muted-foreground">Vol: ${mover.volume}</div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-mono text-sm">${mover.price}</div>
                  <div className={`text-xs flex items-center ${
                    mover.change >= 0 ? 'text-success' : 'text-error'
                  }`}>
                    {mover.change >= 0 ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    {mover.change >= 0 ? '+' : ''}{mover.change}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}