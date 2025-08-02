'use client';

import { Card } from '@/components/ui/Card';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Handshake } from 'lucide-react';

export default function OTCPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <Section className="py-20">
          <Container>
            <div className="text-center">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Negociação OTC
              </h1>
              <p className="text-muted-foreground mb-8">
                Negociações de grandes volumes com atendimento personalizado
              </p>
              
              <Card className="p-8">
                <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                  <Handshake className="w-6 h-6" />
                  <span>Mesa OTC em desenvolvimento</span>
                </div>
              </Card>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
}