'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
// import { Slider } from '@/components/ui/Slider';
import { Badge } from '@/components/ui/Badge';
import { 
  Shield, 
  AlertTriangle, 
  TrendingDown,
  DollarSign,
  Percent,
  Target
} from 'lucide-react';

interface RiskManagerProps {
  className?: string;
}

export function RiskManager({ className }: RiskManagerProps) {
  const [stopLoss, setStopLoss] = useState(5);
  const [takeProfit, setTakeProfit] = useState(10);
  const [positionSize, setPositionSize] = useState(25);
  const [leverage, setLeverage] = useState(1);

  const accountBalance = 50000;
  const riskAmount = (accountBalance * stopLoss) / 100;
  const potentialProfit = (accountBalance * takeProfit) / 100;
  const riskRewardRatio = takeProfit / stopLoss;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="w-5 h-5" />
          <span>Risk Manager</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Risk Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Risk Amount</span>
              <AlertTriangle className="w-4 h-4 text-warning" />
            </div>
            <div className="text-2xl font-bold">
              R$ {riskAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </div>
          
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Risk/Reward</span>
              <Target className="w-4 h-4 text-success" />
            </div>
            <div className="text-2xl font-bold">
              1:{riskRewardRatio.toFixed(1)}
            </div>
          </div>
        </div>

        {/* Stop Loss */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Stop Loss</Label>
            <span className="text-sm font-medium">{stopLoss}%</span>
          </div>
          <input
            type="range"
            value={stopLoss}
            onChange={(e) => setStopLoss(parseFloat(e.target.value))}
            min={0.5}
            max={10}
            step={0.5}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0.5%</span>
            <span>10%</span>
          </div>
        </div>

        {/* Take Profit */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Take Profit</Label>
            <span className="text-sm font-medium">{takeProfit}%</span>
          </div>
          <input
            type="range"
            value={takeProfit}
            onChange={(e) => setTakeProfit(parseFloat(e.target.value))}
            min={1}
            max={50}
            step={1}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1%</span>
            <span>50%</span>
          </div>
        </div>

        {/* Position Size */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Position Size</Label>
            <span className="text-sm font-medium">{positionSize}%</span>
          </div>
          <input
            type="range"
            value={positionSize}
            onChange={(e) => setPositionSize(parseFloat(e.target.value))}
            min={5}
            max={100}
            step={5}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>5%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Leverage */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Leverage</Label>
            <Badge variant="outline">{leverage}x</Badge>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 5, 10].map((lev) => (
              <Button
                key={lev}
                variant={leverage === lev ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setLeverage(lev)}
              >
                {lev}x
              </Button>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="p-4 bg-primary/5 rounded-lg space-y-2">
          <div className="flex justify-between">
            <span className="text-sm">Max Loss</span>
            <span className="text-sm font-medium text-error">
              -R$ {riskAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Target Profit</span>
            <span className="text-sm font-medium text-success">
              +R$ {potentialProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Position Value</span>
            <span className="text-sm font-medium">
              R$ {((accountBalance * positionSize) / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* Apply Button */}
        <Button className="w-full" variant="primary">
          Apply Risk Settings
        </Button>
      </CardContent>
    </Card>
  );
}