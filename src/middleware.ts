import { NextRequest, NextResponse } from 'next/server';

// Rotas públicas que não requerem autenticação
const publicRoutes = [
  '/',
  '/login',
  '/register',
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/logout',
  '/demo',
  '/academy',
  '/blog',
  '/about',
  '/terms',
  '/privacy',
];

// Rotas que requerem autenticação
const protectedRoutes = [
  '/dashboard',
  '/p2p',
  '/portfolio',
  '/settings',
  '/admin',
  '/security-center',
];

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';
  const pathname = url.pathname;
  
  // Extrai o subdomínio
  const subdomain = hostname.split('.')[0];
  
  // Verificação de autenticação
  const authToken = request.cookies.get('auth-token');
  const isAuthenticated = !!authToken;
  
  // Verifica se a rota atual requer autenticação
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isPublicRoute = publicRoutes.some(route => 
    route === pathname || pathname.startsWith(route + '/')
  );
  
  // Redireciona usuários não autenticados tentando acessar rotas protegidas
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  // Redireciona usuários autenticados tentando acessar login/register
  if (isAuthenticated && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
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
    /*
     * Match all request paths except for the ones starting with:
     * - api/webhook (webhooks não precisam de auth)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api/webhook|_next/static|_next/image|favicon.ico).*)',
  ],
};