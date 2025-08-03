import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // Log para debug
  console.log('Middleware - hostname:', hostname);
  console.log('Middleware - pathname:', url.pathname);

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
  console.log('Middleware - subdomain:', subdomain);

  // Se estiver em um dos subdomínios v1-v5
  if (subdomainThemeMap[subdomain]) {
    // Redireciona para o dashboard com o tema específico
    const newUrl = new URL('/dashboard-temp', request.url);
    newUrl.searchParams.set('theme', subdomainThemeMap[subdomain]);
    console.log('Middleware - rewriting to:', newUrl.toString());
    return NextResponse.rewrite(newUrl);
  }

  // Para qualquer outro domínio, continua normalmente
  return NextResponse.next();
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