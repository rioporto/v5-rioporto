import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
  AlertTriangle, 
  TrendingDown,
  Shield,
  Activity,
  DollarSign,
  Percent
} from 'lucide-react';

interface StressScenario {
  name: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'extreme';
  portfolioImpact: number;
  worstAsset: { symbol: string; impact: number };
  bestAsset: { symbol: string; impact: number };
  probability: number;
  historicalExample?: string;
}

interface StressTestProps {
  className?: string;
  scenarios?: StressScenario[];
  currentPortfolioValue?: number;
}

const defaultScenarios: StressScenario[] = [
  {
    name: 'Market Flash Crash',
    description: 'Sudden 30% market-wide selloff within 24 hours',
    severity: 'extreme',
    portfolioImpact: -32.5,
    worstAsset: { symbol: 'SOL', impact: -45.2 },
    bestAsset: { symbol: 'USDT', impact: 0 },
    probability: 5,
    historicalExample: 'March 2020 COVID crash'
  },
  {
    name: 'Regulatory Crackdown',
    description: 'Major economy bans crypto trading',
    severity: 'high',
    portfolioImpact: -22.8,
    worstAsset: { symbol: 'BNB', impact: -35.5 },
    bestAsset: { symbol: 'BTC', impact: -15.2 },
    probability: 15,
    historicalExample: 'China mining ban 2021'
  },
  {
    name: 'DeFi Protocol Hack',
    description: 'Major DeFi protocol exploited for $1B+',
    severity: 'medium',
    portfolioImpact: -12.5,
    worstAsset: { symbol: 'ETH', impact: -18.8 },
    bestAsset: { symbol: 'BTC', impact: -5.2 },
    probability: 25,
    historicalExample: 'FTX collapse 2022'
  },
  {
    name: 'Stablecoin Depeg',
    description: 'Major stablecoin loses parity with USD',
    severity: 'high',
    portfolioImpact: -18.2,
    worstAsset: { symbol: 'USDC', impact: -25.0 },
    bestAsset: { symbol: 'BTC', impact: -8.5 },
    probability: 10,
    historicalExample: 'UST collapse 2022'
  },
  {
    name: 'Interest Rate Shock',
    description: 'Central banks raise rates by 200bps',
    severity: 'medium',
    portfolioImpact: -15.8,
    worstAsset: { symbol: 'ADA', impact: -22.3 },
    bestAsset: { symbol: 'USDT', impact: 0 },
    probability: 30,
    historicalExample: '2022 Fed tightening'
  }
];

export function StressTest({ 
  className,
  scenarios = defaultScenarios,
  currentPortfolioValue = 100000
}: StressTestProps) {
  const getSeverityColor = (severity: StressScenario['severity']) => {
    switch (severity) {
      case 'extreme': return 'text-red-600';
      case 'high': return 'text-red-500';
      case 'medium': return 'text-orange-500';
      case 'low': return 'text-yellow-500';
    }
  };

  const getSeverityBgColor = (severity: StressScenario['severity']) => {
    switch (severity) {
      case 'extreme': return 'bg-red-600/10 border-red-600/20';
      case 'high': return 'bg-red-500/10 border-red-500/20';
      case 'medium': return 'bg-orange-500/10 border-orange-500/20';
      case 'low': return 'bg-yellow-500/10 border-yellow-500/20';
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatImpact = (impact: number) => {
    return `${impact > 0 ? '+' : ''}${impact.toFixed(1)}%`;
  };

  return (
    <Card className={cn('p-6', className)}>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            Stress Test Analysis
            <Shield className="w-5 h-5 text-muted-foreground" />
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Portfolio resilience under extreme market conditions
          </p>
        </div>
        <Badge variant="outline" className="text-xs">
          {scenarios.length} Scenarios
        </Badge>
      </div>

      <div className="space-y-4">
        {scenarios.map((scenario, idx) => (
          <div
            key={idx}
            className={cn(
              'p-4 rounded-lg border',
              getSeverityBgColor(scenario.severity)
            )}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <AlertTriangle className={cn('w-5 h-5 mt-0.5', getSeverityColor(scenario.severity))} />
                <div>
                  <h4 className="font-medium flex items-center gap-2">
                    {scenario.name}
                    <Badge 
                      variant="outline" 
                      className={cn('text-xs capitalize', getSeverityBgColor(scenario.severity))}
                    >
                      {scenario.severity}
                    </Badge>
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {scenario.description}
                  </p>
                  {scenario.historicalExample && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Historical precedent: {scenario.historicalExample}
                    </p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Probability</div>
                <div className="text-lg font-bold">{scenario.probability}%</div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <DollarSign className="w-3 h-3" />
                  <span className="text-xs">Portfolio Impact</span>
                </div>
                <p className={cn('text-lg font-bold', scenario.portfolioImpact < 0 ? 'text-red-500' : 'text-green-500')}>
                  {formatImpact(scenario.portfolioImpact)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatCurrency(currentPortfolioValue * (1 + scenario.portfolioImpact / 100))}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <TrendingDown className="w-3 h-3" />
                  <span className="text-xs">Most Affected</span>
                </div>
                <p className="text-sm font-bold">{scenario.worstAsset.symbol}</p>
                <p className="text-xs font-medium text-red-500">
                  {formatImpact(scenario.worstAsset.impact)}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Shield className="w-3 h-3" />
                  <span className="text-xs">Least Affected</span>
                </div>
                <p className="text-sm font-bold">{scenario.bestAsset.symbol}</p>
                <p className="text-xs font-medium text-green-500">
                  {formatImpact(scenario.bestAsset.impact)}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Activity className="w-3 h-3" />
                  <span className="text-xs">Risk Score</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        'h-full rounded-full',
                        scenario.severity === 'extreme' && 'bg-red-600',
                        scenario.severity === 'high' && 'bg-red-500',
                        scenario.severity === 'medium' && 'bg-orange-500',
                        scenario.severity === 'low' && 'bg-yellow-500'
                      )}
                      style={{ width: `${Math.abs(scenario.portfolioImpact) * 2}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
          <Shield className="w-4 h-4 text-muted-foreground" />
          Risk Mitigation Strategies
        </h4>
        <ul className="space-y-2 text-xs text-muted-foreground">
          <li className="flex items-start gap-2">
            <Percent className="w-3 h-3 mt-0.5" />
            <span>Maintain 10-20% stablecoin allocation as a buffer</span>
          </li>
          <li className="flex items-start gap-2">
            <Shield className="w-3 h-3 mt-0.5" />
            <span>Use stop-loss orders on volatile positions</span>
          </li>
          <li className="flex items-start gap-2">
            <Activity className="w-3 h-3 mt-0.5" />
            <span>Regularly rebalance to maintain target allocation</span>
          </li>
          <li className="flex items-start gap-2">
            <DollarSign className="w-3 h-3 mt-0.5" />
            <span>Consider hedging strategies during high-risk periods</span>
          </li>
        </ul>
      </div>
    </Card>
  );
}