import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { AlertTriangle, Scale, FileText, Shield, Info, ExternalLink } from 'lucide-react';

export interface DisclaimerSection {
  title: string;
  content: string;
  type: 'risk' | 'regulatory' | 'operational' | 'general';
  important?: boolean;
}

interface LegalDisclaimerProps {
  variant?: 'full' | 'summary' | 'popup';
  sections?: DisclaimerSection[];
  showLastUpdated?: boolean;
  lastUpdated?: string;
}

const defaultSections: DisclaimerSection[] = [
  {
    title: 'Aviso de Riscos de Investimento',
    content: 'Investimentos em criptomoedas envolvem riscos significativos, incluindo a possibilidade de perda total do capital investido. As criptomoedas são ativos voláteis e seus preços podem flutuar drasticamente. Rentabilidade passada não é garantia de resultados futuros. Invista apenas o que pode se permitir perder.',
    type: 'risk',
    important: true
  },
  {
    title: 'Conformidade Regulatória',
    content: 'A RioPorto opera em conformidade com todas as regulamentações brasileiras aplicáveis, incluindo as normas do Banco Central do Brasil, CVM e demais órgãos reguladores. Mantemos licenças e registros necessários para operação legal no território nacional.',
    type: 'regulatory'
  },
  {
    title: 'Responsabilidades Operacionais',
    content: 'Os usuários são responsáveis por manter a segurança de suas credenciais de acesso, realizar due diligence adequada antes de transacionar e cumprir todas as obrigações fiscais aplicáveis. A RioPorto não fornece consultoria de investimentos.',
    type: 'operational'
  },
  {
    title: 'Limitação de Responsabilidade',
    content: 'A RioPorto atua como facilitadora de negociações P2P e não é responsável pela performance dos ativos negociados. Nossa responsabilidade limita-se ao provimento da plataforma e serviços de custódia conforme os termos de uso.',
    type: 'general'
  },
  {
    title: 'Prevenção à Lavagem de Dinheiro',
    content: 'Todos os usuários passam por rigoroso processo de KYC (Know Your Customer) e monitoramento contínuo de transações em conformidade com as leis brasileiras de prevenção à lavagem de dinheiro e financiamento ao terrorismo.',
    type: 'regulatory'
  },
  {
    title: 'Proteção de Dados Pessoais',
    content: 'O tratamento de dados pessoais é realizado em conformidade com a Lei Geral de Proteção de Dados (LGPD). Consulte nossa Política de Privacidade para informações detalhadas sobre coleta, uso e proteção de seus dados.',
    type: 'general'
  },
  {
    title: 'Resolução de Disputas',
    content: 'Eventuais disputas serão resolvidas preferencialmente através de mediação e arbitragem. O foro competente para questões não resolvidas extrajudicialmente é o da Comarca do Rio de Janeiro/RJ.',
    type: 'operational'
  },
  {
    title: 'Disponibilidade do Serviço',
    content: 'Embora mantenhamos alta disponibilidade (SLA 99.9%), a plataforma pode passar por manutenções programadas ou enfrentar interrupções não programadas. Não nos responsabilizamos por perdas decorrentes de indisponibilidade temporária.',
    type: 'operational'
  }
];

const getSectionIcon = (type: string) => {
  switch (type) {
    case 'risk':
      return AlertTriangle;
    case 'regulatory':
      return Scale;
    case 'operational':
      return FileText;
    case 'general':
      return Info;
    default:
      return Info;
  }
};

const getSectionColor = (type: string, important?: boolean) => {
  if (important) {
    return 'text-red-600 bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-700';
  }
  
  switch (type) {
    case 'risk':
      return 'text-orange-600 bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-700';
    case 'regulatory':
      return 'text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700';
    case 'operational':
      return 'text-purple-600 bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-700';
    case 'general':
      return 'text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700';
    default:
      return 'text-slate-600 bg-slate-50 border-slate-200 dark:bg-slate-900/20 dark:border-slate-700';
  }
};

const getTypeLabel = (type: string) => {
  switch (type) {
    case 'risk':
      return 'Risco';
    case 'regulatory':
      return 'Regulatório';
    case 'operational':
      return 'Operacional';
    case 'general':
      return 'Geral';
    default:
      return type;
  }
};

export function LegalDisclaimer({ 
  variant = 'full',
  sections = defaultSections,
  showLastUpdated = true,
  lastUpdated = '2024-03-01'
}: LegalDisclaimerProps) {
  
  if (variant === 'popup') {
    return (
      <Card className="p-6 max-w-2xl mx-auto bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Aviso Importante
          </h3>
        </div>

        <div className="space-y-4">
          {sections.filter(s => s.important).map((section, index) => (
            <div key={index} className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
              <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                {section.title}
              </h4>
              <p className="text-sm text-red-700 dark:text-red-300 leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            Ver Disclaimer Completo
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm">
            Li e Concordo
          </button>
        </div>
      </Card>
    );
  }

  if (variant === 'summary') {
    return (
      <Card className="p-6 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
            <Scale className="w-4 h-4 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Resumo Legal
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {sections.slice(0, 4).map((section, index) => {
            const IconComponent = getSectionIcon(section.type);
            return (
              <div key={index} className="flex items-start space-x-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${getSectionColor(section.type, section.important)}`}>
                  <IconComponent className="w-3 h-3" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white text-sm mb-1">
                    {section.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {section.content.substring(0, 120)}...
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 text-center">
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center mx-auto">
            Ver Disclaimer Completo
            <ExternalLink className="w-4 h-4 ml-1" />
          </button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <Scale className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          Avisos Legais e Disclaimers
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          Informações importantes sobre riscos, responsabilidades e conformidade regulatória
        </p>
      </div>

      {/* Important Notice */}
      <Card className="p-6 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-red-200 dark:border-red-700">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-red-800 dark:text-red-200 mb-3">
              Aviso de Risco Obrigatório
            </h2>
            <p className="text-red-700 dark:text-red-300 leading-relaxed">
              <strong>ATENÇÃO:</strong> Negociação de criptomoedas envolve riscos substanciais de perda financeira. 
              Os preços de criptomoedas são extremamente voláteis e podem resultar em perdas superiores ao investimento inicial. 
              Você deve considerar cuidadosamente se pode se permitir assumir o alto risco de perder seu dinheiro.
            </p>
          </div>
        </div>
      </Card>

      {/* Disclaimer Sections */}
      <div className="space-y-6">
        {sections.map((section, index) => {
          const IconComponent = getSectionIcon(section.type);
          return (
            <Card key={index} className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${getSectionColor(section.type, section.important)}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {section.title}
                    </h3>
                    <Badge variant="outline" className={getSectionColor(section.type, section.important)} size="sm">
                      {getTypeLabel(section.type)}
                    </Badge>
                    {section.important && (
                      <Badge className="text-red-600 bg-red-50 border-red-200" size="sm">
                        Importante
                      </Badge>
                    )}
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Regulatory Information */}
      <Card className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-700">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Informações Regulatórias
          </h2>
          <div className="max-w-3xl mx-auto text-slate-600 dark:text-slate-300 space-y-4">
            <p>
              <strong>CNPJ:</strong> 12.345.678/0001-90 • 
              <strong> Razão Social:</strong> RioPorto Tecnologia e Serviços Financeiros Ltda.
            </p>
            <p>
              <strong>Licenças:</strong> Instituição de Pagamento (Banco Central) • Agente Autônomo de Investimento (CVM)
            </p>
            <p>
              <strong>Endereço:</strong> Av. Rio Branco, 123 - Centro, Rio de Janeiro/RJ - CEP: 20040-020
            </p>
            <p>
              <strong>SAC:</strong> 0800 123 4567 • <strong>Ouvidoria:</strong> ouvidoria@rioporto.com
            </p>
          </div>
        </div>
      </Card>

      {/* Last Updated */}
      {showLastUpdated && (
        <div className="text-center text-sm text-slate-500">
          <p>Última atualização: {lastUpdated}</p>
          <p>Versão do documento: 3.2</p>
        </div>
      )}

      {/* Contact for Legal Questions */}
      <Card className="p-6 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-center">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
          Dúvidas Jurídicas?
        </h3>
        <p className="text-slate-600 dark:text-slate-300 mb-4">
          Para esclarecimentos sobre aspectos legais, entre em contato com nosso departamento jurídico
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="mailto:juridico@rioporto.com" className="text-blue-600 hover:text-blue-700 font-medium">
            juridico@rioporto.com
          </a>
          <span className="hidden sm:inline text-slate-400">•</span>
          <span className="text-slate-600 dark:text-slate-400">
            +55 21 3000-1280
          </span>
        </div>
      </Card>
    </div>
  );
}