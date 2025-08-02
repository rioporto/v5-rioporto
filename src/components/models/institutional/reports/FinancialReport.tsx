'use client';

import React from 'react';
import { TrendingUp as TrendingUpIcon, TrendingDown as TrendingDownIcon } from 'lucide-react';

interface FinancialMetric {
  label: string;
  value: number;
  change?: number;
  changeType?: 'increase' | 'decrease';
  format?: 'currency' | 'percentage' | 'number';
}

interface FinancialSection {
  title: string;
  metrics: FinancialMetric[];
}

interface FinancialReportProps {
  title: string;
  period: string;
  sections: FinancialSection[];
  summary?: {
    totalRevenue: number;
    totalCosts: number;
    netProfit: number;
    profitMargin: number;
  };
  className?: string;
}

export default function FinancialReport({
  title,
  period,
  sections,
  summary,
  className = ''
}: FinancialReportProps) {
  const formatValue = (value: number, format: 'currency' | 'percentage' | 'number' = 'number') => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(value);
      case 'percentage':
        return `${value.toFixed(2)}%`;
      default:
        return new Intl.NumberFormat('pt-BR').format(value);
    }
  };

  const formatChange = (change: number, format: 'currency' | 'percentage' | 'number') => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${formatValue(change, format)}`;
  };

  return (
    <div className={`bg-white shadow-sm border border-gray-200 rounded-lg print:shadow-none print:border-gray-400 ${className}`}>
      {/* Header */}
      <div className="px-6 py-6 border-b border-gray-200 print:border-gray-400">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 print:text-black">
              {title}
            </h1>
            <p className="mt-2 text-sm text-gray-600 print:text-gray-800">
              Período: {period}
            </p>
          </div>
          <div className="text-right text-sm text-gray-500 print:text-gray-700">
            <p>Gerado em: {new Date().toLocaleDateString('pt-BR')}</p>
            <p>RioPorto P2P</p>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      {summary && (
        <div className="px-6 py-6 bg-gray-50 print:bg-white">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 print:text-black">
            Resumo Executivo
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white rounded-lg border print:border-gray-400">
              <p className="text-sm text-gray-600 print:text-gray-800">Receita Total</p>
              <p className="text-xl font-bold text-green-600 print:text-black">
                {formatValue(summary.totalRevenue, 'currency')}
              </p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border print:border-gray-400">
              <p className="text-sm text-gray-600 print:text-gray-800">Custos Total</p>
              <p className="text-xl font-bold text-red-600 print:text-black">
                {formatValue(summary.totalCosts, 'currency')}
              </p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border print:border-gray-400">
              <p className="text-sm text-gray-600 print:text-gray-800">Lucro Líquido</p>
              <p className={`text-xl font-bold ${summary.netProfit >= 0 ? 'text-green-600' : 'text-red-600'} print:text-black`}>
                {formatValue(summary.netProfit, 'currency')}
              </p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border print:border-gray-400">
              <p className="text-sm text-gray-600 print:text-gray-800">Margem de Lucro</p>
              <p className={`text-xl font-bold ${summary.profitMargin >= 0 ? 'text-green-600' : 'text-red-600'} print:text-black`}>
                {formatValue(summary.profitMargin, 'percentage')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Sections */}
      <div className="px-6 py-6 space-y-8">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="print:break-inside-avoid">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 print:text-black">
              {section.title}
            </h2>
            <div className="space-y-3">
              {section.metrics.map((metric, metricIndex) => (
                <div 
                  key={metricIndex} 
                  className="flex justify-between items-center py-2 border-b border-gray-100 print:border-gray-300 last:border-b-0"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 print:text-black">
                      {metric.label}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="text-sm font-semibold text-gray-900 print:text-black">
                      {formatValue(metric.value, metric.format)}
                    </p>
                    {metric.change !== undefined && (
                      <div className={`flex items-center text-xs ${
                        metric.changeType === 'increase' 
                          ? 'text-green-600 print:text-black' 
                          : 'text-red-600 print:text-black'
                      }`}>
                        {metric.changeType === 'increase' ? (
                          <TrendingUpIcon className="w-4 h-4 mr-1" />
                        ) : (
                          <TrendingDownIcon className="w-4 h-4 mr-1" />
                        )}
                        {formatChange(metric.change, metric.format || 'number')}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 print:border-gray-400 text-xs text-gray-500 print:text-gray-700">
        <div className="flex justify-between">
          <p>Este relatório é confidencial e destinado apenas ao uso interno.</p>
          <p>Página 1 de 1</p>
        </div>
      </div>
    </div>
  );
}