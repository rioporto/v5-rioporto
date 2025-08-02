'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ProfitLossAnalysisProps {
  className?: string;
}

export function ProfitLossAnalysis({ className }: ProfitLossAnalysisProps) {
  const monthlyData = [
    { month: 'Jan', profit: 4500, loss: -1200, net: 3300 },
    { month: 'Fev', profit: 5200, loss: -1800, net: 3400 },
    { month: 'Mar', profit: 3800, loss: -2200, net: 1600 },
    { month: 'Abr', profit: 6100, loss: -1500, net: 4600 },
    { month: 'Mai', profit: 7200, loss: -2100, net: 5100 },
    { month: 'Jun', profit: 5800, loss: -1900, net: 3900 },
  ];

  const categoryData = [
    { category: 'Crypto', profit: 12500, loss: -3200 },
    { category: 'Ações', profit: 8900, loss: -2100 },
    { category: 'Forex', profit: 4200, loss: -1800 },
    { category: 'Commodities', profit: 6300, loss: -2400 },
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Análise de Lucros e Perdas</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="monthly" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="monthly">Mensal</TabsTrigger>
            <TabsTrigger value="category">Por Categoria</TabsTrigger>
          </TabsList>
          
          <TabsContent value="monthly" className="space-y-4">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="month" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1A1A1A',
                    border: '1px solid #333',
                    borderRadius: '4px',
                  }}
                />
                <Legend />
                <Bar dataKey="profit" fill="#00D632" name="Lucros" />
                <Bar dataKey="loss" fill="#FF0000" name="Perdas" />
              </BarChart>
            </ResponsiveContainer>
            
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Total Lucros</p>
                <p className="text-xl font-bold font-mono text-green-500">+R$ 32,600</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Total Perdas</p>
                <p className="text-xl font-bold font-mono text-red-500">-R$ 10,700</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Lucro Líquido</p>
                <p className="text-xl font-bold font-mono text-blue-500">+R$ 21,900</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="category" className="space-y-4">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis type="number" stroke="#888" />
                <YAxis dataKey="category" type="category" stroke="#888" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1A1A1A',
                    border: '1px solid #333',
                    borderRadius: '4px',
                  }}
                />
                <Legend />
                <Bar dataKey="profit" fill="#00D632" name="Lucros" />
                <Bar dataKey="loss" fill="#FF0000" name="Perdas" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}