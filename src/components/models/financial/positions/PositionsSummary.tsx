'use client';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Target,
  Shield,
  MoreHorizontal,
  Eye
} from 'lucide-react';

const positions = [
  {
    id: '1',
    symbol: 'BTC/BRL',
    side: 'long' as const,
    size: 0.5,
    entryPrice: 340000,
    currentPrice: 342156.78,
    pnl: 1078.39,
    pnlPercent: 0.63,
    stopLoss: 335000,
    takeProfit: 350000,
  },
  {
    id: '2',
    symbol: 'ETH/BRL',
    side: 'long' as const,
    size: 2.5,
    entryPrice: 12500,
    currentPrice: 12650,
    pnl: 375,
    pnlPercent: 1.2,
    stopLoss: 12000,
    takeProfit: 13500,
  },
  {
    id: '3',
    symbol: 'SOL/BRL',
    side: 'short' as const,
    size: 10,
    entryPrice: 250,
    currentPrice: 245.67,
    pnl: 43.30,
    pnlPercent: 1.73,
  },
];

export function PositionsSummary() {
  const totalPnL = positions.reduce((sum, pos) => sum + pos.pnl, 0);
  const totalValue = positions.reduce((sum, pos) => sum + (pos.size * pos.currentPrice), 0);

  return (
    <Card>
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4" />
            <h3 className="font-semibold">Active Positions</h3>
            <Badge variant="outline">{positions.length}</Badge>
          </div>
          <Button variant="ghost" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            View All
          </Button>
        </div>
      </div>

      <div className="p-4">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">Total Value</div>
            <div className="text-lg font-bold">
              R$ {totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </div>
          
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">Total P&L</div>
            <div className={`text-lg font-bold flex items-center justify-center ${
              totalPnL >= 0 ? 'text-success' : 'text-error'
            }`}>
              {totalPnL >= 0 ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1" />
              )}
              {totalPnL >= 0 ? '+' : ''}R$ {totalPnL.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </div>
        </div>

        {/* Positions List */}
        <div className="space-y-3">
          {positions.map((position) => (
            <div key={position.id} className="p-3 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant={position.side === 'long' ? 'success' : 'error'}
                    size="sm"
                  >
                    {position.side.toUpperCase()}
                  </Badge>
                  <span className="font-medium text-sm">{position.symbol}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className={`text-sm font-medium ${
                    position.pnl >= 0 ? 'text-success' : 'text-error'
                  }`}>
                    {position.pnl >= 0 ? '+' : ''}R$ {position.pnl.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <Button variant="ghost" size="sm" className="p-1">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs mb-3">
                <div>
                  <div className="text-muted-foreground">Size</div>
                  <div className="font-mono">{position.size} {position.symbol.split('/')[0]}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Entry</div>
                  <div className="font-mono">R$ {position.entryPrice.toLocaleString('pt-BR')}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Current</div>
                  <div className="font-mono">R$ {position.currentPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                </div>
              </div>

              {/* Risk Management Indicators */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-3">
                  {position.stopLoss && (
                    <div className="flex items-center space-x-1 text-error">
                      <Shield className="w-3 h-3" />
                      <span>SL: R$ {position.stopLoss.toLocaleString('pt-BR')}</span>
                    </div>
                  )}
                  {position.takeProfit && (
                    <div className="flex items-center space-x-1 text-success">
                      <Target className="w-3 h-3" />
                      <span>TP: R$ {position.takeProfit.toLocaleString('pt-BR')}</span>
                    </div>
                  )}
                </div>
                
                <div className={`font-medium ${
                  position.pnlPercent >= 0 ? 'text-success' : 'text-error'
                }`}>
                  {position.pnlPercent >= 0 ? '+' : ''}{position.pnlPercent}%
                </div>
              </div>

              {/* P&L Progress Bar */}
              {position.stopLoss && position.takeProfit && (
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>SL</span>
                    <span>TP</span>
                  </div>
                  <div className="relative">
                    <Progress 
                      value={50} // This would be calculated based on current price vs SL/TP
                      className="h-1" 
                    />
                    <div 
                      className="absolute top-0 w-1 h-1 bg-foreground rounded-full"
                      style={{ left: '60%' }} // Current position indicator
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {positions.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Target className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No active positions</p>
          </div>
        )}
      </div>
    </Card>
  );
}