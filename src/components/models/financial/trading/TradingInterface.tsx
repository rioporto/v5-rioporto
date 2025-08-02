'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Percent,
  Calculator,
  Clock,
  AlertTriangle
} from 'lucide-react';

interface TradingInterfaceProps {
  className?: string;
}

export function TradingInterface({ className }: TradingInterfaceProps) {
  const [orderType, setOrderType] = useState<'market' | 'limit' | 'stop'>('market');
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [stopPrice, setStopPrice] = useState('');
  const [leverage, setLeverage] = useState(1);

  const marketPrice = 42550.25;
  const estimatedTotal = parseFloat(amount || '0') * (orderType === 'market' ? marketPrice : parseFloat(price || '0'));

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Trading Panel</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={side} onValueChange={(v) => setSide(v as 'buy' | 'sell')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="buy" className="data-[state=active]:bg-success data-[state=active]:text-white">
              <TrendingUp className="w-4 h-4 mr-2" />
              Buy
            </TabsTrigger>
            <TabsTrigger value="sell" className="data-[state=active]:bg-error data-[state=active]:text-white">
              <TrendingDown className="w-4 h-4 mr-2" />
              Sell
            </TabsTrigger>
          </TabsList>

          <TabsContent value={side} className="space-y-4 mt-4">
            {/* Order Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Order Type</label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={orderType === 'market' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setOrderType('market')}
                >
                  Market
                </Button>
                <Button
                  variant={orderType === 'limit' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setOrderType('limit')}
                >
                  Limit
                </Button>
                <Button
                  variant={orderType === 'stop' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setOrderType('stop')}
                >
                  Stop
                </Button>
              </div>
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Amount (BTC)</label>
              <div className="relative">
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  step="0.00001"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                  <Button size="sm" variant="ghost" onClick={() => setAmount('0.01')}>
                    Min
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setAmount('0.5')}>
                    50%
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setAmount('1')}>
                    Max
                  </Button>
                </div>
              </div>
            </div>

            {/* Price (for limit/stop orders) */}
            {orderType !== 'market' && (
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {orderType === 'limit' ? 'Limit Price' : 'Stop Price'} (USDT)
                </label>
                <Input
                  type="number"
                  value={orderType === 'limit' ? price : stopPrice}
                  onChange={(e) => orderType === 'limit' ? setPrice(e.target.value) : setStopPrice(e.target.value)}
                  placeholder={marketPrice.toFixed(2)}
                  step="0.01"
                />
              </div>
            )}

            {/* Leverage */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Leverage</label>
                <Badge variant="outline">{leverage}x</Badge>
              </div>
              <div className="grid grid-cols-5 gap-1">
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

            {/* Order Summary */}
            <div className="p-4 bg-muted rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Market Price</span>
                <span className="font-medium">
                  ${marketPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Order Value</span>
                <span className="font-medium">
                  ${estimatedTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Fee (0.1%)</span>
                <span className="font-medium">
                  ${(estimatedTotal * 0.001).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="pt-2 border-t border-border">
                <div className="flex justify-between">
                  <span className="font-medium">Total</span>
                  <span className="font-bold text-lg">
                    ${(estimatedTotal * 1.001).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              className="w-full" 
              variant={side === 'buy' ? 'success' : 'danger'}
              size="lg"
              disabled={!amount || parseFloat(amount) <= 0}
            >
              {side === 'buy' ? (
                <>
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Buy BTC
                </>
              ) : (
                <>
                  <TrendingDown className="w-4 h-4 mr-2" />
                  Sell BTC
                </>
              )}
            </Button>

            {/* Risk Warning */}
            <div className="flex items-start space-x-2 p-3 bg-warning/10 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-warning mt-0.5" />
              <p className="text-xs text-warning">
                Trading involves risk. Only trade with funds you can afford to lose.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}