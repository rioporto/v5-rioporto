'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertCircle } from 'lucide-react';

interface DrawdownChartProps {
  className?: string;
}

export function DrawdownChart({ className }: DrawdownChartProps) {
  const data = [
    { date: '01/01', drawdown: 0 },
    { date: '05/01', drawdown: -2.5 },
    { date: '10/01', drawdown: -1.8 },
    { date: '15/01', drawdown: -5.2 },
    { date: '20/01', drawdown: -3.1 },
    { date: '25/01', drawdown: -7.8 },
    { date: '01/02', drawdown: -4.5 },
    { date: '05/02', drawdown: -2.1 },
    { date: '10/02', drawdown: -8.9 },
    { date: '15/02', drawdown: -12.8 },
    { date: '20/02', drawdown: -9.2 },
    { date: '25/02', drawdown: -6.5 },
    { date: '01/03', drawdown: -3.2 },
    { date: '05/03', drawdown: -1.5 },
    { date: '10/03', drawdown: 0 },
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Drawdown Analysis
          <AlertCircle className="h-4 w-4 text-yellow-500" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="date" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1A1A1A',
                border: '1px solid #333',
                borderRadius: '4px',
              }}
              formatter={(value: any) => `${value}%`}
            />
            <Area
              type="monotone"
              dataKey="drawdown"
              stroke="#FF0000"
              fill="#FF000033"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
        
        <div className="mt-6 space-y-4">
          <div className="flex justify-between items-center p-3 bg-red-500/10 rounded-lg">
            <div>
              <p className="text-sm font-medium">Max Drawdown</p>
              <p className="text-xs text-muted-foreground">15/02/2024</p>
            </div>
            <p className="text-xl font-bold font-mono text-red-500">-12.8%</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-secondary/30 rounded-lg">
              <p className="text-sm text-muted-foreground">Drawdown Atual</p>
              <p className="text-lg font-bold font-mono">0.0%</p>
            </div>
            <div className="p-3 bg-secondary/30 rounded-lg">
              <p className="text-sm text-muted-foreground">Tempo Recuperação</p>
              <p className="text-lg font-bold font-mono">23 dias</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">Histórico de Drawdowns</p>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Último mês</span>
                <span className="font-mono">-6.5%</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Últimos 3 meses</span>
                <span className="font-mono">-12.8%</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Último ano</span>
                <span className="font-mono">-18.2%</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}