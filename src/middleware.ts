import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';
  
  // Log para debug - remover após resolver
  console.log('[Middleware] Hostname:', hostname);
  console.log('[Middleware] Pathname:', url.pathname);
  
  // Extrai o subdomínio
  const subdomain = hostname.split('.')[0];
  
  // Mapeamento de subdomínios para páginas de demonstração
  const subdomainRoutes: Record<string, string> = {
    'v1': '/demo/v1',
    'v2': '/demo/v2',
    'v3': '/demo/v3',
    'v4': '/demo/v4',
    'v5': '/demo/v5'
  };

  // Se estiver em um dos subdomínios v1-v5 e na raiz
  if (subdomainRoutes[subdomain] && url.pathname === '/') {
    console.log('[Middleware] Rewriting to:', subdomainRoutes[subdomain]);
    const newUrl = new URL(subdomainRoutes[subdomain], request.url);
    return NextResponse.rewrite(newUrl);
  }
  
  // Mapeamento de subdomínios para temas (usado em outras páginas)
  const subdomainThemeMap: Record<string, string> = {
    'v1': 'minimalist',
    'v2': 'financial',  
    'v3': 'crypto-native',
    'v4': 'institutional',
    'v5': 'gaming'
  };

  // Se estiver em um subdomínio v1-v5 e acessando dashboard
  if (subdomainThemeMap[subdomain] && url.pathname.startsWith('/dashboard')) {
    // Garante que o tema correto seja aplicado
    url.searchParams.set('theme', subdomainThemeMap[subdomain]);
    return NextResponse.rewrite(url);
  }

  // Para qualquer outro domínio, continua normalmente
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};