'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { useAuth } from '@/contexts/AuthContext';
import { 
  FileCheck, 
  Upload, 
  CheckCircle, 
  Clock,
  XCircle,
  AlertCircle,
  Camera,
  CreditCard,
  Home,
  User
} from 'lucide-react';
import { kycLevelsData } from '@/lib/mock-data';

export default function KYCPage() {
  const { user } = useAuth();
  const [selectedLevel, setSelectedLevel] = useState(user?.kycLevel || 0);
  
  const currentLevel = user?.kycLevel || 0;
  const progress = (currentLevel / 3) * 100;

  const documentTypes = [
    { type: 'CPF', icon: CreditCard, label: 'Documento de CPF', required: true },
    { type: 'RG', icon: User, label: 'RG ou CNH', required: true },
    { type: 'SELFIE', icon: Camera, label: 'Selfie com documento', required: true },
    { type: 'PROOF_OF_ADDRESS', icon: Home, label: 'Comprovante de endereço', required: false },
  ];

  const getStatusBadge = (level: number) => {
    if (level <= currentLevel) {
      return <Badge variant="success">Completo</Badge>;
    }
    return <Badge variant="default">Pendente</Badge>;
  };

  const getStatusIcon = (level: number) => {
    if (level < currentLevel) return <CheckCircle className="w-5 h-5 text-success" />;
    if (level === currentLevel) return <Clock className="w-5 h-5 text-warning" />;
    return <AlertCircle className="w-5 h-5 text-muted-foreground" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Verificação KYC</h1>
          <p className="text-muted-foreground">
            Complete sua verificação para aumentar seus limites de negociação
          </p>
        </div>
      </div>

      {/* Current Status */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Status Atual</h2>
          <Badge variant={currentLevel >= 2 ? 'success' : 'warning'}>
            Nível {currentLevel}
          </Badge>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">Progresso da verificação</span>
              <span className="text-sm font-medium text-foreground">{progress.toFixed(0)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <p className="text-sm text-muted-foreground">
            {currentLevel === 0 && 'Inicie sua verificação enviando seus documentos'}
            {currentLevel === 1 && 'Verificação básica completa. Envie mais documentos para aumentar seus limites'}
            {currentLevel === 2 && 'Verificação intermediária completa. Um documento adicional pode liberar limites máximos'}
            {currentLevel === 3 && 'Verificação completa! Você tem acesso a todos os recursos'}
          </p>
        </div>
      </Card>

      {/* KYC Levels */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kycLevelsData.map((level) => (
          <Card key={level.level} className={`p-4 cursor-pointer transition-colors ${
            selectedLevel === level.level ? 'border-primary bg-primary/5' : ''
          }`} onClick={() => setSelectedLevel(level.level)}>
            <div className="flex items-center justify-between mb-3">
              {getStatusIcon(level.level)}
              {getStatusBadge(level.level)}
            </div>
            
            <h3 className="font-semibold text-foreground mb-1">
              Nível {level.level}
            </h3>
            <p className="text-xs text-muted-foreground mb-3">
              {level.name}
            </p>
            
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Compra diária:</span>
                <span className="font-medium text-foreground">
                  R$ {level.limits.buyDaily.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Venda diária:</span>
                <span className="font-medium text-foreground">
                  R$ {level.limits.sellDaily.toLocaleString()}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Selected Level Details */}
      {selectedLevel !== undefined && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            {kycLevelsData[selectedLevel].name} - Nível {selectedLevel}
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-foreground mb-3">Requisitos</h3>
              <ul className="space-y-2">
                {kycLevelsData[selectedLevel].requirements.map((req, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-foreground mb-3">Benefícios</h3>
              <ul className="space-y-2">
                {kycLevelsData[selectedLevel].benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium text-foreground mb-2">Limites de Negociação</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Compra diária:</span>
                <p className="font-semibold text-foreground">
                  R$ {kycLevelsData[selectedLevel].limits.buyDaily.toLocaleString()}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Compra mensal:</span>
                <p className="font-semibold text-foreground">
                  R$ {kycLevelsData[selectedLevel].limits.buyMonthly.toLocaleString()}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Venda diária:</span>
                <p className="font-semibold text-foreground">
                  R$ {kycLevelsData[selectedLevel].limits.sellDaily.toLocaleString()}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Venda mensal:</span>
                <p className="font-semibold text-foreground">
                  R$ {kycLevelsData[selectedLevel].limits.sellMonthly.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Document Upload */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Envio de Documentos
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documentTypes.map((doc) => {
            const Icon = doc.icon;
            return (
              <div key={doc.type} className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium text-foreground">{doc.label}</span>
                  </div>
                  {doc.required && (
                    <Badge variant="destructive" className="text-xs">Obrigatório</Badge>
                  )}
                </div>
                
                <Button variant="outline" className="w-full" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Enviar Documento
                </Button>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}