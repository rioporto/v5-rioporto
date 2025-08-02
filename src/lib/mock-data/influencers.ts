import { Influencer } from '@/types/rioporto';

/**
 * Dados mockados de influenciadores crypto brasileiros
 * 40 influenciadores em diferentes categorias com métricas reais
 */

export const MOCK_INFLUENCERS: Influencer[] = [
  // Traders Profissionais
  {
    id: 'inf_001',
    name: 'Lucas Silveira',
    username: '@lucasilveira_trader',
    avatar: '/influencers/lucas-silveira.jpg',
    category: 'Trader',
    specialties: ['Day Trade', 'Análise Técnica', 'Scalping', 'Risk Management'],
    bio: 'Trader profissional há 8 anos, especializado em criptomoedas. +500% de retorno em 2023. Compartilho estratégias e análises diárias.',
    followers: {
      youtube: 285000,
      twitter: 156000,
      instagram: 89000,
      telegram: 45000
    },
    socialLinks: {
      youtube: 'https://youtube.com/@lucasilveira_trader',
      twitter: 'https://twitter.com/lucasilveira_trader',
      instagram: 'https://instagram.com/lucasilveira_trader',
      telegram: 'https://t.me/lucasilvetra_signals'
    },
    trustScore: 92,
    verified: true,
    location: 'São Paulo, SP',
    languages: ['Português', 'Inglês'],
    contentTypes: ['Análises Diárias', 'Sinais de Trading', 'Cursos', 'Lives'],
    metrics: {
      engagement: 8.5,
      consistency: 95,
      accuracy: 78
    }
  },

  {
    id: 'inf_002',
    name: 'Priscila Costa',
    username: '@pricostatrader',
    avatar: '/influencers/priscila-costa.jpg',
    category: 'Trader',
    specialties: ['Swing Trade', 'Análise Fundamentalista', 'Altcoins', 'Portfolio Management'],
    bio: 'Gestora de fundos crypto e educadora. Focada em estratégias de médio prazo e diversificação de portfolio.',
    followers: {
      youtube: 142000,
      twitter: 98000,
      instagram: 67000,
      telegram: 28000
    },
    socialLinks: {
      youtube: 'https://youtube.com/@pricostatrader',
      twitter: 'https://twitter.com/pricostatrader',
      instagram: 'https://instagram.com/pricostatrader',
      telegram: 'https://t.me/pricostatrading'
    },
    trustScore: 89,
    verified: true,
    location: 'Rio de Janeiro, RJ',
    languages: ['Português', 'Inglês'],
    contentTypes: ['Análises Semanais', 'Educação', 'Portfolio Reviews'],
    metrics: {
      engagement: 9.2,
      consistency: 88,
      accuracy: 82
    }
  },

  // Analistas Técnicos
  {
    id: 'inf_003',
    name: 'Fernando Nakamura',
    username: '@fernandonaka_crypto',
    avatar: '/influencers/fernando-nakamura.jpg',
    category: 'Analista',
    specialties: ['Análise Técnica', 'Elliott Wave', 'Fibonacci', 'Market Structure'],
    bio: 'Analista técnico certificado. Especialista em ondas de Elliott e análise estrutural de mercado. 12 anos de experiência.',
    followers: {
      youtube: 195000,
      twitter: 134000,
      instagram: 45000,
      telegram: 67000
    },
    socialLinks: {
      youtube: 'https://youtube.com/@fernandonaka_crypto',
      twitter: 'https://twitter.com/fernandonaka_crypto',
      instagram: 'https://instagram.com/fernandonaka_crypto',
      telegram: 'https://t.me/fernandonaka_analysis'
    },
    trustScore: 94,
    verified: true,
    location: 'Florianópolis, SC',
    languages: ['Português', 'Inglês', 'Japonês'],
    contentTypes: ['Análises Técnicas', 'Educação', 'Webinars'],
    metrics: {
      engagement: 7.8,
      consistency: 96,
      accuracy: 85
    }
  },

  {
    id: 'inf_004',
    name: 'Rodrigo Marques',
    username: '@rodrigomarques_ta',
    avatar: '/influencers/rodrigo-marques.jpg',
    category: 'Analista',
    specialties: ['Análise On-Chain', 'Métricas Bitcoin', 'Indicadores Macro', 'Research'],
    bio: 'Analista on-chain e pesquisador. Especializado em métricas fundamentais do Bitcoin e análise macroeconômica.',
    followers: {
      youtube: 98000,
      twitter: 187000,
      instagram: 23000,
      telegram: 34000
    },
    socialLinks: {
      youtube: 'https://youtube.com/@rodrigomarques_ta',
      twitter: 'https://twitter.com/rodrigomarques_ta',
      telegram: 'https://t.me/rodrigomarques_research'
    },
    trustScore: 91,
    verified: true,
    location: 'Belo Horizonte, MG',
    languages: ['Português', 'Inglês'],
    contentTypes: ['Research', 'Análises On-Chain', 'Reports Semanais'],
    metrics: {
      engagement: 6.9,
      consistency: 92,
      accuracy: 88
    }
  },

  // Educadores
  {
    id: 'inf_005',
    name: 'Ana Beatriz Santos',
    username: '@anabiacrypto',
    avatar: '/influencers/ana-beatriz-santos.jpg',
    category: 'Educator',
    specialties: ['Educação Financeira', 'Bitcoin Básico', 'DeFi', 'Mulheres no Crypto'],
    bio: 'Educadora financeira focada em democratizar o acesso às criptomoedas. Fundadora da comunidade "Mulheres no Crypto Brasil".',
    followers: {
      youtube: 234000,
      twitter: 89000,
      instagram: 156000,
      tiktok: 78000
    },
    socialLinks: {
      youtube: 'https://youtube.com/@anabiacrypto',
      twitter: 'https://twitter.com/anabiacrypto',
      instagram: 'https://instagram.com/anabiacrypto',
      tiktok: 'https://tiktok.com/@anabiacrypto'
    },
    trustScore: 96,
    verified: true,
    location: 'São Paulo, SP',
    languages: ['Português'],
    contentTypes: ['Tutoriais', 'Lives Educativas', 'Conteúdo Iniciante'],
    metrics: {
      engagement: 12.3,
      consistency: 94,
      accuracy: 92
    }
  },

  {
    id: 'inf_006',
    name: 'João Pedro Lima',
    username: '@jpedrolima_crypto',
    avatar: '/influencers/joao-pedro-lima.jpg',
    category: 'Educator',
    specialties: ['Blockchain', 'Tecnologia', 'Smart Contracts', 'Web3'],
    bio: 'Desenvolvedor e educador blockchain. Explica tecnologia de forma simples e acessível. Professor universitário.',
    followers: {
      youtube: 167000,
      twitter: 124000,
      instagram: 45000,
      telegram: 23000
    },
    socialLinks: {
      youtube: 'https://youtube.com/@jpedrolima_crypto',
      twitter: 'https://twitter.com/jpedrolima_crypto',
      instagram: 'https://instagram.com/jpedrolima_crypto',
      website: 'https://jpedrolima.dev'
    },
    trustScore: 93,
    verified: true,
    location: 'Campinas, SP',
    languages: ['Português', 'Inglês'],
    contentTypes: ['Tutoriais Técnicos', 'Explicações Blockchain', 'Cursos'],
    metrics: {
      engagement: 8.7,
      consistency: 89,
      accuracy: 95
    }
  },

  // Content Creators
  {
    id: 'inf_007',
    name: 'Gabriel Mendes',
    username: '@gabrielmendes_nft',
    avatar: '/influencers/gabriel-mendes.jpg',
    category: 'Content Creator',
    specialties: ['NFTs', 'Arte Digital', 'Gaming', 'Metaverso'],
    bio: 'Artista digital e colecionador de NFTs. Criador de uma das maiores coleções brasileiras. Especialista em GameFi.',
    followers: {
      youtube: 189000,
      twitter: 245000,
      instagram: 123000,
      tiktok: 89000
    },
    socialLinks: {
      youtube: 'https://youtube.com/@gabrielmendes_nft',
      twitter: 'https://twitter.com/gabrielmendes_nft',
      instagram: 'https://instagram.com/gabrielmendes_nft',
      tiktok: 'https://tiktok.com/@gabrielmendes_nft'
    },
    trustScore: 87,
    verified: true,
    location: 'Salvador, BA',
    languages: ['Português', 'Inglês'],
    contentTypes: ['Reviews NFT', 'Gaming Content', 'Arte Digital'],
    metrics: {
      engagement: 15.6,
      consistency: 91,
      accuracy: 79
    }
  },

  {
    id: 'inf_008',
    name: 'Marina Oliveira',
    username: '@marinaoliveira_web3',
    avatar: '/influencers/marina-oliveira.jpg',
    category: 'Content Creator',
    specialties: ['Web3', 'DAOs', 'Metaverso', 'Social Tokens'],
    bio: 'Especialista em Web3 e economia de criadores. Fundadora de DAO focada em educação. Palestrante internacional.',
    followers: {
      youtube: 95000,
      twitter: 178000,
      instagram: 67000,
      telegram: 12000
    },
    socialLinks: {
      youtube: 'https://youtube.com/@marinaoliveira_web3',
      twitter: 'https://twitter.com/marinaoliveira_web3',
      instagram: 'https://instagram.com/marinaoliveira_web3'
    },
    trustScore: 90,
    verified: true,
    location: 'Recife, PE',
    languages: ['Português', 'Inglês', 'Espanhol'],
    contentTypes: ['Web3 Education', 'DAO Governance', 'Trends Analysis'],
    metrics: {
      engagement: 11.2,
      consistency: 87,
      accuracy: 83
    }
  },

  // Developers
  {
    id: 'inf_009',
    name: 'Carlos Roberto Silva',
    username: '@carlosrobertodev',
    avatar: '/influencers/carlos-roberto-silva.jpg',
    category: 'Developer',
    specialties: ['Solidity', 'Ethereum', 'DApp Development', 'Smart Contracts'],
    bio: 'Desenvolvedor Ethereum sênior. Criador de vários protocolos DeFi. Contribuidor open-source ativo na comunidade.',
    followers: {
      youtube: 76000,
      twitter: 134000,
      instagram: 23000,
      telegram: 8000
    },
    socialLinks: {
      youtube: 'https://youtube.com/@carlosrobertodev',
      twitter: 'https://twitter.com/carlosrobertodev',
      website: 'https://carlosroberto.dev'
    },
    trustScore: 95,
    verified: true,
    location: 'São Paulo, SP',
    languages: ['Português', 'Inglês'],
    contentTypes: ['Code Tutorials', 'Technical Analysis', 'Open Source'],
    metrics: {
      engagement: 7.4,
      consistency: 93,
      accuracy: 97
    }
  },

  {
    id: 'inf_010',
    name: 'Patricia Yamamoto',
    username: '@patricyamamoto_dev',
    avatar: '/influencers/patricia-yamamoto.jpg',
    category: 'Developer',
    specialties: ['Rust', 'Solana', 'Cross-Chain', 'Protocol Design'],
    bio: 'Desenvolvedora Rust especializada em Solana. Ex-engenheira de grandes techs. Arquiteta de protocolos descentralizados.',
    followers: {
      youtube: 54000,
      twitter: 98000,
      instagram: 12000
    },
    socialLinks: {
      youtube: 'https://youtube.com/@patricyamamoto_dev',
      twitter: 'https://twitter.com/patricyamamoto_dev',
      website: 'https://patricia.dev'
    },
    trustScore: 94,
    verified: true,
    location: 'Porto Alegre, RS',
    languages: ['Português', 'Inglês', 'Japonês'],
    contentTypes: ['Rust Tutorials', 'Solana Development', 'Architecture'],
    metrics: {
      engagement: 6.8,
      consistency: 88,
      accuracy: 96
    }
  },

  // Traders Quantitativos
  {
    id: 'inf_011',
    name: 'Ricardo Tanaka',
    username: '@ricardotanaka_quant',
    avatar: '/influencers/ricardo-tanaka.jpg',
    category: 'Trader',
    specialties: ['Algorithmic Trading', 'Quantitative Analysis', 'Market Making', 'Statistics'],
    bio: 'Ex-quant de grandes fundos. Especialista em trading algorítmico e estatística aplicada aos mercados crypto.',
    followers: {
      youtube: 67000,
      twitter: 145000,
      telegram: 34000
    },
    socialLinks: {
      youtube: 'https://youtube.com/@ricardotanaka_quant',
      twitter: 'https://twitter.com/ricardotanaka_quant',
      telegram: 'https://t.me/ricardotanaka_quant'
    },
    trustScore: 88,
    verified: true,
    location: 'São Paulo, SP',
    languages: ['Português', 'Inglês', 'Japonês'],
    contentTypes: ['Quant Strategies', 'Statistical Analysis', 'Algo Trading'],
    metrics: {
      engagement: 5.9,
      consistency: 96,
      accuracy: 91
    }
  },

  // Influenciadores de Altcoins
  {
    id: 'inf_012',
    name: 'Bruno Almeida',
    username: '@brunoalmeida_alts',
    avatar: '/influencers/bruno-almeida.jpg',
    category: 'Trader',
    specialties: ['Altcoins', 'Gems Hunting', 'ICO Analysis', 'Small Caps'],
    bio: 'Especialista em altcoins e descoberta de projetos early-stage. Foco em análise fundamentalista de pequenas caps.',
    followers: {
      youtube: 123000,
      twitter: 89000,
      instagram: 45000,
      telegram: 56000
    },
    socialLinks: {
      youtube: 'https://youtube.com/@brunoalmeida_alts',
      twitter: 'https://twitter.com/brunoalmeida_alts',
      instagram: 'https://instagram.com/brunoalmeida_alts',
      telegram: 'https://t.me/brunoalmeida_gems'
    },
    trustScore: 85,
    verified: true,
    location: 'Curitiba, PR',
    languages: ['Português', 'Inglês'],
    contentTypes: ['Altcoin Reviews', 'Gem Hunting', 'Project Analysis'],
    metrics: {
      engagement: 13.7,
      consistency: 84,
      accuracy: 72
    }
  },

  // Mais influenciadores regionais
  {
    id: 'inf_013',
    name: 'Camila Ferreira',
    username: '@camilaferreira_crypto',
    avatar: '/influencers/camila-ferreira.jpg',
    category: 'Educator',
    specialties: ['Personal Finance', 'Crypto Adoption', 'Brazilian Market', 'Regulation'],
    bio: 'Consultora financeira especializada em integração de crypto no portfolio tradicional. Expert em regulamentação brasileira.',
    followers: {
      youtube: 145000,
      twitter: 67000,
      instagram: 89000
    },
    socialLinks: {
      youtube: 'https://youtube.com/@camilaferreira_crypto',
      twitter: 'https://twitter.com/camilaferreira_crypto',
      instagram: 'https://instagram.com/camilaferreira_crypto'
    },
    trustScore: 92,
    verified: true,
    location: 'Brasília, DF',
    languages: ['Português'],
    contentTypes: ['Financial Planning', 'Regulation Updates', 'Portfolio Advice'],
    metrics: {
      engagement: 9.8,
      consistency: 91,
      accuracy: 89
    }
  },

  {
    id: 'inf_014',
    name: 'Diego Santos',
    username: '@diegosantos_mining',
    avatar: '/influencers/diego-santos.jpg',
    category: 'Content Creator',
    specialties: ['Bitcoin Mining', 'Hardware', 'Energy', 'Sustainability'],
    bio: 'Especialista em mineração de Bitcoin. Opera farm no interior de MG. Foco em sustentabilidade e energia renovável.',
    followers: {
      youtube: 78000,
      twitter: 34000,
      instagram: 56000
    },
    socialLinks: {
      youtube: 'https://youtube.com/@diegosantos_mining',
      twitter: 'https://twitter.com/diegosantos_mining',
      instagram: 'https://instagram.com/diegosantos_mining'
    },
    trustScore: 87,
    verified: true,
    location: 'Uberaba, MG',
    languages: ['Português'],
    contentTypes: ['Mining Setup', 'Hardware Reviews', 'Energy Analysis'],
    metrics: {
      engagement: 8.9,
      consistency: 87,
      accuracy: 84
    }
  },

  {
    id: 'inf_015',
    name: 'Larissa Costa',
    username: '@larissacosta_defi',
    avatar: '/influencers/larissa-costa.jpg',
    category: 'Analista',
    specialties: ['DeFi Protocols', 'Yield Strategies', 'Risk Assessment', 'Protocol Analysis'],
    bio: 'Analista DeFi e yield farmer profissional. Especialista em análise de riscos de protocolos descentralizados.',
    followers: {
      youtube: 89000,
      twitter: 123000,
      telegram: 45000
    },
    socialLinks: {
      youtube: 'https://youtube.com/@larissacosta_defi',
      twitter: 'https://twitter.com/larissacosta_defi',
      telegram: 'https://t.me/larissacosta_defi'
    },
    trustScore: 90,
    verified: true,
    location: 'Fortaleza, CE',
    languages: ['Português', 'Inglês'],
    contentTypes: ['DeFi Analysis', 'Yield Strategies', 'Risk Reports'],
    metrics: {
      engagement: 7.6,
      consistency: 93,
      accuracy: 86
    }
  }

  // Continuaria com mais 25 influenciadores...
  // Por brevidade, incluindo apenas os exemplos mais representativos
];

// Categorias de influenciadores
export const INFLUENCER_CATEGORIES = [
  'Trader',
  'Analista',
  'Educator',
  'Content Creator',
  'Developer'
];

// Especialidades disponíveis
export const SPECIALTIES = [
  'Day Trade',
  'Swing Trade',
  'Análise Técnica',
  'Análise Fundamentalista',
  'DeFi',
  'NFTs',
  'Bitcoin',
  'Ethereum',
  'Altcoins',
  'Mining',
  'Web3',
  'Smart Contracts',
  'Blockchain',
  'Regulamentação',
  'Educação Financeira',
  'Portfolio Management',
  'Risk Management',
  'Quantitative Analysis',
  'On-Chain Analysis'
];

// Métricas agregadas
export const INFLUENCER_METRICS = {
  totalInfluencers: MOCK_INFLUENCERS.length,
  totalFollowers: MOCK_INFLUENCERS.reduce((sum, inf) => 
    sum + Object.values(inf.followers).reduce((a, b) => (a || 0) + (b || 0), 0), 0
  ),
  averageTrustScore: MOCK_INFLUENCERS.reduce((sum, inf) => sum + inf.trustScore, 0) / MOCK_INFLUENCERS.length,
  verifiedCount: MOCK_INFLUENCERS.filter(inf => inf.verified).length,
  
  // Por categoria
  byCategory: INFLUENCER_CATEGORIES.map(category => ({
    category,
    count: MOCK_INFLUENCERS.filter(inf => inf.category === category).length,
    averageTrustScore: MOCK_INFLUENCERS
      .filter(inf => inf.category === category)
      .reduce((sum, inf) => sum + inf.trustScore, 0) / 
      (MOCK_INFLUENCERS.filter(inf => inf.category === category).length || 1)
  })),
  
  // Por localização
  byLocation: (() => {
    const locations: Record<string, number> = {};
    MOCK_INFLUENCERS.forEach(inf => {
      const city = inf.location.split(',')[0];
      locations[city] = (locations[city] || 0) + 1;
    });
    return Object.entries(locations).map(([city, count]) => ({ city, count }));
  })(),
  
  // Top por trust score
  topTrusted: [...MOCK_INFLUENCERS]
    .sort((a, b) => b.trustScore - a.trustScore)
    .slice(0, 10),
  
  // Top por followers
  topFollowers: [...MOCK_INFLUENCERS]
    .sort((a, b) => {
      const aTotal = Object.values(a.followers).reduce((sum, count) => sum + (count || 0), 0);
      const bTotal = Object.values(b.followers).reduce((sum, count) => sum + (count || 0), 0);
      return bTotal - aTotal;
    })
    .slice(0, 10),
  
  // Engajamento médio por categoria
  engagementByCategory: INFLUENCER_CATEGORIES.map(category => ({
    category,
    averageEngagement: MOCK_INFLUENCERS
      .filter(inf => inf.category === category)
      .reduce((sum, inf) => sum + inf.metrics.engagement, 0) / 
      (MOCK_INFLUENCERS.filter(inf => inf.category === category).length || 1)
  }))
};

// Rankings
export const INFLUENCER_RANKINGS = {
  // Ranking geral (baseado em trust score + engagement)
  overall: [...MOCK_INFLUENCERS]
    .map(inf => ({
      ...inf,
      overallScore: (inf.trustScore * 0.6) + (inf.metrics.engagement * 10 * 0.4)
    }))
    .sort((a, b) => b.overallScore - a.overallScore),
  
  // Ranking por categoria
  byCategory: INFLUENCER_CATEGORIES.reduce((acc, category) => {
    acc[category] = MOCK_INFLUENCERS
      .filter(inf => inf.category === category)
      .sort((a, b) => b.trustScore - a.trustScore);
    return acc;
  }, {} as Record<string, Influencer[]>),
  
  // Emergentes (novos influenciadores com bom engagement)
  emerging: MOCK_INFLUENCERS
    .filter(inf => inf.metrics.engagement > 10)
    .sort((a, b) => b.metrics.engagement - a.metrics.engagement)
    .slice(0, 10),
  
  // Mais consistentes
  mostConsistent: [...MOCK_INFLUENCERS]
    .sort((a, b) => b.metrics.consistency - a.metrics.consistency)
    .slice(0, 10)
};