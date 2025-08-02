'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  ThemeModel, 
  applyTheme, 
  getSavedTheme, 
  saveTheme, 
  THEME_CONFIGS 
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
    // Get saved theme or detect from subdomain
    const savedTheme = getSavedTheme();
    setCurrentTheme(savedTheme);
    applyTheme(savedTheme);
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