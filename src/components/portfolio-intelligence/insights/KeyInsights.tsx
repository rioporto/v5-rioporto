import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
  Lightbulb, 
  TrendingUp, 
  AlertTriangle, 
  Zap,
  Target,
  Shield,
  DollarSign,
  Brain
} from 'lucide-react';

interface Insight {
  id: string;
  type: 'opportunity' | 'warning' | 'trend' | 'recommendation';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact?: string;
  action?: string;
  icon?: React.ReactNode;
}

interface KeyInsightsProps {
  className?: string;
  insights?: Insight[];
}

const defaultInsights: Insight[] = [
  {
    id: '1',
    type: 'opportunity',
    priority: 'high',
    title: 'BTC Accumulation Zone Detected',
    description: 'Technical indicators suggest BTC is in a strong accumulation phase.',
    impact: '+15-20% potential in 30 days',
    action: 'Consider increasing BTC allocation',
    icon: <TrendingUp className="w-5 h-5" />
  },
  {
    id: '2',
    type: 'warning',
    priority: 'medium',
    title: 'High Correlation Risk',
    description: 'Your top 3 holdings show 85%+ correlation, reducing diversification benefits.',
    impact: 'Increased portfolio volatility',
    action: 'Diversify into uncorrelated assets',
    icon: <AlertTriangle className="w-5 h-5" />
  },
  {
    id: '3',
    type: 'trend',
    priority: 'medium',
    title: 'DeFi Sector Momentum',
    description: 'DeFi tokens showing strong on-chain metrics and adoption growth.',
    impact: 'Sector outperformance expected',
    action: 'Research DeFi allocation opportunities',
    icon: <Zap className="w-5 h-5" />
  },
  {
    id: '4',
    type: 'recommendation',
    priority: 'low',
    title: 'Rebalancing Suggested',
    description: 'Portfolio drift detected - current allocation deviates 12% from target.',
    impact: 'Optimize risk-return profile',
    action: 'Review and rebalance portfolio',
    icon: <Target className="w-5 h-5" />
  }
];

export function KeyInsights({ 
  className,
  insights = defaultInsights
}: KeyInsightsProps) {
  const getTypeColor = (type: Insight['type']) => {
    switch (type) {
      case 'opportunity': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'warning': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'trend': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'recommendation': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
    }
  };

  const getPriorityBadge = (priority: Insight['priority']) => {
    const colors = {
      high: 'bg-red-500/10 text-red-500 border-red-500/20',
      medium: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      low: 'bg-green-500/10 text-green-500 border-green-500/20'
    };
    return (
      <Badge variant="outline" className={cn('text-xs', colors[priority])}>
        {priority}
      </Badge>
    );
  };

  const getDefaultIcon = (type: Insight['type']) => {
    switch (type) {
      case 'opportunity': return <DollarSign className="w-5 h-5" />;
      case 'warning': return <Shield className="w-5 h-5" />;
      case 'trend': return <Brain className="w-5 h-5" />;
      case 'recommendation': return <Lightbulb className="w-5 h-5" />;
    }
  };

  return (
    <Card className={cn('p-6', className)}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          AI-Powered Insights
        </h3>
        <Badge variant="outline" className="text-xs">
          {insights.length} Active
        </Badge>
      </div>

      <div className="space-y-4">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className={cn(
              'p-4 rounded-lg border',
              getTypeColor(insight.type)
            )}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                {insight.icon || getDefaultIcon(insight.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-medium text-foreground">
                    {insight.title}
                  </h4>
                  {getPriorityBadge(insight.priority)}
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {insight.description}
                </p>
                <div className="flex flex-wrap gap-4 text-xs">
                  {insight.impact && (
                    <div>
                      <span className="text-muted-foreground">Impact: </span>
                      <span className="font-medium">{insight.impact}</span>
                    </div>
                  )}
                  {insight.action && (
                    <div>
                      <span className="text-muted-foreground">Action: </span>
                      <span className="font-medium">{insight.action}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Insights generated using advanced ML models • Updated every 4 hours
        </p>
      </div>
    </Card>
  );
}