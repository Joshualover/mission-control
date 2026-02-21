"use client";

export default function Home() {
  const features = [
    { id: "calendar", emoji: "📅", title: "智能日历", desc: "任务调度与定时作业", icon: "📅" },
    { id: "memories", emoji: "🧠", title: "记忆库", desc: "知识管理与检索", icon: "🧠" },
    { id: "team", emoji: "👥", title: "团队管理", desc: "AI代理成员协作", icon: "👥" },
    { id: "office", emoji: "🏢", title: "办公室", desc: "实时工作监控", icon: "🏢" },
    { id: "pipeline", emoji: "🎬", title: "内容管道", desc: "创作流程管理", icon: "🎬" },
    { id: "analytics", emoji: "📊", title: "数据分析", desc: "统计与可视化", icon: "📊" },
  ];

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', backgroundColor: '#ffffff', minHeight: '100vh', margin: 0, padding: 0 }}>
      {/* Gradient Header */}
      <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '60px 20px', textAlign: 'center', color: 'white' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'inline-block', padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '20px', marginBottom: '24px', fontSize: '14px', fontWeight: '500' }}>
            ✨ AI 团队管理平台
          </div>
          <h1 style={{ fontSize: '64px', fontWeight: '800', margin: '0 0 20px 0', letterSpacing: '-2px', textShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            任务控制中心
          </h1>
          <p style={{ fontSize: '22px', opacity: 0.95, lineHeight: '1.5', marginBottom: '32px', fontWeight: '300' }}>
            统一管理 AI 代理团队的六大核心系统
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/calendar" style={{ padding: '16px 32px', backgroundColor: 'white', color: '#667eea', textDecoration: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)', transition: 'transform 0.2s' }}>
              🚀 开始使用
            </a>
            <a href="https://github.com/Joshualover/mission-control" target="_blank" rel="noopener noreferrer" style={{ padding: '16px 32px', backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', textDecoration: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '16px', backdropFilter: 'blur(10px)' }}>
              📦 GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ padding: '80px 20px', backgroundColor: '#f8f9fa' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '42px', fontWeight: '800', color: '#1a202c', marginBottom: '16px', letterSpacing: '-1px' }}>
              六大核心功能
            </h2>
            <p style={{ fontSize: '18px', color: '#718096', maxWidth: '600px', margin: '0 auto' }}>
              从任务调度到数据分析，一站式管理您的 AI 团队
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {features.map((feature, index) => (
              <a key={feature.id} href={`/${feature.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{
                  backgroundColor: 'white',
                  padding: '36px',
                  borderRadius: '20px',
                  border: '1px solid #e2e8f0',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                  cursor: 'pointer'
                }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    backgroundColor: index === 0 ? '#ebf8ff' : index === 1 ? '#faf5ff' : index === 2 ? '#f0fff4' : index === 3 ? '#fffaf0' : index === 4 ? '#fff5f5' : '#ebf8ff',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                    fontSize: '32px'
                  }}>
                    {feature.emoji}
                  </div>
                  <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#1a202c', marginBottom: '12px', marginTop: '0' }}>
                    {feature.title}
                  </h3>
                  <p style={{ fontSize: '16px', color: '#718096', lineHeight: '1.6', marginBottom: '20px', margin: '0' }}>
                    {feature.desc}
                  </p>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: index === 0 ? '#3182ce' : index === 1 ? '#805ad5' : index === 2 ? '#38a169' : index === 3 ? '#dd6b20' : index === 4 ? '#e53e3e' : '#3182ce',
                    fontWeight: '600',
                    fontSize: '14px'
                  }}>
                    <span>了解更多</span>
                    <span style={{ transition: 'transform 0.2s' }}>→</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div style={{ backgroundColor: 'white', padding: '80px 20px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '56px', fontWeight: '800', color: '#667eea', marginBottom: '12px', lineHeight: '1' }}>
                6
              </div>
              <div style={{ fontSize: '16px', color: '#718096', fontWeight: '500' }}>核心模块</div>
            </div>
            <div>
              <div style={{ fontSize: '56px', fontWeight: '800', color: '#764ba2', marginBottom: '12px', lineHeight: '1' }}>
                AI
              </div>
              <div style={{ fontSize: '16px', color: '#718096', fontWeight: '500' }}>智能驱动</div>
            </div>
            <div>
              <div style={{ fontSize: '56px', fontWeight: '800', color: '#667eea', marginBottom: '12px', lineHeight: '1' }}>
                100%
              </div>
              <div style={{ fontSize: '16px', color: '#718096', fontWeight: '500' }}>开源免费</div>
            </div>
            <div>
              <div style={{ fontSize: '56px', fontWeight: '800', color: '#764ba2', marginBottom: '12px', lineHeight: '1' }}>
                24/7
              </div>
              <div style={{ fontSize: '16px', color: '#718096', fontWeight: '500' }}>实时同步</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ backgroundColor: '#1a202c', color: 'white', padding: '40px 20px', textAlign: 'center' }}>
        <p style={{ margin: '0 0 8px 0', color: '#a0aec0' }}>Built with Next.js 16 + Tailwind CSS</p>
        <p style={{ margin: 0, fontSize: '14px', color: '#718096' }}>© 2024 Mission Control. All rights reserved.</p>
      </div>

      <style>{`
        a[href].hover:hover div {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
          border-color: #cbd5e0;
        }
        a[href].hover:hover span:last-child {
          transform: translateX(4px);
        }
      `}</style>
    </div>
  );
}
