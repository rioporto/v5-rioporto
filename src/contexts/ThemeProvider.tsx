'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  ThemeModel, 
  applyTheme, 
  getSavedTheme, 
  saveTheme, 
  THEME_CONFIGS,
  detectThemeFromSubdomain 
} from '@/lib/theme-system';

interface ThemeContextType {
  currentTheme: ThemeModel;
  setTheme: (theme: ThemeModel) => void;
  themeConfig: typeof THEME_CONFIGS[ThemeModel];
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeModel;
  storageKey?: string;
}

/**
 * Theme Provider Component
 * Manages global theme state and applies CSS variables
 */
export function ThemeProvider({ 
  children, 
  defaultTheme = 'minimalist',
  storageKey = 'rioporto-theme'
}: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<ThemeModel>(defaultTheme);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Detect theme from subdomain first, then check saved preference
    const detectedTheme = detectThemeFromSubdomain();
    // Only use saved theme if we're not on a specific subdomain
    const hostname = window.location.hostname;
    const isSubdomain = hostname.match(/^v\d+\./);
    
    const themeToUse = isSubdomain ? detectedTheme : getSavedTheme();
    setCurrentTheme(themeToUse);
    applyTheme(themeToUse);
    setIsLoading(false);
  }, []);

  const setTheme = (theme: ThemeModel) => {
    setCurrentTheme(theme);
    applyTheme(theme);
    saveTheme(theme);
  };

  const value: ThemeContextType = {
    currentTheme,
    setTheme,
    themeConfig: THEME_CONFIGS[currentTheme],
    isLoading,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to use theme context
 * @returns Theme context with current theme and setter
 */
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}