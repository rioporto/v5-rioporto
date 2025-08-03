'use client';

import { useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeProvider';
import { Button } from '@/components/ui/Button';
import { Building2, Shield, Award, Briefcase } from 'lucide-react';
import Link from 'next/link';

export default function V4DemoPage() {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme('institutional');
  }, [setTheme]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="text-foreground">Plataforma</span>
                <br />
                <span className="text-primary">Institucional</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Modelo Institucional - Design corporativo em azul marinho e cinza.
                Interface profissional para investidores e empresas.
              </p>
              <div className="flex gap-4">
                <Link href="/register">
                  <Button variant="primary" size="lg">
                    <Briefcase className="mr-2 h-4 w-4" />
                    Abrir Conta Corporativa
                  </Button>
                </Link>
                <Link href="/dashboard-temp?theme=institutional">
                  <Button variant="outline" size="lg">
                    Acessar Plataforma
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative bg-card border border-border rounded-lg p-8 shadow-lg">
                <Building2 className="h-32 w-32 mx-auto text-primary mb-6" />
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <p className="text-sm text-muted-foreground">Compliance</p>
                    <p className="text-lg font-semibold">100% Regulamentado</p>
                  </div>
                  <div className="border-l-4 border-success pl-4">
                    <p className="text-sm text-muted-foreground">Segurança</p>
                    <p className="text-lg font-semibold">Nível Bancário</p>
                  </div>
                  <div className="border-l-4 border-muted-foreground pl-4">
                    <p className="text-sm text-muted-foreground">Suporte</p>
                    <p className="text-lg font-semibold">24/7 Dedicado</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Soluções Corporativas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-lg border border-border">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Segurança Enterprise</h3>
              <p className="text-muted-foreground">
                Proteção de nível institucional com múltiplas camadas de segurança
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg border border-border">
              <Award className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Certificações</h3>
              <p className="text-muted-foreground">
                Compliance total com regulamentações nacionais e internacionais
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg border border-border">
              <Briefcase className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Gestão Profissional</h3>
              <p className="text-muted-foreground">
                Ferramentas avançadas para gestão de portfólio institucional
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}