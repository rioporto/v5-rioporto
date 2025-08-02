/**
 * Dynamic Theme System for RioPorto P2P
 * Supports 5 different UI models with subdomain detection
 */

export type ThemeModel = 'minimalist' | 'financial' | 'crypto-native' | 'institutional' | 'gaming';

export interface ThemeConfig {
  name: string;
  description: string;
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
    input: string;
    ring: string;
    card: string;
    cardForeground: string;
    popover: string;
    popoverForeground: string;
    destructive: string;
    destructiveForeground: string;
  };
  fonts: {
    primary: string;
    mono: string;
    display: string;
  };
  borderRadius: string;
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

/**
 * Theme configurations for all 5 models
 */
export const THEME_CONFIGS: Record<ThemeModel, ThemeConfig> = {
  minimalist: {
    name: 'Minimalist',
    description: 'Clean, simple design with focus on content and breathing space',
    colors: {
      // Light mode as primary
      background: 'hsl(0 0% 100%)',        // Pure white
      foreground: 'hsl(0 0% 0%)',          // Pure black
      primary: 'hsl(51 100% 50%)',         // Gold #FFD700
      secondary: 'hsl(0 0% 97%)',          // Light surface #F8F8F8
      surface: 'hsl(0 0% 97%)',            // Light surface #F8F8F8
      accent: 'hsl(51 100% 50%)',          // Gold accent
      muted: 'hsl(0 0% 45%)',              // Muted text
      success: 'hsl(142 76% 36%)',         // Green
      error: 'hsl(0 72% 51%)',             // Red
      warning: 'hsl(43 96% 56%)',          // Amber
      border: 'hsl(0 0% 90%)',             // Light border
      input: 'hsl(0 0% 97%)',              // Input background
      ring: 'hsl(51 100% 50%)',            // Focus ring gold
      card: 'hsl(0 0% 100%)',              // Card background
      cardForeground: 'hsl(0 0% 0%)',      // Card text
      popover: 'hsl(0 0% 100%)',           // Popover background
      popoverForeground: 'hsl(0 0% 0%)',   // Popover text
      destructive: 'hsl(0 72% 51%)',       // Destructive red
      destructiveForeground: 'hsl(0 0% 100%)', // White text on red
    },
    fonts: {
      primary: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: 'JetBrains Mono, "SF Mono", Monaco, Inconsolata, "Roboto Mono", Consolas, monospace',
      display: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    borderRadius: '0.5rem',
    shadows: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.03)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.05)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.08)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
    },
  },
  financial: {
    name: 'Financial',
    description: 'Professional trading dashboard with Bloomberg-style interface',
    colors: {
      // Dark mode obrigatório - Professional Trading Colors
      background: 'hsl(0 0% 4%)',           // #0A0A0A - Ultra dark
      foreground: 'hsl(0 0% 98%)',          // #FAFAFA - Pure white text
      primary: 'hsl(220 100% 50%)',         // #0066FF - Financial Blue
      secondary: 'hsl(0 0% 10%)',           // #1A1A1A - Dark surface
      surface: 'hsl(0 0% 10%)',             // #1A1A1A - Card surfaces
      accent: 'hsl(220 100% 50%)',          // #0066FF - Blue accent
      muted: 'hsl(0 0% 15%)',               // #262626 - Muted backgrounds
      success: 'hsl(120 100% 40%)',         // #00D632 - Profit Green
      error: 'hsl(0 100% 50%)',             // #FF0000 - Loss Red
      warning: 'hsl(45 100% 50%)',          // #FFCC00 - Warning Amber
      border: 'hsl(0 0% 20%)',              // #333333 - Subtle borders
      input: 'hsl(0 0% 8%)',                // #141414 - Input backgrounds
      ring: 'hsl(220 100% 50%)',            // #0066FF - Focus rings
      card: 'hsl(0 0% 6%)',                 // #0F0F0F - Card backgrounds
      cardForeground: 'hsl(0 0% 98%)',      // #FAFAFA - Card text
      popover: 'hsl(0 0% 4%)',              // #0A0A0A - Popover backgrounds
      popoverForeground: 'hsl(0 0% 98%)',   // #FAFAFA - Popover text
      destructive: 'hsl(0 100% 50%)',       // #FF0000 - Destructive red
      destructiveForeground: 'hsl(0 0% 98%)', // #FAFAFA - White on red
    },
    fonts: {
      primary: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: 'Roboto Mono, "SF Mono", Monaco, Inconsolata, Consolas, monospace',
      display: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    borderRadius: '0.125rem', // Minimal radius for professional look
    shadows: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
      md: '0 2px 8px 0 rgb(0 0 0 / 0.4)',
      lg: '0 4px 16px 0 rgb(0 0 0 / 0.5)',
      xl: '0 8px 32px 0 rgb(0 0 0 / 0.6)',
    },
  },
  'crypto-native': {
    name: 'Crypto Native',
    description: 'Futuristic glassmorphism design with neon accents and Gen Z appeal',
    colors: {
      // Ultra dark background with purple tint
      background: 'hsl(0 0% 5%)',              // #0D0D0D - Pure black base
      foreground: 'hsl(0 0% 98%)',             // #FAFAFA - Pure white text
      primary: 'hsl(270 100% 67%)',            // #9945FF - Neon Purple
      secondary: 'rgba(255, 255, 255, 0.05)', // Glassmorphism surface
      surface: 'rgba(255, 255, 255, 0.05)',   // Glass panels
      accent: 'hsl(158 100% 52%)',             // #00FFA3 - Neon Green
      muted: 'rgba(255, 255, 255, 0.08)',     // Subtle glass
      success: 'hsl(158 100% 52%)',            // #00FFA3 - Neon Green
      error: 'hsl(0 100% 60%)',               // #FF3366 - Neon Red
      warning: 'hsl(45 100% 50%)',            // #FFCC00 - Neon Yellow
      border: 'rgba(255, 255, 255, 0.15)',    // Glass borders
      input: 'rgba(255, 255, 255, 0.05)',     // Glass inputs
      ring: 'hsl(270 100% 67%)',              // #9945FF - Purple focus
      card: 'rgba(255, 255, 255, 0.03)',      // Ultra subtle glass
      cardForeground: 'hsl(0 0% 98%)',        // Pure white text
      popover: 'rgba(0, 0, 0, 0.8)',          // Dark glass popover
      popoverForeground: 'hsl(0 0% 98%)',     // White popover text
      destructive: 'hsl(0 75% 55%)',          // Destructive red
      destructiveForeground: 'hsl(0 0% 98%)', // White on red
    },
    fonts: {
      primary: 'Space Grotesk, -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
      mono: 'Fira Code, "SF Mono", Monaco, Inconsolata, "Roboto Mono", Consolas, monospace',
      display: 'Orbitron, "Space Grotesk", system-ui, sans-serif',
    },
    borderRadius: '0.75rem', // More rounded for modern look
    shadows: {
      sm: '0 0 20px rgba(153, 69, 255, 0.2), 0 0 40px rgba(0, 255, 163, 0.1)',
      md: '0 0 40px rgba(153, 69, 255, 0.3), 0 0 80px rgba(0, 255, 163, 0.15)',
      lg: '0 0 60px rgba(153, 69, 255, 0.4), 0 0 120px rgba(0, 255, 163, 0.2)',
      xl: '0 0 80px rgba(153, 69, 255, 0.5), 0 0 160px rgba(0, 255, 163, 0.25)',
    },
  },
  institutional: {
    name: 'Institutional',
    description: 'Professional corporate design with traditional hierarchy and trust elements',
    colors: {
      // Light mode - Professional corporate palette
      background: 'hsl(0 0% 96%)',              // #F5F5F5 - Light corporate gray
      foreground: 'hsl(210 25% 18%)',           // #2B3544 - Dark navy text
      primary: 'hsl(210 100% 20%)',             // #003366 - Navy blue
      secondary: 'hsl(210 100% 40%)',           // #0066CC - Bright blue
      surface: 'hsl(0 0% 100%)',                // #FFFFFF - Pure white cards
      accent: 'hsl(210 100% 40%)',              // #0066CC - Blue accent
      muted: 'hsl(210 10% 88%)',                // #DFDFDF - Muted backgrounds
      success: 'hsl(145 60% 35%)',              // #1E7A3E - Corporate green
      error: 'hsl(5 70% 45%)',                  // #C73E1D - Professional red
      warning: 'hsl(43 85% 50%)',               // #F5A623 - Professional amber
      border: 'hsl(210 15% 85%)',               // #D5D8DC - Subtle borders
      input: 'hsl(0 0% 100%)',                  // #FFFFFF - White inputs
      ring: 'hsl(210 100% 40%)',                // #0066CC - Focus blue
      card: 'hsl(0 0% 100%)',                   // #FFFFFF - White cards
      cardForeground: 'hsl(210 25% 18%)',       // #2B3544 - Dark navy text
      popover: 'hsl(0 0% 100%)',                // #FFFFFF - White popover
      popoverForeground: 'hsl(210 25% 18%)',    // #2B3544 - Dark text
      destructive: 'hsl(5 70% 45%)',            // #C73E1D - Professional red
      destructiveForeground: 'hsl(0 0% 100%)',  // #FFFFFF - White on red
    },
    fonts: {
      primary: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
      mono: 'Consolas, "Courier New", monospace',
      display: 'Merriweather, Georgia, "Times New Roman", serif',
    },
    borderRadius: '0.25rem', // Conservative rounded corners
    shadows: {
      sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px 0 rgb(0 0 0 / 0.06)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -1px rgb(0 0 0 / 0.06)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)',
    },
  },
  gaming: {
    name: 'Gaming',
    description: 'HUD-style gaming interface with neon pink, cyan and dark aesthetics',
    colors: {
      // Ultra dark gaming background
      background: 'hsl(0 0% 4%)',                   // #0A0A0A - Pure black gaming
      foreground: 'hsl(0 0% 98%)',                  // #FAFAFA - Pure white text
      primary: 'hsl(330 100% 54%)',                 // #FF006E - Neon Pink
      secondary: 'hsl(0 0% 10%)',                   // #1A1A1A - Dark surfaces with neon borders
      surface: 'hsl(0 0% 10%)',                     // #1A1A1A - HUD panels
      accent: 'hsl(195 100% 50%)',                  // #00F5FF - Neon Cyan
      muted: 'hsl(0 0% 15%)',                       // #262626 - Muted backgrounds
      success: 'hsl(120 100% 50%)',                 // #00FF00 - Neon Green success
      error: 'hsl(0 100% 60%)',                     // #FF3333 - Neon Red error
      warning: 'hsl(60 100% 50%)',                  // #FFFF00 - Neon Yellow warning
      border: 'rgba(255, 0, 110, 0.5)',            // Neon pink borders with transparency
      input: 'hsl(0 0% 8%)',                        // #141414 - Dark input backgrounds
      ring: 'hsl(330 100% 54%)',                    // #FF006E - Neon pink focus
      card: 'hsl(0 0% 6%)',                         // #0F0F0F - Card backgrounds
      cardForeground: 'hsl(0 0% 98%)',              // #FAFAFA - Card text
      popover: 'hsl(0 0% 4%)',                      // #0A0A0A - Popover backgrounds
      popoverForeground: 'hsl(0 0% 98%)',           // #FAFAFA - Popover text
      destructive: 'hsl(0 100% 60%)',               // #FF3333 - Destructive neon red
      destructiveForeground: 'hsl(0 0% 98%)',       // #FAFAFA - White on red
    },
    fonts: {
      primary: 'Russo One, "Orbitron", "Audiowide", system-ui, sans-serif',
      mono: 'Share Tech Mono, "Orbitron", monospace',
      display: 'Russo One, "Orbitron", "Audiowide", system-ui, sans-serif',
    },
    borderRadius: '0.5rem', // Sharp corners for cyber aesthetic
    shadows: {
      sm: '0 0 20px rgba(255, 0, 110, 0.3), inset 0 0 10px rgba(0, 245, 255, 0.1)',
      md: '0 0 40px rgba(255, 0, 110, 0.4), inset 0 0 20px rgba(0, 245, 255, 0.15)',
      lg: '0 0 60px rgba(255, 0, 110, 0.5), inset 0 0 30px rgba(0, 245, 255, 0.2)',
      xl: '0 0 80px rgba(255, 0, 110, 0.6), inset 0 0 40px rgba(0, 245, 255, 0.25)',
    },
  },
};

/**
 * Detects theme model from subdomain or returns default
 * v1.rioporto.com -> minimalist
 * v2.rioporto.com -> financial
 * v3.rioporto.com -> crypto-native
 * v4.rioporto.com -> institutional
 * v5.rioporto.com -> gaming
 */
export function detectThemeFromSubdomain(): ThemeModel {
  if (typeof window === 'undefined') return 'minimalist';
  
  const hostname = window.location.hostname;
  const subdomainMatch = hostname.match(/^v(\d+)\./);
  
  if (subdomainMatch) {
    const version = parseInt(subdomainMatch[1]);
    switch (version) {
      case 1: return 'minimalist';
      case 2: return 'financial';
      case 3: return 'crypto-native';
      case 4: return 'institutional';
      case 5: return 'gaming';
      default: return 'minimalist';
    }
  }
  
  return 'minimalist';
}

/**
 * Applies theme CSS variables to document root
 */
export function applyTheme(model: ThemeModel): void {
  const theme = THEME_CONFIGS[model];
  const root = document.documentElement;
  
  // Apply color variables
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });
  
  // Apply font variables
  root.style.setProperty('--font-primary', theme.fonts.primary);
  root.style.setProperty('--font-mono', theme.fonts.mono);
  root.style.setProperty('--font-display', theme.fonts.display);
  
  // Apply border radius
  root.style.setProperty('--radius', theme.borderRadius);
  
  // Apply shadow variables
  Object.entries(theme.shadows).forEach(([key, value]) => {
    root.style.setProperty(`--shadow-${key}`, value);
  });
  
  // Add theme class to body
  document.body.className = document.body.className.replace(/theme-\w+/g, '');
  document.body.classList.add(`theme-${model}`);
}

/**
 * Gets saved theme from localStorage or detects from subdomain
 */
export function getSavedTheme(): ThemeModel {
  if (typeof window === 'undefined') return 'minimalist';
  
  try {
    const saved = localStorage.getItem('rioporto-theme') as ThemeModel;
    if (saved && Object.keys(THEME_CONFIGS).includes(saved)) {
      return saved;
    }
  } catch (error) {
    console.warn('Failed to read theme from localStorage:', error);
  }
  
  return detectThemeFromSubdomain();
}

/**
 * Saves theme to localStorage
 */
export function saveTheme(model: ThemeModel): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('rioporto-theme', model);
  } catch (error) {
    console.warn('Failed to save theme to localStorage:', error);
  }
}

/**
 * Development mode theme switcher
 * Since NODE_ENV is set to production, we'll use a different approach
 */
export const isDevelopment = process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_SHOW_THEME_SWITCHER === 'true';