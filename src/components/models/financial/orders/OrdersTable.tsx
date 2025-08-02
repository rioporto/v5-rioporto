'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Eye, MoreVertical, Download } from 'lucide-react';

interface Order {
  id: string;
  type: 'BUY' | 'SELL';
  crypto: string;
  amount: number;
  price: number;
  total: number;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  date: string;
  time: string;
}

interface OrdersTableProps {
  className?: string;
}

export function OrdersTable({ className }: OrdersTableProps) {
  const [orders] = useState<Order[]>([
    {
      id: 'ORD-001',
      type: 'BUY',
      crypto: 'BTC',
      amount: 0.5,
      price: 180000,
      total: 90000,
      status: 'COMPLETED',
      date: '2024-01-20',
      time: '14:30',
    },
    {
      id: 'ORD-002',
      type: 'SELL',
      crypto: 'ETH',
      amount: 2.5,
      price: 12000,
      total: 30000,
      status: 'PENDING',
      date: '2024-01-20',
      time: '13:15',
    },
    {
      id: 'ORD-003',
      type: 'BUY',
      crypto: 'BTC',
      amount: 0.25,
      price: 178000,
      total: 44500,
      status: 'CANCELLED',
      date: '2024-01-20',
      time: '12:00',
    },
  ]);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'COMPLETED': return 'bg-green-500/10 text-green-500';
      case 'PENDING': return 'bg-yellow-500/10 text-yellow-500';
      case 'CANCELLED': return 'bg-red-500/10 text-red-500';
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Histórico de Ordens</CardTitle>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Exportar
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 font-medium">ID</th>
                <th className="text-left p-4 font-medium">Tipo</th>
                <th className="text-left p-4 font-medium">Cripto</th>
                <th className="text-right p-4 font-medium">Quantidade</th>
                <th className="text-right p-4 font-medium">Preço</th>
                <th className="text-right p-4 font-medium">Total</th>
                <th className="text-center p-4 font-medium">Status</th>
                <th className="text-left p-4 font-medium">Data/Hora</th>
                <th className="text-center p-4 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-secondary/30">
                  <td className="p-4 font-mono text-sm">{order.id}</td>
                  <td className="p-4">
                    <Badge variant={order.type === 'BUY' ? 'default' : 'destructive'}>
                      {order.type}
                    </Badge>
                  </td>
                  <td className="p-4 font-medium">{order.crypto}</td>
                  <td className="p-4 text-right font-mono">{order.amount}</td>
                  <td className="p-4 text-right font-mono">R$ {order.price.toLocaleString()}</td>
                  <td className="p-4 text-right font-mono font-medium">R$ {order.total.toLocaleString()}</td>
                  <td className="p-4 text-center">
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-sm">
                    <div>{order.date}</div>
                    <div className="text-muted-foreground">{order.time}</div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}