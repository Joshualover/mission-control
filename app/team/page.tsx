"use client";

export default function TeamPage() {
  const members = [
    {
      id: 1,
      name: "斌哥",
      role: "开发者",
      description: "项目负责人，负责系统架构和决策",
      status: "active",
      skills: ["系统设计", "项目管理", "决策"],
    },
    {
      id: 2,
      name: "约书亚",
      role: "主控AI",
      description: "AI助手，负责日常任务执行和协调",
      status: "active",
      skills: ["任务执行", "代码开发", "文档编写"],
    },
  ];

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', backgroundColor: '#fafafa', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '80px 20px 60px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '12px 24px', backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', borderRadius: '30px', marginBottom: '24px' }}>
            <span style={{ fontSize: '32px' }}>👥</span>
            <span style={{ color: 'white', fontSize: '18px', fontWeight: '700' }}>团队</span>
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 56px)', fontWeight: '800', color: 'white', margin: '0 0 20px', letterSpacing: '-1px', textShadow: '0 2px 20px rgba(0,0,0,0.1)' }}>
            AI 团队管理
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)', maxWidth: '600px', margin: '0 auto' }}>
            管理团队成员和职责分工
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '60px 20px', maxWidth: '1200px', margin: '-40px auto 0', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
          {members.map((member) => (
            <div
              key={member.id}
              style={{
                backgroundColor: 'white',
                padding: '40px',
                borderRadius: '20px',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '36px',
                  color: 'white',
                  fontWeight: '800',
                  boxShadow: '0 8px 20px rgba(102,126,234,0.3)'
                }}>
                  {member.name.charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '26px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 8px', letterSpacing: '-0.5px' }}>
                    {member.name}
                  </h3>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 14px', backgroundColor: '#dcfce7', borderRadius: '20px', fontSize: '13px', fontWeight: '600', color: '#16a34a' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#16a34a' }}></span>
                    {member.role}
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.7', marginBottom: '24px', margin: '0 0 24px' }}>
                {member.description}
              </p>

              <div>
                <div style={{ fontSize: '14px', color: '#9ca3af', fontWeight: '600', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  技能标签
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {member.skills.map((skill, index) => (
                    <span key={index} style={{ padding: '8px 16px', backgroundColor: '#f9fafb', borderRadius: '10px', fontSize: '14px', color: '#4b5563', fontWeight: '500' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
