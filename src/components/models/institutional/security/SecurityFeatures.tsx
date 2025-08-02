import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Shield, Lock, Eye, AlertTriangle, CheckCircle, KeyRound, Database, Wifi } from 'lucide-react';

export interface SecurityFeature {
  title: string;
  description: string;
  icon: typeof Shield;
  category: 'authentication' | 'encryption' | 'monitoring' | 'infrastructure' | 'compliance';
  level: 'basic' | 'advanced' | 'enterprise';
  implementation: string;
  standards?: string[];
}

interface SecurityFeaturesProps {
  features?: SecurityFeature[];
  variant?: 'grid' | 'list' | 'detailed';
  showCategories?: boolean;
}

const defaultFeatures: SecurityFeature[] = [
  {
    title: 'Autenticação Multi-Fator (MFA)',
    description: 'Proteção adicional com múltiplos fatores de autenticação incluindo SMS, TOTP e biometria.',
    icon: KeyRound,
    category: 'authentication',
    level: 'enterprise',
    implementation: 'Obrigatório para todas as contas',
    standards: ['NIST 800-63B', 'FIDO2']
  },
  {
    title: 'Criptografia AES-256',
    description: 'Dados sensíveis protegidos com criptografia de nível militar, incluindo informações pessoais e transacionais.',
    icon: Lock,
    category: 'encryption',
    level: 'enterprise',
    implementation: 'Aplicado a todos os dados em repouso e trânsito',
    standards: ['AES-256', 'TLS 1.3', 'RSA-4096']
  },
  {
    title: 'Cold Storage Multi-Assinatura',
    description: '95% dos ativos digitais armazenados offline em cofres com múltiplas assinaturas criptográficas.',
    icon: Database,
    category: 'infrastructure',
    level: 'enterprise',
    implementation: 'Segregação automática de fundos',
    standards: ['Multi-sig 3/5', 'Hardware Security Modules']
  },
  {
    title: 'Monitoramento 24/7',
    description: 'Centro de operações de segurança com monitoramento contínuo de ameaças e anomalias.',
    icon: Eye,
    category: 'monitoring',
    level: 'enterprise',
    implementation: 'SOC automatizado com analistas dedicados',
    standards: ['SIEM', 'Machine Learning', 'Threat Intelligence']
  },
  {
    title: 'Detecção de Fraude em Tempo Real',
    description: 'Algoritmos de machine learning analisam transações em tempo real para detectar atividades suspeitas.',
    icon: AlertTriangle,
    category: 'monitoring',
    level: 'advanced',
    implementation: 'Análise comportamental automatizada',
    standards: ['AI/ML Models', 'Risk Scoring', 'Behavioral Analysis']
  },
  {
    title: 'Isolamento de Rede',
    description: 'Arquitetura de rede segregada com DMZ, firewalls de aplicação e microsegmentação.',
    icon: Wifi,
    category: 'infrastructure',
    level: 'enterprise',
    implementation: 'Zero Trust Architecture',
    standards: ['WAF', 'IPS/IDS', 'Network Segmentation']
  },
  {
    title: 'Auditoria de Acesso',
    description: 'Logging completo de todas as ações dos usuários e administradores com retenção de 7 anos.',
    icon: CheckCircle,
    category: 'compliance',
    level: 'enterprise',
    implementation: 'Logs imutáveis com blockchain',
    standards: ['LGPD', 'SOX', 'ISO 27001']
  },
  {
    title: 'Backup Descentralizado',
    description: 'Backups automáticos em múltiplas regiões geográficas com criptografia ponta-a-ponta.',
    icon: Database,
    category: 'infrastructure',
    level: 'advanced',
    implementation: 'RTO < 4h, RPO < 1h',
    standards: ['Geographic Redundancy', 'Automated Recovery']
  }
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'authentication':
      return KeyRound;
    case 'encryption':
      return Lock;
    case 'monitoring':
      return Eye;
    case 'infrastructure':
      return Database;
    case 'compliance':
      return CheckCircle;
    default:
      return Shield;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'authentication':
      return 'text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700';
    case 'encryption':
      return 'text-red-600 bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-700';
    case 'monitoring':
      return 'text-purple-600 bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-700';
    case 'infrastructure':
      return 'text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700';
    case 'compliance':
      return 'text-orange-600 bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-700';
    default:
      return 'text-slate-600 bg-slate-50 border-slate-200 dark:bg-slate-900/20 dark:border-slate-700';
  }
};

const getLevelColor = (level: string) => {
  switch (level) {
    case 'enterprise':
      return 'text-purple-600 bg-purple-50 border-purple-200';
    case 'advanced':
      return 'text-blue-600 bg-blue-50 border-blue-200';
    case 'basic':
      return 'text-slate-600 bg-slate-50 border-slate-200';
    default:
      return 'text-slate-600 bg-slate-50 border-slate-200';
  }
};

const getCategoryName = (category: string) => {
  switch (category) {
    case 'authentication':
      return 'Autenticação';
    case 'encryption':
      return 'Criptografia';
    case 'monitoring':
      return 'Monitoramento';
    case 'infrastructure':
      return 'Infraestrutura';
    case 'compliance':
      return 'Compliance';
    default:
      return category;
  }
};

export function SecurityFeatures({ 
  features = defaultFeatures, 
  variant = 'grid',
  showCategories = true 
}: SecurityFeaturesProps) {
  const categories = showCategories ? Array.from(new Set(features.map(f => f.category))) : [];

  if (variant === 'detailed') {
    return (
      <div className="space-y-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
            Segurança Institucional
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto">
            Implementamos os mais altos padrões de segurança da indústria para proteger 
            os ativos e dados de nossos clientes através de múltiplas camadas de proteção.
          </p>
        </div>

        {/* Security Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="p-6 text-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">99.99%</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Uptime SLA</div>
          </Card>

          <Card className="p-6 text-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">256-bit</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Criptografia</div>
          </Card>

          <Card className="p-6 text-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">24/7</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Monitoramento</div>
          </Card>

          <Card className="p-6 text-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Database className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">95%</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Cold Storage</div>
          </Card>
        </div>

        {/* Features by Category */}
        {categories.map(category => {
          const categoryFeatures = features.filter(f => f.category === category);
          const CategoryIcon = getCategoryIcon(category);
          
          return (
            <div key={category} className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getCategoryColor(category)}`}>
                  <CategoryIcon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {getCategoryName(category)}
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {categoryFeatures.map((feature, index) => {
                  const FeatureIcon = feature.icon;
                  return (
                    <Card key={index} className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getCategoryColor(feature.category)}`}>
                          <FeatureIcon className="w-5 h-5" />
                        </div>
                        <Badge className={getLevelColor(feature.level)}>
                          {feature.level === 'enterprise' ? 'Enterprise' : 
                           feature.level === 'advanced' ? 'Avançado' : 'Básico'}
                        </Badge>
                      </div>
                      
                      <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                        {feature.title}
                      </h4>
                      
                      <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                        {feature.description}
                      </p>
                      
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="font-medium text-slate-900 dark:text-white">Implementação:</span>
                          <p className="text-slate-600 dark:text-slate-300">{feature.implementation}</p>
                        </div>
                        
                        {feature.standards && feature.standards.length > 0 && (
                          <div>
                            <span className="font-medium text-slate-900 dark:text-white">Padrões:</span>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {feature.standards.map((standard, idx) => (
                                <Badge key={idx} variant="outline" size="sm">
                                  {standard}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Recursos de Segurança
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Proteção multicamadas para garantir a segurança dos seus ativos
          </p>
        </div>

        <div className="space-y-4">
          {features.map((feature, index) => {
            const FeatureIcon = feature.icon;
            return (
              <Card key={index} className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getCategoryColor(feature.category)}`}>
                      <FeatureIcon className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                          {feature.title}
                        </h3>
                        <Badge className={getLevelColor(feature.level)} size="sm">
                          {feature.level === 'enterprise' ? 'Enterprise' : 
                           feature.level === 'advanced' ? 'Avançado' : 'Básico'}
                        </Badge>
                      </div>
                      
                      <p className="text-slate-600 dark:text-slate-300 mb-3">
                        {feature.description}
                      </p>
                      
                      <p className="text-sm text-slate-500">
                        <span className="font-medium">Implementação:</span> {feature.implementation}
                      </p>
                    </div>
                  </div>
                  
                  <Badge className={getCategoryColor(feature.category)} variant="outline">
                    {getCategoryName(feature.category)}
                  </Badge>
                </div>
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
          Segurança de Nível Empresarial
        </h2>
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          Implementamos múltiplas camadas de proteção seguindo os mais altos 
          padrões internacionais de segurança
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const FeatureIcon = feature.icon;
          return (
            <Card key={index} className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getCategoryColor(feature.category)}`}>
                  <FeatureIcon className="w-6 h-6" />
                </div>
                <Badge className={getLevelColor(feature.level)} size="sm">
                  {feature.level === 'enterprise' ? 'Enterprise' : 
                   feature.level === 'advanced' ? 'Avançado' : 'Básico'}
                </Badge>
              </div>
              
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                {feature.description}
              </p>
              
              <div className="text-xs text-slate-500 mb-3">
                <span className="font-medium">Implementação:</span> {feature.implementation}
              </div>
              
              {feature.standards && feature.standards.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {feature.standards.slice(0, 2).map((standard, idx) => (
                    <Badge key={idx} variant="outline" size="sm">
                      {standard}
                    </Badge>
                  ))}
                  {feature.standards.length > 2 && (
                    <Badge variant="outline" size="sm">
                      +{feature.standards.length - 2}
                    </Badge>
                  )}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}