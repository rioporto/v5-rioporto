import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { 
  Shield, 
  AlertTriangle, 
  TrendingDown,
  Activity,
  Info,
  AlertCircle
} from 'lucide-react';
import { Tooltip } from '@/components/ui/Tooltip';

interface RiskMetric {
  label: string;
  value: number;
  status: 'low' | 'medium' | 'high';
  description: string;
  recommendation?: string;
}

interface RiskAnalysisProps {
  className?: string;
  overallRisk?: 'low' | 'medium' | 'high';
  riskScore?: number;
  metrics?: RiskMetric[];
}

const defaultMetrics: RiskMetric[] = [
  {
    label: 'Volatility Risk',
    value: 65,
    status: 'medium',
    description: 'Portfolio volatility is above market average',
    recommendation: 'Consider adding stablecoins or low-volatility assets'
  },
  {
    label: 'Concentration Risk',
    value: 45,
    status: 'low',
    description: 'Good asset distribution across holdings',
    recommendation: 'Maintain current diversification levels'
  },
  {
    label: 'Liquidity Risk',
    value: 30,
    status: 'low',
    description: 'Most holdings have high market liquidity',
    recommendation: 'Monitor low-cap holdings for liquidity issues'
  },
  {
    label: 'Market Risk',
    value: 72,
    status: 'high',
    description: 'High correlation with overall market movements',
    recommendation: 'Add counter-cyclical or uncorrelated assets'
  },
  {
    label: 'Technical Risk',
    value: 58,
    status: 'medium',
    description: 'Some assets showing bearish technical patterns',
    recommendation: 'Review stop-loss levels and position sizes'
  }
];

export function RiskAnalysis({ 
  className,
  overallRisk = 'medium',
  riskScore = 56,
  metrics = defaultMetrics
}: RiskAnalysisProps) {
  const getRiskColor = (status: 'low' | 'medium' | 'high') => {
    switch (status) {
      case 'low': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'high': return 'text-red-500';
    }
  };

  const getRiskBgColor = (status: 'low' | 'medium' | 'high') => {
    switch (status) {
      case 'low': return 'bg-green-500/10 border-green-500/20';
      case 'medium': return 'bg-yellow-500/10 border-yellow-500/20';
      case 'high': return 'bg-red-500/10 border-red-500/20';
    }
  };

  const getRiskIcon = (status: 'low' | 'medium' | 'high') => {
    switch (status) {
      case 'low': return <Shield className="w-5 h-5" />;
      case 'medium': return <AlertCircle className="w-5 h-5" />;
      case 'high': return <AlertTriangle className="w-5 h-5" />;
    }
  };

  return (
    <Card className={cn('p-6', className)}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          Portfolio Risk Analysis
          <Tooltip content="AI-powered risk assessment based on multiple factors">
            <Info className="w-4 h-4 text-muted-foreground" />
          </Tooltip>
        </h3>
        <Badge 
          variant="outline" 
          className={cn('capitalize', getRiskBgColor(overallRisk))}
        >
          {getRiskIcon(overallRisk)}
          <span className="ml-1">{overallRisk} risk</span>
        </Badge>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-sm text-muted-foreground">Overall Risk Score</span>
          <span className={cn('text-2xl font-bold', getRiskColor(overallRisk))}>
            {riskScore}/100
          </span>
        </div>
        <Progress value={riskScore} className="h-3" />
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>Conservative</span>
          <span>Moderate</span>
          <span>Aggressive</span>
        </div>
      </div>

      <div className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="border border-border rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Activity className={cn('w-4 h-4', getRiskColor(metric.status))} />
                <h4 className="font-medium text-sm">{metric.label}</h4>
              </div>
              <Badge 
                variant="outline" 
                className={cn('text-xs capitalize', getRiskBgColor(metric.status))}
              >
                {metric.status}
              </Badge>
            </div>
            
            <div className="mb-2">
              <Progress value={metric.value} className="h-2" />
            </div>
            
            <p className="text-xs text-muted-foreground mb-2">
              {metric.description}
            </p>
            
            {metric.recommendation && (
              <div className="flex items-start gap-2 pt-2 border-t border-border">
                <TrendingDown className="w-3 h-3 text-muted-foreground mt-0.5" />
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium">Recommendation:</span> {metric.recommendation}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-3 bg-muted/50 rounded-lg">
        <p className="text-xs text-muted-foreground">
          Risk analysis updated every 4 hours • Based on 20+ risk indicators
        </p>
      </div>
    </Card>
  );
}