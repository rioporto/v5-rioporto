'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Shield, Lock, CheckCircle, AlertTriangle, ShieldCheck, Eye } from 'lucide-react';

interface SecurityBadgeProps {
  type: 'ssl' | 'encryption' | 'verified' | 'audit' | 'compliance' | 'privacy';
  status: 'active' | 'verified' | 'pending' | 'expired';
  title?: string;
  description?: string;
  validUntil?: string;
  certificationBody?: string;
  className?: string;
  variant?: 'primary' | 'minimal' | 'detailed';
  showTooltip?: boolean;
}

const SecurityBadge: React.FC<SecurityBadgeProps> = ({
  type,
  status,
  title,
  description,
  validUntil,
  certificationBody,
  className,
  variant = 'default',
  showTooltip = true
}) => {
  const getIcon = () => {
    switch (type) {
      case 'ssl':
        return <Lock className="h-4 w-4" />;
      case 'encryption':
        return <Shield className="h-4 w-4" />;
      case 'verified':
        return <CheckCircle className="h-4 w-4" />;
      case 'audit':
        return <ShieldCheck className="h-4 w-4" />;
      case 'compliance':
        return <ShieldCheck className="h-4 w-4" />;
      case 'privacy':
        return <Eye className="h-4 w-4" />;
      default:
        return <Shield className="h-4 w-4" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'active':
      case 'verified':
        return 'text-success border-success bg-success/10';
      case 'pending':
        return 'text-warning border-warning bg-warning/10';
      case 'expired':
        return 'text-error border-error bg-error/10';
      default:
        return 'text-muted-foreground border-border bg-muted/50';
    }
  };

  const getTitle = () => {
    if (title) return title;
    
    switch (type) {
      case 'ssl':
        return 'SSL Secured';
      case 'encryption':
        return '256-bit Encryption';
      case 'verified':
        return 'Identity Verified';
      case 'audit':
        return 'Security Audited';
      case 'compliance':
        return 'Regulatory Compliant';
      case 'privacy':
        return 'Privacy Protected';
      default:
        return 'Security Badge';
    }
  };

  const getDescription = () => {
    if (description) return description;
    
    switch (type) {
      case 'ssl':
        return 'Site protected with SSL/TLS encryption';
      case 'encryption':
        return 'Data encrypted with military-grade security';
      case 'verified':
        return 'Identity verified by trusted authorities';
      case 'audit':
        return 'Independently audited for security vulnerabilities';
      case 'compliance':
        return 'Compliant with financial regulations';
      case 'privacy':
        return 'Privacy practices verified and protected';
      default:
        return 'Security measures in place';
    }
  };

  if (variant === 'minimal') {
    return (
      <div
        className={cn(
          'inline-flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium border',
          getStatusColor(),
          className
        )}
        title={showTooltip ? getDescription() : undefined}
      >
        {getIcon()}
        <span>{getTitle()}</span>
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <div className={cn(
        'p-4 rounded-lg border bg-card',
        getStatusColor().replace('bg-', 'border-').replace('/10', '/20'),
        className
      )}>
        <div className="flex items-start space-x-3">
          <div className={cn(
            'p-2 rounded-md',
            getStatusColor().replace('text-', 'bg-').replace('border-', 'text-white')
          )}>
            {getIcon()}
          </div>
          
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-foreground">{getTitle()}</h4>
              <span className={cn(
                'px-2 py-1 text-xs font-medium rounded uppercase tracking-wide',
                getStatusColor()
              )}>
                {status}
              </span>
            </div>
            
            <p className="text-sm text-muted-foreground">
              {getDescription()}
            </p>
            
            {certificationBody && (
              <p className="text-xs text-muted-foreground">
                Certified by: <span className="font-medium">{certificationBody}</span>
              </p>
            )}
            
            {validUntil && (
              <p className="text-xs text-muted-foreground">
                Valid until: <span className="font-medium">{validUntil}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn(
      'inline-flex items-center space-x-2 px-3 py-2 rounded-md border bg-card',
      getStatusColor(),
      'transition-all duration-200 hover:shadow-md',
      className
    )}>
      <div className="flex-shrink-0">
        {getIcon()}
      </div>
      
      <div className="min-w-0">
        <div className="font-medium text-sm">{getTitle()}</div>
        {showTooltip && (
          <div className="text-xs opacity-75">{status.toUpperCase()}</div>
        )}
      </div>
    </div>
  );
};

// Security Badge Grid Component
interface SecurityBadgeGridProps {
  badges: Omit<SecurityBadgeProps, 'variant'>[];
  columns?: 2 | 3 | 4;
  variant?: SecurityBadgeProps['variant'];
  className?: string;
}

export const SecurityBadgeGrid: React.FC<SecurityBadgeGridProps> = ({
  badges,
  columns = 3,
  variant = 'default',
  className
}) => {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <div className={cn(
      'grid gap-4',
      gridCols[columns],
      className
    )}>
      {badges.map((badge, index) => (
        <SecurityBadge
          key={index}
          {...badge}
          variant={variant}
        />
      ))}
    </div>
  );
};

// Security Status Indicator
interface SecurityStatusProps {
  level: 'low' | 'medium' | 'high' | 'maximum';
  score?: number;
  className?: string;
}

export const SecurityStatus: React.FC<SecurityStatusProps> = ({
  level,
  score,
  className
}) => {
  const getLevelColor = () => {
    switch (level) {
      case 'low':
        return 'text-error bg-error/10 border-error';
      case 'medium':
        return 'text-warning bg-warning/10 border-warning';
      case 'high':
        return 'text-success bg-success/10 border-success';
      case 'maximum':
        return 'text-primary bg-primary/10 border-primary';
      default:
        return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const getLevelIcon = () => {
    switch (level) {
      case 'low':
        return <AlertTriangle className="h-4 w-4" />;
      case 'medium':
        return <Shield className="h-4 w-4" />;
      case 'high':
        return <ShieldCheck className="h-4 w-4" />;
      case 'maximum':
        return <ShieldCheck className="h-4 w-4" />;
      default:
        return <Shield className="h-4 w-4" />;
    }
  };

  return (
    <div className={cn(
      'inline-flex items-center space-x-2 px-4 py-2 rounded-lg border',
      getLevelColor(),
      className
    )}>
      {getLevelIcon()}
      <div>
        <div className="font-semibold text-sm capitalize">
          {level} Security
        </div>
        {score && (
          <div className="text-xs opacity-75">
            Score: {score}/100
          </div>
        )}
      </div>
    </div>
  );
};

export default SecurityBadge;