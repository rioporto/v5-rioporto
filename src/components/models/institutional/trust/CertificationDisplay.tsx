'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Award, Calendar, ExternalLink, Download, Eye, CheckCircle } from 'lucide-react';

interface Certification {
  id: string;
  name: string;
  issuer: string;
  description?: string;
  issueDate: string;
  expiryDate?: string;
  status: 'active' | 'expired' | 'pending' | 'suspended';
  certificateUrl?: string;
  badgeUrl?: string;
  credentialId?: string;
  category: 'security' | 'compliance' | 'audit' | 'financial' | 'technical' | 'quality';
}

interface CertificationDisplayProps {
  certifications: Certification[];
  variant?: 'grid' | 'list' | 'compact';
  showExpired?: boolean;
  groupByCategory?: boolean;
  className?: string;
}

const CertificationDisplay: React.FC<CertificationDisplayProps> = ({
  certifications,
  variant = 'grid',
  showExpired = false,
  groupByCategory = false,
  className
}) => {
  const filteredCertifications = showExpired 
    ? certifications 
    : certifications.filter(cert => cert.status === 'active');

  const getCategoryColor = (category: Certification['category']) => {
    switch (category) {
      case 'security':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'compliance':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'audit':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'financial':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'technical':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'quality':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: Certification['status']) => {
    switch (status) {
      case 'active':
        return 'text-success bg-success/10 border-success';
      case 'expired':
        return 'text-error bg-error/10 border-error';
      case 'pending':
        return 'text-warning bg-warning/10 border-warning';
      case 'suspended':
        return 'text-muted-foreground bg-muted/10 border-border';
      default:
        return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const now = new Date();
    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    return expiry <= thirtyDaysFromNow && expiry > now;
  };

  const renderCertificationCard = (cert: Certification) => (
    <div
      key={cert.id}
      className={cn(
        'bg-card border border-border rounded-lg p-6 transition-all duration-200',
        'hover:shadow-md hover:border-primary/50',
        cert.status === 'expired' && 'opacity-75'
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
          {cert.badgeUrl ? (
            <img
              src={cert.badgeUrl}
              alt={`${cert.name} badge`}
              className="w-12 h-12 object-contain"
            />
          ) : (
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Award className="h-6 w-6 text-primary" />
            </div>
          )}
          
          <div className="flex-1">
            <h3 className="font-semibold text-foreground text-lg mb-1">
              {cert.name}
            </h3>
            <p className="text-muted-foreground text-sm">
              Issued by {cert.issuer}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end space-y-2">
          <span className={cn(
            'px-2 py-1 text-xs font-medium rounded-full border uppercase tracking-wide',
            getStatusColor(cert.status)
          )}>
            {cert.status}
          </span>
          
          <span className={cn(
            'px-2 py-1 text-xs font-medium rounded border',
            getCategoryColor(cert.category)
          )}>
            {cert.category}
          </span>
        </div>
      </div>

      {/* Description */}
      {cert.description && (
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          {cert.description}
        </p>
      )}

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <div>
            <div className="text-xs text-muted-foreground">Issued</div>
            <div className="text-sm font-medium">{formatDate(cert.issueDate)}</div>
          </div>
        </div>
        
        {cert.expiryDate && (
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="text-xs text-muted-foreground">Expires</div>
              <div className={cn(
                'text-sm font-medium',
                isExpiringSoon(cert.expiryDate) && 'text-warning',
                cert.status === 'expired' && 'text-error'
              )}>
                {formatDate(cert.expiryDate)}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Credential ID */}
      {cert.credentialId && (
        <div className="mb-4 p-3 bg-muted/50 rounded border">
          <div className="text-xs text-muted-foreground mb-1">Credential ID</div>
          <div className="text-sm font-mono text-foreground break-all">
            {cert.credentialId}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {cert.certificateUrl && (
            <a
              href={cert.certificateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <Eye className="h-4 w-4" />
              <span>View</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
          
          {cert.certificateUrl && (
            <a
              href={cert.certificateUrl}
              download
              className="inline-flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Download</span>
            </a>
          )}
        </div>

        {cert.status === 'active' && (
          <div className="flex items-center space-x-1 text-success">
            <CheckCircle className="h-4 w-4" />
            <span className="text-sm font-medium">Verified</span>
          </div>
        )}
      </div>
    </div>
  );

  const renderCompactItem = (cert: Certification) => (
    <div
      key={cert.id}
      className={cn(
        'flex items-center justify-between p-4 bg-card border border-border rounded-lg',
        'hover:bg-muted/50 transition-colors',
        cert.status === 'expired' && 'opacity-75'
      )}
    >
      <div className="flex items-center space-x-3">
        {cert.badgeUrl ? (
          <img
            src={cert.badgeUrl}
            alt={`${cert.name} badge`}
            className="w-8 h-8 object-contain"
          />
        ) : (
          <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
            <Award className="h-4 w-4 text-primary" />
          </div>
        )}
        
        <div>
          <div className="font-medium text-foreground">{cert.name}</div>
          <div className="text-sm text-muted-foreground">by {cert.issuer}</div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <span className={cn(
          'px-2 py-1 text-xs font-medium rounded border',
          getCategoryColor(cert.category)
        )}>
          {cert.category}
        </span>
        
        <span className={cn(
          'px-2 py-1 text-xs font-medium rounded-full border',
          getStatusColor(cert.status)
        )}>
          {cert.status}
        </span>

        {cert.certificateUrl && (
          <a
            href={cert.certificateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );

  if (groupByCategory) {
    const groupedCerts = filteredCertifications.reduce((groups, cert) => {
      const category = cert.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(cert);
      return groups;
    }, {} as Record<string, Certification[]>);

    return (
      <div className={cn('space-y-8', className)}>
        {Object.entries(groupedCerts).map(([category, certs]) => (
          <div key={category}>
            <h3 className="text-lg font-semibold text-foreground mb-4 capitalize">
              {category} Certifications
            </h3>
            
            <div className={cn(
              variant === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            )}>
              {certs.map(cert => 
                variant === 'compact' 
                  ? renderCompactItem(cert)
                  : renderCertificationCard(cert)
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn(
      variant === 'grid' 
        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
        : 'space-y-4',
      className
    )}>
      {filteredCertifications.map(cert => 
        variant === 'compact' 
          ? renderCompactItem(cert)
          : renderCertificationCard(cert)
      )}
    </div>
  );
};

export default CertificationDisplay;