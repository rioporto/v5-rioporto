'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Separator } from '@/components/ui/Separator';
import { Clock, Hash, TrendingUp, Calendar, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

interface OrderDetailsProps {
  orderId?: string;
  className?: string;
}

export function OrderDetails({ orderId = 'ORD-12345', className }: OrderDetailsProps) {
  const order = {
    id: orderId,
    type: 'BUY',
    crypto: 'BTC',
    amount: 0.5,
    price: 180000,
    total: 90000,
    status: 'COMPLETED',
    date: '2024-01-20',
    time: '14:30:25',
    txHash: '0x1234567890abcdef1234567890abcdef12345678',
    fees: {
      trading: 90,
      network: 15,
      total: 105,
    },
    timeline: [
      { status: 'CREATED', time: '14:30:25', description: 'Ordem criada' },
      { status: 'PROCESSING', time: '14:30:28', description: 'Processando pagamento' },
      { status: 'CONFIRMED', time: '14:31:15', description: 'Pagamento confirmado' },
      { status: 'COMPLETED', time: '14:32:00', description: 'Ordem executada' },
    ],
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'CANCELLED': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Detalhes da Ordem</span>
          <Badge variant={order.type === 'BUY' ? 'default' : 'destructive'}>
            {order.type}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Hash className="h-4 w-4" />
              ID da Ordem
            </div>
            <p className="font-mono font-medium">{order.id}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              Data/Hora
            </div>
            <p className="font-medium">{order.date} {order.time}</p>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="font-medium">Informações da Transação</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Criptomoeda</span>
              <span className="font-medium">{order.crypto}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Quantidade</span>
              <span className="font-mono">{order.amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Preço Unitário</span>
              <span className="font-mono">R$ {order.price.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-mono">R$ {order.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="font-medium">Taxas</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Taxa de Negociação</span>
              <span className="font-mono">R$ {order.fees.trading}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Taxa de Rede</span>
              <span className="font-mono">R$ {order.fees.network}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Total de Taxas</span>
              <span className="font-mono">R$ {order.fees.total}</span>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="font-medium">Total Final</h3>
          <div className="flex justify-between text-xl font-bold">
            <span>Total Pago</span>
            <span className="font-mono">R$ {(order.total + order.fees.total).toLocaleString()}</span>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="font-medium">Timeline</h3>
          <div className="space-y-3">
            {order.timeline.map((event, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="pt-0.5">{getStatusIcon(event.status)}</div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium">{event.description}</span>
                    <span className="text-sm text-muted-foreground">{event.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {order.txHash && (
          <>
            <Separator />
            <div className="space-y-2">
              <h3 className="font-medium">Hash da Transação</h3>
              <p className="font-mono text-xs break-all text-muted-foreground">{order.txHash}</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}