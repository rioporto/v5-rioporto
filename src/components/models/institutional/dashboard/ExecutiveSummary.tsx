'use client';

import React from 'react';
import { 
  TrendingUpIcon, 
  TrendingDownIcon,
  UsersIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface KPIMetric {
  label: string;
  value: number | string;
  change?: number;
  changeType?: 'increase' | 'decrease';
  format?: 'currency' | 'percentage' | 'number' | 'text';
  target?: number;
  icon?: React.ComponentType<any>;
}

interface BusinessHighlight {
  title: string;
  description: string;
  impact: 'positive' | 'negative' | 'neutral';
  priority: 'high' | 'medium' | 'low';
}

interface ExecutiveSummaryProps {
  title?: string;
  period: string;
  lastUpdated: string;
  keyMetrics: KPIMetric[];
  highlights: BusinessHighlight[];
  financialSummary: {
    revenue: number;
    profit: number;
    profitMargin: number;
    cashFlow: number;
  };
  operationalSummary: {
    activeUsers: number;
    transactionVolume: number;
    portfolioValue: number;
    riskScore: number;
  };
  strategicInitiatives: string[];
  alerts: {
    type: 'warning' | 'info' | 'success' | 'error';
    message: string;
  }[];
  className?: string;
}

export default function ExecutiveSummary({
  title = "Resumo Executivo",
  period,
  lastUpdated,
  keyMetrics,
  highlights,
  financialSummary,
  operationalSummary,
  strategicInitiatives,
  alerts,
  className = ''
}: ExecutiveSummaryProps) {
  const formatValue = (value: number | string, format: 'currency' | 'percentage' | 'number' | 'text' = 'number') => {
    if (typeof value === 'string') return value;
    
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
          notation: 'compact',
          maximumFractionDigits: 1
        }).format(value);
      case 'percentage':
        return `${value.toFixed(2)}%`;
      case 'number':
        return new Intl.NumberFormat('pt-BR', {
          notation: 'compact',
          maximumFractionDigits: 1
        }).format(value);
      default:
        return value;
    }
  };

  const getChangeIcon = (changeType?: 'increase' | 'decrease') => {
    if (changeType === 'increase') {
      return <TrendingUpIcon className="w-4 h-4 text-green-600 print:text-black" />;
    } else if (changeType === 'decrease') {
      return <TrendingDownIcon className="w-4 h-4 text-red-600 print:text-black" />;
    }
    return null;
  };

  const getAlertColor = (type: 'warning' | 'info' | 'success' | 'error') => {
    switch (type) {
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800 print:bg-white print:border-black print:text-black';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800 print:bg-white print:border-gray-600 print:text-black';
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800 print:bg-white print:border-gray-400 print:text-black';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800 print:bg-white print:border-gray-300 print:text-black';
    }
  };

  const getHighlightColor = (impact: 'positive' | 'negative' | 'neutral') => {
    switch (impact) {
      case 'positive':
        return 'border-l-green-500 print:border-l-black';
      case 'negative':
        return 'border-l-red-500 print:border-l-black';
      default:
        return 'border-l-blue-500 print:border-l-gray-500';
    }
  };

  const calculateTargetAchievement = (value: number, target?: number) => {
    if (!target) return null;
    return (value / target) * 100;
  };

  return (
    <div className={`bg-white shadow-sm border border-gray-200 rounded-lg print:shadow-none print:border-gray-400 ${className}`}>
      {/* Header */}
      <div className="px-6 py-6 border-b border-gray-200 print:border-gray-400 bg-gradient-to-r from-blue-50 to-indigo-50 print:bg-white">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 print:text-black">
              {title}
            </h1>
            <p className="mt-2 text-sm text-gray-600 print:text-gray-800">
              Período: {period}
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center text-sm text-gray-500 print:text-gray-700">
              <ClockIcon className="w-4 h-4 mr-1" />
              Atualizado: {new Date(lastUpdated).toLocaleString('pt-BR')}
            </div>
            <p className="text-xs text-gray-400 print:text-gray-600 mt-1">RioPorto P2P</p>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="px-6 py-4 border-b border-gray-200 print:border-gray-400">
          <div className="space-y-2">
            {alerts.map((alert, index) => (
              <div key={index} className={`p-3 rounded-lg border ${getAlertColor(alert.type)}`}>
                <p className="text-sm font-medium">{alert.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key Metrics Grid */}
      <div className="px-6 py-6 border-b border-gray-200 print:border-gray-400">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 print:text-black">
          Indicadores Principais
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {keyMetrics.map((metric, index) => {
            const IconComponent = metric.icon;
            const achievement = calculateTargetAchievement(
              typeof metric.value === 'number' ? metric.value : 0, 
              metric.target
            );
            
            return (
              <div key={index} className="p-4 border border-gray-200 print:border-gray-400 rounded-lg hover:shadow-sm print:hover:shadow-none">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    {IconComponent && <IconComponent className="w-5 h-5 text-blue-600 print:text-black mr-2" />}
                    <span className="text-sm text-gray-600 print:text-gray-800">{metric.label}</span>
                  </div>
                  {getChangeIcon(metric.changeType)}
                </div>
                
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-gray-900 print:text-black">
                    {formatValue(metric.value, metric.format)}
                  </p>
                  
                  {metric.change !== undefined && (
                    <p className={`text-xs ${
                      metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    } print:text-black`}>
                      {metric.change >= 0 ? '+' : ''}{metric.change.toFixed(2)}% vs período anterior
                    </p>
                  )}
                  
                  {achievement && (
                    <div className="w-full bg-gray-200 print:bg-white rounded-full h-1.5 mt-2">
                      <div 
                        className={`h-1.5 rounded-full ${
                          achievement >= 100 ? 'bg-green-500' : 
                          achievement >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                        } print:bg-black`}
                        style={{ width: `${Math.min(achievement, 100)}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Financial & Operational Summary */}
      <div className="px-6 py-6 border-b border-gray-200 print:border-gray-400">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Financial Summary */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center print:text-black">
              <CurrencyDollarIcon className="w-5 h-5 text-green-600 print:text-black mr-2" />
              Resumo Financeiro
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 print:bg-white rounded-lg">
                <span className="text-sm text-gray-600 print:text-gray-800">Receita</span>
                <span className="font-semibold text-gray-900 print:text-black">
                  {formatValue(financialSummary.revenue, 'currency')}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 print:bg-white rounded-lg">
                <span className="text-sm text-gray-600 print:text-gray-800">Lucro</span>
                <span className="font-semibold text-gray-900 print:text-black">
                  {formatValue(financialSummary.profit, 'currency')}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 print:bg-white rounded-lg">
                <span className="text-sm text-gray-600 print:text-gray-800">Margem</span>
                <span className="font-semibold text-gray-900 print:text-black">
                  {formatValue(financialSummary.profitMargin, 'percentage')}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 print:bg-white rounded-lg">
                <span className="text-sm text-gray-600 print:text-gray-800">Fluxo de Caixa</span>
                <span className={`font-semibold ${
                  financialSummary.cashFlow >= 0 ? 'text-green-600' : 'text-red-600'
                } print:text-black`}>
                  {formatValue(financialSummary.cashFlow, 'currency')}
                </span>
              </div>
            </div>
          </div>

          {/* Operational Summary */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center print:text-black">
              <ChartBarIcon className="w-5 h-5 text-blue-600 print:text-black mr-2" />
              Resumo Operacional
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 print:bg-white rounded-lg">
                <span className="text-sm text-gray-600 print:text-gray-800">Usuários Ativos</span>
                <span className="font-semibold text-gray-900 print:text-black">
                  {formatValue(operationalSummary.activeUsers, 'number')}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 print:bg-white rounded-lg">
                <span className="text-sm text-gray-600 print:text-gray-800">Volume Transações</span>
                <span className="font-semibold text-gray-900 print:text-black">
                  {formatValue(operationalSummary.transactionVolume, 'currency')}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 print:bg-white rounded-lg">
                <span className="text-sm text-gray-600 print:text-gray-800">Valor Portfólio</span>
                <span className="font-semibold text-gray-900 print:text-black">
                  {formatValue(operationalSummary.portfolioValue, 'currency')}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 print:bg-white rounded-lg">
                <span className="text-sm text-gray-600 print:text-gray-800">Score de Risco</span>
                <span className={`font-semibold ${
                  operationalSummary.riskScore <= 30 ? 'text-green-600' :
                  operationalSummary.riskScore <= 70 ? 'text-yellow-600' : 'text-red-600'
                } print:text-black`}>
                  {formatValue(operationalSummary.riskScore, 'number')}/100
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Business Highlights */}
      <div className="px-6 py-6 border-b border-gray-200 print:border-gray-400">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 print:text-black">
          Destaques do Período
        </h3>
        <div className="space-y-3">
          {highlights.map((highlight, index) => (
            <div 
              key={index}
              className={`p-4 border-l-4 ${getHighlightColor(highlight.impact)} bg-gray-50 print:bg-white rounded-r-lg`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 print:text-black">{highlight.title}</h4>
                  <p className="text-sm text-gray-600 print:text-gray-800 mt-1">{highlight.description}</p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ml-4 ${
                  highlight.priority === 'high' 
                    ? 'bg-red-100 text-red-800 print:bg-white print:text-black' 
                    : highlight.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-800 print:bg-white print:text-black'
                      : 'bg-green-100 text-green-800 print:bg-white print:text-black'
                }`}>
                  {highlight.priority.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strategic Initiatives */}
      <div className="px-6 py-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 print:text-black">
          Iniciativas Estratégicas
        </h3>
        <ul className="space-y-2">
          {strategicInitiatives.map((initiative, index) => (
            <li key={index} className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-blue-500 print:bg-black rounded-full mt-2 mr-3"></span>
              <span className="text-sm text-gray-700 print:text-gray-900">{initiative}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}