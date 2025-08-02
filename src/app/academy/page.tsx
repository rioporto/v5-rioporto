'use client';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { BookOpen, Video, Users, Trophy } from 'lucide-react';
import Link from 'next/link';

export default function AcademyPage() {
  const features = [
    {
      icon: BookOpen,
      title: 'Artigos Educativos',
      description: 'Aprenda sobre criptomoedas, blockchain e trading',
      link: '/academy/blog'
    },
    {
      icon: Video,
      title: 'Cursos Online',
      description: 'Cursos completos do básico ao avançado',
      link: '/academy/courses'
    },
    {
      icon: Users,
      title: 'Comunidade',
      description: 'Conecte-se com outros traders e investidores',
      link: '#'
    },
    {
      icon: Trophy,
      title: 'Certificações',
      description: 'Obtenha certificados de conclusão',
      link: '#'
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4">RioPorto Academy</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Aprenda a Investir em
              <span className="text-primary"> Criptomoedas</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Do básico ao avançado, tudo que você precisa saber sobre o mundo cripto
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/academy/courses">Explorar Cursos</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/academy/blog">Ler Artigos</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Features */}
      <Section className="py-20">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Tudo que Você Precisa para Aprender
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nossa plataforma educacional oferece conteúdo de qualidade para todos os níveis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={feature.link}>Explorar</Link>
                  </Button>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="py-20 bg-muted/50">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Comece Sua Jornada Hoje
            </h2>
            <p className="text-muted-foreground mb-8">
              Junte-se a milhares de pessoas que já aprendem com a RioPorto Academy
            </p>
            <Button size="lg" asChild>
              <Link href="/register">Criar Conta Gratuita</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}