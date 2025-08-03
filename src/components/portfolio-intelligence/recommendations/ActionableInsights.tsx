import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  Lightbulb,
  TrendingUp,
  Shield,
  DollarSign,
  Clock,
  ArrowRight,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface Insight {
  id: string;
  type: 'rebalance' | 'buy' | 'sell' | 'hedge' | 'optimize';
  priority: 'urgent' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  expectedImpact: string;
  effort: 'low' | 'medium' | 'high';
  timeframe: string;
  actionLabel: string;
  status?: 'completed' | 'dismissed';
}

interface ActionableInsightsProps {
  className?: string;
  insights?: Insight[];
}

const defaultInsights: Insight[] = [
  {
    id: '1',
    type: 'rebalance',
    priority: 'urgent',
    title: 'Portfolio Rebalancing Required',
    description: 'Your BTC allocation has grown to 45% (target: 35%). Rebalancing can optimize risk-return profile.',
    expectedImpact: 'Reduce portfolio volatility by 15%',
    effort: 'low',
    timeframe: 'Immediate',
    actionLabel: 'Rebalance Now'
  },
  {
    id: '2',
    type: 'buy',
    priority: 'high',
    title: 'ETH Accumulation Opportunity',
    description: 'ETH is trading near strong support with bullish on-chain metrics. Good entry point detected.',
    expectedImpact: '+20-25% potential in 30 days',
    effort: 'medium',
    timeframe: '24-48 hours',
    actionLabel: 'View Analysis'
  },
  {
    id: '3',
    type: 'hedge',
    priority: 'medium',
    title: 'Consider Hedging Strategy',
    description: 'Market volatility increasing. Adding 10% stablecoin allocation could protect gains.',
    expectedImpact: 'Reduce drawdown risk by 30%',
    effort: 'low',
    timeframe: '1 week',
    actionLabel: 'Setup Hedge'
  },
  {
    id: '4',
    type: 'optimize',
    priority: 'low',
    title: 'Optimize Staking Rewards',
    description: 'Move ADA to staking pool for 5.2% APY. Currently earning 0% in wallet.',
    expectedImpact: '+$520/year passive income',
    effort: 'low',
    timeframe: '1 month',
    actionLabel: 'Start Staking'
  }
];

export function ActionableInsights({ 
  className,
  insights = defaultInsights
}: ActionableInsightsProps) {
  const [dismissedInsights, setDismissedInsights] = React.useState<string[]>([]);
  const [completedInsights, setCompletedInsights] = React.useState<string[]>([]);

  const activeInsights = insights.filter(
    insight => !dismissedInsights.includes(insight.id) && !completedInsights.includes(insight.id)
  );

  const getTypeIcon = (type: Insight['type']) => {
    switch (type) {
      case 'rebalance': return <TrendingUp className="w-4 h-4" />;
      case 'buy': return <DollarSign className="w-4 h-4" />;
      case 'sell': return <DollarSign className="w-4 h-4" />;
      case 'hedge': return <Shield className="w-4 h-4" />;
      case 'optimize': return <Lightbulb className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: Insight['type']) => {
    switch (type) {
      case 'rebalance': return 'text-blue-500';
      case 'buy': return 'text-green-500';
      case 'sell': return 'text-red-500';
      case 'hedge': return 'text-purple-500';
      case 'optimize': return 'text-yellow-500';
    }
  };

  const getPriorityBadge = (priority: Insight['priority']) => {
    const colors = {
      urgent: 'bg-red-500/10 text-red-500 border-red-500/20',
      high: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
      medium: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      low: 'bg-green-500/10 text-green-500 border-green-500/20'
    };
    return (
      <Badge variant="outline" className={cn('text-xs capitalize', colors[priority])}>
        {priority}
      </Badge>
    );
  };

  const getEffortIndicator = (effort: Insight['effort']) => {
    const dots = effort === 'low' ? 1 : effort === 'medium' ? 2 : 3;
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'w-1.5 h-1.5 rounded-full',
              i < dots ? 'bg-primary' : 'bg-muted'
            )}
          />
        ))}
      </div>
    );
  };

  const handleDismiss = (id: string) => {
    setDismissedInsights([...dismissedInsights, id]);
  };

  const handleComplete = (id: string) => {
    setCompletedInsights([...completedInsights, id]);
  };

  return (
    <Card className={cn('p-6', className)}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          Actionable Insights
          <Badge variant="outline" className="text-xs">
            {activeInsights.length} Active
          </Badge>
        </h3>
        {(dismissedInsights.length > 0 || completedInsights.length > 0) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setDismissedInsights([]);
              setCompletedInsights([]);
            }}
          >
            Show All
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {activeInsights.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-500" />
            <p className="text-sm">All insights addressed! Check back later for new recommendations.</p>
          </div>
        ) : (
          activeInsights.map((insight) => (
            <div
              key={insight.id}
              className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className={cn('mt-0.5', getTypeColor(insight.type))}>
                    {getTypeIcon(insight.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{insight.title}</h4>
                      {getPriorityBadge(insight.priority)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {insight.description}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => handleDismiss(insight.id)}
                >
                  <XCircle className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-3 text-xs">
                <div>
                  <span className="text-muted-foreground">Expected Impact</span>
                  <p className="font-medium mt-0.5">{insight.expectedImpact}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Effort Required</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    {getEffortIndicator(insight.effort)}
                    <span className="capitalize">{insight.effort}</span>
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Timeframe
                  </span>
                  <p className="font-medium mt-0.5">{insight.timeframe}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => handleComplete(insight.id)}
                >
                  {insight.actionLabel}
                  <ArrowRight className="w-3 h-3" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleComplete(insight.id)}
                >
                  Mark as Done
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {completedInsights.length > 0 && (
        <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
          <p className="text-xs text-green-500 font-medium">
            {completedInsights.length} insight{completedInsights.length > 1 ? 's' : ''} completed today!
          </p>
        </div>
      )}
    </Card>
  );
}