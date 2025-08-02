'use client';

import React from 'react';
import {
  MinimalistButton,
  MinimalistCard,
  MinimalistCardHeader,
  MinimalistCardTitle,
  MinimalistCardDescription,
  MinimalistCardContent,
  MinimalistCardFooter,
  MinimalistHeader,
  MinimalistNavigation,
  MinimalistNavLink,
  MinimalistHeaderActions,
  MinimalistStats,
  MinimalistChart,
  MinimalistTable,
  MinimalistInput,
  MinimalistFormGroup,
  MinimalistFormActions,
  MinimalistHero,
  MinimalistFeatures,
  FeatureIcons,
  MinimalistCTA,
  MinimalistTestimonials,
} from './index';

/**
 * Example page demonstrating all Minimalist Design System components
 * This showcases the clean, elegant aesthetic of the minimalist theme
 */
export function MinimalistExample() {
  // Sample data
  const stats = [
    { label: 'Total Volume', value: 'R$ 2.4M', change: { value: '+12.5%', type: 'positive' as const } },
    { label: 'Active Users', value: '8,642', change: { value: '+8.2%', type: 'positive' as const } },
    { label: 'Transactions', value: '15,234', change: { value: '-2.1%', type: 'negative' as const } },
  ];

  const chartData = [
    { label: 'Jan', value: 400 },
    { label: 'Feb', value: 300 },
    { label: 'Mar', value: 600 },
    { label: 'Apr', value: 800 },
    { label: 'May', value: 500 },
  ];

  const tableColumns = [
    { key: 'asset', label: 'Asset', sortable: true },
    { key: 'price', label: 'Price', align: 'right' as const, sortable: true },
    { key: 'change', label: '24h Change', align: 'right' as const },
    { key: 'volume', label: 'Volume', align: 'right' as const },
  ];

  const tableData = [
    { asset: 'Bitcoin', price: 'R$ 245,000', change: '+2.4%', volume: 'R$ 1.2M' },
    { asset: 'Ethereum', price: 'R$ 12,500', change: '-1.2%', volume: 'R$ 850K' },
    { asset: 'Cardano', price: 'R$ 2.80', change: '+5.1%', volume: 'R$ 420K' },
  ];

  const features = [
    {
      title: 'Security First',
      description: 'Advanced encryption and multi-layer security protocols to protect your assets.',
      icon: <FeatureIcons.Security />,
    },
    {
      title: 'Lightning Fast',
      description: 'Execute trades in milliseconds with our high-performance trading engine.',
      icon: <FeatureIcons.Speed />,
    },
    {
      title: 'Advanced Analytics',
      description: 'Real-time market data and sophisticated charting tools for informed decisions.',
      icon: <FeatureIcons.Analytics />,
    },
  ];

  const testimonials = [
    {
      content: 'The clean interface and intuitive design make trading a pleasure. Best P2P platform I\'ve used.',
      author: {
        name: 'Maria Silva',
        title: 'Professional Trader',
        company: 'TradePro',
      },
      rating: 5,
    },
    {
      content: 'Exceptional user experience with all the features I need. The minimalist design is perfect.',
      author: {
        name: 'João Santos',
        title: 'Crypto Investor',
      },
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <MinimalistHeader>
        <MinimalistNavigation>
          <MinimalistNavLink href="#" active>Dashboard</MinimalistNavLink>
          <MinimalistNavLink href="#">Market</MinimalistNavLink>
          <MinimalistNavLink href="#">Portfolio</MinimalistNavLink>
          <MinimalistNavLink href="#">Settings</MinimalistNavLink>
        </MinimalistNavigation>
        
        <MinimalistHeaderActions>
          <MinimalistButton variant="ghost" size="sm">
            Sign In
          </MinimalistButton>
          <MinimalistButton variant="primary" size="sm">
            Get Started
          </MinimalistButton>
        </MinimalistHeaderActions>
      </MinimalistHeader>

      {/* Hero Section */}
      <MinimalistHero
        subtitle="RioPorto P2P"
        title="Trade with Confidence"
        description="Experience the future of peer-to-peer trading with our elegant, secure platform designed for modern investors."
        primaryAction={{
          label: 'Start Trading',
          onClick: () => console.log('Start trading clicked'),
        }}
        secondaryAction={{
          label: 'Learn More',
          onClick: () => console.log('Learn more clicked'),
        }}
      />

      {/* Stats Section */}
      <section className="py-20 bg-surface">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Platform Statistics
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              See how our platform is performing with real-time metrics and insights.
            </p>
          </div>
          
          <MinimalistStats stats={stats} columns={3} />
        </div>
      </section>

      {/* Dashboard Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Chart Card */}
            <MinimalistCard variant="elevated" padding="lg">
              <MinimalistCardHeader>
                <MinimalistCardTitle>Trading Volume</MinimalistCardTitle>
                <MinimalistCardDescription>
                  Monthly trading volume over the last 5 months
                </MinimalistCardDescription>
              </MinimalistCardHeader>
              <MinimalistCardContent>
                <MinimalistChart
                  data={chartData}
                  height={200}
                  type="bar"
                />
              </MinimalistCardContent>
            </MinimalistCard>

            {/* Form Card */}
            <MinimalistCard variant="elevated" padding="lg">
              <MinimalistCardHeader>
                <MinimalistCardTitle>Quick Trade</MinimalistCardTitle>
                <MinimalistCardDescription>
                  Execute a trade quickly with our simplified interface
                </MinimalistCardDescription>
              </MinimalistCardHeader>
              <MinimalistCardContent>
                <MinimalistFormGroup>
                  <MinimalistInput
                    label="Asset"
                    placeholder="e.g., Bitcoin"
                    required
                  />
                  <MinimalistInput
                    label="Amount"
                    type="number"
                    placeholder="0.00"
                    required
                  />
                </MinimalistFormGroup>
              </MinimalistCardContent>
              <MinimalistCardFooter>
                <MinimalistFormActions>
                  <MinimalistButton variant="ghost">
                    Cancel
                  </MinimalistButton>
                  <MinimalistButton variant="primary">
                    Execute Trade
                  </MinimalistButton>
                </MinimalistFormActions>
              </MinimalistCardFooter>
            </MinimalistCard>
          </div>

          {/* Market Table */}
          <MinimalistCard variant="default">
            <MinimalistCardHeader>
              <MinimalistCardTitle>Market Overview</MinimalistCardTitle>
              <MinimalistCardDescription>
                Current prices and 24h changes for top cryptocurrencies
              </MinimalistCardDescription>
            </MinimalistCardHeader>
            <MinimalistCardContent>
              <MinimalistTable
                columns={tableColumns}
                data={tableData}
                onSort={(key) => console.log('Sort by:', key)}
              />
            </MinimalistCardContent>
          </MinimalistCard>
        </div>
      </section>

      {/* Features Section */}
      <MinimalistFeatures
        subtitle="Why Choose RioPorto"
        title="Built for Modern Traders"
        description="Our platform combines cutting-edge technology with intuitive design to deliver the ultimate trading experience."
        features={features}
        variant="cards"
        columns={3}
      />

      {/* Testimonials */}
      <MinimalistTestimonials
        subtitle="Testimonials"
        title="What Our Users Say"
        description="Hear from traders who trust RioPorto for their cryptocurrency transactions."
        testimonials={testimonials}
        variant="cards"
        columns={2}
      />

      {/* CTA Section */}
      <MinimalistCTA
        subtitle="Ready to Start?"
        title="Join thousands of traders on RioPorto"
        description="Create your account today and experience the future of P2P cryptocurrency trading."
        primaryAction={{
          label: 'Create Account',
          onClick: () => console.log('Create account clicked'),
        }}
        secondaryAction={{
          label: 'Contact Sales',
          onClick: () => console.log('Contact sales clicked'),
        }}
        variant="card"
      />

      {/* Footer */}
      <footer className="py-12 bg-surface border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted">
            © 2024 RioPorto P2P. Built with the Minimalist Design System.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default MinimalistExample;