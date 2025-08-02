'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card } from '@/components/ui/Card';
import { Tabs } from '@/components/ui/Tabs';
import { Badge } from '@/components/ui/Badge';
import { 
  Calculator, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Percent,
  Target,
  BarChart3
} from 'lucide-react';

const calculatorTabs = [
  { id: 'basic', label: 'Basic', icon: Calculator },
  { id: 'advanced', label: 'Advanced', icon: BarChart3 },
  { id: 'scenario', label: 'Scenario', icon: Target },
];

const positionTypes = [
  { value: 'long', label: 'Long Position' },
  { value: 'short', label: 'Short Position' },
];

const timeFrames = [
  { value: 'hours', label: 'Hours' },
  { value: 'days', label: 'Days' },
  { value: 'weeks', label: 'Weeks' },
  { value: 'months', label: 'Months' },
];

export function ProfitCalculator() {
  const [activeTab, setActiveTab] = useState('basic');
  
  // Basic Calculator State
  const [positionType, setPositionType] = useState('long');
  const [entryPrice, setEntryPrice] = useState('');
  const [exitPrice, setExitPrice] = useState('');
  const [positionSize, setPositionSize] = useState('');
  const [leverage, setLeverage] = useState('1');
  const [feeRate, setFeeRate] = useState('0.1');
  
  // Advanced Calculator State
  const [stopLoss, setStopLoss] = useState('');
  const [takeProfit1, setTakeProfit1] = useState('');
  const [takeProfit2, setTakeProfit2] = useState('');
  const [takeProfit3, setTakeProfit3] = useState('');
  const [tp1Size, setTp1Size] = useState('50');
  const [tp2Size, setTp2Size] = useState('30');
  const [tp3Size, setTp3Size] = useState('20');
  
  // Scenario Analysis State
  const [scenarios, setScenarios] = useState([
    { name: 'Bullish', priceChange: 10 },
    { name: 'Neutral', priceChange: 0 },
    { name: 'Bearish', priceChange: -10 },
  ]);
  const [holdingPeriod, setHoldingPeriod] = useState('30');
  const [timeFrame, setTimeFrame] = useState('days');

  // Calculations
  const calculations = useMemo(() => {
    const entry = parseFloat(entryPrice) || 0;
    const exit = parseFloat(exitPrice) || 0;
    const size = parseFloat(positionSize) || 0;
    const lev = parseFloat(leverage) || 1;
    const fee = parseFloat(feeRate) / 100 || 0;
    
    if (!entry || !size) {
      return {
        grossProfit: 0,
        fees: 0,
        netProfit: 0,
        returnPercent: 0,
        returnOnInvestment: 0,
        breakEvenPrice: 0,
      };
    }
    
    const positionValue = size * entry;
    const entryFee = positionValue * fee;
    const exitFee = size * exit * fee;
    const totalFees = entryFee + exitFee;
    
    let grossProfit;
    if (positionType === 'long') {
      grossProfit = (exit - entry) * size * lev;
    } else {
      grossProfit = (entry - exit) * size * lev;
    }
    
    const netProfit = grossProfit - totalFees;
    const investment = positionValue / lev;
    const returnPercent = (netProfit / positionValue) * 100;
    const returnOnInvestment = (netProfit / investment) * 100;
    
    // Break-even calculation
    const feePerUnit = (entryFee + exitFee) / size;
    const breakEvenPrice = positionType === 'long' 
      ? entry + feePerUnit
      : entry - feePerUnit;
    
    return {
      grossProfit,
      fees: totalFees,
      netProfit,
      returnPercent,
      returnOnInvestment,
      breakEvenPrice,
      investment,
      positionValue,
    };
  }, [entryPrice, exitPrice, positionSize, leverage, feeRate, positionType]);

  const advancedCalculations = useMemo(() => {
    const entry = parseFloat(entryPrice) || 0;
    const size = parseFloat(positionSize) || 0;
    const sl = parseFloat(stopLoss) || 0;
    const tp1 = parseFloat(takeProfit1) || 0;
    const tp2 = parseFloat(takeProfit2) || 0;
    const tp3 = parseFloat(takeProfit3) || 0;
    
    if (!entry || !size) return null;
    
    const tp1SizeDecimal = parseFloat(tp1Size) / 100;
    const tp2SizeDecimal = parseFloat(tp2Size) / 100;
    const tp3SizeDecimal = parseFloat(tp3Size) / 100;
    
    const calculateProfitForLevel = (exitPrice: number, sizePercent: number) => {
      if (!exitPrice) return 0;
      const levelSize = size * sizePercent;
      return positionType === 'long' 
        ? (exitPrice - entry) * levelSize
        : (entry - exitPrice) * levelSize;
    };
    
    const slLoss = sl ? calculateProfitForLevel(sl, 1) : 0;
    const tp1Profit = tp1 ? calculateProfitForLevel(tp1, tp1SizeDecimal) : 0;
    const tp2Profit = tp2 ? calculateProfitForLevel(tp2, tp2SizeDecimal) : 0;
    const tp3Profit = tp3 ? calculateProfitForLevel(tp3, tp3SizeDecimal) : 0;
    
    const totalProfit = tp1Profit + tp2Profit + tp3Profit;
    const riskRewardRatio = sl && totalProfit ? Math.abs(totalProfit / slLoss) : 0;
    
    return {
      stopLossAmount: slLoss,
      takeProfit1Amount: tp1Profit,
      takeProfit2Amount: tp2Profit,
      takeProfit3Amount: tp3Profit,
      totalProfit,
      riskRewardRatio,
    };
  }, [entryPrice, positionSize, stopLoss, takeProfit1, takeProfit2, takeProfit3, 
      tp1Size, tp2Size, tp3Size, positionType]);

  return (
    <Card className="h-full">
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Calculator className="w-5 h-5" />
          <h3 className="font-semibold">Profit Calculator</h3>
        </div>
      </div>

      <div className="p-4">
        <Tabs
          items={calculatorTabs}
          value={activeTab}
          onValueChange={setActiveTab}
          variant="underline"
          className="mb-6"
        />

        {activeTab === 'basic' && (
          <div className="space-y-6">
            {/* Position Configuration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Position Type</label>
                <Select
                  value={positionType}
                  onValueChange={setPositionType}
                  options={positionTypes}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Leverage</label>
                <div className="relative">
                  <Input
                    type="number"
                    step="0.1"
                    value={leverage}
                    onChange={(e) => setLeverage(e.target.value)}
                    className="pr-8"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                    x
                  </div>
                </div>
              </div>
            </div>

            {/* Price Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Entry Price</label>
                <div className="relative">
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={entryPrice}
                    onChange={(e) => setEntryPrice(e.target.value)}
                    className="pr-12"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                    BRL
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Exit Price</label>
                <div className="relative">
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={exitPrice}
                    onChange={(e) => setExitPrice(e.target.value)}
                    className="pr-12"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                    BRL
                  </div>
                </div>
              </div>
            </div>

            {/* Position Size and Fee */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Position Size</label>
                <div className="relative">
                  <Input
                    type="number"
                    step="0.00000001"
                    placeholder="0.00000000"
                    value={positionSize}
                    onChange={(e) => setPositionSize(e.target.value)}
                    className="pr-16"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                    BTC
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Fee Rate</label>
                <div className="relative">
                  <Input
                    type="number"
                    step="0.01"
                    value={feeRate}
                    onChange={(e) => setFeeRate(e.target.value)}
                    className="pr-8"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                    %
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-4">
              <h4 className="font-medium">Calculation Results</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Investment</span>
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="text-lg font-bold">
                      R$ {(calculations.investment || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                </Card>
                
                <Card>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Break-even Price</span>
                      <Target className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="text-lg font-bold">
                      R$ {(calculations.breakEvenPrice || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Gross P&L</span>
                      {calculations.grossProfit >= 0 ? (
                        <TrendingUp className="w-4 h-4 text-success" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-error" />
                      )}
                    </div>
                    <div className={`text-lg font-bold ${
                      calculations.grossProfit >= 0 ? 'text-success' : 'text-error'
                    }`}>
                      R$ {(calculations.grossProfit || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                </Card>
                
                <Card>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Fees</span>
                      <span className="text-sm">({feeRate}%)</span>
                    </div>
                    <div className="text-lg font-bold text-muted-foreground">
                      -R$ {(calculations.fees || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                </Card>
                
                <Card>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Net P&L</span>
                      {calculations.netProfit >= 0 ? (
                        <TrendingUp className="w-4 h-4 text-success" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-error" />
                      )}
                    </div>
                    <div className={`text-xl font-bold ${
                      calculations.netProfit >= 0 ? 'text-success' : 'text-error'
                    }`}>
                      R$ {(calculations.netProfit || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Return %</span>
                      <Percent className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className={`text-lg font-bold ${
                      calculations.returnPercent >= 0 ? 'text-success' : 'text-error'
                    }`}>
                      {calculations.returnPercent >= 0 ? '+' : ''}{(calculations.returnPercent || 0).toFixed(2)}%
                    </div>
                  </div>
                </Card>
                
                <Card>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">ROI (Leveraged)</span>
                      <Percent className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className={`text-lg font-bold ${
                      calculations.returnOnInvestment >= 0 ? 'text-success' : 'text-error'
                    }`}>
                      {calculations.returnOnInvestment >= 0 ? '+' : ''}{(calculations.returnOnInvestment || 0).toFixed(2)}%
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'advanced' && (
          <div className="space-y-6">
            {/* Base Position (reuse from basic) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Entry Price</label>
                <div className="relative">
                  <Input
                    type="number"
                    step="0.01"
                    value={entryPrice}
                    onChange={(e) => setEntryPrice(e.target.value)}
                    className="pr-12"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                    BRL
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Position Size</label>
                <div className="relative">
                  <Input
                    type="number"
                    step="0.00000001"
                    value={positionSize}
                    onChange={(e) => setPositionSize(e.target.value)}
                    className="pr-16"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                    BTC
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Stop Loss</label>
                <div className="relative">
                  <Input
                    type="number"
                    step="0.01"
                    value={stopLoss}
                    onChange={(e) => setStopLoss(e.target.value)}
                    className="pr-12"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                    BRL
                  </div>
                </div>
              </div>
            </div>

            {/* Take Profit Levels */}
            <div className="space-y-4">
              <h4 className="font-medium">Take Profit Levels</h4>
              
              <div className="space-y-3">
                {/* TP1 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3 border border-border rounded-lg">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Take Profit 1</label>
                    <div className="relative">
                      <Input
                        type="number"
                        step="0.01"
                        value={takeProfit1}
                        onChange={(e) => setTakeProfit1(e.target.value)}
                        className="pr-12"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                        BRL
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Size %</label>
                    <div className="relative">
                      <Input
                        type="number"
                        step="1"
                        value={tp1Size}
                        onChange={(e) => setTp1Size(e.target.value)}
                        className="pr-8"
                      />
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                        %
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Profit</label>
                    <div className="text-sm font-mono text-success">
                      +R$ {(advancedCalculations?.takeProfit1Amount || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>

                {/* TP2 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3 border border-border rounded-lg">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Take Profit 2</label>
                    <div className="relative">
                      <Input
                        type="number"
                        step="0.01"
                        value={takeProfit2}
                        onChange={(e) => setTakeProfit2(e.target.value)}
                        className="pr-12"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                        BRL
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Size %</label>
                    <div className="relative">
                      <Input
                        type="number"
                        step="1"
                        value={tp2Size}
                        onChange={(e) => setTp2Size(e.target.value)}
                        className="pr-8"
                      />
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                        %
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Profit</label>
                    <div className="text-sm font-mono text-success">
                      +R$ {(advancedCalculations?.takeProfit2Amount || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>

                {/* TP3 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3 border border-border rounded-lg">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Take Profit 3</label>
                    <div className="relative">
                      <Input
                        type="number"
                        step="0.01"
                        value={takeProfit3}
                        onChange={(e) => setTakeProfit3(e.target.value)}
                        className="pr-12"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                        BRL
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Size %</label>
                    <div className="relative">
                      <Input
                        type="number"
                        step="1"
                        value={tp3Size}
                        onChange={(e) => setTp3Size(e.target.value)}
                        className="pr-8"
                      />
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                        %
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Profit</label>
                    <div className="text-sm font-mono text-success">
                      +R$ {(advancedCalculations?.takeProfit3Amount || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Results */}
            {advancedCalculations && (
              <div className="space-y-4">
                <h4 className="font-medium">Risk/Reward Analysis</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Max Loss (SL)</span>
                        <TrendingDown className="w-4 h-4 text-error" />
                      </div>
                      <div className="text-lg font-bold text-error">
                        R$ {(advancedCalculations.stopLossAmount || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                  </Card>
                  
                  <Card>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Total Profit (TP)</span>
                        <TrendingUp className="w-4 h-4 text-success" />
                      </div>
                      <div className="text-lg font-bold text-success">
                        +R$ {(advancedCalculations.totalProfit || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                  </Card>
                  
                  <Card>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">R/R Ratio</span>
                        <Badge variant={advancedCalculations.riskRewardRatio >= 2 ? 'default' : 'secondary'}>
                          {advancedCalculations.riskRewardRatio >= 2 ? 'Good' : 'Risk'}
                        </Badge>
                      </div>
                      <div className="text-lg font-bold">
                        1 : {(advancedCalculations.riskRewardRatio || 0).toFixed(2)}
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'scenario' && (
          <div className="space-y-6">
            <div className="text-center text-muted-foreground">
              <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Scenario analysis coming soon...</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}