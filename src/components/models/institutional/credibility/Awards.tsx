import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Award, Trophy, Star, Medal } from 'lucide-react';

export interface AwardItem {
  title: string;
  organization: string;
  year: string;
  category: string;
  description: string;
  logo?: string;
  level: 'international' | 'national' | 'regional';
}

interface AwardsProps {
  awards?: AwardItem[];
  showAll?: boolean;
  variant?: 'grid' | 'carousel' | 'timeline';
}

const defaultAwards: AwardItem[] = [
  {
    title: 'Fintech do Ano',
    organization: 'Prêmio ABFintech',
    year: '2023',
    category: 'P2P Trading',
    description: 'Reconhecimento pela inovação em plataformas P2P no Brasil',
    level: 'national'
  },
  {
    title: 'Best P2P Platform',
    organization: 'Crypto Awards Global',
    year: '2023',
    category: 'Innovation',
    description: 'Melhor plataforma P2P da América Latina',
    level: 'international'
  },
  {
    title: 'Top 50 Fintechs',
    organization: 'Forbes Brasil',
    year: '2023',
    category: 'Ranking',
    description: 'Entre as 50 fintechs mais promissoras do país',
    level: 'national'
  },
  {
    title: 'Excellence in Security',
    organization: 'Cybersecurity Awards',
    year: '2023',
    category: 'Security',
    description: 'Reconhecimento pelos padrões de segurança implementados',
    level: 'international'
  },
  {
    title: 'Great Place to Work',
    organization: 'GPTW Brasil',
    year: '2023',
    category: 'Culture',
    description: 'Certificação como uma das melhores empresas para trabalhar',
    level: 'national'
  },
  {
    title: 'Startup de Impacto',
    organization: 'Prêmio Endeavor',
    year: '2022',
    category: 'Impact',
    description: 'Reconhecimento pelo impacto social e econômico',
    level: 'national'
  }
];

const getIconByCategory = (category: string) => {
  switch (category.toLowerCase()) {
    case 'innovation':
    case 'inovação':
      return Star;
    case 'security':
    case 'segurança':
      return Shield;
    case 'culture':
    case 'cultura':
      return Award;
    default:
      return Trophy;
  }
};

const getLevelColor = (level: string) => {
  switch (level) {
    case 'international':
      return 'text-purple-600 border-purple-200 bg-purple-50 dark:bg-purple-900/20';
    case 'national':
      return 'text-blue-600 border-blue-200 bg-blue-50 dark:bg-blue-900/20';
    case 'regional':
      return 'text-green-600 border-green-200 bg-green-50 dark:bg-green-900/20';
    default:
      return 'text-slate-600 border-slate-200 bg-slate-50 dark:bg-slate-900/20';
  }
};

export function Awards({ 
  awards = defaultAwards, 
  showAll = false, 
  variant = 'grid' 
}: AwardsProps) {
  const displayAwards = showAll ? awards : awards.slice(0, 4);

  if (variant === 'timeline') {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Prêmios & Reconhecimentos
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Principais premiações recebidas pela RioPorto
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-700"></div>
          
          {displayAwards.map((award, index) => {
            const IconComponent = getIconByCategory(award.category);
            return (
              <div key={index} className="relative flex items-start mb-8">
                <div className="w-16 h-16 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center mr-6 z-10">
                  <IconComponent className="w-6 h-6 text-yellow-600" />
                </div>
                
                <Card className="flex-1 p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                        {award.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300">
                        {award.organization}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge className={getLevelColor(award.level)}>
                        {award.level === 'international' ? 'Internacional' : 
                         award.level === 'national' ? 'Nacional' : 'Regional'}
                      </Badge>
                      <div className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
                        {award.year}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 dark:text-slate-300 mb-3">
                    {award.description}
                  </p>
                  
                  <Badge variant="secondary">
                    {award.category}
                  </Badge>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          Prêmios & Reconhecimentos
        </h2>
        <p className="text-xl text-slate-600 dark:text-slate-300">
          Reconhecimento internacional pela excelência e inovação
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayAwards.map((award, index) => {
          const IconComponent = getIconByCategory(award.category);
          return (
            <Card key={index} className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                  <IconComponent className="w-6 h-6 text-yellow-600" />
                </div>
                <Badge className={getLevelColor(award.level)}>
                  {award.level === 'international' ? 'Internacional' : 
                   award.level === 'national' ? 'Nacional' : 'Regional'}
                </Badge>
              </div>
              
              <div className="text-center mb-4">
                <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                  {award.year}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {award.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 font-medium">
                  {award.organization}
                </p>
              </div>
              
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 text-center">
                {award.description}
              </p>
              
              <Badge variant="secondary" className="w-full justify-center">
                {award.category}
              </Badge>
            </Card>
          );
        })}
      </div>

      {!showAll && awards.length > 4 && (
        <div className="text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Ver Todos os Prêmios ({awards.length})
          </button>
        </div>
      )}
    </div>
  );
}