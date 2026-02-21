"use client";

import { useTheme } from '../lib/theme-context';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const themes: { value: 'light' | 'dark' | 'auto'; label: string; icon: string }[] = [
    { value: 'light', label: '浅色', icon: '☀️' },
    { value: 'dark', label: '深色', icon: '🌙' },
    { value: 'auto', label: '自动', icon: '🔄' },
  ];

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      padding: '4px',
      borderRadius: '12px',
      backgroundColor: 'var(--nav-bg)',
      border: '1px solid var(--nav-border)',
    }}>
      {themes.map((t) => (
        <button
          key={t.value}
          onClick={() => setTheme(t.value)}
          style={{
            padding: '8px 14px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: theme === t.value ? 'rgba(102,126,234,0.15)' : 'transparent',
            color: theme === t.value ? '#667eea' : 'var(--text-secondary)',
            fontSize: '20px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontWeight: theme === t.value ? '600' : '400',
          }}
          title={t.label}
          aria-label={`切换到${t.label}模式`}
        >
          {t.icon}
        </button>
      ))}
    </div>
  );
}
