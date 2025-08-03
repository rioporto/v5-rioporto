import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // Mapeamento de subdomínios para temas
  const subdomainThemeMap: Record<string, string> = {
    'v1': 'minimalist',
    'v2': 'financial',  
    'v3': 'crypto-native',
    'v4': 'institutional',
    'v5': 'gaming'
  };

  // Extrai o subdomínio
  const subdomain = hostname.split('.')[0];

  // Se estiver em um dos subdomínios v1-v5
  if (subdomainThemeMap[subdomain]) {
    // Redireciona para o dashboard com o tema específico
    const newUrl = new URL('/dashboard-temp', request.url);
    newUrl.searchParams.set('theme', subdomainThemeMap[subdomain]);
    return NextResponse.rewrite(newUrl);
  }

  // Para qualquer outro domínio, continua normalmente
  const response = NextResponse.next();
  
  // Garante que páginas HTML sejam servidas com o Content-Type correto
  if (!url.pathname.includes('_next') && 
      !url.pathname.includes('api') &&
      !url.pathname.includes('.')) {
    response.headers.set('Content-Type', 'text/html; charset=utf-8');
  }
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - .well-known
     * - robots.txt
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.well-known|robots.txt).*)',
  ],
};