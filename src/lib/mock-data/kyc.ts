import { KYCLevel, KYCDocument, PixKey } from '@/types/rioporto';

/**
 * Dados mockados do sistema KYC
 * Níveis de verificação, documentos, limites e chaves PIX
 */

// Níveis de KYC disponíveis
export const KYC_LEVELS: KYCLevel[] = [
  {
    level: 0,
    name: 'Sem Verificação',
    description: 'Conta básica apenas para consulta. Não permite transações.',
    limits: {
      buyDaily: 0,
      buyMonthly: 0,
      sellDaily: 0,
      sellMonthly: 0
    },
    requirements: [
      'Apenas cadastro básico com email'
    ],
    benefits: [
      'Acesso às cotações em tempo real',
      'Análises e conteúdo educativo',
      'Simulador de investimentos'
    ]
  },
  {
    level: 1,
    name: 'Verificação Básica',
    description: 'Primeiro nível de verificação. Permite transações limitadas.',
    limits: {
      buyDaily: 5000,        // R$ 5.000 por dia
      buyMonthly: 30000,     // R$ 30.000 por mês
      sellDaily: 5000,       // R$ 5.000 por dia
      sellMonthly: 30000     // R$ 30.000 por mês
    },
    requirements: [
      'CPF válido',
      'Telefone celular verificado',
      'Email confirmado',
      'Dados pessoais básicos'
    ],
    benefits: [
      'Compra e venda com limites básicos',
      'PIX como método de pagamento',
      'Carteira custodiada gratuita',
      'Suporte via chat'
    ]
  },
  {
    level: 2,
    name: 'Verificação Intermediária',
    description: 'Nível intermediário com limites ampliados e mais funcionalidades.',
    limits: {
      buyDaily: 50000,       // R$ 50.000 por dia
      buyMonthly: 300000,    // R$ 300.000 por mês
      sellDaily: 50000,      // R$ 50.000 por dia
      sellMonthly: 300000    // R$ 300.000 por mês
    },
    requirements: [
      'Todos os requisitos do Nível 1',
      'Documento com foto (RG/CNH/Passaporte)',
      'Comprovante de residência atualizado',
      'Selfie com documento',
      'Validação por videochamada (opcional)'
    ],
    benefits: [
      'Todos os benefícios do Nível 1',
      'Limites ampliados significativamente',
      'Acesso a produtos DeFi',
      'Staking de criptomoedas',
      'Suporte prioritário',
      'Taxas reduzidas (0.8% ao invés de 1%)'
    ]
  },
  {
    level: 3,
    name: 'Verificação Completa',
    description: 'Nível máximo com limites elevados e acesso a todos os produtos.',
    limits: {
      buyDaily: 500000,      // R$ 500.000 por dia
      buyMonthly: 3000000,   // R$ 3.000.000 por mês (sem limite prático)
      sellDaily: 500000,     // R$ 500.000 por dia
      sellMonthly: 3000000   // R$ 3.000.000 por mês
    },
    requirements: [
      'Todos os requisitos do Nível 2',
      'Comprovante de renda',
      'Declaração de Imposto de Renda',
      'Validação presencial ou videochamada obrigatória',
      'Questionário de perfil de investidor',
      'Origem dos recursos (para valores altos)'
    ],
    benefits: [
      'Todos os benefícios dos níveis anteriores',
      'Limites máximos para todas as operações',
      'Acesso a produtos institucionais',
      'OTC (Over-the-Counter) para grandes volumes',
      'Gerente de conta dedicado',
      'Taxas VIP (0.5%)',
      'Acesso antecipado a novos produtos',
      'Relatórios fiscais personalizados'
    ]
  }
];

// Documentos necessários por tipo
export const DOCUMENT_TYPES = {
  CPF: {
    name: 'CPF',
    description: 'Cadastro de Pessoa Física',
    required: true,
    automated: true, // Validação automática via Serpro
    processingTime: 'Instantâneo'
  },
  RG: {
    name: 'RG',
    description: 'Registro Geral (Carteira de Identidade)',
    required: false,
    automated: false,
    processingTime: '1-2 dias úteis'
  },
  CNH: {
    name: 'CNH',
    description: 'Carteira Nacional de Habilitação',
    required: false,
    automated: true,
    processingTime: '2-4 horas'
  },
  PASSPORT: {
    name: 'Passaporte',
    description: 'Passaporte Brasileiro',
    required: false,
    automated: false,
    processingTime: '1-3 dias úteis'
  },
  SELFIE: {
    name: 'Selfie',
    description: 'Selfie segurando documento',
    required: true,
    automated: true, // Análise por IA
    processingTime: '1-6 horas'
  },
  PROOF_OF_ADDRESS: {
    name: 'Comprovante de Residência',
    description: 'Conta de luz, água, telefone ou extrato bancário',
    required: true,
    automated: true,
    processingTime: '2-4 horas'
  }
};

// Status de documentos para usuário exemplo
export const MOCK_USER_DOCUMENTS: KYCDocument[] = [
  {
    type: 'CPF',
    status: 'APPROVED',
    uploadedAt: '2024-07-01T10:00:00Z',
    reviewedAt: '2024-07-01T10:02:00Z',
    notes: 'CPF válido e ativo na Receita Federal'
  },
  {
    type: 'RG',
    status: 'APPROVED',
    uploadedAt: '2024-07-01T10:15:00Z',
    reviewedAt: '2024-07-01T14:30:00Z',
    notes: 'Documento legível e dentro da validade'
  },
  {
    type: 'SELFIE',
    status: 'APPROVED',
    uploadedAt: '2024-07-01T10:30:00Z',
    reviewedAt: '2024-07-01T16:45:00Z',
    notes: 'Biometria facial aprovada com 98.5% de confiança'
  },
  {
    type: 'PROOF_OF_ADDRESS',
    status: 'APPROVED',
    uploadedAt: '2024-07-01T11:00:00Z',
    reviewedAt: '2024-07-02T09:20:00Z',
    notes: 'Conta de energia elétrica válida e dentro de 90 dias'
  }
];

// Chaves PIX do usuário
export const MOCK_USER_PIX_KEYS: PixKey[] = [
  {
    id: 'pix_001',
    type: 'CPF',
    key: '123.456.789-00',
    verified: true,
    createdAt: '2024-07-01T12:00:00Z',
    name: 'Chave PIX Principal'
  },
  {
    id: 'pix_002',
    type: 'EMAIL',
    key: 'joao@email.com',
    verified: true,
    createdAt: '2024-07-05T15:30:00Z',
    name: 'Email Pessoal'
  },
  {
    id: 'pix_003',
    type: 'PHONE',
    key: '(21) 98765-4321',
    verified: true,
    createdAt: '2024-07-10T09:15:00Z',
    name: 'Celular Principal'
  },
  {
    id: 'pix_004',
    type: 'RANDOM',
    key: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    verified: false,
    createdAt: '2024-07-25T16:45:00Z',
    name: 'Chave Aleatória - Conta Poupança'
  }
];

// Processo de verificação passo-a-passo
export const KYC_VERIFICATION_PROCESS = {
  level1: {
    steps: [
      {
        id: 'basic_info',
        title: 'Informações Básicas',
        description: 'Preencha seus dados pessoais',
        required: ['nome completo', 'data de nascimento', 'CPF'],
        estimatedTime: '2 minutos',
        completed: true
      },
      {
        id: 'contact_verification',
        title: 'Verificação de Contato',
        description: 'Confirme seu email e telefone',
        required: ['email verificado', 'SMS confirmado'],
        estimatedTime: '5 minutos',
        completed: true
      }
    ],
    totalTime: '7 minutos',
    approval: 'Automática'
  },
  
  level2: {
    steps: [
      {
        id: 'document_upload',
        title: 'Upload de Documentos',
        description: 'Envie RG/CNH e comprovante de residência',
        required: ['documento com foto', 'comprovante residência'],
        estimatedTime: '5 minutos',
        completed: true
      },
      {
        id: 'selfie_verification',
        title: 'Verificação Biométrica',
        description: 'Tire uma selfie segurando seu documento',
        required: ['selfie com documento'],
        estimatedTime: '3 minutos',
        completed: true
      },
      {
        id: 'document_review',
        title: 'Análise de Documentos',
        description: 'Nossa equipe analisa seus documentos',
        required: ['aprovação manual'],
        estimatedTime: '1-2 dias úteis',
        completed: true
      }
    ],
    totalTime: '1-2 dias úteis',
    approval: 'Manual'
  },
  
  level3: {
    steps: [
      {
        id: 'income_proof',
        title: 'Comprovação de Renda',
        description: 'Envie comprovante de renda e IR',
        required: ['comprovante renda', 'declaração IR'],
        estimatedTime: '10 minutos',
        completed: false
      },
      {
        id: 'video_call',
        title: 'Videochamada',
        description: 'Entrevista por vídeo com nossa equipe',
        required: ['agendamento', 'presença na chamada'],
        estimatedTime: '15-30 minutos',
        completed: false
      },
      {
        id: 'final_review',
        title: 'Revisão Final',
        description: 'Análise completa do perfil',
        required: ['aprovação executiva'],
        estimatedTime: '3-5 dias úteis',
        completed: false
      }
    ],
    totalTime: '5-7 dias úteis',
    approval: 'Executiva'
  }
};

// Estatísticas do sistema KYC
export const KYC_STATISTICS = {
  totalUsers: 125847,
  
  // Distribuição por nível
  byLevel: {
    0: 15623,     // 12.4%
    1: 67482,     // 53.6%
    2: 35789,     // 28.4%
    3: 6953       // 5.5%
  },
  
  // Taxa de aprovação por documento
  approvalRates: {
    CPF: 99.2,           // 99.2% aprovação
    RG: 94.7,            // 94.7% aprovação
    CNH: 96.8,           // 96.8% aprovação
    PASSPORT: 98.1,      // 98.1% aprovação
    SELFIE: 87.3,        // 87.3% aprovação
    PROOF_OF_ADDRESS: 89.6 // 89.6% aprovação
  },
  
  // Tempo médio de aprovação
  averageProcessingTime: {
    level1: '< 1 hora',
    level2: '18 horas',
    level3: '4.2 dias'
  },
  
  // Motivos de rejeição mais comuns
  rejectionReasons: [
    { reason: 'Documento ilegível', percentage: 32.1 },
    { reason: 'Documento vencido', percentage: 28.5 },
    { reason: 'Selfie com qualidade inadequada', percentage: 18.7 },
    { reason: 'Dados não conferem', percentage: 12.4 },
    { reason: 'Comprovante de residência antigo', percentage: 8.3 }
  ],
  
  // Evolução mensal
  monthlyGrowth: [
    { month: 'Jan', level1: 5240, level2: 2180, level3: 420 },
    { month: 'Feb', level1: 5680, level2: 2340, level3: 480 },
    { month: 'Mar', level1: 6120, level2: 2680, level3: 520 },
    { month: 'Apr', level1: 6840, level2: 3120, level3: 640 },
    { month: 'May', level1: 7230, level2: 3580, level3: 720 },
    { month: 'Jun', level1: 7680, level2: 4140, level3: 820 },
    { month: 'Jul', level1: 8120, level2: 4480, level3: 890 }
  ]
};

// Configurações de compliance
export const COMPLIANCE_SETTINGS = {
  // Limites de alerta para AML
  amlThresholds: {
    dailyLimit: 50000,     // R$ 50k diário
    monthlyLimit: 300000,  // R$ 300k mensal
    velocityAlert: 10,     // 10 transações por hora
    unusualPattern: true   // Detectar padrões incomuns
  },
  
  // Países/regiões de risco elevado
  highRiskCountries: [
    'Afghanistan', 'Iran', 'North Korea', 'Syria'
  ],
  
  // Profissões que requerem verificação adicional
  pepProfessions: [
    'Político',
    'Juiz',
    'Promotor',
    'Militar alto escalão',
    'Diplomata',
    'Executivo de empresa pública'
  ],
  
  // Limites para reportar às autoridades
  reportingThresholds: {
    suspicious: 100000,    // R$ 100k para atividade suspeita
    cash: 50000,          // R$ 50k para operações em espécie
    international: 30000   // R$ 30k para transferências internacionais
  }
};

// Documentos adicionais por situação especial
export const SPECIAL_DOCUMENTATION = {
  foreigner: {
    required: ['Passaporte', 'Visto ou RNE', 'CPF', 'Comprovante de residência'],
    additionalVerification: true,
    processingTime: '5-10 dias úteis'
  },
  
  minor: {
    required: ['RG do menor', 'CPF do menor', 'RG dos responsáveis', 'Termo de autorização'],
    additionalVerification: true,
    processingTime: '3-7 dias úteis',
    restrictions: ['Limites reduzidos', 'Supervisão dos responsáveis']
  },
  
  corporate: {
    required: [
      'CNPJ',
      'Contrato social',
      'Cartão CNPJ',
      'Documentos dos sócios',
      'Procuração (se aplicável)'
    ],
    additionalVerification: true,
    processingTime: '7-15 dias úteis'
  }
};

// Mensagens do sistema KYC
export const KYC_MESSAGES = {
  level1: {
    welcome: 'Parabéns! Sua conta foi verificada no Nível 1. Você já pode começar a negociar.',
    limits: 'Seus limites atuais são R$ 5.000 por dia e R$ 30.000 por mês.',
    upgrade: 'Para aumentar seus limites, complete a verificação do Nível 2.'
  },
  
  level2: {
    welcome: 'Excelente! Sua conta foi aprovada no Nível 2. Limites ampliados liberados.',
    limits: 'Seus novos limites são R$ 50.000 por dia e R$ 300.000 por mês.',
    benefits: 'Você também ganhou acesso a staking e taxas reduzidas (0.8%).'
  },
  
  level3: {
    welcome: 'Perfeito! Verificação Completa concluída. Bem-vindo ao nível VIP.',
    limits: 'Seus limites agora são R$ 500.000 por dia e R$ 3.000.000 por mês.',
    benefits: 'Taxas VIP (0.5%), gerente dedicado e acesso a produtos exclusivos.'
  },
  
  rejected: {
    general: 'Não foi possível aprovar sua verificação. Verifique os documentos e tente novamente.',
    support: 'Se precisar de ajuda, entre em contato com nosso suporte.',
    retry: 'Você pode enviar novos documentos a qualquer momento.'
  }
};