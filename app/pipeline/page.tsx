"use client";

export default function PipelinePage() {
  const projects = [
    { id: 1, title: "Mission Control 界面优化", stage: "production", priority: "high", assignedTo: "约书亚" },
    { id: 2, title: "AI 团队协作系统", stage: "idea", priority: "medium", assignedTo: "斌哥" },
  ];

  const stages = [
    { key: "idea", label: "💡 创意", color: "#fef3c7", textColor: "#d97706" },
    { key: "script", label: "📝 脚本", color: "#fed7aa", textColor: "#ea580c" },
    { key: "production", label: "🎬 制作", color: "#fecaca", textColor: "#dc2626" },
    { key: "post-production", label: "✨ 后期", color: "#e9d5ff", textColor: "#9333ea" },
    { key: "review", label: "👀 审核", color: "#dbeafe", textColor: "#2563eb" },
    { key: "published", label: "🚀 发布", color: "#dcfce7", textColor: "#16a34a" },
  ];

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', backgroundColor: '#fafafa', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '80px 20px 60px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '12px 24px', backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', borderRadius: '30px', marginBottom: '24px' }}>
            <span style={{ fontSize: '32px' }}>🎬</span>
            <span style={{ color: 'white', fontSize: '18px', fontWeight: '700' }}>内容管道</span>
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 56px)', fontWeight: '800', color: 'white', margin: '0 0 20px', letterSpacing: '-1px', textShadow: '0 2px 20px rgba(0,0,0,0.1)' }}>
            创作流程管理
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)', maxWidth: '600px', margin: '0 auto' }}>
            六阶段内容创作工作流
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '60px 20px', maxWidth: '1200px', margin: '-40px auto 0', position: 'relative', zIndex: 10 }}>
        {/* Pipeline Stages */}
        <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '20px', marginBottom: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
            {stages.map((stage) => (
              <div
                key={stage.key}
                style={{
                  padding: '16px',
                  borderRadius: '14px',
                  backgroundColor: stage.color,
                  textAlign: 'center',
                  border: '2px solid ' + stage.textColor + '20',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ fontSize: '20px', marginBottom: '6px' }}>{stage.label.split(' ')[0]}</div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: stage.textColor }}>
                  {stage.label.split(' ').slice(1).join(' ')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
          {projects.map((project) => {
            const stageInfo = stages.find(s => s.key === project.stage) || stages[0];
            return (
              <div
                key={project.id}
                style={{
                  backgroundColor: 'white',
                  padding: '32px',
                  borderRadius: '20px',
                  border: '1px solid rgba(0,0,0,0.06)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1a1a1a', margin: 0, flex: 1, lineHeight: '1.4' }}>
                    {project.title}
                  </h3>
                  <div style={{
                    padding: '6px 12px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '700',
                    backgroundColor: project.priority === 'high' ? '#fef2f2' : '#fef3c7',
                    color: project.priority === 'high' ? '#dc2626' : '#d97706',
                    marginLeft: '12px'
                  }}>
                    {project.priority === 'high' ? '🔴 高' : '🟡 中'}
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '13px', color: '#9ca3af', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    当前阶段
                  </div>
                  <div style={{
                    padding: '10px 16px',
                    borderRadius: '12px',
                    backgroundColor: stageInfo.color,
                    color: stageInfo.textColor,
                    fontWeight: '600',
                    fontSize: '14px',
                    display: 'inline-block'
                  }}>
                    {stageInfo.label}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid #f3f4f6' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      color: 'white',
                      fontWeight: '700'
                    }}>
                      {project.assignedTo.charAt(0)}
                    </div>
                    <span style={{ fontSize: '14px', color: '#4b5563', fontWeight: '500' }}>
                      {project.assignedTo}
                    </span>
                  </div>
                  <span style={{ fontSize: '13px', color: '#9ca3af' }}>进行中</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
