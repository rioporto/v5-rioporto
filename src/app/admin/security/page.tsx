'use client';

import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/shared/EmptyState';
import { Settings } from 'lucide-react';

export default function AdminSecurityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Configurações de Segurança</h1>
        <p className="text-muted-foreground">Gerencie configurações de segurança da plataforma</p>
      </div>

      <Card className="p-8">
        <EmptyState
          icon={Settings}
          title="Configurações em Desenvolvimento"
          description="Painel de segurança administrativo será implementado em breve."
        />
      </Card>
    </div>
  );
}