import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { 
  History,
  Download,
  Filter,
  Search,
  Calendar,
  TrendingUp,
  TrendingDown,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  FileText,
  Share2,
  Copy,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

interface Trade {
  id: string;
  timestamp: Date;
  pair: string;
  type: 'buy' | 'sell';
  orderType: 'market' | 'limit' | 'stop' | 'stop-limit';
  price: number;
  amount: number;
  total: number;
  fee: number;
  status: 'completed' | 'pending' | 'cancelled' | 'failed';
  txHash?: string;
  notes?: string;
}

interface TradeHistoryProps {
  className?: string;
  trades?: Trade[];
  onTradeClick?: (trade: Trade) => void;
  onExport?: () => void;
}

const generateMockTrades = (): Trade[] => {
  const trades: Trade[] = [];
  const pairs = ['BTC/BRL', 'ETH/BRL', 'USDT/BRL', 'SOL/BRL', 'MATIC/BRL'];
  const orderTypes: Trade['orderType'][] = ['market', 'limit', 'stop', 'stop-limit'];
  const statuses: Trade['status'][] = ['completed', 'completed', 'completed', 'pending', 'cancelled'];
  
  for (let i = 0; i < 50; i++) {
    const pair = pairs[Math.floor(Math.random() * pairs.length)];
    const type: Trade['type'] = Math.random() > 0.5 ? 'buy' : 'sell';
    const orderType = orderTypes[Math.floor(Math.random() * orderTypes.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    const basePrice = pair.includes('BTC') ? 250000 : 
                     pair.includes('ETH') ? 15000 : 
                     pair.includes('SOL') ? 500 : 
                     pair.includes('MATIC') ? 4 : 5;
    
    const price = basePrice * (1 + (Math.random() - 0.5) * 0.1);
    const amount = Math.random() * 2;
    const total = price * amount;
    const fee = total * 0.001;
    
    trades.push({
      id: `trade-${i}`,
      timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      pair,
      type,
      orderType,
      price,
      amount,
      total,
      fee,
      status,
      txHash: status === 'completed' ? `0x${Math.random().toString(16).substr(2, 64)}` : undefined,
      notes: Math.random() > 0.7 ? 'Stop loss triggered' : undefined
    });
  }
  
  return trades.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

export function TradeHistory({ 
  className,
  trades = generateMockTrades(),
  onTradeClick,
  onExport
}: TradeHistoryProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterPair, setFilterPair] = React.useState<string>('all');
  const [filterType, setFilterType] = React.useState<string>('all');
  const [filterStatus, setFilterStatus] = React.useState<string>('all');
  const [dateRange, setDateRange] = React.useState<string>('30d');
  const [selectedTrade, setSelectedTrade] = React.useState<Trade | null>(null);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const uniquePairs = Array.from(new Set(trades.map(t => t.pair))).sort();

  const filteredTrades = trades.filter(trade => {
    if (searchQuery && !trade.pair.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !trade.id.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (filterPair !== 'all' && trade.pair !== filterPair) return false;
    if (filterType !== 'all' && trade.type !== filterType) return false;
    if (filterStatus !== 'all' && trade.status !== filterStatus) return false;
    
    // Date range filter
    const now = new Date();
    const tradeAge = now.getTime() - trade.timestamp.getTime();
    const dayInMs = 24 * 60 * 60 * 1000;
    
    switch (dateRange) {
      case '24h':
        if (tradeAge > dayInMs) return false;
        break;
      case '7d':
        if (tradeAge > 7 * dayInMs) return false;
        break;
      case '30d':
        if (tradeAge > 30 * dayInMs) return false;
        break;
    }
    
    return true;
  });

  const stats = {
    totalTrades: filteredTrades.length,
    completedTrades: filteredTrades.filter(t => t.status === 'completed').length,
    totalVolume: filteredTrades.reduce((sum, t) => sum + (t.status === 'completed' ? t.total : 0), 0),
    totalFees: filteredTrades.reduce((sum, t) => sum + (t.status === 'completed' ? t.fee : 0), 0),
    profitLoss: filteredTrades.reduce((sum, t) => {
      if (t.status !== 'completed') return sum;
      return sum + (t.type === 'sell' ? t.total : -t.total);
    }, 0)
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getStatusIcon = (status: Trade['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-gray-500" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <History className="w-5 h-5" />
          Trade History
        </h3>
        <Button variant="outline" onClick={onExport}>
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Trades</p>
          <p className="text-2xl font-bold">{stats.totalTrades}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {stats.completedTrades} completed
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Volume</p>
          <p className="text-2xl font-bold">
            R$ {stats.totalVolume.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Fees</p>
          <p className="text-2xl font-bold text-orange-500">
            R$ {stats.totalFees.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Net P&L</p>
          <p className={cn(
            'text-2xl font-bold',
            stats.profitLoss >= 0 ? 'text-green-500' : 'text-red-500'
          )}>
            {stats.profitLoss >= 0 ? '+' : '-'}R$ {Math.abs(stats.profitLoss).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Win Rate</p>
          <p className="text-2xl font-bold text-blue-500">
            {stats.completedTrades > 0 
              ? Math.round((filteredTrades.filter(t => t.type === 'sell' && t.status === 'completed').length / stats.completedTrades) * 100)
              : 0}%
          </p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by pair or ID..."
              className="pl-10"
            />
          </div>
          <select
            className="px-3 py-2 text-sm bg-background border border-border rounded-lg"
            value={filterPair}
            onChange={(e) => setFilterPair(e.target.value)}
          >
            <option value="all">All Pairs</option>
            {uniquePairs.map(pair => (
              <option key={pair} value={pair}>{pair}</option>
            ))}
          </select>
          <select
            className="px-3 py-2 text-sm bg-background border border-border rounded-lg"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
          <select
            className="px-3 py-2 text-sm bg-background border border-border rounded-lg"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
            <option value="failed">Failed</option>
          </select>
          <select
            className="px-3 py-2 text-sm bg-background border border-border rounded-lg"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="all">All time</option>
          </select>
          <Button variant="outline">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      {/* Trades Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-muted-foreground border-b border-border">
                <th className="text-left p-4">Date</th>
                <th className="text-left p-4">Pair</th>
                <th className="text-left p-4">Type</th>
                <th className="text-left p-4">Price</th>
                <th className="text-left p-4">Amount</th>
                <th className="text-left p-4">Total</th>
                <th className="text-left p-4">Fee</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredTrades.slice(0, 20).map((trade) => (
                <tr
                  key={trade.id}
                  className="border-b border-border/50 hover:bg-muted/50 cursor-pointer"
                  onClick={() => {
                    setSelectedTrade(trade);
                    onTradeClick?.(trade);
                  }}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <div>
                        <p className="text-xs">
                          {new Intl.DateTimeFormat('pt-BR', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          }).format(trade.timestamp)}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline">{trade.pair}</Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {trade.type === 'buy' ? (
                        <ArrowUpRight className="w-4 h-4 text-green-500" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-500" />
                      )}
                      <span className={cn(
                        'font-medium capitalize',
                        trade.type === 'buy' ? 'text-green-500' : 'text-red-500'
                      )}>
                        {trade.type}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 font-mono">
                    R$ {trade.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="p-4 font-mono">
                    {trade.amount.toFixed(8)}
                  </td>
                  <td className="p-4 font-mono font-medium">
                    R$ {trade.total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="p-4 font-mono text-orange-500">
                    R$ {trade.fee.toFixed(2)}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(trade.status)}
                      <span className="capitalize text-xs">{trade.status}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-border">
          <span className="text-sm text-muted-foreground">
            Showing 1-20 of {filteredTrades.length} trades
          </span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </Card>

      {/* Trade Details Modal */}
      {selectedTrade && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold">Trade Details</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedTrade(null)}
            >
              ×
            </Button>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Trade ID</p>
                <div className="flex items-center gap-2">
                  <p className="font-mono">{selectedTrade.id}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(selectedTrade.id, 'id')}
                  >
                    {copiedId === 'id' ? (
                      <CheckCircle className="w-3 h-3 text-green-500" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </Button>
                </div>
              </div>
              <div>
                <p className="text-muted-foreground">Order Type</p>
                <p className="capitalize">{selectedTrade.orderType}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Executed At</p>
                <p>{selectedTrade.timestamp.toLocaleString('pt-BR')}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Status</p>
                <div className="flex items-center gap-2">
                  {getStatusIcon(selectedTrade.status)}
                  <span className="capitalize">{selectedTrade.status}</span>
                </div>
              </div>
            </div>

            {selectedTrade.txHash && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">Transaction Hash</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-mono truncate">{selectedTrade.txHash}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(selectedTrade.txHash!, 'tx')}
                  >
                    {copiedId === 'tx' ? (
                      <CheckCircle className="w-3 h-3 text-green-500" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </Button>
                </div>
              </div>
            )}

            {selectedTrade.notes && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">Notes</p>
                <p className="text-sm p-3 bg-muted/50 rounded-lg">{selectedTrade.notes}</p>
              </div>
            )}

            <div className="flex items-center gap-2 pt-4">
              <Button variant="outline" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                View Receipt
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}