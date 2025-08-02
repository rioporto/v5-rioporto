import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Star, Quote, Building2, TrendingUp, Shield } from 'lucide-react';

export interface Testimonial {
  id: string;
  clientName: string;
  position: string;
  company: string;
  companySize: 'startup' | 'sme' | 'enterprise' | 'corporation';
  industry: string;
  testimonial: string;
  rating: number;
  benefits: string[];
  avatar?: string;
  companyLogo?: string;
  metrics?: {
    label: string;
    value: string;
  }[];
  verified: boolean;
  date: string;
}

interface ClientTestimonialsProps {
  testimonials?: Testimonial[];
  variant?: 'grid' | 'carousel' | 'masonry';
  showMetrics?: boolean;
  filterByIndustry?: string;
}

const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    clientName: 'Roberto Martins',
    position: 'CFO',
    company: 'TechCorp Brasil',
    companySize: 'enterprise',
    industry: 'Tecnologia',
    testimonial: 'A RioPorto revolucionou nossa operação de tesouraria. Conseguimos diversificar nossos investimentos em criptomoedas com total segurança e compliance. A plataforma P2P oferece liquidez excepcional e o suporte institucional é impecável.',
    rating: 5,
    benefits: ['Liquidez 24/7', 'Compliance Total', 'Suporte Dedicado'],
    verified: true,
    date: '2024-02-15',
    metrics: [
      { label: 'Economia em Fees', value: '40%' },
      { label: 'Tempo de Settlement', value: '<2min' }
    ]
  },
  {
    id: '2',
    clientName: 'Ana Paula Santos',
    position: 'Diretora de Investimentos',
    company: 'Fundo Crescimento',
    companySize: 'corporation',
    industry: 'Gestão de Ativos',
    testimonial: 'Como gestora de um fundo de R$ 2 bilhões, preciso de execução perfeita. A RioPorto oferece profundidade de mercado, spreads competitivos e a segurança regulatória que nossos investidores exigem. É nossa principal plataforma para Bitcoin.',
    rating: 5,
    benefits: ['Market Depth', 'Spreads Baixos', 'Segurança Regulatória'],
    verified: true,
    date: '2024-01-28',
    metrics: [
      { label: 'Volume Mensal', value: 'R$ 50M+' },
      { label: 'Uptime', value: '99.99%' }
    ]
  },
  {
    id: '3',
    clientName: 'Carlos Eduardo Lima',
    position: 'Diretor Financeiro',
    company: 'MetalCorp S.A.',
    companySize: 'enterprise',
    industry: 'Mineração',
    testimonial: 'Utilizamos a RioPorto para hedge cambial através de Bitcoin. A plataforma oferece a estabilidade e confiabilidade que uma empresa de capital aberto necessita. O reporting para auditoria é exemplar.',
    rating: 5,
    benefits: ['Hedge Cambial', 'Reporting Auditável', 'Estabilidade'],
    verified: true,
    date: '2024-01-10',
    metrics: [
      { label: 'Hedge Effectiveness', value: '96%' },
      { label: 'Cost Reduction', value: '25%' }
    ]
  },
  {
    id: '4',
    clientName: 'Marina Silva',
    position: 'CEO',
    company: 'FinanceFlow',
    companySize: 'sme',
    industry: 'Fintech',
    testimonial: 'Como fintech, precisávamos de um parceiro que entendesse nossos desafios regulatórios. A RioPorto não só oferece APIs robustas, como também compartilha conhecimento sobre compliance. Parceria estratégica de verdade.',
    rating: 5,
    benefits: ['APIs Robustas', 'Knowledge Sharing', 'Compliance'],
    verified: true,
    date: '2023-12-20',
    metrics: [
      { label: 'API Uptime', value: '99.95%' },
      { label: 'Integration Time', value: '2 semanas' }
    ]
  },
  {
    id: '5',
    clientName: 'Pedro Oliveira',
    position: 'Tesoureiro',
    company: 'Grupo Logística BR',
    companySize: 'corporation',
    industry: 'Logística',
    testimonial: 'Gerenciamos uma operação complexa com pagamentos internacionais. A RioPorto simplificou nossos processos de conversão e oferece rastreabilidade completa. O time de relacionamento institucional é excepcional.',
    rating: 5,
    benefits: ['Pagamentos Internacionais', 'Rastreabilidade', 'Relacionamento'],
    verified: true,
    date: '2023-11-15',
    metrics: [
      { label: 'Settlements/mês', value: '500+' },
      { label: 'Cost Savings', value: '30%' }
    ]
  },
  {
    id: '6',
    clientName: 'Julia Costa',
    position: 'Investment Manager',
    company: 'Pension Fund ABC',
    companySize: 'corporation',
    industry: 'Previdência',
    testimonial: 'Representamos 500 mil cotistas e não podemos errar. A RioPorto demonstrou consistentemente os mais altos padrões de segurança e governança. É nossa única plataforma aprovada para alocação em Bitcoin.',
    rating: 5,
    benefits: ['Segurança Máxima', 'Governança', 'Due Diligence'],
    verified: true,
    date: '2023-10-30',
    metrics: [
      { label: 'Assets Under Management', value: 'R$ 1.2B' },
      { label: 'Risk Score', value: 'AAA' }
    ]
  }
];

const getCompanySizeColor = (size: string) => {
  switch (size) {
    case 'startup':
      return 'text-green-600 bg-green-50 border-green-200';
    case 'sme':
      return 'text-blue-600 bg-blue-50 border-blue-200';
    case 'enterprise':
      return 'text-purple-600 bg-purple-50 border-purple-200';
    case 'corporation':
      return 'text-orange-600 bg-orange-50 border-orange-200';
    default:
      return 'text-slate-600 bg-slate-50 border-slate-200';
  }
};

const getCompanySizeLabel = (size: string) => {
  switch (size) {
    case 'startup':
      return 'Startup';
    case 'sme':
      return 'Média Empresa';
    case 'enterprise':
      return 'Grande Empresa';
    case 'corporation':
      return 'Corporação';
    default:
      return size;
  }
};

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star 
      key={i} 
      className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-slate-300'}`} 
    />
  ));
};

export function ClientTestimonials({ 
  testimonials = defaultTestimonials, 
  variant = 'grid',
  showMetrics = true,
  filterByIndustry 
}: ClientTestimonialsProps) {
  const filteredTestimonials = filterByIndustry 
    ? testimonials.filter(t => t.industry === filterByIndustry)
    : testimonials;

  const industries = Array.from(new Set(testimonials.map(t => t.industry)));

  if (variant === 'masonry') {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Depoimentos verificados de clientes institucionais que confiam na RioPorto
          </p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredTestimonials.map((testimonial) => (
            <Card key={testimonial.id} className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 break-inside-avoid">
              <div className="flex items-start justify-between mb-4">
                <div className="flex">
                  {renderStars(testimonial.rating)}
                </div>
                {testimonial.verified && (
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    Verificado
                  </Badge>
                )}
              </div>

              <div className="relative mb-6">
                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-blue-200 dark:text-blue-800" />
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed pl-6">
                  "{testimonial.testimonial}"
                </p>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <Avatar 
                  src={testimonial.avatar} 
                  alt={testimonial.clientName}
                  className="w-12 h-12"
                />
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">
                    {testimonial.clientName}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {testimonial.position}
                  </p>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {testimonial.company}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className={getCompanySizeColor(testimonial.companySize)} size="sm">
                  {getCompanySizeLabel(testimonial.companySize)}
                </Badge>
                <Badge variant="outline" size="sm">
                  {testimonial.industry}
                </Badge>
              </div>

              {showMetrics && testimonial.metrics && (
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                  {testimonial.metrics.map((metric, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-lg font-bold text-slate-900 dark:text-white">
                        {metric.value}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          Depoimentos de Clientes Institucionais
        </h2>
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          Empresas líderes em seus segmentos confiam na RioPorto para suas operações P2P
        </p>
      </div>

      {/* Industry Filter */}
      {industries.length > 1 && (
        <div className="flex flex-wrap justify-center gap-3">
          <Badge 
            variant={!filterByIndustry ? "default" : "outline"}
            className="cursor-pointer"
          >
            Todos
          </Badge>
          {industries.map(industry => (
            <Badge 
              key={industry}
              variant={filterByIndustry === industry ? "default" : "outline"}
              className="cursor-pointer"
            >
              {industry}
            </Badge>
          ))}
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Card className="p-6 text-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-6 h-6 text-yellow-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">4.9</div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Rating Médio</div>
        </Card>

        <Card className="p-6 text-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">500+</div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Clientes Corporativos</div>
        </Card>

        <Card className="p-6 text-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">98%</div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Taxa de Renovação</div>
        </Card>

        <Card className="p-6 text-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">100%</div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Depoimentos Verificados</div>
        </Card>
      </div>

      {/* Testimonials Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {filteredTestimonials.map((testimonial) => (
          <Card key={testimonial.id} className="p-8 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-6">
              <div className="flex">
                {renderStars(testimonial.rating)}
              </div>
              {testimonial.verified && (
                <Badge variant="outline" className="text-green-600 border-green-200">
                  Verificado
                </Badge>
              )}
            </div>

            <div className="relative mb-6">
              <Quote className="absolute -top-2 -left-2 w-8 h-8 text-blue-200 dark:text-blue-800" />
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg pl-6">
                "{testimonial.testimonial}"
              </p>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <Avatar 
                src={testimonial.avatar} 
                alt={testimonial.clientName}
                className="w-16 h-16"
              />
              <div>
                <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {testimonial.clientName}
                </h4>
                <p className="text-slate-600 dark:text-slate-400">
                  {testimonial.position}
                </p>
                <p className="font-medium text-slate-700 dark:text-slate-300">
                  {testimonial.company}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <Badge className={getCompanySizeColor(testimonial.companySize)}>
                {getCompanySizeLabel(testimonial.companySize)}
              </Badge>
              <Badge variant="outline">
                {testimonial.industry}
              </Badge>
              {testimonial.benefits.slice(0, 2).map((benefit, idx) => (
                <Badge key={idx} variant="secondary" size="sm">
                  {benefit}
                </Badge>
              ))}
            </div>

            {showMetrics && testimonial.metrics && (
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                {testimonial.metrics.map((metric, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                      {metric.value}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center">
        <Card className="p-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <h3 className="text-2xl font-bold mb-4">
            Junte-se aos Líderes do Mercado
          </h3>
          <p className="text-xl text-blue-100 mb-6">
            Mais de 500 empresas já confiam na RioPorto para suas operações P2P
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            Solicitar Demonstração
          </button>
        </Card>
      </div>
    </div>
  );
}