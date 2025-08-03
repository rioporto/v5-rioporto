'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ShieldCheck, AlertTriangle, Clock, CheckCircle, Globe, Building, Scale } from 'lucide-react';

interface ComplianceItem {
  id: string;
  regulation: string;
  jurisdiction: string;
  status: 'compliant' | 'non-compliant' | 'pending' | 'partial';
  lastAudit?: string;
  nextAudit?: string;
  description?: string;
  authority: string;
  licenseNumber?: string;
  validUntil?: string;
}

interface ComplianceBadgeProps {
  item: ComplianceItem;
  variant?: 'primary' | 'minimal' | 'detailed';
  className?: string;
  showDetails?: boolean;
}

const ComplianceBadge: React.FC<ComplianceBadgeProps> = ({
  item,
  variant = 'default',
  className,
  showDetails = true
}) => {
  const getStatusIcon = () => {
    switch (item.status) {
      case 'compliant':
        return <CheckCircle className="h-4 w-4" />;
      case 'non-compliant':
        return <AlertTriangle className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'partial':
        return <ShieldCheck className="h-4 w-4" />;
      default:
        return <ShieldCheck className="h-4 w-4" />;
    }
  };

  const getStatusColor = () => {
    switch (item.status) {
      case 'compliant':
        return 'text-success bg-success/10 border-success';
      case 'non-compliant':
        return 'text-error bg-error/10 border-error';
      case 'pending':
        return 'text-warning bg-warning/10 border-warning';
      case 'partial':
        return 'text-blue-600 bg-blue-100 border-blue-200';
      default:
        return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const getStatusText = () => {
    switch (item.status) {
      case 'compliant':
        return 'Fully Compliant';
      case 'non-compliant':
        return 'Non-Compliant';
      case 'pending':
        return 'Pending Review';
      case 'partial':
        return 'Partially Compliant';
      default:
        return 'Unknown';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (variant === 'minimal') {
    return (
      <div className={cn(
        'inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium border',
        getStatusColor(),
        className
      )}>
        {getStatusIcon()}
        <span>{item.regulation}</span>
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <div className={cn('bg-card border border-border rounded-lg p-6', className)}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-3">
            <div className={cn(
              'p-2 rounded-lg',
              getStatusColor().replace('text-', 'bg-').replace('bg-', 'bg-').replace('/10', '/20')
            )}>
              <Scale className="h-5 w-5" />
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground text-lg">
                {item.regulation}
              </h3>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                <div className="flex items-center space-x-1">
                  <Globe className="h-4 w-4" />
                  <span>{item.jurisdiction}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Building className="h-4 w-4" />
                  <span>{item.authority}</span>
                </div>
              </div>
            </div>
          </div>

          <span className={cn(
            'px-3 py-1 text-sm font-medium rounded-full border flex items-center space-x-1',
            getStatusColor()
          )}>
            {getStatusIcon()}
            <span>{getStatusText()}</span>
          </span>
        </div>

        {/* Description */}
        {item.description && (
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            {item.description}
          </p>
        )}

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {item.licenseNumber && (
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                License Number
              </div>
              <div className="text-sm font-mono text-foreground">
                {item.licenseNumber}
              </div>
            </div>
          )}

          {item.validUntil && (
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                Valid Until
              </div>
              <div className="text-sm text-foreground">
                {formatDate(item.validUntil)}
              </div>
            </div>
          )}

          {item.lastAudit && (
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                Last Audit
              </div>
              <div className="text-sm text-foreground">
                {formatDate(item.lastAudit)}
              </div>
            </div>
          )}

          {item.nextAudit && (
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                Next Audit
              </div>
              <div className="text-sm text-foreground">
                {formatDate(item.nextAudit)}
              </div>
            </div>
          )}
        </div>

        {/* Compliance Status Details */}
        <div className={cn(
          'p-3 rounded-lg border',
          getStatusColor().replace('text-', 'border-').replace('bg-', 'bg-').replace('/10', '/5')
        )}>
          <div className="text-xs font-medium text-muted-foreground mb-1">
            COMPLIANCE STATUS
          </div>
          <div className="text-sm">
            {item.status === 'compliant' && 'All regulatory requirements are met and up to date.'}
            {item.status === 'non-compliant' && 'Some regulatory requirements are not met. Immediate action required.'}
            {item.status === 'pending' && 'Compliance review is in progress. Status will be updated soon.'}
            {item.status === 'partial' && 'Most requirements are met, but some areas need attention.'}
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn(
      'bg-card border border-border rounded-lg p-4 transition-all duration-200 hover:shadow-md',
      className
    )}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className="font-semibold text-foreground">{item.regulation}</h4>
          <p className="text-sm text-muted-foreground">{item.jurisdiction}</p>
        </div>
        
        <span className={cn(
          'px-2 py-1 text-xs font-medium rounded-full border flex items-center space-x-1',
          getStatusColor()
        )}>
          {getStatusIcon()}
          <span>{getStatusText()}</span>
        </span>
      </div>

      {showDetails && (
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">
            Authority: <span className="text-foreground">{item.authority}</span>
          </div>
          
          {item.licenseNumber && (
            <div className="text-xs text-muted-foreground">
              License: <span className="text-foreground font-mono">{item.licenseNumber}</span>
            </div>
          )}
          
          {item.validUntil && (
            <div className="text-xs text-muted-foreground">
              Valid until: <span className="text-foreground">{formatDate(item.validUntil)}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Compliance Dashboard Component
interface ComplianceDashboardProps {
  items: ComplianceItem[];
  className?: string;
  showSummary?: boolean;
}

export const ComplianceDashboard: React.FC<ComplianceDashboardProps> = ({
  items,
  className,
  showSummary = true
}) => {
  const getSummaryStats = () => {
    const total = items.length;
    const compliant = items.filter(item => item.status === 'compliant').length;
    const pending = items.filter(item => item.status === 'pending').length;
    const nonCompliant = items.filter(item => item.status === 'non-compliant').length;
    const partial = items.filter(item => item.status === 'partial').length;

    return { total, compliant, pending, nonCompliant, partial };
  };

  const stats = getSummaryStats();

  return (
    <div className={cn('space-y-6', className)}>
      {showSummary && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-success/10 border border-success/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-success">{stats.compliant}</div>
            <div className="text-sm text-success/80">Compliant</div>
          </div>
          
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-warning">{stats.pending}</div>
            <div className="text-sm text-warning/80">Pending</div>
          </div>
          
          <div className="bg-error/10 border border-error/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-error">{stats.nonCompliant}</div>
            <div className="text-sm text-error/80">Non-Compliant</div>
          </div>
          
          <div className="bg-blue-100 border border-blue-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.partial}</div>
            <div className="text-sm text-blue-600/80">Partial</div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
          <ComplianceBadge
            key={item.id}
            item={item}
            variant="default"
          />
        ))}
      </div>
    </div>
  );
};

export default ComplianceBadge;