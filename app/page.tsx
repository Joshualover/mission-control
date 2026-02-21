"use client";

export default function Home() {
  const features = [
    { id: "calendar", emoji: "📅", title: "智能日历", desc: "任务调度与定时作业管理", color: "from-blue-500 to-cyan-400" },
    { id: "memories", emoji: "🧠", title: "记忆库", desc: "知识管理与快速检索", color: "from-purple-500 to-pink-400" },
    { id: "team", emoji: "👥", title: "团队管理", desc: "AI 代理成员协作", color: "from-green-500 to-emerald-400" },
    { id: "office", emoji: "🏢", title: "办公室", desc: "实时工作状态监控", color: "from-orange-500 to-amber-400" },
    { id: "pipeline", emoji: "🎬", title: "内容管道", desc: "六阶段创作流程", color: "from-pink-500 to-rose-400" },
    { id: "analytics", emoji: "📊", title: "数据分析", desc: "统计与可视化洞察", color: "from-indigo-500 to-violet-400" },
  ];

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', backgroundColor: 'var(--background)', minHeight: '100vh', margin: 0, padding: 0 }}>
      {/* Header with Gradient Background */}
      <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '100px 20px 80px', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative Elements */}
        <div style={{ position: 'absolute', top: '-50%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)', borderRadius: '50%' }}></div>
        <div style={{ position: 'absolute', bottom: '-30%', left: '-5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)', borderRadius: '50%' }}></div>

        <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', padding: '10px 24px', backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', borderRadius: '30px', marginBottom: '28px', fontSize: '15px', fontWeight: '600', color: 'white', letterSpacing: '0.5px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
            ✨ AI 团队管理平台
          </div>

          <h1 style={{ fontSize: 'clamp(40px, 8vw, 72px)', fontWeight: '800', margin: '0 0 24px 0', color: 'white', lineHeight: '1.1', letterSpacing: '-2px', textShadow: '0 2px 20px rgba(0,0,0,0.1)' }}>
            任务控制中心
          </h1>

          <p style={{ fontSize: 'clamp(18px, 3vw, 24px)', color: 'rgba(255,255,255,0.95)', lineHeight: '1.6', marginBottom: '40px', fontWeight: '400', maxWidth: '700px', margin: '0 auto 40px' }}>
            为 AI 代理团队打造的统一管理平台
            <br />
            集成日历、知识库、团队、办公室、内容管道和数据分析
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/calendar" style={{ padding: '18px 40px', backgroundColor: 'white', color: '#667eea', textDecoration: 'none', borderRadius: '16px', fontWeight: '700', fontSize: '17px', boxShadow: '0 8px 30px rgba(0,0,0,0.12)', transition: 'all 0.3s ease', border: 'none', cursor: 'pointer' }}>
              🚀 开始使用
            </a>
            <a href="https://github.com/Joshualover/mission-control" target="_blank" rel="noopener noreferrer" style={{ padding: '18px 40px', backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', color: 'white', textDecoration: 'none', borderRadius: '16px', fontWeight: '700', fontSize: '17px', transition: 'all 0.3s ease', border: '2px solid rgba(255,255,255,0.3)', cursor: 'pointer' }}>
              📦 GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ padding: '100px 20px', backgroundColor: 'var(--background)', position: 'relative' }}>
        {/* Overlap the header */}
        <div style={{ maxWidth: '1200px', margin: '-60px auto 0', position: 'relative', zIndex: 10 }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '16px', letterSpacing: '-1px' }}>
              六大核心系统
            </h2>
            <p style={{ fontSize: '18px', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
              从任务调度到数据分析，一站式管理您的 AI 团队
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px' }}>
            {features.map((feature, index) => (
              <a key={feature.id} href={`/${feature.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{
                  backgroundColor: 'var(--card-bg)',
                  padding: '40px',
                  borderRadius: '24px',
                  border: '1px solid var(--card-border)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: 'var(--shadow)',
                  cursor: 'pointer',
                  height: '100%'
                }}>
                  <div style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '20px',
                    background: `linear-gradient(135deg, ${feature.color.split(' ')[0].replace('from-', '#').replace('to-', '→')})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '24px',
                    fontSize: '36px',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
                  }}>
                    {feature.emoji}
                  </div>

                  <h3 style={{ fontSize: '26px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '12px', marginTop: '0', letterSpacing: '-0.5px' }}>
                    {feature.title}
                  </h3>

                  <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '24px', margin: '0 0 24px 0' }}>
                    {feature.desc}
                  </p>

                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontWeight: '600',
                    fontSize: '15px',
                    transition: 'all 0.3s ease'
                  }}>
                    <span style={{ 
                      background: `linear-gradient(135deg, ${feature.color.replace('from-', '').replace(' to-', ', ')})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>
                      了解更多
                    </span>
                    <span style={{ 
                      transition: 'transform 0.3s ease',
                      fontSize: '18px'
                    }}>→</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div style={{ backgroundColor: 'var(--card-bg)', padding: '100px 20px', borderTop: '1px solid var(--card-border)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '48px', textAlign: 'center' }}>
            <div>
              <div style={{ 
                fontSize: '64px', 
                fontWeight: '800', 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '16px',
                lineHeight: '1'
              }}>
                6
              </div>
              <div style={{ fontSize: '16px', color: 'var(--text-secondary)', fontWeight: '500', letterSpacing: '0.5px' }}>核心模块</div>
            </div>
            <div>
              <div style={{ 
                fontSize: '64px', 
                fontWeight: '800', 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '16px',
                lineHeight: '1'
              }}>
                AI
              </div>
              <div style={{ fontSize: '16px', color: 'var(--text-secondary)', fontWeight: '500', letterSpacing: '0.5px' }}>智能驱动</div>
            </div>
            <div>
              <div style={{ 
                fontSize: '64px', 
                fontWeight: '800', 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '16px',
                lineHeight: '1'
              }}>
                100%
              </div>
              <div style={{ fontSize: '16px', color: 'var(--text-secondary)', fontWeight: '500', letterSpacing: '0.5px' }}>开源免费</div>
            </div>
            <div>
              <div style={{ 
                fontSize: '64px', 
                fontWeight: '800', 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '16px',
                lineHeight: '1'
              }}>
                24/7
              </div>
              <div style={{ fontSize: '16px', color: 'var(--text-secondary)', fontWeight: '500', letterSpacing: '0.5px' }}>实时同步</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ backgroundColor: '#1a1a1a', color: 'rgba(255,255,255,0.7)', padding: '60px 20px', textAlign: 'center' }}>
        <p style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '500' }}>Built with Next.js 16 + Tailwind CSS</p>
        <p style={{ margin: 0, fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>© 2024 Mission Control. All rights reserved.</p>
      </div>

      <style>{`
        a[href] div:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-hover);
        }
        a[href]:hover span:last-child {
          transform: translateX(6px);
        }
        a[href] button:hover,
        a[href] > div:hover {
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}
