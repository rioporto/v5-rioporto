'use client';

import React from 'react';
import { 
  TrendingUpIcon, 
  TrendingDownIcon, 
  ChartBarIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface MarketIndicator {
  name: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  significance: 'high' | 'medium' | 'low';
  unit?: 'currency' | 'percentage' | 'number';
}

interface MarketSegment {
  name: string;
  marketCap: number;
  volume: number;
  dominance: number;
  change24h: number;
  volatility: number;
}

interface MarketAnalysisProps {
  title?: string;
  period: string;
  overview: {
    totalMarketCap: number;
    totalVolume: number;
    marketDominance: number;
    volatilityIndex: number;
  };
  indicators: MarketIndicator[];
  segments: MarketSegment[];
  insights: string[];
  risks: string[];
  opportunities: string[];
  className?: string;
}

export default function MarketAnalysis({
  title = "Análise de Mercado",
  period,
  overview,
  indicators,
  segments,
  insights,
  risks,
  opportunities,
  className = ''
}: MarketAnalysisProps) {
  const formatValue = (value: number, unit: 'currency' | 'percentage' | 'number' = 'number') => {
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
      default:
        return new Intl.NumberFormat('pt-BR', {
          notation: 'compact',
          maximumFractionDigits: 1
        }).format(value);
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUpIcon className="w-4 h-4 text-green-600 print:text-black" />;
      case 'down':
        return <TrendingDownIcon className="w-4 h-4 text-red-600 print:text-black" />;
      default:
        return <ChartBarIcon className="w-4 h-4 text-gray-500 print:text-black" />;
    }
  };

  const getSignificanceColor = (significance: 'high' | 'medium' | 'low') => {
    switch (significance) {
      case 'high':
        return 'border-l-red-500 print:border-l-black';
      case 'medium':
        return 'border-l-yellow-500 print:border-l-gray-500';
      default:
        return 'border-l-green-500 print:border-l-gray-300';
    }
  };

  const getVolatilityStatus = (volatility: number) => {
    if (volatility > 0.5) return { status: 'Alta', color: 'text-red-600 print:text-black' };
    if (volatility > 0.3) return { status: 'Média', color: 'text-yellow-600 print:text-black' };
    return { status: 'Baixa', color: 'text-green-600 print:text-black' };
  };

  return (
    <div className={`bg-white shadow-sm border border-gray-200 rounded-lg print:shadow-none print:border-gray-400 ${className}`}>
      {/* Header */}
      <div className="px-6 py-6 border-b border-gray-200 print:border-gray-400">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-gray-900 print:text-black">
              {title}
            </h2>
            <p className="mt-1 text-sm text-gray-600 print:text-gray-800">
              Período: {period}
            </p>
          </div>
          <div className="text-right text-sm text-gray-500 print:text-gray-700">
            <p>Atualizado em: {new Date().toLocaleString('pt-BR')}</p>
          </div>
        </div>
      </div>

      {/* Market Overview */}
      <div className="px-6 py-6 border-b border-gray-200 print:border-gray-400">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 print:text-black">
          Visão Geral do Mercado
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 print:bg-white rounded-lg border print:border-gray-400">
            <p className="text-sm text-gray-600 print:text-gray-800">Cap. de Mercado</p>
            <p className="text-xl font-bold text-gray-900 print:text-black">
              {formatValue(overview.totalMarketCap, 'currency')}
            </p>
          </div>
          <div className="text-center p-4 bg-gray-50 print:bg-white rounded-lg border print:border-gray-400">
            <p className="text-sm text-gray-600 print:text-gray-800">Volume Total</p>
            <p className="text-xl font-bold text-gray-900 print:text-black">
              {formatValue(overview.totalVolume, 'currency')}
            </p>
          </div>
          <div className="text-center p-4 bg-gray-50 print:bg-white rounded-lg border print:border-gray-400">
            <p className="text-sm text-gray-600 print:text-gray-800">Dominância</p>
            <p className="text-xl font-bold text-gray-900 print:text-black">
              {formatValue(overview.marketDominance, 'percentage')}
            </p>
          </div>
          <div className="text-center p-4 bg-gray-50 print:bg-white rounded-lg border print:border-gray-400">
            <p className="text-sm text-gray-600 print:text-gray-800">Volatilidade</p>
            <p className="text-xl font-bold text-gray-900 print:text-black">
              {formatValue(overview.volatilityIndex, 'percentage')}
            </p>
          </div>
        </div>
      </div>

      {/* Key Indicators */}
      <div className="px-6 py-6 border-b border-gray-200 print:border-gray-400">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 print:text-black">
          Indicadores Principais
        </h3>
        <div className="space-y-3">
          {indicators.map((indicator, index) => (
            <div 
              key={index}
              className={`p-4 border-l-4 ${getSignificanceColor(indicator.significance)} bg-gray-50 print:bg-white rounded-r-lg`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  {getTrendIcon(indicator.trend)}
                  <span className="ml-2 font-medium text-gray-900 print:text-black">
                    {indicator.name}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-semibold text-gray-900 print:text-black">
                    {formatValue(indicator.value, indicator.unit)}
                  </span>
                  <span className={`text-sm ${
                    indicator.change >= 0 ? 'text-green-600' : 'text-red-600'
                  } print:text-black`}>
                    {indicator.change >= 0 ? '+' : ''}{indicator.change.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Segments */}
      <div className="px-6 py-6 border-b border-gray-200 print:border-gray-400">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 print:text-black">
          Segmentos de Mercado
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 print:divide-gray-400">
            <thead className="bg-gray-50 print:bg-white">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 print:text-gray-700 uppercase">
                  Segmento
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 print:text-gray-700 uppercase">
                  Cap. Mercado
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 print:text-gray-700 uppercase">
                  Volume
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 print:text-gray-700 uppercase">
                  Dominância
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 print:text-gray-700 uppercase">
                  Var. 24h
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 print:text-gray-700 uppercase">
                  Volatilidade
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 print:divide-gray-400">
              {segments.map((segment, index) => {
                const volatilityStatus = getVolatilityStatus(segment.volatility);
                return (
                  <tr key={index} className="hover:bg-gray-50 print:hover:bg-white">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 print:text-black">
                      {segment.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 print:text-black text-right">
                      {formatValue(segment.marketCap, 'currency')}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 print:text-black text-right">
                      {formatValue(segment.volume, 'currency')}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 print:text-black text-right">
                      {formatValue(segment.dominance, 'percentage')}
                    </td>
                    <td className={`px-4 py-3 text-sm text-right ${
                      segment.change24h >= 0 ? 'text-green-600' : 'text-red-600'
                    } print:text-black`}>
                      {segment.change24h >= 0 ? '+' : ''}{segment.change24h.toFixed(2)}%
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${volatilityStatus.color}`}>
                        {volatilityStatus.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Analysis Sections */}
      <div className="px-6 py-6 space-y-6">
        {/* Insights */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3 print:text-black">
            Principais Insights
          </h3>
          <ul className="space-y-2">
            {insights.map((insight, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 w-2 h-2 bg-blue-500 print:bg-black rounded-full mt-2 mr-3"></span>
                <span className="text-sm text-gray-700 print:text-gray-900">{insight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Risks and Opportunities */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center print:text-black">
              <ExclamationTriangleIcon className="w-5 h-5 text-red-500 print:text-black mr-2" />
              Riscos Identificados
            </h3>
            <ul className="space-y-2">
              {risks.map((risk, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 w-2 h-2 bg-red-500 print:bg-black rounded-full mt-2 mr-3"></span>
                  <span className="text-sm text-gray-700 print:text-gray-900">{risk}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center print:text-black">
              <TrendingUpIcon className="w-5 h-5 text-green-500 print:text-black mr-2" />
              Oportunidades
            </h3>
            <ul className="space-y-2">
              {opportunities.map((opportunity, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 w-2 h-2 bg-green-500 print:bg-black rounded-full mt-2 mr-3"></span>
                  <span className="text-sm text-gray-700 print:text-gray-900">{opportunity}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}