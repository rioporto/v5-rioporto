'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbsProps {
  className?: string;
}

export function Breadcrumbs({ className }: BreadcrumbsProps) {
  const pathname = usePathname();
  
  // Don't show breadcrumbs on home page
  if (pathname === '/') return null;
  
  const segments = pathname.split('/').filter(Boolean);
  
  const pathMap: Record<string, string> = {
    dashboard: 'Dashboard',
    portfolio: 'Portfólio',
    buy: 'Comprar',
    sell: 'Vender',
    transactions: 'Transações',
    indicators: 'Indicadores',
    tools: 'Ferramentas',
    settings: 'Configurações',
    security: 'Segurança',
    sessions: 'Sessões',
    kyc: 'KYC',
    pix: 'PIX',
    wallets: 'Carteiras',
    admin: 'Admin',
    users: 'Usuários',
    orders: 'Ordens',
    analytics: 'Analytics',
    'kyc-queue': 'Fila KYC',
    academy: 'Academy',
    blog: 'Blog',
    courses: 'Cursos',
    market: 'Mercado',
    tokens: 'Tokens',
    influencers: 'Influenciadores',
    otc: 'OTC',
  };

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    ...segments.map((segment, index) => {
      const href = '/' + segments.slice(0, index + 1).join('/');
      const label = pathMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
      
      return { label, href };
    }),
  ];

  return (
    <nav className={cn('flex items-center space-x-1 text-sm', className)}>
      {breadcrumbs.map((breadcrumb, index) => {
        const isLast = index === breadcrumbs.length - 1;
        const isFirst = index === 0;
        
        return (
          <div key={breadcrumb.href} className="flex items-center space-x-1">
            {index > 0 && (
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            )}
            
            {isLast ? (
              <span className="font-medium text-foreground">
                {breadcrumb.label}
              </span>
            ) : (
              <Link
                href={breadcrumb.href}
                className={cn(
                  'text-muted-foreground hover:text-foreground transition-colors flex items-center space-x-1',
                  isFirst && 'text-primary hover:text-primary/80'
                )}
              >
                {isFirst && <Home className="w-4 h-4" />}
                <span>{breadcrumb.label}</span>
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}