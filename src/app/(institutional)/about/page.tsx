import { Section } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Building2, Users, Globe, Award, Shield, TrendingUp } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="py-12 space-y-16">
      {/* Hero Section */}
      <Section className="text-center">
        <div className="max-w-4xl mx-auto">
          <Badge variant="outline" className="mb-4 text-blue-600 border-blue-200">
            Empresa Institucional
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            Sobre a RioPorto
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
            Líder no mercado de negociação peer-to-peer de ativos digitais, 
            oferecendo soluções institucionais seguras e regulamentadas desde 2019.
          </p>
        </div>
      </Section>

      {/* Company Stats */}
      <Section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <Card className="text-center p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">500K+</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Usuários Ativos</div>
          </Card>
          
          <Card className="text-center p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">R$ 50B+</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Volume Negociado</div>
          </Card>
          
          <Card className="text-center p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">25+</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Países</div>
          </Card>
          
          <Card className="text-center p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">15+</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Prêmios</div>
          </Card>
        </div>
      </Section>

      {/* Mission & Vision */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12">
          <Card className="p-8 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-4">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Nossa Missão</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Democratizar o acesso aos mercados de ativos digitais através de uma plataforma 
              P2P segura, transparente e regulamentada, permitindo que indivíduos e instituições 
              negociem com confiança e eficiência.
            </p>
          </Card>

          <Card className="p-8 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Nossa Visão</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Ser a principal plataforma de negociação P2P da América Latina, reconhecida pela 
              inovação tecnológica, segurança institucional e conformidade regulatória, 
              conectando mercados tradicionais e digitais.
            </p>
          </Card>
        </div>
      </Section>

      {/* Company History */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Nossa História
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Uma jornada de inovação e crescimento no mercado brasileiro
          </p>
        </div>

        <div className="space-y-8">
          <div className="flex items-start">
            <div className="w-20 flex-shrink-0 text-right mr-8">
              <div className="text-2xl font-bold text-blue-600">2019</div>
            </div>
            <Card className="flex-1 p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Fundação da RioPorto
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Lançamento da plataforma com foco em negociação P2P de Bitcoin no Brasil.
              </p>
            </Card>
          </div>

          <div className="flex items-start">
            <div className="w-20 flex-shrink-0 text-right mr-8">
              <div className="text-2xl font-bold text-blue-600">2020</div>
            </div>
            <Card className="flex-1 p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Expansão de Ativos
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Adição de Ethereum, Litecoin e outras criptomoedas principais à plataforma.
              </p>
            </Card>
          </div>

          <div className="flex items-start">
            <div className="w-20 flex-shrink-0 text-right mr-8">
              <div className="text-2xl font-bold text-blue-600">2021</div>
            </div>
            <Card className="flex-1 p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Licenciamento Regulatório
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Obtenção das primeiras licenças regulatórias e certificações de segurança.
              </p>
            </Card>
          </div>

          <div className="flex items-start">
            <div className="w-20 flex-shrink-0 text-right mr-8">
              <div className="text-2xl font-bold text-blue-600">2023</div>
            </div>
            <Card className="flex-1 p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Soluções Institucionais
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Lançamento de produtos dedicados para investidores institucionais e empresas.
              </p>
            </Card>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Nossos Valores
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Os princípios que guiam nossa atuação no mercado
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6 text-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
              Segurança
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Protocolos de segurança de nível bancário para garantir a proteção dos ativos e dados dos clientes.
            </p>
          </Card>

          <Card className="p-6 text-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
              Transparência
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Processos claros e auditáveis, com relatórios regulares e comunicação aberta com o mercado.
            </p>
          </Card>

          <Card className="p-6 text-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
              Inovação
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Desenvolvimento contínuo de tecnologias e soluções para atender às demandas do mercado.
            </p>
          </Card>
        </div>
      </Section>
    </div>
  );
}