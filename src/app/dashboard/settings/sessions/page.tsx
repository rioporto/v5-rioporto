'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Monitor, 
  Smartphone, 
  Tablet,
  MapPin,
  Clock,
  Shield,
  X,
  AlertCircle
} from 'lucide-react';

interface Session {
  id: string;
  device: string;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  ip: string;
  location: string;
  lastActive: string;
  current: boolean;
}

export default function SessionsPage() {
  const [sessions] = useState<Session[]>([
    {
      id: '1',
      device: 'Windows 11 - Chrome',
      deviceType: 'desktop',
      browser: 'Chrome 119.0.0.0',
      ip: '192.168.1.100',
      location: 'São Paulo, Brasil',
      lastActive: '2024-01-15T10:30:00Z',
      current: true,
    },
    {
      id: '2',
      device: 'iPhone 15 Pro',
      deviceType: 'mobile',
      browser: 'Safari Mobile',
      ip: '192.168.1.101',
      location: 'São Paulo, Brasil',
      lastActive: '2024-01-15T08:15:00Z',
      current: false,
    },
    {
      id: '3',
      device: 'iPad Air',
      deviceType: 'tablet',
      browser: 'Safari Mobile',
      ip: '192.168.1.102',
      location: 'São Paulo, Brasil',
      lastActive: '2024-01-14T22:45:00Z',
      current: false,
    },
  ]);

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'mobile':
        return Smartphone;
      case 'tablet':
        return Tablet;
      default:
        return Monitor;
    }
  };

  const handleRevokeSession = (sessionId: string) => {
    console.log('Revoking session:', sessionId);
  };

  const handleRevokeAllSessions = () => {
    console.log('Revoking all sessions except current');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sessões Ativas</h1>
          <p className="text-muted-foreground">
            Gerencie dispositivos conectados à sua conta
          </p>
        </div>
        
        <Button variant="danger" onClick={handleRevokeAllSessions}>
          Encerrar Todas as Sessões
        </Button>
      </div>

      {/* Security Notice */}
      <Card className="p-4 border-warning/20 bg-warning/5">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-warning mb-1">
              Importante
            </h3>
            <p className="text-sm text-muted-foreground">
              Se você não reconhece alguma sessão, encerre-a imediatamente e altere sua senha. 
              Sempre verifique se está acessando de dispositivos seguros.
            </p>
          </div>
        </div>
      </Card>

      {/* Sessions List */}
      <div className="space-y-4">
        {sessions.map((session) => {
          const DeviceIcon = getDeviceIcon(session.deviceType);
          
          return (
            <Card key={session.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <DeviceIcon className="w-6 h-6 text-primary" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-foreground">
                        {session.device}
                      </h3>
                      {session.current && (
                        <Badge variant="success">Sessão Atual</Badge>
                      )}
                    </div>
                    
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4" />
                        <span>{session.browser}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{session.location} • {session.ip}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>
                          Último acesso: {new Date(session.lastActive).toLocaleString('pt-BR')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {!session.current && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRevokeSession(session.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Encerrar
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Session Statistics */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Estatísticas de Sessões
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Monitor className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Sessões ativas</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {sessions.length}
            </p>
          </div>

          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Última atividade</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              Agora
            </p>
          </div>

          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Dispositivos únicos</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {new Set(sessions.map(s => s.device)).size}
            </p>
          </div>
        </div>
      </Card>

      {/* Security Tips */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Dicas de Segurança para Sessões
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="font-medium text-foreground">Boas Práticas</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Sempre faça logout de dispositivos públicos</li>
              <li>• Revise suas sessões ativas regularmente</li>
              <li>• Use dispositivos confiáveis sempre que possível</li>
              <li>• Mantenha seus navegadores atualizados</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-medium text-foreground">Sinais de Alerta</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Sessões de locais desconhecidos</li>
              <li>• Dispositivos que você não reconhece</li>
              <li>• Atividade suspeita em horários incomuns</li>
              <li>• Múltiplas sessões simultâneas inesperadas</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}