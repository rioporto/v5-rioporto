import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  ArrowUp, 
  ArrowDown, 
  Activity,
  TrendingUp,
  TrendingDown,
  RefreshCw
} from 'lucide-react';

interface Order {
  price: number;
  amount: number;
  total: number;
  percentage?: number;
}

interface OrderBookProps {
  className?: string;
  asks?: Order[];
  bids?: Order[];
  spread?: number;
  lastPrice?: number;
  priceChange24h?: number;
  pair?: string;
  onOrderClick?: (order: Order, side: 'buy' | 'sell') => void;
}

const generateMockOrders = (basePrice: number, side: 'ask' | 'bid'): Order[] => {
  const orders: Order[] = [];
  const count = 15;
  
  for (let i = 0; i < count; i++) {
    const priceOffset = side === 'ask' 
      ? basePrice * (1 + (i + 1) * 0.0002)
      : basePrice * (1 - (i + 1) * 0.0002);
    
    const amount = Math.random() * 5 + 0.1;
    const total = priceOffset * amount;
    const percentage = Math.random() * 100;
    
    orders.push({
      price: Number(priceOffset.toFixed(2)),
      amount: Number(amount.toFixed(8)),
      total: Number(total.toFixed(2)),
      percentage
    });
  }
  
  return side === 'bid' ? orders.reverse() : orders;
};

export function OrderBook({ 
  className,
  asks = generateMockOrders(45250, 'ask'),
  bids = generateMockOrders(45250, 'bid'),
  spread = 0.02,
  lastPrice = 45250,
  priceChange24h = 2.35,
  pair = 'BTC/USDT',
  onOrderClick
}: OrderBookProps) {
  const [grouping, setGrouping] = React.useState(0.01);
  const [autoRefresh, setAutoRefresh] = React.useState(true);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 4,
      maximumFractionDigits: 8
    }).format(amount);
  };

  const getMaxTotal = () => {
    const allTotals = [...asks, ...bids].map(order => order.total);
    return Math.max(...allTotals);
  };

  const maxTotal = getMaxTotal();

  return (
    <Card className={cn('p-4', className)}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Order Book
          </h3>
          <p className="text-sm text-muted-foreground">{pair}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={cn(autoRefresh && 'text-primary')}
          >
            <RefreshCw className={cn('w-4 h-4', autoRefresh && 'animate-spin')} />
          </Button>
          <select
            className="text-xs bg-background border border-border rounded px-2 py-1"
            value={grouping}
            onChange={(e) => setGrouping(Number(e.target.value))}
          >
            <option value={0.01}>0.01</option>
            <option value={0.1}>0.1</option>
            <option value={1}>1</option>
            <option value={10}>10</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
          <div>
            <p className="text-xs text-muted-foreground">Last Price</p>
            <p className={cn(
              'text-lg font-bold',
              priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'
            )}>
              ${formatPrice(lastPrice)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">24h Change</p>
            <div className={cn(
              'flex items-center gap-1',
              priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'
            )}>
              {priceChange24h >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span className="font-medium">{priceChange24h >= 0 ? '+' : ''}{priceChange24h}%</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
          <span>Spread: {spread}%</span>
          <span>Depth: ${formatPrice(asks.reduce((sum, order) => sum + order.total, 0) + bids.reduce((sum, order) => sum + order.total, 0))}</span>
        </div>
      </div>

      <div className="space-y-1">
        <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground pb-2 border-b border-border">
          <span>Price (USDT)</span>
          <span className="text-center">Amount (BTC)</span>
          <span className="text-right">Total (USDT)</span>
        </div>

        {/* Asks (Sell Orders) */}
        <div className="space-y-0.5 max-h-[200px] overflow-y-auto">
          {asks.slice(0, 10).reverse().map((order, idx) => (
            <div
              key={`ask-${idx}`}
              className="grid grid-cols-3 gap-2 text-xs py-1 hover:bg-red-500/5 cursor-pointer relative"
              onClick={() => onOrderClick?.(order, 'sell')}
            >
              <div
                className="absolute inset-0 bg-red-500/10"
                style={{ width: `${(order.total / maxTotal) * 100}%` }}
              />
              <span className="text-red-500 font-medium relative z-10">
                {formatPrice(order.price)}
              </span>
              <span className="text-center relative z-10">
                {formatAmount(order.amount)}
              </span>
              <span className="text-right relative z-10">
                {formatPrice(order.total)}
              </span>
            </div>
          ))}
        </div>

        {/* Spread Indicator */}
        <div className="py-2 border-y border-border">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Activity className="w-3 h-3 text-muted-foreground" />
              <span className="font-medium">${formatPrice(lastPrice)}</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {spread}% spread
            </Badge>
          </div>
        </div>

        {/* Bids (Buy Orders) */}
        <div className="space-y-0.5 max-h-[200px] overflow-y-auto">
          {bids.slice(0, 10).map((order, idx) => (
            <div
              key={`bid-${idx}`}
              className="grid grid-cols-3 gap-2 text-xs py-1 hover:bg-green-500/5 cursor-pointer relative"
              onClick={() => onOrderClick?.(order, 'buy')}
            >
              <div
                className="absolute inset-0 bg-green-500/10"
                style={{ width: `${(order.total / maxTotal) * 100}%` }}
              />
              <span className="text-green-500 font-medium relative z-10">
                {formatPrice(order.price)}
              </span>
              <span className="text-center relative z-10">
                {formatAmount(order.amount)}
              </span>
              <span className="text-right relative z-10">
                {formatPrice(order.total)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
        <div className="p-2 bg-green-500/10 rounded">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Buy Orders</span>
            <ArrowUp className="w-3 h-3 text-green-500" />
          </div>
          <p className="font-medium text-green-500 mt-1">
            {bids.length} orders
          </p>
          <p className="text-muted-foreground">
            ${formatPrice(bids.reduce((sum, order) => sum + order.total, 0))}
          </p>
        </div>
        <div className="p-2 bg-red-500/10 rounded">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Sell Orders</span>
            <ArrowDown className="w-3 h-3 text-red-500" />
          </div>
          <p className="font-medium text-red-500 mt-1">
            {asks.length} orders
          </p>
          <p className="text-muted-foreground">
            ${formatPrice(asks.reduce((sum, order) => sum + order.total, 0))}
          </p>
        </div>
      </div>
    </Card>
  );
}