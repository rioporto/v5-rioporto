'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { FinancialCard, FinancialCardHeader, FinancialCardTitle, FinancialCardContent } from '../FinancialCard';
import { FinancialButton } from '../FinancialButton';
import { QuickTradeForm } from '../FinancialForm';

export interface Order {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  orderType: 'market' | 'limit' | 'stop';
  quantity: number;
  price?: number;
  stopPrice?: number;
  status: 'pending' | 'filled' | 'cancelled' | 'partial';
  filled: number;
  remaining: number;
  timestamp: Date;
  total?: number;
}

export interface OrderWidgetProps {
  className?: string;
  symbol: string;
  currentPrice: number;
  orders?: Order[];
  onPlaceOrder?: (order: {
    type: 'buy' | 'sell';
    symbol: string;
    quantity: number;
    price?: number;
    orderType: 'market' | 'limit';
  }) => void;
  onCancelOrder?: (orderId: string) => void;
  loading?: boolean;
  variant?: 'trade' | 'orders' | 'combined';
}

export function OrderWidget({
  className,
  symbol,
  currentPrice,
  orders = [],
  onPlaceOrder,
  onCancelOrder,
  loading = false,
  variant = 'combined',
}: OrderWidgetProps) {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell' | 'orders'>('buy');
  const [selectedOrderType, setSelectedOrderType] = useState<'market' | 'limit'>('market');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(price);
  };

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'filled':
        return 'text-success';
      case 'cancelled':
        return 'text-error';
      case 'partial':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusLabel = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'PENDENTE';
      case 'filled':
        return 'EXECUTADA';
      case 'cancelled':
        return 'CANCELADA';
      case 'partial':
        return 'PARCIAL';
      default:
        // TypeScript exhaustive check
        const _exhaustiveCheck: never = status;
        return 'UNKNOWN';
    }
  };

  const renderTradeForm = (type: 'buy' | 'sell') => (
    <div className="space-y-4">
      {/* Current Price */}
      <div className="flex items-center justify-between p-2 bg-muted/20 rounded-sm">
        <span className="font-mono text-xs text-muted-foreground uppercase">
          Preço Atual {symbol}
        </span>
        <span className="font-mono text-sm font-semibold text-foreground">
          {formatPrice(currentPrice)}
        </span>
      </div>

      {onPlaceOrder && (
        <QuickTradeForm
          type={type}
          symbol={symbol}
          onSubmit={onPlaceOrder}
          loading={loading}
        />
      )}
    </div>
  );

  const renderOrdersList = () => (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-muted-foreground uppercase tracking-wide">
          Ordens Abertas ({orders.filter(o => o.status === 'pending' || o.status === 'partial').length})
        </span>
        
        {orders.length > 0 && (
          <FinancialButton
            variant="ghost"
            size="sm"
            className="text-xs"
            onClick={() => {
              orders
                .filter(o => o.status === 'pending' || o.status === 'partial')
                .forEach(o => onCancelOrder?.(o.id));
            }}
          >
            Cancelar Todas
          </FinancialButton>
        )}
      </div>

      {/* Orders List */}
      <div className="space-y-1 max-h-64 overflow-y-auto">
        {orders.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground font-mono text-xs">
            Nenhuma ordem ativa
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-2 bg-muted/10 rounded-sm hover:bg-muted/20 transition-colors"
            >
              <div className="flex-1 space-y-1">
                {/* Order Header */}
                <div className="flex items-center space-x-2">
                  <span
                    className={cn(
                      'font-mono text-xs font-semibold uppercase',
                      order.type === 'buy' ? 'text-success' : 'text-error'
                    )}
                  >
                    {order.type}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {order.orderType.toUpperCase()}
                  </span>
                  <span
                    className={cn(
                      'font-mono text-xs font-medium',
                      getStatusColor(order.status)
                    )}
                  >
                    {getStatusLabel(order.status)}
                  </span>
                </div>

                {/* Order Details */}
                <div className="flex items-center space-x-4 text-xs font-mono">
                  <span className="text-foreground">
                    {order.quantity.toFixed(8)} {symbol}
                  </span>
                  
                  {order.price && (
                    <span className="text-muted-foreground">
                      @ {formatPrice(order.price)}
                    </span>
                  )}
                  
                  <span className="text-muted-foreground">
                    {formatDateTime(order.timestamp)}
                  </span>
                </div>

                {/* Progress Bar for Partial Orders */}
                {order.status === 'partial' && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        {order.filled.toFixed(8)} / {order.quantity.toFixed(8)}
                      </span>
                      <span className="text-muted-foreground">
                        {((order.filled / order.quantity) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-1 bg-muted/20 rounded-sm overflow-hidden">
                      <div
                        className="h-full bg-warning transition-all duration-300"
                        style={{ width: `${(order.filled / order.quantity) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Cancel Button */}
              {(order.status === 'pending' || order.status === 'partial') && onCancelOrder && (
                <FinancialButton
                  variant="ghost"
                  size="sm"
                  className="ml-2 text-error hover:bg-error/10"
                  onClick={() => onCancelOrder(order.id)}
                >
                  ✕
                </FinancialButton>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderCombinedView = () => (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex border-b border-border">
        {['buy', 'sell', 'orders'].map((tab) => (
          <button
            key={tab}
            className={cn(
              'flex-1 py-2 px-3 font-mono text-xs font-medium uppercase transition-colors',
              'border-b-2 border-transparent hover:text-foreground',
              {
                'text-foreground border-primary': activeTab === tab,
                'text-muted-foreground': activeTab !== tab,
                'text-success': tab === 'buy' && activeTab === tab,
                'text-error': tab === 'sell' && activeTab === tab,
              }
            )}
            onClick={() => setActiveTab(tab as 'buy' | 'sell' | 'orders')}
          >
            {tab === 'buy' ? 'Comprar' : tab === 'sell' ? 'Vender' : 'Ordens'}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[200px]">
        {activeTab === 'buy' && renderTradeForm('buy')}
        {activeTab === 'sell' && renderTradeForm('sell')}
        {activeTab === 'orders' && renderOrdersList()}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (variant) {
      case 'trade':
        return (
          <div className="space-y-4">
            <div className="flex space-x-2">
              {['buy', 'sell'].map((type) => (
                <FinancialButton
                  key={type}
                  variant={activeTab === type ? (type as 'buy' | 'sell') : 'outline'}
                  size="sm"
                  className="flex-1"
                  onClick={() => setActiveTab(type as 'buy' | 'sell')}
                >
                  {type === 'buy' ? 'Comprar' : 'Vender'}
                </FinancialButton>
              ))}
            </div>
            {renderTradeForm(activeTab as 'buy' | 'sell')}
          </div>
        );
      case 'orders':
        return renderOrdersList();
      default:
        return renderCombinedView();
    }
  };

  return (
    <FinancialCard
      className={className}
      variant="bordered"
      loading={loading}
      header={
        <FinancialCardHeader>
          <FinancialCardTitle>
            {variant === 'orders' ? 'Ordens' : `Trading ${symbol}`}
          </FinancialCardTitle>
          
          {variant !== 'orders' && (
            <div className="flex items-center space-x-1 text-xs">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="font-mono text-muted-foreground">LIVE</span>
            </div>
          )}
        </FinancialCardHeader>
      }
    >
      <FinancialCardContent>
        {renderContent()}
      </FinancialCardContent>
    </FinancialCard>
  );
}