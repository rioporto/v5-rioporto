'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ExternalLink, Star, Building, Globe } from 'lucide-react';

interface Partner {
  id: string;
  name: string;
  logo: string;
  category: 'exchange' | 'bank' | 'fintech' | 'technology' | 'security' | 'compliance' | 'payment';
  description?: string;
  website?: string;
  partnership: 'strategic' | 'technology' | 'integration' | 'certified' | 'sponsor';
  since?: string;
  featured?: boolean;
  tier?: 'platinum' | 'gold' | 'silver' | 'bronze';
}

interface PartnerLogosProps {
  partners: Partner[];
  variant?: 'grid' | 'carousel' | 'list' | 'minimal';
  groupByCategory?: boolean;
  showFeaturedOnly?: boolean;
  maxItems?: number;
  autoScroll?: boolean;
  className?: string;
}

const PartnerLogos: React.FC<PartnerLogosProps> = ({
  partners,
  variant = 'carousel',
  groupByCategory = false,
  showFeaturedOnly = false,
  maxItems,
  autoScroll = true,
  className
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const filteredPartners = React.useMemo(() => {
    let filtered = showFeaturedOnly 
      ? partners.filter(partner => partner.featured)
      : partners;
    
    if (maxItems) {
      filtered = filtered.slice(0, maxItems);
    }
    
    return filtered;
  }, [partners, showFeaturedOnly, maxItems]);

  const getCategoryIcon = (category: Partner['category']) => {
    switch (category) {
      case 'exchange':
        return <Globe className="h-4 w-4" />;
      case 'bank':
        return <Building className="h-4 w-4" />;
      case 'fintech':
        return <Star className="h-4 w-4" />;
      case 'technology':
        return <Star className="h-4 w-4" />;
      case 'security':
        return <Star className="h-4 w-4" />;
      case 'compliance':
        return <Star className="h-4 w-4" />;
      case 'payment':
        return <Star className="h-4 w-4" />;
      default:
        return <Building className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: Partner['category']) => {
    switch (category) {
      case 'exchange':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'bank':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'fintech':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'technology':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'security':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'compliance':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'payment':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getTierColor = (tier?: string) => {
    switch (tier) {
      case 'platinum':
        return 'border-slate-300 bg-slate-50';
      case 'gold':
        return 'border-yellow-300 bg-yellow-50';
      case 'silver':
        return 'border-gray-300 bg-gray-50';
      case 'bronze':
        return 'border-amber-300 bg-amber-50';
      default:
        return 'border-border bg-card';
    }
  };

  const renderPartnerCard = (partner: Partner, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'h-12 w-20',
      md: 'h-16 w-24',
      lg: 'h-20 w-32'
    };

    const content = (
      <div
        className={cn(
          'group relative bg-card border rounded-lg p-4 transition-all duration-300',
          'hover:shadow-lg hover:border-primary/50 hover:-translate-y-1',
          getTierColor(partner.tier),
          variant === 'minimal' && 'border-0 bg-transparent hover:bg-muted/50'
        )}
      >
        {/* Featured badge */}
        {partner.featured && variant !== 'minimal' && (
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
            <Star className="h-2 w-2 text-white fill-current" />
          </div>
        )}

        {/* Tier badge */}
        {partner.tier && variant !== 'minimal' && (
          <div className="absolute -top-2 -left-2">
            <span className={cn(
              'px-2 py-1 text-xs font-bold rounded-full capitalize',
              getTierColor(partner.tier).replace('bg-', 'bg-').replace('border-', 'text-')
            )}>
              {partner.tier}
            </span>
          </div>
        )}

        {/* Logo */}
        <div className={cn(
          'flex items-center justify-center mb-2',
          sizeClasses[size]
        )}>
          <img
            src={partner.logo}
            alt={`${partner.name} logo`}
            className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
          />
        </div>

        {/* Partner info */}
        {variant !== 'minimal' && (
          <div className="text-center space-y-1">
            <h4 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
              {partner.name}
            </h4>
            
            <div className="flex items-center justify-center">
              <span className={cn(
                'px-2 py-1 text-xs font-medium rounded-full border capitalize flex items-center space-x-1',
                getCategoryColor(partner.category)
              )}>
                {getCategoryIcon(partner.category)}
                <span>{partner.category}</span>
              </span>
            </div>

            {partner.since && (
              <p className="text-xs text-muted-foreground">
                Partner since {partner.since}
              </p>
            )}
          </div>
        )}

        {/* External link indicator */}
        {partner.website && (
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <ExternalLink className="h-3 w-3 text-muted-foreground" />
          </div>
        )}
      </div>
    );

    return partner.website ? (
      <a
        key={partner.id}
        href={partner.website}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {content}
      </a>
    ) : (
      <div key={partner.id}>
        {content}
      </div>
    );
  };

  const renderCarousel = () => (
    <div 
      className="relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={cn(
        'flex space-x-6 transition-transform duration-300',
        autoScroll && !isHovered && 'animation-slide'
      )}>
        {/* Duplicate partners for seamless loop */}
        {[...filteredPartners, ...filteredPartners].map((partner, index) => 
          renderPartnerCard({ ...partner, id: `${partner.id}-${index}` }, 'md')
        )}
      </div>
    </div>
  );

  const renderGrid = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
      {filteredPartners.map(partner => renderPartnerCard(partner, 'md'))}
    </div>
  );

  const renderList = () => (
    <div className="space-y-4">
      {filteredPartners.map(partner => (
        <div key={partner.id} className="flex items-center space-x-4 p-4 bg-card border border-border rounded-lg hover:shadow-md transition-all duration-300">
          <div className="w-16 h-12 flex items-center justify-center flex-shrink-0">
            <img
              src={partner.logo}
              alt={`${partner.name} logo`}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h4 className="font-semibold text-foreground">{partner.name}</h4>
              {partner.featured && <Star className="h-4 w-4 text-primary fill-current" />}
            </div>
            
            <div className="flex items-center space-x-3 text-sm text-muted-foreground">
              <span className={cn(
                'px-2 py-1 text-xs font-medium rounded border capitalize',
                getCategoryColor(partner.category)
              )}>
                {partner.category}
              </span>
              
              <span className="capitalize">{partner.partnership} partner</span>
              
              {partner.since && <span>Since {partner.since}</span>}
            </div>
            
            {partner.description && (
              <p className="text-sm text-muted-foreground mt-1">{partner.description}</p>
            )}
          </div>
          
          {partner.website && (
            <a
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      ))}
    </div>
  );

  const renderMinimal = () => (
    <div className="flex flex-wrap items-center justify-center gap-8 py-4">
      {filteredPartners.map(partner => renderPartnerCard(partner, 'sm'))}
    </div>
  );

  const renderByCategory = () => {
    const groupedPartners = filteredPartners.reduce((groups, partner) => {
      const category = partner.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(partner);
      return groups;
    }, {} as Record<string, Partner[]>);

    return (
      <div className="space-y-8">
        {Object.entries(groupedPartners).map(([category, categoryPartners]) => (
          <div key={category}>
            <h3 className="text-lg font-semibold text-foreground mb-4 capitalize flex items-center space-x-2">
              {getCategoryIcon(category as Partner['category'])}
              <span>{category} Partners</span>
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {categoryPartners.map(partner => renderPartnerCard(partner, 'md'))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (filteredPartners.length === 0) {
    return (
      <div className={cn('text-center py-8', className)}>
        <div className="text-muted-foreground">No partners available</div>
      </div>
    );
  }

  return (
    <div className={cn(className)}>
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Trusted Partners
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We collaborate with industry-leading organizations to provide secure, 
          reliable, and innovative financial services.
        </p>
      </div>

      {/* Partners Display */}
      {groupByCategory ? renderByCategory() : (
        <>
          {variant === 'carousel' && renderCarousel()}
          {variant === 'grid' && renderGrid()}
          {variant === 'list' && renderList()}
          {variant === 'minimal' && renderMinimal()}
        </>
      )}

      {maxItems && filteredPartners.length < partners.length && (
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredPartners.length} of {partners.length} partners
          </p>
        </div>
      )}
    </div>
  );
};

export default PartnerLogos;