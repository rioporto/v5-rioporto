'use client';

import { useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeProvider';
import { Button } from '@/components/ui/Button';
import { Cpu, Layers, Zap, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function V3DemoPage() {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme('crypto-native');
  }, [setTheme]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  Crypto Native
                </span>
                <br />
                <span className="text-foreground">Experience</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Modelo Crypto Native - Design futurista com roxo neon e glassmorphism.
                Interface Web3 com elementos holográficos e animações.
              </p>
              <div className="flex gap-4">
                <Link href="/register">
                  <Button variant="primary" size="lg" className="bg-gradient-to-r from-primary to-secondary">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Entrar no Futuro
                  </Button>
                </Link>
                <Link href="/dashboard-temp?theme=crypto-native">
                  <Button variant="outline" size="lg" className="backdrop-blur-sm">
                    Ver Interface
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative bg-card/80 backdrop-blur-xl border border-primary/50 rounded-2xl p-8 shadow-2xl">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full blur-xl" />
                <Cpu className="h-32 w-32 mx-auto text-primary mb-6 animate-pulse" />
                <div className="space-y-4">
                  <div className="bg-primary/10 backdrop-blur rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Network</span>
                      <Zap className="h-4 w-4 text-primary animate-pulse" />
                    </div>
                    <p className="text-xl font-bold mt-1">Lightning Fast</p>
                  </div>
                  <div className="bg-secondary/10 backdrop-blur rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Status</span>
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                    </div>
                    <p className="text-xl font-bold mt-1">Connected</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 py-20 bg-background/50 backdrop-blur">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Tecnologia Web3</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card/80 backdrop-blur p-6 rounded-2xl border border-primary/30">
              <Layers className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Glassmorphism UI</h3>
              <p className="text-muted-foreground">
                Interface translúcida com efeitos de vidro e profundidade
              </p>
            </div>
            <div className="bg-card/80 backdrop-blur p-6 rounded-2xl border border-secondary/30">
              <Zap className="h-12 w-12 text-secondary mb-4" />
              <h3 className="text-xl font-bold mb-2">Animações Fluidas</h3>
              <p className="text-muted-foreground">
                Transições suaves e feedback visual instantâneo
              </p>
            </div>
            <div className="bg-card/80 backdrop-blur p-6 rounded-2xl border border-primary/30">
              <Sparkles className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Elementos Holográficos</h3>
              <p className="text-muted-foreground">
                Design futurista com gradientes e efeitos de luz
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}