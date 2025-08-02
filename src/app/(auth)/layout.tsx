/**
 * Authentication Layout
 * Shared layout for login, register, and verification pages
 */

import React from 'react';
import Link from 'next/link';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="flex min-h-screen">
        {/* Left side - Branding */}
        <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:px-8">
          <div className="mx-auto max-w-md">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                RioPorto P2P
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Plataforma multi-modelo para negociação peer-to-peer
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-8 h-8 bg-green-500 rounded-full">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Segurança Avançada
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Sistema de escrow e verificação KYC
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Interface Personalizada
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    5 modelos de interface diferentes
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-8 h-8 bg-purple-500 rounded-full">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Trading Seguro
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Proteção contra fraudes e disputas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Auth Form */}
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            {/* Logo for mobile */}
            <div className="text-center lg:hidden mb-8">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                RioPorto P2P
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Negociação peer-to-peer
              </p>
            </div>

            {children}

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                © 2024 RioPorto P2P. Todos os direitos reservados.
              </p>
              <div className="mt-2 space-x-4">
                <Link 
                  href="/terms" 
                  className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400"
                >
                  Termos de Uso
                </Link>
                <Link 
                  href="/privacy" 
                  className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400"
                >
                  Privacidade
                </Link>
                <Link 
                  href="/support" 
                  className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400"
                >
                  Suporte
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}