'use client';

/**
 * Hook to redirect authenticated users away from auth pages
 * Useful for login/register pages that shouldn't be accessible when logged in
 */

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface UseRedirectIfAuthenticatedOptions {
  redirectTo?: string;
  enabled?: boolean;
}

export function useRedirectIfAuthenticated(options: UseRedirectIfAuthenticatedOptions = {}) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  
  const {
    redirectTo = '/dashboard',
    enabled = true
  } = options;

  useEffect(() => {
    if (!enabled || isLoading) return;

    if (isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, router, redirectTo, enabled]);

  return {
    isAuthenticated,
    isLoading,
    shouldRedirect: isAuthenticated && !isLoading
  };
}