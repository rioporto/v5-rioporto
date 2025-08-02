'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, MoreVertical, X } from 'lucide-react';

interface Position {
  id: string;
  crypto: string;
  type: 'LONG' | 'SHORT';
  amount: number;
  entryPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
  value: number;
  leverage: number;
  margin: number;
  liquidationPrice: number;
  stopLoss?: number;
  takeProfit?: number;
}

interface PositionsTableProps {
  className?: string;
}

export function PositionsTable({ className }: PositionsTableProps) {
  const [positions] = useState<Position[]>([
    {
      id: 'POS-001',
      crypto: 'BTC',
      type: 'LONG',
      amount: 0.5,
      entryPrice: 175000,
      currentPrice: 180000,
      pnl: 2500,
      pnlPercent: 2.86,
      value: 90000,
      leverage: 5,
      margin: 18000,
      liquidationPrice: 140000,
      stopLoss: 170000,
      takeProfit: 190000,
    },
    {
      id: 'POS-002',
      crypto: 'ETH',
      type: 'SHORT',
      amount: 10,
      entryPrice: 12500,
      currentPrice: 12000,
      pnl: 5000,
      pnlPercent: 4.0,
      value: 120000,
      leverage: 3,
      margin: 40000,
      liquidationPrice: 15000,
      stopLoss: 13000,
      takeProfit: 11000,
    },
    {
      id: 'POS-003',
      crypto: 'BNB',
      type: 'LONG',
      amount: 20,
      entryPrice: 1500,
      currentPrice: 1450,
      pnl: -1000,
      pnlPercent: -3.33,
      value: 29000,
      leverage: 2,
      margin: 14500,
      liquidationPrice: 1200,
    },
  ]);

  const getLiquidationRisk = (position: Position) => {
    const priceDiff = position.type === 'LONG' 
      ? position.currentPrice - position.liquidationPrice
      : position.liquidationPrice - position.currentPrice;
    const percentToLiquidation = (priceDiff / position.currentPrice) * 100;
    
    if (percentToLiquidation < 10) return { color: 'text-red-500', risk: 'Alto' };
    if (percentToLiquidation < 20) return { color: 'text-yellow-500', risk: 'Médio' };
    return { color: 'text-green-500', risk: 'Baixo' };
  };

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Posições Abertas</CardTitle>
        <Badge variant="outline">
          {positions.length} Posições
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 font-medium">Par</th>
                <th className="text-center p-4 font-medium">Tipo</th>
                <th className="text-right p-4 font-medium">Quantidade</th>
                <th className="text-right p-4 font-medium">Entrada</th>
                <th className="text-right p-4 font-medium">Atual</th>
                <th className="text-right p-4 font-medium">P&L</th>
                <th className="text-right p-4 font-medium">Valor</th>
                <th className="text-center p-4 font-medium">Alavancagem</th>
                <th className="text-center p-4 font-medium">Risco Liq.</th>
                <th className="text-center p-4 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((position) => {
                const risk = getLiquidationRisk(position);
                const isProfit = position.pnl >= 0;
                
                return (
                  <tr key={position.id} className="border-b hover:bg-secondary/30">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{position.crypto}/BRL</span>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <Badge variant={position.type === 'LONG' ? 'default' : 'destructive'}>
                        {position.type}
                      </Badge>
                    </td>
                    <td className="p-4 text-right font-mono">{position.amount}</td>
                    <td className="p-4 text-right font-mono">R$ {position.entryPrice.toLocaleString()}</td>
                    <td className="p-4 text-right font-mono">R$ {position.currentPrice.toLocaleString()}</td>
                    <td className="p-4 text-right">
                      <div className={`flex items-center justify-end gap-1 ${isProfit ? 'text-green-500' : 'text-red-500'}`}>
                        {isProfit ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                        <span className="font-mono font-medium">
                          R$ {Math.abs(position.pnl).toLocaleString()}
                        </span>
                        <span className="text-sm">
                          ({isProfit ? '+' : ''}{position.pnlPercent.toFixed(2)}%)
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-right font-mono font-medium">
                      R$ {position.value.toLocaleString()}
                    </td>
                    <td className="p-4 text-center">
                      <Badge variant="outline">{position.leverage}x</Badge>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`font-medium ${risk.color}`}>{risk.risk}</span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Button variant="ghost" size="icon">
                          <X className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 grid grid-cols-4 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Total Investido</p>
            <p className="text-xl font-bold font-mono">R$ 72,500</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Valor Total</p>
            <p className="text-xl font-bold font-mono">R$ 239,000</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">P&L Total</p>
            <p className="text-xl font-bold font-mono text-green-500">+R$ 6,500</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Margem Utilizada</p>
            <div className="space-y-1">
              <Progress value={65} className="h-2" />
              <p className="text-sm font-medium">65%</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}