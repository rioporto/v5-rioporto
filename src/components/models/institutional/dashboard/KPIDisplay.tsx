'use client';

import React from 'react';
import { 
  ArrowUp as ArrowUpIcon, 
  ArrowDown as ArrowDownIcon,
  AlertTriangle as ExclamationTriangleIcon,
  CheckCircle as CheckCircleIcon
} from 'lucide-react';

interface KPIItem {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: 'currency' | 'percentage' | 'number' | 'days';
  trend: {
    direction: 'up' | 'down' | 'stable';
    value: number;
    period: string;
  };
  status: 'excellent' | 'good' | 'warning' | 'critical';
  category: string;
  description?: string;
  benchmark?: number;
}

interface KPIDisplayProps {
  title?: string;
  kpis: KPIItem[];
  layout?: 'grid' | 'list';
  showTargets?: boolean;
  showBenchmarks?: boolean;
  groupByCategory?: boolean;
  className?: string;
}

export default function KPIDisplay({
  title = "Indicadores de Performance (KPIs)",
  kpis,
  layout = 'grid',
  showTargets = true,
  showBenchmarks = false,
  groupByCategory = true,
  className = ''
}: KPIDisplayProps) {
  const formatValue = (value: number, unit: 'currency' | 'percentage' | 'number' | 'days') => {
    switch (unit) {
      case 'currency':
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
          notation: 'compact',
          maximumFractionDigits: 1
        }).format(value);
      case 'percentage':
        return `${value.toFixed(2)}%`;
      case 'days':
        return `${value} dias`;
      default:
        return new Intl.NumberFormat('pt-BR', {
          notation: 'compact',
          maximumFractionDigits: 1
        }).format(value);
    }
  };

  const getStatusColor = (status: 'excellent' | 'good' | 'warning' | 'critical') => {
    switch (status) {
      case 'excellent':
        return 'bg-green-50 border-green-200 text-green-800 print:bg-white print:border-black print:text-black';
      case 'good':
        return 'bg-blue-50 border-blue-200 text-blue-800 print:bg-white print:border-gray-600 print:text-black';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800 print:bg-white print:border-gray-400 print:text-black';
      default:
        return 'bg-red-50 border-red-200 text-red-800 print:bg-white print:border-gray-300 print:text-black';
    }
  };

  const getStatusIcon = (status: 'excellent' | 'good' | 'warning' | 'critical') => {
    switch (status) {
      case 'excellent':
      case 'good':
        return <CheckCircleIcon className="w-5 h-5 text-green-600 print:text-black" />;
      case 'warning':
      case 'critical':
        return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 print:text-black" />;
    }
  };

  const getTrendIcon = (direction: 'up' | 'down' | 'stable') => {
    switch (direction) {
      case 'up':
        return <ArrowUpIcon className="w-4 h-4 text-green-600 print:text-black" />;
      case 'down':
        return <ArrowDownIcon className="w-4 h-4 text-red-600 print:text-black" />;
      default:
        return <span className="w-4 h-4 flex items-center justify-center text-gray-400 print:text-black">—</span>;
    }
  };

  const calculateAchievement = (value: number, target: number) => {
    return Math.min((value / target) * 100, 100);
  };

  const groupedKPIs = groupByCategory 
    ? kpis.reduce((acc, kpi) => {
        if (!acc[kpi.category]) acc[kpi.category] = [];
        acc[kpi.category].push(kpi);
        return acc;
      }, {} as Record<string, KPIItem[]>)
    : { 'Todos os KPIs': kpis };

  const renderKPICard = (kpi: KPIItem) => {
    const achievement = calculateAchievement(kpi.value, kpi.target);
    const isTargetMet = kpi.value >= kpi.target;

    return (
      <div 
        key={kpi.id}
        className={`p-4 rounded-lg border ${getStatusColor(kpi.status)} print:shadow-none`}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h4 className="font-medium text-gray-900 print:text-black text-sm">{kpi.name}</h4>
            {kpi.description && (
              <p className="text-xs text-gray-600 print:text-gray-800 mt-1">{kpi.description}</p>
            )}
          </div>
          {getStatusIcon(kpi.status)}
        </div>

        <div className="space-y-3">
          {/* Main Value */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900 print:text-black">
                {formatValue(kpi.value, kpi.unit)}
              </p>
              <div className="flex items-center mt-1">
                {getTrendIcon(kpi.trend.direction)}
                <span className={`text-xs ml-1 ${
                  kpi.trend.direction === 'up' ? 'text-green-600' : 
                  kpi.trend.direction === 'down' ? 'text-red-600' : 'text-gray-500'
                } print:text-black`}>
                  {kpi.trend.value > 0 ? '+' : ''}{kpi.trend.value.toFixed(1)}% ({kpi.trend.period})
                </span>
              </div>
            </div>
          </div>

          {/* Target Progress */}
          {showTargets && (
            <div>
              <div className="flex justify-between text-xs text-gray-600 print:text-gray-800 mb-1">
                <span>Meta: {formatValue(kpi.target, kpi.unit)}</span>
                <span>{achievement.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 print:bg-white rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isTargetMet ? 'bg-green-500' : 
                    achievement >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                  } print:bg-black`}
                  style={{ width: `${achievement}%` }}
                />
              </div>
            </div>
          )}

          {/* Benchmark Comparison */}
          {showBenchmarks && kpi.benchmark && (
            <div className="pt-2 border-t border-gray-200 print:border-gray-400">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600 print:text-gray-800">Benchmark do setor</span>
                <span className={`font-medium ${
                  kpi.value >= kpi.benchmark ? 'text-green-600' : 'text-red-600'
                } print:text-black`}>
                  {formatValue(kpi.benchmark, kpi.unit)}
                </span>
              </div>
              <div className="flex items-center mt-1">
                <span className={`text-xs ${
                  kpi.value >= kpi.benchmark ? 'text-green-600' : 'text-red-600'
                } print:text-black`}>
                  {kpi.value >= kpi.benchmark ? 'Acima' : 'Abaixo'} do benchmark
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderKPIList = (kpi: KPIItem) => {
    const achievement = calculateAchievement(kpi.value, kpi.target);
    const isTargetMet = kpi.value >= kpi.target;

    return (
      <div 
        key={kpi.id}
        className="flex items-center justify-between p-4 border border-gray-200 print:border-gray-400 rounded-lg hover:bg-gray-50 print:hover:bg-white"
      >
        <div className="flex items-center flex-1">
          {getStatusIcon(kpi.status)}
          <div className="ml-3 flex-1">
            <h4 className="font-medium text-gray-900 print:text-black">{kpi.name}</h4>
            <p className="text-sm text-gray-600 print:text-gray-800">{kpi.category}</p>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="text-right">
            <p className="text-lg font-semibold text-gray-900 print:text-black">
              {formatValue(kpi.value, kpi.unit)}
            </p>
            <div className="flex items-center justify-end">
              {getTrendIcon(kpi.trend.direction)}
              <span className={`text-xs ml-1 ${
                kpi.trend.direction === 'up' ? 'text-green-600' : 
                kpi.trend.direction === 'down' ? 'text-red-600' : 'text-gray-500'
              } print:text-black`}>
                {kpi.trend.value > 0 ? '+' : ''}{kpi.trend.value.toFixed(1)}%
              </span>
            </div>
          </div>

          {showTargets && (
            <div className="w-24">
              <div className="text-xs text-gray-600 print:text-gray-800 text-center mb-1">
                {achievement.toFixed(0)}%
              </div>
              <div className="w-full bg-gray-200 print:bg-white rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    isTargetMet ? 'bg-green-500' : 
                    achievement >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                  } print:bg-black`}
                  style={{ width: `${achievement}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`bg-white shadow-sm border border-gray-200 rounded-lg print:shadow-none print:border-gray-400 ${className}`}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 print:border-gray-400">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 print:text-black">{title}</h2>
          <div className="text-sm text-gray-500 print:text-gray-700">
            {kpis.length} indicadores monitorados
          </div>
        </div>
      </div>

      {/* KPI Content */}
      <div className="p-6">
        {Object.entries(groupedKPIs).map(([category, categoryKPIs]) => (
          <div key={category} className="mb-8 last:mb-0 print:break-inside-avoid">
            {groupByCategory && Object.keys(groupedKPIs).length > 1 && (
              <h3 className="text-lg font-semibold text-gray-900 mb-4 print:text-black">
                {category}
              </h3>
            )}
            
            {layout === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryKPIs.map(renderKPICard)}
              </div>
            ) : (
              <div className="space-y-3">
                {categoryKPIs.map(renderKPIList)}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary Footer */}
      <div className="px-6 py-4 border-t border-gray-200 print:border-gray-400 bg-gray-50 print:bg-white">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-green-600 print:text-black">
              {kpis.filter(k => k.status === 'excellent').length}
            </p>
            <p className="text-xs text-gray-600 print:text-gray-800">Excelentes</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600 print:text-black">
              {kpis.filter(k => k.status === 'good').length}
            </p>
            <p className="text-xs text-gray-600 print:text-gray-800">Bons</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-yellow-600 print:text-black">
              {kpis.filter(k => k.status === 'warning').length}
            </p>
            <p className="text-xs text-gray-600 print:text-gray-800">Atenção</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-red-600 print:text-black">
              {kpis.filter(k => k.status === 'critical').length}
            </p>
            <p className="text-xs text-gray-600 print:text-gray-800">Críticos</p>
          </div>
        </div>
      </div>
    </div>
  );
}