'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';
import { Calculator, TrendingUp, TrendingDown } from 'lucide-react';

interface OrderFormProps {
  className?: string;
}

export function OrderForm({ className }: OrderFormProps) {
  const [orderType, setOrderType] = useState<'BUY' | 'SELL'>('BUY');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [crypto, setCrypto] = useState('BTC');
  const [orderTypeValue, setOrderTypeValue] = useState('market');

  const total = parseFloat(amount || '0') * parseFloat(price || '0');

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Nova Ordem</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup value={orderType} onValueChange={(value) => setOrderType(value as 'BUY' | 'SELL')}>
          <div className="grid grid-cols-2 gap-4">
            <div className={`border rounded-lg p-4 cursor-pointer transition-colors ${orderType === 'BUY' ? 'border-green-500 bg-green-500/10' : 'border-border'}`}>
              <RadioGroupItem value="BUY" id="buy" className="sr-only" />
              <label htmlFor="buy" className="flex items-center justify-center gap-2 cursor-pointer">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <span className="font-medium">Comprar</span>
              </label>
            </div>
            <div className={`border rounded-lg p-4 cursor-pointer transition-colors ${orderType === 'SELL' ? 'border-red-500 bg-red-500/10' : 'border-border'}`}>
              <RadioGroupItem value="SELL" id="sell" className="sr-only" />
              <label htmlFor="sell" className="flex items-center justify-center gap-2 cursor-pointer">
                <TrendingDown className="h-5 w-5 text-red-500" />
                <span className="font-medium">Vender</span>
              </label>
            </div>
          </div>
        </RadioGroup>

        <div className="space-y-2">
          <Label>Criptomoeda</Label>
          <Select 
            value={crypto} 
            onChange={(e) => setCrypto(e.target.value)}
            options={[
              { value: 'BTC', label: 'Bitcoin (BTC)' },
              { value: 'ETH', label: 'Ethereum (ETH)' },
              { value: 'USDT', label: 'Tether (USDT)' },
              { value: 'BNB', label: 'Binance Coin (BNB)' }
            ]}
          />
        </div>

        <div className="space-y-2">
          <Label>Quantidade</Label>
          <Input
            type="number"
            step="0.00000001"
            placeholder="0.00000000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Preço por {crypto}</Label>
          <Input
            type="number"
            step="0.01"
            placeholder="0.00"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Tipo de Ordem</Label>
          <Select 
            value={orderTypeValue} 
            onChange={(e) => setOrderTypeValue(e.target.value)}
            options={[
              { value: 'market', label: 'Mercado' },
              { value: 'limit', label: 'Limite' },
              { value: 'stop', label: 'Stop' },
              { value: 'stop-limit', label: 'Stop Limit' }
            ]}
          />
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="text-2xl font-bold font-mono">R$ {total.toLocaleString()}</span>
          </div>
          <Button 
            className="w-full" 
            variant={orderType === 'BUY' ? 'primary' : 'danger'}
            size="lg"
          >
            <Calculator className="h-5 w-5 mr-2" />
            {orderType === 'BUY' ? 'Comprar' : 'Vender'} {crypto}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}