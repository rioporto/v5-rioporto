'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { TrendingUp, TrendingDown, Eye, XCircle } from 'lucide-react';

interface Position {
  id: string;
  symbol: string;
  quantity: number;
  entryPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
  type: 'long' | 'short';
}

export function PositionsPanel() {
  const [positions] = useState<Position[]>([
    {
      id: 'POS001',
      symbol: 'BTC/USDT',
      quantity: 0.5,
      entryPrice: 42500,
      currentPrice: 43800,
      pnl: 650,
      pnlPercent: 3.06,
      type: 'long'
    },
    {
      id: 'POS002',
      symbol: 'ETH/USDT',
      quantity: 5,
      entryPrice: 2300,
      currentPrice: 2250,
      pnl: -250,
      pnlPercent: -2.17,
      type: 'long'
    },
    {
      id: 'POS003',
      symbol: 'SOL/USDT',
      quantity: 10,
      entryPrice: 98,
      currentPrice: 95,
      pnl: -30,
      pnlPercent: -3.06,
      type: 'short'
    }
  ]);

  const totalPnL = positions.reduce((acc, pos) => acc + pos.pnl, 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Posições Abertas</CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-secondary">P&L Total:</span>
            <span className={`font-bold ${totalPnL >= 0 ? 'text-success' : 'text-error'}`}>
              ${totalPnL >= 0 ? '+' : ''}{totalPnL.toFixed(2)}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {positions.map((position) => (
            <div 
              key={position.id} 
              className="flex items-center justify-between p-3 bg-background-secondary rounded-lg hover:bg-background-tertiary transition-colors"
            >
              <div className="flex items-center gap-3">
                <Badge variant={position.type === 'long' ? 'success' : 'error'} className="text-xs">
                  {position.type.toUpperCase()}
                </Badge>
                <div>
                  <div className="font-medium">{position.symbol}</div>
                  <div className="text-sm text-text-secondary">
                    Qtd: {position.quantity} @ ${position.entryPrice}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className={`font-medium ${position.pnl >= 0 ? 'text-success' : 'text-error'}`}>
                    ${position.pnl >= 0 ? '+' : ''}{position.pnl.toFixed(2)}
                  </div>
                  <div className={`text-sm flex items-center gap-1 ${position.pnl >= 0 ? 'text-success' : 'text-error'}`}>
                    {position.pnl >= 0 ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {position.pnl >= 0 ? '+' : ''}{position.pnlPercent.toFixed(2)}%
                  </div>
                </div>

                <div className="flex gap-1">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-error hover:text-error">
                    <XCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <Button className="w-full" variant="outline">
            Ver Todas as Posições
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}