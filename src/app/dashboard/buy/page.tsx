'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { EmptyState } from '@/components/shared/EmptyState';
import { ShoppingCart, TrendingUp, DollarSign, Clock, Shield } from 'lucide-react';
import { supportedTokens, marketData } from '@/lib/mock-data';

export default function BuyPage() {
  const [selectedToken, setSelectedToken] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [orderType, setOrderType] = useState('market');

  const paymentMethods = [
    { value: 'pix', label: 'PIX' },
    { value: 'ted', label: 'TED' },
    { value: 'doc', label: 'DOC' },
  ];

  const orderTypes = [
    { value: 'market', label: 'Mercado' },
    { value: 'limit', label: 'Limite' },
  ];

  const activeTokens = supportedTokens.filter(token => token.active);
  const selectedTokenData = activeTokens.find(token => token.symbol === selectedToken);
  const marketPrice = marketData.find(data => data.symbol === selectedToken)?.price || 0;
  
  const total = amount && marketPrice ? parseFloat(amount) * marketPrice : 0;
  const fee = total * 0.005; // 0.5% fee
  const finalTotal = total + fee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle buy order submission
    console.log('Buy order:', {
      token: selectedToken,
      amount,
      paymentMethod,
      orderType,
      total: finalTotal,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Comprar Criptomoedas</h1>
          <p className="text-muted-foreground">
            Adquira ativos digitais de forma rápida e segura
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="flex items-center space-x-1">
            <Shield className="w-3 h-3" />
            <span>KYC Verificado</span>
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Buy Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">
              Nova Ordem de Compra
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Order Type */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Tipo de Ordem
                </label>
                <Select
                  value={orderType}
                  onChange={(value) => setOrderType(value)}
                  options={orderTypes}
                />
              </div>

              {/* Token Selection */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Ativo
                </label>
                <Select
                  value={selectedToken}
                  onChange={(value) => setSelectedToken(value)}
                  options={activeTokens.map(token => ({
                    value: token.symbol,
                    label: `${token.symbol} - ${token.name}`,
                  }))}
                  placeholder="Selecione um ativo"
                />
              </div>

              {selectedTokenData && (
                <>
                  {/* Amount */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Quantidade ({selectedTokenData.symbol})
                    </label>
                    <Input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00000001"
                      step={`0.${'0'.repeat(selectedTokenData.decimals - 1)}1`}
                      min={selectedTokenData.minAmount}
                      max={selectedTokenData.maxAmount}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Min: {selectedTokenData.minAmount} - Max: {selectedTokenData.maxAmount}
                    </p>
                  </div>

                  {/* Price Display */}
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Preço atual:</span>
                      <span className="font-medium text-foreground">
                        R$ {marketPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Subtotal:</span>
                      <span className="font-medium text-foreground">
                        R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Taxa (0.5%):</span>
                      <span className="font-medium text-foreground">
                        R$ {fee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-border">
                      <span className="font-medium text-foreground">Total:</span>
                      <span className="font-bold text-lg text-foreground">
                        R$ {finalTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Método de Pagamento
                    </label>
                    <Select
                      value={paymentMethod}
                      onChange={(value) => setPaymentMethod(value)}
                      options={paymentMethods}
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={!selectedToken || !amount || parseFloat(amount) <= 0}
                    size="lg"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Comprar {selectedToken}
                  </Button>
                </>
              )}
            </form>
          </Card>

          {/* Order Book Preview */}
          {selectedToken && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Livro de Ofertas - {selectedToken}
              </h3>
              
              <Tabs defaultValue="buy">
                <TabsList className="w-full">
                  <TabsTrigger value="buy" className="flex-1">Compra</TabsTrigger>
                  <TabsTrigger value="sell" className="flex-1">Venda</TabsTrigger>
                </TabsList>

                <TabsContent value="buy" className="mt-4">
                  <div className="space-y-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex justify-between items-center p-2 bg-success/5 rounded">
                        <span className="text-sm font-mono text-success">
                          R$ {(marketPrice * (1 - (i + 1) * 0.001)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {(Math.random() * 10).toFixed(6)} {selectedToken}
                        </span>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="sell" className="mt-4">
                  <div className="space-y-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex justify-between items-center p-2 bg-destructive/5 rounded">
                        <span className="text-sm font-mono text-destructive">
                          R$ {(marketPrice * (1 + (i + 1) * 0.001)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {(Math.random() * 10).toFixed(6)} {selectedToken}
                        </span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Available Assets */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Ativos Disponíveis
            </h3>
            
            {activeTokens.length > 0 ? (
              <div className="space-y-3">
                {activeTokens.slice(0, 5).map((token) => {
                  const tokenMarketData = marketData.find(data => data.symbol === token.symbol);
                  return (
                    <div
                      key={token.id}
                      className={`p-3 border border-border rounded-lg cursor-pointer transition-colors ${
                        selectedToken === token.symbol
                          ? 'border-primary bg-primary/5'
                          : 'hover:bg-muted/50'
                      }`}
                      onClick={() => setSelectedToken(token.symbol)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold text-primary">
                              {token.symbol.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{token.symbol}</p>
                            <p className="text-xs text-muted-foreground">{token.name}</p>
                          </div>
                        </div>
                        
                        {tokenMarketData && (
                          <div className="text-right">
                            <p className="text-sm font-medium text-foreground">
                              R$ {tokenMarketData.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                            <Badge
                              variant={tokenMarketData.change24h >= 0 ? 'success' : 'error'}
                              className="text-xs"
                            >
                              {tokenMarketData.change24h >= 0 ? '+' : ''}
                              {tokenMarketData.change24h.toFixed(2)}%
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <EmptyState
                icon={<DollarSign className="w-16 h-16 text-muted-foreground" />}
                title="Nenhum ativo disponível"
                description="Não há ativos disponíveis para compra no momento."
              />
            )}
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Ações Rápidas
            </h3>
            
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="w-4 h-4 mr-2" />
                Ver Mercado
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Clock className="w-4 h-4 mr-2" />
                Histórico de Ordens
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <DollarSign className="w-4 h-4 mr-2" />
                Limites KYC
              </Button>
            </div>
          </Card>

          {/* Market Summary */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Resumo do Mercado
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Volume 24h:</span>
                <span className="text-sm font-medium text-foreground">
                  R$ 2.5M
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Ordens Ativas:</span>
                <span className="text-sm font-medium text-foreground">
                  1,234
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Usuários Online:</span>
                <span className="text-sm font-medium text-foreground">
                  456
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}