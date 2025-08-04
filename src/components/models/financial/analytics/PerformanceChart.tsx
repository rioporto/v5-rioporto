'use client';

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Select } from '@/components/ui/Select';

interface PerformanceChartProps {
  className?: string;
}

export function PerformanceChart({ className }: PerformanceChartProps) {
  const [timeframe, setTimeframe] = useState('30d');

  const data = [
    { date: '01/01', value: 10000, benchmark: 10000 },
    { date: '05/01', value: 10500, benchmark: 10200 },
    { date: '10/01', value: 11200, benchmark: 10400 },
    { date: '15/01', value: 10900, benchmark: 10300 },
    { date: '20/01', value: 11800, benchmark: 10600 },
    { date: '25/01', value: 12400, benchmark: 10800 },
    { date: '30/01', value: 12900, benchmark: 11000 },
  ];

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Performance vs Benchmark</CardTitle>
        <Select 
          value={timeframe} 
          onChange={(value) => setTimeframe(value)}
          options={[
            { value: '7d', label: '7 dias' },
            { value: '30d', label: '30 dias' },
            { value: '90d', label: '90 dias' },
            { value: '1y', label: '1 ano' }
          ]}
          className="w-[100px]"
        />
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="date" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1A1A1A',
                border: '1px solid #333',
                borderRadius: '4px',
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#0066FF" name="Portfolio" strokeWidth={2} />
            <Line type="monotone" dataKey="benchmark" stroke="#888" name="Benchmark" strokeWidth={2} strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Retorno Total</p>
            <p className="text-xl font-mono text-green-500">+29.0%</p>
          </div>
          <div>
            <p className="text-muted-foreground">vs Benchmark</p>
            <p className="text-xl font-mono text-green-500">+19.0%</p>
          </div>
          <div>
            <p className="text-muted-foreground">Sharpe Ratio</p>
            <p className="text-xl font-mono">1.85</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}