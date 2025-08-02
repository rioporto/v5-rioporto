'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { 
  Wallet, 
  Plus, 
  Trash2, 
  Eye,
  EyeOff,
  Copy,
  QrCode,
  ExternalLink,
  AlertCircle
} from 'lucide-react';

interface WalletAddress {
  id: string;
  network: string;
  address: string;
  label?: string;
  balance: number;
  verified: boolean;
  createdAt: string;
}

export default function WalletsPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showPrivateKeys, setShowPrivateKeys] = useState<Record<string, boolean>>({});
  const [newWallet, setNewWallet] = useState({ network: 'Bitcoin', address: '', label: '' });
  
  const [wallets] = useState<WalletAddress[]>([
    {
      id: '1',
      network: 'Bitcoin',
      address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      label: 'Carteira Principal BTC',
      balance: 0.05234,
      verified: true,
      createdAt: '2024-01-10T10:00:00Z',
    },
    {
      id: '2',
      network: 'Ethereum',
      address: '0x742d35Cc6634C0532925a3b8D0Ac3d7e85â¦',
      label: 'Carteira ETH',
      balance: 1.234,
      verified: true,
      createdAt: '2024-01-12T14:30:00Z',
    },
  ]);

  const networks = [
    'Bitcoin', 'Ethereum', 'Polygon', 'BSC', 'Cardano', 'Solana'
  ];

  const togglePrivateKey = (walletId: string) => {
    setShowPrivateKeys(prev => ({
      ...prev,
      [walletId]: !prev[walletId]
    }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleAddWallet = () => {
    console.log('Adding wallet:', newWallet);
    setShowAddForm(false);
    setNewWallet({ network: 'Bitcoin', address: '', label: '' });
  };

  const handleDeleteWallet = (walletId: string) => {
    console.log('Deleting wallet:', walletId);
  };

  const getNetworkColor = (network: string) => {
    const colors: Record<string, string> = {
      Bitcoin: 'text-orange-500',
      Ethereum: 'text-blue-500',
      Polygon: 'text-purple-500',
      BSC: 'text-yellow-500',
      Cardano: 'text-green-500',
      Solana: 'text-pink-500',
    };
    return colors[network] || 'text-muted-foreground';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Carteiras</h1>
          <p className="text-muted-foreground">
            Gerencie seus endereços de carteiras para depósitos e saques
          </p>
        </div>
        
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Carteira
        </Button>
      </div>

      {/* Security Warning */}
      <Card className="p-4 border-warning/20 bg-warning/5">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-warning mb-1">Segurança Importante</h3>
            <p className="text-sm text-muted-foreground">
              Sempre verifique os endereços antes de enviar fundos. 
              Guarde suas chaves privadas em local seguro e nunca as compartilhe.
            </p>
          </div>
        </div>
      </Card>

      {/* Wallets List */}
      {wallets.length > 0 ? (
        <div className="space-y-4">
          {wallets.map((wallet) => (
            <Card key={wallet.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Wallet className="w-6 h-6 text-primary" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-foreground">
                        {wallet.label || `Carteira ${wallet.network}`}
                      </h3>
                      <Badge variant={wallet.verified ? 'success' : 'warning'}>
                        {wallet.verified ? 'Verificada' : 'Pendente'}
                      </Badge>
                      <Badge variant="outline" className={getNetworkColor(wallet.network)}>
                        {wallet.network}
                      </Badge>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-mono text-muted-foreground">
                          {wallet.address}
                        </p>
                        <button
                          onClick={() => copyToClipboard(wallet.address)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <p className="text-xs text-muted-foreground">
                        Adicionada em {new Date(wallet.createdAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-lg font-bold text-foreground">
                    {wallet.balance} {wallet.network === 'Bitcoin' ? 'BTC' : wallet.network === 'Ethereum' ? 'ETH' : wallet.network}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    ≈80% do portfolio
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <QrCode className="w-4 h-4 mr-1" />
                    QR Code
                  </Button>
                  
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Explorer
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => togglePrivateKey(wallet.id)}
                  >
                    {showPrivateKeys[wallet.id] ? (
                      <EyeOff className="w-4 h-4 mr-1" />
                    ) : (
                      <Eye className="w-4 h-4 mr-1" />
                    )}
                    Chave Privada
                  </Button>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleDeleteWallet(wallet.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              {showPrivateKeys[wallet.id] && (
                <div className="mt-4 p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-destructive">Chave Privada</span>
                    <button
                      onClick={() => copyToClipboard('5KJvsngHeMpm884wtkJNzQGaCErckhHJBGFsvd3VyK5qMZXj3hS')}
                      className="text-destructive hover:text-destructive/80"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm font-mono bg-background p-2 rounded border text-foreground">
                    5KJvsngHeMpm884wtkJNzQGaCErckhHJBGFsvd3VyK5qMZXj3hS
                  </p>
                  <p className="text-xs text-destructive mt-2">
                    ⚠️ Mantenha esta informação segura e nunca a compartilhe!
                  </p>
                </div>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-8 text-center">
          <Wallet className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold text-foreground mb-2">Nenhuma carteira cadastrada</h3>
          <p className="text-muted-foreground mb-4">
            Adicione suas carteiras para gerenciar depósitos e saques
          </p>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Primeira Carteira
          </Button>
        </Card>
      )}

      {/* Add Wallet Form */}
      {showAddForm && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Nova Carteira</h2>
            <Button variant="ghost" onClick={() => setShowAddForm(false)}>×</Button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Rede/Blockchain
              </label>
              <select
                value={newWallet.network}
                onChange={(e) => setNewWallet(prev => ({ ...prev, network: e.target.value }))}
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
              >
                {networks.map((network) => (
                  <option key={network} value={network}>
                    {network}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Endereço da Carteira
              </label>
              <Input
                value={newWallet.address}
                onChange={(e) => setNewWallet(prev => ({ ...prev, address: e.target.value }))}
                placeholder="Cole o endereço da sua carteira aqui"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Nome/Rótulo (opcional)
              </label>
              <Input
                value={newWallet.label}
                onChange={(e) => setNewWallet(prev => ({ ...prev, label: e.target.value }))}
                placeholder="Nome para identificar esta carteira"
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddWallet}>
                Adicionar Carteira
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Wallet Statistics */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Estatísticas</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Total de Carteiras</p>
            <p className="text-2xl font-bold text-foreground">{wallets.length}</p>
          </div>
          
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Carteiras Verificadas</p>
            <p className="text-2xl font-bold text-foreground">
              {wallets.filter(w => w.verified).length}
            </p>
          </div>
          
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Redes Suportadas</p>
            <p className="text-2xl font-bold text-foreground">
              {new Set(wallets.map(w => w.network)).size}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}