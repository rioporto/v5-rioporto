// Micro-interações
export * from './interactions/HoverEffects';
export * from './interactions/FocusRings';
export * from './interactions/LoadingDots';
export * from './interactions/SuccessAnimation';

// Animações e transições
export * from './animations/PageTransitions';
export * from './animations/SkeletonLoading';

// Detalhes visuais
export * from './visual-details/Separators';
export * from './visual-details/MinimalistBadges';
export * from './visual-details/DiscreteTooltips';
export * from './visual-details/SubtleNotifications';

// Layout e performance
export * from './layout/LazyImage';
export * from './layout/PerformanceOptimizations';
export * from './layout/AccessibilityEnhancements';

// Tipos compartilhados
export interface MinimalistTheme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    neutral: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
  transitions: {
    fast: string;
    normal: string;
    slow: string;
  };
}

export interface MinimalistComponentProps {
  variant?: 'default' | 'minimal' | 'subtle';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  disabled?: boolean;
}

// Configurações padrão
export const minimalistDefaults = {
  transitions: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms'
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem'
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    full: '9999px'
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
  }
} as const;

// Utilitários do modelo minimalista
export const minimalistUtils = {
  // Combinar classes com defaults minimalistas
  cx: (...classes: (string | undefined | null | false)[]) => {
    return classes.filter(Boolean).join(' ');
  },
  
  // Aplicar estilo minimalista base
  applyMinimalistBase: (className?: string) => {
    return minimalistUtils.cx(
      'transition-colors duration-200 ease-out',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
      className
    );
  },
  
  // Verificar se é modo escuro
  isDarkMode: () => {
    if (typeof window === 'undefined') return false;
    return document.documentElement.classList.contains('dark');
  },
  
  // Aplicar variante minimalista
  getMinimalistVariant: (variant: 'default' | 'minimal' | 'subtle' = 'default') => {
    const variants = {
      default: 'bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700',
      minimal: 'bg-transparent border-0',
      subtle: 'bg-gray-50 border-0 dark:bg-gray-900'
    };
    return variants[variant];
  }
} as const;