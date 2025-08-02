'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  TrendingUp, 
  TrendingDown,
  Clock,
  DollarSign,
  BarChart3,
  XCircle
} from 'lucide-react';

interface Position {
  id: string;
  symbol: string;
  quantity: number;
  entryPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
  entryTime: string;
  stopLoss?: number;
  takeProfit?: number;
  type: 'long' | 'short';
}

export function PositionDetails() {
  const [selectedPosition, setSelectedPosition] = useState<Position>({
    id: 'POS001',
    symbol: 'BTC/USDT',
    quantity: 0.5,
    entryPrice: 42500,
    currentPrice: 43800,
    pnl: 650,
    pnlPercent: 3.06,
    entryTime: '2025-01-15T10:30:00',
    stopLoss: 41000,
    takeProfit: 45000,
    type: 'long'
  });

  const [isClosing, setIsClosing] = useState(false);

  const handleClosePosition = async () => {
    setIsClosing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsClosing(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">{selectedPosition.symbol}</CardTitle>
            <Badge variant={selectedPosition.type === 'long' ? 'success' : 'error'}>
              {selectedPosition.type.toUpperCase()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Resumo P&L */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-background-secondary rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-secondary">P&L</span>
                {selectedPosition.pnl >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-success" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-error" />
                )}
              </div>
              <div className={`text-2xl font-bold ${selectedPosition.pnl >= 0 ? 'text-success' : 'text-error'}`}>
                ${selectedPosition.pnl.toFixed(2)}
              </div>
              <div className={`text-sm ${selectedPosition.pnl >= 0 ? 'text-success' : 'text-error'}`}>
                {selectedPosition.pnl >= 0 ? '+' : ''}{selectedPosition.pnlPercent.toFixed(2)}%
              </div>
            </div>

            <div className="bg-background-secondary rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-secondary">Quantidade</span>
                <BarChart3 className="h-4 w-4 text-text-secondary" />
              </div>
              <div className="text-2xl font-bold">{selectedPosition.quantity}</div>
              <div className="text-sm text-text-secondary">
                Valor: ${(selectedPosition.quantity * selectedPosition.currentPrice).toFixed(2)}
              </div>
            </div>

            <div className="bg-background-secondary rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-secondary">Duração</span>
                <Clock className="h-4 w-4 text-text-secondary" />
              </div>
              <div className="text-2xl font-bold">2d 5h</div>
              <div className="text-sm text-text-secondary">
                Desde {new Date(selectedPosition.entryTime).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Detalhes da Posição */}
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-text-secondary">Preço de Entrada</span>
              <span className="font-medium">${selectedPosition.entryPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-text-secondary">Preço Atual</span>
              <span className="font-medium">${selectedPosition.currentPrice.toFixed(2)}</span>
            </div>
            {selectedPosition.stopLoss && (
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-text-secondary">Stop Loss</span>
                <span className="font-medium text-error">${selectedPosition.stopLoss.toFixed(2)}</span>
              </div>
            )}
            {selectedPosition.takeProfit && (
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-text-secondary">Take Profit</span>
                <span className="font-medium text-success">${selectedPosition.takeProfit.toFixed(2)}</span>
              </div>
            )}
          </div>

          {/* Ações */}
          <div className="flex gap-3">
            <Button 
              variant="danger" 
              className="flex-1"
              onClick={handleClosePosition}
              disabled={isClosing}
            >
              {isClosing ? (
                'Fechando...'
              ) : (
                <>
                  <XCircle className="h-4 w-4 mr-2" />
                  Fechar Posição
                </>
              )}
            </Button>
            <Button variant="outline" className="flex-1">
              Modificar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Gráfico de Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Performance da Posição</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-background-secondary rounded-lg flex items-center justify-center">
            <span className="text-text-secondary">Gráfico de Performance</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}