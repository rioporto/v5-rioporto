'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { 
  Calculator, 
  TrendingUp, 
  Target, 
  PieChart,
  AlertCircle,
  Zap,
  BarChart3,
  DollarSign,
  Percent,
  Calendar
} from 'lucide-react';

export default function ToolsPage() {
  // DCA Calculator state
  const [dcaAmount, setDcaAmount] = useState('');
  const [dcaPeriod, setDcaPeriod] = useState('weekly');
  const [dcaDuration, setDcaDuration] = useState('12');

  // Profit Calculator state
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [buyPrice, setBuyPrice] = useState('');
  const [sellPrice, setSellPrice] = useState('');

  // Portfolio Rebalancer state
  const [targetAllocation, setTargetAllocation] = useState({
    BTC: 50,
    ETH: 30,
    ADA: 20,
  });

  const calculateDCA = () => {
    if (!dcaAmount || !dcaDuration) return null;
    
    const amount = parseFloat(dcaAmount);
    const duration = parseInt(dcaDuration);
    const periodsPerMonth = dcaPeriod === 'weekly' ? 4 : dcaPeriod === 'daily' ? 30 : 1;
    const totalPeriods = duration * periodsPerMonth;
    const totalInvestment = amount * totalPeriods;
    
    return {
      totalInvestment,
      totalPeriods,
      averagePerMonth: totalInvestment / duration,
    };
  };

  const calculateProfit = () => {
    if (!investmentAmount || !buyPrice || !sellPrice) return null;
    
    const amount = parseFloat(investmentAmount);
    const buy = parseFloat(buyPrice);
    const sell = parseFloat(sellPrice);
    
    const quantity = amount / buy;
    const finalValue = quantity * sell;
    const profit = finalValue - amount;
    const profitPercentage = (profit / amount) * 100;
    
    return {
      quantity,
      finalValue,
      profit,
      profitPercentage,
    };
  };

  const dcaResult = calculateDCA();
  const profitResult = calculateProfit();

  const tools = [
    {
      id: 'dca',
      title: 'Calculadora DCA',
      description: 'Calcule estratégias de Dollar Cost Averaging',
      icon: Calculator,
      color: 'bg-blue-500/10 text-blue-500',
    },
    {
      id: 'profit',
      title: 'Calculadora de Lucro',
      description: 'Calcule lucros e perdas de investimentos',
      icon: TrendingUp,
      color: 'bg-green-500/10 text-green-500',
    },
    {
      id: 'rebalance',
      title: 'Rebalanceamento',
      description: 'Otimize a distribuição do seu portfolio',
      icon: PieChart,
      color: 'bg-purple-500/10 text-purple-500',
    },
    {
      id: 'analysis',
      title: 'Análise Técnica',
      description: 'Ferramentas de análise avançada',
      icon: BarChart3,
      color: 'bg-orange-500/10 text-orange-500',
    },
  ];

  const periodOptions = [
    { value: 'daily', label: 'Diário' },
    { value: 'weekly', label: 'Semanal' },
    { value: 'monthly', label: 'Mensal' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Ferramentas</h1>
          <p className="text-muted-foreground">
            Calculadoras e ferramentas para otimizar seus investimentos
          </p>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Card key={tool.id} className="p-6 cursor-pointer hover:border-primary transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-full ${tool.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <Badge variant="outline">Ativo</Badge>
              </div>
              <h3 className="font-semibold text-foreground mb-2">{tool.title}</h3>
              <p className="text-sm text-muted-foreground">{tool.description}</p>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="dca" className="space-y-6">
        <TabsList>
          <TabsTrigger value="dca">Calculadora DCA</TabsTrigger>
          <TabsTrigger value="profit">Calculadora de Lucro</TabsTrigger>
          <TabsTrigger value="rebalance">Rebalanceamento</TabsTrigger>
          <TabsTrigger value="analysis">Análise Técnica</TabsTrigger>
        </TabsList>

        {/* DCA Calculator */}
        <TabsContent value="dca" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <Calculator className="w-5 h-5 mr-2" />
                Configurar DCA
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Valor por compra (R$)
                  </label>
                  <Input
                    type="number"
                    value={dcaAmount}
                    onChange={(e) => setDcaAmount(e.target.value)}
                    placeholder="500.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Frequência
                  </label>
                  <select
                    value={dcaPeriod}
                    onChange={(e) => setDcaPeriod(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  >
                    {periodOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Duração (meses)
                  </label>
                  <Input
                    type="number"
                    value={dcaDuration}
                    onChange={(e) => setDcaDuration(e.target.value)}
                    placeholder="12"
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Resultado da Estratégia
              </h3>
              
              {dcaResult ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Investimento total:</span>
                      <span className="font-semibold text-foreground">
                        R$ {dcaResult.totalInvestment.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Total de compras:</span>
                      <span className="font-semibold text-foreground">
                        {dcaResult.totalPeriods}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Média mensal:</span>
                      <span className="font-semibold text-foreground">
                        R$ {dcaResult.averagePerMonth.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <AlertCircle className="w-4 h-4" />
                      <span>Simulação baseada em compras regulares</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      * Resultado não considera variações de preço do ativo
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Preencha os campos para ver o resultado da estratégia DCA.
                </p>
              )}
            </Card>
          </div>
        </TabsContent>

        {/* Profit Calculator */}
        <TabsContent value="profit" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                Dados do Investimento
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Valor investido (R$)
                  </label>
                  <Input
                    type="number"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                    placeholder="1000.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Preço de compra (R$)
                  </label>
                  <Input
                    type="number"
                    value={buyPrice}
                    onChange={(e) => setBuyPrice(e.target.value)}
                    placeholder="50000.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Preço de venda (R$)
                  </label>
                  <Input
                    type="number"
                    value={sellPrice}
                    onChange={(e) => setSellPrice(e.target.value)}
                    placeholder="55000.00"
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <Percent className="w-5 h-5 mr-2" />
                Resultado
              </h3>
              
              {profitResult ? (
                <div className="space-y-4">
                  <div className="p-4 bg-accent/50 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Quantidade:</span>
                      <span className="font-mono text-foreground">
                        {profitResult.quantity.toFixed(8)}
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Valor final:</span>
                      <span className="font-semibold text-foreground">
                        R$ {profitResult.finalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Lucro/Prejuízo:</span>
                      <span className={`font-bold ${profitResult.profit >= 0 ? 'text-success' : 'text-destructive'}`}>
                        {profitResult.profit >= 0 ? '+' : ''}
                        R$ {profitResult.profit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Percentual:</span>
                      <Badge variant={profitResult.profitPercentage >= 0 ? 'success' : 'error'}>
                        {profitResult.profitPercentage >= 0 ? '+' : ''}
                        {profitResult.profitPercentage.toFixed(2)}%
                      </Badge>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    * Cálculo não considera taxas de negociação
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Preencha os dados para calcular o resultado do investimento.
                </p>
              )}
            </Card>
          </div>
        </TabsContent>

        {/* Portfolio Rebalancer */}
        <TabsContent value="rebalance" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <PieChart className="w-5 h-5 mr-2" />
              Rebalanceamento de Portfolio
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium text-foreground mb-4">Alocação Desejada</h4>
                <div className="space-y-4">
                  {Object.entries(targetAllocation).map(([asset, percentage]) => (
                    <div key={asset} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-foreground">{asset}</span>
                        <span className="text-sm text-muted-foreground">{percentage}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={percentage}
                        onChange={(e) => setTargetAllocation(prev => ({
                          ...prev,
                          [asset]: parseInt(e.target.value)
                        }))}
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-4">Status Atual vs Desejado</h4>
                <div className="space-y-4">
                  <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertCircle className="w-4 h-4 text-warning" />
                      <span className="text-sm font-medium text-warning">
                        Portfolio desbalanceado
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Considere rebalancear para otimizar sua alocação.
                    </p>
                  </div>

                  <Button className="w-full">
                    <Zap className="w-4 h-4 mr-2" />
                    Executar Rebalanceamento
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Technical Analysis */}
        <TabsContent value="analysis" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Análise Técnica
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 border border-border rounded-lg">
                <h4 className="font-medium text-foreground mb-2">RSI (14)</h4>
                <div className="text-2xl font-bold text-foreground mb-1">67.5</div>
                <Badge variant="warning">Neutro</Badge>
              </div>

              <div className="p-4 border border-border rounded-lg">
                <h4 className="font-medium text-foreground mb-2">MACD</h4>
                <div className="text-2xl font-bold text-success mb-1">+142.3</div>
                <Badge variant="success">Compra</Badge>
              </div>

              <div className="p-4 border border-border rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Bollinger</h4>
                <div className="text-2xl font-bold text-foreground mb-1">Upper</div>
                <Badge variant="error">Venda</Badge>
              </div>
            </div>

            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground text-center">
                Ferramentas de análise técnica avançada serão implementadas em breve
              </p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}