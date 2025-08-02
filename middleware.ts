import { NextRequest, NextResponse } from 'next/server';

// Rotas que requerem autenticação
const protectedRoutes = [
  '/dashboard',
  '/admin',
  '/otc',
];

// Rotas que requerem role específico
const adminRoutes = ['/admin'];

// Rotas que requerem KYC mínimo
const kycRequiredRoutes = [
  '/dashboard/buy',
  '/dashboard/sell',
  '/otc',
];

// Rotas públicas que não requerem autenticação
const publicRoutes = [
  '/',
  '/login',
  '/register',
  '/verify',
  '/academy',
  '/market',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Obter dados do usuário dos cookies/headers (simulado)
  // Em produção, você validaria o JWT aqui
  const authCookie = request.cookies.get('auth-token');
  const userRole = request.cookies.get('user-role')?.value;
  const userKyc = request.cookies.get('user-kyc')?.value;
  
  const isAuthenticated = !!authCookie;
  const isAdmin = userRole === 'ADMIN' || userRole === 'MODERATOR';
  const kycLevel = userKyc ? parseInt(userKyc) : 0;

  // Verificar se é uma rota protegida
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );

  // Verificar se é uma rota admin
  const isAdminRoute = adminRoutes.some(route => 
    pathname.startsWith(route)
  );

  // Verificar se é uma rota que requer KYC
  const requiresKyc = kycRequiredRoutes.some(route => 
    pathname.startsWith(route)
  );

  // Redirecionar usuários não autenticados para login
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirecionar não-admin tentando acessar rotas admin
  if (isAdminRoute && !isAdmin) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Verificar KYC para rotas que requerem
  if (requiresKyc && kycLevel < 1) {
    const kycUrl = new URL('/dashboard/settings/kyc', request.url);
    kycUrl.searchParams.set('required', 'true');
    return NextResponse.redirect(kycUrl);
  }

  // Redirecionar usuários autenticados para dashboard se tentarem acessar login/register
  if (isAuthenticated && ['/login', '/register'].includes(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Adicionar headers de segurança
  const response = NextResponse.next();
  
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
  );

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
     * - public (public files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};