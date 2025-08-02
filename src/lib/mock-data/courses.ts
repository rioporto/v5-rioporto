import { Course, CourseModule, CourseLesson } from '@/types/rioporto';

/**
 * Dados mockados dos cursos - 3 cursos principais conforme especificações
 * Cada curso com módulos, aulas, instrutores e métricas detalhadas
 */

// Instrutores dos cursos
export const COURSE_INSTRUCTORS = [
  {
    id: 'instructor_001',
    name: 'Rafael Nakamura',
    avatar: '/instructors/rafael-nakamura.jpg',
    bio: 'Especialista em Bitcoin com 10 anos de experiência no mercado financeiro. Ex-trader do BTG Pactual, hoje focado em educação sobre criptomoedas.',
    specialties: ['Bitcoin', 'Análise Técnica', 'Trading', 'Macroeconomia'],
    experience: '10+ anos no mercado financeiro, 6 anos focado em crypto'
  },
  {
    id: 'instructor_002',
    name: 'Carolina Santos',
    avatar: '/instructors/carolina-santos.jpg',
    bio: 'Desenvolvedora blockchain e especialista em DeFi. Formada em Ciência da Computação pela USP, trabalhou na Ethereum Foundation.',
    specialties: ['DeFi', 'Smart Contracts', 'Ethereum', 'Desenvolvimento'],
    experience: '8 anos desenvolvimento, 5 anos blockchain e DeFi'
  },
  {
    id: 'instructor_003',
    name: 'Marcus Oliveira',
    avatar: '/instructors/marcus-oliveira.jpg',
    bio: 'Investidor profissional e educador financeiro. Especialista em análise fundamentalista e estratégias de investimento de longo prazo.',
    specialties: ['Investimento', 'Análise Fundamentalista', 'Portfolio', 'Estratégia'],
    experience: '15 anos mercado tradicional, 8 anos criptomoedas'
  }
];

export const MOCK_COURSES: Course[] = [
  // Curso 1: Bitcoin do Zero ao Avançado
  {
    id: 'course_001',
    title: 'Bitcoin do Zero ao Avançado',
    slug: 'bitcoin-zero-ao-avancado',
    description: 'Curso completo sobre Bitcoin, desde os conceitos básicos até estratégias avançadas de investimento e trading. Aprenda tudo sobre a primeira e maior criptomoeda do mundo.',
    level: 'Iniciante',
    category: 'Criptomoedas',
    instructor: COURSE_INSTRUCTORS[0],
    price: {
      original: 697,
      current: 497,
      discount: 29
    },
    duration: '40 horas',
    rating: 4.8,
    studentsCount: 12847,
    completionRate: 78,
    thumbnail: '/courses/bitcoin-course-thumb.jpg',
    trailer: '/courses/bitcoin-course-trailer.mp4',
    requirements: [
      'Acesso à internet',
      'Computador ou smartphone',
      'Vontade de aprender',
      'Não é necessário conhecimento prévio'
    ],
    whatYouWillLearn: [
      'Entender completamente o que é Bitcoin e como funciona',
      'Configurar e usar carteiras Bitcoin com segurança',
      'Analisar gráficos e identificar oportunidades de compra/venda',
      'Desenvolver estratégias de investimento de longo prazo',
      'Compreender aspectos técnicos da blockchain Bitcoin',
      'Aplicar análise fundamentalista em Bitcoin',
      'Gerenciar riscos e diversificar investimentos',
      'Entender regulamentação e aspectos tributários no Brasil'
    ],
    features: [
      'Acesso vitalício ao conteúdo',
      'Certificado de conclusão',
      'Suporte direto com o instrutor',
      'Grupo exclusivo no Telegram',
      'Atualizações gratuitas do conteúdo',
      'Aulas práticas com exemplos reais',
      'Planilhas e ferramentas exclusivas',
      'Sessões de Q&A ao vivo mensais'
    ],
    certificate: true,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-07-20T00:00:00Z',
    modules: [
      {
        id: 'module_001_001',
        title: 'Fundamentos do Bitcoin',
        description: 'Introdução aos conceitos básicos do Bitcoin, história e importância no sistema financeiro.',
        duration: '8 horas',
        order: 1,
        lessons: [
          {
            id: 'lesson_001_001_001',
            title: 'O que é Bitcoin?',
            description: 'Conceitos fundamentais sobre Bitcoin, diferenças para moedas tradicionais.',
            duration: '25 min',
            type: 'video',
            order: 1,
            free: true
          },
          {
            id: 'lesson_001_001_002',
            title: 'História do Bitcoin',
            description: 'Como surgiu o Bitcoin, Satoshi Nakamoto e os primeiros anos.',
            duration: '30 min',
            type: 'video',
            order: 2
          },
          {
            id: 'lesson_001_001_003',
            title: 'Blockchain Explicada',
            description: 'Como funciona a tecnologia blockchain por trás do Bitcoin.',
            duration: '35 min',
            type: 'video',
            order: 3
          },
          {
            id: 'lesson_001_001_004',
            title: 'Por que Bitcoin é Importante?',
            description: 'Casos de uso, store of value, hedge contra inflação.',
            duration: '28 min',
            type: 'video',
            order: 4
          },
          {
            id: 'lesson_001_001_005',
            title: 'Quiz: Fundamentos',
            description: 'Teste seus conhecimentos sobre os conceitos básicos.',
            duration: '10 min',
            type: 'quiz',
            order: 5
          }
        ]
      },
      {
        id: 'module_001_002',
        title: 'Carteiras e Segurança',
        description: 'Aprenda a configurar, usar e proteger suas carteiras Bitcoin.',
        duration: '10 horas',
        order: 2,
        lessons: [
          {
            id: 'lesson_001_002_001',
            title: 'Tipos de Carteiras Bitcoin',
            description: 'Hot wallets, cold wallets, hardware wallets e paper wallets.',
            duration: '32 min',
            type: 'video',
            order: 1
          },
          {
            id: 'lesson_001_002_002',
            title: 'Configurando sua Primeira Carteira',
            description: 'Tutorial prático para configurar Electrum.',
            duration: '40 min',
            type: 'video',
            order: 2
          },
          {
            id: 'lesson_001_002_003',
            title: 'Backup e Recovery',
            description: 'Como fazer backup seguro e recuperar carteiras.',
            duration: '35 min',
            type: 'video',
            order: 3
          },
          {
            id: 'lesson_001_002_004',
            title: 'Hardware Wallets',
            description: 'Configuração e uso de Ledger e Trezor.',
            duration: '45 min',
            type: 'video',
            order: 4
          },
          {
            id: 'lesson_001_002_005',
            title: 'Boas Práticas de Segurança',
            description: 'Checklist completo de segurança para Bitcoin.',
            duration: '30 min',
            type: 'video',
            order: 5
          },
          {
            id: 'lesson_001_002_006',
            title: 'Exercício Prático',
            description: 'Configure uma carteira teste e faça transações.',
            duration: '20 min',
            type: 'exercise',
            order: 6
          }
        ]
      },
      {
        id: 'module_001_003',
        title: 'Análise Técnica',
        description: 'Aprenda a analisar gráficos e identificar tendências do Bitcoin.',
        duration: '12 horas',
        order: 3,
        lessons: [
          {
            id: 'lesson_001_003_001',
            title: 'Introdução à Análise Técnica',
            description: 'Conceitos básicos, tipos de gráficos e timeframes.',
            duration: '38 min',
            type: 'video',
            order: 1
          },
          {
            id: 'lesson_001_003_002',
            title: 'Suporte e Resistência',
            description: 'Como identificar e usar níveis de suporte e resistência.',
            duration: '42 min',
            type: 'video',
            order: 2
          },
          {
            id: 'lesson_001_003_003',
            title: 'Indicadores Técnicos',
            description: 'RSI, MACD, Médias Móveis e outros indicadores essenciais.',
            duration: '50 min',
            type: 'video',
            order: 3
          },
          {
            id: 'lesson_001_003_004',
            title: 'Padrões Gráficos',
            description: 'Triângulos, bandeiras, ombro-cabeça-ombro e outros padrões.',
            duration: '45 min',
            type: 'video',
            order: 4
          },
          {
            id: 'lesson_001_003_005',
            title: 'Análise Multi-Timeframe',
            description: 'Como usar diferentes timeframes para melhor análise.',
            duration: '35 min',
            type: 'video',
            order: 5
          }
        ]
      },
      {
        id: 'module_001_004',
        title: 'Estratégias de Investimento',
        description: 'Desenvolva estratégias sólidas para investir em Bitcoin.',
        duration: '10 horas',
        order: 4,
        lessons: [
          {
            id: 'lesson_001_004_001',
            title: 'DCA - Dollar Cost Averaging',
            description: 'Estratégia de investimento programado e suas vantagens.',
            duration: '40 min',
            type: 'video',
            order: 1
          },
          {
            id: 'lesson_001_004_002',
            title: 'Análise Fundamentalista',
            description: 'Como avaliar Bitcoin usando métricas fundamentais.',
            duration: '48 min',
            type: 'video',
            order: 2
          },
          {
            id: 'lesson_001_004_003',
            title: 'Gestão de Risco',
            description: 'Position sizing, stop-loss e gerenciamento de capital.',
            duration: '45 min',
            type: 'video',
            order: 3
          },
          {
            id: 'lesson_001_004_004',
            title: 'Ciclos de Mercado',
            description: 'Entendendo os ciclos do Bitcoin e como aproveitá-los.',
            duration: '38 min',
            type: 'video',
            order: 4
          }
        ]
      }
    ]
  },

  // Curso 2: DeFi Masterclass
  {
    id: 'course_002',
    title: 'DeFi Masterclass: Finanças Descentralizadas',
    slug: 'defi-masterclass-financas-descentralizadas',
    description: 'Masterclass completa sobre DeFi. Aprenda a usar protocolos descentralizados, yield farming, liquidity mining e gere renda passiva com suas criptomoedas.',
    level: 'Intermediário',
    category: 'DeFi',
    instructor: COURSE_INSTRUCTORS[1],
    price: {
      original: 897,
      current: 697,
      discount: 22
    },
    duration: '55 horas',
    rating: 4.9,
    studentsCount: 8945,
    completionRate: 82,
    thumbnail: '/courses/defi-masterclass-thumb.jpg',
    trailer: '/courses/defi-masterclass-trailer.mp4',
    requirements: [
      'Conhecimento básico de criptomoedas',
      'Experiência com carteiras (MetaMask)',
      'Capital inicial para praticar (mínimo $100)',
      'Computador com internet estável'
    ],
    whatYouWillLearn: [
      'Dominar os principais protocolos DeFi',
      'Implementar estratégias de yield farming',
      'Usar DEXs para trading eficiente',
      'Gerenciar riscos em DeFi',
      'Entender impermanent loss e como mitigar',
      'Configurar estratégias de liquidity mining',
      'Analisar e avaliar novos protocolos',
      'Aspectos tributários de DeFi no Brasil'
    ],
    features: [
      'Acesso vitalício e atualizações',
      'Certificado de conclusão avançado',
      'Mentoria em grupo semanal',
      'Acesso ao Discord exclusivo',
      'Templates de estratégias prontas',
      'Calculadoras de yield exclusivas',
      'Alertas de oportunidades em tempo real',
      'Revisão de portfolio personalizada'
    ],
    certificate: true,
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-07-25T00:00:00Z',
    modules: [
      {
        id: 'module_002_001',
        title: 'Fundamentos DeFi',
        description: 'Base sólida sobre finanças descentralizadas e seu ecossistema.',
        duration: '12 horas',
        order: 1,
        lessons: [
          {
            id: 'lesson_002_001_001',
            title: 'O que é DeFi?',
            description: 'Conceitos fundamentais e diferenças para finanças tradicionais.',
            duration: '35 min',
            type: 'video',
            order: 1,
            free: true
          },
          {
            id: 'lesson_002_001_002',
            title: 'Ecossistema DeFi',
            description: 'Mapeamento completo dos principais protocolos.',
            duration: '45 min',
            type: 'video',
            order: 2
          },
          {
            id: 'lesson_002_001_003',
            title: 'Smart Contracts Explicados',
            description: 'Como funcionam os contratos inteligentes.',
            duration: '40 min',
            type: 'video',
            order: 3
          }
        ]
      },
      {
        id: 'module_002_002',
        title: 'DEXs e AMMs',
        description: 'Exchanges descentralizadas e market makers automatizados.',
        duration: '14 horas',
        order: 2,
        lessons: [
          {
            id: 'lesson_002_002_001',
            title: 'Uniswap Deep Dive',
            description: 'Como usar e entender o maior DEX.',
            duration: '50 min',
            type: 'video',
            order: 1
          },
          {
            id: 'lesson_002_002_002',
            title: 'Liquidity Pools',
            description: 'Como funcionam as pools de liquidez.',
            duration: '45 min',
            type: 'video',
            order: 2
          }
        ]
      }
    ]
  },

  // Curso 3: Investimento Estratégico em Criptomoedas
  {
    id: 'course_003',
    title: 'Investimento Estratégico em Criptomoedas',
    slug: 'investimento-estrategico-criptomoedas',
    description: 'Aprenda a construir um portfolio sólido de criptomoedas com estratégias profissionais de gestão de risco e alocação de ativos.',
    level: 'Avançado',
    category: 'Investimento',
    instructor: COURSE_INSTRUCTORS[2],
    price: {
      original: 1297,
      current: 997,
      discount: 23
    },
    duration: '65 horas',
    rating: 4.7,
    studentsCount: 5632,
    completionRate: 85,
    thumbnail: '/courses/investment-strategy-thumb.jpg',
    trailer: '/courses/investment-strategy-trailer.mp4',
    requirements: [
      'Experiência prévia com investimentos',
      'Conhecimento intermediário de criptomoedas',
      'Capital de investimento disponível',
      'Planilha Excel ou Google Sheets'
    ],
    whatYouWillLearn: [
      'Construir portfolios diversificados',
      'Aplicar análise fundamentalista profissional',
      'Desenvolver thesis de investimento',
      'Implementar estratégias institucionais',
      'Gerenciar risco de forma sistemática',
      'Entender correlações entre ativos',
      'Usar derivativos para hedge',
      'Planejar tributação eficiente'
    ],
    features: [
      'Acesso vitalício premium',
      'Certificado profissional',
      'Mentoria individual mensal',
      'Grupo VIP de investidores',
      'Modelos de portfolio exclusivos',
      'Planilhas profissionais',
      'Análises de mercado semanais',
      'Networking com outros investidores'
    ],
    certificate: true,
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-07-28T00:00:00Z',
    modules: [
      {
        id: 'module_003_001',
        title: 'Teoria de Portfolio',
        description: 'Fundamentos acadêmicos aplicados às criptomoedas.',
        duration: '15 horas',
        order: 1,
        lessons: [
          {
            id: 'lesson_003_001_001',
            title: 'Modern Portfolio Theory',
            description: 'Teoria moderna de portfolio aplicada a crypto.',
            duration: '55 min',
            type: 'video',
            order: 1,
            free: true
          }
        ]
      }
    ]
  }
];

// Estatísticas dos cursos
export const COURSE_STATISTICS = {
  totalCourses: MOCK_COURSES.length,
  totalStudents: MOCK_COURSES.reduce((sum, course) => sum + course.studentsCount, 0),
  averageRating: MOCK_COURSES.reduce((sum, course) => sum + course.rating, 0) / MOCK_COURSES.length,
  totalHours: MOCK_COURSES.reduce((sum, course) => sum + parseInt(course.duration), 0),
  
  // Estatísticas por nível
  byLevel: {
    'Iniciante': MOCK_COURSES.filter(c => c.level === 'Iniciante').length,
    'Intermediário': MOCK_COURSES.filter(c => c.level === 'Intermediário').length,
    'Avançado': MOCK_COURSES.filter(c => c.level === 'Avançado').length
  },
  
  // Revenue estimado
  estimatedRevenue: MOCK_COURSES.reduce((sum, course) => 
    sum + (course.price.current * course.studentsCount), 0
  ),
  
  // Curso mais popular
  mostPopular: MOCK_COURSES.reduce((prev, current) => 
    prev.studentsCount > current.studentsCount ? prev : current
  ),
  
  // Melhor avaliado
  bestRated: MOCK_COURSES.reduce((prev, current) => 
    prev.rating > current.rating ? prev : current
  )
};

// Promoções ativas
export const ACTIVE_PROMOTIONS = [
  {
    id: 'promo_001',
    title: 'Black Friday Crypto',
    description: 'Até 30% de desconto em todos os cursos',
    discount: 30,
    code: 'BLACKFRIDAY30',
    validUntil: '2024-11-30T23:59:59Z',
    applicableCourses: ['course_001', 'course_002', 'course_003']
  },
  {
    id: 'promo_002',
    title: 'Combo DeFi + Bitcoin',
    description: 'Leve 2 cursos pelo preço de 1',
    discount: 50,
    code: 'COMBO50',
    validUntil: '2024-08-31T23:59:59Z',
    applicableCourses: ['course_001', 'course_002']
  }
];

// Reviews dos estudantes
export const COURSE_REVIEWS = [
  {
    id: 'review_001',
    courseId: 'course_001',
    studentName: 'João Silva',
    studentAvatar: '/avatars/student-01.jpg',
    rating: 5,
    comment: 'Curso excepcional! Finalmente entendi Bitcoin de verdade. O professor explica de forma muito clara e os exemplos práticos fazem toda diferença.',
    date: '2024-07-20T00:00:00Z',
    verified: true
  },
  {
    id: 'review_002',
    courseId: 'course_001',
    studentName: 'Maria Santos',
    studentAvatar: '/avatars/student-02.jpg',
    rating: 5,
    comment: 'Melhor investimento que fiz em educação. Consegui aplicar as estratégias e já tive resultados positivos. Recomendo muito!',
    date: '2024-07-15T00:00:00Z',
    verified: true
  },
  {
    id: 'review_003',
    courseId: 'course_002',
    studentName: 'Carlos Oliveira',
    studentAvatar: '/avatars/student-03.jpg',
    rating: 5,
    comment: 'DeFi pode ser complexo, mas a Carolina conseguiu simplificar tudo. Agora estou ganhando yield em vários protocolos com segurança.',
    date: '2024-07-10T00:00:00Z',
    verified: true
  }
];

// Certificados emitidos
export const CERTIFICATES_ISSUED = {
  total: 18924,
  thisMonth: 1247,
  byValidation: {
    blockchain: 15678,  // Certificados na blockchain
    traditional: 3246   // Certificados tradicionais
  },
  verificationUrl: 'https://certificates.rioporto.com.br/verify/'
};