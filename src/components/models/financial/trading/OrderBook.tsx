'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { FinancialCard, FinancialCardHeader, FinancialCardTitle, FinancialCardContent } from '../FinancialCard';

export interface OrderBookEntry {
  price: number;
  quantity: number;
  total: number;
  count?: number; // Number of orders at this price level
}

export interface OrderBookData {
  symbol: string;
  bids: OrderBookEntry[]; // Buy orders (green)
  asks: OrderBookEntry[]; // Sell orders (red)
  lastPrice?: number;
  spread?: number;
  spreadPercent?: number;
}

export interface OrderBookProps {
  className?: string;
  data: OrderBookData;
  precision?: {
    price: number;
    quantity: number;
  };
  maxLevels?: number;
  showTotal?: boolean;
  showCount?: boolean;
  showSpread?: boolean;
  onPriceClick?: (price: number, type: 'bid' | 'ask') => void;
  loading?: boolean;
  variant?: 'primary' | 'compact' | 'detailed';
}

export function OrderBook({
  className,
  data,
  precision = { price: 2, quantity: 8 },
  maxLevels = 10,
  showTotal = true,
  showCount = false,
  showSpread = true,
  onPriceClick,
  loading = false,
  variant = 'primary',
}: OrderBookProps) {
  const processedData = useMemo(() => {
    // Limit levels and calculate cumulative totals
    const bids = data.bids.slice(0, maxLevels);
    const asks = data.asks.slice(0, maxLevels);
    
    // Calculate max quantities for width scaling
    const maxBidQuantity = Math.max(...bids.map(b => b.quantity), 0);
    const maxAskQuantity = Math.max(...asks.map(a => a.quantity), 0);
    const maxQuantity = Math.max(maxBidQuantity, maxAskQuantity);
    
    // Calculate cumulative totals
    let cumulativeBidTotal = 0;
    let cumulativeAskTotal = 0;
    
    const processedBids = bids.map(bid => {
      cumulativeBidTotal += bid.total;
      return {
        ...bid,
        cumulativeTotal: cumulativeBidTotal,
        widthPercent: maxQuantity > 0 ? (bid.quantity / maxQuantity) * 100 : 0,
      };
    });
    
    const processedAsks = asks.reverse().map(ask => {
      cumulativeAskTotal += ask.total;
      return {
        ...ask,
        cumulativeTotal: cumulativeAskTotal,
        widthPercent: maxQuantity > 0 ? (ask.quantity / maxQuantity) * 100 : 0,
      };
    });
    
    return {
      bids: processedBids,
      asks: processedAsks.reverse(), // Keep asks in descending price order
      maxQuantity,
    };
  }, [data, maxLevels]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: precision.price,
      maximumFractionDigits: precision.price,
    }).format(price);
  };

  const formatQuantity = (quantity: number) => {
    return quantity.toFixed(precision.quantity);
  };

  const formatTotal = (total: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      notation: total > 1000000 ? 'compact' : 'standard',
      compactDisplay: 'short',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(total);
  };

  const renderOrderBookEntry = (
    entry: OrderBookEntry & { widthPercent: number; cumulativeTotal: number },
    type: 'bid' | 'ask',
    index: number
  ) => {
    const isClickable = !!onPriceClick;
    
    return (
      <div
        key={`${type}-${entry.price}-${index}`}
        className={cn(
          'relative flex items-center justify-between py-0.5 px-1 font-mono text-xs',
          'hover:bg-muted/20 transition-colors',
          isClickable && 'cursor-pointer',
          variant === 'compact' && 'py-0.5 text-[10px]'
        )}
        onClick={() => onPriceClick?.(entry.price, type)}
      >
        {/* Background bar for quantity visualization */}
        <div
          className={cn(
            'absolute inset-y-0 right-0 opacity-20 transition-all duration-300',
            type === 'bid' ? 'bg-success' : 'bg-error'
          )}
          style={{ width: `${entry.widthPercent}%` }}
        />
        
        {/* Price */}
        <span
          className={cn(
            'font-medium tabular-nums z-10',
            type === 'bid' ? 'text-success' : 'text-error',
            variant === 'compact' && 'text-[10px]'
          )}
        >
          {formatPrice(entry.price)}
        </span>
        
        {/* Quantity */}
        <span className="text-foreground tabular-nums z-10">
          {formatQuantity(entry.quantity)}
        </span>
        
        {/* Total (optional) */}
        {showTotal && (
          <span className="text-muted-foreground tabular-nums z-10">
            {formatTotal(entry.total)}
          </span>
        )}
        
        {/* Count (optional) */}
        {showCount && entry.count && (
          <span className="text-muted-foreground z-10">
            {entry.count}
          </span>
        )}
      </div>
    );
  };

  const renderSpread = () => {
    if (!showSpread || !data.spread) return null;
    
    const bestBid = data.bids[0]?.price || 0;
    const bestAsk = data.asks[0]?.price || 0;
    
    return (
      <div className="flex items-center justify-between py-2 px-2 bg-muted/10 border-y border-border/50">
        <div className="flex items-center space-x-2">
          <span className="font-mono text-xs text-muted-foreground">SPREAD</span>
          <span className="font-mono text-xs font-medium text-foreground">
            {formatPrice(data.spread)}
          </span>
          {data.spreadPercent && (
            <span className="font-mono text-xs text-muted-foreground">
              ({data.spreadPercent.toFixed(3)}%)
            </span>
          )}
        </div>
        
        {data.lastPrice && (
          <div className="flex items-center space-x-2">
            <span className="font-mono text-xs text-muted-foreground">ÚLTIMO</span>
            <span className="font-mono text-xs font-medium text-foreground">
              {formatPrice(data.lastPrice)}
            </span>
          </div>
        )}
      </div>
    );
  };

  const renderCompactView = () => (
    <div className="space-y-1">
      {/* Header */}
      <div className="flex items-center justify-between py-1 px-1 bg-muted/20 font-mono text-[10px] font-medium text-muted-foreground uppercase">
        <span>Preço</span>
        <span>Qtd</span>
        {showTotal && <span>Total</span>}
      </div>
      
      {/* Asks (Sell orders) - Red */}
      <div className="space-y-0">
        {processedData.asks.slice(0, 5).map((ask, index) => 
          renderOrderBookEntry(ask, 'ask', index)
        )}
      </div>
      
      {/* Spread */}
      {renderSpread()}
      
      {/* Bids (Buy orders) - Green */}
      <div className="space-y-0">
        {processedData.bids.slice(0, 5).map((bid, index) => 
          renderOrderBookEntry(bid, 'bid', index)
        )}
      </div>
    </div>
  );

  const renderDefaultView = () => (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex items-center justify-between py-1 px-2 bg-muted/20 font-mono text-xs font-medium text-muted-foreground uppercase">
        <span>Preço ({data.symbol})</span>
        <span>Quantidade</span>
        {showTotal && <span>Total (BRL)</span>}
        {showCount && <span>Ordens</span>}
      </div>
      
      {/* Asks (Sell orders) - Red */}
      <div className="space-y-0.5">
        <div className="font-mono text-xs font-medium text-error px-2 py-1">
          VENDAS ({processedData.asks.length})
        </div>
        {processedData.asks.map((ask, index) => 
          renderOrderBookEntry(ask, 'ask', index)
        )}
      </div>
      
      {/* Spread */}
      {renderSpread()}
      
      {/* Bids (Buy orders) - Green */}
      <div className="space-y-0.5">
        <div className="font-mono text-xs font-medium text-success px-2 py-1">
          COMPRAS ({processedData.bids.length})
        </div>
        {processedData.bids.map((bid, index) => 
          renderOrderBookEntry(bid, 'bid', index)
        )}
      </div>
    </div>
  );

  const renderDetailedView = () => (
    <div className="space-y-3">
      {/* Market Info */}
      <div className="grid grid-cols-2 gap-4 p-2 bg-muted/20 rounded-sm">
        <div className="space-y-1">
          <span className="font-mono text-xs text-muted-foreground uppercase">
            Melhor Compra
          </span>
          <div className="font-mono text-sm font-semibold text-success">
            {data.bids[0] ? formatPrice(data.bids[0].price) : '-'}
          </div>
        </div>
        
        <div className="space-y-1">
          <span className="font-mono text-xs text-muted-foreground uppercase">
            Melhor Venda
          </span>
          <div className="font-mono text-sm font-semibold text-error">
            {data.asks[0] ? formatPrice(data.asks[0].price) : '-'}
          </div>
        </div>
      </div>
      
      {/* Order Book Table */}
      <div className="space-y-2">
        {/* Header */}
        <div className="grid grid-cols-4 gap-2 py-1 px-2 bg-muted/20 font-mono text-xs font-medium text-muted-foreground uppercase">
          <span>Preço</span>
          <span className="text-right">Qtd</span>
          <span className="text-right">Total</span>
          <span className="text-right">Acum</span>
        </div>
        
        {/* Asks */}
        <div className="space-y-0.5">
          {processedData.asks.map((ask, index) => (
            <div
              key={`ask-${ask.price}-${index}`}
              className={cn(
                'relative grid grid-cols-4 gap-2 py-1 px-2 font-mono text-xs',
                'hover:bg-muted/20 transition-colors',
                onPriceClick && 'cursor-pointer'
              )}
              onClick={() => onPriceClick?.(ask.price, 'ask')}
            >
              <div
                className="absolute inset-y-0 right-0 bg-error/20"
                style={{ width: `${ask.widthPercent}%` }}
              />
              
              <span className="text-error font-medium tabular-nums z-10">
                {formatPrice(ask.price)}
              </span>
              <span className="text-right text-foreground tabular-nums z-10">
                {formatQuantity(ask.quantity)}
              </span>
              <span className="text-right text-muted-foreground tabular-nums z-10">
                {formatTotal(ask.total)}
              </span>
              <span className="text-right text-muted-foreground tabular-nums z-10">
                {formatTotal(ask.cumulativeTotal)}
              </span>
            </div>
          ))}
        </div>
        
        {/* Spread */}
        {renderSpread()}
        
        {/* Bids */}
        <div className="space-y-0.5">
          {processedData.bids.map((bid, index) => (
            <div
              key={`bid-${bid.price}-${index}`}
              className={cn(
                'relative grid grid-cols-4 gap-2 py-1 px-2 font-mono text-xs',
                'hover:bg-muted/20 transition-colors',
                onPriceClick && 'cursor-pointer'
              )}
              onClick={() => onPriceClick?.(bid.price, 'bid')}
            >
              <div
                className="absolute inset-y-0 right-0 bg-success/20"
                style={{ width: `${bid.widthPercent}%` }}
              />
              
              <span className="text-success font-medium tabular-nums z-10">
                {formatPrice(bid.price)}
              </span>
              <span className="text-right text-foreground tabular-nums z-10">
                {formatQuantity(bid.quantity)}
              </span>
              <span className="text-right text-muted-foreground tabular-nums z-10">
                {formatTotal(bid.total)}
              </span>
              <span className="text-right text-muted-foreground tabular-nums z-10">
                {formatTotal(bid.cumulativeTotal)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (variant) {
      case 'compact':
        return renderCompactView();
      case 'detailed':
        return renderDetailedView();
      default:
        return renderDefaultView();
    }
  };

  return (
    <FinancialCard
      className={className}
      variant="bordered"
      padding={variant === 'compact' ? 'sm' : 'md'}
      loading={loading}
      header={
        <FinancialCardHeader>
          <FinancialCardTitle>
            Order Book {data.symbol}
          </FinancialCardTitle>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 text-xs">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="font-mono text-muted-foreground">LIVE</span>
            </div>
          </div>
        </FinancialCardHeader>
      }
    >
      <FinancialCardContent>
        {renderContent()}
      </FinancialCardContent>
    </FinancialCard>
  );
}