// 主题工具函数和样式常量

export const getThemeStyle = (isDark: boolean) => ({
  // 背景色
  background: isDark ? '#0a0a0a' : '#fafafa',
  
  // 卡片样式
  cardBg: isDark ? '#1a1a1a' : '#ffffff',
  cardBorder: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
  
  // 文本颜色
  textPrimary: isDark ? '#e5e5e5' : '#1a1a1a',
  textSecondary: isDark ? '#a3a3a3' : '#666666',
  textTertiary: isDark ? '#737373' : '#9ca3af',
  
  // 导航栏
  navBg: isDark ? '#0a0a0a' : '#ffffff',
  navBorder: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
  
  // 阴影
  shadow: isDark ? '0 4px 20px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.05)',
  shadowHover: isDark ? '0 20px 40px rgba(0,0,0,0.5)' : '0 20px 40px rgba(0,0,0,0.1)',
});

// 用于内联样式的CSS变量访问
export const cssVars = {
  background: 'var(--background)',
  cardBg: 'var(--card-bg)',
  cardBorder: 'var(--card-border)',
  textPrimary: 'var(--text-primary)',
  textSecondary: 'var(--text-secondary)',
  textTertiary: 'var(--text-tertiary)',
  navBg: 'var(--nav-bg)',
  navBorder: 'var(--nav-border)',
  shadow: 'var(--shadow)',
  shadowHover: 'var(--shadow-hover)',
};
