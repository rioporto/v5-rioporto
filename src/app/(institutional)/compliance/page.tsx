import { Section } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Shield, FileCheck, Scale, Eye, Lock, AlertTriangle, CheckCircle, Award } from 'lucide-react';

export default function CompliancePage() {
  const certifications = [
    {
      name: 'ISO 27001',
      description: 'Gestão de Segurança da Informação',
      issuer: 'Bureau Veritas',
      validUntil: '2025-12-31',
      status: 'Ativa'
    },
    {
      name: 'SOC 2 Type II',
      description: 'Auditoria de Controles Internos',
      issuer: 'PwC Brasil',
      validUntil: '2024-06-30',
      status: 'Ativa'
    },
    {
      name: 'PCI DSS Level 1',
      description: 'Padrão de Segurança de Dados',
      issuer: 'Visa/Mastercard',
      validUntil: '2024-12-31',
      status: 'Ativa'
    }
  ];

  const regulations = [
    {
      title: 'Lei nº 12.865/2013',
      description: 'Arranjos de Pagamento',
      compliance: '100%',
      lastAudit: '2024-01-15'
    },
    {
      title: 'Resolução BCB nº 80/2021',
      description: 'Prevenção à Lavagem de Dinheiro',
      compliance: '100%',
      lastAudit: '2024-02-20'
    },
    {
      title: 'LGPD (Lei 13.709/2018)',
      description: 'Proteção de Dados Pessoais',
      compliance: '100%',
      lastAudit: '2024-01-30'
    },
    {
      title: 'Instrução CVM nº 617/2019',
      description: 'Oferta Pública de Criptoativos',
      compliance: '100%',
      lastAudit: '2023-12-10'
    }
  ];

  const policies = [
    {
      title: 'Política AML/CFT',
      description: 'Prevenção à Lavagem de Dinheiro e Financiamento ao Terrorismo',
      lastUpdate: '2024-01-15',
      version: '3.2'
    },
    {
      title: 'Política KYC',
      description: 'Conheça Seu Cliente e Due Diligence',
      lastUpdate: '2024-02-01',
      version: '2.8'
    },
    {
      title: 'Política de Privacidade',
      description: 'Tratamento e Proteção de Dados Pessoais',
      lastUpdate: '2024-01-20',
      version: '4.1'
    },
    {
      title: 'Código de Ética',
      description: 'Conduta Empresarial e Integridade',
      lastUpdate: '2024-03-01',
      version: '1.5'
    }
  ];

  return (
    <div className="py-12 space-y-16">
      {/* Hero Section */}
      <Section className="text-center">
        <div className="max-w-4xl mx-auto">
          <Badge variant="outline" className="mb-4 text-blue-600 border-blue-200">
            Compliance & Regulação
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            Conformidade Regulatória
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
            Mantemos os mais altos padrões de compliance e transparência, seguindo rigorosamente 
            todas as regulamentações brasileiras e internacionais aplicáveis ao nosso negócio.
          </p>
        </div>
      </Section>

      {/* Compliance Overview */}
      <Section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="text-center p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">100%</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Compliance Score</div>
          </Card>
          
          <Card className="text-center p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">15+</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Certificações</div>
          </Card>
          
          <Card className="text-center p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileCheck className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">24</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Auditorias/Ano</div>
          </Card>
          
          <Card className="text-center p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">0</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Infrações</div>
          </Card>
        </div>
      </Section>

      {/* Certifications */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Certificações Ativas
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Mantemos certificações internacionalmente reconhecidas para garantir os mais altos padrões de segurança e governança
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <Card key={index} className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <Badge variant="outline" className="text-green-600 border-green-200">
                  {cert.status}
                </Badge>
              </div>
              
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                {cert.name}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
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
            </Card>
          ))}
        </div>
      </Section>

      {/* Regulatory Compliance */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Conformidade Regulatória
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Aderência completa às principais regulamentações do sistema financeiro brasileiro
          </p>
        </div>

        <div className="space-y-4">
          {regulations.map((reg, index) => (
            <Card key={index} className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <Scale className="w-5 h-5 text-blue-600 mr-3" />
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {reg.title}
                    </h3>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 mb-2">
                    {reg.description}
                  </p>
                  <p className="text-sm text-slate-500">
                    Última auditoria: {reg.lastAudit}
                  </p>
                </div>
                
                <div className="text-right ml-6">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {reg.compliance}
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    Conforme
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Policies & Procedures */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Políticas & Procedimentos
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Documentação abrangente que orienta nossa conduta empresarial e operacional
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {policies.map((policy, index) => (
            <Card key={index} className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <FileCheck className="w-6 h-6 text-blue-600" />
                </div>
                <Badge variant="secondary">
                  v{policy.version}
                </Badge>
              </div>
              
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                {policy.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                {policy.description}
              </p>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">
                  Atualizada em: {policy.lastUpdate}
                </span>
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  Visualizar →
                </button>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Security Measures */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Medidas de Segurança
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Proteções multicamadas para garantir a segurança dos ativos e dados dos clientes
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Cold Storage
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              95% dos ativos armazenados offline em cofres seguros com múltiplas assinaturas.
            </p>
          </Card>

          <Card className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Criptografia AES-256
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Todos os dados sensíveis protegidos com criptografia de nível militar.
            </p>
          </Card>

          <Card className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
              <Eye className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Monitoramento 24/7
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Centro de operações de segurança com monitoramento contínuo de ameaças.
            </p>
          </Card>
        </div>
      </Section>

      {/* Risk Management */}
      <Section>
        <Card className="p-8 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 border-slate-200 dark:border-slate-600">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Gestão de Riscos
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Framework abrangente para identificação, avaliação e mitigação de riscos operacionais, 
              de mercado, de crédito e de liquidez.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                Principais Controles
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center text-slate-600 dark:text-slate-300">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  Limites operacionais automatizados
                </li>
                <li className="flex items-center text-slate-600 dark:text-slate-300">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  Sistema de alerta em tempo real
                </li>
                <li className="flex items-center text-slate-600 dark:text-slate-300">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  Segregação de funções críticas
                </li>
                <li className="flex items-center text-slate-600 dark:text-slate-300">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  Backup e continuidade de negócios
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                Auditoria & Governança
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center text-slate-600 dark:text-slate-300">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  Auditoria interna trimestral
                </li>
                <li className="flex items-center text-slate-600 dark:text-slate-300">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  Auditoria externa anual (Big Four)
                </li>
                <li className="flex items-center text-slate-600 dark:text-slate-300">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  Comitê de riscos independente
                </li>
                <li className="flex items-center text-slate-600 dark:text-slate-300">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  Relatórios regulatórios mensais
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </Section>

      {/* Contact */}
      <Section>
        <Card className="p-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Central de Compliance
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Dúvidas sobre compliance, regulamentação ou relatórios de auditoria?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              compliance@rioporto.com
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Relatórios Públicos
            </button>
          </div>
        </Card>
      </Section>
    </div>
  );
}