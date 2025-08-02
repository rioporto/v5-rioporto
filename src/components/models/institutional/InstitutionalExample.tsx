'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import {
  InstitutionalButton,
  InstitutionalCard,
  InstitutionalCardHeader,
  InstitutionalHeader,
  InstitutionalTable,
  InstitutionalForm,
  InstitutionalInput,
  InstitutionalSelect,
  InstitutionalFormGroup,
  InstitutionalFooter,
  SecurityBadgeGrid,
  TrustSeals,
  PartnerLogos,
  ExecutiveTeam,
  CompanyStats
} from './index';

interface InstitutionalExampleProps {
  className?: string;
}

const InstitutionalExample: React.FC<InstitutionalExampleProps> = ({ className }) => {
  // Sample data
  const navigationItems = [
    { key: 'home', label: 'Home', href: '/', active: true },
    { key: 'about', label: 'About Us', href: '/about' },
    { key: 'services', label: 'Services', href: '/services' },
    { key: 'reports', label: 'Reports', href: '/reports' },
    { key: 'contact', label: 'Contact', href: '/contact' }
  ];

  const userMenu = {
    name: 'John Executive',
    email: 'john@company.com',
    role: 'Chief Financial Officer',
    items: [
      { label: 'Profile', href: '/profile' },
      { label: 'Settings', href: '/settings' },
      { label: '', divider: true },
      { label: 'Sign Out', onClick: () => console.log('Sign out') }
    ]
  };

  const securityBadges = [
    { type: 'ssl' as const, status: 'active' as const, title: 'SSL 256-bit Encryption' },
    { type: 'audit' as const, status: 'verified' as const, certificationBody: 'PwC' },
    { type: 'compliance' as const, status: 'active' as const, validUntil: '2025-12-31' }
  ];

  const trustSeals = [
    {
      id: '1',
      name: 'ISO 27001',
      type: 'security' as const,
      provider: 'ISO',
      status: 'active' as const,
      imageUrl: '/trust-seals/iso27001.png',
      validUntil: '2025-06-30'
    },
    {
      id: '2', 
      name: 'SOC 2 Type II',
      type: 'certification' as const,
      provider: 'AICPA',
      status: 'active' as const,
      score: 95,
      maxScore: 100
    }
  ];

  const companyStats = [
    {
      id: '1',
      label: 'Assets Under Management',
      value: 2500000000,
      prefix: '$',
      category: 'financial' as const,
      change: { value: 12.5, period: 'vs last quarter', trend: 'up' as const }
    },
    {
      id: '2',
      label: 'Active Institutional Clients',
      value: 850,
      category: 'operational' as const,
      change: { value: 8.3, period: 'vs last month', trend: 'up' as const }
    },
    {
      id: '3',
      label: 'Global Markets Coverage',
      value: 45,
      category: 'growth' as const,
      suffix: ' countries'
    },
    {
      id: '4',
      label: 'Industry Awards',
      value: 23,
      category: 'achievement' as const,
      description: 'Recognition for excellence in financial services'
    }
  ];

  const executives = [
    {
      id: '1',
      name: 'Maria Silva',
      position: 'Chief Executive Officer',
      department: 'Executive Leadership',
      bio: 'Maria has over 20 years of experience in financial services and has led the company\'s strategic transformation into a leading cryptocurrency exchange platform.',
      photo: '/executives/maria-silva.jpg',
      education: ['MBA from Harvard Business School', 'BS in Finance from USP'],
      experience: ['Former VP at JPMorgan Chase', 'Senior Analyst at Goldman Sachs'],
      social: {
        linkedin: 'https://linkedin.com/in/maria-silva',
        email: 'maria.silva@rioporto.com'
      },
      joinDate: '2018',
      location: 'São Paulo, Brazil',
      specialties: ['Strategic Planning', 'Financial Services', 'Digital Transformation']
    }
  ];

  const tableColumns = [
    { key: 'date', title: 'Date', dataIndex: 'date', sortable: true },
    { key: 'client', title: 'Client', dataIndex: 'client', sortable: true },
    { key: 'amount', title: 'Amount', dataIndex: 'amount', sortable: true },
    { key: 'status', title: 'Status', dataIndex: 'status' }
  ];

  const tableData = [
    { date: '2024-01-15', client: 'Institutional Fund A', amount: '$2,500,000', status: 'Completed' },
    { date: '2024-01-14', client: 'Corporate Client B', amount: '$1,200,000', status: 'Processing' },
    { date: '2024-01-13', client: 'Investment Bank C', amount: '$5,000,000', status: 'Completed' }
  ];

  const partnerLogos = [
    {
      id: '1',
      name: 'Major Bank',
      logo: '/partners/bank.png',
      category: 'bank' as const,
      partnership: 'strategic' as const,
      featured: true,
      tier: 'platinum' as const,
      since: '2020'
    }
  ];

  const footerSections = [
    {
      title: 'Services',
      links: [
        { label: 'Institutional Trading', href: '/services/trading' },
        { label: 'Portfolio Management', href: '/services/portfolio' },
        { label: 'Risk Assessment', href: '/services/risk' },
        { label: 'Compliance Solutions', href: '/services/compliance' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Market Reports', href: '/reports/market' },
        { label: 'Research Papers', href: '/research' },
        { label: 'Regulatory Updates', href: '/regulatory' },
        { label: 'API Documentation', href: '/docs/api' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Executive Team', href: '/team' },
        { label: 'Careers', href: '/careers' },
        { label: 'Press Center', href: '/press' }
      ]
    }
  ];

  const socialLinks = [
    { platform: 'linkedin' as const, href: 'https://linkedin.com/company/rioporto', label: 'LinkedIn' },
    { platform: 'twitter' as const, href: 'https://twitter.com/rioporto', label: 'Twitter' }
  ];

  const contactInfo = {
    address: '123 Financial District, São Paulo, SP 01000-000, Brazil',
    phone: '+55 11 1234-5678',
    email: 'institutional@rioporto.com'
  };

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Regulatory Compliance', href: '/compliance' }
  ];

  return (
    <div className={cn('min-h-screen bg-background', className)}>
      {/* Header */}
      <InstitutionalHeader
        title="RioPorto Institutional"
        navigation={navigationItems}
        userMenu={userMenu}
        notifications={true}
        search={true}
      />

      {/* Main Content */}
      <main className="institutional-container py-8 space-y-12">
        {/* Hero Section */}
        <section className="text-center py-12 bg-card rounded-lg border">
          <h1 className="text-4xl font-bold text-foreground mb-4 font-display">
            Institutional-Grade Cryptocurrency Exchange
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Trusted by leading financial institutions worldwide for secure, 
            compliant, and professional cryptocurrency trading solutions.
          </p>
          <div className="flex justify-center space-x-4">
            <InstitutionalButton variant="primary" size="lg">
              Request Demo
            </InstitutionalButton>
            <InstitutionalButton variant="outline" size="lg">
              Download Whitepaper
            </InstitutionalButton>
          </div>
        </section>

        {/* Company Statistics */}
        <section>
          <CompanyStats
            stats={companyStats}
            variant="highlight"
            showTrends={true}
            showDescriptions={true}
            animateCounters={true}
            groupByCategory={false}
          />
        </section>

        {/* Trust & Security */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4 font-display">
              Security & Compliance
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our commitment to security and regulatory compliance ensures your 
              investments are protected by industry-leading standards.
            </p>
          </div>

          <SecurityBadgeGrid
            badges={securityBadges}
            columns={3}
            variant="detailed"
          />

          <TrustSeals
            seals={trustSeals}
            variant="grid"
            showDetails={true}
            maxItems={6}
          />
        </section>

        {/* Services Overview */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <InstitutionalCard variant="elevated" padding="lg">
            <InstitutionalCardHeader
              title="Institutional Trading"
              subtitle="Professional-grade trading platform"
            />
            <p className="text-muted-foreground">
              Advanced trading tools designed for institutional investors with 
              deep liquidity and competitive pricing.
            </p>
          </InstitutionalCard>

          <InstitutionalCard variant="elevated" padding="lg">
            <InstitutionalCardHeader
              title="Portfolio Management"
              subtitle="Comprehensive asset management"
            />
            <p className="text-muted-foreground">
              Full-service portfolio management with real-time reporting, 
              risk assessment, and performance analytics.
            </p>
          </InstitutionalCard>

          <InstitutionalCard variant="elevated" padding="lg">
            <InstitutionalCardHeader
              title="Compliance Solutions"
              subtitle="Regulatory compliance made simple"
            />
            <p className="text-muted-foreground">
              Automated compliance monitoring, reporting tools, and regulatory 
              updates to keep your operations compliant.
            </p>
          </InstitutionalCard>
        </section>

        {/* Recent Transactions Table */}
        <section>
          <InstitutionalTable
            columns={tableColumns}
            data={tableData}
            title="Recent Institutional Transactions"
            searchable={true}
            exportable={true}
            pagination={{
              current: 1,
              pageSize: 10,
              total: 50,
              onChange: (page, pageSize) => console.log('Page changed:', page, pageSize)
            }}
          />
        </section>

        {/* Contact Form */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <InstitutionalForm title="Request Institutional Access">
            <InstitutionalFormGroup title="Company Information">
              <InstitutionalInput
                label="Company Name"
                required
                placeholder="Enter your company name"
              />
              <InstitutionalInput
                label="Contact Person"
                required
                placeholder="Full name of primary contact"
              />
              <InstitutionalInput
                label="Email Address"
                type="email"
                required
                placeholder="institutional@company.com"
              />
              <InstitutionalSelect
                label="Company Type"
                required
                options={[
                  { value: '', label: 'Select company type' },
                  { value: 'bank', label: 'Bank' },
                  { value: 'fund', label: 'Investment Fund' },
                  { value: 'insurance', label: 'Insurance Company' },
                  { value: 'pension', label: 'Pension Fund' },
                  { value: 'other', label: 'Other Financial Institution' }
                ]}
              />
            </InstitutionalFormGroup>

            <div className="flex justify-end space-x-4">
              <InstitutionalButton variant="outline">
                Save Draft
              </InstitutionalButton>
              <InstitutionalButton variant="primary">
                Submit Request
              </InstitutionalButton>
            </div>
          </InstitutionalForm>

          <div className="space-y-6">
            <ExecutiveTeam
              executives={executives}
              variant="minimal"
              showBio={false}
            />

            <PartnerLogos
              partners={partnerLogos}
              variant="minimal"
              showFeaturedOnly={true}
              maxItems={4}
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <InstitutionalFooter
        variant="extended"
        companyName="RioPorto Institutional"
        companyDescription="Leading cryptocurrency exchange platform designed for institutional investors and corporate clients."
        sections={footerSections}
        socialLinks={socialLinks}
        contactInfo={contactInfo}
        legalLinks={legalLinks}
      />
    </div>
  );
};

export default InstitutionalExample;