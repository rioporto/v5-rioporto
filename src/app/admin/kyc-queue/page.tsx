'use client';

import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/shared/EmptyState';
import { Shield } from 'lucide-react';

export default function AdminKYCQueuePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Fila de Verificação KYC</h1>
        <p className="text-muted-foreground">Gerencie solicitações de verificação de identidade</p>
      </div>

      <Card className="p-8">
        <EmptyState
          icon={<Shield className="w-16 h-16 text-muted-foreground" />}
          title="Fila KYC em Desenvolvimento"
          description="Sistema de verificação KYC será implementado em breve."
        />
      </Card>
    </div>
  );
}