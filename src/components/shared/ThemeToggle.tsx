import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/Button';
import { Dropdown, DropdownContent, DropdownItem } from '../ui/Dropdown';
import { THEME_CONFIGS, type ThemeModel } from '@/lib/theme-system';

export interface ThemeToggleProps {
  /**
   * Current theme
   */
  currentTheme: ThemeModel;
  /**
   * Callback when theme changes
   */
  onThemeChange: (theme: ThemeModel) => void;
  /**
   * Whether to show as dropdown or toggle button
   */
  variant?: 'toggle' | 'dropdown';
  /**
   * Custom class name
   */
  className?: string;
}

/**
 * Theme icons
 */
const themeIcons: Record<ThemeModel, React.ReactNode> = {
  minimalist: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  ),
  financial: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  'crypto-native': (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27,6.96 12,12.01 20.73,6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
  institutional: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9,22 9,12 15,12 15,22" />
    </svg>
  ),
  gaming: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  ),
};

/**
 * Theme toggle component for switching between themes
 * 
 * @example
 * ```tsx
 * <ThemeToggle 
 *   currentTheme={theme} 
 *   onThemeChange={setTheme} 
 *   variant="dropdown" 
 * />
 * ```
 */
const ThemeToggle: React.FC<ThemeToggleProps> = ({
  currentTheme,
  onThemeChange,
  variant = 'dropdown',
  className,
}) => {
  if (variant === 'toggle') {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          const themes: ThemeModel[] = ['minimalist', 'financial', 'crypto-native', 'institutional', 'gaming'];
          const currentIndex = themes.indexOf(currentTheme);
          const nextIndex = (currentIndex + 1) % themes.length;
          onThemeChange(themes[nextIndex]);
        }}
        className={cn('h-9 w-9', className)}
        aria-label="Toggle theme"
      >
        {themeIcons[currentTheme]}
      </Button>
    );
  }

  return (
    <Dropdown
      trigger={
        <Button
          variant="ghost"
          size="icon"
          className={cn('h-9 w-9', className)}
          aria-label="Select theme"
        >
          {themeIcons[currentTheme]}
        </Button>
      }
    >
      <DropdownContent className="w-48">
        {Object.entries(THEME_CONFIGS).map(([key, config]) => {
          const themeKey = key as ThemeModel;
          const isActive = currentTheme === themeKey;
          
          return (
            <DropdownItem
              key={themeKey}
              onClick={() => onThemeChange(themeKey)}
              className={cn(
                'flex items-center gap-3 cursor-pointer',
                isActive && 'bg-accent text-accent-foreground'
              )}
            >
              <div className="flex-shrink-0">
                {themeIcons[themeKey]}
              </div>
              <div className="flex-1">
                <div className="font-medium">{config.name}</div>
                <div className="text-xs text-muted-foreground">
                  {config.description}
                </div>
              </div>
              {isActive && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <polyline points="20,6 9,17 4,12" />
                </svg>
              )}
            </DropdownItem>
          );
        })}
      </DropdownContent>
    </Dropdown>
  );
};

ThemeToggle.displayName = 'ThemeToggle';

export { ThemeToggle };