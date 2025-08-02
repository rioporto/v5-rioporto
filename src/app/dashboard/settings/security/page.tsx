'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Shield, 
  Key, 
  Smartphone, 
  Eye, 
  EyeOff,
  QrCode,
  Copy,
  Check,
  AlertTriangle,
  Lock,
  Unlock
} from 'lucide-react';

export default function SecurityPage() {
  const { user } = useAuth();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [show2FASetup, setShow2FASetup] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password change logic
    console.log('Changing password...');
  };

  const handleEnable2FA = () => {
    setShow2FASetup(true);
  };

  const handleDisable2FA = () => {
    // Handle 2FA disable logic
    console.log('Disabling 2FA...');
  };

  const copySecretKey = () => {
    navigator.clipboard.writeText('JBSWY3DPEHPK3PXP');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const securityMethods = [
    {
      title: 'Autenticação de Dois Fatores (2FA)',
      description: 'Adicione uma camada extra de segurança à sua conta',
      icon: Smartphone,
      status: 'inactive',
      action: 'Ativar',
      onClick: handleEnable2FA,
    },
    {
      title: 'Senha da Conta',
      description: 'Altere sua senha regularmente para manter a segurança',
      icon: Key,
      status: 'active',
      action: 'Alterar',
      onClick: () => {},
    },
    {
      title: 'Sessões Ativas',
      description: 'Gerencie dispositivos conectados à sua conta',
      icon: Shield,
      status: 'active',
      action: 'Gerenciar',
      onClick: () => {},
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Segurança</h1>
          <p className="text-muted-foreground">
            Proteja sua conta com configurações de segurança avançadas
          </p>
        </div>
      </div>

      {/* Security Status */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">
            Status de Segurança
          </h2>
          <Badge variant="success" className="flex items-center space-x-1">
            <Shield className="w-3 h-3" />
            <span>Forte</span>
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-success/10 rounded-full">
              <Check className="w-4 h-4 text-success" />
            </div>
            <div>
              <p className="font-medium text-foreground">Email Verificado</p>
              <p className="text-sm text-muted-foreground">Conta confirmada</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-warning/10">
              {false ? (
                <Check className="w-4 h-4 text-success" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-warning" />
              )}
            </div>
            <div>
              <p className="font-medium text-foreground">2FA</p>
              <p className="text-sm text-muted-foreground">
                Não configurado
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2 bg-success/10 rounded-full">
              <Lock className="w-4 h-4 text-success" />
            </div>
            <div>
              <p className="font-medium text-foreground">Senha Segura</p>
              <p className="text-sm text-muted-foreground">Última alteração: 30 dias</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Security Methods */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {securityMethods.map((method, index) => {
          const Icon = method.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <Badge variant={method.status === 'active' ? 'success' : 'default'}>
                  {method.status === 'active' ? 'Ativo' : 'Inativo'}
                </Badge>
              </div>
              
              <h3 className="font-semibold text-foreground mb-2">
                {method.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {method.description}
              </p>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={method.onClick}
              >
                {method.action}
              </Button>
            </Card>
          );
        })}
      </div>

      {/* Change Password */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Alterar Senha
        </h2>
        
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Senha atual
              </label>
              <div className="relative">
                <Input
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm(prev => ({ 
                    ...prev, 
                    currentPassword: e.target.value 
                  }))}
                  placeholder="Digite sua senha atual"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showCurrentPassword ? (
                    <EyeOff className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Nova senha
              </label>
              <div className="relative">
                <Input
                  type={showNewPassword ? 'text' : 'password'}
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm(prev => ({ 
                    ...prev, 
                    newPassword: e.target.value 
                  }))}
                  placeholder="Digite sua nova senha"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showNewPassword ? (
                    <EyeOff className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Confirmar nova senha
              </label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm(prev => ({ 
                    ...prev, 
                    confirmPassword: e.target.value 
                  }))}
                  placeholder="Confirme sua nova senha"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit">
              Alterar Senha
            </Button>
          </div>
        </form>
      </Card>

      {/* 2FA Setup Modal */}
      {show2FASetup && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">
              Configurar Autenticação de Dois Fatores
            </h2>
            <Button 
              variant="ghost" 
              onClick={() => setShow2FASetup(false)}
            >
              ×
            </Button>
          </div>

          <div className="space-y-6">
            <div className="text-center">
              <div className="w-48 h-48 bg-muted/50 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <QrCode className="w-24 h-24 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                Escaneie este QR Code com seu app autenticador
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Ou insira manualmente esta chave:
              </label>
              <div className="flex items-center space-x-2">
                <Input
                  value="JBSWY3DPEHPK3PXP"
                  readOnly
                  className="font-mono"
                />
                <Button
                  variant="outline"
                  onClick={copySecretKey}
                  className="flex-shrink-0"
                >
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Digite o código do seu app autenticador:
              </label>
              <Input
                placeholder="000000"
                maxLength={6}
                className="text-center font-mono text-lg"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setShow2FASetup(false)}
              >
                Cancelar
              </Button>
              <Button>
                Ativar 2FA
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Security Tips */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Dicas de Segurança
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="p-1 bg-primary/10 rounded-full flex-shrink-0 mt-1">
                <Shield className="w-3 h-3 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Use senhas fortes</p>
                <p className="text-sm text-muted-foreground">
                  Combine letras, números e símbolos especiais
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-1 bg-primary/10 rounded-full flex-shrink-0 mt-1">
                <Smartphone className="w-3 h-3 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Ative o 2FA</p>
                <p className="text-sm text-muted-foreground">
                  Adicione uma camada extra de proteção
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="p-1 bg-primary/10 rounded-full flex-shrink-0 mt-1">
                <AlertTriangle className="w-3 h-3 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Cuidado com phishing</p>
                <p className="text-sm text-muted-foreground">
                  Sempre verifique a URL antes de fazer login
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-1 bg-primary/10 rounded-full flex-shrink-0 mt-1">
                <Lock className="w-3 h-3 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Mantenha dados privados</p>
                <p className="text-sm text-muted-foreground">
                  Nunca compartilhe suas credenciais
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}