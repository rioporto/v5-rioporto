import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  History,
  Download,
  Filter,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

interface Trade {
  id: string;
  date: Date;
  pair: string;
  type: 'buy' | 'sell';
  orderType: 'market' | 'limit' | 'stop';
  price: number;
  amount: number;
  total: number;
  fee: number;
  status: 'completed' | 'cancelled' | 'failed';
}

interface TradeHistoryProps {
  className?: string;
  trades?: Trade[];
  showFilters?: boolean;
}

const generateMockTrades = (): Trade[] => {
  const trades: Trade[] = [];
  const pairs = ['BTC/USDT', 'ETH/USDT', 'BNB/USDT', 'SOL/USDT'];
  const now = new Date();
  
  for (let i = 0; i < 20; i++) {
    const pair = pairs[Math.floor(Math.random() * pairs.length)];
    const type = Math.random() > 0.5 ? 'buy' : 'sell';
    const orderType = ['market', 'limit', 'stop'][Math.floor(Math.random() * 3)] as any;
    const price = 40000 + Math.random() * 10000;
    const amount = Math.random() * 0.5 + 0.01;
    const total = price * amount;
    const fee = total * 0.001;
    const status = Math.random() > 0.9 ? 'cancelled' : 'completed';
    
    trades.push({
      id: `trade-${i}`,
      date: new Date(now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      pair,
      type,
      orderType,
      price: Number(price.toFixed(2)),
      amount: Number(amount.toFixed(8)),
      total: Number(total.toFixed(2)),
      fee: Number(fee.toFixed(4)),
      status
    });
  }
  
  return trades.sort((a, b) => b.date.getTime() - a.date.getTime());
};

export function TradeHistory({ 
  className,
  trades = generateMockTrades(),
  showFilters = true
}: TradeHistoryProps) {
  const [filterType, setFilterType] = React.useState<'all' | 'buy' | 'sell'>('all');
  const [filterPair, setFilterPair] = React.useState<string>('all');
  const [filterPeriod, setFilterPeriod] = React.useState<string>('7d');

  const filteredTrades = trades.filter(trade => {
    if (filterType !== 'all' && trade.type !== filterType) return false;
    if (filterPair !== 'all' && trade.pair !== filterPair) return false;
    return true;
  });

  const getStatusIcon = (status: Trade['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'cancelled': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'failed': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: Trade['status']) => {
    const variants = {
      completed: 'bg-green-500/10 text-green-500 border-green-500/20',
      cancelled: 'bg-red-500/10 text-red-500 border-red-500/20',
      failed: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
    };
    return (
      <Badge variant="outline" className={cn('text-xs capitalize', variants[status])}>
        {status}
      </Badge>
    );
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const uniquePairs = Array.from(new Set(trades.map(t => t.pair)));

  return (
    <Card className={cn('p-4', className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <History className="w-5 h-5" />
          Trade History
        </h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          {showFilters && (
            <Button variant="ghost" size="sm">
              <Filter className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {showFilters && (
        <div className="flex flex-wrap gap-2 mb-4">
          <select
            className="text-sm bg-background border border-border rounded px-3 py-1"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
          >
            <option value="all">All Types</option>
            <option value="buy">Buy Only</option>
            <option value="sell">Sell Only</option>
          </select>
          <select
            className="text-sm bg-background border border-border rounded px-3 py-1"
            value={filterPair}
            onChange={(e) => setFilterPair(e.target.value)}
          >
            <option value="all">All Pairs</option>
            {uniquePairs.map(pair => (
              <option key={pair} value={pair}>{pair}</option>
            ))}
          </select>
          <select
            className="text-sm bg-background border border-border rounded px-3 py-1"
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e.target.value)}
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="all">All Time</option>
          </select>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-muted-foreground border-b border-border">
              <th className="text-left pb-3">Date</th>
              <th className="text-left pb-3">Pair</th>
              <th className="text-left pb-3">Type</th>
              <th className="text-left pb-3">Price</th>
              <th className="text-left pb-3">Amount</th>
              <th className="text-left pb-3">Total</th>
              <th className="text-left pb-3">Fee</th>
              <th className="text-left pb-3">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredTrades.map((trade) => (
              <tr 
                key={trade.id} 
                className="border-b border-border/50 hover:bg-muted/50 cursor-pointer"
              >
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs">{formatDate(trade.date)}</span>
                  </div>
                </td>
                <td className="py-3 font-medium">{trade.pair}</td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    {trade.type === 'buy' ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                    <span className={cn(
                      'font-medium capitalize',
                      trade.type === 'buy' ? 'text-green-500' : 'text-red-500'
                    )}>
                      {trade.type}
                    </span>
                    <Badge variant="outline" className="text-xs capitalize">
                      {trade.orderType}
                    </Badge>
                  </div>
                </td>
                <td className="py-3">${trade.price.toLocaleString()}</td>
                <td className="py-3">{trade.amount.toFixed(8)}</td>
                <td className="py-3 font-medium">${trade.total.toLocaleString()}</td>
                <td className="py-3 text-muted-foreground">
                  ${trade.fee.toFixed(4)}
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(trade.status)}
                    {getStatusBadge(trade.status)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredTrades.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <History className="w-12 h-12 mx-auto mb-3" />
          <p className="text-sm">No trades found</p>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span>Showing {filteredTrades.length} trades</span>
        <Button variant="ghost" size="sm">
          Load More
        </Button>
      </div>
    </Card>
  );
}