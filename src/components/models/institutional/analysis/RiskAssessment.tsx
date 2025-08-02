'use client';

import React from 'react';
import { 
  ShieldCheck as ShieldExclamationIcon, 
  AlertTriangle as ExclamationTriangleIcon,
  CheckCircle as CheckCircleIcon,
  XCircle as XCircleIcon
} from 'lucide-react';

interface RiskFactor {
  category: string;
  name: string;
  level: 'low' | 'medium' | 'high' | 'critical';
  probability: number; // 0-100
  impact: number; // 0-100
  description: string;
  mitigation?: string[];
  status: 'monitored' | 'mitigated' | 'accepted' | 'transferred';
}

interface RiskMetrics {
  totalRiskExposure: number;
  riskAdjustedReturn: number;
  valueAtRisk: number;
  sharpeRatio: number;
  maxDrawdown: number;
  volatility: number;
}

interface RiskAssessmentProps {
  title?: string;
  assessmentDate: string;
  portfolio: string;
  riskFactors: RiskFactor[];
  metrics: RiskMetrics;
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  recommendations: string[];
  className?: string;
}

export default function RiskAssessment({
  title = "Avaliação de Risco",
  assessmentDate,
  portfolio,
  riskFactors,
  metrics,
  riskTolerance,
  recommendations,
  className = ''
}: RiskAssessmentProps) {
  const getRiskLevelColor = (level: 'low' | 'medium' | 'high' | 'critical') => {
    switch (level) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200 print:bg-white print:text-black print:border-black';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200 print:bg-white print:text-black print:border-gray-600';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200 print:bg-white print:text-black print:border-gray-400';
      default:
        return 'bg-green-100 text-green-800 border-green-200 print:bg-white print:text-black print:border-gray-300';
    }
  };

  const getStatusIcon = (status: 'monitored' | 'mitigated' | 'accepted' | 'transferred') => {
    switch (status) {
      case 'mitigated':
        return <CheckCircleIcon className="w-4 h-4 text-green-600 print:text-black" />;
      case 'accepted':
        return <ExclamationTriangleIcon className="w-4 h-4 text-yellow-600 print:text-black" />;
      case 'transferred':
        return <ShieldExclamationIcon className="w-4 h-4 text-blue-600 print:text-black" />;
      default:
        return <XCircleIcon className="w-4 h-4 text-red-600 print:text-black" />;
    }
  };

  const calculateRiskScore = (probability: number, impact: number) => {
    return (probability * impact) / 100;
  };

  const getRiskToleranceDescription = (tolerance: 'conservative' | 'moderate' | 'aggressive') => {
    switch (tolerance) {
      case 'conservative':
        return 'Baixa tolerância ao risco, priorizando preservação de capital';
      case 'aggressive':
        return 'Alta tolerância ao risco, buscando máximo retorno';
      default:
        return 'Tolerância moderada ao risco, equilibrando retorno e segurança';
    }
  };

  const formatPercentage = (value: number) => `${value.toFixed(2)}%`;
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  // Agrupamento de riscos por categoria
  const risksByCategory = riskFactors.reduce((acc, risk) => {
    if (!acc[risk.category]) acc[risk.category] = [];
    acc[risk.category].push(risk);
    return acc;
  }, {} as Record<string, RiskFactor[]>);

  // Distribuição de riscos por nível
  const riskDistribution = riskFactors.reduce((acc, risk) => {
    acc[risk.level] = (acc[risk.level] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

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
              Portfolio: {portfolio}
            </p>
            <p className="text-sm text-gray-600 print:text-gray-800">
              Data da Avaliação: {new Date(assessmentDate).toLocaleDateString('pt-BR')}
            </p>
          </div>
          <div className="text-right">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              riskTolerance === 'conservative' 
                ? 'bg-green-100 text-green-800 print:bg-white print:text-black' 
                : riskTolerance === 'aggressive'
                  ? 'bg-red-100 text-red-800 print:bg-white print:text-black'
                  : 'bg-yellow-100 text-yellow-800 print:bg-white print:text-black'
            }`}>
              Perfil: {riskTolerance.toUpperCase()}
            </div>
            <p className="text-xs text-gray-500 print:text-gray-700 mt-1 max-w-xs">
              {getRiskToleranceDescription(riskTolerance)}
            </p>
          </div>
        </div>
      </div>

      {/* Risk Metrics Summary */}
      <div className="px-6 py-6 border-b border-gray-200 print:border-gray-400">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 print:text-black">
          Métricas de Risco
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 print:bg-white rounded-lg border print:border-gray-400">
            <p className="text-sm text-gray-600 print:text-gray-800">Exposição Total</p>
            <p className="text-xl font-bold text-gray-900 print:text-black">
              {formatPercentage(metrics.totalRiskExposure)}
            </p>
          </div>
          <div className="text-center p-4 bg-gray-50 print:bg-white rounded-lg border print:border-gray-400">
            <p className="text-sm text-gray-600 print:text-gray-800">VaR (95%)</p>
            <p className="text-xl font-bold text-gray-900 print:text-black">
              {formatCurrency(metrics.valueAtRisk)}
            </p>
          </div>
          <div className="text-center p-4 bg-gray-50 print:bg-white rounded-lg border print:border-gray-400">
            <p className="text-sm text-gray-600 print:text-gray-800">Sharpe Ratio</p>
            <p className="text-xl font-bold text-gray-900 print:text-black">
              {metrics.sharpeRatio.toFixed(2)}
            </p>
          </div>
          <div className="text-center p-4 bg-gray-50 print:bg-white rounded-lg border print:border-gray-400">
            <p className="text-sm text-gray-600 print:text-gray-800">Max Drawdown</p>
            <p className="text-xl font-bold text-gray-900 print:text-black">
              {formatPercentage(metrics.maxDrawdown)}
            </p>
          </div>
          <div className="text-center p-4 bg-gray-50 print:bg-white rounded-lg border print:border-gray-400">
            <p className="text-sm text-gray-600 print:text-gray-800">Volatilidade</p>
            <p className="text-xl font-bold text-gray-900 print:text-black">
              {formatPercentage(metrics.volatility)}
            </p>
          </div>
          <div className="text-center p-4 bg-gray-50 print:bg-white rounded-lg border print:border-gray-400">
            <p className="text-sm text-gray-600 print:text-gray-800">Retorno Ajustado</p>
            <p className="text-xl font-bold text-gray-900 print:text-black">
              {formatPercentage(metrics.riskAdjustedReturn)}
            </p>
          </div>
        </div>
      </div>

      {/* Risk Distribution */}
      <div className="px-6 py-6 border-b border-gray-200 print:border-gray-400">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 print:text-black">
          Distribuição de Riscos
        </h3>
        <div className="grid grid-cols-4 gap-4">
          {Object.entries(riskDistribution).map(([level, count]) => (
            <div key={level} className={`p-3 rounded-lg border ${getRiskLevelColor(level as any)}`}>
              <div className="text-center">
                <p className="text-2xl font-bold">{count}</p>
                <p className="text-xs uppercase font-medium">{level}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Factors by Category */}
      <div className="px-6 py-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 print:text-black">
          Fatores de Risco por Categoria
        </h3>
        
        {Object.entries(risksByCategory).map(([category, risks]) => (
          <div key={category} className="mb-8 print:break-inside-avoid">
            <h4 className="text-md font-semibold text-gray-800 mb-4 print:text-black">
              {category} ({risks.length} riscos)
            </h4>
            
            <div className="space-y-4">
              {risks.map((risk, index) => (
                <div key={index} className="border border-gray-200 print:border-gray-400 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h5 className="font-medium text-gray-900 print:text-black">{risk.name}</h5>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRiskLevelColor(risk.level)}`}>
                          {risk.level.toUpperCase()}
                        </span>
                        {getStatusIcon(risk.status)}
                      </div>
                      <p className="text-sm text-gray-600 print:text-gray-800 mt-2">{risk.description}</p>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-sm text-gray-600 print:text-gray-800">
                        <p>Prob: {risk.probability}%</p>
                        <p>Impacto: {risk.impact}%</p>
                      </div>
                      <div className="mt-1">
                        <span className="text-lg font-semibold text-gray-900 print:text-black">
                          {calculateRiskScore(risk.probability, risk.impact).toFixed(1)}
                        </span>
                        <span className="text-xs text-gray-500 print:text-gray-700 ml-1">score</span>
                      </div>
                    </div>
                  </div>
                  
                  {risk.mitigation && risk.mitigation.length > 0 && (
                    <div className="mt-3 p-3 bg-gray-50 print:bg-white rounded border print:border-gray-300">
                      <p className="text-sm font-medium text-gray-900 print:text-black mb-2">Medidas de Mitigação:</p>
                      <ul className="text-sm text-gray-700 print:text-gray-900 space-y-1">
                        {risk.mitigation.map((measure, i) => (
                          <li key={i} className="flex items-start">
                            <span className="flex-shrink-0 w-1.5 h-1.5 bg-blue-500 print:bg-black rounded-full mt-2 mr-2"></span>
                            {measure}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="px-6 py-6 border-t border-gray-200 print:border-gray-400 bg-gray-50 print:bg-white">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 print:text-black">
          Recomendações de Gestão de Risco
        </h3>
        <ul className="space-y-3">
          {recommendations.map((recommendation, index) => (
            <li key={index} className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-blue-500 print:bg-black rounded-full mt-2 mr-3"></span>
              <span className="text-sm text-gray-700 print:text-gray-900">{recommendation}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}