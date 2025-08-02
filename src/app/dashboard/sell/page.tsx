'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { EmptyState } from '@/components/shared/EmptyState';
import { ShoppingBag, TrendingDown, DollarSign, Clock, Shield, Wallet } from 'lucide-react';
import { portfolioData, MOCK_PORTFOLIO_ASSETS, marketData } from '@/lib/mock-data';

export default function SellPage() {
  const [selectedAsset, setSelectedAsset] = useState('');
  const [amount, setAmount] = useState('');
  const [sellMethod, setSellMethod] = useState('pix');
  const [orderType, setOrderType] = useState('market');

  const sellMethods = [
    { value: 'pix', label: 'PIX' },
    { value: 'ted', label: 'TED' },
    { value: 'doc', label: 'DOC' },
  ];

  const orderTypes = [
    { value: 'market', label: 'Mercado' },
    { value: 'limit', label: 'Limite' },
  ];

  const availableAssets = MOCK_PORTFOLIO_ASSETS.filter(asset => asset.amount > 0);
  const selectedAssetData = availableAssets.find(asset => asset.symbol === selectedAsset);
  const marketPrice = marketData.find(data => data.symbol === selectedAsset)?.price || 0;
  
  const total = amount && marketPrice ? parseFloat(amount) * marketPrice : 0;
  const fee = total * 0.005; // 0.5% fee
  const finalTotal = total - fee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sell order submission
    console.log('Sell order:', {
      asset: selectedAsset,
      amount,
      sellMethod,
      orderType,
      total: finalTotal,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Vender Criptomoedas</h1>
          <p className="text-muted-foreground">
            Converta seus ativos digitais em reais
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
        {/* Sell Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">
              Nova Ordem de Venda
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Order Type */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Tipo de Ordem
                </label>
                <Select
                  value={orderType}
                  onChange={(e) => setOrderType(e.target.value)}
                  options={orderTypes}
                />
              </div>

              {/* Asset Selection */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Ativo
                </label>
                <Select
                  value={selectedAsset}
                  onChange={(e) => setSelectedAsset(e.target.value)}
                  options={availableAssets.map(asset => ({
                    value: asset.symbol,
                    label: `${asset.symbol} - Disponível: ${asset.amount.toLocaleString('pt-BR', { maximumFractionDigits: 8 })}`,
                  }))}
                  placeholder="Selecione um ativo"
                />
              </div>

              {selectedAssetData && (
                <>
                  {/* Amount */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Quantidade ({selectedAssetData.symbol})
                    </label>
                    <div className="relative">
                      <Input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00000001"
                        step="0.00000001"
                        min="0"
                        max={selectedAssetData.amount}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-xs"
                        onClick={() => setAmount(selectedAssetData.amount.toString())}
                      >
                        MAX
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Disponível: {selectedAssetData.amount.toLocaleString('pt-BR', { maximumFractionDigits: 8 })} {selectedAssetData.symbol}
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
                      <span className="font-medium text-destructive">
                        -R$ {fee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-border">
                      <span className="font-medium text-foreground">Você receberá:</span>
                      <span className="font-bold text-lg text-success">
                        R$ {finalTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>

                  {/* P&L Display */}
                  {amount && parseFloat(amount) > 0 && (
                    <div className="p-4 bg-accent/50 rounded-lg">
                      <h4 className="font-medium text-foreground mb-2">
                        Resultado da Operação
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Preço médio pago:</span>
                          <span className="text-sm font-medium text-foreground">
                            R$ {selectedAssetData.avgPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Preço de venda:</span>
                          <span className="text-sm font-medium text-foreground">
                            R$ {marketPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-border">
                          <span className="font-medium text-foreground">P&L estimado:</span>
                          {(() => {
                            const sellAmount = parseFloat(amount);
                            const pnl = (marketPrice - selectedAssetData.avgPrice) * sellAmount - fee;
                            const pnlPercentage = ((marketPrice - selectedAssetData.avgPrice) / selectedAssetData.avgPrice) * 100;
                            return (
                              <div className="text-right">
                                <span className={`font-bold ${pnl >= 0 ? 'text-success' : 'text-destructive'}`}>
                                  {pnl >= 0 ? '+' : ''}R$ {pnl.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </span>
                                <div>
                                  <Badge
                                    variant={pnlPercentage >= 0 ? 'success' : 'error'}
                                    className="text-xs"
                                  >
                                    {pnlPercentage >= 0 ? '+' : ''}{pnlPercentage.toFixed(2)}%
                                  </Badge>
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Sell Method */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Método de Recebimento
                    </label>
                    <Select
                      value={sellMethod}
                      onChange={(e) => setSellMethod(e.target.value)}
                      options={sellMethods}
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={!selectedAsset || !amount || parseFloat(amount) <= 0 || parseFloat(amount) > selectedAssetData.amount}
                    size="lg"
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Vender {selectedAsset}
                  </Button>
                </>
              )}
            </form>
          </Card>

          {/* Order Book Preview */}
          {selectedAsset && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Livro de Ofertas - {selectedAsset}
              </h3>
              
              <Tabs defaultValue="sell">
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
                          {(Math.random() * 10).toFixed(6)} {selectedAsset}
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
                          {(Math.random() * 10).toFixed(6)} {selectedAsset}
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
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Wallet className="w-5 h-5 mr-2" />
              Meus Ativos
            </h3>
            
            {availableAssets.length > 0 ? (
              <div className="space-y-3">
                {availableAssets.map((asset) => {
                  const assetMarketData = marketData.find(data => data.symbol === asset.symbol);
                  return (
                    <div
                      key={asset.id}
                      className={`p-3 border border-border rounded-lg cursor-pointer transition-colors ${
                        selectedAsset === asset.symbol
                          ? 'border-primary bg-primary/5'
                          : 'hover:bg-muted/50'
                      }`}
                      onClick={() => setSelectedAsset(asset.symbol)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold text-primary">
                              {asset.symbol.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{asset.symbol}</p>
                            <p className="text-xs text-muted-foreground">{asset.name}</p>
                          </div>
                        </div>
                        
                        {assetMarketData && (
                          <Badge
                            variant={assetMarketData.change24h >= 0 ? 'success' : 'error'}
                            className="text-xs"
                          >
                            {assetMarketData.change24h >= 0 ? '+' : ''}
                            {assetMarketData.change24h.toFixed(2)}%
                          </Badge>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">Quantidade:</span>
                          <p className="font-medium text-foreground">
                            {asset.amount.toLocaleString('pt-BR', { maximumFractionDigits: 8 })}
                          </p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Valor:</span>
                          <p className="font-medium text-foreground">
                            R$ {asset.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <EmptyState
                icon={<Wallet className="w-16 h-16 text-muted-foreground" />}
                title="Nenhum ativo disponível"
                description="Você não possui ativos para vender."
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
                <TrendingDown className="w-4 h-4 mr-2" />
                Ver Preços
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Clock className="w-4 h-4 mr-2" />
                Histórico de Vendas
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <DollarSign className="w-4 h-4 mr-2" />
                Configurar PIX
              </Button>
            </div>
          </Card>

          {/* Portfolio Summary */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Resumo do Portfolio
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Valor Total:</span>
                <span className="text-sm font-medium text-foreground">
                  R$ {portfolioData.currentValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">P&L Total:</span>
                <span className={`text-sm font-medium ${
                  portfolioData.profitLoss >= 0 ? 'text-success' : 'text-destructive'
                }`}>
                  {portfolioData.profitLoss >= 0 ? '+' : ''}
                  R$ {portfolioData.profitLoss.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Ativos:</span>
                <span className="text-sm font-medium text-foreground">
                  {availableAssets.length}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}