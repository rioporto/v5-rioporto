'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Tabs } from '@/components/ui/Tabs';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Switch } from '@/components/ui/Switch';
import { 
  Target, 
  Shield, 
  TrendingUp, 
  TrendingDown,
  Settings,
  AlertTriangle,
  Info
} from 'lucide-react';

interface AdvancedOrderProps {
  pair: string;
}

const orderTypes = [
  { value: 'stop_loss', label: 'Stop Loss' },
  { value: 'take_profit', label: 'Take Profit' },
  { value: 'oco', label: 'OCO (One-Cancels-Other)' },
  { value: 'trailing_stop', label: 'Trailing Stop' },
];

const triggerTypes = [
  { value: 'last_price', label: 'Last Price' },
  { value: 'mark_price', label: 'Mark Price' },
  { value: 'index_price', label: 'Index Price' },
];

export function AdvancedOrder({ pair }: AdvancedOrderProps) {
  const [orderType, setOrderType] = useState('stop_loss');
  const [side, setSide] = useState<'buy' | 'sell'>('sell');
  const [amount, setAmount] = useState('');
  const [triggerPrice, setTriggerPrice] = useState('');
  const [limitPrice, setLimitPrice] = useState('');
  const [triggerType, setTriggerType] = useState('last_price');
  const [useMarketOrder, setUseMarketOrder] = useState(false);
  const [reduceOnly, setReduceOnly] = useState(true);
  const [timeInForce, setTimeInForce] = useState('GTC');
  const [trailingAmount, setTrailingAmount] = useState('');
  const [trailingType, setTrailingType] = useState('percentage');

  // OCO specific
  const [ocoStopPrice, setOcoStopPrice] = useState('');
  const [ocoLimitPrice, setOcoLimitPrice] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data
  const marketData = {
    price: 342156.78,
    bid: 342150.00,
    ask: 342163.56,
  };

  const balance = {
    BTC: 1.25847396,
    BRL: 15420.50,
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    const orderData = {
      type: orderType,
      side,
      amount: parseFloat(amount),
      triggerPrice: parseFloat(triggerPrice),
      limitPrice: useMarketOrder ? null : parseFloat(limitPrice),
      triggerType,
      reduceOnly,
      timeInForce,
      ...(orderType === 'trailing_stop' && {
        trailingAmount: parseFloat(trailingAmount),
        trailingType,
      }),
      ...(orderType === 'oco' && {
        stopPrice: parseFloat(ocoStopPrice),
        limitPrice: parseFloat(ocoLimitPrice),
      }),
    };

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Advanced order submitted:', orderData);
    setIsSubmitting(false);
  };

  const sideOptions = [
    { id: 'buy', label: 'Buy', icon: TrendingUp },
    { id: 'sell', label: 'Sell', icon: TrendingDown },
  ];

  const getOrderTypeIcon = () => {
    switch (orderType) {
      case 'stop_loss': return Shield;
      case 'take_profit': return Target;
      case 'oco': return Settings;
      case 'trailing_stop': return TrendingUp;
      default: return Settings;
    }
  };

  const OrderTypeIcon = getOrderTypeIcon();

  return (
    <Card className="h-full">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <OrderTypeIcon className="w-4 h-4" />
            <h3 className="font-semibold">Advanced Orders</h3>
          </div>
          <Badge variant="outline" className="text-xs">
            {pair}
          </Badge>
        </div>
        
        <div className="text-sm text-muted-foreground">
          Market: R$ {marketData.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </div>
      </div>

      <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
        {/* Order Type Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Order Type</label>
          <Select
            value={orderType}
            onValueChange={setOrderType}
            options={orderTypes}
          />
        </div>

        {/* Buy/Sell Toggle */}
        <Tabs
          items={sideOptions}
          value={side}
          onValueChange={(value) => setSide(value as 'buy' | 'sell')}
          variant="pills"
          className="grid grid-cols-2"
        />

        {/* Amount */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Amount</label>
            <div className="text-xs text-muted-foreground">
              Available: {balance.BTC.toFixed(8)} BTC
            </div>
          </div>
          <div className="relative">
            <Input
              type="number"
              step="0.00000001"
              placeholder="0.00000000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="pr-16"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
              BTC
            </div>
          </div>
        </div>

        {/* Trigger Price */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Trigger Price</label>
          <div className="relative">
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={triggerPrice}
              onChange={(e) => setTriggerPrice(e.target.value)}
              className="pr-12"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
              BRL
            </div>
          </div>
        </div>

        {/* Trigger Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Trigger Type</label>
          <Select
            value={triggerType}
            onValueChange={setTriggerType}
            options={triggerTypes}
          />
        </div>

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

        {/* Limit Price (if not market order) */}
        {!useMarketOrder && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Limit Price</label>
            <div className="relative">
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={limitPrice}
                onChange={(e) => setLimitPrice(e.target.value)}
                className="pr-12"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                BRL
              </div>
            </div>
          </div>
        )}

        {/* Trailing Stop Specific */}
        {orderType === 'trailing_stop' && (
          <div className="space-y-4 p-3 bg-muted rounded-lg">
            <div className="flex items-center space-x-2 text-sm font-medium">
              <TrendingUp className="w-4 h-4" />
              <span>Trailing Stop Settings</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={trailingType === 'percentage' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTrailingType('percentage')}
              >
                Percentage
              </Button>
              <Button
                variant={trailingType === 'amount' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTrailingType('amount')}
              >
                Amount
              </Button>
            </div>
            
            <div className="relative">
              <Input
                type="number"
                step={trailingType === 'percentage' ? '0.01' : '0.01'}
                placeholder={trailingType === 'percentage' ? '2.00' : '1000.00'}
                value={trailingAmount}
                onChange={(e) => setTrailingAmount(e.target.value)}
                className="pr-12"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                {trailingType === 'percentage' ? '%' : 'BRL'}
              </div>
            </div>
          </div>
        )}

        {/* OCO Specific */}
        {orderType === 'oco' && (
          <div className="space-y-4 p-3 bg-muted rounded-lg">
            <div className="flex items-center space-x-2 text-sm font-medium">
              <Settings className="w-4 h-4" />
              <span>OCO Settings</span>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Stop Price</label>
              <div className="relative">
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={ocoStopPrice}
                  onChange={(e) => setOcoStopPrice(e.target.value)}
                  className="pr-12"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                  BRL
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Limit Price</label>
              <div className="relative">
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={ocoLimitPrice}
                  onChange={(e) => setOcoLimitPrice(e.target.value)}
                  className="pr-12"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                  BRL
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reduce Only */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <label className="text-sm font-medium">Reduce Only</label>
            <p className="text-xs text-muted-foreground">
              Only reduce existing position
            </p>
          </div>
          <Switch
            checked={reduceOnly}
            onCheckedChange={setReduceOnly}
          />
        </div>

        {/* Warning/Info Messages */}
        <div className="space-y-2">
          {orderType === 'stop_loss' && (
            <div className="flex items-start space-x-2 p-2 bg-warning/10 rounded text-xs text-warning">
              <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0" />
              <span>Stop loss orders may not execute at exact trigger price during high volatility</span>
            </div>
          )}
          
          {orderType === 'trailing_stop' && (
            <div className="flex items-start space-x-2 p-2 bg-blue-500/10 rounded text-xs text-blue-600">
              <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
              <span>Trailing stop automatically adjusts stop price as market moves favorably</span>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <Button
          className="w-full"
          onClick={handleSubmit}
          disabled={!amount || !triggerPrice || isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span>Placing Order...</span>
            </div>
          ) : (
            <>
              <OrderTypeIcon className="w-4 h-4 mr-2" />
              Place {orderTypes.find(t => t.value === orderType)?.label}
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}