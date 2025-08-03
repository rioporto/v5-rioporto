'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { FinancialCard, FinancialCardHeader, FinancialCardTitle, FinancialCardContent } from '../FinancialCard';
import { PriceDisplay } from '../PriceDisplay';

export interface ProfitLossData {
  totalValue: number;
  invested: number;
  profit: number;
  profitPercent: number;
  dayChange: number;
  dayChangePercent: number;
  positions?: {
    symbol: string;
    quantity: number;
    avgPrice: number;
    currentPrice: number;
    profit: number;
    profitPercent: number;
  }[];
}

export interface ProfitLossCardProps {
  className?: string;
  data: ProfitLossData;
  showPositions?: boolean;
  showDayChange?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'compact' | 'detailed';
}

export function ProfitLossCard({
  className,
  data,
  showPositions = false,
  showDayChange = true,
  loading = false,
  variant = 'default',
}: ProfitLossCardProps) {
  const metrics = useMemo(() => {
    const isProfit = data.profit >= 0;
    const isDayProfit = data.dayChange >= 0;
    
    return {
      isProfit,
      isDayProfit,
      totalReturn: ((data.totalValue - data.invested) / data.invested) * 100,
    };
  }, [data]);

  const renderCompactView = () => (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <span className="font-mono text-xs text-muted-foreground uppercase">P&L Total</span>
        <PriceDisplay
          price={data.totalValue}
          size="sm"
          currency="BRL"
        />
      </div>
      
      <div className="flex flex-col items-end">
        <span className="font-mono text-xs text-muted-foreground uppercase">Lucro</span>
        <div className="flex items-center space-x-2">
          <PriceDisplay
            price={Math.abs(data.profit)}
            size="sm"
            currency="BRL"
            className={metrics.isProfit ? 'text-success' : 'text-error'}
            prefix={metrics.isProfit ? '+' : '-'}
          />
          <span
            className={cn(
              'font-mono text-xs font-medium',
              metrics.isProfit ? 'text-success' : 'text-error'
            )}
          >
            ({metrics.isProfit ? '+' : ''}{data.profitPercent.toFixed(2)}%)
          </span>
        </div>
      </div>
    </div>
  );

  const renderDetailedView = () => (
    <div className="space-y-4">
      {/* Header Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="space-y-1">
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-wide">
              Valor Total
            </span>
            <PriceDisplay
              price={data.totalValue}
              size="lg"
              currency="BRL"
              className="font-bold"
            />
          </div>
          
          <div className="space-y-1">
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-wide">
              Investido
            </span>
            <PriceDisplay
              price={data.invested}
              size="sm"
              currency="BRL"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="space-y-1">
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-wide">
              P&L Total
            </span>
            <div className="flex items-center space-x-2">
              <PriceDisplay
                price={Math.abs(data.profit)}
                size="md"
                currency="BRL"
                className={cn(
                  'font-bold',
                  metrics.isProfit ? 'text-success' : 'text-error'
                )}
                prefix={metrics.isProfit ? '+' : '-'}
              />
            </div>
            <span
              className={cn(
                'font-mono text-sm font-medium',
                metrics.isProfit ? 'text-success' : 'text-error'
              )}
            >
              {metrics.isProfit ? '+' : ''}{data.profitPercent.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      {/* Day Change */}
      {showDayChange && (
        <div className="border-t border-border pt-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-wide">
              Variação do Dia
            </span>
            <div className="flex items-center space-x-2">
              <PriceDisplay
                price={Math.abs(data.dayChange)}
                size="sm"
                currency="BRL"
                className={metrics.isDayProfit ? 'text-success' : 'text-error'}
                prefix={metrics.isDayProfit ? '+' : '-'}
              />
              <span
                className={cn(
                  'font-mono text-xs font-medium',
                  metrics.isDayProfit ? 'text-success' : 'text-error'
                )}
              >
                ({metrics.isDayProfit ? '+' : ''}{data.dayChangePercent.toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Positions */}
      {showPositions && data.positions && data.positions.length > 0 && (
        <div className="border-t border-border pt-3">
          <div className="space-y-2">
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-wide">
              Posições ({data.positions.length})
            </span>
            
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {data.positions.map((position) => (
                <div
                  key={position.symbol}
                  className="flex items-center justify-between py-1 px-2 bg-muted/20 rounded-sm"
                >
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-semibold">
                      {position.symbol}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {position.quantity.toFixed(8)}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <PriceDisplay
                      price={Math.abs(position.profit)}
                      size="sm"
                      currency="BRL"
                      className={cn(
                        'text-xs',
                        position.profit >= 0 ? 'text-success' : 'text-error'
                      )}
                      prefix={position.profit >= 0 ? '+' : '-'}
                    />
                    <span
                      className={cn(
                        'font-mono text-[10px] font-medium',
                        position.profit >= 0 ? 'text-success' : 'text-error'
                      )}
                    >
                      {position.profit >= 0 ? '+' : ''}{position.profitPercent.toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderDefaultView = () => (
    <div className="space-y-3">
      {/* Main Stats */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-wide">
            Valor Total
          </span>
          <PriceDisplay
            price={data.totalValue}
            size="md"
            currency="BRL"
            className="font-semibold"
          />
        </div>
        
        <div className="text-right space-y-1">
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-wide">
            P&L Total
          </span>
          <div className="flex items-center space-x-2">
            <PriceDisplay
              price={Math.abs(data.profit)}
              size="md"
              currency="BRL"
              className={cn(
                'font-semibold',
                metrics.isProfit ? 'text-success' : 'text-error'
              )}
              prefix={metrics.isProfit ? '+' : '-'}
            />
            <span
              className={cn(
                'font-mono text-sm font-medium',
                metrics.isProfit ? 'text-success' : 'text-error'
              )}
            >
              ({metrics.isProfit ? '+' : ''}{data.profitPercent.toFixed(2)}%)
            </span>
          </div>
        </div>
      </div>

      {/* Day Change */}
      {showDayChange && (
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-wide">
            Hoje
          </span>
          <div className="flex items-center space-x-2">
            <PriceDisplay
              price={Math.abs(data.dayChange)}
              size="sm"
              currency="BRL"
              className={metrics.isDayProfit ? 'text-success' : 'text-error'}
              prefix={metrics.isDayProfit ? '+' : '-'}
            />
            <span
              className={cn(
                'font-mono text-xs font-medium',
                metrics.isDayProfit ? 'text-success' : 'text-error'
              )}
            >
              ({metrics.isDayProfit ? '+' : ''}{data.dayChangePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
      )}
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
        variant !== 'compact' && (
          <FinancialCardHeader>
            <FinancialCardTitle>
              Profit & Loss
            </FinancialCardTitle>
            <div
              className={cn(
                'flex items-center space-x-1 text-xs',
                metrics.isProfit ? 'text-success' : 'text-error'
              )}
            >
              <div
                className={cn(
                  'w-2 h-2 rounded-full',
                  metrics.isProfit ? 'bg-success' : 'bg-error'
                )}
              />
              <span className="font-mono font-medium">
                {metrics.isProfit ? 'LUCRO' : 'PREJUÍZO'}
              </span>
            </div>
          </FinancialCardHeader>
        )
      }
    >
      <FinancialCardContent>
        {renderContent()}
      </FinancialCardContent>
    </FinancialCard>
  );
}