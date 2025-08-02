'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

interface AcademyLayoutProps {
  children: React.ReactNode;
}

export default function AcademyLayout({ children }: AcademyLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}