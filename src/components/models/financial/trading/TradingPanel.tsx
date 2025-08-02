'use client';

import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { FinancialCard, FinancialCardHeader, FinancialCardTitle, FinancialCardContent } from '../FinancialCard';
import { FinancialButton } from '../FinancialButton';
import { FinancialInput, FinancialSelect } from '../FinancialForm';

export interface TradingPanelProps {
  className?: string;
  symbol: string;
  currentPrice: number;
  balances: {
    base: number; // e.g., BTC balance
    quote: number; // e.g., BRL balance
  };
  orderBook?: {
    bestBid: number;
    bestAsk: number;
  };
  onPlaceOrder: (order: {
    side: 'buy' | 'sell';
    type: 'market' | 'limit' | 'stop';
    quantity: number;
    price?: number;
    stopPrice?: number;
  }) => void;
  minQuantity?: number;
  maxQuantity?: number;
  tickSize?: number; // Minimum price increment
  stepSize?: number; // Minimum quantity increment
  loading?: boolean;
}

export function TradingPanel({
  className,
  symbol,
  currentPrice,
  balances,
  orderBook,
  onPlaceOrder,
  minQuantity = 0.00000001,
  maxQuantity,
  tickSize = 0.01,
  stepSize = 0.00000001,
  loading = false,
}: TradingPanelProps) {
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [orderType, setOrderType] = useState<'market' | 'limit' | 'stop'>('market');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [stopPrice, setStopPrice] = useState('');
  const [percentage, setPercentage] = useState(0);

  // Calculate order details
  const orderDetails = useMemo(() => {
    const qty = parseFloat(quantity) || 0;
    const limitPrice = parseFloat(price) || currentPrice;
    const effectivePrice = orderType === 'market' 
      ? (side === 'buy' ? (orderBook?.bestAsk || currentPrice) : (orderBook?.bestBid || currentPrice))
      : limitPrice;
      
    const total = qty * effectivePrice;
    const maxQty = side === 'buy' 
      ? balances.quote / effectivePrice 
      : balances.base;
    
    const fee = total * 0.001; // 0.1% fee
    const totalWithFee = side === 'buy' ? total + fee : total - fee;
    
    return {
      quantity: qty,
      price: effectivePrice,
      total,
      fee,
      totalWithFee,
      maxQuantity: Math.min(maxQty, maxQuantity || Infinity),
      canPlace: qty >= minQuantity && qty <= maxQty && total > 0,
    };
  }, [quantity, price, side, orderType, currentPrice, orderBook, balances, minQuantity, maxQuantity]);

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(value);
  };

  const formatQuantity = (value: number) => {
    return value.toFixed(8);
  };

  const handlePercentageChange = (percent: number) => {
    setPercentage(percent);
    const maxQty = orderDetails.maxQuantity;
    const newQuantity = (maxQty * percent) / 100;
    setQuantity(formatQuantity(newQuantity));
  };

  const handlePriceQuickFill = (type: 'best' | 'market' | 'spread') => {
    if (!orderBook) return;
    
    let newPrice: number;
    switch (type) {
      case 'best':
        newPrice = side === 'buy' ? orderBook.bestBid : orderBook.bestAsk;
        break;
      case 'market':
        newPrice = side === 'buy' ? orderBook.bestAsk : orderBook.bestBid;
        break;
      case 'spread':
        newPrice = (orderBook.bestBid + orderBook.bestAsk) / 2;
        break;
      default:
        newPrice = currentPrice;
    }
    
    setPrice(newPrice.toFixed(2));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!orderDetails.canPlace) return;
    
    onPlaceOrder({
      side,
      type: orderType,
      quantity: orderDetails.quantity,
      price: orderType === 'limit' ? orderDetails.price : undefined,
      stopPrice: orderType === 'stop' ? parseFloat(stopPrice) : undefined,
    });
    
    // Reset form
    setQuantity('');
    setPrice('');
    setStopPrice('');
    setPercentage(0);
  };

  return (
    <FinancialCard
      className={className}
      variant="bordered"
      loading={loading}
      header={
        <FinancialCardHeader>
          <FinancialCardTitle>
            Trading {symbol}
          </FinancialCardTitle>
          
          <div className="flex items-center space-x-1 text-xs">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="font-mono text-muted-foreground">LIVE</span>
          </div>
        </FinancialCardHeader>
      }
    >
      <FinancialCardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Buy/Sell Toggle */}
          <div className="flex space-x-1 p-1 bg-muted/20 rounded-sm">
            {(['buy', 'sell'] as const).map((s) => (
              <button
                key={s}
                type="button"
                className={cn(
                  'flex-1 py-2 px-3 font-mono text-sm font-medium uppercase',
                  'rounded-sm transition-all duration-150',
                  side === s
                    ? s === 'buy'
                      ? 'bg-success text-white'
                      : 'bg-error text-white'
                    : 'text-muted-foreground hover:text-foreground'
                )}
                onClick={() => setSide(s)}
              >
                {s === 'buy' ? 'Comprar' : 'Vender'}
              </button>
            ))}
          </div>

          {/* Order Type */}
          <FinancialSelect
            label="Tipo de Ordem"
            value={orderType}
            onChange={(e) => setOrderType(e.target.value as 'market' | 'limit' | 'stop')}
            options={[
              { value: 'market', label: 'Mercado' },
              { value: 'limit', label: 'Limitada' },
              { value: 'stop', label: 'Stop' },
            ]}
          />

          {/* Price Input (for limit and stop orders) */}
          {orderType !== 'market' && (
            <div className="space-y-2">
              <FinancialInput
                label="Preço"
                type="number"
                step={tickSize}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                prefix="R$"
                variant="price"
                placeholder="0.00"
              />
              
              {/* Quick Price Buttons */}
              {orderBook && orderType === 'limit' && (
                <div className="flex space-x-1">
                  <FinancialButton
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={() => handlePriceQuickFill('best')}
                  >
                    Melhor
                  </FinancialButton>
                  <FinancialButton
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={() => handlePriceQuickFill('spread')}
                  >
                    Spread
                  </FinancialButton>
                  <FinancialButton
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={() => handlePriceQuickFill('market')}
                  >
                    Mercado
                  </FinancialButton>
                </div>
              )}
            </div>
          )}

          {/* Stop Price (for stop orders) */}
          {orderType === 'stop' && (
            <FinancialInput
              label="Preço de Stop"
              type="number"
              step={tickSize}
              value={stopPrice}
              onChange={(e) => setStopPrice(e.target.value)}
              prefix="R$"
              variant="price"
              placeholder="0.00"
            />
          )}

          {/* Quantity Input */}
          <div className="space-y-2">
            <FinancialInput
              label="Quantidade"
              type="number"
              step={stepSize}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              suffix={symbol.split('/')[0]}
              variant="quantity"
              placeholder="0.00000000"
            />
            
            {/* Percentage Buttons */}
            <div className="grid grid-cols-4 gap-1">
              {[25, 50, 75, 100].map((percent) => (
                <FinancialButton
                  key={percent}
                  type="button"
                  variant={percentage === percent ? 'primary' : 'ghost'}
                  size="sm"
                  className="text-xs"
                  onClick={() => handlePercentageChange(percent)}
                >
                  {percent}%
                </FinancialButton>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-2 p-2 bg-muted/20 rounded-sm">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-muted-foreground">Preço Estimado:</span>
              <span className="text-foreground font-medium">
                {formatPrice(orderDetails.price)}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-muted-foreground">Total:</span>
              <span className="text-foreground font-medium">
                {formatPrice(orderDetails.total)}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-muted-foreground">Taxa (~0.1%):</span>
              <span className="text-warning font-medium">
                {formatPrice(orderDetails.fee)}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-xs font-mono border-t border-border/50 pt-2">
              <span className="text-muted-foreground font-medium">
                {side === 'buy' ? 'Total + Taxa:' : 'Total - Taxa:'}
              </span>
              <span className="text-foreground font-semibold">
                {formatPrice(orderDetails.totalWithFee)}
              </span>
            </div>
          </div>

          {/* Balance Info */}
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="space-y-1">
              <span className="text-muted-foreground uppercase">
                {symbol.split('/')[0]} Disponível
              </span>
              <div className="text-foreground font-medium">
                {formatQuantity(balances.base)}
              </div>
            </div>
            
            <div className="space-y-1">
              <span className="text-muted-foreground uppercase">
                BRL Disponível
              </span>
              <div className="text-foreground font-medium">
                {formatPrice(balances.quote)}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <FinancialButton
            type="submit"
            variant={side}
            fullWidth
            loading={loading}
            disabled={!orderDetails.canPlace}
            className="h-10 font-semibold"
          >
            {side === 'buy' ? 'Comprar' : 'Vender'} {symbol}
          </FinancialButton>

          {/* Validation Messages */}
          {!orderDetails.canPlace && orderDetails.quantity > 0 && (
            <div className="text-xs text-error font-mono text-center">
              {orderDetails.quantity < minQuantity && 
                `Quantidade mínima: ${formatQuantity(minQuantity)}`}
              {orderDetails.quantity > orderDetails.maxQuantity && 
                `Saldo insuficiente. Máximo: ${formatQuantity(orderDetails.maxQuantity)}`}
            </div>
          )}
        </form>
      </FinancialCardContent>
    </FinancialCard>
  );
}