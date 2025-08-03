'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  ExternalLink
} from 'lucide-react';

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  platform: 'facebook' | 'twitter' | 'linkedin' | 'instagram' | 'youtube';
  href: string;
  label: string;
}

interface ContactInfo {
  address?: string;
  phone?: string;
  email?: string;
}

interface InstitutionalFooterProps {
  className?: string;
  companyName?: string;
  companyDescription?: string;
  sections?: FooterSection[];
  socialLinks?: SocialLink[];
  contactInfo?: ContactInfo;
  copyrightText?: string;
  legalLinks?: FooterLink[];
  logo?: React.ReactNode;
  variant?: 'primary' | 'minimal' | 'extended';
}

const InstitutionalFooter: React.FC<InstitutionalFooterProps> = ({
  className,
  companyName = 'RioPorto P2P',
  companyDescription = 'Leading cryptocurrency exchange platform connecting traders worldwide with secure, fast, and reliable P2P transactions.',
  sections = [],
  socialLinks = [],
  contactInfo,
  copyrightText,
  legalLinks = [],
  logo,
  variant = 'default'
}) => {
  const currentYear = new Date().getFullYear();
  const finalCopyrightText = copyrightText || `© ${currentYear} ${companyName}. All rights reserved.`;

  const getSocialIcon = (platform: SocialLink['platform']) => {
    const iconProps = { className: 'h-5 w-5' };
    
    switch (platform) {
      case 'facebook':
        return <Facebook {...iconProps} />;
      case 'twitter':
        return <Twitter {...iconProps} />;
      case 'linkedin':
        return <Linkedin {...iconProps} />;
      case 'instagram':
        return <Instagram {...iconProps} />;
      case 'youtube':
        return <Youtube {...iconProps} />;
      default:
        return null;
    }
  };

  if (variant === 'minimal') {
    return (
      <footer className={cn(
        'bg-card border-t border-border py-8',
        className
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              {logo || (
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                  <span className="text-white font-bold text-sm">RP</span>
                </div>
              )}
              <span className="font-display text-lg font-semibold text-foreground">
                {companyName}
              </span>
            </div>
            
            <div className="flex items-center space-x-6">
              {socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  {getSocialIcon(social.platform)}
                </a>
              ))}
            </div>
            
            <p className="text-sm text-muted-foreground">
              {finalCopyrightText}
            </p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className={cn(
      'bg-card border-t border-border',
      variant === 'extended' ? 'pt-16 pb-8' : 'pt-12 pb-8',
      className
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              {logo || (
                <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
                  <span className="text-white font-bold">RP</span>
                </div>
              )}
              <h3 className="font-display text-xl font-semibold text-foreground">
                {companyName}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              {companyDescription}
            </p>
            
            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex items-center space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                    aria-label={social.label}
                  >
                    {getSocialIcon(social.platform)}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Footer Sections */}
          {sections.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold text-foreground mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center space-x-1"
                    >
                      <span>{link.label}</span>
                      {link.external && <ExternalLink className="h-3 w-3" />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          {contactInfo && (
            <div>
              <h4 className="font-semibold text-foreground mb-4">
                Contact Us
              </h4>
              <div className="space-y-3">
                {contactInfo.address && (
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      {contactInfo.address}
                    </span>
                  </div>
                )}
                
                {contactInfo.phone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                )}
                
                {contactInfo.email && (
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              {finalCopyrightText}
            </p>
            
            {/* Legal Links */}
            {legalLinks.length > 0 && (
              <div className="flex items-center space-x-6">
                {legalLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center space-x-1"
                  >
                    <span>{link.label}</span>
                    {link.external && <ExternalLink className="h-3 w-3" />}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Additional compliance info for institutional variant */}
        {variant === 'extended' && (
          <div className="mt-8 pt-6 border-t border-border">
            <div className="bg-muted/50 rounded-md p-4">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong>Regulatory Notice:</strong> RioPorto P2P is committed to regulatory compliance 
                and operates under applicable financial regulations. Cryptocurrency trading involves 
                substantial risk of loss and is not suitable for all investors. Please ensure you 
                understand the risks involved before trading.
              </p>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};

export default InstitutionalFooter;