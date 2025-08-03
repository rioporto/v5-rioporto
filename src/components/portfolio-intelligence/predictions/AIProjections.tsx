import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { 
  Brain,
  TrendingUp,
  Target,
  Zap,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface Projection {
  id: string;
  type: 'opportunity' | 'risk' | 'action';
  title: string;
  description: string;
  probability: number;
  impact: 'high' | 'medium' | 'low';
  timeframe: string;
  confidence: number;
  factors: string[];
}

interface AIProjectionsProps {
  className?: string;
  projections?: Projection[];
  modelAccuracy?: number;
}

const defaultProjections: Projection[] = [
  {
    id: '1',
    type: 'opportunity',
    title: 'BTC Halving Rally Potential',
    description: 'Historical patterns suggest significant price appreciation in the 6 months following halving events.',
    probability: 72,
    impact: 'high',
    timeframe: '3-6 months',
    confidence: 85,
    factors: ['Historical precedent', 'Supply shock', 'Institutional interest', 'Macro conditions']
  },
  {
    id: '2',
    type: 'risk',
    title: 'Regulatory Headwinds',
    description: 'Potential regulatory changes in major markets could impact short-term price action.',
    probability: 45,
    impact: 'medium',
    timeframe: '1-3 months',
    confidence: 65,
    factors: ['SEC actions', 'EU MiCA implementation', 'Asian market policies']
  },
  {
    id: '3',
    type: 'action',
    title: 'DeFi Sector Rotation',
    description: 'AI models detect early signs of capital rotation into DeFi protocols.',
    probability: 68,
    impact: 'medium',
    timeframe: '2-4 weeks',
    confidence: 78,
    factors: ['TVL growth', 'Developer activity', 'Social sentiment', 'Yield opportunities']
  },
  {
    id: '4',
    type: 'opportunity',
    title: 'Layer 2 Adoption Surge',
    description: 'Increasing L2 adoption could benefit ETH and related ecosystems.',
    probability: 82,
    impact: 'high',
    timeframe: '2-3 months',
    confidence: 88,
    factors: ['Gas fee reduction', 'User growth', 'App deployment', 'Network effects']
  }
];

export function AIProjections({ 
  className,
  projections = defaultProjections,
  modelAccuracy = 76.8
}: AIProjectionsProps) {
  const getTypeIcon = (type: Projection['type']) => {
    switch (type) {
      case 'opportunity': return <TrendingUp className="w-4 h-4" />;
      case 'risk': return <AlertTriangle className="w-4 h-4" />;
      case 'action': return <Target className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: Projection['type']) => {
    switch (type) {
      case 'opportunity': return 'text-green-500';
      case 'risk': return 'text-red-500';
      case 'action': return 'text-blue-500';
    }
  };

  const getTypeBgColor = (type: Projection['type']) => {
    switch (type) {
      case 'opportunity': return 'bg-green-500/10 border-green-500/20';
      case 'risk': return 'bg-red-500/10 border-red-500/20';
      case 'action': return 'bg-blue-500/10 border-blue-500/20';
    }
  };

  const getImpactBadge = (impact: Projection['impact']) => {
    const colors = {
      high: 'bg-red-500/10 text-red-500 border-red-500/20',
      medium: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      low: 'bg-green-500/10 text-green-500 border-green-500/20'
    };
    return (
      <Badge variant="outline" className={cn('text-xs capitalize', colors[impact])}>
        {impact} impact
      </Badge>
    );
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 70) return 'text-green-500';
    if (probability >= 50) return 'text-yellow-500';
    return 'text-orange-500';
  };

  return (
    <Card className={cn('p-6', className)}>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            AI Market Projections
            <Brain className="w-5 h-5 text-muted-foreground" />
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Neural network predictions with {modelAccuracy}% historical accuracy
          </p>
        </div>
        <Badge variant="outline" className="text-xs">
          {projections.length} Active
        </Badge>
      </div>

      <div className="space-y-4">
        {projections.map((projection) => (
          <div
            key={projection.id}
            className={cn(
              'p-4 rounded-lg border',
              getTypeBgColor(projection.type)
            )}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <div className={cn('mt-0.5', getTypeColor(projection.type))}>
                  {getTypeIcon(projection.type)}
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">
                    {projection.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {projection.description}
                  </p>
                </div>
              </div>
              {getImpactBadge(projection.impact)}
            </div>

            <div className="grid grid-cols-3 gap-4 mb-3">
              <div>
                <span className="text-xs text-muted-foreground">Probability</span>
                <div className="flex items-center gap-2 mt-1">
                  <Progress value={projection.probability} className="h-2 flex-1" />
                  <span className={cn('text-sm font-medium', getProbabilityColor(projection.probability))}>
                    {projection.probability}%
                  </span>
                </div>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Confidence</span>
                <div className="flex items-center gap-2 mt-1">
                  <Shield className="w-3 h-3 text-muted-foreground" />
                  <span className="text-sm font-medium">{projection.confidence}%</span>
                </div>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Timeframe</span>
                <div className="flex items-center gap-2 mt-1">
                  <Zap className="w-3 h-3 text-muted-foreground" />
                  <span className="text-sm font-medium">{projection.timeframe}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-border/50">
              <span className="text-xs text-muted-foreground">Key Factors:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {projection.factors.map((factor, idx) => (
                  <Badge 
                    key={idx} 
                    variant="outline" 
                    className="text-xs bg-background/50"
                  >
                    {factor}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
          Model Performance
          <Brain className="w-3 h-3 text-muted-foreground" />
        </h4>
        <div className="grid grid-cols-3 gap-3 text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-3 h-3 text-green-500" />
            <span className="text-muted-foreground">Correct:</span>
            <span className="font-medium">312</span>
          </div>
          <div className="flex items-center gap-2">
            <XCircle className="w-3 h-3 text-red-500" />
            <span className="text-muted-foreground">Incorrect:</span>
            <span className="font-medium">94</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="w-3 h-3 text-blue-500" />
            <span className="text-muted-foreground">Accuracy:</span>
            <span className="font-medium">{modelAccuracy}%</span>
          </div>
        </div>
      </div>
    </Card>
  );
}