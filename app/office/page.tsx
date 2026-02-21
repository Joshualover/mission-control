"use client";

import Navigation from "../components/Navigation";

export default function OfficePage() {
  const tasks = [
    { id: 1, member: "约书亚", task: "开发 Mission Control 界面", status: "busy", progress: 85 },
    { id: 2, member: "斌哥", task: "项目架构设计", status: "active", progress: 60 },
  ];

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', backgroundColor: '#fafafa', minHeight: '100vh' }}>
      <Navigation />

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '80px 20px 60px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '12px 24px', backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', borderRadius: '30px', marginBottom: '24px' }}>
            <span style={{ fontSize: '32px' }}>🏢</span>
            <span style={{ color: 'white', fontSize: '18px', fontWeight: '700' }}>办公室</span>
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 56px)', fontWeight: '800', color: 'white', margin: '0 0 20px', letterSpacing: '-1px', textShadow: '0 2px 20px rgba(0,0,0,0.1)' }}>
            数字办公室
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)', maxWidth: '600px', margin: '0 auto' }}>
            实时监控团队成员工作状态
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '60px 20px', maxWidth: '1200px', margin: '-40px auto 0', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
          {tasks.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: 'white',
                padding: '36px',
                borderRadius: '20px',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    color: 'white',
                    fontWeight: '800'
                  }}>
                    {item.member.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: '700', color: '#1a1a1a' }}>{item.member}</div>
                    <div style={{ fontSize: '14px', color: '#9ca3af', marginTop: '2px' }}>正在工作</div>
                  </div>
                </div>
                <div style={{
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '700',
                  backgroundColor: item.status === 'busy' ? '#fef3c7' : '#dcfce7',
                  color: item.status === 'busy' ? '#d97706' : '#16a34a'
                }}>
                  {item.status === 'busy' ? '🔥 忙碌' : '🟢 活跃'}
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '15px', color: '#4b5563', marginBottom: '8px', fontWeight: '500' }}>
                  {item.task}
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: '#f3f4f6', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{ width: `${item.progress}%`, height: '100%', background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)', borderRadius: '10px', transition: 'width 0.5s ease' }}></div>
                </div>
                <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '6px', fontWeight: '500' }}>
                  进度: {item.progress}%
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ padding: '6px 12px', backgroundColor: '#f9fafb', borderRadius: '8px', fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>
                  ⏱️ 活跃 2h
                </span>
                <span style={{ padding: '6px 12px', backgroundColor: '#f9fafb', borderRadius: '8px', fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>
                  📊 生产力高
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        <div style={{
          backgroundColor: 'white',
          padding: '60px',
          borderRadius: '20px',
          border: '2px dashed rgba(102,126,234,0.2)',
          textAlign: 'center',
          marginTop: '32px'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
          <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1a1a1a', marginBottom: '8px' }}>实时数据</h3>
          <p style={{ fontSize: '15px', color: '#666' }}>
            集成 Convex 后显示实时工作状态和统计数据
          </p>
        </div>
      </div>
    </div>
  );
}
