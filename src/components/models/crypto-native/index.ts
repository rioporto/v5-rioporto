// Crypto Native Design System Components
// Futuristic glassmorphism design with neon accents and Gen Z appeal

// Core Components
export { CryptoButton } from './CryptoButton';
export { CryptoCard, CryptoCardHeader, CryptoCardTitle, CryptoCardContent, CryptoCardFooter } from './CryptoCard';
export { CryptoHeader, CryptoHeaderContent, CryptoHeaderBrand, CryptoHeaderNav, CryptoHeaderLink, CryptoHeaderActions } from './CryptoHeader';
export { CryptoGlassPanel, CryptoGlassContainer, CryptoGlassGrid, CryptoGlassStack, CryptoGlassFlex } from './CryptoGlassPanel';
export { CryptoInput, CryptoTextarea } from './CryptoInput';
export { CryptoModal, CryptoModalHeader, CryptoModalTitle, CryptoModalBody, CryptoModalFooter, CryptoConfirmModal } from './CryptoModal';
export { CryptoBadge } from './CryptoBadge';

// Advanced Interactive Elements - M3 Components
export * from './animations';
export * from './interactive';
export * from './particles';
export * from './ascii';
export * from './sounds';

// Visual Effects
export { GlowEffect, NeonText, GlowOrb, GlowTrail } from './effects/GlowEffect';
export { GlassmorphismBox, GlassCard, GlassNavigation, GlassPanel, GlassModal, FrostedGlass } from './effects/GlassmorphismBox';
export { HolographicShimmer, RainbowShimmer, HolographicBorder, IridescentText, ChromaticAberration, HologramProjection } from './effects/HolographicShimmer';
export { GradientBorder, AnimatedGradientBox, NeonBorder, PulsatingBorder, GlowingCard } from './effects/GradientBorder';
export { ParticlesBackground, FloatingElements, MatrixRain, StarField } from './effects/ParticlesBackground';

// Web3 Components
export { WalletCard, MultiWalletCard } from './web3/WalletCard';
export { NFTDisplay, NFTGrid } from './web3/NFTDisplay';
export { TokenBadge, TokenList } from './web3/TokenBadge';

// Type definitions for better development experience
export interface CryptoThemeConfig {
  colors: {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
    surface: string;
    accent: string;
    muted: string;
    success: string;
    error: string;
    warning: string;
    border: string;
  };
  fonts: {
    primary: string;
    mono: string;
    display: string;
  };
  effects: {
    blur: string;
    glow: {
      primary: string;
      accent: string;
      success: string;
      error: string;
      warning: string;
    };
    gradients: {
      primary: string;
      holographic: string;
      neon: string;
    };
  };
}

export interface GlowVariant {
  color: 'purple' | 'green' | 'blue' | 'pink' | 'yellow' | 'red' | 'white';
  intensity: 'low' | 'medium' | 'high' | 'extreme';
  animated?: boolean;
  pulse?: boolean;
}

export interface GlassVariant {
  variant: 'ultra-light' | 'light' | 'medium' | 'heavy' | 'opaque';
  blur: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  border?: boolean;
  borderGlow?: boolean;
  noise?: boolean;
  animated?: boolean;
}

export interface HolographicVariant {
  variant: 'subtle' | 'medium' | 'intense' | 'rainbow';
  speed: 'slow' | 'medium' | 'fast';
  direction: 'left' | 'right' | 'up' | 'down' | 'diagonal';
  trigger: 'hover' | 'always' | 'focus';
}

// Utility functions for crypto native theme
export const cryptoNativeUtils = {
  // Generate glassmorphism background
  getGlassBackground: (opacity: number = 0.05, blur: number = 20) => ({
    background: `rgba(255, 255, 255, ${opacity})`,
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    border: `1px solid rgba(255, 255, 255, ${opacity * 2})`
  }),

  // Generate neon glow effect
  getNeonGlow: (color: string, intensity: number = 0.5) => ({
    boxShadow: `0 0 20px rgba(${color}, ${intensity}), 0 0 40px rgba(${color}, ${intensity * 0.5})`
  }),

  // Generate holographic gradient
  getHolographicGradient: () => ({
    background: 'linear-gradient(45deg, #9945FF, #00FFA3, #FF6B9D, #4ECDC4)',
    backgroundSize: '400% 400%',
    animation: 'holographic 4s ease infinite'
  }),

  // Format crypto addresses
  formatAddress: (address: string, chars: number = 6) => 
    `${address.slice(0, chars)}...${address.slice(-4)}`,

  // Format crypto amounts
  formatCryptoAmount: (amount: number, decimals: number = 4) => 
    new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: decimals
    }).format(amount),

  // Format USD amounts
  formatUSDAmount: (amount: number) => 
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount),

  // Get rarity color
  getRarityColor: (rarity: string) => {
    const colors: Record<string, string> = {
      common: '#6B7280',
      uncommon: '#22C55E',
      rare: '#3B82F6',
      epic: '#9333EA',
      legendary: '#EAB308'
    };
    return colors[rarity.toLowerCase()] || colors.common;
  },

  // Get network color
  getNetworkColor: (network: string) => {
    const colors: Record<string, string> = {
      ethereum: '#627EEA',
      bitcoin: '#F7931A',
      polygon: '#8247E5',
      binance: '#F3BA2F',
      solana: '#00FFA3',
      avalanche: '#E84142',
      cardano: '#3468DC',
      polkadot: '#E6007A'
    };
    return colors[network.toLowerCase()] || '#9945FF';
  }
};

// Pre-configured theme variants
export const cryptoNativePresets = {
  card: {
    variant: 'glass' as const,
    blur: 'xl' as const,
    border: true,
    animated: true,
    glow: true
  },
  
  button: {
    variant: 'neon' as const,
    glow: true,
    animated: true,
    color: 'purple' as const
  },
  
  modal: {
    variant: 'glass' as const,
    backdrop: 'blur' as const,
    animated: true,
    size: 'md' as const
  },
  
  input: {
    variant: 'glass' as const,
    glow: true,
    animated: true
  },
  
  badge: {
    variant: 'holographic' as const,
    glow: true,
    animated: true,
    color: 'purple' as const
  }
};

// Animation presets
export const cryptoNativeAnimations = {
  fadeInUp: 'animate-[fadeInUp_0.5s_ease-out]',
  fadeInScale: 'animate-[fadeInScale_0.4s_ease-out]',
  slideInRight: 'animate-[slideInRight_0.4s_ease-out]',
  glowPulse: 'animate-[glowPulse_2s_ease-in-out_infinite_alternate]',
  holographic: 'animate-[holographic_4s_ease_infinite]',
  neonPulse: 'animate-[neonPulse_2s_ease-in-out_infinite_alternate]',
  float: 'animate-[float_3s_ease-in-out_infinite]',
  shimmer: 'animate-[shimmer_2s_ease-in-out_infinite]'
};

// CSS custom properties for easy theming
export const cryptoNativeCSSVariables = {
  '--crypto-primary': '#9945FF',
  '--crypto-accent': '#00FFA3',
  '--crypto-success': '#00FFA3',
  '--crypto-error': '#FF3366',
  '--crypto-warning': '#FFCC00',
  '--crypto-background': '#0D0D0D',
  '--crypto-foreground': '#FAFAFA',
  '--crypto-glass': 'rgba(255, 255, 255, 0.05)',
  '--crypto-border': 'rgba(255, 255, 255, 0.15)',
  '--crypto-glow-primary': '0 0 20px rgba(153, 69, 255, 0.5)',
  '--crypto-glow-accent': '0 0 20px rgba(0, 255, 163, 0.5)',
  '--crypto-blur': 'blur(20px)',
  '--crypto-radius': '0.75rem',
  '--crypto-transition': '300ms ease'
};

// Default export for convenience
export default {
  // Components
  CryptoButton,
  CryptoCard,
  CryptoHeader,
  CryptoGlassPanel,
  CryptoInput,
  CryptoModal,
  CryptoBadge,
  
  // Effects
  GlowEffect,
  GlassmorphismBox,
  HolographicShimmer,
  GradientBorder,
  ParticlesBackground,
  
  // Web3
  WalletCard,
  NFTDisplay,
  
  // Utils
  utils: cryptoNativeUtils,
  presets: cryptoNativePresets,
  animations: cryptoNativeAnimations,
  cssVariables: cryptoNativeCSSVariables
};