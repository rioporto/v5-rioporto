'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Shield, 
  Edit, 
  Save,
  Camera,
  MapPin
} from 'lucide-react';

export default function SettingsPage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    cpf: '',
  });

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving user data:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: '',
      cpf: '',
    });
    setIsEditing(false);
  };

  if (!user) return null;

  const getKycLevelBadge = (level: number) => {
    const configs = {
      0: { variant: 'default' as const, label: 'Não verificado', color: 'text-muted-foreground' },
      1: { variant: 'warning' as const, label: 'Básico', color: 'text-warning' },
      2: { variant: 'default' as const, label: 'Intermediário', color: 'text-blue-500' },
      3: { variant: 'success' as const, label: 'Completo', color: 'text-success' },
    };
    
    return configs[level as keyof typeof configs] || configs[0];
  };

  const kycConfig = getKycLevelBadge(user.kycLevel);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
          <p className="text-muted-foreground">
            Gerencie suas informações pessoais e preferências
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                Informações Pessoais
              </h2>
              {!isEditing ? (
                <Button variant="outline" onClick={() => setIsEditing(true)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={handleCancel}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSave}>
                    <Save className="w-4 h-4 mr-2" />
                    Salvar
                  </Button>
                </div>
              )}
            </div>

            {/* Avatar Section */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative">
                <Avatar
                  src={user.avatar}
                  alt={user.name}
                  size="lg"
                  fallback={user.name.charAt(0).toUpperCase()}
                />
                {isEditing && (
                  <button className="absolute -bottom-1 -right-1 p-1.5 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors">
                    <Camera className="w-3 h-3" />
                  </button>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <Badge variant={kycConfig.variant} className="mt-1">
                  KYC {kycConfig.label}
                </Badge>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nome completo
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Telefone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    disabled={!isEditing}
                    className="pl-10"
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  CPF
                </label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    value={formData.cpf}
                    onChange={(e) => setFormData(prev => ({ ...prev, cpf: e.target.value }))}
                    disabled={true} // CPF geralmente não pode ser editado
                    className="pl-10"
                    placeholder="***.***.***-**"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Account Stats */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Estatísticas da Conta
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Membro desde</span>
                </div>
                <p className="font-semibold text-foreground">
                  {new Date(user.createdAt).toLocaleDateString('pt-BR', { 
                    year: 'numeric', 
                    month: 'long' 
                  })}
                </p>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Nível KYC</span>
                </div>
                <p className={`font-semibold ${kycConfig.color}`}>
                  Nível {user.kycLevel} - {kycConfig.label}
                </p>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Tipo de conta</span>
                </div>
                <p className="font-semibold text-foreground capitalize">
                  {user.role.toLowerCase()}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="p-4">
            <h3 className="font-semibold text-foreground mb-4">Ações Rápidas</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Shield className="w-4 h-4 mr-2" />
                Configurar 2FA
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MapPin className="w-4 h-4 mr-2" />
                Verificar KYC
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Phone className="w-4 h-4 mr-2" />
                Adicionar PIX
              </Button>
            </div>
          </Card>

          {/* Security Status */}
          <Card className="p-4">
            <h3 className="font-semibold text-foreground mb-4">Status de Segurança</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Email verificado</span>
                <Badge variant={user.isVerified ? 'success' : 'error'}>
                  {user.isVerified ? 'Sim' : 'Não'}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">2FA ativado</span>
                <Badge variant="error">
                  Não
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">KYC completo</span>
                <Badge variant={user.kycLevel >= 2 ? 'success' : 'warning'}>
                  {user.kycLevel >= 2 ? 'Sim' : 'Pendente'}
                </Badge>
              </div>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-4">
            <h3 className="font-semibold text-foreground mb-4">Atividade Recente</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Último login</span>
                <span className="text-foreground">Hoje às 14:30</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Última transação</span>
                <span className="text-foreground">2 dias atrás</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Perfil atualizado</span>
                <span className="text-foreground">1 semana atrás</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}