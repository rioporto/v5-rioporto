'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { FinancialCard, FinancialCardHeader, FinancialCardTitle, FinancialCardContent } from '../FinancialCard';

export interface RiskMetrics {
  accountBalance: number;
  totalMargin: number;
  unrealizedPnL: number;
  marginRatio: number; // Used margin / Account balance
  riskRatio: number; // At-risk amount / Account balance
  maxDrawdown: number;
  dailyPnL: number;
  weeklyPnL: number;
  monthlyPnL: number;
  sharpeRatio?: number;
  winRate?: number; // Percentage of winning trades
  avgWin?: number;
  avgLoss?: number;
  consecutiveLosses?: number;
  largestPosition?: number;
}

export interface RiskIndicatorProps {
  className?: string;
  metrics: RiskMetrics;
  riskLimits?: {
    maxMarginRatio: number; // e.g., 0.8 (80%)
    maxRiskRatio: number; // e.g., 0.1 (10%)
    maxDrawdown: number; // e.g., 0.15 (15%)
    maxConsecutiveLosses: number; // e.g., 5
  };
  variant?: 'default' | 'compact' | 'detailed';
  showAlerts?: boolean;
}

export function RiskIndicator({
  className,
  metrics,
  riskLimits = {
    maxMarginRatio: 0.8,
    maxRiskRatio: 0.1,
    maxDrawdown: 0.15,
    maxConsecutiveLosses: 5,
  },
  variant = 'default',
  showAlerts = true,
}: RiskIndicatorProps) {
  const riskAnalysis = useMemo(() => {
    const alerts: { level: 'low' | 'medium' | 'high' | 'critical'; message: string }[] = [];
    
    // Margin ratio check
    let marginRiskLevel: 'safe' | 'warning' | 'danger' | 'critical' = 'safe';
    if (metrics.marginRatio > riskLimits.maxMarginRatio * 0.9) {
      marginRiskLevel = 'critical';
      alerts.push({ level: 'critical', message: 'Margem crítica - risco de liquidação' });
    } else if (metrics.marginRatio > riskLimits.maxMarginRatio * 0.7) {
      marginRiskLevel = 'danger';
      alerts.push({ level: 'high', message: 'Alta utilização de margem' });
    } else if (metrics.marginRatio > riskLimits.maxMarginRatio * 0.5) {
      marginRiskLevel = 'warning';
      alerts.push({ level: 'medium', message: 'Margem moderada' });
    }
    
    // Risk ratio check
    let riskLevel: 'safe' | 'warning' | 'danger' | 'critical' = 'safe';
    if (metrics.riskRatio > riskLimits.maxRiskRatio) {
      riskLevel = 'critical';
      alerts.push({ level: 'critical', message: 'Exposição ao risco muito alta' });
    } else if (metrics.riskRatio > riskLimits.maxRiskRatio * 0.8) {
      riskLevel = 'danger';
      alerts.push({ level: 'high', message: 'Alta exposição ao risco' });
    } else if (metrics.riskRatio > riskLimits.maxRiskRatio * 0.6) {
      riskLevel = 'warning';
      alerts.push({ level: 'medium', message: 'Exposição moderada ao risco' });
    }
    
    // Drawdown check
    if (Math.abs(metrics.maxDrawdown) > riskLimits.maxDrawdown) {
      alerts.push({ level: 'high', message: 'Drawdown máximo excedido' });
    }
    
    // Consecutive losses check
    if (metrics.consecutiveLosses && metrics.consecutiveLosses >= riskLimits.maxConsecutiveLosses) {
      alerts.push({ level: 'high', message: 'Muitas perdas consecutivas' });
    }
    
    // Overall risk score (0-100, 100 being highest risk)
    const riskScore = Math.min(100, (
      (metrics.marginRatio * 40) + 
      (metrics.riskRatio * 50) + 
      (Math.abs(metrics.maxDrawdown) * 10)
    ) * 100);
    
    return {
      marginRiskLevel,
      riskLevel,
      riskScore,
      alerts: alerts.slice(0, 3), // Limit to 3 most important alerts
    };
  }, [metrics, riskLimits]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(price);
  };

  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  const getRiskColor = (level: 'safe' | 'warning' | 'danger' | 'critical') => {
    switch (level) {
      case 'safe':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'danger':
        return 'text-error';
      case 'critical':
        return 'text-error animate-pulse';
      default:
        return 'text-muted-foreground';
    }
  };

  const getRiskBgColor = (level: 'safe' | 'warning' | 'danger' | 'critical') => {
    switch (level) {
      case 'safe':
        return 'bg-success/10';
      case 'warning':
        return 'bg-warning/10';
      case 'danger':
        return 'bg-error/10';
      case 'critical':
        return 'bg-error/20';
      default:
        return 'bg-muted/10';
    }
  };

  const renderRiskGauge = (value: number, max: number, level: 'safe' | 'warning' | 'danger' | 'critical') => {
    const percentage = Math.min((value / max) * 100, 100);
    
    return (
      <div className="space-y-1">
        <div className="h-2 bg-muted/20 rounded-sm overflow-hidden">
          <div
            className={cn(
              'h-full transition-all duration-500 rounded-sm',
              {
                'bg-success': level === 'safe',
                'bg-warning': level === 'warning',
                'bg-error': level === 'danger' || level === 'critical',
              }
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="flex justify-between text-xs font-mono text-muted-foreground">
          <span>0%</span>
          <span>{formatPercentage(max)}</span>
        </div>
      </div>
    );
  };

  const renderCompactView = () => (
    <div className="space-y-3">
      {/* Overall Risk Score */}
      <div className="flex items-center justify-between p-2 bg-muted/20 rounded-sm">
        <span className="font-mono text-sm text-muted-foreground uppercase">
          Score de Risco
        </span>
        <div className="flex items-center space-x-2">
          <span
            className={cn(
              'font-mono text-lg font-bold tabular-nums',
              riskAnalysis.riskScore < 30 
                ? 'text-success' 
                : riskAnalysis.riskScore < 60 
                  ? 'text-warning' 
                  : 'text-error'
            )}
          >
            {riskAnalysis.riskScore.toFixed(0)}
          </span>
          <span className="text-xs text-muted-foreground">/100</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <span className="font-mono text-xs text-muted-foreground uppercase">
            Margem
          </span>
          <div className={cn('font-mono text-sm font-semibold', getRiskColor(riskAnalysis.marginRiskLevel))}>
            {formatPercentage(metrics.marginRatio)}
          </div>
        </div>
        
        <div className="space-y-1">
          <span className="font-mono text-xs text-muted-foreground uppercase">
            Risco
          </span>
          <div className={cn('font-mono text-sm font-semibold', getRiskColor(riskAnalysis.riskLevel))}>
            {formatPercentage(metrics.riskRatio)}
          </div>
        </div>
      </div>
    </div>
  );

  const renderDetailedView = () => (
    <div className="space-y-4">
      {/* Risk Score Header */}
      <div className="p-3 bg-muted/20 rounded-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-sm text-muted-foreground uppercase tracking-wide">
            Score de Risco Geral
          </span>
          <span
            className={cn(
              'px-2 py-1 rounded-sm font-mono text-xs font-medium',
              riskAnalysis.riskScore < 30 
                ? 'bg-success/10 text-success' 
                : riskAnalysis.riskScore < 60 
                  ? 'bg-warning/10 text-warning' 
                  : 'bg-error/10 text-error'
            )}
          >
            {riskAnalysis.riskScore < 30 ? 'BAIXO' : riskAnalysis.riskScore < 60 ? 'MODERADO' : 'ALTO'}
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          <span
            className={cn(
              'font-mono text-2xl font-bold tabular-nums',
              riskAnalysis.riskScore < 30 
                ? 'text-success' 
                : riskAnalysis.riskScore < 60 
                  ? 'text-warning' 
                  : 'text-error'
            )}
          >
            {riskAnalysis.riskScore.toFixed(0)}
          </span>
          <span className="text-muted-foreground">/100</span>
        </div>
      </div>

      {/* Risk Metrics */}
      <div className="space-y-3">
        {/* Margin Ratio */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-sm text-muted-foreground uppercase">
              Utilização de Margem
            </span>
            <span className={cn('font-mono text-sm font-semibold', getRiskColor(riskAnalysis.marginRiskLevel))}>
              {formatPercentage(metrics.marginRatio)}
            </span>
          </div>
          {renderRiskGauge(metrics.marginRatio, riskLimits.maxMarginRatio, riskAnalysis.marginRiskLevel)}
        </div>

        {/* Risk Ratio */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-sm text-muted-foreground uppercase">
              Exposição ao Risco
            </span>
            <span className={cn('font-mono text-sm font-semibold', getRiskColor(riskAnalysis.riskLevel))}>
              {formatPercentage(metrics.riskRatio)}
            </span>
          </div>
          {renderRiskGauge(metrics.riskRatio, riskLimits.maxRiskRatio, riskAnalysis.riskLevel)}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <span className="font-mono text-xs text-muted-foreground uppercase">
            PnL Diário
          </span>
          <div
            className={cn(
              'font-mono text-sm font-semibold',
              metrics.dailyPnL >= 0 ? 'text-success' : 'text-error'
            )}
          >
            {formatPrice(metrics.dailyPnL)}
          </div>
        </div>
        
        <div className="space-y-2">
          <span className="font-mono text-xs text-muted-foreground uppercase">
            Max Drawdown
          </span>
          <div className="font-mono text-sm font-semibold text-error">
            {formatPercentage(Math.abs(metrics.maxDrawdown))}
          </div>
        </div>
        
        {metrics.winRate && (
          <div className="space-y-2">
            <span className="font-mono text-xs text-muted-foreground uppercase">
              Taxa de Acerto
            </span>
            <div className="font-mono text-sm font-semibold text-foreground">
              {formatPercentage(metrics.winRate)}
            </div>
          </div>
        )}
        
        {metrics.sharpeRatio && (
          <div className="space-y-2">
            <span className="font-mono text-xs text-muted-foreground uppercase">
              Sharpe Ratio
            </span>
            <div className="font-mono text-sm font-semibold text-foreground">
              {metrics.sharpeRatio.toFixed(2)}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderDefaultView = () => (
    <div className="space-y-3">
      {/* Key Risk Metrics */}
      <div className="grid grid-cols-3 gap-2">
        <div className="space-y-1">
          <span className="font-mono text-xs text-muted-foreground uppercase">
            Margem
          </span>
          <div className={cn('font-mono text-sm font-semibold', getRiskColor(riskAnalysis.marginRiskLevel))}>
            {formatPercentage(metrics.marginRatio)}
          </div>
          <div className="h-1 bg-muted/20 rounded-sm overflow-hidden">
            <div
              className={cn(
                'h-full transition-all duration-500',
                getRiskColor(riskAnalysis.marginRiskLevel).replace('text-', 'bg-')
              )}
              style={{ width: `${Math.min((metrics.marginRatio / riskLimits.maxMarginRatio) * 100, 100)}%` }}
            />
          </div>
        </div>
        
        <div className="space-y-1">
          <span className="font-mono text-xs text-muted-foreground uppercase">
            Risco
          </span>
          <div className={cn('font-mono text-sm font-semibold', getRiskColor(riskAnalysis.riskLevel))}>
            {formatPercentage(metrics.riskRatio)}
          </div>
          <div className="h-1 bg-muted/20 rounded-sm overflow-hidden">
            <div
              className={cn(
                'h-full transition-all duration-500',
                getRiskColor(riskAnalysis.riskLevel).replace('text-', 'bg-')
              )}
              style={{ width: `${Math.min((metrics.riskRatio / riskLimits.maxRiskRatio) * 100, 100)}%` }}
            />
          </div>
        </div>
        
        <div className="space-y-1">
          <span className="font-mono text-xs text-muted-foreground uppercase">
            Score
          </span>
          <div
            className={cn(
              'font-mono text-sm font-semibold',
              riskAnalysis.riskScore < 30 
                ? 'text-success' 
                : riskAnalysis.riskScore < 60 
                  ? 'text-warning' 
                  : 'text-error'
            )}
          >
            {riskAnalysis.riskScore.toFixed(0)}/100
          </div>
        </div>
      </div>

      {/* Account Summary */}
      <div className="flex items-center justify-between p-2 bg-muted/20 rounded-sm">
        <div className="space-y-1">
          <span className="font-mono text-xs text-muted-foreground uppercase">
            Saldo da Conta
          </span>
          <div className="font-mono text-sm font-semibold text-foreground">
            {formatPrice(metrics.accountBalance)}
          </div>
        </div>
        
        <div className="space-y-1 text-right">
          <span className="font-mono text-xs text-muted-foreground uppercase">
            PnL Não Realizado
          </span>
          <div
            className={cn(
              'font-mono text-sm font-semibold',
              metrics.unrealizedPnL >= 0 ? 'text-success' : 'text-error'
            )}
          >
            {formatPrice(metrics.unrealizedPnL)}
          </div>
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
      header={
        <FinancialCardHeader>
          <FinancialCardTitle>
            Gestão de Risco
          </FinancialCardTitle>
          
          <div className="flex items-center space-x-2">
            {showAlerts && riskAnalysis.alerts.length > 0 && (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-error animate-pulse" />
                <span className="font-mono text-xs text-error">
                  {riskAnalysis.alerts.length} ALERTA{riskAnalysis.alerts.length > 1 ? 'S' : ''}
                </span>
              </div>
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
        
        {/* Risk Alerts */}
        {showAlerts && riskAnalysis.alerts.length > 0 && (
          <div className="mt-3 space-y-1">
            {riskAnalysis.alerts.map((alert, index) => (
              <div
                key={index}
                className={cn(
                  'p-2 rounded-sm border-l-2 text-xs font-mono',
                  {
                    'bg-warning/10 border-warning text-warning': alert.level === 'medium',
                    'bg-error/10 border-error text-error': alert.level === 'high' || alert.level === 'critical',
                  }
                )}
              >
                {alert.message}
              </div>
            ))}
          </div>
        )}
      </FinancialCardContent>
    </FinancialCard>
  );
}