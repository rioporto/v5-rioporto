import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Shield, CheckCircle, Clock, ExternalLink, Award, Lock } from 'lucide-react';

export interface Certification {
  name: string;
  issuer: string;
  validUntil: string;
  status: 'active' | 'pending' | 'expired';
  description: string;
  logo?: string;
  verificationUrl?: string;
  category: 'security' | 'compliance' | 'quality' | 'financial';
  level: 'basic' | 'standard' | 'premium' | 'enterprise';
}

interface CertificationsProps {
  certifications?: Certification[];
  showExpired?: boolean;
  variant?: 'grid' | 'list' | 'badges';
}

const defaultCertifications: Certification[] = [
  {
    name: 'ISO 27001:2013',
    issuer: 'Bureau Veritas Certification',
    validUntil: '2025-12-31',
    status: 'active',
    description: 'Sistema de Gestão de Segurança da Informação certificado internacionalmente',
    category: 'security',
    level: 'enterprise',
    verificationUrl: 'https://certificate-verify.com/iso27001'
  },
  {
    name: 'SOC 2 Type II',
    issuer: 'PricewaterhouseCoopers (PwC)',
    validUntil: '2024-06-30',
    status: 'active',
    description: 'Auditoria de controles internos para segurança, disponibilidade e confidencialidade',
    category: 'security',
    level: 'enterprise',
    verificationUrl: 'https://aicpa.org/soc-verification'
  },
  {
    name: 'PCI DSS Level 1',
    issuer: 'Qualified Security Assessor',
    validUntil: '2024-12-31',
    status: 'active',
    description: 'Padrão de Segurança de Dados da Indústria de Cartões de Pagamento',
    category: 'security',
    level: 'premium',
    verificationUrl: 'https://pcisecuritystandards.org'
  },
  {
    name: 'ISAE 3402 Type II',
    issuer: 'KPMG Auditores Independentes',
    validUntil: '2024-08-15',
    status: 'active',
    description: 'Auditoria de controles em organização prestadora de serviços',
    category: 'financial',
    level: 'enterprise'
  },
  {
    name: 'CSA STAR Gold',
    issuer: 'Cloud Security Alliance',
    validUntil: '2025-03-20',
    status: 'active',
    description: 'Certificação de segurança em nuvem nível ouro',
    category: 'security',
    level: 'premium'
  },
  {
    name: 'COBIT 5',
    issuer: 'ISACA',
    validUntil: '2024-11-30',
    status: 'active',
    description: 'Framework de governança e gestão de TI empresarial',
    category: 'quality',
    level: 'standard'
  }
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'security':
      return Shield;
    case 'compliance':
      return CheckCircle;
    case 'quality':
      return Award;
    case 'financial':
      return Lock;
    default:
      return Shield;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'security':
      return 'text-red-600 bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-700';
    case 'compliance':
      return 'text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700';
    case 'quality':
      return 'text-purple-600 bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-700';
    case 'financial':
      return 'text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700';
    default:
      return 'text-slate-600 bg-slate-50 border-slate-200 dark:bg-slate-900/20 dark:border-slate-700';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'text-green-600 bg-green-50 border-green-200';
    case 'pending':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    case 'expired':
      return 'text-red-600 bg-red-50 border-red-200';
    default:
      return 'text-slate-600 bg-slate-50 border-slate-200';
  }
};

const getLevelBadge = (level: string) => {
  switch (level) {
    case 'enterprise':
      return { text: 'Enterprise', color: 'text-purple-600 bg-purple-50 border-purple-200' };
    case 'premium':
      return { text: 'Premium', color: 'text-orange-600 bg-orange-50 border-orange-200' };
    case 'standard':
      return { text: 'Standard', color: 'text-blue-600 bg-blue-50 border-blue-200' };
    case 'basic':
      return { text: 'Basic', color: 'text-slate-600 bg-slate-50 border-slate-200' };
    default:
      return { text: 'Standard', color: 'text-blue-600 bg-blue-50 border-blue-200' };
  }
};

export function Certifications({ 
  certifications = defaultCertifications, 
  showExpired = false,
  variant = 'grid'
}: CertificationsProps) {
  const filteredCertifications = showExpired 
    ? certifications 
    : certifications.filter(cert => cert.status !== 'expired');

  const activeCertifications = certifications.filter(cert => cert.status === 'active');
  const expiredCertifications = certifications.filter(cert => cert.status === 'expired');

  if (variant === 'badges') {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Certificações Ativas
          </h2>
          <p className="text-slate-600 dark:text-slate-300">
            Padrões internacionais de segurança e qualidade
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {activeCertifications.map((cert, index) => {
            const IconComponent = getCategoryIcon(cert.category);
            return (
              <Card key={index} className="p-4 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getCategoryColor(cert.category)}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                      {cert.name}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {cert.issuer}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Certificações Oficiais
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Padrões internacionais mantidos pela RioPorto
          </p>
        </div>

        <div className="space-y-4">
          {filteredCertifications.map((cert, index) => {
            const IconComponent = getCategoryIcon(cert.category);
            const levelBadge = getLevelBadge(cert.level);
            
            return (
              <Card key={index} className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getCategoryColor(cert.category)}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                          {cert.name}
                        </h3>
                        <Badge className={getStatusColor(cert.status)}>
                          {cert.status === 'active' ? 'Ativa' : 
                           cert.status === 'pending' ? 'Pendente' : 'Expirada'}
                        </Badge>
                        <Badge className={levelBadge.color}>
                          {levelBadge.text}
                        </Badge>
                      </div>
                      
                      <p className="text-slate-600 dark:text-slate-300 mb-3">
                        {cert.description}
                      </p>
                      
                      <div className="flex items-center space-x-6 text-sm text-slate-500">
                        <div className="flex items-center">
                          <Award className="w-4 h-4 mr-2" />
                          {cert.issuer}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          Válida até: {cert.validUntil}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {cert.verificationUrl && (
                    <a 
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Verificar
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  )}
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
          Certificações Oficiais
        </h2>
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          Mantemos os mais altos padrões de segurança, qualidade e compliance 
          através de certificações internacionalmente reconhecidas
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Card className="p-6 text-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">
            {activeCertifications.length}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Ativas</div>
        </Card>

        <Card className="p-6 text-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">
            {certifications.filter(c => c.level === 'enterprise').length}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Enterprise</div>
        </Card>

        <Card className="p-6 text-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-6 h-6 text-red-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">
            {certifications.filter(c => c.category === 'security').length}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Segurança</div>
        </Card>

        <Card className="p-6 text-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">100%</div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Compliance</div>
        </Card>
      </div>

      {/* Certifications Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCertifications.map((cert, index) => {
          const IconComponent = getCategoryIcon(cert.category);
          const levelBadge = getLevelBadge(cert.level);
          
          return (
            <Card key={index} className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getCategoryColor(cert.category)}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="flex flex-col space-y-2">
                  <Badge className={getStatusColor(cert.status)}>
                    {cert.status === 'active' ? 'Ativa' : 
                     cert.status === 'pending' ? 'Pendente' : 'Expirada'}
                  </Badge>
                  <Badge className={levelBadge.color}>
                    {levelBadge.text}
                  </Badge>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                {cert.name}
              </h3>
              
              <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">
                {cert.description}
              </p>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Emitida por:</span>
                  <span className="text-slate-900 dark:text-white font-medium">{cert.issuer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Válida até:</span>
                  <span className="text-slate-900 dark:text-white font-medium">{cert.validUntil}</span>
                </div>
              </div>
              
              {cert.verificationUrl && (
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <a 
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Verificar Certificado
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}