'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Shield, Lock, CheckCircle, Star, Award, Verified } from 'lucide-react';

interface TrustSeal {
  id: string;
  name: string;
  type: 'security' | 'privacy' | 'quality' | 'certification' | 'award' | 'verification';
  provider: string;
  description?: string;
  imageUrl?: string;
  verificationUrl?: string;
  validUntil?: string;
  score?: number;
  maxScore?: number;
  status: 'active' | 'expired' | 'pending';
}

interface TrustSealsProps {
  seals: TrustSeal[];
  variant?: 'grid' | 'horizontal' | 'vertical' | 'compact';
  showDetails?: boolean;
  maxItems?: number;
  className?: string;
}

const TrustSeals: React.FC<TrustSealsProps> = ({
  seals,
  variant = 'horizontal',
  showDetails = false,
  maxItems,
  className
}) => {
  const activeSeals = seals.filter(seal => seal.status === 'active');
  const displaySeals = maxItems ? activeSeals.slice(0, maxItems) : activeSeals;

  const getTypeIcon = (type: TrustSeal['type']) => {
    switch (type) {
      case 'security':
        return <Shield className="h-5 w-5" />;
      case 'privacy':
        return <Lock className="h-5 w-5" />;
      case 'quality':
        return <Star className="h-5 w-5" />;
      case 'certification':
        return <Award className="h-5 w-5" />;
      case 'award':
        return <Award className="h-5 w-5" />;
      case 'verification':
        return <Verified className="h-5 w-5" />;
      default:
        return <CheckCircle className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: TrustSeal['type']) => {
    switch (type) {
      case 'security':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'privacy':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'quality':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'certification':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'award':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'verification':
        return 'text-indigo-600 bg-indigo-50 border-indigo-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderSeal = (seal: TrustSeal, index: number) => {
    const content = (
      <div
        key={seal.id}
        className={cn(
          'group transition-all duration-300 cursor-pointer',
          variant === 'compact' 
            ? 'p-2' 
            : 'p-4',
          'bg-card border border-border rounded-lg hover:shadow-md hover:border-primary/50',
          variant === 'horizontal' && 'flex-shrink-0'
        )}
      >
        {/* Seal Image or Icon */}
        <div className={cn(
          'flex items-center justify-center mb-2',
          variant === 'compact' ? 'h-12 w-12' : 'h-16 w-16',
          'mx-auto'
        )}>
          {seal.imageUrl ? (
            <img
              src={seal.imageUrl}
              alt={`${seal.name} trust seal`}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className={cn(
              'w-full h-full rounded-lg flex items-center justify-center',
              getTypeColor(seal.type)
            )}>
              {getTypeIcon(seal.type)}
            </div>
          )}
        </div>

        {/* Seal Info */}
        <div className={cn(
          'text-center',
          variant === 'compact' && 'space-y-1'
        )}>
          <h4 className={cn(
            'font-semibold text-foreground',
            variant === 'compact' ? 'text-xs' : 'text-sm'
          )}>
            {seal.name}
          </h4>
          
          {showDetails && (
            <>
              <p className={cn(
                'text-muted-foreground',
                variant === 'compact' ? 'text-xs' : 'text-xs'
              )}>
                by {seal.provider}
              </p>
              
              {seal.score && (
                <div className={cn(
                  'text-primary font-bold',
                  variant === 'compact' ? 'text-xs' : 'text-sm'
                )}>
                  {seal.score}/{seal.maxScore || 100}
                </div>
              )}
              
              {seal.validUntil && (
                <p className={cn(
                  'text-muted-foreground',
                  variant === 'compact' ? 'text-xs' : 'text-xs'
                )}>
                  Valid until {formatDate(seal.validUntil)}
                </p>
              )}
            </>
          )}
        </div>

        {/* Type badge */}
        <div className={cn(
          'mt-2 flex justify-center',
          variant === 'compact' && 'mt-1'
        )}>
          <span className={cn(
            'px-2 py-1 text-xs font-medium rounded-full border capitalize',
            getTypeColor(seal.type)
          )}>
            {seal.type}
          </span>
        </div>
      </div>
    );

    return seal.verificationUrl ? (
      <a
        key={seal.id}
        href={seal.verificationUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {content}
      </a>
    ) : (
      content
    );
  };

  const getGridLayout = () => {
    switch (variant) {
      case 'horizontal':
        return 'flex space-x-4 overflow-x-auto pb-2';
      case 'vertical':
        return 'flex flex-col space-y-4';
      case 'grid':
        return 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4';
      case 'compact':
        return 'grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2';
      default:
        return 'flex space-x-4 overflow-x-auto pb-2';
    }
  };

  if (displaySeals.length === 0) {
    return (
      <div className={cn('text-center py-8', className)}>
        <div className="text-muted-foreground">No trust seals available</div>
      </div>
    );
  }

  return (
    <div className={cn(className)}>
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Trust & Security
        </h3>
        <p className="text-sm text-muted-foreground">
          Our certifications and security validations from trusted authorities
        </p>
      </div>

      {/* Seals Display */}
      <div className={getGridLayout()}>
        {displaySeals.map(renderSeal)}
      </div>

      {/* Show more indicator */}
      {maxItems && activeSeals.length > maxItems && (
        <div className="mt-4 text-center">
          <span className="text-sm text-muted-foreground">
            +{activeSeals.length - maxItems} more certifications
          </span>
        </div>
      )}
    </div>
  );
};

// Trust Score Summary Component
interface TrustScoreSummaryProps {
  seals: TrustSeal[];
  className?: string;
}

export const TrustScoreSummary: React.FC<TrustScoreSummaryProps> = ({
  seals,
  className
}) => {
  const activeSeals = seals.filter(seal => seal.status === 'active');
  const sealsWithScores = activeSeals.filter(seal => seal.score);
  
  const averageScore = sealsWithScores.length > 0
    ? Math.round(sealsWithScores.reduce((sum, seal) => sum + (seal.score || 0), 0) / sealsWithScores.length)
    : 0;

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 80) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Very Good';
    if (score >= 70) return 'Good';
    return 'Needs Improvement';
  };

  return (
    <div className={cn('bg-card border border-border rounded-lg p-6', className)}>
      <div className="text-center">
        <div className={cn(
          'inline-flex items-center justify-center w-20 h-20 rounded-full text-3xl font-bold border-4 mb-4',
          getScoreColor(averageScore)
        )}>
          {averageScore}
        </div>
        
        <h3 className="text-xl font-semibold text-foreground mb-1">
          Trust Score
        </h3>
        
        <p className={cn(
          'text-sm font-medium mb-4',
          getScoreColor(averageScore).split(' ')[0]
        )}>
          {getScoreLabel(averageScore)}
        </p>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-foreground">{activeSeals.length}</div>
            <div className="text-xs text-muted-foreground">Active Seals</div>
          </div>
          
          <div>
            <div className="text-2xl font-bold text-foreground">{sealsWithScores.length}</div>
            <div className="text-xs text-muted-foreground">Scored</div>
          </div>
          
          <div>
            <div className="text-2xl font-bold text-foreground">
              {new Set(activeSeals.map(seal => seal.type)).size}
            </div>
            <div className="text-xs text-muted-foreground">Categories</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSeals;