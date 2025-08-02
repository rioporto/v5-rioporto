'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ArrowUpRight, ArrowDownRight, Target, Activity } from 'lucide-react';

interface TradingStatsProps {
  className?: string;
}

export function TradingStats({ className }: TradingStatsProps) {
  const stats = [
    {
      label: 'Total de Trades',
      value: '342',
      change: '+12%',
      trend: 'up',
      icon: Activity,
    },
    {
      label: 'Taxa de Acerto',
      value: '68.4%',
      change: '+3.2%',
      trend: 'up',
      icon: Target,
    },
    {
      label: 'Profit Factor',
      value: '2.34',
      change: '+0.14',
      trend: 'up',
      icon: ArrowUpRight,
    },
    {
      label: 'Max Drawdown',
      value: '-12.8%',
      change: '-2.1%',
      trend: 'down',
      icon: ArrowDownRight,
    },
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Estatísticas de Trading</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="space-y-2 p-4 bg-secondary/30 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                  <Icon className={`h-4 w-4 ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
                </div>
                <p className="text-2xl font-bold font-mono">{stat.value}</p>
                <p className={`text-xs ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change} vs mês anterior
                </p>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm">Trades Vencedores</span>
            <span className="font-mono">234 (68.4%)</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Trades Perdedores</span>
            <span className="font-mono">108 (31.6%)</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Média Ganho/Perda</span>
            <span className="font-mono text-green-500">+R$ 342.50</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}