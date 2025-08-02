'use client';

import React, { useState, useMemo } from 'react';
import { CalculatorIcon, TrendingUpIcon, CalendarIcon } from '@heroicons/react/24/outline';

interface ROIScenario {
  name: string;
  probability: number;
  returnRate: number;
  timeframe: number; // in months
}

interface CashFlow {
  month: number;
  inflow: number;
  outflow: number;
  netFlow: number;
}

interface ROICalculatorProps {
  title?: string;
  initialInvestment: number;
  scenarios: ROIScenario[];
  additionalCosts?: number;
  taxRate?: number;
  className?: string;
}

export default function ROICalculator({
  title = "Calculadora de ROI",
  initialInvestment,
  scenarios,
  additionalCosts = 0,
  taxRate = 0.15,
  className = ''
}: ROICalculatorProps) {
  const [selectedScenario, setSelectedScenario] = useState(0);
  const [customInvestment, setCustomInvestment] = useState(initialInvestment);
  const [customTimeframe, setCustomTimeframe] = useState(12);

  const calculations = useMemo(() => {
    const scenario = scenarios[selectedScenario] || scenarios[0];
    if (!scenario) return null;

    const totalInvestment = customInvestment + additionalCosts;
    const monthlyReturn = scenario.returnRate / 12 / 100;
    const timeframeMonths = customTimeframe;

    // Cálculo com juros compostos
    const futureValue = totalInvestment * Math.pow(1 + monthlyReturn, timeframeMonths);
    const totalReturn = futureValue - totalInvestment;
    const taxOnReturn = totalReturn * taxRate;
    const netReturn = totalReturn - taxOnReturn;
    const netFutureValue = totalInvestment + netReturn;
    
    // ROI
    const roi = (netReturn / totalInvestment) * 100;
    const annualizedROI = Math.pow(netFutureValue / totalInvestment, 12 / timeframeMonths) - 1;

    // Cash flows mensais
    const cashFlows: CashFlow[] = [];
    for (let month = 1; month <= timeframeMonths; month++) {
      const monthValue = totalInvestment * Math.pow(1 + monthlyReturn, month);
      const monthReturn = monthValue - totalInvestment;
      cashFlows.push({
        month,
        inflow: month === 1 ? totalInvestment : 0,
        outflow: 0,
        netFlow: month === timeframeMonths ? netReturn : 0
      });
    }

    return {
      scenario,
      totalInvestment,
      futureValue,
      totalReturn,
      taxOnReturn,
      netReturn,
      netFutureValue,
      roi,
      annualizedROI: annualizedROI * 100,
      cashFlows,
      breakEvenMonths: totalInvestment / (netReturn / timeframeMonths)
    };
  }, [selectedScenario, customInvestment, customTimeframe, additionalCosts, taxRate, scenarios]);

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  const formatPercentage = (value: number) => `${value.toFixed(2)}%`;

  if (!calculations) return null;

  // Probabilidade ponderada de todos os cenários
  const expectedROI = scenarios.reduce((acc, scenario) => 
    acc + (scenario.returnRate * scenario.probability / 100), 0
  );

  return (
    <div className={`bg-white shadow-sm border border-gray-200 rounded-lg print:shadow-none print:border-gray-400 ${className}`}>
      {/* Header */}
      <div className="px-6 py-6 border-b border-gray-200 print:border-gray-400">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <CalculatorIcon className="w-6 h-6 text-blue-600 print:text-black mr-3" />
            <h2 className="text-xl font-bold text-gray-900 print:text-black">{title}</h2>
          </div>
          <div className="text-right text-sm text-gray-500 print:text-gray-700">
            <p>ROI Esperado: {formatPercentage(expectedROI)}</p>
          </div>
        </div>
      </div>

      {/* Input Controls */}
      <div className="px-6 py-6 border-b border-gray-200 print:border-gray-400 bg-gray-50 print:bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 print:text-black mb-2">
              Investimento Inicial
            </label>
            <input
              type="number"
              value={customInvestment}
              onChange={(e) => setCustomInvestment(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 print:border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              step="1000"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 print:text-black mb-2">
              Período (meses)
            </label>
            <input
              type="number"
              value={customTimeframe}
              onChange={(e) => setCustomTimeframe(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 print:border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="1"
              max="120"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 print:text-black mb-2">
              Cenário
            </label>
            <select
              value={selectedScenario}
              onChange={(e) => setSelectedScenario(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 print:border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {scenarios.map((scenario, index) => (
                <option key={index} value={index}>
                  {scenario.name} ({formatPercentage(scenario.returnRate)} a.a.)
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="px-6 py-6 border-b border-gray-200 print:border-gray-400">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 print:text-black">
          Projeção de Resultados - {calculations.scenario.name}
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-blue-50 print:bg-white rounded-lg border print:border-gray-400">
            <p className="text-sm text-gray-600 print:text-gray-800">Investimento Total</p>
            <p className="text-xl font-bold text-gray-900 print:text-black">
              {formatCurrency(calculations.totalInvestment)}
            </p>
          </div>
          
          <div className="text-center p-4 bg-green-50 print:bg-white rounded-lg border print:border-gray-400">
            <p className="text-sm text-gray-600 print:text-gray-800">Valor Futuro</p>
            <p className="text-xl font-bold text-green-600 print:text-black">
              {formatCurrency(calculations.netFutureValue)}
            </p>
          </div>
          
          <div className="text-center p-4 bg-yellow-50 print:bg-white rounded-lg border print:border-gray-400">
            <p className="text-sm text-gray-600 print:text-gray-800">Retorno Líquido</p>
            <p className="text-xl font-bold text-yellow-600 print:text-black">
              {formatCurrency(calculations.netReturn)}
            </p>
          </div>
          
          <div className="text-center p-4 bg-purple-50 print:bg-white rounded-lg border print:border-gray-400">
            <p className="text-sm text-gray-600 print:text-gray-800">ROI Total</p>
            <p className="text-xl font-bold text-purple-600 print:text-black">
              {formatPercentage(calculations.roi)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 print:border-gray-400 rounded-lg">
            <div className="flex items-center mb-2">
              <TrendingUpIcon className="w-4 h-4 text-blue-600 print:text-black mr-2" />
              <span className="text-sm font-medium text-gray-900 print:text-black">ROI Anualizado</span>
            </div>
            <p className="text-lg font-semibold text-gray-900 print:text-black">
              {formatPercentage(calculations.annualizedROI)}
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 print:border-gray-400 rounded-lg">
            <div className="flex items-center mb-2">
              <CalendarIcon className="w-4 h-4 text-green-600 print:text-black mr-2" />
              <span className="text-sm font-medium text-gray-900 print:text-black">Break-even</span>
            </div>
            <p className="text-lg font-semibold text-gray-900 print:text-black">
              {Math.ceil(calculations.breakEvenMonths)} meses
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 print:border-gray-400 rounded-lg">
            <div className="flex items-center mb-2">
              <span className="w-4 h-4 text-red-600 print:text-black mr-2">📊</span>
              <span className="text-sm font-medium text-gray-900 print:text-black">Impostos</span>
            </div>
            <p className="text-lg font-semibold text-gray-900 print:text-black">
              {formatCurrency(calculations.taxOnReturn)}
            </p>
          </div>
        </div>
      </div>

      {/* Scenario Comparison */}
      <div className="px-6 py-6 border-b border-gray-200 print:border-gray-400">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 print:text-black">
          Comparação de Cenários
        </h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 print:divide-gray-400">
            <thead className="bg-gray-50 print:bg-white">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 print:text-gray-700 uppercase">
                  Cenário
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 print:text-gray-700 uppercase">
                  Probabilidade
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 print:text-gray-700 uppercase">
                  Retorno Anual
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 print:text-gray-700 uppercase">
                  ROI Projetado
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 print:text-gray-700 uppercase">
                  Valor Final
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 print:divide-gray-400">
              {scenarios.map((scenario, index) => {
                const scenarioROI = ((customInvestment * Math.pow(1 + scenario.returnRate/100, customTimeframe/12) - customInvestment) / customInvestment) * 100;
                const scenarioFinalValue = customInvestment * Math.pow(1 + scenario.returnRate/100, customTimeframe/12);
                
                return (
                  <tr 
                    key={index} 
                    className={`hover:bg-gray-50 print:hover:bg-white ${
                      index === selectedScenario ? 'bg-blue-50 print:bg-white' : ''
                    }`}
                  >
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 print:text-black">
                      {scenario.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-center text-gray-600 print:text-gray-800">
                      {formatPercentage(scenario.probability)}
                    </td>
                    <td className="px-4 py-3 text-sm text-right text-gray-900 print:text-black">
                      {formatPercentage(scenario.returnRate)}
                    </td>
                    <td className="px-4 py-3 text-sm text-right font-semibold text-gray-900 print:text-black">
                      {formatPercentage(scenarioROI)}
                    </td>
                    <td className="px-4 py-3 text-sm text-right font-semibold text-gray-900 print:text-black">
                      {formatCurrency(scenarioFinalValue)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Investment Breakdown */}
      <div className="px-6 py-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 print:text-black">
          Detalhamento do Investimento
        </h3>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-gray-200 print:border-gray-400">
            <span className="text-sm text-gray-600 print:text-gray-800">Investimento Principal</span>
            <span className="font-semibold text-gray-900 print:text-black">{formatCurrency(customInvestment)}</span>
          </div>
          
          {additionalCosts > 0 && (
            <div className="flex justify-between items-center py-2 border-b border-gray-200 print:border-gray-400">
              <span className="text-sm text-gray-600 print:text-gray-800">Custos Adicionais</span>
              <span className="font-semibold text-gray-900 print:text-black">{formatCurrency(additionalCosts)}</span>
            </div>
          )}
          
          <div className="flex justify-between items-center py-2 border-b border-gray-200 print:border-gray-400">
            <span className="text-sm text-gray-600 print:text-gray-800">Retorno Bruto Projetado</span>
            <span className="font-semibold text-green-600 print:text-black">{formatCurrency(calculations.totalReturn)}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-gray-200 print:border-gray-400">
            <span className="text-sm text-gray-600 print:text-gray-800">Impostos ({formatPercentage(taxRate * 100)})</span>
            <span className="font-semibold text-red-600 print:text-black">-{formatCurrency(calculations.taxOnReturn)}</span>
          </div>
          
          <div className="flex justify-between items-center py-3 bg-gray-50 print:bg-white px-4 rounded-lg">
            <span className="font-semibold text-gray-900 print:text-black">Retorno Líquido Total</span>
            <span className="font-bold text-lg text-green-600 print:text-black">{formatCurrency(calculations.netReturn)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}