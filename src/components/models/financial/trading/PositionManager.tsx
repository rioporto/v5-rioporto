'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { FinancialCard, FinancialCardHeader, FinancialCardTitle, FinancialCardContent } from '../FinancialCard';
import { FinancialButton } from '../FinancialButton';
import { FinancialTable, FinancialTableColumn } from '../FinancialTable';
import { PriceDisplay } from '../PriceDisplay';

export interface Position {
  id: string;
  symbol: string;
  side: 'long' | 'short';
  size: number;
  entryPrice: number;
  currentPrice: number;
  leverage: number;
  margin: number;
  unrealizedPnL: number;
  unrealizedPnLPercent: number;
  realizedPnL: number;
  fees: number;
  fundingFees: number;
  liquidationPrice?: number;
  markPrice: number;
  timestamp: Date;
  status: 'open' | 'closing' | 'closed';
}

export interface PositionManagerProps {
  className?: string;
  positions: Position[];
  totalPnL?: {
    unrealized: number;
    realized: number;
    total: number;
    totalPercent: number;
  };
  onClosePosition?: (positionId: string) => void;
  onCloseAllPositions?: () => void;
  onModifyPosition?: (positionId: string, action: 'add_margin' | 'reduce_margin' | 'set_stop_loss' | 'set_take_profit') => void;
  loading?: boolean;
  variant?: 'primary' | 'compact' | 'detailed';
}

export function PositionManager({
  className,
  positions,
  totalPnL,
  onClosePosition,
  onCloseAllPositions,
  onModifyPosition,
  loading = false,
  variant = 'primary',
}: PositionManagerProps) {
  const positionMetrics = useMemo(() => {
    const openPositions = positions.filter(p => p.status === 'open');
    const longPositions = openPositions.filter(p => p.side === 'long');
    const shortPositions = openPositions.filter(p => p.side === 'short');
    
    const totalMargin = openPositions.reduce((sum, p) => sum + p.margin, 0);
    const totalUnrealizedPnL = openPositions.reduce((sum, p) => sum + p.unrealizedPnL, 0);
    const totalRealizedPnL = positions.reduce((sum, p) => sum + p.realizedPnL, 0);
    
    return {
      openCount: openPositions.length,
      longCount: longPositions.length,
      shortCount: shortPositions.length,
      totalMargin,
      totalUnrealizedPnL,
      totalRealizedPnL,
      totalPnL: totalUnrealizedPnL + totalRealizedPnL,
    };
  }, [positions]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(price);
  };

  const formatQuantity = (quantity: number) => {
    return quantity.toFixed(8);
  };

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getPositionHealthColor = (position: Position) => {
    if (!position.liquidationPrice) return 'text-foreground';
    
    const distanceToLiquidation = Math.abs(position.currentPrice - position.liquidationPrice) / position.currentPrice;
    
    if (distanceToLiquidation < 0.05) return 'text-error'; // Less than 5%
    if (distanceToLiquidation < 0.15) return 'text-warning'; // Less than 15%
    return 'text-success'; // Safe
  };

  const positionColumns: FinancialTableColumn<Position>[] = [
    {
      key: 'symbol',
      title: 'Par',
      align: 'left',
      render: (_, position) => (
        <div className="flex items-center space-x-2">
          <span className="font-mono text-sm font-semibold">
            {position.symbol}
          </span>
          <span
            className={cn(
              'px-1 py-0.5 rounded-sm font-mono text-xs font-medium',
              position.side === 'long' 
                ? 'bg-success/10 text-success' 
                : 'bg-error/10 text-error'
            )}
          >
            {position.side.toUpperCase()}
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            {position.leverage}x
          </span>
        </div>
      ),
    },
    {
      key: 'size',
      title: 'Tamanho',
      align: 'right',
      render: (_, position) => (
        <div className="text-right">
          <div className="font-mono text-sm">
            {formatQuantity(position.size)}
          </div>
          <div className="font-mono text-xs text-muted-foreground">
            {formatPrice(position.size * position.currentPrice)}
          </div>
        </div>
      ),
    },
    {
      key: 'entryPrice',
      title: 'Entrada',
      align: 'right',
      render: (value) => (
        <span className="font-mono text-sm">
          {formatPrice(value)}
        </span>
      ),
    },
    {
      key: 'markPrice',
      title: 'Marca',
      align: 'right',
      render: (_, position) => (
        <div className="text-right">
          <div className="font-mono text-sm">
            {formatPrice(position.markPrice)}
          </div>
          <div className={cn(
            'font-mono text-xs',
            getPositionHealthColor(position)
          )}>
            {position.liquidationPrice ? formatPrice(position.liquidationPrice) : '-'}
          </div>
        </div>
      ),
    },
    {
      key: 'unrealizedPnL',
      title: 'PnL',
      align: 'right',
      render: (_, position) => (
        <div className="text-right">
          <PriceDisplay
            price={Math.abs(position.unrealizedPnL)}
            size="sm"
            currency="BRL"
            className={cn(
              'font-semibold',
              position.unrealizedPnL >= 0 ? 'text-success' : 'text-error'
            )}
            prefix={position.unrealizedPnL >= 0 ? '+' : '-'}
          />
          <div
            className={cn(
              'font-mono text-xs font-medium',
              position.unrealizedPnL >= 0 ? 'text-success' : 'text-error'
            )}
          >
            {position.unrealizedPnL >= 0 ? '+' : ''}{position.unrealizedPnLPercent.toFixed(2)}%
          </div>
        </div>
      ),
    },
    {
      key: 'actions',
      title: 'Ações',
      align: 'center',
      render: (_, position) => (
        <div className="flex items-center space-x-1">
          {onModifyPosition && (
            <FinancialButton
              variant="ghost"
              size="sm"
              className="text-xs px-2"
              onClick={() => onModifyPosition(position.id, 'add_margin')}
            >
              Margem
            </FinancialButton>
          )}
          
          {onClosePosition && (
            <FinancialButton
              variant="ghost"
              size="sm"
              className="text-xs px-2 text-error hover:bg-error/10"
              onClick={() => onClosePosition(position.id)}
            >
              Fechar
            </FinancialButton>
          )}
        </div>
      ),
    },
  ];

  const renderSummaryCards = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
      <div className="p-2 bg-muted/20 rounded-sm">
        <div className="font-mono text-xs text-muted-foreground uppercase">
          Posições Abertas
        </div>
        <div className="font-mono text-lg font-semibold text-foreground">
          {positionMetrics.openCount}
        </div>
      </div>
      
      <div className="p-2 bg-muted/20 rounded-sm">
        <div className="font-mono text-xs text-muted-foreground uppercase">
          Margem Total
        </div>
        <div className="font-mono text-sm font-semibold text-foreground">
          {formatPrice(positionMetrics.totalMargin)}
        </div>
      </div>
      
      <div className="p-2 bg-muted/20 rounded-sm">
        <div className="font-mono text-xs text-muted-foreground uppercase">
          PnL Não Realizado
        </div>
        <PriceDisplay
          price={Math.abs(positionMetrics.totalUnrealizedPnL)}
          size="sm"
          currency="BRL"
          className={cn(
            'font-semibold',
            positionMetrics.totalUnrealizedPnL >= 0 ? 'text-success' : 'text-error'
          )}
          prefix={positionMetrics.totalUnrealizedPnL >= 0 ? '+' : '-'}
        />
      </div>
      
      <div className="p-2 bg-muted/20 rounded-sm">
        <div className="font-mono text-xs text-muted-foreground uppercase">
          PnL Total
        </div>
        <PriceDisplay
          price={Math.abs(positionMetrics.totalPnL)}
          size="sm"
          currency="BRL"
          className={cn(
            'font-semibold',
            positionMetrics.totalPnL >= 0 ? 'text-success' : 'text-error'
          )}
          prefix={positionMetrics.totalPnL >= 0 ? '+' : '-'}
        />
      </div>
    </div>
  );

  const renderCompactView = () => (
    <div className="space-y-3">
      {/* Quick Stats */}
      <div className="flex items-center justify-between p-2 bg-muted/20 rounded-sm">
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className="font-mono text-xs text-muted-foreground">LONG</div>
            <div className="font-mono text-sm font-semibold text-success">
              {positionMetrics.longCount}
            </div>
          </div>
          
          <div className="text-center">
            <div className="font-mono text-xs text-muted-foreground">SHORT</div>
            <div className="font-mono text-sm font-semibold text-error">
              {positionMetrics.shortCount}
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="font-mono text-xs text-muted-foreground">PnL TOTAL</div>
          <PriceDisplay
            price={Math.abs(positionMetrics.totalPnL)}
            size="sm"
            currency="BRL"
            className={cn(
              'font-semibold',
              positionMetrics.totalPnL >= 0 ? 'text-success' : 'text-error'
            )}
            prefix={positionMetrics.totalPnL >= 0 ? '+' : '-'}
          />
        </div>
      </div>

      {/* Positions List */}
      <div className="space-y-1">
        {positions.filter(p => p.status === 'open').map((position) => (
          <div
            key={position.id}
            className="flex items-center justify-between p-2 bg-muted/10 rounded-sm hover:bg-muted/20 transition-colors"
          >
            <div className="flex items-center space-x-2">
              <span className="font-mono text-sm font-semibold">
                {position.symbol}
              </span>
              <span
                className={cn(
                  'px-1 py-0.5 rounded-sm font-mono text-xs',
                  position.side === 'long' 
                    ? 'bg-success/10 text-success' 
                    : 'bg-error/10 text-error'
                )}
              >
                {position.side.toUpperCase()}
              </span>
            </div>
            
            <div className="text-right">
              <PriceDisplay
                price={Math.abs(position.unrealizedPnL)}
                size="sm"
                currency="BRL"
                className={cn(
                  'font-medium',
                  position.unrealizedPnL >= 0 ? 'text-success' : 'text-error'
                )}
                prefix={position.unrealizedPnL >= 0 ? '+' : '-'}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    if (variant === 'compact') {
      return renderCompactView();
    }

    return (
      <div className="space-y-4">
        {variant === 'detailed' && renderSummaryCards()}
        
        <FinancialTable
          columns={positionColumns}
          data={positions.filter(p => p.status === 'open')}
          loading={loading}
          dense={true}
          emptyMessage="Nenhuma posição aberta"
          onRowClick={(position) => {
            // Could open position details modal
          }}
        />
      </div>
    );
  };

  return (
    <FinancialCard
      className={className}
      variant="bordered"
      loading={loading}
      header={
        <FinancialCardHeader>
          <FinancialCardTitle>
            Posições ({positionMetrics.openCount})
          </FinancialCardTitle>
          
          <div className="flex items-center space-x-2">
            {onCloseAllPositions && positionMetrics.openCount > 0 && (
              <FinancialButton
                variant="ghost"
                size="sm"
                className="text-error hover:bg-error/10"
                onClick={onCloseAllPositions}
              >
                Fechar Todas
              </FinancialButton>
            )}
            
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