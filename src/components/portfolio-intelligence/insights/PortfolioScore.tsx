import React from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Info } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Tooltip } from '@/components/ui/Tooltip';

interface PortfolioScoreProps {
  className?: string;
  score: number;
  previousScore?: number;
  breakdown?: {
    diversification: number;
    performance: number;
    risk: number;
    potential: number;
  };
}

export function PortfolioScore({ 
  className, 
  score = 85,
  previousScore = 82,
  breakdown = {
    diversification: 8.5,
    performance: 9.2,
    risk: 7.8,
    potential: 8.9
  }
}: PortfolioScoreProps) {
  const change = previousScore ? score - previousScore : 0;
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    if (score >= 50) return 'text-orange-500';
    return 'text-red-500';
  };

  const getScoreGrade = (score: number) => {
    if (score >= 90) return 'A+';
    if (score >= 85) return 'A';
    if (score >= 80) return 'B+';
    if (score >= 75) return 'B';
    if (score >= 70) return 'C+';
    if (score >= 65) return 'C';
    return 'D';
  };

  return (
    <Card className={cn('p-6', className)}>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            Portfolio Health Score
            <Tooltip content="AI-powered analysis of your portfolio's overall health">
              <Info className="w-4 h-4 text-muted-foreground" />
            </Tooltip>
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Based on 15+ financial indicators
          </p>
        </div>
        <div className="text-right">
          <div className={cn('text-4xl font-bold', getScoreColor(score))}>
            {score}
          </div>
          <div className="text-sm text-muted-foreground">
            Grade: {getScoreGrade(score)}
          </div>
        </div>
      </div>

      {change !== 0 && (
        <div className={cn(
          'flex items-center gap-2 mb-4 text-sm',
          change > 0 ? 'text-green-500' : 'text-red-500'
        )}>
          {change > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span>{Math.abs(change)} points from last analysis</span>
        </div>
      )}

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Diversification</span>
          <div className="flex items-center gap-2">
            <div className="w-32 h-2 bg-background rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full"
                style={{ width: `${breakdown.diversification * 10}%` }}
              />
            </div>
            <span className="text-sm font-medium">{breakdown.diversification}</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Performance</span>
          <div className="flex items-center gap-2">
            <div className="w-32 h-2 bg-background rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full"
                style={{ width: `${breakdown.performance * 10}%` }}
              />
            </div>
            <span className="text-sm font-medium">{breakdown.performance}</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Risk Management</span>
          <div className="flex items-center gap-2">
            <div className="w-32 h-2 bg-background rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                style={{ width: `${breakdown.risk * 10}%` }}
              />
            </div>
            <span className="text-sm font-medium">{breakdown.risk}</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Growth Potential</span>
          <div className="flex items-center gap-2">
            <div className="w-32 h-2 bg-background rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full"
                style={{ width: `${breakdown.potential * 10}%` }}
              />
            </div>
            <span className="text-sm font-medium">{breakdown.potential}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Last updated: {new Date().toLocaleString()}
        </p>
      </div>
    </Card>
  );
}