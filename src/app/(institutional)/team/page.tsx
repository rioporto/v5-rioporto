import { Section } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Linkedin, Twitter, Mail } from 'lucide-react';

export default function TeamPage() {
  const teamMembers = [
    {
      name: 'Carlos Silva',
      position: 'CEO & Fundador',
      department: 'Liderança',
      bio: 'Ex-Goldman Sachs com 15 anos de experiência em mercados financeiros. Formado em Engenharia pela USP e MBA pela Wharton.',
      image: '/avatars/carlos-silva.jpg',
      linkedin: 'https://linkedin.com/in/carlossilva',
      twitter: 'https://twitter.com/carlossilva',
      email: 'carlos.silva@rioporto.com'
    },
    {
      name: 'Ana Rodriguez',
      position: 'CTO',
      department: 'Tecnologia',
      bio: 'Ex-Microsoft com expertise em sistemas distribuídos e blockchain. PhD em Ciência da Computação pela Stanford.',
      image: '/avatars/ana-rodriguez.jpg',
      linkedin: 'https://linkedin.com/in/anarodriguez',
      twitter: 'https://twitter.com/anarodriguez',
      email: 'ana.rodriguez@rioporto.com'
    },
    {
      name: 'Roberto Santos',
      position: 'CFO',
      department: 'Financeiro',
      bio: 'Ex-BTG Pactual com 12 anos em mercado de capitais. CPA-20 e certificação CFA. Especialista em compliance financeiro.',
      image: '/avatars/roberto-santos.jpg',
      linkedin: 'https://linkedin.com/in/robertosantos',
      twitter: 'https://twitter.com/robertosantos',
      email: 'roberto.santos@rioporto.com'
    },
    {
      name: 'Marina Oliveira',
      position: 'Chief Compliance Officer',
      department: 'Compliance',
      bio: 'Ex-Banco Central com 10 anos em regulação financeira. Especialista em AML/KYC e regulamentação de criptomoedas.',
      image: '/avatars/marina-oliveira.jpg',
      linkedin: 'https://linkedin.com/in/marinaoliveira',
      twitter: 'https://twitter.com/marinaoliveira',
      email: 'marina.oliveira@rioporto.com'
    },
    {
      name: 'Pedro Costa',
      position: 'VP de Produto',
      department: 'Produto',
      bio: 'Ex-Nubank com 8 anos em produtos financeiros digitais. Formado em Design pela ESPM com especialização em UX.',
      image: '/avatars/pedro-costa.jpg',
      linkedin: 'https://linkedin.com/in/pedrocosta',
      twitter: 'https://twitter.com/pedrocosta',
      email: 'pedro.costa@rioporto.com'
    },
    {
      name: 'Julia Fernandes',
      position: 'Diretora de Marketing',
      department: 'Marketing',
      bio: 'Ex-Google com expertise em marketing digital e growth. MBA em Marketing pela FGV e certificação em Growth Hacking.',
      image: '/avatars/julia-fernandes.jpg',
      linkedin: 'https://linkedin.com/in/juliafernandes',
      twitter: 'https://twitter.com/juliafernandes',
      email: 'julia.fernandes@rioporto.com'
    }
  ];

  const advisors = [
    {
      name: 'Dr. Ricardo Medeiros',
      position: 'Advisor - Regulação',
      bio: 'Ex-diretor do Banco Central do Brasil. PhD em Economia Monetária.',
      image: '/avatars/ricardo-medeiros.jpg'
    },
    {
      name: 'Sarah Johnson',
      position: 'Advisor - Internacional',
      bio: 'Ex-VP da Coinbase. Especialista em expansão internacional de fintechs.',
      image: '/avatars/sarah-johnson.jpg'
    },
    {
      name: 'Prof. Miguel Torres',
      position: 'Advisor - Tecnologia',
      bio: 'Professor de Blockchain na MIT. Co-autor de 50+ papers sobre DLT.',
      image: '/avatars/miguel-torres.jpg'
    }
  ];

  return (
    <div className="py-12 space-y-16">
      {/* Hero Section */}
      <Section className="text-center">
        <div className="max-w-4xl mx-auto">
          <Badge variant="outline" className="mb-4 text-blue-600 border-blue-200">
            Nossa Equipe
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            Liderança Executiva
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
            Profissionais experientes com histórico comprovado em mercados financeiros, 
            tecnologia e regulação, unidos pela visão de democratizar o acesso aos ativos digitais.
          </p>
        </div>
      </Section>

      {/* Executive Team */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Equipe Executiva
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Líderes com experiência combinada de mais de 80 anos em mercados financeiros e tecnologia
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
              <div className="text-center mb-4">
                <Avatar 
                  src={member.image} 
                  alt={member.name}
                  className="w-24 h-24 mx-auto mb-4"
                />
                <Badge variant="secondary" className="mb-2">
                  {member.department}
                </Badge>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium">
                  {member.position}
                </p>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                {member.bio}
              </p>

              <div className="flex justify-center space-x-4">
                <a 
                  href={member.linkedin}
                  className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-4 h-4 text-blue-600" />
                </a>
                <a 
                  href={member.twitter}
                  className="w-8 h-8 bg-sky-100 dark:bg-sky-900 rounded-full flex items-center justify-center hover:bg-sky-200 dark:hover:bg-sky-800 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="w-4 h-4 text-sky-600" />
                </a>
                <a 
                  href={`mailto:${member.email}`}
                  className="w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                >
                  <Mail className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                </a>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Advisory Board */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Conselho Consultivo
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Especialistas renomados que orientam nossa estratégia e governança
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {advisors.map((advisor, index) => (
            <Card key={index} className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-center">
              <Avatar 
                src={advisor.image} 
                alt={advisor.name}
                className="w-20 h-20 mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                {advisor.name}
              </h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                {advisor.position}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {advisor.bio}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Company Culture */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Nossa Cultura
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Valores que definem nosso ambiente de trabalho e relacionamento com stakeholders
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-700">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Diversidade & Inclusão
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              40% de nossos cargos de liderança são ocupados por mulheres. Temos uma política 
              ativa de diversidade étnica, de gênero e LGBTI+.
            </p>
            <div className="flex space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">40%</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Mulheres em Liderança</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">35%</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Diversidade Étnica</div>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-700">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Crescimento Profissional
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Investimos R$ 50k por funcionário anualmente em capacitação e desenvolvimento. 
              100% dos colaboradores têm plano de carreira definido.
            </p>
            <div className="flex space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">R$ 50k</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Investimento/Pessoa</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">100%</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Plano de Carreira</div>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Join Us CTA */}
      <Section>
        <Card className="p-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Faça Parte da Nossa Equipe
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Estamos sempre em busca de talentos excepcionais para se juntar à nossa missão
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Ver Vagas Abertas
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Programa de Estágio
            </button>
          </div>
        </Card>
      </Section>
    </div>
  );
}