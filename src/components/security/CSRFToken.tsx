'use client';

import React from 'react';

interface CSRFTokenProps {
  token: string;
}

/**
 * Componente para incluir CSRF token em formulários
 * Uso: <CSRFToken token={csrfToken} />
 */
export function CSRFToken({ token }: CSRFTokenProps) {
  return (
    <input 
      type="hidden" 
      name="csrfToken" 
      value={token}
      readOnly
    />
  );
}

/**
 * Hook para incluir CSRF token em requisições fetch
 */
export function useCSRFHeaders(csrfToken: string | null) {
  return React.useMemo(() => {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (csrfToken) {
      headers['X-CSRF-Token'] = csrfToken;
    }
    
    return headers;
  }, [csrfToken]);
}

/**
 * Componente para incluir meta tag com CSRF token
 * Deve ser usado no layout principal
 */
export function CSRFMeta({ token }: CSRFTokenProps) {
  return (
    <meta name="csrf-token" content={token} />
  );
}