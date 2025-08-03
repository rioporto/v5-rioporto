'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { FinancialCard, FinancialCardHeader, FinancialCardTitle, FinancialCardContent } from '../FinancialCard';
import { FinancialButton } from '../FinancialButton';
import { PriceDisplay } from '../PriceDisplay';

export interface Balance {
  asset: string;
  available: number;
  locked: number;
  total: number;
  usdValue?: number;
  brlValue?: number;
  change24h?: number;
  changePercent24h?: number;
}

export interface BalanceWidgetProps {
  className?: string;
  balances: Balance[];
  totalBalance?: {
    usd: number;
    brl: number;
    change24h: number;
    changePercent24h: number;
  };
  showZeroBalances?: boolean;
  variant?: 'primary' | 'compact' | 'detailed';
  onDeposit?: (asset: string) => void;
  onWithdraw?: (asset: string) => void;
  onTrade?: (asset: string) => void;
  loading?: boolean;
}

export function BalanceWidget({
  className,
  balances,
  totalBalance,
  showZeroBalances = false,
  variant = 'default',
  onDeposit,
  onWithdraw,
  onTrade,
  loading = false,
}: BalanceWidgetProps) {
  const filteredBalances = useMemo(() => {
    const filtered = showZeroBalances 
      ? balances 
      : balances.filter(b => b.total > 0);
    
    // Sort by total value (BRL), then by asset name
    return filtered.sort((a, b) => {
      const aValue = a.brlValue || 0;
      const bValue = b.brlValue || 0;
      
      if (aValue !== bValue) {
        return bValue - aValue; // Descending by value
      }
      
      return a.asset.localeCompare(b.asset); // Ascending by name
    });
  }, [balances, showZeroBalances]);

  const formatAmount = (amount: number, asset: string) => {
    if (asset === 'BRL') {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
      }).format(amount);
    }
    
    // Crypto formatting
    if (amount < 0.01) {
      return amount.toFixed(8);
    }
    
    return amount.toFixed(asset === 'BTC' ? 8 : 4);
  };

  const renderCompactView = () => (
    <div className="space-y-2">
      {/* Total Balance */}
      {totalBalance && (
        <div className="flex items-center justify-between p-2 bg-muted/20 rounded-sm">
          <span className="font-mono text-xs text-muted-foreground uppercase">
            Saldo Total
          </span>
          <div className="text-right">
            <PriceDisplay
              price={totalBalance.brl}
              size="sm"
              currency="BRL"
              className="font-semibold"
            />
            <div className="flex items-center space-x-1">
              <span
                className={cn(
                  'font-mono text-xs',
                  totalBalance.changePercent24h >= 0 ? 'text-success' : 'text-error'
                )}
              >
                {totalBalance.changePercent24h >= 0 ? '+' : ''}{totalBalance.changePercent24h.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Top 3 Balances */}
      <div className="space-y-1">
        {filteredBalances.slice(0, 3).map((balance) => (
          <div
            key={balance.asset}
            className="flex items-center justify-between py-1 hover:bg-muted/10 rounded-sm transition-colors"
          >
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs font-semibold text-foreground">
                {balance.asset}
              </span>
              {balance.locked > 0 && (
                <div className="w-1 h-1 bg-warning rounded-full" title="Valor em ordem" />
              )}
            </div>
            
            <div className="text-right">
              <div className="font-mono text-xs text-foreground">
                {formatAmount(balance.total, balance.asset)}
              </div>
              {balance.brlValue && balance.brlValue > 0 && (
                <div className="font-mono text-[10px] text-muted-foreground">
                  {formatAmount(balance.brlValue, 'BRL')}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDetailedView = () => (
    <div className="space-y-4">
      {/* Total Balance Header */}
      {totalBalance && (
        <div className="p-3 bg-muted/20 rounded-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-sm text-muted-foreground uppercase tracking-wide">
              Patrimônio Total
            </span>
            <div className="flex items-center space-x-2">
              <div
                className={cn(
                  'w-2 h-2 rounded-full',
                  totalBalance.changePercent24h >= 0 ? 'bg-success' : 'bg-error'
                )}
              />
              <span
                className={cn(
                  'font-mono text-xs font-medium',
                  totalBalance.changePercent24h >= 0 ? 'text-success' : 'text-error'
                )}
              >
                24H
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <PriceDisplay
              price={totalBalance.brl}
              size="lg"
              currency="BRL"
              className="font-bold"
            />
            
            <div className="text-right">
              <PriceDisplay
                price={Math.abs(totalBalance.change24h)}
                size="sm"
                currency="BRL"
                className={totalBalance.changePercent24h >= 0 ? 'text-success' : 'text-error'}
                prefix={totalBalance.changePercent24h >= 0 ? '+' : '-'}
              />
              <div
                className={cn(
                  'font-mono text-sm font-medium',
                  totalBalance.changePercent24h >= 0 ? 'text-success' : 'text-error'
                )}
              >
                {totalBalance.changePercent24h >= 0 ? '+' : ''}{totalBalance.changePercent24h.toFixed(2)}%
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Balances List */}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {filteredBalances.map((balance) => (
          <div
            key={balance.asset}
            className="p-2 border border-border/50 rounded-sm hover:bg-muted/10 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="font-mono text-sm font-semibold text-foreground">
                  {balance.asset}
                </span>
                
                {balance.locked > 0 && (
                  <div className="flex items-center space-x-1">
                    <div className="w-1 h-1 bg-warning rounded-full" />
                    <span className="font-mono text-xs text-warning">
                      LOCKED
                    </span>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-1">
                {onTrade && balance.total > 0 && (
                  <FinancialButton
                    variant="ghost"
                    size="sm"
                    className="text-xs px-2 py-1 h-6"
                    onClick={() => onTrade(balance.asset)}
                  >
                    Trade
                  </FinancialButton>
                )}
                
                {onDeposit && (
                  <FinancialButton
                    variant="ghost"
                    size="sm"
                    className="text-xs px-2 py-1 h-6 text-success"
                    onClick={() => onDeposit(balance.asset)}
                  >
                    +
                  </FinancialButton>
                )}
                
                {onWithdraw && balance.available > 0 && (
                  <FinancialButton
                    variant="ghost"
                    size="sm"
                    className="text-xs px-2 py-1 h-6 text-error"
                    onClick={() => onWithdraw(balance.asset)}
                  >
                    -
                  </FinancialButton>
                )}
              </div>
            </div>
            
            <div className="space-y-1">
              {/* Available */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-muted-foreground">
                  Disponível
                </span>
                <span className="font-mono text-xs text-foreground">
                  {formatAmount(balance.available, balance.asset)}
                </span>
              </div>
              
              {/* Locked */}
              {balance.locked > 0 && (
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground">
                    Em Ordem
                  </span>
                  <span className="font-mono text-xs text-warning">
                    {formatAmount(balance.locked, balance.asset)}
                  </span>
                </div>
              )}
              
              {/* Total */}
              <div className="flex items-center justify-between border-t border-border/30 pt-1">
                <span className="font-mono text-xs font-medium text-foreground">
                  Total
                </span>
                <div className="text-right">
                  <div className="font-mono text-xs font-semibold text-foreground">
                    {formatAmount(balance.total, balance.asset)}
                  </div>
                  {balance.brlValue && balance.brlValue > 0 && (
                    <div className="font-mono text-[10px] text-muted-foreground">
                      ≈ {formatAmount(balance.brlValue, 'BRL')}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDefaultView = () => (
    <div className="space-y-3">
      {/* Total Balance */}
      {totalBalance && (
        <div className="flex items-center justify-between p-2 bg-muted/20 rounded-sm">
          <span className="font-mono text-sm text-muted-foreground uppercase tracking-wide">
            Saldo Total
          </span>
          <div className="text-right">
            <PriceDisplay
              price={totalBalance.brl}
              size="md"
              currency="BRL"
              className="font-semibold"
            />
            <div className="flex items-center space-x-2 justify-end">
              <span
                className={cn(
                  'font-mono text-xs',
                  totalBalance.changePercent24h >= 0 ? 'text-success' : 'text-error'
                )}
              >
                {totalBalance.changePercent24h >= 0 ? '+' : ''}{totalBalance.changePercent24h.toFixed(2)}% (24h)
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Balances List */}
      <div className="space-y-1 max-h-48 overflow-y-auto">
        {filteredBalances.map((balance) => (
          <div
            key={balance.asset}
            className="flex items-center justify-between py-2 px-2 hover:bg-muted/10 rounded-sm transition-colors"
          >
            <div className="flex items-center space-x-2">
              <span className="font-mono text-sm font-semibold text-foreground min-w-[3rem]">
                {balance.asset}
              </span>
              
              {balance.locked > 0 && (
                <div className="w-1 h-1 bg-warning rounded-full" title="Valor em ordem" />
              )}
            </div>
            
            <div className="text-right">
              <div className="font-mono text-sm font-medium text-foreground">
                {formatAmount(balance.available, balance.asset)}
              </div>
              
              {balance.locked > 0 && (
                <div className="font-mono text-xs text-warning">
                  +{formatAmount(balance.locked, balance.asset)} locked
                </div>
              )}
              
              {balance.brlValue && balance.brlValue > 0 && (
                <div className="font-mono text-xs text-muted-foreground">
                  ≈ {formatAmount(balance.brlValue, 'BRL')}
                </div>
              )}
            </div>
          </div>
        ))}
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
      loading={loading}
      header={
        <FinancialCardHeader>
          <FinancialCardTitle>
            Saldo da Conta
          </FinancialCardTitle>
          
          <div className="flex items-center space-x-2">
            {!showZeroBalances && (
              <span className="font-mono text-xs text-muted-foreground">
                {filteredBalances.length} ativos
              </span>
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