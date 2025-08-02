'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, TrendingDown, TrendingUp, Shield } from 'lucide-react';

interface RiskMetricsProps {
  className?: string;
}

export function RiskMetrics({ className }: RiskMetricsProps) {
  const metrics = [
    {
      name: 'Value at Risk (VaR)',
      value: '-R$ 2,450',
      percentage: 95,
      confidence: '95% confidence',
      icon: AlertTriangle,
      color: 'text-yellow-500',
    },
    {
      name: 'Beta',
      value: '1.24',
      percentage: 75,
      description: 'vs Market',
      icon: TrendingUp,
      color: 'text-blue-500',
    },
    {
      name: 'Volatilidade',
      value: '18.5%',
      percentage: 60,
      description: 'Anualizada',
      icon: TrendingDown,
      color: 'text-orange-500',
    },
    {
      name: 'Diversificação',
      value: '82%',
      percentage: 82,
      description: 'Score',
      icon: Shield,
      color: 'text-green-500',
    },
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Métricas de Risco</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className={`h-4 w-4 ${metric.color}`} />
                  <span className="text-sm font-medium">{metric.name}</span>
                </div>
                <span className="text-lg font-mono font-bold">{metric.value}</span>
              </div>
              <Progress value={metric.percentage} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {metric.confidence || metric.description}
              </p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}