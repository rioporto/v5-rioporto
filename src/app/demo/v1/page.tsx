'use client';

import { useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeProvider';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Bitcoin, Shield, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function V1DemoPage() {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme('minimalist');
  }, [setTheme]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="text-foreground">Bitcoin</span>
                <br />
                <span className="text-primary">P2P Exchange</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Modelo Minimalista - Design elegante em preto, dourado e branco.
                Interface limpa e sofisticada para trading P2P.
              </p>
              <div className="flex gap-4">
                <Link href="/register">
                  <Button variant="primary" size="lg" className="bg-primary text-primary-foreground">
                    Começar Agora
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/dashboard?theme=minimalist">
                  <Button variant="outline" size="lg">
                    Ver Dashboard
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 blur-3xl" />
              <div className="relative bg-card border border-border rounded-lg p-8">
                <Bitcoin className="h-32 w-32 mx-auto text-primary mb-6" />
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">BTC/BRL</span>
                    <span className="text-foreground font-bold">R$ 350.420,00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Volume 24h</span>
                    <span className="text-primary">+12.5%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Características do Modelo</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg border border-border">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Design Premium</h3>
              <p className="text-muted-foreground">
                Paleta minimalista com preto profundo, dourado elegante e branco puro
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <TrendingUp className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Interface Limpa</h3>
              <p className="text-muted-foreground">
                Foco na usabilidade com elementos essenciais e navegação intuitiva
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <Bitcoin className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Trading Simplificado</h3>
              <p className="text-muted-foreground">
                Experiência de compra e venda otimizada para máxima eficiência
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}