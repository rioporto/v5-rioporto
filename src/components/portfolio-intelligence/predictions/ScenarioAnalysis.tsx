import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';
import { 
  TrendingUp,
  TrendingDown,
  Activity,
  Zap,
  Cloud,
  Sun,
  CloudRain,
  AlertTriangle
} from 'lucide-react';

interface Scenario {
  name: string;
  probability: number;
  portfolioImpact: number;
  description: string;
  triggers: string[];
  recommendations: string[];
  affectedAssets: Array<{
    asset: string;
    impact: number;
  }>;
}

interface ScenarioAnalysisProps {
  className?: string;
  scenarios?: {
    bullish: Scenario;
    neutral: Scenario;
    bearish: Scenario;
  };
}

const defaultScenarios = {
  bullish: {
    name: 'Bull Market Continuation',
    probability: 35,
    portfolioImpact: +42.5,
    description: 'Institutional adoption accelerates, regulatory clarity improves, and macro conditions favor risk assets.',
    triggers: [
      'Bitcoin ETF approvals expand globally',
      'Major corporations add BTC to balance sheets',
      'Fed pivots to accommodative policy',
      'DeFi TVL exceeds $500B'
    ],
    recommendations: [
      'Maintain current allocation',
      'Consider profit-taking at resistance levels',
      'Keep some dry powder for corrections',
      'Monitor overbought conditions'
    ],
    affectedAssets: [
      { asset: 'BTC', impact: +45 },
      { asset: 'ETH', impact: +52 },
      { asset: 'SOL', impact: +68 },
      { asset: 'LINK', impact: +75 }
    ]
  },
  neutral: {
    name: 'Sideways Consolidation',
    probability: 45,
    portfolioImpact: +8.2,
    description: 'Market enters extended consolidation phase with range-bound trading and sector rotation.',
    triggers: [
      'Regulatory uncertainty persists',
      'Macro conditions remain mixed',
      'Bitcoin dominance stabilizes',
      'Institutional interest plateaus'
    ],
    recommendations: [
      'Focus on yield-generating strategies',
      'Trade ranges with tight stops',
      'Accumulate during dips',
      'Diversify into trending sectors'
    ],
    affectedAssets: [
      { asset: 'BTC', impact: +5 },
      { asset: 'ETH', impact: +12 },
      { asset: 'Stablecoins', impact: 0 },
      { asset: 'DeFi', impact: +18 }
    ]
  },
  bearish: {
    name: 'Market Correction',
    probability: 20,
    portfolioImpact: -28.3,
    description: 'Risk-off sentiment dominates as macro headwinds intensify and regulatory crackdowns increase.',
    triggers: [
      'Major exchange hack or failure',
      'Aggressive regulatory enforcement',
      'Global recession fears',
      'Liquidity crisis in crypto markets'
    ],
    recommendations: [
      'Increase stablecoin allocation',
      'Set stop-losses on all positions',
      'Prepare shopping list for accumulation',
      'Consider hedging strategies'
    ],
    affectedAssets: [
      { asset: 'BTC', impact: -25 },
      { asset: 'ETH', impact: -32 },
      { asset: 'Altcoins', impact: -45 },
      { asset: 'Stablecoins', impact: 0 }
    ]
  }
};

export function ScenarioAnalysis({ 
  className,
  scenarios = defaultScenarios
}: ScenarioAnalysisProps) {
  const getScenarioIcon = (type: 'bullish' | 'neutral' | 'bearish') => {
    switch (type) {
      case 'bullish': return <Sun className="w-5 h-5" />;
      case 'neutral': return <Cloud className="w-5 h-5" />;
      case 'bearish': return <CloudRain className="w-5 h-5" />;
    }
  };

  const getScenarioColor = (type: 'bullish' | 'neutral' | 'bearish') => {
    switch (type) {
      case 'bullish': return 'text-green-500';
      case 'neutral': return 'text-yellow-500';
      case 'bearish': return 'text-red-500';
    }
  };

  const getImpactColor = (impact: number) => {
    if (impact > 0) return 'text-green-500';
    if (impact < 0) return 'text-red-500';
    return 'text-gray-500';
  };

  const formatImpact = (impact: number) => {
    return `${impact > 0 ? '+' : ''}${impact.toFixed(1)}%`;
  };

  const renderScenario = (scenario: Scenario, type: 'bullish' | 'neutral' | 'bearish') => (
    <div className="space-y-4 pt-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className={cn('mt-1', getScenarioColor(type))}>
            {getScenarioIcon(type)}
          </div>
          <div>
            <h4 className="font-medium text-lg">{scenario.name}</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {scenario.description}
            </p>
          </div>
        </div>
        <Badge 
          variant="outline" 
          className={cn(
            'text-sm',
            type === 'bullish' && 'border-green-500/20 text-green-500',
            type === 'neutral' && 'border-yellow-500/20 text-yellow-500',
            type === 'bearish' && 'border-red-500/20 text-red-500'
          )}
        >
          {scenario.probability}% probability
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Portfolio Impact</span>
            {scenario.portfolioImpact > 0 ? 
              <TrendingUp className="w-4 h-4 text-green-500" /> : 
              <TrendingDown className="w-4 h-4 text-red-500" />
            }
          </div>
          <p className={cn('text-2xl font-bold', getImpactColor(scenario.portfolioImpact))}>
            {formatImpact(scenario.portfolioImpact)}
          </p>
        </div>

        <div className="p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Likelihood</span>
            <Activity className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-background rounded-full overflow-hidden">
              <div 
                className={cn(
                  'h-full rounded-full',
                  type === 'bullish' && 'bg-green-500',
                  type === 'neutral' && 'bg-yellow-500',
                  type === 'bearish' && 'bg-red-500'
                )}
                style={{ width: `${scenario.probability}%` }}
              />
            </div>
            <span className="text-sm font-medium">{scenario.probability}%</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <h5 className="text-sm font-medium mb-2 flex items-center gap-2">
            <Zap className="w-3 h-3 text-muted-foreground" />
            Potential Triggers
          </h5>
          <ul className="space-y-1">
            {scenario.triggers.map((trigger, idx) => (
              <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                <span className="block w-1 h-1 rounded-full bg-muted-foreground mt-1.5" />
                {trigger}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2 flex items-center gap-2">
            <AlertTriangle className="w-3 h-3 text-muted-foreground" />
            Recommendations
          </h5>
          <ul className="space-y-1">
            {scenario.recommendations.map((rec, idx) => (
              <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                <span className="block w-1 h-1 rounded-full bg-primary mt-1.5" />
                {rec}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2">Asset Impact</h5>
          <div className="grid grid-cols-2 gap-2">
            {scenario.affectedAssets.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 bg-background rounded">
                <span className="text-xs font-medium">{item.asset}</span>
                <span className={cn('text-xs font-bold', getImpactColor(item.impact))}>
                  {formatImpact(item.impact)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    {
      value: 'bullish',
      label: 'Bull Case',
      content: renderScenario(scenarios.bullish, 'bullish')
    },
    {
      value: 'neutral',
      label: 'Base Case',
      content: renderScenario(scenarios.neutral, 'neutral')
    },
    {
      value: 'bearish',
      label: 'Bear Case',
      content: renderScenario(scenarios.bearish, 'bearish')
    }
  ];

  return (
    <Card className={cn('p-6', className)}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Scenario Analysis
        </h3>
        <Badge variant="outline" className="text-xs">
          Q1 2024 Outlook
        </Badge>
      </div>

      <Tabs defaultValue="neutral" tabs={tabs} />

      <div className="mt-6 p-3 bg-muted/50 rounded-lg">
        <p className="text-xs text-muted-foreground">
          Scenarios based on macro analysis, on-chain data, and market structure • Updated weekly
        </p>
      </div>
    </Card>
  );
}