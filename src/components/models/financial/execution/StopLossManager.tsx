'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Switch } from '@/components/ui/Switch';
import { Progress } from '@/components/ui/Progress';
import { 
  Shield, 
  TrendingDown, 
  AlertTriangle,
  Calculator,
  Target,
  Trash2
} from 'lucide-react';

interface Position {
  id: string;
  symbol: string;
  side: 'long' | 'short';
  size: number;
  entryPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
  stopLoss?: {
    price: number;
    type: 'fixed' | 'trailing';
    trailingDistance?: number;
  };
}

interface StopLossManagerProps {
  positions?: Position[];
}

const stopLossTypes = [
  { value: 'fixed', label: 'Fixed Stop Loss' },
  { value: 'trailing', label: 'Trailing Stop Loss' },
  { value: 'percentage', label: 'Percentage Stop' },
];

const trailingTypes = [
  { value: 'percentage', label: 'Percentage' },
  { value: 'amount', label: 'Amount (BRL)' },
  { value: 'atr', label: 'ATR Multiple' },
];

export function StopLossManager({ positions = [] }: StopLossManagerProps) {
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [stopLossType, setStopLossType] = useState('fixed');
  const [stopPrice, setStopPrice] = useState('');
  const [trailingDistance, setTrailingDistance] = useState('');
  const [trailingType, setTrailingType] = useState('percentage');
  const [riskPercentage, setRiskPercentage] = useState('2');
  const [useMarketOrder, setUseMarketOrder] = useState(true);
  const [isCalculating, setIsCalculating] = useState(false);

  // Mock positions if none provided
  const mockPositions: Position[] = positions.length > 0 ? positions : [
    {
      id: '1',
      symbol: 'BTC/BRL',
      side: 'long',
      size: 0.5,
      entryPrice: 340000,
      currentPrice: 342156.78,
      pnl: 1078.39,
      pnlPercent: 0.63,
    },
    {
      id: '2',
      symbol: 'ETH/BRL',
      side: 'long',
      size: 2.5,
      entryPrice: 12500,
      currentPrice: 12650,
      pnl: 375,
      pnlPercent: 1.2,
      stopLoss: {
        price: 12000,
        type: 'fixed',
      },
    },
  ];

  const selectedPos = mockPositions.find(p => p.id === selectedPosition);

  const calculateStopLoss = async () => {
    if (!selectedPos) return;
    
    setIsCalculating(true);
    
    // Simulate calculation
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const riskAmount = (selectedPos.size * selectedPos.entryPrice) * (parseFloat(riskPercentage) / 100);
    const stopDistance = riskAmount / selectedPos.size;
    
    const calculatedStop = selectedPos.side === 'long' 
      ? selectedPos.entryPrice - stopDistance
      : selectedPos.entryPrice + stopDistance;
    
    setStopPrice(calculatedStop.toFixed(2));
    setIsCalculating(false);
  };

  const applyStopLoss = async () => {
    if (!selectedPos || !stopPrice) return;
    
    const stopLossData = {
      positionId: selectedPos.id,
      type: stopLossType,
      price: parseFloat(stopPrice),
      trailingDistance: trailingDistance ? parseFloat(trailingDistance) : undefined,
      trailingType,
      useMarketOrder,
    };

    console.log('Applying stop loss:', stopLossData);
    // In real app, make API call here
  };

  const removeStopLoss = (positionId: string) => {
    console.log('Removing stop loss for position:', positionId);
    // In real app, make API call here
  };

  return (
    <Card className="h-full">
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-2 mb-2">
          <Shield className="w-4 h-4" />
          <h3 className="font-semibold">Stop Loss Manager</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Manage stop losses for your open positions
        </p>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* Positions List */}
          <div className="border-r border-border">
            <div className="p-4 border-b border-border">
              <h4 className="font-medium text-sm">Open Positions</h4>
            </div>
            
            <div className="overflow-y-auto max-h-96">
              {mockPositions.map((position) => (
                <div
                  key={position.id}
                  className={`p-4 border-b border-border cursor-pointer hover:bg-accent transition-colors ${
                    selectedPosition === position.id ? 'bg-accent' : ''
                  }`}
                  onClick={() => setSelectedPosition(position.id)}
                >
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
                    {position.stopLoss && (
                      <Shield className="w-4 h-4 text-success" />
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Size:</span>
                      <span className="font-mono">{position.size} {position.symbol.split('/')[0]}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Entry:</span>
                      <span className="font-mono">R$ {position.entryPrice.toLocaleString('pt-BR')}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Current:</span>
                      <span className="font-mono">R$ {position.currentPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">P&L:</span>
                      <span className={`font-mono ${position.pnl >= 0 ? 'text-success' : 'text-error'}`}>
                        R$ {position.pnl.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} ({position.pnlPercent >= 0 ? '+' : ''}{position.pnlPercent}%)
                      </span>
                    </div>
                    
                    {position.stopLoss && (
                      <div className="mt-2 p-2 bg-muted rounded text-xs">
                        <div className="flex justify-between items-center">
                          <span>Stop Loss: R$ {position.stopLoss.price.toLocaleString('pt-BR')}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-5 w-5 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeStopLoss(position.id);
                            }}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stop Loss Configuration */}
          <div className="p-4 space-y-4">
            {selectedPos ? (
              <>
                <div className="space-y-2">
                  <h4 className="font-medium">Configure Stop Loss</h4>
                  <div className="text-sm text-muted-foreground">
                    Position: {selectedPos.symbol} • {selectedPos.side.toUpperCase()}
                  </div>
                </div>

                {/* Stop Loss Type */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Stop Loss Type</label>
                  <Select
                    value={stopLossType}
                    onChange={(value) => setStopLossType(value)}
                    options={stopLossTypes}
                  />
                </div>

                {/* Risk Management Calculator */}
                <div className="p-3 bg-muted rounded-lg space-y-3">
                  <div className="flex items-center space-x-2 text-sm font-medium">
                    <Calculator className="w-4 h-4" />
                    <span>Risk Calculator</span>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm">Risk Percentage</label>
                    <div className="flex space-x-2">
                      <div className="flex-1 relative">
                        <Input
                          type="number"
                          step="0.1"
                          value={riskPercentage}
                          onChange={(e) => setRiskPercentage(e.target.value)}
                          className="pr-8"
                        />
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                          %
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        onClick={calculateStopLoss}
                        disabled={isCalculating}
                      >
                        {isCalculating ? 'Calculating...' : 'Calculate'}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    Risk Amount: R$ {((selectedPos.size * selectedPos.entryPrice) * (parseFloat(riskPercentage) / 100)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                </div>

                {/* Stop Price */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Stop Price</label>
                  <div className="relative">
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Enter stop price"
                      value={stopPrice}
                      onChange={(e) => setStopPrice(e.target.value)}
                      className="pr-12"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                      BRL
                    </div>
                  </div>
                  
                  {stopPrice && (
                    <div className="text-xs text-muted-foreground">
                      Distance: {Math.abs(selectedPos.currentPrice - parseFloat(stopPrice)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} BRL 
                      ({((Math.abs(selectedPos.currentPrice - parseFloat(stopPrice)) / selectedPos.currentPrice) * 100).toFixed(2)}%)
                    </div>
                  )}
                </div>

                {/* Trailing Distance (for trailing stops) */}
                {stopLossType === 'trailing' && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Trailing Distance</label>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <Button
                        variant={trailingType === 'percentage' ? 'primary' : 'outline'}
                        size="sm"
                        onClick={() => setTrailingType('percentage')}
                      >
                        %
                      </Button>
                      <Button
                        variant={trailingType === 'amount' ? 'primary' : 'outline'}
                        size="sm"
                        onClick={() => setTrailingType('amount')}
                      >
                        BRL
                      </Button>
                    </div>
                    <div className="relative">
                      <Input
                        type="number"
                        step={trailingType === 'percentage' ? '0.1' : '100'}
                        placeholder={trailingType === 'percentage' ? '2.0' : '1000'}
                        value={trailingDistance}
                        onChange={(e) => setTrailingDistance(e.target.value)}
                        className="pr-12"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                        {trailingType === 'percentage' ? '%' : 'BRL'}
                      </div>
                    </div>
                  </div>
                )}

                {/* Market Order Toggle */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Market Order</label>
                    <p className="text-xs text-muted-foreground">
                      Execute at market price when triggered
                    </p>
                  </div>
                  <Switch
                    checked={useMarketOrder}
                    onCheckedChange={setUseMarketOrder}
                  />
                </div>

                {/* Risk Visualization */}
                {stopPrice && (
                  <div className="p-3 bg-error/10 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2 text-sm font-medium text-error">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Risk Analysis</span>
                    </div>
                    
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span>Max Loss:</span>
                        <span className="font-mono">
                          R$ {(Math.abs(selectedPos.entryPrice - parseFloat(stopPrice)) * selectedPos.size).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Loss %:</span>
                        <span className="font-mono">
                          {((Math.abs(selectedPos.entryPrice - parseFloat(stopPrice)) / selectedPos.entryPrice) * 100).toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Apply Button */}
                <Button
                  className="w-full"
                  onClick={applyStopLoss}
                  disabled={!stopPrice}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Apply Stop Loss
                </Button>
              </>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                <Target className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Select a position to configure stop loss</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}