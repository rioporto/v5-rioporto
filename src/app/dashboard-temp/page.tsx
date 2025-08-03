'use client';

/**
 * Dashboard Page
 * Protected route that requires authentication
 */

import React from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';

function DashboardContent() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Bem-vindo, {user.name}!
              </p>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Sair
            </button>
          </div>
        </div>

        {/* User Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Perfil
            </h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Role:</strong> {user.role}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <strong>KYC Level:</strong> {user.kycLevel}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Verificado:</strong> {user.isVerified ? 'Sim' : 'Não'}
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Portfolio
            </h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Saldo Total:</strong> R$ {user.portfolio.totalBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <strong>P&L Total:</strong> R$ {user.portfolio.totalProfitLoss.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Total de Trades:</strong> {user.portfolio.totalTrades}
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Trading Stats
            </h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Trades Completos:</strong> {user.tradingStats.completedTrades}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Taxa de Sucesso:</strong> {user.tradingStats.successRate}%
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Rating Médio:</strong> {user.tradingStats.averageRating}/5
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Tempo de Resposta:</strong> {user.tradingStats.responseTime}
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Preferências
            </h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Tema:</strong> {user.preferences.theme}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Idioma:</strong> {user.preferences.language}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Moeda:</strong> {user.preferences.currency}
              </p>
            </div>
          </div>
        </div>

        {/* Assets Table */}
        {user.portfolio.assets.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Meus Ativos
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Ativo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Saldo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Bloqueado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Preço Médio
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      P&L
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {user.portfolio.assets.map((asset, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {asset.asset}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {asset.asset === 'BRL' 
                          ? `R$ ${asset.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                          : asset.balance.toLocaleString('pt-BR', { maximumFractionDigits: 8 })
                        }
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {asset.asset === 'BRL' 
                          ? `R$ ${asset.locked.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                          : asset.locked.toLocaleString('pt-BR', { maximumFractionDigits: 8 })
                        }
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        R$ {asset.averagePrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                        asset.profitLoss >= 0 
                          ? 'text-green-600 dark:text-green-400' 
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {asset.profitLoss >= 0 ? '+' : ''}R$ {asset.profitLoss.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}