"use client";

export default function Home() {
  const features = [
    { id: "calendar", emoji: "📅", title: "日历", desc: "任务调度" },
    { id: "memories", emoji: "🧠", title: "记忆库", desc: "知识管理" },
    { id: "team", emoji: "👥", title: "团队", desc: "成员管理" },
    { id: "office", emoji: "🏢", title: "办公室", desc: "工作监控" },
    { id: "pipeline", emoji: "🎬", title: "管道", desc: "创作流程" },
    { id: "analytics", emoji: "📊", title: "分析", desc: "数据统计" },
  ];

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#f5f5f5', minHeight: '100vh', margin: 0, padding: 0 }}>
      {/* Header */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', padding: '20px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: '#2563eb', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>M</span>
            </div>
            <div>
              <div style={{ fontSize: '20px', fontWeight: '600', color: '#111827' }}>Mission Control</div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>任务控制中心</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="/calendar" style={{ textDecoration: 'none', color: '#374151', fontSize: '14px' }}>日历</a>
            <a href="/memories" style={{ textDecoration: 'none', color: '#374151', fontSize: '14px' }}>记忆</a>
            <a href="/team" style={{ textDecoration: 'none', color: '#374151', fontSize: '14px' }}>团队</a>
            <a href="/office" style={{ textDecoration: 'none', color: '#374151', fontSize: '14px' }}>办公室</a>
            <a href="/pipeline" style={{ textDecoration: 'none', color: '#374151', fontSize: '14px' }}>管道</a>
            <a href="/analytics" style={{ textDecoration: 'none', color: '#374151', fontSize: '14px' }}>分析</a>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div style={{ padding: '80px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '56px', fontWeight: '700', color: '#111827', marginBottom: '20px', lineHeight: '1.1' }}>
            任务控制中心
          </h1>
          <p style={{ fontSize: '20px', color: '#6b7280', marginBottom: '40px', lineHeight: '1.6' }}>
            AI 代理团队统一管理平台
            <br />
            集成六大核心系统
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <a href="/calendar" style={{ padding: '12px 24px', backgroundColor: '#2563eb', color: 'white', textDecoration: 'none', borderRadius: '6px', fontWeight: '500' }}>
              开始使用
            </a>
            <a href="https://github.com/Joshualover/mission-control" target="_blank" rel="noopener noreferrer" style={{ padding: '12px 24px', backgroundColor: 'white', color: '#111827', textDecoration: 'none', borderRadius: '6px', fontWeight: '500', border: '1px solid #e5e7eb' }}>
              GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Features */}
      <div style={{ padding: '40px 20px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '600', color: '#111827', marginBottom: '40px', textAlign: 'center' }}>
            核心功能
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {features.map((f) => (
              <a key={f.id} href={`/${f.id}`} style={{ textDecoration: 'none' }}>
                <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '12px', border: '1px solid #e5e7eb', transition: 'box-shadow 0.2s' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>{f.emoji}</div>
                  <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>{f.title}</h3>
                  <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>{f.desc}</p>
                  <div style={{ fontSize: '14px', color: '#2563eb', fontWeight: '500' }}>访问 →</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ backgroundColor: 'white', padding: '60px 20px', marginTop: '40px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '48px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>6</div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>核心模块</div>
          </div>
          <div>
            <div style={{ fontSize: '48px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>AI</div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>智能驱动</div>
          </div>
          <div>
            <div style={{ fontSize: '48px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>100%</div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>开源免费</div>
          </div>
          <div>
            <div style={{ fontSize: '48px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>24/7</div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>实时同步</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ backgroundColor: 'white', borderTop: '1px solid #e5e7eb', padding: '40px 20px', textAlign: 'center' }}>
        <p style={{ color: '#6b7280', marginBottom: '8px' }}>Built with Next.js 16 + Tailwind CSS</p>
        <p style={{ color: '#9ca3af', fontSize: '14px' }}>© 2024 Mission Control</p>
      </div>
    </div>
  );
}
