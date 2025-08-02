'use client';

import React, { useState } from 'react';
import { 
  DollarSign as CurrencyDollarIcon, 
  Calendar as CalendarIcon, 
  FileText as DocumentTextIcon,
  AlertTriangle as ExclamationTriangleIcon,
  CheckCircle as CheckCircleIcon
} from 'lucide-react';

interface InvestmentOption {
  id: string;
  name: string;
  type: 'stocks' | 'bonds' | 'crypto' | 'funds' | 'alternatives';
  minInvestment: number;
  expectedReturn: number;
  riskLevel: 'low' | 'medium' | 'high';
  liquidity: 'daily' | 'monthly' | 'quarterly' | 'annual';
  fees: number;
}

interface InvestmentFormData {
  investorProfile: 'conservative' | 'moderate' | 'aggressive';
  investmentGoal: 'preservation' | 'income' | 'growth' | 'speculation';
  timeHorizon: number; // in months
  initialAmount: number;
  monthlyContribution: number;
  selectedProducts: string[];
  riskTolerance: number; // 1-10 scale
  additionalNotes: string;
}

interface InvestmentFormProps {
  title?: string;
  availableProducts: InvestmentOption[];
  onSubmit: (data: InvestmentFormData) => void;
  onCancel?: () => void;
  className?: string;
}

export default function InvestmentForm({
  title = "Formulário de Investimento Institucional",
  availableProducts,
  onSubmit,
  onCancel,
  className = ''
}: InvestmentFormProps) {
  const [formData, setFormData] = useState<InvestmentFormData>({
    investorProfile: 'moderate',
    investmentGoal: 'growth',
    timeHorizon: 12,
    initialAmount: 0,
    monthlyContribution: 0,
    selectedProducts: [],
    riskTolerance: 5,
    additionalNotes: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const steps = [
    { id: 1, name: 'Perfil do Investidor', description: 'Defina seu perfil e objetivos' },
    { id: 2, name: 'Valores e Prazo', description: 'Determine valores e cronograma' },
    { id: 3, name: 'Seleção de Produtos', description: 'Escolha os produtos de investimento' },
    { id: 4, name: 'Revisão e Confirmação', description: 'Revise e confirme os dados' }
  ];

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.investorProfile) errors.investorProfile = 'Selecione um perfil de investidor';
        if (!formData.investmentGoal) errors.investmentGoal = 'Selecione um objetivo de investimento';
        if (formData.riskTolerance < 1 || formData.riskTolerance > 10) {
          errors.riskTolerance = 'Tolerância ao risco deve estar entre 1 e 10';
        }
        break;
      case 2:
        if (formData.initialAmount < 1000) errors.initialAmount = 'Valor mínimo de R$ 1.000';
        if (formData.timeHorizon < 1) errors.timeHorizon = 'Prazo mínimo de 1 mês';
        if (formData.monthlyContribution < 0) errors.monthlyContribution = 'Valor inválido';
        break;
      case 3:
        if (formData.selectedProducts.length === 0) {
          errors.selectedProducts = 'Selecione pelo menos um produto';
        }
        break;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      onSubmit(formData);
    }
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  const getRiskColor = (risk: 'low' | 'medium' | 'high') => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-50 print:text-black print:bg-white';
      case 'medium': return 'text-yellow-600 bg-yellow-50 print:text-black print:bg-white';
      case 'high': return 'text-red-600 bg-red-50 print:text-black print:bg-white';
    }
  };

  const calculateProjectedValue = () => {
    const monthlyReturn = 0.008; // 0.8% ao mês (exemplo)
    const totalMonths = formData.timeHorizon;
    const futureValue = formData.initialAmount * Math.pow(1 + monthlyReturn, totalMonths) +
      formData.monthlyContribution * (Math.pow(1 + monthlyReturn, totalMonths) - 1) / monthlyReturn;
    return futureValue;
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 print:text-black mb-3">
          Perfil do Investidor
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { value: 'conservative', label: 'Conservador', desc: 'Prioriza segurança e preservação do capital' },
            { value: 'moderate', label: 'Moderado', desc: 'Equilibra risco e retorno' },
            { value: 'aggressive', label: 'Agressivo', desc: 'Busca máximo retorno, aceita alto risco' }
          ].map(profile => (
            <div key={profile.value} className="relative">
              <input
                type="radio"
                id={profile.value}
                name="investorProfile"
                value={profile.value}
                checked={formData.investorProfile === profile.value}
                onChange={(e) => setFormData(prev => ({ ...prev, investorProfile: e.target.value as any }))}
                className="sr-only"
              />
              <label
                htmlFor={profile.value}
                className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.investorProfile === profile.value
                    ? 'border-blue-500 bg-blue-50 print:border-black print:bg-white'
                    : 'border-gray-200 hover:border-gray-300 print:border-gray-400'
                }`}
              >
                <div className="font-medium text-gray-900 print:text-black">{profile.label}</div>
                <div className="text-sm text-gray-600 print:text-gray-800 mt-1">{profile.desc}</div>
              </label>
            </div>
          ))}
        </div>
        {validationErrors.investorProfile && (
          <p className="text-red-600 print:text-black text-sm mt-1">{validationErrors.investorProfile}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 print:text-black mb-3">
          Objetivo do Investimento
        </label>
        <select
          value={formData.investmentGoal}
          onChange={(e) => setFormData(prev => ({ ...prev, investmentGoal: e.target.value as any }))}
          className="w-full px-3 py-2 border border-gray-300 print:border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="preservation">Preservação de Capital</option>
          <option value="income">Geração de Renda</option>
          <option value="growth">Crescimento de Capital</option>
          <option value="speculation">Especulação</option>
        </select>
        {validationErrors.investmentGoal && (
          <p className="text-red-600 print:text-black text-sm mt-1">{validationErrors.investmentGoal}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 print:text-black mb-2">
          Tolerância ao Risco (1-10): {formData.riskTolerance}
        </label>
        <input
          type="range"
          min="1"
          max="10"
          value={formData.riskTolerance}
          onChange={(e) => setFormData(prev => ({ ...prev, riskTolerance: Number(e.target.value) }))}
          className="w-full h-2 bg-gray-200 print:bg-white rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 print:text-gray-700 mt-1">
          <span>Conservador</span>
          <span>Moderado</span>
          <span>Agressivo</span>
        </div>
        {validationErrors.riskTolerance && (
          <p className="text-red-600 print:text-black text-sm mt-1">{validationErrors.riskTolerance}</p>
        )}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 print:text-black mb-2">
            Valor Inicial do Investimento
          </label>
          <div className="relative">
            <CurrencyDollarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 print:text-black" />
            <input
              type="number"
              value={formData.initialAmount}
              onChange={(e) => setFormData(prev => ({ ...prev, initialAmount: Number(e.target.value) }))}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 print:border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0"
              min="1000"
              step="1000"
            />
          </div>
          {validationErrors.initialAmount && (
            <p className="text-red-600 print:text-black text-sm mt-1">{validationErrors.initialAmount}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 print:text-black mb-2">
            Aporte Mensal (Opcional)
          </label>
          <div className="relative">
            <CurrencyDollarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 print:text-black" />
            <input
              type="number"
              value={formData.monthlyContribution}
              onChange={(e) => setFormData(prev => ({ ...prev, monthlyContribution: Number(e.target.value) }))}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 print:border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0"
              min="0"
              step="100"
            />
          </div>
          {validationErrors.monthlyContribution && (
            <p className="text-red-600 print:text-black text-sm mt-1">{validationErrors.monthlyContribution}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 print:text-black mb-2">
          Prazo do Investimento (meses)
        </label>
        <div className="relative">
          <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 print:text-black" />
          <input
            type="number"
            value={formData.timeHorizon}
            onChange={(e) => setFormData(prev => ({ ...prev, timeHorizon: Number(e.target.value) }))}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 print:border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
            max="120"
          />
        </div>
        {validationErrors.timeHorizon && (
          <p className="text-red-600 print:text-black text-sm mt-1">{validationErrors.timeHorizon}</p>
        )}
      </div>

      {formData.initialAmount > 0 && (
        <div className="p-4 bg-blue-50 print:bg-white border border-blue-200 print:border-gray-400 rounded-lg">
          <h4 className="font-medium text-blue-900 print:text-black mb-2">Projeção Estimada</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-blue-700 print:text-gray-800">Valor Investido Total:</span>
              <p className="font-semibold text-blue-900 print:text-black">
                {formatCurrency(formData.initialAmount + (formData.monthlyContribution * formData.timeHorizon))}
              </p>
            </div>
            <div>
              <span className="text-blue-700 print:text-gray-800">Valor Projetado:</span>
              <p className="font-semibold text-blue-900 print:text-black">
                {formatCurrency(calculateProjectedValue())}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 print:text-black mb-4">
          Selecione os Produtos de Investimento
        </h3>
        <div className="space-y-4">
          {availableProducts.map(product => (
            <div key={product.id} className="border border-gray-200 print:border-gray-400 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id={product.id}
                  checked={formData.selectedProducts.includes(product.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData(prev => ({
                        ...prev,
                        selectedProducts: [...prev.selectedProducts, product.id]
                      }));
                    } else {
                      setFormData(prev => ({
                        ...prev,
                        selectedProducts: prev.selectedProducts.filter(id => id !== product.id)
                      }));
                    }
                  }}
                  className="mt-1"
                />
                <div className="flex-1">
                  <label htmlFor={product.id} className="block font-medium text-gray-900 print:text-black cursor-pointer">
                    {product.name}
                  </label>
                  <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                    <div>
                      <span className="text-gray-600 print:text-gray-800">Min. Investimento:</span>
                      <p className="font-medium text-gray-900 print:text-black">{formatCurrency(product.minInvestment)}</p>
                    </div>
                    <div>
                      <span className="text-gray-600 print:text-gray-800">Retorno Esperado:</span>
                      <p className="font-medium text-gray-900 print:text-black">{product.expectedReturn.toFixed(2)}% a.a.</p>
                    </div>
                    <div>
                      <span className="text-gray-600 print:text-gray-800">Risco:</span>
                      <p className={`font-medium px-2 py-1 rounded text-xs ${getRiskColor(product.riskLevel)}`}>
                        {product.riskLevel.toUpperCase()}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600 print:text-gray-800">Taxa:</span>
                      <p className="font-medium text-gray-900 print:text-black">{product.fees.toFixed(2)}%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {validationErrors.selectedProducts && (
          <p className="text-red-600 print:text-black text-sm mt-1">{validationErrors.selectedProducts}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 print:text-black mb-2">
          Observações Adicionais
        </label>
        <textarea
          value={formData.additionalNotes}
          onChange={(e) => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 print:border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Informações adicionais, restrições ou preferências específicas..."
        />
      </div>
    </div>
  );

  const renderStep4 = () => {
    const selectedProductsDetails = availableProducts.filter(p => 
      formData.selectedProducts.includes(p.id)
    );

    return (
      <div className="space-y-6">
        <div className="bg-green-50 print:bg-white border border-green-200 print:border-gray-400 rounded-lg p-4">
          <div className="flex items-center">
            <CheckCircleIcon className="w-5 h-5 text-green-600 print:text-black mr-2" />
            <h3 className="font-medium text-green-900 print:text-black">Revisão Final do Investimento</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 print:text-black mb-3">Perfil do Investidor</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 print:text-gray-800">Perfil:</span>
                <span className="font-medium text-gray-900 print:text-black">{formData.investorProfile}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 print:text-gray-800">Objetivo:</span>
                <span className="font-medium text-gray-900 print:text-black">{formData.investmentGoal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 print:text-gray-800">Tolerância ao Risco:</span>
                <span className="font-medium text-gray-900 print:text-black">{formData.riskTolerance}/10</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 print:text-black mb-3">Valores e Prazo</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 print:text-gray-800">Investimento Inicial:</span>
                <span className="font-medium text-gray-900 print:text-black">{formatCurrency(formData.initialAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 print:text-gray-800">Aporte Mensal:</span>
                <span className="font-medium text-gray-900 print:text-black">{formatCurrency(formData.monthlyContribution)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 print:text-gray-800">Prazo:</span>
                <span className="font-medium text-gray-900 print:text-black">{formData.timeHorizon} meses</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 print:text-black mb-3">Produtos Selecionados</h4>
          <div className="space-y-2">
            {selectedProductsDetails.map(product => (
              <div key={product.id} className="flex justify-between items-center p-3 bg-gray-50 print:bg-white border border-gray-200 print:border-gray-400 rounded">
                <span className="font-medium text-gray-900 print:text-black">{product.name}</span>
                <div className="text-right text-sm">
                  <div className="font-medium text-gray-900 print:text-black">{product.expectedReturn.toFixed(2)}% a.a.</div>
                  <div className="text-gray-600 print:text-gray-800">Min: {formatCurrency(product.minInvestment)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {formData.additionalNotes && (
          <div>
            <h4 className="font-medium text-gray-900 print:text-black mb-3">Observações</h4>
            <p className="text-sm text-gray-700 print:text-gray-900 p-3 bg-gray-50 print:bg-white border border-gray-200 print:border-gray-400 rounded">
              {formData.additionalNotes}
            </p>
          </div>
        )}

        <div className="bg-yellow-50 print:bg-white border border-yellow-200 print:border-gray-400 rounded-lg p-4">
          <div className="flex items-start">
            <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 print:text-black mr-2 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-yellow-900 print:text-black">Declaração de Responsabilidade</p>
              <p className="text-yellow-800 print:text-gray-900 mt-1">
                Confirmo que as informações fornecidas são verdadeiras e que estou ciente dos riscos envolvidos nos investimentos selecionados.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`bg-white shadow-sm border border-gray-200 rounded-lg print:shadow-none print:border-gray-400 ${className}`}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 print:border-gray-400">
        <h2 className="text-xl font-bold text-gray-900 print:text-black">{title}</h2>
        <p className="text-sm text-gray-600 print:text-gray-800 mt-1">
          Preencha todas as informações para estruturar seu investimento
        </p>
      </div>

      {/* Progress Steps */}
      <div className="px-6 py-4 border-b border-gray-200 print:border-gray-400">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                step.id <= currentStep
                  ? 'bg-blue-600 print:bg-black text-white print:text-white'
                  : 'bg-gray-200 print:bg-white text-gray-600 print:text-black border print:border-gray-400'
              }`}>
                {step.id}
              </div>
              <div className="ml-3 hidden md:block">
                <p className="text-sm font-medium text-gray-900 print:text-black">{step.name}</p>
                <p className="text-xs text-gray-500 print:text-gray-700">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className={`mx-4 w-12 h-0.5 ${
                  step.id < currentStep ? 'bg-blue-600 print:bg-black' : 'bg-gray-200 print:bg-gray-400'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="px-6 py-6">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
      </div>

      {/* Footer Actions */}
      <div className="px-6 py-4 border-t border-gray-200 print:border-gray-400 flex justify-between">
        <div>
          {currentStep > 1 && (
            <button
              onClick={handlePrevious}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 print:border-gray-400 rounded-md hover:bg-gray-50 print:hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Anterior
            </button>
          )}
        </div>
        
        <div className="flex space-x-3">
          {onCancel && (
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 print:border-gray-400 rounded-md hover:bg-gray-50 print:hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Cancelar
            </button>
          )}
          
          {currentStep < steps.length ? (
            <button
              onClick={handleNext}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 print:bg-black border border-transparent rounded-md hover:bg-blue-700 print:hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Próximo
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 print:bg-black border border-transparent rounded-md hover:bg-green-700 print:hover:bg-black focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Confirmar Investimento
            </button>
          )}
        </div>
      </div>
    </div>
  );
}