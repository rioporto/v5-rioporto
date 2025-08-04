'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Calculator,
  AlertTriangle,
  Clock,
  DollarSign
} from 'lucide-react';

interface QuickTradeProps {
  pair: string;
}

const orderTypes = [
  { value: 'market', label: 'Market' },
  { value: 'limit', label: 'Limit' },
  { value: 'stop', label: 'Stop' },
];

const timeInForce = [
  { value: 'GTC', label: 'Good Till Cancelled' },
  { value: 'IOC', label: 'Immediate or Cancel' },
  { value: 'FOK', label: 'Fill or Kill' },
];

export function QuickTrade({ pair }: QuickTradeProps) {
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [orderType, setOrderType] = useState('market');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [timeInForceValue, setTimeInForceValue] = useState('GTC');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data
  const marketData = {
    price: 342156.78,
    bid: 342150.00,
    ask: 342163.56,
    change24h: 2.34,
  };

  const balance = {
    BTC: 1.25847396,
    BRL: 15420.50,
  };

  const calculateTotal = () => {
    const qty = parseFloat(amount) || 0;
    const orderPrice = orderType === 'market' 
      ? (side === 'buy' ? marketData.ask : marketData.bid)
      : parseFloat(price) || 0;
    return qty * orderPrice;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate order submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Reset form
    setAmount('');
    setPrice('');
    setIsSubmitting(false);
    
    // Show success message (in a real app, use toast/notification)
    console.log('Order submitted successfully');
  };

  const sideOptions = [
    { id: 'buy', label: 'Buy', icon: TrendingUp },
    { id: 'sell', label: 'Sell', icon: TrendingDown },
  ];

  return (
    <Card className="h-full">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">Quick Trade</h3>
          <Badge variant="outline" className="text-xs">
            {pair}
          </Badge>
        </div>
        
        {/* Market Price */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Market Price</span>
          <div className="flex items-center space-x-2">
            <span className="font-mono font-semibold">
              R$ {marketData.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
            <span className={`text-xs ${marketData.change24h >= 0 ? 'text-success' : 'text-error'}`}>
              {marketData.change24h >= 0 ? '+' : ''}{marketData.change24h}%
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Buy/Sell Toggle */}
        <Tabs value={side} onValueChange={(value) => setSide(value as 'buy' | 'sell')}>
          <TabsList className="grid grid-cols-2">
            {sideOptions.map((option) => {
              const Icon = option.icon;
              return (
                <TabsTrigger key={option.id} value={option.id}>
                  <Icon className="w-4 h-4 mr-2" />
                  {option.label}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>

        {/* Order Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Order Type</label>
          <Select
            value={orderType}
            onChange={(value) => setOrderType(value)}
            options={orderTypes}
          />
        </div>

        {/* Amount Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Amount</label>
            <div className="text-xs text-muted-foreground">
              Available: {side === 'buy' 
                ? `R$ ${balance.BRL.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                : `${balance.BTC.toFixed(8)} BTC`
              }
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
          
          {/* Quick Amount Buttons */}
          <div className="grid grid-cols-4 gap-1">
            {['25%', '50%', '75%', '100%'].map((percent) => (
              <Button
                key={percent}
                variant="outline"
                size="sm"
                className="text-xs h-6"
                onClick={() => {
                  const maxAmount = side === 'buy' 
                    ? balance.BRL / (orderType === 'market' ? marketData.ask : parseFloat(price) || marketData.ask)
                    : balance.BTC;
                  const percentage = parseInt(percent) / 100;
                  setAmount((maxAmount * percentage).toFixed(8));
                }}
              >
                {percent}
              </Button>
            ))}
          </div>
        </div>

        {/* Price Input (for limit orders) */}
        {orderType !== 'market' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Price</label>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span>Bid: R$ {marketData.bid.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                <span>Ask: R$ {marketData.ask.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
            <div className="relative">
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="pr-12"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                BRL
              </div>
            </div>
          </div>
        )}

        {/* Time in Force (for limit orders) */}
        {orderType !== 'market' && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Time in Force</label>
            <Select
              value={timeInForceValue}
              onChange={(value) => setTimeInForceValue(value)}
              options={timeInForce}
            />
          </div>
        )}

        {/* Order Summary */}
        <div className="bg-muted rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total</span>
            <span className="font-mono font-semibold">
              R$ {calculateTotal().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
          
          {orderType === 'market' && (
            <div className="flex items-center space-x-2 text-xs text-warning">
              <AlertTriangle className="w-3 h-3" />
              <span>Market orders execute at current market price</span>
            </div>
          )}
          
          {orderType !== 'market' && (
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>Order will be placed in the order book</span>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <Button
          className={`w-full ${side === 'buy' ? 'bg-success hover:bg-success/90' : 'bg-error hover:bg-error/90'}`}
          onClick={handleSubmit}
          disabled={!amount || (orderType !== 'market' && !price) || isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span>Submitting...</span>
            </div>
          ) : (
            <>
              {side === 'buy' ? (
                <TrendingUp className="w-4 h-4 mr-2" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-2" />
              )}
              {side === 'buy' ? 'Buy' : 'Sell'} {pair.split('/')[0]}
            </>
          )}
        </Button>

        {/* Fee Estimate */}
        <div className="text-xs text-muted-foreground text-center">
          Estimated fee: ~R$ {(calculateTotal() * 0.001).toFixed(2)} (0.1%)
        </div>
      </div>
    </Card>
  );
}