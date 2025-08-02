'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Tabs } from '@/components/ui/Tabs';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { EmptyState } from '@/components/shared/EmptyState';
import { TrendingUp, TrendingDown, DollarSign, PieChart, BarChart3, Calendar } from 'lucide-react';
import { portfolioData } from '@/lib/mock-data';

export default function PortfolioPage() {
  const [timeframe, setTimeframe] = useState('24h');
  const portfolio = portfolioData;

  const timeframes = [
    { value: '1h', label: '1h' },
    { value: '24h', label: '24h' },
    { value: '7d', label: '7d' },
    { value: '30d', label: '30d' },
    { value: '1y', label: '1a' },
  ];

  const stats = [
    {
      title: 'Valor Total',
      value: `R$ ${portfolio.summary.currentValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      change: portfolio.summary.profitLossPercentage,
      icon: DollarSign,
    },
    {
      title: 'P&L Total',
      value: `R$ ${portfolio.summary.profitLoss.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      change: portfolio.summary.profitLossPercentage,
      icon: portfolio.summary.profitLoss >= 0 ? TrendingUp : TrendingDown,
    },
    {
      title: 'Investido',
      value: `R$ ${portfolio.summary.totalInvested.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      icon: PieChart,
    },
    {
      title: 'Melhor Ativo',
      value: portfolio.summary.bestAsset || 'N/A',
      icon: BarChart3,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Portfolio</h1>
          <p className="text-muted-foreground">
            Acompanhe seus investimentos e performance
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          {timeframes.map((tf) => (
            <Button
              key={tf.value}
              variant={timeframe === tf.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeframe(tf.value)}
            >
              {tf.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    {stat.change !== undefined && (
                      <Badge
                        variant={stat.change >= 0 ? 'success' : 'destructive'}
                        className="text-xs"
                      >
                        {stat.change >= 0 ? '+' : ''}{stat.change.toFixed(2)}%
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Portfolio Content */}
      <Tabs defaultValue="assets" className="space-y-6">
        <div className="flex items-center justify-between">
          <Tabs.List>
            <Tabs.Trigger value="assets">Ativos</Tabs.Trigger>
            <Tabs.Trigger value="history">Histórico</Tabs.Trigger>
            <Tabs.Trigger value="performance">Performance</Tabs.Trigger>
          </Tabs.List>
        </div>

        {/* Assets Tab */}
        <Tabs.Content value="assets" className="space-y-6">
          {portfolio.assets.length > 0 ? (
            <Card>
              <div className="p-6 border-b border-border">
                <h3 className="text-lg font-semibold text-foreground">
                  Meus Ativos ({portfolio.assets.length})
                </h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase">
                        Ativo
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase">
                        Quantidade
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase">
                        Preço Médio
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase">
                        Preço Atual
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase">
                        Valor
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase">
                        P&L
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase">
                        Alocação
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {portfolio.assets.map((asset) => (
                      <tr key={asset.id} className="hover:bg-muted/50">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                              <span className="text-sm font-bold text-primary">
                                {asset.symbol.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{asset.symbol}</p>
                              <p className="text-sm text-muted-foreground">{asset.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground">
                          {asset.amount.toLocaleString('pt-BR', { maximumFractionDigits: 8 })}
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground">
                          R$ {asset.avgPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground">
                          R$ {asset.currentPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-foreground">
                          R$ {asset.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <span className={`text-sm font-medium ${
                              asset.profitLoss >= 0 ? 'text-success' : 'text-destructive'
                            }`}>
                              {asset.profitLoss >= 0 ? '+' : ''}
                              R$ {asset.profitLoss.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </span>
                            <Badge
                              variant={asset.profitLossPercentage >= 0 ? 'success' : 'destructive'}
                              className="text-xs"
                            >
                              {asset.profitLossPercentage >= 0 ? '+' : ''}
                              {asset.profitLossPercentage.toFixed(2)}%
                            </Badge>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <Progress value={asset.allocation} className="w-16" />
                            <span className="text-sm text-muted-foreground">
                              {asset.allocation.toFixed(1)}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          ) : (
            <EmptyState
              icon={PieChart}
              title="Nenhum ativo encontrado"
              description="Você ainda não possui ativos em seu portfolio. Comece investindo agora!"
              action={
                <Button>
                  Comprar Ativos
                </Button>
              }
            />
          )}
        </Tabs.Content>

        {/* History Tab */}
        <Tabs.Content value="history" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <h3 className="text-lg font-semibold text-foreground">
                Histórico de Performance
              </h3>
            </div>
            
            {portfolio.history.length > 0 ? (
              <div className="space-y-4">
                {portfolio.history.map((entry, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">
                        {new Date(entry.date).toLocaleDateString('pt-BR')}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Investido: R$ {entry.invested.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground">
                        R$ {entry.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                      <p className={`text-sm ${entry.profitLoss >= 0 ? 'text-success' : 'text-destructive'}`}>
                        {entry.profitLoss >= 0 ? '+' : ''}
                        R$ {entry.profitLoss.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Calendar}
                title="Sem histórico disponível"
                description="O histórico será gerado conforme suas transações."
              />
            )}
          </Card>
        </Tabs.Content>

        {/* Performance Tab */}
        <Tabs.Content value="performance" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Análise de Performance
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Métricas Gerais</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">ROI Total:</span>
                    <span className={`text-sm font-medium ${
                      portfolio.summary.profitLossPercentage >= 0 ? 'text-success' : 'text-destructive'
                    }`}>
                      {portfolio.summary.profitLossPercentage >= 0 ? '+' : ''}
                      {portfolio.summary.profitLossPercentage.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Melhor Ativo:</span>
                    <span className="text-sm font-medium text-foreground">
                      {portfolio.summary.bestAsset || 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Pior Ativo:</span>
                    <span className="text-sm font-medium text-foreground">
                      {portfolio.summary.worstAsset || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Distribuição</h4>
                <div className="space-y-3">
                  {portfolio.assets.slice(0, 3).map((asset) => (
                    <div key={asset.id} className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{asset.symbol}:</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={asset.allocation} className="w-16" />
                        <span className="text-sm font-medium text-foreground">
                          {asset.allocation.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </Tabs.Content>
      </Tabs>
    </div>
  );
}