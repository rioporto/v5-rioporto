'use client';

import React from 'react';
import { ArrowUp as ArrowUpIcon, ArrowDown as ArrowDownIcon, Minus as MinusIcon } from 'lucide-react';

interface ComparisonItem {
  label: string;
  current: number;
  previous: number;
  benchmark?: number;
  unit?: 'currency' | 'percentage' | 'number';
  target?: number;
}

interface ComparisonTableProps {
  title: string;
  subtitle?: string;
  items: ComparisonItem[];
  periods: {
    current: string;
    previous: string;
    benchmark?: string;
  };
  showBenchmark?: boolean;
  showTargets?: boolean;
  className?: string;
}

export default function ComparisonTable({
  title,
  subtitle,
  items,
  periods,
  showBenchmark = false,
  showTargets = false,
  className = ''
}: ComparisonTableProps) {
  const formatValue = (value: number, unit: 'currency' | 'percentage' | 'number' = 'number') => {
    switch (unit) {
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

  const calculateChange = (current: number, previous: number) => {
    if (previous === 0) return null;
    return ((current - previous) / previous) * 100;
  };

  const getChangeIcon = (change: number | null) => {
    if (change === null || Math.abs(change) < 0.01) {
      return <MinusIcon className="w-4 h-4" />;
    }
    return change > 0 ? (
      <ArrowUpIcon className="w-4 h-4" />
    ) : (
      <ArrowDownIcon className="w-4 h-4" />
    );
  };

  const getChangeColor = (change: number | null) => {
    if (change === null || Math.abs(change) < 0.01) {
      return 'text-gray-500 print:text-gray-600';
    }
    return change > 0 ? 'text-green-600 print:text-black' : 'text-red-600 print:text-black';
  };

  const getTargetStatus = (current: number, target: number) => {
    const achievement = (current / target) * 100;
    if (achievement >= 100) return { status: 'achieved', color: 'text-green-600 print:text-black' };
    if (achievement >= 80) return { status: 'near', color: 'text-yellow-600 print:text-black' };
    return { status: 'below', color: 'text-red-600 print:text-black' };
  };

  return (
    <div className={`bg-white shadow-sm border border-gray-200 rounded-lg print:shadow-none print:border-gray-400 ${className}`}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 print:border-gray-400">
        <h3 className="text-lg font-semibold text-gray-900 print:text-black">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-1 text-sm text-gray-600 print:text-gray-800">
            {subtitle}
          </p>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 print:divide-gray-400">
          <thead className="bg-gray-50 print:bg-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 print:text-gray-700 uppercase tracking-wider">
                Métrica
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 print:text-gray-700 uppercase tracking-wider">
                {periods.current}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 print:text-gray-700 uppercase tracking-wider">
                {periods.previous}
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 print:text-gray-700 uppercase tracking-wider">
                Variação
              </th>
              {showBenchmark && periods.benchmark && (
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 print:text-gray-700 uppercase tracking-wider">
                  {periods.benchmark}
                </th>
              )}
              {showTargets && (
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 print:text-gray-700 uppercase tracking-wider">
                  Meta / Status
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 print:divide-gray-400">
            {items.map((item, index) => {
              const change = calculateChange(item.current, item.previous);
              const changeColor = getChangeColor(change);
              const targetStatus = item.target ? getTargetStatus(item.current, item.target) : null;

              return (
                <tr key={index} className="hover:bg-gray-50 print:hover:bg-white">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 print:text-black">
                      {item.label}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="text-sm font-semibold text-gray-900 print:text-black">
                      {formatValue(item.current, item.unit)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="text-sm text-gray-600 print:text-gray-800">
                      {formatValue(item.previous, item.unit)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className={`flex items-center justify-center text-sm font-medium ${changeColor}`}>
                      {getChangeIcon(change)}
                      <span className="ml-1">
                        {change !== null ? `${Math.abs(change).toFixed(2)}%` : '-'}
                      </span>
                    </div>
                  </td>
                  {showBenchmark && (
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-sm text-gray-600 print:text-gray-800">
                        {item.benchmark ? formatValue(item.benchmark, item.unit) : '-'}
                      </div>
                    </td>
                  )}
                  {showTargets && (
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {item.target ? (
                        <div className="text-sm">
                          <div className="font-medium text-gray-900 print:text-black">
                            {formatValue(item.target, item.unit)}
                          </div>
                          <div className={`text-xs ${targetStatus?.color}`}>
                            {targetStatus?.status === 'achieved' && '✓ Atingida'}
                            {targetStatus?.status === 'near' && '⚠ Próxima'}
                            {targetStatus?.status === 'below' && '✗ Abaixo'}
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400 print:text-gray-600">-</span>
                      )}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="px-6 py-4 bg-gray-50 print:bg-white border-t border-gray-200 print:border-gray-400">
        <div className="flex justify-between text-sm">
          <div className="text-gray-600 print:text-gray-800">
            {items.length} métricas analisadas
          </div>
          <div className="text-gray-600 print:text-gray-800">
            Comparação: {periods.previous} vs {periods.current}
          </div>
        </div>
      </div>
    </div>
  );
}