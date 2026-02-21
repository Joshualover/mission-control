"use client";

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'auto';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('auto');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  // Initialize theme from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    if (stored && ['light', 'dark', 'auto'].includes(stored)) {
      setThemeState(stored);
    }
  }, []);

  // Resolve theme when 'auto' or when theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const resolveTheme = () => {
      if (theme === 'auto') {
        setResolvedTheme(mediaQuery.matches ? 'dark' : 'light');
      } else {
        setResolvedTheme(theme);
      }
    };

    resolveTheme();

    // Listen for system theme changes when in auto mode
    const handler = () => resolveTheme();
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, [theme]);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(resolvedTheme);
    
    // Update CSS variables for theme colors
    updateThemeColors(resolvedTheme);
  }, [resolvedTheme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// Update CSS custom properties for theme colors
function updateThemeColors(theme: 'light' | 'dark') {
  const root = document.documentElement;

  if (theme === 'dark') {
    // Dark mode colors
    root.style.setProperty('--background', '#0a0a0a');
    root.style.setProperty('--foreground', '#e5e5e5');
    root.style.setProperty('--card-bg', '#1a1a1a');
    root.style.setProperty('--card-border', 'rgba(255,255,255,0.08)');
    root.style.setProperty('--nav-bg', '#0a0a0a');
    root.style.setProperty('--nav-border', 'rgba(255,255,255,0.08)');
    root.style.setProperty('--text-primary', '#e5e5e5');
    root.style.setProperty('--text-secondary', '#a3a3a3');
    root.style.setProperty('--text-tertiary', '#737373');
    root.style.setProperty('--shadow', '0 4px 20px rgba(0,0,0,0.4)');
    root.style.setProperty('--shadow-hover', '0 20px 40px rgba(0,0,0,0.5)');
  } else {
    // Light mode colors
    root.style.setProperty('--background', '#fafafa');
    root.style.setProperty('--foreground', '#1a1a1a');
    root.style.setProperty('--card-bg', '#ffffff');
    root.style.setProperty('--card-border', 'rgba(0,0,0,0.06)');
    root.style.setProperty('--nav-bg', '#ffffff');
    root.style.setProperty('--nav-border', 'rgba(0,0,0,0.08)');
    root.style.setProperty('--text-primary', '#1a1a1a');
    root.style.setProperty('--text-secondary', '#666666');
    root.style.setProperty('--text-tertiary', '#9ca3af');
    root.style.setProperty('--shadow', '0 4px 20px rgba(0,0,0,0.05)');
    root.style.setProperty('--shadow-hover', '0 20px 40px rgba(0,0,0,0.1)');
  }
}
