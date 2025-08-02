'use client';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/shared/EmptyState';
import { FileText } from 'lucide-react';

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Gerenciar Ordens</h1>
        <p className="text-muted-foreground">Acompanhe e gerencie todas as ordens da plataforma</p>
      </div>

      <Card className="p-8">
        <EmptyState
          icon={<FileText className="w-16 h-16 text-muted-foreground" />}
          title="Em Desenvolvimento"
          description="O gerenciamento de ordens será implementado em breve."
        />
      </Card>
    </div>
  );
}