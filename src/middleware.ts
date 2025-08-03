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
    url.pathname = '/dashboard-temp';
    url.searchParams.set('theme', subdomainThemeMap[subdomain]);
    return NextResponse.rewrite(url);
  }

  // Se for www.rioporto.com.br ou rioporto.com.br, mostra a página Em Breve
  if (hostname === 'rioporto.com.br' || hostname === 'www.rioporto.com.br') {
    return NextResponse.next();
  }

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
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};