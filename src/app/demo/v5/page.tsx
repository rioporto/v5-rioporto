'use client';

import { useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeProvider';
import { Button } from '@/components/ui/Button';
import { Gamepad2, Trophy, Swords, Gem } from 'lucide-react';
import Link from 'next/link';

export default function V5DemoPage() {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme('gaming');
  }, [setTheme]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Gaming Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary rounded-full blur-2xl animate-ping" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-secondary rounded-full blur-2xl animate-ping delay-1000" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary animate-gradient">
                  Gaming Hub
                </span>
                <br />
                <span className="text-foreground">Web3 Style</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Modelo Gaming - Interface vibrante em rosa e ciano.
                Design HUD com elementos de jogos e animações dinâmicas.
              </p>
              <div className="flex gap-4">
                <Link href="/register">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition-all duration-300"
                  >
                    <Gamepad2 className="mr-2 h-4 w-4" />
                    Start Game
                  </Button>
                </Link>
                <Link href="/dashboard-temp?theme=gaming">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-2 border-primary/50 hover:border-primary hover:bg-primary/10"
                  >
                    Enter Dashboard
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative bg-card/90 backdrop-blur border-2 border-primary/50 rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-transform">
                <div className="absolute -top-4 -right-4 bg-gradient-to-br from-primary to-secondary rounded-full p-2">
                  <Trophy className="h-6 w-6 text-background" />
                </div>
                <Gem className="h-32 w-32 mx-auto text-primary mb-6 animate-spin-slow" />
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg p-4 border border-primary/30">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">LEVEL</span>
                      <span className="text-xl font-bold text-primary">99</span>
                    </div>
                    <div className="w-full bg-background/50 rounded-full h-2 mt-2">
                      <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full w-3/4 animate-pulse" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-primary/10 rounded p-3 text-center">
                      <Swords className="h-6 w-6 mx-auto mb-1 text-primary" />
                      <p className="text-xs">POWER</p>
                      <p className="font-bold">9999</p>
                    </div>
                    <div className="bg-secondary/10 rounded p-3 text-center">
                      <Trophy className="h-6 w-6 mx-auto mb-1 text-secondary" />
                      <p className="text-xs">SCORE</p>
                      <p className="font-bold">MAX</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 py-20 bg-background/80 backdrop-blur">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Game Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card/90 backdrop-blur p-6 rounded-xl border-2 border-primary/30 hover:border-primary transition-colors">
              <Gamepad2 className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Interface Gamificada</h3>
              <p className="text-muted-foreground">
                Elementos de RPG e progressão com achievements e recompensas
              </p>
            </div>
            <div className="bg-card/90 backdrop-blur p-6 rounded-xl border-2 border-secondary/30 hover:border-secondary transition-colors">
              <Trophy className="h-12 w-12 text-secondary mb-4" />
              <h3 className="text-xl font-bold mb-2">Sistema de Ranking</h3>
              <p className="text-muted-foreground">
                Compete com outros traders e suba no leaderboard global
              </p>
            </div>
            <div className="bg-card/90 backdrop-blur p-6 rounded-xl border-2 border-primary/30 hover:border-primary transition-colors">
              <Gem className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Rewards & NFTs</h3>
              <p className="text-muted-foreground">
                Ganhe tokens e NFTs exclusivos por suas conquistas
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}