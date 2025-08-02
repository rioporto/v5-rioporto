'use client';

/**
 * Email Verification Page
 * Mock email verification interface
 */

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRedirectIfAuthenticated } from '@/hooks/useRedirectIfAuthenticated';
import { LoadingSpinner } from '@/components/auth/LoadingSpinner';

function VerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Redirect if already authenticated
  useRedirectIfAuthenticated();

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    }
  }, [searchParams]);

  // Cooldown timer for resend button
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  /**
   * Handle verification code submission
   */
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code.trim()) {
      setError('Código de verificação é obrigatório');
      return;
    }

    if (code.length !== 6) {
      setError('Código deve ter 6 dígitos');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock verification - in real app, this would validate with backend
      if (code === '123456') {
        setSuccess(true);
        setTimeout(() => {
          router.push('/login?verified=true');
        }, 2000);
      } else {
        setError('Código inválido. Tente novamente.');
      }
    } catch (error) {
      setError('Erro interno do servidor');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle resend verification code
   */
  const handleResend = async () => {
    if (resendCooldown > 0) return;

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock success
      alert('Código de verificação reenviado!');
      setResendCooldown(60); // 60 seconds cooldown
    } catch (error) {
      setError('Erro ao reenviar código');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle code input (only numbers, max 6 digits)
   */
  const handleCodeChange = (value: string) => {
    const numericValue = value.replace(/\D/g, '').slice(0, 6);
    setCode(numericValue);
    setError('');
  };

  if (success) {
    return (
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/20 mb-4">
          <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Email Verificado!
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Sua conta foi verificada com sucesso. Redirecionando para o login...
        </p>
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/20 mb-4">
          <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Verificar Email
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Enviamos um código de 6 dígitos para
        </p>
        <p className="font-medium text-gray-900 dark:text-white">
          {email || 'seu email'}
        </p>
      </div>

      {/* Demo Info */}
      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
          Demonstração:
        </h3>
        <p className="text-sm text-blue-800 dark:text-blue-200">
          Use o código <strong>123456</strong> para simular a verificação
        </p>
      </div>

      <form onSubmit={handleVerify} className="space-y-6">
        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Verification Code Input */}
        <div>
          <label htmlFor="code" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-center mb-2">
            Código de Verificação
          </label>
          <div className="flex justify-center">
            <input
              id="code"
              name="code"
              type="text"
              value={code}
              onChange={(e) => handleCodeChange(e.target.value)}
              className="block w-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white text-center text-lg font-mono tracking-widest"
              placeholder="000000"
              maxLength={6}
            />
          </div>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
            Digite o código de 6 dígitos
          </p>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isLoading || code.length !== 6}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed dark:focus:ring-offset-gray-800"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verificando...
              </>
            ) : (
              'Verificar Código'
            )}
          </button>
        </div>

        {/* Resend Code */}
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Não recebeu o código?
          </p>
          <button
            type="button"
            onClick={handleResend}
            disabled={resendCooldown > 0 || isLoading}
            className="mt-1 text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {resendCooldown > 0 
              ? `Reenviar em ${resendCooldown}s`
              : 'Reenviar código'
            }
          </button>
        </div>

        {/* Back to Login */}
        <div className="text-center">
          <Link
            href="/login"
            className="text-sm text-gray-600 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300"
          >
            ← Voltar para o login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<LoadingSpinner message="Carregando página de verificação..." />}>
      <VerifyContent />
    </Suspense>
  );
}