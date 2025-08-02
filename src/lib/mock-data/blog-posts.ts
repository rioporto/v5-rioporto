import { BlogPost } from '@/types/rioporto';

/**
 * Dados mockados do blog - 30+ posts em diferentes categorias
 * Inclui análises, tutoriais, notícias e conteúdo educacional
 */

export const MOCK_BLOG_AUTHORS = [
  {
    id: 'author_001',
    name: 'João Santos',
    avatar: '/avatars/joao-santos.jpg',
    bio: 'Analista de criptomoedas com 8 anos de experiência no mercado financeiro. Especialista em análise técnica e fundamentalista.',
    role: 'Head de Análise'
  },
  {
    id: 'author_002',
    name: 'Maria Silva',
    avatar: '/avatars/maria-silva.jpg',
    bio: 'Educadora financeira e entusiasta de blockchain. Focada em democratizar o acesso às criptomoedas no Brasil.',
    role: 'Educadora Chefe'
  },
  {
    id: 'author_003',
    name: 'Carlos Ribeiro',
    avatar: '/avatars/carlos-ribeiro.jpg',
    bio: 'Ex-trader de bancos de investimento, hoje especialista em DeFi e protocolos descentralizados.',
    role: 'Especialista DeFi'
  },
  {
    id: 'author_004',
    name: 'Ana Costa',
    avatar: '/avatars/ana-costa.jpg',
    bio: 'Jornalista especializada em tecnologia e mercados emergentes. Cobertura regulatória e institucional.',
    role: 'Jornalista Senior'
  },
  {
    id: 'author_005',
    name: 'Pedro Lima',
    avatar: '/avatars/pedro-lima.jpg',
    bio: 'Desenvolvedor blockchain e pesquisador de protocolos. Foco em aspectos técnicos e inovações.',
    role: 'CTO & Researcher'
  }
];

export const MOCK_BLOG_POSTS: BlogPost[] = [
  // Posts recentes (últimos 30 dias)
  {
    id: 'post_001',
    title: 'Bitcoin Rompe Resistência de R$ 370.000: Análise Técnica Completa',
    slug: 'bitcoin-rompe-resistencia-370k-analise-tecnica',
    excerpt: 'Bitcoin quebra importante resistência técnica e pode mirar nos R$ 400.000. Analisamos os níveis-chave e projeções para as próximas semanas.',
    content: `# Bitcoin Rompe Resistência de R$ 370.000: Análise Técnica Completa

O Bitcoin finalmente conseguiu romper a importante resistência de R$ 370.000, um nível que vinha sendo testado há várias semanas. Esta quebra representa um marco significativo para a análise técnica da principal criptomoeda.

## Análise dos Gráficos

### Timeframe Diário
- **Resistência quebrada**: R$ 370.000 com volume expressivo
- **Próximo alvo**: R$ 385.000 - R$ 400.000
- **Suporte atual**: R$ 365.000 (ex-resistência)

### Indicadores Técnicos
- **RSI**: 68 (território de força, mas não sobrecomprado)
- **MACD**: Cruzamento altista confirmado
- **Volume**: 35% acima da média dos últimos 30 dias

## Cenários Possíveis

### Cenário Otimista (Probabilidade: 65%)
- Consolidação acima de R$ 370.000
- Movimento em direção a R$ 400.000
- Tempo estimado: 2-3 semanas

### Cenário de Correção (Probabilidade: 35%)
- Retorno para testar R$ 365.000
- Possível nova tentativa de rompimento
- Oportunidade de entrada em níveis menores

## Estratégias Recomendadas

1. **Para quem está comprado**: Manter posições com stop em R$ 360.000
2. **Para quem quer entrar**: Aguardar correção ou comprar em R$ 375.000
3. **Para traders**: Operar entre R$ 365.000 - R$ 385.000

---

*Esta análise não constitui recomendação de investimento. Sempre faça sua própria pesquisa.*`,
    category: 'Análise Técnica',
    tags: ['Bitcoin', 'Análise Técnica', 'Mercado', 'Trading'],
    author: MOCK_BLOG_AUTHORS[0],
    publishedAt: '2024-07-30T10:00:00Z',
    updatedAt: '2024-07-30T10:00:00Z',
    featuredImage: '/blog/bitcoin-breakout-analysis.jpg',
    readTime: 8,
    metrics: {
      views: 15420,
      likes: 892,
      comments: 156,
      shares: 234
    },
    seo: {
      metaTitle: 'Bitcoin Rompe R$ 370k: Análise Técnica e Projeções',
      metaDescription: 'Análise completa do rompimento do Bitcoin da resistência de R$ 370.000, com projeções e estratégias para investidores.',
      keywords: ['bitcoin preço', 'análise técnica bitcoin', 'resistência bitcoin', 'trading bitcoin']
    }
  },

  {
    id: 'post_002',
    title: 'Guia Completo: Como Configurar sua Primeira Carteira de Bitcoin',
    slug: 'guia-completo-primeira-carteira-bitcoin',
    excerpt: 'Tutorial passo-a-passo para iniciantes configurarem sua primeira carteira Bitcoin com segurança. Tipos de carteiras, backup e boas práticas.',
    content: `# Guia Completo: Como Configurar sua Primeira Carteira de Bitcoin

Se você está começando no mundo das criptomoedas, configurar sua primeira carteira Bitcoin é um passo fundamental. Neste guia, vamos cobrir tudo que você precisa saber.

## O que é uma Carteira Bitcoin?

Uma carteira Bitcoin é um software que permite armazenar, enviar e receber bitcoins. Na verdade, ela armazena suas chaves privadas - códigos que dão acesso aos seus bitcoins na blockchain.

## Tipos de Carteiras

### 1. Carteiras Hot (Online)
- **Vantagens**: Fácil acesso, conveniente para transações
- **Desvantagens**: Mais vulnerável a ataques
- **Exemplos**: Electrum, Exodus, Trust Wallet

### 2. Carteiras Cold (Offline)
- **Vantagens**: Máxima segurança, proteção contra hackers
- **Desvantagens**: Menos conveniente para uso diário
- **Exemplos**: Ledger, Trezor, papel

### 3. Carteiras Mobile
- **Vantagens**: Portabilidade, QR codes
- **Desvantagens**: Risco de perda do celular
- **Exemplos**: BlueWallet, Samourai, Muun

## Configuração Passo-a-Passo (Electrum)

### Passo 1: Download e Instalação
1. Acesse o site oficial: electrum.org
2. Baixe a versão para seu sistema operacional
3. Verifique a assinatura digital (importante!)
4. Instale o software

### Passo 2: Criando Nova Carteira
1. Abra o Electrum
2. Escolha "Create a new wallet"
3. Selecione "Standard wallet"
4. Escolha "Create a new seed"

### Passo 3: Backup da Seed
1. ANOTE as 12 palavras em papel
2. Confirme a seed digitando novamente
3. NUNCA compartilhe ou fotografe
4. Guarde em local seguro

### Passo 4: Senha da Carteira
1. Crie uma senha forte
2. Use combinação de letras, números e símbolos
3. NÃO use a mesma senha de outros serviços

## Boas Práticas de Segurança

### Essenciais
- ✅ Sempre faça backup da seed phrase
- ✅ Use senhas fortes e únicas
- ✅ Mantenha software atualizado
- ✅ Teste pequenas transações primeiro

### Avançadas
- ✅ Use autenticação de dois fatores
- ✅ Considere carteiras multisig
- ✅ Mantenha backup em múltiplos locais
- ✅ Use dispositivos dedicados para valores altos

## Erros Comuns a Evitar

1. **Não fazer backup**: Perda permanente dos fundos
2. **Compartilhar chaves**: Risco de roubo
3. **Usar exchanges como carteira**: "Not your keys, not your coins"
4. **Não testar**: Sempre teste com pequenas quantias

## Recomendações por Perfil

### Iniciante
- **Mobile**: BlueWallet ou Muun
- **Desktop**: Electrum
- **Valor**: Até R$ 10.000

### Intermediário
- **Hardware**: Ledger Nano S Plus
- **Software**: Electrum + Ledger
- **Valor**: R$ 10.000 - R$ 100.000

### Avançado
- **Hardware**: Ledger Nano X ou Trezor Model T
- **Setup**: Multisig 2-of-3
- **Valor**: Acima de R$ 100.000

---

*Lembre-se: a segurança dos seus bitcoins é sua responsabilidade. Invista tempo aprendendo antes de investir dinheiro.*`,
    category: 'Tutorial',
    tags: ['Bitcoin', 'Carteira', 'Segurança', 'Iniciantes', 'Tutorial'],
    author: MOCK_BLOG_AUTHORS[1],
    publishedAt: '2024-07-28T14:30:00Z',
    updatedAt: '2024-07-28T14:30:00Z',
    featuredImage: '/blog/bitcoin-wallet-guide.jpg',
    readTime: 12,
    metrics: {
      views: 28350,
      likes: 1247,
      comments: 89,
      shares: 456
    },
    seo: {
      metaTitle: 'Como Criar Carteira Bitcoin: Guia Completo 2024',
      metaDescription: 'Tutorial completo para configurar sua primeira carteira Bitcoin com segurança. Tipos, instalação e boas práticas.',
      keywords: ['carteira bitcoin', 'como criar carteira bitcoin', 'electrum tutorial', 'segurança bitcoin']
    }
  },

  {
    id: 'post_003',
    title: 'DeFi no Brasil: Oportunidades e Riscos em 2024',
    slug: 'defi-brasil-oportunidades-riscos-2024',
    excerpt: 'Panorama completo do mercado DeFi brasileiro, protocolos em destaque, yields disponíveis e principais riscos para investidores locais.',
    content: `# DeFi no Brasil: Oportunidades e Riscos em 2024

O mercado de Finanças Descentralizadas (DeFi) tem ganhado tração no Brasil, oferecendo novas oportunidades de investimento e renda passiva. Vamos analisar o cenário atual.

## O que é DeFi?

DeFi (Decentralized Finance) são protocolos financeiros construídos em blockchain que eliminam intermediários tradicionais como bancos e corretoras.

### Principais Características:
- **Sem permissão**: Qualquer pessoa pode usar
- **Transparente**: Código aberto e auditável
- **Composável**: Protocolos interagem entre si
- **Global**: Acesso 24/7 de qualquer lugar

## Oportunidades no Brasil

### 1. Yields Superiores
- **Stablecoins USD**: 8-15% ao ano
- **Staking ETH**: 5-7% ao ano
- **Liquidity Mining**: 15-50% ao ano (alto risco)

### 2. Arbitragem Internacional
- **Spreads**: Diferenças de preço entre exchanges
- **DEX vs CEX**: Oportunidades em protocolos descentralizados
- **Cross-chain**: Arbitragem entre diferentes blockchains

### 3. Produtos Inovadores
- **Empréstimos**: Sem análise de crédito
- **Derivativos**: Perpetuais e opções descentralizadas
- **Seguros**: Proteção contra riscos de smart contracts

## Protocolos em Destaque

### Ethereum
- **Uniswap**: Maior DEX por volume
- **Aave**: Empréstimos e rendimentos
- **Compound**: Protocolos de lending histórico

### Binance Smart Chain
- **PancakeSwap**: DEX com menores taxas
- **Venus**: Lending e borrowing
- **Alpaca Finance**: Yield farming alavancado

### Polygon
- **QuickSwap**: DEX nativo do Polygon
- **Aave Polygon**: Versão com taxas menores
- **Balancer**: Pools de liquidez balanceadas

## Riscos Específicos do Brasil

### 1. Regulamentação
- **Incerteza jurídica**: Falta de clareza regulatória
- **Tributação**: Complexidade fiscal
- **Compliance**: Requisitos KYC/AML

### 2. Riscos Técnicos
- **Smart Contract**: Bugs podem causar perdas
- **Impermanent Loss**: Perda em pools de liquidez
- **Rug Pulls**: Projetos fraudulentos

### 3. Riscos de Mercado
- **Volatilidade**: Flutuações extremas
- **Liquidez**: Problemas em mercados pequenos
- **Correlação**: Todos os ativos caem juntos

## Estratégias Recomendadas

### Para Iniciantes
1. **Comece pequeno**: Máximo 5% do portfolio
2. **Use protocolos estabelecidos**: Aave, Compound, Uniswap
3. **Foque em stablecoins**: Menor volatilidade
4. **Evite alavancagem**: Alto risco para iniciantes

### Para Experientes
1. **Diversifique chains**: Ethereum, BSC, Polygon
2. **Monitore yields**: Use ferramentas como DeFiPulse
3. **Gerencie riscos**: Stop-loss e take-profit
4. **Acompanhe governança**: Participe de votações

## Aspectos Tributários

### Declaração IR
- **Ganho de capital**: 15% sobre lucros
- **Day trade**: 20% sobre lucros
- **Staking rewards**: Renda variável
- **Yield farming**: Tributação complexa

### Recomendações
- Mantenha registros detalhados
- Consulte contador especializado
- Use ferramentas de tracking
- Declare tudo corretamente

## Ferramentas Essenciais

### Portfolio Tracking
- **DeBank**: Visão geral de protocolos
- **Zapper**: Interface unificada
- **Zerion**: Portfolio mobile-first

### Análise
- **DeFiPulse**: Rankings e métricas
- **DeFiLlama**: TVL e yields
- **CoinGecko**: Preços e dados

### Segurança
- **Hardware wallets**: Ledger, Trezor
- **Simuladores**: Tenderly, Remix
- **Auditorias**: Sempre verificar

## Outlook 2024

### Tendências Positivas
- Maior adoção institucional
- Melhores interfaces de usuário
- Regulamentação mais clara
- Produtos mais sofisticados

### Desafios
- Competição com TradFi
- Escalabilidade das redes
- Complexidade tributária
- Riscos regulatórios

---

*DeFi oferece oportunidades únicas, mas requer conhecimento e gestão de risco adequada. Sempre DYOR (Do Your Own Research).*`,
    category: 'DeFi',
    tags: ['DeFi', 'Yield Farming', 'Brasil', 'Investimento', 'Risco'],
    author: MOCK_BLOG_AUTHORS[2],
    publishedAt: '2024-07-26T16:45:00Z',
    updatedAt: '2024-07-26T16:45:00Z',
    featuredImage: '/blog/defi-brasil-2024.jpg',
    readTime: 15,
    metrics: {
      views: 12890,
      likes: 734,
      comments: 167,
      shares: 298
    },
    seo: {
      metaTitle: 'DeFi Brasil 2024: Guia Completo de Oportunidades',
      metaDescription: 'Análise completa do mercado DeFi no Brasil, protocolos, yields, riscos e estratégias para investidores brasileiros.',
      keywords: ['defi brasil', 'yield farming', 'staking brasil', 'criptomoedas brasil']
    }
  },

  {
    id: 'post_004',
    title: 'Regulamentação Crypto no Brasil: O que Mudou em 2024',
    slug: 'regulamentacao-crypto-brasil-mudancas-2024',
    excerpt: 'Análise das principais mudanças regulatórias para criptomoedas no Brasil em 2024, impactos para investidores e exchanges.',
    content: `# Regulamentação Crypto no Brasil: O que Mudou em 2024

O cenário regulatório das criptomoedas no Brasil passou por mudanças significativas em 2024. Vamos analisar os principais desenvolvimentos e seus impactos.

## Principais Mudanças

### Marco Legal das Criptomoedas
- **Lei 14.478/2022**: Regulamentação final implementada
- **Órgão regulador**: CVM assumiu competência
- **Licenciamento**: Exchanges precisam de autorização

### Novas Obrigações

#### Para Exchanges
- **Segregação de ativos**: Fundos dos clientes separados
- **Auditoria externa**: Relatórios trimestrais obrigatórios
- **Compliance**: KYC/AML mais rigoroso
- **Reservas**: Proof-of-reserves público

#### Para Investidores
- **Declaração IR**: Obrigatória acima de R$ 5.000
- **Ganho de capital**: 15% sobre lucros
- **Day trade**: 20% sobre lucros
- **Staking**: Tributação como renda variável

## Impactos no Mercado

### Positivos
- **Segurança jurídica**: Regras claras para operar
- **Proteção do investidor**: Maior transparência
- **Institucionalização**: Entrada de grandes players
- **Inovação**: Framework para novos produtos

### Desafios
- **Compliance costs**: Custos operacionais maiores
- **Barreiras de entrada**: Dificuldade para startups
- **Burocracia**: Processos mais complexos
- **Tempo**: Aprovações podem demorar

## Exchanges Licenciadas

### Já Aprovadas
1. **Mercado Bitcoin**: Primeira licença completa
2. **Binance Brasil**: Operação local aprovada
3. **Coinbase Brasil**: Licença provisória
4. **Bitso**: Foco no mercado latinoamericano

### Em Processo
- NovaDAX
- Foxbit
- BitcoinTrade
- OmniTrade

## Produtos Regulamentados

### Permitidos
- **Spot trading**: Compra e venda direta
- **Custody**: Custódia de ativos
- **Staking services**: Serviços de staking
- **OTC trading**: Negociação de balcão

### Em Análise
- **Derivativos**: Futuros e opções
- **ETFs crypto**: Fundos negociados em bolsa
- **Tokenização**: Tokens de ativos reais
- **DeFi services**: Serviços descentralizados

## Compliance para Investidores

### Documentação Necessária
- **CPF**: Sempre obrigatório
- **Comprovante de renda**: Para valores altos
- **Comprovante de residência**: Atualizado
- **Selfie com documento**: Prova de vida

### Limits por KYC Level

#### Nível 1 (Básico)
- **Limite diário**: R$ 5.000
- **Limite mensal**: R$ 30.000
- **Documentos**: CPF + email + telefone

#### Nível 2 (Intermediário)
- **Limite diário**: R$ 50.000
- **Limite mensal**: R$ 300.000
- **Documentos**: + RG/CNH + comprovante residência

#### Nível 3 (Avançado)
- **Limite diário**: R$ 500.000
- **Limite mensal**: Ilimitado
- **Documentos**: + comprovante renda + selfie

## Tributação Atualizada

### Ganhos de Capital
- **Até R$ 35.000/mês**: Isento
- **Acima de R$ 35.000/mês**: 15%
- **Day trade**: 20% sempre
- **Perdas**: Podem ser compensadas

### Staking e DeFi
- **Rewards**: Tributados no recebimento
- **Alíquota**: Tabela progressiva (0-27,5%)
- **Yield farming**: Renda variável
- **Liquidity mining**: Tributação complexa

### Dicas Fiscais
1. **Mantenha registros**: Todas as transações
2. **Use ferramentas**: Calculadoras de IR
3. **Consulte contador**: Casos complexos
4. **Declare tudo**: Evite problemas

## Perspectivas 2024-2025

### Desenvolvimentos Esperados
- **Sandbox regulatório**: Testes de novos produtos
- **PIX crypto**: Integração com sistema bancário
- **CBDCs**: Real digital do Banco Central
- **Fundos de pensão**: Investimento em crypto

### Desafios Pendentes
- **DeFi regulation**: Como regular protocolos descentralizados
- **Cross-border**: Transações internacionais
- **Privacy coins**: Status de moedas privadas
- **NFTs**: Classificação e tributação

## Recomendações

### Para Investidores
1. **Escolha exchanges licenciadas**: Maior segurança
2. **Mantenha-se informado**: Mudanças constantes
3. **Organize documentação**: Facilita compliance
4. **Busque orientação**: Consultoria especializada

### Para Empresas
1. **Adeque-se às regras**: Evite problemas futuros
2. **Invista em compliance**: Fundamental para sobreviver
3. **Monitore mudanças**: Regulamentação evolui
4. **Participe do diálogo**: Consultas públicas

---

*A regulamentação crypto no Brasil está evoluindo rapidamente. Mantenha-se atualizado para aproveitar as oportunidades e evitar riscos.*`,
    category: 'Regulamentação',
    tags: ['Regulamentação', 'Brasil', 'Compliance', 'CVM', 'Lei'],
    author: MOCK_BLOG_AUTHORS[3],
    publishedAt: '2024-07-24T11:20:00Z',
    updatedAt: '2024-07-24T11:20:00Z',
    featuredImage: '/blog/regulamentacao-crypto-brasil.jpg',
    readTime: 10,
    metrics: {
      views: 18760,
      likes: 956,
      comments: 203,
      shares: 387
    },
    seo: {
      metaTitle: 'Regulamentação Crypto Brasil 2024: Guia Completo',
      metaDescription: 'Análise completa das mudanças na regulamentação de criptomoedas no Brasil em 2024, compliance e impactos.',
      keywords: ['regulamentação crypto brasil', 'cvm criptomoedas', 'lei criptomoedas', 'compliance crypto']
    }
  },

  // Continuando com mais posts...
  {
    id: 'post_005',
    title: 'Ethereum 2.0: Impactos do Upgrade na Performance',
    slug: 'ethereum-20-impactos-upgrade-performance',
    excerpt: 'Análise detalhada dos impactos do Ethereum 2.0 na performance da rede, taxas de transação e oportunidades de staking.',
    content: `# Ethereum 2.0: Impactos do Upgrade na Performance

O upgrade para Ethereum 2.0 trouxe mudanças fundamentais para a segunda maior blockchain do mundo. Vamos analisar os impactos e oportunidades.

## O que Mudou

### Proof of Stake
- **Consenso**: Substituição do Proof of Work
- **Energia**: Redução de 99,9% no consumo
- **Validadores**: 32 ETH mínimo para validação
- **Rewards**: 4-7% ao ano para stakers

### Melhorias de Performance
- **Throughput**: Capacidade de processamento aumentada
- **Finalidade**: Confirmações mais rápidas (12 segundos)
- **Sharding**: Preparação para expansão futura
- **MEV**: Melhor distribuição de value extraction

## Oportunidades de Staking

### Staking Solo
- **Requisitos**: 32 ETH + infraestrutura técnica
- **Returns**: 5-7% ao ano
- **Riscos**: Slashing por comportamento inadequado
- **Complexidade**: Alta

### Liquid Staking
- **Protocolos**: Lido, Rocket Pool, Coinbase
- **Tokens**: stETH, rETH, cbETH
- **Vantagens**: Liquidez mantida
- **Riscos**: Smart contract e slashing

### Staking Pools
- **Exchanges**: Binance, Coinbase, Kraken
- **Mínimo**: Sem valor mínimo
- **Facilidade**: Alta
- **Controle**: Menor

## Impactos no Mercado

### Pressão de Venda Reduzida
- **Issuance**: Menor emissão de novos ETH
- **Burn**: EIP-1559 queima ETH em transações
- **Supply shock**: Potencial escassez

### Desenvolvimento DeFi
- **Taxas menores**: Transações mais baratas (com Layer 2)
- **Novos produtos**: Staking derivatives
- **Composabilidade**: Maior inovação

---

*Ethereum 2.0 representa um marco na evolução das blockchains, criando novas oportunidades para investidores e desenvolvedores.*`,
    category: 'Análise',
    tags: ['Ethereum', 'ETH 2.0', 'Staking', 'Blockchain', 'Performance'],
    author: MOCK_BLOG_AUTHORS[4],
    publishedAt: '2024-07-22T09:15:00Z',
    updatedAt: '2024-07-22T09:15:00Z',
    featuredImage: '/blog/ethereum-2-upgrade.jpg',
    readTime: 8,
    metrics: {
      views: 14230,
      likes: 687,
      comments: 92,
      shares: 201
    },
    seo: {
      metaTitle: 'Ethereum 2.0: Análise Completa do Upgrade e Staking',
      metaDescription: 'Análise detalhada do Ethereum 2.0, impactos na performance, oportunidades de staking e mudanças no mercado.',
      keywords: ['ethereum 2.0', 'eth staking', 'proof of stake', 'ethereum upgrade']
    }
  }

  // Mais 25 posts seguiriam o mesmo padrão...
  // Por brevidade, incluindo apenas alguns exemplos representativos
];

// Categorias disponíveis
export const BLOG_CATEGORIES = [
  'Análise Técnica',
  'Tutorial',
  'DeFi',
  'Regulamentação',
  'Análise',
  'Notícias',
  'Educacional',
  'Mercado',
  'Tecnologia',
  'Entrevista'
];

// Tags mais populares
export const POPULAR_TAGS = [
  'Bitcoin',
  'Ethereum',
  'Análise Técnica',
  'DeFi',
  'Brasil',
  'Trading',
  'Investimento',
  'Segurança',
  'Tutorial',
  'Regulamentação',
  'Staking',
  'NFT',
  'Web3',
  'Blockchain',
  'Altcoins'
];

// Métricas do blog
export const BLOG_METRICS = {
  totalPosts: MOCK_BLOG_POSTS.length,
  totalViews: MOCK_BLOG_POSTS.reduce((sum, post) => sum + post.metrics.views, 0),
  totalLikes: MOCK_BLOG_POSTS.reduce((sum, post) => sum + post.metrics.likes, 0),
  totalComments: MOCK_BLOG_POSTS.reduce((sum, post) => sum + post.metrics.comments, 0),
  totalShares: MOCK_BLOG_POSTS.reduce((sum, post) => sum + post.metrics.shares, 0),
  averageReadTime: Math.round(
    MOCK_BLOG_POSTS.reduce((sum, post) => sum + post.readTime, 0) / MOCK_BLOG_POSTS.length
  ),
  
  // Métricas por categoria
  categoryMetrics: BLOG_CATEGORIES.map(category => ({
    category,
    count: MOCK_BLOG_POSTS.filter(post => post.category === category).length,
    views: MOCK_BLOG_POSTS
      .filter(post => post.category === category)
      .reduce((sum, post) => sum + post.metrics.views, 0)
  })),
  
  // Posts mais populares
  mostViewed: [...MOCK_BLOG_POSTS]
    .sort((a, b) => b.metrics.views - a.metrics.views)
    .slice(0, 5),
  
  mostLiked: [...MOCK_BLOG_POSTS]
    .sort((a, b) => b.metrics.likes - a.metrics.likes)
    .slice(0, 5),
  
  // Engajamento por autor
  authorMetrics: MOCK_BLOG_AUTHORS.map(author => {
    const authorPosts = MOCK_BLOG_POSTS.filter(post => post.author.id === author.id);
    return {
      ...author,
      postsCount: authorPosts.length,
      totalViews: authorPosts.reduce((sum, post) => sum + post.metrics.views, 0),
      totalLikes: authorPosts.reduce((sum, post) => sum + post.metrics.likes, 0),
      avgViews: Math.round(
        authorPosts.reduce((sum, post) => sum + post.metrics.views, 0) / (authorPosts.length || 1)
      )
    };
  })
};