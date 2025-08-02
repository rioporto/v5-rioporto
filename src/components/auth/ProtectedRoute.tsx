'use client';

/**
 * Protected Route Component
 * Higher-order component to protect routes that require authentication
 */

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useRole, useKYC } from '@/contexts/AuthContext';
import { Role } from '@/types/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: Role;
  minKYCLevel?: number;
  redirectTo?: string;
  fallback?: React.ReactNode;
}

export function ProtectedRoute({
  children,
  requiredRole,
  minKYCLevel,
  redirectTo = '/login',
  fallback
}: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const { hasRole, user } = useRole(requiredRole);
  const { hasKYC, kycLevel } = useKYC(minKYCLevel);

  useEffect(() => {
    if (isLoading) return;

    // Redirect if not authenticated
    if (!isAuthenticated) {
      router.push(redirectTo);
      return;
    }

    // Redirect if doesn't have required role
    if (requiredRole && !hasRole) {
      router.push('/dashboard?error=insufficient_permissions');
      return;
    }

    // Redirect if doesn't have required KYC level
    if (minKYCLevel && !hasKYC) {
      router.push('/kyc/verify?error=kyc_required');
      return;
    }
  }, [isAuthenticated, isLoading, hasRole, hasKYC, router, redirectTo, requiredRole, minKYCLevel]);

  // Show loading state
  if (isLoading) {
    return fallback || <ProtectedRouteLoading />;
  }

  // Show loading while redirecting
  if (!isAuthenticated || (requiredRole && !hasRole) || (minKYCLevel && !hasKYC)) {
    return fallback || <ProtectedRouteLoading />;
  }

  return <>{children}</>;
}

/**
 * Default loading component
 */
function ProtectedRouteLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Verificando autenticação...</p>
      </div>
    </div>
  );
}

/**
 * HOC version of ProtectedRoute
 */
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options?: {
    requiredRole?: Role;
    minKYCLevel?: number;
    redirectTo?: string;
  }
) {
  return function AuthenticatedComponent(props: P) {
    return (
      <ProtectedRoute
        requiredRole={options?.requiredRole}
        minKYCLevel={options?.minKYCLevel}
        redirectTo={options?.redirectTo}
      >
        <Component {...props} />
      </ProtectedRoute>
    );
  };
}

/**
 * Role-based access control component
 */
interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: Role[];
  fallback?: React.ReactNode;
}

export function RoleGuard({ children, allowedRoles, fallback }: RoleGuardProps) {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
    return fallback || (
      <div className="text-center py-8">
        <p className="text-gray-600">Você não tem permissão para acessar este conteúdo.</p>
      </div>
    );
  }

  return <>{children}</>;
}

/**
 * KYC level guard component
 */
interface KYCGuardProps {
  children: React.ReactNode;
  minLevel: number;
  fallback?: React.ReactNode;
}

export function KYCGuard({ children, minLevel, fallback }: KYCGuardProps) {
  const { user } = useAuth();

  if (!user || user.kycLevel < minLevel) {
    return fallback || (
      <div className="text-center py-8">
        <p className="text-gray-600">
          Esta funcionalidade requer verificação KYC nível {minLevel}.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Seu nível atual: {user?.kycLevel || 0}
        </p>
      </div>
    );
  }

  return <>{children}</>;
}

/**
 * Admin-only component wrapper
 */
interface AdminOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function AdminOnly({ children, fallback }: AdminOnlyProps) {
  return (
    <RoleGuard allowedRoles={['ADMIN']} fallback={fallback}>
      {children}
    </RoleGuard>
  );
}

/**
 * Verified users only component wrapper
 */
interface VerifiedOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function VerifiedOnly({ children, fallback }: VerifiedOnlyProps) {
  const { user } = useAuth();

  if (!user || !user.isVerified) {
    return fallback || (
      <div className="text-center py-8">
        <p className="text-gray-600">Esta funcionalidade está disponível apenas para usuários verificados.</p>
      </div>
    );
  }

  return <>{children}</>;
}