"use client";

import Navigation from "../components/Navigation";

export default function MemoriesPage() {
  const [memories, setMemories] = useState([
    {
      id: 1,
      title: "项目快速部署脚本",
      content: "使用 quick-web-deploy 技能可以在30秒内创建并部署完整的 Web 应用。脚本位于 /root/.openclaw/workspace/skills/quick-web-deploy/quick-deploy.sh。",
      category: "工作流程",
      tags: ["部署", "自动化", "GitHub Pages"],
      importance: "high",
      createdAt: Date.now() - 86400000,
    },
    {
      id: 2,
      title: "GitHub 克隆镜像使用",
      content: "由于网络速度慢（~13-18 kB/s），GitHub 直接克隆经常失败。使用 gh-proxy.com 镜像：git clone https://gh-proxy.com/https://github.com/{user}/{repo}.git",
      category: "技术决策",
      tags: ["GitHub", "网络", "镜像"],
      importance: "high",
      createdAt: Date.now() - 72000000,
    },
    {
      id: 3,
      title: "版本参数解决浏览器缓存",
      content: "在 Web 应用中遇到浏览器缓存问题，通过添加版本参数解决：<link rel=\"stylesheet\" href=\"style.css?v=2.1.2\">。",
      category: "问题解决",
      tags: ["浏览器缓存", "性能", "前端"],
      importance: "medium",
      createdAt: Date.now() - 3600000,
    },
    {
      id: 4,
      title: "斌哥的偏好设置",
      content: "斌哥喜欢直接、高效的沟通。不要用'问得好'、'我很乐意为您效劳'等开场白。直接回答问题。注重实用性而非完美执行。",
      category: "个人偏好",
      tags: ["斌哥", "沟通", "偏好"],
      importance: "high",
      createdAt: Date.now() - 172800000,
    },
  ]);

  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterImportance, setFilterImportance] = useState<string>("all");

  const categories = ["all", ...Array.from(new Set(memories.map(m => m.category).filter(Boolean)))];

  const filteredMemories = memories.filter(memory => {
    if (filterCategory !== "all" && memory.category !== filterCategory) return false;
    if (filterImportance !== "all" && memory.importance !== filterImportance) return false;
    return true;
  });

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', backgroundColor: '#fafafa', minHeight: '100vh' }}>
      <Navigation />

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '80px 20px 60px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '12px 24px', backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', borderRadius: '30px', marginBottom: '24px' }}>
            <span style={{ fontSize: '32px' }}>🧠</span>
            <span style={{ color: 'white', fontSize: '18px', fontWeight: '700' }}>记忆库</span>
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 56px)', fontWeight: '800', color: 'white', margin: '0 0 20px', letterSpacing: '-1px', textShadow: '0 2px 20px rgba(0,0,0,0.1)' }}>
            知识管理中心
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)', maxWidth: '600px', margin: '0 auto' }}>
            存储和管理重要信息、经验和知识
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '60px 20px', maxWidth: '1200px', margin: '-40px auto 0', position: 'relative', zIndex: 10 }}>
        {/* Filters */}
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '20px', marginBottom: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div>
              <label style={{ fontSize: '14px', color: '#666', fontWeight: '600', marginBottom: '8px', display: 'block' }}>分类</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                style={{ padding: '10px 16px', border: '2px solid #e5e7eb', borderRadius: '10px', fontSize: '15px', minWidth: '160px', cursor: 'pointer' }}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat === "all" ? "全部" : cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ fontSize: '14px', color: '#666', fontWeight: '600', marginBottom: '8px', display: 'block' }}>重要性</label>
              <select
                value={filterImportance}
                onChange={(e) => setFilterImportance(e.target.value)}
                style={{ padding: '10px 16px', border: '2px solid #e5e7eb', borderRadius: '10px', fontSize: '15px', minWidth: '160px', cursor: 'pointer' }}
              >
                <option value="all">全部</option>
                <option value="high">关键</option>
                <option value="medium">重要</option>
                <option value="low">普通</option>
              </select>
            </div>
            <div style={{ marginLeft: 'auto', color: '#666', fontSize: '15px', fontWeight: '500' }}>
              共 {filteredMemories.length} 条记忆
            </div>
          </div>
        </div>

        {/* Memories Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '24px' }}>
          {filteredMemories.map((memory) => (
            <div
              key={memory.id}
              style={{
                backgroundColor: 'white',
                padding: '32px',
                borderRadius: '20px',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ padding: '8px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: '600', backgroundColor: memory.importance === 'high' ? '#fef2f2' : memory.importance === 'medium' ? '#fffbeb' : '#f0fdf4', color: memory.importance === 'high' ? '#dc2626' : memory.importance === 'medium' ? '#d97706' : '#16a34a' }}>
                  {memory.importance === 'high' ? '🔴 关键' : memory.importance === 'medium' ? '🟡 重要' : '🟢 普通'}
                </div>
                {memory.category && (
                  <div style={{ padding: '6px 14px', borderRadius: '16px', fontSize: '12px', fontWeight: '600', backgroundColor: '#f3f4f6', color: '#6b7280' }}>
                    {memory.category}
                  </div>
                )}
              </div>

              <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#1a1a1a', marginBottom: '12px', marginTop: '0', lineHeight: '1.3' }}>
                {memory.title}
              </h3>

              <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.7', marginBottom: '20px', margin: '0 0 20px' }}>
                {memory.content}
              </p>

              {memory.tags && memory.tags.length > 0 && (
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                  {memory.tags.map((tag, index) => (
                    <span key={index} style={{ padding: '4px 12px', backgroundColor: '#f9fafb', borderRadius: '8px', fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div style={{ fontSize: '13px', color: '#9ca3af', fontWeight: '500' }}>
                {new Date(memory.createdAt).toLocaleDateString('zh-CN')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
