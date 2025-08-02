'use client';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText
} from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    {
      title: 'Usuários Totais',
      value: '12,543',
      change: '+12.3%',
      icon: Users,
      color: 'text-blue-500',
    },
    {
      title: 'Volume 24h',
      value: 'R$ 2.4M',
      change: '+8.7%',
      icon: TrendingUp,
      color: 'text-green-500',
    },
    {
      title: 'Receita Total',
      value: 'R$ 450K',
      change: '+15.2%',
      icon: DollarSign,
      color: 'text-yellow-500',
    },
    {
      title: 'Ordens Ativas',
      value: '1,234',
      change: '+5.4%',
      icon: Activity,
      color: 'text-purple-500',
    },
  ];

  const alerts = [
    { type: 'warning', message: '15 usuários pendentes de verificação KYC', count: 15 },
    { type: 'error', message: '3 transações falharam nas últimas 24h', count: 3 },
    { type: 'info', message: '12 novos usuários registrados hoje', count: 12 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard Administrativo</h1>
        <p className="text-muted-foreground">Visão geral da plataforma RioPorto P2P</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <Badge variant="success" className="text-xs">{stat.change}</Badge>
                  </div>
                </div>
                <div className={`p-3 bg-primary/10 rounded-full`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Alerts */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Alertas do Sistema</h2>
        <div className="space-y-3">
          {alerts.map((alert, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                {alert.type === 'warning' && <AlertTriangle className="w-5 h-5 text-warning" />}
                {alert.type === 'error' && <AlertTriangle className="w-5 h-5 text-destructive" />}
                {alert.type === 'info' && <CheckCircle className="w-5 h-5 text-primary" />}
                <span className="text-foreground">{alert.message}</span>
              </div>
              <Badge variant="outline">{alert.count}</Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Atividade Recente</h3>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Novo usuário registrado</p>
                  <p className="text-xs text-muted-foreground">há {i + 1} minutos</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Tarefas Pendentes</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Verificações KYC</span>
              <Badge variant="warning">15</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Disputas de transação</span>
              <Badge variant="destructive">3</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Suporte ao cliente</span>
              <Badge variant="default">8</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}