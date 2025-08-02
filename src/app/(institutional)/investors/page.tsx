import { Section } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { TrendingUp, Download, Calendar, PieChart, BarChart3, DollarSign, Users, Globe } from 'lucide-react';

export default function InvestorsPage() {
  const financialHighlights = [
    {
      metric: 'Receita Bruta (2023)',
      value: 'R$ 450M',
      growth: '+85%',
      icon: DollarSign
    },
    {
      metric: 'EBITDA (2023)',
      value: 'R$ 125M',
      growth: '+120%',
      icon: TrendingUp
    },
    {
      metric: 'Usuários Ativos',
      value: '500K+',
      growth: '+65%',
      icon: Users
    },
    {
      metric: 'Volume Negociado',
      value: 'R$ 50B+',
      growth: '+90%',
      icon: BarChart3
    }
  ];

  const reports = [
    {
      title: 'Relatório Anual 2023',
      type: 'Anual',
      date: '2024-03-31',
      size: '2.4 MB',
      language: 'PT/EN'
    },
    {
      title: 'Demonstrações Financeiras Q4 2023',
      type: 'Trimestral',
      date: '2024-02-15',
      size: '1.8 MB',
      language: 'PT/EN'
    },
    {
      title: 'Relatório de Sustentabilidade 2023',
      type: 'ESG',
      date: '2024-04-15',
      size: '3.2 MB',
      language: 'PT/EN'
    },
    {
      title: 'Apresentação Institucional',
      type: 'Corporativo',
      date: '2024-01-20',
      size: '5.1 MB',
      language: 'PT/EN'
    }
  ];

  const events = [
    {
      title: 'Earnings Call Q1 2024',
      date: '2024-05-15',
      time: '16:00 BRT',
      type: 'Virtual',
      status: 'Próximo'
    },
    {
      title: 'Crypto Finance Summit',
      date: '2024-06-20',
      time: '09:00 BRT',
      type: 'São Paulo',
      status: 'Confirmado'
    },
    {
      title: 'Assembleia Geral Ordinária',
      date: '2024-04-30',
      time: '14:00 BRT',
      type: 'Virtual',
      status: 'Realizado'
    }
  ];

  return (
    <div className="py-12 space-y-16">
      {/* Hero Section */}
      <Section className="text-center">
        <div className="max-w-4xl mx-auto">
          <Badge variant="outline" className="mb-4 text-blue-600 border-blue-200">
            Relações com Investidores
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            Central do Investidor
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
            Informações financeiras, relatórios corporativos e comunicações oficiais 
            para acionistas, investidores e analistas do mercado.
          </p>
        </div>
      </Section>

      {/* Financial Highlights */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Destaques Financeiros
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Principais indicadores de performance e crescimento da RioPorto
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {financialHighlights.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Card key={index} className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                  {item.value}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  {item.metric}
                </div>
                <Badge variant="outline" className="text-green-600 border-green-200">
                  {item.growth}
                </Badge>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Stock Information */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12">
          <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-700">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-4">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Informações Acionárias</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-300">Ticker:</span>
                <span className="font-semibold text-slate-900 dark:text-white">RIOP4</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-300">Segmento:</span>
                <span className="font-semibold text-slate-900 dark:text-white">Novo Mercado</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-300">Setor:</span>
                <span className="font-semibold text-slate-900 dark:text-white">Serviços Financeiros</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-300">CNPJ:</span>
                <span className="font-semibold text-slate-900 dark:text-white">12.345.678/0001-90</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-300">Ações Ordinárias:</span>
                <span className="font-semibold text-slate-900 dark:text-white">25.000.000</span>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-700">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-4">
                <PieChart className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Estrutura Acionária</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-300">Fundadores:</span>
                <div className="text-right">
                  <div className="font-semibold text-slate-900 dark:text-white">45%</div>
                  <div className="text-sm text-slate-500">11.250.000 ações</div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-300">Investidores Institucionais:</span>
                <div className="text-right">
                  <div className="font-semibold text-slate-900 dark:text-white">35%</div>
                  <div className="text-sm text-slate-500">8.750.000 ações</div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-300">Free Float:</span>
                <div className="text-right">
                  <div className="font-semibold text-slate-900 dark:text-white">20%</div>
                  <div className="text-sm text-slate-500">5.000.000 ações</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Reports & Documents */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Relatórios & Documentos
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Acesse demonstrações financeiras, relatórios de governança e documentos corporativos
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {reports.map((report, index) => (
            <Card key={index} className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <Download className="w-6 h-6 text-blue-600" />
                </div>
                <Badge variant="secondary">
                  {report.type}
                </Badge>
              </div>
              
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                {report.title}
              </h3>
              
              <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300 mb-4">
                <div className="flex justify-between">
                  <span>Data:</span>
                  <span>{report.date}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tamanho:</span>
                  <span>{report.size}</span>
                </div>
                <div className="flex justify-between">
                  <span>Idioma:</span>
                  <span>{report.language}</span>
                </div>
              </div>
              
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                Download PDF
              </button>
            </Card>
          ))}
        </div>
      </Section>

      {/* Upcoming Events */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Eventos & Calendário
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Próximos eventos, earnings calls e apresentações corporativas
          </p>
        </div>

        <div className="space-y-4">
          {events.map((event, index) => (
            <Card key={index} className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-4">
                    <Calendar className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {event.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      {event.date} • {event.time} • {event.type}
                    </p>
                  </div>
                </div>
                
                <Badge 
                  variant={event.status === 'Próximo' ? 'default' : event.status === 'Confirmado' ? 'secondary' : 'outline'}
                  className={
                    event.status === 'Próximo' ? 'text-blue-600 border-blue-200' :
                    event.status === 'Confirmado' ? 'text-green-600 border-green-200' :
                    'text-slate-600 border-slate-200'
                  }
                >
                  {event.status}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* ESG Information */}
      <Section>
        <Card className="p-8 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4">
              Sustentabilidade & ESG
            </h2>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Compromisso com práticas sustentáveis e responsabilidade social corporativa
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="text-green-100">Energia Renovável</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">Carbon</div>
              <div className="text-green-100">Neutral 2024</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">R$ 5M</div>
              <div className="text-green-100">Investimento Social</div>
            </div>
          </div>
        </Card>
      </Section>

      {/* Contact IR */}
      <Section>
        <Card className="p-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Contato - Relações com Investidores
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Nossa equipe de RI está disponível para esclarecer dúvidas e fornecer informações adicionais
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div>
              <h3 className="text-xl font-semibold mb-4">Roberto Santos - CFO</h3>
              <div className="space-y-2 text-blue-100">
                <p>Email: ri@rioporto.com</p>
                <p>Telefone: +55 21 3000-1234</p>
                <p>WhatsApp: +55 21 99999-8888</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Horário de Atendimento</h3>
              <div className="space-y-2 text-blue-100">
                <p>Segunda a Sexta: 9h às 18h</p>
                <p>Earnings Calls: Conforme agenda</p>
                <p>Fuso Horário: Brasília (BRT)</p>
              </div>
            </div>
          </div>
        </Card>
      </Section>
    </div>
  );
}