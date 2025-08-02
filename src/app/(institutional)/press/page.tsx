import { Section } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Calendar, Download, ExternalLink, Award, Newspaper, Mic, Camera, Mail, Phone } from 'lucide-react';

export default function PressPage() {
  const pressReleases = [
    {
      title: 'RioPorto Anuncia Parceria Estratégica com Banco Inter para Ampliar Acesso ao P2P',
      date: '2024-03-15',
      category: 'Parceria',
      summary: 'Acordo permitirá que 15 milhões de clientes do Inter tenham acesso à plataforma P2P da RioPorto através de integração nativa no app.',
      readTime: '3 min'
    },
    {
      title: 'RioPorto Obtém Licença de Instituição de Pagamento do Banco Central',
      date: '2024-02-28',
      category: 'Regulação',
      summary: 'Autorização do BCB representa marco importante na expansão dos serviços e fortalece posição regulatória da empresa.',
      readTime: '4 min'
    },
    {
      title: 'Receita da RioPorto Cresce 85% em 2023, Atingindo R$ 450 Milhões',
      date: '2024-03-31',
      category: 'Financeiro',
      summary: 'Resultados recordes demonstram consolidação da empresa como líder no mercado P2P brasileiro.',
      readTime: '5 min'
    },
    {
      title: 'RioPorto Lança Programa de Sustentabilidade Crypto Green Initiative',
      date: '2024-01-20',
      category: 'ESG',
      summary: 'Iniciativa visa neutralizar pegada de carbono das transações através de projetos de reflorestamento na Mata Atlântica.',
      readTime: '4 min'
    }
  ];

  const mediaKit = [
    {
      title: 'Kit de Imprensa Completo',
      description: 'Logos, fotos executivos, backgrounders',
      format: 'ZIP',
      size: '15.2 MB',
      lastUpdate: '2024-03-01'
    },
    {
      title: 'Logos & Identidade Visual',
      description: 'Diferentes formatos e variações',
      format: 'AI/PNG/SVG',
      size: '8.4 MB',
      lastUpdate: '2024-02-15'
    },
    {
      title: 'Fotos Executivos (Alta Resolução)',
      description: 'Imagens profissionais da liderança',
      format: 'JPG',
      size: '12.1 MB',
      lastUpdate: '2024-01-30'
    },
    {
      title: 'Apresentação Corporativa',
      description: 'Deck institucional atualizado',
      format: 'PDF/PPTX',
      size: '5.8 MB',
      lastUpdate: '2024-03-10'
    }
  ];

  const mediaContacts = [
    {
      name: 'Julia Fernandes',
      role: 'Diretora de Marketing e Comunicação',
      email: 'imprensa@rioporto.com',
      phone: '+55 21 3000-1250',
      whatsapp: '+55 21 99888-7777',
      image: '/avatars/julia-fernandes.jpg',
      specialties: ['Estratégia', 'Produto', 'Mercado']
    },
    {
      name: 'Carlos Silva',
      role: 'CEO (Entrevistas Executivas)',
      email: 'ceo.media@rioporto.com',
      phone: '+55 21 3000-1200',
      whatsapp: '+55 21 99777-6666',
      image: '/avatars/carlos-silva.jpg',
      specialties: ['Visão', 'Estratégia', 'Mercado']
    },
    {
      name: 'Marina Oliveira',
      role: 'CCO (Temas Regulatórios)',
      email: 'compliance.media@rioporto.com',
      phone: '+55 21 3000-1220',
      whatsapp: '+55 21 99666-5555',
      image: '/avatars/marina-oliveira.jpg',
      specialties: ['Regulação', 'Compliance', 'Segurança']
    }
  ];

  const awards = [
    {
      title: 'Fintech do Ano',
      organization: 'Prêmio ABFintech 2023',
      date: '2023-11-15',
      category: 'P2P/Trading'
    },
    {
      title: 'Melhor Plataforma P2P',
      organization: 'Crypto Awards Brasil',
      date: '2023-09-20',
      category: 'Inovação'
    },
    {
      title: 'Top 10 Startups Fintech',
      organization: 'Forbes Brasil',
      date: '2023-08-10',
      category: 'Reconhecimento'
    },
    {
      title: 'Certificação Great Place to Work',
      organization: 'GPTW Brasil',
      date: '2023-07-05',
      category: 'Cultura'
    }
  ];

  const mediaAppearances = [
    {
      outlet: 'Valor Econômico',
      title: 'O Futuro do P2P no Brasil',
      date: '2024-03-20',
      type: 'Artigo',
      journalist: 'Fernando Costa'
    },
    {
      outlet: 'Podcast Crypto BR',
      title: 'Regulação e Inovação no Mercado Cripto',
      date: '2024-03-10',
      type: 'Podcast',
      journalist: 'Maria Santos'
    },
    {
      outlet: 'CNN Brasil',
      title: 'Crescimento das Fintechs P2P',
      date: '2024-02-25',
      type: 'TV',
      journalist: 'Roberto Lima'
    },
    {
      outlet: 'Estadão',
      title: 'Mercado P2P Movimenta R$ 50 Bilhões',
      date: '2024-02-15',
      type: 'Jornal',
      journalist: 'Ana Carvalho'
    }
  ];

  return (
    <div className="py-12 space-y-16">
      {/* Hero Section */}
      <Section className="text-center">
        <div className="max-w-4xl mx-auto">
          <Badge variant="outline" className="mb-4 text-blue-600 border-blue-200">
            Sala de Imprensa
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            Centro de Mídia
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
            Recursos, comunicados e informações para jornalistas, analistas e 
            profissionais de mídia interessados em cobrir a RioPorto.
          </p>
        </div>
      </Section>

      {/* Quick Stats */}
      <Section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="text-center p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Newspaper className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">150+</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Matérias Publicadas</div>
          </Card>
          
          <Card className="text-center p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mic className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">45+</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Entrevistas/Podcasts</div>
          </Card>
          
          <Card className="text-center p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">25+</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Aparições TV</div>
          </Card>
          
          <Card className="text-center p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">15+</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Prêmios Recebidos</div>
          </Card>
        </div>
      </Section>

      {/* Latest Press Releases */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Comunicados Recentes
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Últimas notícias e anúncios oficiais da RioPorto
          </p>
        </div>

        <div className="space-y-6">
          {pressReleases.map((release, index) => (
            <Card key={index} className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <Badge variant="secondary" className="mr-3">
                      {release.category}
                    </Badge>
                    <div className="flex items-center text-sm text-slate-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {release.date}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                    {release.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {release.summary}
                  </p>
                </div>
                <div className="ml-6 text-right">
                  <div className="text-sm text-slate-500 mb-2">{release.readTime}</div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center">
                    Ler Mais
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Media Contacts */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Contatos de Imprensa
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Nossa equipe está disponível para entrevistas, esclarecimentos e material adicional
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {mediaContacts.map((contact, index) => (
            <Card key={index} className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <div className="text-center mb-4">
                <Avatar 
                  src={contact.image} 
                  alt={contact.name}
                  className="w-20 h-20 mx-auto mb-4"
                />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {contact.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                  {contact.role}
                </p>
                
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {contact.specialties.map((specialty, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 text-slate-500 mr-2" />
                  <a href={`mailto:${contact.email}`} className="text-blue-600 hover:text-blue-700">
                    {contact.email}
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-slate-500 mr-2" />
                  <span className="text-slate-600 dark:text-slate-300">{contact.phone}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 text-slate-500 mr-2 text-center">📱</div>
                  <span className="text-slate-600 dark:text-slate-300">{contact.whatsapp}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Media Kit */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Kit de Mídia
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Recursos visuais e materiais de apoio para cobertura jornalística
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {mediaKit.map((item, index) => (
            <Card key={index} className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <Download className="w-6 h-6 text-purple-600" />
                </div>
                <Badge variant="secondary">
                  {item.format}
                </Badge>
              </div>
              
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                {item.description}
              </p>
              
              <div className="flex justify-between items-center text-sm text-slate-500 mb-4">
                <span>Tamanho: {item.size}</span>
                <span>Atualizado: {item.lastUpdate}</span>
              </div>
              
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                Download
              </button>
            </Card>
          ))}
        </div>
      </Section>

      {/* Awards & Recognition */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Prêmios & Reconhecimentos
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Principais prêmios e reconhecimentos recebidos pela RioPorto
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {awards.map((award, index) => (
            <Card key={index} className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mr-4">
                  <Award className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {award.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    {award.organization}
                  </p>
                  <div className="flex items-center mt-2">
                    <Badge variant="outline" className="mr-2">
                      {award.category}
                    </Badge>
                    <span className="text-sm text-slate-500">{award.date}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Recent Media Appearances */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Aparições na Mídia
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Entrevistas recentes e cobertura da imprensa
          </p>
        </div>

        <div className="space-y-4">
          {mediaAppearances.map((appearance, index) => (
            <Card key={index} className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mr-4">
                    {appearance.type === 'TV' && <Camera className="w-5 h-5 text-slate-600" />}
                    {appearance.type === 'Podcast' && <Mic className="w-5 h-5 text-slate-600" />}
                    {(appearance.type === 'Artigo' || appearance.type === 'Jornal') && <Newspaper className="w-5 h-5 text-slate-600" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {appearance.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      {appearance.outlet} • {appearance.journalist}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <Badge variant="outline" className="mb-2">
                    {appearance.type}
                  </Badge>
                  <div className="text-sm text-slate-500">{appearance.date}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Press Contact CTA */}
      <Section>
        <Card className="p-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Fale com Nossa Assessoria
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Precisa de informações adicionais, entrevistas ou materiais específicos?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:imprensa@rioporto.com"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              imprensa@rioporto.com
            </a>
            <a 
              href="tel:+552130001250"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              +55 21 3000-1250
            </a>
          </div>
        </Card>
      </Section>
    </div>
  );
}