'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeProvider';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ArrowRight, 
  Shield, 
  Zap, 
  Globe, 
  CheckCircle,
  Star,
  Users,
  TrendingUp
} from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const { currentTheme, themeConfig } = useTheme();
  const { isAuthenticated, isLoading } = useAuth();
  
  // Debug - remover após confirmar deploy
  console.log('Home page loaded - Version 1.0.1');

  // Redirect to dashboard if authenticated
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6">
            Negocie P2P com
            <span className="block font-normal text-primary">simplicidade</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            A plataforma mais intuitiva para negociação peer-to-peer. 
            Segura, rápida e totalmente personalizável.
          </p>
          
          {!isLoading && !isAuthenticated && (
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Link
                href="/register"
                className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity group"
              >
                Começar agora
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center px-8 py-4 border border-border bg-card hover:bg-accent/50 rounded-lg font-medium transition-colors"
              >
                Já tenho conta
              </Link>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-semibold text-primary">50K+</div>
              <div className="text-sm text-muted-foreground">Usuários ativos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-primary">R$ 2B+</div>
              <div className="text-sm text-muted-foreground">Volume negociado</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-primary">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light mb-4">Por que escolher RioPorto?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Desenvolvida com foco na experiência do usuário e segurança máxima
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Ultra Seguro</h3>
              <p className="text-muted-foreground leading-relaxed">
                KYC avançado, autenticação 2FA e escrow automático para máxima proteção
              </p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Execução Rápida</h3>
              <p className="text-muted-foreground leading-relaxed">
                Matching engine de alta performance com latência ultra-baixa
              </p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Multi-Modelo</h3>
              <p className="text-muted-foreground leading-relaxed">
                5 interfaces especializadas para diferentes perfis de usuário
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light mb-4">O que nossos usuários dizem</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                "Interface incrivelmente limpa e intuitiva. Nunca foi tão fácil negociar P2P com essa segurança."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Maria Silva</div>
                  <div className="text-sm text-muted-foreground">Trader Profissional</div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                "O sistema de múltiplos modelos é genial. Cada perfil tem sua interface otimizada."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Carlos Santos</div>
                  <div className="text-sm text-muted-foreground">Investidor Institucional</div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                "Suporte excepcional e execução sempre precisa. Recomendo para qualquer trader."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Ana Costa</div>
                  <div className="text-sm text-muted-foreground">Day Trader</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-light mb-4">Pronto para começar?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Crie sua conta gratuita e comece a negociar em minutos
          </p>
          
          {!isLoading && !isAuthenticated && (
            <Link
              href="/register"
              className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity group"
            >
              Começar gratuitamente
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-xl font-medium mb-4">RioPorto P2P</h3>
              <p className="text-muted-foreground mb-4 max-w-md">
                A plataforma de negociação P2P mais avançada e segura do mercado brasileiro.
              </p>
              <div className="text-sm text-muted-foreground">
                Tema atual: <span className="font-medium">{themeConfig.name}</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Produto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/market" className="hover:text-foreground transition-colors">Mercado</Link></li>
                <li><Link href="/academy" className="hover:text-foreground transition-colors">Academia</Link></li>
                <li><Link href="/otc" className="hover:text-foreground transition-colors">OTC</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Suporte</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center">
            <div className="text-sm text-muted-foreground">
              © 2024 RioPorto P2P. Todos os direitos reservados.
            </div>
            <div className="flex space-x-4 text-sm text-muted-foreground mt-4 sm:mt-0">
              <a href="#" className="hover:text-foreground transition-colors">Privacidade</a>
              <a href="#" className="hover:text-foreground transition-colors">Termos</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}