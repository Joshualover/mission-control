"use client";

import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { id: "/", label: "🏠 主页", emoji: "🏠" },
    { id: "/calendar", label: "📅 日历", emoji: "📅" },
    { id: "/memories", label: "🧠 记忆", emoji: "🧠" },
    { id: "/team", label: "👥 团队", emoji: "👥" },
    { id: "/office", label: "🏢 办公室", emoji: "🏢" },
    { id: "/pipeline", label: "🎬 管道", emoji: "🎬" },
    { id: "/analytics", label: "📊 分析", emoji: "📊" },
  ];

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backgroundColor: 'var(--nav-bg)',
      borderBottom: '1px solid var(--nav-border)',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          {/* Logo */}
          <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              color: 'white',
              fontWeight: '800',
              boxShadow: '0 4px 12px rgba(102,126,234,0.3)'
            }}>
              M
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', lineHeight: '1.2' }}>Mission Control</div>
              <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: '500', lineHeight: '1.2' }}>任务控制中心</div>
            </div>
          </a>

          {/* Navigation Items + Theme Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.id}
                  style={{
                    textDecoration: 'none',
                    padding: '8px 16px',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontWeight: '600',
                    transition: 'all 0.2s ease',
                    backgroundColor: pathname === item.id ? 'rgba(102,126,234,0.1)' : 'transparent',
                    color: pathname === item.id ? '#667eea' : 'var(--text-secondary)',
                    border: pathname === item.id ? '1px solid rgba(102,126,234,0.2)' : '1px solid transparent'
                  }}
                >
                  {item.label.split(' ')[0]} {item.label.split(' ')[1]}
                </a>
              ))}
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
