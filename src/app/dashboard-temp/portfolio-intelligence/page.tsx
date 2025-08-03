'use client';

import React from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Container } from '@/components/layout/Container';
import { 
  PortfolioScore,
  KeyInsights,
  MarketSentiment,
  AssetCorrelation 
} from '@/components/portfolio-intelligence/insights';
import {
  RiskAnalysis,
  PerformanceBreakdown,
  DiversificationChart,
  VolatilityTracker
} from '@/components/portfolio-intelligence/analysis';
import {
  PricePredictions,
  TrendForecast,
  AIProjections,
  ScenarioAnalysis
} from '@/components/portfolio-intelligence/predictions';
import {
  RiskHeatmap,
  StressTest
} from '@/components/portfolio-intelligence/risk';
import {
  PerformanceMetrics
} from '@/components/portfolio-intelligence/performance';
import {
  ActionableInsights
} from '@/components/portfolio-intelligence/recommendations';
import {
  AlertCenter
} from '@/components/portfolio-intelligence/alerts';
import { Tabs } from '@/components/ui/Tabs';
import { Brain, Activity, TrendingUp, Shield, Bell } from 'lucide-react';

export default function PortfolioIntelligencePage() {
  const tabs = [
    {
      value: 'overview',
      label: 'Overview',
      icon: <Brain className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PortfolioScore score={85} />
            <PerformanceMetrics />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <KeyInsights />
            <ActionableInsights />
          </div>
          <AlertCenter />
        </div>
      )
    },
    {
      value: 'analysis',
      label: 'Analysis',
      icon: <Activity className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RiskAnalysis />
            <DiversificationChart />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PerformanceBreakdown />
            <VolatilityTracker />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MarketSentiment />
            <AssetCorrelation />
          </div>
        </div>
      )
    },
    {
      value: 'predictions',
      label: 'Predictions',
      icon: <TrendingUp className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          <PricePredictions />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TrendForecast />
            <AIProjections />
          </div>
          <ScenarioAnalysis />
        </div>
      )
    },
    {
      value: 'risk',
      label: 'Risk Management',
      icon: <Shield className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          <RiskHeatmap />
          <StressTest />
          <RiskAnalysis />
        </div>
      )
    }
  ];

  return (
    <ProtectedRoute>
      <Container className="py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Portfolio Intelligence
          </h1>
          <p className="text-muted-foreground">
            AI-powered insights and analysis for your crypto portfolio
          </p>
        </div>

        <Tabs defaultValue="overview" tabs={tabs} className="space-y-6" />
      </Container>
    </ProtectedRoute>
  );
}