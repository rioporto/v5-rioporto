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
  Target, 
  TrendingUp, 
  Plus,
  Minus,
  Calculator,
  Layers,
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
  takeProfits?: Array<{
    id: string;
    price: number;
    size: number;
    filled: boolean;
  }>;
}

interface TakeProfitLevel {
  id: string;
  price: string;
  percentage: string;
  ratio?: number;
}

interface TakeProfitManagerProps {
  positions?: Position[];
}

const takeProfitStrategies = [
  { value: 'single', label: 'Single Take Profit' },
  { value: 'multiple', label: 'Multiple Levels' },
  { value: 'trailing', label: 'Trailing Take Profit' },
  { value: 'fibonacci', label: 'Fibonacci Levels' },
];

const fibonacciLevels = [0.236, 0.382, 0.5, 0.618, 0.786, 1.0, 1.618];

export function TakeProfitManager({ positions = [] }: TakeProfitManagerProps) {
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [strategy, setStrategy] = useState('single');
  const [levels, setLevels] = useState<TakeProfitLevel[]>([
    { id: '1', price: '', percentage: '50', ratio: 2 }
  ]);
  const [riskRewardRatio, setRiskRewardRatio] = useState('2');
  const [stopLossPrice, setStopLossPrice] = useState('');
  const [useMarketOrder, setUseMarketOrder] = useState(false);

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
      takeProfits: [
        { id: 'tp1', price: 13000, size: 1.25, filled: false },
        { id: 'tp2', price: 13500, size: 1.25, filled: false },
      ],
    },
  ];

  const selectedPos = mockPositions.find(p => p.id === selectedPosition);

  const addLevel = () => {
    const newLevel: TakeProfitLevel = {
      id: Date.now().toString(),
      price: '',
      percentage: '25',
      ratio: 2,
    };
    setLevels([...levels, newLevel]);
  };

  const removeLevel = (id: string) => {
    setLevels(levels.filter(l => l.id !== id));
  };

  const updateLevel = (id: string, field: keyof TakeProfitLevel, value: string | number) => {
    setLevels(levels.map(l => 
      l.id === id ? { ...l, [field]: value } : l
    ));
  };

  const calculateTakeProfit = (ratio: number) => {
    if (!selectedPos || !stopLossPrice) return '';
    
    const stopDistance = Math.abs(selectedPos.entryPrice - parseFloat(stopLossPrice));
    const targetDistance = stopDistance * ratio;
    
    return selectedPos.side === 'long' 
      ? (selectedPos.entryPrice + targetDistance).toFixed(2)
      : (selectedPos.entryPrice - targetDistance).toFixed(2);
  };

  const generateFibonacciLevels = () => {
    if (!selectedPos || !stopLossPrice) return;
    
    const stopDistance = Math.abs(selectedPos.entryPrice - parseFloat(stopLossPrice));
    
    const fibLevels = fibonacciLevels.map((fib, index) => {
      const targetDistance = stopDistance * fib;
      const price = selectedPos.side === 'long' 
        ? selectedPos.entryPrice + targetDistance
        : selectedPos.entryPrice - targetDistance;
      
      return {
        id: `fib-${index}`,
        price: price.toFixed(2),
        percentage: (100 / fibonacciLevels.length).toFixed(0),
        ratio: fib,
      };
    });
    
    setLevels(fibLevels);
  };

  const applyTakeProfits = async () => {
    if (!selectedPos) return;
    
    const takeProfitData = {
      positionId: selectedPos.id,
      strategy,
      levels: levels.filter(l => l.price && l.percentage),
      useMarketOrder,
    };

    console.log('Applying take profits:', takeProfitData);
    // In real app, make API call here
  };

  const removeTakeProfit = (positionId: string, takeProfitId: string) => {
    console.log('Removing take profit:', { positionId, takeProfitId });
    // In real app, make API call here
  };

  return (
    <Card className="h-full">
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-2 mb-2">
          <Target className="w-4 h-4" />
          <h3 className="font-semibold">Take Profit Manager</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Set profit targets for your positions
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
                        variant={position.side === 'long' ? 'primary' : 'secondary'}
                        size="sm"
                      >
                        {position.side.toUpperCase()}
                      </Badge>
                      <span className="font-medium text-sm">{position.symbol}</span>
                    </div>
                    {position.takeProfits && position.takeProfits.length > 0 && (
                      <div className="flex items-center space-x-1">
                        <Target className="w-4 h-4 text-success" />
                        <span className="text-xs text-muted-foreground">
                          {position.takeProfits.length}
                        </span>
                      </div>
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
                      <span className="text-muted-foreground">P&L:</span>
                      <span className={`font-mono ${position.pnl >= 0 ? 'text-success' : 'text-error'}`}>
                        R$ {position.pnl.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} ({position.pnlPercent >= 0 ? '+' : ''}{position.pnlPercent}%)
                      </span>
                    </div>
                    
                    {position.takeProfits && position.takeProfits.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {position.takeProfits.map((tp) => (
                          <div key={tp.id} className="p-2 bg-muted rounded text-xs">
                            <div className="flex justify-between items-center">
                              <span>TP: R$ {tp.price.toLocaleString('pt-BR')} ({tp.size} {position.symbol.split('/')[0]})</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-4 w-4 p-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeTakeProfit(position.id, tp.id);
                                }}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Take Profit Configuration */}
          <div className="p-4 space-y-4 overflow-y-auto">
            {selectedPos ? (
              <>
                <div className="space-y-2">
                  <h4 className="font-medium">Configure Take Profits</h4>
                  <div className="text-sm text-muted-foreground">
                    Position: {selectedPos.symbol} • {selectedPos.side.toUpperCase()}
                  </div>
                </div>

                {/* Strategy Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Strategy</label>
                  <Select
                    value={strategy}
                    onChange={(e) => setStrategy(e.target.value)}
                    options={takeProfitStrategies}
                  />
                </div>

                {/* Risk/Reward Calculator */}
                <div className="p-3 bg-muted rounded-lg space-y-3">
                  <div className="flex items-center space-x-2 text-sm font-medium">
                    <Calculator className="w-4 h-4" />
                    <span>Risk/Reward Calculator</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-xs">Stop Loss Price</label>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Stop price"
                        value={stopLossPrice}
                        onChange={(e) => setStopLossPrice(e.target.value)}
                        className="text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs">R/R Ratio</label>
                      <Input
                        type="number"
                        step="0.1"
                        value={riskRewardRatio}
                        onChange={(e) => setRiskRewardRatio(e.target.value)}
                        className="text-xs"
                      />
                    </div>
                  </div>
                  
                  {stopLossPrice && (
                    <div className="text-xs text-muted-foreground">
                      Suggested TP: R$ {calculateTakeProfit(parseFloat(riskRewardRatio))}
                    </div>
                  )}
                </div>

                {/* Fibonacci Generator */}
                {strategy === 'fibonacci' && (
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={generateFibonacciLevels}
                      disabled={!stopLossPrice}
                      className="w-full"
                    >
                      <Layers className="w-4 h-4 mr-2" />
                      Generate Fibonacci Levels
                    </Button>
                  </div>
                )}

                {/* Take Profit Levels */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Take Profit Levels</label>
                    {strategy === 'multiple' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={addLevel}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {levels.map((level, index) => (
                      <div key={level.id} className="p-3 border border-border rounded-lg space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Level {index + 1}</span>
                          {levels.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeLevel(level.id)}
                              className="h-6 w-6 p-0"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-xs text-muted-foreground">Price</label>
                            <div className="relative">
                              <Input
                                type="number"
                                step="0.01"
                                placeholder="Price"
                                value={level.price}
                                onChange={(e) => updateLevel(level.id, 'price', e.target.value)}
                                className="text-xs pr-12"
                              />
                              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">
                                BRL
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <label className="text-xs text-muted-foreground">Size %</label>
                            <div className="relative">
                              <Input
                                type="number"
                                step="1"
                                placeholder="50"
                                value={level.percentage}
                                onChange={(e) => updateLevel(level.id, 'percentage', e.target.value)}
                                className="text-xs pr-8"
                              />
                              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">
                                %
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {level.price && (
                          <div className="text-xs text-muted-foreground">
                            Size: {((parseFloat(level.percentage) / 100) * selectedPos.size).toFixed(8)} {selectedPos.symbol.split('/')[0]}
                            {level.ratio && ` • R/R: ${level.ratio.toFixed(2)}`}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Market Order Toggle */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Market Order</label>
                    <p className="text-xs text-muted-foreground">
                      Execute at market price when reached
                    </p>
                  </div>
                  <Switch
                    checked={useMarketOrder}
                    onCheckedChange={setUseMarketOrder}
                  />
                </div>

                {/* Profit Projection */}
                {levels.some(l => l.price && l.percentage) && (
                  <div className="p-3 bg-success/10 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2 text-sm font-medium text-success">
                      <TrendingUp className="w-4 h-4" />
                      <span>Profit Projection</span>
                    </div>
                    
                    <div className="space-y-1 text-xs">
                      {levels
                        .filter(l => l.price && l.percentage)
                        .map((level, index) => {
                          const size = (parseFloat(level.percentage) / 100) * selectedPos.size;
                          const profit = (parseFloat(level.price) - selectedPos.entryPrice) * size;
                          return (
                            <div key={level.id} className="flex justify-between">
                              <span>Level {index + 1}:</span>
                              <span className="font-mono text-success">
                                +R$ {profit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                              </span>
                            </div>
                          );
                        })}
                      <div className="border-t border-success/20 pt-1 mt-2">
                        <div className="flex justify-between font-medium">
                          <span>Total Potential:</span>
                          <span className="font-mono text-success">
                            +R$ {levels
                              .filter(l => l.price && l.percentage)
                              .reduce((total, level) => {
                                const size = (parseFloat(level.percentage) / 100) * selectedPos.size;
                                const profit = (parseFloat(level.price) - selectedPos.entryPrice) * size;
                                return total + profit;
                              }, 0)
                              .toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Apply Button */}
                <Button
                  className="w-full"
                  onClick={applyTakeProfits}
                  disabled={!levels.some(l => l.price && l.percentage)}
                >
                  <Target className="w-4 h-4 mr-2" />
                  Apply Take Profits
                </Button>
              </>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                <Target className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Select a position to configure take profits</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}