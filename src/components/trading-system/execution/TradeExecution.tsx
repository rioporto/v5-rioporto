import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { 
  TrendingUp,
  TrendingDown,
  DollarSign,
  Bitcoin,
  Info,
  AlertTriangle,
  Calculator,
  Percent,
  Lock,
  Unlock,
  BarChart3,
  Zap,
  Shield,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface TradeExecutionProps {
  className?: string;
  pair?: string;
  currentPrice?: number;
  onExecute?: (order: any) => void;
}

interface OrderFormData {
  type: 'market' | 'limit' | 'stop' | 'stop-limit';
  side: 'buy' | 'sell';
  amount: string;
  price: string;
  stopPrice: string;
  total: string;
}

export function TradeExecution({ 
  className,
  pair = 'BTC/USDT',
  currentPrice = 45250.00,
  onExecute
}: TradeExecutionProps) {
  const [orderType, setOrderType] = React.useState<'buy' | 'sell'>('buy');
  const [formData, setFormData] = React.useState<OrderFormData>({
    type: 'market',
    side: 'buy',
    amount: '',
    price: currentPrice.toString(),
    stopPrice: '',
    total: ''
  });
  const [leverage, setLeverage] = React.useState(1);
  const [showAdvanced, setShowAdvanced] = React.useState(false);

  const accountBalance = {
    USDT: 15000,
    BTC: 0.35,
    availableUSDT: 12000,
    availableBTC: 0.30
  };

  const fees = {
    maker: 0.025,
    taker: 0.075
  };

  const marketStats = {
    high24h: 46500,
    low24h: 44200,
    volume24h: 125432.5,
    change24h: 2.35
  };

  React.useEffect(() => {
    if (formData.amount && formData.type !== 'market') {
      const amount = parseFloat(formData.amount) || 0;
      const price = parseFloat(formData.price) || 0;
      const total = amount * price;
      setFormData(prev => ({ ...prev, total: total.toFixed(2) }));
    }
  }, [formData.amount, formData.price, formData.type]);

  const calculateOrderDetails = () => {
    const amount = parseFloat(formData.amount) || 0;
    const price = formData.type === 'market' ? currentPrice : parseFloat(formData.price) || 0;
    const subtotal = amount * price;
    const fee = subtotal * (formData.type === 'market' ? fees.taker : fees.maker) / 100;
    const total = orderType === 'buy' ? subtotal + fee : subtotal - fee;
    
    return {
      amount,
      price,
      subtotal,
      fee,
      total,
      estimatedCost: orderType === 'buy' ? total : amount,
      estimatedReceive: orderType === 'buy' ? amount : total
    };
  };

  const orderDetails = calculateOrderDetails();

  const handleSubmit = () => {
    const order = {
      ...formData,
      side: orderType,
      leverage,
      timestamp: new Date(),
      details: orderDetails
    };
    onExecute?.(order);
  };

  const orderTypeOptions = [
    { value: 'market', label: 'Market', description: 'Execute immediately at best price' },
    { value: 'limit', label: 'Limit', description: 'Execute at specified price or better' },
    { value: 'stop', label: 'Stop', description: 'Market order when stop price is reached' },
    { value: 'stop-limit', label: 'Stop-Limit', description: 'Limit order when stop price is reached' }
  ];

  const percentageButtons = [25, 50, 75, 100];

  const handlePercentageClick = (percentage: number) => {
    const available = orderType === 'buy' ? accountBalance.availableUSDT : accountBalance.availableBTC;
    const price = formData.type === 'market' ? currentPrice : parseFloat(formData.price) || currentPrice;
    
    if (orderType === 'buy') {
      const maxAmount = (available * (percentage / 100)) / price;
      setFormData(prev => ({ ...prev, amount: maxAmount.toFixed(8) }));
    } else {
      const amount = available * (percentage / 100);
      setFormData(prev => ({ ...prev, amount: amount.toFixed(8) }));
    }
  };

  return (
    <Card className={cn('p-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Bitcoin className="w-5 h-5" />
            {pair}
          </h3>
          <div className="flex items-center gap-4 mt-1 text-sm">
            <span className="text-2xl font-bold">${currentPrice.toLocaleString()}</span>
            <Badge 
              variant={marketStats.change24h > 0 ? 'default' : 'destructive'}
              className="gap-1"
            >
              {marketStats.change24h > 0 ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {Math.abs(marketStats.change24h)}%
            </Badge>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          <BarChart3 className="w-4 h-4 mr-2" />
          {showAdvanced ? 'Hide' : 'Show'} Advanced
        </Button>
      </div>

      {/* Market Stats (Advanced) */}
      {showAdvanced && (
        <div className="grid grid-cols-4 gap-4 mb-6 p-4 bg-muted/50 rounded-lg">
          <div>
            <p className="text-xs text-muted-foreground">24h High</p>
            <p className="text-sm font-medium">${marketStats.high24h.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">24h Low</p>
            <p className="text-sm font-medium">${marketStats.low24h.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">24h Volume</p>
            <p className="text-sm font-medium">{marketStats.volume24h.toLocaleString()} BTC</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Spread</p>
            <p className="text-sm font-medium">0.02%</p>
          </div>
        </div>
      )}

      {/* Order Type Tabs */}
      <Tabs value={orderType} onValueChange={(v) => setOrderType(v as 'buy' | 'sell')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="buy" className="gap-2">
            <ArrowUpRight className="w-4 h-4" />
            Buy
          </TabsTrigger>
          <TabsTrigger value="sell" className="gap-2">
            <ArrowDownRight className="w-4 h-4" />
            Sell
          </TabsTrigger>
        </TabsList>

        <TabsContent value={orderType} className="mt-6 space-y-6">
          {/* Order Type Selection */}
          <div>
            <label className="text-sm font-medium mb-2 block">Order Type</label>
            <div className="grid grid-cols-2 gap-2">
              {orderTypeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFormData(prev => ({ ...prev, type: option.value as any }))}
                  className={cn(
                    'p-3 text-left rounded-lg border transition-colors',
                    formData.type === option.value
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-muted-foreground'
                  )}
                >
                  <p className="font-medium text-sm">{option.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{option.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Price Input (for limit orders) */}
          {(formData.type === 'limit' || formData.type === 'stop-limit') && (
            <div>
              <label className="text-sm font-medium mb-2 block">
                {formData.type === 'stop-limit' ? 'Limit' : ''} Price
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="0.00"
                  className="pl-10"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  USDT
                </span>
              </div>
            </div>
          )}

          {/* Stop Price (for stop orders) */}
          {(formData.type === 'stop' || formData.type === 'stop-limit') && (
            <div>
              <label className="text-sm font-medium mb-2 block">Stop Price</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="number"
                  value={formData.stopPrice}
                  onChange={(e) => setFormData(prev => ({ ...prev, stopPrice: e.target.value }))}
                  placeholder="0.00"
                  className="pl-10"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  USDT
                </span>
              </div>
            </div>
          )}

          {/* Amount Input */}
          <div>
            <label className="text-sm font-medium mb-2 block">Amount</label>
            <div className="relative">
              <Bitcoin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                placeholder="0.00000000"
                className="pl-10"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                BTC
              </span>
            </div>
            
            {/* Quick Amount Buttons */}
            <div className="flex gap-2 mt-2">
              {percentageButtons.map((percentage) => (
                <Button
                  key={percentage}
                  variant="outline"
                  size="sm"
                  onClick={() => handlePercentageClick(percentage)}
                  className="flex-1"
                >
                  {percentage}%
                </Button>
              ))}
            </div>
          </div>

          {/* Leverage (Advanced) */}
          {showAdvanced && (
            <div>
              <label className="text-sm font-medium mb-2 block">
                Leverage
                <Badge variant="outline" className="ml-2 text-xs">
                  <Zap className="w-3 h-3 mr-1" />
                  {leverage}x
                </Badge>
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={leverage}
                  onChange={(e) => setLeverage(Number(e.target.value))}
                  className="flex-1"
                />
                <div className="flex gap-1">
                  {[1, 2, 5, 10].map((x) => (
                    <Button
                      key={x}
                      variant={leverage === x ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setLeverage(x)}
                    >
                      {x}x
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Order Summary */}
          <Card className="p-4 bg-muted/50">
            <h4 className="text-sm font-medium mb-3">Order Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price</span>
                <span className="font-medium">
                  ${formData.type === 'market' ? currentPrice.toLocaleString() : formData.price || '0.00'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-medium">{formData.amount || '0.00'} BTC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${orderDetails.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Fee ({formData.type === 'market' ? fees.taker : fees.maker}%)
                </span>
                <span className="font-medium">${orderDetails.fee.toFixed(2)}</span>
              </div>
              {leverage > 1 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Leverage</span>
                  <span className="font-medium">{leverage}x</span>
                </div>
              )}
              <div className="pt-2 border-t border-border">
                <div className="flex justify-between">
                  <span className="font-medium">Total</span>
                  <span className="font-bold text-lg">
                    ${orderDetails.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Account Balance */}
          <Card className="p-4 bg-muted/50">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4 text-muted-foreground" />
              <h4 className="text-sm font-medium">Account Balance</h4>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">Available USDT</p>
                <p className="font-medium">${accountBalance.availableUSDT.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Available BTC</p>
                <p className="font-medium">{accountBalance.availableBTC} BTC</p>
              </div>
            </div>
          </Card>

          {/* Submit Button */}
          <Button
            size="lg"
            className={cn(
              'w-full',
              orderType === 'buy' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
            )}
            disabled={!formData.amount || parseFloat(formData.amount) <= 0}
            onClick={handleSubmit}
          >
            {orderType === 'buy' ? (
              <>
                <ArrowUpRight className="w-5 h-5 mr-2" />
                Buy BTC
              </>
            ) : (
              <>
                <ArrowDownRight className="w-5 h-5 mr-2" />
                Sell BTC
              </>
            )}
          </Button>

          {/* Risk Warning */}
          <div className="flex items-start gap-2 p-3 bg-yellow-500/10 rounded-lg">
            <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              Trading involves risk. Prices can fluctuate rapidly. Only trade with funds you can afford to lose.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}