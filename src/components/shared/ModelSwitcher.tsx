'use client';

import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Palette } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeProvider';
import { ThemeModel, THEME_CONFIGS, isDevelopment } from '@/lib/theme-system';
import { cn } from '@/lib/utils';

/**
 * Model Switcher Component
 * Only visible in development mode
 * Floats in bottom right corner for easy theme switching
 */
export function ModelSwitcher() {
  const { currentTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  // Only show in development
  if (!isDevelopment) return null;

  const themeEntries = Object.entries(THEME_CONFIGS) as [ThemeModel, typeof THEME_CONFIGS[ThemeModel]][];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={cn(
        "bg-card border border-border rounded-lg shadow-xl transition-all duration-300",
        isOpen ? "w-64" : "w-12"
      )}>
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full h-12 flex items-center justify-center",
            "text-foreground hover:bg-accent transition-colors",
            "rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          )}
          title="Theme Switcher (Dev Only)"
        >
          <Palette className="w-5 h-5" />
          {isOpen ? (
            <ChevronDown className="w-4 h-4 ml-2" />
          ) : (
            <ChevronUp className="w-4 h-4 ml-2" />
          )}
        </button>

        {/* Theme Options */}
        {isOpen && (
          <div className="p-3 border-t border-border">
            <div className="text-xs font-medium text-muted-foreground mb-2">
              Theme Models
            </div>
            <div className="space-y-1">
              {themeEntries.map(([model, config]) => (
                <button
                  key={model}
                  onClick={() => setTheme(model)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-md text-sm",
                    "transition-colors duration-200",
                    "hover:bg-accent hover:text-accent-foreground",
                    currentTheme === model
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground"
                  )}
                >
                  <div className="font-medium">{config.name}</div>
                  <div className="text-xs opacity-70 truncate">
                    {config.description}
                  </div>
                </button>
              ))}
            </div>
            
            {/* Current Theme Info */}
            <div className="mt-3 pt-3 border-t border-border">
              <div className="text-xs text-muted-foreground">
                Current: <span className="font-medium text-foreground">
                  {THEME_CONFIGS[currentTheme].name}
                </span>
              </div>
            </div>

            {/* Development Notice */}
            <div className="mt-2 p-2 bg-warning/10 border border-warning/20 rounded text-xs text-warning">
              Development Mode Only
            </div>
          </div>
        )}
      </div>
    </div>
  );
}