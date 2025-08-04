/**
 * CSRF Protection utilities for RioPorto P2P
 * Protege contra ataques Cross-Site Request Forgery
 */

import crypto from 'crypto';
import { cookies } from 'next/headers';

const CSRF_TOKEN_NAME = 'csrf-token';
const CSRF_SECRET_NAME = 'csrf-secret';

/**
 * Gera um novo token CSRF
 */
export function generateCSRFToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Gera um secret para validação do token
 */
export function generateCSRFSecret(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Cria e armazena um novo token CSRF nos cookies
 */
export async function createCSRFToken(): Promise<string> {
  const token = generateCSRFToken();
  const secret = generateCSRFSecret();
  
  const cookieStore = cookies();
  
  // Armazena o secret nos cookies (httpOnly)
  cookieStore.set(CSRF_SECRET_NAME, secret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, // 24 horas
  });
  
  // Cria hash do token com o secret
  const hash = crypto
    .createHmac('sha256', secret)
    .update(token)
    .digest('hex');
    
  return `${token}.${hash}`;
}

/**
 * Valida um token CSRF
 */
export async function validateCSRFToken(token: string | null): Promise<boolean> {
  if (!token) return false;
  
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  
  const [tokenPart, hashPart] = parts;
  const cookieStore = cookies();
  const secret = cookieStore.get(CSRF_SECRET_NAME)?.value;
  
  if (!secret) return false;
  
  // Recria o hash e compara
  const expectedHash = crypto
    .createHmac('sha256', secret)
    .update(tokenPart)
    .digest('hex');
    
  // Comparação segura contra timing attacks
  return crypto.timingSafeEqual(
    Buffer.from(hashPart),
    Buffer.from(expectedHash)
  );
}

/**
 * Middleware helper para verificar CSRF em API routes
 */
export async function checkCSRF(request: Request): Promise<boolean> {
  // Skip CSRF check para métodos seguros
  if (['GET', 'HEAD', 'OPTIONS'].includes(request.method)) {
    return true;
  }
  
  // Pega o token do header ou body
  const token = request.headers.get('x-csrf-token') || 
                (await request.json().catch(() => ({}))).csrfToken;
                
  return validateCSRFToken(token);
}

/**
 * Hook para usar em componentes client-side
 */
export function useCSRFToken() {
  if (typeof window === 'undefined') {
    return { csrfToken: null };
  }
  
  // Em produção, isso seria obtido de um meta tag ou API endpoint
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || null;
  
  return { csrfToken };
}