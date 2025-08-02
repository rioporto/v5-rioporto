import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Building2, Globe, Handshake, TrendingUp, Users, ExternalLink } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';

export interface Partner {
  name: string;
  logo?: string;
  category: 'banking' | 'technology' | 'regulatory' | 'strategic' | 'integration';
  type: 'strategic' | 'commercial' | 'technology' | 'regulatory';
  description: string;
  since: string;
  website?: string;
  status: 'active' | 'pending' | 'ended';
  highlights?: string[];
}

interface PartnershipsProps {
  partners?: Partner[];
  showAll?: boolean;
  variant?: 'grid' | 'logos' | 'detailed';
}

const defaultPartners: Partner[] = [
  {
    name: 'Banco Inter',
    category: 'banking',
    type: 'strategic',
    description: 'Parceria estratégica para integração P2P nativa no aplicativo do Inter, oferecendo acesso direto a 15 milhões de clientes.',
    since: '2024',
    status: 'active',
    website: 'https://bancointer.com.br',
    highlights: ['15M clientes', 'Integração nativa', 'APIs dedicadas']
  },
  {
    name: 'Microsoft',
    category: 'technology',
    type: 'technology',
    description: 'Infraestrutura Azure para hospedagem segura e escalável da plataforma, com recursos de AI e blockchain.',
    since: '2023',
    status: 'active',
    website: 'https://microsoft.com',
    highlights: ['Azure Cloud', 'AI Services', 'Enterprise Support']
  },
  {
    name: 'Chainalysis',
    category: 'regulatory',
    type: 'regulatory',
    description: 'Soluções de compliance e monitoramento de transações blockchain para prevenção a lavagem de dinheiro.',
    since: '2023',
    status: 'active',
    website: 'https://chainalysis.com',
    highlights: ['AML Compliance', 'Transaction Monitoring', 'Risk Assessment']
  },
  {
    name: 'Pix Central',
    category: 'integration',
    type: 'commercial',
    description: 'Integração com sistema Pix para liquidação instantânea de transações P2P em reais.',
    since: '2022',
    status: 'active',
    highlights: ['Pix Integration', 'Instant Settlement', '24/7 Operations']
  },
  {
    name: 'ClearSale',
    category: 'technology',
    type: 'technology',
    description: 'Soluções antifraude e análise comportamental para proteção de transações e usuários.',
    since: '2023',
    status: 'active',
    website: 'https://clear.sale',
    highlights: ['Fraud Prevention', 'Behavioral Analysis', 'Real-time Scoring']
  },
  {
    name: 'AWS',
    category: 'technology',
    type: 'technology',
    description: 'Infraestrutura de nuvem adicional para backup e disaster recovery, garantindo disponibilidade de 99.99%.',
    since: '2022',
    status: 'active',
    website: 'https://aws.amazon.com',
    highlights: ['Disaster Recovery', 'Global CDN', 'Compliance Tools']
  },
  {
    name: 'Circle',
    category: 'strategic',
    type: 'strategic',
    description: 'Parceria para suporte nativo a USDC e integração com o ecossistema de stablecoins da Circle.',
    since: '2024',
    status: 'active',
    website: 'https://circle.com',
    highlights: ['USDC Support', 'Stablecoin Integration', 'Global Reach']
  },
  {
    name: 'Febraban',
    category: 'regulatory',
    type: 'regulatory',
    description: 'Membro ativo da Federação Brasileira de Bancos, participando de grupos de trabalho sobre inovação financeira.',
    since: '2023',
    status: 'active',
    website: 'https://febraban.org.br',
    highlights: ['Industry Standards', 'Regulatory Input', 'Best Practices']
  }
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'banking':
      return Building2;
    case 'technology':
      return Globe;
    case 'regulatory':
      return Badge;
    case 'strategic':
      return TrendingUp;
    case 'integration':
      return Handshake;
    default:
      return Building2;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'banking':
      return 'text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700';
    case 'technology':
      return 'text-purple-600 bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-700';
    case 'regulatory':
      return 'text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700';
    case 'strategic':
      return 'text-orange-600 bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-700';
    case 'integration':
      return 'text-indigo-600 bg-indigo-50 border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-700';
    default:
      return 'text-slate-600 bg-slate-50 border-slate-200 dark:bg-slate-900/20 dark:border-slate-700';
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'strategic':
      return 'text-red-600 bg-red-50 border-red-200';
    case 'commercial':
      return 'text-blue-600 bg-blue-50 border-blue-200';
    case 'technology':
      return 'text-purple-600 bg-purple-50 border-purple-200';
    case 'regulatory':
      return 'text-green-600 bg-green-50 border-green-200';
    default:
      return 'text-slate-600 bg-slate-50 border-slate-200';
  }
};

export function Partnerships({ 
  partners = defaultPartners, 
  showAll = false, 
  variant = 'grid' 
}: PartnershipsProps) {
  const activePartners = partners.filter(p => p.status === 'active');
  const displayPartners = showAll ? partners : activePartners.slice(0, 6);

  if (variant === 'logos') {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Parceiros Estratégicos
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Colaborações que fortalecem nosso ecossistema
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {activePartners.map((partner, index) => (
            <Card key={index} className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow group">
              <div className="text-center">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-slate-200 dark:group-hover:bg-slate-600 transition-colors">
                  <span className="text-lg font-bold text-slate-600 dark:text-slate-300">
                    {partner.name.substring(0, 2)}
                  </span>
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                  {partner.name}
                </h3>
                <Badge className={`${getCategoryColor(partner.category)} mt-2`} variant="outline" size="sm">
                  {partner.category}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Parcerias Estratégicas
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Relacionamentos estratégicos que potencializam nossa capacidade de 
            oferecer soluções inovadoras e seguras no mercado P2P
          </p>
        </div>

        <div className="space-y-6">
          {displayPartners.map((partner, index) => {
            const IconComponent = getCategoryIcon(partner.category);
            return (
              <Card key={index} className="p-8 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${getCategoryColor(partner.category)}`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                        {partner.name}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300">
                        Parceria desde {partner.since}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <Badge className={getTypeColor(partner.type)}>
                      {partner.type === 'strategic' ? 'Estratégica' : 
                       partner.type === 'commercial' ? 'Comercial' : 
                       partner.type === 'technology' ? 'Tecnológica' : 'Regulatória'}
                    </Badge>
                    {partner.website && (
                      <a 
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-700 text-sm"
                      >
                        Website
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  {partner.description}
                </p>

                {partner.highlights && partner.highlights.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
                      Principais Benefícios:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {partner.highlights.map((highlight, idx) => (
                        <Badge key={idx} variant="secondary">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          Parcerias Estratégicas
        </h2>
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          Colaborações com líderes do mercado para oferecer as melhores soluções P2P
        </p>
      </div>

      {/* Partnership Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Card className="p-6 text-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">
            {partners.filter(p => p.category === 'banking').length}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Bancos</div>
        </Card>

        <Card className="p-6 text-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Globe className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">
            {partners.filter(p => p.category === 'technology').length}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Tecnologia</div>
        </Card>

        <Card className="p-6 text-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-6 h-6 text-orange-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">
            {partners.filter(p => p.type === 'strategic').length}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Estratégicas</div>
        </Card>

        <Card className="p-6 text-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">
            {activePartners.length}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Ativas</div>
        </Card>
      </div>

      {/* Partners Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayPartners.map((partner, index) => {
          const IconComponent = getCategoryIcon(partner.category);
          return (
            <Card key={index} className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getCategoryColor(partner.category)}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="flex flex-col space-y-1">
                  <Badge className={getTypeColor(partner.type)} size="sm">
                    {partner.type === 'strategic' ? 'Estratégica' : 
                     partner.type === 'commercial' ? 'Comercial' :
                     partner.type === 'technology' ? 'Tecnológica' : 'Regulatória'}
                  </Badge>
                  <span className="text-xs text-slate-500">Desde {partner.since}</span>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                {partner.name}
              </h3>
              
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                {partner.description}
              </p>
              
              {partner.highlights && partner.highlights.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {partner.highlights.slice(0, 2).map((highlight, idx) => (
                    <Badge key={idx} variant="outline" size="sm">
                      {highlight}
                    </Badge>
                  ))}
                  {partner.highlights.length > 2 && (
                    <Badge variant="outline" size="sm">
                      +{partner.highlights.length - 2}
                    </Badge>
                  )}
                </div>
              )}
              
              {partner.website && (
                <a 
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  Saiba mais
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              )}
            </Card>
          );
        })}
      </div>

      {!showAll && partners.length > 6 && (
        <div className="text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Ver Todas as Parcerias ({partners.length})
          </button>
        </div>
      )}
    </div>
  );
}