'use client';

import { useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeProvider';
import { Button } from '@/components/ui/Button';
import { BarChart3, LineChart, PieChart, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function V2DemoPage() {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme('financial');
  }, [setTheme]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="text-foreground">Dashboard</span>
                <br />
                <span className="text-primary">Financeiro</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Modelo Financial - Interface profissional em azul e verde.
                Dashboard completo com análises e gráficos avançados.
              </p>
              <div className="flex gap-4">
                <Link href="/register">
                  <Button variant="primary" size="lg">
                    Criar Conta
                    <TrendingUp className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/dashboard-temp?theme=financial">
                  <Button variant="outline" size="lg">
                    Explorar Dashboard
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 blur-3xl" />
              <div className="relative bg-card border border-border rounded-lg p-8">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-success/10 p-4 rounded">
                    <BarChart3 className="h-8 w-8 text-success mb-2" />
                    <p className="text-sm text-muted-foreground">Volume</p>
                    <p className="text-xl font-bold">R$ 2.4M</p>
                  </div>
                  <div className="bg-primary/10 p-4 rounded">
                    <LineChart className="h-8 w-8 text-primary mb-2" />
                    <p className="text-sm text-muted-foreground">Crescimento</p>
                    <p className="text-xl font-bold">+18.2%</p>
                  </div>
                </div>
                <div className="h-32 bg-muted/20 rounded flex items-center justify-center">
                  <PieChart className="h-16 w-16 text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Recursos do Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg border border-border">
              <BarChart3 className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Análises Completas</h3>
              <p className="text-muted-foreground">
                Gráficos interativos e relatórios detalhados de performance
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <LineChart className="h-12 w-12 text-success mb-4" />
              <h3 className="text-xl font-bold mb-2">Indicadores em Tempo Real</h3>
              <p className="text-muted-foreground">
                Acompanhe mercado, fear & greed index e métricas on-chain
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <PieChart className="h-12 w-12 text-warning mb-4" />
              <h3 className="text-xl font-bold mb-2">Portfolio Inteligente</h3>
              <p className="text-muted-foreground">
                Visualização clara da distribuição e performance dos ativos
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}