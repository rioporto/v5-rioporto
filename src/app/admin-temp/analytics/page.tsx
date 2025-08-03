'use client';

import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/shared/EmptyState';
import { BarChart3 } from 'lucide-react';

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground">Análise detalhada de dados da plataforma</p>
      </div>

      <Card className="p-8">
        <EmptyState
          icon={<BarChart3 className="w-16 h-16 text-muted-foreground" />}
          title="Analytics em Desenvolvimento"
          description="Gráficos e relatórios detalhados serão implementados em breve."
        />
      </Card>
    </div>
  );
}