'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { 
  Shield, 
  Target, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Calculator
} from 'lucide-react';

interface Position {
  entryPrice: number;
  stopLoss?: number;
  takeProfit?: number;
}

interface RiskRewardRatioProps {
  position?: Position;
}

export function RiskRewardRatio({ position }: RiskRewardRatioProps) {
  const [entryPrice, setEntryPrice] = useState(position?.entryPrice?.toString() || '');
  const [stopLoss, setStopLoss] = useState(position?.stopLoss?.toString() || '');
  const [takeProfit, setTakeProfit] = useState(position?.takeProfit?.toString() || '');
  const [positionSize, setPositionSize] = useState('1');
  const [winRate, setWinRate] = useState('60');

  const calculations = useMemo(() => {
    const entry = parseFloat(entryPrice) || 0;
    const sl = parseFloat(stopLoss) || 0;
    const tp = parseFloat(takeProfit) || 0;
    const size = parseFloat(positionSize) || 0;
    const wr = parseFloat(winRate) / 100 || 0;

    if (!entry || !sl || !tp || !size) {
      return {
        risk: 0,
        reward: 0,
        ratio: 0,
        riskAmount: 0,
        rewardAmount: 0,
        breakEvenWinRate: 0,
        expectedValue: 0,
        riskGrade: 'unknown',
        recommendation: '',
      };
    }

    const riskPerUnit = Math.abs(entry - sl);
    const rewardPerUnit = Math.abs(tp - entry);
    const ratio = rewardPerUnit / riskPerUnit;
    
    const riskAmount = riskPerUnit * size;
    const rewardAmount = rewardPerUnit * size;
    
    // Break-even win rate calculation
    const breakEvenWinRate = 1 / (1 + ratio);
    
    // Expected value calculation
    const expectedValue = (wr * rewardAmount) - ((1 - wr) * riskAmount);
    
    // Risk grade assessment
    let riskGrade = 'poor';
    let recommendation = 'High risk trade. Consider improving risk/reward ratio.';
    
    if (ratio >= 3) {
      riskGrade = 'excellent';
      recommendation = 'Excellent risk/reward ratio. This is a high-quality setup.';
    } else if (ratio >= 2) {
      riskGrade = 'good';
      recommendation = 'Good risk/reward ratio. Acceptable trade setup.';
    } else if (ratio >= 1.5) {
      riskGrade = 'fair';
      recommendation = 'Fair risk/reward ratio. Consider if you have high win rate.';
    }

    return {
      risk: riskPerUnit,
      reward: rewardPerUnit,
      ratio,
      riskAmount,
      rewardAmount,
      breakEvenWinRate: breakEvenWinRate * 100,
      expectedValue,
      riskGrade,
      recommendation,
    };
  }, [entryPrice, stopLoss, takeProfit, positionSize, winRate]);

  const getRiskGradeColor = (grade: string) => {
    switch (grade) {
      case 'excellent': return 'text-success';
      case 'good': return 'text-primary';
      case 'fair': return 'text-warning';
      case 'poor': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getRiskGradeBadgeVariant = (grade: string) => {
    switch (grade) {
      case 'excellent': return 'default';
      case 'good': return 'secondary';
      case 'fair': return 'outline';
      case 'poor': return 'destructive';
      default: return 'outline';
    }
  };

  const getRiskGradeIcon = (grade: string) => {
    switch (grade) {
      case 'excellent': 
      case 'good': 
        return CheckCircle;
      case 'fair': 
        return BarChart3;
      case 'poor': 
        return AlertTriangle;
      default: 
        return Calculator;
    }
  };

  const RiskGradeIcon = getRiskGradeIcon(calculations.riskGrade);

  return (
    <Card className="h-full">
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5" />
          <h3 className="font-semibold">Risk/Reward Ratio</h3>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Input Section */}
        <div className="space-y-4">
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center space-x-2">
                <Shield className="w-4 h-4 text-error" />
                <span>Stop Loss</span>
              </label>
              <div className="relative">
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={stopLoss}
                  onChange={(e) => setStopLoss(e.target.value)}
                  className="pr-12"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                  BRL
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center space-x-2">
                <Target className="w-4 h-4 text-success" />
                <span>Take Profit</span>
              </label>
              <div className="relative">
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={takeProfit}
                  onChange={(e) => setTakeProfit(e.target.value)}
                  className="pr-12"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                  BRL
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Expected Win Rate</label>
            <div className="relative">
              <Input
                type="number"
                step="1"
                min="0"
                max="100"
                placeholder="60"
                value={winRate}
                onChange={(e) => setWinRate(e.target.value)}
                className="pr-8"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                %
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {calculations.ratio > 0 && (
          <div className="space-y-6">
            {/* Risk Grade */}
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <RiskGradeIcon className={`w-6 h-6 ${getRiskGradeColor(calculations.riskGrade)}`} />
                <Badge 
                  variant={getRiskGradeBadgeVariant(calculations.riskGrade)}
                  className="text-sm px-3 py-1"
                >
                  {calculations.riskGrade.toUpperCase()}
                </Badge>
              </div>
              <div className="text-2xl font-bold mb-2">
                1 : {calculations.ratio.toFixed(2)}
              </div>
              <p className="text-sm text-muted-foreground">
                {calculations.recommendation}
              </p>
            </div>

            {/* Risk vs Reward Visualization */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Risk vs Reward</span>
                <span className="font-medium">1 : {calculations.ratio.toFixed(2)}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <TrendingDown className="w-4 h-4 text-error" />
                    <span className="text-sm text-error">Risk</span>
                  </div>
                  <div className="bg-error/20 rounded-full h-6 flex items-center justify-center">
                    <span className="text-xs font-medium">1.00</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-success" />
                    <span className="text-sm text-success">Reward</span>
                  </div>
                  <div 
                    className="bg-success/20 rounded-full h-6 flex items-center justify-center relative"
                    style={{ 
                      width: `${Math.min(calculations.ratio * 50, 100)}%` 
                    }}
                  >
                    <span className="text-xs font-medium">{calculations.ratio.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Risk Amount</span>
                    <TrendingDown className="w-4 h-4 text-error" />
                  </div>
                  <div className="text-lg font-bold text-error">
                    R$ {calculations.riskAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {calculations.risk.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} BRL per unit
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Reward Amount</span>
                    <TrendingUp className="w-4 h-4 text-success" />
                  </div>
                  <div className="text-lg font-bold text-success">
                    R$ {calculations.rewardAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {calculations.reward.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} BRL per unit
                  </div>
                </div>
              </Card>
            </div>

            {/* Win Rate Analysis */}
            <div className="space-y-4">
              <h4 className="font-medium text-sm">Win Rate Analysis</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <div className="p-4">
                    <div className="text-sm text-muted-foreground mb-2">Break-even Win Rate</div>
                    <div className="text-lg font-bold">
                      {calculations.breakEvenWinRate.toFixed(1)}%
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Minimum win rate to be profitable
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="p-4">
                    <div className="text-sm text-muted-foreground mb-2">Expected Value</div>
                    <div className={`text-lg font-bold ${
                      calculations.expectedValue >= 0 ? 'text-success' : 'text-error'
                    }`}>
                      {calculations.expectedValue >= 0 ? '+' : ''}R$ {calculations.expectedValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Expected profit per trade
                    </div>
                  </div>
                </Card>
              </div>
              
              {/* Win Rate Comparison */}
              <div className="p-3 bg-muted rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Your Win Rate: {winRate}%</span>
                  <span className="text-sm">Break-even: {calculations.breakEvenWinRate.toFixed(1)}%</span>
                </div>
                <div className="relative">
                  <Progress 
                    value={parseFloat(winRate)} 
                    className="h-2" 
                  />
                  <div 
                    className="absolute top-0 h-2 w-0.5 bg-border"
                    style={{ left: `${calculations.breakEvenWinRate}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  // Auto-optimize for 2:1 ratio
                  if (entryPrice && stopLoss) {
                    const entry = parseFloat(entryPrice);
                    const sl = parseFloat(stopLoss);
                    const risk = Math.abs(entry - sl);
                    const optimalTP = entry + (risk * 2);
                    setTakeProfit(optimalTP.toString());
                  }
                }}
              >
                Set 2:1 Ratio
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  // Auto-optimize for 3:1 ratio
                  if (entryPrice && stopLoss) {
                    const entry = parseFloat(entryPrice);
                    const sl = parseFloat(stopLoss);
                    const risk = Math.abs(entry - sl);
                    const optimalTP = entry + (risk * 3);
                    setTakeProfit(optimalTP.toString());
                  }
                }}
              >
                Set 3:1 Ratio
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}