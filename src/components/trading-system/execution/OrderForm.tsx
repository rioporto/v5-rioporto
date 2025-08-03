import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Tabs } from '@/components/ui/Tabs';
import { Badge } from '@/components/ui/Badge';
// import { Slider } from '@/components/ui/Slider';
import { 
  TrendingUp, 
  TrendingDown, 
  Info,
  Calculator,
  AlertCircle,
  Lock,
  Zap
} from 'lucide-react';
import { Tooltip } from '@/components/ui/Tooltip';

interface OrderFormProps {
  className?: string;
  pair?: string;
  currentPrice?: number;
  balance?: {
    base: number;
    quote: number;
  };
}

export function OrderForm({ 
  className,
  pair = 'BTC/USDT',
  currentPrice = 45250,
  balance = {
    base: 0.5423,
    quote: 10000
  }
}: OrderFormProps) {
  const [orderType, setOrderType] = React.useState<'market' | 'limit' | 'stop'>('limit');
  const [side, setSide] = React.useState<'buy' | 'sell'>('buy');
  const [price, setPrice] = React.useState(currentPrice.toString());
  const [amount, setAmount] = React.useState('');
  const [total, setTotal] = React.useState('');
  const [percentage, setPercentage] = React.useState(0);
  const [stopPrice, setStopPrice] = React.useState('');
  const [takeProfit, setTakeProfit] = React.useState('');
  const [stopLoss, setStopLoss] = React.useState('');

  const handleAmountChange = (value: string) => {
    setAmount(value);
    if (value && price) {
      setTotal((parseFloat(value) * parseFloat(price)).toFixed(2));
    }
  };

  const handleTotalChange = (value: string) => {
    setTotal(value);
    if (value && price) {
      setAmount((parseFloat(value) / parseFloat(price)).toFixed(8));
    }
  };

  const handlePercentageChange = (value: number) => {
    setPercentage(value);
    const availableBalance = side === 'buy' ? balance.quote : balance.base;
    const percentageAmount = (availableBalance * value) / 100;
    
    if (side === 'buy') {
      setTotal(percentageAmount.toFixed(2));
      setAmount((percentageAmount / parseFloat(price)).toFixed(8));
    } else {
      setAmount(percentageAmount.toFixed(8));
      setTotal((percentageAmount * parseFloat(price)).toFixed(2));
    }
  };

  const calculateFees = () => {
    const totalValue = parseFloat(total) || 0;
    const makerFee = totalValue * 0.001; // 0.1%
    const takerFee = totalValue * 0.0015; // 0.15%
    return orderType === 'market' ? takerFee : makerFee;
  };

  const fees = calculateFees();
  const finalTotal = parseFloat(total || '0') + (side === 'buy' ? fees : -fees);

  const orderTabs = [
    {
      value: 'spot',
      label: 'Spot',
      content: (
        <div className="space-y-4 pt-4">
          {/* Order Type Selection */}
          <div className="flex gap-2 p-1 bg-muted rounded-lg">
            {['market', 'limit', 'stop'].map((type) => (
              <Button
                key={type}
                variant={orderType === type ? 'primary' : 'ghost'}
                size="sm"
                className="flex-1 capitalize"
                onClick={() => setOrderType(type as any)}
              >
                {type}
              </Button>
            ))}
          </div>

          {/* Buy/Sell Toggle */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={side === 'buy' ? 'primary' : 'outline'}
              className={cn(
                'h-12',
                side === 'buy' && 'bg-green-500 hover:bg-green-600'
              )}
              onClick={() => setSide('buy')}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Buy {pair.split('/')[0]}
            </Button>
            <Button
              variant={side === 'sell' ? 'primary' : 'outline'}
              className={cn(
                'h-12',
                side === 'sell' && 'bg-red-500 hover:bg-red-600'
              )}
              onClick={() => setSide('sell')}
            >
              <TrendingDown className="w-4 h-4 mr-2" />
              Sell {pair.split('/')[0]}
            </Button>
          </div>

          {/* Price Input (for limit/stop orders) */}
          {orderType !== 'market' && (
            <div>
              <Label htmlFor="price" className="flex items-center gap-2">
                Price
                <Tooltip content="The price at which you want to place your order">
                  <Info className="w-3 h-3 text-muted-foreground" />
                </Tooltip>
              </Label>
              <div className="relative mt-1">
                <Input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  className="pr-16"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  {pair.split('/')[1]}
                </span>
              </div>
            </div>
          )}

          {/* Stop Price (for stop orders) */}
          {orderType === 'stop' && (
            <div>
              <Label htmlFor="stop-price" className="flex items-center gap-2">
                Stop Price
                <Tooltip content="The trigger price for your stop order">
                  <Info className="w-3 h-3 text-muted-foreground" />
                </Tooltip>
              </Label>
              <div className="relative mt-1">
                <Input
                  id="stop-price"
                  type="number"
                  value={stopPrice}
                  onChange={(e) => setStopPrice(e.target.value)}
                  placeholder="0.00"
                  className="pr-16"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  {pair.split('/')[1]}
                </span>
              </div>
            </div>
          )}

          {/* Amount Input */}
          <div>
            <Label htmlFor="amount" className="flex items-center justify-between">
              <span>Amount</span>
              <span className="text-xs text-muted-foreground">
                Available: {side === 'buy' ? balance.quote.toFixed(2) : balance.base.toFixed(8)} {side === 'buy' ? pair.split('/')[1] : pair.split('/')[0]}
              </span>
            </Label>
            <div className="relative mt-1">
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                placeholder="0.00000000"
                className="pr-16"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                {pair.split('/')[0]}
              </span>
            </div>
          </div>

          {/* Percentage Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Amount %</Label>
              <span className="text-sm font-medium">{percentage}%</span>
            </div>
            {/* <Slider
              value={[percentage]}
              onValueChange={([value]) => handlePercentageChange(value)}
              max={100}
              step={25}
              className="w-full"
            /> */}
            <div className="flex justify-between mt-1 text-xs text-muted-foreground">
              <button onClick={() => handlePercentageChange(25)}>25%</button>
              <button onClick={() => handlePercentageChange(50)}>50%</button>
              <button onClick={() => handlePercentageChange(75)}>75%</button>
              <button onClick={() => handlePercentageChange(100)}>100%</button>
            </div>
          </div>

          {/* Total Input */}
          <div>
            <Label htmlFor="total">Total</Label>
            <div className="relative mt-1">
              <Input
                id="total"
                type="number"
                value={total}
                onChange={(e) => handleTotalChange(e.target.value)}
                placeholder="0.00"
                className="pr-16"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                {pair.split('/')[1]}
              </span>
            </div>
          </div>

          {/* Advanced Options */}
          <div className="space-y-3 p-3 bg-muted/50 rounded-lg">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Advanced Options
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="take-profit" className="text-xs">Take Profit</Label>
                <Input
                  id="take-profit"
                  type="number"
                  value={takeProfit}
                  onChange={(e) => setTakeProfit(e.target.value)}
                  placeholder="0.00"
                  className="mt-1 h-8 text-sm"
                />
              </div>
              <div>
                <Label htmlFor="stop-loss" className="text-xs">Stop Loss</Label>
                <Input
                  id="stop-loss"
                  type="number"
                  value={stopLoss}
                  onChange={(e) => setStopLoss(e.target.value)}
                  placeholder="0.00"
                  className="mt-1 h-8 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-2 p-3 bg-muted/50 rounded-lg">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Fee ({orderType === 'market' ? '0.15%' : '0.10%'})</span>
              <span>{fees.toFixed(4)} {pair.split('/')[1]}</span>
            </div>
            <div className="flex justify-between text-sm font-medium">
              <span>Total</span>
              <span className={side === 'buy' ? 'text-green-500' : 'text-red-500'}>
                {finalTotal.toFixed(2)} {pair.split('/')[1]}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            size="lg"
            className={cn(
              'w-full',
              side === 'buy' 
                ? 'bg-green-500 hover:bg-green-600' 
                : 'bg-red-500 hover:bg-red-600'
            )}
            disabled={!amount || !total || (orderType !== 'market' && !price)}
          >
            <Lock className="w-4 h-4 mr-2" />
            {side === 'buy' ? 'Buy' : 'Sell'} {pair.split('/')[0]}
          </Button>

          {/* Warning */}
          {orderType === 'market' && (
            <div className="flex items-start gap-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5" />
              <p className="text-xs text-yellow-500">
                Market orders execute immediately at the best available price. 
                Final price may differ from current market price.
              </p>
            </div>
          )}
        </div>
      )
    },
    {
      value: 'futures',
      label: 'Futures',
      content: (
        <div className="py-8 text-center text-muted-foreground">
          <Calculator className="w-12 h-12 mx-auto mb-3" />
          <p className="text-sm">Futures trading coming soon</p>
        </div>
      )
    },
    {
      value: 'margin',
      label: 'Margin',
      content: (
        <div className="py-8 text-center text-muted-foreground">
          <TrendingUp className="w-12 h-12 mx-auto mb-3" />
          <p className="text-sm">Margin trading coming soon</p>
        </div>
      )
    }
  ];

  return (
    <Card className={cn('p-4', className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          Place Order
        </h3>
        <Badge variant="outline" className="text-xs">
          {pair}
        </Badge>
      </div>

      <Tabs defaultValue="spot" tabs={orderTabs} />
    </Card>
  );
}