"use client";

export default function AnalyticsPage() {
  const stats = [
    { label: "总任务数", value: "24", change: "+12%", trend: "up" },
    { label: "完成率", value: "87%", change: "+5%", trend: "up" },
    { label: "活跃成员", value: "2", change: "0", trend: "stable" },
    { label: "项目数", value: "6", change: "+2", trend: "up" },
  ];

  const chartData = [
    { label: "周一", value: 12 },
    { label: "周二", value: 19 },
    { label: "周三", value: 15 },
    { label: "周四", value: 22 },
    { label: "周五", value: 18 },
    { label: "周六", value: 8 },
    { label: "周日", value: 5 },
  ];

  const maxValue = Math.max(...chartData.map(d => d.value));

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', backgroundColor: '#fafafa', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '80px 20px 60px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '12px 24px', backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', borderRadius: '30px', marginBottom: '24px' }}>
            <span style={{ fontSize: '32px' }}>📊</span>
            <span style={{ color: 'white', fontSize: '18px', fontWeight: '700' }}>分析</span>
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 56px)', fontWeight: '800', color: 'white', margin: '0 0 20px', letterSpacing: '-1px', textShadow: '0 2px 20px rgba(0,0,0,0.1)' }}>
            数据分析
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)', maxWidth: '600px', margin: '0 auto' }}>
            统计报表和数据洞察
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '60px 20px', maxWidth: '1200px', margin: '-40px auto 0', position: 'relative', zIndex: 10 }}>
        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          {stats.map((stat, index) => (
            <div
              key={index}
              style={{
                backgroundColor: 'white',
                padding: '28px',
                borderRadius: '20px',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              }}
            >
              <div style={{ fontSize: '14px', color: '#9ca3af', fontWeight: '600', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {stat.label}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '40px', fontWeight: '800', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: '1' }}>
                  {stat.value}
                </div>
                <div style={{
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: '700',
                  backgroundColor: stat.trend === 'up' ? '#dcfce7' : '#f3f4f6',
                  color: stat.trend === 'up' ? '#16a34a' : '#6b7280'
                }}>
                  {stat.trend === 'up' ? '↑' : '→'} {stat.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
            <div>
              <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 6px' }}>任务完成趋势</h3>
              <p style={{ fontSize: '14px', color: '#9ca3af', margin: 0 }}>过去7天</p>
            </div>
            <div style={{ padding: '8px 16px', backgroundColor: '#f9fafb', borderRadius: '10px', fontSize: '13px', color: '#6b7280', fontWeight: '500' }}>
              本周
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px', height: '200px', paddingTop: '20px' }}>
            {chartData.map((item, index) => (
              <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '100%',
                  height: `${(item.value / maxValue) * 160}px`,
                  background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '10px 10px 4px 4px',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  minHeight: '20px'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-28px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '13px',
                    fontWeight: '700',
                    color: '#667eea'
                  }}>
                    {item.value}
                  </div>
                </div>
                <div style={{ fontSize: '13px', color: '#9ca3af', fontWeight: '500' }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div style={{
            backgroundColor: 'white',
            padding: '28px',
            borderRadius: '20px',
            border: '1px solid rgba(0,0,0,0.06)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          }}>
            <div style={{ fontSize: '32px', marginBottom: '16px' }}>💡</div>
            <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 10px' }}>效率提升</h4>
            <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: 0 }}>
              本周任务完成率提升 12%，团队协作效率显著提高
            </p>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '28px',
            borderRadius: '20px',
            border: '1px solid rgba(0,0,0,0.06)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          }}>
            <div style={{ fontSize: '32px', marginBottom: '16px' }}>🎯</div>
            <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 10px' }}>工作重点</h4>
            <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: 0 }}>
              Mission Control 项目占据 60% 工作时间，优先级最高
            </p>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '28px',
            borderRadius: '20px',
            border: '1px solid rgba(0,0,0,0.06)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          }}>
            <div style={{ fontSize: '32px', marginBottom: '16px' }}>🚀</div>
            <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 10px' }}>增长趋势</h4>
            <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: 0 }}>
              新增 2 个项目，团队规模持续扩大
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
