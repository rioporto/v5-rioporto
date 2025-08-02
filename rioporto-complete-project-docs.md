# RioPorto P2P - Documentação Completa do Projeto

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Especificações Técnicas](#especificações-técnicas)
3. [Arquitetura do Sistema](#arquitetura-do-sistema)
4. [Funcionalidades Detalhadas](#funcionalidades-detalhadas)
5. [5 Modelos de Design](#5-modelos-de-design)
6. [Estrutura de Dados Mockados](#estrutura-de-dados-mockados)
7. [Guia de Implementação](#guia-de-implementação)
8. [Prompt Completo para Claude Code](#prompt-completo-para-claude-code)

---

## 🎯 Visão Geral

### Sobre o Projeto

A RioPorto P2P é uma plataforma de negociação B2P (Business-to-Person) de criptomoedas, que utiliza a nomenclatura "P2P" por estratégia de marketing. Focada em oferecer uma experiência segura e profissional para compra e venda de Bitcoin e outros ativos digitais no Brasil, seguindo o princípio fundamental: **"Not your keys, not your coins"** - sem custódia de ativos.

### Características Principais

- **Modelo B2P com nome P2P**: Marketing estratégico
- **Zero Custódia**: Cliente sempre mantém controle total de seus ativos
- **Portfolio Intelligence**: Dashboard completo com análise de lucros/prejuízos
- **KYC Progressivo**: Níveis de verificação com limites crescentes
- **Validação CPF**: Integração com Serpro Datavalid
- **Segurança Avançada**: 2FA, logs detalhados, sessões monitoradas
- **Integração Manual WhatsApp**: Atendimento personalizado sem expor dados sensíveis

### Ambiente de Desenvolvimento

- **Sistema Operacional**: Windows 11 com WSL Ubuntu
- **IDE Principal**: Claude Code (via terminal WSL)
- **IDE Secundária**: Cursor PRO (edições avançadas)
- **Caminho do Projeto**: `/home/johnnyhelder/Projetos/v5-rioporto`
- **Repositório**: https://github.com/rioporto/v5-rioporto.git

### MCPs (Model Context Protocol) Disponíveis

1. **Neon Database**: Banco PostgreSQL serverless
2. **Context7**: Busca de código e best practices
3. **Fetch**: Requisições HTTP
4. **Memory-bank**: Armazenamento de snippets
5. **GitHub**: Versionamento e colaboração
6. **Railway**: Deploy e hospedagem

---

## 💻 Especificações Técnicas

### Stack Frontend
- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Componentes**: Custom components (sem UI library complexa)
- **Gráficos**: Recharts
- **Ícones**: Lucide React
- **Animações**: CSS nativo + Tailwind

### Stack Backend (Mockado)
- **Dados**: Arquivos TypeScript com dados fictícios
- **Autenticação**: localStorage (sem banco de dados)
- **API**: Next.js API Routes (retornando dados mockados)
- **Sessões**: Gerenciadas no cliente

### Configuração de Domínios

```
rioporto.com.br         → Produção (modelo escolhido)
v1.rioporto.com.br      → Modelo 1: Design Minimalista
v2.rioporto.com.br      → Modelo 2: Dashboard Financeiro
v3.rioporto.com.br      → Modelo 3: Crypto Native
v4.rioporto.com.br      → Modelo 4: Institucional
v5.rioporto.com.br      → Modelo 5: Gaming/Web3
```

---

## 🏗️ Arquitetura do Sistema

### Estrutura de Pastas

```
v5-rioporto/
├── src/
│   ├── app/                          # App Router (Next.js 14)
│   │   ├── layout.tsx               # Layout raiz
│   │   ├── page.tsx                 # Landing page
│   │   ├── globals.css              # Estilos globais
│   │   ├── (auth)/                  # Grupo de autenticação
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── verify/
│   │   ├── dashboard/               # Área do usuário
│   │   │   ├── page.tsx            # Overview
│   │   │   ├── portfolio/
│   │   │   ├── buy/
│   │   │   ├── sell/
│   │   │   ├── transactions/
│   │   │   ├── indicators/
│   │   │   ├── tools/
│   │   │   └── settings/
│   │   │       ├── security/
│   │   │       ├── sessions/
│   │   │       ├── kyc/
│   │   │       ├── pix/
│   │   │       └── wallets/
│   │   ├── admin/                   # Painel administrativo
│   │   │   ├── users/
│   │   │   ├── orders/
│   │   │   ├── analytics/
│   │   │   ├── kyc-queue/
│   │   │   └── security/
│   │   ├── academy/                 # Hub educacional
│   │   │   ├── blog/
│   │   │   ├── courses/
│   │   │   └── [slug]/
│   │   ├── market/                  # Mercado
│   │   │   ├── tokens/
│   │   │   ├── indicators/
│   │   │   └── influencers/
│   │   └── otc/                     # Over The Counter
│   ├── components/
│   │   ├── ui/                      # Componentes base
│   │   ├── layout/                  # Header, Sidebar, Footer
│   │   ├── dashboard/               # Componentes do dashboard
│   │   ├── models/                  # Variações por modelo
│   │   │   ├── minimalist/
│   │   │   ├── financial/
│   │   │   ├── crypto-native/
│   │   │   ├── institutional/
│   │   │   └── gaming/
│   │   └── shared/                  # Componentes compartilhados
│   ├── lib/
│   │   ├── mock-data/               # Dados fictícios
│   │   │   ├── users.ts
│   │   │   ├── portfolio.ts
│   │   │   ├── transactions.ts
│   │   │   ├── market.ts
│   │   │   ├── indicators.ts
│   │   │   ├── blog-posts.ts
│   │   │   ├── courses.ts
│   │   │   └── influencers.ts
│   │   ├── auth.ts                  # Autenticação simples
│   │   ├── utils.ts                 # Funções utilitárias
│   │   └── constants.ts             # Constantes
│   ├── hooks/                       # React hooks customizados
│   ├── styles/                      # Estilos por modelo
│   │   └── models/
│   └── types/                       # TypeScript types
└── public/                          # Assets públicos
    ├── images/
    └── mock/
```

---

## 📱 Funcionalidades Detalhadas

### 1. Sistema de Autenticação

#### Fluxo de Login
- Email + Senha (validação básica)
- Credenciais hardcoded em arquivo TypeScript
- Sessão salva em localStorage
- Redirecionamento baseado em role (USER/ADMIN)

#### Usuários de Teste
```typescript
admin@rioporto.com.br / admin123    // Administrador
joao@teste.com / user123            // Usuário KYC 2
maria@teste.com / user123           // Usuário KYC 1
novo@teste.com / user123            // Usuário KYC 0
```

### 2. Dashboard Principal

#### Portfolio Overview
- Cards com métricas principais
- Gráfico de evolução patrimonial
- Tabela de ativos com P&L
- Recomendações inteligentes

#### Análise Inteligente
- Sugestões baseadas em performance
- Alertas de concentração
- Oportunidades de mercado
- Estratégias de DCA

### 3. Sistema de Negociação

#### Comprar Bitcoin
- Valores pré-definidos em BRL
- Cotação em tempo real (mockada)
- Cálculo automático de taxas
- Geração de link WhatsApp
- Instruções de pagamento PIX

#### Vender Bitcoin
- Input de quantidade BTC
- Seleção de chave PIX verificada
- Cotação instantânea
- Processo manual via WhatsApp

### 4. Central de Segurança

#### Gerenciamento de Conta
- Alteração de senha
- Ativação de 2FA
- Perguntas de segurança
- Backup codes

#### Sessões Ativas
- Lista de dispositivos conectados
- Informações de IP e localização
- Opção de encerrar sessões
- Alertas de acesso suspeito

#### Histórico de Acessos
- Log completo de atividades
- Filtros por período e tipo
- Indicadores de anomalia
- Export para auditoria

### 5. KYC Progressivo

#### Níveis de Verificação
- **Nível 0**: Email + SMS + CPF (R$ 1.000/mês)
- **Nível 1**: + Selfie + Documento (R$ 35.000/mês)
- **Nível 2**: + Comprovante residência (R$ 50.000/mês)
- **Nível 3**: + Comprovante renda (Personalizado)

### 6. Academy P2P

#### Blog
- 30+ artigos em categorias
- Sistema de likes e views
- Tempo de leitura
- Tags e filtros

#### Cursos
- Bitcoin Básico
- Segurança Avançada
- Bitcoin com IA
- Certificados de conclusão

### 7. Indicadores de Mercado

#### Métricas Principais
- Fear & Greed Index
- Bitcoin Dominance
- Market Cap Total
- Volume 24h

#### On-Chain
- Hash Rate
- Active Addresses
- Exchange Netflow
- NUPL

#### Social
- Sentiment Analysis
- Google Trends
- Social Volume

### 8. Área Administrativa

#### Dashboard Admin
- Métricas de negócio
- Volume e receita
- Usuários ativos
- Ordens pendentes

#### Gestão
- Lista de usuários
- Fila de KYC
- Logs de segurança
- Configurações gerais

---

## 🎨 5 Modelos de Design

### Modelo 1: Minimalista (v1.rioporto.com.br)

**Paleta de Cores**
```css
--primary: #000000;
--secondary: #FFD700;
--background: #FFFFFF;
--surface: #F8F8F8;
--text: #333333;
```

**Características**
- Layout espaçoso com whitespace
- Tipografia Inter clean
- Cards com sombras suaves
- Animações sutis (200ms)
- Menu lateral retrátil
- Botões ghost com hover delicado

**Público-alvo**: Usuários que valorizam simplicidade
**Inspiração**: Apple, Stripe, Linear

### Modelo 2: Dashboard Financeiro (v2.rioporto.com.br)

**Paleta de Cores**
```css
--primary: #0066FF;
--secondary: #00D632;
--background: #0A0A0A;
--surface: #1A1A1A;
--text: #FFFFFF;
```

**Características**
- Dark mode obrigatório
- Layout denso com widgets
- Fonte Roboto Mono para números
- Gráficos estilo TradingView
- Sidebar fixo com ícones
- Verde/Vermelho para P&L

**Público-alvo**: Traders profissionais
**Inspiração**: Bloomberg Terminal, Binance Pro

### Modelo 3: Crypto Native (v3.rioporto.com.br)

**Paleta de Cores**
```css
--primary: #9945FF;
--secondary: #00FFA3;
--background: #0D0D0D;
--surface: rgba(255,255,255,0.05);
--glow: 0 0 40px rgba(153,69,255,0.5);
```

**Características**
- Glassmorphism everywhere
- Gradientes vibrantes
- Neon accents
- Animações parallax
- Blur effects
- ASCII art decorativa

**Público-alvo**: Gen Z, early adopters
**Inspiração**: Uniswap, SushiSwap, Zora

### Modelo 4: Institucional (v4.rioporto.com.br)

**Paleta de Cores**
```css
--primary: #003366;
--secondary: #0066CC;
--background: #F5F5F5;
--surface: #FFFFFF;
--text: #333333;
```

**Características**
- Layout tradicional
- Merriweather para títulos
- Tabelas formais
- Menu superior clássico
- Mínimas animações
- Foco em hierarquia

**Público-alvo**: Investidores tradicionais
**Inspiração**: JP Morgan, Itaú, B3

### Modelo 5: Gaming/Web3 (v5.rioporto.com.br)

**Paleta de Cores**
```css
--primary: #FF006E;
--secondary: #00F5FF;
--background: #0A0A0A;
--surface: #1A1A1A;
--neon: 0 0 20px currentColor;
```

**Características**
- HUD style interface
- Progress bars
- Achievement system
- XP counter
- Leaderboards
- Particle effects

**Público-alvo**: Gamers, Web3 natives
**Inspiração**: Discord, Steam, Axie Infinity

---

## 📊 Estrutura de Dados Mockados

### Usuários (users.ts)

```typescript
export const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@rioporto.com.br',
    password: 'admin123',
    name: 'Admin RioPorto',
    role: 'ADMIN',
    cpf: '123.456.789-00',
    phone: '(21) 99999-9999',
    kycLevel: 3,
    createdAt: '2024-01-01',
    avatar: '/mock/avatars/admin.jpg'
  },
  {
    id: '2',
    email: 'joao@teste.com',
    password: 'user123',
    name: 'João Silva',
    role: 'USER',
    cpf: '987.654.321-00',
    phone: '(21) 98888-8888',
    kycLevel: 2,
    createdAt: '2024-02-15',
    avatar: '/mock/avatars/joao.jpg',
    portfolio: {
      totalInvested: 150000,
      currentValue: 185000,
      profitLoss: 35000,
      profitLossPercentage: 23.33
    }
  },
  {
    id: '3',
    email: 'maria@teste.com',
    password: 'user123',
    name: 'Maria Santos',
    role: 'USER',
    cpf: '456.789.123-00',
    phone: '(21) 97777-7777',
    kycLevel: 1,
    createdAt: '2024-03-20',
    avatar: '/mock/avatars/maria.jpg',
    portfolio: {
      totalInvested: 50000,
      currentValue: 48000,
      profitLoss: -2000,
      profitLossPercentage: -4.0
    }
  }
];
```

### Portfolio (portfolio.ts)

```typescript
export const MOCK_PORTFOLIO = {
  summary: {
    totalInvested: 150000,
    currentValue: 185000,
    profitLoss: 35000,
    profitLossPercentage: 23.33,
    bestAsset: 'BTC',
    worstAsset: 'ETH'
  },
  assets: [
    {
      id: '1',
      symbol: 'BTC',
      name: 'Bitcoin',
      amount: 0.5,
      avgPrice: 300000,
      currentPrice: 370000,
      value: 185000,
      profitLoss: 35000,
      profitLossPercentage: 23.33,
      allocation: 65,
      network: 'Bitcoin',
      icon: '/images/btc.svg'
    },
    {
      id: '2',
      symbol: 'ETH',
      name: 'Ethereum',
      amount: 2.0,
      avgPrice: 12000,
      currentPrice: 14000,
      value: 28000,
      profitLoss: 4000,
      profitLossPercentage: 16.67,
      allocation: 15,
      network: 'Ethereum',
      icon: '/images/eth.svg'
    },
    {
      id: '3',
      symbol: 'USDT',
      name: 'Tether',
      amount: 10000,
      avgPrice: 5.0,
      currentPrice: 5.0,
      value: 50000,
      profitLoss: 0,
      profitLossPercentage: 0,
      allocation: 20,
      network: 'Multiple',
      icon: '/images/usdt.svg'
    }
  ],
  history: [
    // 90 dias de histórico de valor do portfolio
    { date: '2024-01-01', value: 150000 },
    { date: '2024-01-02', value: 152000 },
    // ... mais 88 dias
    { date: '2024-03-30', value: 185000 }
  ],
  recommendations: [
    {
      type: 'BUY',
      asset: 'BTC',
      reason: 'Fear & Greed Index em 25 (Extreme Fear)',
      confidence: 0.85,
      potentialGain: '15-20%'
    },
    {
      type: 'REBALANCE',
      asset: 'Portfolio',
      reason: 'BTC representa 65% do portfolio (recomendado: 50%)',
      confidence: 0.72,
      action: 'Considere diversificar'
    },
    {
      type: 'TAKE_PROFIT',
      asset: 'ETH',
      reason: 'Lucro de 16% em 30 dias',
      confidence: 0.68,
      suggestion: 'Realizar 25% da posição'
    }
  ]
};
```

### Transações (transactions.ts)

```typescript
export const MOCK_TRANSACTIONS = [
  {
    id: 'tx001',
    userId: '2',
    type: 'BUY',
    asset: 'BTC',
    amount: 0.1,
    price: 365000,
    total: 36500,
    fee: 365,
    status: 'COMPLETED',
    date: new Date('2024-03-15T10:30:00'),
    paymentMethod: 'PIX',
    txHash: '3f4e5d6c7b8a9...',
    network: 'Bitcoin',
    confirmations: 6
  },
  {
    id: 'tx002',
    userId: '2',
    type: 'SELL',
    asset: 'ETH',
    amount: 0.5,
    price: 13500,
    total: 6750,
    fee: 67.50,
    status: 'COMPLETED',
    date: new Date('2024-03-14T14:20:00'),
    paymentMethod: 'PIX',
    pixKey: '***.***.***-45',
    network: 'Ethereum',
    confirmations: 20
  },
  {
    id: 'tx003',
    userId: '2',
    type: 'BUY',
    asset: 'USDT',
    amount: 5000,
    price: 5.05,
    total: 25250,
    fee: 252.50,
    status: 'PENDING',
    date: new Date('2024-03-30T09:15:00'),
    paymentMethod: 'PIX',
    network: 'Tron'
  }
  // ... mais 50 transações variadas
];
```

### Indicadores de Mercado (indicators.ts)

```typescript
export const MOCK_INDICATORS = {
  fearGreedIndex: {
    value: 72,
    label: 'Greed',
    color: '#00D632',
    description: 'Mercado otimista, considere tomar lucros',
    components: {
      volatility: { value: 25, weight: 0.25 },
      marketMomentum: { value: 80, weight: 0.25 },
      socialMedia: { value: 75, weight: 0.15 },
      dominance: { value: 70, weight: 0.10 },
      trends: { value: 85, weight: 0.25 }
    },
    history: [
      { date: '2024-03-24', value: 65 },
      { date: '2024-03-25', value: 68 },
      { date: '2024-03-26', value: 70 },
      { date: '2024-03-27', value: 69 },
      { date: '2024-03-28', value: 71 },
      { date: '2024-03-29', value: 73 },
      { date: '2024-03-30', value: 72 }
    ]
  },
  marketCap: {
    total: 2.1e12,
    totalFormatted: '$2.1T',
    change24h: 3.5,
    btcDominance: 52.3,
    ethDominance: 18.5,
    altcoins: 29.2,
    volume24h: 89e9,
    volume24hFormatted: '$89B'
  },
  onChain: {
    hashRate: {
      current: 450,
      unit: 'EH/s',
      ath: 491,
      change: -8.3
    },
    difficulty: {
      current: 62.5,
      unit: 'T',
      nextAdjustment: '5 dias',
      estimatedChange: 3.2
    },
    activeAddresses: {
      daily: 950000,
      weekly: 6200000,
      monthly: 18500000,
      trend: 'increasing'
    },
    exchangeNetflow: {
      btc: -7000,
      usd: -2590000000,
      interpretation: 'Bullish - Saída de exchanges'
    },
    nupl: {
      value: 0.52,
      zone: 'Belief',
      description: 'Mercado em zona de otimismo'
    }
  },
  derivatives: {
    longShortRatio: {
      ratio: 1.23,
      longs: 55,
      shorts: 45,
      interpretation: 'Levemente bullish'
    },
    fundingRate: {
      btc: 0.01,
      eth: 0.015,
      period: '8h',
      annualized: 10.95
    },
    openInterest: {
      total: 15e9,
      btc: 8e9,
      eth: 4e9,
      others: 3e9,
      change24h: 5.2
    },
    liquidations: {
      total24h: 250e6,
      longs: 180e6,
      shorts: 70e6,
      largest: 5.2e6,
      exchange: 'Binance'
    }
  },
  social: {
    sentiment: {
      score: 0.72,
      label: 'Positive',
      breakdown: {
        positive: 45,
        neutral: 35,
        negative: 20
      }
    },
    volume: {
      mentions24h: 1200000,
      change: 15.3,
      topCoins: ['BTC', 'ETH', 'SOL', 'PEPE']
    },
    googleTrends: {
      'Buy Bitcoin': 72,
      'Bitcoin Price': 85,
      'Crypto': 68,
      region: 'BR'
    }
  }
};
```

### Posts do Blog (blog-posts.ts)

```typescript
export const MOCK_BLOG_POSTS = [
  {
    id: 'post001',
    slug: 'bitcoin-guia-completo-iniciantes',
    title: 'Bitcoin: O Guia Definitivo para Iniciantes',
    excerpt: 'Aprenda tudo sobre Bitcoin, desde o básico até conceitos avançados. Este guia completo cobre história, tecnologia e como começar.',
    content: `# Bitcoin: O Guia Definitivo para Iniciantes

## O que é Bitcoin?

Bitcoin é uma moeda digital descentralizada que permite transações peer-to-peer sem a necessidade de intermediários como bancos...

## Como funciona?

A tecnologia blockchain é o coração do Bitcoin...

## Como comprar seu primeiro Bitcoin

1. Escolha uma exchange confiável
2. Complete o processo de KYC
3. Deposite fundos
4. Faça sua primeira compra

## Segurança

- Use autenticação de dois fatores
- Nunca compartilhe suas chaves privadas
- Considere uma hardware wallet
    `,
    author: {
      name: 'Fernando Costa',
      avatar: '/mock/avatars/fernando.jpg',
      bio: 'Especialista em Bitcoin desde 2015'
    },
    category: 'Iniciante',
    tags: ['bitcoin', 'iniciante', 'guia', 'básico'],
    readTime: 15,
    likes: 234,
    views: 5420,
    comments: 18,
    publishedAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-15'),
    thumbnail: '/mock/blog/bitcoin-guide.jpg',
    featured: true
  },
  {
    id: 'post002',
    slug: 'not-your-keys-not-your-coins',
    title: 'Not Your Keys, Not Your Coins: A Importância da Auto-custódia',
    excerpt: 'Entenda por que manter suas próprias chaves privadas é fundamental para a segurança dos seus bitcoins.',
    content: `# Not Your Keys, Not Your Coins

## O que significa?

Esta famosa frase da comunidade Bitcoin significa que se você não controla as chaves privadas...`,
    author: {
      name: 'Marina Crypto',
      avatar: '/mock/avatars/marina.jpg',
      bio: 'Security researcher e entusiasta de privacidade'
    },
    category: 'Segurança',
    tags: ['segurança', 'wallet', 'auto-custódia'],
    readTime: 10,
    likes: 456,
    views: 8930,
    comments: 34,
    publishedAt: new Date('2024-03-10'),
    thumbnail: '/mock/blog/keys-security.jpg',
    featured: false
  }
  // ... mais 28 posts em diferentes categorias
];
```

### Cursos (courses.ts)

```typescript
export const MOCK_COURSES = [
  {
    id: 'course001',
    slug: 'bitcoin-do-zero',
    title: 'Bitcoin do Zero ao Avançado',
    description: 'Curso completo para quem quer dominar Bitcoin, desde conceitos básicos até estratégias avançadas.',
    price: 197,
    originalPrice: 397,
    currency: 'BRL',
    instructor: {
      name: 'Prof. Roberto Nakamoto',
      avatar: '/mock/avatars/roberto.jpg',
      bio: 'Educador financeiro e early adopter de Bitcoin'
    },
    modules: [
      {
        id: 'mod1',
        title: 'Fundamentos do Bitcoin',
        lessons: 8,
        duration: 120 // minutos
      },
      {
        id: 'mod2',
        title: 'Carteiras e Segurança',
        lessons: 6,
        duration: 90
      },
      {
        id: 'mod3',
        title: 'Comprando e Vendendo',
        lessons: 5,
        duration: 75
      },
      {
        id: 'mod4',
        title: 'Estratégias de Investimento',
        lessons: 7,
        duration: 105
      },
      {
        id: 'mod5',
        title: 'Aspectos Legais e Tributários',
        lessons: 4,
        duration: 60
      },
      {
        id: 'mod6',
        title: 'Futuro do Bitcoin',
        lessons: 3,
        duration: 45
      }
    ],
    totalLessons: 33,
    totalDuration: 495, // 8h15min
    students: 1234,
    rating: 4.8,
    reviews: 287,
    level: 'Iniciante ao Avançado',
    language: 'Português',
    certificate: true,
    lifetime: true,
    lastUpdated: new Date('2024-03-01')
  },
  {
    id: 'course002',
    slug: 'seguranca-maxima-bitcoin',
    title: 'Segurança Máxima para Bitcoin',
    description: 'Aprenda a proteger seus bitcoins como um profissional. Hardware wallets, multisig, privacidade e mais.',
    price: 297,
    originalPrice: 497,
    currency: 'BRL',
    instructor: {
      name: 'Ana Security',
      avatar: '/mock/avatars/ana.jpg',
      bio: 'Especialista em segurança digital e criptografia'
    },
    modules: [
      {
        id: 'mod1',
        title: 'Ameaças e Vulnerabilidades',
        lessons: 5,
        duration: 75
      },
      {
        id: 'mod2',
        title: 'Hardware Wallets na Prática',
        lessons: 8,
        duration: 120
      },
      {
        id: 'mod3',
        title: 'Configurando Multisig',
        lessons: 6,
        duration: 90
      },
      {
        id: 'mod4',
        title: 'Privacidade e Anonimato',
        lessons: 7,
        duration: 105
      },
      {
        id: 'mod5',
        title: 'Backup e Recuperação',
        lessons: 4,
        duration: 60
      }
    ],
    totalLessons: 30,
    totalDuration: 450, // 7h30min
    students: 567,
    rating: 4.9,
    reviews: 123,
    level: 'Intermediário ao Avançado',
    language: 'Português',
    certificate: true,
    lifetime: true,
    lastUpdated: new Date('2024-02-15')
  },
  {
    id: 'course003',
    slug: 'bitcoin-inteligencia-artificial',
    title: 'Bitcoin com Inteligência Artificial',
    description: 'Use o poder da IA para análise de mercado, automação de estratégias e tomada de decisão em Bitcoin.',
    price: 497,
    originalPrice: 797,
    currency: 'BRL',
    instructor: {
      name: 'Dr. Carlos AI',
      avatar: '/mock/avatars/carlos.jpg',
      bio: 'PhD em IA aplicada a finanças'
    },
    modules: [
      {
        id: 'mod1',
        title: 'Introdução à IA no Crypto',
        lessons: 4,
        duration: 60
      },
      {
        id: 'mod2',
        title: 'ChatGPT para Análise de Mercado',
        lessons: 6,
        duration: 90
      },
      {
        id: 'mod3',
        title: 'Machine Learning e Previsões',
        lessons: 8,
        duration: 120
      },
      {
        id: 'mod4',
        title: 'Bots de Trading com IA',
        lessons: 10,
        duration: 150
      },
      {
        id: 'mod5',
        title: 'Análise On-chain Automatizada',
        lessons: 5,
        duration: 75
      },
      {
        id: 'mod6',
        title: 'Projeto Final: Seu Assistente IA',
        lessons: 3,
        duration: 45
      }
    ],
    totalLessons: 36,
    totalDuration: 540, // 9h
    students: 234,
    rating: 4.7,
    reviews: 67,
    level: 'Avançado',
    language: 'Português',
    certificate: true,
    lifetime: true,
    prerequisites: ['Conhecimento básico de Bitcoin', 'Noções de programação (opcional)'],
    lastUpdated: new Date('2024-03-20')
  }
];
```

### Influenciadores (influencers.ts)

```typescript
export const MOCK_INFLUENCERS = [
  {
    id: 'inf001',
    name: 'Fernando Ulrich',
    slug: 'fernando-ulrich',
    avatar: '/mock/influencers/ulrich.jpg',
    verified: true,
    category: ['Educação', 'Análise Macro'],
    description: 'Economista e educador, autor do livro "Bitcoin: A Moeda na Era Digital". Foco em aspectos econômicos e filosóficos do Bitcoin.',
    specialties: ['Bitcoin', 'Economia Austríaca', 'Moeda Digital', 'Filosofia Econômica'],
    platforms: {
      youtube: 'https://youtube.com/@fernandoulrich',
      twitter: 'https://twitter.com/fernandoulrich',
      instagram: 'https://instagram.com/fernandoulrich'
    },
    followers: '250K+',
    contentType: ['Vídeos longos', 'Artigos', 'Palestras'],
    language: ['Português'],
    trustScore: 9.5,
    userRating: 4.8,
    totalRatings: 1234,
    lastActive: new Date('2024-03-29'),
    highlights: [
      'Pioneiro na educação sobre Bitcoin no Brasil',
      'Abordagem acadêmica e filosófica',
      'Conteúdo de alta qualidade'
    ]
  },
  {
    id: 'inf002',
    name: 'Cointimes',
    slug: 'cointimes',
    avatar: '/mock/influencers/cointimes.jpg',
    verified: true,
    category: ['Notícias', 'Análise', 'Educação'],
    description: 'Portal de notícias especializado em Bitcoin e criptomoedas. Cobertura completa do mercado brasileiro e internacional.',
    specialties: ['Notícias', 'Regulação', 'Mercado BR', 'Análise de Mercado'],
    platforms: {
      website: 'https://cointimes.com.br',
      twitter: 'https://twitter.com/cointimes',
      telegram: 'https://t.me/cointimes',
      youtube: 'https://youtube.com/@cointimes'
    },
    followers: '180K+',
    contentType: ['Notícias', 'Análises', 'Podcasts', 'Newsletter'],
    language: ['Português'],
    trustScore: 9.0,
    userRating: 4.7,
    totalRatings: 892,
    lastActive: new Date('2024-03-30'),
    highlights: [
      'Cobertura imparcial e profissional',
      'Foco no mercado brasileiro',
      'Equipe de jornalistas especializados'
    ]
  },
  {
    id: 'inf003',
    name: 'Área Bitcoin',
    slug: 'area-bitcoin',
    avatar: '/mock/influencers/areabitcoin.jpg',
    verified: true,
    category: ['Trading', 'Análise Técnica', 'Educação'],
    description: 'Canal focado em análise técnica e estratégias de trading para Bitcoin e principais altcoins.',
    specialties: ['Trading', 'Análise Técnica', 'Risk Management', 'DeFi'],
    platforms: {
      youtube: 'https://youtube.com/@areabitcoin',
      instagram: 'https://instagram.com/areabitcoin',
      telegram: 'https://t.me/areabitcoin'
    },
    followers: '320K+',
    contentType: ['Lives diárias', 'Análises técnicas', 'Cursos'],
    language: ['Português'],
    trustScore: 8.5,
    userRating: 4.6,
    totalRatings: 2156,
    lastActive: new Date('2024-03-30'),
    highlights: [
      'Lives diárias de mercado',
      'Foco em educação para traders',
      'Análises detalhadas'
    ]
  }
  // ... mais 37 influenciadores de diferentes categorias
];
```

### Tokens Suportados (tokens.ts)

```typescript
export const SUPPORTED_TOKENS = {
  recommended: [
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      coingeckoId: 'bitcoin',
      networks: ['Bitcoin'],
      icon: '/images/tokens/btc.svg',
      color: '#F7931A',
      description: 'A primeira e maior criptomoeda descentralizada'
    },
    {
      symbol: 'WBTC',
      name: 'Wrapped Bitcoin',
      coingeckoId: 'wrapped-bitcoin',
      networks: ['Ethereum', 'BSC', 'Polygon', 'Arbitrum', 'Optimism'],
      icon: '/images/tokens/wbtc.svg',
      color: '#F09242',
      description: 'Bitcoin tokenizado para uso em DeFi'
    },
    {
      symbol: 'CBBTC',
      name: 'Coinbase Wrapped BTC',
      coingeckoId: 'coinbase-wrapped-btc',
      networks: ['Base', 'Ethereum'],
      icon: '/images/tokens/cbbtc.svg',
      color: '#0052FF',
      description: 'Bitcoin wrapped pela Coinbase'
    },
    {
      symbol: 'USDT',
      name: 'Tether',
      coingeckoId: 'tether',
      networks: ['Ethereum', 'BSC', 'Polygon', 'Tron', 'Solana'],
      icon: '/images/tokens/usdt.svg',
      color: '#26A17B',
      description: 'Maior stablecoin pareada ao dólar'
    },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      coingeckoId: 'usd-coin',
      networks: ['Ethereum', 'BSC', 'Polygon', 'Base', 'Arbitrum', 'Optimism'],
      icon: '/images/tokens/usdc.svg',
      color: '#2775CA',
      description: 'Stablecoin regulada da Circle'
    },
    {
      symbol: 'DAI',
      name: 'DAI',
      coingeckoId: 'dai',
      networks: ['Ethereum', 'Polygon', 'BSC'],
      icon: '/images/tokens/dai.svg',
      color: '#F5AC37',
      description: 'Stablecoin descentralizada do MakerDAO'
    },
    {
      symbol: 'PAXG',
      name: 'PAX Gold',
      coingeckoId: 'pax-gold',
      networks: ['Ethereum'],
      icon: '/images/tokens/paxg.svg',
      color: '#E4CE4D',
      description: 'Token lastreado em ouro físico'
    },
    {
      symbol: 'XAUT',
      name: 'Tether Gold',
      coingeckoId: 'tether-gold',
      networks: ['Ethereum', 'Tron'],
      icon: '/images/tokens/xaut.svg',
      color: '#FFD700',
      description: 'Ouro tokenizado pela Tether'
    }
    // ... mais 8 tokens recomendados
  ],
  all: [] // Lista completa seria carregada da API CoinGecko
};
```

---

## 🛠️ Guia de Implementação

### Passo 1: Configuração Inicial

```bash
# No terminal WSL Ubuntu
cd /home/johnnyhelder/Projetos/v5-rioporto

# Clonar repositório
git clone https://github.com/rioporto/v5-rioporto.git .

# Instalar Node.js 20 (se necessário)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verificar versões
node --version  # Deve ser 20.x
npm --version   # Deve ser 10.x
```

### Passo 2: Criar Projeto Next.js

```bash
# Criar projeto com configurações específicas
npx create-next-app@latest . --typescript --tailwind --app --src-dir

# Respostas para o setup:
# ✔ Would you like to use ESLint? → Yes
# ✔ Would you like to use Tailwind CSS? → Yes
# ✔ Would you like to use `src/` directory? → Yes
# ✔ Would you like to use App Router? → Yes
# ✔ Would you like to customize the default import alias? → No
```

### Passo 3: Instalar Dependências

```bash
# Dependências principais
npm install lucide-react recharts clsx tailwind-merge
npm install @radix-ui/react-dialog @radix-ui/react-tabs @radix-ui/react-select
npm install date-fns

# Dependências de desenvolvimento
npm install -D @types/node
```

### Passo 4: Estrutura de Pastas

```bash
# Criar toda estrutura de pastas
mkdir -p src/{components/{ui,layout,dashboard,models/{minimalist,financial,crypto-native,institutional,gaming},shared},lib/{mock-data,utils},hooks,styles/models,types}
mkdir -p src/app/{dashboard/{portfolio,buy,sell,transactions,indicators,tools,settings/{security,sessions,kyc,pix,wallets}},admin/{users,orders,analytics,kyc-queue,security},academy/{blog,courses},market/{tokens,indicators,influencers},'(auth)'/{login,register,verify},otc}
mkdir -p public/{images/{tokens,patterns},mock/{avatars,charts,blog,influencers}}
```

### Passo 5: Executar o Projeto

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build
npm start

# Abrir no navegador
# http://localhost:3000
```

### Passo 6: Testar Modelos

Em desenvolvimento, use o Model Switcher no canto inferior direito para alternar entre os 5 modelos visuais.

### Passo 7: Deploy (Opcional)

```bash
# Via Railway MCP
mcp railway init
mcp railway up

# Ou via Vercel
npm install -g vercel
vercel

# Configurar domínios personalizados após deploy
```

---

## 📝 Prompt Completo para Claude Code

```markdown
CONTEXTO DE DESENVOLVIMENTO:
- Ambiente: Windows 11 com WSL Ubuntu
- Ferramenta: Claude Code via terminal
- Pasta do projeto: /home/johnnyhelder/Projetos/v5-rioporto
- Repositório: https://github.com/rioporto/v5-rioporto.git

Crie uma plataforma visual completa RioPorto P2P (exchange Bitcoin) com 5 modelos de design diferentes.
IMPORTANTE: Tudo com dados mockados/fictícios, sem banco de dados real, apenas para demonstração visual.

[INCLUIR TODO O CONTEÚDO DO PROMPT COMPLETO FORNECIDO ANTERIORMENTE]

IMPORTANTE:
1. Todos os dados são mockados - não precisa banco de dados
2. Login funciona com emails/senhas hardcoded
3. Todas as funcionalidades são simuladas visualmente
4. 5 modelos completos com estilos diferentes
5. Model Switcher aparece apenas em desenvolvimento
6. Em produção, o modelo é detectado pelo subdomínio
7. Responsivo e otimizado para mobile
8. Inclui TODAS as páginas mencionadas
9. Animações e interações apropriadas para cada modelo
10. Pronto para demonstração e apresentação

Comece executando este prompt no Claude Code e ele criará toda a estrutura visual dos 5 modelos completos!
```

---

## 📌 Informações Finais

### Status do Projeto
- **Fase**: Especificação completa finalizada
- **Próximo passo**: Executar prompt no Claude Code
- **Tempo estimado**: 2-3 horas para implementação completa
- **Resultado esperado**: 5 modelos visuais funcionais para escolha

### Suporte e Contato
- **Repositório**: https://github.com/rioporto/v5-rioporto.git
- **Documentação**: Este arquivo (baixar como .md)
- **Ambiente**: WSL Ubuntu no Windows 11

### Notas Importantes
1. Projeto 100% visual com dados mockados
2. Sem necessidade de banco de dados ou APIs reais
3. Foco em demonstração e escolha de design
4. Todos os 5 modelos serão funcionais
5. Deploy opcional via Railway ou Vercel

---

**Documento gerado em**: 31 de Julho de 2025
**Versão**: 1.0
**Autor**: Claude Assistant
**Projeto**: RioPorto P2P - 5 Modelos Visuais