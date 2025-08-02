'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  CreditCard, 
  Plus, 
  Trash2, 
  CheckCircle,
  XCircle,
  Mail,
  Phone,
  Hash,
  User,
  Copy,
  Edit
} from 'lucide-react';

export default function PIXPage() {
  const { user } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPixKey, setNewPixKey] = useState({ type: 'CPF', key: '', name: '' });
  
  const pixKeys = user?.pixKeys || [];

  const pixKeyTypes = [
    { value: 'CPF', label: 'CPF', icon: User },
    { value: 'EMAIL', label: 'Email', icon: Mail },
    { value: 'PHONE', label: 'Telefone', icon: Phone },
    { value: 'RANDOM', label: 'Chave Aleatória', icon: Hash },
  ];

  const getKeyIcon = (type: string) => {
    const keyType = pixKeyTypes.find(t => t.value === type);
    return keyType?.icon || Hash;
  };

  const handleAddPixKey = () => {
    console.log('Adding PIX key:', newPixKey);
    setShowAddForm(false);
    setNewPixKey({ type: 'CPF', key: '', name: '' });
  };

  const handleDeletePixKey = (keyId: string) => {
    console.log('Deleting PIX key:', keyId);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Chaves PIX</h1>
          <p className="text-muted-foreground">
            Gerencie suas chaves PIX para receber pagamentos
          </p>
        </div>
        
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Chave PIX
        </Button>
      </div>

      {/* PIX Keys List */}
      {pixKeys.length > 0 ? (
        <div className="space-y-4">
          {pixKeys.map((pixKey) => {
            const Icon = getKeyIcon(pixKey.type);
            
            return (
              <Card key={pixKey.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-foreground">
                          {pixKey.name || pixKeyTypes.find(t => t.value === pixKey.type)?.label}
                        </h3>
                        <Badge variant={pixKey.verified ? 'success' : 'warning'}>
                          {pixKey.verified ? 'Verificada' : 'Pendente'}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <p className="text-sm text-muted-foreground font-mono">
                          {pixKey.type === 'CPF' ? pixKey.key.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.***.***-$4') : pixKey.key}
                        </p>
                        <button
                          onClick={() => copyToClipboard(pixKey.key)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <p className="text-xs text-muted-foreground mt-1">
                        Criada em {new Date(pixKey.createdAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeletePixKey(pixKey.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="p-8 text-center">
          <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold text-foreground mb-2">Nenhuma chave PIX cadastrada</h3>
          <p className="text-muted-foreground mb-4">
            Adicione suas chaves PIX para facilitar o recebimento de pagamentos
          </p>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Primeira Chave
          </Button>
        </Card>
      )}

      {/* Add PIX Key Form */}
      {showAddForm && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Nova Chave PIX</h2>
            <Button variant="ghost" onClick={() => setShowAddForm(false)}>×</Button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Tipo da Chave
              </label>
              <select
                value={newPixKey.type}
                onChange={(e) => setNewPixKey(prev => ({ ...prev, type: e.target.value as any }))}
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
              >
                {pixKeyTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Chave PIX
              </label>
              <Input
                value={newPixKey.key}
                onChange={(e) => setNewPixKey(prev => ({ ...prev, key: e.target.value }))}
                placeholder={
                  newPixKey.type === 'CPF' ? '000.000.000-00' :
                  newPixKey.type === 'EMAIL' ? 'email@exemplo.com' :
                  newPixKey.type === 'PHONE' ? '(11) 99999-9999' :
                  'Chave gerada automaticamente'
                }
                disabled={newPixKey.type === 'RANDOM'}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Nome (opcional)
              </label>
              <Input
                value={newPixKey.name}
                onChange={(e) => setNewPixKey(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Nome para identificar esta chave"
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddPixKey}>
                Adicionar Chave
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* PIX Information */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Sobre o PIX</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-foreground mb-3">Tipos de Chave</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start space-x-2">
                <User className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">CPF</p>
                  <p className="text-muted-foreground">Use seu CPF como chave PIX</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Mail className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Email</p>
                  <p className="text-muted-foreground">Use seu email como chave PIX</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Phone className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Telefone</p>
                  <p className="text-muted-foreground">Use seu telefone como chave PIX</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Hash className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Chave Aleatória</p>
                  <p className="text-muted-foreground">Chave gerada automaticamente</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-foreground mb-3">Vantagens</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Recebimento instantâneo</li>
              <li>• Disponível 24/7</li>
              <li>• Sem taxas adicionais</li>
              <li>• Fácil de usar</li>
              <li>• Maior segurança</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}