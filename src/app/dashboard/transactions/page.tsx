'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { EmptyState } from '@/components/shared/EmptyState';
import { 
  History, 
  Search, 
  Filter, 
  Download, 
  ArrowUpRight, 
  ArrowDownLeft,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { transactionsData } from '@/lib/mock-data';

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all');
  
  const transactions = transactionsData;

  const statusOptions = [
    { value: 'all', label: 'Todos os status' },
    { value: 'PENDING', label: 'Pendente' },
    { value: 'COMPLETED', label: 'Concluído' },
    { value: 'FAILED', label: 'Falhou' },
    { value: 'CANCELLED', label: 'Cancelado' },
  ];

  const typeOptions = [
    { value: 'all', label: 'Todos os tipos' },
    { value: 'BUY', label: 'Compra' },
    { value: 'SELL', label: 'Venda' },
  ];

  const timeOptions = [
    { value: 'all', label: 'Todo período' },
    { value: '24h', label: 'Últimas 24h' },
    { value: '7d', label: 'Últimos 7 dias' },
    { value: '30d', label: 'Últimos 30 dias' },
    { value: '90d', label: 'Últimos 90 dias' },
  ];

  // Filter transactions
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.asset.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
    
    // Time filter logic would go here
    const matchesTime = true; // Simplified for now
    
    return matchesSearch && matchesStatus && matchesType && matchesTime;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'PENDING':
        return <Clock className="w-4 h-4 text-warning" />;
      case 'FAILED':
        return <XCircle className="w-4 h-4 text-destructive" />;
      case 'CANCELLED':
        return <AlertCircle className="w-4 h-4 text-muted-foreground" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusVariant = (status: string): 'default' | 'success' | 'warning' | 'error' => {
    switch (status) {
      case 'COMPLETED':
        return 'success';
      case 'PENDING':
        return 'warning';
      case 'FAILED':
        return 'error';
      case 'CANCELLED':
        return 'default';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'Concluído';
      case 'PENDING':
        return 'Pendente';
      case 'FAILED':
        return 'Falhou';
      case 'CANCELLED':
        return 'Cancelado';
      default:
        return status;
    }
  };

  // Calculate summary stats
  const totalTransactions = filteredTransactions.length;
  const completedTransactions = filteredTransactions.filter(t => t.status === 'COMPLETED').length;
  const pendingTransactions = filteredTransactions.filter(t => t.status === 'PENDING').length;
  const totalVolume = filteredTransactions
    .filter(t => t.status === 'COMPLETED')
    .reduce((sum, t) => sum + t.total, 0);

  const stats = [
    {
      title: 'Total de Transações',
      value: totalTransactions.toString(),
      icon: History,
    },
    {
      title: 'Concluídas',
      value: completedTransactions.toString(),
      icon: CheckCircle,
    },
    {
      title: 'Pendentes',
      value: pendingTransactions.toString(),
      icon: Clock,
    },
    {
      title: 'Volume Total',
      value: `R$ ${totalVolume.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      icon: ArrowUpRight,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Transações</h1>
          <p className="text-muted-foreground">
            Histórico completo de suas operações
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
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
                  <p className="text-2xl font-bold text-foreground mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por ID da transação ou ativo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={statusOptions}
            />
            
            <Select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              options={typeOptions}
            />
            
            <Select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              options={timeOptions}
            />
          </div>
        </div>
      </Card>

      {/* Transactions Table */}
      <Card>
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">
              Histórico de Transações
            </h3>
            <Badge variant="outline">
              {filteredTransactions.length} transações
            </Badge>
          </div>
        </div>

        {filteredTransactions.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transação</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Ativo</TableHead>
                  <TableHead>Quantidade</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <div className="font-mono text-sm">
                        {transaction.id.slice(0, 8)}...
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {transaction.type === 'BUY' ? (
                          <ArrowDownLeft className="w-4 h-4 text-success" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4 text-destructive" />
                        )}
                        <span className={`text-sm font-medium ${
                          transaction.type === 'BUY' ? 'text-success' : 'text-destructive'
                        }`}>
                          {transaction.type === 'BUY' ? 'Compra' : 'Venda'}
                        </span>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">
                            {transaction.asset.charAt(0)}
                          </span>
                        </div>
                        <span className="font-medium">{transaction.asset}</span>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <span className="font-mono text-sm">
                        {transaction.amount.toLocaleString('pt-BR', { maximumFractionDigits: 8 })}
                      </span>
                    </TableCell>
                    
                    <TableCell>
                      <span className="font-mono text-sm">
                        R$ {transaction.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </TableCell>
                    
                    <TableCell>
                      <div>
                        <span className="font-medium">
                          R$ {transaction.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                        {transaction.fee > 0 && (
                          <div className="text-xs text-muted-foreground">
                            Taxa: R$ {transaction.fee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <Badge variant={getStatusVariant(transaction.status)} className="flex items-center space-x-1 w-fit">
                        {getStatusIcon(transaction.status)}
                        <span>{getStatusLabel(transaction.status)}</span>
                      </Badge>
                    </TableCell>
                    
                    <TableCell>
                      <div className="text-sm">
                        <div>{new Date(transaction.date).toLocaleDateString('pt-BR')}</div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(transaction.date).toLocaleTimeString('pt-BR', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="p-6">
            <EmptyState
              icon={<History className="w-16 h-16 text-muted-foreground" />}
              title="Nenhuma transação encontrada"
              description="Não foram encontradas transações com os filtros aplicados."
              action={{
                label: 'Limpar filtros',
                onClick: () => {
                  setSearchTerm('');
                  setStatusFilter('all');
                  setTypeFilter('all');
                  setTimeFilter('all');
                }
              }}
            />
          </div>
        )}
      </Card>

      {/* Transaction Details Modal would go here */}
      {/* You can implement a modal to show detailed transaction information */}
    </div>
  );
}